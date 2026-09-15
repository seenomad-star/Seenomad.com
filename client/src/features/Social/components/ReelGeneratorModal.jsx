import React, { useState, useEffect } from 'react';
import { Film, Sparkles, Share2, Download, Play, CheckCircle } from 'lucide-react';
import '../../styles/ReelGeneratorModal.css';

const ReelGeneratorModal = ({ isOpen, onClose, itineraryName = "Bali Adventure" }) => {
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [complete, setComplete] = useState(false);

    const handleGenerate = () => {
        setGenerating(true);
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setGenerating(false);
                setComplete(true);
            }
        }, 150);
    };

    if (!isOpen) return null;

    return (
        <div className="reel-modal-overlay">
            <div className="reel-modal-container">
                <div className="rm-header">
                    <div className="rm-title">
                        <Film size={20} color="#A855F7" />
                        <h3>AI Reel Architect™</h3>
                    </div>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="rm-body">
                    {!complete ? (
                        <>
                            <div className="reel-preview-frame">
                                <div className="preview-overlay">
                                    <Sparkles size={32} className="ai-star" />
                                    <p>{generating ? 'AI is stitching your memories...' : 'Ready to turn your trip into a viral reel?'}</p>
                                </div>
                                <div className="itinerary-tag">{itineraryName}</div>
                            </div>
                            
                            {generating && (
                                <div className="rm-progress-section">
                                    <div className="rm-progress-bar">
                                        <div className="rm-progress-fill" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <span>{progress}% Optimized for Reels & TikTok</span>
                                </div>
                            )}

                            {!generating && (
                                <div className="rm-options">
                                    <div className="rm-option active">High Energy (Fast Cuts)</div>
                                    <div className="rm-option">Cinematic (Slow Pan)</div>
                                    <div className="rm-option">Vlog Style (Voiceover)</div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rm-success-state">
                            <CheckCircle size={60} color="#10B981" />
                            <h3>Reel Engineered!</h3>
                            <p>Your 15-second 4K montage is ready for the world.</p>
                            <div className="success-actions">
                                <button className="share-btn"><Share2 size={16} /> Share to Instagram</button>
                                <button className="dl-btn"><Download size={16} /> Download 4K</button>
                            </div>
                        </div>
                    )}
                </div>

                {!complete && (
                    <div className="rm-footer">
                        <button 
                            className={`generate-btn ${generating ? 'disabled' : ''}`} 
                            onClick={handleGenerate}
                            disabled={generating}
                        >
                            {generating ? 'Architecting...' : 'Generate AI Reel'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReelGeneratorModal;
