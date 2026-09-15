import React from 'react';
import { TrendingUp, Hash } from 'lucide-react';

const TrendingHeader = () => {
    const topics = [
        { tag: 'DigitalNomadBali', posts: '2.4K' },
        { tag: 'TokyoExploration', posts: '1.8K' },
        { tag: 'RemoteWork2026', posts: '5.2K' },
        { tag: 'MedellinTechScene', posts: '900' }
    ];

    return (
        <div className="trending-header">
            <div className="trending-title">
                <TrendingUp size={18} className="text-secondary" />
                <span>WHAT'S POPPING</span>
            </div>
            <div className="trending-topics">
                {topics.map(topic => (
                    <div key={topic.tag} className="topic-chip">
                        <Hash size={12} />
                        <span className="topic-name">{topic.tag}</span>
                        <span className="topic-count">{topic.posts}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingHeader;
