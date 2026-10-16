import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Landmark, Sparkles, Compass, Clock,
    Volume2, VolumeX, Play, Pause, ChevronRight, X,
    Calendar, Check, ShieldCheck, Award, Train, Utensils,
    Navigation, ExternalLink, Search, Globe, Waves, Mountain
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { maharashtraDestinations } from '../../../data/maharashtraDestinationsData.js';
import './UPDistrictIntelligenceSuite.css'; // Shared modern styling system for state intelligence suites

export const MH_DIVISIONS = [
    'All Divisions',
    'Konkan',
    'Pune',
    'Nashik',
    'Chhatrapati Sambhajinagar',
    'Amravati',
    'Nagpur'
];

export const MH_CIRCUITS = [
    { id: 'all', label: 'All MH Destinations', icon: '🚩', description: 'Complete directory across all 36 districts of Maharashtra' },
    { id: 'World Heritage', label: 'UNESCO World Heritage', icon: '🏛️', description: 'Ajanta, Ellora, Elephanta Caves, CSMT Mumbai, Western Ghats Kaas' },
    { id: 'Maratha Forts', label: 'Maratha Forts & Citadels', icon: '🏰', description: 'Raigad, Shivneri, Sinhagad, Sindhudurg, Pratapgad, Murud Janjira, Panhala' },
    { id: 'Spiritual & Jyotirlinga', label: '5 Jyotirlingas & Shrines', icon: '🕉️', description: 'Trimbakeshwar, Bhimashankar, Grishneshwar, Parli, Aundha, Shirdi, Pandharpur' },
    { id: 'Tiger Reserves & Wildlife', label: 'Tiger Reserves & Sanctuaries', icon: '🐅', description: 'Tadoba-Andhari, Pench, Melghat, Navegaon-Nagzira, Lonar Crater, SGNP' },
    { id: 'Konkan Coast & Beaches', label: 'Konkan Coast & Beaches', icon: '🏖️', description: 'Alibaug, Ganpatipule, Tarkarli Coral Scuba, Guhagar, Dahanu-Bordi' },
    { id: 'Western Ghats & Hill Stations', label: 'Western Ghats & Hills', icon: '⛰️', description: 'Mahabaleshwar, Lonavala-Khandala, Matheran, Kalsubai, Chikhaldara, Toranmal, Amboli' },
    { id: 'Crafts & Heritage', label: 'ODOP Guilds & Culture', icon: '🏺', description: 'Paithani Silk Sarees, Warli Art, Kolhapuri Chappals, Solapuri Chaddar' }
];

export const MH_CATEGORIES = [
    { id: 'all', label: 'All Interests', icon: '🌟', description: 'Explore all 36 districts across Maharashtra' },
    { id: 'wildlife', label: 'Wildlife & Tigers', icon: '🐾', description: 'Tadoba, Pench, Melghat, Lonar meteorite lake & wildlife corridors' },
    { id: 'historical', label: 'Forts & Historical', icon: '🏰', description: 'Chhatrapati Shivaji Maharaj forts, UNESCO rock caves, medieval citadels' },
    { id: 'pilgrimage', label: 'Pilgrimage & Jyotirlinga', icon: '🕉️', description: '5 Sacred Jyotirlingas, Shirdi Saibaba, Pandharpur Vitthal, Shaktipeeths' },
    { id: 'beach', label: 'Konkan Beaches', icon: '🏖️', description: 'Pristine Arabian Sea beaches, coral scuba diving, dolphin safaris' },
    { id: 'nature', label: 'Nature & Ghats', icon: '🌊', description: 'Western Ghats waterfalls, Kaas flower plateau, hill stations & misty peaks' },
    { id: 'crafts', label: 'GI-Crafts & Culture', icon: '🏺', description: 'Paithani silk, Warli tribal art, Kolhapuri crafts, wine valley & mango orchards' }
];

