import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UserCheck, Mail, ExternalLink, Globe, Award, Star,
    Briefcase, MapPin, Bookmark, Trash2, Compass, Film, Sparkles,
    Flame, Zap, Shield, ShieldCheck, Edit3, Share2, Check, Plus, Laptop,
    Camera, Wifi, DollarSign, Heart, ChevronRight, Calendar, User,
    FileText, Coffee, Activity, Download, X, QrCode, Copy, CheckCircle,
    MessageSquare
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useSavedStore } from '../../../store/savedStore';
import { useSavedVibesStore } from '../../../store/savedVibesStore';
import { useToastStore } from '../../../store/toastStore';
import { useUserProfileStore } from '../../../store/userProfileStore';
import { useNomadReputationStore } from '../../../store/nomadReputationStore';
import { useNomadActivityStore } from '../../../store/nomadActivityStore';
import { useNomadByteStore } from '../../../store/nomadByteStore';
import EditProfileModal from './EditProfileModal';
import NomadPassportStamps from './NomadPassportStamps';
import NomadRetentionQuests from './NomadRetentionQuests';
import NomadReputationBadges, { renderBadgeIcon } from './NomadReputationBadges';
import NomadActivityFeed from './NomadActivityFeed';
import NomadBytesFeed from '../../Bytes/NomadBytesFeed';
import SavedVibesVault from './SavedVibesVault';
import ProfileBottomBar from './ProfileBottomBar';
import ProfileEndFootbar from './ProfileEndFootbar';
import CoverBannerSection from './CoverBannerSection';
import CoverBannerCustomizerModal from './CoverBannerCustomizerModal';
import './NomadProfile.css';
import '../styles/Professional.css';

const DEFAULT_PROFILE = {
    name: 'Alex Rivera',
    title: 'Senior Full Stack Developer & Digital Nomad',
    bio: 'Building web applications across European & Asian coworking spaces. Street photographer, specialty coffee enthusiast, and slow traveler since 2021.',
    location: 'Lisbon, Portugal',
    statusKey: 'available_meet',
    statusMessage: '☕ Open for Local Nomad Meetups & Coffee',
    statusColor: '#38bdf8',
    website: 'https://alexrivera.dev',
    twitter: '@alexriveranomad',
    github: 'alexrivera-nomad',
    coverUrl: 'https://images.unsplash.com/photo-1585211756843-dc3828965111?w=1600&auto=format&fit=crop&q=80',
    coverGradientId: 'nomad-sunset',
    coverOpacity: 55,
    coverHeight: 'standard',
    coverPosition: '35%',
    coverTag: 'Lisbon Sunset · Portugal',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    citizenshipId: 'ND-8842-X7',
    memberSince: 'March 2023',
    stats: {
        countriesVisited: 18,
        citiesLived: 24,
        passportStamps: 14,
        communityRank: 'Top 5% Explorer'
    }
};

const INITIAL_TIMELINE_BASES = [
    {
        id: 'base-1',
        city: 'Lisbon, Portugal',
        period: 'Jan 2026 – Present (3 mos)',
        role: 'Remote Lead Architect @ CloudScale',
        badge: 'Current Base',
        highlight: 'Working from Cowork Central and mentoring local devs at LX Factory',
        wifiSpeed: '68 Mbps',
        monthlyCost: '$2,100'
    },
    {
        id: 'base-2',
        city: 'New Delhi, India',
        period: 'Nov 2025 – Dec 2025 (1.5 mos)',
        role: 'Technical Consultant & Travel Writer',
        badge: 'Completed',
        highlight: 'Explored Delhi historical corridor, fiber coworking in Hauz Khas & Aerocity tech hub',
        wifiSpeed: '95 Mbps',
        monthlyCost: '$1,350'
    },
    {
        id: 'base-3',
        city: 'Tokyo, Japan',
        period: 'Aug 2025 – Oct 2025 (2 mos)',
        role: 'Freelance AI Solutions Consultant',
        badge: 'Completed',
        highlight: 'Fast fiber Shinkansen trips, Shibuya tech meetups, and local street photo series',
        wifiSpeed: '120 Mbps',
        monthlyCost: '$2,800'
    },
    {
        id: 'base-4',
        city: 'Canggu, Bali, Indonesia',
        period: 'Feb 2025 – July 2025 (5 mos)',
        role: 'Senior Full Stack Engineer (Remote)',
        badge: 'Completed',
        highlight: 'Surf mornings at Echo Beach, product architecture sprints from bamboo hubs',
        wifiSpeed: '55 Mbps',
        monthlyCost: '$1,500'
    },
    {
        id: 'base-5',
        city: 'Medellin, Colombia',
        period: 'Sep 2024 – Jan 2025 (4 mos)',
        role: 'Contract Software Engineer',
        badge: 'Completed',
        highlight: 'El Poblado rooftop workspaces, community salsa nights, and Paisa coffee tours',
        wifiSpeed: '75 Mbps',
        monthlyCost: '$1,400'
    }
];

