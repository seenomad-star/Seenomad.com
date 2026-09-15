import React, { useState } from 'react';
import {
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Zap,
    MoreHorizontal,
    CheckCircle2,
    TrendingUp,
    MapPin
} from 'lucide-react';

const TravelFeed = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: {
                name: "Elena Rodriguez",
                avatar: "ER",
                tier: "Elite Nomad",
                isVerified: true
            },
            location: "Santorini, Greece",
            content: "Waking up to this view is a dream come true. The blue domes and the Aegean Sea are even more beautiful in person! 🇬🇷✨",
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
            likes: "12.4k",
            comments: "842",
            isBoosted: true,
            time: "2h ago"
        },
        {
            id: 2,
            author: {
                name: "Marco Chen",
                avatar: "MC",
                tier: "Pro Creator",
                isVerified: true
            },
            location: "Kyoto, Japan",
            content: "Found this hidden temple in the Arashiyama district. No crowds, just pure zen. ⛩️🍃 #JapanTravel #HiddenGems",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
            likes: "8.2k",
            comments: "321",
            isBoosted: false,
            time: "5h ago"
        },
        {
            id: 3,
            author: {
                name: "Sarah Jenkins",
                avatar: "SJ",
                tier: "Influencer",
                isVerified: false
            },
            location: "Swiss Alps",
            content: "The air is different up here. 🏔️❄️ Can't wait to show you guys the full vlog tomorrow!",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
            likes: "5.1k",
            comments: "156",
            isBoosted: false,
            time: "8h ago"
        }
    ]);

    return (
        <div className="travel-feed">
            {posts.map(post => (
                <div key={post.id} className={`feed-card ${post.isBoosted ? 'boosted' : ''}`}>
                    {post.isBoosted && (
                        <div className="boost-badge">
                            <Zap size={12} fill="currentColor" />
                            <span>BOOSTED BY AI</span>
                        </div>
                    )}

                    <div className="feed-card-header">
                        <div className="author-info">
                            <div className="author-avatar">{post.author.avatar}</div>
                            <div className="author-details">
                                <div className="author-name-row">
                                    <span className="author-name">{post.author.name}</span>
                                    {post.author.isVerified && <CheckCircle2 size={14} className="verified-icon" />}
                                    <span className="author-tier">{post.author.tier}</span>
                                </div>
                                <div className="post-meta">
                                    <span className="post-time">{post.time}</span>
                                    <span className="meta-dot">•</span>
                                    <div className="post-location">
                                        <MapPin size={12} />
                                        <span>{post.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="more-btn"><MoreHorizontal size={20} /></button>
                    </div>

                    <div className="feed-card-content">
                        <p>{post.content}</p>
                        <div className="post-image-container">
                            <img src={post.image} alt={post.location} />
                            <div className="image-overlay-actions">
                                <button className="overlay-action-btn">
                                    <TrendingUp size={16} />
                                    <span>Match 98%</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="feed-card-footer">
                        <div className="footer-actions-left">
                            <button className="interaction-btn like">
                                <Heart size={22} />
                                <span>{post.likes}</span>
                            </button>
                            <button className="interaction-btn comment">
                                <MessageCircle size={22} />
                                <span>{post.comments}</span>
                            </button>
                            <button className="interaction-btn share">
                                <Share2 size={22} />
                            </button>
                        </div>
                        <button className="interaction-btn save">
                            <Bookmark size={22} />
                        </button>
                    </div>

                    <div className="monetization-hook">
                        <div className="hook-content">
                            <span className="hook-text">Unlock {post.author.name.split(' ')[0]}'s full itinerary</span>
                            <button className="unlock-btn">Unlock for $2.99</button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="feed-loader">
                <div className="loader-dots">
                    <span></span><span></span><span></span>
                </div>
                <p>Curating more dopamine for you...</p>
            </div>
        </div>
    );
};

export default TravelFeed;
