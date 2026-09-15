import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Music, UserPlus, Play } from 'lucide-react';
import '../../styles/NomadShorts.css';

const NomadShortsFeed = () => {
    const [liked, setLiked] = useState({});

    const shorts = [
        { 
            id: 1, 
            user: '@TravelLegend', 
            caption: 'POV: Waking up in a glass igloo in Finland ❄️ #Traveluh #WinterVibes',
            music: 'Arctic Sounds - Original Audio',
            likes: '124K',
            comments: '1.2K',
            videoThumb: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=400&h=700&auto=format&fit=crop'
        },
        { 
            id: 2, 
            user: '@DesertQueen', 
            caption: 'Sandboarding at sunset in Dubai was unreal! 🏜️ Check my itinerary in bio.',
            music: 'Dune Drifters - Remix',
            likes: '89K',
            comments: '640',
            videoThumb: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=400&h=700&auto=format&fit=crop'
        }
    ];

    const toggleLike = (id) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="shorts-container">
            <div className="shorts-feed">
                {shorts.map((short) => (
                    <div className="short-video-card" key={short.id} style={{ backgroundImage: `url(${short.videoThumb})` }}>
                        <div className="video-overlay">
                            <div className="video-info">
                                <div className="user-row">
                                    <h4>{short.user}</h4>
                                    <button className="follow-btn"><UserPlus size={14} /> Follow</button>
                                </div>
                                <p>{short.caption}</p>
                                <div className="music-ticker">
                                    <Music size={14} className="spinning" />
                                    <span>{short.music}</span>
                                </div>
                            </div>

                            <div className="video-actions">
                                <div className="action-item" onClick={() => toggleLike(short.id)}>
                                    <Heart size={28} fill={liked[short.id] ? "#EF4444" : "none"} color={liked[short.id] ? "#EF4444" : "white"} />
                                    <span>{short.likes}</span>
                                </div>
                                <div className="action-item">
                                    <MessageCircle size={28} />
                                    <span>{short.comments}</span>
                                </div>
                                <div className="action-item">
                                    <Share2 size={28} />
                                    <span>Share</span>
                                </div>
                                <div className="user-avatar-disc">
                                    <div className="disc-inner"></div>
                                </div>
                            </div>
                        </div>
                        <div className="play-hint"><Play size={40} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NomadShortsFeed;
