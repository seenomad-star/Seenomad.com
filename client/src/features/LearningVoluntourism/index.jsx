import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    Search, Mic, Wand2, Save, Bell, List, Grid, MapPin, Zap,
    ChevronDown, ChevronUp, Sparkles, Crown, Trophy, Users,
    ShieldCheck, Clock, Award, TrendingUp, Heart, Share2, MessageCircle, MoreVertical
} from 'lucide-react';
import ModuleNavbar from '../../components/common/ModuleNavbar';
import LearningCard from './components/LearningCard';
import '../../styles/LearningVoluntourism.css';

const QUICK_FILTER_CATEGORIES = [
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'workshops', label: 'Workshops', icon: '🛠️' },
    { id: 'language-learning', label: 'Language Learning', icon: '🗣️' },
    { id: 'cultural-exchange', label: 'Cultural Exchange', icon: '🌍' },
    { id: 'volunteer-projects', label: 'Volunteer Projects', icon: '🤝' },
    { id: 'eco-tourism', label: 'Eco-Tourism', icon: '🌱' },
    { id: 'gap-year', label: 'Gap Year', icon: '🎒' },
    { id: 'scholarships', label: 'Scholarships', icon: '🎓' },
    { id: 'certifications', label: 'Certifications', icon: '📜' },
    { id: 'ai-picks', label: 'AI Picks', icon: '🧠', isPrime: true }
];

const MOCK_LEARNING_DATA = [
    {
        id: 1,
        title: "Sustainable Tourism Management",
        category: "Courses",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600",
        rating: 4.9,
        enrolled: "2.5k",
        impactScore: "High",
        matchScore: "98%",
        trending: true,
        price: "$49",
        xpReward: 1500,
        duration: "6 Weeks",
        tags: ["Verified", "Career Boost", "Eco-Friendly"],
        aiInsight: "Top match for your interest in sustainability."
    },
    {
        id: 2,
        title: "Marine Conservation Volunteer",
        category: "Volunteer Projects",
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600",
        rating: 4.8,
        enrolled: "1.2k",
        impactScore: "Critical",
        matchScore: "95%",
        trending: false,
        price: "Free",
        xpReward: 2500,
        duration: "2 Weeks",
        tags: ["Hands-on", "Wildlife", "Ocean"],
        aiInsight: "Highly impactful project in the Maldives."
    },
    {
        id: 3,
        title: "Advanced Python for Digital Nomads",
        category: "Workshops",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
        rating: 4.7,
        enrolled: "3.8k",
        impactScore: "Medium",
        matchScore: "92%",
        trending: true,
        price: "$29",
        xpReward: 1200,
        duration: "3 Days",
        tags: ["Remote Work", "Tech", "Skill Up"],
        aiInsight: "Perfect for your remote work profile."
    },
    {
        id: 4,
        title: "Japanese Language & Culture",
        category: "Language Learning",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600",
        rating: 4.9,
        enrolled: "5.2k",
        impactScore: "High",
        matchScore: "96%",
        trending: false,
        price: "$19/mo",
        xpReward: 1800,
        duration: "Self-paced",
        tags: ["Cultural", "Beginner", "Interactive"],
        aiInsight: "Essential for your upcoming Tokyo trip."
    }
];

const LearningVoluntourism = () => {
    const navItems = [
        'Courses',
        'Workshops',
        'Language Learning',
        'Cultural Exchange',
        'Volunteer Projects',
        'Eco-Tourism',
        'Gap Year',
        'Scholarships',
        'Certifications'
    ];

    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchXP, setSearchXP] = useState(45);
    const [liveTickerIndex, setLiveTickerIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const liveTickerMessages = [
        "🔥 12 people just enrolled in Marine Conservation",
        "✨ New Scholarship: Global Impact 2026 now open",
        "💎 AI matched 50 users to 'Eco-Tourism' today",
        "🚀 30% discount on all Certifications this week",
        "🌟 Alex just earned the 'Global Citizen' badge"
    ];

    const placeholders = [
        "📚 What do you want to learn today?",
        "🤝 Find high-impact volunteer projects",
        "🎓 AI suggests Scholarships for your profile",
        "🌍 Explore cultural exchange programs",
        "🧠 Trending: Sustainable Tourism"
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
        const randomItem = MOCK_LEARNING_DATA[Math.floor(Math.random() * MOCK_LEARNING_DATA.length)];
        setSearchQuery(randomItem.title);
    };

    const LearningListView = ({ category }) => {
        const filteredData = MOCK_LEARNING_DATA.filter(item => {
            if (category !== 'all' && item.category.toLowerCase() !== category.toLowerCase()) return false;
            if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });

        return (
            <div className={`learning-content-grid ${viewMode}`}>
                {filteredData.map(item => (
                    <LearningCard key={item.id} item={item} viewMode={viewMode} />
                ))}
            </div>
        );
    };

    return (
        <div className="learning-voluntourism-page">
            <ModuleNavbar items={navItems} basePath="/learning-voluntourism" />

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

                        <div className="xp-progress-container" title="Impact XP">
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
                                    <span>AI Impact Insights</span>
                                </div>
                                <div className="suggestion-chips">
                                    <button className="suggestion-chip">Marine Bio in Bali</button>
                                    <button className="suggestion-chip sponsored">
                                        Python for Travelers
                                        <span className="sponsored-tag">Featured</span>
                                    </button>
                                    <button className="suggestion-chip">TEFL Certification</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="learning-content-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="courses" replace />} />
                    <Route path="courses" element={<LearningListView category="Courses" />} />
                    <Route path="workshops" element={<LearningListView category="Workshops" />} />
                    <Route path="language-learning" element={<LearningListView category="Language Learning" />} />
                    <Route path="cultural-exchange" element={<LearningListView category="Cultural Exchange" />} />
                    <Route path="volunteer-projects" element={<LearningListView category="Volunteer Projects" />} />
                    <Route path="eco-tourism" element={<LearningListView category="Eco-Tourism" />} />
                    <Route path="gap-year" element={<LearningListView category="Gap Year" />} />
                    <Route path="scholarships" element={<LearningListView category="Scholarships" />} />
                    <Route path="certifications" element={<LearningListView category="Certifications" />} />
                </Routes>
            </div>

            {/* AI Impact Agent Trigger */}
            <div className="ai-impact-agent-trigger">
                <button className="agent-btn">
                    <Sparkles size={24} color="white" />
                    <div className="notif-dot"></div>
                    <span className="tooltip">AI Impact Agent</span>
                </button>
            </div>
        </div>
    );
};

export default LearningVoluntourism;
