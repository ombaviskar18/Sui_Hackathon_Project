"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Enhanced mock leaderboard data with more details
const MOCK_LEADERBOARD = [
  {
    id: 1,
    player: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    username: "CryptoMaster",
    puzzlesSolved: 10,
    totalTime: 1250,
    rewards: 500,
    country: "🇺🇸",
    achievements: ["🎯", "🔥", "⚡"],
    lastPlayed: "2 hours ago",
    winStreak: 5
  },
  {
    id: 2,
    player: "0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a0",
    username: "CodeBreaker",
    puzzlesSolved: 9,
    totalTime: 1350,
    rewards: 480,
    country: "🇬🇧",
    achievements: ["🎯", "🔥"],
    lastPlayed: "5 hours ago",
    winStreak: 3
  },
  {
    id: 3,
    player: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
    username: "PuzzleSolver",
    puzzlesSolved: 8,
    totalTime: 1100,
    rewards: 400,
    country: "🇯🇵",
    achievements: ["🎯"],
    lastPlayed: "1 day ago",
    winStreak: 2
  },
  {
    id: 4,
    player: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
    username: "HashHunter",
    puzzlesSolved: 7,
    totalTime: 1500,
    rewards: 350,
    country: "🇩🇪",
    achievements: ["🔥"],
    lastPlayed: "2 days ago",
    winStreak: 1
  },
  {
    id: 5,
    player: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
    username: "CipherSage",
    puzzlesSolved: 6,
    totalTime: 900,
    rewards: 300,
    country: "🇨🇦",
    achievements: ["⚡"],
    lastPlayed: "3 days ago",
    winStreak: 4
  },
  {
    id: 6,
    player: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d",
    username: "KeyFinder",
    puzzlesSolved: 5,
    totalTime: 2100,
    rewards: 250,
    country: "🇫🇷",
    achievements: [],
    lastPlayed: "1 week ago",
    winStreak: 0
  }
];

