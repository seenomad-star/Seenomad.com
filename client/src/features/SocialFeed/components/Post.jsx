import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '../../../store/toastStore';
import {
    Heart,
    MessageCircle,
    Share2,
    Repeat2,
    MoreHorizontal,
    BarChart2,
    Bookmark,
    MapPin,
    Coins,
    X,
    Send,
    CheckCircle2,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize2,
    Calendar,
    Users,
    Check,
    Sparkles,
    Smile,
    ChevronLeft,
    ChevronRight,
    Link2,
    Bell,
    ThumbsUp
} from 'lucide-react';
import '../styles/Post.css';

// Facebook reaction definitions
const FB_REACTIONS = [
    { id: 'like', label: 'Like', icon: '👍', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
    { id: 'love', label: 'Love', icon: '❤️', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
    { id: 'care', label: 'Care', icon: '🥰', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    { id: 'haha', label: 'Haha', icon: '😆', color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)' },
    { id: 'wow', label: 'Wow', icon: '😮', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' },
    { id: 'sad', label: 'Sad', icon: '😢', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' }
];

const DEFAULT_POST_COMMENTS = [
    { id: 1, author: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', text: 'This spot looks incredible! Is the wifi stable for video calls?', time: '25m ago' },
    { id: 2, author: 'Leo Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', text: 'Yes, 180 Mbps fiber with backup generator. Tested it yesterday!', time: '12m ago' }
];

const Post = ({ post }) => {
    const { addToast } = useToastStore();

    // Helper for number parsing
    const parseCount = (val) => {
        if (!val) return 0;
        if (typeof val === 'number') return val;
        if (val.includes('K')) return Math.round(parseFloat(val) * 1000);
        return parseInt(val, 10) || 0;
    };

    // Engagement state
    const [currentReaction, setCurrentReaction] = useState(post.userLiked ? 'love' : null);
    const [likesCount, setLikesCount] = useState(parseCount(post.likes || post.stats?.likes || 248));
    const [showReactionsMenu, setShowReactionsMenu] = useState(false);
    const reactionsTimeoutRef = useRef(null);

    const [isReposted, setIsReposted] = useState(post.userReposted || false);
    const [repostsCount, setRepostsCount] = useState(parseCount(post.shares || post.stats?.reposts || 19));

    const [isBookmarked, setIsBookmarked] = useState(post.userBookmarked || false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || DEFAULT_POST_COMMENTS);
    const [newComment, setNewComment] = useState('');
    const [showShareMenu, setShowShareMenu] = useState(false);

    // Instagram Carousel State
    const imagesList = post.images || (post.image ? [post.image] : (post.media?.url ? [post.media.url] : []));
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [heartBurst, setHeartBurst] = useState(false);
    const [showLightbox, setShowLightbox] = useState(false);

    // YouTube Video Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [videoProgress, setVideoProgress] = useState(35); // simulated percent
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Facebook Event RSVP State
    const [eventRsvp, setEventRsvp] = useState(post.event?.userRsvp || null);
    const [eventAttendees, setEventAttendees] = useState(post.event?.attendeesCount || 38);

    // Community Poll State
    const [pollVoted, setPollVoted] = useState(null);
    const [pollState, setPollState] = useState(post.poll);

    // Double Tap Like Handler (Instagram style)
    const handleDoubleTap = (e) => {
        e.stopPropagation();
        setHeartBurst(true);
        setTimeout(() => setHeartBurst(false), 900);

        if (!currentReaction) {
            setCurrentReaction('love');
            setLikesCount(prev => prev + 1);
            addToast('Liked travel post! ❤️', 'success');
        }
    };

    // Reaction Handlers
    const handleReactionSelect = (reactionId) => {
        setShowReactionsMenu(false);
        if (currentReaction === reactionId) {
            setCurrentReaction(null);
            setLikesCount(prev => Math.max(0, prev - 1));
        } else {
            const isNew = !currentReaction;
            setCurrentReaction(reactionId);
            if (isNew) setLikesCount(prev => prev + 1);
            const rObj = FB_REACTIONS.find(r => r.id === reactionId);
            addToast(`Reacted with ${rObj?.icon} ${rObj?.label}!`, 'success');
        }
    };

    const handleSimpleLikeClick = (e) => {
        e.stopPropagation();
        if (currentReaction) {
            setCurrentReaction(null);
            setLikesCount(prev => Math.max(0, prev - 1));
        } else {
            setCurrentReaction('love');
            setLikesCount(prev => prev + 1);
            addToast('Added to travel favorites! ❤️', 'success');
        }
    };

    const handleMouseEnterLike = () => {
        reactionsTimeoutRef.current = setTimeout(() => {
            setShowReactionsMenu(true);
        }, 300);
    };

    const handleMouseLeaveLike = () => {
        if (reactionsTimeoutRef.current) {
            clearTimeout(reactionsTimeoutRef.current);
        }
    };

    // Repost Handler (Twitter style)
    const handleRepost = (e) => {
        e.stopPropagation();
        if (isReposted) {
            setIsReposted(false);
            setRepostsCount(prev => Math.max(0, prev - 1));
            addToast('Removed repost from your profile', 'info');
        } else {
            setIsReposted(true);
            setRepostsCount(prev => prev + 1);
            addToast('Reposted to your travel community! 🔄', 'success');
        }
    };

    // Bookmark Handler
    const handleBookmark = (e) => {
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        addToast(!isBookmarked ? 'Saved to Travel Wishlist 🔖' : 'Removed from Wishlist', 'info');
    };

    // Share Options
    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            addToast('Post link copied to clipboard! 📋', 'success');
            setShowShareMenu(false);
        }
    };

    const handleShareStory = () => {
        addToast('Shared post to your Travel Stories! 📸✨', 'success');
        setShowShareMenu(false);
    };

    // Tip Creator Handler
    const handleTip = (e) => {
        e.stopPropagation();
        const author = post.author?.name || post.author || 'Creator';
        addToast(`Sent 50 Nomad Coins to ${author}! 🪙✨`, 'success');
    };

    // Event RSVP Handler (Facebook style)
    const handleRsvp = (status) => {
        if (eventRsvp === status) {
            setEventRsvp(null);
            if (status === 'going') setEventAttendees(prev => Math.max(0, prev - 1));
            addToast('RSVP cancelled', 'info');
        } else {
            if (status === 'going' && eventRsvp !== 'going') {
                setEventAttendees(prev => prev + 1);
            } else if (eventRsvp === 'going' && status !== 'going') {
                setEventAttendees(prev => Math.max(0, prev - 1));
            }
            setEventRsvp(status);
            addToast(status === 'going' ? 'You are marked as GOING! ✈️🎉' : 'Marked as Interested ⭐', 'success');
        }
    };

    // Poll Vote Handler
    const handleVotePoll = (optionIndex) => {
        if (pollVoted !== null || !pollState) return;
        setPollVoted(optionIndex);
        const updated = { ...pollState };
        updated.options[optionIndex].votes += 1;
        updated.totalVotes = (updated.totalVotes || 0) + 1;
        setPollState(updated);
        addToast('Your vote was recorded! 📊', 'success');
    };

    // Add Comment
    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const newEntry = {
            id: Date.now(),
            author: 'You',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            text: newComment.trim(),
            time: 'Just now'
        };

        setComments(prev => [...prev, newEntry]);
        setNewComment('');
        addToast('Comment published to thread! 💬', 'success');
    };

    // Carousel Navigation
    const nextPhoto = (e) => {
        e.stopPropagation();
        setCarouselIndex(prev => (prev + 1) % imagesList.length);
    };

    const prevPhoto = (e) => {
        e.stopPropagation();
        setCarouselIndex(prev => (prev - 1 + imagesList.length) % imagesList.length);
    };

    const authorName = post.author?.name || post.author || 'Nomad Explorer';
    const authorHandle = post.author?.handle || post.username || '@nomad';
    const authorAvatar = post.author?.avatar || post.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';

    // Active reaction visual config
    const activeReactionObj = FB_REACTIONS.find(r => r.id === currentReaction);

    return (
        <article className="social-post-card" id={`post-${post.id}`}>
            {/* Repost Header (Twitter Style) */}
            {post.repostedBy && (
                <div className="post-repost-header">
                    <Repeat2 size={13} className="text-emerald-500" />
                    <span><strong>{post.repostedBy}</strong> reposted</span>
                </div>
            )}

            {/* Header Row */}
            <div className="post-header-row">
                <div className="post-avatar-wrapper">
                    <img src={authorAvatar} alt={authorName} className="post-avatar-img" />
                    <span className="post-online-indicator" title="Active nomad" />
                </div>

                <div className="post-meta-container">
                    <div className="post-author-line">
                        <span className="post-author-name">{authorName}</span>
                        <CheckCircle2 size={14} className="verified-badge text-sky-500" />
                        <span className="post-author-handle">{authorHandle}</span>
                        <span className="post-dot">·</span>
                        <span className="post-time">{post.time || '2h'}</span>

                        {/* YouTube Subscribe Button if Channel/Video Post */}
                        {(post.type === 'video' || post.video) && (
                            <button 
                                type="button"
                                className={`yt-sub-btn ${isSubscribed ? 'subscribed' : ''}`}
                                onClick={() => {
                                    setIsSubscribed(!isSubscribed);
                                    addToast(!isSubscribed ? `Subscribed to ${authorName}'s travel channel! 🔔` : 'Unsubscribed', 'info');
                                }}
                            >
                                {isSubscribed ? (
                                    <>
                                        <Bell size={12} fill="currentColor" />
                                        <span>Subscribed</span>
                                    </>
                                ) : (
                                    <>
                                        <span>+ Subscribe</span>
                                        <span className="yt-sub-count">{post.subscribers || '34K'}</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Facebook Feeling / Check-In Row */}
                    {(post.location || post.feeling || post.withWhom) && (
                        <div className="post-subtags-row">
                            {post.location && (
                                <span className="post-location-tag">
                                    <MapPin size={11} /> {post.location}
                                </span>
                            )}
                            {post.feeling && (
                                <span className="post-feeling-tag">
                                    feeling {post.feeling}
                                </span>
                            )}
                            {post.withWhom && (
                                <span className="post-with-tag">
                                    with <strong>{post.withWhom}</strong>
                                </span>
                            )}
                            {post.vibe && (
                                <span className="post-vibe-tag">{post.vibe}</span>
                            )}
                        </div>
                    )}
                </div>

                <div className="post-header-actions">
                    <button 
                        type="button"
                        className="post-more-btn" 
                        onClick={() => addToast(`Options for post by ${authorName}`, 'info')}
                        aria-label="Post options"
                    >
                        <MoreHorizontal size={17} />
                    </button>
                </div>
            </div>

            {/* Post Content Body */}
            <div className="post-body">
                {post.content && (
                    <p className="post-text-content">
                        {post.content.split(' ').map((word, i) => {
                            if (word.startsWith('#')) {
                                return <span key={i} className="post-hashtag">{word} </span>;
                            }
                            if (word.startsWith('@')) {
                                return <span key={i} className="post-mention">{word} </span>;
                            }
                            return word + ' ';
                        })}
                    </p>
                )}

                {/* 1. YouTube Style Video Player */}
                {(post.type === 'video' || post.video) && (
                    <div className="post-video-player-card">
                        <div className="video-viewport">
                            <img 
                                src={post.video?.thumbnail || post.image || 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900'} 
                                alt="Travel Video" 
                                className="video-poster-img"
                            />
                            
                            <div className="video-dark-scrim" />

                            {/* Center Play / Pause Button */}
                            <button 
                                type="button"
                                className={`video-play-center-btn ${isPlaying ? 'playing' : ''}`}
                                onClick={() => {
                                    setIsPlaying(!isPlaying);
                                    addToast(!isPlaying ? 'Playing 4K travel vlog 🎥' : 'Paused playback', 'info');
                                }}
                                aria-label="Toggle Video Playback"
                            >
                                {isPlaying ? <Pause size={28} fill="#ffffff" /> : <Play size={28} fill="#ffffff" />}
                            </button>

                            {/* Top Video Badges */}
                            <div className="video-top-badges">
                                <span className="video-badge-quality">{post.video?.quality || '4K 60FPS'}</span>
                                <span className="video-badge-yt">YouTube Nomad</span>
                            </div>

                            {/* Bottom Video Controls Overlay */}
                            <div className="video-bottom-controls">
                                <div 
                                    className="video-scrubber-bar"
                                    onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const clickX = e.clientX - rect.left;
                                        const pct = Math.round((clickX / rect.width) * 100);
                                        setVideoProgress(pct);
                                    }}
                                >
                                    <div className="video-scrubber-progress" style={{ width: `${videoProgress}%` }}>
                                        <span className="scrubber-head" />
                                    </div>
                                </div>

                                <div className="video-controls-row">
                                    <div className="video-controls-left">
                                        <button 
                                            type="button" 
                                            className="video-ctrl-icon-btn" 
                                            onClick={() => setIsPlaying(!isPlaying)}
                                        >
                                            {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                                        </button>
                                        <button 
                                            type="button" 
                                            className="video-ctrl-icon-btn"
                                            onClick={() => setIsMuted(!isMuted)}
                                        >
                                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                        </button>
                                        <span className="video-timecode">
                                            {post.video?.current || '03:45'} / {post.video?.duration || '12:20'}
                                        </span>
                                    </div>

                                    <div className="video-controls-right">
                                        <button 
                                            type="button" 
                                            className="video-ctrl-icon-btn"
                                            onClick={() => addToast('Switched to theater mode', 'info')}
                                        >
                                            <Maximize2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* YouTube Chapters / Travel Itinerary Bar */}
                        {post.video?.chapters && (
                            <div className="video-chapters-container">
                                <span className="chapters-label">📍 Chapters:</span>
                                <div className="chapters-scroll">
                                    {post.video.chapters.map((ch, idx) => (
                                        <button 
                                            key={idx}
                                            type="button"
                                            className="chapter-pill-btn"
                                            onClick={() => {
                                                setVideoProgress(idx * 25);
                                                addToast(`Jumped to: ${ch.title}`, 'info');
                                            }}
                                        >
                                            <span className="ch-time">{ch.time}</span>
                                            <span className="ch-title">{ch.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. Instagram Style Multi-Photo Carousel Gallery */}
                {post.type !== 'video' && post.type !== 'event' && imagesList.length > 0 && (
                    <div 
                        className="post-carousel-wrapper"
                        onDoubleClick={handleDoubleTap}
                        title="Double-click to like photo"
                    >
                        <div className="carousel-slide-box">
                            <img 
                                src={imagesList[carouselIndex]} 
                                alt={`Travel slide ${carouselIndex + 1}`} 
                                className="carousel-photo-img"
                                onClick={() => setShowLightbox(true)}
                                loading="lazy"
                            />

                            {/* Instagram Floating Double-Tap Heart Animation */}
                            <AnimatePresence>
                                {heartBurst && (
                                    <motion.div 
                                        className="double-tap-heart-burst"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: [0, 1.35, 1], opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.85, ease: 'easeOut' }}
                                    >
                                        <Heart size={96} fill="#ef4444" stroke="#ffffff" strokeWidth={1.5} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Carousel Counter Badge */}
                            {imagesList.length > 1 && (
                                <div className="carousel-counter-pill">
                                    {carouselIndex + 1} / {imagesList.length}
                                </div>
                            )}

                            {/* Next / Prev Navigation Chevrons */}
                            {imagesList.length > 1 && (
                                <>
                                    <button 
                                        type="button" 
                                        className="carousel-nav-btn prev"
                                        onClick={prevPhoto}
                                        aria-label="Previous photo"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button 
                                        type="button" 
                                        className="carousel-nav-btn next"
                                        onClick={nextPhoto}
                                        aria-label="Next photo"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Dot Pagination */}
                        {imagesList.length > 1 && (
                            <div className="carousel-dots-row">
                                {imagesList.map((_, dotIdx) => (
                                    <span 
                                        key={dotIdx} 
                                        className={`carousel-dot ${dotIdx === carouselIndex ? 'active' : ''}`}
                                        onClick={() => setCarouselIndex(dotIdx)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* 3. Facebook Style Event / Meetup Card */}
                {post.event && (
                    <div className="post-event-card">
                        <div className="event-cover-banner">
                            <img src={post.event.cover} alt={post.event.title} className="event-cover-img" />
                            <div className="event-date-badge">
                                <span className="event-date-month">{post.event.month || 'OCT'}</span>
                                <span className="event-date-day">{post.event.day || '24'}</span>
                            </div>
                        </div>

                        <div className="event-details-content">
                            <h4 className="event-title">{post.event.title}</h4>
                            
                            <div className="event-info-item">
                                <Calendar size={14} className="text-red-500 flex-shrink-0" />
                                <span>{post.event.datetime || 'Friday, Oct 24 · 5:30 PM WITA'}</span>
                            </div>
                            
                            <div className="event-info-item">
                                <MapPin size={14} className="text-emerald-500 flex-shrink-0" />
                                <span>{post.event.venue || 'Echo Beach Club, Canggu, Bali'}</span>
                            </div>

                            <div className="event-attendees-row">
                                <div className="event-avatars-stack">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Attendee" className="stack-avatar" />
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Attendee" className="stack-avatar" />
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Attendee" className="stack-avatar" />
                                </div>
                                <span className="event-attendees-text">
                                    <strong>{eventAttendees} nomads going</strong> · 64 interested
                                </span>
                            </div>

                            {/* RSVP Action Buttons */}
                            <div className="event-rsvp-actions">
                                <button 
                                    type="button" 
                                    className={`event-rsvp-btn ${eventRsvp === 'interested' ? 'active' : ''}`}
                                    onClick={() => handleRsvp('interested')}
                                >
                                    <span>⭐ Interested</span>
                                </button>
                                <button 
                                    type="button" 
                                    className={`event-rsvp-btn going ${eventRsvp === 'going' ? 'active' : ''}`}
                                    onClick={() => handleRsvp('going')}
                                >
                                    <Check size={14} />
                                    <span>{eventRsvp === 'going' ? 'Going ✓' : 'Join / Going'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. Interactive Community Poll */}
                {pollState && (
                    <div className="post-poll-display">
                        <div className="poll-question-text">{pollState.question}</div>
                        <div className="poll-options-stack">
                            {pollState.options.map((opt, idx) => {
                                const total = pollState.totalVotes || 1;
                                const pct = Math.round((opt.votes / total) * 100);
                                const isSelected = pollVoted === idx;

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`poll-option-row ${isSelected ? 'voted-choice' : ''}`}
                                        onClick={() => handleVotePoll(idx)}
                                        disabled={pollVoted !== null}
                                    >
                                        {pollVoted !== null && (
                                            <div className="poll-bar-fill" style={{ width: `${pct}%` }} />
                                        )}
                                        <div className="poll-label-content">
                                            <span>{opt.text}</span>
                                            {pollVoted !== null && <span className="poll-pct">{pct}%</span>}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="poll-footer-text">
                            {pollState.totalVotes || 0} votes · {pollVoted !== null ? 'Final results' : 'Vote to see live nomad consensus'}
                        </div>
                    </div>
                )}
            </div>

            {/* Reaction Summary Bar (Facebook style badge) */}
            <div className="post-engagement-summary-row">
                <div className="reaction-icons-cluster">
                    <span className="reaction-bubble-icon">❤️</span>
                    <span className="reaction-bubble-icon">👍</span>
                    <span className="reaction-bubble-icon">😮</span>
                    <span className="reaction-count-text">{likesCount}</span>
                </div>

                <div className="engagement-summary-right">
                    <span onClick={() => setShowComments(true)} className="hover:underline cursor-pointer">
                        {comments.length} comments
                    </span>
                    <span>·</span>
                    <span>{repostsCount} reposts</span>
                </div>
            </div>

            {/* Interactions Bar (Twitter & Facebook Hybrid) */}
            <div className="post-action-bar">
                {/* 1. Like / Facebook Reaction Button */}
                <div 
                    className="reaction-anchor-wrapper"
                    onMouseEnter={handleMouseEnterLike}
                    onMouseLeave={handleMouseLeaveLike}
                >
                    <AnimatePresence>
                        {showReactionsMenu && (
                            <motion.div 
                                className="fb-reactions-popover"
                                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.85 }}
                                transition={{ duration: 0.15 }}
                                onMouseEnter={() => setShowReactionsMenu(true)}
                                onMouseLeave={() => setShowReactionsMenu(false)}
                            >
                                {FB_REACTIONS.map((r) => (
                                    <button 
                                        key={r.id}
                                        type="button"
                                        className="fb-reaction-bubble"
                                        onClick={() => handleReactionSelect(r.id)}
                                        title={r.label}
                                    >
                                        <span className="fb-reaction-emoji">{r.icon}</span>
                                        <span className="fb-reaction-label">{r.label}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        type="button"
                        className={`action-btn like ${currentReaction ? 'active' : ''}`}
                        onClick={handleSimpleLikeClick}
                        style={{ color: activeReactionObj ? activeReactionObj.color : undefined }}
                        aria-label="React to post"
                    >
                        {activeReactionObj ? (
                            <span className="active-reaction-display">{activeReactionObj.icon}</span>
                        ) : (
                            <Heart size={18} />
                        )}
                        <span className="action-count">
                            {activeReactionObj ? activeReactionObj.label : 'Like'}
                        </span>
                    </button>
                </div>

                {/* 2. Twitter Reply */}
                <button 
                    type="button"
                    className={`action-btn reply ${showComments ? 'active' : ''}`}
                    onClick={() => setShowComments(!showComments)}
                    aria-label="Comments"
                >
                    <MessageCircle size={18} />
                    <span className="action-count">{comments.length}</span>
                </button>

                {/* 3. Twitter Repost */}
                <button 
                    type="button"
                    className={`action-btn repost ${isReposted ? 'active' : ''}`}
                    onClick={handleRepost}
                    aria-label="Repost"
                >
                    <Repeat2 size={18} />
                    <span className="action-count">{repostsCount}</span>
                </button>

                {/* 4. Twitter Views Analytics */}
                <div className="action-btn views" title="Impressions">
                    <BarChart2 size={18} />
                    <span className="action-count">{post.views || '14.2K'}</span>
                </div>

                <div className="actions-spacer" />

                {/* 5. Tip Creator */}
                <button 
                    type="button"
                    className="action-btn tip"
                    onClick={handleTip}
                    title="Tip Creator (50 NMD Coins)"
                    aria-label="Tip creator"
                >
                    <Coins size={17} className="text-amber-400" />
                </button>

                {/* 6. Bookmark / Save to Wishlist */}
                <button 
                    type="button"
                    className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                    title="Save to Travel Wishlist"
                    aria-label="Bookmark"
                >
                    <Bookmark size={17} fill={isBookmarked ? "#0284c7" : "none"} stroke={isBookmarked ? "#0284c7" : "currentColor"} />
                </button>

                {/* 7. Share Button with Dropdown */}
                <div className="share-menu-wrapper">
                    <button 
                        type="button"
                        className="action-btn share"
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        title="Share post"
                        aria-label="Share"
                    >
                        <Share2 size={17} />
                    </button>

                    <AnimatePresence>
                        {showShareMenu && (
                            <motion.div 
                                className="post-share-dropdown"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <button type="button" onClick={handleCopyLink} className="share-dropdown-item">
                                    <Link2 size={15} />
                                    <span>Copy Link to Post</span>
                                </button>
                                <button type="button" onClick={handleShareStory} className="share-dropdown-item">
                                    <Sparkles size={15} className="text-amber-500" />
                                    <span>Add to Travel Story</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Expandable Comments Drawer */}
            <AnimatePresence>
                {showComments && (
                    <motion.div 
                        className="post-comments-drawer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="comments-list">
                            {comments.map(c => (
                                <div key={c.id} className="comment-bubble-row">
                                    <img src={c.avatar} alt={c.author} className="comment-avatar" />
                                    <div className="comment-body">
                                        <div className="comment-meta">
                                            <span className="comment-author">{c.author}</span>
                                            <span className="comment-time">{c.time}</span>
                                        </div>
                                        <p className="comment-text">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment Input */}
                        <form className="comment-input-row" onSubmit={handleAddComment}>
                            <img 
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
                                alt="You" 
                                className="comment-input-avatar" 
                            />
                            <input
                                type="text"
                                placeholder="Post your reply or travel tip..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="comment-input-field"
                            />
                            <button type="submit" className="comment-send-btn" disabled={!newComment.trim()}>
                                <Send size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Photo Lightbox Modal */}
            <AnimatePresence>
                {showLightbox && imagesList[carouselIndex] && (
                    <motion.div 
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLightbox(false)}
                    >
                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <button type="button" className="lightbox-close-btn" onClick={() => setShowLightbox(false)}>
                                <X size={20} />
                            </button>
                            <img src={imagesList[carouselIndex]} alt="Enlarged view" className="lightbox-image" />
                            <div className="lightbox-caption">
                                <span className="lightbox-author">{authorName}</span>
                                <span className="lightbox-text">{post.content}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </article>
    );
};

export default Post;
