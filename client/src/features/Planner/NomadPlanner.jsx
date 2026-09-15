import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, MousePointer2, Plane, Train, Bus, 
    Ship, ArrowRight, Settings, History, Save
} from 'lucide-react';
import SmartPlanner from './components/SmartPlanner';
import ABMagicPlanner from './components/ABMagicPlanner';
import '../../styles/NomadFeatures.css';

const NomadPlanner = () => {
    const [mode, setMode] = useState('smart'); // 'smart' or 'ab-magic'

    return (
        <div className="planner-container">
            <div className="planner-header-main">
                <div className="planner-intro">
                    <h2 className="ach-section-title">Multi-Destination Nomad Planner</h2>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Multi-modal routes (Plane, Train, Bus, Ferry) in 20 seconds.</p>
                </div>
                
                <div className="planner-nav-actions">
                    <button className="tool-btn"><History size={20} /></button>
                    <button className="tool-btn"><Settings size={20} /></button>
                </div>
            </div>

            <div className="mode-toggle-bar">
                <button 
                    className={`mode-btn ${mode === 'smart' ? 'active' : ''}`}
                    onClick={() => setMode('smart')}
                >
                    <Zap size={18} fill={mode === 'smart' ? "currentColor" : "none"} />
                    <div className="mode-text">
                        <span className="mode-label">SMART MODE</span>
                        <span className="mode-sub">AI Generated Planning</span>
                    </div>
                </button>
                <button 
                    className={`mode-btn ${mode === 'ab-magic' ? 'active' : ''}`}
                    onClick={() => setMode('ab-magic')}
                >
                    <MousePointer2 size={18} fill={mode === 'ab-magic' ? "currentColor" : "none"} />
                    <div className="mode-text">
                        <span className="mode-label">AB MAGIC</span>
                        <span className="mode-sub">Step-by-Step Manual</span>
                    </div>
                </button>
            </div>

            <div className="planner-viewport">
                <AnimatePresence mode="wait">
                    {mode === 'smart' ? (
                        <motion.div
                            key="smart"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <SmartPlanner />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="magic"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <ABMagicPlanner />
                        </motion.div>
                    )
                    }
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NomadPlanner;
