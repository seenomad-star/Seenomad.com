/**
 * DestinationDetailTemplate.jsx
 * Reusable React component template for Destination Details.
 * Dynamically fetches and displays:
 * 1. 'Best time to visit' (Seasonality, climate, optimal visiting window)
 * 2. 'Must-see spots' (Curated highlights, scenic landmarks, viewpoints)
 * 3. 'Local cuisine' (Authentic Chhattisgarhi dishes, forest delicacies, GI food)
 * Along with curated activities, essential travel tips, transit telemetry, and itinerary planning.
 *
 * Compatible with existing routing pattern (/explore/destinations/:id or /destinations/:id).
 * Can be used as a standalone route component (reads useParams) or as a reusable embedded component (receives props).
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Sun, Calendar, Utensils, Sparkles, ShieldCheck,
    Compass, ArrowLeft, Heart, Share2, Plus, CheckCircle2,
    Copy, ExternalLink, Zap, Train, Plane, Award, Globe,
    Clock, DollarSign, Wifi, Info, ChevronRight
} from 'lucide-react';
import { allDestinations } from '../../../data/destinationsData';
import { chhattisgarhDestinations } from '../../../data/chhattisgarhDestinationsData';
import { odishaDestinations } from '../../../data/odishaDestinationsData';
import { jharkhandDestinations } from '../../../data/jharkhandDestinationsData';
import { biharDestinations } from '../../../data/biharDestinationsData';
import { westBengalDestinations } from '../../../data/westBengalDestinationsData.js';
import { assamDestinations } from '../../../data/assamDestinationsData.js';
import { useSavedStore } from '../../../store/savedStore';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useToastStore } from '../../../store/toastStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useItineraryStore } from '../../../store/itineraryStore';
import { getDestinationIntelligence } from '../../../utils/destinationIntelligenceUtils';
import { Image } from '../../../components/common/Image';
import SEOManager from '../../../components/SEOManager';
import AdSenseSlot from '../../../components/common/AdSenseSlot';
import './DestinationDetailTemplate.css';

const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export const DestinationDetailTemplate = ({
    destination: propDestination = null,
    id: propId = null,
    onClose = null,
    isModal = false
}) => {
    const routeParams = useParams();
    const navigate = useNavigate();
    const targetId = propId || routeParams.id;

    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const { addDestinationToDay } = useItineraryStore();
    const { toggleCompareDestination, compareDestinations } = useDestinationStore();

    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'activities' | 'tips' | 'cuisine'
    const [xpClaimed, setXpClaimed] = useState(false);
    const [completedActivities, setCompletedActivities] = useState({});
    const [isLoading, setIsLoading] = useState(!propDestination);

    // Resolve or dynamically fetch destination data
    const destination = useMemo(() => {
        if (propDestination) return propDestination;
        if (!targetId) return null;

        const decoded = decodeURIComponent(targetId).toLowerCase();

        // 1. Direct Assam match for fast indexing
        const assamMatch = assamDestinations.find(
            d => toSlug(d.name) === decoded ||
                String(d.id) === decoded ||
                (d.slug && d.slug.toLowerCase() === decoded) ||
                toSlug(d.name).replace(/-+/g, '') === decoded.replace(/-+/g, '')
        );
        if (assamMatch) return assamMatch;

        // 2. Direct Jharkhand match for fast indexing
        const jhMatch = jharkhandDestinations.find(
            d => toSlug(d.name) === decoded ||
                String(d.id) === decoded ||
                (d.slug && d.slug.toLowerCase() === decoded) ||
                toSlug(d.name).replace(/-+/g, '') === decoded.replace(/-+/g, '')
        );
        if (jhMatch) return jhMatch;

        // 3. Direct Odisha match for fast indexing
        const odMatch = odishaDestinations.find(
            d => toSlug(d.name) === decoded ||
                String(d.id) === decoded ||
                (d.slug && d.slug.toLowerCase() === decoded) ||
                toSlug(d.name).replace(/-+/g, '') === decoded.replace(/-+/g, '')
        );
        if (odMatch) return odMatch;

        // 4. Direct Chhattisgarh match for fast indexing
        const cgMatch = chhattisgarhDestinations.find(
            d => toSlug(d.name) === decoded ||
                String(d.id) === decoded ||
                (d.slug && d.slug.toLowerCase() === decoded) ||
                toSlug(d.name).replace(/-+/g, '') === decoded.replace(/-+/g, '')
        );
        if (cgMatch) return cgMatch;

        // 5. Direct Bihar match for fast indexing
        const biharMatch = biharDestinations.find(
            d => toSlug(d.name) === decoded ||
                String(d.id) === decoded ||
                (d.slug && d.slug.toLowerCase() === decoded) ||
                toSlug(d.name).replace(/-+/g, '') === decoded.replace(/-+/g, '')
        );
        if (biharMatch) return biharMatch;

        // 6. Direct West Bengal match for fast indexing
        const wbMatch = westBengalDestinations.find(
            d => toSlug(d.name) === decoded ||
                String(d.id) === decoded ||
                (d.slug && d.slug.toLowerCase() === decoded) ||
                toSlug(d.name).replace(/-+/g, '') === decoded.replace(/-+/g, '')
        );
        if (wbMatch) return wbMatch;

        // 7. Global search across all destinations
        return allDestinations.find(
            d => toSlug(d.name) === decoded ||
                String(d.id) === decoded ||
                (d.slug && d.slug.toLowerCase() === decoded) ||
                toSlug(d.name).replace(/-+/g, '') === decoded.replace(/-+/g, '')
        );
    }, [propDestination, targetId]);

    // Simulated quick fetch effect to guarantee smooth dynamic transitions
    useEffect(() => {
        if (propDestination) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 120);
        return () => clearTimeout(timer);
    }, [targetId, propDestination]);

    // Scroll to top when routing changes
    useEffect(() => {
        if (!isModal) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [targetId, isModal]);

    const isSaved = useSavedStore(state =>
        destination ? state.isSaved(destination.id || destination.name) : false
    );
    const toggleSave = useSavedStore(state => state.toggleSave);

    const isCompared = destination
        ? compareDestinations.includes(destination.id)
        : false;

    const intel = useMemo(() => {
        return destination ? getDestinationIntelligence(destination) : null;
    }, [destination]);

    // Core content extraction with robust fallbacks
    const bestTimeToVisit = destination?.bestSeason || 'October to March (Post-monsoon freshness & pleasant winter sunshine)';
    const mustSeeSpots = destination?.highlights && destination.highlights.length > 0
        ? destination.highlights
        : [
            `${destination?.name} Viewpoint & Natural Formations`,
            `Historic & Cultural Guild Sanctuaries`,
            `Indigenous Artisan Craft Bazaars`,
            `Surrounding Sal Forest Trails & Waterways`
        ];

    const isChhattisgarh = Boolean(
        destination?.isChhattisgarh ||
        destination?.state === 'Chhattisgarh' ||
        destination?.location?.toLowerCase().includes('chhattisgarh')
    );
    const isOdisha = Boolean(
        destination?.isOdisha ||
        destination?.state === 'Odisha' ||
        destination?.location?.toLowerCase().includes('odisha')
    );
    const isJharkhand = Boolean(
        destination?.isJharkhand ||
        destination?.state === 'Jharkhand' ||
        destination?.location?.toLowerCase().includes('jharkhand')
    );
    const isBihar = Boolean(
        destination?.isBihar ||
        destination?.state === 'Bihar' ||
        destination?.location?.toLowerCase().includes('bihar')
    );
    const isWestBengal = Boolean(
        destination?.isWestBengal ||
        destination?.state === 'West Bengal' ||
        destination?.location?.toLowerCase().includes('west bengal')
    );
    const isAssam = Boolean(
        destination?.isAssam ||
        destination?.state === 'Assam' ||
        destination?.location?.toLowerCase().includes('assam')
    );

    const localCuisineDishes = useMemo(() => {
        if (destination?.localCuisine) {
            return destination.localCuisine.split(',').map(d => d.trim()).filter(Boolean);
        }
        // Authentic Assamese defaults for Assam destinations
        if (isAssam) {
            return ['Masor Tenga (Tangy Fish Curry)', 'Duck Meat Curry with Ash Gourd', 'Omita Khar (Alkaline Papaya Prep)', 'Pork with Fermented Bamboo Shoot', 'Pitha & Laru Sweets', 'Kaji Nemu Infusions', 'Assam Orthodox Golden Tea', 'Alu Pitika with Mustard Oil'];
        }
        // Authentic Bengali defaults for West Bengal destinations
        if (isWestBengal) {
            return ['Macher Jhol (Fish Curry)', 'Shorshe Ilish (Hilsa in Mustard)', 'Kosha Mangsho with Luchi', 'Chingri Malai Curry', 'Mishti Doi & Rosogolla', 'Darjeeling Momos & Thukpa', 'Kolkata Biryani with Aloo & Egg', 'Sandesh (Nolen Gur)'];
        }
        // Authentic Bihari defaults for Bihar destinations
        if (isBihar) {
            return ['Litti Chokha with Baingan Bharta', 'Sattu Paratha & Sharbat', 'Champaran Ahuna Handi Mutton', 'Silao Ka Khaja (GI Tag)', 'Gaya Tilkut & Anarsa', 'Thekua', 'Makhana Kheer', 'Malpua'];
        }
        // Authentic Jharkhandi defaults for Jharkhand destinations
        if (isJharkhand) {
            return ['Dhuska with Chana Aloo Ghugni', 'Litti Chokha with Mustard Tadka', 'Rugra (Wild Sal Mushroom) Curry', 'Chilka Roti', 'Karil (Bamboo Shoot) Fry', 'Deoghar Peda', 'Thekua'];
        }
        // Authentic Odia defaults for Odisha destinations
        if (isOdisha) {
            return ['Puri Mahaprasad (Abhada)', 'Chhena Poda', 'Dalma', 'Khaja', 'Machha Besara', 'Chhena Gaja', 'Pahala Rasagola', 'Dahi Vada Aloo Dum'];
        }
        // Authentic Chhattisgarhi defaults for Chhattisgarh locations
        if (isChhattisgarh) {
            return ['Farra (Steamed Rice Rolls)', 'Chila with Tangy Chutney', 'Dubki Kadi', 'Angakar Roti', 'Bafauri', 'Chaprah Chutney'];
        }
        return ['Regional Specialty Platters', 'Heritage Breads & Dals', 'Artisanal Sweets', 'Locally Brewed Teas'];
    }, [destination, isAssam, isWestBengal, isBihar, isJharkhand, isOdisha, isChhattisgarh]);

    const activitiesList = destination?.activities && destination.activities.length > 0
        ? destination.activities
        : [
            `Embark on a guided morning cultural walk across ${destination?.name}`,
            `Interact with certified tribal artisans at local craft guilds`,
            `Capture dramatic sunrise & sunset photography from scenic ridges`,
            `Sample traditional recipes and steamed delicacies at village haats`
        ];

    const travelTipsList = destination?.travelTips && destination.travelTips.length > 0
        ? destination.travelTips
        : [
            `Best season for pleasant exploration is ${bestTimeToVisit}.`,
            `Carry cash for local craft markets as electronic UPI connectivity may vary in remote valleys.`,
            `Wear sturdy walking or trekking shoes for navigating stone steps and forest trails.`,
            `Check transit connections: ${destination?.railConnectivity || (isAssam ? 'Guwahati Junction (GHY) / NF Railway' : isJharkhand ? 'Ranchi Junction (RNC) / Regional Rail' : isOdisha ? 'East Coast Railway (ECoR)' : 'SECR Network')} and ${destination?.nearestAirport || (isAssam ? 'Lokpriya Gopinath Bordoloi Airport Guwahati (GAU)' : isJharkhand ? 'Birsa Munda Airport Ranchi (IXR)' : isOdisha ? 'Biju Patnaik Airport (BBI)' : 'Raipur Airport (RPR)')}.`
        ];

    const handleClaimXP = () => {
        if (xpClaimed) return;
        setXpClaimed(true);
        if (addXP) addXP(500);
        addToast(`Claimed +500 XP for exploring ${destination?.name}! ⚡`, 'success');
    };

    const handleToggleActivity = (idx, text) => {
        setCompletedActivities(prev => {
            const next = { ...prev, [idx]: !prev[idx] };
            if (next[idx]) {
                if (addXP) addXP(30);
                addToast(`Checked off: "${text.slice(0, 32)}..." (+30 XP) ✨`, 'success');
            }
            return next;
        });
    };

    const handleCopyTips = () => {
        if (!destination) return;
        const textToCopy = `Travel Guide for ${destination.name} (${destination.location}):\n\n` +
            `BEST TIME TO VISIT:\n${bestTimeToVisit}\n\n` +
            `MUST-SEE SPOTS:\n` + mustSeeSpots.map((s, i) => `${i + 1}. ${s}`).join('\n') + `\n\n` +
            `LOCAL CUISINE:\n` + localCuisineDishes.join(', ') + `\n\n` +
            `ESSENTIAL TRAVEL TIPS:\n` + travelTipsList.map((t, i) => `${i + 1}. ${t}`).join('\n') + `\n\n` +
            `Air: ${destination.nearestAirport || 'Raipur (RPR)'}\nRail: ${destination.railConnectivity || 'SECR Network'}`;

        navigator.clipboard?.writeText(textToCopy);
        addToast('Copied Travel Guide to clipboard! 📋', 'success');
    };

    const handleAddToItinerary = (activityText = null) => {
        if (!destination) return;
        const note = activityText || `Explore ${destination.name}`;
        const { dayNumber } = addDestinationToDay(destination, null, 'Morning', note);
        addToast(`Added "${destination.name}" to Day ${dayNumber} in Trip Itinerary! 📍`, 'success');
    };

    // Google Maps link
    const mapsUrl = destination
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destination.name}, ${destination.location}`)}`
        : '#';

    // Loading State
    if (isLoading) {
        return (
            <div className="ddt-wrapper">
                <div className="ddt-state-container">
                    <div className="ddt-spinner" />
                    <h3 style={{ margin: 0, color: '#f8fafc' }}>Fetching Destination Intelligence...</h3>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                        Loading best time to visit, must-see spots, and local gastronomy.
                    </p>
                </div>
            </div>
        );
    }

    // Not Found State
    if (!destination) {
        return (
            <div className="ddt-wrapper">
                <div className="ddt-state-container">
                    <Info size={48} color="#ef4444" />
                    <h2 style={{ color: '#ffffff', margin: 0 }}>Destination Not Found</h2>
                    <p style={{ color: '#94a3b8', maxWidth: '420px', margin: 0 }}>
                        Could not resolve destination for "{targetId}". Check the URL or return to the regional explorer.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/explore/destinations')}
                        className="ddt-back-btn"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to All Destinations</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="ddt-wrapper" data-testid="destination-detail-template">
            <SEOManager destination={destination} />

            {/* 1. Cinematic Hero Banner */}
            <section className="ddt-hero">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    className="ddt-hero-bg"
                    priority={true}
                    sizes="100vw"
                />
                <div className="ddt-hero-scrim" />

                <div className="ddt-hero-content">
                    {/* Top Navigation Bar */}
                    <div className="ddt-nav-bar">
                        <button
                            type="button"
                            onClick={() => onClose ? onClose() : navigate('/explore/destinations')}
                            className="ddt-action-pill-btn"
                            title="Return to explore"
                        >
                            <ArrowLeft size={14} />
                            <span>{onClose ? 'Close' : 'Back to Explorer'}</span>
                        </button>

                        <div className="ddt-top-actions">
                            <button
                                type="button"
                                onClick={handleClaimXP}
                                className={`ddt-action-pill-btn ${xpClaimed ? 'primary' : ''}`}
                                title="Claim XP reward"
                            >
                                <Zap size={14} />
                                <span>{xpClaimed ? '500 XP Claimed ✓' : 'Claim +500 XP'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSave(destination);
                                    addToast(isSaved ? 'Removed from favorites' : 'Saved to favorites ❤️', 'info');
                                }}
                                className="ddt-action-pill-btn"
                                title="Save to profile"
                            >
                                <Heart size={14} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : 'currentColor'} />
                                <span>{isSaved ? 'Saved' : 'Save'}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    toggleCompareDestination(destination.id);
                                    addToast(isCompared ? 'Removed from comparison' : 'Added to compare side-by-side', 'info');
                                }}
                                className="ddt-action-pill-btn"
                                title="Side-by-side comparison"
                            >
                                <Compass size={14} color={isCompared ? '#38bdf8' : 'currentColor'} />
                                <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                            </button>

                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ddt-action-pill-btn"
                                title="Open in Google Maps"
                            >
                                <MapPin size={14} />
                                <span>Maps</span>
                                <ExternalLink size={11} />
                            </a>

                            <button
                                type="button"
                                onClick={() => handleAddToItinerary()}
                                className="ddt-action-pill-btn primary"
                                title="Add to Nomad Day Plan"
                            >
                                <Plus size={14} />
                                <span>+ Plan Trip Stop</span>
                            </button>
                        </div>
                    </div>

                    {/* Hero Bottom Headings & Emblems */}
                    <div className="ddt-hero-bottom">
                        <div className="ddt-hero-info">
                            <div className="ddt-badges-row">
                                <span className="ddt-badge state">
                                    <span>{isWestBengal ? '🐯 West Bengal' : isBihar ? '🏛️ Bihar' : isJharkhand ? '🌲 Jharkhand' : isOdisha ? '🌊 Odisha' : '🌿 Chhattisgarh'}</span>
                                </span>
                                {destination.district && (
                                    <span className="ddt-badge district">
                                        <MapPin size={11} className="text-amber-400" />
                                        <span>{destination.district} District</span>
                                    </span>
                                )}
                                {destination.wbCircuit && (
                                    <span className="ddt-badge circuit">
                                        <span>🐯 {destination.wbCircuit}</span>
                                    </span>
                                )}
                                {destination.cgCircuit && (
                                    <span className="ddt-badge circuit">
                                        <span>🌊 {destination.cgCircuit}</span>
                                    </span>
                                )}
                                {destination.odop && (
                                    <span className="ddt-badge odop">
                                        <Award size={11} />
                                        <span>ODOP / GI: {destination.odop}</span>
                                    </span>
                                )}
                            </div>

                            <h1 className="ddt-hero-title">{destination.name}</h1>
                            <p className="ddt-hero-location">
                                <MapPin size={15} className="text-emerald-400" />
                                <span>{destination.location}</span>
                            </p>
                        </div>

                        {/* Quick Telemetry Summary */}
                        <div className="ddt-hero-metrics">
                            <div className="ddt-metric-tile">
                                <span className="ddt-metric-val">{destination.rating || 4.8} ★</span>
                                <span className="ddt-metric-label">{destination.reviewsCount || 120} Reviews</span>
                            </div>
                            <div className="ddt-metric-tile">
                                <span className="ddt-metric-val">{destination.price || '$380'}</span>
                                <span className="ddt-metric-label">Monthly Est.</span>
                            </div>
                            {intel && (
                                <div className="ddt-metric-tile">
                                    <span className="ddt-metric-val">{intel.weather.tempC}°C</span>
                                    <span className="ddt-metric-label">{intel.weather.condition}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE THREE PRIMARY REQUESTED PILLARS (Best Time, Must-See Spots, Local Cuisine) */}
            <section className="ddt-core-pillars-grid" aria-label="Core Destination Highlights">
                {/* Pillar 1: Best Time to Visit */}
                <div className="ddt-pillar-card season">
                    <div>
                        <div className="ddt-pillar-header">
                            <div className="ddt-pillar-icon-box season">
                                <Sun size={20} />
                            </div>
                            <div className="ddt-pillar-title-group">
                                <h3>Best Time to Visit</h3>
                                <span>Optimal Visiting Window & Climate</span>
                            </div>
                        </div>

                        <div className="ddt-season-banner">
                            <span className="ddt-season-highlight">
                                🗓️ {bestTimeToVisit}
                            </span>
                            <p className="ddt-season-desc">
                                {isWestBengal
                                    ? 'October to March offers cool misty mornings in Darjeeling & Dooars foothills, crisp mountain visibility for Kanchenjunga peaks, and pleasant breezes across the Gangetic delta and Sundarbans mangrove tiger reserve.'
                                    : isBihar
                                    ? 'Post-monsoon winters (Oct–March) offer cool breezy mornings and clear sunny skies, ideal for exploring Mahabodhi Temple, ancient Nalanda ruins, Rajgir skywalk & hot springs, and wildlife safaris in Valmiki Tiger Reserve.'
                                    : isJharkhand
                                    ? 'Post-monsoon winters (Oct–March) offer roaring waterfall volumes, crystal-clear blue skies over the Chotanagpur plateau, and pleasant cool breezes ideal for nature treks, wildlife safaris, and pilgrimage darshan.'
                                    : isOdisha
                                    ? 'Winters (Oct–March) offer mild breezy coastal weather, optimal visibility, migrating birds at Chilika Lake, and festive events like the Konark Dance Festival and beach carnivals.'
                                    : isChhattisgarh
                                    ? 'Monsoons (Jul–Oct) bring roaring cascading torrents across river canyons, while post-monsoon winters (Nov–Feb) offer crystal-clear emerald pools, pleasant breezy weather, and vibrant tribal haats.'
                                    : 'Ideal seasonal window featuring mild temperatures, optimal visibility, and comfortable conditions for sightseeing and remote work.'}
                            </p>
                        </div>
                    </div>

                    <div className="ddt-season-tags">
                        <span className="ddt-season-tag">{isWestBengal ? '🐯 Peak: Oct – Mar' : isBihar ? '🏛️ Peak: Oct – Mar' : isJharkhand ? '🌲 Peak: Oct – Mar' : isOdisha ? '🏖️ Peak: Oct – Mar' : '🌤️ Peak: Nov – Feb'}</span>
                        <span className="ddt-season-tag">{isWestBengal ? '🏔️ Himalayas & Mangroves' : isBihar ? '☸️ Sacred Heritage' : isJharkhand ? '💧 Roaring Cascades' : isOdisha ? '🌊 Coastal Breeze' : '🌊 Monsoons: Jul – Oct'}</span>
                        <span className="ddt-season-tag">🌡️ Pleasant Winter Sun</span>
                    </div>
                </div>

                {/* Pillar 2: Must-See Spots */}
                <div className="ddt-pillar-card spots">
                    <div>
                        <div className="ddt-pillar-header">
                            <div className="ddt-pillar-icon-box spots">
                                <Sparkles size={20} />
                            </div>
                            <div className="ddt-pillar-title-group">
                                <h3>Must-See Spots</h3>
                                <span>Key Highlights & Iconic Landmarks</span>
                            </div>
                        </div>

                        <div className="ddt-spots-list">
                            {mustSeeSpots.map((spot, idx) => (
                                <div key={idx} className="ddt-spot-item">
                                    <span className="ddt-spot-num">#{idx + 1}</span>
                                    <p className="ddt-spot-text">{spot}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: '0.85rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            📍 Located across {destination.district || (isWestBengal ? 'West Bengal' : isBihar ? 'Bihar' : isJharkhand ? 'Jharkhand' : isOdisha ? 'Odisha' : 'Chhattisgarh')}
                        </span>
                    </div>
                </div>

                {/* Pillar 3: Local Cuisine */}
                <div className="ddt-pillar-card cuisine">
                    <div>
                        <div className="ddt-pillar-header">
                            <div className="ddt-pillar-icon-box cuisine">
                                <Utensils size={20} />
                            </div>
                            <div className="ddt-pillar-title-group">
                                <h3>Local Cuisine</h3>
                                <span>{isWestBengal ? 'Authentic Bengali Gastronomy' : isBihar ? 'Authentic Bihari Gastronomy' : isJharkhand ? 'Authentic Jharkhandi Gastronomy' : isOdisha ? 'Authentic Odia Gastronomy' : isChhattisgarh ? 'Authentic Chhattisgarhi Gastronomy' : 'Regional Culinary Highlights'}</span>
                            </div>
                        </div>

                        <div className="ddt-cuisine-body">
                            <p>
                                {isWestBengal
                                    ? 'World-renowned for its delicate balance of mustard pungency, aromatic Panch Phoron spice blend, fresh freshwater fish, rich gravies, and legendary sweets:'
                                    : isBihar
                                    ? 'Steeped in rich ancient culinary traditions from Magadha, Mithila, and Bhojpuri heartlands, Bihari gastronomy celebrates roasted gram (Sattu), clay-pot slow-cooked delicacies, mustard tempering, and crispy sweet confections:'
                                    : isJharkhand
                                    ? 'Steeped in rich indigenous tribal culture, Jharkhandi food emphasizes wholesome local rice, wild sal forest mushrooms (Rugra), roasted gram (Sattu), bamboo shoots, and mustard-tempered curries:'
                                    : isOdisha
                                    ? 'Celebrated for its sacred culinary roots from the Jagannath Mahaprasad to coastal seafood and caramelised chhena sweets, Odia gastronomy is aromatic, light, and nutritious:'
                                    : 'Known as India\'s "Rice Bowl" (Dhan Ka Katora), traditional food here emphasizes aromatic local rice varieties, steamed dumplings, lentils, and tangy forest delicacies:'}
                            </p>
                            <div className="ddt-cuisine-pills">
                                {localCuisineDishes.map((dish, idx) => (
                                    <span key={idx} className="ddt-dish-pill">
                                        🍲 {dish}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '0.85rem' }}>
                        <span style={{ fontSize: '0.72rem', color: isWestBengal ? '#fca5a5' : isBihar ? '#fca5a5' : isJharkhand ? '#6ee7b7' : isOdisha ? '#fbbf24' : '#6ee7b7' }}>
                            {isWestBengal ? '✨ Pair with hot fluffy Luchis, sweet Mishti Doi, fresh Nolen Gur Sandesh & first-flush Darjeeling tea' : isBihar ? '✨ Pair with spicy green coriander chutney, roasted Baingan Chokha & hot Makhana Kheer' : isJharkhand ? '✨ Pair with spicy Aloo Chana Ghugni, roasted green chillies & sweet Thekua' : isOdisha ? '✨ Pair with hot sweet Khaja & coastal tender coconut water' : '✨ Pair with spicy tomato-garlic chutney & Mahua sharbat'}
                        </span>
                    </div>
                </div>
            </section>

            {/* In-Article Google AdSense Responsive Display Unit */}
            <div className="ddt-adsense-inarticle" style={{ margin: '1.75rem 0' }}>
                <AdSenseSlot
                    format="horizontal"
                    slot="7005432109"
                    label="Sponsored Travel Guide • Google AdSense"
                />
            </div>

            {/* 3. Executive AI Insight & Regional Narrative */}
            <div className="ddt-panel-card" style={{ marginBottom: '1.75rem' }}>
                <span className="ddt-section-eyebrow">Curated Field Editorial</span>
                <h3 className="ddt-section-title" style={{ marginBottom: '0.75rem' }}>
                    About {destination.name}
                </h3>
                <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: '#e2e8f0' }}>
                    {destination.aiInsight ||
                        `${destination.name} is a premier destination in ${destination.location}, offering a sublime blend of undisturbed natural wilderness, ancient temple sanctuaries, and vibrant indigenous craft guilds.`}
                </p>
            </div>

            {/* 4. Curated Activities & Interactive Field Experiences */}
            <div className="ddt-panel-card" style={{ marginBottom: '1.75rem' }}>
                <div className="ddt-panel-header">
                    <div>
                        <span className="ddt-section-eyebrow">01. Field Experiences</span>
                        <h3 className="ddt-section-title">
                            Curated Activities ({activitiesList.length})
                        </h3>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Check off completed activities (+30 XP) or add stops to your itinerary
                    </span>
                </div>

                <div className="ddt-activities-list">
                    {activitiesList.map((activity, idx) => {
                        const isDone = Boolean(completedActivities[idx]);
                        return (
                            <div key={idx} className={`ddt-activity-row ${isDone ? 'is-done' : ''}`}>
                                <div className="ddt-activity-left">
                                    <span className="ddt-act-index">#{String(idx + 1).padStart(2, '0')}</span>
                                    <div>
                                        <p className="ddt-act-desc">{activity}</p>
                                        <span style={{ fontSize: '0.72rem', color: '#6ee7b7', marginTop: '4px', display: 'inline-block' }}>
                                            🌿 {destination.cgCircuit || 'Eco & Heritage Exploration'}
                                        </span>
                                    </div>
                                </div>

                                <div className="ddt-act-actions">
                                    <button
                                        type="button"
                                        onClick={() => handleAddToItinerary(activity)}
                                        className="ddt-btn-small plan"
                                        title="Add activity to itinerary"
                                    >
                                        <Plus size={12} />
                                        <span>Plan Stop</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleToggleActivity(idx, activity)}
                                        className={`ddt-btn-small done ${isDone ? 'is-completed' : ''}`}
                                        title={isDone ? 'Mark as incomplete' : 'Mark completed (+30 XP)'}
                                    >
                                        <CheckCircle2 size={12} />
                                        <span>{isDone ? 'Completed ✓' : 'Complete (+30 XP)'}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 5. Essential Travel Tips & Transit Matrix */}
            <div className="ddt-panel-card">
                <div className="ddt-panel-header">
                    <div>
                        <span className="ddt-section-eyebrow">02. Travel Logistics & Advisory</span>
                        <h3 className="ddt-section-title">
                            Essential Travel Tips ({travelTipsList.length})
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopyTips}
                        className="ddt-action-pill-btn"
                        title="Copy guide to clipboard"
                    >
                        <Copy size={13} />
                        <span>Copy Complete Guide</span>
                    </button>
                </div>

                <div className="ddt-tips-grid">
                    {travelTipsList.map((tip, idx) => (
                        <div key={idx} className="ddt-tip-tile">
                            <div className="ddt-tip-icon">💡</div>
                            <div className="ddt-tip-body">
                                <h5>Travel Tip #{idx + 1}</h5>
                                <p>{tip}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Transit & Gateways Matrix */}
                <div className="ddt-transit-matrix">
                    {destination.nearestAirport && (
                        <div className="ddt-transit-item">
                            <span className="label">✈️ Airport Access</span>
                            <span className="val">{destination.nearestAirport}</span>
                        </div>
                    )}
                    {destination.railConnectivity && (
                        <div className="ddt-transit-item">
                            <span className="label">🚆 Railway Gateway</span>
                            <span className="val">{destination.railConnectivity}</span>
                        </div>
                    )}
                    {destination.odop && (
                        <div className="ddt-transit-item">
                            <span className="label">🏺 ODOP / GI Craft</span>
                            <span className="val">{destination.odop}</span>
                        </div>
                    )}
                    <div className="ddt-transit-item">
                        <span className="label">🧭 Division Hub</span>
                        <span className="val">{destination.division || (isWestBengal ? 'Presidency' : isBihar ? 'Patna' : isJharkhand ? 'South Chotanagpur' : isOdisha ? 'Central' : 'Raipur')} Division, {isWestBengal ? 'West Bengal' : isBihar ? 'Bihar' : isJharkhand ? 'Jharkhand' : isOdisha ? 'Odisha' : 'CG'}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Google AdSense Display Unit */}
            <div className="ddt-adsense-bottom" style={{ margin: '2rem 0 0.5rem', width: '100%' }}>
                <AdSenseSlot
                    format="auto"
                    slot="7006543210"
                    label="Advertisement • Google AdSense"
                />
            </div>
        </div>
    );
};

export default DestinationDetailTemplate;
