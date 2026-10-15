import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, MapPin, MessageSquare, Award, Wifi, Heart,
    Share2, Plus, Send, Sparkles, CheckCircle2, ChevronRight,
    MessageCircle, ExternalLink, Flame, CornerDownRight, X, Clock,
    Radio, FileCheck, Users, ShieldCheck, Calendar, ArrowUpRight,
    Filter, Check, ThumbsUp
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
        addCommentToActivity,
        toggleLikeComment,
        addReplyToActivity
    } = useNomadActivityStore();

    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();

    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [replyingToId, setReplyingToId] = useState(null);
    const [replyInput, setReplyInput] = useState('');
    const [quickChips] = useState(['🎉 Congrats!', '🙌 Super helpful!', '☕ Meet up in Lisbon?', '📍 Saving this spot', '⚡ Great tip!']);

    // Composer form state
    const [composerData, setComposerData] = useState({
        type: 'visa_checkin',
        title: '',
        location: '',
        thread: '',
        content: '',
        wifiSpeed: '',
        visaType: 'Digital Nomad Visa',
        validity: '1 Year'
    });

    const checkInsCount = activities.filter(a => a.type === 'check_in').length;
    const visaCount = activities.filter(a => a.type === 'visa_checkin').length;
    const contributionsCount = activities.filter(a => a.type === 'contribution').length;
    const communityCount = activities.filter(a => a.type === 'community' || a.type === 'forum_reply').length;

    const filteredActivities = activities.filter(a => {
        if (filter === 'all') return true;
        if (filter === 'community') return a.type === 'community' || a.type === 'forum_reply';
        return a.type === filter;
    });

    const handleCreateActivity = (e) => {
        e.preventDefault();
        if (!composerData.content.trim()) {
            addToast('Please enter an update or description', 'error');
            return;
        }

        let title = composerData.title.trim();
        let metrics = {};

        if (!title) {
            if (composerData.type === 'visa_checkin') {
                title = `${composerData.visaType || 'Digital Nomad Visa'} Check-In & Entry Verification`;
            } else if (composerData.type === 'check_in') {
                title = `Checked in at ${composerData.location || 'Current Base'}`;
            } else if (composerData.type === 'community') {
                title = composerData.thread ? `Community: "${composerData.thread}"` : 'Nomad Community Interaction';
            } else {
                title = 'Submitted Nomad Telemetry & Contribution';
            }
        }

        if (composerData.type === 'visa_checkin') {
            metrics = {
                visaType: composerData.visaType || 'Nomad Permit',
                validity: composerData.validity || 'Valid'
            };
        } else if (composerData.type === 'contribution' && composerData.wifiSpeed) {
            metrics = { wifi: `${composerData.wifiSpeed} Mbps` };
        } else if (composerData.type === 'community') {
            metrics = { topic: composerData.thread || 'Nomad Network' };
        }

        addActivity({
            type: composerData.type,
            title,
            location: composerData.location.trim() || 'Current Base',
            thread: composerData.thread.trim() || null,
            content: composerData.content.trim(),
            metrics
        });

        addXP(30);
        addToast(`🚀 Real-time activity logged to timeline! +30 XP earned!`, 'success');
        setIsComposerOpen(false);
        setComposerData({
            type: 'visa_checkin',
            title: '',
            location: '',
            thread: '',
            content: '',
            wifiSpeed: '',
            visaType: 'Digital Nomad Visa',
            validity: '1 Year'
        });
    };

    const handleLike = (id, title) => {
        toggleLike(id);
        const act = activities.find(a => a.id === id);
        if (act && !act.isLiked) {
            addToast(`Liked "${title}"`, 'success');
        }
    };

    const handleToggleComment = (actId) => {
        if (replyingToId === actId) {
            setReplyingToId(null);
            setReplyInput('');
        } else {
            setReplyingToId(actId);
            setReplyInput('');
        }
    };

    const handleSendComment = (actId) => {
        if (!replyInput.trim()) return;
        addCommentToActivity(actId, {
            text: replyInput.trim(),
            author: 'Alex Rivera',
            handle: '@alexriveranomad',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
        });
        addXP(15);
        addToast(`💬 Comment posted to timeline! +15 XP`, 'success');
        setReplyInput('');
    };

    const handleSelectChip = (chipText) => {
        setReplyInput(prev => prev ? `${prev} ${chipText}` : chipText);
    };

    const handleCommentLike = (actId, commentId) => {
        toggleLikeComment(actId, commentId);
    };

    const handleShareActivity = (act) => {
        navigator.clipboard?.writeText(`${window.location.origin}/user/profile?tab=activity&id=${act.id}`);
        addToast('Activity timeline permalink copied to clipboard!', 'info');
    };

    // Helper for badge indicator based on type
    const renderTypeIcon = (type) => {
        switch (type) {
            case 'visa_checkin':
                return <FileCheck size={16} />;
            case 'contribution':
                return <Award size={16} />;
            case 'community':
            case 'forum_reply':
                return <Users size={16} />;
            case 'check_in':
            default:
                return <MapPin size={16} />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'visa_checkin':
                return '#10b981'; // Emerald
            case 'contribution':
                return '#f59e0b'; // Amber
            case 'community':
            case 'forum_reply':
                return '#8b5cf6'; // Violet
            case 'check_in':
            default:
                return '#06b6d4'; // Cyan
        }
    };

    return (
        <div className={`nomad-activity-feed-wrapper ${embedded ? 'embedded-view' : ''}`}>
            {/* 1. Real-Time Timeline Stepper Header */}
            <div className="activity-live-banner">
                <div className="broadcast-indicator-cluster">
                    <div className="live-broadcast-dot-wrap">
                        <span className="live-broadcast-pulse" />
                        <span className="live-broadcast-core" />
                    </div>
                    <div className="broadcast-text-stack">
                        <div className="broadcast-title-row">
                            <h3 className="broadcast-title">Recent Activity & Nomad Milestones</h3>
                            <span className="live-network-badge">
                                <Radio size={12} className="text-emerald-400" />
                                <span>Vertical Stepper Timeline</span>
                            </span>
                        </div>
                        <p className="broadcast-subtitle">
                            Chronological timeline of your visa check-ins, verified contributions, and global community interactions.
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
                        title="Log a new milestone, visa check-in, or contribution"
                    >
                        <Plus size={15} />
                        <span>Log Activity</span>
                    </button>
                </div>
            </div>

            {/* 2. Interactive Activity Filters Rail (Vertical Stepper Modes) */}
            <div className="activity-filter-bar">
                <div className="activity-filter-pills" role="tablist" aria-label="Filter user activities">
                    {[
                        { id: 'all', label: `All Timeline (${activities.length})`, icon: Activity },
                        { id: 'visa_checkin', label: `Visa Check-Ins (${visaCount})`, icon: FileCheck },
                        { id: 'contribution', label: `Contributions (${contributionsCount})`, icon: Award },
                        { id: 'community', label: `Community (${communityCount})`, icon: Users },
                        { id: 'check_in', label: `Trip Check-Ins (${checkInsCount})`, icon: MapPin }
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

            {/* 3. Refined Vertical Stepper Timeline Feed */}
            <div className="stepper-timeline-container">
                <div className="stepper-vertical-spine" aria-hidden="true" />

                <AnimatePresence mode="popLayout">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((act, index) => {
                            const isLatest = index === 0;
                            const isLast = index === filteredActivities.length - 1;
                            const color = act.color || getTypeColor(act.type);

                            return (
                                <motion.div
                                    key={act.id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.22, delay: Math.min(index * 0.04, 0.2) }}
                                    className={`stepper-step-row type-${act.type} ${isLatest ? 'is-latest' : ''} ${isLast ? 'is-last' : ''}`}
                                >
                                    {/* Vertical Stepper Left Node Anchor */}
                                    <div className="stepper-node-anchor">
                                        <div 
                                            className="stepper-node-bubble" 
                                            style={{ 
                                                borderColor: color,
                                                color: color,
                                                boxShadow: isLatest ? `0 0 16px ${color}55` : undefined
                                            }}
                                        >
                                            {renderTypeIcon(act.type)}
                                        </div>
                                        {!isLast && <div className="stepper-connecting-line" aria-hidden="true" />}
                                    </div>

                                    {/* Stepper Content Card */}
                                    <div className="stepper-step-card">
                                        {/* Stepper Step Header / Metadata Line */}
                                        <div className="stepper-meta-bar">
                                            <div className="stepper-category-pill" style={{ color: color, borderColor: `${color}35`, background: `${color}12` }}>
                                                {act.category || 'Activity'}
                                            </div>

                                            <div className="stepper-time-location">
                                                {act.location && (
                                                    <span className="stepper-location-text">
                                                        <MapPin size={12} className="inline mr-1 text-slate-400" />
                                                        {act.location}
                                                    </span>
                                                )}
                                                <span className="stepper-sep">·</span>
                                                <span className="stepper-timestamp">
                                                    <Clock size={11} className="inline mr-1 text-slate-400" />
                                                    {act.timestamp}
                                                </span>
                                            </div>

                                            {isLatest && (
                                                <span className="stepper-live-tag">
                                                    <span className="stepper-live-dot" />
                                                    Latest Milestone
                                                </span>
                                            )}
                                        </div>

                                        {/* Activity Step Title */}
                                        <h4 className="stepper-step-title">{act.title}</h4>

                                        {/* Thread Context if forum */}
                                        {act.thread && (
                                            <div className="stepper-thread-badge">
                                                <MessageSquare size={12} />
                                                <span>Thread: {act.thread}</span>
                                            </div>
                                        )}

                                        {/* Activity Step Narrative */}
                                        <p className="stepper-step-body">{act.content}</p>

                                        {/* Step Specific Telemetry Metrics */}
                                        {act.metrics && Object.keys(act.metrics).length > 0 && (
                                            <div className="stepper-metrics-cluster">
                                                {act.metrics.visaType && (
                                                    <div className="stepper-metric-tag border-emerald-500/30 text-emerald-300">
                                                        <ShieldCheck size={12} className="text-emerald-400" />
                                                        <span>{act.metrics.visaType}</span>
                                                    </div>
                                                )}
                                                {act.metrics.validity && (
                                                    <div className="stepper-metric-tag border-emerald-500/30 text-emerald-300">
                                                        <Calendar size={12} className="text-emerald-400" />
                                                        <span>Validity: {act.metrics.validity}</span>
                                                    </div>
                                                )}
                                                {act.metrics.borderEntry && (
                                                    <div className="stepper-metric-tag border-cyan-500/30 text-cyan-300">
                                                        <MapPin size={12} className="text-cyan-400" />
                                                        <span>{act.metrics.borderEntry}</span>
                                                    </div>
                                                )}
                                                {act.metrics.wifi && (
                                                    <div className="stepper-metric-tag border-amber-500/30 text-amber-300">
                                                        <Wifi size={12} className="text-amber-400" />
                                                        <span>Verified {act.metrics.wifi}</span>
                                                    </div>
                                                )}
                                                {act.metrics.attendees && (
                                                    <div className="stepper-metric-tag border-purple-500/30 text-purple-300">
                                                        <Users size={12} className="text-purple-400" />
                                                        <span>{act.metrics.attendees}</span>
                                                    </div>
                                                )}
                                                {act.metrics.upvotes && (
                                                    <div className="stepper-metric-tag border-sky-500/30 text-sky-300">
                                                        <Flame size={12} className="text-sky-400" />
                                                        <span>{act.metrics.upvotes} Upvotes</span>
                                                    </div>
                                                )}
                                                {act.metrics.distance && (
                                                    <div className="stepper-metric-tag border-cyan-500/30 text-cyan-300">
                                                        <MapPin size={12} className="text-cyan-400" />
                                                        <span>{act.metrics.distance} Route</span>
                                                    </div>
                                                )}
                                                {act.metrics.views && (
                                                    <div className="stepper-metric-tag border-amber-500/30 text-amber-300">
                                                        <Award size={12} className="text-amber-400" />
                                                        <span>{act.metrics.views} Nomad Views</span>
                                                    </div>
                                                )}
                                                {act.metrics.xp && (
                                                    <div className="stepper-metric-tag border-pink-500/30 text-pink-300">
                                                        <Sparkles size={12} className="text-pink-400" />
                                                        <span>{act.metrics.xp}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Stepper Step Footer Controls */}
                                        <div className="stepper-footer-bar">
                                            <div className="stepper-actions-group">
                                                <button
                                                    type="button"
                                                    onClick={() => handleLike(act.id, act.title)}
                                                    className={`btn-stepper-action ${act.isLiked ? 'liked' : ''}`}
                                                    title={act.isLiked ? 'Remove upvote' : 'Upvote activity'}
                                                >
                                                    <Heart size={14} fill={act.isLiked ? '#ef4444' : 'none'} color={act.isLiked ? '#ef4444' : 'currentColor'} />
                                                    <span>{act.likes}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleComment(act.id)}
                                                    className={`btn-stepper-action btn-comment-action ${replyingToId === act.id ? 'active' : ''}`}
                                                    title="Comment on this activity update"
                                                >
                                                    <MessageCircle size={14} />
                                                    <span>Comment {act.comments?.length ? `(${act.comments.length})` : (act.repliesCount ? `(${act.repliesCount})` : '')}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleShareActivity(act)}
                                                    className="btn-stepper-action"
                                                    title="Share activity link"
                                                >
                                                    <Share2 size={13} />
                                                    <span>Share</span>
                                                </button>
                                            </div>

                                            <span className="stepper-verified-tick" title="Verified SeeNomad ledger event">
                                                <CheckCircle2 size={13} className="text-emerald-400" />
                                                <span>Verified Entry</span>
                                            </span>
                                        </div>

                                        {/* Inline Stepper Interactive Comments Drawer */}
                                        {replyingToId === act.id && (
                                            <div className="activity-reply-drawer">
                                                {/* Mini Comment Input Field */}
                                                <div className="activity-mini-composer">
                                                    <div className="mini-composer-user-avatar">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                                            alt="Alex Rivera"
                                                            className="mini-composer-avatar-img"
                                                        />
                                                    </div>
                                                    <div className="mini-composer-input-container">
                                                        <div className="reply-input-wrap">
                                                            <input
                                                                type="text"
                                                                className="reply-input-field"
                                                                placeholder="Write a comment or interaction on this update..."
                                                                value={replyInput}
                                                                onChange={(e) => setReplyInput(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') handleSendComment(act.id);
                                                                    if (e.key === 'Escape') handleToggleComment(act.id);
                                                                }}
                                                                autoFocus
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSendComment(act.id)}
                                                                className="btn-reply-send"
                                                                disabled={!replyInput.trim()}
                                                                title="Post comment (+15 XP)"
                                                            >
                                                                <Send size={14} />
                                                            </button>
                                                        </div>

                                                        {/* Quick Reaction Chips */}
                                                        <div className="mini-comment-quick-chips">
                                                            <span className="quick-chips-label">Quick reaction:</span>
                                                            {quickChips.map((chip, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    type="button"
                                                                    onClick={() => handleSelectChip(chip)}
                                                                    className="btn-quick-chip"
                                                                >
                                                                    {chip}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Existing Community Comments Thread */}
                                                {act.comments && act.comments.length > 0 && (
                                                    <div className="activity-comments-stream">
                                                        <div className="activity-comments-heading">
                                                            <span>Community Comments ({act.comments.length})</span>
                                                        </div>
                                                        <div className="activity-comments-list">
                                                            {act.comments.map((comment) => (
                                                                <div key={comment.id} className="activity-comment-bubble-row">
                                                                    <img
                                                                        src={comment.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                                                                        alt={comment.author}
                                                                        className="comment-author-avatar"
                                                                    />
                                                                    <div className="comment-bubble-body">
                                                                        <div className="comment-meta-bar">
                                                                            <span className="comment-author-name">{comment.author}</span>
                                                                            <span className="comment-author-handle">{comment.handle}</span>
                                                                            <span className="comment-timestamp">· {comment.timestamp}</span>
                                                                        </div>
                                                                        <p className="comment-text-content">{comment.text}</p>
                                                                        <div className="comment-actions-bar">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleCommentLike(act.id, comment.id)}
                                                                                className={`btn-comment-like ${comment.isLiked ? 'liked' : ''}`}
                                                                                title="Like comment"
                                                                            >
                                                                                <Heart size={12} fill={comment.isLiked ? '#ef4444' : 'none'} color={comment.isLiked ? '#ef4444' : 'currentColor'} />
                                                                                <span>{comment.likes || 0}</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
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
                            <p>Record a new visa check-in, share a community event, or post verified wifi telemetry.</p>
                            <button
                                type="button"
                                onClick={() => setIsComposerOpen(true)}
                                className="btn-post-activity mt-3"
                            >
                                <Plus size={14} /> Log Milestone
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* 4. Log New Activity Modal */}
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
                                    <Sparkles size={18} className="text-emerald-400" />
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Record Timeline Milestone</h3>
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
                                    <label className="form-label">Activity Category</label>
                                    <div className="composer-type-segmented" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                        <button
                                            type="button"
                                            className={`type-segment-btn ${composerData.type === 'visa_checkin' ? 'active' : ''}`}
                                            onClick={() => setComposerData({ ...composerData, type: 'visa_checkin' })}
                                        >
                                            <FileCheck size={13} />
                                            <span>Visa</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-segment-btn ${composerData.type === 'contribution' ? 'active' : ''}`}
                                            onClick={() => setComposerData({ ...composerData, type: 'contribution' })}
                                        >
                                            <Award size={13} />
                                            <span>Contribution</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-segment-btn ${composerData.type === 'community' ? 'active' : ''}`}
                                            onClick={() => setComposerData({ ...composerData, type: 'community' })}
                                        >
                                            <Users size={13} />
                                            <span>Community</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-segment-btn ${composerData.type === 'check_in' ? 'active' : ''}`}
                                            onClick={() => setComposerData({ ...composerData, type: 'check_in' })}
                                        >
                                            <MapPin size={13} />
                                            <span>Check-In</span>
                                        </button>
                                    </div>
                                </div>

                                {composerData.type === 'visa_checkin' && (
                                    <>
                                        <div className="form-row-2">
                                            <div className="form-group">
                                                <label className="form-label">Visa / Permit Type</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="e.g. Portugal D8 Digital Nomad Visa or India e-Visa"
                                                    value={composerData.visaType}
                                                    onChange={(e) => setComposerData({ ...composerData, visaType: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Approved Validity</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="e.g. 1 Year or 2 Years (2028)"
                                                    value={composerData.validity}
                                                    onChange={(e) => setComposerData({ ...composerData, validity: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Immigration / Port of Entry Location</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. AIMA Lisbon or Indira Gandhi International Airport (DEL)"
                                                value={composerData.location}
                                                onChange={(e) => setComposerData({ ...composerData, location: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

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

                                {composerData.type === 'community' && (
                                    <>
                                        <div className="form-group">
                                            <label className="form-label">Interaction Topic / Event Title</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. Hosted Nomad Sunset Meetup or Delhi Coworking Discussion"
                                                value={composerData.thread}
                                                onChange={(e) => setComposerData({ ...composerData, thread: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Location / Hub</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. Miradouro de Santa Catarina or Cyber City Gurugram"
                                                value={composerData.location}
                                                onChange={(e) => setComposerData({ ...composerData, location: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                {composerData.type === 'contribution' && (
                                    <div className="form-row-2">
                                        <div className="form-group">
                                            <label className="form-label">Venue / Landmark Name</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="e.g. Qutub Minar, Lisbon Studio, or Blue Tokai"
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
                                    <label className="form-label">Timeline Description / Field Notes</label>
                                    <textarea
                                        rows={3}
                                        className="form-textarea"
                                        placeholder="Share verified details, documentation experience, tips, or takeaways for fellow nomads..."
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
                                        <span>Log Milestone (+30 XP)</span>
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
