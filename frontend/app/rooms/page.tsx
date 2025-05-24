"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CreateRoomPage() {
  const [formData, setFormData] = useState({
    roomName: "",
    roomDescription: "",
    difficulty: "medium",
    maxPlayers: 4,
    timeLimit: 60,
    roomType: "cryptography",
    puzzleCount: 5,
    entryFee: 0,
    rewards: 100,
    roomImage: "",
    roomTheme: "classic",
    isPrivate: false,
    password: "",
    tags: [] as string[],
    specialFeatures: [] as string[]
  });

  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Room Creation Data:", formData);
    alert("Room created successfully! (This is a demo)");
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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

  const difficultyLevels = [
    { value: "easy", label: "🟢 Easy", description: "Perfect for beginners" },
    { value: "medium", label: "🟡 Medium", description: "Moderate challenge" },
    { value: "hard", label: "🔴 Hard", description: "For experienced players" },
    { value: "expert", label: "⚫ Expert", description: "Ultimate challenge" }
  ];

  const roomTypes = [
    { value: "cryptography", label: "🔐 Cryptography", description: "Cipher and encryption puzzles" },
    { value: "mystery", label: "🕵️ Mystery", description: "Detective and investigation" },
    { value: "adventure", label: "🗺️ Adventure", description: "Exploration and discovery" },
    { value: "horror", label: "👻 Horror", description: "Spooky and thrilling" },
    { value: "sci-fi", label: "🚀 Sci-Fi", description: "Futuristic technology themes" }
  ];

  const roomThemes = [
    { value: "classic", label: "🏛️ Classic Escape Room" },
    { value: "cyberpunk", label: "🌐 Cyberpunk" },
    { value: "medieval", label: "⚔️ Medieval Castle" },
    { value: "space", label: "🌌 Space Station" },
    { value: "laboratory", label: "🧪 Mad Laboratory" },
    { value: "haunted", label: "👻 Haunted House" }
  ];

  return (
    <main className="min-h-screen bg-black relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-8"></div>
        <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-3"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Header Section */}
            <motion.div 
              variants={itemVariants}
              className="text-center space-y-8"
            >
              <div>
                <motion.h1 
                  className="display-font text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-red-500 escape-glow-text">
                    CREATE YOUR
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-red-600 escape-glow-white">
                    ESCAPE ROOM (Coming SOON)
                  </span>
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                >
                  Design the ultimate cryptographic challenge. Build puzzles, set difficulty, and create an unforgettable experience for players worldwide.
                </motion.p>
              </div>

              {/* Centered Room GIF */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <div className="relative w-64 h-48 sm:w-80 sm:h-60 lg:w-96 lg:h-72 rounded-xl overflow-hidden escape-card shadow-2xl">
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
              </motion.div>
            </motion.div>

            {/* Room Creation Form */}
            <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto"
            >
              <div className="escape-card p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h2 className="display-font text-xl sm:text-2xl font-bold text-red-400 mb-6 flex items-center">
                      📝 Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Room Name *</label>
                        <input
                          type="text"
                          name="roomName"
                          value={formData.roomName}
                          onChange={handleInputChange}
                          placeholder="Enter your room name..."
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Max Players</label>
                        <input
                          type="number"
                          name="maxPlayers"
                          value={formData.maxPlayers}
                          onChange={handleInputChange}
                          min="1"
                          max="10"
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-bold text-white mb-2">Room Description *</label>
                      <textarea
                        name="roomDescription"
                        value={formData.roomDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your escape room experience..."
                        rows={4}
                        className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Game Settings */}
                  <div>
                    <h2 className="display-font text-xl sm:text-2xl font-bold text-red-400 mb-6 flex items-center">
                      ⚙️ Game Settings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Difficulty Level</label>
                        <select
                          name="difficulty"
                          value={formData.difficulty}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        >
                          {difficultyLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Time Limit (minutes)</label>
                        <input
                          type="number"
                          name="timeLimit"
                          value={formData.timeLimit}
                          onChange={handleInputChange}
                          min="10"
                          max="180"
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Number of Puzzles</label>
                        <input
                          type="number"
                          name="puzzleCount"
                          value={formData.puzzleCount}
                          onChange={handleInputChange}
                          min="3"
                          max="15"
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room Design */}
                  <div>
                    <h2 className="display-font text-xl sm:text-2xl font-bold text-red-400 mb-6 flex items-center">
                      🎨 Room Design
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Room Type</label>
                        <select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        >
                          {roomTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Room Theme</label>
                        <select
                          name="roomTheme"
                          value={formData.roomTheme}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        >
                          {roomThemes.map(theme => (
                            <option key={theme.value} value={theme.value}>
                              {theme.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Rewards & Pricing */}
                  <div>
                    <h2 className="display-font text-xl sm:text-2xl font-bold text-red-400 mb-6 flex items-center">
                      💰 Rewards & Pricing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Entry Fee (tokens)</label>
                        <input
                          type="number"
                          name="entryFee"
                          value={formData.entryFee}
                          onChange={handleInputChange}
                          min="0"
                          max="1000"
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Completion Reward</label>
                        <input
                          type="number"
                          name="rewards"
                          value={formData.rewards}
                          onChange={handleInputChange}
                          min="0"
                          max="5000"
                          className="w-full p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white focus:border-red-500 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div>
                    <h2 className="display-font text-xl sm:text-2xl font-bold text-red-400 mb-6 flex items-center">
                      🔒 Privacy Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="isPrivate"
                          id="isPrivate"
                          checked={formData.isPrivate}
                          onChange={handleInputChange}
                          className="w-5 h-5 bg-gray-900/50 border border-red-600/30 rounded text-red-500 focus:ring-red-500"
                        />
                        <label htmlFor="isPrivate" className="text-white font-medium">
                          Make this room private (requires password)
                        </label>
                      </div>
                      
                      {formData.isPrivate && (
                        <div className="mt-4">
                          <label className="block text-sm font-bold text-white mb-2">Room Password</label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter room password..."
                            className="w-full max-w-md p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-all"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags & Features */}
                  <div>
                    <h2 className="display-font text-xl sm:text-2xl font-bold text-red-400 mb-6 flex items-center">
                      🏷️ Tags & Features
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-white mb-2">Add Tags</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            placeholder="Enter a tag..."
                            className="flex-1 p-3 bg-gray-900/50 border border-red-600/30 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-all"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          />
                          <button
                            type="button"
                            onClick={addTag}
                            className="px-6 py-3 escape-button-secondary whitespace-nowrap"
                          >
                            Add Tag
                          </button>
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {formData.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-sm flex items-center space-x-2"
                              >
                                <span>{tag}</span>
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="text-red-400 hover:text-red-300 ml-1"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Section */}
                  <div className="pt-8 border-t border-red-800/30">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`py-4 px-8 escape-button display-font text-lg ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? '🔄 Creating Room...' : '🚀 Create Escape Room'}
                      </motion.button>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/" className="inline-block py-4 px-8 escape-button-secondary display-font text-lg">
                          📋 Save as Draft
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 