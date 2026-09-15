import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, Award, Lock, Flame, Zap, TrendingUp, Eye, Clock } from 'lucide-react';
import '../../styles/popular/TrendingPostCard.css';

const TrendingPostCard = ({ post, viewMode = 'card' }) => {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [saved, setSaved] = useState(false);
    const [voteCount, setVoteCount] = useState(post.upvotes);

    const handleUpvote = () => {
        if (upvoted) {
            setUpvoted(false);
            setVoteCount(voteCount - 1);
        } else {
            setUpvoted(true);
            setDownvoted(false);
            setVoteCount(downvoted ? voteCount + 2 : voteCount + 1);
        }
    };

    const handleDownvote = () => {
        if (downvoted) {
            setDownvoted(false);
            setVoteCount(voteCount + 1);
        } else {
            setDownvoted(true);
            setUpvoted(false);
            setVoteCount(upvoted ? voteCount - 2 : voteCount - 1);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num;
    };

    return (
        <div className={`trending-post-card ${viewMode} ${post.isPremium ? 'premium' : ''}`}>
            {/* Viral Badges */}
            <div className="viral-badges">
                {post.trending && (
                    <span className="badge trending">
                        <Flame size={14} />
                        Trending
                    </span>
                )}
                {post.rising && (
                    <span className="badge rising">
                        <Zap size={14} />
                        Rising Fast
                    </span>
                )}
                {post.viral && (
                    <span className="badge viral">
                        <TrendingUp size={14} />
                        Viral
                    </span>
                )}
            </div>

            {/* Voting Section */}
            <div className="vote-section">
                <button
                    className={`vote-btn upvote ${upvoted ? 'active' : ''}`}
                    onClick={handleUpvote}
                    title="Upvote"
                >
                    <ArrowUp size={20} />
                </button>
                <span className={`vote-count ${upvoted ? 'upvoted' : downvoted ? 'downvoted' : ''}`}>
                    {formatNumber(voteCount)}
                </span>
                <button
                    className={`vote-btn downvote ${downvoted ? 'active' : ''}`}
                    onClick={handleDownvote}
                    title="Downvote"
                >
                    <ArrowDown size={20} />
                </button>
            </div>

            {/* Main Content */}
            <div className="post-content">
                {/* Header */}
                <div className="post-header">
                    <div className="post-meta">
                        <span className="community">{post.community}</span>
                        <span className="separator">•</span>
                        <span className="author">Posted by u/{post.author}</span>
                        <span className="separator">•</span>
                        <span className="time">
                            <Clock size={12} />
                            {post.timeAgo}
                        </span>
                    </div>
                    {post.awards > 0 && (
                        <div className="awards-count">
                            <Award size={16} className="award-icon" />
                            <span>{post.awards}</span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h2 className="post-title">
                    {post.isPremium && <Lock size={18} className="premium-icon" />}
                    {post.title}
                </h2>

                {/* Tags */}
                <div className="post-tags">
                    {post.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>

                {/* Content Preview */}
                <div className={`post-body ${post.isPremium ? 'blurred' : ''}`}>
                    {post.image && (
                        <div className="post-image">
                            <img src={post.image} alt={post.title} />
                            {post.isPremium && (
                                <div className="premium-overlay">
                                    <Lock size={32} />
                                    <p>Premium Content</p>
                                    <button className="unlock-btn">
                                        Unlock Full Story
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <p className="post-text">{post.content}</p>
                </div>

                {/* Action Bar */}
                <div className="post-actions">
                    <button className="action-btn comments">
                        <MessageCircle size={18} />
                        <span>{formatNumber(post.comments)} Comments</span>
                    </button>
                    <button className="action-btn share">
                        <Share2 size={18} />
                        <span>{formatNumber(post.shares)} Shares</span>
                    </button>
                    <button
                        className={`action-btn save ${saved ? 'active' : ''}`}
                        onClick={() => setSaved(!saved)}
                    >
                        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                        <span>{saved ? 'Saved' : 'Save'}</span>
                    </button>
                    <button className="action-btn award">
                        <Award size={18} />
                        <span>Give Award</span>
                    </button>
                    <div className="view-count">
                        <Eye size={16} />
                        <span>{formatNumber(voteCount * 12)} views</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingPostCard;
