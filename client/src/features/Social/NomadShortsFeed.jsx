import React, { useState, useMemo } from 'react';
import {
    Sparkles,
    Compass,
    MapPin,
    Wifi,
    Sun,
    Volume2,
    VolumeX,
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Plus,
    Zap,
    Clock,
    DollarSign,
    ArrowUpRight,
    CheckCircle2,
    Headphones,
    Eye,
    Layers,
    Play,
    X,
    Navigation
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../../store/toastStore';
import '../../styles/NomadShorts.css';

const MOOD_FREQUENCIES = [
    { id: 'all', label: 'All Vibes', emoji: '✨' },
    { id: 'golden-hour', label: 'Golden Hour', emoji: '🌅' },
    { id: 'deep-focus', label: 'Deep Work & Cafe', emoji: '☕' },
    { id: 'ocean-pulse', label: 'Coastal & Surf', emoji: '🌊' },
    { id: 'alpine-calm', label: 'Alpine Zen', emoji: '🏔️' },
    { id: 'night-neon', label: 'Midnight Neon', emoji: '🏮' }
];

const INITIAL_VIBES = [
    {
        id: 'vibe-1',
        title: 'Uluwatu Cliffside Sunset & Lo-Fi Wave Pulse',
        creator: '@ElenaRostova',
        creatorName: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        location: 'Uluwatu, Bali · Indonesia',
        coordinates: '8.8291° S, 115.0849° E',
        mood: 'golden-hour',
        moodLabel: 'Golden Hour',
        soundscape: 'Indian Ocean Swell + Vinyl Chillhop (432 Hz)',
        temp: '28°C · Warm Breeze',
        wifiSpeed: '295 Mbps Starlink',
        dailyBudget: '$48 / day',
        crowdLevel: 'Peaceful (24% capacity)',
        vibeScore: 98,
        likes: 1420,
        saves: 640,
        clones: 312,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85',
        story: 'Working from Single Fin terrace right as the tide drops. Fiber is rock solid and the sunset horizon turns electric violet at 6:14 PM.',
        blueprintSteps: [
            '09:00 AM — Deep Work Sprint at Ours Coworking Uluwatu (295 Mbps)',
            '04:30 PM — Cliffside Cold Brew & Acoustic Session at Single Fin',
            '06:00 PM — Golden Hour Surf Watch & Seafood Grill on Thomas Beach'
        ]
    },
    {
        id: 'vibe-2',
        title: 'Kyoto Bamboo Rain & Matcha Ceremonial Focus',
        creator: '@KenjiTakahashi',
        creatorName: 'Kenji Takahashi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        location: 'Arashiyama, Kyoto · Japan',
        coordinates: '35.0094° N, 135.6670° E',
        mood: 'deep-focus',
        moodLabel: 'Deep Work & Cafe',
        soundscape: 'Soft Cedar Rain + Koto Ambient Resonance',
        temp: '19°C · Crisp Mist',
        wifiSpeed: '610 Mbps Optical Fiber',
        dailyBudget: '$65 / day',
        crowdLevel: 'Ultra Quiet (Early Morning)',
        vibeScore: 99,
        likes: 2190,
        saves: 1120,
        clones: 485,
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=85',
        story: '6:00 AM walk through Arashiyama before a single tourist arrives, followed by a 4-hour coding block in a 100-year-old machiya townhouse.',
        blueprintSteps: [
            '06:15 AM — Dawn Sensory Walk along Katsura River & Bamboo Grove',
            '08:30 AM — Hand-whisked Uji Matcha & Deep Focus at Weekenders Roastery',
            '01:00 PM — Zen Rock Garden contemplation & Sobaya lunch'
        ]
    },
    {
        id: 'vibe-3',
        title: 'Lofoten Arctic Fjord Midnight Sun & Kayak Drift',
        creator: '@SorenLindqvist',
        creatorName: 'Soren Lindqvist',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        location: 'Reine, Lofoten Islands · Norway',
        coordinates: '67.9325° N, 13.0886° E',
        mood: 'alpine-calm',
        moodLabel: 'Alpine Zen',
        soundscape: 'Glacial Fjord Water + Nordic Cello Drone',
        temp: '11°C · Pure Arctic Air',
        wifiSpeed: '380 Mbps 5G / Fiber',
        dailyBudget: '$115 / day',
        crowdLevel: 'Remote Sanctuary',
        vibeScore: 97,
        likes: 1850,
        saves: 890,
        clones: 274,
        image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&auto=format&fit=crop&q=85',
        story: '24 hours of golden daylight over granite peaks. We set up our remote studio inside a red rorbuer fisherman cabin right over the water.',
        blueprintSteps: [
            '10:00 AM — Harbor Cabin Workspace with Panoramic Fjord View',
            '05:00 PM — Reinebringen Ridge Hike (448m elevation)',
            '11:30 PM — Midnight Sun Sea Kayaking across mirror-still waters'
        ]
    },
    {
        id: 'vibe-4',
        title: 'Lisbon Alfama Tram Bells & Miradouro Wine Glow',
        creator: '@SofiaMendes',
        creatorName: 'Sofia Mendes',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        location: 'Alfama & Graça, Lisbon · Portugal',
        coordinates: '38.7117° N, 9.1303° W',
        mood: 'golden-hour',
        moodLabel: 'Golden Hour',
        soundscape: 'Vintage Tram 28 Bell + Acoustic Fado Guitar',
        temp: '24°C · Atlantic Sun',
        wifiSpeed: '420 Mbps Fiber',
        dailyBudget: '$72 / day',
        crowdLevel: 'Vibrant Social Pulse',
        vibeScore: 96,
        likes: 1640,
        saves: 730,
        clones: 390,
        image: 'https://images.unsplash.com/photo-1513735492246-483525079686?w=1200&auto=format&fit=crop&q=85',
        story: 'Terracotta rooftops glowing over the Tagus River while founders and creators gather at Miradouro da Graça after wrapping up product sprints.',
        blueprintSteps: [
            '09:30 AM — Coworking & Pastel de Nata at Copenhagen Coffee Lab',
            '05:30 PM — Tram 28 Climb & Sunset Sketching at Miradouro',
            '08:30 PM — Intimate Fado Dinner & Natural Wine in Alfama alleys'
        ]
    },
    {
        id: 'vibe-5',
        title: 'Shibuya Cyber-Alley Izakaya & Late-Night Synth',
        creator: '@MayaLin',
        creatorName: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        location: 'Shibuya & Daikanyama, Tokyo · Japan',
        coordinates: '35.6595° N, 139.7004° E',
        mood: 'night-neon',
        moodLabel: 'Midnight Neon',
        soundscape: 'Neon Rain Reflections + Analog Vinyl Jazz',
        temp: '21°C · Electric Night',
        wifiSpeed: '850 Mbps Gigabit',
        dailyBudget: '$82 / day',
        crowdLevel: 'High Energy',
        vibeScore: 98,
        likes: 2640,
        saves: 1340,
        clones: 520,
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=85',
        story: 'Late-night creative energy in Daikanyama Tsutaya Books followed by hidden vinyl listening bars in Shibuya.',
        blueprintSteps: [
            '02:00 PM — Design Sprint at Tsutaya Books Anjin Lounge',
            '07:30 PM — Shibuya Sky 360° Rooftop Twilight Observation',
            '10:00 PM — Hi-Fi Vinyl Bar & Yakitori in Nonbei Yokocho'
        ]
    },
    {
        id: 'vibe-6',
        title: 'Ericeira Atlantic Surf Break & Sunlit Villa Deck',
        creator: '@LucasVance',
        creatorName: 'Lucas Vance',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        location: 'Ericeira, Coast · Portugal',
        coordinates: '38.9626° N, 9.4156° W',
        mood: 'ocean-pulse',
        moodLabel: 'Coastal & Surf',
        soundscape: 'Atlantic Reef Break + Coastal Acoustic Breeze',
        temp: '23°C · Offshore Wind',
        wifiSpeed: '350 Mbps Fiber',
        dailyBudget: '$58 / day',
        crowdLevel: 'Balanced Nomad Community',
        vibeScore: 95,
        likes: 1290,
        saves: 580,
        clones: 245,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=85',
        story: 'Morning glass waves at Ribeira d’Ilhas, specialty espresso at Balagan, and shipping features with ocean view.',
        blueprintSteps: [
            '07:30 AM — Dawn Patrol Surf Session at Ribeira d’Ilhas',
            '10:00 AM — Oceanfront Coliving Desk & Smoothie Bowl at Outsite',
            '06:30 PM — Cliff Walk & Fresh Grilled Sea Bass in Old Town'
        ]
    }
];

const NomadShortsFeed = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [vibes, setVibes] = useState(INITIAL_VIBES);
    const [activeMood, setActiveMood] = useState('all');
    const [viewLayout, setViewLayout] = useState('deck'); // 'deck' | 'focus'
    const [activeSoundId, setActiveSoundId] = useState('vibe-1');
    const [likedIds, setLikedIds] = useState({});
    const [savedIds, setSavedIds] = useState({});
    const [selectedBlueprint, setSelectedBlueprint] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // New Vibe Form State
    const [newTitle, setNewTitle] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newMood, setNewMood] = useState('golden-hour');
    const [newSoundscape, setNewSoundscape] = useState('');
    const [newStory, setNewStory] = useState('');

    const filteredVibes = useMemo(() => {
        if (activeMood === 'all') return vibes;
        return vibes.filter((v) => v.mood === activeMood);
    }, [vibes, activeMood]);

    const handleToggleLike = (id) => {
        setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleToggleSave = (id, title) => {
        const nextState = !savedIds[id];
        setSavedIds((prev) => ({ ...prev, [id]: nextState }));
        addToast(
            nextState ? `Saved "${title}" to your Vibe Vault! ✨` : `Removed from Vibe Vault`,
            nextState ? 'success' : 'info'
        );
    };

    const handleCloneVibeToTrip = (vibe) => {
        addToast(
            `Cloned "${vibe.location}" sensory blueprint into your Trip Builder! 🧭`,
            'success'
        );
        setSelectedBlueprint(vibe);
    };

    const handlePublishVibe = (e) => {
        e.preventDefault();
        if (!newTitle.trim() || !newLocation.trim()) return;

        const moodObj = MOOD_FREQUENCIES.find((m) => m.id === newMood) || MOOD_FREQUENCIES[1];
        const created = {
            id: `vibe-${Date.now()}`,
            title: newTitle.trim(),
            creator: '@You',
            creatorName: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
            location: newLocation.trim(),
            coordinates: 'Live GPS Verified',
            mood: newMood,
            moodLabel: moodObj.label,
            soundscape: newSoundscape.trim() || 'Natural Ambient Field Recording (432 Hz)',
            temp: '25°C · Ideal Weather',
            wifiSpeed: '320 Mbps Verified',
            dailyBudget: '$55 / day',
            crowdLevel: 'Hidden Gem',
            vibeScore: 99,
            likes: 1,
            saves: 1,
            clones: 1,
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=85',
            story: newStory.trim() || 'Captured this live sensory travel moment to share with the global nomad community.',
            blueprintSteps: [
                'Morning — Deep Work & Local Specialty Coffee',
                'Afternoon — Hidden Trail & Cultural Immersion',
                'Sunset — Panoramic Golden Hour & Soundscape'
            ]
        };

        setVibes([created, ...vibes]);
        setNewTitle('');
        setNewLocation('');
        setNewSoundscape('');
        setNewStory('');
        setIsCreateModalOpen(false);
        addToast('Your Live Travel Vibe is now broadcasting! 🌊✨', 'success');
    };

    return (
        <div className="vibes-studio-page">
            {/* 1. Top Hero Header */}
            <header className="vibes-hero-header">
                <div className="vibes-brand-block">
                    <div className="vibes-badge-pill">
                        <Sparkles size={13} />
                        <span>SEENOMAD VIBES™ · SENSORY TRAVEL TELEPORTATION</span>
                    </div>
                    <h1>Travel Vibes</h1>
                    <p>
                        Experience real-time destination atmospheres, 432Hz ambient field soundscapes, live nomad telemetry, and clone any vibe directly into your itinerary.
                    </p>
                </div>

                <div className="vibes-header-actions">
                    <div className="vibes-layout-toggle" role="group" aria-label="View mode">
                        <button
                            type="button"
                            className={`vibes-layout-btn ${viewLayout === 'deck' ? 'active' : ''}`}
                            onClick={() => setViewLayout('deck')}
                        >
                            <Layers size={15} />
                            <span>Sensory Grid</span>
                        </button>
                        <button
                            type="button"
                            className={`vibes-layout-btn ${viewLayout === 'focus' ? 'active' : ''}`}
                            onClick={() => setViewLayout('focus')}
                        >
                            <Eye size={15} />
                            <span>Cinema Stream</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="vibes-drop-btn"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus size={16} />
                        <span>Broadcast a Vibe</span>
                    </button>
                </div>
            </header>

            {/* 2. Mood Frequency Filter Bar */}
            <div className="vibes-mood-bar">
                <div className="vibes-mood-scroll">
                    {MOOD_FREQUENCIES.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            className={`vibes-mood-chip ${activeMood === m.id ? 'active' : ''}`}
                            onClick={() => setActiveMood(m.id)}
                        >
                            <span className="vibes-mood-emoji">{m.emoji}</span>
                            <span>{m.label}</span>
                        </button>
                    ))}
                </div>

                <div className="vibes-live-counter">
                    <span className="vibes-pulse-dot" />
                    <span>{filteredVibes.length} Live Sensory Capsules</span>
                </div>
            </div>

            {/* 3. Vibes Interactive Cards Grid / Stream */}
            <div className={`vibes-cards-container ${viewLayout === 'focus' ? 'cinema-mode' : 'grid-mode'}`}>
                {filteredVibes.map((vibe) => {
                    const isPlayingSound = activeSoundId === vibe.id;
                    const isLiked = Boolean(likedIds[vibe.id]);
                    const isSaved = Boolean(savedIds[vibe.id]);

                    return (
                        <article key={vibe.id} className="vibe-capsule-card">
                            {/* Visual Media Stage */}
                            <div className="vibe-media-stage">
                                <img src={vibe.image} alt={vibe.title} loading="lazy" className="vibe-cover-img" />
                                <div className="vibe-media-gradient" />

                                {/* Top Telemetry Overlay */}
                                <div className="vibe-top-bar">
                                    <span className="vibe-mood-tag">{vibe.moodLabel}</span>
                                    <span className="vibe-score-pill">
                                        <Zap size={12} /> {vibe.vibeScore}% Vibe Match
                                    </span>
                                </div>

                                {/* Ambient Soundscape Interactive Equalizer Bar */}
                                <button
                                    type="button"
                                    className={`vibe-soundscape-pill ${isPlayingSound ? 'playing' : ''}`}
                                    onClick={() => setActiveSoundId(isPlayingSound ? null : vibe.id)}
                                    title="Toggle ambient destination soundscape"
                                >
                                    {isPlayingSound ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                    <span className="vibe-sound-text">{vibe.soundscape}</span>
                                    {isPlayingSound && (
                                        <span className="vibe-eq-bars" aria-hidden="true">
                                            <i />
                                            <i />
                                            <i />
                                            <i />
                                        </span>
                                    )}
                                </button>

                                {/* Location & Creator Overlay */}
                                <div className="vibe-stage-bottom">
                                    <div className="vibe-loc-line">
                                        <MapPin size={13} />
                                        <span>{vibe.location}</span>
                                        <small>{vibe.coordinates}</small>
                                    </div>
                                    <h3>{vibe.title}</h3>
                                </div>
                            </div>

                            {/* Live Nomad Sensory Telemetry Strip */}
                            <div className="vibe-telemetry-grid">
                                <div className="vibe-tel-item">
                                    <Sun size={13} />
                                    <div>
                                        <small>Atmosphere</small>
                                        <strong>{vibe.temp}</strong>
                                    </div>
                                </div>
                                <div className="vibe-tel-item">
                                    <Wifi size={13} />
                                    <div>
                                        <small>Connectivity</small>
                                        <strong>{vibe.wifiSpeed}</strong>
                                    </div>
                                </div>
                                <div className="vibe-tel-item">
                                    <DollarSign size={13} />
                                    <div>
                                        <small>Est. Daily</small>
                                        <strong>{vibe.dailyBudget}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Story & Creator Row */}
                            <div className="vibe-body-content">
                                <p className="vibe-story-text">{vibe.story}</p>

                                <div className="vibe-creator-row">
                                    <div className="vibe-creator-info">
                                        <img src={vibe.avatar} alt={vibe.creatorName} className="vibe-creator-avatar" />
                                        <div>
                                            <strong>{vibe.creatorName}</strong>
                                            <span>{vibe.creator} · {vibe.crowdLevel}</span>
                                        </div>
                                    </div>

                                    <div className="vibe-social-btns">
                                        <button
                                            type="button"
                                            className={`vibe-icon-btn ${isLiked ? 'liked' : ''}`}
                                            onClick={() => handleToggleLike(vibe.id)}
                                            aria-label="Feel this vibe"
                                        >
                                            <Heart size={15} fill={isLiked ? '#ef4444' : 'none'} />
                                            <span>{vibe.likes + (isLiked ? 1 : 0)}</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`vibe-icon-btn ${isSaved ? 'saved' : ''}`}
                                            onClick={() => handleToggleSave(vibe.id, vibe.title)}
                                            aria-label="Save vibe"
                                        >
                                            <Bookmark size={15} fill={isSaved ? '#3b82f6' : 'none'} />
                                            <span>{vibe.saves + (isSaved ? 1 : 0)}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Action Footer: Clone This Vibe Blueprint */}
                                <div className="vibe-card-footer">
                                    <button
                                        type="button"
                                        className="vibe-blueprint-btn"
                                        onClick={() => handleCloneVibeToTrip(vibe)}
                                    >
                                        <Compass size={15} />
                                        <span>Clone Vibe Day-Plan ({vibe.clones})</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="vibe-book-link"
                                        onClick={() => navigate('/explore/book-travel')}
                                    >
                                        <span>Book Route</span>
                                        <ArrowUpRight size={15} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* 4. Vibe Day-Plan Blueprint Drawer / Modal */}
            {selectedBlueprint && (
                <div className="vibe-modal-backdrop" onClick={() => setSelectedBlueprint(null)}>
                    <div className="vibe-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="vibe-modal-header">
                            <div>
                                <span className="vibe-modal-kicker">CLONED VIBE BLUEPRINT</span>
                                <h3>{selectedBlueprint.title}</h3>
                                <p>{selectedBlueprint.location} · {selectedBlueprint.coordinates}</p>
                            </div>
                            <button
                                type="button"
                                className="vibe-modal-close"
                                onClick={() => setSelectedBlueprint(null)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="vibe-blueprint-steps">
                            {selectedBlueprint.blueprintSteps.map((step, idx) => (
                                <div key={idx} className="vibe-step-row">
                                    <CheckCircle2 size={16} className="vibe-step-icon" />
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>

                        <div className="vibe-modal-actions">
                            <button
                                type="button"
                                className="vibe-modal-secondary"
                                onClick={() => setSelectedBlueprint(null)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="vibe-modal-primary"
                                onClick={() => {
                                    setSelectedBlueprint(null);
                                    navigate('/explore/trip-builder');
                                }}
                            >
                                Open in Trip Builder Studio
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. Broadcast New Vibe Modal */}
            {isCreateModalOpen && (
                <div className="vibe-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
                    <div className="vibe-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="vibe-modal-header">
                            <div>
                                <span className="vibe-modal-kicker">BROADCAST SENSORY CAPSULE</span>
                                <h3>Share a Live Travel Vibe</h3>
                            </div>
                            <button
                                type="button"
                                className="vibe-modal-close"
                                onClick={() => setIsCreateModalOpen(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form className="vibe-create-form" onSubmit={handlePublishVibe}>
                            <label>
                                <span>Vibe Title</span>
                                <input
                                    type="text"
                                    placeholder="e.g., Sunset Espresso & Ocean Swell in Oaxaca"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <span>Location & Hub</span>
                                <input
                                    type="text"
                                    placeholder="e.g., Puerto Escondido, Mexico"
                                    value={newLocation}
                                    onChange={(e) => setNewLocation(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                <span>Mood Frequency</span>
                                <select value={newMood} onChange={(e) => setNewMood(e.target.value)}>
                                    {MOOD_FREQUENCIES.filter((m) => m.id !== 'all').map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.emoji} {m.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span>Ambient Soundscape Note</span>
                                <input
                                    type="text"
                                    placeholder="e.g., Pacific Waves + Acoustic Guitar (432 Hz)"
                                    value={newSoundscape}
                                    onChange={(e) => setNewSoundscape(e.target.value)}
                                />
                            </label>
                            <label>
                                <span>Sensory Field Notes</span>
                                <textarea
                                    rows={3}
                                    placeholder="Describe the atmosphere, Wi-Fi speed, and best time to arrive..."
                                    value={newStory}
                                    onChange={(e) => setNewStory(e.target.value)}
                                />
                            </label>

                            <div className="vibe-modal-actions">
                                <button
                                    type="button"
                                    className="vibe-modal-secondary"
                                    onClick={() => setIsCreateModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="vibe-modal-primary">
                                    Broadcast Live Vibe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NomadShortsFeed;
