import React from 'react';
import { Plus } from 'lucide-react';

const StoriesRail = ({ stories }) => {
    return (
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
    );
};

export default StoriesRail;
