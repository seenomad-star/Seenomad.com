import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    Users, UserCheck, Briefcase, TrendingUp, LayoutDashboard, Cpu,
    BarChart3, PieChart, LineChart, Activity, Sparkles, Crown, Trophy,
    ArrowUpRight, ArrowDownRight, Zap, Bell, Save, List, Grid, MapPin,
    ChevronDown, ChevronUp, Clock, Award, Search, Mic, Wand2
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import FloatingFilter from '../../components/common/FloatingFilter';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import AnalyticsCard from './components/AnalyticsCard';
import '../../styles/InsightsAnalytics.css';

const QUICK_FILTER_CATEGORIES = [
    { id: 'user-insights', label: 'User Insights', icon: '👥' },
    { id: 'creator-stats', label: 'Creator Stats', icon: '🎨' },
    { id: 'partner-data', label: 'Partner Data', icon: '💼' },
    { id: 'market-trends', label: 'Market Trends', icon: '📈' },
    { id: 'system-health', label: 'System Health', icon: '🖥️' },
    { id: 'predictions', label: 'Predictions', icon: '🔮' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'logs', label: 'Logs', icon: '📜' },
    { id: 'ai-picks', label: 'AI Insights', icon: '🧠', isPrime: true }
];

const MOCK_ANALYTICS_DATA = [
    {
        id: 1,
        title: "User Retention Analysis",
        category: "User Insights",
        chartType: "line",
        trend: "up",
        percentage: "+15.4%",
        reach: "120k",
        impact: "Critical",
        confidence: "98%",
        trending: true,
        xpReward: 1200,
        updated: "2m ago",
        tags: ["Retention", "Cohort", "AI-Optimized"],
        aiInsight: "Retention is peaking in the 18-24 age group."
    },
    {
        id: 2,
        title: "Creator Revenue Growth",
        category: "Creator Stats",
        chartType: "bar",
        trend: "up",
        percentage: "+22.8%",
        reach: "50k",
        impact: "High",
        confidence: "95%",
        trending: true,
        xpReward: 1500,
        updated: "15m ago",
        tags: ["Revenue", "Monetization", "Creators"],
        aiInsight: "Ad revenue has increased by 30% this quarter."
    },
    {
        id: 3,
        title: "Market Demand Forecast",
        category: "Market Trends",
        chartType: "pie",
        trend: "down",
        percentage: "-2.1%",
        reach: "2M",
        impact: "Medium",
        confidence: "92%",
        trending: false,
        xpReward: 800,
        updated: "1h ago",
        tags: ["Forecast", "Demand", "Global"],
        aiInsight: "Slight dip in demand for luxury travel segments."
    },
    {
        id: 4,
        title: "System Uptime Report",
        category: "System Health",
        chartType: "activity",
        trend: "up",
        percentage: "99.99%",
        reach: "Global",
        impact: "High",
        confidence: "100%",
        trending: false,
        xpReward: 500,
        updated: "Just now",
        tags: ["Uptime", "Latency", "Server"],
        aiInsight: "All systems are performing at optimal capacity."
    }
];

const InsightsAnalytics = () => {
    const { setModuleNav } = useNavStore();
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchXP, setSearchXP] = useState(85);
    const [liveTickerIndex, setLiveTickerIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const navItems = [
        'User Insights',
        'Creator Stats',
        'Partner Data',
        'Market Trends',
        'System Health',
        'Predictions',
        'Reports',
        'Logs'
    ];

    useEffect(() => {
        setModuleNav(navItems, '/insights-analytics');
        return () => setModuleNav([], '');
    }, []);

    const liveTickerMessages = [
        "🔥 120 partners just viewed their ROI reports",
        "✨ AI predicted a 15% surge in Bali bookings",
        "💎 New 'User Behavior' insight unlocked for Admins",
        "🚀 System latency reduced by 40ms globally",
        "🌟 Top Creator 'Alex' just hit 1M reach"
    ];

    useEffect(() => {
        const tickerInterval = setInterval(() => {
            setLiveTickerIndex((prev) => (prev + 1) % liveTickerMessages.length);
        }, 4000);
        return () => clearInterval(tickerInterval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFilter = (filterId) => {
        setActiveFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(id => id !== filterId)
                : [...prev, filterId]
        );
    };

    const AnalyticsListView = ({ category }) => {
        const filteredData = MOCK_ANALYTICS_DATA.filter(item => {
            if (category !== 'all' && item.category.toLowerCase() !== category.toLowerCase()) return false;
            if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });

        return (
            <div className={`analytics-content-grid ${viewMode}`}>
                {filteredData.map(item => (
                    <AnalyticsCard key={item.id} item={item} viewMode={viewMode} />
                ))}
            </div>
        );
    };

    return (
        <div className="insights-analytics-page">
            {/* Top Option Bar (Preserved) */}
            <div className="ia-header">
                <h1 className="ia-title">Insights & Analytics Hub</h1>
            </div>

            {/* Global ModuleNavbar is now in NavbarV3 */}

            <SearchFilterBar
                placeholder="Search insights, stats or reports..."
                filterLabel="Data Type"
                alertLabel="Get Analytics Alerts"
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isScrolled={isScrolled}
            />

            {/* Premium Redesign Content (Below Top Bar) */}
            <div className="premium-discovery-area">
                <div className="discovery-secondary-row">
                    <div className="live-ticker">
                        <div className="ticker-content">
                            {liveTickerMessages[liveTickerIndex]}
                        </div>
                    </div>

                    <div className="discovery-controls">
                        <div className="view-toggles-premium">
                            <button className={viewMode === 'list' ? "active" : ""} onClick={() => setViewMode('list')} title="List View">
                                <List size={18} />
                            </button>
                            <button className={viewMode === 'grid' ? "active" : ""} onClick={() => setViewMode('grid')} title="Grid View">
                                <Grid size={18} />
                            </button>
                        </div>

                        <div className="xp-progress-container" title="Analytics XP">
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
                        <span>AI Analytics Insights</span>
                    </div>
                    <div className="suggestion-chips">
                        <button className="suggestion-chip">Predictive Demand: Summer 2024</button>
                        <button className="suggestion-chip sponsored">
                            ROI Optimizer v2.0
                            <span className="sponsored-tag">New</span>
                        </button>
                        <button className="suggestion-chip">User Churn Risk Analysis</button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="analytics-content-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="user-insights" replace />} />
                    <Route path="user-insights" element={<AnalyticsListView category="User Insights" />} />
                    <Route path="creator-stats" element={<AnalyticsListView category="Creator Stats" />} />
                    <Route path="partner-data" element={<AnalyticsListView category="Partner Data" />} />
                    <Route path="market-trends" element={<AnalyticsListView category="Market Trends" />} />
                    <Route path="system-health" element={<AnalyticsListView category="System Health" />} />
                    <Route path="predictions" element={<div>Predictions Content</div>} />
                    <Route path="reports" element={<div>Reports Content</div>} />
                    <Route path="logs" element={<div>Logs Content</div>} />
                </Routes>
            </div>

            {/* AI Analytics Agent Trigger */}
            <div className="ai-analytics-agent-trigger">
                <button className="agent-btn">
                    <Sparkles size={24} color="white" />
                    <div className="notif-dot"></div>
                    <span className="tooltip">AI Analytics Agent</span>
                </button>
            </div>
        </div>
    );
};

export default InsightsAnalytics;
