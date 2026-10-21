import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, Landmark, Sparkles, Compass, Clock,
    Volume2, VolumeX, Play, Pause, ChevronRight, X,
    Calendar, Check, ShieldCheck, Award, Train, Utensils,
    Navigation, ExternalLink, Search, Globe, Waves, Mountain, Sun,
    CheckCircle2, Copy, Plus, AlertCircle
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useItineraryStore } from '../../../store/itineraryStore';
import { assamDestinations, ASSAM_ALL_DISTRICTS } from '../../../data/assamDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';
import './AssamDistrictIntelligenceSuite.css';

export const ASSAM_DIVISIONS = [
    'All Divisions',
    'Lower Assam',
    'North Assam',
    'Central Assam',
    'Upper Assam',
    'Hills & Barak Valley'
];

export const ASSAM_CIRCUITS = [
    { id: 'all', label: 'All Assam Destinations', icon: '🦏', description: 'Complete directory across all districts and 5 administrative divisions of Assam' },
    { id: 'Rhino Wildlife & Rainforest', label: 'Rhino Wildlife & Rainforest', icon: '🦏', description: 'Kaziranga, Manas, Pobitora, Dibru-Saikhowa, Dehing Patkai, Nameri, and Orang' },
    { id: 'Brahmaputra Island & Satra Culture', label: 'Brahmaputra Island & Satras', icon: '🏝️', description: 'Majuli Island, Umananda Peacock Island, Madhabdeva Kalakshetra, and Barpeta Kirtan Ghar' },
    { id: 'Ahom Dynasty Capital & Imperial Monuments', label: 'Ahom Dynasty & Imperial Capital', icon: '👑', description: 'Sivasagar Rang Ghar, Talatal Ghar, Charaideo UNESCO Maidams, and Khaspur Ruins' },
    { id: 'Tea Capital & Planter Heritage', label: 'Tea Capital & Planter Heritage', icon: '🍵', description: 'Jorhat Tocklai, British Chang Bungalows, Digboi Oil Heritage, and Surma Valley' },
    { id: 'Sacred Shakta & Tantric Shrines', label: 'Sacred Shakta & Tantric Shrines', icon: '🕉️', description: 'Kamakhya Temple Nilachal Hill, Ambubachi Mela, and Hajo Panchatirtha Sanctuary' },
    { id: 'Hills, Clouds & Barail Ranges', label: 'Hills, Clouds & Barail Ranges', icon: '⛰️', description: 'Haflong Hill Station, Jatinga Valley of Clouds, and Garampani Geothermal Springs' },
    { id: 'Muga & Eri Silk Artisan Guilds', label: 'Muga & Eri Silk Guilds', icon: '🧵', description: 'Sualkuchi Silk Weaving Village and Sarthebari GI Bell Metal Crafts' },
    { id: 'Colonial Brahmaputra & Ancient Shrines', label: 'Colonial Brahmaputra & Shrines', icon: '🌊', description: 'Tezpur Agnigarh, Sri Surya Pahar, Bongaigaon Koya Kujia, and Guwahati Riverfront' }
];

export const ASSAM_CATEGORIES = [
    { id: 'all', label: 'All Assam', icon: '🌟', description: 'Explore all 30 curated destinations across Assam — Gateway to Northeast India' },
    { id: 'wildlife', label: 'Rhino & Wildlife', icon: '🦏', description: 'Kaziranga, Manas, Pobitora, Dibru-Saikhowa, Dehing Patkai, Orang, and Nameri' },
    { id: 'heritage', label: 'Ahom Dynasty', icon: '👑', description: 'Sivasagar Rang Ghar, Charaideo UNESCO Maidams, Talatal Ghar, and Khaspur Ruins' },
    { id: 'spiritual', label: 'Kamakhya & Shrines', icon: '🕉️', description: 'Kamakhya Shakti Peeth, Umananda Peacock Island, and Hajo Panchatirtha' },
    { id: 'tea', label: 'Tea Estates', icon: '🍵', description: 'Jorhat Tea Capital, Tocklai Research, Colonial Planter Bungalows, and Digboi' },
    { id: 'hills', label: 'Haflong Hills', icon: '⛰️', description: 'Haflong Lake, Barail Mountain Ranges, and Jatinga Valley of Clouds' },
    { id: 'culture', label: 'Silk & Satras', icon: '🎭', description: 'Majuli River Island, Sualkuchi Golden Muga Silk, and Barpeta Satras' }
];

