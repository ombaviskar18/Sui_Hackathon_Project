module crypto_escape_game::game {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};
    use std::vector;
    use sui::table::{Self, Table};
    use sui::clock::{Self, Clock};

    // Error codes
    const EInvalidSolution: u64 = 0;
    const ENotYetActive: u64 = 1;
    const EAlreadyCompleted: u64 = 2;
    const EUnauthorized: u64 = 3;

    // Game objects and structures
    struct Game has key, store {
        id: UID,
        name: String,
        description: String,
        admin: address,
        rooms: vector<ID>,
        leaderboard: Table<address, PlayerStats>,
        active: bool,
    }

    struct Room has key, store {
        id: UID,
        name: String,
        description: String,
        puzzles: vector<ID>,
        next_room: Option<ID>,
        theme: String,
    }

    struct Puzzle has key, store {
        id: UID,
        name: String,
        description: String,
        crypto_type: String, // e.g., "hash", "zk", "signature"
        challenge_data: vector<u8>,
        solution_hash: vector<u8>, // Hash of the correct solution
        reward_amount: u64,
        completed_by: vector<address>,
        hints: vector<String>,
        time_limit: Option<u64>, // In seconds, None means no time limit
    }

    struct PlayerStats has store {
        player: address,
        puzzles_solved: u64,
        total_time: u64, // In seconds
        last_active: u64, // Timestamp
        rewards_earned: u64,
    }

    struct PlayerProgress has key {
        id: UID,
        player: address,
        current_room: ID,
        solved_puzzles: vector<ID>,
        start_time: u64,
        last_checkpoint: u64,
    }

    // Events
    struct PuzzleSolved has copy, drop {
        player: address,
        puzzle_id: ID,
        time_taken: u64,
    }
    
    struct RoomCompleted has copy, drop {
        player: address,
        room_id: ID,
    }
    
    struct GameCompleted has copy, drop {
        player: address,
        total_time: u64,
        total_rewards: u64,
    }

    // === Admin Functions ===

    public fun create_game(
        name: String,
        description: String,
        ctx: &mut TxContext
    ): Game {
        Game {
            id: object::new(ctx),
            name,
            description,
            admin: tx_context::sender(ctx),
            rooms: vector::empty(),
            leaderboard: table::new(ctx),
            active: true,
        }
    }

    public fun create_room(
        name: String,
        description: String,
        theme: String,
        ctx: &mut TxContext
    ): Room {
        Room {
            id: object::new(ctx),
            name,
            description,
            puzzles: vector::empty(),
            next_room: option::none(),
            theme,
        }
    }

    public fun create_puzzle(
        name: String,
        description: String,
        crypto_type: String,
        challenge_data: vector<u8>,
        solution_hash: vector<u8>,
        reward_amount: u64,
        hints: vector<String>,
        time_limit: Option<u64>,
        ctx: &mut TxContext
    ): Puzzle {
        Puzzle {
            id: object::new(ctx),
            name,
            description,
            crypto_type,
            challenge_data,
            solution_hash,
            reward_amount,
            completed_by: vector::empty(),
            hints,
            time_limit,
        }
    }

    public fun add_room_to_game(
        game: &mut Game,
        room: Room,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == game.admin, EUnauthorized);
        let room_id = object::id(&room);
        vector::push_back(&mut game.rooms, room_id);
        transfer::share_object(room);
    }

    public fun add_puzzle_to_room(
        room: &mut Room,
        puzzle: Puzzle, 
        ctx: &mut TxContext
    ) {
        let puzzle_id = object::id(&puzzle);
        vector::push_back(&mut room.puzzles, puzzle_id);
        transfer::share_object(puzzle);
    }

    public fun set_next_room(
        room: &mut Room,
        next_room_id: ID,
        ctx: &mut TxContext
    ) {
        room.next_room = option::some(next_room_id);
    }

    // === Player Functions ===

    public fun start_game(
        game: &Game,
        clock: &Clock,
        ctx: &mut TxContext
    ): PlayerProgress {
        assert!(game.active, ENotYetActive);
        
        let first_room_id = *vector::borrow(&game.rooms, 0);
        let current_time = clock::timestamp_ms(clock) / 1000; // Convert to seconds
        
        PlayerProgress {
            id: object::new(ctx),
            player: tx_context::sender(ctx),
            current_room: first_room_id,
            solved_puzzles: vector::empty(),
            start_time: current_time,
            last_checkpoint: current_time,
        }
    }

    public fun solve_puzzle(
        game: &mut Game,
        puzzle: &mut Puzzle,
        player_progress: &mut PlayerProgress,
        solution: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let player = tx_context::sender(ctx);
        assert!(player == player_progress.player, EUnauthorized);
        
        // Verify the solution by checking if its hash matches the stored hash
        let solution_hash = hash::sha3_256(solution);
        assert!(solution_hash == puzzle.solution_hash, EInvalidSolution);
        
        // Check if player has already solved this puzzle
        assert!(!vector::contains(&puzzle.completed_by, &player), EAlreadyCompleted);
        
        // Update puzzle completion
        vector::push_back(&mut puzzle.completed_by, player);
        
        // Update player progress
        vector::push_back(&mut player_progress.solved_puzzles, object::id(puzzle));
        
        // Calculate time taken
        let current_time = clock::timestamp_ms(clock) / 1000;
        let time_taken = current_time - player_progress.last_checkpoint;
        player_progress.last_checkpoint = current_time;
        
        // Update player stats in leaderboard
        if (table::contains(&game.leaderboard, player)) {
            let player_stats = table::borrow_mut(&mut game.leaderboard, player);
            player_stats.puzzles_solved = player_stats.puzzles_solved + 1;
            player_stats.total_time = player_stats.total_time + time_taken;
            player_stats.last_active = current_time;
            player_stats.rewards_earned = player_stats.rewards_earned + puzzle.reward_amount;
        } else {
            let new_stats = PlayerStats {
                player,
                puzzles_solved: 1,
                total_time: time_taken,
                last_active: current_time,
                rewards_earned: puzzle.reward_amount,
            };
            table::add(&mut game.leaderboard, player, new_stats);
        }
        
        // Emit event
        event::emit(PuzzleSolved {
            player,
            puzzle_id: object::id(puzzle),
            time_taken,
        });
    }

    public fun advance_to_next_room(
        room: &Room,
        player_progress: &mut PlayerProgress,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let player = tx_context::sender(ctx);
        assert!(player == player_progress.player, EUnauthorized);
        
        // Check if all puzzles in the room are solved
        let all_solved = true;
        let i = 0;
        let len = vector::length(&room.puzzles);
        
        while (i < len) {
            let puzzle_id = vector::borrow(&room.puzzles, i);
            if (!vector::contains(&player_progress.solved_puzzles, puzzle_id)) {
                all_solved = false;
                break;
            };
            i = i + 1;
        };
        
        assert!(all_solved, EInvalidSolution);
        
        // Check if there is a next room
        assert!(option::is_some(&room.next_room), EInvalidSolution);
        
        // Update player progress to next room
        player_progress.current_room = *option::borrow(&room.next_room);
        
        // Update checkpoint time
        player_progress.last_checkpoint = clock::timestamp_ms(clock) / 1000;
        
        // Emit event
        event::emit(RoomCompleted {
            player,
            room_id: object::id(room),
        });
    }

    public fun complete_game(
        game: &Game,
        player_progress: &PlayerProgress,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let player = tx_context::sender(ctx);
        assert!(player == player_progress.player, EUnauthorized);
        
        // Check if player is in the last room
        let last_room_idx = vector::length(&game.rooms) - 1;
        let last_room_id = vector::borrow(&game.rooms, last_room_idx);
        
        assert!(player_progress.current_room == *last_room_id, EInvalidSolution);
        
        // Check if all puzzles in the last room are solved
        // This would typically call a helper function to verify
        
        // Calculate total time
        let total_time = clock::timestamp_ms(clock) / 1000 - player_progress.start_time;
        
        // Get total rewards
        let player_stats = table::borrow(&game.leaderboard, player);
        let total_rewards = player_stats.rewards_earned;
        
        // Emit completion event
        event::emit(GameCompleted {
            player,
            total_time,
            total_rewards,
        });
    }

    // === View Functions ===
    
    public fun get_puzzle_hints(puzzle: &Puzzle): vector<String> {
        puzzle.hints
    }
    
    public fun get_leaderboard_entry(game: &Game, player: address): Option<PlayerStats> {
        if (table::contains(&game.leaderboard, player)) {
            option::some(*table::borrow(&game.leaderboard, player))
        } else {
            option::none()
        }
    }

    public fun get_player_progress(progress: &PlayerProgress): (address, ID, vector<ID>, u64) {
        (
            progress.player,
            progress.current_room,
            progress.solved_puzzles,
            progress.start_time
        )
    }
} 