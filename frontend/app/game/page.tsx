"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentAccount, useWallets, useConnectWallet } from "@mysten/dapp-kit";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import ClientOnlyConnectButton from "../components/ClientOnlyConnectButton";

// Types
interface Puzzle {
  id: string;
  name: string;
  description: string;
  type: string;
  challengeData: string | { input: string; output: string };
  hints: string[];
  solution: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
  theme: "cryptography" | "cybersecurity";
  puzzles: Puzzle[];
}

// Mock data for rooms and puzzles
const ROOMS: Room[] = [
  {
    id: "room1",
    name: "The Cipher Chamber",
    description: "A room filled with ancient encryption devices and mysterious symbols.",
    theme: "cryptography",
    puzzles: [
      {
        id: "puzzle1",
        name: "Caesar's Secret",
        description: "Decrypt the message using the Caesar cipher. The shift is 3.",
        type: "caesar",
        challengeData: "WKLV LV D VHFUHW PHVVDJH",
        hints: ["Look for a shift of 3", "A=D, B=E, C=F...", "Each letter shifts 3 positions forward"],
        solution: "this is a secret message"
      },
      {
        id: "puzzle2",
        name: "Hash Mystery",
        description: "Find the input that produces this MD5 hash: 5f4dcc3b5aa765d61d8327deb882cf99",
        type: "hash",
        challengeData: "5f4dcc3b5aa765d61d8327deb882cf99",
        hints: ["It is a common word", "Think about default passwords", "It is exactly 8 characters"],
        solution: "password"
      }
    ]
  },
  {
    id: "room2",
    name: "The Digital Vault",
    description: "A high-tech room with digital locks and security systems.",
    theme: "cybersecurity",
    puzzles: [
      {
        id: "puzzle3",
        name: "XOR Challenge",
        description: "Find the key that XORs with '01001011' to produce '10110100'",
        type: "xor",
        challengeData: { input: "01001011", output: "10110100" },
        hints: ["XOR each bit position", "If inputs are the same, result is 0", "XOR is commutative"],
        solution: "11111111"
      },
      {
        id: "puzzle4",
        name: "Binary Decoder",
        description: "Convert this binary to text: 01001000 01100101 01101100 01101100 01101111",
        type: "binary",
        challengeData: "01001000 01100101 01101100 01101100 01101111",
        hints: ["Each 8-bit group is one ASCII character", "H=72, e=101, l=108...", "Use ASCII table"],
        solution: "Hello"
      }
    ]
  },
  {
    id: "room3",
    name: "The Steganography Lab",
    description: "Hidden messages and secret communications await your discovery.",
    theme: "cryptography",
    puzzles: [
      {
        id: "puzzle5",
        name: "Hidden Message",
        description: "Extract the hidden message from: 'Take Every First Letter Each Time Here'",
        type: "steganography",
        challengeData: "Take Every First Letter Each Time Here",
        hints: ["Look at the first letter of each word", "What do the initials spell?", "T-E-F-L-E-T-H"],
        solution: "TEFLETH"
      },
      {
        id: "puzzle6",
        name: "Reverse Cipher",
        description: "Decode this reversed message: 'dlrow olleh'",
        type: "reverse",
        challengeData: "dlrow olleh",
        hints: ["Read it backwards", "Reverse the entire string", "What does it say when flipped?"],
        solution: "hello world"
      }
    ]
  },
  {
    id: "room4",
    name: "The Frequency Analysis Center",
    description: "Crack codes using statistical analysis and pattern recognition.",
    theme: "cybersecurity",
    puzzles: [
      {
        id: "puzzle7",
        name: "Substitution Cipher",
        description: "Decode: 'FRGH EUHDNHU' (Hint: A=D, B=E, C=F...)",
        type: "substitution",
        challengeData: "FRGH EUHDNHU",
        hints: ["Each letter is shifted by 3", "F=C, R=O, G=D, H=E", "Break it into two words"],
        solution: "CODE BREAKER"
      },
      {
        id: "puzzle8",
        name: "Hexadecimal Secret",
        description: "Convert hex to text: '4861636B6572'",
        type: "hex",
        challengeData: "4861636B6572",
        hints: ["Convert hexadecimal to ASCII", "48=H, 61=a, 63=c...", "Each pair of hex digits = 1 character"],
        solution: "Hacker"
      }
    ]
  },
  {
    id: "room5",
    name: "The Quantum Encryption Facility",
    description: "Advanced quantum-level puzzles for the master cryptographers.",
    theme: "cryptography",
    puzzles: [
      {
        id: "puzzle9",
        name: "ROT13 Challenge",
        description: "Decode this ROT13 message: 'Lbh ner njrfbzr!'",
        type: "rot13",
        challengeData: "Lbh ner njrfbzr!",
        hints: ["ROT13 rotates each letter by 13 positions", "A becomes N, B becomes O...", "Apply the same shift to decode"],
        solution: "You are awesome!"
      },
      {
        id: "puzzle10",
        name: "Base64 Mystery",
        description: "Decode this Base64: 'Q3J5cHRvZ3JhcGh5'",
        type: "base64",
        challengeData: "Q3J5cHRvZ3JhcGh5",
        hints: ["This is Base64 encoding", "Use Base64 decoding", "It's a familiar word"],
        solution: "Cryptography"
      }
    ]
  }
];

