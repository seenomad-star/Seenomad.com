import React, { useState } from 'react';
import {
    Users,
    Trophy,
    Zap,
    MessageSquare,
    Globe,
    Shield,
    ChevronRight,
    TrendingUp,
    MapPin,
    Calendar,
    Award
} from 'lucide-react';

const Groups = () => {
    const [groups, setGroups] = useState([
        {
            id: 1,
            name: "Bali Digital Nomads",
            category: "Destination",
            members: "12.4k",
            activeNow: "842",
            icon: "🏝️",
            xp: 12500,
            level: 45,
            topContributor: "Elena R.",
            description: "The ultimate hub for nomads in Bali. Housing, co-working, and weekend trips.",
            isJoined: true,
            hasChallenge: true
        },
        {
            id: 2,
            name: "Budget Backpackers Europe",
            category: "Budget",
            members: "45.2k",
            activeNow: "1.2k",
            icon: "🎒",
            xp: 8900,
            level: 32,
            topContributor: "Marco C.",
            description: "Traveling Europe on a shoestring? Join us for the best tips and tricks.",
            isJoined: false,
            hasChallenge: false
        },
        {
            id: 3,
            name: "Visa & Embassy Help",
            category: "Utility",
            members: "8.9k",
            activeNow: "156",
            icon: "🛂",
            xp: 5600,
            level: 18,
            topContributor: "Sarah J.",
            description: "Real-time updates on visa requirements and embassy procedures.",
            isJoined: true,
            hasChallenge: false
        }
    ]);

    return (
        <div className="groups-module">
            {/* Groups Header */}
            <div className="groups-header-section">
                <div className="header-info">
                    <h2>Community Groups</h2>
                    <p>Find your tribe and level up your travel game.</p>
                </div>
                <button className="create-group-btn">
                    <Users size={18} />
                    <span>Create Group</span>
                </button>
            </div>

            {/* Weekly Challenge Banner */}
            <div className="weekly-challenge-card">
                <div className="challenge-icon">
                    <Trophy size={32} />
                </div>
                <div className="challenge-details">
                    <div className="challenge-tag">WEEKLY CHALLENGE</div>
                    <h3>The "Hidden Waterfall" Hunt</h3>
                    <p>Find and document a waterfall not on Google Maps. 500 XP + Exclusive Badge!</p>
                    <div className="challenge-progress">
                        <div className="progress-bar-bg">
                            <div className="progress-fill" style={{ width: '65%' }}></div>
                        </div>
                        <span>245 participants</span>
                    </div>
                </div>
                <button className="join-challenge-btn">Join Now</button>
            </div>

            {/* Groups Grid */}
            <div className="groups-grid-detailed">
                {groups.map(group => (
                    <div key={group.id} className="group-detailed-card">
                        <div className="group-card-header">
                            <div className="group-main-info">
                                <div className="group-icon-large">{group.icon}</div>
                                <div className="group-name-meta">
                                    <h3>{group.name}</h3>
                                    <div className="group-meta-row">
                                        <span className="group-cat">{group.category}</span>
                                        <span className="meta-dot">•</span>
                                        <span className="group-members">{group.members} members</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group-level-badge">
                                <Zap size={12} fill="currentColor" />
                                <span>LVL {group.level}</span>
                            </div>
                        </div>

                        <p className="group-desc">{group.description}</p>

                        <div className="group-stats-grid">
                            <div className="g-stat">
                                <span className="g-stat-lbl">Active Now</span>
                                <div className="active-indicator">
                                    <div className="pulse-dot"></div>
                                    <span className="g-stat-val">{group.activeNow}</span>
                                </div>
                            </div>
                            <div className="g-stat">
                                <span className="g-stat-lbl">Top Contributor</span>
                                <span className="g-stat-val contributor">{group.topContributor}</span>
                            </div>
                        </div>

                        <div className="group-actions-row">
                            <button className={`group-main-btn ${group.isJoined ? 'joined' : 'join'}`}>
                                {group.isJoined ? 'Enter Group' : 'Join Community'}
                            </button>
                            <button className="group-msg-btn">
                                <MessageSquare size={20} />
                            </button>
                        </div>

                        {group.hasChallenge && (
                            <div className="group-mini-challenge">
                                <Award size={14} />
                                <span>Active Challenge: "Local Eats"</span>
                                <ChevronRight size={14} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Leaderboard Section */}
            <div className="community-leaderboard">
                <div className="leaderboard-header">
                    <h3>Top Communities</h3>
                    <button className="text-link">View All</button>
                </div>
                <div className="leaderboard-list">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="leaderboard-item">
                            <span className="rank">#{i}</span>
                            <div className="community-mini-info">
                                <div className="mini-icon">🏝️</div>
                                <span>Bali Nomads</span>
                            </div>
                            <div className="xp-gain">
                                <TrendingUp size={14} />
                                <span>+2.4k XP</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Groups;
