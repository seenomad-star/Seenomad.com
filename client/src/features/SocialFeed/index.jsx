import React, { useState, useEffect } from 'react';
import FeedTabs from './components/FeedTabs';
import StoriesRail from './components/StoriesRail';
import NomadDock from './components/NomadDock';
import Composer from './components/Composer';
import Post from './components/Post';
import SkillExchange from './components/SkillExchange';
import TrendingHeader from './components/TrendingHeader';
import NearbyMap from './components/NearbyMap';
import ShortsFeed from './components/ShortsFeed';
import NomadPulse from './components/NomadPulse';
import TravelChallenges from './components/TravelChallenges';
import VisualDestinations from './components/VisualDestinations';
import AgentNexusFeed from './components/AgentNexusFeed';
import RetentionStreakWidget from '../Growth/components/RetentionStreakWidget';
import { TrendingUp, Activity } from 'lucide-react';
import { SkeletonCard } from '../../components/common/Skeleton';
import './styles/SocialFeed.css';

const SocialFeed = () => {
    const [activeTab, setActiveTab] = useState('nexus');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial fetch
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const stories = [
        { id: 0, username: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', isUser: true },
        { id: 1, username: 'emma_j', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', hasStory: true },
        { id: 2, username: 'alex_k', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', hasStory: true },
        { id: 3, username: 'sarah_m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', hasStory: true },
        { id: 4, username: 'mike_r', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', hasStory: true },
        { id: 5, username: 'lisa_p', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150', hasStory: true },
    ];

    const allPosts = {
        foryou: [
            {
                id: 1,
                author: 'Emma J.',
                username: '@emitter',
                time: '2h',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                content: 'Golden hour in Santorini is unmatched. The way the light hits the white buildings is pure magic. ✨🇬🇷',
                image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
                likes: '2.4K',
                comments: 45,
                shares: 12,
                views: '12K'
            },
            {
                id: 2,
                author: 'Alex K.',
                username: '@alexplorer',
                time: '4h',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
                content: 'Just finished the sunrise hike at Mount Fuji. Waking up at 3 AM was painful but this view made it all worth it. 🗻🙏',
                image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800',
                likes: '4.5K',
                comments: 78,
                shares: 34,
                views: '25K'
            },
        ],
        following: [
            {
                id: 3,
                author: 'Marcus Chen',
                username: '@marcus_nx',
                time: '1h',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
                content: 'Found an incredible hidden workspace in Medellin. Internet is 300Mbps and the coffee is 10/10. ☕💻',
                likes: '890',
                comments: 24,
                shares: 5,
                views: '5K'
            }
        ],
        trending: [
            {
                id: 4,
                author: 'Nomad Soul',
                username: '@nomadsoul',
                time: '12h',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=soul',
                content: 'Top 5 countries for digital nomads in 2026. Number 3 will surprise you! 🌍✈️ #FutureOfWork',
                image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800',
                likes: '12.4K',
                comments: 532,
                shares: 1.2,
                views: '150K'
            }
        ],
        latest: [
            {
                id: 5,
                author: 'New Arrival',
                username: '@newbie',
                time: '5m',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newbie',
                content: 'Just landed in Lisbon! Any meetups happening tonight? 🇵🇹',
                likes: '12',
                comments: 2,
                shares: 0,
                views: '120'
            }
        ],
        nearby: [
            {
                id: 6,
                author: 'Local Guide',
                username: '@local_bali',
                time: '30m',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guide',
                content: 'Avoid the main road at Canggu today. Heavy traffic due to the festival. 🛵🛑',
                location: 'Canggu, Bali',
                likes: '450',
                comments: 89,
                shares: 23,
                views: '8K'
            }
        ]
    };

    const currentPosts = allPosts[activeTab] || [];

    return (
        <div className="social-feed-layout">
            <div className="social-feed-main">
                <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <RetentionStreakWidget />
                <StoriesRail stories={stories} />
                <Composer />

                <div className="feed-stream">
                    {isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    ) : activeTab === 'nexus' ? (
                        <AgentNexusFeed />
                    ) : activeTab === 'visuals' ? (
                        <VisualDestinations />
                    ) : activeTab === 'challenges' ? (
                        <TravelChallenges />
                    ) : activeTab === 'shorts' ? (
                        <ShortsFeed />
                    ) : activeTab === 'pulse' ? (
                        <NomadPulse />
                    ) : activeTab === 'exchange' ? (
                        <SkillExchange />
                    ) : (
                        <>
                            {activeTab === 'trending' && <TrendingHeader />}
                            {activeTab === 'nearby' && <NearbyMap />}
                            {currentPosts.map(post => (
                                <Post key={post.id} post={post} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SocialFeed;
