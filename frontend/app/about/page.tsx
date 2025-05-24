"use client";

import { motion } from "framer-motion";

const aboutCards = [
  {
    id: "structure",
    title: "🗝️ Game Structure",
    subtitle: "Progressive Cryptographic Escape Rooms",
    description:
      "Navigate through a series of themed rooms, each representing a unique cryptographic concept. Solve puzzles in each room to unlock clues and progress to the next stage. Difficulty increases as you advance, encouraging learning and mastery.",
    features: [
      "Multiple rooms/stages, each themed around a cryptographic topic",
      "Puzzles on symmetric encryption, public-key cryptography, digital signatures, zero-knowledge proofs, and more",
      "Clues and narrative flow between rooms",
      "Progressive challenge system"
    ]
  },
  {
    id: "onchain",
    title: "🔗 On-chain Logic",
    subtitle: "Decentralized, Transparent, and Trustless",
    description:
      "All puzzles, clues, and game logic are hosted on the Sui blockchain. Smart contracts validate every solution, ensuring only correct answers unlock the next room. Every interaction is recorded immutably, guaranteeing fairness and transparency.",
    features: [
      "Blockchain-hosted puzzles and clues",
      "Smart contract validation for every solution",
      "Transaction-based submissions",
      "Immutable, transparent game progress"
    ]
  },
  {
    id: "crypto",
    title: "🔒 Cryptographic Elements",
    subtitle: "Real-World Crypto Skills & Tools",
    description:
      "Experience chained puzzles, encrypted clues, and the use of real cryptographic tools. Players must decrypt messages, use wallets, and apply cryptographic techniques to progress, gaining hands-on experience with real-world crypto concepts.",
    features: [
      "Chained, interconnected puzzles",
      "Encrypted and encoded clues",
      "Use of wallets, key generators, and cryptographic tools",
      "Critical thinking and real-world crypto application"
    ]
  }
];

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

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black pt-navbar">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-8"></div>
        <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-3"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              className="display-font text-5xl sm:text-6xl lg:text-7xl font-black mb-6"
              variants={cardVariants}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-red-500 escape-glow-text">
                ABOUT THE GAME
              </span>
            </motion.h1>
            <motion.p
              variants={cardVariants}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Cryptographic Escape Game is a decentralized, interactive puzzle adventure built on the Sui blockchain. Explore, solve, and learn cryptography in a trustless, transparent environment.
            </motion.p>
          </div>
          {/* About Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch max-w-4xl mx-auto"
          >
            {aboutCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={
                  "relative flex flex-col justify-between p-8 rounded-2xl border-2 min-h-[420px] transition-all duration-500 w-full bg-gradient-to-b from-gray-900/80 to-black border-red-800/50 hover:border-red-600/70"
                }
              >
                {/* Card header */}
                <div className="text-center mb-6">
                  <h3 className="display-font text-2xl font-bold mb-2 text-white">
                    {card.title}
                  </h3>
                  <div className="mb-2">
                    <span className="text-lg text-red-400 display-font font-semibold">
                      {card.subtitle}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                {/* Features list */}
                <div className="mb-6 flex-1">
                  <ul className="space-y-3">
                    {card.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                        className="flex items-start text-gray-200 text-sm"
                      >
                        <span className="text-green-400 mr-3 mt-0.5 flex-shrink-0">✓</span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA section */}
          <motion.div
            variants={cardVariants}
            className="text-center mt-16 p-8 escape-card max-w-3xl mx-auto"
          >
            <h3 className="display-font text-2xl font-bold mb-4 text-red-400">
              🚪 Ready to Escape?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Dive into the world of cryptography, solve puzzles, and unlock the secrets of the blockchain. Start your adventure now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="/game" className="escape-button py-3 px-8 display-font">
                  🗝️ Start Playing
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="/pricing" className="escape-button-secondary py-3 px-8 display-font">
                  💎 View Pricing
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 