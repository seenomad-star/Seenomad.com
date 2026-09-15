import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Zap } from 'lucide-react';
import './MysteryCard.css';

const MysteryCard = () => {
    const [isRevealed, setIsRevealed] = useState(false);

    return (
        <motion.div
            className={`mystery-card ${isRevealed ? 'revealed' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
        >
            <AnimatePresence mode="wait">
                {!isRevealed ? (
                    <motion.div
                        key="locked"
                        className="mystery-locked-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                    >
                        <div className="mystery-visual">
                            <div className="mystery-orb">
                                <Lock size={32} className="lock-icon" />
                            </div>
                            <div className="mystery-particles">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="particle"
                                        animate={{
                                            y: [-10, -30],
                                            opacity: [0, 1, 0],
                                            x: [0, (i % 2 === 0 ? 20 : -20)]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.3
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mystery-info">
                            <h3>Mystery Destination</h3>
                            <p>Premium Intel Required</p>
                            <motion.button
                                className="reveal-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsRevealed(true)}
                            >
                                <Zap size={14} />
                                Unlock with 500 XP
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="revealed"
                        className="mystery-revealed-content"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="reveal-success">
                            <Sparkles size={24} className="success-icon" />
                            <h4>Destination Unlocked!</h4>
                            <p>You've discovered a hidden gem in the Swiss Alps.</p>
                            <button className="view-mystery-btn">View Intel</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default MysteryCard;
