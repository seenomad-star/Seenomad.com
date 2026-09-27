import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Star, Users, ShieldCheck, Sparkles, Calendar,
    ArrowLeft, Bookmark, Share2, Plane, Hotel, Compass,
    Clock, DollarSign, Award, Zap, CheckCircle2, AlertCircle,
    ThumbsUp, MessageSquare, Play, Volume2, Settings, Maximize,
    Bell, Globe, TrendingUp, Shield, Info, Wifi, Repeat,
    Copy, Check, X, ExternalLink
} from 'lucide-react';
import { allDestinations } from '../../../data/destinationsData';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import SEOManager, { useDestinationOGPreview } from '../../../components/SEOManager';
import OGPreviewCard from '../../../components/common/OGPreviewCard';
import { Image, UGCImage } from '../../../components/common/Image';
import './DestinationDetail.css';

const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { destinationInsights } = useNomadOSStore();
    const [liked, setLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [showShareModal, setShowShareModal] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedMeta, setCopiedMeta] = useState(false);

    const toSlug = (text) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const destination = allDestinations.find(d => toSlug(d.name) === id);
    const insights = destination ? destinationInsights[toSlug(destination.name)] : null;
    const ogPreview = useDestinationOGPreview(destination);

    const relatedDestinations = allDestinations
        .filter(d => d.id !== destination?.id && d.category === destination?.category)
        .slice(0, 4);

    const handleCopyLink = () => {
        if (!ogPreview?.canonical) return;
        navigator.clipboard.writeText(ogPreview.canonical);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    const handleCopyMetaTags = () => {
        if (!ogPreview?.metaTags) return;
        const tagsString = ogPreview.metaTags
            .map(t => t.property ? `<meta property="${t.property}" content="${t.content}" />` : `<meta name="${t.name}" content="${t.content}" />`)
            .join('\n');
        navigator.clipboard.writeText(tagsString);
        setCopiedMeta(true);
        setTimeout(() => setCopiedMeta(false), 2000);
    };

    if (!destination) {
        return (
            <div className="destination-not-found">
                <AlertCircle size={48} color="#ef4444" />
                <h2>Intelligence Data Missing</h2>
                <p>The requested destination coordinates are not in our database.</p>
                <button onClick={() => navigate('/explore/destinations')} className="back-btn">
                    <ArrowLeft size={18} />
                    Return to Discovery Canvas
                </button>
            </div>
        );
    }

    return (
        <div className="travel-os-detail-page">
            <SEOManager destination={destination} />

            {/* Cinematic Hero Section */}
            <div className="detail-hero-section">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    className="hero-bg-image"
                    priority={true}
                    sizes="100vw"
                />
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/explore/destinations')}
                        className="glass-back-btn"
                    >
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </motion.button>

                    <div className="hero-main-info">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hero-badge"
                        >
                            <Sparkles size={14} />
                            <span>AI Recommended</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {destination.name}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="hero-location"
                        >
                            <MapPin size={18} />
                            <span>{destination.location}</span>
                        </motion.div>
                    </div>

                    <div className="hero-actions">
                        <button className={`action-pill ${liked ? 'active' : ''}`} onClick={() => setLiked(!liked)}>
                            <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
                            <span>{liked ? '1.3k' : 'Like'}</span>
                        </button>
                        <button className={`action-pill ${isSaved ? 'active' : ''}`} onClick={() => setIsSaved(!isSaved)}>
                            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                            <span>Save</span>
                        </button>
                        <button className="action-pill" onClick={() => setShowShareModal(true)}>
                            <Share2 size={18} />
                            <span>Share Preview</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="detail-main-layout">
                {/* Left Column: Intelligence Report */}
                <div className="detail-content-column">
                    <div className="intelligence-tabs">
                        {['overview', 'logistics', 'experience', 'community'].map(tab => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="tab-content-wrapper"
                        >
                            {activeTab === 'overview' && (
                                <div className="intelligence-overview">
                                    <div className="ai-insight-card">
                                        <div className="card-header">
                                            <Sparkles size={20} className="ai-icon" />
                                            <h3>AI Intelligence Brief</h3>
                                        </div>
                                        <p>{destination.aiInsight || `Experience the breathtaking beauty of ${destination.name}. A perfect blend of ${destination.category.toLowerCase()} and local culture.`}</p>
                                        <div className="insight-stats">
                                            <div className="stat-item">
                                                <TrendingUp size={16} />
                                                <span>98% Match</span>
                                            </div>
                                            <div className="stat-item">
                                                <Users size={16} />
                                                <span>High Demand</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="data-grid">
                                        <div className="data-card">
                                            <Wifi size={20} />
                                            <div className="data-info">
                                                <span className="label">Wi-Fi Speed</span>
                                                <span className="value">{insights?.wifi || '---'}</span>
                                            </div>
                                        </div>
                                        <div className="data-card">
                                            <DollarSign size={20} />
                                            <div className="data-info">
                                                <span className="label">Cost of Living</span>
                                                <span className="value">{insights?.cost || destination.price}</span>
                                            </div>
                                        </div>
                                        <div className="data-card">
                                            <Shield size={20} />
                                            <div className="data-info">
                                                <span className="label">Safety Score</span>
                                                <span className="value">{insights?.safety ? `${insights.safety}%` : destination.visaFriendly ? 'Visa-Free' : 'Required'}</span>
                                            </div>
                                        </div>
                                        <div className="data-card">
                                            <Zap size={20} />
                                            <div className="data-info">
                                                <span className="label">XP Reward</span>
                                                <span className="value">+500 XP</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="description-section">
                                        <h3>About the Destination</h3>
                                        <p>
                                            {destination.name} is a premier {destination.category.toLowerCase()} destination located in {destination.location}.
                                            Known for its unique atmosphere and world-class amenities, it attracts thousands of travelers annually.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'logistics' && (
                                <div className="intelligence-logistics">
                                    <div className="logistics-card">
                                        <div className="card-header">
                                            <Plane size={20} />
                                            <h3>Travel Logistics</h3>
                                        </div>
                                        <div className="logistics-list">
                                            <div className="log-item">
                                                <Clock size={16} />
                                                <span>Best time to visit: Mar - Oct</span>
                                            </div>
                                            <div className="log-item">
                                                <Globe size={16} />
                                                <span>Primary Language: English / Local</span>
                                            </div>
                                            <div className="log-item">
                                                <CheckCircle2 size={16} />
                                                <span>Health & Safety: Certified</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Column: Sidecar Widgets */}
                <aside className="detail-sidecar">
                    <div className="booking-widget">
                        <h3>Secure Your Trip</h3>
                        <div className="price-display">
                            <span className="amount">{destination.price}</span>
                            <span className="period">/ total</span>
                        </div>
                        <button className="primary-book-btn" onClick={() => navigate('/explore/visa')}>
                            Initialize Booking
                        </button>
                        <button 
                            className="remix-btn-secondary" 
                            onClick={() => {
                                // Simulate remixing
                                window.dispatchEvent(new CustomEvent('add-toast', { 
                                    detail: { message: 'Plan Remixed! This itinerary is now in your Drafts. 🎨', type: 'success' } 
                                }));
                            }}
                        >
                            <Repeat size={16} />
                            Remix This Plan
                        </button>
                        <p className="booking-note">
                            <Info size={14} />
                            Price includes AI optimization
                        </p>
                    </div>

                    <div className="related-destinations">
                        <h3>Similar Intelligence</h3>
                        <div className="related-list">
                            {relatedDestinations.map(dest => (
                                <div
                                    key={dest.id}
                                    className="related-item"
                                    onClick={() => navigate(`/explore/destinations/${toSlug(dest.name)}`)}
                                >
                                    <UGCImage src={dest.image} alt={dest.name} loading="lazy" sizes="80px" />
                                    <div className="related-info">
                                        <h4>{dest.name}</h4>
                                        <span>{dest.location}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Dynamic Open Graph Preview & Social Share Modal */}
            <AnimatePresence>
                {showShareModal && ogPreview && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowShareModal(false)}
                    >
                        <motion.div
                            className="bg-neutral-900 border border-neutral-700/60 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl overflow-hidden relative"
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                                        <Share2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Social Sharing & Open Graph Card</h3>
                                        <p className="text-xs text-neutral-400">Automated canvas-rendered social card with SeeNomad branding & verified intel</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Automated Open Graph Canvas Preview Card */}
                            <OGPreviewCard
                                title={ogPreview.ogTitle}
                                category={destination.category || 'Nomad Destination'}
                                description={ogPreview.ogDescription}
                                stats={ogPreview.preview?.stats}
                                backgroundImageUrl={destination.image}
                                canonicalUrl={ogPreview.canonical}
                                interactive={true}
                                showActions={true}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DestinationDetail;

