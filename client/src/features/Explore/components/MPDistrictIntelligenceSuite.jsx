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
import { madhyaPradeshDestinations } from '../../../data/madhyaPradeshDestinationsData';
import { useToastStore } from '../../../store/toastStore';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { UGCImage } from '../../../components/common/Image';
import './UPDistrictIntelligenceSuite.css';

// 10 Administrative Divisions of Madhya Pradesh
export const MP_DIVISIONS = [
    'All Divisions',
    'Bhopal',
    'Indore',
    'Gwalior',
    'Jabalpur',
    'Ujjain',
    'Sagar',
    'Rewa',
    'Chambal',
    'Narmadapuram',
    'Shahdol'
];

// All 55 Official Districts of Madhya Pradesh
export const MP_DISTRICTS = [
    'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat',
    'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur',
    'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas',
    'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda',
    'Hoshangabad (Narmadapuram)', 'Indore', 'Jabalpur', 'Jhabua', 'Katni',
    'Khandwa', 'Khargone', 'Maihar', 'Mandla', 'Mandsaur',
    'Mauganj', 'Morena', 'Narsinghpur', 'Neemuch', 'Niwari',
    'Pandhurna', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam',
    'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni',
    'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi',
    'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'
];

export const MP_CIRCUITS = [
    { id: 'all', label: 'All MP Destinations', icon: '🐅', description: 'Complete directory across all 55 districts of Madhya Pradesh' },
    { id: 'World Heritage', label: 'UNESCO World Heritage', icon: '🏛️', description: 'Khajuraho Temples, Sanchi Stupa, Bhimbetka Rock Shelters' },
    { id: 'Tiger Reserves & Wildlife', label: 'Tiger Safaris & Wildlife', icon: '🐾', description: 'Kanha, Bandhavgarh, Pench, Panna, Satpura, Kuno National Park' },
    { id: 'Spiritual & Jyotirlinga', label: 'Jyotirlingas & River Ghats', icon: '🕉️', description: 'Mahakaleshwar Ujjain, Omkareshwar, Amarkantak, Chitrakoot' },
    { id: 'Forts & Palaces', label: 'Forts & Historical Citadels', icon: '🏰', description: 'Gwalior Fort, Mandu City of Joy, Orchha, Chanderi, Asirgarh' },
    { id: 'Nature & Waterfalls', label: 'Nature & Waterfalls', icon: '🌊', description: 'Bhedaghat Marble Rocks, Pachmarhi Queen of Satpura, Raneh Falls' },
    { id: 'Crafts & Heritage', label: 'GI-Tags & Tribal Crafts', icon: '🏺', description: 'Chanderi Sarees, Maheshwari Silk, Bagh Print, Gond Art, Ratlami Sev' }
];

// Core Category / Interest filters for Madhya Pradesh
export const MP_CATEGORIES = [
    { id: 'all', label: 'All Interests', icon: '🌟', description: 'Explore all 55 districts across Madhya Pradesh' },
    { id: 'wildlife', label: 'Wildlife', icon: '🐾', description: 'Royal Bengal tiger reserves, cheetah sanctuaries & national parks' },
    { id: 'historical', label: 'Historical', icon: '🏛️', description: 'UNESCO monuments, ancient rock art, medieval citadels & palaces' },
    { id: 'pilgrimage', label: 'Pilgrimage', icon: '🕉️', description: 'Jyotirlingas, holy Narmada ghats, Shaktipeeths & sacred shrines' },
    { id: 'nature', label: 'Nature & Waterfalls', icon: '🌊', description: 'Marble rocks, hill stations, cascading waterfalls & deep gorges' },
    { id: 'crafts', label: 'GI-Crafts & Culture', icon: '🏺', description: 'Handloom silks, tribal Gond/Bhil art, block prints & ODOP guilds' }
];

