import React, { useState, useEffect } from 'react';
import { TrendingUp, Flame, Zap, Crown, Clock, BarChart3 } from 'lucide-react';
import TrendingPostCard from './popular/TrendingPostCard';
import '../styles/popular/PopularFeed.css';

const PopularFeed = () => {
    const [activeFilter, setActiveFilter] = useState('best');
    const [viewMode, setViewMode] = useState('card'); // card or compact
    const [posts, setPosts] = useState([]);

    const filters = [
        { id: 'best', label: 'Best', icon: Crown, description: 'Top quality content' },
        { id: 'hot', label: 'Hot', icon: Flame, description: 'Trending right now' },
        { id: 'new', label: 'New', icon: Clock, description: 'Latest posts' },
        { id: 'top', label: 'Top', icon: BarChart3, description: 'Most upvoted' },
        { id: 'rising', label: 'Rising', icon: Zap, description: 'Fast growing' },
    ];

    // Mock trending posts data
    const mockPosts = [
        {
            id: 1,
            author: 'TravelNomad_47',
            community: 'r/BudgetTravel',
            timeAgo: '3h ago',
            title: 'I spent 2 weeks in Japan for under $800 - Complete breakdown and tips',
            content: 'After months of planning, I finally did it! Here\'s exactly how I managed to explore Tokyo, Kyoto, and Osaka on a shoestring budget...',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
            upvotes: 5421,
            comments: 234,
            awards: 8,
            shares: 156,
            trending: true,
            isPremium: false,
            tags: ['Budget', 'Japan', 'Guide']
        },
        {
            id: 2,
            author: 'WanderlustQueen',
            community: 'r/SoloTravel',
            timeAgo: '5h ago',
            title: 'Solo female traveler - 6 months across Southeast Asia, AMA!',
            content: 'Just completed my dream trip through Thailand, Vietnam, Cambodia, and Indonesia. Ask me anything about safety, costs, must-see places...',
            image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
            upvotes: 3892,
            comments: 567,
            awards: 12,
            shares: 234,
            rising: true,
            isPremium: false,
            tags: ['Solo', 'Southeast Asia', 'AMA']
        },
        {
            id: 3,
            author: 'DigitalNomadLife',
            community: 'r/WorkAndTravel',
            timeAgo: '1h ago',
            title: '🔒 Premium: My secret list of 15 cities with the best WiFi, lowest cost of living, and amazing food',
            content: 'After 3 years of remote work while traveling, I\'ve compiled the ultimate list...',
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
            upvotes: 8234,
            comments: 445,
            awards: 25,
            shares: 892,
            viral: true,
            isPremium: true,
            tags: ['Digital Nomad', 'Remote Work', 'Premium']
        }
    ];

    useEffect(() => {
        setPosts(mockPosts);
    }, [activeFilter]);

    return (
        <div className="popular-feed-container">
            {/* Header */}
            <div className="popular-header">
                <div className="popular-title">
                    <TrendingUp size={32} className="popular-icon" />
                    <div>
                        <h1>Popular</h1>
                        <p>Trending travel stories and experiences from around the world</p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="popular-filters">
                <div className="filter-tabs">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                            title={filter.description}
                        >
                            <filter.icon size={18} />
                            <span>{filter.label}</span>
                        </button>
                    ))}
                </div>
                <div className="view-toggle">
                    <button
                        className={viewMode === 'card' ? 'active' : ''}
                        onClick={() => setViewMode('card')}
                        title="Card view"
                    >
                        <BarChart3 size={18} />
                    </button>
                    <button
                        className={viewMode === 'compact' ? 'active' : ''}
                        onClick={() => setViewMode('compact')}
                        title="Compact view"
                    >
                        <Clock size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="popular-content-wrap">
                {/* Posts Feed */}
                <div className="posts-feed">
                    {posts.map(post => (
                        <TrendingPostCard
                            key={post.id}
                            post={post}
                            viewMode={viewMode}
                        />
                    ))}

                    {/* Load More */}
                    <div className="load-more">
                        <button className="load-more-btn">
                            <TrendingUp size={20} />
                            Load More Trending Posts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularFeed;
