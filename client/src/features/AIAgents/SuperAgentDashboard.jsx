import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cpu, Activity, Zap, 
    MessageSquare, ShieldCheck,
    Users, Briefcase, Globe,
    ChevronRight, Sparkles,
    Gift, Package, Trophy
} from 'lucide-react';
import { useUserProfileStore } from '../../store/userProfileStore';

const SuperAgentDashboard = () => {
    const [activeTab, setActiveTab] = useState('SUPER'); // 'SUPER', 'VAULT'
    const { rewards, claimReward } = useUserProfileStore();
    
    const unclaimedCount = rewards.filter(r => !r.claimed).length;

    return (
        <div className="super-agent-dashboard">
            <div className="dashboard-header">
                <div className="header-top">
                    <Cpu size={24} className="cpu-icon" />
                    <h2>Super AI Agent</h2>
                </div>
                <div className="tab-switcher">
                    <button 
                        className={`tab-btn ${activeTab === 'SUPER' ? 'active' : ''}`}
                        onClick={() => setActiveTab('SUPER')}
                    >
                        Console
                    </button>
                    <button 
                        className={`tab-btn vault-btn ${activeTab === 'VAULT' ? 'active' : ''}`}
                        onClick={() => setActiveTab('VAULT')}
                    >
                        The Vault {unclaimedCount > 0 && <span className="badge">{unclaimedCount}</span>}
                    </button>
                </div>
            </div>

            <div className="viewport-container">
                <AnimatePresence mode="wait">
                    {activeTab === 'SUPER' ? (
                        <motion.div 
                            key="console"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="agent-console"
                        >
                            <div className="orchestration-status">
                                <Activity size={14} />
                                <span>Orchestrating 3 Specialized Nodes</span>
                            </div>

                            <div className="super-actions">
                                <div className="action-card">
                                    <Zap size={18} />
                                    <div className="a-info">
                                        <strong>Geo-Sort Active</strong>
                                        <p>Optimizing routes by distance & culture.</p>
                                    </div>
                                </div>
                                <div className="action-card security">
                                    <ShieldCheck size={18} />
                                    <div className="a-info">
                                        <strong>Safety Intelligence</strong>
                                        <p>Hyper-local threat detection enabled.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="super-agent-status-box">
                                <Sparkles size={20} className="sparkle" />
                                <p>"Atlas is currently checking Kyoto festivals while Remi scouts for authentic tea houses near your hotel."</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="vault"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="perks-vault"
                        >
                            <div className="vault-header">
                                <Trophy size={18} />
                                <h3>Collected Perks & Gifts</h3>
                            </div>

                            <div className="rewards-stack">
                                {rewards.map(reward => (
                                    <div key={reward.id} className={`reward-item ${reward.claimed ? 'claimed' : ''}`}>
                                        <div className="r-icon">
                                            {reward.icon === 'Zap' ? <Zap size={18} /> : 
                                             reward.icon === 'Award' ? <Trophy size={18} /> : <Gift size={18} />}
                                        </div>
                                        <div className="r-details">
                                            <h4>{reward.title}</h4>
                                            <p>{reward.type === 'credits' ? `+${reward.value} NC` : reward.desc}</p>
                                        </div>
                                        {!reward.claimed && (
                                            <button 
                                                className="claim-btn"
                                                onClick={() => claimReward(reward.id)}
                                            >
                                                Claim
                                            </button>
                                        )}
                                        {reward.claimed && <span className="claimed-status">Claimed</span>}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="super-agent-footer">
                <p>The Triplay Super Agent ecosystem acts as your 24/7 proactive travel concierge.</p>
            </div>
        </div>
    );
};

export default SuperAgentDashboard;
