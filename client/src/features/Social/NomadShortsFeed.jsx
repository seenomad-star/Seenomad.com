import React, { useState, useMemo, useRef } from 'react';
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
    DollarSign,
    ArrowUpRight,
    CheckCircle2,
    Eye,
    Layers,
    Play,
    Pause,
    X,
    Upload,
    Video,
    Image as ImageIcon,
    Send,
    UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../../store/toastStore';
import { useSavedVibesStore } from '../../store/savedVibesStore';
import NewVibeModal from './NewVibeModal';
import '../../styles/NomadShorts.css';

const VIBE_CATEGORIES = [
    { id: 'all', label: 'All Vibes', emoji: '✨' },
    { id: 'popular', label: 'Popular', emoji: '🌟' },
    { id: 'trending', label: 'Trending', emoji: '🔥' },
    { id: 'nature', label: 'Nature', emoji: '🌿' },
    { id: 'city-life', label: 'City Life', emoji: '🏙️' },
    { id: 'food', label: 'Food', emoji: '🍜' },
    { id: 'coastal', label: 'Coastal & Surf', emoji: '🌊' },
    { id: 'deep-work', label: 'Deep Work & Cafe', emoji: '☕' }
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
        mood: 'coastal',
        categories: ['popular', 'trending', 'coastal', 'nature'],
        moodLabel: 'Coastal & Surf',
        soundscape: 'Indian Ocean Swell + Vinyl Chillhop (432 Hz)',
        temp: '28°C · Warm Breeze',
        wifiSpeed: '295 Mbps Starlink',
        dailyBudget: '$48 / day',
        crowdLevel: 'Peaceful (24% capacity)',
        vibeScore: 98,
        likes: 1420,
        commentsCount: 84,
        sharesCount: 318,
        saves: 640,
        clones: 312,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1090-large.mp4',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85',
        story: 'Working from Single Fin terrace right as the tide drops. Fiber is rock solid and the sunset horizon turns electric violet at 6:14 PM.',
        comments: [
            { id: 'c1', user: '@MarcoPolos', text: 'Was just at Single Fin yesterday! Best sunset view in Bali 🔥', time: '14m ago' },
            { id: 'c2', user: '@NomadNina', text: 'Cloning this day-plan for my Uluwatu sprint next week!', time: '1h ago' }
        ],
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
        mood: 'nature',
        categories: ['popular', 'nature', 'deep-work'],
        moodLabel: 'Nature',
        soundscape: 'Soft Cedar Rain + Koto Ambient Resonance',
        temp: '19°C · Crisp Mist',
        wifiSpeed: '610 Mbps Optical Fiber',
        dailyBudget: '$65 / day',
        crowdLevel: 'Ultra Quiet (Early Morning)',
        vibeScore: 99,
        likes: 2190,
        commentsCount: 142,
        sharesCount: 510,
        saves: 1120,
        clones: 485,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-travel-vlog-walking-in-a-forest-42991-large.mp4',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=85',
        story: '6:00 AM walk through Arashiyama before a single tourist arrives, followed by a 4-hour coding block in a 100-year-old machiya townhouse.',
        comments: [
            { id: 'c3', user: '@SarahExplores', text: 'Weekenders Roastery has the cleanest pour-over in Kyoto 🍵', time: '28m ago' }
        ],
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
        mood: 'nature',
        categories: ['trending', 'nature', 'coastal'],
        moodLabel: 'Nature',
        soundscape: 'Glacial Fjord Water + Nordic Cello Drone',
        temp: '11°C · Pure Arctic Air',
        wifiSpeed: '380 Mbps 5G / Fiber',
        dailyBudget: '$115 / day',
        crowdLevel: 'Remote Sanctuary',
        vibeScore: 97,
        likes: 1850,
        commentsCount: 96,
        sharesCount: 402,
        saves: 890,
        clones: 274,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
        image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&auto=format&fit=crop&q=85',
        story: '24 hours of golden daylight over granite peaks. We set up our remote studio inside a red rorbuer fisherman cabin right over the water.',
        comments: [
            { id: 'c4', user: '@NordicDev', text: 'Nothing beats coding under the midnight sun in Reine!', time: '2h ago' }
        ],
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
        mood: 'city-life',
        categories: ['popular', 'city-life', 'deep-work'],
        moodLabel: 'City Life',
        soundscape: 'Vintage Tram 28 Bell + Acoustic Fado Guitar',
        temp: '24°C · Atlantic Sun',
        wifiSpeed: '420 Mbps Fiber',
        dailyBudget: '$72 / day',
        crowdLevel: 'Vibrant Social Pulse',
        vibeScore: 96,
        likes: 1640,
        commentsCount: 73,
        sharesCount: 289,
        saves: 730,
        clones: 390,
        mediaType: 'image',
        image: 'https://images.unsplash.com/photo-1513735492246-483525079686?w=1200&auto=format&fit=crop&q=85',
        story: 'Terracotta rooftops glowing over the Tagus River while founders and creators gather at Miradouro da Graça after wrapping up product sprints.',
        comments: [],
        blueprintSteps: [
            '09:30 AM — Coworking & Pastel de Nata at Copenhagen Coffee Lab',
            '05:30 PM — Tram 28 Climb & Sunset Sketching at Miradouro',
            '08:30 PM — Intimate Fado Dinner & Natural Wine in Alfama alleys'
        ]
    },
    {
        id: 'vibe-5',
        title: 'Seoul Gwangjang Night Market & Sizzling Street Food',
        creator: '@MayaLin',
        creatorName: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        location: 'Jongno & Hongdae, Seoul · South Korea',
        coordinates: '37.5700° N, 126.9996° E',
        mood: 'food',
        categories: ['popular', 'trending', 'food', 'city-life'],
        moodLabel: 'Food',
        soundscape: 'Sizzling Mung Bean Pancakes + Night Market Chatter',
        temp: '21°C · Electric Night',
        wifiSpeed: '850 Mbps Gigabit',
        dailyBudget: '$68 / day',
        crowdLevel: 'High Energy',
        vibeScore: 99,
        likes: 2890,
        commentsCount: 214,
        sharesCount: 720,
        saves: 1490,
        clones: 560,
        mediaType: 'video',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-street-food-market-in-seoul-42993-large.mp4',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=85',
        story: 'Hand-cut knife noodles, crispy bindaetteok, and neon alley energy in Seoul after a late-night design sprint.',
        comments: [
            { id: 'c5', user: '@FoodieNomad', text: 'Gwangjang market stalls at 9 PM are unbeatable! 🥟🍜', time: '9m ago' }
        ],
        blueprintSteps: [
            '02:00 PM — Product Sprint at Anthracite Coffee Roasters Hapjeong',
            '07:30 PM — Gwangjang Market Street Food Tour (Bindaetteok & Mayak Gimbap)',
            '10:00 PM — Han River Night Walk & Convenience Store Ramyun'
        ]
    },
    {
        id: 'vibe-6',
        title: 'Oaxaca Wood-Fired Mole, Mezcal & Rooftop Sunset',
        creator: '@MateoCruz',
        creatorName: 'Mateo Cruz',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
        location: 'Centro Histórico, Oaxaca · Mexico',
        coordinates: '17.0732° N, 96.7266° W',
        mood: 'food',
        categories: ['trending', 'food', 'city-life'],
        moodLabel: 'Food',
        soundscape: 'Clay Comal Crackle + Marimba Courtyard Echo',
        temp: '26°C · Golden Dusk',
        wifiSpeed: '240 Mbps Fiber',
        dailyBudget: '$52 / day',
        crowdLevel: 'Warm & Festive',
        vibeScore: 97,
        likes: 1760,
        commentsCount: 92,
        sharesCount: 340,
        saves: 810,
        clones: 295,
        mediaType: 'image',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&auto=format&fit=crop&q=85',
        story: 'Tasting 7-ingredient heirloom mole negro and smoky tlayudas at Mercado 20 de Noviembre before rooftop mezcal.',
        comments: [],
        blueprintSteps: [
            '10:00 AM — Café Brújula Cold Brew & Coworking in Santo Domingo',
            '02:30 PM — Smoke Alley Tlayudas & Mole Tasting at Mercado 20 de Noviembre',
            '06:30 PM — Artisanal Mezcaleria Tasting & Rooftop Sunset'
        ]
    }
];

