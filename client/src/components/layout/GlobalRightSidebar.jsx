import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield,
    Map,
    Compass,
    Users,
    Leaf,
    MessageSquare,
    X,
    Pin,
    PinOff,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import UserStatsWidget from '../popular/UserStatsWidget';
import TrendingDestinationsWidget from '../popular/TrendingDestinationsWidget';
import PopularCommunitiesWidget from '../popular/PopularCommunitiesWidget';
import '../../styles/layout/GlobalRightSidebar.css';

const GlobalRightSidebar = ({
    isDocked = false,
    isBigScreen = true,
    isOpen = false,
    isPinned = true,
    onToggleOpen = () => {},
    onTogglePin = () => {}
}) => {
    const navigate = useNavigate();

    // Close on Escape key when floating
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && !isDocked && isOpen) {
                onToggleOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDocked, isOpen, onToggleOpen]);

    const handleQuickMapClick = () => {
        navigate('/explore');
        if (!isDocked) {
            onToggleOpen(false);
        }
    };

    return (
        <>
            {/* 1. Backdrop Overlay when floating drawer is open */}
            {!isDocked && isOpen && (
                <div
                    id="global-sidebar-backdrop"
                    className="global-sidebar-backdrop"
                    onClick={() => onToggleOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* 2. Aside Sidebar Panel */}
            <aside
                id="global-right-sidebar"
                className={`global-right-sidebar ${isDocked ? 'is-docked' : ''} ${isOpen ? 'is-open' : ''}`}
                aria-label="TravelOS Intelligence Sidebar"
            >
                {/* Modern Header with Close and Pin options */}
                <div className="global-sidebar-header">
                    <div className="header-branding">
                        <div className="intel-status-badge">
                            <span className="live-dot" />
                            <span className="live-text">LIVE</span>
                        </div>
                        <div className="intel-title-group">
                            <Compass size={16} className="text-primary" />
                            <h3 className="intel-title">TravelOS Intelligence</h3>
                        </div>
                    </div>

                    <div className="header-actions">
                        {isBigScreen && (
                            <button
                                className={`sidebar-header-btn ${isPinned ? 'active' : ''}`}
                                onClick={() => onTogglePin(!isPinned)}
                                title={isPinned ? "Unpin from screen (Float mode)" : "Pin to layout"}
                                aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                            >
                                {isPinned ? <PinOff size={15} /> : <Pin size={15} />}
                            </button>
                        )}
                        <button
                            className="sidebar-header-btn close-btn"
                            onClick={() => {
                                if (isDocked) {
                                    onTogglePin(false);
                                } else {
                                    onToggleOpen(false);
                                }
                            }}
                            title={isDocked ? "Collapse sidebar" : "Close panel (Esc)"}
                            aria-label="Close sidebar"
                        >
                            {isDocked ? <ChevronRight size={16} /> : <X size={16} />}
                        </button>
                    </div>
                </div>

                <div className="sidebar-inner-scroll">
                    {/* 1. FLASH MEETUPS (System 8) */}
                    <div className="travel-os-system-card meetup-mini">
                        <div className="system-title">
                            <Users size={16} className="text-primary" />
                            <span>Flash Meetups</span>
                            <div className="status-dot green animate-ping" style={{ marginLeft: 'auto' }} />
                        </div>
                        <div className="meetup-mini-list">
                            <div className="meetup-item-compact">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" className="mini-avatar" />
                                <div className="item-info">
                                    <span className="name">Sarah • 0.4km</span>
                                    <span className="meta">Coding @ Bara Roots</span>
                                </div>
                                <button className="ping-icon" aria-label="Message Sarah"><MessageSquare size={12} /></button>
                            </div>
                            <div className="meetup-item-compact">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Marcus" className="mini-avatar" />
                                <div className="item-info">
                                    <span className="name">Marcus • 1.2km</span>
                                    <span className="meta">Design @ Zest Cafe</span>
                                </div>
                                <button className="ping-icon" aria-label="Message Marcus"><MessageSquare size={12} /></button>
                            </div>
                        </div>
                    </div>

                    {/* 3. TRAVEL IDENTITY (System 2, 5, 10) */}
                    <UserStatsWidget />

                    {/* 4. ECO-TRAIL (XP / Sustainability) */}
                    <div className="travel-os-system-card eco-mini">
                        <div className="system-title">
                            <Leaf size={16} className="text-green" />
                            <span>Eco-Trail</span>
                            <span className="xp-badge">+450 XP</span>
                        </div>
                        <div className="eco-stats">
                            <div className="progress-mini">
                                <div className="fill green" style={{ width: '80%' }}></div>
                            </div>
                            <span className="progress-text">80% of monthly offset goal</span>
                        </div>
                    </div>

                    {/* 5. VISA HEALTH (System 7) */}
                    <div className="travel-os-system-card visa-health">
                        <div className="system-title">
                            <Shield size={16} className="text-orange" />
                            <span>Visa Health</span>
                        </div>
                        <div className="visa-status">
                            <span className="status-dot green" />
                            <span className="status-text">14 days remaining in Thailand</span>
                        </div>
                    </div>

                    {/* 6. DISCOVERY INTELLIGENCE (System 3, 8) */}
                    <TrendingDestinationsWidget />

                    {/* 7. GLOBAL MARKETPLACES (System 4, 6) */}
                    <PopularCommunitiesWidget />

                    {/* 8. GLOBAL QUEST (System 9) */}
                    <div className="travel-os-system-card quest-card">
                        <div className="quest-badge">Daily Quest</div>
                        <h4 className="quest-title text-gold">The Hidden Archive</h4>
                        <p className="quest-task">Find a secret library in Bali & post a photo.</p>
                        <div className="quest-reward">+150 XP • Level Up!</div>
                    </div>

                    {/* 9. Quick Map Access */}
                    <div className="sidebar-quick-map" onClick={handleQuickMapClick} role="button" tabIndex={0}>
                        <Map size={20} />
                        <span>Open Life Journey Map</span>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default GlobalRightSidebar;
