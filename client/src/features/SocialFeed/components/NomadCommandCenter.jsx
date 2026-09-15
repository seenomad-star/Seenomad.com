import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wifi, 
    Shield, 
    Languages, 
    Map, 
    Activity, 
    TrendingUp, 
    AlertCircle, 
    Clock, 
    Plane,
    ChevronRight,
    Search,
    Coffee,
    Camera,
    Tent
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import './NomadCommandCenter.css';

const NomadCommandCenter = () => {
    const { dailyStreak, userLevel } = useNomadOSStore();
    const [mood, setMood] = useState('Exploring');
    const [showMoodPicker, setShowMoodPicker] = useState(false);

    const moods = [
        { label: 'Exploring', icon: <Tent size={14} />, color: '#10b981' },
        { label: 'Deep Work', icon: <Coffee size={14} />, color: '#3b82f6' },
        { label: 'In Transit', icon: <Plane size={14} />, color: '#f59e0b' },
        { label: 'Offline', icon: <Clock size={14} />, color: '#6b7280' }
    ];

    const quickActions = [
        { label: 'Find WiFi', icon: <Wifi size={20} />, color: '#3b82f6', description: 'Nearby reliable hotspots' },
        { label: 'Visa Check', icon: <Shield size={20} />, color: '#10b981', description: 'Current stay: 14 days left' },
        { label: 'Translate', icon: <Languages size={20} />, color: '#a855f7', description: 'Live voice/text camera' },
        { label: 'Safety Map', icon: <Map size={20} />, color: '#ef4444', description: 'Real-time neighborhood alerts' }
    ];

    const currentMood = moods.find(m => m.label === mood);

    const [activeTicker, setActiveTicker] = useState(0);

    const tickerItems = [
        { label: 'MAYA: TRAVEL', content: '✈️ Secret flight drop: Dubai to Bali $180 • HND Slots opening in 4h', color: '#3b82f6' },
        { label: 'ATLAS: SAFETY', content: '🌧️ Canggu: Squall expected in 2h • 🛡️ Visa: Stay alert, Overstay penalty +20%', color: '#f59e0b' },
        { label: 'MIDAS: ECONOMY', content: '💰 NMD: +12.4% (Bullish Scan) • 🐋 Whale alert: 1.2M USDT moved to Liquidity', color: '#10b981' },
        { label: 'NOVA: SOCIAL', content: '☕ 3 Hotspots active in Uluwatu • 🤝 Meetup: Devs @ Zin Cafe in 30m', color: '#a855f7' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTicker((prev) => (prev + 1) % tickerItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentTicker = tickerItems[activeTicker];

    return (
        <div className="command-center-wrapper">
            {/* Top Intelligence Banner */}
            <div className="intelligence-ticker" style={{ borderColor: `${currentTicker.color}40` }}>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTicker}
                        className="ticker-content-wrapper"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="ticker-label" style={{ color: currentTicker.color }}>
                            <TrendingUp size={12} />
                            <span>{currentTicker.label}</span>
                        </div>
                        <div className="ticker-track">
                            <p>{currentTicker.content}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="command-content-grid">
                {/* Left: User Roadmap & Status */}
                <div className="roadmap-column">
                    <div className="user-status-card">
                        <div className="status-header">
                            <div className="status-avatar-ring">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=elite" alt="User" />
                                <div className="online-indicator" />
                            </div>
                            <div className="status-info">
                                <h3>Elite Explorer</h3>
                                <div className="mood-trigger" onClick={() => setShowMoodPicker(!showMoodPicker)}>
                                    <div className="mood-dot" style={{ backgroundColor: currentMood.color }} />
                                    <span>{mood}</span>
                                    <ChevronRight size={12} className={showMoodPicker ? 'rotate-90' : ''} />
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {showMoodPicker && (
                                <motion.div 
                                    className="mood-picker"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {moods.map(m => (
                                        <div 
                                            key={m.label} 
                                            className="mood-option"
                                            onClick={() => { setMood(m.label); setShowMoodPicker(false); }}
                                        >
                                            {m.icon}
                                            <span>{m.label}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="roadmap-mini-card">
                        <div className="card-header">
                            <Plane size={16} />
                            <span>NEXT JOURNEY</span>
                        </div>
                        <h4>Japan • Tokyo</h4>
                        <div className="countdown-bar">
                            <div className="days">12 DAYS TO GO</div>
                            <div className="progress-bg">
                                <div className="progress-fill" style={{ width: '65%' }}></div>
                            </div>
                        </div>
                        <div className="roadmap-tasks">
                            <div className="task done">✓ Visa Approved</div>
                            <div className="task">○ Book JR Pass</div>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Utility Grid */}
                <div className="utility-column">
                    <div className="utility-grid">
                        {quickActions.map(action => (
                            <motion.div 
                                key={action.label} 
                                className="utility-action-card"
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="action-icon" style={{ color: action.color, backgroundColor: `${action.color}15` }}>
                                    {action.icon}
                                </div>
                                <div className="action-text">
                                    <span className="action-label">{action.label}</span>
                                    <span className="action-desc">{action.description}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="search-local-bar">
                        <Search size={18} />
                        <input type="text" placeholder="Search Bali for anything (cafes, fixers, visas)..." />
                        <div className="ai-badge">AI</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NomadCommandCenter;
