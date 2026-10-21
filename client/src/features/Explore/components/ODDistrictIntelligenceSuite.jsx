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
import { odishaDestinations, OD_ALL_30_DISTRICTS } from '../../../data/odishaDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';
import './ODDistrictIntelligenceSuite.css';

export const OD_DIVISIONS = [
    'All Divisions',
    'Central',
    'Northern',
    'Southern'
];

export const OD_CIRCUITS = [
    { id: 'all', label: 'All Odisha Destinations', icon: '🇮🇳', description: 'Complete directory across all 30 districts of Odisha' },
    { id: 'Golden Triangle Circuit', label: 'Golden Triangle (Puri-Konark-Bhubaneswar)', icon: '🛕', description: 'Puri Jagannath Temple, UNESCO Konark Sun Temple, Bhubaneswar Temple City' },
    { id: 'Coastal & Wetland Sanctuary', label: 'Wetlands & Marine Coast', icon: '🌊', description: 'Chilika Lake Asia brackish lagoon, Bhitarkanika Mangroves & Gahirmatha Olive Ridley Turtles, Chandipur' },
    { id: 'Wildlife & Tiger Reserves', label: 'Tiger & Elephant Sanctuaries', icon: '🐅', description: 'Simlipal Tiger Reserve, Satkosia Mahanadi Gorge, Karlapat, Chandaka' },
    { id: 'Heritage Crafts & Handlooms', label: 'Handlooms & Living Crafts', icon: '🏺', description: 'Raghurajpur Pattachitra, Pipili Applique, Sambalpuri Ikat, Cuttack Silver Filigree' },
    { id: 'Eastern Ghats & Hill Stations', label: 'Eastern Ghats & Kashmir of Odisha', icon: '⛰️', description: 'Daringbadi pine valleys, Deomali Peak (highest in Odisha), Koraput tribal highlands' },
    { id: 'Diamond Triangle Buddhist Circuit', label: 'Diamond Triangle Buddhist Circuit', icon: '☸️', description: 'Ratnagiri, Udayagiri & Lalitgiri mahaviharas, Padmasambhava Jiranga monastery' },
    { id: 'Waterfalls & Forest Canyons', label: 'Waterfalls & Forest Canyons', icon: '💧', description: 'Barehipani & Joranda Falls, Khandadhar 801ft plunge, Sanaghagara, Pradhanpat' },
    { id: 'Sacred Shaktipeeths & Historic Tirthas', label: 'Shaktipeeths & Historic Tirthas', icon: '🕉️', description: 'Maa Taratarini Shaktipeeth, Biraja Kshettra Jajpur, Samaleswari Sambalpur, Kapilash' }
];

export const OD_CATEGORIES = [
    { id: 'all', label: 'All Odisha', icon: '🌟', description: 'Explore all 35 destinations across all 30 districts of Odisha' },
    { id: 'beaches', label: 'Beaches', icon: '🏖️', description: 'Blue Flag Golden Beach, Chandrabhaga Marine Drive, Chandipur Receding Sea, Gopalpur-on-Sea' },
    { id: 'temples', label: 'Temples', icon: '🛕', description: 'Shree Jagannath Char Dham, Konark Sun Temple, Lingaraj, Taratarini Shaktipeeth, Biraja' },
    { id: 'tribal', label: 'Tribal Culture', icon: '🏺', description: 'Raghurajpur Pattachitra, Pipili Applique, Sambalpuri Ikat, Koraput highlands & Bonda tribes' },
    { id: 'wildlife', label: 'Wildlife', icon: '🐅', description: 'Simlipal Tiger Reserve, Bhitarkanika salt crocodiles & Olive Ridley sea turtles, Satkosia' },
    { id: 'waterfalls', label: 'Waterfalls', icon: '💧', description: 'Barehipani tiered falls, Khandadhar 801ft plunge, Sanaghagara, Pradhanpat cascades' },
    { id: 'nature', label: 'Lakes & Hills', icon: '⛰️', description: 'Chilika Lake Asia brackish lagoon, Daringbadi Kashmir of Odisha, Deomali Peak' }
];

