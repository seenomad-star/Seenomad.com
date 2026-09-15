import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Heart, MessageCircle, Repeat, Share, 
    MoreHorizontal, CheckCircle, TrendingUp, Zap
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const PulseFeed = () => {
    const { addXP } = useNomadOSStore();
    const [pulses, setPulses] = useState([
        {
            id: 1,
            user: "Alex Rivera",
            handle: "@alex_nomad",
            content: "Just landed in Tbilisi! 🇬🇪 The energy here is incredible. Who's around for a khachapuri meet tonight? #tbilisi #digitalnomad",
            time: "12m",
            likes: 42,
            isLiked: false,
            retweets: 8,
            replies: 15,
            isVerified: true
        },
        {
            id: 2,
            user: "Sarah Chen",
            handle: "@sarah.travels",
            content: "Bali's new nomad visa is a game changer. Super smooth application process at Ngurah Rai. If you need help with the E-VOA, let me know! 🌴✨",
            time: "1h",
            likes: 156,
            isLiked: true,
            retweets: 45,
            replies: 28,
            isVerified: true
        },
        {
            id: 3,
            user: "Marco Polo",
            handle: "@explorer_marco",
            content: "Pro tip: The Wi-Fi at 'The Hub' in Lisbon is currently 300Mbps. Best spot for high-bandwidth work this week. 📡💻",
            time: "3h",
            likes: 89,
            isLiked: false,
            retweets: 12,
            replies: 4,
            isVerified: false
        }
    ]);

    const handleLike = (id) => {
        setPulses(pulses.map(p => {
            if (p.id === id) {
                const newLiked = !p.isLiked;
                if (newLiked) addXP(5);
                return { ...p, isLiked: newLiked, likes: newLiked ? p.likes + 1 : p.likes - 1 };
            }
            return p;
        }));
    };

    return (
        <div className="pulse-feed">
            <div className="bt-header">
                <div>
                    <h3 className="ach-section-title">Nomad Pulse</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Live updates and trending travel thoughts</p>
                </div>
                <div className="pulse-trending-badges">
                    <span className="job-tag">#Bali</span>
                    <span className="job-tag">#RemoteJobs</span>
                </div>
            </div>

            <div className="pulse-items">
                {pulses.map(pulse => (
                    <motion.div 
                        key={pulse.id} 
                        className="pulse-item"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="pulse-avatar" style={{ background: `hsl(${pulse.id * 100}, 40%, 40%)` }}>
                            <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontWeight: 800 }}>
                                {pulse.user.substring(0, 1)}
                            </div>
                        </div>
                        <div className="pulse-content">
                            <div className="pulse-user-meta">
                                <span className="pulse-name">{pulse.user}</span>
                                {pulse.isVerified && <CheckCircle size={14} fill="#8B5CF6" color="white" />}
                                <span className="pulse-handle">{pulse.handle}</span>
                                <span className="pulse-dot">·</span>
                                <span className="pulse-time">{pulse.time}</span>
                            </div>
                            <p className="pulse-text">{pulse.content}</p>
                            
                            <div className="pulse-actions">
                                <button className="pulse-action">
                                    <MessageCircle size={18} />
                                    <span>{pulse.replies}</span>
                                </button>
                                <button className="pulse-action">
                                    <Repeat size={18} />
                                    <span>{pulse.retweets}</span>
                                </button>
                                <button 
                                    className={`pulse-action ${pulse.isLiked ? 'like active' : ''}`}
                                    onClick={() => handleLike(pulse.id)}
                                >
                                    <Heart size={18} fill={pulse.isLiked ? "currentColor" : "none"} />
                                    <span>{pulse.likes}</span>
                                </button>
                                <button className="pulse-action">
                                    <Share size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <button className="create-post-btn" style={{ position: 'fixed', bottom: '100px', right: '40px', boxShadow: '0 8px 32px rgba(139,92,246,0.4)', width: 'auto', padding: '1rem 1.5rem', borderRadius: '50px' }}>
                <Zap size={20} fill="currentColor" />
                <span>Post Pulse</span>
            </button>
        </div>
    );
};

export default PulseFeed;
