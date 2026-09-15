import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Bell, Sparkles } from 'lucide-react';
import RetentionSignals from './AdvancedSearch/RetentionSignals';
import StreakTracker from './AdvancedSearch/StreakTracker';
import RewardProgressBar from './AdvancedSearch/RewardProgressBar';
import './TravelerStatsWidget.css';

const TravelerStatsWidget = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="traveler-stats-widget"
        >
            <div className="widget-header">
                <div className="traveler-profile">
                    <div className="traveler-avatar">
                        <img src="https://i.pravatar.cc/150?u=seenomad" alt="Traveler" />
                        <div className="level-badge">12</div>
                    </div>
                    <div className="traveler-info">
                        <h4 className="traveler-name">Elite Explorer</h4>
                        <p className="traveler-rank">Top 5% this week</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="widget-notif-btn"
                >
                    <Bell size={18} />
                    <span className="notif-dot" />
                </motion.button>
            </div>

            <div className="widget-content">
                <div className="stats-section">
                    <StreakTracker />
                </div>

                <div className="signals-section">
                    <div className="section-label">
                        <Sparkles size={12} />
                        <span>Live Insights</span>
                    </div>
                    <RetentionSignals />
                </div>

                <div className="progress-section">
                    <RewardProgressBar />
                </div>
            </div>

            <div className="widget-footer">
                <button className="view-rewards-btn">
                    <Trophy size={14} />
                    <span>View Rewards</span>
                </button>
            </div>
        </motion.div>
    );
};

export default TravelerStatsWidget;
