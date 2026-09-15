import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Heart, MessageCircle, Share2, Music, 
    MoreVertical, UserPlus, Zap, ShoppingBag, DollarSign
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const ShortsViewer = ({ isOpen, onClose }) => {
    const { credits, spendCredits, addXP } = useNomadOSStore();
    const [activeIndex, setActiveIndex] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleTip = () => {
        if (credits < 10) {
            window.dispatchEvent(new CustomEvent('add-toast', { 
                detail: { message: 'Need 10 NC to tip! 💎', type: 'error' } 
            }));
            return;
        }
        spendCredits(10, "Creator Tip (Shorts)");
        addXP(50);
        window.dispatchEvent(new CustomEvent('add-toast', { 
            detail: { message: 'Tipped 10 NC to Creator! 💝 +50 XP', type: 'success' } 
        }));
    };

    const shorts = [
        {
            id: 1,
            user: "@bali_bree",
            avatar: "BB",
            description: "Morning coffee in Ubud hitting different today ☕️🌴 #bali #digitalnomad",
            music: "Lofi Cafe - Nomad Beats",
            likes: "12.4K",
            comments: "842",
            isShoppable: true,
            product: "Nomad Carry-on V2"
        },
        {
            id: 2,
            user: "@tech_nomad",
            avatar: "TN",
            description: "How I set up my workspace in Lisbon 🇵🇹💻",
            music: "Lisbon Nights - Fado Remix",
            likes: "8.2K",
            comments: "156",
            isShoppable: false
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="smt-modal-overlay shorts-overlay" onClick={onClose}>
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="shorts-viewport"
                    onClick={e => e.stopPropagation()}
                >
                    <button className="shorts-close-btn" onClick={onClose}><X size={24} /></button>

                    <div className="short-video-container">
                        {/* Mock Video Placeholder */}
                        <div className="mock-video-bg">
                            <div className="video-gradient-overlay"></div>
                        </div>

                        <div className="short-ui-overlay">
                            <div className="short-actions-sidebar">
                                <div className="action-item">
                                    <div className="creator-avatar-ring">
                                        <div className="creator-initials">{shorts[activeIndex].avatar}</div>
                                        <button className="follow-plus"><UserPlus size={10} /></button>
                                    </div>
                                </div>
                                <button className={`action-item ${liked ? 'active' : ''}`} onClick={() => setLiked(!liked)}>
                                    <Heart size={28} fill={liked ? "#ef4444" : "none"} stroke={liked ? "#ef4444" : "white"} />
                                    <span>{shorts[activeIndex].likes}</span>
                                </button>
                                <button className="action-item">
                                    <MessageCircle size={28} color="white" />
                                    <span>{shorts[activeIndex].comments}</span>
                                </button>
                                <button className="action-item" onClick={handleTip}>
                                    <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '8px', borderRadius: '50%' }}>
                                        <DollarSign size={24} color="#F59E0B" />
                                    </div>
                                    <span>Tip 10NC</span>
                                </button>
                                <button className="action-item">
                                    <Share2 size={28} color="white" />
                                    <span>Share</span>
                                </button>
                                <button className="action-item">
                                    <MoreVertical size={28} color="white" />
                                </button>
                            </div>

                            <div className="short-info-bottom">
                                <h3 className="short-username">{shorts[activeIndex].user}</h3>
                                <p className="short-caption">{shorts[activeIndex].description}</p>
                                
                                {shorts[activeIndex].isShoppable && (
                                    <div className="shoppable-tag">
                                        <ShoppingBag size={14} />
                                        <span>Shop: {shorts[activeIndex].product}</span>
                                    </div>
                                )}

                                <div className="short-music-scroller">
                                    <Music size={14} />
                                    <div className="music-text-track">
                                        <span>{shorts[activeIndex].music} • {shorts[activeIndex].music}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="short-progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ShortsViewer;
