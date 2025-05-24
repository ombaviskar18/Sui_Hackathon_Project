"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      id: "explorer",
      name: "🔍 Explorer",
      price: "Free",
      period: "forever",
      description: "Perfect for curious minds who want to experience basic cryptographic challenges",
      popular: false,
      features: [
        "🏛️ Access to 2 themed rooms",
        "🧩 5 basic puzzles",
        "🎯 Basic scoring system",
        "📱 Mobile compatible",
        "💾 Local progress save",
        "🔤 Caesar cipher challenges",
        "⏱️ No time limits"
      ],
      buttonText: "Start Exploring",
      buttonClass: "escape-button"
    },
    {
      id: "cryptographer",
      name: "🔐 Cryptographer",
      price: "$29",
      period: "per adventure",
      description: "Enhanced tools and exclusive content for serious puzzle solvers",
      popular: true,
      features: [
        "🏛️ All 5 themed rooms",
        "🧩 Complete 10 puzzle collection",
        "🏆 Global leaderboard access",
        "💡 Advanced hint system",
        "🔗 Blockchain verification",
        "📊 Detailed analytics",
        "🎖️ Achievement badges",
        "🔒 Hash & XOR challenges",
        "⚡ Priority support"
      ],
      buttonText: "Become Cryptographer",
      buttonClass: "escape-button"
    },
    {
      id: "master",
      name: "🎭 Master Decoder",
      price: "$59",
      period: "lifetime access",
      description: "Ultimate experience with exclusive content and advanced features",
      popular: false,
      features: [
        "🌟 Everything in Cryptographer",
        "🎯 Exclusive master challenges",
        "🔮 Early access to new rooms",
        "👥 Private group competitions",
        "🎨 Custom room themes",
        "📈 Advanced progress tracking",
        "🎪 Special event access",
        "🏅 Elite leaderboard",
        "🤝 Direct developer access",
        "🎁 Exclusive NFT rewards"
      ],
      buttonText: "Unlock Master Access",
      buttonClass: "escape-button"
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
                UNLOCK YOUR
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-red-600 escape-glow-white">
                ADVENTURE
              </span>
            </motion.h1>
            
            <motion.p
              variants={cardVariants}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Choose your path in the cryptographic escape game. Each tier unlocks new challenges and exclusive content.
            </motion.p>
          </div>
          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch max-w-4xl mx-auto"
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredPlan(plan.id)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative flex flex-col justify-between p-8 rounded-2xl border-2 min-h-[480px] transition-all duration-500 w-full bg-gradient-to-b from-gray-900/80 to-black ${
                  plan.popular
                    ? 'border-red-500 shadow-2xl shadow-red-500/20' :
                    'border-red-800/50 hover:border-red-600/70'
                } ${hoveredPlan === plan.id ? 'shadow-2xl shadow-red-500/30' : ''}`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold display-font shadow-lg">
                      🔥 MOST POPULAR
                    </div>
                  </div>
                )}
                {/* Plan header */}
                <div className="text-center mb-6">
                  <h3 className="display-font text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl sm:text-5xl font-black text-red-400 display-font">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 text-lg ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>
                {/* Features list */}
                <div className="mb-6 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
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
                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4"
                >
                  <Link
                    href="/game"
                    className={`w-full block text-center py-4 px-6 rounded-xl font-bold display-font transition-all duration-300 ${plan.buttonClass}`}
                  >
                    {plan.buttonText}
                  </Link>
                </motion.div>
                {/* Glow effect on hover */}
                {hoveredPlan === plan.id && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/20 to-red-800/20 pointer-events-none"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
          {/* Bottom CTA section */}
          <motion.div
            variants={cardVariants}
            className="text-center mt-16 p-8 escape-card max-w-3xl mx-auto"
          >
            <h3 className="display-font text-2xl font-bold mb-4 text-red-400">
              🎯 Ready to Test Your Skills?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of players who have already started their cryptographic journey. 
              Begin with the free Explorer tier and upgrade anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/game" className="escape-button py-3 px-8 display-font">
                  🚀 Start Free Adventure
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/leaderboard" className="escape-button-secondary py-3 px-8 display-font">
                  🏆 View Leaderboard
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 