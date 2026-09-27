import React, { useState, useRef } from 'react';
import { 
    TrendingUp, 
    Flame, 
    UserPlus, 
    Check, 
    ChevronRight, 
    Search, 
    Radio, 
    Calendar, 
    Users, 
    CheckCircle2,
    Sparkles,
    X,
    MapPin
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useToastStore } from '../../../store/toastStore';
import AdSenseSlot from '../../../components/common/AdSenseSlot';
import GlassDivider from '../../../components/common/GlassDivider';
import '../styles/HomeRightRail.css';

const TRENDING_HASHTAGS = [
    { rank: 1, tag: '#KyotoAutumn2026', category: 'Travel · Trending in Japan', count: '14.8K posts', isHot: true },
    { rank: 2, tag: '#BaliVisaUpdates', category: 'Nomad Policy · Trending', count: '9.2K posts', isHot: true },
    { rank: 3, tag: '#StarlinkRoam', category: 'Tech & Gear', count: '7.5K posts', isHot: false },
    { rank: 4, tag: '#LisbonNomadStays', category: 'Housing & Cafes · Europe', count: '6.4K posts', isHot: true },
    { rank: 5, tag: '#StreetFoodTokyo', category: 'Culinary Travel', count: '5.1K posts', isHot: false }
];

const INITIAL_TRAVELERS = [
    {
        id: 'user-1',
        name: 'Elena Rostova',
        handle: '@elena_wander',
        role: 'Solo Explorer · 42 Countries',
        location: 'Lisbon, Portugal',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        following: false,
        verified: true
    },
    {
        id: 'user-2',
        name: 'David Chen',
        handle: '@david_nomad',
        role: 'Remote Software Lead',
        location: 'Tokyo, Japan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        following: false,
        verified: true
    },
    {
        id: 'user-3',
        name: 'Maya Lin',
        handle: '@maya_escapes',
        role: 'Travel Filmmaker & Drone Pilot',
        location: 'Bali, Indonesia',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        following: false,
        verified: false
    }
];

