import React, { useRef, useEffect } from 'react';
import { 
    Sparkles, 
    Users, 
    Radio, 
    Flame, 
    Clock, 
    MapPin, 
    Camera, 
    PlaySquare, 
    Trophy, 
    Activity, 
    Repeat, 
    ChevronLeft, 
    ChevronRight 
} from 'lucide-react';
import '../styles/FeedTabs.css';

const TABS = [
    { id: 'foryou', label: 'For You', icon: Sparkles },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'live', label: 'Live', icon: Radio, isLive: true, badge: 'LIVE' },
    { id: 'trending', label: 'Trending', icon: Flame, badge: 'HOT' },
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'visuals', label: '📸 Visuals', icon: Camera },
    { id: 'shorts', label: 'Shorts', icon: PlaySquare },
    { id: 'challenges', label: 'Challenges', icon: Trophy, badge: '+XP' },
    { id: 'pulse', label: 'Pulse', icon: Activity },
    { id: 'exchange', label: 'Exchange', icon: Repeat }
];

const FeedTabs = ({ activeTab, setActiveTab }) => {
    const tabsContainerRef = useRef(null);

    const scroll = (direction) => {
        if (tabsContainerRef.current) {
            const scrollAmount = direction === 'left' ? -220 : 220;
            tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // Auto-scroll active tab into view
    useEffect(() => {
        if (tabsContainerRef.current) {
            const activeEl = tabsContainerRef.current.querySelector('.feed-tab-pill.active');
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeTab]);

    return (
        <header className="feed-header-sticky" role="navigation" aria-label="Social Feed Tabs">
            <div className="feed-tabs-wrapper">
                {/* Scroll left button */}
                <button 
                    className="feed-scroll-arrow left" 
                    onClick={() => scroll('left')}
                    aria-label="Scroll tabs left"
                    title="Scroll left"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Tabs row */}
                <div className="feed-tabs-scroll-container" ref={tabsContainerRef}>
                    {TABS.map((tab) => {
                        const IconComponent = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                className={`feed-tab-pill ${isActive ? 'active' : ''} ${tab.isLive ? 'is-live-tab' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                role="tab"
                                aria-selected={isActive}
                                id={`tab-${tab.id}`}
                                aria-controls={`panel-${tab.id}`}
                            >
                                <span className="tab-icon-wrap">
                                    {tab.isLive ? (
                                        <span className="live-dot-pulse" aria-hidden="true" />
                                    ) : (
                                        <IconComponent size={14} className="tab-icon" />
                                    )}
                                </span>
                                <span className="tab-label">{tab.label}</span>
                                {tab.badge && (
                                    <span className={`tab-badge ${tab.isLive ? 'live-badge-glow' : ''}`}>
                                        {tab.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Scroll right button */}
                <button 
                    className="feed-scroll-arrow right" 
                    onClick={() => scroll('right')}
                    aria-label="Scroll tabs right"
                    title="Scroll right"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </header>
    );
};

export default FeedTabs;
