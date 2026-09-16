import React, { useState } from 'react';
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
    Check
} from 'lucide-react';
import '../styles/Post.css';

const DEFAULT_POST_COMMENTS = [
    { id: 1, author: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', text: 'This spot looks incredible! Is the wifi stable for video calls?', time: '25m ago' },
    { id: 2, author: 'Leo Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', text: 'Yes, 180 Mbps fiber with backup generator. Tested it yesterday!', time: '12m ago' }
];

const Post = ({ post }) => {
    const { addToast } = useToastStore();

    // Interaction states
    const parseCount = (val) => {
        if (!val) return 0;
        if (typeof val === 'number') return val;
        if (val.includes('K')) return Math.round(parseFloat(val) * 1000);
        return parseInt(val, 10) || 0;
    };

    const [isLiked, setIsLiked] = useState(post.userLiked || false);
    const [likesCount, setLikesCount] = useState(parseCount(post.likes || post.stats?.likes || 18));
    
    const [isReposted, setIsReposted] = useState(post.userReposted || false);
    const [repostsCount, setRepostsCount] = useState(parseCount(post.shares || post.stats?.reposts || 4));
    
    const [isBookmarked, setIsBookmarked] = useState(post.userBookmarked || false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || DEFAULT_POST_COMMENTS);
    const [newComment, setNewComment] = useState('');
    const [showLightbox, setShowLightbox] = useState(false);

    // Poll state
    const [pollVoted, setPollVoted] = useState(null);
    const [pollState, setPollState] = useState(post.poll);

    const handleLike = (e) => {
        e.stopPropagation();
        if (isLiked) {
            setIsLiked(false);
            setLikesCount(prev => Math.max(0, prev - 1));
        } else {
            setIsLiked(true);
            setLikesCount(prev => prev + 1);
            addToast('Added to your travel favorites! ❤️', 'success');
        }
    };

    const handleRepost = (e) => {
        e.stopPropagation();
        if (isReposted) {
            setIsReposted(false);
            setRepostsCount(prev => Math.max(0, prev - 1));
        } else {
            setIsReposted(true);
            setRepostsCount(prev => prev + 1);
            addToast('Reposted to your nomad network! 🔄', 'success');
        }
    };

    const handleBookmark = (e) => {
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        addToast(!isBookmarked ? 'Saved to Travel Bookmarks 🔖' : 'Removed from Bookmarks', 'info');
    };

    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            addToast('Post link copied to clipboard! 📋', 'success');
        }
    };

    const handleTip = (e) => {
        e.stopPropagation();
        addToast(`Sent 50 Nomad Coins to ${post.author?.name || post.author}! 🪙✨`, 'success');
    };

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
        addToast('Comment published! 💬', 'success');
    };

    const handleVotePoll = (optionIndex) => {
        if (pollVoted !== null || !pollState) return;
        setPollVoted(optionIndex);
        const updated = { ...pollState };
        updated.options[optionIndex].votes += 1;
        updated.totalVotes = (updated.totalVotes || 0) + 1;
        setPollState(updated);
        addToast('Your vote was recorded! 📊', 'success');
    };

    const authorName = post.author?.name || post.author || 'Nomad Explorer';
    const authorHandle = post.author?.handle || post.username || '@nomad';
    const authorAvatar = post.author?.avatar || post.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
    const postMediaUrl = post.media?.url || post.image;

    return (
        <article className="social-post-card" id={`post-${post.id}`}>
            <div className="post-header-row">
                <img src={authorAvatar} alt={authorName} className="post-avatar-img" />

                <div className="post-meta-container">
                    <div className="post-author-line">
                        <span className="post-author-name">{authorName}</span>
                        <CheckCircle2 size={13} className="verified-badge text-blue-400" />
                        <span className="post-author-handle">{authorHandle}</span>
                        <span className="post-dot">·</span>
                        <span className="post-time">{post.time || '2h'}</span>
                    </div>

                    {(post.location || post.vibe) && (
                        <div className="post-subtags-row">
                            {post.location && (
                                <span className="post-location-tag">
                                    <MapPin size={11} /> {post.location}
                                </span>
                            )}
                            {post.vibe && (
                                <span className="post-vibe-tag">{post.vibe}</span>
                            )}
                        </div>
                    )}
                </div>

                <button 
                    className="post-more-btn" 
                    onClick={() => addToast(`Options for post by ${authorName}`, 'info')}
                    aria-label="Post options"
                >
                    <MoreHorizontal size={17} />
                </button>
            </div>

            {/* Post Content */}
            <div className="post-body">
                <p className="post-text-content">{post.content}</p>

                {/* Poll View */}
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
                            {pollState.totalVotes || 0} votes · {pollVoted !== null ? 'Final results' : 'Vote to see results'}
                        </div>
                    </div>
                )}

                {/* Media Image */}
                {postMediaUrl && (
                    <div 
                        className="post-media-container"
                        onClick={() => setShowLightbox(true)}
                        title="Click to view full photo"
                    >
                        <img src={postMediaUrl} alt="Post media" className="post-media-image" loading="lazy" />
                    </div>
                )}
            </div>

            {/* Interactions Bar */}
            <div className="post-action-bar">
                {/* Reply */}
                <button 
                    className={`action-btn reply ${showComments ? 'active' : ''}`}
                    onClick={() => setShowComments(!showComments)}
                    aria-label="Comments"
                >
                    <MessageCircle size={18} />
                    <span className="action-count">{comments.length}</span>
                </button>

                {/* Repost */}
                <button 
                    className={`action-btn repost ${isReposted ? 'active' : ''}`}
                    onClick={handleRepost}
                    aria-label="Repost"
                >
                    <Repeat2 size={18} />
                    <span className="action-count">{repostsCount}</span>
                </button>

                {/* Like */}
                <motion.button 
                    className={`action-btn like ${isLiked ? 'active' : ''}`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    aria-label="Like post"
                >
                    <Heart size={18} fill={isLiked ? "#ef4444" : "none"} stroke={isLiked ? "#ef4444" : "currentColor"} />
                    <span className="action-count">{likesCount}</span>
                </motion.button>

                {/* Views */}
                <div className="action-btn views" title="Impressions">
                    <BarChart2 size={18} />
                    <span className="action-count">{post.views || '1.2K'}</span>
                </div>

                <div className="actions-spacer" />

                {/* Tip */}
                <button 
                    className="action-btn tip"
                    onClick={handleTip}
                    title="Tip Creator (50 NMD)"
                    aria-label="Tip creator"
                >
                    <Coins size={17} className="text-amber-400" />
                </button>

                {/* Bookmark */}
                <button 
                    className={`action-btn bookmark ${isBookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                    title="Bookmark post"
                    aria-label="Bookmark"
                >
                    <Bookmark size={17} fill={isBookmarked ? "#3b82f6" : "none"} stroke={isBookmarked ? "#3b82f6" : "currentColor"} />
                </button>

                {/* Share */}
                <button 
                    className="action-btn share"
                    onClick={handleShare}
                    title="Share post"
                    aria-label="Share"
                >
                    <Share2 size={17} />
                </button>
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
                                placeholder="Write a reply or travel tip..."
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
                {showLightbox && postMediaUrl && (
                    <motion.div 
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLightbox(false)}
                    >
                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <button className="lightbox-close-btn" onClick={() => setShowLightbox(false)}>
                                <X size={20} />
                            </button>
                            <img src={postMediaUrl} alt="Enlarged view" className="lightbox-image" />
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
