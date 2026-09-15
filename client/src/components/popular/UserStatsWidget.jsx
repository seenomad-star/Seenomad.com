import React from 'react';
import { Trophy, Flame, Target, Zap } from 'lucide-react';
import { useNomadOSStore } from '../../store/nomadOSStore';
import '../../styles/popular/UserStatsWidget.css';

const UserStatsWidget = () => {
    const { dailyStreak, dailyXP, userLevel } = useNomadOSStore();
    const dailyGoal = 1000; // Level goal
    const levelProgress = Math.min((dailyXP / dailyGoal) * 100, 100);

    const identity = {
        rank: 'Elite Explorer',
        globalRank: 'Top 5%',
        badges: ['Bali Legend', 'Fast Mover', 'Budget King']
    };

    return (
        <div className="user-stats-widget shadow-premium">
            <div className="widget-header">
                <Trophy size={18} className="text-gold" />
                <h3>Travel Identity</h3>
                <span className="global-rank-tag">{identity.globalRank}</span>
            </div>

            <div className="stats-grid">
                {/* Streak */}
                <div className="stat-card streak-glass">
                    <Flame size={20} className="text-orange" />
                    <div className="stat-column">
                        <span className="stat-value">{dailyStreak} Days</span>
                        <span className="stat-label">EXPLORER STREAK</span>
                    </div>
                </div>

                {/* Level */}
                <div className="stat-card level-glass">
                    <Target size={20} className="text-blue" />
                    <div className="stat-column">
                        <span className="stat-value">Level {userLevel}</span>
                        <div className="identity-progress">
                            <div className="bar">
                                <div className="fill" style={{ width: `${levelProgress}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="identity-badges-row">
                {identity.badges.map(badge => (
                    <span key={badge} className="mini-badge-chip">{badge}</span>
                ))}
            </div>

            <div className="identity-cta">
                <Zap size={14} />
                <span>Next Perk: Free Lounge Access</span>
                <button className="perk-btn">View Map</button>
            </div>
        </div>
    );
};

export default UserStatsWidget;
