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
import { biharDestinations, BIHAR_ALL_38_DISTRICTS } from '../../../data/biharDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';
import './BiharDistrictIntelligenceSuite.css';

export const BIHAR_DIVISIONS = [
    'All Divisions',
    'Patna',
    'Tirhut',
    'Saran',
    'Darbhanga',
    'Kosi',
    'Purnia',
    'Bhagalpur',
    'Munger',
    'Magadh'
];

export const BIHAR_CIRCUITS = [
    { id: 'all', label: 'All Bihar Destinations', icon: '🏛️', description: 'Complete directory across all 38 districts of Bihar' },
    { id: 'Buddhist Sacred Circuit', label: 'Buddhist Sacred Circuit', icon: '☸️', description: 'Mahabodhi Temple (Bodh Gaya), Nalanda Mahavihara, Rajgir Vulture Peak, Vaishali, Kesariya Stupa' },
    { id: 'Ancient Heritage & Nalanda', label: 'Ancient Heritage & Empires', icon: '📜', description: 'Nalanda UNESCO Ruins, Sher Shah Suri Tomb, Vikramshila University, Barabar Mauryan Caves' },
    { id: 'Ramayana & Mithila Circuit', label: 'Ramayana & Mithila Circuit', icon: '🏹', description: 'Punaura Dham Sitamarhi, Buxar Ramrekha Ghat, Jitwarpur Madhubani Art, Raj Darbhanga Palaces' },
    { id: 'Jain Tirthankar Circuit', label: 'Jain Tirthankar Circuit', icon: '🪷', description: 'Kundalpur Vaishali, Mandar Hill Banka, Lachhuar Jamui, Pawapuri Jal Mandir' },
    { id: 'Sufi & Ganga Heritage', label: 'Sufi & Ganga Heritage', icon: '🌊', description: 'Takht Sri Patna Sahib, Munger Fort, Maner Sharif, Kashtaharani Ghat, Sonepur Sangam' },
    { id: 'Wildlife & Terai Forests', label: 'Wildlife & Terai Sanctuaries', icon: '🐅', description: 'Valmiki Tiger Reserve, Kabar Taal Ramsar Lake, Vikramshila Dolphin Sanctuary, Nagi-Nakti' },
    { id: 'Cascades & Kaimur Hills', label: 'Cascades & Hill Escarpments', icon: '💧', description: 'Kakolat Waterfall 160ft, Telhar Kund 80m, Maa Mundeshwari Temple, Rohtasgarh Fort' }
];

export const BIHAR_CATEGORIES = [
    { id: 'all', label: 'All Bihar', icon: '🌟', description: 'Explore all 28 curated destinations across all 38 districts of Bihar' },
    { id: 'spiritual', label: 'Temples & Shrines', icon: '🕉️', description: 'Mahabodhi UNESCO, Takht Sri Patna Sahib, Mundeshwari 635 CE, Deo Sun Temple, Thawe Bhawani' },
    { id: 'historical', label: 'Ancient Heritage', icon: '🏛️', description: 'Nalanda Mahavihara, Vikramshila Ruins, Barabar Mauryan Caves, Sher Shah Suri Tomb, Kesariya Stupa' },
    { id: 'nature', label: 'Hills & Lakes', icon: '⛰️', description: 'Rajgir Vulture Peak & Glass Skywalk, Mandar Hill, Kabar Taal Ramsar Oxbow Lake, Matsyagandha' },
    { id: 'wildlife', label: 'Wildlife & Forests', icon: '🐅', description: 'Valmiki Tiger Reserve & Gandak River, Vikramshila Gangetic Dolphin Sanctuary, Nagi-Nakti Birds' },
    { id: 'waterfalls', label: 'Waterfalls & Springs', icon: '💧', description: 'Kakolat Falls 160ft, Telhar Kund 80m cascade plunge, Rajgir Brahmakund hot sulfur springs' },
    { id: 'heritage', label: 'Mithila Arts & Palaces', icon: '🏺', description: 'Jitwarpur GI Madhubani Painting Village, Raj Darbhanga Palaces, Sujani Embroidery, Munger Fort' }
];

