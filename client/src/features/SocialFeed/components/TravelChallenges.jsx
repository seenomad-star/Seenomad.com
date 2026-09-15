import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, Users, Camera, MapPin, Coffee } from 'lucide-react';
import '../styles/TravelChallenges.css';

const TravelChallenges = () => {
    const challenges = [
        {
            id: 1,
            title: "Street Food Hunter",
            desc: "Post 3 Shorts about local street food in your current city.",
            reward: "250",
            xp: "100",
            difficulty: "easy",
            progress: 66,
            icon: <Coffee size={20} />,
            color: "#f59e0b"
        },
        {
            id: 2,
            title: "Solo Explorer",
            desc: "Meet 5 new nomads through 'Nearby' and exchange contacts.",
            reward: "500",
            xp: "250",
            difficulty: "medium",
            progress: 20,
            icon: <Users size={20} />,
            color: "#3b82f6"
        },
        {
            id: 3,
            title: "Global Documentarian",
            desc: "Check-in at 10 UNESCO World Heritage sites this year.",
            reward: "2500",
            xp: "1000",
            difficulty: "hard",
            progress: 30,
            icon: <Camera size={20} />,
            color: "#8b5cf6"
        }
    ];

    return (
        <div className="challenges-container">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold flex items-center gap-2">
                    <Trophy className="text-amber-500" /> Active Challenges
                </h2>
                <button className="text-blue-500 text-sm font-bold">See All</button>
            </div>

            {challenges.map((challenge, index) => (
                <motion.div 
                    key={challenge.id}
                    className="challenge-card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="challenge-header">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-2xl bg-slate-50" style={{ color: challenge.color }}>
                                {challenge.icon}
                            </div>
                            <div className="challenge-info">
                                <h3>{challenge.title}</h3>
                                <p>{challenge.desc}</p>
                            </div>
                        </div>
                        <span className={`challenge-badge ${challenge.difficulty}`}>
                            {challenge.difficulty.toUpperCase()}
                        </span>
                    </div>

                    <div className="progress-section">
                        <div className="progress-bar-container">
                            <motion.div 
                                className="progress-bar-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${challenge.progress}%` }}
                                style={{ background: challenge.color }}
                            />
                        </div>
                        <div className="progress-stats">
                            <span>{challenge.progress}% Completed</span>
                            <div className="challenge-reward">
                                <Activity size={14} fill="currentColor" />
                                <span>+{challenge.reward} Coins</span>
                            </div>
                        </div>
                    </div>

                    <button className="join-challenge-btn">
                        {challenge.progress > 0 ? 'Continue Challenge' : 'Accept Challenge'}
                    </button>
                </motion.div>
            ))}
        </div>
    );
};

export default TravelChallenges;
