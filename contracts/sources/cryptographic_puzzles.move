module crypto_escape_game::cryptographic_puzzles {
    use std::vector;
    use std::string::{Self, String};
    use sui::hash::{Self, blake2b256};
    
    // Different types of cryptographic puzzle implementations
    
    // Hash preimage puzzle: Player must find a value that hashes to a specific output
    public fun create_hash_preimage_challenge(salt: vector<u8>, target_hash: vector<u8>): vector<u8> {
        // Combine salt and target hash as the challenge
        let challenge = vector::empty<u8>();
        vector::append(&mut challenge, salt);
        vector::append(&mut challenge, target_hash);
        challenge
    }
    
    public fun verify_hash_preimage(challenge: vector<u8>, solution: vector<u8>): bool {
        // Extract salt from challenge
        let salt_length = 16; // Assuming 16 byte salt
        let salt = vector::empty<u8>();
        let i = 0;
        while (i < salt_length) {
            vector::push_back(&mut salt, *vector::borrow(&challenge, i));
            i = i + 1;
        };
        
        // Extract target hash from challenge
        let target_hash = vector::empty<u8>();
        while (i < vector::length(&challenge)) {
            vector::push_back(&mut target_hash, *vector::borrow(&challenge, i));
            i = i + 1;
        };
        
        // Hash solution with salt
        let solution_with_salt = vector::empty<u8>();
        vector::append(&mut solution_with_salt, salt);
        vector::append(&mut solution_with_salt, solution);
        let hashed_solution = hash::blake2b256(&solution_with_salt);
        
        // Compare hashed solution with target hash
        hashed_solution == target_hash
    }
    
    // Caesar cipher puzzle: Player must decrypt a message where each letter has been shifted by a fixed amount
    public fun create_caesar_cipher_challenge(plaintext: String, shift: u8): vector<u8> {
        let bytes = *string::bytes(&plaintext);
        let result = vector::empty<u8>();
        
        let i = 0;
        let len = vector::length(&bytes);
        
        while (i < len) {
            let char = *vector::borrow(&bytes, i);
            
            // Only shift alphabetic characters
            if (char >= 65 && char <= 90) { // Uppercase letters
                char = ((char - 65 + (shift as u8)) % 26) + 65;
            } else if (char >= 97 && char <= 122) { // Lowercase letters
                char = ((char - 97 + (shift as u8)) % 26) + 97;
            };
            
            vector::push_back(&mut result, char);
            i = i + 1;
        };
        
        // Encode challenge: first byte is shift, remaining bytes are ciphertext
        let challenge = vector::empty<u8>();
        vector::push_back(&mut challenge, shift);
        vector::append(&mut challenge, result);
        
        challenge
    }
    
    public fun verify_caesar_solution(challenge: vector<u8>, solution: vector<u8>): bool {
        // First byte is the shift
        let shift = *vector::borrow(&challenge, 0);
        
        // Create the expected solution by decrypting the ciphertext
        let ciphertext = vector::empty<u8>();
        let i = 1; // Skip the first byte (shift)
        while (i < vector::length(&challenge)) {
            vector::push_back(&mut ciphertext, *vector::borrow(&challenge, i));
            i = i + 1;
        };
        
        let plaintext = vector::empty<u8>();
        i = 0;
        let len = vector::length(&ciphertext);
        
        while (i < len) {
            let char = *vector::borrow(&ciphertext, i);
            
            // Only shift alphabetic characters
            if (char >= 65 && char <= 90) { // Uppercase letters
                let new_char = char - shift;
                if (new_char < 65) {
                    new_char = new_char + 26;
                };
                char = new_char;
            } else if (char >= 97 && char <= 122) { // Lowercase letters
                let new_char = char - shift;
                if (new_char < 97) {
                    new_char = new_char + 26;
                };
                char = new_char;
            };
            
            vector::push_back(&mut plaintext, char);
            i = i + 1;
        };
        
        // Compare expected plaintext with the provided solution
        plaintext == solution
    }
    
    // XOR challenge: Player must find a value that, when XORed with a given value, produces a specific output
    public fun create_xor_challenge(target: vector<u8>, xor_key: vector<u8>): vector<u8> {
        let challenge = vector::empty<u8>();
        let i = 0;
        let target_len = vector::length(&target);
        let key_len = vector::length(&xor_key);
        
        while (i < target_len) {
            let target_byte = *vector::borrow(&target, i);
            let key_byte = *vector::borrow(&xor_key, i % key_len);
            let encrypted_byte = target_byte ^ key_byte;
            vector::push_back(&mut challenge, encrypted_byte);
            i = i + 1;
        };
        
        challenge
    }
    
    public fun verify_xor_solution(challenge: vector<u8>, solution: vector<u8>): bool {
        // XOR solution should match challenge
        if (vector::length(&challenge) != vector::length(&solution)) {
            return false
        };
        
        let i = 0;
        let len = vector::length(&challenge);
        
        while (i < len) {
            let challenge_byte = *vector::borrow(&challenge, i);
            let solution_byte = *vector::borrow(&solution, i);
            
            if (challenge_byte != solution_byte) {
                return false
            };
            
            i = i + 1;
        };
        
        true
    }
    
    // Generate hash for solution verification
    public fun generate_solution_hash(solution: vector<u8>): vector<u8> {
        hash::blake2b256(&solution)
    }
} 