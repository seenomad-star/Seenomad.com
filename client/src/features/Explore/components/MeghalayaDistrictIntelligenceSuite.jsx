import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, Landmark, Sparkles, Compass, Clock,
    Volume2, VolumeX, Play, Pause, ChevronRight, X,
    Calendar, Check, ShieldCheck, Award, Train, Utensils,
    Navigation, ExternalLink, Search, Globe, Waves, Mountain, Sun,
    CheckCircle2, Copy, Plus, AlertCircle, CloudRain, Trees, Wind
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useItineraryStore } from '../../../store/itineraryStore';
import { meghalayaDestinations, MEGHALAYA_ALL_DISTRICTS } from '../../../data/meghalayaDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';
import './MeghalayaDistrictIntelligenceSuite.css';

export const MEGHALAYA_DIVISIONS = [
    'All Regions',
    'Khasi Hills',
    'Jaintia Hills',
    'Garo Hills',
    'Ri-Bhoi'
];

export const MEGHALAYA_CIRCUITS = [
    { id: 'all', label: 'All Meghalaya Destinations', icon: '☁️', description: 'Complete directory across all 12 districts and 4 geographic regions of Meghalaya' },
    { id: 'Living Root Bridges & Wettest Places', label: 'Living Root Bridges & Wettest Spots', icon: '🌿', description: 'Double Decker Living Root Bridge, Mawlynnong Cleanest Village, Mawsynram, and Mawlyngbna' },
    { id: 'Crystal Waters & Border Canyons', label: 'Crystal Waters & Border Canyons', icon: '🛶', description: 'Dawki Umngot Glass River, Shnongpdeng, Laitlum Canyons, and Ranikor Angling River' },
    { id: 'Cloud City & Scotland of the East', label: 'Cloud City & Scotland of East', icon: '🌲', description: 'Shillong Peak, Elephant Falls, Umiam Lake Barapani, Lum Sohpetbneng, and Thadlaskein Lake' },
    { id: 'Cascading Waterfalls & Natural Pools', label: 'Cascading Waterfalls & Natural Pools', icon: '💧', description: 'Nohkalakai Falls, Krang Suri Falls, Wei Sawdong, Phe Phe Falls, Rainbow Falls, and Dainthlen' },
    { id: 'Ancient Caves & Prehistoric Formations', label: 'Ancient Caves & Prehistoric Formations', icon: '🦇', description: 'Mawsmai Limestone Cave, Arwah Fossil Cave, Siju Bat Cave, and Krem Liat Prah (Longest Cave)' },
    { id: 'Garo Hills Wilderness & Biodiversity', label: 'Garo Hills Wilderness & Biosphere', icon: '🐅', description: 'Balpakram National Park, Nokrek Biosphere, Tura Peak & Pelga Falls, and Simsang River' },
    { id: 'Indigenous Heritage & Whistling Groves', label: 'Whistling Village & Sacred Groves', icon: '🎶', description: 'Kongthong Whistling Village, Mawphlang Sacred Forest, Wahkhen Bamboo Trek, and Nartiang Monoliths' }
];

export const MEGHALAYA_CATEGORIES = [
    { id: 'all', label: 'All Meghalaya', icon: '🌟', description: 'Explore all 32 curated destinations across Meghalaya — The Abode of Clouds' },
    { id: 'bridges', label: 'Root Bridges & Village', icon: '🌿', description: 'Double Decker Living Root Bridge, Mawlynnong Cleanest Village, and Mawlyngbna' },
    { id: 'waterfalls', label: 'Waterfalls & Pools', icon: '💧', description: 'Nohkalakai, Krang Suri, Wei Sawdong, Phe Phe Falls, Rainbow Falls, and Dainthlen' },
    { id: 'caves', label: 'Sacred Caves', icon: '🦇', description: 'Mawsmai Cave, Arwah Lumshynna Fossil Cave, Siju Cave, and Krem Liat Prah' },
    { id: 'lakes', label: 'Crystal Waters & Lakes', icon: '🛶', description: 'Dawki Umngot River, Umiam Lake Barapani, Thadlaskein Lake, and Ranikor' },
    { id: 'hills', label: 'Cloud Hills & Canyons', icon: '⛰️', description: 'Laitlum Canyons, Shillong Peak, Mawsynram, Wahkhen Bamboo Trek, and Tura Peak' },
    { id: 'wildlife', label: 'Garo Biosphere & Parks', icon: '🐅', description: 'Balpakram Grand Canyon, Nokrek Biosphere, Simsang River, and Rongbang Dare' },
    { id: 'culture', label: 'Sacred Groves & Lore', icon: '🎶', description: 'Kongthong Whistling Village, Mawphlang Sacred Grove, Nartiang Monoliths, and Jakrem' }
];

