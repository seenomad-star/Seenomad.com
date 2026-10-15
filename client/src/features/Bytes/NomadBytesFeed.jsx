import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare, Heart, Repeat, Bookmark, Share2, Sparkles,
    Send, MapPin, Hash, Image, X, Search, Flame, Wifi, FileCheck,
    CheckCircle2, AlertCircle, TrendingUp, Users, ArrowUpRight,
    CornerDownRight, Check, ShieldCheck, Filter, Clock
} from 'lucide-react';
import { useNomadByteStore } from '../../store/nomadByteStore';
import { useNomadOSStore } from '../../store/nomadOSStore';
import { useToastStore } from '../../store/toastStore';
import './NomadBytesFeed.css';

const QUICK_TAGS = [
    { label: '#WifiAlert', icon: '📶' },
    { label: '#VisaHacks', icon: '🛂' },
    { label: '#RemoteWork', icon: '💻' },
    { label: '#LisbonNomads', icon: '🇵🇹' },
    { label: '#BaliNomads', icon: '🌴' },
    { label: '#ColivingDrop', icon: '🏠' },
    { label: '#NomadHotTakes', icon: '☕' }
];

const PRESET_LOCATIONS = [
    'Lisbon, Portugal 🇵🇹',
    'Canggu, Bali 🇮🇩',
    'Bansko, Bulgaria 🇧🇬',
    'Kyoto, Japan 🇯🇵',
    'Da Nang, Vietnam 🇻🇳',
    'Medellín, Colombia 🇨🇴',
    'Chiang Mai, Thailand 🇹🇭'
];

