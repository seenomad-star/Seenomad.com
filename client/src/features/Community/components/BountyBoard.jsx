import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Clock, Zap, Target, Search } from 'lucide-react';
import './BountyBoard.css';

const BountyBoard = () => {
    const bounties = [
        {
            id: 1,
            title: "Photo of Canggu Surf Conditions",
            location: "Canggu, Bali",
            reward: "$15",
            expires: "2h",
            type: "Photography",
            difficulty: "Easy"
        },
        {
            id: 2,
            title: "Verify Coworking WiFi Speed",
            location: "Lisbon, Portugal",
            reward: "$10",
            expires: "5h",
            type: "Verified Info",
            difficulty: "Quick"
        },
        {
            id: 3,
            title: "Translate Menu at Local Cafe",
            location: "Kyoto, Japan",
            reward: "$25",
            expires: "1d",
            type: "Translation",
            difficulty: "Medium"
        }
    ];

    return (
        <div className="bounty-board-container">
            <div className="bounty-header">
                <div className="header-info">
                    <div className="live-pill">
                        <div className="dot"></div>
                        <span>42 ACTIVE BOUNTIES NEAR YOU</span>
                    </div>
                    <h1>Quest & Bounty Board</h1>
                    <p>Earn while you explore. Complete location-based nomadic tasks.</p>
                </div>
                <button className="post-bounty-btn">
                    <Zap size={18} fill="currentColor" />
                    <span>Post Bounty</span>
                </button>
            </div>

            <div className="bounty-filters">
                <div className="bounty-search">
                    <Search size={18} />
                    <input type="text" placeholder="Filter by city, task, or reward..." />
                </div>
                <div className="filter-tags">
                    <span className="f-tag active">All</span>
                    <span className="f-tag">Photography</span>
                    <span className="f-tag">Verified Info</span>
                    <span className="f-tag">Delivery</span>
                </div>
            </div>

            <div className="bounties-grid">
                {bounties.map(bounty => (
                    <motion.div 
                        key={bounty.id} 
                        className="bounty-card"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="bounty-card-top">
                            <span className="bounty-type">{bounty.type}</span>
                            <div className="bounty-reward">
                                <DollarSign size={14} />
                                <span>{bounty.reward.replace('$', '')}</span>
                            </div>
                        </div>
                        
                        <h3>{bounty.title}</h3>
                        
                        <div className="bounty-meta">
                            <div className="meta-item">
                                <MapPin size={14} />
                                <span>{bounty.location}</span>
                            </div>
                            <div className="meta-item">
                                <Clock size={14} />
                                <span>Expires in {bounty.expires}</span>
                            </div>
                        </div>

                        <div className="bounty-footer">
                            <div className="difficulty-indicator">
                                <div className="bar full"></div>
                                <div className={`bar ${bounty.difficulty === 'Easy' ? '' : 'full'}`}></div>
                                <div className={`bar ${bounty.difficulty === 'Medium' ? 'full' : ''}`}></div>
                                <span>{bounty.difficulty}</span>
                            </div>
                            <button className="accept-bounty-btn">Accept</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BountyBoard;
