import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNavStore } from '../../store/navStore';
import {
    Home, Compass, Users, Play, Calendar,
    Briefcase, GraduationCap, BarChart3, Download,
    Settings, ShieldCheck, Search, X, Sparkles,
    Star, Wallet, Globe, MapPin, Cpu, ArrowRight,
    Plane, Shield, Coffee, Zap, MessageSquare
} from 'lucide-react';
import './NomadLaunchpad.css';

const NomadLaunchpad = () => {
    const { isModuleSwitcherOpen, toggleModuleSwitcher, setActiveModule, activeModule } = useNavStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isModuleSwitcherOpen) {
                toggleModuleSwitcher(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModuleSwitcherOpen, toggleModuleSwitcher]);

    if (!isModuleSwitcherOpen) return null;

    const categories = [
        { id: 'all', label: 'All Travel Hubs' },
        { id: 'destinations', label: 'Destinations & Visas' },
        { id: 'ai', label: 'AI Trip Planning' },
        { id: 'community', label: 'Community & Events' },
        { id: 'lifestyle', label: 'Work & Lifestyle' }
    ];

    const travelModules = [
        {
            id: 'explore',
            name: 'Destinations Explorer',
            category: 'destinations',
            path: '/explore/destinations',
            icon: <Compass size={28} />,
            color: '#3b82f6',
            badge: '120+ Cities',
            desc: 'Compare cost of living, verified WiFi speeds, safety ratings & nomad scores.'
        },
        {
            id: 'visa',
            name: 'Nomad Visa Guide',
            category: 'destinations',
            path: '/explore/visa',
            icon: <Globe size={28} />,
            color: '#10b981',
            badge: 'Updated 2026',
            desc: 'Eligibility criteria, income limits & direct application steps for 60+ countries.'
        },
        {
            id: 'ai-agents',
            name: 'AI Travel Agents',
            category: 'ai',
            path: '/ai-agents',
            icon: <Cpu size={28} />,
            color: '#8b5cf6',
            badge: 'AI Copilot',
            desc: 'Personalized flight timing, custom nomad itineraries, and visa advice agents.'
        },
        {
            id: 'events',
            name: 'Festivals & Nomad Meetups',
            category: 'community',
            path: '/event-festival',
            icon: <Calendar size={28} />,
            color: '#ec4899',
            badge: 'Upcoming',
            desc: 'Find coworking gatherings, tech conferences, cultural festivals & local coliving meetups.'
        },
        {
            id: 'community',
            name: 'Nomad Community Feed',
            category: 'community',
            path: '/community',
            icon: <Users size={28} />,
            color: '#f59e0b',
            badge: 'Social Hub',
            desc: 'Connect with nomads in your current city, ask questions, and share travel insights.'
        },
        {
            id: 'coworking',
            name: 'Coworking & Work Cafes',
            category: 'lifestyle',
            path: '/explore/coworking',
            icon: <Coffee size={28} />,
            color: '#06b6d4',
            badge: 'Tested WiFi',
            desc: 'Curated cafes with reliable power plugs, ergonomic chairs, and fast connections.'
        },
        {
            id: 'games',
            name: 'Travel Quests & Games',
            category: 'lifestyle',
            path: '/travel-games',
            icon: <Play size={28} />,
            color: '#14b8a6',
            badge: 'Earn Rewards',
            desc: 'Complete city discovery challenges, unlock achievements, and earn Nomad XP.'
        },
        {
            id: 'analytics',
            name: 'Nomad Insights & Pulse',
            category: 'lifestyle',
            path: '/insights-analytics',
            icon: <BarChart3 size={28} />,
            color: '#f97316',
            badge: 'Live Data',
            desc: 'Seasonal migration trends, cost-saving projections, and community analytics.'
        },
        {
            id: 'support',
            name: 'Travel Utilities & Gear',
            category: 'lifestyle',
            path: '/support-utility',
            icon: <Shield size={28} />,
            color: '#6366f1',
            badge: 'Nomad Tools',
            desc: 'Nomad health insurance, SIM cards, tax calculators, and gear recommendations.'
        },
        {
            id: 'business',
            name: 'Coliving & Partners',
            category: 'community',
            path: '/business-partner',
            icon: <Briefcase size={28} />,
            color: '#64748b',
            badge: 'Discounts',
            desc: 'Exclusive nomad discounts on coliving spaces, verified stays, and remote gear.'
        },
        {
            id: 'settings',
            name: 'Profile & Preferences',
            category: 'lifestyle',
            path: '/settings',
            icon: <Settings size={28} />,
            color: '#475569',
            badge: 'Passport',
            desc: 'Manage your home currency, measurement units, travel notifications & privacy.'
        }
    ];

    const quickPicks = [
        { label: '🏝️ Bali Hub', path: '/explore/destinations' },
        { label: '🛂 Thailand DTV Visa', path: '/explore/visa' },
        { label: '🇵🇹 Lisbon Guide', path: '/explore/destinations' },
        { label: '🤖 Plan with AI', path: '/ai-agents' }
    ];

    const filteredModules = travelModules.filter(m => {
        const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
        const matchesSearch = !searchQuery ||
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.badge.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleTileClick = (path, name) => {
        setActiveModule(name);
        toggleModuleSwitcher(false);
        if (path) {
            navigate(path);
        }
    };

    return (
        <AnimatePresence>
            {isModuleSwitcherOpen && (
                <div className="nomad-launchpad-overlay" onClick={() => toggleModuleSwitcher(false)}>
                    <motion.div
                        className="launchpad-content"
                        initial={{ opacity: 0, scale: 0.96, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 15 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Travel Launchpad Header */}
                        <div className="launchpad-header">
                            <div className="launchpad-title-group">
                                <div className="launchpad-badge">
                                    <Sparkles size={14} className="sparkle-icon" />
                                    <span>SEENOMAD TRAVEL HUB</span>
                                </div>
                                <h2 className="launchpad-main-title">Where will you nomad next?</h2>
                                <p className="launchpad-subtitle">
                                    Explore verified destination guides, digital nomad visas, AI trip planning, and global community hubs.
                                </p>
                            </div>

                            <button
                                className="close-launchpad-btn"
                                onClick={() => toggleModuleSwitcher(false)}
                                aria-label="Close Travel Hub"
                                title="Close (Esc)"
                            >
                                <X size={20} />
                                <span>ESC</span>
                            </button>
                        </div>

                        {/* Search & Category Filter Controls */}
                        <div className="launchpad-controls-bar">
                            <div className="launchpad-search-box">
                                <Search size={18} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search destinations, visa guides, AI agents, tools..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    aria-label="Search travel hub"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="clear-search-btn"
                                        aria-label="Clear search"
                                    >
                                        <X size={15} />
                                    </button>
                                )}
                            </div>

                            {/* Category Filter Pills */}
                            <div className="launchpad-category-pills">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Destination Shortcuts Bar */}
                        <div className="launchpad-quick-shortcuts">
                            <span className="shortcuts-label">Popular Shortcuts:</span>
                            <div className="shortcuts-list">
                                {quickPicks.map((pick, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className="quick-shortcut-pill"
                                        onClick={() => handleTileClick(pick.path, pick.label)}
                                    >
                                        {pick.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Travel Module Tiles Grid */}
                        <div className="launchpad-grid-container">
                            <div className="travel-hub-grid">
                                {filteredModules.map((mod) => (
                                    <div
                                        key={mod.id}
                                        className={`travel-tile ${activeModule === mod.name ? 'active' : ''}`}
                                        onClick={() => handleTileClick(mod.path, mod.name)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleTileClick(mod.path, mod.name)}
                                    >
                                        <div className="tile-top-row">
                                            <div
                                                className="tile-icon-box"
                                                style={{ color: mod.color, background: `${mod.color}15`, borderColor: `${mod.color}30` }}
                                            >
                                                {mod.icon}
                                            </div>
                                            <span className="tile-badge-pill" style={{ color: mod.color, background: `${mod.color}12` }}>
                                                {mod.badge}
                                            </span>
                                        </div>

                                        <div className="tile-content">
                                            <h3 className="tile-title">{mod.name}</h3>
                                            <p className="tile-description">{mod.desc}</p>
                                        </div>

                                        <div className="tile-footer-action">
                                            <span className="launch-text">Launch Hub</span>
                                            <ArrowRight size={15} className="arrow-icon" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredModules.length === 0 && (
                                <div className="no-results-state">
                                    <Compass size={42} className="no-results-icon" />
                                    <h3>No travel features found</h3>
                                    <p>Try searching for "Visa", "Bali", "Coworking", or clear your filter.</p>
                                    <button
                                        type="button"
                                        className="reset-filter-btn"
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Launchpad Footer */}
                        <div className="launchpad-footer">
                            <div className="footer-stats">
                                <div className="footer-stat-item">
                                    <Star size={15} className="gold-icon" />
                                    <span>Explorer Level 12</span>
                                </div>
                                <span className="dot-divider">•</span>
                                <div className="footer-stat-item">
                                    <Wallet size={15} className="green-icon" />
                                    <span>$450 Nomad Credits</span>
                                </div>
                            </div>
                            <div className="footer-links-group">
                                <span>Press <strong>Esc</strong> to close</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NomadLaunchpad;