const NomadShortsFeed = ({ embedded = false }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const fileInputRef = useRef(null);

    const [vibes, setVibes] = useState(INITIAL_VIBES);
    const [activeMood, setActiveMood] = useState('all');
    const [viewLayout, setViewLayout] = useState(embedded ? 'scroll' : 'scroll'); // 'scroll' (vertical short-form feed) | 'deck' (3-col sensory grid)
    const [activeSoundId, setActiveSoundId] = useState('vibe-1');
    const [likedIds, setLikedIds] = useState({});
    const { savedVibes, toggleSaveVibe } = useSavedVibesStore();
    const savedIds = useMemo(() => {
        const map = {};
        savedVibes.forEach((v) => {
            map[v.id] = true;
        });
        return map;
    }, [savedVibes]);
    const [followedCreators, setFollowedCreators] = useState({});
    const [selectedBlueprint, setSelectedBlueprint] = useState(null);
    const [activeCommentVibe, setActiveCommentVibe] = useState(null);
    const [commentDraft, setCommentDraft] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // New Vibe Form State (Supports video/photo upload or URL)
    const [newTitle, setNewTitle] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newMood, setNewMood] = useState('nature');
    const [newSoundscape, setNewSoundscape] = useState('');
    const [newStory, setNewStory] = useState('');
    const [newMediaUrl, setNewMediaUrl] = useState('');
    const [newMediaType, setNewMediaType] = useState('video');
    const [uploadedFileName, setUploadedFileName] = useState('');

    const filteredVibes = useMemo(() => {
        if (activeMood === 'all') return vibes;
        if (activeMood === 'popular') {
            return [...vibes]
                .filter((v) => v.categories?.includes('popular') || v.likes >= 1600)
                .sort((a, b) => b.likes - a.likes);
        }
        if (activeMood === 'trending') {
            return [...vibes]
                .filter((v) => v.categories?.includes('trending') || v.vibeScore >= 97)
                .sort((a, b) => b.vibeScore - a.vibeScore);
        }
        return vibes.filter(
            (v) => v.mood === activeMood || (Array.isArray(v.categories) && v.categories.includes(activeMood))
        );
    }, [vibes, activeMood]);

    const getCategoryCount = (catId) => {
        if (catId === 'all') return vibes.length;
        if (catId === 'popular') {
            return vibes.filter((v) => v.categories?.includes('popular') || v.likes >= 1600).length;
        }
        if (catId === 'trending') {
            return vibes.filter((v) => v.categories?.includes('trending') || v.vibeScore >= 97).length;
        }
        return vibes.filter(
            (v) => v.mood === catId || (Array.isArray(v.categories) && v.categories.includes(catId))
        ).length;
    };

    const handleToggleLike = (id) => {
        setLikedIds((prev) => {
            const next = !prev[id];
            if (next) addToast('Liked Travel Vibe! ❤️', 'success');
            return { ...prev, [id]: next };
        });
    };

    const handleToggleSave = (vibe) => {
        if (!vibe) return;
        toggleSaveVibe(vibe);
    };

    const handleShareVibe = (vibe) => {
        setVibes((prev) =>
            prev.map((v) => (v.id === vibe.id ? { ...v, sharesCount: (v.sharesCount || 0) + 1 } : v))
        );
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
        }
        addToast(`Share link for "${vibe.title}" copied to clipboard! 🔗`, 'success');
    };

    const handleFollowCreator = (creatorHandle) => {
        setFollowedCreators((prev) => {
            const next = !prev[creatorHandle];
            addToast(next ? `Following ${creatorHandle}! ✨` : `Unfollowed ${creatorHandle}`, 'info');
            return { ...prev, [creatorHandle]: next };
        });
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!commentDraft.trim() || !activeCommentVibe) return;

        const newCommentObj = {
            id: `c-${Date.now()}`,
            user: '@AlexRivera',
            text: commentDraft.trim(),
            time: 'Just now'
        };

        setVibes((prev) =>
            prev.map((v) =>
                v.id === activeCommentVibe.id
                    ? {
                          ...v,
                          commentsCount: (v.commentsCount || 0) + 1,
                          comments: [newCommentObj, ...(v.comments || [])]
                      }
                    : v
            )
        );
        setActiveCommentVibe((prev) => ({
            ...prev,
            commentsCount: (prev.commentsCount || 0) + 1,
            comments: [newCommentObj, ...(prev.comments || [])]
        }));
        setCommentDraft('');
        addToast('Comment posted to Vibe! 💬', 'success');
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        const isVideo = file.type.startsWith('video/');
        setNewMediaType(isVideo ? 'video' : 'image');
        setNewMediaUrl(objectUrl);
        setUploadedFileName(file.name);
        addToast(`Attached ${isVideo ? 'short video' : 'photo'}: ${file.name}`, 'info');
    };

    const handleCloneVibeToTrip = (vibe) => {
        addToast(
            `Cloned "${vibe.location}" sensory blueprint into your Trip Builder! 🧭`,
            'success'
        );
        setSelectedBlueprint(vibe);
    };

    const handlePublishNewVibe = (payload) => {
        const moodObj = VIBE_CATEGORIES.find((m) => m.id === payload.mood) || VIBE_CATEGORIES[3];

        const created = {
            id: `vibe-${Date.now()}`,
            title: payload.title,
            creator: '@AlexRivera',
            creatorName: 'Alex Rivera',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
            location: payload.primaryLocation,
            locationTags: payload.locationTags || [payload.primaryLocation],
            coordinates: payload.coordinates || 'Live GPS Verified',
            mood: payload.mood,
            categories: ['popular', 'trending', payload.mood],
            moodLabel: moodObj.label,
            soundscape: payload.soundscape,
            temp: '25°C · Ideal Weather',
            wifiSpeed: '320 Mbps Verified',
            dailyBudget: '$55 / day',
            crowdLevel: 'Hidden Gem',
            vibeScore: 99,
            likes: 1,
            commentsCount: 0,
            sharesCount: 1,
            saves: 1,
            clones: 1,
            mediaType: payload.mediaType,
            videoUrl: payload.mediaType === 'video' ? payload.mediaUrl : null,
            image: payload.posterImage,
            story: payload.story,
            copyrightTag: payload.copyrightTag || '© Original Clip',
            legalConsentVerified: true,
            comments: [],
            blueprintSteps: [
                'Morning — Deep Work & Local Specialty Coffee',
                'Afternoon — Hidden Trail & Cultural Immersion',
                'Sunset — Panoramic Golden Hour & Soundscape'
            ]
        };

        setVibes([created, ...vibes]);
        setIsCreateModalOpen(false);
        addToast('Your verified Travel Vibe is now live in the feed! 🌊✨', 'success');
    };

    return (
        <div className={`vibes-studio-page ${embedded ? 'vibes-embedded' : ''}`}>
            {/* 1. Top Hero Header */}
            <header className="vibes-hero-header">
                <div className="vibes-brand-block">
                    <div className="vibes-badge-pill">
                        <Sparkles size={13} />
                        <span>SEENOMAD VIBES™ · SHORT-FORM TRAVEL VIDEOS & SENSORY MEDIA</span>
                    </div>
                    <h1>Travel Vibes</h1>
                    <p>
                        Scroll through immersive short-form travel videos, ambient destination soundscapes, and real-time nomad telemetry — or post your own travel vibe.
                    </p>
                </div>

                <div className="vibes-header-actions">
                    <div className="vibes-layout-toggle" role="group" aria-label="View mode">
                        <button
                            type="button"
                            className={`vibes-layout-btn ${viewLayout === 'scroll' ? 'active' : ''}`}
                            onClick={() => setViewLayout('scroll')}
                        >
                            <Eye size={15} />
                            <span>Vertical Vibes Feed</span>
                        </button>
                        <button
                            type="button"
                            className={`vibes-layout-btn ${viewLayout === 'deck' ? 'active' : ''}`}
                            onClick={() => setViewLayout('deck')}
                        >
                            <Layers size={15} />
                            <span>Sensory Grid</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="vibes-drop-btn"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus size={16} />
                        <span>New Vibe</span>
                    </button>
                </div>
            </header>

            {/* 2. Top Category Filter Chips Bar (Popular, Trending, Nature, City Life, Food, etc.) */}
            <div className="vibes-mood-bar" role="tablist" aria-label="Filter Vibes by category">
                <div className="vibes-mood-scroll">
                    {VIBE_CATEGORIES.map((m) => {
                        const isActive = activeMood === m.id;
                        const count = getCategoryCount(m.id);
                        return (
                            <button
                                key={m.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`vibes-mood-chip ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveMood(m.id)}
                            >
                                <span className="vibes-mood-emoji">{m.emoji}</span>
                                <span>{m.label}</span>
                                <span className="vibes-chip-count">{count}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="vibes-live-counter">
                    <span className="vibes-pulse-dot" />
                    <span>{filteredVibes.length} Live Travel Vibes</span>
                </div>
            </div>

            {/* 3A. Scrollable Short-Form Vertical Video & Media Feed (Default) */}
            {viewLayout === 'scroll' ? (
                <div className="vibes-vertical-stream" role="feed" aria-label="Scrollable Travel Vibes Feed">
                    {filteredVibes.map((vibe) => {
                        const isPlayingSound = activeSoundId === vibe.id;
                        const isLiked = Boolean(likedIds[vibe.id]);
                        const isSaved = Boolean(savedIds[vibe.id]);
                        const isFollowing = Boolean(followedCreators[vibe.creator]);

                        return (
                            <article key={vibe.id} className="vibe-vertical-player-card">
                                {/* Video / Media Canvas */}
                                <div className="vibe-vertical-stage">
                                    {vibe.mediaType === 'video' && vibe.videoUrl ? (
                                        <video
                                            src={vibe.videoUrl}
                                            poster={vibe.image}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="vibe-vertical-video"
                                        />
                                    ) : (
                                        <img
                                            src={vibe.image}
                                            alt={vibe.title}
                                            loading="lazy"
                                            className="vibe-vertical-video"
                                        />
                                    )}
                                    <div className="vibe-vertical-scrim" />

                                    {/* Top Floating Badges */}
                                    <div className="vibe-vertical-top">
                                        <div className="vibe-top-left-pills">
                                            <span className="vibe-mood-tag">{vibe.moodLabel}</span>
                                            <span className="vibe-score-pill">
                                                <Zap size={12} /> {vibe.vibeScore}% Vibe Match
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className={`vibe-sound-toggle-btn ${isPlayingSound ? 'playing' : ''}`}
                                            onClick={() => setActiveSoundId(isPlayingSound ? null : vibe.id)}
                                            aria-label="Toggle ambient soundscape"
                                        >
                                            {isPlayingSound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                            <span>{isPlayingSound ? '432Hz On' : 'Muted'}</span>
                                        </button>
                                    </div>

                                    {/* Right-Side Floating Engagement Rail (Likes, Comments, Save, Share, Clone) */}
                                    <aside className="vibe-engagement-rail" aria-label="Vibe engagement actions">
                                        <button
                                            type="button"
                                            className={`vibe-rail-btn ${isLiked ? 'liked' : ''}`}
                                            onClick={() => handleToggleLike(vibe.id)}
                                            aria-label="Like vibe"
                                        >
                                            <span className="vibe-rail-icon">
                                                <Heart size={24} fill={isLiked ? '#ef4444' : 'none'} />
                                            </span>
                                            <span className="vibe-rail-count">{vibe.likes + (isLiked ? 1 : 0)}</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="vibe-rail-btn"
                                            onClick={() => setActiveCommentVibe(vibe)}
                                            aria-label="Comment on vibe"
                                        >
                                            <span className="vibe-rail-icon">
                                                <MessageCircle size={24} />
                                            </span>
                                            <span className="vibe-rail-count">{vibe.commentsCount || 0}</span>
                                        </button>

                                        <button
                                            type="button"
                                            className={`vibe-rail-btn ${isSaved ? 'saved' : ''}`}
                                            onClick={() => handleToggleSave(vibe)}
                                            aria-label="Save vibe"
                                        >
                                            <span className="vibe-rail-icon">
                                                <Bookmark size={24} fill={isSaved ? '#38bdf8' : 'none'} />
                                            </span>
                                            <span className="vibe-rail-count">{vibe.saves + (isSaved ? 1 : 0)}</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="vibe-rail-btn"
                                            onClick={() => handleShareVibe(vibe)}
                                            aria-label="Share vibe"
                                        >
                                            <span className="vibe-rail-icon">
                                                <Share2 size={24} />
                                            </span>
                                            <span className="vibe-rail-count">{vibe.sharesCount || 0}</span>
                                        </button>

                                        <button
                                            type="button"
                                            className="vibe-rail-btn clone-rail-btn"
                                            onClick={() => handleCloneVibeToTrip(vibe)}
                                            aria-label="Clone itinerary from vibe"
                                            title="Clone Vibe Day-Plan"
                                        >
                                            <span className="vibe-rail-icon">
                                                <Compass size={22} />
                                            </span>
                                            <span className="vibe-rail-count">Clone</span>
                                        </button>
                                    </aside>

                                    {/* Bottom Creator, Caption, Telemetry & CTA Overlay */}
                                    <div className="vibe-vertical-bottom">
                                        <div className="vibe-creator-pill-row">
                                            <img
                                                src={vibe.avatar}
                                                alt={vibe.creatorName}
                                                className="vibe-vertical-avatar"
                                            />
                                            <div className="vibe-creator-meta">
                                                <strong>{vibe.creatorName}</strong>
                                                <span>{vibe.creator}</span>
                                            </div>
                                            <button
                                                type="button"
                                                className={`vibe-follow-chip ${isFollowing ? 'following' : ''}`}
                                                onClick={() => handleFollowCreator(vibe.creator)}
                                            >
                                                <UserPlus size={12} />
                                                <span>{isFollowing ? 'Following' : 'Follow'}</span>
                                            </button>
                                        </div>

                                        <div className="vibe-loc-line">
                                            <MapPin size={13} />
                                            <span>{vibe.location}</span>
                                            <small>· {vibe.coordinates}</small>
                                        </div>

                                        {/* Location & Copyright Consent Tags */}
                                        <div className="vibe-legal-loc-tags-row">
                                            {(vibe.locationTags || [vibe.location]).slice(0, 3).map((locTag) => (
                                                <span key={locTag} className="vibe-mini-loc-pill">
                                                    <MapPin size={11} /> {locTag}
                                                </span>
                                            ))}
                                            <span className="vibe-copyright-pill">
                                                <CheckCircle2 size={11} /> {vibe.copyrightTag || '© Original Clip · Rights Verified'}
                                            </span>
                                        </div>

                                        <h3 className="vibe-vertical-title">{vibe.title}</h3>
                                        <p className="vibe-vertical-desc">{vibe.story}</p>

                                        {/* Ambient Sound Ticker */}
                                        <div className="vibe-audio-ticker">
                                            <Volume2 size={13} />
                                            <span>{vibe.soundscape}</span>
                                        </div>

                                        {/* Live Nomad Telemetry Badges */}
                                        <div className="vibe-inline-telemetry">
                                            <span><Sun size={12} /> {vibe.temp}</span>
                                            <span><Wifi size={12} /> {vibe.wifiSpeed}</span>
                                            <span><DollarSign size={12} /> {vibe.dailyBudget}</span>
                                        </div>

                                        <div className="vibe-bottom-cta-row">
                                            <button
                                                type="button"
                                                className="vibe-clone-primary-btn"
                                                onClick={() => handleCloneVibeToTrip(vibe)}
                                            >
                                                <Compass size={15} />
                                                <span>Clone Vibe Day-Plan ({vibe.clones})</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="vibe-book-route-btn"
                                                onClick={() => navigate('/explore/book-travel')}
                                            >
                                                <span>Book Route</span>
                                                <ArrowUpRight size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                /* 3B. 3-Column Sensory Grid View */
                <div className="vibes-cards-container grid-mode">
                    {filteredVibes.map((vibe) => {
                        const isPlayingSound = activeSoundId === vibe.id;
                        const isLiked = Boolean(likedIds[vibe.id]);
                        const isSaved = Boolean(savedIds[vibe.id]);

                        return (
                            <article key={vibe.id} className="vibe-capsule-card">
                                <div className="vibe-media-stage">
                                    {vibe.mediaType === 'video' && vibe.videoUrl ? (
                                        <video
                                            src={vibe.videoUrl}
                                            poster={vibe.image}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="vibe-cover-img"
                                        />
                                    ) : (
                                        <img src={vibe.image} alt={vibe.title} loading="lazy" className="vibe-cover-img" />
                                    )}
                                    <div className="vibe-media-gradient" />

                                    <div className="vibe-top-bar">
                                        <span className="vibe-mood-tag">{vibe.moodLabel}</span>
                                        <span className="vibe-score-pill">
                                            <Zap size={12} /> {vibe.vibeScore}% Vibe Match
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className={`vibe-soundscape-pill ${isPlayingSound ? 'playing' : ''}`}
                                        onClick={() => setActiveSoundId(isPlayingSound ? null : vibe.id)}
                                    >
                                        {isPlayingSound ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                        <span className="vibe-sound-text">{vibe.soundscape}</span>
                                    </button>

                                    <div className="vibe-stage-bottom">
                                        <div className="vibe-loc-line">
                                            <MapPin size={13} />
                                            <span>{vibe.location}</span>
                                        </div>
                                        <h3>{vibe.title}</h3>
                                    </div>
                                </div>

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

                                <div className="vibe-body-content">
                                    <p className="vibe-story-text">{vibe.story}</p>

                                    <div className="vibe-creator-row">
                                        <div className="vibe-creator-info">
                                            <img src={vibe.avatar} alt={vibe.creatorName} className="vibe-creator-avatar" />
                                            <div>
                                                <strong>{vibe.creatorName}</strong>
                                                <span>{vibe.creator}</span>
                                            </div>
                                        </div>

                                        <div className="vibe-social-btns">
                                            <button
                                                type="button"
                                                className={`vibe-icon-btn ${isLiked ? 'liked' : ''}`}
                                                onClick={() => handleToggleLike(vibe.id)}
                                                aria-label="Like vibe"
                                            >
                                                <Heart size={15} fill={isLiked ? '#ef4444' : 'none'} />
                                                <span>{vibe.likes + (isLiked ? 1 : 0)}</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="vibe-icon-btn"
                                                onClick={() => handleShareVibe(vibe)}
                                                aria-label="Share vibe"
                                            >
                                                <Share2 size={15} />
                                                <span>{vibe.sharesCount || 0}</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={`vibe-icon-btn ${isSaved ? 'saved' : ''}`}
                                                onClick={() => handleToggleSave(vibe)}
                                                aria-label="Save vibe"
                                            >
                                                <Bookmark size={15} fill={isSaved ? '#3b82f6' : 'none'} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="vibe-card-footer">
                                        <button
                                            type="button"
                                            className="vibe-blueprint-btn"
                                            onClick={() => handleCloneVibeToTrip(vibe)}
                                        >
                                            <Compass size={15} />
                                            <span>Clone Vibe ({vibe.clones})</span>
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
            )}

            {/* 4. Comments Drawer Modal */}
            {activeCommentVibe && (
                <div className="vibe-modal-backdrop" onClick={() => setActiveCommentVibe(null)}>
                    <div className="vibe-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="vibe-modal-header">
                            <div>
                                <span className="vibe-modal-kicker">COMMUNITY DISPATCH NOTES</span>
                                <h3>{activeCommentVibe.title}</h3>
                                <p>{activeCommentVibe.commentsCount || 0} traveler notes</p>
                            </div>
                            <button
                                type="button"
                                className="vibe-modal-close"
                                onClick={() => setActiveCommentVibe(null)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="vibe-comments-list">
                            {(activeCommentVibe.comments || []).length > 0 ? (
                                activeCommentVibe.comments.map((c) => (
                                    <div key={c.id} className="vibe-comment-item">
                                        <div className="vibe-comment-top">
                                            <strong>{c.user}</strong>
                                            <span>{c.time}</span>
                                        </div>
                                        <p>{c.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="vibe-empty-comments">No notes yet — drop the first travel tip!</p>
                            )}
                        </div>

                        <form className="vibe-comment-form" onSubmit={handleAddComment}>
                            <input
                                type="text"
                                placeholder="Ask about Wi-Fi, visa, or best time to visit..."
                                value={commentDraft}
                                onChange={(e) => setCommentDraft(e.target.value)}
                            />
                            <button type="submit" className="vibe-modal-primary">
                                <Send size={15} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* 5. Vibe Day-Plan Blueprint Drawer / Modal */}
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

            {/* 6. New Vibe Modal Overlay (Record / Select Clips, Location Tags, Copyright & Legal Consent) */}
            <NewVibeModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onPublish={handlePublishNewVibe}
                categories={VIBE_CATEGORIES}
            />
        </div>
    );
};

export default NomadShortsFeed;
