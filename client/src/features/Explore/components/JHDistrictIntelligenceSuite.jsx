import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import { jharkhandDestinations, JH_ALL_24_DISTRICTS } from '../../../data/jharkhandDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';
import './JHDistrictIntelligenceSuite.css';

export const JH_DIVISIONS = [
    'All Divisions',
    'South Chotanagpur',
    'North Chotanagpur',
    'Santhal Pargana',
    'Kolhan',
    'Palamu'
];

export const JH_CIRCUITS = [
    { id: 'all', label: 'All Jharkhand Destinations', icon: '🌲', description: 'Complete directory across all 24 districts of Jharkhand' },
    { id: 'Waterfalls & River Canyons', label: 'Waterfalls & River Canyons', icon: '💧', description: 'Hundru, Dassam, Jonha, Lodh Falls (Budha Ghagh), Panchghagh, Lavapani, Sukhaldari' },
    { id: 'Sacred Jyotirlinga & Shaktipeeths', label: 'Sacred Jyotirlinga & Shaktipeeths', icon: '🕉️', description: 'Baba Baidyanath Dham (12 Jyotirlingas), Rajrappa Chhinnamasta, Basukinath, Bansidhar, Maa Yogini' },
    { id: 'Jain & Buddhist Sacred Peaks', label: 'Jain & Buddhist Sacred Peaks', icon: '☸️', description: 'Parasnath Hill & Sammed Shikharji (Highest Peak), Kauleshwari (Kolhua) Hill' },
    { id: 'Queen of Hills & Forest Reserves', label: 'Queen of Hills & Forest Reserves', icon: '⛰️', description: 'Netarhat Magnolia Sunset Point, Patratu Valley & Dam Lake, Tilaiya Dam, Maithon Dam' },
    { id: 'Asia Sal Forest & Wildlife Sanctuaries', label: 'Sal Forests & Wildlife Sanctuaries', icon: '🐅', description: 'Saranda Forest (Asia Largest Sal Canopy), Betla National Park & Palamu Forts, Dalma Sanctuary' },
    { id: 'Tribal Heritage & Sohrai Crafts', label: 'Tribal Heritage & Sohrai Crafts', icon: '🏺', description: 'Saraikela Chhau Dance (UNESCO), Birsa Munda Ulihatu, Hazaribagh Sohrai & Khovar Murals, Vidyasagar Ashram' }
];

export const JH_CATEGORIES = [
    { id: 'all', label: 'All Jharkhand', icon: '🌟', description: 'Explore all 28 curated destinations across all 24 districts of Jharkhand' },
    { id: 'waterfalls', label: 'Waterfalls', icon: '💧', description: 'Hundru Falls 320ft, Dassam 10-streams, Jonha Gautamdhara, Lodh Falls 468ft plunge, Panchghagh' },
    { id: 'spiritual', label: 'Temples & Shrines', icon: '🕉️', description: 'Baba Baidyanath Dham Jyotirlinga, Rajrappa Maa Chhinnamasta, Basukinath, Bansidhar Solid Gold Krishna' },
    { id: 'nature', label: 'Hills & Lakes', icon: '⛰️', description: 'Netarhat Queen of Chotanagpur, Patratu Valley & Dam, Tilaiya Dam, Maithon Dam, Saranda Forest' },
    { id: 'wildlife', label: 'Wildlife', icon: '🐅', description: 'Betla National Park & Palamu Forts, Dalma Elephant Sanctuary, Hazaribagh Wildlife Sanctuary' },
    { id: 'tribal', label: 'Tribal Culture', icon: '🏺', description: 'Saraikela Chhau Dance (UNESCO), Birsa Munda Ulihatu, Sohrai & Khovar GI wall paintings, Dokra crafts' },
    { id: 'historical', label: 'Heritage & Forts', icon: '🏰', description: 'Palamu 16th-century Chero Forts, Martello Tower Pakur, Vidyasagar Karmatanr Memorial' }
];

