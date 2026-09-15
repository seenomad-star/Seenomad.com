import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, X, Heart } from 'lucide-react';

const VibeMatch = ({ user, onClose }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="spark-match-overlay"
        >
            <motion.div 
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                className="match-modal"
            >
                <div className="match-stars">
                    {[1,2,3,4,5].map(i => (
                        <motion.div 
                            key={i}
                            animate={{ 
                                scale: [1, 1.5, 1],
                                rotate: [0, 45, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        >
                            <Sparkles className="match-sparkle" size={24} color="#F59E0B" />
                        </motion.div>
                    ))}
                </div>

                <h1 className="match-title">It's a Spark!</h1>
                <p className="match-sub">You and {user.name} have mutual travel DNA.</p>

                <div className="match-avatars">
                    <div className="match-avatar-main">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Me" />
                    </div>
                    <div className="match-heart"><Heart size={40} fill="#EF4444" color="#EF4444" strokeWidth={0} /></div>
                    <div className="match-avatar-main target">
                        <img src={user.img} alt={user.name} />
                    </div>
                </div>

                <div className="match-actions">
                    <button className="match-btn chat" onClick={onClose}>
                        <MessageSquare size={20} />
                        <span>Send an Icebreaker</span>
                    </button>
                    <button className="match-btn later" onClick={onClose}>
                        Keep Exploring
                    </button>
                </div>

                <div className="match-icebreaker">
                    <p>💡 Ask {user.name} about: <i>"{user.mission}"</i></p>
                </div>

                <button className="match-close" onClick={onClose}><X size={24} /></button>
            </motion.div>
        </motion.div>
    );
};

export default VibeMatch;
