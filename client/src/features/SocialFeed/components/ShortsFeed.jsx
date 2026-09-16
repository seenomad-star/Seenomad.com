import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Navigation, ShoppingBag, Volume2, VolumeX } from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../styles/ShortsFeed.css';

const ShortsFeed = () => {
    const { addToast } = useToastStore();
    const [mutedMap, setMutedMap] = useState({});
    const [likesMap, setLikesMap] = useState({});
    const [bookmarksMap, setBookmarksMap] = useState({});

    const shorts = [
        {
            id: 1,
            author: 'nomad_nina',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            description: 'Unreal sunrise in Cappadocia! 🎈✨ Worth the 4 AM wake up. #Turkey #TravelInspo',
            music: 'Original sound - nomad_nina',
            likes: '45.2K',
            comments: '1.2K',
            shares: '8.4K',
            videoUrl: 'https://images.unsplash.com/photo-1527838832702-5956651122bf?w=800',
            category: 'Adventure'
        },
        {
            id: 2,
            author: 'globe_trotter_ben',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            description: 'Best street food in Bangkok for under $5! 🍜🔥 You have to try these. #BangkokEats #Thailand',
            music: 'Street Vibes - Lofi Beats',
            likes: '128K',
            comments: '3.5K',
            shares: '25K',
            videoUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04cb113d?w=800',
            category: 'Food'
        },
        {
            id: 3,
            author: 'isla_explores',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
            description: 'Hidden beaches in the Philippines you need to visit in 2026. 🏝️💎 #Philippines #IslandLife',
            music: 'Ocean Waves - Tropical House',
            likes: '89.5K',
            comments: '2.1K',
            shares: '15.6K',
            videoUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
            category: 'Beach'
        }
    ];

    const toggleLike = (id) => {
        setLikesMap(prev => {
            const next = !prev[id];
            if (next) addToast('Liked travel reel! ❤️', 'success');
            return { ...prev, [id]: next };
        });
    };

    const toggleBookmark = (id) => {
        setBookmarksMap(prev => {
            const next = !prev[id];
            if (next) addToast('Short saved to travel collection! 🔖', 'info');
            return { ...prev, [id]: next };
        });
    };

    const handleShare = (short) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            addToast(`Share link for @${short.author}'s reel copied! 📋`, 'success');
        }
    };

    const handleBookTrip = (short) => {
        addToast(`Opening itinerary & flights for ${short.category} destination! ✈️`, 'success');
    };

    return (
        <div className="shorts-container">
            {shorts.map((short) => {
                const isLiked = !!likesMap[short.id];
                const isBookmarked = !!bookmarksMap[short.id];
                const isMuted = !!mutedMap[short.id];

                return (
                    <div key={short.id} className="short-video-wrapper">
                        <img 
                            src={short.videoUrl} 
                            className="short-video-mock" 
                            alt={short.description}
                            loading="lazy"
                        />
                        
                        <div className="short-overlay">
                            {/* Sound Toggle */}
                            <button 
                                className="short-sound-btn"
                                onClick={() => setMutedMap(prev => ({ ...prev, [short.id]: !prev[short.id] }))}
                                aria-label={isMuted ? "Unmute reel" : "Mute reel"}
                            >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>

                            <div className="short-info">
                                <div className="short-author">
                                    <img src={short.avatar} className="short-avatar" alt={short.author} />
                                    <h3>@{short.author}</h3>
                                    <button 
                                        className="follow-btn-small"
                                        onClick={() => addToast(`Following @${short.author}!`, 'success')}
                                    >
                                        Follow
                                    </button>
                                </div>
                                <p className="short-description">{short.description}</p>
                                <div className="short-music">
                                    <Navigation size={14} className="music-icon" />
                                    <span>{short.music}</span>
                                </div>
                                
                                <button className="book-trip-btn" onClick={() => handleBookTrip(short)}>
                                    <ShoppingBag size={18} />
                                    <span>Explore This Route</span>
                                </button>
                            </div>

                            <div className="short-actions">
                                <button 
                                    className={`action-item ${isLiked ? 'liked' : ''}`}
                                    onClick={() => toggleLike(short.id)}
                                    aria-label="Like short"
                                >
                                    <div className="action-icon">
                                        <Heart size={26} fill={isLiked ? "#ef4444" : "none"} stroke={isLiked ? "#ef4444" : "white"} />
                                    </div>
                                    <span>{isLiked ? 'Liked' : short.likes}</span>
                                </button>

                                <button 
                                    className="action-item"
                                    onClick={() => addToast('Opening comment thread...', 'info')}
                                    aria-label="Comments"
                                >
                                    <div className="action-icon">
                                        <MessageCircle size={26} />
                                    </div>
                                    <span>{short.comments}</span>
                                </button>

                                <button 
                                    className={`action-item ${isBookmarked ? 'bookmarked' : ''}`}
                                    onClick={() => toggleBookmark(short.id)}
                                    aria-label="Save short"
                                >
                                    <div className="action-icon">
                                        <Bookmark size={26} fill={isBookmarked ? "#3b82f6" : "none"} stroke={isBookmarked ? "#3b82f6" : "white"} />
                                    </div>
                                    <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                                </button>

                                <button 
                                    className="action-item"
                                    onClick={() => handleShare(short)}
                                    aria-label="Share short"
                                >
                                    <div className="action-icon">
                                        <Share2 size={26} />
                                    </div>
                                    <span>{short.shares}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ShortsFeed;
