import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Landmark, Sparkles, Compass, Clock,
    Volume2, VolumeX, Play, Pause, CheckCircle2,
    Calendar, Award, Utensils, Train, Plane,
    Wifi, ArrowRight, ShieldCheck, ChevronRight,
    Search, X, ExternalLink, Bookmark, Zap, Globe
} from 'lucide-react';
import { uttarPradeshDestinations } from '../../../data/uttarPradeshDestinationsData';
import { useToastStore } from '../../../store/toastStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { UGCImage } from '../../../components/common/Image';
import './UPDistrictIntelligenceSuite.css';

// 18 Administrative Divisions of Uttar Pradesh
export const UP_DIVISIONS = [
    'All Divisions', 'Agra', 'Aligarh', 'Ayodhya', 'Azamgarh', 'Bareilly',
    'Basti', 'Chitrakoot', 'Devipatan', 'Gorakhpur', 'Jhansi', 'Kanpur',
    'Lucknow', 'Meerut', 'Mirzapur', 'Moradabad', 'Prayagraj', 'Saharanpur', 'Varanasi'
];

const UPDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { addXP } = useNomadOSStore();

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioSpeed, setAudioSpeed] = useState(1);
    const [is75DistrictsOpen, setIs75DistrictsOpen] = useState(false);
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const [districtSearch, setDistrictSearch] = useState('');
    const [stampClaimed, setStampClaimed] = useState(false);
    const [activeSection, setActiveSection] = useState('itinerary'); // 'itinerary' | 'odop' | 'district-spots' | 'transit'

    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    // Other destinations in the SAME district
    const sameDistrictDestinations = useMemo(() => {
        if (!destination?.district) return [];
        return uttarPradeshDestinations.filter(
            d => d.district === destination.district && String(d.id) !== String(destination.id)
        );
    }, [destination]);

    // Group all 75 districts with their ODOP and destination counts
    const all75DistrictsDirectory = useMemo(() => {
        const districtMap = new Map();
        uttarPradeshDestinations.forEach(d => {
            if (!d.district) return;
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division || 'Uttar Pradesh',
                    odop: d.odop || 'Local Handicraft',
                    destinations: []
                });
            }
            districtMap.get(d.district).destinations.push(d);
        });
        return Array.from(districtMap.values()).sort((a, b) => a.district.localeCompare(b.district));
    }, []);

    // Filtered districts for the 75-district browser modal
    const filteredDistricts = useMemo(() => {
        return all75DistrictsDirectory.filter(item => {
            const matchesDivision = selectedDivision === 'All Divisions' || item.division.toLowerCase() === selectedDivision.toLowerCase();
            const matchesSearch = !districtSearch ||
                item.district.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.odop.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.destinations.some(dest => dest.name.toLowerCase().includes(districtSearch.toLowerCase()));
            return matchesDivision && matchesSearch;
        });
    }, [all75DistrictsDirectory, selectedDivision, districtSearch]);

    // Audio Guide Narrative
    const audioNarrativeText = useMemo(() => {
        if (!destination) return '';
        return `Welcome to ${destination.name}, located in ${destination.district} District, within the ${destination.division || 'Uttar Pradesh'} Division of Uttar Pradesh, India. ${destination.aiInsight || ''} Celebrated for its One District One Product specialty of ${destination.odop || 'local heritage crafts'}, this destination is part of the sacred ${destination.upCircuit || 'Uttar Pradesh Heritage'} tourism circuit. Visitors can reach ${destination.district} via ${destination.nearestTransit || 'convenient rail and road corridors'}, and savor signature delicacies including ${destination.localCuisine || 'local Awadhi and Purvanchal specialties'}.`;
    }, [destination]);

    // Speech Synthesis Audio Guide Controls
    useEffect(() => {
        const synth = synthRef.current;
        return () => {
            if (synth && synth.speaking) {
                synth.cancel();
            }
        };
    }, [destination?.id]);

    const handleToggleAudio = () => {
        if (!synthRef.current) {
            addToast('Speech audio is not supported in this browser.', 'error');
            return;
        }

        if (isPlayingAudio) {
            synthRef.current.cancel();
            setIsPlayingAudio(false);
            return;
        }

        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(audioNarrativeText);
        utterance.rate = audioSpeed;
        utterance.pitch = 1.0;

        utterance.onend = () => {
            setIsPlayingAudio(false);
        };
        utterance.onerror = () => {
            setIsPlayingAudio(false);
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
        setIsPlayingAudio(true);
        addToast(`🎧 Playing audio guide for ${destination.name}`, 'info');
    };

    const handleSpeedToggle = () => {
        const nextSpeed = audioSpeed === 1 ? 1.25 : audioSpeed === 1.25 ? 1.5 : 1;
        setAudioSpeed(nextSpeed);
        if (isPlayingAudio && synthRef.current) {
            synthRef.current.cancel();
            const utterance = new SpeechSynthesisUtterance(audioNarrativeText);
            utterance.rate = nextSpeed;
            utterance.onend = () => setIsPlayingAudio(false);
            synthRef.current.speak(utterance);
        }
    };

    const handleClaimDistrictStamp = () => {
        if (stampClaimed) return;
        setStampClaimed(true);
        if (addXP) addXP(500);
        addToast(`🏛️ Claimed ${destination.district} District Heritage Passport Stamp (+500 XP)!`, 'success');
    };

    return (
        <div className="up-district-suite-container">
            {/* 1. UP District Hero Intelligence Banner */}
            <div className="up-suite-hero-card">
                <div className="suite-hero-badge-row">
                    <span className="suite-up-emblem-badge">
                        <span className="up-flag-icon">🇮🇳</span>
                        <span>Uttar Pradesh Tourism · 75 Districts Intelligence</span>
                    </span>
                    <span className="suite-circuit-tag">
                        <Landmark size={13} className="text-amber-400" />
                        <span>{destination.upCircuit || 'Heritage Circuit'}</span>
                    </span>
                    {destination.odop && (
                        <span className="suite-odop-tag" title="Official One District One Product">
                            <Sparkles size={13} className="text-cyan-400" />
                            <span>ODOP: {destination.odop}</span>
                        </span>
                    )}
                </div>

                <div className="suite-hero-headline-block">
                    <div className="suite-district-title-wrap">
                        <span className="suite-district-kicker">District Profile</span>
                        <h2 className="suite-district-title">
                            {destination.district} District
                            {destination.division && <span className="suite-division-sub"> ({destination.division} Division)</span>}
                        </h2>
                    </div>

                    <div className="suite-top-action-buttons">
                        <button
                            type="button"
                            className="browse-75-districts-btn"
                            onClick={() => setIs75DistrictsOpen(true)}
                        >
                            <Compass size={15} />
                            <span>Browse All 75 Districts</span>
                        </button>

                        <button
                            type="button"
                            className={`district-passport-stamp-btn ${stampClaimed ? 'claimed' : ''}`}
                            onClick={handleClaimDistrictStamp}
                        >
                            <Award size={15} />
                            <span>{stampClaimed ? 'District Stamp Claimed ✓ (+500 XP)' : 'Claim District Stamp (+500 XP)'}</span>
                        </button>
                    </div>
                </div>

                {/* 2. Interactive Spoken Audio Guide Player */}
                <div className="up-audio-guide-player-bar">
                    <div className="audio-player-meta">
                        <div className={`audio-visualizer-wave ${isPlayingAudio ? 'active' : ''}`}>
                            <span className="wave-bar bar-1" />
                            <span className="wave-bar bar-2" />
                            <span className="wave-bar bar-3" />
                            <span className="wave-bar bar-4" />
                            <span className="wave-bar bar-5" />
                        </div>
                        <div>
                            <span className="audio-title">Spoken Heritage & Architectural Audio Guide</span>
                            <span className="audio-subtitle">Narrated by SeeNomad Virtual Guide · {destination.name}</span>
                        </div>
                    </div>

                    <div className="audio-player-controls">
                        <button
                            type="button"
                            className="audio-speed-btn"
                            onClick={handleSpeedToggle}
                            title="Toggle playback speed"
                        >
                            {audioSpeed}x
                        </button>

                        <button
                            type="button"
                            className={`audio-play-toggle-btn ${isPlayingAudio ? 'playing' : ''}`}
                            onClick={handleToggleAudio}
                            title={isPlayingAudio ? 'Pause Narration' : 'Listen to Audio Guide'}
                        >
                            {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
                            <span>{isPlayingAudio ? 'Pause Audio' : 'Listen to Guide'}</span>
                        </button>
                    </div>
                </div>

                {/* 3. 4-Pillar District Telemetry Matrix */}
                <div className="up-telemetry-pillars-grid">
                    <div className="up-pillar-card">
                        <div className="pillar-header">
                            <Train size={16} className="text-emerald-400" />
                            <span>Transit & Connectivity</span>
                        </div>
                        <p className="pillar-text">{destination.nearestTransit || 'Well connected via Indian Railways and National Highways'}</p>
                        <span className="pillar-tag">{destination.connectivity || '5G Network Available'}</span>
                    </div>

                    <div className="up-pillar-card">
                        <div className="pillar-header">
                            <Utensils size={16} className="text-amber-400" />
                            <span>Local Delicacies & Sweets</span>
                        </div>
                        <p className="pillar-text">{destination.localCuisine || 'Traditional Purvanchal & Awadhi Sweets, Chaat & Desi Ghee cuisine'}</p>
                        <span className="pillar-tag">Authentic District Flavors</span>
                    </div>

                    <div className="up-pillar-card">
                        <div className="pillar-header">
                            <Calendar size={16} className="text-sky-400" />
                            <span>Best Visiting Season</span>
                        </div>
                        <p className="pillar-text">{destination.bestSeason || 'October to March (Mild & Pleasant Winter)'}</p>
                        <span className="pillar-tag">Golden Touring Window</span>
                    </div>

                    <div className="up-pillar-card">
                        <div className="pillar-header">
                            <Sparkles size={16} className="text-purple-400" />
                            <span>One District One Product (ODOP)</span>
                        </div>
                        <p className="pillar-text">{destination.odop || 'Traditional Handcrafted Artistry & Cottage Guilds'}</p>
                        <span className="pillar-tag">GI-Tagged Heritage</span>
                    </div>
                </div>
            </div>

            {/* 4. Section Navigation Pills */}
            <div className="up-suite-section-tabs">
                {[
                    { id: 'itinerary', label: '1-Day & 2-Day District Itinerary', icon: Calendar },
                    { id: 'district-spots', label: `All Spots in ${destination.district} (${sameDistrictDestinations.length + 1})`, icon: MapPin },
                    { id: 'odop', label: 'ODOP & Artisan Guilds', icon: Award },
                    { id: 'transit', label: 'Arrival, Trains & Expressways', icon: Train }
                ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeSection === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            className={`suite-tab-btn ${isActive ? 'active' : ''}`}
                            onClick={() => setActiveSection(tab.id)}
                        >
                            <Icon size={14} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* 5. Active Section Content Display */}
            <div className="up-suite-tab-content">
                {/* A. 1-Day & 2-Day District Travel Itinerary */}
                {activeSection === 'itinerary' && (
                    <div className="up-itinerary-workspace">
                        <div className="itinerary-header-block">
                            <div>
                                <span className="itinerary-eyebrow">Curated District Exploration Plan</span>
                                <h3 className="itinerary-title">Complete 2-Day Itinerary for {destination.name} & {destination.district}</h3>
                            </div>
                            <span className="itinerary-badge">Recommended for Travelers & Digital Nomads</span>
                        </div>

                        <div className="itinerary-timeline-stack">
                            {/* Day 1: Heritage & Sunrise Experience */}
                            <div className="itinerary-day-card">
                                <div className="itinerary-day-badge">Day 1 · Sunrise to Sunset</div>
                                <div className="itinerary-step">
                                    <span className="step-time">06:00 AM – 09:30 AM</span>
                                    <div className="step-content">
                                        <h4>Morning Exploration & Golden Hour Vantage</h4>
                                        <p>Arrive at {destination.name} for early morning tranquility and prime photography light. Witness morning rituals or sunrise vistas without tourist crowds.</p>
                                        <div className="step-tags">
                                            <span>Photography Golden Hour</span>
                                            <span>Morning Serenity</span>
                                            <span>Scenic Vantage Point</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="itinerary-step">
                                    <span className="step-time">10:00 AM – 01:30 PM</span>
                                    <div className="step-content">
                                        <h4>In-Depth Architecture Tour & Museum Galleries</h4>
                                        <p>Explore the interior chambers, inscriptions, and architectural features. Study the craftsmanship and archaeological significance detailed in the state archives.</p>
                                    </div>
                                </div>

                                <div className="itinerary-step">
                                    <span className="step-time">02:00 PM – 04:30 PM</span>
                                    <div className="step-content">
                                        <h4>District Culinary Trail ({destination.district} Specialties)</h4>
                                        <p>Savor authentic local delicacies: {destination.localCuisine || 'Traditional Uttar Pradesh Thali and famous regional sweets'} at acclaimed heritage eateries.</p>
                                    </div>
                                </div>

                                <div className="itinerary-step">
                                    <span className="step-time">05:30 PM – 08:30 PM</span>
                                    <div className="step-content">
                                        <h4>Sunset Riverfront / Monument Illumination & Aarti</h4>
                                        <p>Experience the illuminated monument or riverfront evening Aarti ceremonies, followed by cultural music performances or evening stroll along local promenades.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Day 2: ODOP Artisans & Adjacent District Treasures */}
                            <div className="itinerary-day-card">
                                <div className="itinerary-day-badge">Day 2 · Craft Guilds & Nature Trails</div>
                                <div className="itinerary-step">
                                    <span className="step-time">09:00 AM – 12:30 PM</span>
                                    <div className="step-content">
                                        <h4>One District One Product (ODOP) Artisan Guilds</h4>
                                        <p>Visit traditional craft workshops producing {destination.odop || 'famous GI-tagged handicrafts'}. Watch master craftsmen at work and support regional artisans directly.</p>
                                    </div>
                                </div>

                                <div className="itinerary-step">
                                    <span className="step-time">02:00 PM – 06:00 PM</span>
                                    <div className="step-content">
                                        <h4>Regional Excursion across {destination.district} District</h4>
                                        <p>Explore nearby lakes, forest reserves, or secondary historical temples across the {destination.division || 'Uttar Pradesh'} division to complete your district tour.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* B. All Travel Spots in this District */}
                {activeSection === 'district-spots' && (
                    <div className="up-district-spots-workspace">
                        <div className="district-spots-intro">
                            <div>
                                <h3 className="section-title">All Travel Destinations in {destination.district} District</h3>
                                <p className="section-desc">Explore every curated cultural, spiritual, historical, and ecological landmark in {destination.district}.</p>
                            </div>
                            <span className="district-count-pill">{sameDistrictDestinations.length + 1} Destinations Mapped</span>
                        </div>

                        <div className="district-cards-grid">
                            {/* Current Active Destination Card */}
                            <div className="district-spot-card current-spot">
                                <div className="spot-card-badge-top">Current Destination</div>
                                <UGCImage src={destination.image} alt={destination.name} className="spot-card-img" />
                                <div className="spot-card-body">
                                    <span className="spot-circuit">{destination.upCircuit}</span>
                                    <h4 className="spot-name">{destination.name}</h4>
                                    <p className="spot-snippet">{destination.socialProof || destination.aiInsight}</p>
                                    <div className="spot-footer">
                                        <span className="spot-price">{destination.price === '$0' ? 'Free Entry' : destination.price}</span>
                                        <span className="spot-current-tag">Viewing Now ✓</span>
                                    </div>
                                </div>
                            </div>

                            {/* Other Destinations in same district */}
                            {sameDistrictDestinations.map(d => (
                                <div
                                    key={d.id}
                                    className="district-spot-card"
                                    onClick={() => navigate(`/explore/destinations/${toSlug(d.name)}`)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <UGCImage src={d.image} alt={d.name} className="spot-card-img" />
                                    <div className="spot-card-body">
                                        <span className="spot-circuit">{d.upCircuit}</span>
                                        <h4 className="spot-name">{d.name}</h4>
                                        <p className="spot-snippet">{d.socialProof || d.aiInsight}</p>
                                        <div className="spot-footer">
                                            <span className="spot-price">{d.price === '$0' ? 'Free Entry' : d.price}</span>
                                            <span className="spot-explore-link">
                                                <span>Explore Page</span>
                                                <ArrowRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* C. ODOP & Artisan Guilds */}
                {activeSection === 'odop' && (
                    <div className="up-odop-workspace">
                        <div className="odop-showcase-hero">
                            <div className="odop-hero-icon-box">
                                <Award size={36} className="text-amber-400" />
                            </div>
                            <div className="odop-hero-content">
                                <span className="odop-kicker">Government of Uttar Pradesh · One District One Product (ODOP)</span>
                                <h3 className="odop-title">{destination.odop || 'Traditional Handcrafted Artistry'}</h3>
                                <p className="odop-desc">
                                    Under the flagship ODOP initiative, {destination.district} District is globally celebrated for its production of {destination.odop}. This heritage craft has supported thousands of skilled artisan families for generations, preserving authentic indigenous manufacturing techniques recognized with Geographical Indication (GI) status.
                                </p>
                            </div>
                        </div>

                        <div className="odop-highlights-grid">
                            <div className="odop-info-card">
                                <h4>Artisan Clusters & Bazaars</h4>
                                <p>Local workshops across {destination.district} offer live demonstrations where visitors can witness traditional kilns, handlooms, stone carving, or metal chiseling firsthand.</p>
                            </div>
                            <div className="odop-info-card">
                                <h4>Authenticity & GI Certification</h4>
                                <p>Look for official ODOP & GI-tagged holographic seals when purchasing souvenirs to ensure authentic quality and directly support local master artisans.</p>
                            </div>
                            <div className="odop-info-card">
                                <h4>Global Export Guilds</h4>
                                <p>{destination.odop} products from {destination.district} are exported to European, North American, and East Asian design houses for bespoke interiors and fashion.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* D. Arrival, Trains & Expressways */}
                {activeSection === 'transit' && (
                    <div className="up-transit-workspace">
                        <div className="transit-cards-grid">
                            <div className="transit-mode-card">
                                <div className="transit-card-head">
                                    <Train size={20} className="text-emerald-400" />
                                    <h4>Railways & Vande Bharat</h4>
                                </div>
                                <p className="transit-info-p">{destination.nearestTransit || 'Convenient railway connectivity with direct links to New Delhi, Lucknow & Varanasi'}</p>
                                <span className="transit-sub-note">High-speed Vande Bharat, Rajdhani & Shatabdi Express network</span>
                            </div>

                            <div className="transit-mode-card">
                                <div className="transit-card-head">
                                    <Plane size={20} className="text-sky-400" />
                                    <h4>Airports & Air Corridors</h4>
                                </div>
                                <p className="transit-info-p">Connected via Uttar Pradesh’s major airports: Ayodhya Maharishi Valmiki, Varanasi Lal Bahadur Shastri, Lucknow CCS, Agra Kheria, Kushinagar & Jewar Noida International.</p>
                                <span className="transit-sub-note">Daily domestic & international direct flights</span>
                            </div>

                            <div className="transit-mode-card">
                                <div className="transit-card-head">
                                    <Landmark size={20} className="text-amber-400" />
                                    <h4>World-Class Expressways</h4>
                                </div>
                                <p className="transit-info-p">Rapid access via Yamuna Expressway, Agra-Lucknow Expressway, Purvanchal Expressway, Bundelkhand Expressway, and Ganga Expressway.</p>
                                <span className="transit-sub-note">Smooth 6-lane access across all 75 districts</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 6. MODAL: Browse All 75 Districts of Uttar Pradesh */}
            <UP75DistrictsModal
                isOpen={is75DistrictsOpen}
                onClose={() => setIs75DistrictsOpen(false)}
                currentDistrict={destination.district}
            />
        </div>
    );
};

export const UP75DistrictsModal = ({ isOpen, onClose, currentDistrict = '', onSelectDistrict }) => {
    const navigate = useNavigate();
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const [districtSearch, setDistrictSearch] = useState('');

    const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const all75DistrictsDirectory = useMemo(() => {
        const districtMap = new Map();
        uttarPradeshDestinations.forEach(d => {
            if (!d.district) return;
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division || 'Uttar Pradesh',
                    odop: d.odop || 'Local Handicraft',
                    destinations: []
                });
            }
            districtMap.get(d.district).destinations.push(d);
        });
        return Array.from(districtMap.values()).sort((a, b) => a.district.localeCompare(b.district));
    }, []);

    const filteredDistricts = useMemo(() => {
        return all75DistrictsDirectory.filter(item => {
            const matchesDivision = selectedDivision === 'All Divisions' || item.division.toLowerCase() === selectedDivision.toLowerCase();
            const matchesSearch = !districtSearch ||
                item.district.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.odop.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.destinations.some(dest => dest.name.toLowerCase().includes(districtSearch.toLowerCase()));
            return matchesDivision && matchesSearch;
        });
    }, [all75DistrictsDirectory, selectedDivision, districtSearch]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="up-75-districts-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="up-75-districts-modal"
                    initial={{ scale: 0.96, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.96, opacity: 0, y: 15 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="modal-top-bar">
                        <div className="modal-title-group">
                            <div className="modal-flag-wrap">🇮🇳</div>
                            <div>
                                <h3 className="modal-title">All 75 Districts of Uttar Pradesh</h3>
                                <p className="modal-subtitle">Comprehensive Tourism & ODOP Directory across all 18 Administrative Divisions</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={onClose}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Search and Division Filter Bar */}
                    <div className="modal-filter-bar">
                        <div className="modal-search-box">
                            <Search size={15} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search district name or ODOP craft (e.g. Varanasi, Kannauj, Brass, Silk)..."
                                value={districtSearch}
                                onChange={(e) => setDistrictSearch(e.target.value)}
                                className="modal-search-input"
                            />
                            {districtSearch && (
                                <button type="button" onClick={() => setDistrictSearch('')} className="clear-search-btn">
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        <div className="modal-division-select-box">
                            <select
                                value={selectedDivision}
                                onChange={(e) => setSelectedDivision(e.target.value)}
                                className="modal-division-select"
                            >
                                {UP_DIVISIONS.map(div => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Districts Grid (75 Districts) */}
                    <div className="modal-districts-grid">
                        {filteredDistricts.map(item => {
                            const isCurrent = item.district === currentDistrict;
                            const firstDest = item.destinations[0];
                            return (
                                <div
                                    key={item.district}
                                    className={`district-grid-card ${isCurrent ? 'current-district' : ''}`}
                                    onClick={() => {
                                        if (onSelectDistrict) {
                                            onSelectDistrict(item.district, firstDest);
                                            onClose();
                                        } else if (firstDest) {
                                            onClose();
                                            navigate(`/explore/destinations/${toSlug(firstDest.name)}`);
                                        }
                                    }}
                                >
                                    <div className="district-card-top">
                                        <span className="district-name">📍 {item.district}</span>
                                        <span className="district-count-tag">{item.destinations.length} spot{item.destinations.length > 1 ? 's' : ''}</span>
                                    </div>
                                    <span className="district-division-tag">{item.division} Division</span>
                                    <div className="district-odop-line">
                                        <Sparkles size={11} className="text-amber-400" />
                                        <span>ODOP: {item.odop}</span>
                                    </div>
                                    <div className="district-card-footer">
                                        <span className="sample-spot">{firstDest ? firstDest.name : 'View Destination'}</span>
                                        <ChevronRight size={14} className="card-arrow" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Modal Footer Note */}
                    <div className="modal-footer-note">
                        <span>Showing {filteredDistricts.length} of 75 Districts · Incredible India Tourism Network</span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UPDistrictIntelligenceSuite;
export { UPDistrictIntelligenceSuite };
