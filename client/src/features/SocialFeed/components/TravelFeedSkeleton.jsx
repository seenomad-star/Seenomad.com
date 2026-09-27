import React from 'react';
import { Camera, Play, Sparkles } from 'lucide-react';
import '../styles/TravelFeedSkeleton.css';

/**
 * Individual Travel Post Skeleton Card
 * Matches Twitter/X layout, Instagram photo/carousel, YouTube 16:9 video player,
 * and Facebook reaction action bar.
 */
export const TravelPostSkeleton = ({ 
    variant = 'photo', 
    hasRepost = false,
    textLines = 3,
    style = {}
}) => {
    return (
        <article className="tfs-post-card" style={style} aria-hidden="true">
            {/* Repost Header (Twitter Style) */}
            {hasRepost && (
                <div className="tfs-repost-row">
                    <span className="tfs-bone tfs-repost-icon" />
                    <span className="tfs-bone tfs-repost-text" />
                </div>
            )}

            {/* Header Row: Avatar, Name, Handle, Tags, Options */}
            <div className="tfs-header-row">
                <div className="tfs-avatar-wrapper">
                    <span className="tfs-bone tfs-avatar" />
                    <span className="tfs-online-dot" />
                </div>

                <div className="tfs-meta-col">
                    <div className="tfs-author-line">
                        <span className="tfs-bone tfs-name" />
                        <span className="tfs-bone tfs-badge" />
                        <span className="tfs-bone tfs-handle" />
                        <span className="tfs-bone tfs-dot" />
                        <span className="tfs-bone tfs-time" />
                    </div>

                    {/* Subtags Row: Location, Feeling, Vibe */}
                    <div className="tfs-subtags-row">
                        <span className="tfs-bone tfs-pill-tag tfs-pill-location" />
                        <span className="tfs-bone tfs-pill-tag tfs-pill-feeling" />
                        <span className="tfs-bone tfs-pill-tag tfs-pill-vibe" />
                    </div>
                </div>

                <span className="tfs-bone tfs-header-action" />
            </div>

            {/* Post Body: Multi-line realistic text */}
            <div className="tfs-body">
                <span className="tfs-bone tfs-text-line" style={{ width: '96%' }} />
                {textLines >= 2 && <span className="tfs-bone tfs-text-line" style={{ width: '88%' }} />}
                {textLines >= 3 && <span className="tfs-bone tfs-text-line" style={{ width: '62%' }} />}

                {/* Hashtag shimmers */}
                <div className="tfs-tags-row">
                    <span className="tfs-bone tfs-tag-pill" style={{ width: '76px' }} />
                    <span className="tfs-bone tfs-tag-pill" style={{ width: '64px' }} />
                    <span className="tfs-bone tfs-tag-pill" style={{ width: '84px' }} />
                </div>
            </div>

            {/* Media Block: Photo or YouTube 16:9 Video Player */}
            {variant !== 'text' && (
                <div className="tfs-media-container">
                    <span className="tfs-media-badge-top" />
                    
                    <div className="tfs-media-center-icon">
                        {variant === 'video' ? <Play size={20} fill="currentColor" /> : <Camera size={20} />}
                    </div>

                    <span className="tfs-media-badge-bottom" />
                </div>
            )}

            {/* Actions Bar: Like, Comment, Repost, Views, Bookmark */}
            <div className="tfs-actions-bar">
                <div className="tfs-action-btn">
                    <span className="tfs-bone tfs-action-icon" />
                    <span className="tfs-bone tfs-action-count" style={{ width: '28px' }} />
                </div>
                <div className="tfs-action-btn">
                    <span className="tfs-bone tfs-action-icon" />
                    <span className="tfs-bone tfs-action-count" style={{ width: '24px' }} />
                </div>
                <div className="tfs-action-btn">
                    <span className="tfs-bone tfs-action-icon" />
                    <span className="tfs-bone tfs-action-count" style={{ width: '22px' }} />
                </div>
                <div className="tfs-action-btn">
                    <span className="tfs-bone tfs-action-icon" />
                    <span className="tfs-bone tfs-action-count" style={{ width: '34px' }} />
                </div>
                <div className="tfs-action-btn">
                    <span className="tfs-bone tfs-action-icon" />
                </div>
            </div>
        </article>
    );
};

/**
 * Stories Rail Skeleton
 * Horizontal row of pulsing avatar story rings
 */
export const StoriesRailSkeleton = ({ count = 7 }) => {
    return (
        <div className="tfs-stories-rail" aria-hidden="true">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="tfs-story-item">
                    <div className="tfs-story-ring">
                        <span className="tfs-bone tfs-story-circle" />
                    </div>
                    <span className="tfs-bone tfs-story-label" />
                </div>
            ))}
        </div>
    );
};

/**
 * In-stream Load More Dispatches Skeleton
 * Rendered at the bottom of the feed when fetching additional pages
 */
export const FeedLoadMoreSkeleton = () => {
    return (
        <div className="tfs-load-more-card" aria-hidden="true">
            <div className="tfs-load-more-left">
                <span className="tfs-bone" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span className="tfs-bone" style={{ width: '160px', height: '13px' }} />
                    <span className="tfs-bone" style={{ width: '110px', height: '10px' }} />
                </div>
            </div>
            <div className="tfs-load-more-right">
                <span className="tfs-bone" style={{ width: '90px', height: '28px', borderRadius: '9999px' }} />
            </div>
        </div>
    );
};

/**
 * Full Travel Feed Skeleton Loader
 * Renders an authentic stream of loading post cards with varying content patterns
 */
const TravelFeedSkeleton = ({ 
    count = 3, 
    showStories = false, 
    className = '',
    variant = 'mixed' 
}) => {
    const cardVariants = ['photo', 'video', 'photo', 'compact'];

    return (
        <div className={`travel-feed-skeleton-container ${className}`} role="status" aria-label="Loading travel dispatches...">
            {/* Optional stories shimmer rail */}
            {showStories && <StoriesRailSkeleton />}

            {/* Stream of posts */}
            {Array.from({ length: count }).map((_, index) => {
                const assignedVariant = variant === 'mixed' 
                    ? cardVariants[index % cardVariants.length] 
                    : variant;

                return (
                    <TravelPostSkeleton
                        key={index}
                        variant={assignedVariant}
                        hasRepost={index === 1}
                        textLines={index % 2 === 0 ? 3 : 2}
                        style={{
                            animationDelay: `${index * 0.15}s`
                        }}
                    />
                );
            })}
        </div>
    );
};

export default TravelFeedSkeleton;
