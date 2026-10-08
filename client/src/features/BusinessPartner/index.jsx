import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import {
    DollarSign,
    TrendingUp,
    Megaphone,
    Building2,
    Crown,
    Zap,
    Search,
    Sparkles,
    Share2,
    Trophy,
    MessageSquare
} from 'lucide-react';

// Import Sub-components
import MonetizeHub from './components/MonetizeHub';
import CreatorEarningsHub from './components/CreatorEarningsHub';
import BusinessAnalyticsHub from './components/BusinessAnalyticsHub';
import Overview from './components/Overview';
import Advertise from './components/Advertise';
import Corporate from './components/Corporate';
import Affiliate from './components/Affiliate';
import Leaderboard from './components/Leaderboard';
import SuccessStories from './components/SuccessStories';
import Contact from './components/Contact';

import '../../styles/BusinessPartner.css';

const BusinessPartner = () => {
    const primaryBusinessTabs = [
        { id: 'monetize', label: 'Monetize', to: '/business-partner/monetize', icon: DollarSign },
        { id: 'creator-earnings', label: 'Creator Earnings', to: '/business-partner/creator-earnings', icon: DollarSign },
        { id: 'analytics', label: 'Analytics', to: '/business-partner/analytics', icon: TrendingUp },
        { id: 'ad-manager', label: 'Ad Manager', to: '/business-partner/ad-manager', icon: Megaphone },
        { id: 'corporate', label: 'Corporate', to: '/business-partner/corporate', icon: Building2 },
        { id: 'affiliate', label: 'Affiliate Hub', to: '/business-partner/affiliate', icon: Share2 },
        { id: 'overview', label: 'Partner Portal', to: '/business-partner/overview', icon: Trophy }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="business-partner-container">
            {/* Header Section */}
            <header className={`bp-header-v2 ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-top">
                    <div className="header-title">
                        <span className="bp-section-kicker">SEENOMAD BUSINESS & CREATOR ECONOMY</span>
                        <h1>Business & Monetization Hub</h1>
                    </div>
                    <div className="header-actions">
                        <div className="tier-badge">
                            <Crown size={14} />
                            <span>Gold Partner • 1.5x Revenue Boost</span>
                        </div>
                        <div className="xp-display">
                            <Zap size={14} color="#f59e0b" />
                            <span>$12,500 / mo</span>
                        </div>
                    </div>
                </div>

                {/* Search & Sub-Navigation Bar */}
                <div className="header-nav-bar">
                    <nav className="bp-main-nav" aria-label="Business navigation">
                        {primaryBusinessTabs.map((item) => {
                            const IconComp = item.icon;
                            return (
                                <NavLink
                                    key={item.id}
                                    to={item.to}
                                    className={({ isActive }) => `nav-item-v2 ${isActive ? 'active' : ''}`}
                                >
                                    <IconComp size={15} />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className="search-container-v2">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Search streams, campaigns, or partners..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="bp-content-v2">
                <Routes>
                    <Route path="/" element={<Navigate to="monetize" replace />} />
                    <Route path="monetize" element={<MonetizeHub />} />
                    <Route path="creator-earnings" element={<CreatorEarningsHub />} />
                    <Route path="analytics" element={<BusinessAnalyticsHub />} />
                    <Route path="ad-manager" element={<Advertise />} />
                    <Route path="advertise" element={<Advertise />} />
                    <Route path="corporate" element={<Corporate />} />
                    <Route path="affiliate" element={<Affiliate />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="success-stories" element={<SuccessStories />} />
                    <Route path="contact-us" element={<Contact />} />
                    <Route path="*" element={<Navigate to="monetize" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default BusinessPartner;