const HomeRightRail = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const [travelers, setTravelers] = useState(INITIAL_TRAVELERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [spaceJoined, setSpaceJoined] = useState(false);
    const searchInputRef = useRef(null);

    const toggleFollow = (id, name) => {
        setTravelers(prev => prev.map(t => {
            if (t.id === id) {
                const nextState = !t.following;
                if (nextState) {
                    addToast(`You are now following ${name}! ✈️`, 'success');
                } else {
                    addToast(`Unfollowed ${name}`, 'info');
                }
                return { ...t, following: nextState };
            }
            return t;
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
        addToast(`Searching SeeNomad for "${searchQuery.trim()}"...`, 'info');
    };

    const handleTagClick = (tag) => {
        navigate(`/explore?search=${encodeURIComponent(tag)}`);
        addToast(`Filtering feed by ${tag}...`, 'info');
    };

    const handleJoinSpace = () => {
        setSpaceJoined(!spaceJoined);
        addToast(!spaceJoined ? 'Connected to live Tokyo Nomad Audio Space! 🎙️🎧' : 'Left audio space', 'info');
    };

    return (
        <aside className="home-right-rail" aria-label="Trending & Follow Recommendations">
            {/* 1. Enhanced Search Bar with shortcut and clear trigger */}
            <form className="rail-search-form" onSubmit={handleSearchSubmit}>
                <Search size={15} className="rail-search-icon" />
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search destinations, tags, nomads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rail-search-input"
                />
                {searchQuery ? (
                    <button
                        type="button"
                        className="rail-search-clear-btn"
                        onClick={() => {
                            setSearchQuery('');
                            searchInputRef.current?.focus();
                        }}
                        aria-label="Clear search query"
                    >
                        <X size={13} />
                    </button>
                ) : (
                    <span className="rail-search-shortcut" title="Press to search">⌘K</span>
                )}
            </form>

            {/* 2. Twitter Spaces / Live Audio Lounge */}
            <div className={`rail-card live-space-card ${spaceJoined ? 'space-connected' : ''}`}>
                <div className="space-header">
                    <div className="space-live-badge">
                        <span className="space-live-dot" />
                        <Radio size={12} className="space-live-icon" />
                        <span>LIVE SPACE</span>
                    </div>
                    <div className="space-audio-bars" title="Broadcasting live">
                        <span className="audio-bar bar-1" />
                        <span className="audio-bar bar-2" />
                        <span className="audio-bar bar-3" />
                    </div>
                </div>
                <h4 className="space-title">Tokyo Remote Work: Best 1Gbps Cafes & Late Night Ramen 🍜</h4>
                <p className="space-host">Hosted by <strong>Kenji M.</strong> & <strong>Elena R.</strong></p>
                
                <div className="space-avatars-row">
                    <div className="space-avatars-stack">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Speaker Kenji" />
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Speaker Elena" />
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Speaker Maya" />
                        <span className="space-listener-pill">24 listening</span>
                    </div>
                    <button 
                        type="button" 
                        className={`space-join-btn ${spaceJoined ? 'active' : ''}`}
                        onClick={handleJoinSpace}
                    >
                        {spaceJoined ? 'Listening 🎧' : 'Tune In 🎙️'}
                    </button>
                </div>
            </div>

            {/* Subtle Glassmorphic Section Divider */}
            <GlassDivider id="divider-rail-space-trending" spacing="sm" />

            {/* 3. Twitter "What's Happening" / Trends for You */}
            <div className="rail-card trending-card">
                <div className="rail-card-header">
                    <div className="rail-title-group">
                        <TrendingUp size={17} className="trending-icon-orange" />
                        <h3 className="rail-title">Trends for Nomads</h3>
                    </div>
                    <span className="rail-badge-live">Live</span>
                </div>

                <div className="trending-list">
                    {TRENDING_HASHTAGS.map((item) => (
                        <div
                            key={item.rank}
                            className="trending-item"
                            onClick={() => handleTagClick(item.tag)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="trending-rank-num">{item.rank}</div>
                            <div className="trending-item-content">
                                <span className="trending-category">{item.category}</span>
                                <div className="trending-tag-line">
                                    <span className="hashtag-name">{item.tag}</span>
                                    {item.isHot && <Flame size={12} className="flame-icon text-orange-500" />}
                                </div>
                                <span className="hashtag-count">{item.count}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rail-card-footer">
                    <button
                        type="button"
                        className="see-all-link"
                        onClick={() => navigate('/popular')}
                    >
                        Show more trends →
                    </button>
                </div>
            </div>

            {/* Subtle Glassmorphic Section Divider */}
            <GlassDivider id="divider-rail-trending-follow" spacing="sm" />

            {/* 4. Nomads to Follow */}
            <div className="rail-card follow-card">
                <div className="rail-card-header">
                    <div className="rail-title-group">
                        <Users size={16} className="text-sky-500" />
                        <h3 className="rail-title">Nomads to Follow</h3>
                    </div>
                </div>

                <div className="travelers-list">
                    {travelers.map(user => (
                        <div key={user.id} className="traveler-item">
                            <div className="traveler-avatar-wrapper">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="traveler-avatar"
                                />
                                {user.verified && (
                                    <CheckCircle2 size={13} className="avatar-verified-badge" />
                                )}
                            </div>
                            <div className="traveler-info">
                                <div className="traveler-name-line">
                                    <span className="traveler-name">{user.name}</span>
                                </div>
                                <span className="traveler-meta">{user.handle}</span>
                                <div className="traveler-location-chip">
                                    <MapPin size={10} />
                                    <span>{user.location}</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`follow-btn ${user.following ? 'following' : ''}`}
                                onClick={() => toggleFollow(user.id, user.name)}
                                aria-label={user.following ? `Unfollow ${user.name}` : `Follow ${user.name}`}
                            >
                                {user.following ? (
                                    <>
                                        <Check size={12} />
                                        <span>Following</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Follow</span>
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Google AdSense Display Unit */}
            <div className="right-rail-ad-box">
                <AdSenseSlot format="rectangle" label="Sponsored Partner" />
            </div>

            {/* Micro Policy Footer for AdSense Compliance */}
            <div className="right-rail-policy-links">
                <div className="policy-link-row">
                    <Link to="/legal?tab=privacy">Privacy</Link>
                    <span>·</span>
                    <Link to="/legal?tab=tos">Terms</Link>
                    <span>·</span>
                    <Link to="/legal?tab=cookies">Cookies</Link>
                    <span>·</span>
                    <Link to="/legal?tab=adsense">Ad Choices</Link>
                    <span>·</span>
                    <Link to="/about">About</Link>
                </div>
                <p className="rail-copyright">© 2026 SeeNomad. AdSense Compliant.</p>
            </div>
        </aside>
    );
};

export default HomeRightRail;

