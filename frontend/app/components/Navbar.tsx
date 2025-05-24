"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrentAccount } from "@mysten/dapp-kit";
import ClientOnlyConnectButton from './ClientOnlyConnectButton';

function Navbar() {
    const path = usePathname();
    const account = useCurrentAccount();
    const [score, setScore] = useState<number>(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Listen for score updates from localStorage or context
    useEffect(() => {
        const updateScore = () => {
            const savedScore = localStorage.getItem('cryptoEscape_score');
            if (savedScore) {
                setScore(parseInt(savedScore));
            }
        };

        updateScore();
        
        // Listen for storage changes
        window.addEventListener('storage', updateScore);
        
        // Poll for score updates when on game page
        let interval: NodeJS.Timeout;
        if (path === '/game') {
            interval = setInterval(updateScore, 1000);
        }

        return () => {
            window.removeEventListener('storage', updateScore);
            if (interval) clearInterval(interval);
        };
    }, [path]);

    const truncateAddress = (address: string) => {
        if (typeof address === 'string' && address.length > 8) {
            return `${address.slice(0, 4)}...${address.slice(-4)}`;
        }
        return 'Connect Wallet'; 
    };

    const navItems = [
        { href: '/game', label: '🎮 Play Games', icon: '🎮' },
        { href: '/about', label: '📖 About Us', icon: '📖' },
        { href: '/leaderboard', label: '🏆 Leaderboard', icon: '🏆' },
        { href: '/rooms', label: '🏛️ Create Rooms', icon: '🏛️' },
        { href: '/pricing', label: '💎 Pricing', icon: '💎' },
    ];

    return (
        <>
            <motion.nav 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-red-600/30 shadow-2xl'
            >
                <div className="escape-container">
                    <div className='flex items-center justify-between py-4'>
                        {/* Logo and Brand */}
                        <Link href="/" className='flex items-center space-x-3 group'>
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-red-600/20 rounded-xl blur-lg group-hover:bg-red-600/40 transition-all duration-300"></div>
                            </motion.div>
                            <div className="hidden sm:block">
                                <motion.h1 
                                    className='display-font text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-white to-red-500 group-hover:from-red-300 group-hover:to-red-600 transition-all duration-300'
                                    whileHover={{ scale: 1.05 }}
                                >
                                    CRYPTOGRAPHIC
                                </motion.h1>
                                <p className="text-xs text-gray-400 display-font tracking-wider">ESCAPE GAME</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className='hidden lg:flex items-center space-x-8'>
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <motion.div 
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                            path === item.href 
                                                ? 'text-red-400 bg-red-600/10 border border-red-600/30' 
                                                : 'text-white hover:text-red-400 hover:bg-red-600/5'
                                        }`}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <span className="text-lg">{item.icon}</span>
                                            <span>{item.label.split(' ').slice(1).join(' ')}</span>
                                        </span>
                                        {path === item.href && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                                                initial={false}
                                            />
                                        )}
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        {/* Right Side - Score, Wallet, Mobile Menu */}
                        <div className="flex items-center space-x-4">
                            {/* Score Display - only show on game page */}
                            <AnimatePresence>
                                {path === '/game' && score > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                        className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-lg rounded-xl border border-red-500/30 shadow-lg"
                                    >
                                        <span className="text-red-300 font-bold mono-font">
                                            Score: <span className="text-white">{score}</span>
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            {/* Connect Wallet Button */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="hidden sm:block"
                            >
                                <div className="escape-button">
                                    <ClientOnlyConnectButton />
                                </div>
                            </motion.div>
                            
                            {/* Connected Address Display */}
                            {/* <AnimatePresence>
                                {account && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="hidden md:flex items-center px-1 py-2 bg-red-600/10 backdrop-blur-lg rounded-lg border border-red-500/30"
                                    >
                                       
                                    </motion.div>
                                )}
                            </AnimatePresence> */}

                            {/* Mobile Menu Button */}
                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg bg-red-600/10 border border-red-600/30 text-white hover:bg-red-600/20 transition-all duration-300"
                            >
                                <motion.div
                                    animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {mobileMenuOpen ? '✕' : '☰'}
                                </motion.div>
                            </motion.button> */}
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-20 left-4 right-4 bg-black/95 border border-red-600/30 rounded-2xl shadow-2xl backdrop-blur-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 space-y-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                                            <div className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                                                path === item.href 
                                                    ? 'bg-red-600/20 text-red-400 border border-red-600/30' 
                                                    : 'text-white hover:bg-red-600/10 hover:text-red-400'
                                            }`}>
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="font-semibold">{item.label.split(' ').slice(1).join(' ')}</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                                
                                {/* Mobile Score Display */}
                                {path === '/game' && score > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-xl border border-red-500/30"
                                    >
                                        <span className="text-red-300 font-bold mono-font">
                                            Score: <span className="text-white">{score}</span>
                                        </span>
                                    </motion.div>
                                )}

                                {/* Mobile Wallet Connection */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-4 border-t border-red-600/30"
                                >
                                    <div className="escape-button w-full">
                                        <ClientOnlyConnectButton />
                                    </div>
                                    {account && (
                                        <div className="mt-3 p-3 bg-red-600/10 rounded-lg border border-red-500/30 text-center">
                                            <span className="text-red-300 mono-font text-sm">
                                                {truncateAddress(account.address)}
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
    
}

export default Navbar;