export const matchMeghalayaCategory = (destination, categoryId) => {
    if (!destination || !categoryId || categoryId === 'all') return true;
    const cat = (destination.category || '').toLowerCase();
    const circuit = (destination.meghalayaCircuit || '').toLowerCase();
    const name = (destination.name || '').toLowerCase();
    const highlights = (destination.highlights || []).join(' ').toLowerCase();

    switch (categoryId) {
        case 'bridges':
            return circuit.includes('root') || name.includes('root bridge') || name.includes('mawlynnong') || name.includes('mawlyngbna') || highlights.includes('root bridge');
        case 'waterfalls':
            return cat.includes('waterfall') || circuit.includes('waterfall') || name.includes('falls') || name.includes('cascade');
        case 'caves':
            return circuit.includes('cave') || name.includes('cave') || highlights.includes('cave') || highlights.includes('fossil');
        case 'lakes':
            return cat.includes('lake') || cat.includes('water sport') || name.includes('river') || name.includes('lake') || name.includes('dawki') || name.includes('umngot') || name.includes('umiam');
        case 'hills':
            return circuit.includes('canyon') || name.includes('laitlum') || name.includes('peak') || name.includes('trek') || name.includes('mawsynram') || name.includes('tura');
        case 'wildlife':
            return cat.includes('wildlife') || circuit.includes('wildlife') || circuit.includes('biosphere') || name.includes('balpakram') || name.includes('nokrek') || name.includes('simsang');
        case 'culture':
            return cat.includes('heritage') || cat.includes('culture') || circuit.includes('whistling') || circuit.includes('heritage') || name.includes('kongthong') || name.includes('mawphlang') || name.includes('nartiang') || name.includes('jakrem') || name.includes('sohpetbneng');
        default:
            return true;
    }
};

/**
 * Comprehensive 12 Districts Directory Modal for Meghalaya
 */