const NomadBytesFeed = () => {
    const {
        bytes,
        filter,
        searchQuery,
        setFilter,
        setSearchQuery,
        createByte,
        toggleLikeByte,
        toggleRebyte,
        toggleBookmark,
        addReplyToByte,
        toggleLikeReply
    } = useNomadByteStore();

    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();

    // Composer state
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('Lisbon, Portugal 🇵🇹');
    const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
    const [mediaUrl, setMediaUrl] = useState('');
    const [isMediaInputOpen, setIsMediaInputOpen] = useState(false);

    // Reply drawers state (which byte card has reply drawer open)
    const [activeReplyByteId, setActiveReplyByteId] = useState(null);
    const [replyText, setReplyText] = useState('');

    const MAX_CHARS = 280;
    const charsRemaining = MAX_CHARS - content.length;
    const progressPercent = Math.min(100, (content.length / MAX_CHARS) * 100);

    // Filter bytes
    const filteredBytes = useMemo(() => {
        let result = [...bytes];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(b => 
                b.content.toLowerCase().includes(query) ||
                b.author.name.toLowerCase().includes(query) ||
                b.author.handle.toLowerCase().includes(query) ||
                b.location.toLowerCase().includes(query) ||
                (b.tags && b.tags.some(t => t.toLowerCase().includes(query)))
            );
        }

        if (filter === 'hot') {
            result.sort((a, b) => ((b.likes || 0) + (b.rebytes || 0) * 2) - ((a.likes || 0) + (a.rebytes || 0) * 2));
        } else if (filter === 'alerts') {
            result = result.filter(b => 
                (b.tags && b.tags.some(t => t.toLowerCase().includes('wifi') || t.toLowerCase().includes('alert'))) ||
                b.content.toLowerCase().includes('alert') ||
                b.content.toLowerCase().includes('wifi')
            );
        } else if (filter === 'hacks') {
            result = result.filter(b => 
                (b.tags && b.tags.some(t => t.toLowerCase().includes('visa') || t.toLowerCase().includes('hacks'))) ||
                b.content.toLowerCase().includes('visa')
            );
        } else if (filter === 'bookmarks') {
            result = result.filter(b => b.isBookmarked);
        } else if (filter === 'my_bytes') {
            result = result.filter(b => b.author.handle === '@alexriveranomad' || b.author.name === 'Alex Rivera' || b.author.handle === '@elenanomad');
        }

        return result;
    }, [bytes, filter, searchQuery]);

    const handlePublishByte = (e) => {
        e.preventDefault();
        if (!content.trim()) {
            addToast('Please enter your Byte content before posting', 'error');
            return;
        }

        const newByte = createByte({
            content: content.trim(),
            location,
            mediaUrl: mediaUrl.trim() || null,
            author: {
                name: 'Alex Rivera',
                handle: '@alexriveranomad',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
                badge: 'Senior Fullstack Nomad',
                isVerified: true
            }
        });

        if (newByte) {
            addXP(20);
            addToast('⚡ Byte dispatched to the nomad global stream! +20 XP', 'success');
            setContent('');
            setMediaUrl('');
            setIsMediaInputOpen(false);
        }
    };

    const handleAddTag = (tag) => {
        if (content.length + tag.length + 1 > MAX_CHARS) {
            addToast('Cannot add hashtag: character limit reached', 'warning');
            return;
        }
        setContent(prev => prev ? `${prev} ${tag}` : tag);
    };

    const handleLike = (byte) => {
        toggleLikeByte(byte.id);
        if (!byte.isLiked) {
            addToast(`Liked @${byte.author.handle}'s Byte`, 'success');
            addXP(5);
        }
    };

    const handleRebyte = (byte) => {
        toggleRebyte(byte.id);
        if (!byte.isRebyted) {
            addToast(`🔁 Rebyted to your nomad timeline!`, 'success');
            addXP(10);
        }
    };

    const handleBookmark = (byte) => {
        toggleBookmark(byte.id);
        addToast(byte.isBookmarked ? 'Removed from bookmarks' : '🔖 Saved to your Nomad Bookmarks!', 'info');
    };

    const handleShare = (byte) => {
        navigator.clipboard?.writeText(`${window.location.origin}/bytes?id=${byte.id}`);
        addToast('Byte link copied to clipboard!', 'info');
    };

    const handleSendReply = (byteId) => {
        if (!replyText.trim()) return;
        addReplyToByte(byteId, replyText.trim(), {
            author: 'Alex Rivera',
            handle: '@alexriveranomad',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
        });
        addXP(10);
        addToast('💬 Reply posted to Byte thread! +10 XP', 'success');
        setReplyText('');
    };

    return (
        <div className="bytes-page-container">
            {/* Main Stream Column */}
            <div className="bytes-stream-column">
                
                {/* Header Bar */}
                <div className="bytes-header-bar">
                    <div className="bytes-title-group">
                        <div className="bytes-title-icon-badge">
                            <Sparkles size={20} className="text-emerald-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="bytes-title-text">Nomad Bytes</h1>
                                <span className="bytes-status-pill">LIVE MICRO-POSTS</span>
                            </div>
                            <p className="bytes-subtitle-text">
                                Real-time dispatches, verified wifi alerts & quick nomad wisdom (280 chars)
                            </p>
                        </div>
                    </div>

                    {/* Search Field */}
                    <div className="bytes-search-wrap">
                        <Search size={15} className="bytes-search-icon" />
                        <input
                            type="text"
                            placeholder="Search bytes, #tags, or cities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bytes-search-input"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="bytes-search-clear"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Navigation Tabs */}
                <div className="bytes-tabs-filter-bar">
                    <button
                        type="button"
                        onClick={() => setFilter('all')}
                        className={`bytes-tab-btn ${filter === 'all' ? 'active' : ''}`}
                    >
                        <span>Latest Dispatches</span>
                        <span className="bytes-tab-count">{bytes.length}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('hot')}
                        className={`bytes-tab-btn ${filter === 'hot' ? 'active' : ''}`}
                    >
                        <Flame size={14} className="text-orange-400" />
                        <span>Hot & Viral</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('alerts')}
                        className={`bytes-tab-btn ${filter === 'alerts' ? 'active' : ''}`}
                    >
                        <Wifi size={14} className="text-cyan-400" />
                        <span>Wifi & Cowork Alerts</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('hacks')}
                        className={`bytes-tab-btn ${filter === 'hacks' ? 'active' : ''}`}
                    >
                        <FileCheck size={14} className="text-emerald-400" />
                        <span>Visa Hacks</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('bookmarks')}
                        className={`bytes-tab-btn ${filter === 'bookmarks' ? 'active' : ''}`}
                    >
                        <Bookmark size={14} className="text-amber-400" />
                        <span>Saved ({bytes.filter(b => b.isBookmarked).length})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setFilter('my_bytes')}
                        className={`bytes-tab-btn ${filter === 'my_bytes' ? 'active' : ''}`}
                    >
                        <Users size={14} className="text-violet-400" />
                        <span>My Bytes</span>
                    </button>
                </div>

                {/* Byte Composer Box */}
                <div className="byte-composer-card">
                    <div className="byte-composer-header">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                            alt="Alex Rivera"
                            className="byte-composer-avatar"
                        />
                        <div className="byte-composer-body">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
                                placeholder="What's happening in your nomad hub? Share wifi speeds, visa stamp updates, or rapid nomad tips..."
                                rows={3}
                                className="byte-composer-textarea"
                            />

                            {/* Location & Media preview pill */}
                            <div className="byte-composer-meta-pills">
                                <div className="byte-meta-pill">
                                    <MapPin size={12} className="text-emerald-400" />
                                    <span>{location}</span>
                                    <button
                                        type="button"
                                        onClick={() => setIsLocationPickerOpen(!isLocationPickerOpen)}
                                        className="byte-meta-pill-edit"
                                    >
                                        Change
                                    </button>
                                </div>

                                {mediaUrl && (
                                    <div className="byte-meta-pill">
                                        <Image size={12} className="text-cyan-400" />
                                        <span>Image attached</span>
                                        <button
                                            type="button"
                                            onClick={() => setMediaUrl('')}
                                            className="byte-meta-pill-edit text-rose-400"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Location picker dropdown */}
                            {isLocationPickerOpen && (
                                <div className="byte-location-dropdown">
                                    <span className="location-dropdown-title">Choose current nomad hub:</span>
                                    <div className="location-chips-grid">
                                        {PRESET_LOCATIONS.map((loc, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => {
                                                    setLocation(loc);
                                                    setIsLocationPickerOpen(false);
                                                }}
                                                className={`location-chip ${location === loc ? 'active' : ''}`}
                                            >
                                                {loc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Media image input */}
                            {isMediaInputOpen && (
                                <div className="byte-media-input-bar">
                                    <input
                                        type="url"
                                        placeholder="Paste image or photo URL (Unsplash, imgur)..."
                                        value={mediaUrl}
                                        onChange={(e) => setMediaUrl(e.target.value)}
                                        className="byte-media-url-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsMediaInputOpen(false)}
                                        className="btn-media-close"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}

                            {/* Quick Hashtags */}
                            <div className="byte-composer-quick-tags">
                                <span className="quick-tags-label">Trending topics:</span>
                                {QUICK_TAGS.map((t, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleAddTag(t.label)}
                                        className="quick-tag-chip"
                                    >
                                        <span>{t.icon}</span>
                                        <span>{t.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Composer Footer Actions */}
                            <div className="byte-composer-footer">
                                <div className="byte-composer-tools">
                                    <button
                                        type="button"
                                        onClick={() => setIsLocationPickerOpen(!isLocationPickerOpen)}
                                        className="btn-composer-tool"
                                        title="Attach nomad location"
                                    >
                                        <MapPin size={17} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsMediaInputOpen(!isMediaInputOpen)}
                                        className="btn-composer-tool"
                                        title="Attach media or screenshot"
                                    >
                                        <Image size={17} />
                                    </button>
                                </div>

                                <div className="byte-composer-submit-group">
                                    {/* 280-char Radial Progress Indicator */}
                                    <div className="char-counter-cluster">
                                        <div className="char-progress-ring">
                                            <svg width="28" height="28" viewBox="0 0 36 36">
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="rgba(255, 255, 255, 0.1)"
                                                    strokeWidth="3.5"
                                                />
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke={charsRemaining < 20 ? '#ef4444' : charsRemaining < 60 ? '#f59e0b' : '#10b981'}
                                                    strokeWidth="3.5"
                                                    strokeDasharray={`${progressPercent}, 100`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                        <span className={`chars-count-text ${charsRemaining < 20 ? 'critical' : ''}`}>
                                            {charsRemaining}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handlePublishByte}
                                        disabled={!content.trim()}
                                        className="btn-publish-byte"
                                    >
                                        <Send size={15} />
                                        <span>Post Byte</span>
                                        <span className="publish-xp-badge">+20 XP</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Byte Stream */}
                <div className="bytes-stream-list">
                    <AnimatePresence>
                        {filteredBytes.length > 0 ? (
                            filteredBytes.map((byte) => (
                                <motion.div
                                    key={byte.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="byte-card"
                                >
                                    {/* Author & Header */}
                                    <div className="byte-card-header">
                                        <img
                                            src={byte.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                                            alt={byte.author.name}
                                            className="byte-author-avatar"
                                        />
                                        <div className="byte-author-info">
                                            <div className="byte-author-title-row">
                                                <span className="byte-author-name">{byte.author.name}</span>
                                                {byte.author.isVerified && (
                                                    <span className="byte-verified-badge" title="Verified Digital Nomad">
                                                        <CheckCircle2 size={13} className="text-emerald-400" />
                                                    </span>
                                                )}
                                                <span className="byte-author-handle">{byte.author.handle}</span>
                                                <span className="byte-dot-separator">·</span>
                                                <span className="byte-time">{byte.timestamp}</span>
                                            </div>

                                            <div className="byte-location-badge-row">
                                                <span className="byte-location-tag">
                                                    <MapPin size={11} className="text-emerald-400" />
                                                    <span>{byte.location}</span>
                                                </span>
                                                {byte.author.badge && (
                                                    <span className="byte-role-pill">
                                                        {byte.author.badge}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Byte Content */}
                                    <div className="byte-content-area">
                                        <p className="byte-text">
                                            {byte.content.split(' ').map((word, wIdx) => {
                                                if (word.startsWith('#')) {
                                                    return (
                                                        <span
                                                            key={wIdx}
                                                            onClick={() => setSearchQuery(word)}
                                                            className="byte-highlight-tag"
                                                        >
                                                            {word}{' '}
                                                        </span>
                                                    );
                                                }
                                                if (word.startsWith('@')) {
                                                    return (
                                                        <span
                                                            key={wIdx}
                                                            onClick={() => setSearchQuery(word)}
                                                            className="byte-highlight-mention"
                                                        >
                                                            {word}{' '}
                                                        </span>
                                                    );
                                                }
                                                return word + ' ';
                                            })}
                                        </p>

                                        {/* Media Attachment if present */}
                                        {byte.mediaUrl && (
                                            <div className="byte-media-attachment-box">
                                                <img
                                                    src={byte.mediaUrl}
                                                    alt="Byte attachment"
                                                    className="byte-attached-img"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions Row */}
                                    <div className="byte-actions-row">
                                        {/* Reply / Comment Button */}
                                        <button
                                            type="button"
                                            onClick={() => setActiveReplyByteId(activeReplyByteId === byte.id ? null : byte.id)}
                                            className={`byte-action-btn btn-action-reply ${activeReplyByteId === byte.id ? 'active' : ''}`}
                                            title="Reply to Byte"
                                        >
                                            <MessageSquare size={16} />
                                            <span>{byte.repliesCount || (byte.replies ? byte.replies.length : 0)}</span>
                                        </button>

                                        {/* Rebyte Button (Retweet) */}
                                        <button
                                            type="button"
                                            onClick={() => handleRebyte(byte)}
                                            className={`byte-action-btn btn-action-rebyte ${byte.isRebyted ? 'rebyted' : ''}`}
                                            title="Rebyte to your timeline"
                                        >
                                            <Repeat size={16} />
                                            <span>{byte.rebytes || 0}</span>
                                        </button>

                                        {/* Like Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleLike(byte)}
                                            className={`byte-action-btn btn-action-like ${byte.isLiked ? 'liked' : ''}`}
                                            title="Like this Byte"
                                        >
                                            <Heart
                                                size={16}
                                                fill={byte.isLiked ? '#ef4444' : 'none'}
                                                color={byte.isLiked ? '#ef4444' : 'currentColor'}
                                            />
                                            <span>{byte.likes || 0}</span>
                                        </button>

                                        {/* Bookmark Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleBookmark(byte)}
                                            className={`byte-action-btn btn-action-bookmark ${byte.isBookmarked ? 'bookmarked' : ''}`}
                                            title="Save to bookmarks"
                                        >
                                            <Bookmark
                                                size={16}
                                                fill={byte.isBookmarked ? '#f59e0b' : 'none'}
                                                color={byte.isBookmarked ? '#f59e0b' : 'currentColor'}
                                            />
                                            <span>{byte.bookmarks || 0}</span>
                                        </button>

                                        {/* Share Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleShare(byte)}
                                            className="byte-action-btn btn-action-share"
                                            title="Share Byte"
                                        >
                                            <Share2 size={16} />
                                        </button>
                                    </div>

                                    {/* Inline Replies Thread Drawer */}
                                    {activeReplyByteId === byte.id && (
                                        <div className="byte-replies-drawer">
                                            {/* Mini Reply Composer */}
                                            <div className="byte-reply-mini-input-box">
                                                <img
                                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                                    alt="Alex Rivera"
                                                    className="byte-reply-avatar"
                                                />
                                                <div className="byte-reply-input-wrap">
                                                    <input
                                                        type="text"
                                                        placeholder={`Reply to ${byte.author.handle}...`}
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleSendReply(byte.id);
                                                        }}
                                                        className="byte-reply-text-field"
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSendReply(byte.id)}
                                                        disabled={!replyText.trim()}
                                                        className="btn-send-byte-reply"
                                                    >
                                                        <Send size={14} />
                                                        <span>Reply</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Existing Replies List */}
                                            {byte.replies && byte.replies.length > 0 && (
                                                <div className="byte-replies-stream">
                                                    {byte.replies.map((reply) => (
                                                        <div key={reply.id} className="byte-reply-item">
                                                            <img
                                                                src={reply.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                                                                alt={reply.author}
                                                                className="byte-reply-author-avatar"
                                                            />
                                                            <div className="byte-reply-content-box">
                                                                <div className="byte-reply-meta">
                                                                    <span className="reply-author-name">{reply.author}</span>
                                                                    <span className="reply-author-handle">{reply.handle}</span>
                                                                    <span className="reply-timestamp">· {reply.timestamp}</span>
                                                                </div>
                                                                <p className="reply-text">{reply.text}</p>
                                                                <div className="reply-footer-action">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => toggleLikeReply(byte.id, reply.id)}
                                                                        className={`btn-reply-like ${reply.isLiked ? 'liked' : ''}`}
                                                                    >
                                                                        <Heart
                                                                            size={12}
                                                                            fill={reply.isLiked ? '#ef4444' : 'none'}
                                                                            color={reply.isLiked ? '#ef4444' : 'currentColor'}
                                                                        />
                                                                        <span>{reply.likes || 0}</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="bytes-empty-state">
                                <MessageSquare size={42} className="text-slate-600 mb-3" />
                                <h3>No Nomad Bytes found</h3>
                                <p>Be the first to dispatch a 280-character live update from your nomad desk.</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFilter('all');
                                        setSearchQuery('');
                                    }}
                                    className="btn-reset-bytes-filter"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Rail: Trending Bytes & Nomad Radar */}
            <div className="bytes-sidebar-rail">
                {/* Explainer Card */}
                <div className="rail-widget-card byte-explainer-card">
                    <div className="explainer-icon-circle">
                        <Sparkles size={20} className="text-emerald-400" />
                    </div>
                    <h4>What is a Nomad Byte?</h4>
                    <p>
                        A 280-character micro-dispatch for the global remote worker community. Post verified wifi alerts, visa updates, coliving gems, or quick nomad banter.
                    </p>
                    <div className="byte-xp-reward-list">
                        <div className="byte-xp-reward-item">
                            <span>Post a Byte</span>
                            <span className="badge-xp-plus">+20 XP</span>
                        </div>
                        <div className="byte-xp-reward-item">
                            <span>Reply to a Byte</span>
                            <span className="badge-xp-plus">+10 XP</span>
                        </div>
                        <div className="byte-xp-reward-item">
                            <span>Earn Rebytes</span>
                            <span className="badge-xp-plus">+15 XP</span>
                        </div>
                    </div>
                </div>

                {/* Trending Topics & Hashtags */}
                <div className="rail-widget-card">
                    <div className="rail-widget-header">
                        <TrendingUp size={16} className="text-emerald-400" />
                        <h4>Trending in Nomad Hubs</h4>
                    </div>
                    <div className="trending-tags-list">
                        <div
                            className="trending-tag-row"
                            onClick={() => setSearchQuery('#LisbonNomads')}
                        >
                            <div className="trending-tag-info">
                                <span className="trending-tag-category">Portugal · Remote Hub</span>
                                <span className="trending-tag-name">#LisbonNomads</span>
                                <span className="trending-tag-stats">428 Bytes today</span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-500" />
                        </div>

                        <div
                            className="trending-tag-row"
                            onClick={() => setSearchQuery('#WifiAlert')}
                        >
                            <div className="trending-tag-info">
                                <span className="trending-tag-category">Global · Telemetry</span>
                                <span className="trending-tag-name">#WifiAlert</span>
                                <span className="trending-tag-stats">192 live alerts</span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-500" />
                        </div>

                        <div
                            className="trending-tag-row"
                            onClick={() => setSearchQuery('#BaliNomads')}
                        >
                            <div className="trending-tag-info">
                                <span className="trending-tag-category">Indonesia · Coworking</span>
                                <span className="trending-tag-name">#BaliNomads</span>
                                <span className="trending-tag-stats">310 Bytes today</span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-500" />
                        </div>

                        <div
                            className="trending-tag-row"
                            onClick={() => setSearchQuery('#VisaHacks')}
                        >
                            <div className="trending-tag-info">
                                <span className="trending-tag-category">Legal · Digital Nomad Visas</span>
                                <span className="trending-tag-name">#VisaHacks</span>
                                <span className="trending-tag-stats">85 verified updates</span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-500" />
                        </div>

                        <div
                            className="trending-tag-row"
                            onClick={() => setSearchQuery('#Bansko')}
                        >
                            <div className="trending-tag-info">
                                <span className="trending-tag-category">Bulgaria · Mountain Work</span>
                                <span className="trending-tag-name">#Bansko</span>
                                <span className="trending-tag-stats">64 Bytes</span>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-500" />
                        </div>
                    </div>
                </div>

                {/* Top Byte Contributors */}
                <div className="rail-widget-card">
                    <div className="rail-widget-header">
                        <Users size={16} className="text-cyan-400" />
                        <h4>Top Byte Contributors</h4>
                    </div>
                    <div className="top-contributors-list">
                        <div className="contributor-row">
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120"
                                alt="Liam Vance"
                                className="contributor-avatar"
                            />
                            <div className="contributor-info">
                                <span className="contributor-name">Liam Vance</span>
                                <span className="contributor-handle">@liamtravels</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSearchQuery('@liamtravels')}
                                className="btn-filter-contributor"
                            >
                                View
                            </button>
                        </div>

                        <div className="contributor-row">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120"
                                alt="Sofia Reyes"
                                className="contributor-avatar"
                            />
                            <div className="contributor-info">
                                <span className="contributor-name">Sofia Reyes</span>
                                <span className="contributor-handle">@sofiatravels</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSearchQuery('@sofiatravels')}
                                className="btn-filter-contributor"
                            >
                                View
                            </button>
                        </div>

                        <div className="contributor-row">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120"
                                alt="Mateo Silva"
                                className="contributor-avatar"
                            />
                            <div className="contributor-info">
                                <span className="contributor-name">Mateo Silva</span>
                                <span className="contributor-handle">@mateocodes</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSearchQuery('@mateocodes')}
                                className="btn-filter-contributor"
                            >
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NomadBytesFeed;
