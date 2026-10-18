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
import { chhattisgarhDestinations } from '../../../data/chhattisgarhDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';

export const CG_DIVISIONS = [
    'All Divisions',
    'Bastar',
    'Bilaspur',
    'Durg',
    'Raipur',
    'Surguja'
];

export const CG_CIRCUITS = [
    { id: 'all', label: 'All CG Destinations', icon: '🌿', description: 'Complete directory across all 33 districts of Chhattisgarh' },
    { id: 'Waterfalls & River Canyons', label: 'Waterfalls & River Canyons', icon: '🌊', description: 'Chitrakote (Niagara of India), Tirathgarh, Amrit Dhara, Jatmai-Ghatarani, Siyadevi' },
    { id: 'Tribal Heritage & Bastar Arts', label: 'Bastar Arts & Tribal Guilds', icon: '🏺', description: 'Dhokra bell metal, terracotta, wooden crafts, Bastar Dussehra, Purkhouti Muktangan' },
    { id: 'Tiger Corridors & Wildlife', label: 'Tigers & Wildlife Reserves', icon: '🐅', description: 'Achanakmar Biosphere, Indravati wild buffalo reserve, Barnawapara, Guru Ghasidas, Udanti' },
    { id: 'Ancient Temples & Shaktipeeths', label: 'Shaktipeeths & Ancient Tirthas', icon: '🕉️', description: 'Dantewada Danteshwari, Dongargarh Bamleshwari, Ratanpur Mahamaya, Bhoramdeo Nagara' },
    { id: 'Sirpur Buddhist & Heritage Circuit', label: 'Sirpur Buddhist & Brick Shrines', icon: '🏛️', description: 'Sirpur 7th-century brick Laxman Temple, Anand Prabhu Vihara, Champa Kosa silk' },
    { id: 'Green Hills, Plateaus & Tea Valleys', label: 'Plateaus, Hills & Tea Valleys', icon: '⛰️', description: 'Mainpat (Tibet of CG) Ulta Pani, Jashpur green tea gardens, Chaiturgarh 3,060ft citadel' }
];

export const CG_CATEGORIES = [
    { id: 'all', label: 'All Interests', icon: '🌟', description: 'Explore all 33 districts across Chhattisgarh' },
    { id: 'waterfalls', label: 'Waterfalls & Gorges', icon: '🌊', description: 'Chitrakote Niagara of India, Tirathgarh cascades, Amrit Dhara, Jatmai' },
    { id: 'tribal', label: 'Tribal Lore & Dhokra', icon: '🏺', description: 'Dhokra lost-wax bell metal, terracotta, open-air museums, indigenous cultures' },
    { id: 'wildlife', label: 'Wildlife & Tigers', icon: '🐾', description: 'Achanakmar tiger reserve, wild Asian water buffalo, Barnawapara gaurs' },
    { id: 'historical', label: 'Ancient Heritage', icon: '🏛️', description: 'Bhoramdeo (Khajuraho of CG), Sirpur Buddhist Vihara, 7th-century brick Laxman temple' },
    { id: 'spiritual', label: 'Shaktipeeths & Temples', icon: '🕉️', description: 'Dantewada 52 Shaktipeeth, Dongargarh 1,600ft ropeway, Ratanpur Mahamaya' },
    { id: 'nature', label: 'Hills & Water Sports', icon: '⛰️', description: 'Mainpat hill station, Jashpur tea valleys, Gangrel Dam water sports' }
];

