import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Landmark, Sparkles, Compass, Clock,
    Volume2, VolumeX, Play, Pause, ChevronRight, X,
    Calendar, Check, ShieldCheck, Award, Train, Utensils,
    Navigation, ExternalLink, Search, Globe, Waves, Mountain, Sun
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { rajasthanDestinations } from '../../../data/rajasthanDestinationsData.js';
import './UPDistrictIntelligenceSuite.css';

export const RJ_DIVISIONS = [
    'All Divisions',
    'Jaipur',
    'Jodhpur',
    'Udaipur',
    'Ajmer',
    'Bikaner',
    'Kota',
    'Bharatpur',
    'Sikar',
    'Pali',
    'Banswara'
];

export const RJ_CIRCUITS = [
    { id: 'all', label: 'All RJ Destinations', icon: '🐪', description: 'Complete directory across all 50 districts of Rajasthan' },
    { id: 'Royal Forts & Palaces', label: 'UNESCO Forts & Palaces', icon: '🏰', description: 'Amber, Chittorgarh, Kumbhalgarh, Mehrangarh, Junagarh, Deeg' },
    { id: 'Desert Triangle & Dunes', label: 'Desert Triangle & Dunes', icon: '🏜️', description: 'Jaisalmer Sam Dunes, Osian, Kiradu, Barmer, Khuri' },
    { id: 'Tiger Reserves & Wildlife', label: 'Tigers & Wildlife Corridors', icon: '🐅', description: 'Ranthambore, Sariska, Keoladeo Ghana Bird Sanctuary, Jawai Leopards, Tal Chhapar' },
    { id: 'Spiritual & Sufi Tirthas', label: 'Sacred Tirthas & Dargahs', icon: '🕉️', description: 'Ajmer Sharif, Pushkar Brahma Temple, Khatushyamji, Nathdwara, Salasar' },
    { id: 'Shekhawati Havelis & Frescoes', label: 'Shekhawati Painted Havelis', icon: '🎨', description: 'Mandawa, Nawalgarh, Fatehpur, Khetri copper citadel & open-air frescoes' },
    { id: 'Hadoti & Lakes Heritage', label: 'Hadoti & Chambal Canyons', icon: '🌊', description: 'Bundi Taragarh & 50 Baoris, Gagron Water Fort, Chambal River Safari, Ramgarh' },
    { id: 'Lakes & Aravalli Escapes', label: 'Lakes & Aravalli Retreats', icon: '⛰️', description: 'Mount Abu Hill Station, Lake Pichola Udaipur, Jaisamand, Mahi 100 Islands' }
];

export const RJ_CATEGORIES = [
    { id: 'all', label: 'All Interests', icon: '🌟', description: 'Explore all 50 districts across Rajasthan' },
    { id: 'historical', label: 'Forts & Palaces', icon: '🏰', description: 'Hill forts, royal palaces, stepwells, havelis & UNESCO monuments' },
    { id: 'wildlife', label: 'Wildlife & Tigers', icon: '🐾', description: 'Ranthambore, Sariska, Keoladeo bird paradise, Jawai leopards, blackbucks' },
    { id: 'desert', label: 'Desert & Dunes', icon: '🐪', description: 'Thar golden sand dunes, camel safaris, stargazing & desert festivals' },
    { id: 'pilgrimage', label: 'Pilgrimage & Sufi', icon: '🕉️', description: 'Pushkar holy lake, Ajmer Sharif Dargah, Khatushyamji, Shrinathji Nathdwara' },
    { id: 'nature', label: 'Lakes & Aravallis', icon: '🌊', description: 'Mount Abu hills, Lake Pichola, Chambal canyons, Mahi 100 islands' },
    { id: 'crafts', label: 'GI-Crafts & Culture', icon: '🏺', description: 'Blue Pottery, Thewa art, Kota Doria, Bandhej, Sanganeri block print' }
];

