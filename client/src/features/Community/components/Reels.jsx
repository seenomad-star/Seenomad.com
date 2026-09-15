import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Heart,
    MessageCircle,
    Share2,
    Music,
    ShoppingBag,
    Volume2,
    Play,
    UserPlus,
    Zap,
    ChevronRight
} from 'lucide-react';

// Force HMR Refresh
const Reels = () => { 
    const [reels, setReels] = useState([
        {
            id: 1,
            creator: {
                name: "Alex Nomad",
                handle: "@alexplorer",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
                isFollowing: false
            },
            description: "POV: You found the most beautiful infinity pool in Bali 🌊✨ #Bali #TravelReels",
            audio: "Original Audio - Alex Nomad",
            likes: 45200,
            comments: 1200,
            shares: 8500,
            dopamineScore: 92,
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-travel-vlog-walking-in-a-forest-42991-large.mp4",
            product: {
                name: "Travel Backpack Pro",
                price: "$129"
            }
        },
        {
            id: 2,
            creator: {
                name: "Julia Wander",
                handle: "@julia_shores",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=julia",
                isFollowing: true
            },
            description: "Street food tour in Seoul! 🍜🇰🇷 You HAVE to try the spicy rice cakes. #SeoulFood #Travel",
            audio: "K-Pop Vibes - Trending",
            likes: 32100,
            comments: 856,
            shares: 4200,
            dopamineScore: 88,
            videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-street-food-market-in-seoul-42993-large.mp4",
            product: null
        }
    ]);

    const [engagementCount, setEngagementCount] = useState(0);

    const handleLike = (id) => {
        setReels(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
        setEngagementCount(prev => prev + 1);
        // Trigger dopamine sound/effect logic here
    };

    return (
        <div className="reels-container">
            {reels.map(reel => (
                <div key={reel.id} className="reel-viewport">
                    {/* Real Video Support */}
                    <div className="reel-video-container">
                        <video 
                            src={reel.videoUrl} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            className="reel-video"
                        />
                        <div className="video-overlay"></div>
                        
                        {/* Dopamine Pulse Badge */}
                        <div className="dopamine-score-badge">
                            <Zap size={12} fill="#f59e0b" />
                            <span>{reel.dopamineScore}% Engagement</span>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="reel-actions">
                        <div className="action-item">
                            <div className="creator-avatar-container">
                                <img src={reel.creator.avatar} alt={reel.creator.name} className="creator-avatar-img" />
                                {!reel.creator.isFollowing && (
                                    <button className="follow-plus-btn">
                                        <UserPlus size={12} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="action-item">
                            <button className="reel-btn like" onClick={() => handleLike(reel.id)}>
                                <Heart size={28} fill={engagementCount > 0 ? "red" : "white"} />
                                <span>{(reel.likes / 1000).toFixed(1)}k</span>
                            </button>
                        </div>
                        <div className="action-item">
                            <button className="reel-btn comment">
                                <MessageCircle size={28} fill="white" />
                                <span>{reel.comments}</span>
                            </button>
                        </div>
                        <div className="action-item">
                            <button className="reel-btn share">
                                <Share2 size={28} fill="white" />
                                <span>{reel.shares}</span>
                            </button>
                        </div>
                        <div className="action-item">
                            <button className="reel-btn store-float">
                                <ShoppingBag size={24} color="#10b981" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="reel-info">
                        <div className="reel-creator-name">
                            <span>{reel.creator.handle}</span>
                            {!reel.creator.isFollowing && <button className="follow-text-btn">Follow</button>}
                        </div>
                        <p className="reel-description">{reel.description}</p>
                        <div className="reel-audio-info">
                            <Music size={14} className="rolling-icon" />
                            <div className="audio-scroller">
                                <span>{reel.audio}</span>
                            </div>
                        </div>

                        {reel.product && (
                            <motion.div 
                                className="shoppable-tag-v2"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="product-thumb"></div>
                                <div className="product-details">
                                    <span className="product-name">{reel.product.name}</span>
                                    <span className="product-price">{reel.product.price}</span>
                                </div>
                                <ChevronRight size={14} />
                            </motion.div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reels;
