import React, { useState } from 'react';
import {
    Mic,
    Play,
    Pause,
    Clock,
    Headphones,
    Bookmark,
    Share2,
    Sparkles,
    Volume2,
    Radio
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const EPISODES = [
    {
        id: 'ep-104',
        number: 'EP 104',
        title: 'Inside Lisbon’s Tech & Surf Renaissance: Cost of Living, Tax Rules & Best Barrios',
        host: 'Alex Rivera & Elena Rodriguez',
        duration: '42:18',
        listens: '18.4K',
        category: 'City Deep Dive',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&auto=format&fit=crop&q=80',
        summary: 'We break down neighborhood rents in Principe Real vs. Alfama, fiber reliability, and how to build your local crew in 7 days.'
    },
    {
        id: 'ep-103',
        number: 'EP 103',
        title: 'How Solo Travel Creators Monetize $10K/Month Without Burning Out',
        host: 'Marco Chen & Sofia Laurent',
        duration: '51:05',
        listens: '24.1K',
        category: 'Creator Economy',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&auto=format&fit=crop&q=80',
        summary: 'Combining digital playbooks, brand retainers, and automated affiliate funnels while traveling slow across Southeast Asia.'
    },
    {
        id: 'ep-102',
        number: 'EP 102',
        title: 'The 2026 Global Digital Nomad Visa Playbook: Spain, Japan, Thailand DTV & Italy',
        host: 'SeeNomad Legal Desk',
        duration: '38:40',
        listens: '31.9K',
        category: 'Visas & Tax',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&auto=format&fit=crop&q=80',
        summary: 'Step-by-step income thresholds, consulate wait times, and Schengen 90/180 legal strategies.'
    },
    {
        id: 'ep-101',
        number: 'EP 101',
        title: 'High-Altitude Remote Work: Why the Dolomites & Swiss Alps Are Trending',
        host: 'Lukas Weber',
        duration: '34:12',
        listens: '12.7K',
        category: 'Slow Travel',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
        summary: 'Mountain coliving chalets, Starlink trail setups, and off-season pass hacks for summer and winter.'
    }
];

const PodcastsHub = () => {
    const { addToast } = useToastStore();
    const [playingId, setPlayingId] = useState('ep-104');
    const [isPlaying, setIsPlaying] = useState(false);

    const activeEpisode = EPISODES.find((e) => e.id === playingId) || EPISODES[0];

    const handleTogglePlay = (id) => {
        if (playingId === id) {
            setIsPlaying(!isPlaying);
        } else {
            setPlayingId(id);
            setIsPlaying(true);
        }
    };

    return (
        <div className="cm-photography-view">
            {/* Header */}
            <div className="cm-photo-hero-header">
                <div className="cm-photo-title-group">
                    <div className="cm-photo-pink-icon purple-tone">
                        <Mic size={24} strokeWidth={2.2} />
                    </div>
                    <div>
                        <h1>Nomad Podcasts & Audio Dispatches</h1>
                        <p>Deep-dive conversations with global remote workers, founders & travel creators</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="cm-upload-shot-btn"
                    onClick={() => addToast('RSS Feed link copied to clipboard!', 'info')}
                >
                    <Radio size={16} />
                    <span>Subscribe RSS</span>
                </button>
            </div>

            {/* Featured Now Playing Banner */}
            <div className="cm-podcast-player-card">
                <img src={activeEpisode.image} alt={activeEpisode.title} className="cm-podcast-cover" />
                <div className="cm-podcast-player-body">
                    <div className="cm-podcast-badges">
                        <span className="cm-ep-pill">{activeEpisode.number} · NOW SELECTED</span>
                        <span className="cm-ep-cat">{activeEpisode.category}</span>
                    </div>
                    <h2>{activeEpisode.title}</h2>
                    <p>{activeEpisode.summary}</p>
                    <div className="cm-player-controls-row">
                        <button
                            type="button"
                            className="cm-play-primary-btn"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                            <span>{isPlaying ? 'Pause Episode' : 'Play Episode'}</span>
                        </button>
                        <div className="cm-waveform-bar">
                            <div className={`cm-waveform-progress ${isPlaying ? 'animating' : ''}`} />
                        </div>
                        <span className="cm-ep-duration">
                            <Clock size={13} /> {activeEpisode.duration}
                        </span>
                    </div>
                </div>
            </div>

            {/* Episodes List */}
            <div className="cm-episodes-grid">
                {EPISODES.map((ep) => {
                    const active = playingId === ep.id && isPlaying;
                    return (
                        <div key={ep.id} className={`cm-episode-card ${playingId === ep.id ? 'selected' : ''}`}>
                            <img src={ep.image} alt={ep.title} className="cm-ep-thumb" />
                            <div className="cm-ep-info">
                                <div className="cm-ep-meta-top">
                                    <span>{ep.number}</span>
                                    <span>·</span>
                                    <span>{ep.category}</span>
                                    <span>·</span>
                                    <span>{ep.duration}</span>
                                </div>
                                <h3>{ep.title}</h3>
                                <p>{ep.summary}</p>
                                <div className="cm-ep-footer">
                                    <span className="cm-ep-host">Hosted by {ep.host} · {ep.listens} listens</span>
                                    <button
                                        type="button"
                                        className={`cm-ep-play-btn ${active ? 'playing' : ''}`}
                                        onClick={() => handleTogglePlay(ep.id)}
                                    >
                                        {active ? <Pause size={14} /> : <Play size={14} />}
                                        <span>{active ? 'Playing' : 'Listen'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PodcastsHub;
