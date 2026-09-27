import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Heart, ChevronLeft, ChevronRight, MapPin, Send } from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../styles/StoriesRail.css';

const DEFAULT_STORIES = [
    {
        id: 0,
        username: 'Your Story',
        avatar: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
        isUser: true,
        storyImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
        location: 'Seminyak, Bali',
        caption: 'Morning surf session before opening Slack 🏄‍♂️🌊',
        time: 'Just now'
    },
    {
        id: 1,
        username: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900',
        location: 'Kyoto, Japan',
        caption: 'Morning light in the Arashiyama Bamboo Grove. Pure tranquil magic 🎋✨',
        time: '2h ago',
        ringColor: 'orange'
    },
    {
        id: 2,
        username: 'Marco',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900',
        location: 'Amalfi Coast, Italy',
        caption: 'Speedboat cruise between cliffside lemon groves 🍋🚤',
        time: '3h ago',
        ringColor: 'orange'
    },
    {
        id: 3,
        username: 'Yuki',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900',
        location: 'Shinjuku, Tokyo',
        caption: 'Midnight ramen run and alley exploration 🍜🏮',
        time: '5h ago',
        ringColor: 'orange'
    },
    {
        id: 4,
        username: 'Alex',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900',
        location: 'Mount Fuji, Japan',
        caption: 'Sunrise hike at 5th station. 0 degrees but 100% worth it 🗻',
        time: '8h ago',
        ringColor: 'gray'
    },
    {
        id: 5,
        username: 'Priya',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200',
        hasStory: true,
        storyImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=900',
        location: 'Udaipur, India',
        caption: 'Sunset over the City Palace on Lake Pichola 🏰🌅',
        time: '10h ago',
        ringColor: 'orange'
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

    const nextStory = useCallback(() => {
        if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex(prev => prev + 1);
            setProgress(0);
            setStoryLiked(false);
        } else {
            closeStory();
        }
    }, [activeStoryIndex, stories.length]);

    const prevStory = () => {
        if (activeStoryIndex > 0) {
            setActiveStoryIndex(prev => prev - 1);
            setProgress(0);
            setStoryLiked(false);
        }
    };

    // Auto-advance stories
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
    }, [activeStoryIndex, nextStory]);

    const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

    const handleSendReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        addToast(`Reply sent to ${activeStory.username}: "${replyText}"`, 'success');
        setReplyText('');
    };

    const toggleLike = () => {
        setStoryLiked(!storyLiked);
        if (!storyLiked) {
            addToast(`Liked ${activeStory.username}'s story! ❤️`, 'success');
        }
    };

    return (
        <section className="stories-rail-container" aria-label="Stories Rail">
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
                        {story.isUser ? (
                            <div className="story-squircle-wrapper user-squircle">
                                <img src={story.avatar} alt="Your story" className="story-squircle-bg" />
                                <div className="story-add-plus-badge" title="Add to story">
                                    <Plus size={15} strokeWidth={3} />
                                </div>
                            </div>
                        ) : (
                            <div className={`story-squircle-wrapper ring-${story.ringColor || 'orange'}`}>
                                <div className="story-squircle-inner">
                                    <img src={story.avatar} alt={story.username} className="story-avatar-squircle" />
                                </div>
                            </div>
                        )}
                        <span className="story-item-name">{story.username}</span>
                    </div>
                ))}
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
                                <div className="story-author-info">
                                    <img 
                                        src={activeStory.avatar} 
                                        alt={activeStory.username} 
                                        className="story-modal-avatar" 
                                    />
                                    <div>
                                        <h4 className="story-author-name">{activeStory.username}</h4>
                                        <div className="story-meta-row">
                                            {activeStory.location && (
                                                <span className="story-location">
                                                    <MapPin size={11} /> {activeStory.location}
                                                </span>
                                            )}
                                            <span className="story-timestamp">· {activeStory.time}</span>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    className="story-close-btn" 
                                    onClick={closeStory}
                                    aria-label="Close story"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Story Media Background */}
                            <div className="story-media-view">
                                <img 
                                    src={activeStory.storyImage} 
                                    alt={activeStory.caption || 'Travel story'} 
                                    className="story-full-image" 
                                />
                                {activeStory.caption && (
                                    <div className="story-caption-overlay">
                                        <p>{activeStory.caption}</p>
                                    </div>
                                )}

                                {/* Nav Chevrons */}
                                {activeStoryIndex > 0 && (
                                    <button 
                                        className="story-nav-btn prev" 
                                        onClick={(e) => { e.stopPropagation(); prevStory(); }}
                                        aria-label="Previous story"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                )}
                                <button 
                                    className="story-nav-btn next" 
                                    onClick={(e) => { e.stopPropagation(); nextStory(); }}
                                    aria-label="Next story"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            {/* Bottom Interaction Bar */}
                            <form className="story-reply-bar" onSubmit={handleSendReply}>
                                <input
                                    type="text"
                                    placeholder={`Reply to ${activeStory.username}...`}
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="story-reply-input"
                                />
                                {replyText.trim() ? (
                                    <button type="submit" className="story-send-btn" aria-label="Send reply">
                                        <Send size={16} />
                                    </button>
                                ) : (
                                    <button 
                                        type="button" 
                                        className={`story-like-btn ${storyLiked ? 'liked' : ''}`}
                                        onClick={toggleLike}
                                        aria-label="Like story"
                                    >
                                        <Heart size={20} fill={storyLiked ? '#ef4444' : 'none'} color={storyLiked ? '#ef4444' : '#ffffff'} />
                                    </button>
                                )}
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default StoriesRail;