// Format time from seconds to mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// Format address to shorter version
const formatAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<'rewards' | 'time' | 'puzzles'>('rewards');
  const [sortedData, setSortedData] = useState(MOCK_LEADERBOARD);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  
  // Sort data when sort criteria changes
  useEffect(() => {
    const sorted = [...MOCK_LEADERBOARD];
    
    if (sortBy === 'rewards') {
      sorted.sort((a, b) => b.rewards - a.rewards);
    } else if (sortBy === 'time') {
      sorted.sort((a, b) => a.totalTime - b.totalTime);
    } else if (sortBy === 'puzzles') {
      sorted.sort((a, b) => b.puzzlesSolved - a.puzzlesSolved);
    }
    
    setSortedData(sorted);
  }, [sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return { icon: "🏆", color: "text-yellow-400", bg: "bg-yellow-500/20" };
      case 1: return { icon: "🥈", color: "text-gray-300", bg: "bg-gray-500/20" };
      case 2: return { icon: "🥉", color: "text-orange-400", bg: "bg-orange-500/20" };
      default: return { icon: `#${index + 1}`, color: "text-gray-400", bg: "bg-gray-700/20" };
    }
  };

  const sortOptions: { key: 'rewards' | 'time' | 'puzzles'; label: string; icon: string }[] = [
    { key: 'rewards', label: 'Rewards', icon: '🏆' },
    { key: 'time', label: 'Speed', icon: '⚡' },
    { key: 'puzzles', label: 'Puzzles', icon: '🧩' }
  ];

  return (
    <main className="relative min-h-screen bg-black pt-navbar">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-8"></div>
        <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-3"></div>
        
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Enhanced Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.h1 
              className="display-font text-5xl sm:text-6xl lg:text-7xl font-black mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-red-500 escape-glow-text">
                HALL OF
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-red-600 escape-glow-white">
                CHAMPIONS
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Elite cryptographers who conquered the most challenging puzzles
            </motion.p>

            {/* Stats overview */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
            >
              <div className="escape-card p-6 text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-red-400 display-font">{MOCK_LEADERBOARD.length}</div>
                <div className="text-gray-300">Active Players</div>
              </div>
              <div className="escape-card p-6 text-center">
                <div className="text-3xl mb-2">🧩</div>
                <div className="text-2xl font-bold text-white display-font">{MOCK_LEADERBOARD.reduce((acc, p) => acc + p.puzzlesSolved, 0)}</div>
                <div className="text-gray-300">Puzzles Solved</div>
              </div>
              <div className="escape-card p-6 text-center">
                <div className="text-3xl mb-2">💎</div>
                <div className="text-2xl font-bold text-red-400 display-font">{MOCK_LEADERBOARD.reduce((acc, p) => acc + p.rewards, 0)}</div>
                <div className="text-gray-300">Total Rewards</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Sort Options */}
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <div className="flex justify-center gap-4 flex-wrap">
              {sortOptions.map((sort) => (
                <motion.button
                  key={sort.key}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy(sort.key)}
                  className={`px-8 py-4 rounded-xl font-bold display-font transition-all duration-300 ${
                    sortBy === sort.key 
                      ? 'escape-button text-white shadow-2xl shadow-red-500/30' 
                      : 'escape-button-secondary hover:shadow-lg hover:shadow-red-500/20'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xl">{sort.icon}</span>
                    <span>Sort by {sort.label}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Professional Leaderboard Table */}
          <motion.div 
  variants={itemVariants}
  className="escape-card overflow-hidden"
>
  {/* Table Header */}
  <div className="flex items-center bg-red-900/20 border-b-2 border-red-700/50 font-bold display-font text-sm text-red-400">
    <div className="w-20 text-center py-4 px-3 border-r border-red-700/30">
      <span>RANK</span>
    </div>
    <div className="flex-1 px-4 py-4 border-r border-red-700/30">
      <span>PLAYER</span>
    </div>
    <div className="w-28 text-center py-4 px-3 border-r border-red-700/30">
      <span>PUZZLES</span>
    </div>
    <div className="w-28 text-center py-4 px-3 border-r border-red-700/30">
      <span>TIME</span>
    </div>
    <div className="w-32 text-center py-4 px-3 border-r border-red-700/30">
      <span>REWARDS</span>
    </div>
    <div className="w-24 text-center py-4 px-3">
      <span>STREAK</span>
    </div>
  </div>

  {/* Table Body */}
  <div>
    {sortedData.map((entry, index) => {
      const rank = getRankIcon(index);
      const isSelected = selectedPlayer === entry.id;

      return (
        <motion.div
          key={entry.id}
          variants={itemVariants}
          whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.05)" }}
          onClick={() => setSelectedPlayer(isSelected ? null : entry.id)}
          className={`flex items-center border-b border-red-800/30 transition-all duration-300 cursor-pointer hover:bg-red-600/5 ${
            index === 0 ? 'bg-yellow-500/5' :
            index === 1 ? 'bg-gray-500/5' :
            index === 2 ? 'bg-orange-500/5' : ''
          } ${isSelected ? 'bg-red-500/10 border-l-4 border-red-500' : ''}`}
        >
          {/* Rank Column */}
          <div className="w-20 flex justify-center py-4 px-3 border-r border-red-800/20">
            <div className={`w-12 h-12 rounded-full ${rank.bg} flex items-center justify-center`}>
              <span className={`${rank.color} font-bold text-lg display-font`}>
                {rank.icon}
              </span>
            </div>
          </div>

          {/* Player Info Column */}
          <div className="flex-1 flex items-center space-x-3 py-4 px-4 border-r border-red-800/20">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {entry.username.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-bold text-white display-font text-lg truncate">{entry.username}</span>
                <span className="text-lg">{entry.country}</span>
              </div>
              <div className="text-xs text-gray-400 mono-font truncate">{formatAddress(entry.player)}</div>
              <div className="text-xs text-gray-500 truncate">Last: {entry.lastPlayed}</div>
            </div>
          </div>

          {/* Puzzles Column */}
          <div className="w-28 text-center py-4 px-3 border-r border-red-800/20">
            <div className="text-2xl font-bold text-red-400 display-font">{entry.puzzlesSolved}</div>
            <div className="text-xs text-gray-400">solved</div>
          </div>

          {/* Time Column */}
          <div className="w-28 text-center py-4 px-3 border-r border-red-800/20">
            <div className="text-lg font-bold text-white mono-font">{formatTime(entry.totalTime)}</div>
            <div className="text-xs text-gray-400">best time</div>
          </div>

          {/* Rewards Column */}
          <div className="w-32 text-center py-4 px-3 border-r border-red-800/20">
            <div className="flex items-center justify-center text-red-400 mb-1">
              <span className="text-xl font-bold display-font">{entry.rewards}</span>
              <span className="ml-1 text-lg">💎</span>
            </div>
            <div className="text-xs text-gray-400">rewards</div>
          </div>

          {/* Streak Column */}
          <div className="w-24 text-center py-4 px-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              {entry.achievements.length > 0 && (
                <span className="text-lg">{entry.achievements[0]}</span>
              )}
            </div>
            <div className="text-xs text-gray-400">
              🔥 {entry.winStreak}
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
</motion.div>


          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16 p-8 escape-card max-w-4xl mx-auto"
          >
            <h3 className="display-font text-2xl font-bold mb-4 text-red-400">
              🎯 Think You Can Make It to the Top?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Join the elite ranks of cryptographic masters. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/game" className="escape-button py-4 px-8 display-font text-lg">
                  🚀 Start Challenge
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/pricing" className="escape-button-secondary py-4 px-8 display-font text-lg">
                  💎 View Pricing
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 