export const matchBiharCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.biharCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.highlights?.join(' ') || ''} ${dest.tags?.join(' ') || ''}`.toLowerCase();

    if (categoryId === 'spiritual' || categoryId === 'temples' || categoryId === 'temple') {
        if (cat === 'spiritual' || circuit.includes('buddhist') || circuit.includes('jain') || circuit.includes('ramayana')) return true;
        if (name.includes('temple') || name.includes('mandir') || name.includes('dham') || name.includes('mahabodhi') || name.includes('patna sahib') || name.includes('mundeshwari') || name.includes('shrine')) return true;
        return tags.some(t => ['spiritual', 'temple', 'buddhism', 'sikhism', 'jainism', 'ramayana', 'shiva', 'durga'].includes(t));
    }

    if (categoryId === 'historical' || categoryId === 'history' || categoryId === 'heritage_monuments') {
        if (cat === 'historical' || circuit.includes('ancient') || circuit.includes('heritage')) return true;
        if (name.includes('ruins') || name.includes('tomb') || name.includes('caves') || name.includes('stupa') || name.includes('pillar') || name.includes('nalanda') || name.includes('vikramshila') || name.includes('fort')) return true;
        return tags.some(t => ['historical', 'history', 'unesco', 'archaeology', 'mauryan', 'stupa', 'fort'].includes(t));
    }

    if (categoryId === 'nature' || categoryId === 'hills' || categoryId === 'lake') {
        if (cat === 'nature' || circuit.includes('hills') || name.includes('peak') || name.includes('lake') || name.includes('skywalk') || name.includes('hill')) return true;
        return tags.some(t => ['nature', 'hills', 'lake', 'wetland', 'skywalk', 'mandar'].includes(t)) || text.includes('lake') || text.includes('hill');
    }

    if (categoryId === 'wildlife') {
        if (cat === 'wildlife' || circuit.includes('wildlife')) return true;
        if (name.includes('tiger') || name.includes('sanctuary') || name.includes('dolphin') || name.includes('bird') || name.includes('valmiki')) return true;
        return tags.some(t => ['wildlife', 'tigers', 'dolphins', 'birds', 'ramsar', 'national park'].includes(t));
    }

    if (categoryId === 'waterfalls' || categoryId === 'waterfall') {
        if (cat === 'waterfalls' || name.includes('fall') || name.includes('cascade') || name.includes('kund') || name.includes('spring')) return true;
        return tags.some(t => ['waterfalls', 'waterfall', 'cascade', 'kakolat', 'telhar'].includes(t)) || text.includes('waterfall');
    }

    if (categoryId === 'heritage' || categoryId === 'arts' || categoryId === 'culture') {
        if (cat === 'heritage' || circuit.includes('mithila') || name.includes('madhubani') || name.includes('painting') || name.includes('palace') || name.includes('art')) return true;
        return tags.some(t => ['madhubani art', 'culture', 'heritage', 'handicrafts', 'palace', 'village'].includes(t)) || text.includes('madhubani') || text.includes('palace');
    }

    return cat.includes(categoryId.toLowerCase()) || circuit.includes(categoryId.toLowerCase()) || tags.includes(categoryId.toLowerCase());
};

export const Bihar38DistrictsModal = ({ isOpen, onClose, onSelectDistrict }) => {
    const [search, setSearch] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const filtered = BIHAR_ALL_38_DISTRICTS.filter(districtName => {
        const matchesSearch = districtName.toLowerCase().includes(search.toLowerCase());
        const dDest = biharDestinations.find(d => d.district?.toLowerCase() === districtName.toLowerCase());
        const matchesDiv = selectedDivision === 'All Divisions' || (dDest && dDest.division === selectedDivision);
        return matchesSearch && matchesDiv;
    });

    return (
        <div className="bihar-modal-overlay" onClick={onClose}>
            <div className="bihar-modal-window" onClick={e => e.stopPropagation()}>
                <div className="bihar-modal-header">
                    <h3 className="bihar-modal-title">
                        <span>🏛️ All 38 Districts of Bihar Directory</span>
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-white p-1 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="bihar-modal-filter-row">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search district by name (e.g., Patna, Gaya, Nalanda, Vaishali)..."
                        className="bihar-modal-search"
                    />

                    <select
                        value={selectedDivision}
                        onChange={e => setSelectedDivision(e.target.value)}
                        className="bg-slate-800 text-white text-sm border border-red-500/30 rounded-lg px-3 py-2 outline-none"
                    >
                        {BIHAR_DIVISIONS.map(div => (
                            <option key={div} value={div}>{div}</option>
                        ))}
                    </select>
                </div>

                <div className="bihar-modal-districts-grid">
                    {filtered.map(districtName => {
                        const destination = biharDestinations.find(d => d.district?.toLowerCase() === districtName.toLowerCase());
                        return (
                            <div
                                key={districtName}
                                className="bihar-district-card"
                                onClick={() => {
                                    if (onSelectDistrict) onSelectDistrict(districtName);
                                    if (destination) {
                                        navigate(`/destinations/${destination.id}`);
                                    }
                                    if (onClose) onClose();
                                }}
                            >
                                <div>
                                    <div className="bihar-district-name">📍 {districtName}</div>
                                    <div className="bihar-district-meta">
                                        {destination?.division || 'Bihar'} Division • {destination?.odop || 'Heritage Crafts'}
                                    </div>
                                    <div className="bihar-district-dest">
                                        ⭐ {destination?.name || `${districtName} Tourism`}
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-xs text-red-400 font-semibold">
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

export const BiharDistrictIntelligenceSuite = ({ destination }) => {
    const [isPlaying, setIsPlaying] = useState(false);
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
            const textToSpeak = `${destination.name}, located in ${destination.district || 'Bihar'}. ${destination.aiInsight || ''} Best time to visit is ${destination.bestSeason || 'October to March'}.`;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;
            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);
            speechRef.current = utterance;
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
            addToast('Playing Bihar Audio Guide 🎧', 'info');
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
            `Circuit: ${destination.biharCircuit || 'Bihar Tourism'}\n` +
            `Best Season: ${destination.bestSeason || 'Oct – Mar'}\n` +
            `Local Gastronomy: ${destination.localCuisine || 'Litti Chokha, Sattu, Khaja'}\n` +
            `Air Gateway: ${destination.nearestAirport || 'Patna Airport (PAT)'}\n` +
            `Rail Connectivity: ${destination.railConnectivity || 'Indian Railways'}`;
        navigator.clipboard?.writeText(text);
        addToast('Bihar Field Guide copied to clipboard! 📋', 'success');
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
        return ['Litti Chokha with Mustard Tadka', 'Sattu Paratha & Chutney', 'Silao Khaja (GI)', 'Gaya Tilkut (GI)', 'Makhana Kheer', 'Thekua', 'Balushahi'];
    }, [destination.localCuisine]);

    return (
        <div className="bihar-intelligence-suite-container">
            {/* Suite Hero Header */}
            <div className="bihar-suite-hero">
                <div className="bihar-suite-hero-badge-row">
                    <span className="bihar-badge-division">
                        🏛️ {destination.division || 'Patna'} Division
                    </span>
                    <span className="bihar-badge-circuit">
                        🧭 {destination.biharCircuit || 'Buddhist & Cultural Circuit'}
                    </span>
                    {destination.odop && (
                        <span className="bihar-badge-gi">
                            🏺 ODOP: {destination.odop}
                        </span>
                    )}
                </div>

                <h3 className="bihar-suite-title">
                    <span>{destination.name} Field Intelligence</span>
                </h3>

                <p className="bihar-suite-desc">
                    {destination.aiInsight}
                </p>

                {/* Audio Guide Player & Actions Bar */}
                <div className="bihar-audio-bar">
                    <div className="bihar-audio-left">
                        <button
                            type="button"
                            onClick={handleToggleAudio}
                            className="bihar-audio-play-btn"
                        >
                            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                            <span>{isPlaying ? 'Pause Audio Guide' : 'Listen Audio Guide (AI Synthesized)'}</span>
                        </button>
                        <span className="bihar-audio-meta">
                            🎧 Spoken field editorial in English
                        </span>
                    </div>

                    <div className="bihar-audio-actions">
                        <button
                            type="button"
                            onClick={handleCopyGuide}
                            className="bihar-copy-guide-btn"
                            title="Copy complete travel guide"
                        >
                            <Copy size={13} />
                            <span>Copy Field Guide</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Curated Activities & Checklist */}
            {destination.activities && destination.activities.length > 0 && (
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <h4 className="text-white font-bold text-sm flex items-center gap-2">
                            <Sparkles size={16} className="text-red-400" />
                            <span>Curated Field Experiences ({destination.activities.length})</span>
                        </h4>
                        <span className="text-xs text-slate-400">
                            Check off stops to claim +30 Nomad XP or plan into your day
                        </span>
                    </div>

                    <div className="space-y-2">
                        {destination.activities.map((act, idx) => {
                            const isDone = Boolean(completedActivities[idx]);
                            return (
                                <div
                                    key={idx}
                                    className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${
                                        isDone
                                            ? 'bg-red-950/20 border-red-500/40 text-slate-300'
                                            : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-red-500/30'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 flex-1 pr-3">
                                        <span className="text-xs font-mono text-red-400 font-bold">
                                            #{String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className={isDone ? 'line-through text-slate-400' : ''}>
                                            {act}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleAddStop(act)}
                                            className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1"
                                            title="Add to Itinerary"
                                        >
                                            <Plus size={12} />
                                            <span>Add Stop</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleToggleActivity(idx, act)}
                                            className={`p-1.5 rounded transition ${
                                                isDone ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                                            }`}
                                            title={isDone ? 'Mark Incomplete' : 'Check Off (+30 XP)'}
                                        >
                                            <CheckCircle2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Authentic Gastronomy Pills */}
            <div className="pt-4 border-t border-red-500/20 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                        <Utensils size={13} />
                        <span>Bihari Gastronomy:</span>
                    </span>
                    {cuisineDishes.map((dish, i) => (
                        <span key={i} className="text-xs bg-red-950/40 border border-red-500/30 text-red-200 px-2.5 py-1 rounded-full font-medium">
                            🍲 {dish}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
