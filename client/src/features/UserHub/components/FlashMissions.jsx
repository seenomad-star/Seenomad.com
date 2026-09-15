import React from 'react';
import { Zap, Timer, Target, CheckCircle2, ArrowRight, Star } from 'lucide-react';

const FlashMissions = () => {
    const missions = [
        {
            id: 1,
            title: 'Eco-Warrior',
            task: 'Post a photo of a sustainable practice during your trip',
            reward: '100 XP',
            time: '04:22:15',
            status: 'active',
            color: '#10b981'
        },
        {
            id: 2,
            title: 'Local Foodie',
            task: 'Review a local restaurant in your current city',
            reward: '50 XP',
            time: '12:45:00',
            status: 'active',
            color: '#f59e0b'
        },
        {
            id: 3,
            title: 'Pathfinder',
            task: 'Share a hidden gem location on the map',
            reward: '200 XP',
            time: 'Completed',
            status: 'completed',
            color: '#3b82f6'
        }
    ];

    return (
        <div className="hub-section fade-in">
            <div className="section-header-hub">
                <div>
                    <h1>Flash <span className="gradient-text">Missions</span></h1>
                    <p>Quick tasks with instant rewards. Don't miss out!</p>
                </div>
                <div className="mission-timer">
                    <Timer size={18} />
                    <span>Next Reset: 08:00:00</span>
                </div>
            </div>

            <div className="missions-list">
                {missions.map(mission => (
                    <div key={mission.id} className={`mission-card glass ${mission.status}`}>
                        <div className="mission-icon" style={{ backgroundColor: `${mission.color}15`, color: mission.color }}>
                            <Zap size={24} />
                        </div>
                        <div className="mission-info">
                            <div className="mission-top">
                                <h3>{mission.title}</h3>
                                <span className="mission-reward">+{mission.reward}</span>
                            </div>
                            <p>{mission.task}</p>
                            <div className="mission-footer">
                                <span className="mission-time">
                                    <Timer size={14} />
                                    {mission.time}
                                </span>
                                {mission.status === 'active' ? (
                                    <button className="btn-start-mission">
                                        Start <ArrowRight size={14} />
                                    </button>
                                ) : (
                                    <span className="completed-text">
                                        <CheckCircle2 size={14} /> Completed
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mission-perks glass">
                <div className="perk-icon"><Star size={24} /></div>
                <div className="perk-content">
                    <h3>Daily Streak Bonus</h3>
                    <p>Complete 3 missions today to unlock a 2x XP multiplier for the next 24 hours!</p>
                    <div className="streak-dots">
                        <div className="dot filled"></div>
                        <div className="dot filled"></div>
                        <div className="dot"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashMissions;
