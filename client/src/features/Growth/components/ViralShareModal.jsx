import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Award, Map, Globe, Camera, Flame, Sparkles } from 'lucide-react';
import '../../../styles/ViralShareModal.css';

const ViralShareModal = ({ isOpen, onClose }) => {
    const scorecardRef = useRef(null);

    // Mock data for the user
    const stats = {
        name: 'Alex Explorer',
        handle: '@alexplorer',
        countries: 14,
        cities: 42,
        streak: 12,
        level: 'Global Nomad',
        topVibe: 'Adventure'
    };

    const handleShare = (platform) => {
        // In a real app, this uses html2canvas or native APIs to export
        alert(`Generating glorious high-res scorecard and sharing to ${platform}!`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className="v-modal-backdrop" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={onClose} 
                    />
                    <motion.div 
                        className="v-modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        <div className="v-modal-header">
                            <div>
                                <h2>Brag About Your Journey</h2>
                                <p>Share your Nomad Scorecard. Earn <strong>50 NMD</strong> for every new user who joins via your link.</p>
                            </div>
                            <button className="v-close" onClick={onClose}><X size={24} /></button>
                        </div>

                        {/* The Scorecard that gets "Exported" */}
                        <div className="scorecard-capture-area" ref={scorecardRef}>
                            <div className="nomad-scorecard">
                                <div className="card-ambient-glow" />
                                <div className="scorecard-top">
                                    <div className="sc-user">
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Avatar" />
                                        <div>
                                            <h3>{stats.name}</h3>
                                            <span>{stats.handle}</span>
                                        </div>
                                    </div>
                                    <div className="sc-badge">
                                        <Award size={16} /> <span>{stats.level}</span>
                                    </div>
                                </div>
                                
                                <div className="sc-metrics">
                                    <div className="sc-metric">
                                        <Globe size={24} className="icon c-blue" />
                                        <span className="val">{stats.countries}</span>
                                        <span className="lbl">Countries</span>
                                    </div>
                                    <div className="sc-metric">
                                        <Map size={24} className="icon c-green" />
                                        <span className="val">{stats.cities}</span>
                                        <span className="lbl">Cities</span>
                                    </div>
                                    <div className="sc-metric">
                                        <Flame size={24} className="icon c-orange" />
                                        <span className="val">{stats.streak}</span>
                                        <span className="lbl">Day Streak</span>
                                    </div>
                                </div>

                                <div className="sc-footer">
                                    <div className="brand">
                                        <Sparkles size={16} className="brand-icon" /> SEENOMAD
                                    </div>
                                    <div className="join-link">seenomad.com/join/alex</div>
                                </div>
                            </div>
                        </div>

                        <div className="share-actions">
                            <button className="share-btn x-btn" onClick={() => handleShare('X')}>
                                𝕏 Share to X
                            </button>
                            <button className="share-btn ig-btn" onClick={() => handleShare('Instagram')}>
                                <Camera size={18} /> Add to IG Story
                            </button>
                            <button className="share-btn link-btn" onClick={() => handleShare('Link')}>
                                <Share2 size={18} /> Copy Link
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ViralShareModal;
