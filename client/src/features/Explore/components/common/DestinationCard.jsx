import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Star, Users, ShieldCheck, Sparkles,
    CheckCircle, Plus, Globe, TrendingUp, Activity, Zap,
    Heart, Share2, ArrowRight, SlidersHorizontal, ArrowLeftRight
} from 'lucide-react';
import { getDestinationDomainStatus, getDestinationDomainName } from '../../../../utils/destinationDomainUtils';
import { useDestinationStore } from '../../../../store/destinationFilterStore';
import { useToastStore } from '../../../../store/toastStore';
import { useItineraryStore } from '../../../../store/itineraryStore';
import CardActionBar from './CardActionBar';
import CardHorizontalActions from './CardHorizontalActions';
import CardTopMonetization from './CardTopMonetization';
import DestinationIntelligenceDrawer from './DestinationIntelligenceDrawer';
import DestinationShareDialog from './DestinationShareDialog';
import useLiveActivity from '../../../../hooks/useLiveActivity';
import useCardActions from '../../../../hooks/useCardActions';
import { UGCImage } from '../../../../components/common/Image';
import '../Destinations.css';

const DestinationCard = ({ dest, viewMode }) => {
    const isList = viewMode === 'list';
    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const { compareDestinations, toggleCompareDestination, setIsCompareModalOpen } = useDestinationStore();
    const { addToast } = useToastStore();
    const { addDestinationToDay } = useItineraryStore();
    const isCompared = compareDestinations.includes(dest?.id);

    // Standardized slug generation for destination navigation
    const toSlug = (text) => (text || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const destinationSlug = toSlug(dest?.name || '');

    const handleNavigate = () => {
        if (destinationSlug) {
            navigate(`/explore/destinations/${destinationSlug}`);
        }
    };

    // Unified interactive actions hook
    const { state, handlers } = useCardActions(dest);

    const getAuraClass = () => {
        if (dest?.trending) return 'aura-trending';
        if (dest?.price && dest.price.includes('$')) {
            const priceVal = parseInt(dest.price.replace(/[^0-9]/g, ''), 10);
            if (priceVal < 1000) return 'aura-deal';
        }
        if (dest?.matchScore && parseInt(dest.matchScore, 10) > 95) return 'aura-ai';
        return '';
    };

    // Stable random seed based on destination name
    const initialSeed = ((dest?.name?.length || 5) * 7) % 40 + 10;
    const liveViewers = useLiveActivity(initialSeed, 5, 150);

    const aiConfidence = dest?.matchScore ? parseInt(dest.matchScore, 10) : 96;

    // Curated nomad perks fallback
    const highlights = dest?.highlights && dest.highlights.length > 0 
        ? dest.highlights 
        : ['Digital Nomad Hub', 'Fast Fiber Internet', 'Coworking Culture'];

    const domainName = getDestinationDomainName(dest);
    const domainStatus = getDestinationDomainStatus(dest);

    // Unique identifier for accessibility IDs
    const destKey = dest?.id || destinationSlug || 'dest';

    // Google Maps Search URL
    const mapsQuery = encodeURIComponent(`${dest?.name || ''}, ${dest?.location || ''}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    return (
        <>
            <motion.article
                className={`destination-card redesigned-card ${isList ? 'list-view' : 'grid-view'} ${getAuraClass()}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* 1. VIP Monetization Layer (Top Nomad Perks Strip) */}
                <CardTopMonetization
                    onUnlock={(e) => {
                        e?.stopPropagation();
                        handlers.shareContent(e, `Unlocked secret nomad deals for ${dest?.name}`);
                    }}
                    onPremium={(e) => {
                        e?.stopPropagation();
                        handlers.shareContent(e, `Viewed premium nomad guide for ${dest?.name}`);
                    }}
                />

                <div className={`card-core-structure ${isList ? 'horizontal' : 'vertical'}`}>
                    {/* 2. Hero Visual Canvas (Photography & HUD Overlays) */}
                    <div 
                        className={`card-media-canvas ${isList ? 'list-canvas' : ''}`}
                        onClick={handleNavigate}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleNavigate();
                            }
                        }}
                        aria-label={`Explore intelligence for ${dest?.name}`}
                    >
                        <UGCImage
                            src={dest?.image}
                            alt={dest?.name}
                            className="card-hero-image"
                            loading="lazy"
                            sizes={isList ? '280px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px'}
                        />
                        
                        {/* Gradient scrim for maximum contrast & legibility */}
                        <div className="card-media-scrim" aria-hidden="true" />

                        {/* Top Row Overlays: Live Activity & Trending Badges */}
                        <div className="media-overlay-top-left">
                            <div className="live-status-pill" title={`${liveViewers} nomads exploring right now`}>
                                <span className="live-pulse-dot" />
                                <span>{liveViewers} Live</span>
                            </div>

                            {dest?.trending && (
                                <div className="trending-status-pill" title="Trending destination this week">
                                    <TrendingUp size={11} />
                                    <span>Trending</span>
                                </div>
                            )}
                        </div>

                        {/* Top Right: Floating Glass HUD Action Dock */}
                        <CardActionBar
                            isSaved={state.isSaved}
                            onSave={(e) => {
                                e.stopPropagation();
                                handlers.toggleSave(e);
                            }}
                            onShare={(e) => {
                                e.stopPropagation();
                                setIsShareOpen(true);
                            }}
                            onComment={(e) => {
                                e.stopPropagation();
                                handlers.shareContent(e, `Discussion for ${dest?.name}`);
                            }}
                            onInfo={(e) => {
                                e.stopPropagation();
                                setIsDrawerOpen(true);
                            }}
                            onMore={(e) => {
                                e.stopPropagation();
                                const options = ['Save to Collection', 'Download City Guide', 'Share to Feed'];
                                const chosen = options[Math.floor(Math.random() * options.length)];
                                handlers.shareContent(e, chosen);
                            }}
                        />

                        {/* Bottom Row Overlays: AI Match Intelligence & Web3 Domain Badge */}
                        <div className="media-overlay-bottom-bar">
                            <div className="ai-match-gauge" title={`${aiConfidence}% nomad compatibility match`}>
                                <div className="ai-gauge-track">
                                    <motion.div
                                        className="ai-gauge-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${aiConfidence}%` }}
                                        transition={{ duration: 0.7, delay: 0.2 }}
                                    />
                                </div>
                                <span className="ai-gauge-text">{aiConfidence}% Match</span>
                            </div>

                            <div 
                                className="web3-domain-pill" 
                                title={`Decentralized City Domain: ${domainName} (${domainStatus})`}
                            >
                                <Globe size={11} className="domain-globe-icon" />
                                <span className="domain-text">{domainName}</span>
                                <span className={`domain-status-dot dot-${domainStatus.toLowerCase()}`} />
                                <span className="domain-status-label">{domainStatus}</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Card Body Information Architecture */}
                    <div className="card-body-container">
                        {/* Header: Destination Name, Location & Quick Follow/Rating */}
                        <div className="card-header-block">
                            <div className="header-title-meta">
                                <h3 
                                    className="destination-name"
                                    onClick={handleNavigate}
                                    title={`Open ${dest?.name} details`}
                                >
                                    {dest?.name}
                                </h3>

                                <div className="destination-location-row">
                                    <div className="location-item">
                                        <MapPin size={12} className="location-pin-icon" />
                                        <span>{dest?.location}</span>
                                    </div>
                                    {(dest?.delhiCategory || dest?.category) && (
                                        <>
                                            <span className="meta-bullet" aria-hidden="true">·</span>
                                            <span className={`category-pill cat-badge-${(dest?.delhiCategory || dest?.category || '').toLowerCase()}`}>
                                                {dest.delhiCategory || dest.category}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {dest?.district && (
                                    <div className="up-card-badges-strip" onClick={(e) => e.stopPropagation()}>
                                        <span className="up-card-district-chip" title={`${dest.district} District, ${dest.division || ''} Division, ${dest.state || ''}`}>
                                            <MapPin size={10} className="up-chip-pin text-amber-400" />
                                            <strong>{dest.district} District</strong>
                                        </span>
                                        {dest?.category && (dest?.isMadhyaPradesh || dest?.location?.toLowerCase().includes('madhya pradesh')) && (
                                            <span
                                                className="up-card-circuit-chip mp-category-chip"
                                                style={{
                                                    background: dest.category === 'Wildlife'
                                                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(217, 119, 6, 0.28))'
                                                        : dest.category === 'Historical'
                                                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(37, 99, 235, 0.28))'
                                                        : dest.category === 'Spiritual'
                                                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.22), rgba(147, 51, 234, 0.28))'
                                                        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.22), rgba(5, 150, 105, 0.28))',
                                                    borderColor: dest.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.45)' : dest.category === 'Historical' ? 'rgba(59, 130, 246, 0.45)' : dest.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.45)' : 'rgba(52, 211, 153, 0.45)',
                                                    color: dest.category === 'Wildlife' ? '#fcd34d' : dest.category === 'Historical' ? '#93c5fd' : dest.category === 'Spiritual' ? '#d8b4fe' : '#6ee7b7'
                                                }}
                                                title={`Category: ${dest.category === 'Spiritual' ? 'Pilgrimage' : dest.category}`}
                                            >
                                                {dest.category === 'Wildlife' ? '🐾 Wildlife' : dest.category === 'Historical' ? '🏛️ Historical' : dest.category === 'Spiritual' ? '🕉️ Pilgrimage' : `✨ ${dest.category}`}
                                            </span>
                                        )}
                                        {dest?.category && (dest?.isMaharashtra || dest?.location?.toLowerCase().includes('maharashtra')) && (
                                            <span
                                                className="up-card-circuit-chip mh-category-chip"
                                                style={{
                                                    background: dest.category === 'Wildlife'
                                                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.32))'
                                                        : dest.category === 'Historical'
                                                        ? 'linear-gradient(135deg, rgba(234, 88, 12, 0.25), rgba(194, 65, 12, 0.32))'
                                                        : dest.category === 'Spiritual'
                                                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(147, 51, 234, 0.32))'
                                                        : dest.category === 'Beach'
                                                        ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(2, 132, 199, 0.32))'
                                                        : dest.category === 'Nature'
                                                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.32))'
                                                        : 'linear-gradient(135deg, rgba(249, 115, 22, 0.25), rgba(234, 88, 12, 0.32))',
                                                    borderColor: dest.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.45)' : dest.category === 'Historical' ? 'rgba(234, 88, 12, 0.5)' : dest.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.5)' : dest.category === 'Beach' ? 'rgba(14, 165, 233, 0.5)' : dest.category === 'Nature' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(249, 115, 22, 0.5)',
                                                    color: dest.category === 'Wildlife' ? '#fcd34d' : dest.category === 'Historical' ? '#fdba74' : dest.category === 'Spiritual' ? '#d8b4fe' : dest.category === 'Beach' ? '#7dd3fc' : dest.category === 'Nature' ? '#6ee7b7' : '#fed7aa'
                                                }}
                                                title={`Category: ${dest.category === 'Spiritual' ? 'Pilgrimage' : dest.category}`}
                                            >
                                                {dest.category === 'Wildlife' ? '🐾 Wildlife' : dest.category === 'Historical' ? '🚩 Forts & Heritage' : dest.category === 'Spiritual' ? '🕉️ Pilgrimage' : dest.category === 'Beach' ? '🏖️ Konkan Beach' : dest.category === 'Nature' ? '⛰️ Western Ghats' : `✨ ${dest.category}`}
                                            </span>
                                        )}
                                        {dest?.mhCircuit && (
                                            <span
                                                className="up-card-circuit-chip mh-circuit-chip"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.22), rgba(194, 65, 12, 0.28))',
                                                    borderColor: 'rgba(249, 115, 22, 0.45)',
                                                    color: '#fdba74'
                                                }}
                                                title={`MH Tourism Circuit: ${dest.mhCircuit}`}
                                            >
                                                🚩 {dest.mhCircuit}
                                            </span>
                                        )}
                                        {dest?.category && (dest?.isRajasthan || dest?.location?.toLowerCase().includes('rajasthan')) && (
                                            <span
                                                className="up-card-circuit-chip rj-category-chip"
                                                style={{
                                                    background: dest.category === 'Wildlife'
                                                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.32))'
                                                        : dest.category === 'Historical'
                                                        ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.25), rgba(180, 83, 9, 0.32))'
                                                        : dest.category === 'Desert'
                                                        ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(202, 138, 4, 0.32))'
                                                        : dest.category === 'Spiritual'
                                                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(147, 51, 234, 0.32))'
                                                        : dest.category === 'Nature'
                                                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.32))'
                                                        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.32))',
                                                    borderColor: dest.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.45)' : dest.category === 'Historical' ? 'rgba(217, 119, 6, 0.5)' : dest.category === 'Desert' ? 'rgba(234, 179, 8, 0.5)' : dest.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.5)' : dest.category === 'Nature' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)',
                                                    color: dest.category === 'Wildlife' ? '#fcd34d' : dest.category === 'Historical' ? '#fde68a' : dest.category === 'Desert' ? '#fef08a' : dest.category === 'Spiritual' ? '#d8b4fe' : dest.category === 'Nature' ? '#6ee7b7' : '#fcd34d'
                                                }}
                                                title={`Category: ${dest.category === 'Spiritual' ? 'Pilgrimage' : dest.category}`}
                                            >
                                                {dest.category === 'Wildlife' ? '🐾 Wildlife' : dest.category === 'Historical' ? '🏰 Forts & Palaces' : dest.category === 'Desert' ? '🐪 Thar Desert' : dest.category === 'Spiritual' ? '🕉️ Pilgrimage' : dest.category === 'Nature' ? '⛰️ Lakes & Hills' : `✨ ${dest.category}`}
                                            </span>
                                        )}
                                        {dest?.rjCircuit && (
                                            <span
                                                className="up-card-circuit-chip rj-circuit-chip"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.22), rgba(180, 83, 9, 0.28))',
                                                    borderColor: 'rgba(245, 158, 11, 0.45)',
                                                    color: '#fcd34d'
                                                }}
                                                title={`RJ Tourism Circuit: ${dest.rjCircuit}`}
                                            >
                                                🐪 {dest.rjCircuit}
                                            </span>
                                        )}
                                        {dest?.category && (dest?.isChhattisgarh || dest?.location?.toLowerCase().includes('chhattisgarh')) && (
                                            <span
                                                className="up-card-circuit-chip cg-category-chip"
                                                style={{
                                                    background: dest.category === 'Waterfalls'
                                                        ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(14, 165, 233, 0.32))'
                                                        : dest.category === 'Wildlife'
                                                        ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.32))'
                                                        : dest.category === 'Historical'
                                                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(37, 99, 235, 0.32))'
                                                        : dest.category === 'Spiritual'
                                                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(147, 51, 234, 0.32))'
                                                        : dest.category === 'Tribal & Culture' || dest.category === 'Culture'
                                                        ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.25), rgba(180, 83, 9, 0.32))'
                                                        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.32))',
                                                    borderColor: dest.category === 'Waterfalls' ? 'rgba(6, 182, 212, 0.5)' : dest.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.5)' : dest.category === 'Historical' ? 'rgba(59, 130, 246, 0.5)' : dest.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.5)' : dest.category === 'Tribal & Culture' ? 'rgba(217, 119, 6, 0.5)' : 'rgba(16, 185, 129, 0.5)',
                                                    color: dest.category === 'Waterfalls' ? '#67e8f9' : dest.category === 'Wildlife' ? '#fcd34d' : dest.category === 'Historical' ? '#93c5fd' : dest.category === 'Spiritual' ? '#d8b4fe' : dest.category === 'Tribal & Culture' ? '#fed7aa' : '#6ee7b7'
                                                }}
                                                title={`Category: ${dest.category}`}
                                            >
                                                {dest.category === 'Waterfalls' ? '🌊 Waterfalls' : dest.category === 'Wildlife' ? '🐾 Wildlife' : dest.category === 'Historical' ? '🏛️ Ancient Shrines' : dest.category === 'Spiritual' ? '🕉️ Shaktipeeth' : dest.category === 'Tribal & Culture' ? '🏺 Tribal Arts' : `✨ ${dest.category}`}
                                            </span>
                                        )}
                                        {dest?.cgCircuit && (
                                            <span
                                                className="up-card-circuit-chip cg-circuit-chip"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(4, 120, 87, 0.28))',
                                                    borderColor: 'rgba(16, 185, 129, 0.45)',
                                                    color: '#6ee7b7'
                                                }}
                                                title={`CG Tourism Circuit: ${dest.cgCircuit}`}
                                            >
                                                🌿 {dest.cgCircuit}
                                            </span>
                                        )}
                                        {dest?.mpCircuit && (
                                            <span
                                                className="up-card-circuit-chip mp-circuit-chip"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22), rgba(5, 150, 105, 0.28))',
                                                    borderColor: 'rgba(52, 211, 153, 0.45)',
                                                    color: '#6ee7b7'
                                                }}
                                                title={`MP Tourism Circuit: ${dest.mpCircuit}`}
                                            >
                                                🐅 {dest.mpCircuit}
                                            </span>
                                        )}
                                        {dest?.upCircuit && (
                                            <span className="up-card-circuit-chip" title={`Tourism Circuit: ${dest.upCircuit}`}>
                                                {dest.upCircuit}
                                            </span>
                                        )}
                                        {dest?.odop && (
                                            <span className="up-card-odop-chip" title={`One District One Product / GI: ${dest.odop}`}>
                                                🏺 {dest.odop}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="header-actions-block">
                                {/* Star Rating */}
                                <div className="rating-badge" title={`Rating: ${dest?.rating || '4.8'} (${dest?.reviewsCount || '124'} reviews)`}>
                                    <Star size={11} className="star-icon" fill="currentColor" />
                                    <span className="rating-score">{dest?.rating || '4.8'}</span>
                                    <span className="rating-count">({dest?.reviewsCount || '124'})</span>
                                </div>

                                {/* Follow Button */}
                                <button
                                    type="button"
                                    className={`follow-toggle-btn ${isFollowed ? 'is-following' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsFollowed(!isFollowed);
                                    }}
                                    title={isFollowed ? `Unfollow ${dest?.name}` : `Follow ${dest?.name}`}
                                    aria-label={isFollowed ? 'Following' : 'Follow'}
                                >
                                    {isFollowed ? <CheckCircle size={11} /> : <Plus size={11} />}
                                    <span>{isFollowed ? 'Following' : 'Follow'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Vibe & Highlights Pill Tags */}
                        <div className="highlights-row" aria-label="Key Highlights">
                            {highlights.slice(0, isList ? 3 : 2).map((h, i) => (
                                <span key={i} className="highlight-chip">
                                    <Sparkles size={10} className="chip-sparkle" />
                                    <span>{h}</span>
                                </span>
                            ))}
                        </div>

                        {/* 4. Intelligence Telemetry Matrix Grid (Clickable to Expand Details) */}
                        <div 
                            className="telemetry-grid clickable-telemetry" 
                            role="group" 
                            aria-label="City Intelligence Metrics (Click to Expand Details)"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDrawerOpen(true);
                            }}
                            title="Click to view detailed local weather, fiber speeds, and cost of living"
                        >
                            <div className="telemetry-cell" title="Active nomad community">
                                <Users size={13} className="telemetry-icon blue" />
                                <span className="telemetry-value">{dest?.travelers || '1.2k'}</span>
                                <span className="telemetry-label">Nomads</span>
                            </div>
                            <div className="telemetry-cell" title="Schengen & Visa Approval Rate">
                                <ShieldCheck size={13} className="telemetry-icon green" />
                                <span className="telemetry-value">{dest?.visaApprovalRate || '98%'}</span>
                                <span className="telemetry-label">Visa Rate</span>
                            </div>
                            <div className="telemetry-cell" title="Nomad Seasonality & Demand">
                                <Activity size={13} className="telemetry-icon purple" />
                                <span className="telemetry-value">High</span>
                                <span className="telemetry-label">Demand</span>
                            </div>
                            <div className="telemetry-cell" title="Exploration Experience Reward">
                                <Zap size={13} className="telemetry-icon orange" />
                                <span className="telemetry-value">+1.8k</span>
                                <span className="telemetry-label">XP Reward</span>
                            </div>
                        </div>

                        {/* 5. Dopamine & Retention Interactive Bar */}
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

                        {/* 6. Card Footer: Price Estimate, Quick Actions, Expand Details & Primary CTA */}
                        <div className="card-footer-cluster">
                            <div className="footer-left-group">
                                {/* Living Cost Estimate */}
                                <div className="price-cluster">
                                    <span className="price-number">{dest?.price || '$1,400'}</span>
                                    <span className="price-suffix">/mo est.</span>
                                </div>

                                {/* Small Icon-based Quick Actions with Descriptive Accessible Tooltips */}
                                <div className="quick-actions-strip" role="group" aria-label="Quick destination actions">
                                    {/* 1. Save to My Favorites Collection Action */}
                                    <div className="quick-action-wrapper">
                                        <button
                                            type="button"
                                            className={`quick-action-icon-btn save-btn ${state.isSaved ? 'is-saved' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlers.toggleSave(e);
                                            }}
                                            aria-label={state.isSaved ? `Remove ${dest?.name} from My Favorites` : `Save ${dest?.name} to My Favorites`}
                                            aria-describedby={`tooltip-save-${destKey}`}
                                            title={state.isSaved ? `Remove ${dest?.name} from My Favorites` : `Save ${dest?.name} to My Favorites`}
                                        >
                                            <Heart size={14} fill={state.isSaved ? "#ef4444" : "none"} color={state.isSaved ? "#ef4444" : "currentColor"} />
                                        </button>
                                        <div className="quick-action-tooltip" role="tooltip" id={`tooltip-save-${destKey}`}>
                                            <span className="tooltip-title">{state.isSaved ? 'In My Favorites' : 'Save to My Favorites'}</span>
                                            <span className="tooltip-desc">{state.isSaved ? 'Stored in your local profile' : 'Bookmark to local profile collection'}</span>
                                            <span className="tooltip-arrow" aria-hidden="true" />
                                        </div>
                                    </div>

                                    {/* 2. Share Destination Action */}
                                    <div className="quick-action-wrapper">
                                        <button
                                            type="button"
                                            className="quick-action-icon-btn share-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsShareOpen(true);
                                            }}
                                            aria-label={`Share ${dest?.name} travel details and link`}
                                            aria-describedby={`tooltip-share-${destKey}`}
                                            title={`Share ${dest?.name} with travel mates`}
                                        >
                                            <Share2 size={14} />
                                        </button>
                                        <div className="quick-action-tooltip" role="tooltip" id={`tooltip-share-${destKey}`}>
                                            <span className="tooltip-title">Share Destination</span>
                                            <span className="tooltip-desc">Copy direct link & invite mates</span>
                                            <span className="tooltip-arrow" aria-hidden="true" />
                                        </div>
                                    </div>

                                    {/* 3. Open in Google Maps Action */}
                                    <div className="quick-action-wrapper">
                                        <a
                                            href={mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="quick-action-icon-btn map-btn"
                                            onClick={(e) => e.stopPropagation()}
                                            aria-label={`Open ${dest?.name}, ${dest?.location} in Google Maps in a new tab`}
                                            aria-describedby={`tooltip-map-${destKey}`}
                                            title={`Open ${dest?.name} in Google Maps for live navigation & street view`}
                                        >
                                            <MapPin size={14} />
                                        </a>
                                        <div className="quick-action-tooltip" role="tooltip" id={`tooltip-map-${destKey}`}>
                                            <span className="tooltip-title">Open Google Maps</span>
                                            <span className="tooltip-desc">View live street map & directions</span>
                                            <span className="tooltip-arrow" aria-hidden="true" />
                                        </div>
                                    </div>

                                    {/* 4. Compare Destination Action */}
                                    <div className="quick-action-wrapper">
                                        <button
                                            type="button"
                                            className={`quick-action-icon-btn compare-btn ${isCompared ? 'is-saved' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleCompareDestination(dest.id);
                                                addToast(
                                                    isCompared
                                                        ? `Removed ${dest?.name} from comparison`
                                                        : `Added ${dest?.name} to Compare Destinations`,
                                                    'info'
                                                );
                                            }}
                                            aria-label={isCompared ? `Remove ${dest?.name} from comparison` : `Compare ${dest?.name} side-by-side`}
                                            aria-describedby={`tooltip-compare-${destKey}`}
                                            title={isCompared ? `Comparing ${dest?.name} (Click to remove)` : `Add ${dest?.name} to Compare Destinations`}
                                        >
                                            <ArrowLeftRight size={14} color={isCompared ? '#38bdf8' : 'currentColor'} />
                                        </button>
                                        <div className="quick-action-tooltip" role="tooltip" id={`tooltip-compare-${destKey}`}>
                                            <span className="tooltip-title">{isCompared ? 'Selected for Compare' : 'Compare Destination'}</span>
                                            <span className="tooltip-desc">Side-by-side costs & climate</span>
                                            <span className="tooltip-arrow" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions: Expand Details & Full Analysis CTA */}
                            <div className="footer-right-actions">
                                <button
                                    type="button"
                                    className="up-card-plan-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const { stop, dayNumber } = addDestinationToDay(dest);
                                        addToast(`Added "${dest?.name}" to Day ${dayNumber} in Trip Plan! 📍`, 'success');
                                    }}
                                    title={`Add ${dest?.name} to Day-by-Day Travel Plan`}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '0.35rem 0.65rem',
                                        fontSize: '0.74rem',
                                        fontWeight: 700,
                                        borderRadius: '6px',
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.25) 100%)',
                                        color: '#fbbf24',
                                        border: '1px solid rgba(245, 158, 11, 0.4)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Plus size={12} />
                                    <span>+ Plan Stop</span>
                                </button>

                                <button
                                    type="button"
                                    className={`expand-details-btn ${dest?.district ? 'up-card-expand-btn' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavigate();
                                    }}
                                    title={`Open complete details and district guide for ${dest?.name}`}
                                    aria-label={`View details for ${dest?.name}`}
                                >
                                    <SlidersHorizontal size={12} className="expand-sliders-icon" />
                                    <span>{dest?.district ? `${dest.district} Guide` : 'Expand Details'}</span>
                                </button>

                                <button
                                    type="button"
                                    className={`primary-intel-cta ${dest?.district ? 'up-card-primary-cta' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavigate();
                                    }}
                                    title={`Open full dedicated details page for ${dest?.name}`}
                                    aria-label={`Open destination page for ${dest?.name}`}
                                >
                                    <span>{dest?.district ? 'Full Details Page' : 'Analyze Intel'}</span>
                                    <ArrowRight size={13} className="cta-arrow" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.article>

            {/* In-Depth Intelligence Slide-Over Drawer */}
            <DestinationIntelligenceDrawer
                dest={dest}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />

            {/* Custom Share Dialog with Direct Link & Native Sharing */}
            <DestinationShareDialog
                dest={dest}
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
            />
        </>
    );
};

export default DestinationCard;

