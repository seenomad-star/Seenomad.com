import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, 
    Shield, 
    TrendingUp, 
    Users, 
    Cpu, 
    Plane, 
    AlertTriangle, 
    ArrowUpRight,
    MessageSquare,
    Globe,
    Radio,
    Coins
} from 'lucide-react';
import '../styles/AgentNexusFeed.css';
import ReporterSubmitModal from './ReporterSubmitModal';

const AgentNexusFeed = () => {
    const [isScanning, setIsScanning] = useState(true);
    const [signals, setSignals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock Agent Signals
    const initialSignals = [
        {
            id: 'maya-1',
            agent: 'Maya',
            type: 'travel',
            title: 'FLASH DEAL: TOKYO',
            content: 'Direct flights from your current location to HND dropped 42% (Last 10m). Estimated saving: $480.',
            icon: <Plane size={20} />,
            color: '#3b82f6',
            diagnostic: 'Confidence: 98% • Speed: Instant',
            action: 'View Deal'
        },
        {
            id: 'atlas-1',
            agent: 'Atlas',
            type: 'safety',
            title: 'REGIONAL ALERT: CANGGU',
            content: 'Localized storm cell detected. Wind gusts up to 45km/h. Avoid beachfront fixers for the next 4 hours.',
            icon: <AlertTriangle size={20} />,
            color: '#f59e0b',
            diagnostic: 'Severity: Moderate • Time: 08:45 AM',
            action: 'View Map'
        },
        {
            id: 'midas-1',
            agent: 'Midas',
            type: 'economy',
            title: 'NOMAD COIN SIGNAL',
            content: 'Whale accumulation detected in NMD/USDC. Price resistance at $1.42 breaking. Volatility incoming.',
            icon: <TrendingUp size={20} />,
            color: '#10b981',
            diagnostic: 'Volume: +1200% • RSI: Bullish',
            action: 'Trade'
        },
        {
            id: 'nova-1',
            agent: 'Nova',
            type: 'social',
            title: 'LOCAL SYNERGY',
            content: '3 Verified Nomads within 400m share your #AI interest. Suggested meetup: "Zest Cafe" in 15m.',
            icon: <Users size={20} />,
            color: '#a855f7',
            diagnostic: 'Match: 92% • Status: Active',
            action: 'Join'
        },
        {
            id: 'echo-1',
            agent: 'Echo',
            type: 'reporter',
            title: 'LOCAL REPORT: FIBER CUT',
            content: 'Major fiber optic cable cut on Jalan Canggu. 80% of Coworking spaces currently offline. Recovery ETR: 2h.',
            icon: <Radio size={20} />,
            color: '#ff4444',
            diagnostic: 'Reporter: @nomad_jay • Verified: 14',
            earnings: '1.4 NMD',
            action: 'Collect'
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsScanning(false);
            setSignals(initialSignals);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="nexus-feed-container">
            <AnimatePresence>
                {isScanning && (
                    <motion.div 
                        className="nexus-scanner-overlay"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="scanner-elements">
                            <motion.div 
                                className="scanner-ring"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                            <div className="scanner-text">
                                <Cpu size={24} className="pulse-icon" />
                                <h3>SCANNING ECOSYSTEM...</h3>
                                <p>Syncing Maya, Atlas, Midas, Nova & Echo</p>
                            </div>
                            <div className="scanning-bar">
                                <motion.div 
                                    className="scanning-progress"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isScanning && (
                <div className="nexus-content">
                    <div className="nexus-header-stats">
                        <div className="stat-pill">
                            <Activity size={14} />
                            <span>System Latency: 4ms</span>
                        </div>
                        <div className="stat-pill">
                            <Globe size={14} />
                            <span>Nodes: 8,421 Active</span>
                        </div>
                        <button 
                            className="reporter-submit-trigger"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Radio size={14} />
                            <span>Report Local News</span>
                        </button>
                    </div>

                    <ReporterSubmitModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                    />

                    <div className="agent-signal-stack">
                        {signals.map((signal, index) => (
                            <motion.div 
                                key={signal.id}
                                className={`agent-signal-card ${signal.type}`}
                                initial={{ opacity: 0, x: -20, rotateX: -20 }}
                                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="card-hologram" />
                                <div className="card-agent-badge" style={{ backgroundColor: signal.color }}>
                                    {signal.icon}
                                    <span>{signal.agent} Interjection</span>
                                </div>
                                
                                <div className="card-main">
                                    <h4>{signal.title}</h4>
                                    <p>{signal.content}</p>
                                </div>

                                <div className="card-footer">
                                    <div className="card-diagnostic">
                                        <code>{signal.diagnostic}</code>
                                        {signal.earnings && (
                                            <div className="card-earnings-badge">
                                                <Coins size={12} />
                                                <span>{signal.earnings}</span>
                                            </div>
                                        )}
                                    </div>
                                    <button className="card-action-btn" style={{ borderColor: signal.color, color: signal.color }}>
                                        {signal.action}
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Standard Feed Integration Message */}
                    <div className="nexus-feed-divider">
                        <span>LIVE SOCIAL STREAM INJECTED BELOW</span>
                    </div>
                    
                    <div className="nexus-social-placeholder">
                        <div className="ghost-post" />
                        <div className="ghost-post" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentNexusFeed;
