import React, { useState, useEffect } from 'react';
import FeedTabs from './components/FeedTabs';
import StoriesRail from './components/StoriesRail';
import Composer from './components/Composer';
import Post from './components/Post';
import LiveFeed from './components/LiveFeed';
import SkillExchange from './components/SkillExchange';
import TrendingHeader from './components/TrendingHeader';
import NearbyMap from './components/NearbyMap';
import ShortsFeed from './components/ShortsFeed';
import NomadPulse from './components/NomadPulse';
import TravelChallenges from './components/TravelChallenges';
import VisualDestinations from './components/VisualDestinations';
import RetentionStreakWidget from '../Growth/components/RetentionStreakWidget';
import { SkeletonCard } from '../../components/common/Skeleton';
import { ArrowUp, Sparkles, Radio } from 'lucide-react';
import './styles/SocialFeed.css';

const INITIAL_STORIES = [
    { id: 0, username: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', isUser: true },
    { id: 1, username: 'emma_j', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', hasStory: true },
    { id: 2, username: 'alex_k', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', hasStory: true },
    { id: 3, username: 'sarah_m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', hasStory: true },
    { id: 4, username: 'marcus_nx', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus', hasStory: true },
    { id: 5, username: 'lisa_p', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150', hasStory: true }
];

const INITIAL_POSTS = {
    foryou: [
        {
            id: 'post-1',
            author: {
                name: 'Emma Johnson',
                handle: '@emma_nomad',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
            },
            time: '2h ago',
            location: 'Oia, Santorini',
            vibe: '🌅 Golden Hour',
            content: 'Golden hour on the cliffs of Santorini is unmatched. Found a quiet rooftop cafe with 150 Mbps fiber and zero crowds. If you are heading here this month, hit the alleys before 7 AM! ✨🇬🇷 #Santorini #RemoteWork',
            image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900',
            likes: '2.4K',
            comments: 48,
            shares: 19,
            views: '14.2K'
        },
        {
            id: 'post-2',
            author: {
                name: 'Alex Rivera',
                handle: '@alexplorer',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
            },
            time: '4h ago',
            location: 'Mount Fuji, Japan',
            vibe: '🎒 Summit Trek',
            content: 'Sunrise climb at Mount Fuji 5th station. 3 AM wake up, freezing winds, but watching the morning sun break through the sea of clouds was pure spiritual energy. 🗻🇯🇵',
            image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900',
            likes: '4.8K',
            comments: 82,
            shares: 37,
            views: '28K'
        },
        {
            id: 'post-3',
            author: {
                name: 'Elena Rostova',
                handle: '@elena_dev',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
            },
            time: '7h ago',
            location: 'Canggu, Bali',
            vibe: '💻 Deep Work',
            content: 'Quick poll for nomads currently in Southeast Asia: Are you staying in coliving hubs or renting private villas with Starlink backup? Let me know your monthly cost breakdown!',
            likes: '1.1K',
            comments: 63,
            shares: 8,
            views: '9.4K',
            poll: {
                question: 'Preferred Nomad Accommodation in Bali / SEA:',
                options: [
                    { text: 'Coliving Hub (Selina / Outpost)', votes: 84 },
                    { text: 'Private Villa + Starlink', votes: 142 }
                ],
                totalVotes: 226
            }
        }
    ],
    following: [
        {
            id: 'post-4',
            author: {
                name: 'Marcus Chen',
                handle: '@marcus_nx',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus'
            },
            time: '1h ago',
            location: 'Medellin, Colombia',
            vibe: '☕ Cafe Hopping',
            content: 'Found a top secret workspace tucked behind El Poblado park. 350 Mbps symmetrical fiber, artisanal cold brew on tap, and great community dinners every Thursday. Hit me up if you want the pin! 🇨🇴💻',
            likes: '890',
            comments: 31,
            shares: 9,
            views: '5.2K'
        },
        {
            id: 'post-5',
            author: {
                name: 'Lisa Park',
                handle: '@lisatravels',
                avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150'
            },
            time: '3h ago',
            location: 'Shibuya, Tokyo',
            vibe: '🍜 Midnight Walk',
            content: 'Testing out the new JR Nomad rail pass. High speed shinkansen has full power outlets and 100 Mbps wifi the whole journey from Tokyo to Kyoto! 🚄✨',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900',
            likes: '1.7K',
            comments: 42,
            shares: 15,
            views: '11K'
        }
    ],
    trending: [
        {
            id: 'post-6',
            author: {
                name: 'Nomad Global Intelligence',
                handle: '@nomadradar',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=radar'
            },
            time: '5h ago',
            location: 'Global Hubs',
            vibe: '⚡ Breaking Visa Update',
            content: '🚨 Major Visa Update 2026: 3 new countries just launched low-tax digital nomad visas with zero income tax for the first 24 months! Full breakdown of requirements, proof of funds, and processing times in thread 👇 #NomadVisa #RemoteWork #TaxArbitrage',
            image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=900',
            likes: '16.5K',
            comments: 720,
            shares: '2.1K',
            views: '185K'
        },
        {
            id: 'post-7',
            author: {
                name: 'Sarah Miller',
                handle: '@sarah_wander',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
            },
            time: '8h ago',
            location: 'Ubud, Bali',
            vibe: '🌴 Jungle Coworking',
            content: 'How to survive monsoon season in Bali as a remote dev: 1) Starlink backup router, 2) Portable battery pack, 3) Cozy bamboo desk overlooking the rice fields. Who else is working from Indonesia right now? 🌧️💻',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900',
            likes: '9.2K',
            comments: 310,
            shares: 88,
            views: '64K'
        }
    ],
    latest: [
        {
            id: 'post-8',
            author: {
                name: 'Liam Vance',
                handle: '@liam_v',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newbie'
            },
            time: '4m ago',
            location: 'Lisbon, Portugal',
            vibe: '✈️ Just Landed',
            content: 'Just checked in at Selina Secret Garden in Lisbon! Anyone around Bairro Alto for sunset drinks or coworking tomorrow morning? 🇵🇹🍷',
            likes: '14',
            comments: 5,
            shares: 1,
            views: '180'
        },
        {
            id: 'post-9',
            author: {
                name: 'David Kim',
                handle: '@david_tech',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
            },
            time: '18m ago',
            location: 'Chiang Mai, Thailand',
            vibe: '☕ Deep Work',
            content: 'Yellow Coworking in Nimman is packed today but the wifi is flying at 420 Mbps down. Highly recommended for heavy syncs.',
            likes: '39',
            comments: 7,
            shares: 3,
            views: '410'
        }
    ],
    nearby: [
        {
            id: 'post-10',
            author: {
                name: 'Wayan Local Guide',
                handle: '@canggu_insider',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guide'
            },
            time: '25m ago',
            location: 'Canggu, Bali · 0.4km away',
            vibe: '🛵 Traffic Alert',
            content: 'Batu Bolong shortcut has maintenance work near the bridge for the next 2 hours. Use Jalan Nelayan instead to avoid getting stuck on scooters! 🛵⚠️',
            likes: '480',
            comments: 92,
            shares: 41,
            views: '9.2K'
        },
        {
            id: 'post-11',
            author: {
                name: 'Chloe Laurent',
                handle: '@chloe_surf',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
            },
            time: '45m ago',
            location: 'Echo Beach, Bali · 0.9km away',
            vibe: '🏄 Beach Sunset',
            content: 'Sunset surf lineup at Echo Beach looking pristine today. 4ft clean peelers and light offshore breeze. Come down after work! 🌊🏄',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900',
            likes: '620',
            comments: 28,
            shares: 12,
            views: '6.8K'
        }
    ]
};

const SocialFeed = () => {
    // Default to 'foryou' as standard social feed homepage
    const [activeTab, setActiveTab] = useState('foryou');
    const [isLoading, setIsLoading] = useState(true);
    const [feedPosts, setFeedPosts] = useState(INITIAL_POSTS);
    const [newPostsAlert, setNewPostsAlert] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Random new post ticker for "Latest" tab
    useEffect(() => {
        if (activeTab === 'latest') {
            const timer = setTimeout(() => setNewPostsAlert(true), 12000);
            return () => clearTimeout(timer);
        }
        setNewPostsAlert(false);
    }, [activeTab]);

    const handleAddPost = (newPost) => {
        setFeedPosts(prev => {
            const updatedForyou = [newPost, ...(prev.foryou || [])];
            const updatedLatest = [newPost, ...(prev.latest || [])];
            const currentTabPosts = prev[activeTab] ? [newPost, ...prev[activeTab]] : [newPost];

            return {
                ...prev,
                [activeTab]: currentTabPosts,
                foryou: updatedForyou,
                latest: updatedLatest
            };
        });
    };

    const currentTabPosts = feedPosts[activeTab] || [];

    // Tabs that feature standard social post streams vs specialized views
    const isStandardStream = ['foryou', 'following', 'trending', 'latest', 'nearby'].includes(activeTab);

    return (
        <div className="social-feed-layout">
            <div className="social-feed-main">
                {/* Modern sticky tab switcher */}
                <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Show Daily Drop / Retention Streak Widget on relevant tabs */}
                {(activeTab === 'foryou' || activeTab === 'challenges' || activeTab === 'pulse') && (
                    <div className="feed-widget-wrap">
                        <RetentionStreakWidget />
                    </div>
                )}

                {/* Social media stories rail */}
                <StoriesRail stories={INITIAL_STORIES} />

                {/* Social media post composer */}
                <Composer onAddPost={handleAddPost} />

                {/* New posts alert ticker (Latest tab) */}
                {activeTab === 'latest' && newPostsAlert && (
                    <div 
                        className="feed-new-posts-pill"
                        onClick={() => {
                            setNewPostsAlert(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <ArrowUp size={14} />
                        <span>3 new nomad posts loaded · Click to view</span>
                    </div>
                )}

                {/* Main Feed Content Stream */}
                <main className="feed-stream" id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
                    {isLoading ? (
                        <div className="feed-skeleton-stack">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    ) : activeTab === 'live' ? (
                        <LiveFeed />
                    ) : activeTab === 'visuals' ? (
                        <VisualDestinations />
                    ) : activeTab === 'shorts' ? (
                        <ShortsFeed />
                    ) : activeTab === 'challenges' ? (
                        <TravelChallenges />
                    ) : activeTab === 'pulse' ? (
                        <NomadPulse />
                    ) : activeTab === 'exchange' ? (
                        <SkillExchange />
                    ) : (
                        <>
                            {activeTab === 'trending' && <TrendingHeader />}
                            {activeTab === 'nearby' && <NearbyMap />}
                            
                            {currentTabPosts.length > 0 ? (
                                currentTabPosts.map(post => (
                                    <Post key={post.id} post={post} />
                                ))
                            ) : (
                                <div className="feed-empty-state">
                                    <Sparkles size={32} className="text-blue-400 mb-2" />
                                    <h3>No posts in this feed yet</h3>
                                    <p>Be the first nomad to share a story, tip, or question!</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SocialFeed;
