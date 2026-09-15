import React from 'react';
import { Trophy, TrendingUp, Users, MapPin, Zap, Crown } from 'lucide-react';
import '../../styles/GlobalLeaderboard.css';

const GlobalLeaderboard = () => {
    const leaders = [
        { name: 'Alex Rivera', countries: 84, points: '42.5K', status: 'Obsidian', avatar: 'AR' },
        { name: 'Sarah Chen', countries: 72, points: '38.2K', status: 'Diamond', avatar: 'SC' },
        { name: 'John Doe', countries: 65, points: '31.1K', status: 'Platinum', avatar: 'JD' },
        { name: 'Elena Petrova', countries: 58, points: '29.4K', status: 'Platinum', avatar: 'EP' },
        { name: 'Michael Smith', countries: 52, points: '25.8K', status: 'Gold', avatar: 'MS' }
    ];

    return (
        <div className="leaderboard-container">
            <div className="lb-header">
                <div className="lb-title">
                    <Trophy size={24} color="#FCD34D" />
                    <h2>Global Nomad Rivalry</h2>
                </div>
                <div className="lb-stats-mini">
                    <div className="lb-stat"><Users size={14} /> 1.2M Active</div>
                    <div className="lb-stat"><MapPin size={14} /> 194 Countries</div>
                </div>
            </div>

            <div className="lb-ranking-table">
                {leaders.map((user, i) => (
                    <div className={`lb-user-row rank-${i+1}`} key={i}>
                        <div className="lb-rank-badge">
                            {i === 0 ? <Crown size={16} color="#FCD34D" /> : i+1}
                        </div>
                        <div className="lb-user-avatar">{user.avatar}</div>
                        <div className="lb-user-meta">
                            <strong>{user.name}</strong>
                            <span>{user.status} Nomad</span>
                        </div>
                        <div className="lb-metrics">
                            <div className="lb-metric">
                                <Zap size={14} color="#3B82F6" />
                                <span>{user.points} XP</span>
                            </div>
                            <div className="lb-metric">
                                <MapPin size={14} color="#10B981" />
                                <span>{user.countries} Visited</span>
                            </div>
                        </div>
                        <div className="lb-trend"><TrendingUp size={14} color="#10B981" /></div>
                    </div>
                ))}
            </div>

            <div className="referral-box">
                <div className="rb-content">
                    <h4>Climb Faster?</h4>
                    <p>Invite a friend and get 5,000 XP instantly.</p>
                </div>
                <button className="invite-btn">Invite Friends</button>
            </div>
        </div>
    );
};

export default GlobalLeaderboard;
