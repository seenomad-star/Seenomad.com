import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNavStore } from '../../store/navStore';
import {
    History, TrendingUp, Sparkles, MapPin, User, Calendar,
    Search, X, Compass, Globe, ArrowRight, ShieldCheck, Cpu
} from 'lucide-react';

const SearchDropdown = () => {
    const { isSearchOpen, toggleSearch, setGlobalSearchQuery } = useNavStore();
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isSearchOpen) {
                toggleSearch(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, toggleSearch]);

    if (!isSearchOpen) return null;

    const quickLinks = [
        { label: 'Explore Destinations', path: '/explore/destinations', icon: <Compass size={15} />, tag: 'Explore' },
        { label: 'Nomad Visa Guide', path: '/explore/visa', icon: <Globe size={15} />, tag: 'Visas' },
        { label: 'AI Travel Agents', path: '/ai-agents', icon: <Cpu size={15} />, tag: 'AI' },
        { label: 'Upcoming Festivals & Events', path: '/event-festival', icon: <Calendar size={15} />, tag: 'Events' },
        { label: 'Nomad Community Feed', path: '/community', icon: <User size={15} />, tag: 'Social' }
    ];

    const sections = [
        {
            title: 'RECENT SEARCHES',
            icon: <History size={14} />,
            items: [
                { label: 'Bali 2026 Cost of Living', path: '/explore/destinations', type: 'Destination' },
                { label: 'Portugal Digital Nomad Visa', path: '/explore/visa', type: 'Visa' },
                { label: 'Top Coworking in Lisbon', path: '/explore/coworking', type: 'Guide' }
            ]
        },
        {
            title: 'AI RECOMMENDATIONS',
            icon: <Sparkles size={14} />,
            items: [
                { label: 'How to apply for Thailand DTV Visa', path: '/explore/visa', type: 'AI Guide' },
                { label: 'Best warm hubs for November nomads', path: '/explore/destinations', type: 'AI Curated' },
                { label: 'Goa Sunburn Festival meetups', path: '/event-festival', type: 'Event' }
            ]
        },
        {
            title: 'TRENDING IN COMMUNITY',
            icon: <TrendingUp size={14} />,
            items: [
                { label: '#DigitalNomadTaxes2026', path: '/community', type: 'Topic' },
                { label: 'Starlink Mini for Nomads review', path: '/support-utility', type: 'Hardware' }
            ]
        }
    ];

    const handleSelect = (path, label) => {
        setGlobalSearchQuery(label);
        toggleSearch(false);
        if (path) navigate(path);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setGlobalSearchQuery(searchTerm.trim());
            toggleSearch(false);
            navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    // Filter items if searchTerm is typed
    const filteredQuick = quickLinks.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="search-overlay" onClick={() => toggleSearch(false)} />
            <motion.div
                className="search-dropdown-v3"
                initial={{ opacity: 0, y: -20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                transition={{ duration: 0.2 }}
            >
                {/* Search Input Header */}
                <form onSubmit={handleFormSubmit} className="search-palette-header">
                    <Search size={18} className="palette-search-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search destinations, visas, hubs, AI agents..."
                        className="palette-search-input"
                        aria-label="Universal Search Input"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="palette-clear-btn"
                            onClick={() => setSearchTerm('')}
                            aria-label="Clear search"
                        >
                            <X size={15} />
                        </button>
                    )}
                    <button
                        type="button"
                        className="palette-close-btn"
                        onClick={() => toggleSearch(false)}
                        aria-label="Close search"
                    >
                        esc
                    </button>
                </form>

                {/* Quick Navigation Pills */}
                <div className="search-quick-pills">
                    {filteredQuick.map((link, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className="quick-pill-btn"
                            onClick={() => handleSelect(link.path, link.label)}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </button>
                    ))}
                </div>

                {/* Structured Sections */}
                <div className="search-scroll-area">
                    {sections.map((section, idx) => {
                        const matchingItems = section.items.filter(item =>
                            !searchTerm || item.label.toLowerCase().includes(searchTerm.toLowerCase())
                        );

                        if (matchingItems.length === 0) return null;

                        return (
                            <div key={idx} className="search-section">
                                <div className="section-header">
                                    {section.icon}
                                    <span>{section.title}</span>
                                </div>
                                <div className="section-items">
                                    {matchingItems.map((item, i) => (
                                        <div
                                            key={i}
                                            className="search-item"
                                            onClick={() => handleSelect(item.path, item.label)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <span className="item-label">{item.label}</span>
                                            {item.type && <span className="item-tag">{item.type}</span>}
                                            <ArrowRight size={14} className="item-hint" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="search-footer">
                    <div className="footer-tip">
                        <span>Press <strong>Enter</strong> to search</span>
                    </div>
                    <div className="footer-hints">
                        <span>Esc to close</span>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default SearchDropdown;
