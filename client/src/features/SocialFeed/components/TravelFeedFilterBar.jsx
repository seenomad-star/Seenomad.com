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
            <div className="travel-feed-single-row">
                {/* Compact Brand Pill (Visible on Desktop/Tablet, hidden on narrow mobile to keep tabs spacious) */}
                <div className="feed-title-section">
                    <div className="feed-live-indicator">
                        <span className="feed-live-dot animate-pulse" />
                        <span className="feed-channel-tag">FEED</span>
                    </div>
                    <h2 className="feed-title-text">Nomad Dispatches</h2>
                </div>

                {/* Single-Row Tabs: Following | Trending | Recent */}
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
                                title={tab.tagline}
                            >
                                <div className="tab-btn-content">
                                    <IconComponent 
                                        size={14} 
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

                {/* Inline Compact Refresh Button */}
                <div className="feed-top-actions">
                    <button 
                        type="button" 
                        className={`feed-refresh-btn ${isRefreshing ? 'is-spinning' : ''}`}
                        onClick={onRefresh}
                        aria-label="Refresh travel feed"
                        title="Refresh travel updates"
                    >
                        <RotateCw size={14} />
                        <span className="refresh-text">Refresh</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TravelFeedFilterBar;
