import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Coins, CheckCircle, Gift, Sparkles } from 'lucide-react';
import '../../../styles/RetentionStreak.css';

const RetentionStreakWidget = () => {
    const [streak, setStreak] = useState(3); // Mock user streak
    const [claimedToday, setClaimedToday] = useState(false);
    const [showReward, setShowReward] = useState(false);

    const handleClaim = () => {
        if (claimedToday) return;
        setClaimedToday(true);
        setShowReward(true);
        setStreak(prev => prev + 1);
        
        // Hide reward animation after a few seconds
        setTimeout(() => setShowReward(false), 3000);
    };

    const days = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="retention-streak-widget">
            <div className="streak-header">
                <div className="header-text">
                    <h3>Daily Nomad Drop <Gift size={16} className="inline-icon" /></h3>
                    <p>Keep your streak alive to earn daily NMD multipliers!</p>
                </div>
                <div className="streak-counter">
                    <Flame size={24} className={streak > 0 ? "active-flame pulse-anim" : ""} />
                    <span>{streak} Day Streak</span>
                </div>
            </div>

            <div className="streak-days-track">
                {days.map((day) => {
                    const isPast = day < streak + (claimedToday ? 0 : 1);
                    const isToday = day === streak + (claimedToday ? 0 : 1);
                    
                    return (
                        <div 
                            key={day} 
                            className={`streak-day ${isPast ? 'claimed' : ''} ${isToday ? 'today' : ''} ${day === 7 ? 'milestone' : ''}`}
                        >
                            <div className="day-label">Day {day}</div>
                            <div className="day-circle">
                                {isPast ? <CheckCircle size={16} /> : (day === 7 ? <Gift size={16} /> : <Coins size={14} />)}
                            </div>
                            <div className="day-reward">{day === 7 ? '10x Bonus' : `+${day * 5}`}</div>
                        </div>
                    );
                })}
            </div>

            <div className="streak-action-area">
                <button 
                    className={`claim-btn ${claimedToday ? 'claimed-state' : ''}`}
                    onClick={handleClaim}
                    disabled={claimedToday}
                >
                    {claimedToday ? 'Claimed Today! Come back tomorrow.' : 'Claim Your Daily NMD'}
                    {!claimedToday && <Sparkles size={18} />}
                </button>
            </div>

            <AnimatePresence>
                {showReward && (
                    <motion.div 
                        className="reward-overlay"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                    >
                        <div className="reward-pop">
                            <Coins size={64} className="gold-coin pulse-anim" />
                            <h2>+{streak * 5} NMD CLAIMED!</h2>
                            <p>Multiplier active for tomorrow!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RetentionStreakWidget;
