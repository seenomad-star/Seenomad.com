import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Globe, 
    DollarSign, 
    Shield, 
    Wifi, 
    Music, 
    Clock, 
    ArrowRightLeft,
    Activity,
    Flame
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import './NomadDock.css';

const NomadDock = () => {
    const { dailyStreak, dailyXP } = useNomadOSStore();
    const [activeTool, setActiveTool] = useState(null);
    const [time, setTime] = useState(new Date());

    const dailyGoal = 100;
    const progress = Math.min((dailyXP / dailyGoal) * 100, 100);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const tools = [
        {
            id: 'user',
            icon: () => (
                <div className="dock-user-avatar">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="User" />
                    <div className="status-indicator online"></div>
                </div>
            ),
            label: 'Elite Explorer',
            content: (
                <div className="tool-detail">
                    <div className="user-badge">ELITE</div>
                    <span className="user-status">Exploring</span>
                    <div className="dock-user-stats">
                        <div className="stat-row">
                            <Flame size={12} className="text-orange" />
                            <span>{dailyStreak} DAY STREAK</span>
                        </div>
                        <div className="stat-row">
                            <Activity size={12} className="text-blue" />
                            <span>{dailyXP}/{dailyGoal} XP</span>
                        </div>
                        <div className="dock-progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            )
        },
        { 
            id: 'journey', 
            icon: Globe, 
            label: 'Next Journey', 
            content: (
                <div className="tool-detail">
                    <div className="journey-header">
                        <strong>Japan • Tokyo</strong>
                        <span className="days-left">12 DAYS TO GO</span>
                    </div>
                    <div className="journey-checklist">
                        <div className="check-item done">✓ Visa Approved</div>
                        <div className="check-item">○ Book JR Pass</div>
                    </div>
                </div>
            )
        },
        { 
            id: 'wifi', 
            icon: Wifi, 
            label: 'Find WiFi', 
            content: (
                <div className="tool-detail">
                    <span className="detail-sub">Nearby reliable hotspots</span>
                    <div className="hotspot-list">
                        <div className="hotspot">
                            <Wifi size={12} className="text-success" />
                            <span>Zest Cafe</span>
                            <span className="speed">85Mbps</span>
                        </div>
                        <div className="hotspot">
                            <Wifi size={12} className="text-warning" />
                            <span>Bara Roots</span>
                            <span className="speed">12Mbps</span>
                        </div>
                    </div>
                </div>
            )
        },
        { 
            id: 'visa', 
            icon: Shield, 
            label: 'Visa Check', 
            content: (
                <div className="tool-detail">
                    <div className="visa-info-card">
                        <span className="label">Current Stay</span>
                        <strong>14 days left</strong>
                    </div>
                </div>
            )
        },
        { 
            id: 'translate', 
            icon: ArrowRightLeft, 
            label: 'Translate', 
            content: (
                <div className="tool-detail">
                    <span className="detail-sub">Live voice/text camera</span>
                    <button className="mini-action-btn">Open Lens</button>
                </div>
            )
        },
        { 
            id: 'safety', 
            icon: Shield, 
            label: 'Safety Map', 
            content: (
                <div className="tool-detail">
                    <span className="detail-sub">Real-time alerts</span>
                    <div className="safety-status low">
                        <div className="pulse-dot"></div>
                        <span>Zone: Safe</span>
                    </div>
                </div>
            )
        },
        { 
            id: 'pulse', 
            icon: Activity, 
            label: 'Pulse Feed', 
            content: (
                <div className="tool-detail">
                    <span className="detail-sub">Live social signals</span>
                    <button className="mini-action-btn">View Pulse</button>
                </div>
            )
        }
    ];

    return (
        <div className="nomad-dock-wrapper">
            <div className="nomad-dock">
                {tools.map((tool) => (
                    <div 
                        key={tool.id} 
                        className={`dock-item-container ${activeTool === tool.id ? 'active' : ''} ${tool.id === 'user' ? 'user-top' : ''} ${tool.id}`}
                        onMouseEnter={() => setActiveTool(tool.id)}
                        onMouseLeave={() => setActiveTool(null)}
                    >
                        <motion.button 
                            className={`dock-item ${tool.id}`}
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ 
                                color: tool.id === 'safety' ? '#f59e0b' : tool.id === 'pulse' ? '#10b981' : 'inherit'
                            }}
                        >
                            {typeof tool.icon === 'function' ? <tool.icon /> : <tool.icon size={20} />}
                        </motion.button>

                        <AnimatePresence>
                            {activeTool === tool.id && (
                                <motion.div 
                                    className="dock-tooltip"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <div className="tooltip-header">{tool.label}</div>
                                    {tool.content}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NomadDock;