export const matchAssamCategory = (destination, categoryId) => {
    if (!destination || !categoryId || categoryId === 'all') return true;
    const cat = (destination.category || '').toLowerCase();
    const circuit = (destination.assamCircuit || '').toLowerCase();
    const name = (destination.name || '').toLowerCase();
    const highlights = (destination.highlights || []).join(' ').toLowerCase();

    switch (categoryId) {
        case 'wildlife':
            return cat.includes('wildlife') || cat.includes('safari') || circuit.includes('rhino') || circuit.includes('wildlife') || name.includes('national park') || name.includes('sanctuary');
        case 'heritage':
            return cat.includes('heritage') || cat.includes('architecture') || circuit.includes('ahom') || name.includes('sivasagar') || name.includes('charaideo') || name.includes('khaspur');
        case 'spiritual':
            return cat.includes('spiritual') || cat.includes('pilgrimage') || circuit.includes('shakta') || circuit.includes('tantric') || name.includes('kamakhya') || name.includes('umananda') || name.includes('hajo');
        case 'tea':
            return cat.includes('tea') || circuit.includes('tea') || name.includes('jorhat') || name.includes('digboi') || name.includes('surma') || highlights.includes('tea');
        case 'hills':
            return cat.includes('hills') || circuit.includes('hills') || circuit.includes('barail') || name.includes('haflong') || name.includes('jatinga') || name.includes('garampani');
        case 'culture':
            return circuit.includes('satra') || circuit.includes('silk') || name.includes('majuli') || name.includes('sualkuchi') || name.includes('barpeta') || highlights.includes('satra') || highlights.includes('silk');
        default:
            return true;
    }
};

/**
 * Comprehensive 35 Districts Directory Modal for Assam
 */