export const matchJHCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.jhCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.highlights?.join(' ') || ''} ${dest.tags?.join(' ') || ''}`.toLowerCase();

    if (categoryId === 'waterfalls' || categoryId === 'waterfall') {
        if (cat === 'waterfalls' || circuit.includes('waterfall') || name.includes('fall') || name.includes('cascade')) return true;
        return tags.some(t => ['waterfall', 'waterfalls', 'falls', 'cascade', 'hundru', 'dassam', 'jonha', 'lodh', 'panchghagh'].includes(t));
    }

    if (categoryId === 'spiritual' || categoryId === 'temples' || categoryId === 'temple') {
        if (cat === 'spiritual' || circuit.includes('jyotirlinga') || circuit.includes('shaktipeeth') || circuit.includes('jain')) return true;
        if (name.includes('temple') || name.includes('dham') || name.includes('shikharji') || name.includes('parasnath') || name.includes('rajrappa') || name.includes('baidyanath') || name.includes('shrine') || name.includes('jyotirlinga')) return true;
        return tags.some(t => ['spiritual', 'temple', 'jyotirlinga', 'shaktipeeth', 'jain', 'baidyanath', 'shikharji', 'rajrappa'].includes(t));
    }

    if (categoryId === 'tribal' || categoryId === 'tribal culture' || categoryId === 'culture') {
        if (cat.includes('tribal') || cat.includes('culture') || circuit.includes('tribal') || circuit.includes('craft') || circuit.includes('sohrai')) return true;
        if (name.includes('tribal') || name.includes('chhau') || name.includes('birsa') || name.includes('sohrai') || name.includes('ulihatu') || name.includes('saraikela')) return true;
        return tags.some(t => ['tribal', 'culture', 'sohrai', 'khovar', 'chhau', 'birsa munda', 'crafts', 'dokra'].includes(t)) ||
               text.includes('tribal') || text.includes('sohrai') || text.includes('khovar') || text.includes('chhau');
    }

    if (categoryId === 'wildlife') {
        if (cat === 'wildlife' || circuit.includes('wildlife') || circuit.includes('sal forest')) return true;
        if (name.includes('betla') || name.includes('dalma') || name.includes('sanctuary') || name.includes('tiger') || name.includes('elephant') || name.includes('national park') || name.includes('saranda')) return true;
        return tags.some(t => ['wildlife', 'national park', 'sanctuary', 'elephant', 'tiger', 'betla', 'dalma'].includes(t));
    }

    if (categoryId === 'nature' || categoryId === 'hills' || categoryId === 'lake') {
        if (cat === 'nature' || circuit.includes('hills') || circuit.includes('dam') || circuit.includes('valley')) return true;
        if (name.includes('netarhat') || name.includes('patratu') || name.includes('dam') || name.includes('lake') || name.includes('hill') || name.includes('valley') || name.includes('saranda')) return true;
        return tags.some(t => ['nature', 'hill station', 'lake', 'dam', 'valley', 'netarhat', 'patratu'].includes(t));
    }

    if (categoryId === 'historical' || categoryId === 'forts') {
        if (cat === 'historical' || circuit.includes('heritage') || name.includes('fort') || name.includes('tower') || name.includes('palace') || name.includes('memorial')) return true;
        return tags.some(t => ['historical', 'history', 'fort', 'heritage', 'monument', 'palace'].includes(t));
    }

    return cat.includes(categoryId.toLowerCase()) || circuit.includes(categoryId.toLowerCase()) || tags.includes(categoryId.toLowerCase());
};

export const JH24DistrictsModal = ({ isOpen, onClose, onSelectDistrict }) => {
    const [search, setSearch] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const filtered = JH_ALL_24_DISTRICTS.filter(districtName => {
        const matchesSearch = districtName.toLowerCase().includes(search.toLowerCase());
        const dDest = jharkhandDestinations.find(d => d.district === districtName);
        const matchesDiv = selectedDivision === 'All Divisions' || (dDest && dDest.division === selectedDivision);
        return matchesSearch && matchesDiv;
    });

    return (
        <div className="jh-modal-overlay" onClick={onClose}>
            <div className="jh-modal-window" onClick={e => e.stopPropagation()}>
                <div className="jh-modal-header">
                    <h3 className="jh-modal-title">
                        <span>🌲 All 24 Districts of Jharkhand Directory</span>
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-1 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="jh-modal-filter-row">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search district by name (e.g., Ranchi, Deoghar, Latehar)..."
                        className="jh-modal-search"
                    />

                    <select
                        value={selectedDivision}
                        onChange={e => setSelectedDivision(e.target.value)}
                        className="bg-slate-800 text-white text-sm border border-emerald-500/30 rounded-lg px-3 py-2 outline-none"
                    >
                        {JH_DIVISIONS.map(div => (
                            <option key={div} value={div}>{div}</option>
                        ))}
                    </select>
                </div>

                <div className="jh-modal-districts-grid">
                    {filtered.map(districtName => {
                        const destination = jharkhandDestinations.find(d => d.district === districtName);
                        return (
                            <div
                                key={districtName}
                                className="jh-district-card"
                                onClick={() => {
                                    if (onSelectDistrict) onSelectDistrict(districtName);
                                    if (destination) {
                                        navigate(`/destinations/${destination.id}`);
                                    }
                                    if (onClose) onClose();
                                }}
                            >
                                <div>
                                    <div className="jh-district-name">📍 {districtName}</div>
                                    <div className="jh-district-meta">
                                        {destination?.division || 'Jharkhand'} Division • {destination?.odop || 'Tribal Handicrafts'}
                                    </div>
                                    <div className="jh-district-dest">
                                        ⭐ {destination?.name || `${districtName} Tourism`}
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                                    <span>Explore District Page</span>
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const JHDistrictIntelligenceSuite = ({ destination }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [completedActivities, setCompletedActivities] = useState({});
    const addToast = useToastStore(state => state.addToast);
    const addXP = useNomadOSStore(state => state.addXP);
    const addDestinationToDay = useItineraryStore(state => state.addDestinationToDay);

    const speechRef = useRef(null);

    // Audio Guide synthesis
    const handleToggleAudio = () => {
        if (!('speechSynthesis' in window)) {
            addToast('Audio Guide not supported in this browser.', 'warning');
            return;
        }

        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const textToSpeak = `${destination.name}, located in ${destination.district || 'Jharkhand'}. ${destination.aiInsight || ''} Best time to visit is ${destination.bestSeason || 'October to March'}.`;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;
            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);
            speechRef.current = utterance;
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
            addToast('Playing Jharkhand Audio Guide 🎧', 'info');
        }
    };

    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleCopyGuide = () => {
        const text = `Travel Guide for ${destination.name} (${destination.location}):\n` +
            `Circuit: ${destination.jhCircuit || 'Jharkhand Tourism'}\n` +
            `Best Season: ${destination.bestSeason || 'Oct – Mar'}\n` +
            `Local Gastronomy: ${destination.localCuisine || 'Dhuska, Litti Chokha, Rugra'}\n` +
            `Air Gateway: ${destination.nearestAirport || 'Ranchi Airport (IXR)'}\n` +
            `Rail Connectivity: ${destination.railConnectivity || 'Indian Railways'}`;
        navigator.clipboard?.writeText(text);
        addToast('Jharkhand Field Guide copied to clipboard! 📋', 'success');
    };

    const handleAddStop = (actText) => {
        const note = actText || `Explore ${destination.name}`;
        const { dayNumber } = addDestinationToDay(destination, null, 'Morning', note);
        addToast(`Added stop to Day ${dayNumber} in Trip Itinerary! 📍`, 'success');
    };

    const handleToggleActivity = (idx, text) => {
        setCompletedActivities(prev => {
            const next = { ...prev, [idx]: !prev[idx] };
            if (next[idx]) {
                if (addXP) addXP(30);
                addToast(`Checked off: "${text.slice(0, 30)}..." (+30 XP) ✨`, 'success');
            }
            return next;
        });
    };

    const cuisineDishes = useMemo(() => {
        if (destination.localCuisine) {
            return destination.localCuisine.split(',').map(d => d.trim()).filter(Boolean);
        }
        return ['Dhuska with Chana Ghugni', 'Litti Chokha with Mustard Tadka', 'Rugra (Wild Mushroom) Curry', 'Chilka Roti', 'Karil (Bamboo Shoot) Fry', 'Deoghar Peda'];
    }, [destination.localCuisine]);

    return (
        <div className="jh-intelligence-suite-container">
            {/* Suite Hero Header */}
            <div className="jh-suite-hero">
                <div className="jh-suite-hero-badge-row">
                    <span className="jh-badge-division">
                        🏛️ {destination.division || 'South Chotanagpur'} Division
                    </span>
                    <span className="jh-badge-circuit">
                        🌲 {destination.jhCircuit || 'Jharkhand Tourism Circuit'}
                    </span>
                    {destination.odop && (
                        <span className="jh-badge-gi">
                            🏺 ODOP: {destination.odop}
                        </span>
                    )}
                </div>

                <h2 className="jh-suite-title">
                    <span>{destination.name}</span>
                </h2>

                <p className="jh-suite-subtitle">
                    {destination.aiInsight ||
                        `Explore ${destination.name} in ${destination.location}, featuring pristine sal forests, roaring cascades, and sacred shrines.`}
                </p>

                {/* Audio Guide Bar */}
                <div className="jh-audio-guide-bar">
                    <div className="jh-audio-info">
                        <Volume2 size={18} className="text-emerald-400" />
                        <div>
                            <div className="text-xs font-bold text-white">Audio Travel Guide</div>
                            <div className="text-xs text-slate-300">Narrated overview of {destination.name}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleToggleAudio}
                            className="jh-audio-btn"
                        >
                            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                            <span>{isPlaying ? 'Pause Audio' : 'Listen Now'}</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleCopyGuide}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs flex items-center gap-1 border border-white/10"
                            title="Copy travel guide"
                        >
                            <Copy size={13} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Suite Sub-tabs */}
            <div className="jh-suite-tabs">
                <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`jh-suite-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                >
                    <Compass size={14} />
                    <span>Highlights & Overview</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('activities')}
                    className={`jh-suite-tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
                >
                    <Sparkles size={14} />
                    <span>Curated Activities ({destination.activities?.length || 5})</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('tips')}
                    className={`jh-suite-tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
                >
                    <ShieldCheck size={14} />
                    <span>Travel Logistics & Tips</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('cuisine')}
                    className={`jh-suite-tab-btn ${activeTab === 'cuisine' ? 'active' : ''}`}
                >
                    <Utensils size={14} />
                    <span>Authentic Gastronomy</span>
                </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
                <div>
                    <div className="jh-card-grid">
                        <div className="jh-info-card">
                            <div className="jh-card-header">
                                <Sparkles size={16} />
                                <span>Key Highlights</span>
                            </div>
                            <ul className="space-y-2 text-sm text-slate-300">
                                {(destination.highlights || [
                                    "Roaring Cascades & Serene Waterways",
                                    "Untouched Sal Forest Eco-Trails",
                                    "Sacred Shrine & Archaeological Heritage",
                                    "Traditional Tribal Craft Guilds"
                                ]).map((hl, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-emerald-400 mt-0.5">✓</span>
                                        <span>{hl}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="jh-info-card">
                            <div className="jh-card-header">
                                <Clock size={16} />
                                <span>Seasonal Window & Climate</span>
                            </div>
                            <div className="text-sm text-slate-300 space-y-2">
                                <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 font-semibold text-xs">
                                    🗓️ Optimal Window: {destination.bestSeason || 'October to March'}
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Post-monsoon winters offer thunderous waterfall flows, clear blue skies across the Chotanagpur plateau, and pleasant cool breezes ideal for trekking and temple visits.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Activities */}
            {activeTab === 'activities' && (
                <div className="jh-activities-list">
                    {(destination.activities || [
                        `Trek through scenic sal forest trails around ${destination.name}`,
                        `Interact with local tribal artisan cooperatives producing certified handicrafts`,
                        `Capture breathtaking sunrise and misty cascade photography`,
                        `Taste freshly made traditional Dhuska and hot ginger chai by the river`,
                        `Plan day excursions to surrounding waterfalls and hill viewpoints`
                    ]).map((act, i) => {
                        const isDone = Boolean(completedActivities[i]);
                        return (
                            <div key={i} className={`jh-activity-item ${isDone ? 'is-done' : ''}`}>
                                <div className="flex items-start gap-3">
                                    <span className="text-xs font-bold text-emerald-400 mt-1">#{i + 1}</span>
                                    <div>
                                        <p className="text-sm text-slate-200 m-0">{act}</p>
                                        <span className="text-xs text-emerald-400 mt-1 inline-block">
                                            🌿 {destination.jhCircuit || 'Jharkhand Eco Exploration'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleAddStop(act)}
                                        className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 rounded-md flex items-center gap-1 font-semibold"
                                    >
                                        <Plus size={11} />
                                        <span>Plan Stop</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleActivity(i, act)}
                                        className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-semibold ${isDone ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 border border-white/10'}`}
                                    >
                                        <CheckCircle2 size={11} />
                                        <span>{isDone ? 'Done ✓' : '+30 XP'}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Tab: Tips & Logistics */}
            {activeTab === 'tips' && (
                <div className="jh-card-grid">
                    <div className="jh-info-card">
                        <div className="jh-card-header">
                            <Train size={16} />
                            <span>Transit Gateways</span>
                        </div>
                        <div className="space-y-3 text-xs text-slate-300">
                            <div>
                                <span className="font-bold text-white block">✈️ Airport Access:</span>
                                <span>{destination.nearestAirport || 'Birsa Munda Airport Ranchi (IXR)'}</span>
                            </div>
                            <div>
                                <span className="font-bold text-white block">🚆 Rail Connectivity:</span>
                                <span>{destination.railConnectivity || 'Ranchi Junction (RNC) / Regional Network'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="jh-info-card">
                        <div className="jh-card-header">
                            <ShieldCheck size={16} />
                            <span>Essential Travel Tips</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-300">
                            {(destination.travelTips || [
                                "Best visiting season is between October and March for pleasant weather.",
                                "Carry some cash for weekly village haats as mobile digital payments vary in deep valleys.",
                                "Wear comfortable shoes with strong rubber grip when visiting waterfall rocks.",
                                "Hire local certified guides when exploring dense sal forest reserves."
                            ]).map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                    <span className="text-emerald-400">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Tab: Cuisine */}
            {activeTab === 'cuisine' && (
                <div className="jh-info-card">
                    <div className="jh-card-header">
                        <Utensils size={16} />
                        <span>Authentic Jharkhand Gastronomy</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                        Rich in indigenous culinary traditions, Jharkhand’s food is grounded in wholesome local grains, wild mushrooms, fresh forest greens, and rustic wood-fired recipes:
                    </p>
                    <div className="jh-cuisine-tags">
                        {cuisineDishes.map((dish, i) => (
                            <span key={i} className="jh-cuisine-pill">
                                🍲 {dish}
                            </span>
                        ))}
                    </div>
                    <div className="mt-3 text-xs text-emerald-400 font-semibold">
                        ✨ Best paired with fresh tomato-coriander chokha, garlic chutney & hot sweet malpuas
                    </div>
                </div>
            )}
        </div>
    );
};

export default JHDistrictIntelligenceSuite;
