import React from 'react';
import { Trophy, Users, Zap, Timer, Star } from 'lucide-react';

const Challenges = () => {
    const activeChallenges = [
        {
            id: 'teach-100',
            title: 'Teach 100 Students',
            description: 'Help local communities by teaching essential skills.',
            progress: 65,
            participants: 1200,
            reward: 'Educator Badge + $50 Travel Credit',
            timeLeft: '12 Days'
        },
        {
            id: 'clean-1ton',
            title: 'Clean 1 Ton Plastic',
            description: 'Join the global effort to clean our oceans and beaches.',
            progress: 40,
            participants: 3500,
            reward: 'Eco-Warrior Badge + Exclusive Merch',
            timeLeft: '5 Days'
        }
    ];

    return (
        <div className="challenges-container">
            <div className="section-header">
                <h2>Global Impact Challenges</h2>
                <p>Join viral missions, compete on leaderboards, and earn rewards.</p>
            </div>

            <div className="challenges-grid">
                {activeChallenges.map(challenge => (
                    <div key={challenge.id} className="challenge-card premium-card">
                        <div className="challenge-header">
                            <div className="challenge-timer"><Timer size={14} /> {challenge.timeLeft} left</div>
                            <div className="challenge-participants"><Users size={14} /> {challenge.participants}</div>
                        </div>
                        <h3>{challenge.title}</h3>
                        <p>{challenge.description}</p>
                        <div className="challenge-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${challenge.progress}%` }}></div>
                            </div>
                            <span className="progress-text">{challenge.progress}% Complete</span>
                        </div>
                        <div className="challenge-reward">
                            <Star size={14} className="text-yellow-400" />
                            <span>{challenge.reward}</span>
                        </div>
                        <button className="primary-btn-premium">Join Challenge</button>
                    </div>
                ))}
            </div>

            <div className="leaderboard premium-card">
                <h3>Live Leaderboard</h3>
                <div className="leaderboard-list">
                    {[1, 2, 3].map(rank => (
                        <div key={rank} className="leaderboard-item">
                            <span className="rank">{rank}</span>
                            <div className="user-info">
                                <div className="user-avatar-small"></div>
                                <span className="user-name">User_{rank}42</span>
                            </div>
                            <span className="impact-score">{5000 - rank * 500} pts</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Challenges;
