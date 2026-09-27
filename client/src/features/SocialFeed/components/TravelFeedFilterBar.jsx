import React from 'react';
import { Users, Flame, Clock, RotateCw, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import '../styles/TravelFeedFilterBar.css';

const FILTER_TABS = [
    {
        id: 'following',
        label: 'Following',
        icon: Users,
        badge: '48',
        tagline: 'Updates from nomads you follow'
    },
    {
        id: 'trending',
        label: 'Trending',
        icon: Flame,
        badge: 'HOT',
        isHot: true,
        tagline: 'Viral spots & most active discussions'
    },
    {
        id: 'recent',
        label: 'Recent',
        icon: Clock,
        badge: 'LIVE',
        isLive: true,
        tagline: 'Real-time chronological travel updates'
    }
];

const TravelFeedFilterBar = ({ 
    activeFilter, 
    onFilterChange, 
    onRefresh,
    isRefreshing = false,
    counts = {}
}) => {
    return (
        <div className="travel-feed-filter-bar-container" role="region" aria-label="Travel Feed Filter Navigation">
            {/* Top Bar Header */}
            <div className="travel-feed-top-header">
                <div className="feed-title-section">
                    <div className="feed-live-indicator">
                        <span className="feed-live-dot animate-pulse" />
                        <span className="feed-channel-tag">TRAVEL FEED</span>
                    </div>
                    <h2 className="feed-title-text">Nomad Dispatches</h2>
                </div>

                <div className="feed-top-actions">
                    <button 
                        type="button" 
                        className={`feed-refresh-btn ${isRefreshing ? 'is-spinning' : ''}`}
                        onClick={onRefresh}
                        aria-label="Refresh travel feed"
                        title="Refresh travel updates"
                    >
                        <RotateCw size={15} />
                        <span className="refresh-text">Refresh</span>
                    </button>
                </div>
            </div>

            {/* Horizontal Tabs Row: Following | Trending | Recent */}
            <div className="feed-horizontal-tab-bar" role="tablist" aria-label="Feed filter options">
                {FILTER_TABS.map(tab => {
                    const IconComponent = tab.icon;
                    const isActive = activeFilter === tab.id;
                    const count = counts[tab.id];

                    return (
                        <button
                            key={tab.id}
                            id={`tab-filter-${tab.id}`}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`feed-content-${tab.id}`}
                            className={`feed-filter-tab-btn ${isActive ? 'active' : ''}`}
                            onClick={() => onFilterChange(tab.id)}
                            type="button"
                        >
                            <div className="tab-btn-content">
                                <IconComponent 
                                    size={16} 
                                    className={`tab-icon ${tab.isHot ? 'icon-flame' : ''} ${tab.isLive ? 'icon-live' : ''}`} 
                                />
                                <span className="tab-label-text">{tab.label}</span>
                                {tab.badge && (
                                    <span className={`tab-filter-badge ${tab.isHot ? 'badge-hot' : ''} ${tab.isLive ? 'badge-live' : ''}`}>
                                        {count !== undefined ? count : tab.badge}
                                    </span>
                                )}
                            </div>
                            {isActive && <div className="tab-active-indicator" />}
                        </button>
                    );
                })}
            </div>

            {/* Sub-bar contextual feedback */}
            <div className="feed-filter-context-bar">
                <div className="context-message">
                    <Sparkles size={13} className="text-sky-500" />
                    <span>
                        {activeFilter === 'following' && 'Showing posts from creators and fellow nomads you follow'}
                        {activeFilter === 'trending' && 'Ranking by nomad upvotes, viral discussions & photo saves'}
                        {activeFilter === 'recent' && 'Streaming latest live travel updates in chronological order'}
                    </span>
                </div>
                <div className="context-counter">
                    <span className="status-pill">
                        <Check size={11} className="text-emerald-500" /> Auto-Synced
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TravelFeedFilterBar;
