import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    Search, Mic, Wand2, Save, Bell, List, Grid, MapPin, Zap,
    ChevronDown, ChevronUp, Sparkles, Crown, Trophy, Users,
    ShieldCheck, Clock, Award, TrendingUp, Heart, Share2, MessageCircle, MoreVertical,
    Cloud, RefreshCw, FileCheck, AlertTriangle, Backpack, Languages, Calculator, Wallet
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import SupportCard from './components/SupportCard';
import '../../styles/SupportUtility.css';

const QUICK_FILTER_CATEGORIES = [
    { id: 'weather', label: 'Weather', icon: '☁️' },
    { id: 'currency', label: 'Currency', icon: '💱' },
    { id: 'visa-checker', label: 'Visa Checker', icon: '🛂' },
    { id: 'embassy-finder', label: 'Embassy Finder', icon: '🏛️' },
    { id: 'safety-alerts', label: 'Safety Alerts', icon: '⚠️' },
    { id: 'packing-list', label: 'Packing List', icon: '🎒' },
    { id: 'translator', label: 'Translator', icon: '🗣️' },
    { id: 'time-zones', label: 'Time Zones', icon: '🕒' },
    { id: 'emergency', label: 'Emergency', icon: '🆘' },
    { id: 'ai-picks', label: 'AI Picks', icon: '🧠', isPrime: true }
];

const MOCK_UTILITY_DATA = [
    {
        id: 1,
        title: "Live Weather Radar",
        category: "Weather",
        icon: <Cloud size={48} color="#3b82f6" />,
        rating: 4.9,
        users: "10k+",
        reliability: "High",
        matchScore: "99%",
        trending: true,
        price: "Free",
        xpReward: 500,
        status: "Live",
        tags: ["Real-time", "Accurate", "Global"],
        aiInsight: "Essential for your current location in Bali."
    },
    {
        id: 2,
        title: "Smart Currency Converter",
        category: "Currency",
        icon: <RefreshCw size={48} color="#10b981" />,
        rating: 4.8,
        users: "25k+",
        reliability: "Verified",
        matchScore: "98%",
        trending: false,
        price: "Free",
        xpReward: 300,
        status: "Live Rates",
        tags: ["Offline Mode", "All Currencies", "Fast"],
        aiInsight: "Best rates for USD to IDR conversion."
    },
    {
        id: 3,
        title: "Global Visa Checker",
        category: "Visa Checker",
        icon: <FileCheck size={48} color="#f59e0b" />,
        rating: 4.9,
        users: "15k+",
        reliability: "Official",
        matchScore: "97%",
        trending: true,
        price: "Free",
        xpReward: 800,
        status: "Updated",
        tags: ["Official Data", "E-Visa Links", "Secure"],
        aiInsight: "Check requirements for your next trip to Japan."
    },
    {
        id: 4,
        title: "AI Safety Monitor",
        category: "Safety Alerts",
        icon: <AlertTriangle size={48} color="#ef4444" />,
        rating: 4.7,
        users: "8k+",
        reliability: "Critical",
        matchScore: "96%",
        trending: true,
        price: "Premium",
        xpReward: 1200,
        status: "Monitoring",
        tags: ["Real-time Alerts", "SOS Button", "Local Info"],
        aiInsight: "Stay safe with real-time local alerts."
    }
];

