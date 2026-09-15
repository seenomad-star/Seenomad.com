import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavStore } from '../../store/navStore';
import {
    Home, Compass, Users, Play, Calendar,
    Briefcase, GraduationCap, BarChart3, Download,
    Settings, ShieldCheck, HelpCircle, Search, X,
    Star, Wallet, Zap, Flame, Globe, Map
} from 'lucide-react';
import './NomadLaunchpad.css';

const NomadLaunchpad = () => {
    const { isModuleSwitcherOpen, toggleModuleSwitcher, setActiveModule, activeModule } = useNavStore();
    const [searchQuery, setSearchQuery] = useState('');

    if (!isModuleSwitcherOpen) return null;

    const modules = [
        { id: 'home', name: 'Home', icon: <Home size={32} />, color: '#3b82f6', desc: 'Your personal travel dashboard' },
        { id: 'explore', name: 'Explore', icon: <Compass size={32} />, color: '#10b981', desc: 'Discover new destinations' },
        { id: 'popular', name: 'Popular', icon: <Flame size={32} />, color: '#ef4444', desc: 'Trending in the community' },
        { id: 'community', name: 'Community', icon: <Users size={32} />, color: '#8b5cf6', desc: 'Connect with fellow nomads' },
        { id: 'games', name: 'Travel Games', icon: <Play size={32} />, color: '#f59e0b', desc: 'Play and earn rewards' },
        { id: 'events', name: 'Events', icon: <Calendar size={32} />, color: '#ec4899', desc: 'Festivals and meetups' },
        { id: 'business', name: 'Business', icon: <Briefcase size={32} />, color: '#6366f1', desc: 'Partner opportunities' },
        { id: 'learning', name: 'Learning', icon: <GraduationCap size={32} />, color: '#14b8a6', desc: 'Voluntourism & courses' },
        { id: 'analytics', name: 'Analytics', icon: <BarChart3 size={32} />, color: '#f97316', desc: 'Travel insights' },
        { id: 'download', name: 'Mobile App', icon: <Download size={32} />, color: '#06b6d4', desc: 'Take Seenomad on the go' },
        { id: 'settings', name: 'Settings', icon: <Settings size={32} />, color: '#64748b', desc: 'Configure your experience' },
        { id: 'legal', name: 'Legal', icon: <ShieldCheck size={32} />, color: '#475569', desc: 'Terms and privacy' }
    ];

    const filteredModules = modules.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleModuleClick = (name) => {
        setActiveModule(name);
        toggleModuleSwitcher(false);
    };

    return (
        <AnimatePresence>
            {isModuleSwitcherOpen && (
                <motion.div
                    className="nomad-launchpad-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="launchpad-content"
                        initial={{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ scale: 0.9, opacity: 0, filter: 'blur(20px)' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Launchpad Header */}
                        <div className="launchpad-header">
                            <div className="system-hud">
                                <div className="hud-item">
                                    <Star size={18} className="text-gold" />
                                    <div className="hud-text">
                                        <span className="hud-label">LEVEL</span>
                                        <span className="hud-value">12</span>
                                    </div>
                                </div>
                                <div className="hud-item">
                                    <Zap size={18} className="text-blue" />
                                    <div className="hud-text">
                                        <span className="hud-label">XP</span>
                                        <span className="hud-value">4,250</span>
                                    </div>
                                </div>
                                <div className="hud-item">
                                    <Wallet size={18} className="text-green" />
                                    <div className="hud-text">
                                        <span className="hud-label">WALLET</span>
                                        <span className="hud-value">$450.00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="launchpad-search">
                                <Search size={20} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search modules, features, or tools..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="clear-search">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            <button className="close-launchpad" onClick={() => toggleModuleSwitcher(false)}>
                                <X size={24} />
                                <span>ESC</span>
                            </button>
                        </div>

                        {/* Module Grid */}
                        <div className="launchpad-grid-container">
                            <motion.div
                                className="launchpad-grid"
                                layout
                            >
                                {filteredModules.map((mod) => (
                                    <motion.div
                                        key={mod.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`module-tile ${activeModule === mod.name ? 'active' : ''}`}
                                        onClick={() => handleModuleClick(mod.name)}
                                    >
                                        <div className="tile-icon-wrapper" style={{ '--tile-color': mod.color }}>
                                            <div className="tile-glow" />
                                            {mod.icon}
                                        </div>
                                        <div className="tile-info">
                                            <span className="tile-name">{mod.name}</span>
                                            <span className="tile-desc">{mod.desc}</span>
                                        </div>
                                        {activeModule === mod.name && (
                                            <div className="active-indicator">
                                                <div className="pulse-dot" />
                                                Running
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Launchpad Footer */}
                        <div className="launchpad-footer">
                            <div className="footer-links">
                                <span>System v3.0.4</span>
                                <span className="separator">•</span>
                                <a href="#">Documentation</a>
                                <span className="separator">•</span>
                                <a href="#">Support</a>
                            </div>
                            <div className="os-branding">
                                <Globe size={14} />
                                <span>NOMAD OS</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NomadLaunchpad;