export const matchMPCategory = (dest, categoryId) => {
    if (!categoryId || categoryId === 'all') return true;
    const cat = (dest.category || '').toLowerCase();
    const circuit = (dest.mpCircuit || '').toLowerCase();
    const tags = Array.isArray(dest.tags) ? dest.tags.map(t => t.toLowerCase()) : [];
    const name = (dest.name || '').toLowerCase();
    const text = `${dest.name} ${dest.location} ${dest.aiInsight || ''} ${dest.socialProof || ''}`.toLowerCase();

    if (categoryId === 'wildlife') {
        if (cat === 'wildlife' || circuit.includes('wildlife') || circuit.includes('tiger')) return true;
        if (name.includes('national park') || name.includes('tiger reserve') || name.includes('wildlife sanctuary') || name.includes('bird sanctuary') || name.includes('safari') || name.includes('cheetah')) return true;
        return tags.some(t => ['tiger', 'wildlife', 'safari', 'national park', 'cheetah', 'sanctuary', 'gharial', 'barasingha', 'leopard'].includes(t)) &&
            !cat.includes('historic') && !cat.includes('spiritual');
    }

    if (categoryId === 'historical') {
        if (cat === 'historical' || circuit.includes('heritage') || circuit.includes('fort') || circuit.includes('palace') || circuit.includes('world heritage')) return true;
        if (name.includes('fort') || name.includes('palace') || name.includes('unesco') || name.includes('stupa') || name.includes('caves') || name.includes('rock shelters') || name.includes('monument') || name.includes('citadel') || name.includes('qila')) return true;
        return tags.some(t => ['unesco', 'ancient', 'fort', 'palace', 'heritage', 'monument', 'medieval', 'rock art', 'archaeology', 'chandela', 'scindia', 'bundela', 'stupa', 'caves', 'citadel'].includes(t));
    }

    if (categoryId === 'pilgrimage' || categoryId === 'spiritual') {
        if (cat === 'spiritual' || circuit.includes('spiritual') || circuit.includes('jyotirlinga')) return true;
        if (name.includes('jyotirlinga') || name.includes('teerth') || name.includes('shaktipeeth') || name.includes('temple') || name.includes('mandir') || name.includes('ghat') || name.includes('dham') || name.includes('kund') || name.includes('tekri') || name.includes('kshetra')) return true;
        return tags.some(t => ['jyotirlinga', 'spiritual', 'pilgrimage', 'temple', 'narmada', 'teerth', 'shrine', 'shiva', 'shaktipeeth', 'kumbh mela', 'aarti', 'ghat'].includes(t));
    }

    if (categoryId === 'nature') {
        if (cat === 'nature' || circuit.includes('nature') || circuit.includes('waterfall')) return true;
        if (name.includes('waterfall') || name.includes('falls') || name.includes('marble rocks') || name.includes('hill station') || name.includes('lake') || name.includes('gorge') || name.includes('valley')) return true;
        return tags.some(t => ['waterfall', 'nature', 'marble rocks', 'hills', 'valley', 'gorge', 'river', 'satpura', 'pachmarhi', 'falls'].includes(t));
    }

    if (categoryId === 'crafts' || categoryId === 'culture') {
        if (cat === 'culture' || cat === 'craft' || circuit.includes('craft') || circuit.includes('culture') || circuit.includes('tribal')) return true;
        return Boolean(dest.odop) && (tags.some(t => ['craft', 'handloom', 'silk', 'print', 'textile', 'pottery', 'art', 'gond', 'bell metal'].includes(t)) || text.includes('gi tag') || text.includes('handloom') || text.includes('weaving') || text.includes('craft'));
    }

    return cat.includes(categoryId.toLowerCase()) || circuit.includes(categoryId.toLowerCase());
};