const SupportUtility = () => {
    const { setModuleNav } = useNavStore();
    const navItems = [
        'Emergency'
    ];

    useEffect(() => {
        setModuleNav(navItems, '/support-utility');
        return () => setModuleNav([], '');
    }, []);

    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchXP, setSearchXP] = useState(78);
    const [liveTickerIndex, setLiveTickerIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const liveTickerMessages = [
        "🔥 50 travelers just checked the Bali weather",
        "✨ New Feature: Offline Translator now available",
        "💎 AI matched 200 users to 'Visa Checker' today",
        "🚀 Currency rates for EUR just updated",
        "🌟 Mark just earned the 'Safe Traveler' badge"
    ];

    const placeholders = [
        "☁️ Check the weather for your next destination",
        "💱 Convert currencies with live rates",
        "🛂 Check visa requirements instantly",
        "🆘 Find emergency contacts near you",
        "🧠 Trending: AI Safety Monitor"
    ];

    useEffect(() => {
        const tickerInterval = setInterval(() => {
            setLiveTickerIndex((prev) => (prev + 1) % liveTickerMessages.length);
        }, 4000);
        const placeholderInterval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => {
            clearInterval(tickerInterval);
            clearInterval(placeholderInterval);
        };
    }, []);

    const toggleFilter = (filterId) => {
        setActiveFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(id => id !== filterId)
                : [...prev, filterId]
        );
    };

    const handleSurpriseMe = () => {
        const randomItem = MOCK_UTILITY_DATA[Math.floor(Math.random() * MOCK_UTILITY_DATA.length)];
        setSearchQuery(randomItem.title);
    };

    const SupportListView = ({ category }) => {
        const filteredData = MOCK_UTILITY_DATA.filter(item => {
            if (category !== 'all' && item.category.toLowerCase() !== category.toLowerCase()) return false;
            if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });

        return (
            <div className={`support-content-grid ${viewMode}`}>
                {filteredData.map(item => (
                    <SupportCard key={item.id} item={item} viewMode={viewMode} />
                ))}
            </div>
        );
    };

    return (
        <div className="support-utility-page">
            {/* Global ModuleNavbar is now in NavbarV3 */}

            {/* Premium Search Interface */}
            <div className="premium-search-container redesign">
                {/* Top Row: Primary Discovery */}
                <div className="search-primary-row">
                    <div className="search-main-group">
                        <div className="premium-search-bar">
                            <Search className="search-icon-large" size={20} />
                            <input
                                type="text"
                                placeholder={placeholders[placeholderIndex]}
                                className="premium-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="search-actions">
                                <Mic className="mic-icon" size={18} />
                                <button className="surprise-btn" onClick={handleSurpriseMe} title="Surprise Me!">
                                    <Wand2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="search-meta-actions">
                            <button
                                className={`save-search-btn ${isSaved ? 'active' : ''}`}
                                onClick={() => setIsSaved(!isSaved)}
                                title={isSaved ? "Search Saved" : "Save Search"}
                            >
                                {isSaved ? <Bell size={18} /> : <Save size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="search-controls-group">
                        <div className="view-toggles-premium">
                            <button className={viewMode === 'list' ? "active" : ""} onClick={() => setViewMode('list')} title="List View">
                                <List size={18} />
                            </button>
                            <button className={viewMode === 'grid' ? "active" : ""} onClick={() => setViewMode('grid')} title="Grid View">
                                <Grid size={18} />
                            </button>
                            <button className={viewMode === 'map' ? "active" : ""} onClick={() => setViewMode('map')} title="Map View">
                                <MapPin size={18} />
                            </button>
                        </div>

                        <div className="xp-progress-container" title="Utility XP">
                            <div className="xp-label">
                                <Zap size={12} fill="#f59e0b" color="#f59e0b" />
                                <span>{searchXP}%</span>
                            </div>
                            <div className="xp-bar-bg">
                                <div className="xp-bar-fill" style={{ width: `${searchXP}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Row: Live Ticker & Quick Actions */}
                <div className="search-secondary-row">
                    <div className="live-ticker">
                        <div className="ticker-content">
                            {liveTickerMessages[liveTickerIndex]}
                        </div>
                    </div>

                    <div className="secondary-actions">
                        <button className="clear-all-btn" onClick={() => {
                            setActiveFilters([]);
                            setSearchQuery('');
                        }}>
                            Clear All
                        </button>
                        <button className="expand-filters-btn" onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
                            {isSearchExpanded ? 'Less Filters' : 'More Filters'}
                            {isSearchExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    </div>
                </div>

                {/* Expanded Row: Smart Filters & Intents */}
                {isSearchExpanded && (
                    <div className="search-expanded-content">
                        <div className="intents-and-suggestions">
                            <div className="quick-intents-v2">
                                {QUICK_FILTER_CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`intent-pill ${activeFilters.includes(cat.id) ? 'active' : ''} ${cat.isPrime ? 'prime' : ''}`}
                                        onClick={() => toggleFilter(cat.id)}
                                    >
                                        <span className="pill-icon">{cat.icon}</span>
                                        <span className="pill-label">{cat.label}</span>
                                        {cat.isPrime && <Crown size={10} className="prime-icon" />}
                                    </button>
                                ))}
                            </div>

                            <div className="ai-suggestions-v2">
                                <div className="ai-header">
                                    <Sparkles size={14} className="sparkle-icon" />
                                    <span>AI Utility Insights</span>
                                </div>
                                <div className="suggestion-chips">
                                    <button className="suggestion-chip">Bali Weather Forecast</button>
                                    <button className="suggestion-chip sponsored">
                                        Premium Safety Monitor
                                        <span className="sponsored-tag">Featured</span>
                                    </button>
                                    <button className="suggestion-chip">Packing for Japan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="support-content-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="weather" replace />} />
                    <Route path="weather" element={<SupportListView category="Weather" />} />
                    <Route path="currency" element={<SupportListView category="Currency" />} />
                    <Route path="visa-checker" element={<SupportListView category="Visa Checker" />} />
                    <Route path="embassy-finder" element={<SupportListView category="Embassy Finder" />} />
                    <Route path="safety-alerts" element={<SupportListView category="Safety Alerts" />} />
                    <Route path="packing-list" element={<SupportListView category="Packing List" />} />
                    <Route path="translator" element={<SupportListView category="Translator" />} />
                    <Route path="time-zones" element={<SupportListView category="Time Zones" />} />
                    <Route path="emergency" element={<SupportListView category="Emergency" />} />
                </Routes>
            </div>

            {/* AI Utility Agent Trigger */}
            <div className="ai-utility-agent-trigger">
                <button className="agent-btn">
                    <Sparkles size={24} color="white" />
                    <div className="notif-dot"></div>
                    <span className="tooltip">AI Utility Agent</span>
                </button>
            </div>
        </div>
    );
};

export default SupportUtility;
