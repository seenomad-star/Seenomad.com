import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, MapPin, MessageSquare, Award, Wifi, Heart,
    Share2, Plus, Send, Sparkles, CheckCircle2, ChevronRight,
    MessageCircle, ExternalLink, Flame, CornerDownRight, X, Clock, Radio
} from 'lucide-react';
import { useNomadActivityStore } from '../../../store/nomadActivityStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useToastStore } from '../../../store/toastStore';
import './NomadActivityFeed.css';

const NomadActivityFeed = ({ embedded = false }) => {
    const {
        activities,
        filter,
        setFilter,
        onlineNomadsCount,
        addActivity,
        toggleLike,
        addReplyToActivity
    } = useNomadActivityStore();

    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();

    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [replyingToId, setReplyingToId] = useState(null);
    const [replyInput, setReplyInput] = useState('');

    // Composer form state
    const [composerData, setComposerData] = useState({
        type: 'check_in',
        title: '',
        location: '',
        thread: '',
        content: '',
        wifiSpeed: ''
    });

    const checkInsCount = activities.filter(a => a.type === 'check_in').length;
    const forumRepliesCount = activities.filter(a => a.type === 'forum_reply').length;
    const contributionsCount = activities.filter(a => a.type === 'contribution').length;

    const filteredActivities = activities.filter(a => {
        if (filter === 'all') return true;
        return a.type === filter;
    });

    const handleCreateActivity = (e) => {
        e.preventDefault();
        if (!composerData.content.trim()) {
            addToast('Please enter an update or description', 'error');
            return;
        }

        let title = composerData.title.trim();
        if (!title) {
            if (composerData.type === 'check_in') {
                title = `Checked in at ${composerData.location || 'Current Base'}`;
            } else if (composerData.type === 'forum_reply') {
                title = `Replied in: "${composerData.thread || 'Nomad Community Discussion'}"`;
            } else {
                title = 'Submitted Nomad Telemetry & Contribution';
            }
        }

        const newAct = addActivity({
            type: composerData.type,
            title,
            location: composerData.location.trim() || 'Current Base',
            thread: composerData.thread.trim() || null,
            content: composerData.content.trim(),
            metrics: composerData.wifiSpeed ? { wifi: `${composerData.wifiSpeed} Mbps` } : {}
        });

        addXP(30);
        addToast(`🚀 Real-time activity broadcasted! +30 XP earned!`, 'success');
        setIsComposerOpen(false);
        setComposerData({
            type: 'check_in',
            title: '',
            location: '',
            thread: '',
            content: '',
            wifiSpeed: ''
        });
    };

    const handleLike = (id, title) => {
        toggleLike(id);
        const act = activities.find(a => a.id === id);
        if (act && !act.isLiked) {
            addToast(`Liked "${title}"`, 'success');
        }
    };

    const handleSendReply = (actId) => {
        if (!replyInput.trim()) return;
        addReplyToActivity(actId);
        addXP(15);
        addToast(`💬 Reply posted to community activity! +15 XP`, 'success');
        setReplyInput('');
        setReplyingToId(null);
    };

    const handleShareActivity = (act) => {
        navigator.clipboard?.writeText(`${window.location.origin}/user/profile?activity=${act.id}`);
        addToast('Activity permalink copied to clipboard!', 'info');
    };

    return (
        <div className={`nomad-activity-feed-wrapper ${embedded ? 'embedded-view' : ''}`}>
            {/* 1. Real-Time Broadcast Presence Header */}
            <div className="activity-live-banner">
                <div className="broadcast-indicator-cluster">
                    <div className="live-broadcast-dot-wrap">
                        <span className="live-broadcast-pulse" />
                        <span className="live-broadcast-core" />
                    </div>
                    <div className="broadcast-text-stack">
                        <div className="broadcast-title-row">
                            <h3 className="broadcast-title">Live Nomad Activity Stream</h3>
                            <span className="live-network-badge">
                                <Radio size={12} className="text-emerald-400" />
                                <span>Real-Time Network</span>
                            </span>
                        </div>
                        <p className="broadcast-subtitle">
                            Chronicle of your verified contributions, community discussions, and location check-ins.
                        </p>
                    </div>
                </div>

                <div className="broadcast-action-cluster">
                    <div className="online-presence-chip">
                        <span className="presence-green-dot" />
                        <span>{onlineNomadsCount} Nomads Online</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsComposerOpen(true)}
                        className="btn-post-activity"
                        title="Post a live check-in or contribution"
                    >
                        <Plus size={15} />
                        <span>Post Live Update</span>
                    </button>
                </div>
            </div>

            {/* 2. Interactive Activity Filters Rail */}
            <div className="activity-filter-bar">
                <div className="activity-filter-pills" role="tablist" aria-label="Filter user activities">
                    {[
                        { id: 'all', label: `All Updates (${activities.length})`, icon: Activity },
                        { id: 'check_in', label: `Trip Check-Ins (${checkInsCount})`, icon: MapPin },
                        { id: 'forum_reply', label: `Forum Replies (${forumRepliesCount})`, icon: MessageSquare },
                        { id: 'contribution', label: `Contributions (${contributionsCount})`, icon: Award }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={filter === tab.id}
                            className={`activity-filter-btn ${filter === tab.id ? 'active' : ''}`}
                            onClick={() => setFilter(tab.id)}
                        >
                            <tab.icon size={14} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Real-Time Activity Feed Timeline */}
            <div className="activity-feed-timeline">
                <AnimatePresence mode="popLayout">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((act) => {
                            const isCheckIn = act.type === 'check_in';
                            const isForum = act.type === 'forum_reply';
                            const isContrib = act.type === 'contribution';

                            return (
                                <motion.div
                                    key={act.id}
                                    layout
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.2 }}
                                    className={`activity-item-card type-${act.type}`}
                                >
                                    {/* Icon Accent */}
                                    <div className="activity-type-marker" style={{ borderColor: act.color }}>
                                        {isCheckIn && <MapPin size={16} style={{ color: act.color }} />}
                                        {isForum && <MessageSquare size={16} style={{ color: act.color }} />}
                                        {isContrib && <Award size={16} style={{ color: act.color }} />}
                                    </div>

                                    <div className="activity-item-main">
                                        {/* Metadata Row (Zero-Pill Discipline) */}
                                        <div className="activity-meta-line">
                                            <span className="activity-category-text" style={{ color: act.color }}>
                                                {act.category}
                                            </span>
                                            <span className="meta-sep" aria-hidden="true">·</span>
                                            {act.location && (
                                                <>
                                                    <span className="activity-location-text">{act.location}</span>
                                                    <span className="meta-sep" aria-hidden="true">·</span>
                                                </>
                                            )}
                                            <span className="activity-timestamp-text">{act.timestamp}</span>
                                        </div>

                                        {/* Activity Title */}
                                        <h4 className="activity-item-title">{act.title}</h4>

                                        {/* Activity Content Body */}
                                        <p className="activity-item-prose">{act.content}</p>

                                        {/* Extra Context / Metrics Chip (if any) */}
                                        {act.metrics && Object.keys(act.metrics).length > 0 && (
                                            <div className="activity-metrics-row">
                                                {act.metrics.wifi && (
                                                    <div className="metric-tag-item">
                                                        <Wifi size={12} className="text-emerald-400" />
                                                        <span>Verified {act.metrics.wifi} Fiber</span>
                                                    </div>
                                                )}
                                                {act.metrics.upvotes && (
                                                    <div className="metric-tag-item">
                                                        <Flame size={12} className="text-amber-400" />
                                                        <span>{act.metrics.upvotes} Nomad Upvotes</span>
                                                    </div>
                                                )}
                                                {act.metrics.distance && (
                                                    <div className="metric-tag-item">
                                                        <MapPin size={12} className="text-sky-400" />
                                                        <span>{act.metrics.distance} Route</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Interactive Reactions & Social Controls */}
                                        <div className="activity-actions-strip">
                                            <button
                                                type="button"
                                                onClick={() => handleLike(act.id, act.title)}
                                                className={`btn-act-action ${act.isLiked ? 'liked' : ''}`}
                                                title={act.isLiked ? 'Remove upvote' : 'Upvote activity'}
                                            >
                                                <Heart size={14} fill={act.isLiked ? '#ef4444' : 'none'} color={act.isLiked ? '#ef4444' : 'currentColor'} />
                                                <span>{act.likes}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setReplyingToId(replyingToId === act.id ? null : act.id)}
                                                className="btn-act-action"
                                                title="View or add reply"
                                            >
                                                <MessageCircle size={14} />
                                                <span>{act.repliesCount} Replies</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleShareActivity(act)}
                                                className="btn-act-action"
                                                title="Share activity"
                                            >
                                                <Share2 size={13} />
                                                <span>Share</span>
                                            </button>
                                        </div>

                                        {/* Inline Quick Reply Drawer */}
                                        {replyingToId === act.id && (
                                            <div className="activity-reply-drawer">
                                                <div className="reply-input-wrap">
                                                    <input
                                                        type="text"
                                                        className="reply-input-field"
                                                        placeholder="Write a quick comment or reaction..."
                                                        value={replyInput}
                                                        onChange={(e) => setReplyInput(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleSendReply(act.id);
                                                        }}
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSendReply(act.id)}
                                                        className="btn-reply-send"
                                                    >
                                                        <Send size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="empty-activity-placeholder">
                            <Activity size={36} className="text-slate-500 mb-2" />
                            <h4>No activities found in this filter</h4>
                            <p>Post a quick check-in from your current base or contribute a verified wifi speed test.</p>
                            <button
                                type="button"
                                onClick={() => setIsComposerOpen(true)}
                                className="btn-post-activity mt-3"
                            >
                                <Plus size={14} /> Post Live Update
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* 4. Post New Live Activity Modal */}
            <AnimatePresence>
                {isComposerOpen && (
                    <div className="composer-modal-backdrop" onClick={() => setIsComposerOpen(false)} role="dialog" aria-modal="true">
                        <motion.div
                            className="composer-modal-card"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="composer-modal-header">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={18} className="text-amber-400" />
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Broadcast Live Nomad Activity</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsComposerOpen(false)}
                                    className="edit-profile-close-btn"
                                    aria-label="Close composer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleCreateActivity} className="composer-form-body">
                                {/* Type Selector Segmented Control */}
                                <div className="form-group">
                                    <label className="form-label">Activity Type</label>
                                    <div className="composer-type-segmented">
                                        <button
                                            type="button"
                                            className={`type-segment-btn ${composerData.type === 'check_in' ? 'active' : ''}`}
                                            onClick={() => setComposerData({ ...composerData, type: 'check_in' })}
                                        >
                                            <MapPin size={14} />
                                            <span>Trip Check-In</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-segment-btn ${composerData.type === 'forum_reply' ? 'active' : ''}`}
                                            onClick={() => setComposerData({ ...composerData, type: 'forum_reply' })}
                                        >
                                            <MessageSquare size={14} />
                                            <span>Forum Thought</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-segment-btn ${composerData.type === 'contribution' ? 'active' : ''}`}
                                            onClick={() => setComposerData({ ...composerData, type: 'contribution' })}
                                        >
                                            <Award size={14} />
                                            <span>Contribution</span>
                                        </button>
                                    </div>
                                </div>

                                {composerData.type === 'check_in' && (
                                    <div className="form-group">
                                        <label className="form-label">Location / Base Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="e.g. Lisbon, Portugal · Cowork Central or Hauz Khas, Delhi"
                                            value={composerData.location}
                                            onChange={(e) => setComposerData({ ...composerData, location: e.target.value })}
                                            required
                                        />
                                    </div>
                                )}

                                {composerData.type === 'forum_reply' && (
                                    <div className="form-group">
                                        <label className="form-label">Topic / Thread Title</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="e.g. Best fiber cafes in Delhi or Bali visa renewal 2026"
                                            value={composerData.thread}
                                            onChange={(e) => setComposerData({ ...composerData, thread: e.target.value })}
                                            required
                                        />
                                    </div>
                                )}

                                {composerData.type === 'contribution' && (
                                    <div className="form-row-2">
                                        <div className="form-group">
                                            <label className="form-label">Venue / Landmark Name</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. Qutub Minar or Blue Tokai"
                                                value={composerData.location}
                                                onChange={(e) => setComposerData({ ...composerData, location: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Verified Speed (Optional)</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. 95"
                                                value={composerData.wifiSpeed}
                                                onChange={(e) => setComposerData({ ...composerData, wifiSpeed: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label className="form-label">Description / Field Notes</label>
                                    <textarea
                                        rows={3}
                                        className="form-textarea"
                                        placeholder="Share what you are exploring, speed test observations, or helpful tips for fellow nomads..."
                                        value={composerData.content}
                                        onChange={(e) => setComposerData({ ...composerData, content: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="edit-profile-actions">
                                    <button
                                        type="button"
                                        onClick={() => setIsComposerOpen(false)}
                                        className="btn-cancel"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-save"
                                    >
                                        <Send size={15} />
                                        <span>Broadcast Update (+30 XP)</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NomadActivityFeed;
