import React from 'react';
import { Activity } from 'lucide-react';

const FeedTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="feed-header">
            <div className="nexus-branding">
                <span className="nexus-text">NEXUS</span>
                <span className="nexus-version">4</span>
            </div>
            
            <div className="feed-tabs">
                <button
                    className={`feed-tab nexus ${activeTab === 'nexus' ? 'active' : ''}`}
                    onClick={() => setActiveTab('nexus')}
                >
                    <Activity size={14} className="nexus-pulse-icon" />
                    Nexus
                </button>
                <button
                    className={`feed-tab ${activeTab === 'challenges' ? 'active' : ''}`}
                    onClick={() => setActiveTab('challenges')}
                >
                    Challenges
                </button>
                <button
                    className={`feed-tab ${activeTab === 'visuals' ? 'active' : ''}`}
                    onClick={() => setActiveTab('visuals')}
                >
                    📸 Visuals
                </button>
                <button
                    className={`feed-tab ${activeTab === 'shorts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('shorts')}
                >
                    Shorts
                </button>
                <button
                    className={`feed-tab ${activeTab === 'pulse' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pulse')}
                >
                    Pulse
                </button>
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
                    className={`feed-tab ${activeTab === 'trending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trending')}
                >
                    Trending
                </button>
                <button
                    className={`feed-tab ${activeTab === 'latest' ? 'active' : ''}`}
                    onClick={() => setActiveTab('latest')}
                >
                    Latest
                </button>
                <button
                    className={`feed-tab ${activeTab === 'nearby' ? 'active' : ''}`}
                    onClick={() => setActiveTab('nearby')}
                >
                    Nearby
                </button>
                <button
                    className={`feed-tab ${activeTab === 'exchange' ? 'active' : ''}`}
                    onClick={() => setActiveTab('exchange')}
                >
                    Exchange
                </button>
            </div>
        </div>
    );
};

export default FeedTabs;