// 3D Room Environment
function RoomEnvironment({ theme }: { theme: "cryptography" | "cybersecurity" }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      
      {/* Room walls */}
      <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color={theme === "cryptography" ? "#1a1a2e" : "#0a192f"} />
      </mesh>
      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color={theme === "cryptography" ? "#16213e" : "#172a45"} />
      </mesh>
      <mesh position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color={theme === "cryptography" ? "#16213e" : "#172a45"} />
      </mesh>
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[10, 10, 0.2]} />
        <meshStandardMaterial color={theme === "cryptography" ? "#0f3460" : "#2d3748"} />
      </mesh>
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[10, 10, 0.2]} />
        <meshStandardMaterial color={theme === "cryptography" ? "#0f3460" : "#2d3748"} />
      </mesh>
      
      {/* Decorative elements */}
      {theme === "cryptography" ? (
        <>
          <mesh position={[-3, 0, -4.5]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
            <meshStandardMaterial color="#e94560" />
          </mesh>
          <mesh position={[3, 0, -4.5]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
            <meshStandardMaterial color="#e94560" />
          </mesh>
        </>
      ) : (
        <mesh position={[0, 0, -4.5]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#4299e1" opacity={0.7} transparent />
        </mesh>
      )}
    </group>
  );
}

// Main Game Component
export default function GamePage() {
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);
  const [activePuzzleIndex, setActivePuzzleIndex] = useState<number | null>(null);
  const [solution, setSolution] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [solvedPuzzles, setSolvedPuzzles] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
  const account = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connectWallet } = useConnectWallet();
  const currentRoom = ROOMS[currentRoomIndex];
  
  // Debug wallet connection
  useEffect(() => {
    console.log('Wallet Debug Info:');
    console.log('Current Account:', account);
    console.log('Available Wallets:', wallets);
    console.log('Account Address:', account?.address);
  }, [account, wallets]);
  
  // Check if all puzzles in the room are solved
  const allPuzzlesSolved = currentRoom?.puzzles.every(puzzle => 
    solvedPuzzles.includes(puzzle.id)
  );
  
  // Handle puzzle solution submission
  const handleSubmitSolution = () => {
    if (activePuzzleIndex === null) return;
    
    const puzzle = currentRoom.puzzles[activePuzzleIndex];
    const isCorrect = solution.toLowerCase().trim() === puzzle.solution.toLowerCase();
    
    if (isCorrect) {
      setFeedback("🎉 Correct! Puzzle solved.");
      setSolvedPuzzles([...solvedPuzzles, puzzle.id]);
      const newScore = score + 100;
      setScore(newScore);
      
      // Save score to localStorage for navbar
      localStorage.setItem('cryptoEscape_score', newScore.toString());
      
      // Reset after a delay
      setTimeout(() => {
        setActivePuzzleIndex(null);
        setSolution("");
        setFeedback("");
        setShowHint(false);
        setHintIndex(0);
      }, 2000);
    } else {
      setFeedback("❌ Incorrect solution. Try again.");
      setTimeout(() => setFeedback(""), 3000);
    }
  };
  
  // Move to next room
  const handleNextRoom = () => {
    if (currentRoomIndex < ROOMS.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
      setActivePuzzleIndex(null);
      setSolution("");
      setFeedback("");
      setShowHint(false);
      setHintIndex(0);
    } else {
      setFeedback("🏆 Congratulations! You've completed all rooms!");
    }
  };
  
  // Show next hint
  const handleShowHint = () => {
    if (activePuzzleIndex === null) return;
    
    const puzzle = currentRoom.puzzles[activePuzzleIndex];
    if (!showHint) {
      setShowHint(true);
      setHintIndex(0);
    } else {
      if (hintIndex < puzzle.hints.length - 1) {
        setHintIndex(hintIndex + 1);
      } else {
        setHintIndex(0);
      }
    }
  };

  // Start the game
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Reset game
  const handleResetGame = () => {
    setCurrentRoomIndex(0);
    setActivePuzzleIndex(null);
    setSolution("");
    setFeedback("");
    setShowHint(false);
    setHintIndex(0);
    setSolvedPuzzles([]);
    setGameStarted(false);
    setScore(0);
    
    // Clear score from localStorage
    localStorage.removeItem('cryptoEscape_score');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>
      
      {/* Game content */}
      <div className="relative z-10 escape-container p-6">
        {!account ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="escape-card p-12 max-w-2xl mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-6"
              >
                🔐
              </motion.div>
              <h2 className="display-font text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-white">
                Connect Your Wallet to Play
              </h2>
              <p className="mb-8 text-gray-300 text-lg leading-relaxed">
                You need to connect your Sui wallet to start the cryptographic adventure. 
                Solve puzzles, unlock rooms, and prove your cryptographic mastery!
              </p>
              
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-4"
                >
                  <ClientOnlyConnectButton />
                </motion.div>
                
                {wallets.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Available Wallets:</p>
                    {wallets.map((wallet) => (
                      <motion.button
                        key={wallet.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => connectWallet({ wallet })}
                        className="w-full p-3 escape-card hover:border-red-500/50 text-sm"
                      >
                        Connect {wallet.name}
                      </motion.button>
                    ))}
                  </div>
                )}
                
                {wallets.length === 0 && (
                  <div className="mt-4 p-4 bg-red-900/30 border border-red-600/50 rounded-lg">
                    <p className="text-red-300 text-sm">
                      No Sui wallets detected. Please install a Sui wallet extension like Sui Wallet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : !gameStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="escape-card p-12 max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="display-font text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-white"
              >
                🎮 Welcome to the Cryptographic Escape Game!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8 text-gray-200 text-xl leading-relaxed"
              >
                Connected as: <span className="mono-font text-red-400">{account?.address}</span>
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="escape-card p-6"
                >
                  <h3 className="display-font text-2xl font-bold mb-3 text-red-400">🏛️ {ROOMS.length} Themed Rooms</h3>
                  <p className="text-gray-200">Navigate through cryptography and cybersecurity chambers</p>
                  <div className="mt-3 text-sm text-red-300">
                    Total Puzzles: {ROOMS.reduce((total, room) => total + room.puzzles.length, 0)}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="escape-card p-6"
                >
                  <h3 className="display-font text-2xl font-bold mb-3 text-white">🧩 Multiple Puzzle Types</h3>
                  <p className="text-gray-200">Caesar ciphers, hash challenges, XOR puzzles, steganography, and more</p>
                  <div className="mt-3 text-sm text-red-300">
                    Score points for each solved puzzle!
                  </div>
                </motion.div>
              </div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartGame}
                className="escape-button py-4 px-8 text-xl font-bold display-font"
              >
                🚀 START YOUR ADVENTURE
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar - Room info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-900/40 backdrop-blur-lg p-6 rounded-xl border border-blue-700/50 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">
                      {currentRoom.theme === "cryptography" ? "🏛️" : "🏢"}
                    </span>
                    <h2 className="text-xl font-bold text-blue-300">{currentRoom.name}</h2>
                  </div>
                  <div className="text-sm text-gray-400">
                    Room {currentRoomIndex + 1}/{ROOMS.length}
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm">{currentRoom.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-blue-200 flex items-center">
                    🧩 Puzzles ({solvedPuzzles.filter(id => currentRoom.puzzles.some(p => p.id === id)).length}/{currentRoom.puzzles.length}):
                  </h3>
                  <ul className="space-y-3">
                    {currentRoom.puzzles.map((puzzle, index) => (
                      <li key={puzzle.id}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setActivePuzzleIndex(index);
                            setSolution("");
                            setFeedback("");
                            setShowHint(false);
                            setHintIndex(0);
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-300 text-sm ${
                            solvedPuzzles.includes(puzzle.id)
                              ? "bg-green-800/50 text-green-300 border border-green-600/50"
                              : activePuzzleIndex === index
                              ? "bg-blue-700/50 text-blue-200 border border-blue-500/50"
                              : "bg-blue-800/30 hover:bg-blue-700/50 border border-blue-600/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center">
                              {solvedPuzzles.includes(puzzle.id) ? (
                                <span className="text-lg mr-2">✅</span>
                              ) : (
                                <span className="text-lg mr-2">🔒</span>
                              )}
                              <span className="font-medium">{puzzle.name}</span>
                            </span>
                            {activePuzzleIndex === index && (
                              <span className="text-blue-400">👁️</span>
                            )}
                          </div>
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {allPuzzlesSolved && currentRoomIndex < ROOMS.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextRoom}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-sm mb-3"
                  >
                    🚪 Proceed to Next Room
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetGame}
                  className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-sm"
                >
                  🔄 Reset Game
                </motion.button>
                
                {allPuzzlesSolved && currentRoomIndex === ROOMS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gradient-to-r from-green-800/50 to-blue-800/50 border border-green-600/50 rounded-lg text-center mt-4"
                  >
                    <div className="text-3xl mb-2">🏆</div>
                    <h3 className="text-xl font-bold text-green-300 mb-2">Game Completed!</h3>
                    <p className="text-green-200 mb-1 text-sm">Final Score: {score} points</p>
                    <p className="text-green-200 text-sm">Congratulations! You've solved all puzzles!</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            {/* Center - 3D Room Visualization */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-900/20 backdrop-blur-sm rounded-xl shadow-2xl mb-6"
                style={{ height: "500px" }}
              >
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <RoomEnvironment theme={currentRoom.theme} />
                  <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
                </Canvas>
              </motion.div>
            </div>

            {/* Right sidebar - Active puzzle */}
            <div className="lg:col-span-1">
              <AnimatePresence>
                {activePuzzleIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-lg p-6 rounded-xl border border-blue-700/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🧩</span>
                        <h3 className="text-xl font-bold text-blue-300">
                          {currentRoom.puzzles[activePuzzleIndex].name}
                        </h3>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setActivePuzzleIndex(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </motion.button>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {currentRoom.puzzles[activePuzzleIndex].description}
                    </p>
                    
                    <div className="mb-4 p-4 bg-gray-900/70 rounded-lg border border-gray-700">
                      <h4 className="text-sm font-semibold uppercase text-gray-400 mb-3 flex items-center">
                        🎯 Challenge:
                      </h4>
                      <div className="font-mono text-blue-300 text-sm">
                        {typeof currentRoom.puzzles[activePuzzleIndex].challengeData === 'string' ? (
                          <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-500 break-all">
                            {currentRoom.puzzles[activePuzzleIndex].challengeData}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="bg-gray-800 p-3 rounded">
                              <span className="text-gray-400">Input:</span> {((currentRoom.puzzles[activePuzzleIndex].challengeData) as { input: string; output: string }).input}
                            </div>
                            <div className="bg-gray-800 p-3 rounded">
                              <span className="text-gray-400">Output:</span> {((currentRoom.puzzles[activePuzzleIndex].challengeData) as { input: string; output: string }).output}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="solution" className="block text-sm font-medium text-gray-300 mb-2">
                        💡 Your Solution:
                      </label>
                      <input
                        type="text"
                        id="solution"
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmitSolution()}
                        className="w-full p-3 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg"
                        placeholder="Enter your solution..."
                      />
                    </div>
                    
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-3 mb-4 rounded-lg font-medium text-sm ${
                          feedback.includes("Correct") || feedback.includes("🎉") 
                            ? "bg-green-900/50 text-green-300 border border-green-600/50" 
                            : "bg-red-900/50 text-red-300 border border-red-600/50"
                        }`}
                      >
                        {feedback}
                      </motion.div>
                    )}
                    
                    <div className="flex flex-col gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmitSolution}
                        className="py-3 px-4 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        disabled={!solution.trim()}
                      >
                        🔍 Submit Solution
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShowHint}
                        className="py-2 px-4 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 rounded-lg font-medium text-sm shadow-lg"
                      >
                        💡 {showHint ? "Next Hint" : "Get Hint"}
                      </motion.button>
                    </div>
                    
                    <AnimatePresence>
                      {showHint && activePuzzleIndex !== null && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-3 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-600/50"
                        >
                          <p className="text-yellow-300 text-sm">
                            <span className="font-semibold">💡 Hint {hintIndex + 1}/{currentRoom.puzzles[activePuzzleIndex].hints.length}:</span>{" "}
                            {currentRoom.puzzles[activePuzzleIndex].hints[hintIndex]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
      <div className="smoke-animate" />
    </div>
  );
} 