export const matchMHCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.mhCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.socialProof || ''}`.toLowerCase();

    if (categoryId === 'wildlife') {
        if (cat === 'wildlife' || circuit.includes('wildlife') || circuit.includes('tiger')) return true;
        if (name.includes('national park') || name.includes('tiger reserve') || name.includes('wildlife') || name.includes('sanctuary') || name.includes('safari') || name.includes('leopard')) return true;
        return tags.some(t => ['tiger', 'wildlife', 'safari', 'national park', 'sanctuary', 'leopard', 'shekru', 'bison', 'deer'].includes(t)) &&
            !cat.includes('historic') && !cat.includes('spiritual');
    }

    if (categoryId === 'historical') {
        if (cat === 'historical' || circuit.includes('heritage') || circuit.includes('fort') || circuit.includes('palace') || circuit.includes('world heritage')) return true;
        if (name.includes('fort') || name.includes('palace') || name.includes('unesco') || name.includes('caves') || name.includes('citadel') || name.includes('monument') || name.includes('wada') || name.includes('ashram')) return true;
        return tags.some(t => ['unesco', 'ancient', 'fort', 'palace', 'heritage', 'monument', 'medieval', 'maratha', 'shivaji maharaj', 'caves', 'citadel'].includes(t));
    }

    if (categoryId === 'pilgrimage' || categoryId === 'spiritual') {
        if (cat === 'spiritual' || circuit.includes('spiritual') || circuit.includes('jyotirlinga')) return true;
        if (name.includes('jyotirlinga') || name.includes('temple') || name.includes('mandir') || name.includes('sansthan') || name.includes('shrine') || name.includes('gurdwara') || name.includes('samadhi') || name.includes('shaktipeeth') || name.includes('takht')) return true;
        return tags.some(t => ['jyotirlinga', 'spiritual', 'pilgrimage', 'temple', 'shaktipeeth', 'warkari', 'shiva', 'saibaba', 'gurdwara', 'shrine'].includes(t));
    }

    if (categoryId === 'beach') {
        if (cat === 'beach' || circuit.includes('beach') || circuit.includes('coast')) return true;
        if (name.includes('beach') || name.includes('sea') || name.includes('scuba') || name.includes('coast') || name.includes('coral') || name.includes('ocean')) return true;
        return tags.some(t => ['beach', 'arabian sea', 'scuba diving', 'coral reef', 'sea fort', 'coastal', 'sunset', 'water sports'].includes(t));
    }

    if (categoryId === 'nature') {
        if (cat === 'nature' || circuit.includes('nature') || circuit.includes('ghats') || circuit.includes('hill')) return true;
        if (name.includes('waterfall') || name.includes('falls') || name.includes('plateau') || name.includes('hill station') || name.includes('lake') || name.includes('peak') || name.includes('valley')) return true;
        return tags.some(t => ['waterfalls', 'hill station', 'western ghats', 'nature', 'lakes', 'wildflowers', 'trekking', 'kaas'].includes(t));
    }

    if (categoryId === 'crafts' || categoryId === 'culture') {
        if (cat === 'culture' || cat === 'craft' || circuit.includes('craft') || circuit.includes('culture')) return true;
        return Boolean(dest.odop) && (tags.some(t => ['craft', 'handloom', 'silk', 'art', 'warli', 'chappal', 'wine', 'mango', 'chaddar'].includes(t)) || text.includes('gi tag') || text.includes('handloom') || text.includes('weaving') || text.includes('craft'));
    }

    return cat.includes(categoryId.toLowerCase()) || circuit.includes(categoryId.toLowerCase());
};

const MHDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { addXP } = useNomadOSStore();

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioSpeed, setAudioSpeed] = useState(1);
    const [is36DistrictsOpen, setIs36DistrictsOpen] = useState(false);
    const [stampClaimed, setStampClaimed] = useState(false);
    const [activeSection, setActiveSection] = useState('itinerary'); // 'itinerary' | 'odop' | 'district-spots' | 'transit'

    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    // Other destinations in the SAME district
    const sameDistrictDestinations = useMemo(() => {
        if (!destination?.district) return [];
        return maharashtraDestinations.filter(
            d => d.district === destination.district && String(d.id) !== String(destination.id)
        );
    }, [destination]);

    // Unique districts in Maharashtra
    const all36DistrictsDirectory = useMemo(() => {
        const districtMap = new Map();
        maharashtraDestinations.forEach(d => {
            if (!d.district) return;
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division || 'Maharashtra',
                    odop: d.odop || 'Local Craft & Agro',
                    circuit: d.mhCircuit || 'Maratha Forts',
                    destinations: []
                });
            }
            districtMap.get(d.district).destinations.push(d);
        });
        return Array.from(districtMap.values()).sort((a, b) => a.district.localeCompare(b.district));
    }, []);

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
            return;
        }

        const narrationText = `Welcome to ${destination.name}, located in ${destination.district} District of Maharashtra, the land of Chhatrapati Shivaji Maharaj. ${destination.aiInsight} Key highlights include: ${destination.highlights?.join(', ')}. Local culinary signatures feature ${destination.localCuisine}. Maharashtra welcomes you with rich Sahyadri forts, sacred Jyotirlingas, and untamed tiger reserves.`;

        const utterance = new SpeechSynthesisUtterance(narrationText);
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
        addToast(`Playing Audio Heritage Guide for ${destination.name} 🎧`, 'info');
    };

    const handleSpeedChange = () => {
        const nextSpeed = audioSpeed === 1 ? 1.25 : audioSpeed === 1.25 ? 1.5 : 1;
        setAudioSpeed(nextSpeed);
        if (isPlayingAudio) {
            synthRef.current.cancel();
            setIsPlayingAudio(false);
            addToast(`Audio speed set to ${nextSpeed}x. Press play to listen.`, 'info');
        }
    };

    const handleClaimDistrictStamp = () => {
        if (stampClaimed) return;
        setStampClaimed(true);
        addXP(500, `Claimed ${destination.district} District Heritage Passport Stamp`);
        addToast(`🏆 ${destination.district} District Heritage Stamp claimed! +500 XP added to your Passport!`, 'success');
    };

    if (!destination) return null;

    return (
        <div className="up-district-suite-card">
            {/* Header / Banner */}
            <div className="district-suite-header">
                <div className="header-left">
                    <div
                        className="state-emblem-badge"
                        style={{
                            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.25), rgba(194, 65, 12, 0.35))',
                            borderColor: 'rgba(249, 115, 22, 0.5)',
                            color: '#fdba74'
                        }}
                    >
                        <span>🚩 Maharashtra Tourism</span>
                    </div>
                    <div>
                        <h2 className="suite-title">
                            {destination.district} District Tourism, Forts & Heritage Suite
                        </h2>
                        <p className="suite-subtitle">
                            Unlimited Maharashtra · {destination.division || 'Maharashtra'} Division · {destination.mhCircuit || 'Maratha Forts'}
                        </p>
                    </div>
                </div>

                <div className="header-actions">
                    <button
                        type="button"
                        onClick={() => setIs36DistrictsOpen(true)}
                        className="browse-75-btn"
                        style={{
                            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.18), rgba(194, 65, 12, 0.25))',
                            borderColor: 'rgba(249, 115, 22, 0.45)',
                            color: '#fdba74'
                        }}
                    >
                        <Compass size={14} />
                        <span>All 36 MH Districts ({all36DistrictsDirectory.length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleClaimDistrictStamp}
                        className={`passport-stamp-btn ${stampClaimed ? 'claimed' : ''}`}
                    >
                        <Award size={14} />
                        <span>{stampClaimed ? 'Passport Stamped' : 'Claim District Stamp (+500 XP)'}</span>
                    </button>
                </div>
            </div>

            {/* Audio Heritage Narrator Widget */}
            <div
                className="audio-guide-strip"
                style={{
                    borderColor: 'rgba(249, 115, 22, 0.35)',
                    background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(194, 65, 12, 0.05) 100%)'
                }}
            >
                <div className="audio-info">
                    <button
                        type="button"
                        onClick={toggleAudioGuide}
                        className={`audio-play-circle ${isPlayingAudio ? 'playing' : ''}`}
                        aria-label={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
                        style={{
                            background: isPlayingAudio ? '#ea580c' : 'linear-gradient(135deg, #ea580c, #c2410c)'
                        }}
                    >
                        {isPlayingAudio ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                    <div>
                        <div className="audio-headline">
                            <Volume2 size={14} className="text-orange-400" />
                            <strong>AI Heritage & Forts Audio Guide</strong>
                            <span
                                className="live-pill"
                                style={{
                                    background: 'rgba(234, 88, 12, 0.2)',
                                    color: '#fb923c',
                                    borderColor: 'rgba(234, 88, 12, 0.4)'
                                }}
                            >
                                MH Studio
                            </span>
                        </div>
                        <p className="audio-desc">
                            Listen to verified commentary on Maratha fortresses, Sahyadri geology, sacred Jyotirlingas, and tribal heritage of {destination.name}.
                        </p>
                    </div>
                </div>

                <div className="audio-controls-right">
                    <button
                        type="button"
                        onClick={handleSpeedChange}
                        className="speed-chip"
                        title="Change audio playback speed"
                    >
                        {audioSpeed}x Speed
                    </button>
                    {isPlayingAudio && (
                        <div className="sound-wave-anim">
                            <span className="bar" style={{ background: '#fb923c' }} />
                            <span className="bar" style={{ background: '#fb923c' }} />
                            <span className="bar" style={{ background: '#fb923c' }} />
                            <span className="bar" style={{ background: '#fb923c' }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Tabs for District Suite */}
            <div className="suite-subtabs-row">
                <button
                    type="button"
                    onClick={() => setActiveSection('itinerary')}
                    className={`suite-tab-btn ${activeSection === 'itinerary' ? 'active' : ''}`}
                >
                    <Calendar size={14} />
                    <span>Day Itinerary & Plan</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveSection('odop')}
                    className={`suite-tab-btn ${activeSection === 'odop' ? 'active' : ''}`}
                >
                    <Sparkles size={14} />
                    <span>ODOP & GI Crafts</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveSection('district-spots')}
                    className={`suite-tab-btn ${activeSection === 'district-spots' ? 'active' : ''}`}
                >
                    <MapPin size={14} />
                    <span>In {destination.district} District ({sameDistrictDestinations.length + 1})</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveSection('transit')}
                    className={`suite-tab-btn ${activeSection === 'transit' ? 'active' : ''}`}
                >
                    <Train size={14} />
                    <span>Transit, Safari & Dining</span>
                </button>
            </div>

            {/* SECTION 1: ITINERARY SUGGESTION */}
            {activeSection === 'itinerary' && (
                <div className="suite-tab-content">
                    <div className="itinerary-blueprint-card">
                        <div className="blueprint-top">
                            <div>
                                <span className="bp-eyebrow" style={{ color: '#fb923c' }}>Curated Day Blueprint</span>
                                <h3 className="bp-title">Perfect Day in {destination.district}: {destination.name}</h3>
                            </div>
                            <span
                                className="bp-badge"
                                style={{
                                    background: 'rgba(234, 88, 12, 0.2)',
                                    color: '#fdba74',
                                    borderColor: 'rgba(234, 88, 12, 0.4)'
                                }}
                            >
                                {destination.mhCircuit || 'Maratha Forts'} Circuit
                            </span>
                        </div>

                        <div className="timeline-steps">
                            <div className="timeline-step">
                                <div className="step-badge morning">Morning (06:00 - 10:30)</div>
                                <div className="step-body">
                                    <h4>Dawn Citadel Trek / Safari & Sacred Darshan</h4>
                                    <p>Experience early morning Sahyadri mist rising over fort ramparts, open-top gypsy tiger safaris in Tadoba or Pench, or tranquil early Kakad aarti at Jyotirlinga shrines.</p>
                                    <span className="step-tag">📸 Golden Hour Photography</span>
                                </div>
                            </div>

                            <div className="timeline-step">
                                <div className="step-badge afternoon">Midday (11:00 - 15:30)</div>
                                <div className="step-body">
                                    <h4>ODOP Craft Guilds & Authentic Maharashtrian Feast</h4>
                                    <p>Visit artisan weaving workshops for {destination.odop || 'GI Tag crafts'}. Relish hot Misal Pav, Puran Poli with desi ghee, or authentic Kolhapuri / Konkani coastal delicacies.</p>
                                    <span className="step-tag">🍲 Cuisine: {destination.localCuisine || 'Puran Poli & Misal Pav'}</span>
                                </div>
                            </div>

                            <div className="timeline-step">
                                <div className="step-badge evening">Evening (16:30 - 20:30)</div>
                                <div className="step-body">
                                    <h4>Sunset Viewpoint, Ocean Promenades & Night Bazaars</h4>
                                    <p>Watch spectacular Arabian Sea sunsets from beach cliffs or mountain tops, explore bustling night bazaars, or sample fresh mangoes, chikki, and local sweets.</p>
                                    <span className="step-tag">✨ Evening Cultural Splendor</span>
                                </div>
                            </div>
                        </div>

                        <div className="blueprint-footer">
                            <div className="bp-meta-pill">
                                <Clock size={13} />
                                <span>Ideal Duration: 1 to 2 Days</span>
                            </div>
                            <div className="bp-meta-pill">
                                <Calendar size={13} />
                                <span>Best Season: {destination.bestSeason || 'Oct – Mar'}</span>
                            </div>
                            <button
                                type="button"
                                className="bp-cta-btn"
                                onClick={() => {
                                    addToast(`Added "${destination.name}" to your Trip Itinerary! 📍`, 'success');
                                    navigate('/explore/itinerary-builder');
                                }}
                                style={{
                                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                                    color: '#ffffff'
                                }}
                            >
                                <Calendar size={14} />
                                <span>+ Build Custom Trip Itinerary</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION 2: ODOP & GI CRAFTS */}
            {activeSection === 'odop' && (
                <div className="suite-tab-content">
                    <div className="odop-showcase-grid">
                        <div className="odop-highlight-card">
                            <div className="odop-icon-tag" style={{ background: 'rgba(234, 88, 12, 0.2)', color: '#fb923c' }}>🏺</div>
                            <span className="odop-district-label">{destination.district} District Flagship Craft</span>
                            <h3 className="odop-craft-title">{destination.odop || 'GI-Tagged Handicraft & Agro Product'}</h3>
                            <p className="odop-desc">
                                Under the One District One Product (ODOP) and Geographical Indications (GI) mission, {destination.district} is globally renowned for its specialized craft guilds and heritage artisans.
                            </p>
                            <div className="odop-tags-list">
                                <span className="odop-badge">GI-Tag Certified</span>
                                <span className="odop-badge">Heritage Guild</span>
                                <span className="odop-badge">Artisan Direct Fairtrade</span>
                            </div>
                        </div>

                        <div className="odop-tips-card">
                            <h4>Artisan Verification & Ethical Buying Tips</h4>
                            <ul>
                                <li>
                                    <strong>GI Emblem:</strong> Look for the official Government of India Geographical Indication logo for authentic Paithani, Warli, or Kolhapuri products.
                                </li>
                                <li>
                                    <strong>Direct Support:</strong> Buying from certified cooperative societies directly empowers rural weaver and artisan families.
                                </li>
                                <li>
                                    <strong>Artisan Workshops:</strong> Many villages offer live demonstrations of handloom weaving, copper casting, or Warli wall painting.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION 3: IN-DISTRICT SPOTS */}
            {activeSection === 'district-spots' && (
                <div className="suite-tab-content">
                    <div className="district-spots-container">
                        <div className="spots-header">
                            <div>
                                <h3 className="spots-title">Destinations in {destination.district} District</h3>
                                <p className="spots-subtitle">Explore all curated travel intelligence records within this district boundary</p>
                            </div>
                            <span className="spots-count-badge" style={{ background: 'rgba(234, 88, 12, 0.2)', color: '#fdba74' }}>
                                {sameDistrictDestinations.length + 1} Destinations Recorded
                            </span>
                        </div>

                        <div className="spots-grid">
                            {/* Current Destination */}
                            <div className="district-spot-item active">
                                <span className="spot-marker" style={{ background: '#ea580c' }}>Current</span>
                                <div>
                                    <h4 className="spot-name">{destination.name}</h4>
                                    <p className="spot-meta">{destination.category} · {destination.mhCircuit || 'Maratha Forts'}</p>
                                </div>
                            </div>

                            {/* Same District Companions */}
                            {sameDistrictDestinations.map((companion) => (
                                <div
                                    key={companion.id}
                                    className="district-spot-item clickable"
                                    onClick={() => navigate(`/explore/destinations/${toSlug(companion.name)}`)}
                                >
                                    <div>
                                        <h4 className="spot-name">{companion.name}</h4>
                                        <p className="spot-meta">{companion.category} · {companion.mhCircuit || 'Heritage'}</p>
                                    </div>
                                    <ChevronRight size={16} className="spot-arrow" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION 4: TRANSIT, SAFARI & DINING */}
            {activeSection === 'transit' && (
                <div className="suite-tab-content">
                    <div className="transit-gastronomy-grid">
                        <div className="tg-box">
                            <div className="tg-header">
                                <Train size={16} className="text-orange-400" />
                                <h4>Transit, Expressways & Airport Corridors</h4>
                            </div>
                            <p className="tg-text">
                                <strong>Nearest Transit:</strong> {destination.nearestTransit || 'Connected by Indian Railways, MSRTC & State Highways'}.
                            </p>
                            <p className="tg-text">
                                <strong>Airports:</strong> Chhatrapati Shivaji Maharaj International Airport Mumbai (BOM), Pune Airport (PNQ), Dr. Babasaheb Ambedkar International Airport Nagpur (NAG), Shirdi Airport (SAG), and Chhatrapati Sambhajinagar Airport (IXU).
                            </p>
                            <p className="tg-text">
                                <strong>Expressway Corridors:</strong> Mumbai-Pune Expressway, Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg (Mumbai-Nagpur Super Communication Expressway), and Mumbai-Goa Highway (NH-66).
                            </p>
                            <p className="tg-text">
                                <strong>Vande Bharat Links:</strong> Mumbai-Shirdi, Mumbai-Solapur, Mumbai-Goa, and Nagpur-Bilaspur Vande Bharat Express routes for fast, premium connectivity.
                            </p>
                        </div>

                        <div className="tg-box">
                            <div className="tg-header">
                                <Utensils size={16} className="text-amber-400" />
                                <h4>Local Cuisine & Must-Try Delicacies</h4>
                            </div>
                            <p className="tg-text">
                                <strong>District Signature:</strong> {destination.localCuisine || 'Puran Poli, Misal Pav, Vada Pav, Pithla Bhakri'}.
                            </p>
                            <p className="tg-text">
                                <strong>Iconic Dishes:</strong> Kolhapuri Tambda-Pandhra Rassa, Malvani Fish Curry with Solkadhi, Nagpur Saoji super-spicy curry, Punekar Bakarwadi, and Solapuri Shenga Chutney.
                            </p>
                            <p className="tg-text">
                                <strong>Famous Sweets:</strong> Modak, Alphonso Mango Aamras, Puran Poli with Desi Ghee, Mahabaleshwar Strawberries with cream, and Lonavala Chikki.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for all 36 Districts */}
            <MH36DistrictsModal
                isOpen={is36DistrictsOpen}
                onClose={() => setIs36DistrictsOpen(false)}
                currentDistrict={destination.district}
            />
        </div>
    );
};

export const MH36DistrictsModal = ({ isOpen, onClose, currentDistrict = '', onSelectDistrict }) => {
    const navigate = useNavigate();
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [districtSearch, setDistrictSearch] = useState('');

    const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const all36DistrictsDirectory = useMemo(() => {
        const districtMap = new Map();
        maharashtraDestinations.forEach(d => {
            if (!d.district) return;
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division || 'Maharashtra',
                    odop: d.odop || 'Local Craft & Agro',
                    circuit: d.mhCircuit || 'Maratha Forts',
                    destinations: []
                });
            }
            districtMap.get(d.district).destinations.push(d);
        });
        return Array.from(districtMap.values()).sort((a, b) => a.district.localeCompare(b.district));
    }, []);

    const filteredDistricts = useMemo(() => {
        return all36DistrictsDirectory.filter(item => {
            const matchesDivision = selectedDivision === 'All Divisions' || item.division.toLowerCase() === selectedDivision.toLowerCase();
            const matchesCategory = selectedCategory === 'all' || item.destinations.some(d => matchMHCategory(d, selectedCategory));
            const matchesSearch = !districtSearch ||
                item.district.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.odop.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.circuit.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.destinations.some(dest => dest.name.toLowerCase().includes(districtSearch.toLowerCase()));
            return matchesDivision && matchesCategory && matchesSearch;
        });
    }, [all36DistrictsDirectory, selectedDivision, selectedCategory, districtSearch]);

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
                    <div className="modal-top-bar" style={{ borderBottomColor: 'rgba(234, 88, 12, 0.25)' }}>
                        <div className="modal-title-group">
                            <div
                                className="modal-flag-wrap"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.3), rgba(194, 65, 12, 0.2))'
                                }}
                            >
                                🚩
                            </div>
                            <div>
                                <h3 className="modal-title">All 36 Districts of Maharashtra</h3>
                                <p className="modal-subtitle">Unlimited Maharashtra · Tourism, Forts & ODOP Directory across all 6 Administrative Divisions</p>
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
                                placeholder="Search MH district name, fort, craft or spot (e.g. Pune, Raigad, Nashik, Tadoba, Ajanta)..."
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
                                {MH_DIVISIONS.map(div => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category Filter Pills in Modal */}
                    <div
                        className="modal-category-filter-strip"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            padding: '0.5rem 1.4rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                            flexWrap: 'wrap',
                            background: 'rgba(0, 0, 0, 0.15)'
                        }}
                    >
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#94a3b8', marginRight: '0.25rem' }}>
                            Interest:
                        </span>
                        {MH_CATEGORIES.map(cat => {
                            const isCatActive = selectedCategory === cat.id;
                            const count = cat.id === 'all'
                                ? all36DistrictsDirectory.length
                                : all36DistrictsDirectory.filter(d => d.destinations.some(item => matchMHCategory(item, cat.id))).length;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        padding: '0.3rem 0.65rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.74rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        background: isCatActive ? 'linear-gradient(135deg, #ea580c, #c2410c)' : 'rgba(255, 255, 255, 0.05)',
                                        color: isCatActive ? '#ffffff' : '#cbd5e1',
                                        border: isCatActive ? '1px solid #ea580c' : '1px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: isCatActive ? '0 2px 10px rgba(234, 88, 12, 0.35)' : 'none'
                                    }}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.label}</span>
                                    <span style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem', borderRadius: '9999px', background: isCatActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.3)', color: '#fff' }}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Districts Grid (36 Districts) */}
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
                                        <span
                                            className="district-count-tag"
                                            style={{
                                                background: 'rgba(234, 88, 12, 0.18)',
                                                color: '#fdba74'
                                            }}
                                        >
                                            {item.destinations.length} spot{item.destinations.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <span className="district-division-tag">{item.division} Division · {item.circuit}</span>
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
                        <span>Showing {filteredDistricts.length} of 36 Districts · Maharashtra Tourism (Unlimited Maharashtra)</span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MHDistrictIntelligenceSuite;
export { MHDistrictIntelligenceSuite };
