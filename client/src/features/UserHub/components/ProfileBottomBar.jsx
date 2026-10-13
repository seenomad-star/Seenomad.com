import React, { useState, useEffect, useRef } from 'react';
import { 
    FileText, 
    Award, 
    Activity, 
    Globe, 
    Zap, 
    Bookmark, 
    ArrowUp, 
    RotateCw, 
    Edit3, 
    Layers, 
    X, 
    Building2, 
    Plane, 
    ShieldCheck, 
    Facebook, 
    Twitter, 
    Instagram, 
    Youtube, 
    Share2,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import './ProfileBottomBar.css';

const FOOTBAR_SECTIONS = [
    {
        title: 'Explore Destinations',
        links: [
            { label: 'Global Destinations', href: '/explore' },
            { label: 'Interactive World Map', href: '/explore?view=map' },
            { label: 'Digital Nomad Visas', href: '/explore?tab=visas' },
            { label: 'Scenic Travel Reels', href: '/popular' },
            { label: 'Festivals & Events', href: '/event-festival' }
        ]
    },
    {
        title: 'Nomad Services',
        links: [
            { label: 'AI Travel Concierge', href: '/ai-agents' },
            { label: 'Nomad Stays & Deals', href: '/business-partner' },
            { label: 'Eco Voluntourism', href: '/learning-voluntourism' },
            { label: 'Nomad Community Hub', href: '/community' },
            { label: 'Cost of Living & Trends', href: '/insights-analytics' }
        ]
    },
    {
        title: 'Trust, Legal & Ads',
        links: [
            { label: 'Privacy Policy', href: '/legal?tab=privacy' },
            { label: 'Terms of Service', href: '/legal?tab=tos' },
            { label: 'Cookie Policy', href: '/legal?tab=cookies' },
            { label: 'Advertising & FTC Disclosure', href: '/legal?tab=adsense' },
            { label: 'About SeeNomad', href: '/about' }
        ]
    }
];

const ProfileBottomBar = ({
    activeTab = 'overview',
    onTabChange,
    onEditProfile,
    onShareProfile,
    badgeCount = 12,
    activityCount = 8,
    stampCount = 14,
    streakCount = 14,
    savedCount = 4,
    profileName = 'Alex Rivera'
}) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isFootbarDrawerOpen, setIsFootbarDrawerOpen] = useState(false);
    const [isBarHidden, setIsBarHidden] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const lastScrollYRef = useRef(0);

    // Track scroll depth and auto-hide/show behavior
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (scrollHeight > 0) {
                const progress = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
                setScrollProgress(progress);
            }

            setShowBackToTop(scrollTop > 280);

            // Hide slightly when scrolling fast down, show immediately on scroll up
            const diff = scrollTop - lastScrollYRef.current;
            if (!isFootbarDrawerOpen) {
                if (diff > 14 && scrollTop > 180) {
                    setIsBarHidden(true);
                } else if (diff < -8 || scrollTop < 60) {
                    setIsBarHidden(false);
                }
            }
            lastScrollYRef.current = scrollTop;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFootbarDrawerOpen]);

    // Close footbar drawer on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isFootbarDrawerOpen) {
                setIsFootbarDrawerOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFootbarDrawerOpen]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
        }, 800);
    };

    return (
        <>
            {/* 1. Backdrop for Footbar Drawer */}
            {isFootbarDrawerOpen && (
                <div 
                    className="profile-footbar-backdrop"
                    onClick={() => setIsFootbarDrawerOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* 2. Slide-up Footbar Drawer (Access to full directory, matching Home Feed Page Footbar) */}
            {isFootbarDrawerOpen && (
                <div 
                    className="profile-footbar-drawer"
                    role="dialog"
                    aria-label="Profile Footbar and Global Directory"
                    aria-modal="true"
                >
                    <div className="footbar-drawer-handle-bar">
                        <div className="footbar-drawer-pill" />
                    </div>

                    <div className="footbar-drawer-header">
                        <div className="footbar-brand-group">
                            <div className="footbar-brand-badge">
                                <Globe size={20} className="text-sky-500" />
                                <strong>SeeNomad</strong>
                                <span className="footbar-live-tag">CITIZEN NODE</span>
                            </div>
                            <span className="footbar-subtitle">
                                {profileName}'s Nomad Hub & Global Directory
                            </span>
                        </div>
                        <button 
                            type="button" 
                            className="footbar-close-btn"
                            onClick={() => setIsFootbarDrawerOpen(false)}
                            aria-label="Close Footbar Drawer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Platform Highlights Metrics Grid */}
                    <div className="footbar-metrics-grid">
                        <div className="footbar-metric-card">
                            <Globe size={18} className="text-sky-500" />
                            <div>
                                <span className="metric-number">150+</span>
                                <span className="metric-label">Countries Covered</span>
                            </div>
                        </div>
                        <div className="footbar-metric-card">
                            <Building2 size={18} className="text-purple-500" />
                            <div>
                                <span className="metric-number">1.2M+</span>
                                <span className="metric-label">Hotel Partners</span>
                            </div>
                        </div>
                        <div className="footbar-metric-card">
                            <Plane size={18} className="text-emerald-500" />
                            <div>
                                <span className="metric-number">500+</span>
                                <span className="metric-label">Airlines Connected</span>
                            </div>
                        </div>
                        <div className="footbar-metric-card">
                            <ShieldCheck size={18} className="text-amber-500" />
                            <div>
                                <span className="metric-number">10M+</span>
                                <span className="metric-label">Secure Bookings</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Columns Grid */}
                    <div className="footbar-columns-grid">
                        {FOOTBAR_SECTIONS.map((section, idx) => (
                            <div key={idx} className="footbar-nav-column">
                                <h4 className="footbar-col-title">{section.title}</h4>
                                <ul className="footbar-col-links">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a 
                                                href={link.href}
                                                onClick={() => setIsFootbarDrawerOpen(false)}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Drawer Footer Notes */}
                    <div className="footbar-drawer-footer">
                        <div className="footbar-social-row">
                            <a href="#" aria-label="Facebook" className="footbar-social-link"><Facebook size={16} /></a>
                            <a href="#" aria-label="Twitter" className="footbar-social-link"><Twitter size={16} /></a>
                            <a href="#" aria-label="Instagram" className="footbar-social-link"><Instagram size={16} /></a>
                            <a href="#" aria-label="YouTube" className="footbar-social-link"><Youtube size={16} /></a>
                        </div>
                        <div className="footbar-copyright-text">
                            © 2026 SeeNomad Inc. Designed for nomadic adventurers worldwide.
                        </div>
                    </div>
                </div>
            )}

            {/* 3. Main Persistent Profile Footbar (Styled after Home Feed Page Footbar) */}
            <div 
                className={`profile-bottom-bar-wrapper ${isBarHidden ? 'is-hidden' : ''}`}
                role="region"
                aria-label="Profile Bottom Controls & Footbar"
            >
                <div className="profile-bottom-bar">
                    {/* Left Section: Section Navigation Tabs */}
                    <div className="bottom-bar-filter-group" role="tablist" aria-label="Profile sections">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'overview'}
                            className={`bottom-bar-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => onTabChange && onTabChange('overview')}
                            title="Nomad CV & Bases"
                        >
                            <FileText size={15} />
                            <span className="btn-label">Overview</span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'reputation'}
                            className={`bottom-bar-tab-btn ${activeTab === 'reputation' ? 'active' : ''}`}
                            onClick={() => onTabChange && onTabChange('reputation')}
                            title="Nomad Reputation & Badges"
                        >
                            <Award size={15} className="text-amber-500" />
                            <span className="btn-label">Reputation</span>
                            <span className="tab-pill-count">{badgeCount}</span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'activity'}
                            className={`bottom-bar-tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                            onClick={() => onTabChange && onTabChange('activity')}
                            title="Real-Time Activity Feed"
                        >
                            <Activity size={15} className="text-emerald-500" />
                            <span className="btn-label">Activity</span>
                            <span className="tab-live-dot" />
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'stamps'}
                            className={`bottom-bar-tab-btn ${activeTab === 'stamps' ? 'active' : ''}`}
                            onClick={() => onTabChange && onTabChange('stamps')}
                            title="Digital Passport Stamps"
                        >
                            <Globe size={15} className="text-sky-500" />
                            <span className="btn-label">Passport</span>
                            <span className="tab-pill-count">{stampCount}</span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'quests'}
                            className={`bottom-bar-tab-btn ${activeTab === 'quests' ? 'active' : ''}`}
                            onClick={() => onTabChange && onTabChange('quests')}
                            title="Daily Quests & Streak"
                        >
                            <Zap size={15} className="text-yellow-500" />
                            <span className="btn-label">Quests</span>
                            <span className="tab-pill-streak">{streakCount}d</span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === 'saved'}
                            className={`bottom-bar-tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                            onClick={() => onTabChange && onTabChange('saved')}
                            title="Saved Wishlist"
                        >
                            <Bookmark size={15} className="text-purple-500" />
                            <span className="btn-label">Wishlist</span>
                            <span className="tab-pill-count">{savedCount}</span>
                        </button>
                    </div>

                    {/* Center Section: Primary Action (Edit Profile / Share) */}
                    <div className="bottom-bar-center-actions">
                        <button
                            type="button"
                            className="bottom-bar-primary-btn"
                            onClick={onEditProfile}
                            aria-label="Edit nomad profile"
                            title="Edit nomad details, avatar & cover"
                        >
                            <Edit3 size={15} />
                            <span className="action-text">Edit Profile</span>
                        </button>

                        <button
                            type="button"
                            className="bottom-bar-secondary-btn"
                            onClick={onShareProfile}
                            aria-label="Share nomad passport card"
                            title="Share nomad passport card"
                        >
                            <Share2 size={14} />
                            <span className="action-text">Share</span>
                        </button>
                    </div>

                    {/* Right Section: Progress, Sync, Top & Footbar Drawer */}
                    <div className="bottom-bar-actions-group">
                        {/* Profile sync refresh button */}
                        <button
                            type="button"
                            className={`bottom-bar-icon-btn ${isSyncing ? 'is-spinning' : ''}`}
                            onClick={handleSync}
                            aria-label="Sync profile node"
                            title="Sync profile dispatches & stats"
                        >
                            <RotateCw size={15} />
                        </button>

                        {/* Scroll depth progress pill */}
                        <div 
                            className="bottom-bar-progress-pill" 
                            title={`Profile scroll depth: ${scrollProgress}%`}
                        >
                            <div className="progress-ring-track">
                                <div 
                                    className="progress-ring-fill" 
                                    style={{ width: `${scrollProgress}%` }} 
                                />
                            </div>
                            <span className="progress-percent">{scrollProgress}%</span>
                        </div>

                        {/* Back to top button */}
                        {showBackToTop && (
                            <button
                                type="button"
                                className="bottom-bar-top-btn animate-fade-in"
                                onClick={scrollToTop}
                                aria-label="Scroll to top of profile"
                                title="Back to top"
                            >
                                <ArrowUp size={15} />
                                <span className="top-text">Top</span>
                            </button>
                        )}

                        {/* Footbar / Directory Links Drawer Toggle */}
                        <button
                            type="button"
                            className={`bottom-bar-footbar-btn ${isFootbarDrawerOpen ? 'active' : ''}`}
                            onClick={() => setIsFootbarDrawerOpen(!isFootbarDrawerOpen)}
                            aria-label="Open Nomad Footbar and Directory"
                            title="Nomad Footbar & Directory Links"
                        >
                            <Layers size={15} />
                            <span className="footbar-btn-text">Footbar</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileBottomBar;
