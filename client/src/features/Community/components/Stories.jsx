import React, { useState } from 'react';
import {
    Plus,
    Eye,
    MapPin,
    Clock,
    ChevronRight,
    Users
} from 'lucide-react';

const Stories = () => {
    const [stories, setStories] = useState([
        {
            id: 'my-story',
            type: 'add',
            label: 'Your Story',
            avatar: 'JD'
        },
        {
            id: 1,
            type: 'story',
            user: 'Elena R.',
            avatar: 'ER',
            location: 'Santorini',
            isLive: true,
            hasUnseen: true
        },
        {
            id: 2,
            type: 'story',
            user: 'Marco C.',
            avatar: 'MC',
            location: 'Kyoto',
            isLive: false,
            hasUnseen: true
        },
        {
            id: 3,
            type: 'story',
            user: 'Sarah J.',
            avatar: 'SJ',
            location: 'Swiss Alps',
            isLive: false,
            hasUnseen: false
        },
        {
            id: 4,
            type: 'story',
            user: 'Alex N.',
            avatar: 'AN',
            location: 'Bali',
            isLive: true,
            hasUnseen: true
        }
    ]);

    const activeStories = [
        {
            id: 101,
            user: "Elena Rodriguez",
            avatar: "ER",
            location: "Oia Sunset Point",
            time: "14m ago",
            views: "1.2k",
            content: "The crowd is worth it for this view! 🌅",
            image: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="stories-module">
            {/* Top Stories Row */}
            <div className="stories-tray">
                {stories.map(story => (
                    <div key={story.id} className={`story-circle-container ${story.hasUnseen ? 'unseen' : ''} ${story.isLive ? 'live' : ''}`}>
                        <div className="story-circle">
                            {story.type === 'add' ? (
                                <div className="add-story-btn">
                                    <Plus size={20} />
                                </div>
                            ) : (
                                <div className="story-avatar">{story.avatar}</div>
                            )}
                        </div>
                        <span className="story-label">{story.label || story.user}</span>
                        {story.isLive && <div className="live-badge">LIVE</div>}
                    </div>
                ))}
            </div>

            {/* Active Story Viewer Simulation */}
            <div className="story-viewer-preview">
                {activeStories.map(story => (
                    <div key={story.id} className="story-card-active">
                        <div className="story-progress-bars">
                            <div className="progress-bar active"><div className="fill" style={{ width: '60%' }}></div></div>
                            <div className="progress-bar"></div>
                            <div className="progress-bar"></div>
                        </div>

                        <div className="story-header">
                            <div className="story-user-info">
                                <div className="story-avatar-small">{story.avatar}</div>
                                <div className="story-meta-info">
                                    <span className="story-username">{story.user}</span>
                                    <span className="story-time">{story.time}</span>
                                </div>
                            </div>
                            <div className="story-location-tag">
                                <MapPin size={12} />
                                <span>{story.location}</span>
                            </div>
                        </div>

                        <div className="story-content-main">
                            <img src={story.image} alt="Story content" />
                            <div className="story-caption-overlay">
                                <p>{story.content}</p>
                            </div>
                        </div>

                        <div className="story-footer">
                            <div className="view-count-loop">
                                <Eye size={16} />
                                <span>{story.views} viewed your story</span>
                                <div className="viewer-avatars">
                                    <div className="v-avatar"></div>
                                    <div className="v-avatar"></div>
                                    <div className="v-avatar"></div>
                                    <span className="more-viewers">+1.1k</span>
                                </div>
                            </div>
                            <button className="story-reply-btn">Send a message...</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FOMO Section */}
            <div className="story-fomo-section">
                <h3>Don't Miss Out</h3>
                <div className="fomo-grid">
                    <div className="fomo-card">
                        <div className="fomo-icon"><Clock size={20} /></div>
                        <div className="fomo-info">
                            <h4>Flash Drop in 2h</h4>
                            <p>Exclusive itinerary by @elena_r</p>
                        </div>
                        <ChevronRight size={16} />
                    </div>
                    <div className="fomo-card">
                        <div className="fomo-icon"><Users size={20} /></div>
                        <div className="fomo-info">
                            <h4>Community Goal</h4>
                            <p>98% reached for Group Discount</p>
                        </div>
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stories;
