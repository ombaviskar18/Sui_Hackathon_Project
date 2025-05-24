"use client";

import { motion } from "framer-motion";
import ClientOnlyConnectButton from "./components/ClientOnlyConnectButton";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black stable-layout">
      {/* Static background elements - no animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-8"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-3"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen escape-container py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl w-full mx-auto"
        >
          <motion.div className="space-y-12 text-center">
            {/* Hero section */}
            <div className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                <motion.h1
                  className="display-font text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-red-500 escape-glow-text">
                    THE CRYPTOGRAPHIC
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-red-600 escape-glow-white">
                    ESCAPE GAME 🔐
                  </span>
                </motion.h1>
                
                <motion.p
                  variants={itemVariants}
                  className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-200 max-w-4xl mx-auto leading-relaxed"
                >
                  <motion.span 
                    className="font-bold text-red-400 escape-glow-text"
                    whileHover={{ scale: 1.1, color: "#ef4444" }}
                  >
                    DECODE
                  </motion.span>
                  {" "}the mysteries.{" "}
                  <span className="font-bold text-white escape-glow-white">SOLVE</span>
                  {" "}the puzzles.{" "}
                  <span className="font-bold text-red-500 escape-glow-text">ESCAPE</span>
                  {" "}the blockchain.
                </motion.p>
              </motion.div>

              {/* Enhanced escape room visual */}
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-5xl mx-auto h-80 sm:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl escape-card smooth-transform"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Enhanced escape room scene */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-red-950/30">
                  {/* Room walls with depth */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-900/20 to-black opacity-80"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-950/30 to-black opacity-90"></div>
                    <div className="relative w-64 h-64 sm:w-96 sm:h-80 lg:w-[500px] lg:h-[350px] rounded-xl overflow-hidden shadow-2xl">
                      <Image
                        src="/images/room.gif"
                        alt="Escape Room Animation"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="display-font text-lg font-bold text-white mb-1">🎮 Interactive Room Preview</h3>
                        <p className="text-gray-200 text-sm">This could be your custom escape room!</p>
                      </div>
                    </div>
                    {/* Enhanced mysterious door with subtle glow */}
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-28 h-44 bg-gradient-to-b from-red-600 to-red-800 rounded-t-full border-4 border-red-500 shadow-2xl">
                      <div className="absolute right-3 top-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                      <div className="absolute right-4 top-1/2 transform translate-y-2 w-2 h-3 bg-black rounded-full"></div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>

            {/* Game action buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/game" className="escape-button py-6 px-12 text-2xl font-bold display-font">
                  🔐 START ADVENTURE
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/rooms" className="escape-button py-6 px-12 text-2xl font-bold display-font">
                  🏗️ CREATE ROOM
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/leaderboard" className="escape-button-secondary py-6 px-12 text-2xl font-bold display-font">
                  🏆 LEADERBOARD
                </Link>
              </motion.div>
            </motion.div>

            {/* Connect wallet */}
            {/* <motion.div
              variants={itemVariants}
              className="pt-8 gap-6"
            >
              <div className="escape-card p-8 max-w-md mx-auto">
                <h3 className="display-font text-xl font-bold mb-4 text-red-400">🔗 Connect Your Wallet</h3>
                <p className="text-gray-300 mb-6">Connect your Sui wallet to save progress and compete on the leaderboard</p>
                <ClientOnlyConnectButton />
              </div>
            </motion.div> */}

            {/* Game features */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16"
            >
              <div className="escape-card p-8 text-center">
                <h3 className="display-font text-xl font-bold mb-4 text-red-400">🔗 Connect Your Wallet</h3>
                <p className="text-gray-300 mb-6">Connect your Sui wallet to save progress and compete on the leaderboard</p>
                <ClientOnlyConnectButton />
              </div>

              <div className="escape-card p-6 text-center">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="display-font text-xl font-bold mb-2 text-red-400">5 Themed Rooms</h3>
                <p className="text-gray-300">Navigate through cryptography and cybersecurity chambers</p>
              </div>
              
              <div className="escape-card p-6 text-center">
                <div className="text-4xl mb-4">🧩</div>
                <h3 className="display-font text-xl font-bold mb-2 text-white">10 Unique Puzzles</h3>
                <p className="text-gray-300">Caesar ciphers, hash challenges, XOR puzzles, and more</p>
              </div>
              
              <div className="escape-card p-6 text-center">
                <div className="text-4xl mb-4">⛓️</div>
                <h3 className="display-font text-xl font-bold mb-2 text-red-400">Blockchain Verified</h3>
                <p className="text-gray-300">Built on Sui blockchain for true decentralization</p>
              </div>
              
              <div className="escape-card p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="display-font text-xl font-bold mb-2 text-white">Competitive Scoring</h3>
                <p className="text-gray-300">Compete with players worldwide on the leaderboard</p>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
              variants={itemVariants}
              className="pt-16 border-t border-red-800/30 gap-6 mt-16"
            >
              <div className="flex flex-col items-center space-y-4">
                <p className="text-gray-400 text-center">
                  © 2025 CRYPTOGRAPHIC ESCAPE GAME.
                </p>
                <p className="text-red-400 text-center flex items-center">
                  ❤️ MADE WITH LOVE FOR CRYPTO COMMUNITY
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 