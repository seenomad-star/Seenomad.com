import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Navigation, ShoppingBag } from 'lucide-react';
import '../styles/ShortsFeed.css';

const ShortsFeed = () => {
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
            videoUrl: 'https://images.unsplash.com/photo-1527838832702-5956651122bf?w=800', // Mock with image
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

    return (
        <div className="shorts-container">
            {shorts.map((short) => (
                <div key={short.id} className="short-video-wrapper">
                    <img 
                        src={short.videoUrl} 
                        className="short-video-mock" 
                        alt="Short video content"
                    />
                    
                    <div className="short-overlay">
                        <div className="short-info">
                            <div className="short-author">
                                <img src={short.avatar} className="short-avatar" alt={short.author} />
                                <h3>@{short.author}</h3>
                                <button className="follow-btn-small">Follow</button>
                            </div>
                            <p className="short-description">{short.description}</p>
                            <div className="short-music">
                                <Navigation size={14} className="music-icon" />
                                <span>{short.music}</span>
                            </div>
                            
                            <button className="book-trip-btn">
                                <ShoppingBag size={18} />
                                <span>Book This Trip</span>
                            </button>
                        </div>

                        <div className="short-actions">
                            <ActionItem icon={<Heart size={28} fill="currentColor" />} count={short.likes} />
                            <ActionItem icon={<MessageCircle size={28} />} count={short.comments} />
                            <ActionItem icon={<Bookmark size={28} />} count="Save" />
                            <ActionItem icon={<Share2 size={28} />} count={short.shares} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const ActionItem = ({ icon, count }) => (
    <div className="action-item">
        <div className="action-icon">{icon}</div>
        <span>{count}</span>
    </div>
);

export default ShortsFeed;
