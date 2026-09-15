import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Megaphone,
    Building2,
    Share2,
    Trophy,
    Star,
    Sparkles,
    Search,
    Bell,
    ChevronDown,
    Play,
    Crown,
    Zap,
    MessageSquare,
    Target,
    Award
} from 'lucide-react';

// Import Sub-components
import Overview from './components/Overview';
import Advertise from './components/Advertise';
import Corporate from './components/Corporate';
import Affiliate from './components/Affiliate';
import Leaderboard from './components/Leaderboard';
import SuccessStories from './components/SuccessStories';
import Contact from './components/Contact';

import '../../styles/BusinessPartner.css';

const SmartBusinessAssistant = ({ isExpanded, setIsExpanded }) => {
    const TrendingUpIcon = ({ size, color }) => <Zap size={size} color={color} />;

    const actions = [
        { icon: Sparkles, label: 'Optimize ad campaigns', color: '#8b5cf6' },
        { icon: Target, label: 'Find new corporate leads', color: '#3b82f6' },
        { icon: TrendingUpIcon, label: 'Analyze revenue trends', color: '#10b981' },
        { icon: Award, label: 'How to reach Platinum tier', color: '#f59e0b' }
    ];

    return (
        <div className={`smart-assistant-v2 ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded ? (
                <div className="assistant-expanded-v2">
                    <div className="assistant-header-v2">
                        <div className="a-title">
                            <Sparkles size={18} color="#8b5cf6" />
                            <span>Business Assistant</span>
                        </div>
                        <button className="a-close-btn" onClick={() => setIsExpanded(false)}>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                    <div className="assistant-body-v2">
                        <div className="a-prime-banner">
                            <Crown size={16} />
                            <span>Gold Partner: 1.5x XP Active</span>
                        </div>
                        <div className="a-actions-grid">
                            {actions.map((action, idx) => (
                                <button key={idx} className="a-action-item">
                                    <div className="a-icon-circle" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                                        <action.icon size={16} />
                                    </div>
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="a-chat-preview">
                            <div className="a-bot-msg">Hello! I've analyzed your recent bookings. Your conversion rate is up 12% this week. Want to see why?</div>
                        </div>
                    </div>
                    <div className="assistant-footer-v2">
                        <input type="text" placeholder="Ask your business assistant..." />
                        <button className="a-send-btn"><Play size={14} /></button>
                    </div>
                </div>
            ) : (
                <button className="assistant-collapsed-v2" onClick={() => setIsExpanded(true)}>
                    <Sparkles size={24} color="white" />
                    <div className="a-notif-dot"></div>
                </button>
            )}
        </div>
    );
};

const BusinessPartner = () => {
    const navItems = [
        'Overview',
        'Advertise',
        'Corporate',
        'Affiliate',
        'Leaderboard',
        'Success Stories',
        'Contact Us'
    ];

    const toSlug = (text) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
    const [partnerXP, setPartnerXP] = useState(8450);
    const [partnerTier, setPartnerTier] = useState('Gold');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="business-partner-container">
            {/* Header Section */}
            <div className={`bp-header-v2 ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-top">
                    <div className="header-title">
                        <h1>Business & Partner Portal</h1>
                        <div className="tier-badge">
                            <Crown size={14} />
                            <span>{partnerTier} Partner</span>
                        </div>
                    </div>
                    <div className="header-actions">
                        <div className="xp-display">
                            <Zap size={14} color="#f59e0b" />
                            <span>{partnerXP.toLocaleString()} XP</span>
                        </div>
                        <button className="notif-btn">
                            <Bell size={20} />
                            <span className="notif-dot"></span>
                        </button>
                        <div className="user-profile-mini">
                            <img src="https://i.pravatar.cc/150?u=biz" alt="Partner" />
                        </div>
                    </div>
                </div>

                {/* Search & Navigation Bar */}
                <div className="header-nav-bar">
                    <div className="search-container-v2">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search partners, campaigns, or tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <nav className="bp-main-nav">
                        {navItems.map(item => (
                            <NavLink
                                key={item}
                                to={`/business-partner/${toSlug(item)}`}
                                className={({ isActive }) => `nav-item-v2 ${isActive ? 'active' : ''}`}
                            >
                                {item}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bp-content-v2">
                <Routes>
                    <Route path="/" element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="advertise" element={<Advertise />} />
                    <Route path="corporate" element={<Corporate />} />
                    <Route path="affiliate" element={<Affiliate />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="success-stories" element={<SuccessStories />} />
                    <Route path="contact-us" element={<Contact />} />
                </Routes>
            </div>

            {/* Smart Assistant */}
            <SmartBusinessAssistant
                isExpanded={isAssistantExpanded}
                setIsExpanded={setIsAssistantExpanded}
            />
        </div>
    );
};

export default BusinessPartner;
