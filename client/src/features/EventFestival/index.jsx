import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    Search, Mic, Wand2, Save, Bell, List, Grid, MapPin, Zap,
    ChevronDown, ChevronUp, Sparkles, Crown, Trophy, Users,
    ShieldCheck, Clock, Award, TrendingUp, Heart, Share2, MessageCircle, MoreVertical, Ticket, Calendar
} from 'lucide-react';
import ModuleNavbar from '../../components/common/ModuleNavbar';
import EventCard from './components/EventCard';
import '../../styles/EventFestival.css';

const QUICK_FILTER_CATEGORIES = [
    { id: 'upcoming-events', label: 'Upcoming Events', icon: '📅' },
    { id: 'music-festivals', label: 'Music Festivals', icon: '🎵' },
    { id: 'cultural-festivals', label: 'Cultural Festivals', icon: '🎭' },
    { id: 'food--drink', label: 'Food & Drink', icon: '🍕' },
    { id: 'art-exhibitions', label: 'Art Exhibitions', icon: '🎨' },
    { id: 'sports-events', label: 'Sports Events', icon: '🏆' },
    { id: 'conferences', label: 'Conferences', icon: '💼' },
    { id: 'my-tickets', label: 'My Tickets', icon: '🎫' },
    { id: 'calendar', label: 'Calendar', icon: '🗓️' },
    { id: 'ai-picks', label: 'AI Picks', icon: '🧠', isPrime: true }
];

const MOCK_EVENT_DATA = [
    {
        id: 1,
        title: "Tomorrowland 2024",
        location: "Boom, Belgium",
        category: "Music Festivals",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600",
        rating: 4.9,
        attendees: "400k+",
        ticketsLeft: "Sold Out",
        matchScore: "98%",
        trending: true,
        price: "$450",
        xpReward: 2000,
        date: "July 19-28, 2024",
        tags: ["Electronic", "Global", "Legendary"],
        aiInsight: "The ultimate bucket-list music festival."
    },
    {
        id: 2,
        title: "Rio Carnival 2024",
        location: "Rio de Janeiro, Brazil",
        category: "Cultural Festivals",
        image: "https://images.unsplash.com/photo-1590059391056-9e87f7939982?w=600",
        rating: 4.8,
        attendees: "2M+",
        ticketsLeft: "Limited",
        matchScore: "95%",
        trending: true,
        price: "$120",
        xpReward: 2500,
        date: "Feb 9-17, 2024",
        tags: ["Samba", "Parade", "Vibrant"],
        aiInsight: "Experience the world's biggest party."
    },
    {
        id: 3,
        title: "Tokyo Art Expo",
        location: "Tokyo, Japan",
        category: "Art Exhibitions",
        image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600",
        rating: 4.7,
        attendees: "50k+",
        ticketsLeft: "Available",
        matchScore: "92%",
        trending: false,
        price: "$25",
        xpReward: 1200,
        date: "April 12-15, 2024",
        tags: ["Modern Art", "Tech", "Digital"],
        aiInsight: "Perfect for digital art enthusiasts."
    },
    {
        id: 4,
        title: "Gourmet Food Festival",
        location: "Paris, France",
        category: "Food & Drink",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
        rating: 4.9,
        attendees: "30k+",
        ticketsLeft: "Selling Fast",
        matchScore: "96%",
        trending: true,
        price: "$45",
        xpReward: 1500,
        date: "May 20-22, 2024",
        tags: ["Michelin", "Wine", "Pastry"],
        aiInsight: "A culinary journey in the heart of Paris."
    }
];

const EventFestival = () => {
    const navItems = [
        'Upcoming Events',
        'Music Festivals',
        'Cultural Festivals',
        'Food & Drink',
        'Art Exhibitions',
        'Sports Events',
        'Conferences',
        'My Tickets',
        'Calendar'
    ];

    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchXP, setSearchXP] = useState(62);
    const [liveTickerIndex, setLiveTickerIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const liveTickerMessages = [
        "🔥 15 people just booked tickets for Tomorrowland",
        "✨ Early Bird tickets for Rio Carnival now available",
        "💎 AI matched 120 users to 'Tokyo Art Expo' today",
        "🚀 20% discount on Group Tickets for Food Fest",
        "🌟 Sarah just earned the 'Festival Pro' badge"
    ];

    const placeholders = [
        "🎵 Find the best music festivals globally",
        "🎭 Explore cultural events near you",
        "🎫 AI suggests tickets for your profile",
        "🏆 Upcoming sports events this month",
        "🧠 Trending: Rio Carnival 2024"
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
        const randomItem = MOCK_EVENT_DATA[Math.floor(Math.random() * MOCK_EVENT_DATA.length)];
        setSearchQuery(randomItem.title);
    };

    const EventListView = ({ category }) => {
        const filteredData = MOCK_EVENT_DATA.filter(item => {
            if (category !== 'all' && item.category.toLowerCase() !== category.toLowerCase()) return false;
            if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });

        return (
            <div className={`event-content-grid ${viewMode}`}>
                {filteredData.map(item => (
                    <EventCard key={item.id} item={item} viewMode={viewMode} />
                ))}
            </div>
        );
    };

    return (
        <div className="event-festival-page">
            <ModuleNavbar items={navItems} basePath="/event-festival" />

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

                        <div className="xp-progress-container" title="Event XP">
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
                                    <span>AI Event Insights</span>
                                </div>
                                <div className="suggestion-chips">
                                    <button className="suggestion-chip">Tomorrowland Weekend 1</button>
                                    <button className="suggestion-chip sponsored">
                                        Rio Carnival VIP
                                        <span className="sponsored-tag">Featured</span>
                                    </button>
                                    <button className="suggestion-chip">NBA Finals 2024</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="event-content-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="upcoming-events" replace />} />
                    <Route path="upcoming-events" element={<EventListView category="all" />} />
                    <Route path="music-festivals" element={<EventListView category="Music Festivals" />} />
                    <Route path="cultural-festivals" element={<EventListView category="Cultural Festivals" />} />
                    <Route path="food--drink" element={<EventListView category="Food & Drink" />} />
                    <Route path="art-exhibitions" element={<EventListView category="Art Exhibitions" />} />
                    <Route path="sports-events" element={<EventListView category="Sports Events" />} />
                    <Route path="conferences" element={<EventListView category="Conferences" />} />
                    <Route path="my-tickets" element={<div>My Tickets Content</div>} />
                    <Route path="calendar" element={<div>Calendar Content</div>} />
                </Routes>
            </div>

            {/* AI Event Agent Trigger */}
            <div className="ai-event-agent-trigger">
                <button className="agent-btn">
                    <Sparkles size={24} color="white" />
                    <div className="notif-dot"></div>
                    <span className="tooltip">AI Event Agent</span>
                </button>
            </div>
        </div>
    );
};

export default EventFestival;