const MPDistrictIntelligenceSuite = ({ destination }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { addXP } = useNomadOSStore();

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioSpeed, setAudioSpeed] = useState(1);
    const [is55DistrictsOpen, setIs55DistrictsOpen] = useState(false);
    const [stampClaimed, setStampClaimed] = useState(false);
    const [activeSection, setActiveSection] = useState('itinerary'); // 'itinerary' | 'odop' | 'district-spots' | 'transit'

    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    // Other destinations in the SAME district
    const sameDistrictDestinations = useMemo(() => {
        if (!destination?.district) return [];
        return madhyaPradeshDestinations.filter(
            d => d.district === destination.district && String(d.id) !== String(destination.id)
        );
    }, [destination]);

    // Group all 55 districts with their ODOP and destination counts
    const all55DistrictsDirectory = useMemo(() => {
        const districtMap = new Map();
        madhyaPradeshDestinations.forEach(d => {
            if (!d.district) return;
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division || 'Madhya Pradesh',
                    odop: d.odop || 'Local Craft & Agro Products',
                    circuit: d.mpCircuit || 'Heritage',
                    destinations: []
                });
            }
            districtMap.get(d.district).destinations.push(d);
        });
        return Array.from(districtMap.values()).sort((a, b) => a.district.localeCompare(b.district));
    }, []);

    // Audio Guide synthesis setup
    useEffect(() => {
        const synth = synthRef.current;
        return () => {
            if (synth && synth.speaking) {
                synth.cancel();
            }
        };
    }, []);

    const toggleAudioGuide = () => {
        if (!('speechSynthesis' in window)) {
            addToast('Speech synthesis is not supported on this browser device', 'error');
            return;
        }

        if (isPlayingAudio) {
            synthRef.current.cancel();
            setIsPlayingAudio(false);
            return;
        }

        const narrationText = `Welcome to ${destination.name}, located in ${destination.district} District, ${destination.division || 'Madhya Pradesh'} Division, Madhya Pradesh, the Heart of Incredible India. ${destination.aiInsight || ''}. Key highlights include: ${destination.highlights?.join(', ') || 'historical and cultural landmarks'}. The renowned One District One Product or GI Craft of this region is ${destination.odop || 'traditional handicraft'}. Local cuisine not to miss includes ${destination.localCuisine || 'Poha Jalebi and Dal Bafla'}. Connectivity includes high speed 5G and ${destination.nearestTransit || 'excellent rail and road links'}. Have an inspired journey exploring Madhya Pradesh.`;

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
        synthRef.current.cancel();
        synthRef.current.speak(utterance);
        setIsPlayingAudio(true);
        addToast(`Playing audio intelligence for ${destination.name} 🎧`, 'info');
    };

    const handleSpeedChange = () => {
        const nextSpeed = audioSpeed === 1 ? 1.25 : audioSpeed === 1.25 ? 1.5 : 1;
        setAudioSpeed(nextSpeed);
        if (isPlayingAudio && utteranceRef.current) {
            synthRef.current.cancel();
            utteranceRef.current.rate = nextSpeed;
            synthRef.current.speak(utteranceRef.current);
        }
    };

    const handleClaimDistrictStamp = () => {
        if (stampClaimed) return;
        setStampClaimed(true);
        if (addXP) addXP(500);
        addToast(`🌟 Claimed +500 XP & "${destination.district} District Explorer" Digital Stamp!`, 'success');
    };

    return (
        <div className="up-district-suite-card">
            {/* Header / Banner */}
            <div className="district-suite-header">
                <div className="header-left">
                    <div className="state-emblem-badge" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.35))', borderColor: 'rgba(52, 211, 153, 0.5)', color: '#6ee7b7' }}>
                        <span>🐅 MP Tourism</span>
                    </div>
                    <div>
                        <h2 className="suite-title">
                            {destination.district} District Tourism & Heritage Suite
                        </h2>
                        <p className="suite-subtitle">
                            The Heart of Incredible India · {destination.division || 'Madhya Pradesh'} Division · {destination.mpCircuit || 'Heritage Circuit'}
                        </p>
                    </div>
                </div>

                <div className="header-actions">
                    <button
                        type="button"
                        onClick={() => setIs55DistrictsOpen(true)}
                        className="browse-75-btn"
                        style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(5, 150, 105, 0.25))', borderColor: 'rgba(52, 211, 153, 0.45)', color: '#6ee7b7' }}
                    >
                        <Compass size={14} />
                        <span>All 55 MP Districts ({all55DistrictsDirectory.length})</span>
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
            <div className="audio-guide-strip" style={{ borderColor: 'rgba(16, 185, 129, 0.35)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.05) 100%)' }}>
                <div className="audio-info">
                    <button
                        type="button"
                        onClick={toggleAudioGuide}
                        className={`audio-play-circle ${isPlayingAudio ? 'playing' : ''}`}
                        aria-label={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
                        style={{ background: isPlayingAudio ? '#10b981' : 'linear-gradient(135deg, #10b981, #059669)' }}
                    >
                        {isPlayingAudio ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                    <div>
                        <div className="audio-headline">
                            <Volume2 size={14} className="text-emerald-400" />
                            <strong>AI Heritage & Safari Audio Guide</strong>
                            <span className="live-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.4)' }}>MP Studio</span>
                        </div>
                        <p className="audio-desc">
                            Listen to verified historical commentary on Chandela, Scindia, Holkar, Ashokan & tribal heritage of {destination.name}.
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
                            <span className="bar" style={{ background: '#34d399' }} />
                            <span className="bar" style={{ background: '#34d399' }} />
                            <span className="bar" style={{ background: '#34d399' }} />
                            <span className="bar" style={{ background: '#34d399' }} />
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
                                <span className="bp-eyebrow" style={{ color: '#34d399' }}>Curated Day Blueprint</span>
                                <h3 className="bp-title">Perfect Day in {destination.district}: {destination.name}</h3>
                            </div>
                            <span className="bp-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
                                {destination.mpCircuit || 'UNESCO & Safari'} Circuit
                            </span>
                        </div>

                        <div className="timeline-steps">
                            <div className="timeline-step">
                                <div className="step-badge morning">Morning (06:00 - 10:30)</div>
                                <div className="step-body">
                                    <h4>Dawn Darshan / Safari & Architectural Marvel</h4>
                                    <p>Experience the magical morning light, Bhasma Aarti at Mahakal, morning gypsy safari in tiger core zones, or serene sunrise over the temple spires.</p>
                                    <span className="step-tag">📸 Golden Hour Photography</span>
                                </div>
                            </div>

                            <div className="timeline-step">
                                <div className="step-badge afternoon">Midday (11:00 - 15:30)</div>
                                <div className="step-body">
                                    <h4>ODOP Craft Guilds & Authentic Malwa-Bundeli Feast</h4>
                                    <p>Visit local artisan workshops for {destination.odop || 'GI Tag crafts'}. Relish hot Poha Jalebi, Dal Bafla with pure desi ghee, and local Bhutte Ka Kees.</p>
                                    <span className="step-tag">🍲 Cuisine: {destination.localCuisine || 'Dal Bafla & Poha'}</span>
                                </div>
                            </div>

                            <div className="timeline-step">
                                <div className="step-badge evening">Evening (16:30 - 20:30)</div>
                                <div className="step-body">
                                    <h4>River Ghat Aarti, Sound & Light Show & Night Bazaars</h4>
                                    <p>Witness sacred Narmada/Shipra River evening Aarti, dramatic sound and light shows at Gwalior/Khajuraho/Orchha, or shop for authentic Chanderi/Maheshwari weaves.</p>
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
                                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff' }}
                            >
                                <Calendar size={14} />
                                <span>Add to Day-by-Day Itinerary 🗓️</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION 2: ODOP & GI-TAGGED CRAFTS */}
            {activeSection === 'odop' && (
                <div className="suite-tab-content">
                    <div className="odop-spotlight-card" style={{ borderColor: 'rgba(16, 185, 129, 0.35)' }}>
                        <div className="odop-badge" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.25))', color: '#6ee7b7' }}>
                            <Sparkles size={14} />
                            <span>One District One Product (ODOP) & GI Certification</span>
                        </div>
                        <h3 className="odop-title">{destination.odop || 'Indigenous Heritage Handloom & Craft'}</h3>
                        <p className="odop-desc">
                            {destination.district} District is nationally recognized under Madhya Pradesh's ODOP initiative and Geographical Indication (GI) registry. These crafts sustain indigenous Gond, Baiga, Bhil artisans and weaver co-operatives spanning centuries.
                        </p>

                        <div className="odop-perks-grid">
                            <div className="odop-perk-box">
                                <Award size={16} className="text-emerald-400" />
                                <div>
                                    <strong>GI Verified Authenticity</strong>
                                    <p>Government certified origin guarantee directly supporting local artisan clusters.</p>
                                </div>
                            </div>
                            <div className="odop-perk-box">
                                <Sparkles size={16} className="text-amber-400" />
                                <div>
                                    <strong>Master Craftsmanship</strong>
                                    <p>Hand-woven silk, natural mineral vegetable dye block prints, bell metal casting, or stone sculptures.</p>
                                </div>
                            </div>
                            <div className="odop-perk-box">
                                <Globe size={16} className="text-cyan-400" />
                                <div>
                                    <strong>Global Export Guilds</strong>
                                    <p>Shipped worldwide with dedicated packaging and artisan heritage certificates.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION 3: OTHER SPOTS IN THIS DISTRICT */}
            {activeSection === 'district-spots' && (
                <div className="suite-tab-content">
                    <div className="district-destinations-list">
                        <div className="dest-item current-spot" style={{ borderColor: '#10b981' }}>
                            <div className="item-meta">
                                <span className="item-badge" style={{ background: '#10b981', color: '#000' }}>Active Destination</span>
                                <h4 className="item-name">{destination.name}</h4>
                                <p className="item-sub">{destination.location} · {destination.category}</p>
                            </div>
                            <div className="item-tag">{destination.mpCircuit}</div>
                        </div>

                        {sameDistrictDestinations.map(other => (
                            <div
                                key={other.id}
                                className="dest-item clickable"
                                onClick={() => navigate(`/explore/destinations/${toSlug(other.name)}`)}
                            >
                                <div className="item-meta">
                                    <span className="item-badge">In {destination.district}</span>
                                    <h4 className="item-name">{other.name}</h4>
                                    <p className="item-sub">{other.location} · {other.category}</p>
                                </div>
                                <div className="item-actions">
                                    <span className="item-price">{other.price}</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        ))}

                        {sameDistrictDestinations.length === 0 && (
                            <div className="single-spot-note">
                                <p>You are viewing the flagship heritage and tourism destination of {destination.district} District. Explore other districts in the <strong>{destination.division || 'Madhya Pradesh'} Division</strong> or browse all 55 districts.</p>
                                <button
                                    type="button"
                                    onClick={() => setIs55DistrictsOpen(true)}
                                    className="open-55-btn"
                                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff' }}
                                >
                                    Browse All 55 Districts of MP →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* SECTION 4: TRANSIT, SAFARIS & DINING */}
            {activeSection === 'transit' && (
                <div className="suite-tab-content">
                    <div className="transit-gastronomy-grid">
                        <div className="tg-box">
                            <div className="tg-header">
                                <Train size={16} className="text-emerald-400" />
                                <h4>Transit, Safari Access & Expressways</h4>
                            </div>
                            <p className="tg-text">
                                <strong>Nearest Transit:</strong> {destination.nearestTransit || 'Connected by Indian Railways & State Highways'}.
                            </p>
                            <p className="tg-text">
                                <strong>Airports:</strong> Devi Ahilyabai Holkar Airport Indore (IDR), Raja Bhoj Airport Bhopal (BHO), Jabalpur Airport (JLR), Gwalior Airport (GWL), and Khajuraho Airport (HJR).
                            </p>
                            <p className="tg-text">
                                <strong>Vande Bharat Links:</strong> Bhopal-Jabalpur, Bhopal-Indore, and Bhopal-Delhi Vande Bharat Express corridors for fast transit.
                            </p>
                        </div>

                        <div className="tg-box">
                            <div className="tg-header">
                                <Utensils size={16} className="text-amber-400" />
                                <h4>Local Cuisine & Must-Try Delicacies</h4>
                            </div>
                            <p className="tg-text">
                                <strong>District Signature:</strong> {destination.localCuisine || 'Poha Jalebi, Dal Bafla with pure desi ghee, Bhutte Ka Kees'}.
                            </p>
                            <p className="tg-text">
                                <strong>Food Streets & Bazaars:</strong> Sarafa Bazaar & Chappan Dukan (Indore), Tower Chowk (Ujjain), Chowk Bazaars (Bhopal), and Bada (Gwalior).
                            </p>
                            <p className="tg-text">
                                <strong>Famous Sweets:</strong> Mawa Bati, Malpua, Shrikhand, and Chanderi/Bundeli Khurma.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for all 55 Districts */}
            <MP55DistrictsModal
                isOpen={is55DistrictsOpen}
                onClose={() => setIs55DistrictsOpen(false)}
                currentDistrict={destination.district}
            />
        </div>
    );
};

export const MP55DistrictsModal = ({ isOpen, onClose, currentDistrict = '', onSelectDistrict }) => {
    const navigate = useNavigate();
    const [selectedDivision, setSelectedDivision] = useState('All Divisions');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [districtSearch, setDistrictSearch] = useState('');

    const toSlug = (text) => (text || '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    const all55DistrictsDirectory = useMemo(() => {
        const districtMap = new Map();
        madhyaPradeshDestinations.forEach(d => {
            if (!d.district) return;
            if (!districtMap.has(d.district)) {
                districtMap.set(d.district, {
                    district: d.district,
                    division: d.division || 'Madhya Pradesh',
                    odop: d.odop || 'Local Handicraft & Agro',
                    circuit: d.mpCircuit || 'Heritage',
                    destinations: []
                });
            }
            districtMap.get(d.district).destinations.push(d);
        });
        return Array.from(districtMap.values()).sort((a, b) => a.district.localeCompare(b.district));
    }, []);

    const filteredDistricts = useMemo(() => {
        return all55DistrictsDirectory.filter(item => {
            const matchesDivision = selectedDivision === 'All Divisions' || item.division.toLowerCase() === selectedDivision.toLowerCase();
            const matchesCategory = selectedCategory === 'all' || item.destinations.some(d => matchMPCategory(d, selectedCategory));
            const matchesSearch = !districtSearch ||
                item.district.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.odop.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.circuit.toLowerCase().includes(districtSearch.toLowerCase()) ||
                item.destinations.some(dest => dest.name.toLowerCase().includes(districtSearch.toLowerCase()));
            return matchesDivision && matchesCategory && matchesSearch;
        });
    }, [all55DistrictsDirectory, selectedDivision, selectedCategory, districtSearch]);

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
                    <div className="modal-top-bar" style={{ borderBottomColor: 'rgba(16, 185, 129, 0.25)' }}>
                        <div className="modal-title-group">
                            <div className="modal-flag-wrap" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2))' }}>🐅</div>
                            <div>
                                <h3 className="modal-title">All 55 Districts of Madhya Pradesh</h3>
                                <p className="modal-subtitle">The Heart of Incredible India · Tourism & ODOP Directory across all 10 Administrative Divisions</p>
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
                                placeholder="Search MP district name, craft or spot (e.g. Ujjain, Khajuraho, Kanha, Chanderi)..."
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
                                {MP_DIVISIONS.map(div => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category Filter Pills in Modal */}
                    <div className="modal-category-filter-strip" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.5rem 1.4rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', flexWrap: 'wrap', background: 'rgba(0, 0, 0, 0.15)' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#94a3b8', marginRight: '0.25rem' }}>
                            Interest:
                        </span>
                        {MP_CATEGORIES.map(cat => {
                            const isCatActive = selectedCategory === cat.id;
                            const count = cat.id === 'all'
                                ? all55DistrictsDirectory.length
                                : all55DistrictsDirectory.filter(d => d.destinations.some(item => matchMPCategory(item, cat.id))).length;
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
                                        background: isCatActive ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.05)',
                                        color: isCatActive ? '#ffffff' : '#cbd5e1',
                                        border: isCatActive ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: isCatActive ? '0 2px 10px rgba(16, 185, 129, 0.35)' : 'none'
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

                    {/* Districts Grid (55 Districts) */}
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
                                        <span className="district-count-tag" style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#6ee7b7' }}>
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
                        <span>Showing {filteredDistricts.length} of 55 Districts · Madhya Pradesh Tourism (Incredible India)</span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MPDistrictIntelligenceSuite;
export { MPDistrictIntelligenceSuite };
