import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
    ChevronDown,
    TrendingUp,
    Zap,
    Users,
    Smile,
    Share2
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useNomadOSStore } from '../../store/nomadOSStore';
import '../../styles/CreatorCommunity.css';
import VibeCheck from '../UserHub/VibeCheck';

// Sub-components
import TravelFeed from './components/TravelFeed';
import Reels from './components/Reels';
import Stories from './components/Stories';
import Blogs from './components/Blogs';
import Profiles from './components/Profiles';
import Groups from './components/Groups';
import Messaging from './components/Messaging';
import CollabBoard from './components/CollabBoard';
import BountyBoard from './components/BountyBoard';
import LocalRecommendations from './components/LocalRecommendations';
import PostComposer from './components/PostComposer';
import ShortsViewer from './components/ShortsViewer';
import MeetupPlanner from './components/MeetupPlanner';
import PulseFeed from './components/PulseFeed';
import NomadSparks from '../Social/NomadSparks';
import KnowledgeMarket from './components/KnowledgeMarket';
import PopularFeed from '../../components/PopularFeed';

const Community = () => {
    const { setModuleNav, globalSearchQuery, setDockConfig } = useNavStore();
    const { currentVibe } = useNomadOSStore();
    const [isVibeOpen, setIsVibeOpen] = useState(false);
    const navItems = [
        'Popular',
        'Travel Feed',
        'Nomad Pulse',
        'Nomad Sparks',
        'Nexus Market',
        'Reels',
        'Stories',
        'Travel Blogs',
        'Creator Profiles',
        'Collab Board',
        'Bounty Board',
        'Groups & Forums',
        'Message System'
    ];

    useEffect(() => {
        setModuleNav(navItems, '/community');
        return () => setModuleNav([], '');
    }, []);

    // Register Dock Configuration for Community Module
    useEffect(() => {
        setDockConfig({
            module: 'Community',
            placeholder: 'Search posts, creators, groups...',
            quickFilters: [
                { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
                { id: 'latest', label: 'Latest', icon: 'Clock' },
                { id: 'creators', label: 'Creators', icon: 'Users' },
                { id: 'groups', label: 'Groups', icon: 'Users' },
                { id: 'live', label: 'Live Now', icon: 'Radio' }
            ]
        });
    }, [setDockConfig]);

    // Sync Global Dock State to Local Search
    useEffect(() => {
        setSearchQuery(globalSearchQuery);
    }, [globalSearchQuery]);

    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [isShortsOpen, setIsShortsOpen] = useState(false);
    const [creatorsFrom, setCreatorsFrom] = useState('CREATORS FROM');
    const [postsAbout, setPostsAbout] = useState('POSTS ABOUT');
    const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

    const countryNames = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
        'Bahamas', 'Bahrain', 'Bangladesh', 'Belgium', 'Bhutan', 'Brazil', 'Cambodia', 'Canada', 'Chile', 'China', 'Colombia',
        'Croatia', 'Denmark', 'Dominican Republic', 'Egypt', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'Georgia', 'Germany',
        'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Jordan', 'Kazakhstan',
        'Kenya', 'Kuwait', 'Laos', 'Latvia', 'Lebanon', 'Lithuania', 'Luxembourg', 'Malaysia', 'Maldives', 'Malta', 'Mauritius',
        'Mexico', 'Monaco', 'Morocco', 'Nepal', 'Netherlands', 'New Zealand', 'Norway', 'Oman', 'Pakistan', 'Peru', 'Philippines',
        'Poland', 'Portugal', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden',
        'Taiwan', 'Thailand', 'Turkey', 'Ukraine', 'Vietnam', 'Zimbabwe', 'United States', 'United Kingdom', 'Japan', 'France'
    ].sort();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="creator-community-container">
            {/* Header with Dopamine Elements */}
            <div className="cc-header">
                <div className="cc-header-main">
                    <h1 className="cc-title">Community Hub</h1>
                    <div className="cc-header-stats">
                        <div className="header-stat">
                            <Users size={16} />
                            <span>1.2M Online</span>
                        </div>
                        <div className="header-stat trending">
                            <TrendingUp size={16} />
                            <span>#BaliTrending</span>
                        </div>
                    </div>
                </div>
                <div className="cc-header-actions">
                    <button 
                        className={`vibe-spark-btn ${currentVibe ? 'has-vibe' : ''}`}
                        onClick={() => setIsVibeOpen(true)}
                    >
                        <Smile size={18} />
                        <span>{currentVibe || 'Vibe Check'}</span>
                    </button>
                    <button className="go-live-btn">
                        <div className="live-dot"></div>
                        <span>Go Live</span>
                    </button>
                    <button className="create-post-btn" onClick={() => setIsComposerOpen(true)}>
                        <Zap size={18} fill="currentColor" />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            <PostComposer isOpen={isComposerOpen} onClose={() => setIsComposerOpen(false)} />
            <ShortsViewer isOpen={isShortsOpen} onClose={() => setIsShortsOpen(false)} />
            <VibeCheck isOpen={isVibeOpen} onClose={() => setIsVibeOpen(false)} />

            {/* Sub-Module Navigation */}
            {/* Global ModuleNavbar is now in NavbarV3 */}

            {/* Search & Global Filters are now handled by NomadGhostDock */}

            {/* Content Area */}
            <div className="cc-content">
                <Routes>
                    <Route path="/" element={<Navigate to="popular" replace />} />
                    <Route path="popular" element={<PopularFeed />} />
                    <Route path="travel-feed" element={<TravelFeed />} />
                    <Route path="local-recommendations" element={<PulseFeed />} />
                    <Route path="nomad-pulse" element={<MeetupPlanner />} />
                    <Route path="nomad-sparks" element={<NomadSparks />} />
                    <Route path="nexus-market" element={<KnowledgeMarket />} />
                    <Route path="reels" element={<button onClick={() => setIsShortsOpen(true)} className="shorts-trigger-btn">Launch Shorts Player</button>} />
                    <Route path="stories" element={<Stories />} />
                    <Route path="travel-blogs" element={<Blogs />} />
                    <Route path="creator-profiles" element={<Profiles />} />
                    <Route path="collab-board" element={<CollabBoard />} />
                    <Route path="bounty-board" element={<BountyBoard />} />
                    <Route path="groups--forums" element={<Groups />} />
                    <Route path="message-system" element={<Messaging />} />
                </Routes>
            </div>

            {/* Global Dopamine Floating Elements */}
            <div className="global-dopamine-layer">
                <div className="floating-streak">
                    <Zap size={20} fill="#f59e0b" stroke="#f59e0b" />
                    <span>7 Day Streak!</span>
                </div>
            </div>
        </div>
    );
};

export default Community;
