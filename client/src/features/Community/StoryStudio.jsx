import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Video, Play, Share2, 
    Music, Wand2, Star,
    TrendingUp, Award, Rocket
} from 'lucide-react';

const StoryStudio = () => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="story-studio-container">
            <div className="studio-hero">
                <Rocket size={40} className="rocket-icon" />
                <h1>Story Studio</h1>
                <p>Create your "Exploration Anthem" and make your journey known by the whole world.</p>
            </div>

            <div className="studio-main">
                <div className="create-panel">
                    <h3>Draft New Anthem</h3>
                    <div className="draft-tools">
                        <div className="tool-card">
                            <Video size={24} />
                            <span>Import Clips</span>
                        </div>
                        <div className="tool-card">
                            <Music size={24} />
                            <span>Audio AI Sync</span>
                        </div>
                        <div className="tool-card">
                            <Wand2 size={24} />
                            <span>Storytelling Agent</span>
                        </div>
                    </div>
                </div>

                <div className="trending-anthems">
                    <div className="t-header">
                        <TrendingUp size={18} />
                        <h4>Trending Anthems</h4>
                    </div>
                    <div className="anthem-list">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="anthem-item">
                                <div className="a-thumb" />
                                <div className="a-info">
                                    <strong>Kyoto Serenity • Day {i}</strong>
                                    <span>2.4k Explorers Inspired</span>
                                </div>
                                <Award size={18} className="award-icon" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="demand-gen-box">
                <Star size={20} className="star-glow" />
                <div className="dg-text">
                    <h4>Empower Your Influence</h4>
                    <p>Best-selling stories earn <strong>Nomad Wallet Tokens</strong>. Become the top educator & entertainer in your city.</p>
                </div>
                <button className="go-viral-btn">Start Creating</button>
            </div>
        </div>
    );
};

export default StoryStudio;