export const matchRJCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.rjCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.odop || ''}`.toLowerCase();

    if (categoryId === 'wildlife') {
        if (cat === 'wildlife' || circuit.includes('wildlife') || circuit.includes('tiger')) return true;
        if (name.includes('national park') || name.includes('tiger') || name.includes('wildlife') || name.includes('sanctuary') || name.includes('leopard') || name.includes('bird') || name.includes('crane') || name.includes('blackbuck')) return true;
        return tags.some(t => ['tiger', 'wildlife', 'safari', 'national park', 'sanctuary', 'leopard', 'birding', 'blackbuck', 'wetlands'].includes(t));
    }

    if (categoryId === 'desert') {
        if (cat === 'desert' || circuit.includes('desert') || circuit.includes('dunes')) return true;
        if (name.includes('desert') || name.includes('dunes') || name.includes('sam sand') || name.includes('thar') || name.includes('osian') || name.includes('camel')) return true;
        return tags.some(t => ['desert', 'thar', 'sand dunes', 'camel', 'stargazing', 'dunes'].includes(t)) || text.includes('desert');
    }

    if (categoryId === 'historical') {
        if (cat === 'historical' || circuit.includes('forts') || circuit.includes('havelis') || circuit.includes('palaces')) return true;
        if (name.includes('fort') || name.includes('palace') || name.includes('haveli') || name.includes('stepwell') || name.includes('baori') || name.includes('citadel') || name.includes('unesco') || name.includes('monument')) return true;
        return tags.some(t => ['fort', 'palace', 'unesco', 'havelis', 'stepwell', 'baori', 'chivalry', 'citadel', 'mewar', 'rajput'].includes(t));
    }

    if (categoryId === 'pilgrimage' || categoryId === 'spiritual') {
        if (cat === 'spiritual' || circuit.includes('spiritual') || circuit.includes('sufi')) return true;
        if (name.includes('dargah') || name.includes('temple') || name.includes('mandir') || name.includes('tirth') || name.includes('shrine') || name.includes('brahma') || name.includes('khatushyam') || name.includes('pushkar') || name.includes('shrinathji') || name.includes('balaji')) return true;
        return tags.some(t => ['pilgrimage', 'spiritual', 'temple', 'dargah', 'sufi', 'brahma', 'shaktipeeth', 'jain'].includes(t));
    }

    if (categoryId === 'nature') {
        if (cat === 'nature' || circuit.includes('lakes') || circuit.includes('escapes')) return true;
        if (name.includes('lake') || name.includes('mount abu') || name.includes('hill') || name.includes('river') || name.includes('island') || name.includes('waterfall') || name.includes('chambal')) return true;
        return tags.some(t => ['lake', 'hill station', 'nature', 'waterfall', 'islands', 'riverfront', 'canyon'].includes(t));
    }

    if (categoryId === 'crafts' || categoryId === 'culture') {
        if (cat === 'culture' || circuit.includes('crafts') || circuit.includes('guilds')) return true;
        if (dest.odop || text.includes('pottery') || text.includes('thewa') || text.includes('block print') || text.includes('textile') || text.includes('phad') || text.includes('frescoes')) return true;
        return tags.some(t => ['craft', 'art', 'thewa art', 'phad painting', 'blue pottery', 'frescoes', 'textiles', 'gi tag'].includes(t));
    }

    return true;
};

export const RJDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { addXP } = useNomadOSStore();

    const [activeSubTab, setActiveSubTab] = useState('itinerary');
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [claimedIntelligenceXP, setClaimedIntelligenceXP] = useState(false);
    const synthRef = useRef(typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null);

    const destDistrict = destination?.district || 'Jaipur';
    const destDivision = destination?.division || 'Jaipur';
    const destState = destination?.state || 'Rajasthan';
    const destCircuit = destination?.rjCircuit || 'Royal Forts & Palaces';

    // Other destinations in same district
    const sameDistrictDestinations = useMemo(() => {
        return rajasthanDestinations.filter(
            d => d.district === destDistrict && d.id !== destination?.id
        );
    }, [destDistrict, destination?.id]);

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
            addToast('Speech audio narration not supported in this browser.', 'error');
            return;
        }

        if (isPlayingAudio) {
            synthRef.current.cancel();
            setIsPlayingAudio(false);
            addToast('Audio narration paused', 'info');
        } else {
            synthRef.current.cancel();
            const narrative = `Welcome to ${destination?.name || 'Rajasthan'}, situated in ${destDistrict} District within the ${destDivision} division of Rajasthan. ${destination?.aiInsight || 'An iconic jewel of Rajput architecture, valor, and desert culture.'} Local cuisine includes authentic ${destination?.localCuisine || 'Dal Baati Churma, Ker Sangri, and Ghevar'}. Connected via ${destination?.nearestAirport || 'Jaipur International Airport'} and ${destination?.railConnectivity || 'superfast rail networks'}. Padharo Mhare Desh, experience the royal heart of India.`;

            const utterance = new SpeechSynthesisUtterance(narrative);
            utterance.rate = 0.95;
            utterance.pitch = 1.0;

            utterance.onend = () => setIsPlayingAudio(false);
            utterance.onerror = () => setIsPlayingAudio(false);

            synthRef.current.speak(utterance);
            setIsPlayingAudio(true);
            addToast('Playing Royal Heritage Audio Guide 🎧', 'success');
        }
    };

    const handleClaimDistrictXP = () => {
        if (claimedIntelligenceXP) return;
        setClaimedIntelligenceXP(true);
        if (addXP) addXP(350);
        addToast(`Claimed +350 XP for studying ${destDistrict} Royal Intelligence! 🐪⚡`, 'success');
    };

    return (
        <section className="up-district-intelligence-section" aria-label="Rajasthan District Intelligence Suite">
            {/* 1. Header Banner & Heritage Seal */}
            <div className="up-district-header-card">
                <div className="up-district-header-top">
                    <div className="up-district-meta-crumbs">
                        <span className="up-meta-pill state-pill" style={{ background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.22), rgba(194, 65, 12, 0.28))', borderColor: 'rgba(249, 115, 22, 0.45)', color: '#fdba74' }}>
                            🐪 {destState} (50 Districts)
                        </span>
                        <span className="up-meta-pill division-pill">
                            🏛️ {destDivision} Division
                        </span>
                        <span className="up-meta-pill circuit-pill" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(217, 119, 6, 0.28))', borderColor: 'rgba(245, 158, 11, 0.45)', color: '#fcd34d' }}>
                            ✨ {destCircuit}
                        </span>
                    </div>

                    <div className="up-district-header-actions">
                        <button
                            type="button"
                            className={`up-audio-guide-btn ${isPlayingAudio ? 'playing' : ''}`}
                            onClick={toggleAudioGuide}
                            style={{ borderColor: 'rgba(249, 115, 22, 0.45)', color: '#fdba74' }}
                            title="Listen to narrated heritage & logistical brief"
                        >
                            {isPlayingAudio ? <VolumeX size={15} /> : <Volume2 size={15} />}
                            <span>{isPlayingAudio ? 'Stop Audio Guide' : 'Listen Heritage Audio 🎧'}</span>
                        </button>

                        <button
                            type="button"
                            className={`up-claim-xp-btn ${claimedIntelligenceXP ? 'claimed' : ''}`}
                            onClick={handleClaimDistrictXP}
                            disabled={claimedIntelligenceXP}
                            title="Earn Nomad XP for reviewing district intelligence"
                        >
                            <Award size={15} />
                            <span>{claimedIntelligenceXP ? 'District XP Claimed (+350 XP)' : 'Claim +350 XP ⚡'}</span>
                        </button>
                    </div>
                </div>

                <div className="up-district-title-block">
                    <h3 className="up-district-main-heading">
                        {destDistrict} District Royal Intelligence Suite
                    </h3>
                    <p className="up-district-lead-desc">
                        Official travel blueprint, UNESCO hill fort histories, desert safari logistics, and One District One Product (ODOP) guilds across {destDistrict} in Rajasthan.
                    </p>
                </div>

                {/* Subtab Navigation Pills */}
                <div className="up-subtabs-dock" role="tablist">
                    {[
                        { id: 'itinerary', label: '01. Day-by-Day Travel Blueprint', icon: Calendar },
                        { id: 'odop', label: '02. ODOP & Royal Craft Guilds', icon: Award },
                        { id: 'district-spots', label: `03. All ${destDistrict} Highlights`, icon: Landmark },
                        { id: 'transit', label: '04. Rail & Air Logistics', icon: Train }
                    ].map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeSubTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`up-subtab-pill ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveSubTab(tab.id)}
                            >
                                <Icon size={14} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 2. Subtab Panes */}
            <div className="up-subtab-content-area">
                {/* SUBTAB 1: DAY-BY-DAY ITINERARY BLUEPRINT */}
                {activeSubTab === 'itinerary' && (
                    <motion.div
                        className="up-tab-pane"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="up-itinerary-card">
                            <div className="up-itinerary-header">
                                <div>
                                    <span className="up-badge-accent">Recommended 3-Day Royal Itinerary</span>
                                    <h4 className="up-itinerary-title">
                                        The Ultimate {destDistrict} Heritage & Adventure Route
                                    </h4>
                                </div>
                                <button
                                    type="button"
                                    className="up-action-link-btn"
                                    onClick={() => navigate('/explore/itinerary-builder')}
                                >
                                    <span>Customize in Itinerary Builder →</span>
                                </button>
                            </div>

                            <div className="up-itinerary-timeline">
                                <div className="timeline-day-block">
                                    <div className="day-badge">Day 1</div>
                                    <div className="day-content">
                                        <h5>Morning Exploration & Royal Citadel Architecture</h5>
                                        <p>
                                            Arrive and check in to a heritage Haveli or desert luxury retreat. Embark on a guided exploration of <strong>{destination?.name || destDistrict}</strong> before noon. Inspect defensive bastions, royal courtyards, and ancient water management systems.
                                        </p>
                                        <div className="day-tags-row">
                                            <span>Early Arrival</span>
                                            <span>Historic Ramparts</span>
                                            <span>Photography</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-day-block">
                                    <div className="day-badge">Day 2</div>
                                    <div className="day-content">
                                        <h5>Desert Safaris, Artisan Guilds & Local Gastronomy</h5>
                                        <p>
                                            Experience open-top Gypsy wildlife or camel dune safaris. Visit verified local artisan workshops creating <strong>{destination?.odop || 'traditional crafts'}</strong>. Enjoy a sunset dinner featuring royal Rajasthani delicacies ({destination?.localCuisine || 'Dal Baati Churma & Ker Sangri'}).
                                        </p>
                                        <div className="day-tags-row">
                                            <span>Artisan Visit</span>
                                            <span>Safari / Dunes</span>
                                            <span>Royal Feast</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-day-block">
                                    <div className="day-badge">Day 3</div>
                                    <div className="day-content">
                                        <h5>Spiritual Darshan, Sunrise Viewpoints & Onward Transit</h5>
                                        <p>
                                            Catch sunrise over the Aravalli crags or sand dunes. Visit neighborhood shrines and sacred stepwells before catching your express Vande Bharat or connecting flight from {destination?.nearestAirport || 'the nearest airport'}.
                                        </p>
                                        <div className="day-tags-row">
                                            <span>Sunrise Viewpoint</span>
                                            <span>ODOP Souvenirs</span>
                                            <span>Smooth Transit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SUBTAB 2: ONE DISTRICT ONE PRODUCT (ODOP) & CRAFTS */}
                {activeSubTab === 'odop' && (
                    <motion.div
                        className="up-tab-pane"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="up-odop-showcase-card">
                            <div className="odop-banner-left">
                                <span className="odop-seal-text">Rajasthan Handlooms & ODOP Guild</span>
                                <h4 className="odop-craft-name">{destination?.odop || `${destDistrict} Artisan Craft`}</h4>
                                <p className="odop-craft-desc">
                                    Under India’s One District One Product (ODOP) initiative and GI Registry, <strong>{destDistrict}</strong> is globally acclaimed for master craft guilds practicing centuries-old royal traditions passed through generational gharanas.
                                </p>
                                <div className="odop-highlights-chips">
                                    <span className="odop-chip">🏺 Master Craftsmen Guilds</span>
                                    <span className="odop-chip">📜 GI Tagged Heritage</span>
                                    <span className="odop-chip">🛍️ Direct Weaver Clusters</span>
                                </div>
                            </div>

                            <div className="odop-sidebar-right">
                                <div className="odop-info-box">
                                    <span className="info-box-label">Where to Experience / Buy</span>
                                    <span className="info-box-val">{destDistrict} Central Bazaars & Rajasthali Emporium</span>
                                </div>
                                <div className="odop-info-box">
                                    <span className="info-box-label">Best Season for Visits</span>
                                    <span className="info-box-val">{destination?.bestSeason || 'October to March'}</span>
                                </div>
                                <div className="odop-info-box">
                                    <span className="info-box-label">Verified Quality Authenticity</span>
                                    <span className="info-box-val">Look for India Handloom & Craftmark Seal</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SUBTAB 3: OTHER SPOTS IN THIS DISTRICT */}
                {activeSubTab === 'district-spots' && (
                    <motion.div
                        className="up-tab-pane"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="up-other-spots-container">
                            <div className="up-other-spots-header">
                                <div>
                                    <h4 className="spots-title">Notable Highlights in {destDistrict} District</h4>
                                    <p className="spots-desc">Key heritage landmarks, ecological corridors, and cultural points in this district.</p>
                                </div>
                                <button
                                    type="button"
                                    className="up-action-link-btn"
                                    onClick={() => navigate(`/explore?region=rj&district=${encodeURIComponent(destDistrict)}`)}
                                >
                                    <span>Filter Feed by {destDistrict} District →</span>
                                </button>
                            </div>

                            <div className="up-spots-grid">
                                {sameDistrictDestinations.length > 0 ? (
                                    sameDistrictDestinations.map((spot) => (
                                        <div
                                            key={spot.id}
                                            className="up-spot-tile"
                                            onClick={() => navigate(`/explore/destinations/${spot.id}`)}
                                        >
                                            <div className="spot-tile-img-wrap">
                                                <img src={spot.image} alt={spot.name} loading="lazy" />
                                                <span className="spot-category-tag">{spot.category}</span>
                                            </div>
                                            <div className="spot-tile-body">
                                                <h5 className="spot-name">{spot.name}</h5>
                                                <p className="spot-snippet">{spot.aiInsight?.slice(0, 100)}...</p>
                                                <div className="spot-meta-row">
                                                    <span>⭐ {spot.rating || '4.8'}</span>
                                                    <span>{spot.odop || destDistrict}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="up-single-spot-highlight">
                                        <div className="single-spot-info">
                                            <h5>{destination?.name} is the Flagship Landmark of {destDistrict}</h5>
                                            <p>{destination?.aiInsight}</p>
                                            <div className="highlights-pills-row">
                                                {(destination?.highlights || []).map((h, i) => (
                                                    <span key={i} className="highlight-pill">✓ {h}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* SUBTAB 4: LOGISTICS & TRANSIT */}
                {activeSubTab === 'transit' && (
                    <motion.div
                        className="up-tab-pane"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <div className="up-transit-grid">
                            <div className="transit-card">
                                <div className="transit-icon-wrap air">
                                    <Globe size={22} />
                                </div>
                                <div className="transit-card-body">
                                    <span className="transit-type">Aviation Gateway</span>
                                    <h5 className="transit-station-name">{destination?.nearestAirport || 'Jaipur International Airport'}</h5>
                                    <p className="transit-notes">
                                        Regular domestic flights connecting to Delhi, Mumbai, Bengaluru, Hyderabad, and international destinations. Taxis and express coaches available 24/7.
                                    </p>
                                </div>
                            </div>

                            <div className="transit-card">
                                <div className="transit-icon-wrap rail">
                                    <Train size={22} />
                                </div>
                                <div className="transit-card-body">
                                    <span className="transit-type">Indian Railways Connectivity</span>
                                    <h5 className="transit-station-name">{destination?.railConnectivity || 'Direct Vande Bharat & Express Trains'}</h5>
                                    <p className="transit-notes">
                                        Well-connected to Northern and Western Railway networks with frequent Superfast, Shatabdi, and Rajdhani express trains.
                                    </p>
                                </div>
                            </div>

                            <div className="transit-card">
                                <div className="transit-icon-wrap road">
                                    <Navigation size={22} />
                                </div>
                                <div className="transit-card-body">
                                    <span className="transit-type">Expressways & Corridors</span>
                                    <h5 className="transit-station-name">Delhi-Mumbai Expressway & State Mega Highways</h5>
                                    <p className="transit-notes">
                                        Superb multi-lane highway connectivity across Rajasthan, offering scenic desert and Aravalli mountain road trips.
                                    </p>
                                </div>
                            </div>

                            <div className="transit-card">
                                <div className="transit-icon-wrap cuisine">
                                    <Utensils size={22} />
                                </div>
                                <div className="transit-card-body">
                                    <span className="transit-type">Culinary Specialty</span>
                                    <h5 className="transit-station-name">{destination?.localCuisine || 'Dal Baati Churma, Ker Sangri & Ghevar'}</h5>
                                    <p className="transit-notes">
                                        Must-try authentic royal flavors cooked in pure desi ghee, paired with smoked buttermilk and crisp papads.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export const RJ50DistrictsModal = ({ isOpen, onClose, currentDistrict = '', onSelectDistrict }) => {
    const navigate = useNavigate();
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [districtSearch, setDistrictSearch] = useState('');

    const districtCards = useMemo(() => {
        const districtMap = new Map();
        rajasthanDestinations.forEach(d => {
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division,
                    destinations: [],
                    sampleImage: d.image,
                    odop: d.odop,
                    circuit: d.rjCircuit
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
                const matchesCat = item.destinations.some(d => matchRJCategory(d, selectedCategory));
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
                    <div className="up-modal-header" style={{ borderBottomColor: 'rgba(249, 115, 22, 0.2)' }}>
                        <div className="up-modal-header-left">
                            <span className="up-modal-badge" style={{ background: 'rgba(234, 88, 12, 0.22)', color: '#fdba74', borderColor: 'rgba(249, 115, 22, 0.45)' }}>
                                🐪 Rajasthan Tourism · 50 Districts Directory
                            </span>
                            <h2 className="up-modal-title">
                                Explore All 50 Districts of Rajasthan
                            </h2>
                            <p className="up-modal-subtitle">
                                From UNESCO hill forts and Thar sand dunes to tiger reserves, sacred tirthas, and Aravalli mountain lakes.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="up-modal-close-btn"
                            onClick={onClose}
                            aria-label="Close directory modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="up-modal-controls-bar">
                        <div className="up-modal-search-box">
                            <Search size={16} className="modal-search-icon" />
                            <input
                                type="text"
                                placeholder="Search by district name, fort, palace, craft, or tiger reserve..."
                                value={districtSearch}
                                onChange={(e) => setDistrictSearch(e.target.value)}
                                className="modal-search-input"
                            />
                            {districtSearch && (
                                <button
                                    type="button"
                                    onClick={() => setDistrictSearch('')}
                                    className="modal-search-clear"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div className="up-modal-division-chips" role="group" aria-label="Filter by Division">
                            {RJ_DIVISIONS.map(div => (
                                <button
                                    key={div}
                                    type="button"
                                    className={`div-filter-chip ${selectedDivision === div ? 'active' : ''}`}
                                    onClick={() => setSelectedDivision(div)}
                                >
                                    {div}
                                </button>
                            ))}
                        </div>

                        {/* Category filter pills */}
                        <div className="up-modal-category-pills-row" style={{ marginTop: '10px' }} role="group" aria-label="Filter by Category">
                            {RJ_CATEGORIES.map(cat => {
                                const isActive = (selectedCategory || 'all') === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`div-filter-chip ${isActive ? 'active' : ''}`}
                                        style={isActive ? {
                                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                            borderColor: '#f97316',
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
                            Showing <strong>{filteredDistricts.length}</strong> of 50 Rajasthan Districts
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
                                style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderColor: '#f97316' }}
                                onClick={() => {
                                    onSelectDistrict('all');
                                }}
                            >
                                View All 50 Districts Feed
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
