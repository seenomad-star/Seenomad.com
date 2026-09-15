import React from 'react';
import { Award, Heart, Globe, Users, CheckCircle, Share2 } from 'lucide-react';

const ImpactProfile = () => {
    const stats = [
        { label: 'Hours Volunteered', value: '450', icon: <Globe className="text-blue-400" /> },
        { label: 'People Impacted', value: '1.2k', icon: <Users className="text-green-400" /> },
        { label: 'CO2 Offset (kg)', value: '850', icon: <Heart className="text-red-400" /> },
        { label: 'Skills Mastered', value: '12', icon: <Award className="text-yellow-400" /> }
    ];

    const badges = [
        { name: 'Global Citizen', level: 'Gold', color: 'bg-yellow-500' },
        { name: 'Climate Warrior', level: 'Silver', color: 'bg-gray-400' },
        { name: 'Health Hero', level: 'Bronze', color: 'bg-orange-500' }
    ];

    return (
        <div className="impact-profile-container">
            <div className="profile-header premium-card">
                <div className="profile-info">
                    <div className="profile-avatar">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" alt="User" />
                        <div className="verified-badge"><CheckCircle size={16} /></div>
                    </div>
                    <div className="profile-details">
                        <h2>Alex Rivera</h2>
                        <p>Impact Level: 45 • Global Citizen</p>
                        <div className="profile-actions">
                            <button className="share-btn"><Share2 size={16} /> Share Impact Resume</button>
                        </div>
                    </div>
                </div>
                <div className="profile-badges">
                    {badges.map(badge => (
                        <div key={badge.name} className={`badge-item ${badge.color}`}>
                            <span className="badge-name">{badge.name}</span>
                            <span className="badge-level">{badge.level}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="stats-grid">
                {stats.map(stat => (
                    <div key={stat.label} className="stat-card premium-card">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="impact-timeline premium-card">
                <h3>Impact Timeline</h3>
                <div className="timeline-items">
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h4>Marine Conservation Project</h4>
                            <p>Verified by OceanGuard NGO • Dec 2025</p>
                            <span className="impact-highlight">+50 Impact Points</span>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h4>Sustainable Tourism Certification</h4>
                            <p>Travel Universe Academy • Nov 2025</p>
                            <span className="impact-highlight">+20 Skill Points</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImpactProfile;
