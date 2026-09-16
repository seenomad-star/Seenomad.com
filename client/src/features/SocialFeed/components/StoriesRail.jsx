import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Heart, ChevronLeft, ChevronRight, MapPin, Send } from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../styles/StoriesRail.css';

const DEFAULT_STORIES = [
    {
        id: 0,
        username: 'Your Story',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        isUser: true,
        storyImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
        location: 'Seminyak, Bali',
        caption: 'Morning surf session before opening Slack 🏄‍♂️🌊',
        time: 'Just now'
    },
    {
        id: 1,
        username: 'emma_j',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900',
        location: 'Oia, Santorini',
        caption: 'Watching the whitewashed cliffs turn into pure gold ✨🇬🇷',
        time: '2h ago'
    },
    {
        id: 2,
        username: 'alex_k',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900',
        location: 'Mount Fuji, Japan',
        caption: 'Sunrise hike at the 5th station. 0 degrees but 100% worth it 🗻',
        time: '4h ago'
    },
    {
        id: 3,
        username: 'sarah_m',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900',
        location: 'Ubud, Bali',
        caption: 'Rice terrace cafe with 200 Mbps Starlink fiber ☕💻',
        time: '6h ago'
    },
    {
        id: 4,
        username: 'marcus_nx',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900',
        location: 'Medellin, Colombia',
        caption: 'Found the quietest rooftop workspace in Poblado 🌴',
        time: '8h ago'
    },
    {
        id: 5,
        username: 'lisa_p',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900',
        location: 'Tokyo, Japan',
        caption: 'Midnight ramen run after a 12-hour design sprint 🍜',
        time: '11h ago'
    }
];

const StoriesRail = ({ stories = DEFAULT_STORIES }) => {
    const { addToast } = useToastStore();
    const [activeStoryIndex, setActiveStoryIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const [storyLiked, setStoryLiked] = useState(false);
    const [replyText, setReplyText] = useState('');

    const openStory = (idx) => {
        setActiveStoryIndex(idx);
        setProgress(0);
        setStoryLiked(false);
    };

    const closeStory = () => {
        setActiveStoryIndex(null);
        setProgress(0);
    };

    const nextStory = () => {
        if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex(prev => prev + 1);
            setProgress(0);
            setStoryLiked(false);
        } else {
            closeStory();
        }
    };

    const prevStory = () => {
        if (activeStoryIndex > 0) {
            setActiveStoryIndex(prev => prev - 1);
            setProgress(0);
            setStoryLiked(false);
        }
    };

    // Auto progress timer
    useEffect(() => {
        if (activeStoryIndex === null) return;
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    nextStory();
                    return 0;
                }
                return prev + 2;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [activeStoryIndex]);

    const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        addToast(`Reply sent to ${activeStory?.username}! 💌`, 'success');
        setReplyText('');
    };

    return (
        <>
            <div className="stories-rail-container">
                <div className="stories-rail-scroll">
                    {stories.map((story, idx) => (
                        <div 
                            key={story.id} 
                            className="story-item-box"
                            onClick={() => {
                                if (story.isUser) {
                                    addToast('Opening story creator...', 'info');
                                    openStory(idx);
                                } else {
                                    openStory(idx);
                                }
                            }}
                        >
                            <div className={`story-avatar-wrapper ${story.hasStory ? 'has-active-story' : ''} ${story.isUser ? 'is-user-story' : ''}`}>
                                <img src={story.avatar} alt={story.username} className="story-avatar-img" />
                                {story.isUser && (
                                    <div className="story-add-badge" title="Add to story">
                                        <Plus size={12} strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                            <span className="story-item-name">{story.username}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story Viewer Modal */}
            <AnimatePresence>
                {activeStory && (
                    <motion.div 
                        className="story-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="story-modal-inner">
                            {/* Top Progress Bar */}
                            <div className="story-progress-bar">
                                <div 
                                    className="story-progress-fill" 
                                    style={{ width: `${progress}%` }} 
                                />
                            </div>

                            {/* Header */}
                            <div className="story-modal-header">
                                <img src={activeStory.avatar} alt={activeStory.username} className="story-modal-avatar" />
                                <div className="story-modal-meta">
                                    <div className="story-modal-author">{activeStory.username}</div>
                                    <div className="story-modal-loc">
                                        <MapPin size={11} />
                                        <span>{activeStory.location || 'Global Nomad'}</span>
                                        <span>·</span>
                                        <span>{activeStory.time || '2h'}</span>
                                    </div>
                                </div>
                                <button className="story-modal-close" onClick={closeStory} aria-label="Close story">
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Story Media */}
                            <div className="story-modal-media">
                                <img src={activeStory.storyImage || activeStory.avatar} alt="Story visual" className="story-image" />
                                <div className="story-media-gradient" />
                                <p className="story-caption">{activeStory.caption}</p>
                            </div>

                            {/* Navigation Touch Targets */}
                            <button className="story-nav-btn prev" onClick={prevStory} aria-label="Previous story">
                                <ChevronLeft size={22} />
                            </button>
                            <button className="story-nav-btn next" onClick={nextStory} aria-label="Next story">
                                <ChevronRight size={22} />
                            </button>

                            {/* Bottom Reply Bar */}
                            <form className="story-reply-bar" onSubmit={handleSendReply}>
                                <input
                                    type="text"
                                    placeholder={`Reply to ${activeStory.username}...`}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="story-reply-input"
                                />
                                <button 
                                    type="button" 
                                    className={`story-like-btn ${storyLiked ? 'liked' : ''}`}
                                    onClick={() => {
                                        setStoryLiked(!storyLiked);
                                        if (!storyLiked) addToast('Story liked! ❤️', 'success');
                                    }}
                                >
                                    <Heart size={20} fill={storyLiked ? '#ef4444' : 'none'} stroke={storyLiked ? '#ef4444' : 'white'} />
                                </button>
                                <button type="submit" className="story-send-btn" disabled={!replyText.trim()}>
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default StoriesRail;