export const MeghalayaDistrictsModal = ({
    isOpen = false,
    onClose = () => {},
    onSelectDistrict = () => {},
    currentDistrict = 'all'
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeRegion, setActiveRegion] = useState('All Regions');

    const districtCounts = useMemo(() => {
        const counts = {};
        meghalayaDestinations.forEach(d => {
            if (d.district) {
                counts[d.district] = (counts[d.district] || 0) + 1;
            }
        });
        return counts;
    }, []);

    const filteredDistricts = useMemo(() => {
        return MEGHALAYA_ALL_DISTRICTS.filter(dist => {
            const matchesRegion = activeRegion === 'All Regions' || dist.region === activeRegion;
            const matchesSearch = dist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dist.headquarter.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesRegion && matchesSearch;
        });
    }, [activeRegion, searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="meghalaya-modal-backdrop" onClick={onClose}>
            <div className="meghalaya-modal-container" onClick={e => e.stopPropagation()}>
                <div className="meghalaya-modal-header">
                    <div className="meghalaya-modal-title-wrap">
                        <MapPin size={22} className="text-cyan-400" />
                        <div>
                            <h3 className="meghalaya-modal-title">Meghalaya Districts Directory</h3>
                            <span style={{ fontSize: '0.78rem', color: '#67e8f9' }}>
                                Explore All 12 Districts Across Khasi, Jaintia, Garo Hills & Ri-Bhoi
                            </span>
                        </div>
                        <span className="meghalaya-modal-badge">
                            {meghalayaDestinations.length} Curated Destinations
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="meghalaya-modal-close-btn"
                        title="Close Modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="meghalaya-modal-body">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search district by name or headquarters (e.g. East Khasi Hills, Shillong, Jowai, Tura, Nongpoh)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="meghalaya-modal-search"
                        autoFocus
                    />

                    {/* Region Filter Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                        {MEGHALAYA_DIVISIONS.map(reg => (
                            <button
                                key={reg}
                                type="button"
                                onClick={() => setActiveRegion(reg)}
                                style={{
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                    background: activeRegion === reg ? 'linear-gradient(135deg, #0284c7, #06b6d4)' : 'rgba(255, 255, 255, 0.06)',
                                    color: activeRegion === reg ? '#ffffff' : '#cbd5e1',
                                    border: `1px solid ${activeRegion === reg ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)'}`,
                                    cursor: 'pointer'
                                }}
                            >
                                {reg}
                            </button>
                        ))}
                    </div>

                    {/* Districts Grid */}
                    <div className="meghalaya-districts-grid">
                        <button
                            type="button"
                            onClick={() => {
                                onSelectDistrict('all');
                                onClose();
                            }}
                            className={`meghalaya-district-pill ${currentDistrict === 'all' ? 'active' : ''}`}
                        >
                            <span className="meghalaya-district-name">🌟 All Meghalaya Districts</span>
                            <span className="meghalaya-district-count">{meghalayaDestinations.length}</span>
                        </button>
                        {filteredDistricts.map(dist => {
                            const count = districtCounts[dist.name] || 0;
                            const isSelected = currentDistrict.toLowerCase() === dist.name.toLowerCase();
                            return (
                                <button
                                    key={dist.name}
                                    type="button"
                                    onClick={() => {
                                        onSelectDistrict(dist.name);
                                        onClose();
                                    }}
                                    className={`meghalaya-district-pill ${isSelected ? 'active' : ''}`}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                                        <span className="meghalaya-district-name">{dist.name}</span>
                                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>HQ: {dist.headquarter} · {dist.region}</span>
                                    </div>
                                    <span className="meghalaya-district-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="meghalaya-modal-footer">
                    <span>💡 Tip: Select any district to filter all curated Living Root Bridges, waterfalls, sacred caves, and mountain trails.</span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="meghalaya-modal-done-btn"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * MeghalayaDistrictIntelligenceSuite Component
 * Embedded rich intelligence suite for any Meghalaya destination detail view.
 */
export const MeghalayaDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const { addDestinationToDay } = useItineraryStore();

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [completedActivities, setCompletedActivities] = useState({});

    // Audio Narrative Engine (SpeechSynthesis for high-fidelity interactive local audio tour)
    const handleToggleAudio = () => {
        if (!('speechSynthesis' in window)) {
            addToast('Audio narration not supported in your browser.', 'info');
            return;
        }

        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const narrativeText = `Welcome to ${destination.name}, situated in ${destination.district || 'Meghalaya'}, the Abode of Clouds. ${destination.aiInsight || ''} Key highlights include: ${(destination.highlights || []).slice(0, 3).join('. ')}. Savor authentic Khasi, Jaintia, and Garo delicacies including ${destination.localCuisine || 'Jadoh and Dohkhlieh'}. Plan your visit during ${destination.bestSeason || 'the post-monsoon winter months'}.`;

        const utterance = new SpeechSynthesisUtterance(narrativeText);
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
        <div className="meghalaya-intelligence-suite-container" data-testid="meghalaya-intelligence-suite">
            {/* Header Hero */}
            <div className="meghalaya-suite-hero">
                <div className="meghalaya-suite-hero-badge-row">
                    <span className="meghalaya-badge-division">
                        ⛰️ {destination.division || 'Khasi Hills'} Region
                    </span>
                    {destination.meghalayaCircuit && (
                        <span className="meghalaya-badge-circuit">
                            ☁️ {destination.meghalayaCircuit}
                        </span>
                    )}
                    {destination.odop && (
                        <span className="meghalaya-badge-gi">
                            ✨ GI / ODOP: {destination.odop}
                        </span>
                    )}
                </div>

                <h2 className="meghalaya-suite-title">
                    <span>☁️</span>
                    <span>{destination.name} District Intelligence Suite</span>
                </h2>

                <p className="meghalaya-suite-desc">
                    {destination.aiInsight || `Explore ${destination.name} in the heart of Meghalaya, offering ancient living root bio-engineering, crystal clear mountain rivers, world-record rainfall wonders, and deep limestone caverns.`}
                </p>

                {/* Ambient Audio Narrative Bar */}
                <div className="meghalaya-audio-bar">
                    <div className="meghalaya-audio-left">
                        <button
                            type="button"
                            onClick={handleToggleAudio}
                            className="meghalaya-audio-play-btn"
                            title={isPlaying ? 'Pause Audio Narrative' : 'Play Audio Narrative'}
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                        </button>
                        <div className="meghalaya-audio-text-group">
                            <span className="meghalaya-audio-title">
                                {isPlaying ? 'Playing Audio Narrative' : 'Listen to Destination Narrative'}
                            </span>
                            <span className="meghalaya-audio-sub">
                                Ambient Heritage Audio Guide · {destination.district || 'Meghalaya'}
                            </span>
                        </div>
                    </div>

                    <div className="meghalaya-audio-right">
                        <button
                            type="button"
                            onClick={() => {
                                setIsMuted(!isMuted);
                                if (window.speechSynthesis) {
                                    if (!isMuted) window.speechSynthesis.pause();
                                    else window.speechSynthesis.resume();
                                }
                            }}
                            className="meghalaya-audio-mute-btn"
                        >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Core Highlights & Curated Field Activities Grid */}
            <div className="meghalaya-suite-grid">
                {/* 1. Iconic Highlights */}
                <div className="meghalaya-card-panel">
                    <div className="meghalaya-card-header">
                        <div className="meghalaya-card-header-title">
                            <Sparkles size={16} className="text-cyan-400" />
                            <span>Iconic Landmarks & Highlights</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#67e8f9' }}>
                            {destination.highlights?.length || 5} Key Attractions
                        </span>
                    </div>

                    <div className="meghalaya-highlights-list">
                        {(destination.highlights || [
                            `${destination.name} Scenic Viewpoint`,
                            `Living Root Bridge Bio-engineering`,
                            `Crystal Mountain Waters & Waterfalls`,
                            `Prehistoric Karst Caves & Rainforest Trails`
                        ]).map((highlight, idx) => (
                            <div key={idx} className="meghalaya-highlight-item">
                                <div className="meghalaya-highlight-bullet" />
                                <span>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Curated Field Activities */}
                <div className="meghalaya-card-panel">
                    <div className="meghalaya-card-header">
                        <div className="meghalaya-card-header-title">
                            <Compass size={16} className="text-amber-400" />
                            <span>Curated Field Experiences</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                            Interactive Checklist (+30 XP)
                        </span>
                    </div>

                    <div className="meghalaya-activities-list">
                        {(destination.activities || [
                            `Trek the guided scenic route around ${destination.name}`,
                            `Sample authentic local Khasi, Jaintia, or Garo cuisine`,
                            `Photograph panoramic vistas during golden sunrise/sunset`,
                            `Engage with local indigenous community eco-guides`
                        ]).map((act, idx) => {
                            const isDone = completedActivities[idx];
                            return (
                                <div key={idx} className={`meghalaya-activity-item ${isDone ? 'completed' : ''}`}>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleActivity(idx, act)}
                                        className="meghalaya-activity-check-btn"
                                        title={isDone ? 'Mark as Incomplete' : 'Complete Activity (+30 XP)'}
                                    >
                                        <Check size={12} className={isDone ? 'opacity-100' : 'opacity-0'} />
                                    </button>
                                    <span className="meghalaya-activity-text">{act}</span>
                                    <button
                                        type="button"
                                        onClick={() => handlePlanStop(act)}
                                        className="meghalaya-activity-plan-btn"
                                        title="Add to Itinerary"
                                    >
                                        <Plus size={12} />
                                        <span>Plan</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Travel Essentials & Logistics Panel */}
            <div className="meghalaya-logistics-panel">
                <div className="meghalaya-logistics-grid">
                    <div className="meghalaya-logistics-item">
                        <Sun size={18} className="text-amber-400" />
                        <div>
                            <span className="meghalaya-logistics-label">Optimal Season</span>
                            <span className="meghalaya-logistics-val">{destination.bestSeason || 'October to April'}</span>
                        </div>
                    </div>

                    <div className="meghalaya-logistics-item">
                        <Navigation size={18} className="text-cyan-400" />
                        <div>
                            <span className="meghalaya-logistics-label">Nearest Airport</span>
                            <span className="meghalaya-logistics-val">{destination.nearestAirport || 'Shillong (SHL) / Guwahati (GAU)'}</span>
                        </div>
                    </div>

                    <div className="meghalaya-logistics-item">
                        <Train size={18} className="text-emerald-400" />
                        <div>
                            <span className="meghalaya-logistics-label">Rail Head</span>
                            <span className="meghalaya-logistics-val">{destination.railConnectivity || 'Guwahati Junction (GHY)'}</span>
                        </div>
                    </div>

                    <div className="meghalaya-logistics-item">
                        <Utensils size={18} className="text-rose-400" />
                        <div>
                            <span className="meghalaya-logistics-label">Authentic Cuisine</span>
                            <span className="meghalaya-logistics-val">{destination.localCuisine || 'Jadoh, Dohkhlieh, Tungrymbai, Nakham Bitchi'}</span>
                        </div>
                    </div>
                </div>

                {/* Travel Tips Accordion / Notes */}
                {destination.travelTips && destination.travelTips.length > 0 && (
                    <div className="meghalaya-travel-tips-card">
                        <div className="meghalaya-tips-header">
                            <AlertCircle size={16} className="text-cyan-400" />
                            <span>Field Advisory & Travel Tips</span>
                        </div>
                        <ul className="meghalaya-tips-list">
                            {destination.travelTips.map((tip, idx) => (
                                <li key={idx} className="meghalaya-tip-item">
                                    <span className="meghalaya-tip-bullet">💡</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeghalayaDistrictIntelligenceSuite;
