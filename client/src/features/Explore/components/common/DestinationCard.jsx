import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Star, Users, ShieldCheck, Sparkles, Calendar,
    Heart, Share2, MessageCircle, MoreVertical, Bookmark, TrendingUp,
    Eye, Zap, Activity, Info, CheckCircle, Plus
} from 'lucide-react';
import CardActionBar from './CardActionBar';
import CardHorizontalActions from './CardHorizontalActions';
import CardTopMonetization from './CardTopMonetization';
import useLiveActivity from '../../../../hooks/useLiveActivity';
import useCardActions from '../../../../hooks/useCardActions';
import '../Destinations.css';

const DestinationCard = ({ dest, viewMode }) => {
    const isList = viewMode === 'list';
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);

    // Use the new actions hook
    const { state, handlers } = useCardActions({
        isSaved: false,
        isLiked: false
    });

    const getAuraClass = () => {
        if (dest.trending) return 'aura-trending';
        if (dest.price && dest.price.includes('$')) {
            const priceVal = parseInt(dest.price.replace(/[^0-9]/g, ''));
            if (priceVal < 1000) return 'aura-deal';
        }
        if (dest.matchScore && parseInt(dest.matchScore) > 95) return 'aura-ai';
        return '';
    };

    // Generate a stable random seed based on destination name length
    const initialSeed = (dest.name.length * 7) % 40 + 10;
    const liveViewers = useLiveActivity(initialSeed, 5, 150);

    const aiConfidence = dest.matchScore ? parseInt(dest.matchScore) : 98;

    // Mock highlights if not provided
    const highlights = dest.highlights || ['Digital Nomad Hub', 'Luxury Resorts', 'Fast Internet'];

    return (
        <motion.div
            className={`destination-card compact feature-rich ${isList ? 'list-view' : ''} ${getAuraClass()}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            {/* Monetization Layer */}
            <CardTopMonetization />

            <div className={`card-main-layout ${isList ? 'horizontal' : ''}`}>
                {/* Compact Image Section */}
                <div className={`card-image-container compact ${isList ? 'list-image' : ''}`}>
                    <img src={dest.image} alt={dest.name} className="card-image" />
                    <div className="card-overlay-gradient"></div>

                    {/* Vertical Action Bar */}
                    <CardActionBar
                        isSaved={state.isSaved}
                        onSave={handlers.toggleSave}
                        onShare={(e) => handlers.shareContent(e, dest.name)}
                        onComment={(e) => {
                            e.stopPropagation();
                            handlers.shareContent(e, `Comment on ${dest.name}`);
                        }}
                        onInfo={(e) => {
                            e.stopPropagation();
                            navigate(`/explore/destinations/${dest.name.toLowerCase().replace(/ /g, '-')}`);
                        }}
                        onMore={(e) => {
                            e.stopPropagation();
                            const actions = ['Add to Collection', 'Report Issue', 'Not Interested'];
                            const action = actions[Math.floor(Math.random() * actions.length)];
                            handlers.shareContent(e, action);
                        }}
                    />

                    <div className="live-pulse-badge compact">
                        <span className="pulse-dot"></span>
                        <span>{liveViewers} Live</span>
                    </div>

                    {!isList && (
                        <div className="ai-confidence-gauge compact">
                            <div className="gauge-track">
                                <motion.div
                                    className="gauge-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${aiConfidence}%` }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                />
                            </div>
                            <span className="gauge-value">{aiConfidence}% Match</span>
                        </div>
                    )}
                </div>

                {/* Compact Workstation Content */}
                <div className="card-content compact">
                    <div className="card-header-compact">
                        <div className="title-row">
                            <h3>{dest.name}</h3>
                            <div className="location-tag">
                                <MapPin size={10} />
                                <span>{dest.location}</span>
                            </div>
                        </div>
                        <div className="header-actions">
                            {isList && (
                                <div className="ai-match-pill">
                                    <Sparkles size={10} />
                                    <span>{aiConfidence}% Match</span>
                                </div>
                            )}
                            <button
                                className={`follow-btn-mini ${isFollowed ? 'followed' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFollowed(!isFollowed);
                                }}
                            >
                                {isFollowed ? <CheckCircle size={12} /> : <Plus size={12} />}
                                <span>{isFollowed ? 'Following' : 'Follow'}</span>
                            </button>
                            <div className="rating-pill">
                                <Star size={10} fill="currentColor" />
                                <span>{dest.rating || '4.8'}</span>
                                <span className="review-count">({dest.reviewsCount || '124'})</span>
                            </div>
                        </div>
                    </div>

                    {/* Highlights / Perks List - Limited to 2 for height */}
                    <div className="highlights-list">
                        {highlights.slice(0, isList ? 3 : 2).map((h, i) => (
                            <span key={i} className="highlight-tag">
                                <Sparkles size={10} />
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* Single Row Data Grid */}
                    <div className="intelligence-data-row">
                        <div className="data-item" title="Travelers">
                            <Users size={12} className="blue" />
                            <span>{dest.travelers || '1.2k'}</span>
                        </div>
                        <div className="data-item" title="Visa Success">
                            <ShieldCheck size={12} className="green" />
                            <span>{dest.visaApprovalRate || '98%'}</span>
                        </div>
                        <div className="data-item" title="Demand">
                            <Activity size={12} className="purple" />
                            <span>High</span>
                        </div>
                        <div className="data-item" title="XP Reward">
                            <Zap size={12} className="orange" />
                            <span>+1.8k</span>
                        </div>
                    </div>

                    {/* Horizontal Actions - Dopamine & Retention */}
                    <CardHorizontalActions
                        xpClaimed={state.xpClaimed}
                        hasAlert={state.hasAlert}
                        inBucketList={state.inBucketList}
                        hasSpun={state.hasSpun}
                        onClaimXP={handlers.claimXP}
                        onAlert={handlers.toggleAlert}
                        onAdd={handlers.addToBucketList}
                        onSpin={handlers.spinAndWin}
                    />

                    {/* Footer Actions - Compact */}
                    <div className="card-footer-compact">
                        <div className="price-tag">
                            <span className="val">{dest.price}</span>
                        </div>
                        <button
                            className="workstation-btn-compact"
                            onClick={() => navigate(`/explore/destinations/${dest.name.toLowerCase().replace(/ /g, '-')}`)}
                        >
                            <span>Analyze Intelligence</span>
                            <TrendingUp size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