export const matchODCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.odCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.highlights?.join(' ') || ''} ${dest.tags?.join(' ') || ''}`.toLowerCase();

    if (categoryId === 'beaches' || categoryId === 'beach') {
        if (cat.includes('beach') || circuit.includes('coastal') || circuit.includes('marine')) return true;
        if (name.includes('beach') || name.includes('sea') || name.includes('coast') || name.includes('marine') || name.includes('gopalpur') || name.includes('chandipur') || name.includes('paradip')) return true;
        return tags.some(t => ['beach', 'beaches', 'golden beach', 'marine drive', 'receding sea', 'coast', 'blue flag'].includes(t)) ||
               text.includes('blue flag') || text.includes('receding sea') || text.includes('sea beach') || text.includes('golden beach');
    }

    if (categoryId === 'temples' || categoryId === 'temple' || categoryId === 'spiritual') {
        if (cat === 'spiritual' || circuit.includes('shaktipeeth') || circuit.includes('temple') || circuit.includes('golden triangle')) return true;
        if (name.includes('temple') || name.includes('peeth') || name.includes('shrine') || name.includes('jagannath') || name.includes('shiva') || name.includes('lingaraj') || name.includes('taratarini') || name.includes('sun temple') || name.includes('samaleswari') || name.includes('biraja') || name.includes('harishankar') || name.includes('nrusinghanath') || name.includes('kapilash')) return true;
        return tags.some(t => ['temple', 'spiritual', 'char dham', 'shaktipeeth', 'pilgrimage', 'jagannath', 'lingaraj', 'sun temple'].includes(t));
    }

    if (categoryId === 'tribal' || categoryId === 'tribal culture' || categoryId === 'culture') {
        if (cat.includes('tribal') || cat.includes('culture') || circuit.includes('craft') || circuit.includes('handloom')) return true;
        if (name.includes('tribal') || name.includes('craft') || name.includes('pattachitra') || name.includes('ikat') || name.includes('handloom') || name.includes('raghurajpur') || name.includes('bonda') || name.includes('haat') || name.includes('filigree') || name.includes('sonepur') || name.includes('koraput')) return true;
        return tags.some(t => ['tribal', 'tribal & culture', 'craft', 'handloom', 'pattachitra', 'ikat', 'filigree', 'bonda', 'kondh', 'artisan'].includes(t)) ||
               text.includes('tribal') || text.includes('handloom') || text.includes('pattachitra') || text.includes('ikat') || text.includes('craft');
    }

    if (categoryId === 'wildlife') {
        if (cat === 'wildlife' || circuit.includes('wildlife') || circuit.includes('tiger')) return true;
        if (name.includes('simlipal') || name.includes('bhitarkanika') || name.includes('turtle') || name.includes('sanctuary') || name.includes('tiger') || name.includes('national park') || name.includes('satkosia') || name.includes('karlapat') || name.includes('nandankanan') || name.includes('chandaka')) return true;
        return tags.some(t => ['wildlife', 'tiger', 'national park', 'sanctuary', 'crocodile', 'turtle', 'safari'].includes(t));
    }

    if (categoryId === 'waterfalls') {
        if (cat === 'waterfalls' || circuit.includes('waterfall') || name.includes('fall') || name.includes('cascade')) return true;
        return tags.some(t => ['waterfall', 'waterfalls', 'falls', 'cascade'].includes(t));
    }

    if (categoryId === 'nature') {
        if (cat === 'nature' || circuit.includes('hill') || circuit.includes('wetland') || circuit.includes('lagoon')) return true;
        if (name.includes('chilika') || name.includes('daringbadi') || name.includes('deomali') || name.includes('lake') || name.includes('hill') || name.includes('dam') || name.includes('balimela')) return true;
        return tags.some(t => ['nature', 'lake', 'lagoon', 'hill station', 'valley'].includes(t));
    }

    return cat.includes(categoryId.toLowerCase()) || circuit.includes(categoryId.toLowerCase()) || tags.includes(categoryId.toLowerCase());
};

export const OD30DistrictsModal = ({ isOpen, onClose, onSelectDistrict }) => {
    const [search, setSearch] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const filtered = OD_ALL_30_DISTRICTS.filter(districtName => {
        const matchesSearch = districtName.toLowerCase().includes(search.toLowerCase());
        const dDest = odishaDestinations.find(d => d.district === districtName);
        const matchesDiv = selectedDivision === 'All Divisions' || (dDest && dDest.division === selectedDivision);
        return matchesSearch && matchesDiv;
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-neutral-900 border border-amber-600/30 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Modal Header */}
                <div className="p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-red-950/30 to-neutral-900 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                            <span>🇮🇳 Odisha Tourism · India's Best Kept Secret</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-1">
                            All 30 Districts of Odisha
                        </h2>
                        <p className="text-xs text-neutral-400 mt-0.5">
                            From Puri Char Dham & Konark to Chilika Lake, Simlipal Tigers, and Eastern Ghats
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-4 border-b border-neutral-800 bg-neutral-900/60 flex flex-wrap gap-3 items-center justify-between">
                    <div className="relative flex-1 min-w-[240px]">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search district name (e.g. Puri, Mayurbhanj, Khurda, Koraput)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-neutral-800/80 border border-neutral-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {OD_DIVISIONS.map(div => (
                            <button
                                key={div}
                                onClick={() => setSelectedDivision(div)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                    selectedDivision === div
                                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                                }`}
                            >
                                {div}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Districts Grid */}
                <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {filtered.map(districtName => {
                        const dDest = odishaDestinations.find(d => d.district === districtName);
                        return (
                            <div
                                key={districtName}
                                onClick={() => {
                                    if (onSelectDistrict) onSelectDistrict(districtName);
                                    if (dDest) {
                                        navigate(`/explore/destinations/${dDest.id}`);
                                    }
                                    onClose();
                                }}
                                className="group relative p-3.5 rounded-xl border border-neutral-800 bg-neutral-800/40 hover:bg-neutral-800/80 hover:border-amber-500/50 cursor-pointer transition flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-amber-400 font-medium flex items-center gap-1">
                                            <MapPin size={12} />
                                            {districtName}
                                        </span>
                                        <span className="text-[10px] text-neutral-400 uppercase bg-neutral-800 px-1.5 py-0.5 rounded">
                                            {dDest?.division || 'Odisha'}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition line-clamp-1">
                                        {dDest?.name || `${districtName} Tourism`}
                                    </div>
                                    <div className="text-xs text-neutral-400 mt-1 line-clamp-2">
                                        {dDest?.aiInsight || 'Rich Kalinga cultural heritage, temples, coastal landscapes, and handlooms.'}
                                    </div>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                                    <span className="text-amber-300/80 line-clamp-1">
                                        🏺 {dDest?.odop || 'GI Craft & Handlooms'}
                                    </span>
                                    <ChevronRight size={13} className="text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-neutral-800 bg-neutral-900/80 flex items-center justify-between text-xs text-neutral-400">
                    <span>Showing {filtered.length} of 30 districts in Odisha</span>
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition"
                    >
                        Close Directory
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export const ODDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const { addDestinationToDay } = useItineraryStore();

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [audioDuration] = useState(124); // 2m 04s
    const [selectedTab, setSelectedTab] = useState('overview'); // overview, heritage, activities, tips, cuisine, odop, telemetry
    const [completedActs, setCompletedActs] = useState({});

    const audioRef = useRef(null);

    const toggleAct = (idx, actTitle) => {
        setCompletedActs(prev => {
            const next = { ...prev, [idx]: !prev[idx] };
            if (next[idx]) {
                addXP(50);
                addToast(`Completed activity: "${actTitle.slice(0, 35)}..." (+50 XP)`, 'success');
            }
            return next;
        });
    };

    const handleAddActivityToItinerary = (activityTitle) => {
        if (!destination) return;
        addDestinationToDay(destination, 0, 'Morning', `Curated Odisha Experience: ${activityTitle}`);
        addXP(75);
        addToast(`Added "${activityTitle.slice(0, 35)}..." to your Nomad Itinerary! (+75 XP)`, 'success');
    };

    // Simulated ambient ocean breeze / temple bell audio
    useEffect(() => {
        let interval = null;
        if (isPlayingAudio) {
            interval = setInterval(() => {
                setAudioProgress(prev => {
                    if (prev >= audioDuration) {
                        setIsPlayingAudio(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlayingAudio, audioDuration]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (!destination) return null;

    const district = destination.district || 'Odisha';
    const division = destination.division || 'Central';
    const odCircuit = destination.odCircuit || 'Golden Triangle Circuit';
    const odop = destination.odop || 'Odisha Handlooms & Stone Carvings';
    const activitiesList = destination.activities && destination.activities.length > 0
        ? destination.activities
        : [
            `Witness morning puja & sacred rituals at ${destination.name}`,
            `Explore architectural carvings and stone inscriptions with a registered local heritage guide`,
            `Taste authentic Chhena Poda and local Odia sweets at traditional nearby bazaars`,
            `Photograph sunrise or dusk light filtering through ancient Kalinga spires and sanctuaries`
        ];

    const travelTipsList = destination.travelTips && destination.travelTips.length > 0
        ? destination.travelTips
        : [
            `Best season: ${destination.bestSeason || 'October to March for cool ocean winds and festival season'}`,
            `Dress code: Respectful Indian attire required for sacred inner sanctums (leather goods prohibited inside temple premises)`,
            `Connectivity: Accessible via Biju Patnaik International Airport (BBI), Bhubaneswar and East Coast Railway (ECoR)`,
            `Local etiquette: Ask before taking portraits in artisan craft villages and spiritual mathas`
        ];

    return (
        <div className="od-intelligence-suite-container">
            {/* Top Hero Banner */}
            <div className="od-suite-hero">
                <div className="od-suite-hero-badge-row">
                    <span className="od-badge-division">
                        <MapPin size={12} />
                        {district} District · {division} Division
                    </span>
                    <span className="od-badge-circuit">
                        🛕 {odCircuit}
                    </span>
                    <span className="od-badge-gi">
                        🏺 ODOP: {odop}
                    </span>
                </div>

                <h3 className="od-suite-title">
                    {destination.name}
                </h3>
                <p className="od-suite-summary">
                    {destination.aiInsight}
                </p>

                {/* Ambient Heritage Audio Player */}
                <div className="od-audio-guide-bar">
                    <div className="od-audio-info">
                        <Volume2 size={16} className="text-amber-400" />
                        <div>
                            <span className="od-audio-label">Ambient Audio Immersion: Kalinga Spires & Coastal Waves</span>
                            <span className="od-audio-timer">{formatTime(audioProgress)} / {formatTime(audioDuration)}</span>
                        </div>
                    </div>
                    <div className="od-audio-controls">
                        <button
                            type="button"
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="od-audio-play-btn"
                            title={isPlayingAudio ? 'Pause immersion audio' : 'Play immersion audio'}
                        >
                            {isPlayingAudio ? <Pause size={14} /> : <Play size={14} />}
                            <span>{isPlayingAudio ? 'Pause' : 'Listen'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="od-suite-tabs">
                {[
                    { id: 'overview', label: 'Overview & Lore', icon: <Compass size={14} /> },
                    { id: 'activities', label: `Activities (${activitiesList.length})`, icon: <CheckCircle2 size={14} /> },
                    { id: 'tips', label: `Travel Tips (${travelTipsList.length})`, icon: <ShieldCheck size={14} /> },
                    { id: 'cuisine', label: 'Local Cuisine', icon: <Utensils size={14} /> },
                    { id: 'odop', label: 'ODOP & Crafts', icon: <Award size={14} /> },
                    { id: 'telemetry', label: 'Transit & Telemetry', icon: <Train size={14} /> }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`od-suite-tab-btn ${selectedTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Contents */}
            <div className="od-suite-tab-content">
                {/* 1. Overview */}
                {selectedTab === 'overview' && (
                    <div className="od-pane od-pane-overview">
                        <div className="od-overview-grid">
                            <div className="od-overview-card">
                                <h4>🌟 Must-See Highlights</h4>
                                <ul className="od-highlights-list">
                                    {(destination.highlights || []).map((h, i) => (
                                        <li key={i}>
                                            <Sparkles size={14} className="text-amber-400 shrink-0" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="od-overview-card">
                                <h4>🌤️ Best Time & Seasonality</h4>
                                <div className="od-info-block">
                                    <div className="od-info-icon"><Calendar size={18} /></div>
                                    <div>
                                        <strong>{destination.bestSeason || 'October to March'}</strong>
                                        <p>Cool ocean breezes along the Bay of Bengal, ideal for coastal walks, outdoor temple exploration, and vibrant winter melas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Local Cuisine Teaser in Overview */}
                        {destination.localCuisine && (
                            <div className="od-cuisine-banner">
                                <div className="od-cuisine-badge">🍽️ Gastronomy Showcase</div>
                                <h4>Authentic Tastes of {district}</h4>
                                <p>{destination.localCuisine}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. Curated Activities */}
                {selectedTab === 'activities' && (
                    <div className="od-pane od-pane-activities">
                        <div className="od-pane-header">
                            <div>
                                <h4>Curated Experiences & Field Activities</h4>
                                <p>Click to check off or add directly to your Nomad Day Planner</p>
                            </div>
                            <span className="od-badge-count">{activitiesList.length} Experiences</span>
                        </div>

                        <div className="od-activities-grid">
                            {activitiesList.map((act, idx) => {
                                const isDone = !!completedActs[idx];
                                return (
                                    <div key={idx} className={`od-activity-card ${isDone ? 'completed' : ''}`}>
                                        <div className="od-act-num">0{idx + 1}</div>
                                        <div className="od-act-body">
                                            <p className="od-act-text">{act}</p>
                                            <div className="od-act-actions">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleAct(idx, act)}
                                                    className={`od-act-toggle-btn ${isDone ? 'checked' : ''}`}
                                                >
                                                    <Check size={13} />
                                                    <span>{isDone ? 'Completed' : 'Bucket List'}</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddActivityToItinerary(act)}
                                                    className="od-act-itinerary-btn"
                                                >
                                                    <Plus size={13} />
                                                    <span>Add to Itinerary (+75 XP)</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* 3. Essential Travel Tips */}
                {selectedTab === 'tips' && (
                    <div className="od-pane od-pane-tips">
                        <div className="od-pane-header">
                            <div>
                                <h4>Field Advisory & Travel Intelligence</h4>
                                <p>Verified recommendations for seamless transit, attire, and local customs</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.writeText(travelTipsList.join('\n• '));
                                    addToast('Copied travel tips to clipboard!', 'success');
                                }}
                                className="od-copy-tips-btn"
                            >
                                <Copy size={13} />
                                <span>Copy All Tips</span>
                            </button>
                        </div>

                        <div className="od-tips-list">
                            {travelTipsList.map((tip, idx) => (
                                <div key={idx} className="od-tip-item">
                                    <ShieldCheck size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                    <span>{tip}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. Local Cuisine */}
                {selectedTab === 'cuisine' && (
                    <div className="od-pane od-pane-cuisine">
                        <div className="od-pane-header">
                            <div>
                                <h4>Odia Culinary Heritage</h4>
                                <p>Ancient satvik recipes, earthen pot cooking, and legendary milk confections</p>
                            </div>
                        </div>

                        <div className="od-cuisine-grid">
                            <div className="od-dish-card">
                                <span className="od-dish-emoji">🍮</span>
                                <h5>Chhena Poda</h5>
                                <p>The world-renowned caramelized cottage cheese dessert baked in sal leaves, hailing from Nayagarh and celebrated across Odisha.</p>
                            </div>
                            <div className="od-dish-card">
                                <span className="od-dish-emoji">🍲</span>
                                <h5>Dalma</h5>
                                <p>Wholesome slow-simmered lentils with raw papaya, pumpkin, brinjal, and roasted cumin-chilli tempering, offered daily to Lord Jagannath.</p>
                            </div>
                            <div className="od-dish-card">
                                <span className="od-dish-emoji">🥮</span>
                                <h5>Puri Mahaprasad & Khaja</h5>
                                <p>Layered crisp flour pastry fried and glazed in sugar syrup, prepared by traditional Suaras inside Puri's 12th-century temple hearth.</p>
                            </div>
                            <div className="od-dish-card">
                                <span className="od-dish-emoji">🐟</span>
                                <h5>Chilika Crab & Machha Besara</h5>
                                <p>Fresh lagoon crab and fish prepared in pungent mustard paste and raw mango/ambula gravy, a specialty of coastal fishing hamlets.</p>
                            </div>
                        </div>

                        {destination.localCuisine && (
                            <div className="od-district-food-note">
                                <strong>District Specific Specialty:</strong> {destination.localCuisine}
                            </div>
                        )}
                    </div>
                )}

                {/* 5. ODOP & GI Crafts */}
                {selectedTab === 'odop' && (
                    <div className="od-pane od-pane-odop">
                        <div className="od-pane-header">
                            <div>
                                <h4>One District One Product (ODOP) & GI Guilds</h4>
                                <p>Preserving thousand-year-old living indigenous art forms</p>
                            </div>
                            <span className="od-badge-gi-verified">GI Tagged Masterpieces</span>
                        </div>

                        <div className="od-odop-featured-card">
                            <div className="od-odop-icon">🏺</div>
                            <div>
                                <h4>{odop}</h4>
                                <p>
                                    Odisha is home to over 15 registered Geographical Indication (GI) crafts—including Puri Pattachitra scroll painting, Sambalpuri Ikat tie-and-dye sarees, Cuttack Tarakasi silver filigree, Pipili applique canopies, and Kotpad tribal vegetable dye weaves.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 6. Telemetry & Transit */}
                {selectedTab === 'telemetry' && (
                    <div className="od-pane od-pane-telemetry">
                        <div className="od-telemetry-grid">
                            <div className="od-telemetry-card">
                                <div className="od-telem-icon"><Train size={20} /></div>
                                <div>
                                    <h5>Rail Connectivity</h5>
                                    <p>{destination.railConnectivity || 'Connected via East Coast Railway (ECoR) network with Vande Bharat Express'}</p>
                                </div>
                            </div>

                            <div className="od-telemetry-card">
                                <div className="od-telem-icon"><Navigation size={20} /></div>
                                <div>
                                    <h5>Nearest Airport</h5>
                                    <p>{destination.nearestAirport || 'Biju Patnaik International Airport (BBI), Bhubaneswar'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="od-telemetry-foot">
                            <div className="od-telem-stat">
                                <span className="num">30</span>
                                <span className="label">Total Districts</span>
                            </div>
                            <div className="od-telem-stat">
                                <span className="num">480 km</span>
                                <span className="label">Coastline</span>
                            </div>
                            <div className="od-telem-stat">
                                <span className="num">1,100 km²</span>
                                <span className="label">Chilika Lagoon</span>
                            </div>
                            <div className="od-telem-stat">
                                <span className="num">15+</span>
                                <span className="label">GI Registered Crafts</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
