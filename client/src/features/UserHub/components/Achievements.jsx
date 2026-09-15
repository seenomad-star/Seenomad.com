import React from 'react';
import { Award, Star, Shield, Zap, Trophy, Lock, Globe, Users, Gamepad2 } from 'lucide-react';

const Achievements = () => {
    const achievements = [
        { id: 1, title: 'World Traveler', desc: 'Visit 5 different countries', progress: 80, icon: <Globe size={24} />, color: '#3b82f6', unlocked: true },
        { id: 2, title: 'Impact Hero', desc: 'Complete 10 voluntourism projects', progress: 40, icon: <Shield size={24} />, color: '#10b981', unlocked: true },
        { id: 3, title: 'Social Butterfly', desc: 'Connect with 50 other nomads', progress: 100, icon: <Users size={24} />, color: '#f59e0b', unlocked: true },
        { id: 4, title: 'Master Gamer', desc: 'Win 5 travel challenges', progress: 20, icon: <Gamepad2 size={24} />, color: '#8b5cf6', unlocked: false },
        { id: 5, title: 'Early Bird', desc: 'Book 3 trips 6 months in advance', progress: 0, icon: <Zap size={24} />, color: '#ec4899', unlocked: false },
    ];

    return (
        <div className="hub-section fade-in">
            <div className="section-header-hub">
                <div>
                    <h1>Your <span className="gradient-text">Achievements</span></h1>
                    <p>Track your progress and unlock legendary rewards.</p>
                </div>
                <div className="achievement-stats">
                    <div className="stat">
                        <span className="val">12</span>
                        <span className="lab">Unlocked</span>
                    </div>
                    <div className="stat">
                        <span className="val">2,450</span>
                        <span className="lab">Points</span>
                    </div>
                </div>
            </div>

            <div className="achievements-grid">
                {achievements.map(ach => (
                    <div key={ach.id} className={`achievement-card glass ${ach.unlocked ? 'unlocked' : 'locked'}`}>
                        <div className="achievement-icon" style={{ color: ach.color }}>
                            {ach.unlocked ? ach.icon : <Lock size={24} />}
                        </div>
                        <div className="achievement-info">
                            <h3>{ach.title}</h3>
                            <p>{ach.desc}</p>
                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${ach.progress}%`, backgroundColor: ach.color }}></div>
                                </div>
                                <span className="progress-text">{ach.progress}%</span>
                            </div>
                        </div>
                        {ach.progress === 100 && <div className="completed-badge"><Trophy size={14} /></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper to avoid import errors if Globe/Users/Gamepad2 aren't imported


export default Achievements;