export const AssamDistrictsModal = ({
    isOpen = false,
    onClose = () => {},
    onSelectDistrict = () => {},
    currentDistrict = 'all'
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDivision, setActiveDivision] = useState('All Divisions');

    const districtCounts = useMemo(() => {
        const counts = {};
        assamDestinations.forEach(d => {
            if (d.district) {
                counts[d.district] = (counts[d.district] || 0) + 1;
            }
        });
        return counts;
    }, []);

    const filteredDistricts = useMemo(() => {
        return ASSAM_ALL_DISTRICTS.filter(dist => {
            const matchesDivision = activeDivision === 'All Divisions' || dist.division === activeDivision;
            const matchesSearch = dist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dist.headquarter.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDivision && matchesSearch;
        });
    }, [activeDivision, searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="assam-modal-backdrop" onClick={onClose}>
            <div className="assam-modal-container" onClick={e => e.stopPropagation()}>
                <div className="assam-modal-header">
                    <div className="assam-modal-title-wrap">
                        <MapPin size={22} className="text-emerald-400" />
                        <div>
                            <h3 className="assam-modal-title">Assam Districts Directory</h3>
                            <span style={{ fontSize: '0.78rem', color: '#a7f3d0' }}>
                                Explore 35 Districts Across 5 Administrative Divisions
                            </span>
                        </div>
                        <span className="assam-modal-badge">
                            {assamDestinations.length} Curated Destinations
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="assam-modal-close-btn"
                        title="Close Modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="assam-modal-body">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search district by name or headquarters (e.g. Guwahati, Golaghat, Majuli, Sivasagar)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="assam-modal-search"
                        autoFocus
                    />

                    {/* Division Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                        {ASSAM_DIVISIONS.map(div => (
                            <button
                                key={div}
                                type="button"
                                onClick={() => setActiveDivision(div)}
                                style={{
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                    background: activeDivision === div ? 'linear-gradient(135deg, #059669, #10b981)' : 'rgba(255, 255, 255, 0.06)',
                                    color: activeDivision === div ? '#ffffff' : '#cbd5e1',
                                    border: `1px solid ${activeDivision === div ? '#10b981' : 'rgba(255, 255, 255, 0.1)'}`,
                                    cursor: 'pointer'
                                }}
                            >
                                {div}
                            </button>
                        ))}
                    </div>

                    {/* Districts Grid */}
                    <div className="assam-districts-grid">
                        <button
                            type="button"
                            onClick={() => {
                                onSelectDistrict('all');
                                onClose();
                            }}
                            className={`assam-district-pill ${currentDistrict === 'all' ? 'active' : ''}`}
                        >
                            <span className="assam-district-name">🌟 All Assam Districts</span>
                            <span className="assam-district-count">{assamDestinations.length}</span>
                        </button>
                        {filteredDistricts.map(dist => {
                            const count = districtCounts[dist.name] || 0;
                            const isActive = currentDistrict.toLowerCase() === dist.name.toLowerCase();
                            return (
                                <button
                                    key={dist.name}
                                    type="button"
                                    onClick={() => {
                                        onSelectDistrict(dist.name);
                                        onClose();
                                    }}
                                    className={`assam-district-pill ${isActive ? 'active' : ''}`}
                                >
                                    <div>
                                        <div className="assam-district-name">{dist.name}</div>
                                        <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>HQ: {dist.headquarter}</div>
                                    </div>
                                    {count > 0 && (
                                        <span className="assam-district-count">{count}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * AssamDistrictIntelligenceSuite
 * Dedicated intelligence display component rendered on Assam destination detail pages
 */
export const AssamDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { addXP } = useNomadOSStore();
    const { addDestinationToDay } = useItineraryStore();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [completedActivities, setCompletedActivities] = useState({});

    const synthRef = useRef(null);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleToggleAudio = () => {
        if (!('speechSynthesis' in window)) {
            addToast('Speech synthesis not supported in this browser.', 'warning');
            return;
        }

        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const text = `${destination.name}, located in ${destination.district || 'Assam'}, is an extraordinary highlight of Assam Tourism. ${destination.aiInsight || ''} Notable highlights include ${destination.highlights?.slice(0, 3).join('. ')}. Savor authentic gastronomy such as ${destination.localCuisine || 'Masor Tenga and Khar'}.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
    };

    const handleToggleActivity = (idx, activity) => {
        setCompletedActivities(prev => {
            const next = { ...prev, [idx]: !prev[idx] };
            if (next[idx]) {
                if (addXP) addXP(30);
                addToast(`Checked off: "${activity.slice(0, 30)}..." (+30 XP) ✨`, 'success');
            }
            return next;
        });
    };

    const handlePlanStop = (activity) => {
        const { dayNumber } = addDestinationToDay(destination, null, 'Morning', activity);
        addToast(`Added "${activity.slice(0, 32)}..." to Day ${dayNumber} in Trip Plan! 📍`, 'success');
    };

    return (
        <div className="assam-intelligence-suite-container" data-testid="assam-intelligence-suite">
            {/* Header Hero */}
            <div className="assam-suite-hero">
                <div className="assam-suite-hero-badge-row">
                    <span className="assam-badge-division">
                        🏛️ {destination.division || 'Upper Assam'} Division
                    </span>
                    {destination.assamCircuit && (
                        <span className="assam-badge-circuit">
                            🦏 {destination.assamCircuit}
                        </span>
                    )}
                    {destination.odop && (
                        <span className="assam-badge-gi">
                            ✨ ODOP: {destination.odop}
                        </span>
                    )}
                </div>

                <h2 className="assam-suite-title">
                    <span>🦏</span>
                    <span>{destination.name} District Intelligence Suite</span>
                </h2>

                <p className="assam-suite-desc">
                    {destination.aiInsight || `Explore ${destination.name} in the heart of Assam, offering high-speed connectivity, deep cultural heritage, tea plantation landscapes, and world-renowned biodiversity.`}
                </p>

                {/* Ambient Audio Narrative Bar */}
                <div className="assam-audio-bar">
                    <div className="assam-audio-left">
                        <button
                            type="button"
                            onClick={handleToggleAudio}
                            className="assam-audio-play-btn"
                            title={isPlaying ? 'Pause Audio Narrative' : 'Play Audio Narrative'}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                        </button>
                        <div className="assam-audio-text-group">
                            <span className="assam-audio-title">
                                {isPlaying ? 'Playing Audio Narrative' : 'Listen to Destination Narrative'}
                            </span>
                            <span className="assam-audio-sub">
                                Ambient Heritage Audio Guide · {destination.district || 'Assam'}
                            </span>
                        </div>
                    </div>

                    <div className="assam-audio-right">
                        <button
                            type="button"
                            onClick={() => {
                                setIsMuted(!isMuted);
                                if (window.speechSynthesis) {
                                    if (!isMuted) window.speechSynthesis.pause();
                                    else window.speechSynthesis.resume();
                                }
                            }}
                            className="assam-audio-mute-btn"
                        >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Core Highlights & Curated Field Activities Grid */}
            <div className="assam-suite-grid">
                {/* 1. Iconic Highlights */}
                <div className="assam-card-panel">
                    <div className="assam-card-header">
                        <div className="assam-card-header-title">
                            <Sparkles size={16} className="text-emerald-400" />
                            <span>Iconic Landmarks & Highlights</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>
                            {destination.highlights?.length || 5} Key Attractions
                        </span>
                    </div>

                    <div className="assam-highlights-list">
                        {(destination.highlights || [
                            `${destination.name} Scenic Viewpoint`,
                            `Historical Heritage & Culture`,
                            `Indigenous Artisan Guilds`,
                            `Tea Plantation & Wildlife Corridors`
                        ]).map((highlight, idx) => (
                            <div key={idx} className="assam-highlight-item">
                                <div className="assam-highlight-bullet" />
                                <span>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Curated Field Activities */}
                <div className="assam-card-panel">
                    <div className="assam-card-header">
                        <div className="assam-card-header-title">
                            <Compass size={16} className="text-amber-400" />
                            <span>Curated Field Experiences</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                            Interactive Checklist (+30 XP)
                        </span>
                    </div>

                    <div className="assam-activities-list">
                        {(destination.activities || [
                            `Explore the historic landmarks of ${destination.name}`,
                            `Visit local tea gardens and artisan workshops`,
                            `Sample traditional Assamese culinary delicacies`,
                            `Photograph dramatic sunrise and nature vistas`
                        ]).map((activity, idx) => {
                            const isDone = Boolean(completedActivities[idx]);
                            return (
                                <div key={idx} className={`assam-activity-row ${isDone ? 'completed' : ''}`}>
                                    <span className="assam-activity-text">{activity}</span>
                                    <div className="assam-activity-actions">
                                        <button
                                            type="button"
                                            onClick={() => handlePlanStop(activity)}
                                            className="assam-activity-plan-btn"
                                            title="Add to Itinerary"
                                        >
                                            <Plus size={12} />
                                            <span>Plan</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleToggleActivity(idx, activity)}
                                            className={`assam-activity-xp-btn ${isDone ? 'is-done' : ''}`}
                                        >
                                            <CheckCircle2 size={12} />
                                            <span>{isDone ? 'Done' : '+30 XP'}</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Travel Logistics & Gateways */}
            <div className="assam-card-panel">
                <div className="assam-card-header">
                    <div className="assam-card-header-title">
                        <Train size={16} className="text-blue-400" />
                        <span>Travel Logistics & Transit Gateways</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                        Connectivity Matrix
                    </span>
                </div>

                <div className="assam-transit-row">
                    <div className="assam-transit-pill">
                        <span className="assam-transit-label">✈️ Nearest Airport</span>
                        <span className="assam-transit-val">{destination.nearestAirport || 'Lokpriya Gopinath Bordoloi Airport Guwahati (GAU)'}</span>
                    </div>
                    <div className="assam-transit-pill">
                        <span className="assam-transit-label">🚆 Rail Connectivity</span>
                        <span className="assam-transit-val">{destination.railConnectivity || 'Guwahati / Kamakhya / Furkating / Dibrugarh'}</span>
                    </div>
                    <div className="assam-transit-pill">
                        <span className="assam-transit-label">🗓️ Optimal Season</span>
                        <span className="assam-transit-val">{destination.bestSeason || 'October to April'}</span>
                    </div>
                    <div className="assam-transit-pill">
                        <span className="assam-transit-label">🍲 Gastronomic Highlights</span>
                        <span className="assam-transit-val">{destination.localCuisine || 'Masor Tenga, Duck with Ash Gourd, Khar, Joha Rice'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssamDistrictIntelligenceSuite;
