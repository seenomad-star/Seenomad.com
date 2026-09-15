import React from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, TrendingUp, Award, Target, Star, 
    Gift, ArrowUpRight, Clock, Shield, CheckCircle 
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const DopamineDashboard = () => {
    const { xp, level, credits, transactions } = useNomadOSStore();

    const stats = [
        { label: "Daily Streak", value: "7 Days", icon: <Zap size={20} fill="#F59E0B" color="#F59E0B" />, color: "#F59E0B" },
        { label: "Next Level", value: `${2000 - (xp % 2000)} XP`, icon: <TrendingUp size={20} color="#10B981" />, color: "#10B981" },
        { label: "Impact Score", value: "85%", icon: <Shield size={20} color="#6366F1" />, color: "#6366F1" },
        { label: "Mates Reached", urban: "1.2K", icon: <Award size={20} color="#EC4899" />, color: "#EC4899" }
    ];

    return (
        <div className="dopamine-container">
            <div className="bt-header">
                <div>
                    <h3 className="ach-section-title">Daily Dopamine & Impact</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Your activity, earnings, and status in the Nomad economy</p>
                </div>
            </div>

            <div className="dd-stats-grid">
                {stats.map((s, i) => (
                    <motion.div 
                        key={i} 
                        className="dd-stat-card"
                        whileHover={{ scale: 1.02 }}
                        style={{ borderLeft: `4px solid ${s.color}` }}
                    >
                        <div className="dd-stat-icon">{s.icon}</div>
                        <div className="dd-stat-info">
                            <span className="dd-stat-label">{s.label}</span>
                            <span className="dd-stat-value">{s.value || s.urban}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="dd-main-row">
                <div className="dd-earning-panel">
                    <div className="dd-panel-header">
                        <h4>Recent Earnings</h4>
                        <div className="credits-display">
                            <Zap size={14} fill="#F59E0B" color="#F59E0B" />
                            <span>{credits} NC</span>
                        </div>
                    </div>
                    <div className="dd-transaction-list">
                        {transactions.slice(0, 4).map(t => (
                            <div key={t.id} className="dd-tx-item">
                                <div className={`tx-icon ${t.type}`}>
                                    {t.type === 'earning' ? <ArrowUpRight size={14} /> : <Clock size={14} />}
                                </div>
                                <div className="tx-info">
                                    <strong>{t.label}</strong>
                                    <span>{t.date}</span>
                                </div>
                                <div className={`tx-amount ${t.type}`}>
                                    {t.type === 'earning' ? '+' : '-'}{t.amount} NC
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dd-goals-panel">
                    <h4>Active Missions</h4>
                    <div className="dd-goal-list">
                        <div className="dd-goal-item">
                            <div className="goal-info">
                                <strong>Speed Test Pioneer</strong>
                                <div className="goal-progress-bg">
                                    <div className="goal-progress-fill" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                            <span className="goal-status">4/5</span>
                        </div>
                        <div className="dd-goal-item">
                            <div className="goal-info">
                                <strong>Community Connector</strong>
                                <div className="goal-progress-bg">
                                    <div className="goal-progress-fill" style={{ width: '40%' }}></div>
                                </div>
                            </div>
                            <span className="goal-status">2/5</span>
                        </div>
                        <div className="dd-goal-item completed">
                            <CheckCircle size={16} color="#10B981" />
                            <strong>Passport Profile Verified</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="dd-boost-cta">
                <div className="boost-icon"><Zap size={24} fill="currentColor" /></div>
                <div className="boost-text">
                    <h5>Double XP Weekend!</h5>
                    <p>Refer 2 mates to activate your 2x booster for the next 48 hours.</p>
                </div>
                <button className="boost-btn">Share Now</button>
            </div>
        </div>
    );
};

export default DopamineDashboard;
