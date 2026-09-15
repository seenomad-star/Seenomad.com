import React, { useState } from 'react';
import {
    Heart,
    MessageCircle,
    Share2,
    Repeat2,
    MoreHorizontal,
    MapPin,
    Globe,
    Sparkles,
    Image as ImageIcon,
    Smile,
    BarChart2,
    Calendar,
    Bookmark,
    Plus
} from 'lucide-react';
import '../styles/SocialFeed.css';

const SocialFeed = () => {
    const [activeTab, setActiveTab] = useState('foryou');

    const stories = [
        { id: 0, username: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', isUser: true },
        { id: 1, username: 'emma_j', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', hasStory: true },
        { id: 2, username: 'alex_k', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', hasStory: true },
        { id: 3, username: 'sarah_m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', hasStory: true },
        { id: 4, username: 'mike_r', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', hasStory: true },
        { id: 5, username: 'lisa_p', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150', hasStory: true },
    ];

    const posts = [
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
        {
            id: 3,
            author: 'Sarah M.',
            username: '@sarah_travels',
            time: '5h',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
            content: 'Does anyone have recommendations for hidden gems in Kyoto? Looking for places away from the main tourist crowds. 🎋',
            likes: 156,
            comments: 23,
            shares: 5,
            views: '3K'
        }
    ];

    return (
        <div className="social-feed-container">
            {/* Header / Tabs */}
            <div className="feed-header">
                <div className="feed-tabs">
                    <button
                        className={`feed-tab ${activeTab === 'foryou' ? 'active' : ''}`}
                        onClick={() => setActiveTab('foryou')}
                    >
                        For You
                    </button>
                    <button
                        className={`feed-tab ${activeTab === 'following' ? 'active' : ''}`}
                        onClick={() => setActiveTab('following')}
                    >
                        Following
                    </button>
                    <button
                        className={`feed-tab ${activeTab === 'nearby' ? 'active' : ''}`}
                        onClick={() => setActiveTab('nearby')}
                    >
                        Nearby
                    </button>
                </div>
            </div>

            {/* Stories Rail */}
            <div className="stories-rail">
                {stories.map((story) => (
                    <div key={story.id} className="story-item">
                        <div className={`story-avatar-ring ${story.hasStory ? 'active' : ''}`}>
                            <img src={story.avatar} alt={story.username} className="story-avatar" />
                            {story.isUser && (
                                <div className="story-add-btn">
                                    <Plus size={12} />
                                </div>
                            )}
                        </div>
                        <span className="story-username">{story.username}</span>
                    </div>
                ))}
            </div>

            {/* Create Post (Composer) */}
            <div className="composer-container">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="You" className="composer-avatar" />
                <div className="composer-content">
                    <input
                        type="text"
                        placeholder="What is happening?!"
                        className="composer-input"
                    />
                    <div className="composer-actions">
                        <div className="composer-tools">
                            <button className="tool-btn"><ImageIcon size={18} /></button>
                            <button className="tool-btn"><Sparkles size={18} /></button>
                            <button className="tool-btn"><BarChart2 size={18} /></button>
                            <button className="tool-btn"><Smile size={18} /></button>
                            <button className="tool-btn"><Calendar size={18} /></button>
                            <button className="tool-btn"><MapPin size={18} /></button>
                        </div>
                        <button className="post-submit-btn">Post</button>
                    </div>
                </div>
            </div>

            {/* Feed Stream */}
            <div className="feed-stream">
                {posts.map(post => (
                    <div key={post.id} className="stream-post">
                        <div className="post-left">
                            <img src={post.avatar} alt={post.author} className="post-avatar" />
                        </div>
                        <div className="post-right">
                            <div className="post-meta">
                                <span className="post-author-name">{post.author}</span>
                                <span className="post-author-handle">{post.username}</span>
                                <span className="post-dot">·</span>
                                <span className="post-time">{post.time}</span>
                                <button className="post-more-btn">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>

                            <div className="post-content-text">
                                {post.content}
                            </div>

                            {post.image && (
                                <div className="post-media">
                                    <img src={post.image} alt="Post content" />
                                </div>
                            )}

                            <div className="post-interactions">
                                <button className="interaction-btn reply">
                                    <MessageCircle size={18} />
                                    <span>{post.comments}</span>
                                </button>
                                <button className="interaction-btn repost">
                                    <Repeat2 size={18} />
                                    <span>{post.shares}</span>
                                </button>
                                <button className="interaction-btn like">
                                    <Heart size={18} />
                                    <span>{post.likes}</span>
                                </button>
                                <button className="interaction-btn view">
                                    <BarChart2 size={18} />
                                    <span>{post.views}</span>
                                </button>
                                <div className="interaction-spacer"></div>
                                <button className="interaction-btn share">
                                    <Bookmark size={18} />
                                </button>
                                <button className="interaction-btn share">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SocialFeed;
