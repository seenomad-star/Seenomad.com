import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, Sparkles, Zap, Star, Shield, Filter, X, Globe, User, Briefcase, Target, Play, ChevronRight } from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import NomadToolkit from '../../features/SupportUtility/components/NomadToolkit';
import './NomadGhostDock.css';

// Force HMR Refresh
const NomadGhostDock = () => {
    const navigate = useNavigate();
    const {
        dockState,
        setDockState,
        dockConfig,
        globalSearchQuery,
        searchResults,
        globalActiveFilters,
        setGlobalSearchQuery,
        setGlobalActiveFilters,
        userXP,
        userLevel,
        retentionStreak,
        addXP,
        toggleModuleSwitcher,
        isModuleSwitcherOpen,
        userAvatar,
        userTitle,
        userRank,
        liveInsights,
        hasNewInsights,
        markInsightsAsRead
    } = useNavStore();

    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [showGhostStrip, setShowGhostStrip] = useState(false);
    const lastScrollY = useRef(0);
    const hudRef = useRef(null);
    const { scrollY } = useScroll();

    // Scroll detection for Ghost Mode
    useEffect(() => {
        return scrollY.on('change', (latest) => {
            const direction = latest > lastScrollY.current ? 'down' : 'up';
            if (direction !== (isScrollingDown ? 'down' : 'up') && Math.abs(latest - lastScrollY.current) > 10) {
                setIsScrollingDown(direction === 'down');
                if (direction === 'down' && dockState !== 'hud') {
                    setDockState('orb');
                } else if (direction === 'up' && dockState !== 'hud') {
                    setDockState('command');
                }
            }
            lastScrollY.current = latest;
        });
    }, [scrollY, isScrollingDown, dockState, setDockState]);

    const spawnXPParticles = (startX, startY, amount = 5) => {
        const container = document.getElementById('xp-vacuum-container');
        if (!container) return;

        const dockElement = document.querySelector('.xp-display');
        if (!dockElement) return;
        const dockRect = dockElement.getBoundingClientRect();
        const targetX = dockRect.left + dockRect.width / 2;
        const targetY = dockRect.top + dockRect.height / 2;

        for (let i = 0; i < amount; i++) {
            const particle = document.createElement('div');
            particle.className = 'xp-particle';

            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;

            particle.style.left = `${startX + offsetX}px`;
            particle.style.top = `${startY + offsetY}px`;

            container.appendChild(particle);

            const animation = particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${targetX - startX - offsetX}px, ${targetY - startY - offsetY}px) scale(0.5)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            animation.onfinish = () => {
                particle.remove();
                addXP(10);
            };
        }
    };

    useEffect(() => {
        window.spawnXPParticles = spawnXPParticles;
        return () => delete window.spawnXPParticles;
    }, [addXP]);

    // Click outside to close HUD
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dockState === 'hud' && hudRef.current && !hudRef.current.contains(event.target)) {
                setDockState('command');
            }
        };

        if (dockState === 'hud') {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dockState, setDockState]);

    return (
        <div className="nomad-ghost-dock-container">
            <AnimatePresence mode="wait">
                {dockState === 'orb' && (
                    <motion.div
                        key="orb"
                        layoutId="dock"
                        className="nomad-orb-innovative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={() => setDockState('command')}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        drag
                        dragConstraints={{ left: -window.innerWidth/2, right: window.innerWidth/2, top: -window.innerHeight + 100, bottom: 50 }}
                        dragElastic={0.1}
                        dragMomentum={false}
                    >
                        <div className="orb-glass-inner" />
                        <Compass size={22} className="orb-icon-aura" />
                    </motion.div>
                )}

                {dockState === 'command' && (
                    <div className="dock-command-wrapper">
                        {/* Layer 2: Ghost Strip (Quick Filters) */}
                        <AnimatePresence>
                            {showGhostStrip && dockConfig.quickFilters.length > 0 && (
                                <motion.div
                                    className="nomad-ghost-strip"
                                    initial={{ y: 20, opacity: 0, scale: 0.95 }}
                                    animate={{ y: -65, opacity: 1, scale: 1 }}
                                    exit={{ y: 20, opacity: 0, scale: 0.95 }}
                                >
                                    <div className="ghost-strip-content">
                                        {dockConfig.quickFilters.map(filter => (
                                            <motion.button
                                                key={filter.id}
                                                className={`ghost-chip ${globalActiveFilters.includes(filter.id) ? 'active' : ''}`}
                                                onClick={() => {
                                                    const newFilters = globalActiveFilters.includes(filter.id)
                                                        ? globalActiveFilters.filter(f => f !== filter.id)
                                                        : [...globalActiveFilters, filter.id];
                                                    setGlobalActiveFilters(newFilters);
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span className="chip-label">{filter.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Layer 1: Command Pill */}
                        <motion.div
                            key="command"
                            layoutId="dock"
                            className="nomad-command-pill-innovative"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            drag
                            dragConstraints={{ left: -window.innerWidth/2 + 200, right: window.innerWidth/2 - 200, top: -window.innerHeight + 100, bottom: 50 }}
                            dragElastic={0.05}
                            dragMomentum={false}
                        >
                            <div className="pill-left-minimal" onClick={() => toggleModuleSwitcher(true)}>
                                <div className="system-signal-compact">
                                    <div className="signal-dot" />
                                    <span>OS</span>
                                </div>
                            </div>

                            <div className="pill-center">
                                <Search size={18} className="search-icon" />
                                <div className="pill-center-content">
                                    <div className="active-filters-inline">
                                        {globalActiveFilters.map(filterId => {
                                            const filter = dockConfig.quickFilters.find(f => f.id === filterId);
                                            if (!filter) return null;
                                            return (
                                                <motion.div
                                                    key={filterId}
                                                    className="inline-filter-tag"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.8, opacity: 0 }}
                                                >
                                                    <span>{filter.label}</span>
                                                    <X
                                                        size={12}
                                                        className="remove-tag"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setGlobalActiveFilters(globalActiveFilters.filter(id => id !== filterId));
                                                        }}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={globalActiveFilters.length > 0 ? '' : dockConfig.placeholder}
                                        value={globalSearchQuery}
                                        onChange={(e) => setGlobalSearchQuery(e.target.value)}
                                        onFocus={() => setDockState('command')}
                                    />
                                    {globalSearchQuery && (
                                        <X
                                            size={16}
                                            className="clear-search"
                                            onClick={() => setGlobalSearchQuery('')}
                                        />
                                    )}

                                    {/* Universal Search Results Overlay */}
                                    <AnimatePresence>
                                        {searchResults.length > 0 && (
                                            <motion.div 
                                                className="universal-search-results"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                            >
                                                {searchResults.map(result => (
                                                    <div 
                                                        key={result.id} 
                                                        className="search-result-item"
                                                        onClick={() => {
                                                            navigate(result.path);
                                                            setGlobalSearchQuery('');
                                                        }}
                                                    >
                                                        <div className={`result-icon-box ${result.type.toLowerCase()}`}>
                                                            {result.type === 'Bounty' && <Target size={14} />}
                                                            {result.type === 'Project' && <Briefcase size={14} />}
                                                            {result.type === 'Creator' && <User size={14} />}
                                                            {result.type === 'Video' && <Play size={14} />}
                                                        </div>
                                                        <div className="result-info">
                                                            <span className="result-title">{result.title}</span>
                                                            <span className="result-meta">{result.type} {result.reward ? `• ${result.reward}` : ''}</span>
                                                        </div>
                                                        <ChevronRight size={14} className="result-arrow" />
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="ai-pulse">
                                    <Sparkles size={16} />
                                </div>
                            </div>

                            <div className="pill-right-minimal">
                                {/* Community Social Pulse */}
                                <button
                                    className={`social-trigger-innovative ${hasNewInsights ? 'has-notification' : ''}`}
                                    onClick={() => {
                                        setDockState('hud');
                                        markInsightsAsRead();
                                    }}
                                >
                                    <Star size={20} />
                                    {hasNewInsights && <div className="notification-dot" />}
                                </button>

                                {/* Quick Toolkit */}
                                <button
                                    className={`toolkit-trigger-innovative ${dockState === 'toolkit' ? 'active' : ''}`}
                                    onClick={() => setDockState(dockState === 'toolkit' ? 'command' : 'toolkit')}
                                >
                                    <Zap size={20} />
                                </button>

                                {/* Exit Command Mode */}
                                <button className="exit-command-btn" onClick={() => setDockState('orb')}>
                                    <X size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {dockState === 'hud' && (
                    <motion.div
                        key="hud"
                        ref={hudRef}
                        layoutId="dock"
                        className="nomad-hud-expanded"
                        initial={{ y: 100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 100, opacity: 0, scale: 0.9 }}
                    >
                        <div className="hud-header">
                            <div className="hud-title">
                                <Shield size={20} className="hud-icon" />
                                <span>System Intelligence</span>
                            </div>
                            <motion.button
                                className="hud-close"
                                onClick={() => setDockState('command')}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                title="Close (or click outside)"
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        <div className="hud-content">
                            <div className="hud-stats-grid">
                                <div className="hud-stat-card">
                                    <span className="stat-label">Nomad Level</span>
                                    <span className="stat-value">{userLevel}</span>
                                    <div className="stat-progress">
                                        <div className="progress-fill" style={{ width: `${(userXP % 1000) / 10}%` }} />
                                    </div>
                                </div>
                                <div className="hud-stat-card">
                                    <span className="stat-label">Daily Streak</span>
                                    <span className="stat-value">{retentionStreak}d</span>
                                    <div className="streak-dots">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className={`streak-dot ${i < retentionStreak ? 'active' : ''}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Social Engagement Section */}
                            <div className="hud-social-engagement">
                                <div className="elite-explorer-full">
                                    <img src={userAvatar} alt="Elite Explorer" className="explorer-avatar-large" />
                                    <div className="explorer-details">
                                        <h3>{userTitle}</h3>
                                        <p>{userRank}</p>
                                        <div className="achievement-badges">
                                            <span className="badge">🏆 Top Contributor</span>
                                            <span className="badge">🔥 {retentionStreak} Day Streak</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="daily-streak-enhanced">
                                    <div className="streak-header">
                                        <span className="streak-title">🔥 {retentionStreak} Day Streak</span>
                                        <span className="streak-goal">{7 - (retentionStreak % 7)} days to unlock reward</span>
                                    </div>
                                    <div className="streak-calendar">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className={`calendar-day ${i < retentionStreak ? 'completed' : ''}`}>
                                                <div className="day-dot" />
                                                <span className="day-label">D{i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Live Insights Section */}
                            <div className="hud-live-insights">
                                <span className="section-label">
                                    <Sparkles size={16} />
                                    Live Insights
                                </span>
                                <div className="insights-list">
                                    {liveInsights.map(insight => (
                                        <div className="insight-item" key={insight.id}>
                                            <span className="insight-icon">{insight.icon}</span>
                                            <span className="insight-text">{insight.text}</span>
                                            <span className="insight-time">{insight.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hud-filters-section">
                                <span className="section-label">Active Intelligence Filters</span>
                                <div className="hud-filter-chips">
                                    {['Visa-Free', 'Digital Nomad Hubs', 'High Safety', 'Budget Friendly'].map(filter => (
                                        <motion.div
                                            key={filter}
                                            className="hud-chip"
                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                                        >
                                            {filter}
                                        </motion.div>
                                    ))}
                                    <div className="hud-chip locked">
                                        <Star size={12} />
                                        <span>AI Itinerary (Level 15)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hud-footer">
                            <button className="hud-action-btn primary">
                                <Globe size={18} />
                                <span>Generate Global Map</span>
                            </button>
                        </div>
                    </motion.div>
                )}
                {dockState === 'toolkit' && (
                    <motion.div
                        key="toolkit"
                        layoutId="dock"
                        className="nomad-hud-expanded toolkit-mode"
                        initial={{ y: 100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 100, opacity: 0, scale: 0.9 }}
                    >
                        <div className="hud-header">
                            <div className="hud-title">
                                <Zap size={20} className="toolkit-icon" />
                                <span>Nomad Intelligence</span>
                            </div>
                            <button className="hud-close" onClick={() => setDockState('command')}>
                                <X size={20} />
                            </button>
                        </div>
                        <NomadToolkit />
                    </motion.div>
                )}
            </AnimatePresence>

            <div id="xp-vacuum-container" className="xp-vacuum-container" />
        </div >
    );
};

export default NomadGhostDock;
