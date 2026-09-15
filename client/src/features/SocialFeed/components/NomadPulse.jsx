import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { Flame, Activity, Info, Trophy, ChevronRight, Radio, Briefcase, Target, Star, TrendingUp } from 'lucide-react';
import './NomadPulse.css';

const NomadPulse = () => {
    const navigate = useNavigate();
    const { dailyStreak, dailyXP, checkIn, userLevel, addXP } = useNomadOSStore();
    const [questCompleted, setQuestCompleted] = useState(false);

    const activeQuest = {
        title: "Bali Explorer",
        description: "Post 1 travel tip or engage with 3 reels today.",
        reward: "+150 XP",
        id: "q1"
    };

    const completeQuest = () => {
        if (questCompleted) return;
        setQuestCompleted(true);
        addXP(150);
        // Particle effect trigger
        if (window.spawnXPParticles) {
            window.spawnXPParticles(window.innerWidth / 2, window.innerHeight / 2, 20);
        }
    };
    const dailyGoal = 100;
    const progress = Math.min((dailyXP / dailyGoal) * 100, 100);

    useEffect(() => {
        checkIn();
    }, [checkIn]);

    const insights = [
        "Your visa for Thailand expires in 12 days. Plan your bounce?",
        "Kyoto is 15% cheaper on Tuesdays — check local markets!",
        "New Nomad Hub opened in Lisbon with 1Gbps fiber.",
        "High signal detected in Bali. Best time for sync is now.",
        "You're in the top 5% of explorers this week. Keep it up!"
    ];

    const currentInsight = insights[0]; // Prioritizing the visa insight as requested

    return (
        <motion.div 
            className="nomad-pulse-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="pulse-main">
                <div className="pulse-left">
                    <div className="streak-badge">
                        <Flame size={20} className="streak-icon" />
                        <div className="streak-info">
                            <span className="count">{dailyStreak}</span>
                            <span className="label">DAY STREAK</span>
                        </div>
                    </div>
                </div>

                <div className="pulse-center">
                    <div className="pulse-insight">
                        <div className="insight-header">
                            <Info size={14} />
                            <span>DAILY PULSE</span>
                        </div>
                        <p className="insight-text">{currentInsight}</p>
                    </div>
                </div>

                <div className="pulse-right">
                    <div className="daily-progress">
                        <div className="progress-header">
                            <div className="xp-stat">
                                <Activity size={14} className="text-blue" />
                                <span>{dailyXP}/{dailyGoal} XP</span>
                            </div>
                            {progress >= 100 && <Trophy size={16} className="text-gold pulse-anim" />}
                        </div>
                        <div className="progress-track">
                            <motion.div 
                                className="progress-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pulse-discover">
                <div className="discover-card" onClick={() => navigate('/community')}>
                    <div className="d-icon-box live">
                        <Radio size={16} />
                    </div>
                    <div className="d-text">
                        <span className="d-label">Live Now</span>
                        <span className="d-value">Streaming Hub</span>
                    </div>
                </div>
                <div className="discover-card" onClick={() => navigate('/community/collab-board')}>
                    <div className="d-icon-box collab">
                        <Briefcase size={16} />
                    </div>
                    <div className="d-text">
                        <span className="d-label">Collab Board</span>
                        <span className="d-value">Join Projects</span>
                    </div>
                </div>
            </div>

            {/* Viral Quest Hook */}
            <motion.div 
                className={`daily-quest-card ${questCompleted ? 'completed' : ''}`}
                onClick={completeQuest}
                whileTap={{ scale: 0.98 }}
            >
                <div className="quest-header">
                    <Target size={14} color="#f59e0b" />
                    <span>ACTIVE QUEST</span>
                    <div className="quest-reward">{activeQuest.reward}</div>
                </div>
                <h4>{activeQuest.title}</h4>
                <p>{activeQuest.description}</p>
                {questCompleted && <div className="completed-overlay">CLAIMED! ✨</div>}
            </motion.div>

            <div className="pulse-trending">
                <div className="trending-header">
                    <TrendingUp size={16} />
                    <span>TRENDING NOW</span>
                </div>
                <div className="trends-list">
                    {['#JapanCherryBlossom', '#LisbonDigitalNomad', '#BaliFestival', '#SwissAlpsHike'].map((tag, i) => (
                        <div key={i} className="trend-item">
                            <span className="trend-tag">{tag}</span>
                            <span className="trend-count">{(Math.random() * 10).toFixed(1)}K posts</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pulse-signals">
                <div className="signals-header">
                    <Radio size={16} />
                    <span>LIVE SIGNALS</span>
                </div>
                {[
                    { user: '@alex_nomad', text: 'Lisbon airport is super busy today. Allow extra 1h! ✈️' },
                    { user: '@tech_traveler', text: 'New 5G speeds in Canggu are reaching 500Mbps! 🚀' }
                ].map((signal, i) => (
                    <div key={i} className="signal-card">
                        <span className="signal-user">{signal.user}</span>
                        <p className="signal-content">{signal.text}</p>
                    </div>
                ))}
            </div>

            <div className="pulse-footer">
                <button className="leaderboard-btn">
                    <Star size={16} />
                    <span>Global Leaderboard</span>
                </button>
            </div>
        </motion.div>
    );
};

export default NomadPulse;