export const matchCGCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.cgCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.odop || ''}`.toLowerCase();

    if (categoryId === 'waterfalls') {
        if (cat.includes('waterfall') || circuit.includes('waterfall') || name.includes('fall') || name.includes('dhara') || name.includes('cascade')) return true;
        return tags.some(t => ['waterfall', 'waterfalls', 'cascade', 'cascades', 'plunge', 'gorge', 'niagara'].includes(t));
    }

    if (categoryId === 'tribal') {
        if (cat.includes('tribal') || cat.includes('culture') || circuit.includes('tribal') || circuit.includes('art')) return true;
        if (name.includes('dhokra') || name.includes('bastar') || name.includes('tribal') || name.includes('muktangan') || name.includes('museum') || name.includes('gond')) return true;
        return tags.some(t => ['dhokra', 'tribal', 'bell metal', 'crafts', 'terracotta', 'gond', 'culture'].includes(t));
    }

    if (categoryId === 'wildlife') {
        if (cat === 'wildlife' || circuit.includes('wildlife') || circuit.includes('tiger')) return true;
        if (name.includes('national park') || name.includes('tiger') || name.includes('wildlife') || name.includes('sanctuary') || name.includes('reserve') || name.includes('buffalo')) return true;
        return tags.some(t => ['tiger', 'wildlife', 'safari', 'national park', 'sanctuary', 'buffalo', 'gaur', 'biodiversity'].includes(t));
    }

    if (categoryId === 'historical') {
        if (cat === 'historical' || circuit.includes('heritage') || circuit.includes('buddhist')) return true;
        if (name.includes('temple') || name.includes('fort') || name.includes('palace') || name.includes('citadel') || name.includes('ruins') || name.includes('laxman') || name.includes('bhoramdeo') || name.includes('sirpur') || name.includes('unesco')) return true;
        return tags.some(t => ['unesco', 'brick temple', 'buddhist', 'nagara', 'kalachuri', 'palace', 'fort', 'heritage'].includes(t));
    }

    if (categoryId === 'spiritual') {
        if (cat === 'spiritual' || circuit.includes('shaktipeeth') || circuit.includes('temple')) return true;
        if (name.includes('shaktipeeth') || name.includes('devi') || name.includes('danteshwari') || name.includes('bamleshwari') || name.includes('mahamaya') || name.includes('mandir') || name.includes('shrine') || name.includes('shivling') || name.includes('kund')) return true;
        return tags.some(t => ['shaktipeeth', 'temple', 'pilgrimage', 'spiritual', 'shrine', 'kund'].includes(t));
    }

    if (categoryId === 'nature') {
        if (cat === 'nature' || circuit.includes('hills') || circuit.includes('plateau') || circuit.includes('tea')) return true;
        if (name.includes('hill') || name.includes('mainpat') || name.includes('tea') || name.includes('dam') || name.includes('valley') || name.includes('gangrel') || name.includes('lake') || name.includes('canyon')) return true;
        return tags.some(t => ['hill station', 'tea gardens', 'dam', 'lake', 'plateau', 'anti-gravity', 'nature'].includes(t));
    }

    return cat.includes(categoryId.toLowerCase()) || circuit.includes(categoryId.toLowerCase()) || tags.includes(categoryId.toLowerCase());
};

export const CGDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();
    const { addDestinationToDay } = useItineraryStore();

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [selectedTab, setSelectedTab] = useState('heritage'); // 'heritage' | 'activities' | 'tips' | 'telemetry' | 'odop' | 'cuisine'
    const [completedActs, setCompletedActs] = useState({});
    const synthRef = useRef(typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null);

    const destDistrict = destination?.district || 'Raipur';
    const destDivision = destination?.division || 'Raipur';
    const destId = destination?.id;

    const activitiesList = destination?.activities && destination.activities.length > 0
        ? destination.activities
        : [
            `Embark on a guided morning exploration of ${destination?.name || 'this destination'}`,
            `Engage with local Bastar bell metal and Dhokra artisan workshops`,
            `Capture sunrise and sunset landscape vistas across the regional viewpoints`,
            `Taste authentic Chhattisgarhi steamed Farra and Chila at village haats`
        ];

    const travelTipsList = destination?.travelTips && destination.travelTips.length > 0
        ? destination.travelTips
        : [
            `Best season to visit is ${destination?.bestSeason || 'October to March'} for pleasant weather.`,
            `Carry sufficient local currency notes for tribal markets and remote handicraft haats.`,
            `Ensure sturdy footwear for nature trails, waterfalls, and ancient temple steps.`,
            `Nearest airport and SECR railhead: ${destination?.nearestAirport || 'Raipur (RPR)'} / ${destination?.railConnectivity || 'SECR Network'}.`
        ];

    const toggleActComplete = (idx, text) => {
        setCompletedActs(prev => {
            const next = { ...prev, [idx]: !prev[idx] };
            if (next[idx]) {
                addXP(35);
                addToast(`Logged experience: "${text.slice(0, 34)}..." (+35 XP) 🌿`, 'success');
            }
            return next;
        });
    };

    const copyTipsToClipboard = () => {
        const textToCopy = `Travel Tips for ${destination.name} (${destDistrict} District, Chhattisgarh):\n\n` +
            travelTipsList.map((tip, i) => `${i + 1}. ${tip}`).join('\n') +
            `\n\nOptimal Season: ${destination.bestSeason || 'Oct – Mar'}\nAir: ${destination.nearestAirport || 'Raipur (RPR)'}\nRail: ${destination.railConnectivity || 'SECR Network'}`;
        navigator.clipboard?.writeText(textToCopy);
        addToast('Copied Chhattisgarh Travel Tips to clipboard! 📋', 'success');
    };

    // Same district or division siblings
    const nearbySpots = useMemo(() => {
        return chhattisgarhDestinations.filter(
            d => d.division === destDivision && d.id !== destId
        ).slice(0, 4);
    }, [destDivision, destId]);

    // Speech Synthesis for Audio Heritage Narrator
    useEffect(() => {
        const synth = synthRef.current;
        return () => {
            if (synth && isPlayingAudio) {
                synth.cancel();
            }
        };
    }, [isPlayingAudio]);

    const toggleAudioGuide = () => {
        if (!synthRef.current) {
            addToast('Audio narration is not supported in this browser.', 'info');
            return;
        }

        if (isPlayingAudio) {
            synthRef.current.cancel();
            setIsPlayingAudio(false);
            setAudioProgress(0);
        } else {
            synthRef.current.cancel();
            const narrationText = `Welcome to ${destination.name} in ${destDistrict} District, situated in the scenic ${destDivision} division of Chhattisgarh. ${destination.aiInsight || ''} Key highlights include: ${(destination.highlights || []).join(', ')}. Local culinary treasures include ${destination.localCuisine || 'Farra and Chila with spicy Chutney'}. The One District One Product craft here is ${destination.odop || 'Bastar Bell Metal Crafts'}.`;
            const utterance = new SpeechSynthesisUtterance(narrationText);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;
            utterance.onend = () => {
                setIsPlayingAudio(false);
                setAudioProgress(100);
                addXP(40);
                addToast('Audio Heritage Narration completed (+40 XP)', 'success');
            };
            utterance.onerror = () => {
                setIsPlayingAudio(false);
                setAudioProgress(0);
            };
            synthRef.current.speak(utterance);
            setIsPlayingAudio(true);
            addToast('Playing Chhattisgarhi Heritage Audio Narrator 🌿', 'info');
        }
    };

    return (
        <section className="up-district-suite-container cg-theme" aria-label="Chhattisgarh District Intelligence Suite">
            {/* Suite Header */}
            <div className="up-suite-header-banner" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.22) 0%, rgba(4, 120, 87, 0.3) 100%)', borderColor: 'rgba(16, 185, 129, 0.45)' }}>
                <div className="suite-header-info">
                    <span className="suite-eyebrow" style={{ color: '#6ee7b7' }}>
                        🌿 Chhattisgarh Tourism · Full of Surprises · {destDistrict} District
                    </span>
                    <h3 className="suite-title">
                        {destDistrict} District Intelligence & Tribal Heritage Hub
                    </h3>
                    <p className="suite-desc">
                        Part of the <strong>{destDivision} Division</strong> · Circuit: <strong>{destination.cgCircuit || 'Waterfalls & River Canyons'}</strong> · ODOP: <strong>{destination.odop || 'Bastar Dhokra Arts'}</strong>
                    </p>
                </div>

                {/* Audio Narrator Button */}
                <div className="suite-audio-action">
                    <button
                        type="button"
                        onClick={toggleAudioGuide}
                        className={`suite-audio-btn ${isPlayingAudio ? 'is-playing' : ''}`}
                        style={isPlayingAudio ? { background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderColor: '#10b981' } : {}}
                        title={isPlayingAudio ? 'Stop audio narrator' : 'Listen to Chhattisgarhi Heritage Audio Guide'}
                    >
                        {isPlayingAudio ? <Pause size={16} /> : <Volume2 size={16} />}
                        <span>{isPlayingAudio ? 'Pause Narration' : 'Listen Heritage Audio'}</span>
                    </button>
                    {isPlayingAudio && (
                        <div className="audio-live-indicator">
                            <span className="live-wave-bar" />
                            <span className="live-wave-bar" />
                            <span className="live-wave-bar" />
                            <span className="audio-time-hint">Playing Lore...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Interactive Sub-Tabs */}
            <div className="up-suite-tabs-nav" role="tablist">
                {[
                    { id: 'heritage', label: 'Cultural Lore & AI Insight', icon: Landmark },
                    { id: 'activities', label: `Activities (${activitiesList.length})`, icon: Sparkles },
                    { id: 'tips', label: `Travel Tips (${travelTipsList.length})`, icon: ShieldCheck },
                    { id: 'telemetry', label: 'District Matrix & Transit', icon: Train },
                    { id: 'odop', label: 'ODOP & Tribal Guild', icon: Award },
                    { id: 'cuisine', label: 'Flavors & Forest Fare', icon: Utensils }
                ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = selectedTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            className={`up-suite-tab-btn ${isActive ? 'active' : ''}`}
                            onClick={() => setSelectedTab(tab.id)}
                            style={isActive ? { borderColor: '#10b981', color: '#6ee7b7', background: 'rgba(5, 150, 105, 0.16)' } : {}}
                        >
                            <Icon size={14} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Panes */}
            <div className="up-suite-tab-content">
                {selectedTab === 'heritage' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="up-tab-pane"
                    >
                        <div className="up-insight-quote-box" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(5, 150, 105, 0.08)' }}>
                            <div className="quote-icon-wrap" style={{ color: '#10b981' }}>
                                <Sparkles size={20} />
                            </div>
                            <div className="quote-text-wrap">
                                <h4 className="quote-title">Curated Chhattisgarhi Tribal & Natural Lore</h4>
                                <p className="quote-body">
                                    {destination.aiInsight || 'Richly endowed with dense sal and teak canopies, prehistoric rock art, tribal handicraft guilds, and roaring cascades, this location represents the authentic heart of Central India.'}
                                </p>
                            </div>
                        </div>

                        {/* Highlights Grid */}
                        <div className="up-highlights-grid">
                            {(destination.highlights || [
                                'Niagara of India Cascades',
                                'Ancient 75-Day Bastar Dussehra Traditions',
                                'Subterranean Limestone Cave Formations',
                                'Master Dhokra & Bell Metal Artisan Guilds'
                            ]).map((hl, idx) => (
                                <div key={idx} className="up-highlight-card" style={{ borderColor: 'rgba(16, 185, 129, 0.25)' }}>
                                    <span className="hl-check" style={{ color: '#10b981' }}>✓</span>
                                    <span className="hl-text">{hl}</span>
                                </div>
                            ))}
                        </div>

                        {/* Division Siblings Explorer */}
                        {nearbySpots.length > 0 && (
                            <div className="up-nearby-cluster-block" style={{ marginTop: '24px' }}>
                                <div className="cluster-header-row">
                                    <h4 className="cluster-title">
                                        More Wonders in the {destDivision} Division
                                    </h4>
                                    <span className="cluster-sub">
                                        Explore nearby destinations within the same regional administrative division
                                    </span>
                                </div>
                                <div className="cluster-cards-row">
                                    {nearbySpots.map(spot => (
                                        <div
                                            key={spot.id}
                                            className="cluster-mini-card"
                                            onClick={() => navigate(`/explore/destinations/${spot.id}`)}
                                            style={{ borderColor: 'rgba(16, 185, 129, 0.25)' }}
                                        >
                                            <img src={spot.image} alt={spot.name} loading="lazy" />
                                            <div className="cluster-mini-info">
                                                <span className="mini-district">{spot.district}</span>
                                                <h5 className="mini-name">{spot.name}</h5>
                                                <span className="mini-circuit">{spot.cgCircuit}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Tab: Curated Activities & Experiences */}
                {selectedTab === 'activities' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="up-tab-pane"
                    >
                        <div className="up-insight-quote-box" style={{ borderColor: 'rgba(16, 185, 129, 0.45)', background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.12) 0%, rgba(4, 120, 87, 0.18) 100%)' }}>
                            <div className="quote-icon-wrap" style={{ color: '#10b981' }}>
                                <Sparkles size={22} />
                            </div>
                            <div className="quote-text-wrap">
                                <h4 className="quote-title">Curated Experiences & Field Activities in {destination.name}</h4>
                                <p className="quote-body">
                                    Handpicked cultural, adventure, and eco-tourism activities across {destDistrict} District. Check off experiences you've completed (+35 XP) or add them straight into your Nomad Trip Planner.
                                </p>
                            </div>
                        </div>

                        <div className="cg-activities-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                            {activitiesList.map((act, idx) => {
                                const isDone = Boolean(completedActs[idx]);
                                return (
                                    <div
                                        key={idx}
                                        className={`cg-activity-card ${isDone ? 'is-completed' : ''}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between',
                                            gap: '16px',
                                            padding: '16px 18px',
                                            background: isDone ? 'rgba(5, 150, 105, 0.18)' : 'rgba(15, 23, 42, 0.65)',
                                            border: `1px solid ${isDone ? '#10b981' : 'rgba(16, 185, 129, 0.22)'}`,
                                            borderRadius: '12px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
                                            <span
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minWidth: '28px',
                                                    height: '28px',
                                                    borderRadius: '8px',
                                                    background: isDone ? '#10b981' : 'rgba(16, 185, 129, 0.15)',
                                                    color: isDone ? '#ffffff' : '#6ee7b7',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 700
                                                }}
                                            >
                                                #{String(idx + 1).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: '1.5', color: isDone ? '#a7f3d0' : '#f1f5f9', fontWeight: 500, textDecoration: isDone ? 'line-through' : 'none' }}>
                                                    {act}
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                                                    <span style={{ fontSize: '0.72rem', color: '#6ee7b7', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                                                        🌿 {destination.cgCircuit || 'Chhattisgarh Circuit'}
                                                    </span>
                                                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                                        📍 {destDistrict} District
                                                    </span>
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
                                                    padding: '6px 12px',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    background: 'rgba(245, 158, 11, 0.18)',
                                                    border: '1px solid rgba(245, 158, 11, 0.35)',
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
                                                onClick={() => toggleActComplete(idx, act)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    padding: '6px 12px',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    background: isDone ? '#10b981' : 'rgba(255, 255, 255, 0.06)',
                                                    border: `1px solid ${isDone ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                                                    color: isDone ? '#ffffff' : '#cbd5e1',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer'
                                                }}
                                                title={isDone ? 'Mark as incomplete' : 'Mark activity as experienced (+35 XP)'}
                                            >
                                                <CheckCircle2 size={13} />
                                                <span>{isDone ? 'Done ✓' : 'Complete (+35 XP)'}</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Tab: Essential Travel Tips & Advisory */}
                {selectedTab === 'tips' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="up-tab-pane"
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                                    Essential Travel Tips & Advisory for {destination.name}
                                </h4>
                                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                    Local guidelines, seasonality notices, transport tips, and tribal etiquette
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={copyTipsToClipboard}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 14px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    background: 'rgba(16, 185, 129, 0.18)',
                                    border: '1px solid rgba(16, 185, 129, 0.4)',
                                    color: '#6ee7b7',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Copy size={13} />
                                <span>Copy Tips Guide</span>
                            </button>
                        </div>

                        {/* Seasonal Advisory Banner */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.22) 100%)',
                            border: '1px solid rgba(6, 182, 212, 0.35)',
                            marginBottom: '16px'
                        }}>
                            <Sun size={22} className="text-cyan-400" />
                            <div>
                                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#67e8f9', fontWeight: 700, display: 'block' }}>
                                    Optimal Visiting Window
                                </span>
                                <strong style={{ color: '#ffffff', fontSize: '0.96rem' }}>
                                    {destination.bestSeason || 'October to March (Post-monsoon cascades & pleasant winter sun)'}
                                </strong>
                            </div>
                        </div>

                        {/* Tips Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
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
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        color: '#6ee7b7',
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
                                        <h5 style={{ margin: '0 0 6px 0', fontSize: '0.86rem', fontWeight: 700, color: '#6ee7b7' }}>
                                            Tip #{idx + 1}
                                        </h5>
                                        <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.5', color: '#e2e8f0' }}>
                                            {tip}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Tab 2: District Matrix & Transit */}
                {selectedTab === 'telemetry' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="up-tab-pane"
                    >
                        <div className="up-telemetry-grid">
                            <div className="up-telem-card">
                                <span className="telem-label">Administrative Division</span>
                                <span className="telem-val">{destDivision} Division</span>
                                <span className="telem-sub">State of Chhattisgarh (33 Districts)</span>
                            </div>

                            <div className="up-telem-card">
                                <span className="telem-label">Air Connectivity</span>
                                <span className="telem-val">
                                    {destination.nearestAirport?.split('-')[0] || 'Swami Vivekananda Airport (RPR)'}
                                </span>
                                <span className="telem-sub">{destination.nearestAirport || 'Raipur (RPR) / Jagdalpur (JGB) / Bilaspur (PAB)'}</span>
                            </div>

                            <div className="up-telem-card">
                                <span className="telem-label">Railway Mainlines</span>
                                <span className="telem-val">
                                    {destination.railConnectivity?.split('-')[0] || 'Raipur / Bilaspur / Durg Junction'}
                                </span>
                                <span className="telem-sub">{destination.railConnectivity || 'SECR Railway Network Corridor'}</span>
                            </div>

                            <div className="up-telem-card">
                                <span className="telem-label">Optimal Travel Season</span>
                                <span className="telem-val">{destination.bestSeason || 'Oct – Mar'}</span>
                                <span className="telem-sub">Pleasant Winter Breezes & Post-Monsoon Cascades</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tab 3: ODOP & Artisan Guild */}
                {selectedTab === 'odop' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="up-tab-pane"
                    >
                        <div className="up-odop-spotlight-box" style={{ borderColor: 'rgba(16, 185, 129, 0.45)', background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.12) 0%, rgba(4, 120, 87, 0.18) 100%)' }}>
                            <div className="odop-icon-badge" style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#6ee7b7' }}>
                                🏺
                            </div>
                            <div className="odop-details">
                                <span className="odop-tag" style={{ color: '#6ee7b7' }}>
                                    Official One District One Product (ODOP) & GI Craft
                                </span>
                                <h4 className="odop-craft-title">{destination.odop || 'Bastar Dhokra Bell Metal & Terracotta'}</h4>
                                <p className="odop-craft-desc">
                                    Chhattisgarh’s ancient tribes have preserved the 4,000-year-old lost-wax casting technique (Dhokra), GI-tagged Kosa Tussar silk weaving in Champa, wrought iron smithing (Loha Shilp), and Godna tribal tattoo paintings.
                                </p>
                                <div className="odop-perks-row">
                                    <span className="odop-perk-pill">Direct Master Artisan Purchase</span>
                                    <span className="odop-perk-pill">Ethical Tribal Fair Trade</span>
                                    <span className="odop-perk-pill">Global GI Certified</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tab 4: Local Chhattisgarhi Cuisine */}
                {selectedTab === 'cuisine' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="up-tab-pane"
                    >
                        <div className="up-cuisine-showcase">
                            <div className="cuisine-header-block">
                                <Utensils size={18} className="text-emerald-400" />
                                <h4>Authentic Chhattisgarhi Gastronomy & Forest Delicacies</h4>
                            </div>
                            <p className="cuisine-summary">
                                Known as India’s "Rice Bowl" (Dhan Ka Katora) and "Herbal State", Chhattisgarhi culinary traditions revolve around aromatic indigenous rice varieties (like Jeera Phool), minor millets (Kodon-Kutki), steamed dumplings, and tangy forest chutneys:
                            </p>
                            <div className="cuisine-items-tags">
                                {(destination.localCuisine || 'Farra, Chila, Dubki Kadi, Angakar Roti, Bafauri, Chaprah Red Ant Chutney, Muthia')
                                    .split(',')
                                    .map((dish, i) => (
                                        <span key={i} className="dish-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.45)', color: '#6ee7b7', background: 'rgba(5, 150, 105, 0.15)' }}>
                                            🍲 {dish.trim()}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export const CG33DistrictsModal = ({ isOpen, onClose, currentDistrict = '', onSelectDistrict }) => {
    const navigate = useNavigate();
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [districtSearch, setDistrictSearch] = useState('');

    const districtCards = useMemo(() => {
        const districtMap = new Map();
        chhattisgarhDestinations.forEach(d => {
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division,
                    destinations: [],
                    sampleImage: d.image,
                    odop: d.odop,
                    circuit: d.cgCircuit
                });
            }
            districtMap.get(d.district).destinations.push(d);
        });
        return Array.from(districtMap.values()).sort((a, b) => a.district.localeCompare(b.district));
    }, []);

    const filteredDistricts = useMemo(() => {
        return districtCards.filter(item => {
            if (selectedDivision !== 'All Divisions' && item.division !== selectedDivision) {
                return false;
            }
            if (districtSearch.trim()) {
                const q = districtSearch.toLowerCase();
                const matchesName = item.district.toLowerCase().includes(q);
                const matchesOdop = (item.odop || '').toLowerCase().includes(q);
                const matchesDest = item.destinations.some(d => d.name.toLowerCase().includes(q));
                if (!matchesName && !matchesOdop && !matchesDest) return false;
            }
            if (selectedCategory && selectedCategory !== 'all') {
                const matchesCat = item.destinations.some(d => matchCGCategory(d, selectedCategory));
                if (!matchesCat) return false;
            }
            return true;
        });
    }, [districtCards, selectedDivision, districtSearch, selectedCategory]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="up-districts-modal-overlay" onClick={onClose}>
                <motion.div
                    className="up-districts-modal-window"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="up-modal-header" style={{ borderBottomColor: 'rgba(16, 185, 129, 0.2)' }}>
                        <div className="up-modal-header-left">
                            <span className="up-modal-badge" style={{ background: 'rgba(5, 150, 105, 0.22)', color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.45)' }}>
                                🌿 Chhattisgarh Tourism · 33 Districts Directory
                            </span>
                            <h3 className="up-modal-title">
                                Explore All 33 Districts of Chhattisgarh
                            </h3>
                            <p className="up-modal-subtitle">
                                From Chitrakote Falls and Bastar Dhokra to Sirpur Buddhist monuments, Bhoramdeo Khajuraho of CG, and Mainpat mist plateaus.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="up-modal-close-btn"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Filter and Search Bar */}
                    <div className="up-modal-controls-bar">
                        <div className="up-modal-search-box">
                            <Search size={15} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by district name, ODOP craft, or landmark..."
                                value={districtSearch}
                                onChange={(e) => setDistrictSearch(e.target.value)}
                                className="modal-district-input"
                            />
                            {districtSearch && (
                                <button
                                    type="button"
                                    onClick={() => setDistrictSearch('')}
                                    className="clear-search-btn"
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        {/* Division filter tabs */}
                        <div className="up-modal-division-chips" role="group" aria-label="Filter by Division">
                            {CG_DIVISIONS.map(div => {
                                const isActive = selectedDivision === div;
                                return (
                                    <button
                                        key={div}
                                        type="button"
                                        onClick={() => setSelectedDivision(div)}
                                        className={`div-filter-chip ${isActive ? 'active' : ''}`}
                                        style={isActive ? {
                                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                            borderColor: '#10b981',
                                            color: '#ffffff',
                                            fontWeight: 600
                                        } : {}}
                                    >
                                        {div}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Category filter pills */}
                        <div className="up-modal-category-pills-row" style={{ marginTop: '10px' }} role="group" aria-label="Filter by Category">
                            {CG_CATEGORIES.map(cat => {
                                const isActive = (selectedCategory || 'all') === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`div-filter-chip ${isActive ? 'active' : ''}`}
                                        style={isActive ? {
                                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                            borderColor: '#10b981',
                                            color: '#ffffff',
                                            fontWeight: 600
                                        } : {}}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="up-modal-grid-viewport">
                        <div className="up-districts-cards-grid">
                            {filteredDistricts.map(item => {
                                const isCurrent = currentDistrict === item.district;
                                return (
                                    <div
                                        key={item.district}
                                        className={`up-district-grid-card ${isCurrent ? 'current-selected' : ''}`}
                                        onClick={() => {
                                            onSelectDistrict(item.district);
                                        }}
                                        title={`Filter by ${item.district} District`}
                                    >
                                        <div className="card-thumb-wrap">
                                            <img src={item.sampleImage} alt={item.district} loading="lazy" />
                                            <span className="card-division-badge">{item.division}</span>
                                            {isCurrent && <span className="card-active-check">✓ Active</span>}
                                        </div>

                                        <div className="card-body-wrap">
                                            <div className="card-title-row">
                                                <h4 className="card-district-name">{item.district}</h4>
                                                <span className="card-count-badge">
                                                    {item.destinations.length} spot{item.destinations.length === 1 ? '' : 's'}
                                                </span>
                                            </div>

                                            <div className="card-odop-snippet">
                                                <span className="odop-icon">🏺</span>
                                                <span className="odop-text">{item.odop || 'Artisan Crafts'}</span>
                                            </div>

                                            <div className="card-destinations-list">
                                                {item.destinations.map(d => (
                                                    <span key={d.id} className="dest-mini-chip">
                                                        • {d.name.split('(')[0].split('&')[0].trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="up-modal-footer">
                        <span className="footer-count-text">
                            Showing <strong>{filteredDistricts.length}</strong> of 33 Chhattisgarh Districts
                        </span>
                        <div className="footer-actions">
                            <button
                                type="button"
                                className="modal-reset-btn"
                                onClick={() => {
                                    setSelectedDivision('All Divisions');
                                    setSelectedCategory('all');
                                    setDistrictSearch('');
                                }}
                            >
                                Reset Filters
                            </button>
                            <button
                                type="button"
                                className="modal-apply-btn"
                                style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderColor: '#10b981' }}
                                onClick={() => {
                                    onSelectDistrict('all');
                                }}
                            >
                                View All 33 Districts Feed
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
