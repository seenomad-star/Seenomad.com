import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Coins, CheckCircle, Gift, Sparkles, Clock, History, Award } from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useToastStore } from '../../../store/toastStore';
import '../../../styles/RetentionStreak.css';

const RetentionStreakWidget = () => {
    const {
        dailyStreak,
        lastCheckInDate,
        credits,
        transactions = [],
        checkIn,
        addCredits,
        addXP
    } = useNomadOSStore();
    const { addToast } = useToastStore();

    const [showReward, setShowReward] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(0);

    // Compute whether checked in today (YYYY-MM-DD comparison)
    const todayStr = new Date().toISOString().split('T')[0];
    const lastCheckStr = lastCheckInDate ? lastCheckInDate.split('T')[0] : null;
    const claimedToday = todayStr === lastCheckStr;

    // Effective streak display (at least 1 if checked in, else current streak)
    const effectiveStreak = dailyStreak || 0;

    const handleClaim = () => {
        if (claimedToday) return;

        // Perform store check-in (updates consecutive streak and lastCheckInDate)
        checkIn();

        // Calculate dynamic tiered reward: base 20 NMD + streak bonus (up to 100 NMD)
        const earnedStreak = effectiveStreak + 1;
        const nmdReward = Math.min(100, Math.max(25, earnedStreak * 15));
        const xpReward = 100 + (earnedStreak * 20);

        setRewardAmount(nmdReward);
        setShowReward(true);

        // Add persistent credits and XP
        addCredits(nmdReward, `Daily Nomad Drop (Day ${earnedStreak} Streak)`);
        addXP(xpReward);

        addToast(`Claimed +${nmdReward} NMD & +${xpReward} XP! Keep your streak burning! 🔥`, 'success');

        // Hide overlay after animation
        setTimeout(() => setShowReward(false), 3200);
    };

    const days = [1, 2, 3, 4, 5, 6, 7];

    // Filter recent NMD drop transactions from persistent ledger
    const recentNmdDrops = transactions
        .filter(t => t.reason && t.reason.toLowerCase().includes('drop') || t.reason?.toLowerCase().includes('streak'))
        .slice(0, 3);

    return (
        <div className="retention-streak-widget">
            <div className="streak-header">
                <div className="header-text">
                    <h3>Daily Nomad Drop <Gift size={16} className="inline-icon" /></h3>
                    <p>Keep your daily travel streak alive to earn persistent NMD tokens & XP multipliers!</p>
                </div>
                <div className="streak-stats-header">
                    <div className="streak-counter" title="Consecutive daily check-in streak">
                        <Flame size={24} className={effectiveStreak > 0 ? "active-flame pulse-anim" : ""} />
                        <span>{effectiveStreak} Day Streak</span>
                    </div>
                    <div className="nmd-balance-badge" title="Persistent NMD Token Wallet">
                        <Coins size={16} className="text-amber-400" />
                        <span>{credits} NMD</span>
                    </div>
                </div>
            </div>

            {/* 7-Day Visual Progression Track */}
            <div className="streak-days-track">
                {days.map((day) => {
                    const isPast = day < (effectiveStreak % 7 === 0 && effectiveStreak > 0 ? 7 : (effectiveStreak % 7)) + (claimedToday ? 0 : 0);
                    const isToday = day === ((effectiveStreak % 7 === 0 && effectiveStreak > 0 ? 7 : (effectiveStreak % 7)) + (claimedToday ? 0 : 1));

                    return (
                        <div 
                            key={day} 
                            className={`streak-day ${isPast ? 'claimed' : ''} ${isToday ? 'today' : ''} ${day === 7 ? 'milestone' : ''}`}
                        >
                            <div className="day-label">Day {day}</div>
                            <div className="day-circle">
                                {isPast ? <CheckCircle size={16} /> : (day === 7 ? <Gift size={16} /> : <Coins size={14} />)}
                            </div>
                            <div className="day-reward">{day === 7 ? '10x Bonus' : `+${day * 15}`}</div>
                        </div>
                    );
                })}
            </div>

            {/* Action Bar */}
            <div className="streak-action-area">
                <button 
                    type="button"
                    className={`claim-btn ${claimedToday ? 'claimed-state' : ''}`}
                    onClick={handleClaim}
                    disabled={claimedToday}
                    aria-label={claimedToday ? "Daily drop claimed for today" : "Claim daily NMD tokens"}
                >
                    {claimedToday ? (
                        <>
                            <CheckCircle size={18} />
                            <span>Claimed Today! Next drop unlocks tomorrow.</span>
                        </>
                    ) : (
                        <>
                            <Sparkles size={18} />
                            <span>Claim Daily Nomad Drop (+{Math.max(25, (effectiveStreak + 1) * 15)} NMD)</span>
                        </>
                    )}
                </button>
            </div>

            {/* Persistent Ledger Mini-Summary */}
            {recentNmdDrops.length > 0 && (
                <div className="streak-ledger-history">
                    <div className="ledger-header">
                        <History size={13} />
                        <span>Persistent NMD Ledger History</span>
                    </div>
                    <div className="ledger-list">
                        {recentNmdDrops.map((tx) => (
                            <div key={tx.id} className="ledger-row">
                                <span className="tx-reason">{tx.reason}</span>
                                <span className="tx-amount">+{tx.amount} NMD</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Celebration Modal Overlay */}
            <AnimatePresence>
                {showReward && (
                    <motion.div 
                        className="reward-overlay"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.15 }}
                    >
                        <div className="reward-pop">
                            <Coins size={64} className="gold-coin pulse-anim" />
                            <h2>+{rewardAmount} NMD CLAIMED!</h2>
                            <p>Daily streak updated! Added to your persistent nomad wallet.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RetentionStreakWidget;
