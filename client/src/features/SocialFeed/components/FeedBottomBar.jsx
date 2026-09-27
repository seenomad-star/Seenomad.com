import React, { useState, useEffect, useRef } from 'react';
import { 
    Users, 
    Flame, 
    Clock, 
    ArrowUp, 
    RotateCw, 
    PenLine, 
    Layers, 
    X, 
    Globe, 
    Building2, 
    Plane, 
    ShieldCheck, 
    Facebook, 
    Twitter, 
    Instagram, 
    Youtube, 
    Compass,
    Sparkles,
    Check
} from 'lucide-react';
import '../styles/FeedBottomBar.css';

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

const FeedBottomBar = ({
    activeFilter = 'trending',
    onFilterChange,
    onRefresh,
    isRefreshing = false,
    onComposeClick,
    counts = {},
    postsCount = 0
}) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isFootbarDrawerOpen, setIsFootbarDrawerOpen] = useState(false);
    const [isBarHidden, setIsBarHidden] = useState(false);
    const lastScrollYRef = useRef(0);

    // Track scroll depth, scroll direction and auto-hide/show bottom bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (scrollHeight > 0) {
                const progress = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
                setScrollProgress(progress);
            }

            setShowBackToTop(scrollTop > 300);

            // Auto-hide when scrolling down past 160px; reveal immediately when scrolling up
            const diff = scrollTop - lastScrollYRef.current;
            if (!isFootbarDrawerOpen) {
                if (diff > 12 && scrollTop > 160) {
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

    const handleComposeClick = () => {
        if (onComposeClick) {
            onComposeClick();
        } else {
            const composerEl = document.getElementById('composer-card');
            if (composerEl) {
                composerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                scrollToTop();
            }
        }
    };

    return (
        <>
            {/* 1. Backdrop for Footbar Drawer */}
            {isFootbarDrawerOpen && (
                <div 
                    className="feed-footbar-backdrop"
                    onClick={() => setIsFootbarDrawerOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* 2. Slide-up Footbar Drawer (Access to full footer on endless feed) */}
            {isFootbarDrawerOpen && (
                <div 
                    className="feed-footbar-drawer"
                    role="dialog"
                    aria-label="Feed Footbar and Directory"
                    aria-modal="true"
                >
                    <div className="footbar-drawer-handle-bar">
                        <div className="footbar-drawer-pill" />
                    </div>

                    <div className="footbar-drawer-header">
                        <div className="footbar-brand-group">
                            <div className="footbar-brand-badge">
                                <Globe size={18} className="text-sky-500" />
                                <strong>SeeNomad</strong>
                            </div>
                            <span className="footbar-subtitle">Endless Feed Portal & Global Directory</span>
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

                    {/* Platform Highlights */}
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

                    {/* Links Columns */}
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

                    {/* Footer bottom notes */}
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

            {/* 3. Main Persistent Feed Bottom Bar / Footbar */}
            <div 
                className={`feed-bottom-bar-wrapper ${isBarHidden ? 'is-hidden' : ''}`}
                role="region"
                aria-label="Feed Bottom Controls & Footbar"
            >
                <div className="feed-bottom-bar">
                    {/* Left Section: Filter Buttons */}
                    <div className="bottom-bar-filter-group" role="tablist" aria-label="Feed quick filters">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeFilter === 'following'}
                            className={`bottom-bar-tab-btn ${activeFilter === 'following' ? 'active' : ''}`}
                            onClick={() => onFilterChange && onFilterChange('following')}
                            title="Filter by Following"
                        >
                            <Users size={15} />
                            <span className="btn-label">Following</span>
                            {counts.following !== undefined && (
                                <span className="tab-pill-count">{counts.following}</span>
                            )}
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeFilter === 'trending'}
                            className={`bottom-bar-tab-btn ${activeFilter === 'trending' ? 'active' : ''}`}
                            onClick={() => onFilterChange && onFilterChange('trending')}
                            title="Filter by Trending"
                        >
                            <Flame size={15} className="text-orange-500" />
                            <span className="btn-label">Trending</span>
                            <span className="tab-pill-hot">HOT</span>
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeFilter === 'recent'}
                            className={`bottom-bar-tab-btn ${activeFilter === 'recent' ? 'active' : ''}`}
                            onClick={() => onFilterChange && onFilterChange('recent')}
                            title="Filter by Recent"
                        >
                            <Clock size={15} className="text-sky-500" />
                            <span className="btn-label">Recent</span>
                            <span className="tab-live-dot" />
                        </button>
                    </div>

                    {/* Center Section: New Dispatch / Post Button */}
                    <button
                        type="button"
                        className="bottom-bar-compose-btn"
                        onClick={handleComposeClick}
                        aria-label="Create new travel dispatch"
                        title="Share a travel story, tip or video"
                    >
                        <PenLine size={16} />
                        <span className="compose-text">New Dispatch</span>
                    </button>

                    {/* Right Section: Progress, Refresh, Top & Footbar Drawer */}
                    <div className="bottom-bar-actions-group">
                        {/* Feed refresh button */}
                        <button
                            type="button"
                            className={`bottom-bar-icon-btn ${isRefreshing ? 'is-spinning' : ''}`}
                            onClick={onRefresh}
                            aria-label="Refresh feed dispatches"
                            title="Refresh dispatches"
                        >
                            <RotateCw size={15} />
                        </button>

                        {/* Reading scroll depth progress */}
                        <div 
                            className="bottom-bar-progress-pill" 
                            title={`Feed scroll progress: ${scrollProgress}% (${postsCount} posts in stream)`}
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
                                aria-label="Scroll to top of feed"
                                title="Back to top"
                            >
                                <ArrowUp size={15} />
                                <span className="top-text">Top</span>
                            </button>
                        )}

                        {/* Footbar / Links Drawer Toggle */}
                        <button
                            type="button"
                            className={`bottom-bar-footbar-btn ${isFootbarDrawerOpen ? 'active' : ''}`}
                            onClick={() => setIsFootbarDrawerOpen(!isFootbarDrawerOpen)}
                            aria-label="Open Feed Footbar and Directory"
                            title="Endless Feed Footbar & Directory Links"
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

export default FeedBottomBar;