const NomadProfile = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const urlTab = searchParams.get('tab') || 'overview';
    const [activeProfileTab, setActiveProfileTab] = useState(urlTab);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isLogTripModalOpen, setIsLogTripModalOpen] = useState(false);
    const [savedFilter, setSavedFilter] = useState('all');
    const [newSkillInput, setNewSkillInput] = useState('');
    const [isAddingSkill, setIsAddingSkill] = useState(false);

    // Profile state with localStorage persistence
    const [profile, setProfile] = useState(() => {
        try {
            const saved = localStorage.getItem('seenomad_user_profile');
            return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
        } catch {
            return DEFAULT_PROFILE;
        }
    });

    // Timeline travel bases with localStorage persistence
    const [timelineBases, setTimelineBases] = useState(() => {
        try {
            const saved = localStorage.getItem('seenomad_timeline_bases');
            return saved ? JSON.parse(saved) : INITIAL_TIMELINE_BASES;
        } catch {
            return INITIAL_TIMELINE_BASES;
        }
    });

    // Form state for logging a new trip
    const [newTripData, setNewTripData] = useState({
        city: '',
        period: '',
        role: 'Full Stack Engineer (Remote)',
        badge: 'Completed',
        highlight: '',
        wifiSpeed: '75 Mbps',
        monthlyCost: '$1,800'
    });

    const { 
        xp = 3450, 
        level = 12, 
        xpToNextLevel = 5000, 
        dailyStreak = 14, 
        userSkills = {}, 
        endorseSkill,
        checkIn,
        addXP 
    } = useNomadOSStore();

    const { dna, persona, logTouchpoint } = useUserProfileStore();
    const { savedDestinations, removeSaved } = useSavedStore();
    const { savedVibes } = useSavedVibesStore();
    const { addToast } = useToastStore();

    const {
        reputationScore = 940,
        rankTier = 'Diamond Sovereign',
        badges = []
    } = useNomadReputationStore();

    const { activities = [], addActivity } = useNomadActivityStore();
    const { bytes = [] } = useNomadByteStore();

    const pinnedBadges = badges.filter(b => b.isPinned && b.unlocked);
    const unlockedBadgesCount = badges.filter(b => b.unlocked).length;

    // Custom skills state
    const [customSkills, setCustomSkills] = useState(() => {
        try {
            const saved = localStorage.getItem('seenomad_user_skills');
            return saved ? JSON.parse(saved) : ['Itinerary Planning', 'React & Node.js', 'Photography', 'Local Navigation', 'Remote Work Ergonomics'];
        } catch {
            return ['Itinerary Planning', 'React & Node.js', 'Photography', 'Local Navigation', 'Remote Work Ergonomics'];
        }
    });

    useEffect(() => {
        if (searchParams.get('tab')) {
            setActiveProfileTab(searchParams.get('tab'));
        }
    }, [searchParams]);

    const handleSwitchTab = (tabId) => {
        setActiveProfileTab(tabId);
        setSearchParams({ tab: tabId });
    };

    const [isBannerCustomizerOpen, setIsBannerCustomizerOpen] = useState(false);

    const handleSaveProfile = (updatedData) => {
        const merged = { ...profile, ...updatedData };
        setProfile(merged);
        localStorage.setItem('seenomad_user_profile', JSON.stringify(merged));
        addXP(15);
        addActivity({
            type: 'profile_update',
            title: 'Updated Nomad Profile',
            location: merged.location || profile.location,
            content: `Updated profile details including display name (${merged.name}), bio, and base location (${merged.location}).`,
            metrics: { xp: '+15 XP' }
        });
    };

    const handleSaveBannerConfig = (bannerConfig) => {
        const updated = {
            ...profile,
            ...bannerConfig
        };
        setProfile(updated);
        localStorage.setItem('seenomad_user_profile', JSON.stringify(updated));
        addXP(25);
        addActivity({
            type: 'cover_update',
            title: `Customized Profile Banner & Brand Overlay`,
            location: bannerConfig.coverTag || profile.location,
            content: `Updated profile cover banner styled with the "${bannerConfig.coverGradientId || 'Nomad'}" SeeNomad brand gradient overlay.`,
            metrics: { xp: '+25 XP' }
        });
    };

    const handleQuickBannerUpload = ({ coverUrl, coverTag }) => {
        const updated = {
            ...profile,
            coverUrl,
            coverTag: coverTag || 'Custom Nomad Cover'
        };
        setProfile(updated);
        localStorage.setItem('seenomad_user_profile', JSON.stringify(updated));
        addXP(20);
        addActivity({
            type: 'cover_update',
            title: `Uploaded New Nomad Cover Photo`,
            location: profile.location,
            content: `Uploaded a personalized cover panorama photo to SeeNomad profile.`,
            metrics: { xp: '+20 XP' }
        });
    };

    const handleEndorse = (skillName) => {
        endorseSkill(skillName);
        addXP(15);
        addToast(`Endorsed "${skillName}"! +1 endorsement & +15 XP earned.`, 'success');
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (!newSkillInput.trim()) return;
        const skill = newSkillInput.trim();
        if (!customSkills.includes(skill)) {
            const updated = [...customSkills, skill];
            setCustomSkills(updated);
            localStorage.setItem('seenomad_user_skills', JSON.stringify(updated));
            endorseSkill(skill);
            addXP(25);
            addToast(`Skill "${skill}" added to profile! +25 XP earned.`, 'success');
        }
        setNewSkillInput('');
        setIsAddingSkill(false);
    };

    const handleShareProfile = () => {
        setIsShareModalOpen(true);
    };

    const handleCopyProfileLink = () => {
        navigator.clipboard?.writeText(window.location.href);
        addToast('Nomad Profile link copied to clipboard!', 'success');
    };

    const handleDailyCheckIn = () => {
        checkIn();
        addXP(50);
        addToast('🔥 Daily Nomad Check-in verified! +50 XP and streak maintained!', 'success');
        addActivity({
            type: 'check_in',
            title: `Daily Nomad Coordinates Verified (${dailyStreak + 1}d Streak)`,
            location: profile.location,
            content: `Confirmed active nomad coordinates from ${profile.location}. Maintained ${dailyStreak + 1}-day active nomad streak on SeeNomad OS!`,
            metrics: { streak: `${dailyStreak + 1} days` }
        });
    };

    const handleSaveNewTrip = (e) => {
        e.preventDefault();
        if (!newTripData.city.trim()) {
            addToast('Please enter city and country name', 'error');
            return;
        }

        const newBase = {
            id: `base-${Date.now()}`,
            city: newTripData.city.trim(),
            period: newTripData.period.trim() || '2026',
            role: newTripData.role.trim() || 'Remote Professional',
            badge: newTripData.badge || 'Completed',
            highlight: newTripData.highlight.trim() || 'Remote exploration and coworking discovery',
            wifiSpeed: newTripData.wifiSpeed || '70 Mbps',
            monthlyCost: newTripData.monthlyCost || '$1,800'
        };

        const updatedBases = [newBase, ...timelineBases];
        setTimelineBases(updatedBases);
        localStorage.setItem('seenomad_timeline_bases', JSON.stringify(updatedBases));

        // Update stats
        const updatedProfile = {
            ...profile,
            stats: {
                ...profile.stats,
                citiesLived: (profile.stats.citiesLived || 24) + 1
            }
        };
        setProfile(updatedProfile);
        localStorage.setItem('seenomad_user_profile', JSON.stringify(updatedProfile));

        addXP(100);
        addToast(`🎉 New base "${newBase.city}" logged! +100 XP added to your passport!`, 'success');

        // Broadcast to Real-Time Activity Feed
        addActivity({
            type: 'check_in',
            title: `Checked in & Logged Base: ${newBase.city}`,
            location: newBase.city,
            content: newBase.highlight || `Remote work exploration based in ${newBase.city}. Verified ${newBase.wifiSpeed} fiber and ${newBase.monthlyCost}/mo living cost.`,
            metrics: { wifi: newBase.wifiSpeed, cost: newBase.monthlyCost }
        });

        setIsLogTripModalOpen(false);
        setNewTripData({
            city: '',
            period: '',
            role: 'Full Stack Engineer (Remote)',
            badge: 'Completed',
            highlight: '',
            wifiSpeed: '75 Mbps',
            monthlyCost: '$1,800'
        });
    };

    const handleDownloadCV = () => {
        window.print();
    };

    const filteredSavedDestinations = savedDestinations.filter(d => {
        if (savedFilter === 'all') return true;
        const cat = (d.delhiCategory || d.category || '').toLowerCase();
        return cat.includes(savedFilter.toLowerCase());
    });

    return (
        <div className="nomad-profile-root" id="nomad-profile-root">
            {/* 1. Cinematic Profile Cover & Hero Card */}
            <motion.div 
                className="profile-hero-cinematic"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Customizable Cover Photo & Brand Gradient Banner */}
                <CoverBannerSection
                    coverUrl={profile.coverUrl}
                    coverGradientId={profile.coverGradientId || 'nomad-sunset'}
                    coverOpacity={profile.coverOpacity !== undefined ? profile.coverOpacity : 55}
                    coverHeight={profile.coverHeight || 'standard'}
                    coverPosition={profile.coverPosition || '35%'}
                    coverTag={profile.coverTag || 'Lisbon Sunset · Portugal'}
                    onOpenCustomizer={() => setIsBannerCustomizerOpen(true)}
                    onQuickUpload={handleQuickBannerUpload}
                />

                {/* Profile Identity Bar */}
                <div className="hero-identity-bar">
                    <div className="avatar-identity-cluster">
                        <div className="hero-avatar-wrapper">
                            <img 
                                src={profile.avatarUrl} 
                                className="hero-avatar-img" 
                                alt={profile.name} 
                            />
                            <div className="avatar-level-badge" title="Level 12 Elite Explorer">
                                Lv.{level}
                            </div>
                            <span className="avatar-online-dot" title="Active on Nomad OS" />
                        </div>

                        <div className="hero-info-text">
                            <div className="hero-name-row">
                                <h1 className="hero-user-name">{profile.name}</h1>
                                <div className="verified-explorer-badge" title="Identity & Remote Work Verified">
                                    <UserCheck size={14} />
                                    <span>Verified Explorer</span>
                                </div>
                                <span className="nomad-id-chip">#{profile.citizenshipId}</span>
                            </div>

                            <p className="hero-professional-title">{profile.title}</p>
                            
                            <div className="hero-meta-strip">
                                <span className="meta-item">
                                    <MapPin size={13} className="text-sky-400" />
                                    <span>{profile.location}</span>
                                </span>
                                <span className="meta-sep" aria-hidden="true">·</span>
                                <span className="meta-item">
                                    <Calendar size={13} className="text-amber-400" />
                                    <span>Member since {profile.memberSince}</span>
                                </span>
                                <span className="meta-sep" aria-hidden="true">·</span>
                                <span className="meta-item">
                                    <Sparkles size={13} className="text-purple-400" />
                                    <span>{profile.stats.communityRank}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Profile Actions */}
                    <div className="hero-cta-cluster">
                        <button 
                            type="button"
                            onClick={() => setIsEditModalOpen(true)}
                            className="btn-hero-action primary"
                            data-testid="edit-profile-btn"
                            aria-label="Edit Profile"
                            title="Edit profile display name, location, bio, and details"
                        >
                            <Edit3 size={14} />
                            <span>Edit Profile</span>
                        </button>
                        <button 
                            type="button"
                            onClick={handleShareProfile}
                            className="btn-hero-action outline"
                            title="Share Profile link"
                        >
                            <Share2 size={14} />
                            <span>Share Passport</span>
                        </button>
                        <button 
                            type="button"
                            onClick={handleDailyCheckIn}
                            className="btn-hero-action streak-btn"
                            title="Check-in today to maintain your nomad streak and earn +50 XP"
                        >
                            <Flame size={14} />
                            <span>Streak ({dailyStreak}d)</span>
                        </button>
                        <button 
                            type="button"
                            onClick={handleDownloadCV}
                            className="btn-hero-action outline"
                            title="Export Printable Nomad CV / Portfolio"
                        >
                            <Download size={14} />
                            <span>Export CV</span>
                        </button>
                    </div>
                </div>

                {/* Live Status Pill & Bio Snippet */}
                <div className="hero-status-bio-row">
                    <div className="live-status-pill-wrap">
                        <span className="live-status-pulse-dot" />
                        <span className="live-status-text">{profile.statusMessage}</span>
                    </div>
                    <p 
                        className="hero-bio-prose group cursor-pointer" 
                        onClick={() => setIsEditModalOpen(true)}
                        title="Click to edit bio & profile info"
                    >
                        "{profile.bio}"
                        <span className="inline-block ml-2 opacity-50 hover:opacity-100 text-xs text-sky-400">
                            (edit)
                        </span>
                    </p>
                </div>

                {/* Featured Nomad Reputation Badges Strip */}
                <div className="hero-reputation-badge-strip">
                    <div 
                        className="reputation-strip-left" 
                        onClick={() => handleSwitchTab('reputation')} 
                        style={{ cursor: 'pointer' }}
                        title="Click to view full Nomad Reputation & Badges breakdown"
                    >
                        <div className="reputation-shield-icon">
                            <ShieldCheck size={16} />
                        </div>
                        <div className="reputation-strip-text">
                            <span className="strip-score-val">{reputationScore} Rep</span>
                            <span className="strip-tier-val">{rankTier}</span>
                        </div>
                    </div>

                    <div className="pinned-badges-cluster">
                        {pinnedBadges.map(b => (
                            <div 
                                key={b.id} 
                                className={`hero-pinned-badge-chip tier-${b.tier.toLowerCase()}`}
                                onClick={() => handleSwitchTab('reputation')}
                                title={`${b.title} (${b.tier} Badge) - Click to inspect`}
                            >
                                <span className="badge-mini-icon" style={{ color: b.color }}>
                                    {renderBadgeIcon(b.iconName, 14)}
                                </span>
                                <span className="badge-chip-title">{b.title}</span>
                                <span className="badge-chip-tier">{b.tier}</span>
                            </div>
                        ))}
                    </div>

                    <button 
                        type="button" 
                        onClick={() => handleSwitchTab('reputation')}
                        className="btn-view-reputation"
                        title="View all achievement badges & reputation breakdown"
                    >
                        <span>Reputation & Badges ({unlockedBadgesCount}/{badges.length})</span>
                        <ChevronRight size={13} />
                    </button>
                </div>

                {/* Retention Dopamine Ribbon: 4 Core Collector Metrics */}
                <div className="hero-collector-metrics-grid">
                    <div className="collector-metric-box" onClick={() => handleSwitchTab('stamps')} title="Click to view digital passport stamps">
                        <div className="metric-icon-wrap text-blue-400">
                            <Globe size={18} />
                        </div>
                        <div className="metric-text-wrap">
                            <strong className="metric-value">{profile.stats.countriesVisited}</strong>
                            <span className="metric-label">Countries Explored</span>
                        </div>
                    </div>

                    <div className="collector-metric-box" onClick={() => handleSwitchTab('overview')} title="Click to view nomad bases lived">
                        <div className="metric-icon-wrap text-emerald-400">
                            <MapPin size={18} />
                        </div>
                        <div className="metric-text-wrap">
                            <strong className="metric-value">{timelineBases.length} Bases</strong>
                            <span className="metric-label">Bases Lived</span>
                        </div>
                    </div>

                    <div className="collector-metric-box" onClick={() => handleSwitchTab('stamps')} title="Click to view passport stamps">
                        <div className="metric-icon-wrap text-amber-400">
                            <Award size={18} />
                        </div>
                        <div className="metric-text-wrap">
                            <strong className="metric-value">{profile.stats.passportStamps}</strong>
                            <span className="metric-label">Passport Stamps</span>
                        </div>
                    </div>

                    <div className="collector-metric-box" onClick={() => handleSwitchTab('quests')} title="Click to view daily streak & quests">
                        <div className="metric-icon-wrap text-pink-400">
                            <Flame size={18} />
                        </div>
                        <div className="metric-text-wrap">
                            <strong className="metric-value">{dailyStreak} Days</strong>
                            <span className="metric-label">Nomad Streak</span>
                        </div>
                    </div>
                </div>

                {/* Level Progress Indicator */}
                <div className="hero-xp-progress-bar">
                    <div className="xp-label-row">
                        <span>
                            <strong>Level {level} Explorer</strong> · {xp.toLocaleString()} XP
                        </span>
                        <span className="xp-remaining-text">
                            {(xpToNextLevel - (xp % xpToNextLevel)).toLocaleString()} XP to Level {level + 1} (Unlocks: Verified Delhi & Lisbon Nomad Lounges)
                        </span>
                    </div>
                    <div className="xp-track-outer">
                        <div 
                            className="xp-track-fill" 
                            style={{ width: `${Math.min(100, Math.round(((xp % xpToNextLevel) / xpToNextLevel) * 100))}%` }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* 2. Interactive Navigation Tabs Rail */}
            <div className="profile-view-tabs-bar" role="tablist" aria-label="User Profile Sections">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'overview'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'overview' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('overview')}
                >
                    <FileText size={16} />
                    <span>Nomad CV & Bases</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'stamps'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'stamps' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('stamps')}
                >
                    <Award size={16} />
                    <span>Digital Passport ({profile.stats.passportStamps})</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'quests'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'quests' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('quests')}
                >
                    <Zap size={16} />
                    <span>Daily Missions & Streak</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'reputation'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'reputation' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('reputation')}
                >
                    <Award size={16} />
                    <span>Nomad Reputation ({unlockedBadgesCount}/{badges.length})</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'activity'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'activity' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('activity')}
                >
                    <Activity size={16} />
                    <span>Recent Activity ({activities.length})</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'bytes'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'bytes' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('bytes')}
                >
                    <MessageSquare size={16} />
                    <span>Nomad Bytes ({bytes.length})</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'saved'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'saved' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('saved')}
                >
                    <Bookmark size={16} />
                    <span>Saved Wishlist ({savedDestinations.length})</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeProfileTab === 'saved-vibes'}
                    className={`profile-view-tab-btn ${activeProfileTab === 'saved-vibes' ? 'active' : ''}`}
                    onClick={() => handleSwitchTab('saved-vibes')}
                >
                    <Film size={16} />
                    <span>Saved Vibes ({savedVibes.length})</span>
                </button>
            </div>

            {/* 3. Tab Contents */}

            {/* TAB: REAL-TIME ACTIVITY FEED */}
            {activeProfileTab === 'activity' && (
                <NomadActivityFeed />
            )}

            {/* TAB: NOMAD BYTES */}
            {activeProfileTab === 'bytes' && (
                <NomadBytesFeed />
            )}

            {/* TAB: NOMAD REPUTATION & ACHIEVEMENT BADGES */}
            {activeProfileTab === 'reputation' && (
                <NomadReputationBadges />
            )}

            {/* TAB: DIGITAL PASSPORT STAMPS */}
            {activeProfileTab === 'stamps' && (
                <NomadPassportStamps />
            )}

            {/* TAB: MISSIONS & STREAK QUESTS */}
            {activeProfileTab === 'quests' && (
                <NomadRetentionQuests />
            )}

            {/* TAB: SAVED VIBES */}
            {activeProfileTab === 'saved-vibes' && (
                <SavedVibesVault embedded={true} />
            )}

            {/* TAB: SAVED WISHLIST (DESTINATIONS) */}
            {activeProfileTab === 'saved' && (
                <div className="profile-card">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                        <div>
                            <h2 className="card-title" style={{ marginBottom: '0.2rem' }}>
                                <Bookmark size={20} className="text-amber-500" />
                                <span>My Saved Wishlist ({savedDestinations.length})</span>
                            </h2>
                            <p className="text-sm text-slate-400 m-0">Your bookmarked cities and attractions ready for upcoming itinerary planning.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate('/explore/destinations')}
                            className="btn-hub-primary"
                        >
                            <Compass size={15} /> Explore More Destinations
                        </button>
                    </div>

                    {/* Category Filter for Saved */}
                    <div className="saved-category-filter-chips">
                        {['all', 'historical', 'food', 'culture', 'adventure', 'beach', 'mountain'].map(cat => (
                            <button
                                key={cat}
                                type="button"
                                className={`saved-chip ${savedFilter === cat ? 'active' : ''}`}
                                onClick={() => setSavedFilter(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {filteredSavedDestinations.length > 0 ? (
                        <div className="saved-destinations-list-grid">
                            {filteredSavedDestinations.map((dest) => {
                                const slug = (dest.name || '').toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                return (
                                    <div key={dest.id} className="saved-dest-row-card">
                                        <div 
                                            className="dest-main-clickable"
                                            onClick={() => navigate(`/explore/destinations/${slug}`)}
                                        >
                                            <img src={dest.image} alt={dest.name} className="dest-row-thumbnail" />
                                            <div className="dest-row-meta">
                                                <h4 className="dest-row-title">{dest.name}</h4>
                                                <span className="dest-row-subtitle">
                                                    {dest.location} · {dest.price || '$1,200/mo'} · {dest.delhiCategory || dest.category || 'City'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="dest-row-actions">
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/explore/destinations/${slug}`)}
                                                className="btn-row-explore"
                                            >
                                                <span>View Guide</span>
                                                <ChevronRight size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    removeSaved(dest.id);
                                                    addToast(`Removed ${dest.name} from Wishlist`, 'info');
                                                }}
                                                className="btn-row-remove"
                                                title={`Remove ${dest.name}`}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="empty-saved-placeholder">
                            <Compass size={36} className="text-slate-500 mb-2" />
                            <h4>No destinations matching "{savedFilter}"</h4>
                            <p>Browse our curated Delhi attractions or global hubs and tap the bookmark icon on any card.</p>
                            <button
                                type="button"
                                onClick={() => navigate('/explore/destinations')}
                                className="btn-hub-primary mt-3"
                            >
                                Browse Delhi Hub & Global
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* TAB: NOMAD CV & OVERVIEW */}
            {activeProfileTab === 'overview' && (
                <div className="profile-cv-grid">
                    {/* Left Column: Travel History & Current Base */}
                    <div className="profile-left">
                        {/* Current Base Intelligence Telemetry */}
                        <section className="profile-card">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                <h2 className="card-title" style={{ marginBottom: 0 }}>
                                    <MapPin size={20} className="text-sky-400" />
                                    <span>Current Base: {profile.location}</span>
                                </h2>
                                <span className="base-status-tag">Live Base</span>
                            </div>

                            <div className="current-base-hero-card">
                                <img 
                                    src="https://images.unsplash.com/photo-1585211756843-dc3828965111?w=800&auto=format&fit=crop&q=80" 
                                    alt="Lisbon Base" 
                                    className="current-base-bg-img" 
                                />
                                <div className="current-base-telemetry-overlay">
                                    <div className="telemetry-item">
                                        <Wifi size={14} className="text-emerald-400" />
                                        <span>68 Mbps Fiber</span>
                                    </div>
                                    <div className="telemetry-item">
                                        <DollarSign size={14} className="text-amber-400" />
                                        <span>$2,100 / mo Cost</span>
                                    </div>
                                    <div className="telemetry-item">
                                        <Shield size={14} className="text-blue-400" />
                                        <span>92 Safety Index</span>
                                    </div>
                                    <div className="telemetry-item">
                                        <Coffee size={14} className="text-pink-400" />
                                        <span>42 Cafes Nearby</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Professional Travel History Timeline with "+ Log New Base" */}
                        <section className="profile-card mt-6">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                <h2 className="card-title" style={{ marginBottom: 0 }}>
                                    <Globe size={20} className="text-blue-500" />
                                    <span>Remote Travel History & Bases ({timelineBases.length})</span>
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setIsLogTripModalOpen(true)}
                                    className="btn-add-skill-trigger"
                                    title="Add a new city or country you lived or worked from"
                                >
                                    <Plus size={14} /> Log New Base
                                </button>
                            </div>

                            <div className="timeline-hub">
                                {timelineBases.map((item) => (
                                    <div key={item.id} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <div className="timeline-header-row">
                                                <h4>{item.city}</h4>
                                                <span className="timeline-badge">{item.badge}</span>
                                            </div>
                                            <p className="timeline-role">{item.role}</p>
                                            <span className="timeline-period">{item.period} · {item.wifiSpeed} · {item.monthlyCost}</span>
                                            <p className="timeline-highlight">{item.highlight}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Activity Timeline Stepper Feed Preview */}
                        <section className="profile-card mt-6">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                <h2 className="card-title" style={{ marginBottom: 0 }}>
                                    <Activity size={20} className="text-emerald-400" />
                                    <span>Recent Activity Timeline ({activities.length})</span>
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => handleSwitchTab('activity')}
                                    className="btn-add-skill-trigger"
                                    style={{ color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.12)' }}
                                >
                                    <span>Full Timeline</span>
                                    <ChevronRight size={13} />
                                </button>
                            </div>

                            <NomadActivityFeed embedded={true} />
                        </section>
                    </div>

                    {/* Right Column: Skills, Endorsements, Nomad Persona DNA & Gear */}
                    <div className="profile-right">
                        {/* Nomad DNA & Travel Style Persona */}
                        <section className="profile-card">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="card-title" style={{ marginBottom: 0 }}>
                                    <Sparkles size={20} className="text-purple-400" />
                                    <span>Nomad Travel Persona</span>
                                </h2>
                                <span className="timeline-badge">{persona || 'The Cultural Historian'}</span>
                            </div>

                            <div className="dna-trait-bars" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                {[
                                    { label: 'Remote Tech & Productivity', value: Math.min(100, (dna?.tech || 10) * 8), color: '#38bdf8' },
                                    { label: 'Culture & Heritage Immersion', value: Math.min(100, (dna?.culture || 10) * 8.5), color: '#fbbf24' },
                                    { label: 'Adventure & Exploration', value: Math.min(100, (dna?.adventure || 10) * 7.5), color: '#34d399' },
                                    { label: 'Community & Nomad Meetups', value: Math.min(100, (dna?.social || 10) * 7), color: '#c084fc' }
                                ].map(trait => (
                                    <div key={trait.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#94a3b8' }}>
                                            <span>{trait.label}</span>
                                            <span style={{ fontWeight: 700, color: '#f8fafc' }}>{trait.value}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '5px', borderRadius: '9999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                            <div style={{ width: `${trait.value}%`, height: '100%', background: trait.color, borderRadius: '9999px', transition: 'width 0.4s ease' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills & Endorsements */}
                        <section className="profile-card mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="card-title" style={{ marginBottom: 0 }}>
                                    <Award size={20} className="text-amber-500" />
                                    <span>Skills & Endorsements</span>
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setIsAddingSkill(true)}
                                    className="btn-add-skill-trigger"
                                >
                                    <Plus size={13} /> Add
                                </button>
                            </div>

                            {/* Inline Add Skill Input */}
                            {isAddingSkill && (
                                <form onSubmit={handleAddSkill} className="add-skill-form">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Skill name (e.g. Kotlin, Drone Photo, Chai Hunting)..."
                                        value={newSkillInput}
                                        onChange={(e) => setNewSkillInput(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="flex gap-2">
                                        <button type="submit" className="btn-hub-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
                                            Add
                                        </button>
                                        <button type="button" onClick={() => setIsAddingSkill(false)} className="btn-cancel" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="endorsements-list">
                                {customSkills.map(skill => {
                                    const count = userSkills[skill] || (skill === 'Photography' ? 24 : skill === 'Itinerary Planning' ? 12 : 8);
                                    return (
                                        <div key={skill} className="endorsement-row">
                                            <div className="e-skill-info">
                                                <strong>{skill}</strong>
                                                <span>{count} nomad endorsements</span>
                                            </div>
                                            <button 
                                                type="button"
                                                className="endorse-btn"
                                                onClick={() => handleEndorse(skill)}
                                                title={`Endorse ${skill}`}
                                            >
                                                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                                <span>Endorse</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Remote Setup & Nomad Hardware Stack */}
                        <section className="profile-card mt-6">
                            <h2 className="card-title">
                                <Laptop size={20} className="text-purple-400" />
                                <span>Nomad Gear Stack</span>
                            </h2>
                            <div className="gear-stack-grid">
                                {[
                                    { item: 'MacBook Pro M3 Max (16")', role: 'Main Machine' },
                                    { item: 'Sony A7 IV + 24-70mm', role: 'Visuals & Vlog' },
                                    { item: 'Bose QuietComfort Ultra', role: 'Deep Focus Audio' },
                                    { item: 'Roost V3 Stand + Magic Trackpad', role: 'Ergonomic Desk' },
                                    { item: 'Nomatic Travel Pack 30L', role: 'One-Bag Carry' },
                                    { item: 'Airalo Global eSIM & Fiber Hotspot', role: 'Connectivity' }
                                ].map((gear, idx) => (
                                    <div key={idx} className="gear-item-chip">
                                        <strong className="gear-name">{gear.item}</strong>
                                        <span className="gear-role">{gear.role}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Social & Contact Strip */}
                        <section className="profile-card mt-6">
                            <h2 className="card-title">
                                <ExternalLink size={20} className="text-sky-400" />
                                <span>Connect & Verify</span>
                            </h2>
                            <div className="profile-links-list">
                                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="profile-link-item">
                                    <Globe size={15} />
                                    <span>{profile.website.replace('https://', '')}</span>
                                </a>
                                <a href={`https://twitter.com/${profile.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="profile-link-item">
                                    <span className="font-bold">𝕏</span>
                                    <span>{profile.twitter}</span>
                                </a>
                                <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="profile-link-item">
                                    <span className="font-mono text-xs">GH</span>
                                    <span>github.com/{profile.github}</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            )}

            {/* 4. Profile End Milestone Footbar Card (Modeled after Home Feed Page FeedEndFootbar) */}
            <ProfileEndFootbar 
                profile={profile}
                level={level}
                dailyStreak={dailyStreak}
                badgeCount={unlockedBadgesCount}
                onEditProfile={() => setIsEditModalOpen(true)}
                onShareProfile={() => setIsShareModalOpen(true)}
            />

            {/* 5. Profile Bottom Bar & Accessible Footbar Drawer (Modeled after Home Feed Page FeedBottomBar) */}
            <ProfileBottomBar 
                activeTab={activeProfileTab}
                onTabChange={handleSwitchTab}
                onEditProfile={() => setIsEditModalOpen(true)}
                onShareProfile={() => setIsShareModalOpen(true)}
                badgeCount={unlockedBadgesCount}
                activityCount={activities.length}
                stampCount={profile?.stats?.passportStamps || 14}
                streakCount={dailyStreak || 14}
                savedCount={savedDestinations?.length || 4}
                profileName={profile?.name || 'Alex Rivera'}
            />

            {/* Edit Profile Modal Component */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentProfile={profile}
                onSave={handleSaveProfile}
                onOpenBannerCustomizer={() => {
                    setIsEditModalOpen(false);
                    setIsBannerCustomizerOpen(true);
                }}
            />

            {/* 6. Customizable Cover Banner & Brand Aesthetic Studio Modal */}
            <CoverBannerCustomizerModal
                isOpen={isBannerCustomizerOpen}
                onClose={() => setIsBannerCustomizerOpen(false)}
                currentBanner={{
                    coverUrl: profile.coverUrl,
                    coverGradientId: profile.coverGradientId,
                    coverOpacity: profile.coverOpacity,
                    coverHeight: profile.coverHeight,
                    coverPosition: profile.coverPosition,
                    coverTag: profile.coverTag
                }}
                onSaveBanner={handleSaveBannerConfig}
            />

            {/* Log New Base Modal */}
            <AnimatePresence>
                {isLogTripModalOpen && (
                    <div className="log-trip-backdrop" onClick={() => setIsLogTripModalOpen(false)} role="dialog" aria-modal="true">
                        <motion.div 
                            className="log-trip-modal"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="log-trip-header">
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-sky-400" />
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Log a New Nomad Base</h3>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setIsLogTripModalOpen(false)}
                                    className="edit-profile-close-btn"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveNewTrip} className="log-trip-form">
                                <div className="form-group">
                                    <label className="form-label">City & Country</label>
                                    <input 
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. New Delhi, India or Chiang Mai, Thailand"
                                        value={newTripData.city}
                                        onChange={(e) => setNewTripData({ ...newTripData, city: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="form-label">Dates / Duration</label>
                                        <input 
                                            type="text"
                                            className="form-input"
                                            placeholder="e.g. Feb 2026 – Apr 2026 (2 mos)"
                                            value={newTripData.period}
                                            onChange={(e) => setNewTripData({ ...newTripData, period: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Status Tag</label>
                                        <select 
                                            className="form-input"
                                            value={newTripData.badge}
                                            onChange={(e) => setNewTripData({ ...newTripData, badge: e.target.value })}
                                        >
                                            <option value="Current Base">Current Base</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Upcoming">Upcoming Base</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Remote Work Role / Project</label>
                                    <input 
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Lead Frontend Architect @ FinTech"
                                        value={newTripData.role}
                                        onChange={(e) => setNewTripData({ ...newTripData, role: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Coworking Highlight & Local Memory</label>
                                    <textarea 
                                        rows={3}
                                        className="form-textarea"
                                        placeholder="Favorite cafes, fiber speed, community memories..."
                                        value={newTripData.highlight}
                                        onChange={(e) => setNewTripData({ ...newTripData, highlight: e.target.value })}
                                    />
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label className="form-label">Wifi Speed Verified</label>
                                        <input 
                                            type="text"
                                            className="form-input"
                                            placeholder="e.g. 100 Mbps Fiber"
                                            value={newTripData.wifiSpeed}
                                            onChange={(e) => setNewTripData({ ...newTripData, wifiSpeed: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Monthly Living Cost</label>
                                        <input 
                                            type="text"
                                            className="form-input"
                                            placeholder="e.g. $1,400"
                                            value={newTripData.monthlyCost}
                                            onChange={(e) => setNewTripData({ ...newTripData, monthlyCost: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="edit-profile-actions">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsLogTripModalOpen(false)}
                                        className="btn-cancel"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="btn-save"
                                    >
                                        <Plus size={16} /> Save Base (+100 XP)
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Share Nomad Passport Modal */}
            <AnimatePresence>
                {isShareModalOpen && (
                    <div className="log-trip-backdrop" onClick={() => setIsShareModalOpen(false)} role="dialog" aria-modal="true">
                        <motion.div 
                            className="log-trip-modal"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            style={{ maxWidth: '440px', textAlign: 'center' }}
                        >
                            <div className="log-trip-header">
                                <div className="flex items-center gap-2">
                                    <Share2 size={20} className="text-amber-500" />
                                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Nomad Passport Card</h3>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setIsShareModalOpen(false)}
                                    className="edit-profile-close-btn"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ 
                                    width: '100%', 
                                    borderRadius: '20px', 
                                    padding: '1.5rem', 
                                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                    border: '1px solid rgba(245, 158, 11, 0.3)',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}>
                                    <img 
                                        src={profile.avatarUrl} 
                                        alt={profile.name} 
                                        style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #f59e0b', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#f8fafc', fontWeight: 800 }}>{profile.name}</h4>
                                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{profile.title}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        <span className="nomad-id-chip">#{profile.citizenshipId}</span>
                                        <span className="timeline-badge">Lv.{level} Explorer</span>
                                        <span className="timeline-badge" style={{ color: '#fbbf24', borderColor: 'rgba(245,158,11,0.3)' }}>{dailyStreak}d Streak</span>
                                    </div>
                                    <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: '0.5rem 0 0', fontStyle: 'italic' }}>
                                        "{profile.bio}"
                                    </p>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                                    <button 
                                        type="button" 
                                        onClick={handleCopyProfileLink}
                                        className="btn-hub-primary"
                                        style={{ flex: 1, justifyContent: 'center' }}
                                    >
                                        <Copy size={16} /> Copy Link
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: `${profile.name} - Nomad Passport`,
                                                    text: `Check out ${profile.name}'s digital nomad passport and travel history on SeeNomad!`,
                                                    url: window.location.href
                                                });
                                            } else {
                                                handleCopyProfileLink();
                                            }
                                        }}
                                        className="btn-hero-action outline"
                                        style={{ flex: 1, justifyContent: 'center' }}
                                    >
                                        <Share2 size={16} /> Share Card
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NomadProfile;
