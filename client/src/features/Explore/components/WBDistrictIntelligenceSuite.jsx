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
import { westBengalDestinations, WB_ALL_23_DISTRICTS } from '../../../data/westBengalDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';
import './WBDistrictIntelligenceSuite.css';

export const WB_DIVISIONS = [
    'All Divisions',
    'Presidency',
    'Medinipur',
    'Burdwan',
    'Malda',
    'Jalpaiguri'
];

export const WB_CIRCUITS = [
    { id: 'all', label: 'All West Bengal Destinations', icon: '🏛️', description: 'Complete directory across all 23 districts of West Bengal' },
    { id: 'Himalayan Foothills & Tea', label: 'Himalayan Foothills & Tea', icon: '🏔️', description: 'Darjeeling Toy Train, Tiger Hill, Sandakphu Everest Vista, Mirik Lake, Kalimpong Deolo' },
    { id: 'Sundarbans Mangrove Tiger Delta', label: 'Sundarbans Tiger Delta', icon: '🐅', description: 'Sundarbans UNESCO Mangroves, Sajnekhali, Dobanki Canopy, Ganga Sagar Confluence' },
    { id: 'Heritage Kolkata & Hooghly', label: 'Colonial Kolkata & Hooghly', icon: '🏛️', description: 'Victoria Memorial, Howrah Bridge, Dakshineswar Kali, Bandel Basilica, Mayapur ISKCON' },
    { id: 'Rarh Terracotta & Bishnupur', label: 'Rarh Terracotta & Santiniketan', icon: '🏺', description: 'Bishnupur Terracotta Temples, Santiniketan Visva-Bharati, Kalna 108 Shiva, Mukutmanipur' },
    { id: 'Dooars Wildlife Rainforest', label: 'Dooars Wildlife Rainforest', icon: '🦏', description: 'Jaldapara Rhino Safari, Gorumara Elephant Salt Lick, Buxa Fort, Cooch Behar Royal Palace' },
    { id: 'Coastal Beaches of Bengal', label: 'Coastal Beaches of Bengal', icon: '🌊', description: 'Digha Sea Beach, Mandarmani Motorable Sands, Bakkhali, Henry Island Mangrove Sanctuary' },
    { id: 'Mithila & Nawabi Murshidabad', label: 'Nawabi Murshidabad & Gour', icon: '👑', description: 'Hazarduari Palace 1000 Doors, Gour Sultanate Adina Mosque, Kulik Bird Sanctuary' },
    { id: 'Purulia Hills & Chhau Dance', label: 'Purulia Hills & Chhau Culture', icon: '🎭', description: 'Ayodhya Hills, Bamni Falls, Charida Chhau Masks, Jhargram Royal Sal Forests' }
];

export const WB_CATEGORIES = [
    { id: 'all', label: 'All West Bengal', icon: '🌟', description: 'Explore all 30 curated destinations across all 23 districts of West Bengal' },
    { id: 'hills', label: 'Himalayas & Tea', icon: '🏔️', description: 'Darjeeling Toy Train, Tiger Hill, Sandakphu 11,930ft, Kalimpong Deolo, Mirik Lake' },
    { id: 'heritage', label: 'Colonial & Nawabi', icon: '🏛️', description: 'Victoria Memorial, Hazarduari Palace, Cooch Behar Royal Palace, Bandel Basilica, Gour Ruins' },
    { id: 'spiritual', label: 'Temples & Shrines', icon: '🕉️', description: 'Dakshineswar Kali, Belur Math, Mayapur TOVP, Tarapith Shakti Peeth, Kalna 108 Shiva' },
    { id: 'wildlife', label: 'Wildlife & Deltas', icon: '🐅', description: 'Sundarbans UNESCO Mangroves, Jaldapara Rhinos, Gorumara Gaurs, Buxa Tigers, Kulik Storks' },
    { id: 'beaches', label: 'Beaches & Ocean', icon: '🏖️', description: 'Digha Sea Beach, Mandarmani Motorable Sands, Bakkhali Crescent Beach, Henry Island' },
    { id: 'cultural', label: 'Santiniketan & Terracotta', icon: '🏺', description: 'Santiniketan Visva-Bharati, Bishnupur Terracotta & Baluchari Saris, Purulia Chhau Masks' }
];

