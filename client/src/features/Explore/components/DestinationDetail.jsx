import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Star, Users, ShieldCheck, Sparkles, Calendar,
    ArrowLeft, Bookmark, Share2, Plane, Compass,
    Clock, DollarSign, Zap, CheckCircle2, AlertCircle,
    ThumbsUp, Globe, TrendingUp, TrendingDown, Shield, Info, Wifi, Repeat,
    Check, X, ExternalLink, Sun, CloudSun, CloudRain, Wind,
    Building2, Smartphone, ArrowLeftRight, Heart, Navigation, Coffee,
    Landmark, Copy, Plus, Award
} from 'lucide-react';
import { allDestinations } from '../../../data/destinationsData';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useSavedStore } from '../../../store/savedStore';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import { useToastStore } from '../../../store/toastStore';
import { useItineraryStore } from '../../../store/itineraryStore';
import { getDestinationIntelligence } from '../../../utils/destinationIntelligenceUtils';
import { getDestinationDomainName, getDestinationDomainStatus } from '../../../utils/destinationDomainUtils';
import SEOManager, { useDestinationOGPreview } from '../../../components/SEOManager';
import OGPreviewCard from '../../../components/common/OGPreviewCard';
import CompareDestinationsModal from './CompareDestinationsModal';
import { Image, UGCImage } from '../../../components/common/Image';
import { UPDistrictIntelligenceSuite } from './UPDistrictIntelligenceSuite';
import { MPDistrictIntelligenceSuite } from './MPDistrictIntelligenceSuite';
import { MHDistrictIntelligenceSuite } from './MHDistrictIntelligenceSuite';
import { RJDistrictIntelligenceSuite } from './RJDistrictIntelligenceSuite';
import { CGDistrictIntelligenceSuite } from './CGDistrictIntelligenceSuite';
import { ODDistrictIntelligenceSuite } from './ODDistrictIntelligenceSuite';
import { JHDistrictIntelligenceSuite } from './JHDistrictIntelligenceSuite';
import { BiharDistrictIntelligenceSuite } from './BiharDistrictIntelligenceSuite';
import { WBDistrictIntelligenceSuite } from './WBDistrictIntelligenceSuite';
import { AssamDistrictIntelligenceSuite } from './AssamDistrictIntelligenceSuite';
import { DestinationDetailTemplate } from './DestinationDetailTemplate';
import './DestinationDetail.css';

export { DestinationDetailTemplate };

const DestinationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const { addDestinationToDay } = useItineraryStore();
    const {
        compareDestinations,
        toggleCompareDestination,
        isCompareModalOpen,
        setIsCompareModalOpen
    } = useDestinationStore();

    const [activeTab, setActiveTab] = useState('overview');
    const [tempUnit, setTempUnit] = useState('C'); // 'C' | 'F'
    const [budgetMode, setBudgetMode] = useState('nomad'); // 'budget' | 'nomad' | 'founder'
    const [stayMonths, setStayMonths] = useState(1);
    const [liked, setLiked] = useState(false);
    const [xpClaimed, setXpClaimed] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [completedActivities, setCompletedActivities] = useState({});

    const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const decodedId = decodeURIComponent(id || '').toLowerCase();
    const destination = allDestinations.find(
        (d) =>
            toSlug(d.name) === decodedId ||
            String(d.id) === decodedId ||
            (d.slug && d.slug.toLowerCase() === decodedId) ||
            toSlug(d.name).replace(/-+/g, '') === decodedId.replace(/-+/g, '')
    );

    const isSaved = useSavedStore((state) =>
        destination ? state.isSaved(destination.id || destination.name) : false
    );
    const toggleSave = useSavedStore((state) => state.toggleSave);

    // Scroll to top when switching between destination detail pages
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveTab('overview');
    }, [id]);

    const intel = destination ? getDestinationIntelligence(destination) : null;
    const domainName = destination ? getDestinationDomainName(destination) : '';
    const domainStatus = destination ? getDestinationDomainStatus(destination) : 'Available';
    const ogPreview = useDestinationOGPreview(destination);
    const isCompared = destination ? compareDestinations.includes(destination.id) : false;

    const relatedDestinations = allDestinations
        .filter((d) => d.id !== destination?.id && d.category === destination?.category)
        .slice(0, 4);

    if (!destination || !intel) {
        return (
            <div className="destination-not-found">
                <AlertCircle size={48} color="#ef4444" />
                <h2>Destination Intelligence Not Found</h2>
                <p>The requested destination could not be located in our global index.</p>
                <button onClick={() => navigate('/explore/destinations')} className="back-btn">
                    <ArrowLeft size={18} />
                    <span>Return to Global Destinations</span>
                </button>
            </div>
        );
    }

    const isCG = Boolean(destination?.isChhattisgarh || destination?.state === 'Chhattisgarh' || destination?.location?.toLowerCase().includes('chhattisgarh'));
    const isOD = !isCG && Boolean(destination?.isOdisha || destination?.state === 'Odisha' || destination?.location?.toLowerCase().includes('odisha'));
    const isJH = !isCG && !isOD && Boolean(destination?.isJharkhand || destination?.state === 'Jharkhand' || destination?.location?.toLowerCase().includes('jharkhand'));
    const isBihar = !isCG && !isOD && !isJH && Boolean(destination?.isBihar || destination?.state === 'Bihar' || destination?.location?.toLowerCase().includes('bihar'));
    const isWB = !isCG && !isOD && !isJH && !isBihar && Boolean(destination?.isWestBengal || destination?.state === 'West Bengal' || destination?.location?.toLowerCase().includes('west bengal'));
    const isAssam = !isCG && !isOD && !isJH && !isBihar && !isWB && Boolean(destination?.isAssam || destination?.state === 'Assam' || destination?.location?.toLowerCase().includes('assam'));
    const isRJ = !isCG && !isOD && !isJH && !isBihar && !isWB && !isAssam && Boolean(destination?.isRajasthan || destination?.state === 'Rajasthan' || destination?.location?.toLowerCase().includes('rajasthan'));
    const isMH = !isCG && !isOD && !isJH && !isBihar && !isWB && !isAssam && !isRJ && Boolean(destination?.isMaharashtra || destination?.state === 'Maharashtra' || destination?.location?.toLowerCase().includes('maharashtra'));
    const isMP = !isCG && !isOD && !isJH && !isBihar && !isWB && !isAssam && !isRJ && !isMH && Boolean(destination?.isMadhyaPradesh || destination?.state === 'Madhya Pradesh' || destination?.location?.toLowerCase().includes('madhya pradesh'));
    const isUP = !isCG && !isOD && !isJH && !isBihar && !isWB && !isAssam && !isRJ && !isMH && !isMP && Boolean(destination?.district || destination?.isUttarPradesh);

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destination.name}, ${destination.location}`)}`;

    // Temperature formatting helper
    const formatTemp = (cVal) => {
        const num = typeof cVal === 'number' ? cVal : parseInt(String(cVal).replace(/[^0-9.-]/g, ''), 10);
        if (isNaN(num)) return cVal;
        return tempUnit === 'C' ? `${num}°C` : `${Math.round((num * 9) / 5 + 32)}°F`;
    };

    const getWeatherIcon = (iconName, size = 18) => {
        switch (iconName) {
            case 'Sun': return <Sun size={size} className="weather-svg sun" />;
            case 'CloudSun': return <CloudSun size={size} className="weather-svg cloudsun" />;
            case 'CloudRain': return <CloudRain size={size} className="weather-svg rain" />;
            case 'Wind': return <Wind size={size} className="weather-svg wind" />;
            default: return <Sun size={size} className="weather-svg sun" />;
        }
    };

    // Budget tier multiplier
    const multiplier = budgetMode === 'budget' ? 0.76 : budgetMode === 'founder' ? 1.55 : 1.0;
    const baseMonthly = parseInt(String(intel.costs.totalEstimated || destination.price || '1450').replace(/[^0-9]/g, ''), 10) || 1450;
    const adjustedMonthly = Math.round(baseMonthly * multiplier);
    const totalStayEstimate = adjustedMonthly * stayMonths;

    const aiConfidence = destination.matchScore ? parseInt(destination.matchScore, 10) : 96;
    const highlights = destination.highlights && destination.highlights.length > 0
        ? destination.highlights
        : ['Digital Nomad Hub', 'Fast Fiber Internet', 'Coworking Culture', 'Vibrant Expat Scene'];

    // Curated Activities & Essential Travel Tips
    const activitiesList = destination.activities && destination.activities.length > 0
        ? destination.activities
        : [
            `Embark on a guided morning cultural expedition across iconic landmarks of ${destination.name}`,
            `Explore historic bazaars, indigenous artisan quarters, and local craft studios`,
            `Visit panoramic landscape viewpoints and nature trails around ${destination.name}`,
            `Sample authentic regional culinary specialties and traditional delicacies`,
            `Connect with verified local guardians and fellow travelers in ${destination.name}`
        ];

    const travelTipsList = destination.travelTips && destination.travelTips.length > 0
        ? destination.travelTips
        : [
            `Optimal visiting window is ${destination.bestSeason || 'October to March'} for pleasant weather and clear visibility.`,
            `Carry sufficient local currency notes for traditional markets, craft haats, and rural transit.`,
            `Pack sturdy walking or trekking shoes suited for exploring stone temple steps and nature paths.`,
            `Transit connections: ${destination.railConnectivity || 'Nearest SECR railhead'} / ${destination.nearestAirport || 'Regional Airport'}.`,
            `Respect local traditions, sacred spaces, and seek permission before photographing in village sanctuaries.`
        ];

    const bestTimeToVisit = destination.bestSeason || 'October to March (Post-monsoon freshness & pleasant winter sunshine)';
    const mustSeeSpots = destination.highlights && destination.highlights.length > 0
        ? destination.highlights
        : [
            `${destination.name} Viewpoint & Natural Formations`,
            `Historic & Cultural Guild Sanctuaries`,
            `Indigenous Artisan Craft Bazaars`
        ];

    const localCuisineDishes = destination.localCuisine
        ? destination.localCuisine.split(',').map(d => d.trim()).filter(Boolean)
        : isAssam
        ? ['Masor Tenga (Tangy Fish Curry)', 'Duck Meat Curry with Ash Gourd', 'Omita Khar (Alkaline Papaya Prep)', 'Pork with Fermented Bamboo Shoot', 'Pitha & Laru Sweets', 'Kaji Nemu Infusions', 'Assam Orthodox Golden Tea', 'Alu Pitika with Mustard Oil']
        : isWB
        ? ['Macher Jhol (Fish Curry)', 'Shorshe Ilish (Hilsa in Mustard)', 'Kosha Mangsho with Luchi', 'Chingri Malai Curry', 'Mishti Doi & Rosogolla', 'Darjeeling Momos & Thukpa', 'Kolkata Biryani with Aloo & Egg', 'Sandesh (Nolen Gur)']
        : isBihar
        ? ['Litti Chokha with Baingan Bharta', 'Sattu Paratha & Sharbat', 'Champaran Ahuna Mutton', 'Silao Ka Khaja (GI Tag)', 'Gaya Tilkut & Anarsa', 'Thekua', 'Makhana Kheer', 'Malpua']
        : isJH
        ? ['Dhuska with Chana Ghugni', 'Litti Chokha with Mustard Tadka', 'Rugra (Wild Sal Mushroom) Curry', 'Chilka Roti', 'Karil (Bamboo Shoot) Fry', 'Deoghar Peda', 'Thekua']
        : isOD
        ? ['Puri Mahaprasad (Abhada)', 'Chhena Poda', 'Dalma', 'Khaja', 'Machha Besara', 'Chhena Gaja']
        : isCG
        ? ['Farra (Steamed Rice Rolls)', 'Chila with Spicy Chutney', 'Dubki Kadi', 'Angakar Roti', 'Bafauri', 'Chaprah Red Ant Chutney']
        : ['Regional Specialty Platters', 'Heritage Breads', 'Traditional Sweets'];

    const toggleActivity = (idx, text) => {
        setCompletedActivities(prev => {
            const next = { ...prev, [idx]: !prev[idx] };
            if (next[idx]) {
                if (addXP) addXP(30);
                addToast(`Completed activity: "${text.slice(0, 32)}..." (+30 XP) ✨`, 'success');
            }
            return next;
        });
    };

    const handleCopyTips = () => {
        const textToCopy = `Travel Tips for ${destination.name} (${destination.location}):\n\n` +
            travelTipsList.map((tip, i) => `${i + 1}. ${tip}`).join('\n') +
            `\n\nBest Season: ${destination.bestSeason || 'Oct – Mar'}\nAirport: ${destination.nearestAirport || 'Regional Airport'}\nRail: ${destination.railConnectivity || 'SECR / Regional Mainline'}`;
        navigator.clipboard?.writeText(textToCopy);
        addToast('Travel tips copied to clipboard! 📋', 'success');
    };

    // Generate neighborhood hubs tailored to the destination
    const neighborhoods = [
        {
            name: `Central ${destination.name} Quarter`,
            vibe: 'Walkable Core · Specialty Cafes · Architecture',
            wifi: `${intel.internet.downloadMbps + 30} Mbps`,
            rent: `$${Math.round(adjustedMonthly * 0.52)}/mo`,
            tag: 'Most Popular'
        },
        {
            name: `${destination.name} Creative & Tech District`,
            vibe: '24/7 Coworking · Startup Studios · Nightlife',
            wifi: `${intel.internet.downloadMbps + 65} Mbps`,
            rent: `$${Math.round(adjustedMonthly * 0.56)}/mo`,
            tag: 'Fastest Fiber'
        },
        {
            name: `Scenic & Quiet Residential Zone`,
            vibe: 'Long-Stay Villas · Wellness · Peaceful Focus',
            wifi: `${intel.internet.downloadMbps} Mbps`,
            rent: `$${Math.round(adjustedMonthly * 0.42)}/mo`,
            tag: 'Best Value'
        }
    ];

    const handleClaimXP = () => {
        if (xpClaimed) return;
        setXpClaimed(true);
        if (addXP) addXP(500);
        addToast(`Claimed +500 XP for exploring ${destination.name}! ⚡`, 'success');
    };

    const handleCompareToggle = () => {
        toggleCompareDestination(destination.id);
        addToast(
            isCompared
                ? `Removed ${destination.name} from comparison`
                : `Added ${destination.name} to Compare Side-by-Side`,
            'info'
        );
    };
    const TABS = [
        { id: 'overview', label: 'Overview & Brief', icon: Compass },
        ...(isAssam ? [{ id: 'district-suite', label: `${destination.district || 'Assam'} District Suite`, icon: Landmark }] : []),
        ...(isWB ? [{ id: 'district-suite', label: `${destination.district || 'West Bengal'} District Suite`, icon: Landmark }] : []),
        ...(isBihar ? [{ id: 'district-suite', label: `${destination.district || 'Bihar'} District Suite`, icon: Landmark }] : []),
        ...(isJH ? [{ id: 'district-suite', label: `${destination.district || 'Jharkhand'} District Suite`, icon: Landmark }] : []),
        ...(isOD ? [{ id: 'district-suite', label: `${destination.district || 'Odisha'} District Suite`, icon: Landmark }] : []),
        ...(isCG ? [{ id: 'district-suite', label: `${destination.district || 'Chhattisgarh'} District Suite`, icon: Landmark }] : []),
        ...(isRJ ? [{ id: 'district-suite', label: `${destination.district || 'Rajasthan'} District Suite`, icon: Landmark }] : []),
        ...(isMH ? [{ id: 'district-suite', label: `${destination.district || 'MH'} District Suite`, icon: Landmark }] : []),
        ...(isMP ? [{ id: 'district-suite', label: `${destination.district || 'MP'} District Suite`, icon: Landmark }] : []),
        ...(isUP ? [{ id: 'district-suite', label: `${destination.district || 'UP'} District Suite`, icon: Landmark }] : []),
        { id: 'activities-tips', label: `Activities & Tips (${activitiesList.length})`, icon: Sparkles },
        { id: 'costs', label: 'Cost of Living', icon: DollarSign },
        { id: 'connectivity', label: 'Wi-Fi & 5G', icon: Wifi },
        { id: 'climate', label: 'Climate & Forecast', icon: Sun },
        { id: 'visa', label: 'Visa & Logistics', icon: ShieldCheck },
        { id: 'community', label: 'Neighborhoods & Vibe', icon: Users }
    ];

    return (
        <div className="dest-expand-page">
            <SEOManager destination={destination} />

            {/* 1. Cinematic Expanded Hero Banner */}
            <section className="dest-expand-hero">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    className="dest-expand-hero-img"
                    priority={true}
                    sizes="100vw"
                />
                <div className="dest-expand-hero-scrim" />

                <div className="dest-expand-hero-inner">
                    {/* Top Navigation & Quick Action Bar */}
                    <div className="dest-expand-top-bar">
                        <button
                            type="button"
                            onClick={() => navigate('/explore/destinations')}
                            className="dest-back-pill-btn"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Destinations</span>
                        </button>

                        <div className="dest-hero-top-actions">
                            <button
                                type="button"
                                className="dest-action-chip primary-compare"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(217, 119, 6, 0.25) 100%)',
                                    borderColor: 'rgba(245, 158, 11, 0.5)',
                                    color: '#fef3c7'
                                }}
                                onClick={() => {
                                    const { stop, dayNumber } = addDestinationToDay(destination);
                                    addToast(`Added "${destination.name}" to Day ${dayNumber} in Trip Itinerary! 📍`, 'success');
                                    navigate('/explore/itinerary-builder');
                                }}
                                title="Add to Day-by-Day Travel Plan"
                            >
                                <Plus size={15} className="text-amber-400" />
                                <span>+ Plan in Trip Itinerary</span>
                            </button>

                            <button
                                type="button"
                                className={`dest-action-chip ${isCompared ? 'active' : ''}`}
                                onClick={handleCompareToggle}
                                title="Compare Side-by-Side"
                            >
                                <ArrowLeftRight size={15} />
                                <span>{isCompared ? 'Selected for Compare' : 'Compare City'}</span>
                            </button>

                            {compareDestinations.length > 0 && (
                                <button
                                    type="button"
                                    className="dest-action-chip primary-compare"
                                    onClick={() => setIsCompareModalOpen(true)}
                                >
                                    <span>Open Compare ({compareDestinations.length})</span>
                                </button>
                            )}

                            <button
                                type="button"
                                className={`dest-action-chip ${isSaved ? 'saved' : ''}`}
                                onClick={() => {
                                    toggleSave(destination);
                                    addToast(
                                        isSaved
                                            ? `Removed ${destination.name} from Favorites`
                                            : `Saved ${destination.name} to My Favorites`,
                                        'success'
                                    );
                                }}
                            >
                                <Heart size={15} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : 'currentColor'} />
                                <span>{isSaved ? 'Saved' : 'Save'}</span>
                            </button>

                            <button
                                type="button"
                                className="dest-action-chip"
                                onClick={() => setShowShareModal(true)}
                            >
                                <Share2 size={15} />
                                <span>Share</span>
                            </button>

                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dest-action-chip"
                                title="Open in Google Maps"
                            >
                                <ExternalLink size={15} />
                                <span>Google Maps</span>
                            </a>
                        </div>
                    </div>

                    {/* Hero Main Title & Editorial Metadata */}
                    <div className="dest-expand-hero-bottom">
                        <div className="dest-hero-title-block">
                            <div className="dest-hero-kicker-row">
                                <span className="dest-kicker-live">
                                    <span className="dest-pulse-dot" />
                                    {destination.liveViewers || '1.4k'} Nomads Active
                                </span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-kicker-text">{destination.category || 'Global Hub'}</span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-kicker-text">{aiConfidence}% Compatibility Match</span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-kicker-domain">
                                    <Globe size={12} />
                                    {domainName} ({domainStatus})
                                </span>
                            </div>

                            <h1 className="dest-expand-title">{destination.name}</h1>

                            <div className="dest-hero-location-line">
                                <MapPin size={16} className="pin-accent" />
                                <span>{destination.location}</span>
                                <span className="dest-kicker-sep">·</span>
                                <span className="dest-rating-inline">
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <strong>{destination.rating || '4.8'}</strong>
                                    <span>({destination.reviewsCount || '142'} verified nomad reviews)</span>
                                </span>
                            </div>

                            {destination?.district && (
                                <div className="dest-hero-up-badges-row">
                                    {isCG && (
                                        <span className="dest-up-badge state" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.28), rgba(4, 120, 87, 0.35))', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#6ee7b7' }}>
                                            <span>🌿 Chhattisgarh</span>
                                        </span>
                                    )}
                                    {isCG && destination.category && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const catParam = destination.category === 'Waterfalls' ? 'waterfalls' : destination.category === 'Wildlife' ? 'wildlife' : destination.category === 'Historical' ? 'historical' : destination.category === 'Spiritual' ? 'spiritual' : destination.category === 'Tribal & Culture' ? 'tribal' : destination.category === 'Nature' ? 'nature' : 'all';
                                                navigate(`/explore?region=cg&category=${catParam}`);
                                            }}
                                            className="dest-up-badge category-link-badge"
                                            style={{
                                                background: destination.category === 'Waterfalls'
                                                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.28), rgba(14, 165, 233, 0.35))'
                                                    : destination.category === 'Wildlife'
                                                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.35))'
                                                    : destination.category === 'Historical'
                                                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.28), rgba(37, 99, 235, 0.35))'
                                                    : destination.category === 'Spiritual'
                                                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(147, 51, 234, 0.35))'
                                                    : destination.category === 'Tribal & Culture'
                                                    ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.28), rgba(180, 83, 9, 0.35))'
                                                    : 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(5, 150, 105, 0.35))',
                                                borderColor: destination.category === 'Waterfalls' ? 'rgba(6, 182, 212, 0.5)' : destination.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.5)' : destination.category === 'Historical' ? 'rgba(59, 130, 246, 0.5)' : destination.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.5)' : destination.category === 'Tribal & Culture' ? 'rgba(217, 119, 6, 0.5)' : 'rgba(16, 185, 129, 0.5)',
                                                color: destination.category === 'Waterfalls' ? '#67e8f9' : destination.category === 'Wildlife' ? '#fcd34d' : destination.category === 'Historical' ? '#93c5fd' : destination.category === 'Spiritual' ? '#d8b4fe' : destination.category === 'Tribal & Culture' ? '#fed7aa' : '#6ee7b7',
                                                cursor: 'pointer'
                                            }}
                                            title={`Explore all Chhattisgarh ${destination.category} destinations`}
                                        >
                                            <span>
                                                {destination.category === 'Waterfalls' ? '🌊 Waterfalls' : destination.category === 'Wildlife' ? '🐾 Wildlife' : destination.category === 'Historical' ? '🏛️ Ancient Shrines' : destination.category === 'Spiritual' ? '🕉️ Shaktipeeth' : destination.category === 'Tribal & Culture' ? '🏺 Tribal Arts' : `✨ ${destination.category}`}
                                            </span>
                                        </button>
                                    )}
                                    {isWB && (
                                        <span className="dest-up-badge state" style={{ background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.28), rgba(153, 27, 27, 0.35))', borderColor: 'rgba(239, 68, 68, 0.5)', color: '#fca5a5' }}>
                                            <span>🐯 West Bengal</span>
                                        </span>
                                    )}
                                    {isWB && destination.category && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate(`/explore?region=wb`);
                                            }}
                                            className="dest-up-badge category-link-badge"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.28), rgba(153, 27, 27, 0.35))',
                                                borderColor: 'rgba(239, 68, 68, 0.5)',
                                                color: '#fecaca',
                                                cursor: 'pointer'
                                            }}
                                            title={`Explore all West Bengal ${destination.category} destinations`}
                                        >
                                            <span>🐯 {destination.category}</span>
                                        </button>
                                    )}
                                    {isAssam && (
                                        <span className="dest-up-badge state" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.28), rgba(4, 120, 87, 0.35))', borderColor: 'rgba(16, 185, 129, 0.5)', color: '#6ee7b7' }}>
                                            <span>🦏 Assam</span>
                                        </span>
                                    )}
                                    {isAssam && destination.category && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const catParam = destination.category === 'Wildlife' ? 'wildlife' : destination.category === 'Tea & Scenic' ? 'tea' : destination.category === 'Heritage' ? 'heritage' : destination.category === 'Spiritual' ? 'spiritual' : destination.category === 'Nature' ? 'nature' : destination.category === 'Handloom & Crafts' ? 'crafts' : 'all';
                                                navigate(`/explore?region=assam&category=${catParam}`);
                                            }}
                                            className="dest-up-badge category-link-badge"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(5, 150, 105, 0.35))',
                                                borderColor: 'rgba(16, 185, 129, 0.5)',
                                                color: '#6ee7b7',
                                                cursor: 'pointer'
                                            }}
                                            title={`Explore all Assam ${destination.category} destinations`}
                                        >
                                            <span>
                                                {destination.category === 'Wildlife' ? '🦏 Wildlife' : destination.category === 'Tea & Scenic' ? '🍃 Tea Trails' : destination.category === 'Heritage' ? '🏛️ Ahom Heritage' : destination.category === 'Spiritual' ? '🛕 Shrines & Satras' : destination.category === 'Nature' ? '🌊 River & Island' : destination.category === 'Handloom & Crafts' ? '🧣 Silk Crafts' : `✨ ${destination.category}`}
                                            </span>
                                        </button>
                                    )}
                                    {isRJ && (
                                        <span className="dest-up-badge state" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.28), rgba(180, 83, 9, 0.35))', borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fde68a' }}>
                                            <span>🐪 Rajasthan</span>
                                        </span>
                                    )}
                                    {isRJ && destination.category && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const catParam = destination.category === 'Wildlife' ? 'wildlife' : destination.category === 'Historical' ? 'historical' : destination.category === 'Desert' ? 'desert' : destination.category === 'Spiritual' ? 'pilgrimage' : destination.category === 'Nature' ? 'nature' : 'all';
                                                navigate(`/explore?region=rj&category=${catParam}`);
                                            }}
                                            className="dest-up-badge category-link-badge"
                                            style={{
                                                background: destination.category === 'Wildlife'
                                                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.35))'
                                                    : destination.category === 'Historical'
                                                    ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.28), rgba(180, 83, 9, 0.35))'
                                                    : destination.category === 'Desert'
                                                    ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.28), rgba(202, 138, 4, 0.35))'
                                                    : destination.category === 'Spiritual'
                                                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(147, 51, 234, 0.35))'
                                                    : destination.category === 'Nature'
                                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(5, 150, 105, 0.35))'
                                                    : 'linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.35))',
                                                borderColor: destination.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.5)' : destination.category === 'Historical' ? 'rgba(217, 119, 6, 0.5)' : destination.category === 'Desert' ? 'rgba(234, 179, 8, 0.5)' : destination.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.5)' : destination.category === 'Nature' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(245, 158, 11, 0.5)',
                                                color: destination.category === 'Wildlife' ? '#fcd34d' : destination.category === 'Historical' ? '#fde68a' : destination.category === 'Desert' ? '#fef08a' : destination.category === 'Spiritual' ? '#d8b4fe' : destination.category === 'Nature' ? '#6ee7b7' : '#fde68a',
                                                cursor: 'pointer'
                                            }}
                                            title={`Explore all Rajasthan ${destination.category === 'Spiritual' ? 'Pilgrimage' : destination.category} destinations`}
                                        >
                                            <span>
                                                {destination.category === 'Wildlife' ? '🐾 Wildlife' : destination.category === 'Historical' ? '🏰 Forts & Palaces' : destination.category === 'Desert' ? '🐪 Thar Desert' : destination.category === 'Spiritual' ? '🕉️ Pilgrimage' : destination.category === 'Nature' ? '⛰️ Lakes & Hills' : `✨ ${destination.category}`}
                                            </span>
                                        </button>
                                    )}
                                    {isMH && (
                                        <span className="dest-up-badge state" style={{ background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.28), rgba(194, 65, 12, 0.35))', borderColor: 'rgba(249, 115, 22, 0.5)', color: '#fed7aa' }}>
                                            <span>🚩 Maharashtra</span>
                                        </span>
                                    )}
                                    {isMH && destination.category && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const catParam = destination.category === 'Wildlife' ? 'wildlife' : destination.category === 'Historical' ? 'historical' : destination.category === 'Spiritual' ? 'pilgrimage' : destination.category === 'Beach' ? 'beach' : destination.category === 'Nature' ? 'nature' : 'all';
                                                navigate(`/explore?region=mh&category=${catParam}`);
                                            }}
                                            className="dest-up-badge category-link-badge"
                                            style={{
                                                background: destination.category === 'Wildlife'
                                                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.35))'
                                                    : destination.category === 'Historical'
                                                    ? 'linear-gradient(135deg, rgba(234, 88, 12, 0.28), rgba(194, 65, 12, 0.35))'
                                                    : destination.category === 'Spiritual'
                                                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(147, 51, 234, 0.35))'
                                                    : destination.category === 'Beach'
                                                    ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(2, 132, 199, 0.35))'
                                                    : destination.category === 'Nature'
                                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(5, 150, 105, 0.35))'
                                                    : 'linear-gradient(135deg, rgba(249, 115, 22, 0.28), rgba(234, 88, 12, 0.35))',
                                                borderColor: destination.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.5)' : destination.category === 'Historical' ? 'rgba(234, 88, 12, 0.5)' : destination.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.5)' : destination.category === 'Beach' ? 'rgba(14, 165, 233, 0.5)' : destination.category === 'Nature' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(249, 115, 22, 0.5)',
                                                color: destination.category === 'Wildlife' ? '#fcd34d' : destination.category === 'Historical' ? '#fdba74' : destination.category === 'Spiritual' ? '#d8b4fe' : destination.category === 'Beach' ? '#7dd3fc' : destination.category === 'Nature' ? '#6ee7b7' : '#fed7aa',
                                                cursor: 'pointer'
                                            }}
                                            title={`Explore all Maharashtra ${destination.category === 'Spiritual' ? 'Pilgrimage' : destination.category} destinations`}
                                        >
                                            <span>
                                                {destination.category === 'Wildlife' ? '🐾 Wildlife' : destination.category === 'Historical' ? '🚩 Forts & Heritage' : destination.category === 'Spiritual' ? '🕉️ Pilgrimage' : destination.category === 'Beach' ? '🏖️ Konkan Beach' : destination.category === 'Nature' ? '⛰️ Western Ghats' : `✨ ${destination.category}`}
                                            </span>
                                        </button>
                                    )}
                                    {isMP && (
                                        <span className="dest-up-badge state" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(5, 150, 105, 0.35))', borderColor: 'rgba(52, 211, 153, 0.5)', color: '#6ee7b7' }}>
                                            <span>🐅 Madhya Pradesh</span>
                                        </span>
                                    )}
                                    {isMP && destination.category && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const catParam = destination.category === 'Wildlife' ? 'wildlife' : destination.category === 'Historical' ? 'historical' : destination.category === 'Spiritual' ? 'pilgrimage' : 'all';
                                                navigate(`/explore?region=mp&category=${catParam}`);
                                            }}
                                            className="dest-up-badge category-link-badge"
                                            style={{
                                                background: destination.category === 'Wildlife'
                                                    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.35))'
                                                    : destination.category === 'Historical'
                                                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.28), rgba(37, 99, 235, 0.35))'
                                                    : destination.category === 'Spiritual'
                                                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(147, 51, 234, 0.35))'
                                                    : 'linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(5, 150, 105, 0.35))',
                                                borderColor: destination.category === 'Wildlife' ? 'rgba(245, 158, 11, 0.5)' : destination.category === 'Historical' ? 'rgba(59, 130, 246, 0.5)' : destination.category === 'Spiritual' ? 'rgba(168, 85, 247, 0.5)' : 'rgba(52, 211, 153, 0.5)',
                                                color: destination.category === 'Wildlife' ? '#fcd34d' : destination.category === 'Historical' ? '#93c5fd' : destination.category === 'Spiritual' ? '#d8b4fe' : '#6ee7b7',
                                                cursor: 'pointer'
                                            }}
                                            title={`Explore all Madhya Pradesh ${destination.category === 'Spiritual' ? 'Pilgrimage' : destination.category} destinations`}
                                        >
                                            <span>
                                                {destination.category === 'Wildlife' ? '🐾 Wildlife' : destination.category === 'Historical' ? '🏛️ Historical' : destination.category === 'Spiritual' ? '🕉️ Pilgrimage' : `✨ ${destination.category}`}
                                            </span>
                                        </button>
                                    )}
                                    <span className="dest-up-badge district">
                                        <MapPin size={12} className="text-amber-400" />
                                        <span>{destination.district} District</span>
                                    </span>
                                    {destination.division && (
                                        <span className="dest-up-badge division">
                                            <span>{destination.division} Division</span>
                                        </span>
                                    )}
                                    {destination.cgCircuit && (
                                        <span className="dest-up-badge circuit" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(4, 120, 87, 0.28))', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#6ee7b7' }}>
                                            <span>🌿 {destination.cgCircuit}</span>
                                        </span>
                                    )}
                                    {destination.wbCircuit && (
                                        <span className="dest-up-badge circuit" style={{ background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.22), rgba(153, 27, 27, 0.28))', borderColor: 'rgba(239, 68, 68, 0.45)', color: '#fca5a5' }}>
                                            <span>🐯 {destination.wbCircuit}</span>
                                        </span>
                                    )}
                                    {destination.assamCircuit && (
                                        <span className="dest-up-badge circuit" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(4, 120, 87, 0.28))', borderColor: 'rgba(16, 185, 129, 0.45)', color: '#6ee7b7' }}>
                                            <span>🦏 {destination.assamCircuit}</span>
                                        </span>
                                    )}
                                    {destination.rjCircuit && (
                                        <span className="dest-up-badge circuit" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.22), rgba(180, 83, 9, 0.28))', borderColor: 'rgba(245, 158, 11, 0.45)', color: '#fcd34d' }}>
                                            <span>🐪 {destination.rjCircuit}</span>
                                        </span>
                                    )}
                                    {destination.mhCircuit && (
                                        <span className="dest-up-badge circuit" style={{ background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.22), rgba(194, 65, 12, 0.28))', borderColor: 'rgba(249, 115, 22, 0.45)', color: '#fdba74' }}>
                                            <span>🚩 {destination.mhCircuit}</span>
                                        </span>
                                    )}
                                    {destination.mpCircuit && (
                                        <span className="dest-up-badge circuit" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22), rgba(5, 150, 105, 0.28))', borderColor: 'rgba(52, 211, 153, 0.45)', color: '#6ee7b7' }}>
                                            <span>{destination.mpCircuit}</span>
                                        </span>
                                    )}
                                    {destination.upCircuit && (
                                        <span className="dest-up-badge circuit">
                                            <span>{destination.upCircuit}</span>
                                        </span>
                                    )}
                                    {destination.odop && (
                                        <span className="dest-up-badge odop">
                                            <span>ODOP / GI: {destination.odop}</span>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Hero Right: Instant Telemetry Summary Strip */}
                        <div className="dest-hero-quick-metrics">
                            <div className="hero-metric-box">
                                <span className="hm-label">Monthly Living</span>
                                <span className="hm-value">{intel.costs.totalEstimated}<small>/mo</small></span>
                                <span className="hm-sub">{intel.costs.rating}</span>
                            </div>
                            <div className="hero-metric-box">
                                <span className="hm-label">Fiber Download</span>
                                <span className="hm-value">{intel.internet.downloadMbps}<small> Mbps</small></span>
                                <span className="hm-sub">{intel.internet.stabilityScore} Uptime</span>
                            </div>
                            <div className="hero-metric-box">
                                <span className="hm-label">Local Weather</span>
                                <span className="hm-value">{formatTemp(intel.weather.tempC)}</span>
                                <span className="hm-sub">{intel.weather.condition}</span>
                            </div>
                            <div className="hero-metric-box">
                                <span className="hm-label">Safety & Entry</span>
                                <span className="hm-value">{intel.lifestyle.safetyScore}</span>
                                <span className="hm-sub">{destination.visaApprovalRate || '96%'} Visa Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Sticky Interactive Section Switcher Bar */}
            <div className="dest-expand-tabs-shell">
                <div className="dest-expand-tabs-bar" role="tablist" aria-label="Destination Detail Sections">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`dest-expand-tab-btn ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon size={15} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Global Unit & Lifestyle Mode Controls */}
                <div className="dest-expand-quick-toggles">
                    <div className="unit-segmented-toggle" role="group" aria-label="Temperature Unit">
                        <button
                            type="button"
                            className={tempUnit === 'C' ? 'active' : ''}
                            onClick={() => setTempUnit('C')}
                        >
                            °C
                        </button>
                        <button
                            type="button"
                            className={tempUnit === 'F' ? 'active' : ''}
                            onClick={() => setTempUnit('F')}
                        >
                            °F
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Main Two-Column Expanded Intelligence Workspace */}
            <div className="dest-expand-workspace">
                {/* Left Primary Column */}
                <div className="dest-expand-main-col">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="dest-tab-stage"
                        >
                            {/* TAB 1: OVERVIEW & BRIEF (Also shows complete Executive Summary of all metrics) */}
                            {activeTab === 'overview' && (
                                <div className="dest-section-stack">
                                    {/* Executive Summary Card */}
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">01. Executive Brief</span>
                                                <h2 className="dest-section-title">About {destination.name}, {destination.location}</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className={`dest-xp-claim-btn ${xpClaimed ? 'claimed' : ''}`}
                                                onClick={handleClaimXP}
                                            >
                                                <Zap size={14} />
                                                <span>{xpClaimed ? '500 XP Claimed ✓' : 'Claim +500 XP'}</span>
                                            </button>
                                        </div>

                                        <p className="dest-editorial-prose">
                                            {destination.aiInsight || `${destination.name} is a premier ${destination.category.toLowerCase()} destination in ${destination.location}, renowned for its balance of high-output remote work infrastructure, ${intel.internet.downloadMbps} Mbps fiber connectivity, and vibrant international community.`}
                                            {' '}Whether you are planning a 30-day workcation or a multi-month basecamp, {destination.name} delivers reliable coworking ecosystems, {intel.weather.condition.toLowerCase()} weather ({formatTemp(intel.weather.tempC)}), and an estimated monthly living baseline of {intel.costs.totalEstimated}.
                                        </p>

                                        <div className="dest-highlights-inline">
                                            {highlights.map((item, idx) => (
                                                <span key={idx} className="dest-highlight-tag">
                                                    <CheckCircle2 size={13} className="tag-check" />
                                                    <span>{item}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CORE PILLARS: Best time to visit, Must-see spots, and Local cuisine */}
                                    <div className="dest-core-three-pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', margin: '1rem 0' }}>
                                        {/* 1. Best Time to Visit */}
                                        <div style={{ background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(6, 78, 99, 0.22) 100%)', border: '1px solid rgba(6, 182, 212, 0.35)', borderRadius: '14px', padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '1.2rem' }}>☀️</span>
                                                <div>
                                                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#67e8f9', fontWeight: 700, display: 'block' }}>
                                                        Optimal Season
                                                    </span>
                                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                                                        Best Time to Visit
                                                    </h4>
                                                </div>
                                            </div>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '0.92rem', fontWeight: 700, color: '#a5f3fc' }}>
                                                🗓️ {bestTimeToVisit}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                                                {isAssam
                                                    ? 'November to April brings crisp skies, comfortable sunshine for Kaziranga & Manas wildlife safaris, and calm scenic Brahmaputra river voyages.'
                                                    : isWB
                                                    ? 'October to March brings crisp misty mountain mornings in North Bengal and pleasant breezes across the Gangetic delta & coastal estuaries.'
                                                    : isCG
                                                    ? 'Monsoons (Jul–Oct) bring roaring cascading torrents, while winters (Nov–Feb) offer crystal-clear waters, pleasant sun, and vibrant tribal haats.'
                                                    : 'Mild temperatures and optimal visibility make this the premier window for sightseeing and outdoor exploration.'}
                                            </p>
                                        </div>

                                        {/* 2. Must-See Spots */}
                                        <div style={{ background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(120, 53, 15, 0.22) 100%)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '14px', padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '1.2rem' }}>✨</span>
                                                <div>
                                                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#fcd34d', fontWeight: 700, display: 'block' }}>
                                                        Iconic Landmarks
                                                    </span>
                                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                                                        Must-See Spots
                                                    </h4>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                {mustSeeSpots.slice(0, 3).map((spot, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.2)', padding: '1px 5px', borderRadius: '4px', marginTop: '1px' }}>
                                                            #{i + 1}
                                                        </span>
                                                        <span style={{ fontSize: '0.82rem', color: '#f1f5f9', lineHeight: '1.4' }}>{spot}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 3. Local Cuisine */}
                                        <div style={{ background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(4, 120, 87, 0.22) 100%)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '14px', padding: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <span style={{ fontSize: '1.2rem' }}>🍲</span>
                                                <div>
                                                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6ee7b7', fontWeight: 700, display: 'block' }}>
                                                        Gastronomy & Fare
                                                    </span>
                                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                                                        Local Cuisine
                                                    </h4>
                                                </div>
                                            </div>
                                            <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: '#cbd5e1' }}>
                                                {isAssam ? 'Assamese Brahmaputra valley specialties & aromatic herbs:' : isCG ? 'Chhattisgarhi Rice Bowl delicacies & forest savories:' : 'Authentic local flavors & signature recipes:'}
                                            </p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                {localCuisineDishes.slice(0, 4).map((dish, i) => (
                                                    <span key={i} style={{ fontSize: '0.74rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#6ee7b7', padding: '2px 7px', borderRadius: '9999px', fontWeight: 600 }}>
                                                        {dish}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 6-Metric Complete Telemetry Grid */}
                                    <div className="dest-kpi-matrix-grid">
                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('connectivity')}>
                                            <div className="kpi-tile-top">
                                                <Wifi size={18} className="kpi-icon sky" />
                                                <span className="kpi-status-text">{intel.internet.stabilityScore} Stable</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.internet.downloadMbps} Mbps</div>
                                            <div className="kpi-tile-label">Fiber Download ({intel.internet.pingMs}ms ping)</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('costs')}>
                                            <div className="kpi-tile-top">
                                                <DollarSign size={18} className="kpi-icon emerald" />
                                                <span className="kpi-status-text">{intel.costs.rating}</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.costs.totalEstimated}/mo</div>
                                            <div className="kpi-tile-label">All-Inclusive Nomad Baseline</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('climate')}>
                                            <div className="kpi-tile-top">
                                                {getWeatherIcon(intel.weather.conditionIcon, 18)}
                                                <span className="kpi-status-text">Humidity {intel.weather.humidity}</span>
                                            </div>
                                            <div className="kpi-tile-val">{formatTemp(intel.weather.tempC)}</div>
                                            <div className="kpi-tile-label">{intel.weather.condition}</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('visa')}>
                                            <div className="kpi-tile-top">
                                                <Shield size={18} className="kpi-icon indigo" />
                                                <span className="kpi-status-text">Verified 2026</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.lifestyle.safetyScore}</div>
                                            <div className="kpi-tile-label">Safety & Walkability Index</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('visa')}>
                                            <div className="kpi-tile-top">
                                                <Globe size={18} className="kpi-icon teal" />
                                                <span className="kpi-status-text">{destination.visaApprovalRate || '96%'} Approval</span>
                                            </div>
                                            <div className="kpi-tile-val">{destination.visaFriendly ? 'Visa-Friendly' : 'Standard Visa'}</div>
                                            <div className="kpi-tile-label">{intel.lifestyle.visaStatus}</div>
                                        </div>

                                        <div className="dest-kpi-tile" onClick={() => setActiveTab('community')}>
                                            <div className="kpi-tile-top">
                                                <Users size={18} className="kpi-icon amber" />
                                                <span className="kpi-status-text">Active Hub</span>
                                            </div>
                                            <div className="kpi-tile-val">{intel.lifestyle.nomadCommunity.split(' ')[0]}</div>
                                            <div className="kpi-tile-label">{intel.lifestyle.nomadCommunity}</div>
                                        </div>
                                    </div>

                                    {/* Quick Preview of Cost Breakdown + Top Coworking Spaces on Overview */}
                                    <div className="dest-dual-preview-grid">
                                        <div className="dest-panel-card">
                                            <div className="dest-panel-header compact">
                                                <div>
                                                    <span className="dest-section-eyebrow">02. Monthly Budget Snapshot</span>
                                                    <h3 className="dest-subsection-title">Living Cost Breakdown</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="dest-text-link-btn"
                                                    onClick={() => setActiveTab('costs')}
                                                >
                                                    Full Calculator →
                                                </button>
                                            </div>
                                            <div className="dest-mini-list">
                                                {intel.costs.breakdown.slice(0, 4).map((item, i) => (
                                                    <div key={i} className="dest-mini-row">
                                                        <div className="mini-row-left">
                                                            <span className="mini-row-title">{item.category}</span>
                                                            <span className="mini-row-note">{item.note}</span>
                                                        </div>
                                                        <span className="mini-row-amount">{item.amount}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="dest-panel-card">
                                            <div className="dest-panel-header compact">
                                                <div>
                                                    <span className="dest-section-eyebrow">03. Verified Workspaces</span>
                                                    <h3 className="dest-subsection-title">Top Coworking Hubs</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="dest-text-link-btn"
                                                    onClick={() => setActiveTab('connectivity')}
                                                >
                                                    Speed Telemetry →
                                                </button>
                                            </div>
                                            <div className="dest-mini-list">
                                                {intel.internet.topCoworking.map((cw, i) => (
                                                    <div key={i} className="dest-mini-row">
                                                        <div className="mini-row-left">
                                                            <span className="mini-row-title">{cw.name}</span>
                                                            <span className="mini-row-note">Verified Dual-Fiber · {cw.speed}</span>
                                                        </div>
                                                        <span className="mini-row-amount">{cw.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                        {/* Curated Activities & Essential Travel Tips Showcase on Overview */}
                                        <div className="dest-panel-card dest-activities-preview-card" style={{ borderColor: isAssam ? 'rgba(16, 185, 129, 0.35)' : isWB ? 'rgba(239, 68, 68, 0.35)' : isCG ? 'rgba(16, 185, 129, 0.35)' : 'rgba(56, 189, 248, 0.25)', marginTop: '1.25rem' }}>
                                            <div className="dest-panel-header">
                                                <div>
                                                    <span className="dest-section-eyebrow" style={{ color: isAssam ? '#6ee7b7' : isWB ? '#fca5a5' : isCG ? '#6ee7b7' : '#38bdf8' }}>
                                                        {isAssam ? '🦏 Assam Wildlife & Heritage Highlights' : isWB ? '🐯 West Bengal Heritage & Highlights' : isCG ? '🌿 Chhattisgarh Tourism Highlights' : 'Curated Exploration & Field Advisory'}
                                                    </span>
                                                    <h3 className="dest-section-title">
                                                        Activities & Travel Tips for {destination.name}
                                                    </h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="dest-text-link-btn"
                                                    onClick={() => setActiveTab('activities-tips')}
                                                    style={{ color: isAssam ? '#6ee7b7' : isWB ? '#fca5a5' : isCG ? '#6ee7b7' : '#38bdf8' }}
                                                >
                                                    Full Guide ({activitiesList.length} Activities · {travelTipsList.length} Tips) →
                                                </button>
                                            </div>

                                            <div className="dest-preview-split-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px', marginTop: '14px' }}>
                                                {/* Top Activities Preview */}
                                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <Sparkles size={14} color="#10b981" /> Curated Activities
                                                        </span>
                                                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                                                            {activitiesList.length} Available
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        {activitiesList.slice(0, 3).map((act, i) => (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', minWidth: '22px', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 5px', borderRadius: '4px', textAlign: 'center' }}>
                                                                    #{i + 1}
                                                                </span>
                                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                                                                    {act}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Top Travel Tips Preview */}
                                                <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <ShieldCheck size={14} color="#38bdf8" /> Essential Travel Advisory
                                                        </span>
                                                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                                                            {travelTipsList.length} Verified Tips
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        {travelTipsList.slice(0, 2).map((tip, i) => (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                                                <span style={{ fontSize: '0.85rem' }}>💡</span>
                                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                                                                    {tip}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dedicated Assam, West Bengal, Bihar, Jharkhand, Odisha, Chhattisgarh, Rajasthan, Maharashtra, Madhya Pradesh or Uttar Pradesh District Intelligence Suite */}
                                        {isAssam && (
                                            <AssamDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isWB && (
                                            <WBDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isBihar && (
                                            <BiharDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isJH && (
                                            <JHDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isOD && (
                                            <ODDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isCG && (
                                            <CGDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isRJ && (
                                            <RJDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isMH && (
                                            <MHDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isMP && (
                                            <MPDistrictIntelligenceSuite destination={destination} />
                                        )}
                                        {isUP && (
                                            <UPDistrictIntelligenceSuite destination={destination} />
                                        )}
                                    </div>
                                )}

                                {/* TAB: DISTRICT SUITE & HERITAGE WORKSPACE */}
                                {activeTab === 'district-suite' && (
                                    <div className="dest-section-stack">
                                        {isAssam && <AssamDistrictIntelligenceSuite destination={destination} />}
                                        {isWB && <WBDistrictIntelligenceSuite destination={destination} />}
                                        {isBihar && <BiharDistrictIntelligenceSuite destination={destination} />}
                                        {isJH && <JHDistrictIntelligenceSuite destination={destination} />}
                                        {isOD && <ODDistrictIntelligenceSuite destination={destination} />}
                                        {isCG && <CGDistrictIntelligenceSuite destination={destination} />}
                                        {isRJ && <RJDistrictIntelligenceSuite destination={destination} />}
                                        {isMH && <MHDistrictIntelligenceSuite destination={destination} />}
                                        {isMP && <MPDistrictIntelligenceSuite destination={destination} />}
                                        {isUP && <UPDistrictIntelligenceSuite destination={destination} />}
                                    </div>
                                )}

                                {/* TAB: CURATED ACTIVITIES & ESSENTIAL TRAVEL TIPS */}
                                {activeTab === 'activities-tips' && (
                                    <div className="dest-section-stack">
                                        {/* Header Banner */}
                                        <div className="dest-panel-card" style={{ borderColor: isAssam ? 'rgba(16, 185, 129, 0.45)' : isWB ? 'rgba(239, 68, 68, 0.45)' : isCG ? 'rgba(16, 185, 129, 0.45)' : 'rgba(56, 189, 248, 0.35)', background: isAssam ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.15) 0%, rgba(4, 120, 87, 0.22) 100%)' : isWB ? 'linear-gradient(135deg, rgba(185, 28, 28, 0.12) 0%, rgba(153, 27, 27, 0.2) 100%)' : isCG ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.12) 0%, rgba(4, 120, 87, 0.2) 100%)' : 'rgba(15, 23, 42, 0.7)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                                                <div>
                                                    <span className="dest-section-eyebrow" style={{ color: isAssam ? '#6ee7b7' : isWB ? '#fca5a5' : isCG ? '#6ee7b7' : '#38bdf8' }}>
                                                        {isAssam ? `🦏 Assam Tourism · ${destination.district || 'Kamrup'} District` : isWB ? `🐯 West Bengal Tourism · ${destination.district || 'Kolkata'} District` : isCG ? `🌿 Chhattisgarh Tourism · ${destination.district || 'Bastar'} District` : `Travel Intelligence Hub · ${destination.location}`}
                                                    </span>
                                                    <h2 className="dest-section-title" style={{ margin: '4px 0 6px 0' }}>
                                                        Curated Activities & Essential Travel Tips for {destination.name}
                                                    </h2>
                                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>
                                                        {activitiesList.length} Handpicked Experiences · {travelTipsList.length} Verified Field Tips · Circuit: {destination.assamCircuit || destination.wbCircuit || destination.cgCircuit || destination.upCircuit || destination.rjCircuit || destination.category}
                                                    </p>
                                                </div>

                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <button
                                                        type="button"
                                                        onClick={handleCopyTips}
                                                        className="dest-secondary-btn"
                                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                                    >
                                                        <Copy size={14} />
                                                        <span>Copy Travel Tips</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 1. Activities Grid */}
                                        <div className="dest-panel-card">
                                            <div className="dest-panel-header">
                                                <div>
                                                    <span className="dest-section-eyebrow" style={{ color: '#10b981' }}>01. Field Experiences</span>
                                                    <h3 className="dest-section-title">Curated Activities & Things to Do</h3>
                                                </div>
                                                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                                    Check off completed activities (+30 XP) or plan them in your itinerary
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                                                {activitiesList.map((act, idx) => {
                                                    const isDone = Boolean(completedActivities[idx]);
                                                    return (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'flex-start',
                                                                justifyContent: 'space-between',
                                                                gap: '16px',
                                                                padding: '16px 18px',
                                                                background: isDone ? 'rgba(5, 150, 105, 0.16)' : 'rgba(15, 23, 42, 0.65)',
                                                                border: `1px solid ${isDone ? '#10b981' : 'rgba(255, 255, 255, 0.08)'}`,
                                                                borderRadius: '12px',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                                                                <span
                                                                    style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        minWidth: '32px',
                                                                        height: '32px',
                                                                        borderRadius: '8px',
                                                                        background: isDone ? '#10b981' : 'rgba(16, 185, 129, 0.16)',
                                                                        color: isDone ? '#ffffff' : '#6ee7b7',
                                                                        fontSize: '0.82rem',
                                                                        fontWeight: 700
                                                                    }}
                                                                >
                                                                    #{String(idx + 1).padStart(2, '0')}
                                                                </span>
                                                                <div>
                                                                    <p style={{ margin: 0, fontSize: '0.96rem', lineHeight: '1.5', color: isDone ? '#a7f3d0' : '#f8fafc', fontWeight: 500, textDecoration: isDone ? 'line-through' : 'none' }}>
                                                                        {act}
                                                                    </p>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                                                                        <span style={{ fontSize: '0.72rem', color: '#6ee7b7', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                                                                            ✨ {destination.category || 'Adventure'}
                                                                        </span>
                                                                        {destination.district && (
                                                                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                                                                📍 {destination.district} District
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const { dayNumber } = addDestinationToDay(destination, null, 'Morning', act);
                                                                        addToast(`Added activity to Day ${dayNumber} in Trip Plan! 📍`, 'success');
                                                                    }}
                                                                    style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: '5px',
                                                                        padding: '7px 12px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 600,
                                                                        background: 'rgba(245, 158, 11, 0.18)',
                                                                        border: '1px solid rgba(245, 158, 11, 0.4)',
                                                                        color: '#fbbf24',
                                                                        borderRadius: '8px',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    title="Add this activity to your Nomad Day Plan"
                                                                >
                                                                    <Plus size={13} />
                                                                    <span>Plan Stop</span>
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleActivity(idx, act)}
                                                                    style={{
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        gap: '5px',
                                                                        padding: '7px 12px',
                                                                        fontSize: '0.78rem',
                                                                        fontWeight: 600,
                                                                        background: isDone ? '#10b981' : 'rgba(255, 255, 255, 0.06)',
                                                                        border: `1px solid ${isDone ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                                                                        color: isDone ? '#ffffff' : '#cbd5e1',
                                                                        borderRadius: '8px',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                >
                                                                    <CheckCircle2 size={13} />
                                                                    <span>{isDone ? 'Completed ✓' : 'Complete (+30 XP)'}</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* 2. Travel Tips & Advisory Hub */}
                                        <div className="dest-panel-card">
                                            <div className="dest-panel-header">
                                                <div>
                                                    <span className="dest-section-eyebrow" style={{ color: '#38bdf8' }}>02. Field Advisory</span>
                                                    <h3 className="dest-section-title">Essential Travel Tips & Logistics</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleCopyTips}
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        padding: '6px 12px',
                                                        fontSize: '0.78rem',
                                                        fontWeight: 600,
                                                        background: 'rgba(56, 189, 248, 0.15)',
                                                        border: '1px solid rgba(56, 189, 248, 0.35)',
                                                        color: '#38bdf8',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Copy size={13} />
                                                    <span>Copy All Tips</span>
                                                </button>
                                            </div>

                                            {/* Seasonal Advisory Banner */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '14px',
                                                padding: '16px 20px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.22) 100%)',
                                                border: '1px solid rgba(6, 182, 212, 0.35)',
                                                marginTop: '16px',
                                                marginBottom: '16px'
                                            }}>
                                                <Sun size={24} className="text-cyan-400" />
                                                <div style={{ flex: 1 }}>
                                                    <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#67e8f9', fontWeight: 700, display: 'block' }}>
                                                        Recommended Travel Window
                                                    </span>
                                                    <strong style={{ color: '#ffffff', fontSize: '1rem' }}>
                                                        {destination.bestSeason || 'October to March (Ideal weather for exploration & sightseeing)'}
                                                    </strong>
                                                </div>
                                            </div>

                                            {/* Transit Quick Matrix */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                                                {destination.nearestAirport && (
                                                    <div style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
                                                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>✈️ Airport Gateway</span>
                                                        <strong style={{ fontSize: '0.88rem', color: '#f1f5f9' }}>{destination.nearestAirport}</strong>
                                                    </div>
                                                )}
                                                {destination.railConnectivity && (
                                                    <div style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
                                                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>🚆 Rail Mainline</span>
                                                        <strong style={{ fontSize: '0.88rem', color: '#f1f5f9' }}>{destination.railConnectivity}</strong>
                                                    </div>
                                                )}
                                                {destination.localCuisine && (
                                                    <div style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
                                                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>🍲 Must-Taste Cuisine</span>
                                                        <strong style={{ fontSize: '0.88rem', color: '#f1f5f9' }}>{destination.localCuisine}</strong>
                                                    </div>
                                                )}
                                                {destination.odop && (
                                                    <div style={{ padding: '14px', background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
                                                        <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>🏺 ODOP / Local Craft</span>
                                                        <strong style={{ fontSize: '0.88rem', color: '#f1f5f9' }}>{destination.odop}</strong>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Tips Cards */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
                                                {travelTipsList.map((tip, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            display: 'flex',
                                                            gap: '12px',
                                                            padding: '16px',
                                                            background: 'rgba(15, 23, 42, 0.7)',
                                                            border: '1px solid rgba(255, 255, 255, 0.08)',
                                                            borderRadius: '12px'
                                                        }}
                                                    >
                                                        <div style={{
                                                            width: '28px',
                                                            height: '28px',
                                                            borderRadius: '8px',
                                                            background: 'rgba(56, 189, 248, 0.15)',
                                                            color: '#38bdf8',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexShrink: 0,
                                                            fontSize: '0.78rem',
                                                            fontWeight: 700
                                                        }}>
                                                            💡
                                                        </div>
                                                        <div>
                                                            <h5 style={{ margin: '0 0 6px 0', fontSize: '0.86rem', fontWeight: 700, color: '#38bdf8' }}>
                                                                Tip #{idx + 1}
                                                            </h5>
                                                            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', color: '#e2e8f0' }}>
                                                                {tip}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            {/* TAB 2: COST OF LIVING & INTERACTIVE BUDGET SIMULATOR */}
                            {activeTab === 'costs' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Interactive Cost Simulator</span>
                                                <h2 className="dest-section-title">Cost of Living in {destination.name}</h2>
                                            </div>
                                            <div className="dest-budget-tier-pills" role="group" aria-label="Lifestyle Tier">
                                                {[
                                                    { id: 'budget', label: 'Backpacker / Lean' },
                                                    { id: 'nomad', label: 'Standard Nomad' },
                                                    { id: 'founder', label: 'Executive / Luxury' }
                                                ].map((tier) => (
                                                    <button
                                                        key={tier.id}
                                                        type="button"
                                                        className={`budget-tier-btn ${budgetMode === tier.id ? 'active' : ''}`}
                                                        onClick={() => setBudgetMode(tier.id)}
                                                    >
                                                        {tier.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="dest-cost-summary-banner">
                                            <div className="cost-banner-main">
                                                <span className="cost-banner-label">Estimated Monthly Total ({budgetMode.toUpperCase()})</span>
                                                <div className="cost-banner-price">
                                                    ${adjustedMonthly.toLocaleString()}
                                                    <span>/ month (USD)</span>
                                                </div>
                                            </div>
                                            <div className="cost-banner-trend">
                                                <span className={`trend-indicator ${intel.costs.trend?.direction || 'stable'}`}>
                                                    {intel.costs.trend?.direction === 'falling' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                                                    {intel.costs.trend?.change || '+0.5%'} ({intel.costs.trend?.period || 'QoQ'})
                                                </span>
                                                <p className="trend-desc">{intel.costs.trend?.description}</p>
                                            </div>
                                        </div>

                                        <div className="dest-cost-breakdown-table">
                                            {intel.costs.breakdown.map((item, idx) => {
                                                const rawNum = parseFloat(String(item.amount).replace(/[^0-9.]/g, '')) || 0;
                                                const suffix = item.amount.includes('/cup') ? '/cup' : '/mo';
                                                const scaledVal = suffix === '/cup'
                                                    ? `$${(rawNum * (budgetMode === 'budget' ? 0.85 : budgetMode === 'founder' ? 1.35 : 1)).toFixed(2)}${suffix}`
                                                    : `$${Math.round(rawNum * multiplier).toLocaleString()}${suffix}`;

                                                return (
                                                    <div key={idx} className="cost-table-row">
                                                        <div className="cost-row-info">
                                                            <span className="cost-row-cat">{item.category}</span>
                                                            <span className="cost-row-note">{item.note}</span>
                                                        </div>
                                                        <div className="cost-row-right">
                                                            {item.trend && (
                                                                <span className={`cost-micro-trend ${item.trend.direction}`}>
                                                                    {item.trend.change} · {item.trend.label}
                                                                </span>
                                                            )}
                                                            <span className="cost-row-val">{scaledVal}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: WI-FI, FIBER & COWORKING INFRASTRUCTURE */}
                            {activeTab === 'connectivity' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Remote Work Infrastructure</span>
                                                <h2 className="dest-section-title">Fiber Speeds, 5G & Coworking Hubs</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className="dest-secondary-btn"
                                                onClick={() => navigate('/explore/speed-test')}
                                            >
                                                <Wifi size={14} />
                                                <span>Open Wi-Fi Speed Map</span>
                                            </button>
                                        </div>

                                        <div className="dest-net-telemetry-row">
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Avg Fiber Download</span>
                                                <span className="net-stat-val">{intel.internet.downloadMbps} <small>Mbps</small></span>
                                            </div>
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Avg Fiber Upload</span>
                                                <span className="net-stat-val">{intel.internet.uploadMbps} <small>Mbps</small></span>
                                            </div>
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Network Latency</span>
                                                <span className="net-stat-val">{intel.internet.pingMs} <small>ms</small></span>
                                            </div>
                                            <div className="net-stat-box">
                                                <span className="net-stat-label">Power & Line Uptime</span>
                                                <span className="net-stat-val">{intel.internet.stabilityScore}</span>
                                            </div>
                                        </div>

                                        <h3 className="dest-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.85rem' }}>
                                            Verified Coworking & Coliving Spaces in {destination.name}
                                        </h3>
                                        <div className="dest-cowork-cards-grid">
                                            {intel.internet.topCoworking.map((space, idx) => (
                                                <div key={idx} className="dest-cowork-card">
                                                    <div className="cowork-card-top">
                                                        <Building2 size={18} className="cowork-icon" />
                                                        <span className="cowork-speed-tag">{space.speed}</span>
                                                    </div>
                                                    <h4 className="cowork-name">{space.name}</h4>
                                                    <p className="cowork-meta">Ergonomic chairs · 24/7 Biometric Access · Soundproof Zoom Pods</p>
                                                    <div className="cowork-footer">
                                                        <span className="cowork-price">{space.price}</span>
                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${space.name} ${destination.name}`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="cowork-map-link"
                                                        >
                                                            <span>Locate</span>
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 4: CLIMATE, SEASONALITY & 5-DAY FORECAST */}
                            {activeTab === 'climate' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Meteorological & Seasonal Guide</span>
                                                <h2 className="dest-section-title">Weather & Best Months to Visit {destination.name}</h2>
                                            </div>
                                            <span className="dest-season-badge">
                                                <Calendar size={14} />
                                                <span>Peak Season: {intel.weather.bestSeason}</span>
                                            </span>
                                        </div>

                                        <div className="dest-weather-hero-strip">
                                            <div className="weather-now-main">
                                                {getWeatherIcon(intel.weather.conditionIcon, 36)}
                                                <div>
                                                    <div className="weather-now-temp">{formatTemp(intel.weather.tempC)}</div>
                                                    <div className="weather-now-cond">{intel.weather.condition}</div>
                                                </div>
                                            </div>
                                            <div className="weather-now-details">
                                                <div>
                                                    <span>High / Low</span>
                                                    <strong>{formatTemp(intel.weather.highC)} / {formatTemp(intel.weather.lowC)}</strong>
                                                </div>
                                                <div>
                                                    <span>Humidity</span>
                                                    <strong>{intel.weather.humidity}</strong>
                                                </div>
                                                <div>
                                                    <span>UV Index</span>
                                                    <strong>{intel.weather.uvIndex}</strong>
                                                </div>
                                                <div>
                                                    <span>Rain Probability</span>
                                                    <strong>{intel.weather.rainChance}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="dest-subsection-title" style={{ marginTop: '1.5rem', marginBottom: '0.85rem' }}>
                                            5-Day Local Outlook
                                        </h3>
                                        <div className="dest-forecast-grid">
                                            {intel.weather.forecast.map((dayItem, idx) => (
                                                <div key={idx} className="dest-forecast-day-card">
                                                    <span className="fc-day">{dayItem.day}</span>
                                                    {getWeatherIcon(dayItem.icon, 22)}
                                                    <span className="fc-temp">{formatTemp(dayItem.temp)}</span>
                                                    <span className="fc-cond">{dayItem.condition}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 5: VISA, SAFETY & ENTRY LOGISTICS */}
                            {activeTab === 'visa' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Border & Legal Telemetry</span>
                                                <h2 className="dest-section-title">Visa Guidelines, Safety & Local Logistics</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className="dest-secondary-btn"
                                                onClick={() => navigate('/explore/visa')}
                                            >
                                                <Shield size={14} />
                                                <span>Open Visa Intelligence Hub</span>
                                            </button>
                                        </div>

                                        <div className="dest-logistics-grid">
                                            <div className="dest-logistic-item">
                                                <ShieldCheck size={20} className="log-icon emerald" />
                                                <div>
                                                    <h4>Visa & Remote Work Pathway</h4>
                                                    <p>{intel.lifestyle.visaStatus}</p>
                                                    <span className="log-meta">Approval Confidence: {destination.visaApprovalRate || '96%'}</span>
                                                </div>
                                            </div>
                                            <div className="dest-logistic-item">
                                                <Shield size={20} className="log-icon sky" />
                                                <div>
                                                    <h4>Safety & Urban Security</h4>
                                                    <p>Safety Index: {intel.lifestyle.safetyScore}</p>
                                                    <span className="log-meta">Solo traveler & night-walk vetted</span>
                                                </div>
                                            </div>
                                            <div className="dest-logistic-item">
                                                <Navigation size={20} className="log-icon purple" />
                                                <div>
                                                    <h4>Walkability & Transit</h4>
                                                    <p>{intel.lifestyle.walkability}</p>
                                                    <span className="log-meta">Ride-hailing, metro & micro-mobility active</span>
                                                </div>
                                            </div>
                                            <div className="dest-logistic-item">
                                                <Smartphone size={20} className="log-icon amber" />
                                                <div>
                                                    <h4>eSIM & Mobile Connectivity</h4>
                                                    <p>{intel.internet.mobileCoverage}</p>
                                                    <span className="log-meta">Instant airport & digital eSIM provisioning</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 6: NEIGHBORHOODS & NOMAD COMMUNITY */}
                            {activeTab === 'community' && (
                                <div className="dest-section-stack">
                                    <div className="dest-panel-card">
                                        <div className="dest-panel-header">
                                            <div>
                                                <span className="dest-section-eyebrow">Where to Stay & Connect</span>
                                                <h2 className="dest-section-title">Top Nomad Neighborhoods in {destination.name}</h2>
                                            </div>
                                            <button
                                                type="button"
                                                className="dest-secondary-btn"
                                                onClick={() => navigate('/community')}
                                            >
                                                <Users size={14} />
                                                <span>Join City Community</span>
                                            </button>
                                        </div>

                                        <div className="dest-neighborhoods-list">
                                            {neighborhoods.map((hood, idx) => (
                                                <div key={idx} className="dest-neighborhood-card">
                                                    <div className="hood-main">
                                                        <div className="hood-title-row">
                                                            <h4>{hood.name}</h4>
                                                            <span className="hood-tag">{hood.tag}</span>
                                                        </div>
                                                        <p className="hood-vibe">{hood.vibe}</p>
                                                    </div>
                                                    <div className="hood-metrics">
                                                        <div>
                                                            <span>Avg Rent</span>
                                                            <strong>{hood.rent}</strong>
                                                        </div>
                                                        <div>
                                                            <span>Fiber Speed</span>
                                                            <strong>{hood.wifi}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Sticky Sidecar: Stay Estimator, Quick Actions & Similar Hubs */}
                <aside className="dest-expand-sidecar">
                    {/* Interactive Stay & Trip Planner Card */}
                    <div className="dest-sidecar-card">
                        <div className="sidecar-card-header">
                            <span className="dest-section-eyebrow">Trip & Budget Planner</span>
                            <h3>Plan Your Stay in {destination.name}</h3>
                        </div>

                        <div className="sidecar-price-hero">
                            <div className="sp-amount">${totalStayEstimate.toLocaleString()}</div>
                            <div className="sp-period">
                                est. for {stayMonths} {stayMonths === 1 ? 'month' : 'months'} ({budgetMode})
                            </div>
                        </div>

                        {/* Stay Duration Selector */}
                        <div className="sidecar-duration-control">
                            <div className="duration-label-row">
                                <span>Stay Duration</span>
                                <strong>{stayMonths} {stayMonths === 1 ? 'Month' : 'Months'}</strong>
                            </div>
                            <div className="duration-pills">
                                {[1, 2, 3, 6].map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        className={`duration-pill-btn ${stayMonths === m ? 'active' : ''}`}
                                        onClick={() => setStayMonths(m)}
                                    >
                                        {m} {m === 1 ? 'Mo' : 'Mos'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sidecar-cta-stack">
                            <button
                                type="button"
                                className="sidecar-primary-btn"
                                onClick={() => navigate(`/explore/triipper?destination=${encodeURIComponent(destination.name)}`)}
                            >
                                <Sparkles size={15} />
                                <span>Build AI Itinerary for {destination.name}</span>
                            </button>

                            <button
                                type="button"
                                className="sidecar-secondary-btn"
                                onClick={handleCompareToggle}
                            >
                                <ArrowLeftRight size={15} />
                                <span>{isCompared ? 'In Comparison Slot ✓' : 'Compare Side-by-Side'}</span>
                            </button>

                            <button
                                type="button"
                                className="sidecar-outline-btn"
                                onClick={() => navigate('/explore/visa')}
                            >
                                <ShieldCheck size={15} />
                                <span>Check Visa Requirements</span>
                            </button>
                        </div>
                    </div>

                    {/* Similar Destinations Intelligence */}
                    <div className="dest-sidecar-card">
                        <div className="sidecar-card-header">
                            <span className="dest-section-eyebrow">Comparable Hubs</span>
                            <h3>Similar Destinations</h3>
                        </div>

                        <div className="dest-similar-list">
                            {relatedDestinations.map((rel) => {
                                const relIntel = getDestinationIntelligence(rel);
                                return (
                                    <button
                                        key={rel.id}
                                        type="button"
                                        className="dest-similar-item"
                                        onClick={() => navigate(`/explore/destinations/${toSlug(rel.name)}`)}
                                    >
                                        <UGCImage
                                            src={rel.image}
                                            alt={rel.name}
                                            className="similar-thumb"
                                            loading="lazy"
                                            sizes="64px"
                                        />
                                        <div className="similar-info">
                                            <div className="similar-top-row">
                                                <h4>{rel.name}</h4>
                                                <span className="similar-price">{rel.price}</span>
                                            </div>
                                            <span className="similar-loc">{rel.location}</span>
                                            <span className="similar-meta">
                                                {relIntel.internet.downloadMbps} Mbps · ★ {rel.rating || '4.8'}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Side-by-Side Compare Destinations Modal */}
            <CompareDestinationsModal
                isOpen={isCompareModalOpen}
                onClose={() => setIsCompareModalOpen(false)}
            />

            {/* Social Sharing & Open Graph Preview Modal */}
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
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                                        <Share2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Share {destination.name} Intelligence</h3>
                                        <p className="text-xs text-neutral-400">Verified cost of living, fiber speeds & nomad guide</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                                >
                                    <X size={18} />
                                </button>
                            </div>

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
