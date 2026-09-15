import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    TrendingUp,
    Users,
    Star,
    DollarSign,
    Play,
    MessageCircle,
    Globe,
    Award,
    ShieldCheck,
    ChevronRight,
    MapPin,
    HandMetal,
    ThumbsUp
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';

const Profiles = () => {
    const { following, toggleFollow, mates, toggleMate, endorseSkill } = useNomadOSStore();
    const [creators, setCreators] = useState([
        {
            id: 1,
            name: "Elena Rodriguez",
            handle: "@elena_nomad",
            avatar: "ER",
            tier: "Elite Nomad",
            influenceScore: 98,
            followers: "1.2M",
            isVerified: true,
            bio: "Full-time explorer of hidden gems. 🌍 50+ countries and counting. Helping you travel smarter, not harder.",
            earnings: "$12.4k this month",
            trustScore: 99,
            badges: ["Top Guide", "Eco-Traveler", "Community Choice"],
            itineraries: 45,
            isFollowing: true
        },
        {
            id: 2,
            name: "Marco Chen",
            handle: "@marco_travels",
            avatar: "MC",
            tier: "Pro Creator",
            influenceScore: 85,
            followers: "450K",
            isVerified: true,
            bio: "Street food lover & budget travel expert. 🍜 Finding the best eats in every corner of the world.",
            earnings: "$5.2k this month",
            trustScore: 96,
            badges: ["Foodie Expert", "Budget King"],
            itineraries: 28,
            isFollowing: false
        }
    ]);

    return (
        <div className="profiles-module">
            {/* Search & Filter Header */}
            <div className="profiles-header">
                <div className="header-text">
                    <h2>Creator Universe</h2>
                    <p>Connect with the world's most influential travelers.</p>
                </div>
                <div className="influence-leaderboard-btn">
                    <TrendingUp size={18} />
                    <span>View Influence Leaderboard</span>
                </div>
            </div>

            {/* Creators Grid */}
            <div className="creators-grid-detailed">
                {creators.map(creator => (
                    <div key={creator.id} className="creator-detailed-card">
                        <div className="card-top-banner">
                            <div className="influence-badge">
                                <Star size={12} fill="currentColor" />
                                <span>{creator.influenceScore} Influence</span>
                            </div>
                            <div className="tier-tag">{creator.tier}</div>
                        </div>

                        <div className="card-main-content">
                            <div className="profile-header-row">
                                <div className="profile-avatar-large">{creator.avatar}</div>
                                <div className="profile-actions-top">
                                    <button 
                                        className={`follow-btn-main ${following.includes(creator.handle) ? 'following' : ''}`}
                                        onClick={() => toggleFollow(creator.handle)}
                                    >
                                        {following.includes(creator.handle) ? 'Following' : 'Follow'}
                                    </button>
                                    <button 
                                        className={`mate-btn ${mates.includes(creator.handle) ? 'is-mate' : ''}`}
                                        onClick={() => toggleMate(creator.handle)}
                                        title={mates.includes(creator.handle) ? "You are Mates" : "Add as Mate"}
                                    >
                                        {mates.includes(creator.handle) ? <Users size={18} fill="currentColor" /> : <Users size={18} />}
                                    </button>
                                    <button className="tip-btn" onClick={() => endorseSkill("Travel Expertise")}>
                                        <HandMetal size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="profile-identity">
                                <div className="name-verified">
                                    <h3>{creator.name}</h3>
                                    {creator.isVerified && <CheckCircle2 size={18} className="verified-icon" />}
                                </div>
                                <span className="handle">{creator.handle}</span>
                            </div>

                            <p className="profile-bio">{creator.bio}</p>

                            <div className="profile-stats-row">
                                <div className="stat-box">
                                    <span className="stat-val">{creator.followers}</span>
                                    <span className="stat-lbl">Followers</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-val">{creator.itineraries}</span>
                                    <span className="stat-lbl">Guides</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-val">{creator.trustScore}%</span>
                                    <span className="stat-lbl">Trust</span>
                                </div>
                            </div>

                            <div className="creator-badges">
                                {creator.badges.map(badge => (
                                    <span key={badge} className="badge-tag">
                                        <Award size={12} />
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <div className="ai-highlight-reel">
                                <div className="reel-header">
                                    <Sparkles size={14} />
                                    <span>AI HIGHLIGHT REEL</span>
                                </div>
                                <div className="reel-preview-box">
                                    <Play size={24} fill="white" />
                                    <div className="reel-info-overlay">
                                        <span>Best of {creator.name.split(' ')[0]}'s 2025 Travels</span>
                                    </div>
                                </div>
                            </div>

                            <div className="monetization-grid">
                                <button className="monetize-btn subscribe">
                                    <div className="btn-content">
                                        <span className="btn-title">Subscribe</span>
                                        <span className="btn-price">$4.99/mo</span>
                                    </div>
                                    <ChevronRight size={16} />
                                </button>
                                <button className="monetize-btn store">
                                    <div className="btn-content">
                                        <span className="btn-title">Storefront</span>
                                        <span className="btn-desc">Guides & PDFs</span>
                                    </div>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Growth Hook */}
            <div className="creator-growth-banner">
                <div className="growth-content">
                    <div className="growth-icon">
                        <TrendingUp size={32} />
                    </div>
                    <div className="growth-text">
                        <h3>Become a Seenomad Creator</h3>
                        <p>Share your travels, build your influence, and start earning today.</p>
                    </div>
                </div>
                <button className="apply-creator-btn">Apply Now</button>
            </div>
        </div>
    );
};

// Helper for AI icon
const Sparkles = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
);

export default Profiles;
