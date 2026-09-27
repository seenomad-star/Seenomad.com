import React from 'react';
import { 
    Globe, 
    ArrowUp, 
    RotateCw, 
    CheckCircle2, 
    Sparkles,
    Radio
} from 'lucide-react';
import '../styles/FeedEndFootbar.css';

const FeedEndFootbar = ({ 
    sentinelRef,
    hasMore = true, 
    isLoadingMore = false, 
    onRefresh 
}) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="feed-end-container">
            {/* Hidden Intersection Observer Sentinel Trigger */}
            <div 
                ref={sentinelRef} 
                className="feed-sentinel-anchor" 
                aria-hidden="true" 
            />

            <section className="feed-end-footbar-card" aria-label="Endless Feed Stream Footbar">
                {/* Stream Status Banner */}
                <div className="stream-status-row">
                    <div className="stream-indicator">
                        <span className={`stream-live-pulse ${isLoadingMore ? 'pulse-active' : ''}`} />
                        <span className="stream-tag">
                            {isLoadingMore ? 'FETCHING DISPATCHES...' : 'AUTO-STREAMING NOMAD DISPATCHES'}
                        </span>
                    </div>
                    <div className="stream-meta">
                        {isLoadingMore ? (
                            <>
                                <RotateCw size={13} className="text-sky-500 animate-spin" />
                                <span className="text-sky-600 dark:text-sky-400 font-semibold">Syncing Node...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={13} className="text-emerald-500" />
                                <span>Global Nodes Synced</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="feed-end-content">
                    {hasMore ? (
                        <>
                            <div className="feed-auto-stream-status">
                                <div className="feed-end-badge">
                                    {isLoadingMore ? (
                                        <RotateCw size={22} className="text-sky-500 animate-spin" />
                                    ) : (
                                        <Radio size={22} className="text-sky-500 stream-broadcast-icon" />
                                    )}
                                </div>
                                <h3 className="feed-end-title">
                                    {isLoadingMore 
                                        ? 'Streaming new nomad dispatches...' 
                                        : 'Endless Travel Feed Active'}
                                </h3>
                                <p className="feed-end-desc">
                                    {isLoadingMore
                                        ? 'Fetching verified dispatches from nomad hubs in Tokyo, Chiang Mai, Lisbon, and Medellín...'
                                        : 'Scroll down to continuously reveal fresh dispatches, guides, and stories from 150+ countries.'}
                                </p>
                            </div>

                            <div className="feed-end-actions">
                                <button
                                    type="button"
                                    className="feed-back-to-top-btn"
                                    onClick={scrollToTop}
                                    title="Smooth scroll back to the top of the feed"
                                >
                                    <ArrowUp size={14} />
                                    <span>Back to Top</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="feed-end-badge caught-up-badge">
                                <CheckCircle2 size={24} className="text-emerald-500" />
                            </div>
                            <h3 className="feed-end-title">You're completely caught up!</h3>
                            <p className="feed-end-desc">
                                You have viewed all current live dispatches across worldwide nomad hubs.
                            </p>
                            <div className="feed-end-actions">
                                {onRefresh && (
                                    <button
                                        type="button"
                                        className="feed-refresh-stream-btn"
                                        onClick={onRefresh}
                                    >
                                        <RotateCw size={14} />
                                        <span>Refresh Feed</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="feed-back-to-top-btn"
                                    onClick={scrollToTop}
                                >
                                    <ArrowUp size={14} />
                                    <span>Back to Top</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default FeedEndFootbar;
