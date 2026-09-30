import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Star, Users, ShieldCheck, Sparkles,
    CheckCircle, Plus, Globe, TrendingUp, Activity, Zap,
    Heart, Share2
} from 'lucide-react';
import { getDestinationDomainStatus, getDestinationDomainName } from '../../../../utils/destinationDomainUtils';
import CardActionBar from './CardActionBar';
import CardHorizontalActions from './CardHorizontalActions';
import CardTopMonetization from './CardTopMonetization';
import useLiveActivity from '../../../../hooks/useLiveActivity';
import useCardActions from '../../../../hooks/useCardActions';
import { UGCImage } from '../../../../components/common/Image';
import '../Destinations.css';

const DestinationCard = ({ dest, viewMode }) => {
    const isList = viewMode === 'list';
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);

    // Standardized slug generation for destination navigation
    const toSlug = (text) => (text || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const destinationSlug = toSlug(dest?.name || '');

    const handleNavigate = () => {
        if (destinationSlug) {
            navigate(`/explore/destinations/${destinationSlug}`);
        }
    };

    // Use unified actions hook
    const { state, handlers } = useCardActions(dest);

    const getAuraClass = () => {
        if (dest.trending) return 'aura-trending';
        if (dest.price && dest.price.includes('$')) {
            const priceVal = parseInt(dest.price.replace(/[^0-9]/g, ''), 10);
            if (priceVal < 1000) return 'aura-deal';
        }
        if (dest.matchScore && parseInt(dest.matchScore, 10) > 95) return 'aura-ai';
        return '';
    };

    // Generate a stable random seed based on destination name length
    const initialSeed = ((dest.name?.length || 5) * 7) % 40 + 10;
    const liveViewers = useLiveActivity(initialSeed, 5, 150);

    const aiConfidence = dest.matchScore ? parseInt(dest.matchScore, 10) : 98;

    // Curated highlights fallback
    const highlights = dest.highlights && dest.highlights.length > 0 
        ? dest.highlights 
        : ['Digital Nomad Hub', 'Fast Fiber Internet', 'Coworking Culture'];

    const domainName = getDestinationDomainName(dest);
    const domainStatus = getDestinationDomainStatus(dest);

    return (
        <motion.div
            className={`destination-card compact feature-rich ${isList ? 'list-view' : ''} ${getAuraClass()}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* VIP Monetization Layer */}
            <CardTopMonetization
                onUnlock={(e) => {
                    e?.stopPropagation();
                    handlers.shareContent(e, `Unlocked secret deals for ${dest.name}`);
                }}
                onPremium={(e) => {
                    e?.stopPropagation();
                    handlers.shareContent(e, `Viewed premium guide for ${dest.name}`);
                }}
            />

            <div className={`card-main-layout ${isList ? 'horizontal' : ''}`}>
                {/* Visual Imagery Canvas Section */}
                <div 
                    className={`card-image-container compact ${isList ? 'list-image' : ''}`}
                    onClick={handleNavigate}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleNavigate();
                        }
                    }}
                    aria-label={`View intelligence details for ${dest.name}`}
                >
                    <UGCImage
                        src={dest.image}
                        alt={dest.name}
                        className="card-image"
                        loading="lazy"
                        sizes={isList ? '280px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px'}
                    />
                    <div className="card-overlay-gradient"></div>

                    {/* Floating Vertical Quick Action HUD Dock */}
                    <CardActionBar
                        isSaved={state.isSaved}
                        onSave={(e) => {
                            e.stopPropagation();
                            handlers.toggleSave(e);
                        }}
                        onShare={(e) => {
                            e.stopPropagation();
                            handlers.shareContent(e, dest.name);
                        }}
                        onComment={(e) => {
                            e.stopPropagation();
                            handlers.shareContent(e, `Comment on ${dest.name}`);
                        }}
                        onInfo={(e) => {
                            e.stopPropagation();
                            handleNavigate();
                        }}
                        onMore={(e) => {
                            e.stopPropagation();
                            const actions = ['Add to Collection', 'Report Issue', 'Share Feed'];
                            const action = actions[Math.floor(Math.random() * actions.length)];
                            handlers.shareContent(e, action);
                        }}
                    />

                    {/* Live Telemetry Viewers Counter */}
                    <div className="live-viewer-badge compact" title={`${liveViewers} nomads exploring right now`}>
                        <span className="live-dot pulse-dot"></span>
                        <span>{liveViewers} Live</span>
                    </div>

                    {/* Trending / Deal Badge */}
                    {dest.trending && (
                        <div className="trending-corner-badge" title="Trending in the nomad community">
                            <TrendingUp size={10} />
                            <span>Trending</span>
                        </div>
                    )}

                    {/* AI Confidence Match Gauge */}
                    {!isList && (
                        <div className="ai-confidence-gauge compact">
                            <div className="gauge-track">
                                <motion.div
                                    className="gauge-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${aiConfidence}%` }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                />
                            </div>
                            <span className="gauge-value">{aiConfidence}% Match</span>
                        </div>
                    )}
                </div>

                {/* Card Content & Workstation Information */}
                <div className="card-content compact">
                    <div className="card-header-compact">
                        <div className="title-row">
                            <div className="title-domain-group">
                                {/* Destination Domain & Status Tag */}
                                <div className="card-domain-badge-wrap">
                                    <span className="card-domain-name" title={`Destination Domain: ${domainName}`}>
                                        <Globe size={10} />
                                        <span>{domainName}</span>
                                    </span>
                                    <span
                                        className={`card-domain-status-badge status-${domainStatus.toLowerCase()}`}
                                        title={`Domain Status: ${domainStatus}`}
                                    >
                                        <span className="card-domain-status-dot"></span>
                                        <span>{domainStatus}</span>
                                    </span>
                                    {dest.category && (
                                        <>
                                            <span className="meta-separator" aria-hidden="true">·</span>
                                            <span className="destination-category-label">{dest.category}</span>
                                        </>
                                    )}
                                </div>

                                {/* Destination Name */}
                                <h3 
                                    className="destination-card-title"
                                    onClick={handleNavigate}
                                    style={{ cursor: 'pointer' }}
                                    title={`Explore ${dest.name}`}
                                >
                                    {dest.name}
                                </h3>
                            </div>

                            {/* Location Signal */}
                            <div className="location-tag">
                                <MapPin size={11} className="location-icon" />
                                <span>{dest.location}</span>
                            </div>
                        </div>

                        {/* Header Action Elements */}
                        <div className="header-actions">
                            {isList && (
                                <div className="ai-match-pill" title={`${aiConfidence}% nomad compatibility match`}>
                                    <Sparkles size={10} />
                                    <span>{aiConfidence}% Match</span>
                                </div>
                            )}

                            {/* Rating */}
                            <div className="rating-pill" title={`Rating: ${dest.rating || '4.8'} based on ${dest.reviewsCount || '124'} reviews`}>
                                <Star size={10} fill="currentColor" />
                                <span>{dest.rating || '4.8'}</span>
                                <span className="review-count">({dest.reviewsCount || '124'})</span>
                            </div>

                            {/* Quick Follow Button */}
                            <button
                                type="button"
                                className={`follow-btn-mini ${isFollowed ? 'followed' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFollowed(!isFollowed);
                                }}
                                title={isFollowed ? `Unfollow ${dest.name}` : `Follow ${dest.name} for city updates`}
                                aria-label={isFollowed ? 'Following' : 'Follow'}
                            >
                                {isFollowed ? <CheckCircle size={12} /> : <Plus size={12} />}
                                <span>{isFollowed ? 'Following' : 'Follow'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Highlights / Nomad Perks */}
                    <div className="highlights-list">
                        {highlights.slice(0, isList ? 3 : 2).map((h, i) => (
                            <span key={i} className="highlight-tag">
                                <Sparkles size={10} className="highlight-sparkle" />
                                <span>{h}</span>
                            </span>
                        ))}
                    </div>

                    {/* Single Row Intelligence Telemetry Grid */}
                    <div className="intelligence-data-row">
                        <div className="data-item" title="Active Nomad Community">
                            <Users size={12} className="blue" />
                            <span className="data-val">{dest.travelers || '1.2k'}</span>
                            <span className="data-lbl">Nomads</span>
                        </div>
                        <div className="data-item" title="Schengen / Visa Approval Confidence">
                            <ShieldCheck size={12} className="green" />
                            <span className="data-val">{dest.visaApprovalRate || '98%'}</span>
                            <span className="data-lbl">Visa</span>
                        </div>
                        <div className="data-item" title="Seasonal Nomad Demand Level">
                            <Activity size={12} className="purple" />
                            <span className="data-val">High</span>
                            <span className="data-lbl">Demand</span>
                        </div>
                        <div className="data-item" title="Nomad OS Exploration XP Reward">
                            <Zap size={12} className="orange" />
                            <span className="data-val">+1.8k</span>
                            <span className="data-lbl">XP</span>
                        </div>
                    </div>

                    {/* Horizontal Interactive Dopamine & Retention Actions */}
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

                    {/* Card Footer: Living Cost, Quick Actions, & Workstation Intelligence CTA */}
                    <div className="card-footer-compact">
                        <div className="price-tag">
                            <span className="val">{dest.price || '$1,400'}</span>
                            <span className="unit">/mo est.</span>
                        </div>

                        {/* Quick-Action Buttons: Save, Share, Open Maps */}
                        <div className="footer-quick-actions" role="group" aria-label="Quick actions">
                            <button
                                type="button"
                                className={`footer-quick-btn save-btn ${state.isSaved ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlers.toggleSave(e);
                                }}
                                title={state.isSaved ? `Remove ${dest.name} from Saved` : `Save ${dest.name}`}
                                aria-label={state.isSaved ? 'Remove from Saved' : 'Save'}
                            >
                                <Heart size={14} fill={state.isSaved ? "#ef4444" : "none"} color={state.isSaved ? "#ef4444" : "currentColor"} />
                            </button>
                            <button
                                type="button"
                                className="footer-quick-btn share-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlers.shareContent(e, dest.name);
                                }}
                                title={`Share ${dest.name}`}
                                aria-label="Share"
                            >
                                <Share2 size={14} />
                            </button>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${dest.name}, ${dest.location}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-quick-btn map-btn"
                                onClick={(e) => e.stopPropagation()}
                                title={`Open ${dest.name} in Google Maps`}
                                aria-label="Open Maps"
                            >
                                <MapPin size={14} />
                            </a>
                        </div>

                        <button
                            type="button"
                            className="workstation-btn-compact"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNavigate();
                            }}
                            title={`Open complete intelligence dashboard for ${dest.name}`}
                        >
                            <span>Analyze Intelligence</span>
                            <TrendingUp size={13} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;

