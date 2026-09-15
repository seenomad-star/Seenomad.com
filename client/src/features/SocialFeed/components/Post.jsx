import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    Coins
} from 'lucide-react';

const Post = ({ post }) => {
    const { addToast } = useToastStore();
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            addToast('Added to your travel favorites!', 'success');
        }
    };

    return (
        <div className="stream-post">
            <div className="post-left">
                <img src={post.avatar} alt={post.author} className="post-avatar" />
            </div>
            <div className="post-right">
                <div className="post-meta">
                    <span className="post-author-name">{post.author}</span>
                    <span className="post-author-handle">{post.username}</span>
                    <span className="post-dot">·</span>
                    <span className="post-time">{post.time}</span>
                    {post.location && (
                        <>
                            <span className="post-dot">·</span>
                            <span className="post-location">
                                <MapPin size={12} /> {post.location}
                            </span>
                        </>
                    )}
                    <button className="post-more-btn">
                        <MoreHorizontal size={16} />
                    </button>
                </div>

                <div className="post-content-text">
                    {post.content}
                </div>

                {post.image && (
                    <div className="post-media">
                        <img src={post.image} alt="Post content" />
                    </div>
                )}

                <div className="post-interactions">
                    <button className="interaction-btn reply">
                        <MessageCircle size={18} />
                        <span>{post.comments}</span>
                    </button>
                    <button className="interaction-btn repost">
                        <Repeat2 size={18} />
                        <span>{post.shares}</span>
                    </button>
                    <motion.button 
                        className={`interaction-btn like ${isLiked ? 'active' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLike}
                    >
                        <Heart size={18} fill={isLiked ? "#ef4444" : "none"} stroke={isLiked ? "#ef4444" : "currentColor"} />
                        <span>{isLiked ? 'Liked' : post.likes}</span>
                    </motion.button>
                    <button className="interaction-btn view">
                        <BarChart2 size={18} />
                        <span>{post.views}</span>
                    </button>
                    <div className="interaction-spacer"></div>
                    <button className="interaction-btn share">
                        <Bookmark size={18} />
                    </button>
                    <button 
                        className="interaction-btn tip"
                        onClick={() => addToast('Sent 50 Nomad Coins to ' + post.author + '! 🪙', 'success')}
                        title="Tip Creator"
                    >
                        <Coins size={18} className="text-amber-500" />
                    </button>
                    <button className="interaction-btn share">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