export const matchWBCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.wbCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.highlights?.join(' ') || ''} ${dest.tags?.join(' ') || ''}`.toLowerCase();

    if (categoryId === 'hills' || categoryId === 'himalayas' || categoryId === 'hill stations') {
        if (cat.includes('hill') || circuit.includes('himalayan') || name.includes('darjeeling') || name.includes('tiger hill') || name.includes('sandakphu') || name.includes('kalimpong') || name.includes('mirik')) return true;
        return tags.some(t => ['himalayas', 'hill station', 'kanchenjunga', 'everest', 'trek', 'tea', 'toy train'].includes(t));
    }

    if (categoryId === 'heritage' || categoryId === 'colonial' || categoryId === 'palace') {
        if (cat === 'heritage' || circuit.includes('nawabi') || circuit.includes('heritage')) return true;
        if (name.includes('victoria') || name.includes('hazarduari') || name.includes('palace') || name.includes('howrah bridge') || name.includes('gour') || name.includes('bandel')) return true;
        return tags.some(t => ['colonial', 'heritage', 'palace', 'nawabs', 'architecture', 'sultanate', 'museum'].includes(t));
    }

    if (categoryId === 'spiritual' || categoryId === 'temples' || categoryId === 'temple') {
        if (cat === 'spiritual' || circuit.includes('spiritual') || name.includes('dakshineswar') || name.includes('belur math') || name.includes('mayapur') || name.includes('tarapith') || name.includes('shiva') || name.includes('ganga sagar')) return true;
        return tags.some(t => ['spiritual', 'temple', 'pilgrimage', 'shakti peeth', 'kali', 'krishna', 'ramakrishna', 'iskcon'].includes(t));
    }

    if (categoryId === 'wildlife' || categoryId === 'safari' || categoryId === 'mangroves') {
        if (cat === 'wildlife' || circuit.includes('wildlife') || circuit.includes('sundarbans')) return true;
        if (name.includes('sundarbans') || name.includes('jaldapara') || name.includes('gorumara') || name.includes('buxa') || name.includes('kulik') || name.includes('rhino') || name.includes('tiger')) return true;
        return tags.some(t => ['wildlife', 'tigers', 'rhinos', 'mangroves', 'national park', 'safari', 'birds'].includes(t));
    }

    if (categoryId === 'beaches' || categoryId === 'beach' || categoryId === 'coastal') {
        if (cat === 'beaches' || circuit.includes('coastal') || name.includes('digha') || name.includes('mandarmani') || name.includes('bakkhali') || name.includes('beach')) return true;
        return tags.some(t => ['beach', 'beaches', 'bay of bengal', 'coast', 'watersports', 'island'].includes(t));
    }

    if (categoryId === 'cultural' || categoryId === 'arts' || categoryId === 'terracotta') {
        if (cat === 'cultural' || circuit.includes('terracotta') || circuit.includes('chhau') || name.includes('santiniketan') || name.includes('bishnupur') || name.includes('chhau')) return true;
        return tags.some(t => ['terracotta', 'baluchari', 'chhau mask', 'tagore', 'culture', 'art', 'unesco'].includes(t)) || text.includes('terracotta') || text.includes('santiniketan');
    }

    return cat.includes(categoryId.toLowerCase()) || circuit.includes(categoryId.toLowerCase()) || tags.includes(categoryId.toLowerCase());
};

export const WB23DistrictsModal = ({ isOpen, onClose, onSelectDistrict }) => {
    const [search, setSearch] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const filtered = WB_ALL_23_DISTRICTS.filter(districtName => {
        const matchesSearch = districtName.toLowerCase().includes(search.toLowerCase());
        const dDest = westBengalDestinations.find(d => d.district?.toLowerCase() === districtName.toLowerCase());
        const matchesDiv = selectedDivision === 'All Divisions' || (dDest && dDest.division === selectedDivision);
        return matchesSearch && matchesDiv;
    });

    return (
        <div className="wb-modal-overlay" onClick={onClose}>
            <div className="wb-modal-window" onClick={e => e.stopPropagation()}>
                <div className="wb-modal-header">
                    <h3 className="wb-modal-title">
                        <span>🏛️ All 23 Districts of West Bengal Directory</span>
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-1 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="wb-modal-search-bar">
                    <input
                        type="text"
                        placeholder="Search district name (e.g. Darjeeling, Kolkata, Birbhum, Bankura)..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="wb-modal-input"
                    />
                    <select
                        value={selectedDivision}
                        onChange={e => setSelectedDivision(e.target.value)}
                        className="wb-modal-select"
                    >
                        {WB_DIVISIONS.map(div => (
                            <option key={div} value={div}>{div}</option>
                        ))}
                    </select>
                </div>

                <div className="wb-modal-grid">
                    {filtered.map(districtName => {
                        const matching = westBengalDestinations.filter(
                            d => d.district?.toLowerCase() === districtName.toLowerCase()
                        );
                        const sample = matching[0];

                        return (
                            <div
                                key={districtName}
                                className="wb-district-card"
                                onClick={() => {
                                    if (onSelectDistrict) onSelectDistrict(districtName);
                                    onClose();
                                }}
                            >
                                <h4 className="wb-district-name">{districtName} District</h4>
                                <div className="wb-district-sub">
                                    {sample?.division ? `${sample.division} Division` : 'West Bengal'} · {sample?.odop ? `ODOP: ${sample.odop}` : 'Cultural Hub'}
                                </div>
                                <div className="wb-district-meta">
                                    <span>{matching.length} Curated Destination{matching.length === 1 ? '' : 's'}</span>
                                    <span style={{ color: '#60a5fa', fontWeight: 600 }}>Explore →</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const WBDistrictIntelligenceSuite = ({ destination }) => {
    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const { addDestinationToDay } = useItineraryStore();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [completedActivities, setCompletedActivities] = useState({});
    const audioIntervalRef = useRef(null);

    // Audio narration simulation
    useEffect(() => {
        if (isPlaying) {
            audioIntervalRef.current = setInterval(() => {
                setAudioProgress(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1.2;
                });
            }, 500);
        } else {
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
        }
        return () => {
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
        };
    }, [isPlaying]);

    const handlePlayAudio = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            addToast(`Now playing: Field Audio Guide for ${destination?.name || 'West Bengal'} 🎧`, 'info');
        }
    };

    const handleToggleActivity = (index, title) => {
        setCompletedActivities(prev => {
            const next = { ...prev, [index]: !prev[index] };
            if (next[index]) {
                if (addXP) addXP(30);
                addToast(`Completed: "${title.slice(0, 30)}..." (+30 XP) ✨`, 'success');
            }
            return next;
        });
    };

    const handleAddToItinerary = (activityTitle) => {
        const { dayNumber } = addDestinationToDay(destination, null, 'Morning', activityTitle);
        addToast(`Added stop to Day ${dayNumber} in Trip Itinerary! 📍`, 'success');
    };

    const handleCopyTips = () => {
        const text = `Field Guide for ${destination.name}:\n\nHighlights:\n${(destination.highlights || []).join('\n')}\n\nTravel Tips:\n${(destination.travelTips || []).join('\n')}\n\nTransit: ${destination.railConnectivity || 'Eastern / South Eastern Railway'}, Airport: ${destination.nearestAirport || 'Kolkata Airport (CCU)'}`;
        navigator.clipboard?.writeText(text);
        addToast('Copied Field Guide to clipboard! 📋', 'success');
    };

    if (!destination) return null;

    return (
        <div className="wb-intelligence-suite-container">
            {/* Header Hero */}
            <div className="wb-suite-hero">
                <div className="wb-suite-hero-badge-row">
                    <span className="wb-badge-division">
                        🏛️ {destination.division || 'Presidency'} Division
                    </span>
                    <span className="wb-badge-circuit">
                        🌿 {destination.wbCircuit || 'West Bengal Tourism Heritage'}
                    </span>
                    {destination.odop && (
                        <span className="wb-badge-gi">
                            🏺 ODOP / GI: {destination.odop}
                        </span>
                    )}
                </div>

                <h3 className="wb-suite-title">
                    <span>{destination.district || 'West Bengal'} District Intelligence Suite</span>
                </h3>
                <p className="wb-suite-desc">
                    {destination.aiInsight || `${destination.name} stands as an integral highlight of ${destination.district || 'West Bengal'}, bridging deep colonial-heritage histories, Himalayan ridges, mangrove delta biodiversity, and world-renowned gastronomy.`}
                </p>

                {/* Simulated Audio Guide Bar */}
                <div className="wb-audio-bar">
                    <div className="wb-audio-left">
                        <button
                            type="button"
                            onClick={handlePlayAudio}
                            className="wb-audio-play-btn"
                            title={isPlaying ? 'Pause Narration' : 'Play Audio Field Guide'}
                        >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
                        </button>
                        <div className="wb-audio-info">
                            <h4>Audio Field Briefing · {destination.name}</h4>
                            <span>{isPlaying ? `Playing... (${Math.round(audioProgress)}%)` : '2 min 40 sec · Curated Cultural & Historical Narration'}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            type="button"
                            onClick={() => setIsMuted(!isMuted)}
                            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                        <button
                            type="button"
                            onClick={handleCopyTips}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#e2e8f0',
                                fontSize: '0.75rem',
                                padding: '0.4rem 0.75rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer'
                            }}
                        >
                            <Copy size={13} />
                            <span>Copy Guide</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 2-Column Grid: Highlights & Curated Activities */}
            <div className="wb-grid-2col">
                {/* Column 1: Core Highlights */}
                <div className="wb-card-panel">
                    <div className="wb-card-header">
                        <div className="wb-card-header-title">
                            <Sparkles size={16} className="text-red-400" />
                            <span>Key Highlights & Signatures</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            {destination.highlights?.length || 4} Verified
                        </span>
                    </div>

                    <div>
                        {(destination.highlights || [
                            'Sacred & Cultural Landmarks of Regional Renown',
                            'Historical Monuments & Architectural Marvels',
                            'Picturesque Natural Vistas & Scenic Ridge Promenades',
                            'GI-Tagged Handloom Guilds & Local Master Craftsmanship'
                        ]).map((highlight, idx) => (
                            <div key={idx} className="wb-highlight-item">
                                <span className="wb-highlight-dot">✦</span>
                                <span>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Curated Field Activities (+30 XP) */}
                <div className="wb-card-panel">
                    <div className="wb-card-header">
                        <div className="wb-card-header-title">
                            <Compass size={16} className="text-amber-400" />
                            <span>Curated Field Activities</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>
                            Earn +30 XP each
                        </span>
                    </div>

                    <div>
                        {(destination.activities || [
                            `Explore the heritage grounds and iconic monuments of ${destination.name}`,
                            'Capture dramatic panoramic photography during golden dawn or sunset hours',
                            'Taste authentic regional Bengal sweets and spicy delicacies at historic bazaars',
                            'Interact with local craft artisans and handloom textile master weavers',
                            'Plan a scenic day excursion along the surrounding forests and river banks'
                        ]).map((activity, idx) => {
                            const isDone = Boolean(completedActivities[idx]);
                            return (
                                <div key={idx} className={`wb-activity-item ${isDone ? 'completed' : ''}`}>
                                    <span className="wb-activity-text">{activity}</span>
                                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                                        <button
                                            type="button"
                                            onClick={() => handleAddToItinerary(activity)}
                                            style={{
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.12)',
                                                color: '#cbd5e1',
                                                padding: '0.3rem 0.5rem',
                                                borderRadius: '0.45rem',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem'
                                            }}
                                            title="Add Stop to Day Plan"
                                        >
                                            <Plus size={12} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleToggleActivity(idx, activity)}
                                            className={`wb-activity-xp-btn ${isDone ? 'is-done' : ''}`}
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
            <div className="wb-card-panel">
                <div className="wb-card-header">
                    <div className="wb-card-header-title">
                        <Train size={16} className="text-blue-400" />
                        <span>Travel Logistics & Transit Gateways</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                        Connectivity Matrix
                    </span>
                </div>

                <div className="wb-transit-row">
                    <div className="wb-transit-pill">
                        <span className="wb-transit-label">✈️ Nearest Airport</span>
                        <span className="wb-transit-val">{destination.nearestAirport || 'Netaji Subhash Chandra Bose Airport (CCU)'}</span>
                    </div>
                    <div className="wb-transit-pill">
                        <span className="wb-transit-label">🚆 Rail Connectivity</span>
                        <span className="wb-transit-val">{destination.railConnectivity || 'Howrah / Sealdah / New Jalpaiguri'}</span>
                    </div>
                    <div className="wb-transit-pill">
                        <span className="wb-transit-label">🗓️ Optimal Season</span>
                        <span className="wb-transit-val">{destination.bestSeason || 'October to March'}</span>
                    </div>
                    <div className="wb-transit-pill">
                        <span className="wb-transit-label">🍲 Gastronomic Highlights</span>
                        <span className="wb-transit-val">{destination.localCuisine || 'Macher Jhol, Kosha Mangsho, Mishti Doi, Rosogolla'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WBDistrictIntelligenceSuite;
