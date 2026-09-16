import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Radio, 
    Users, 
    Flame, 
    MessageSquare, 
    Send, 
    Heart, 
    Share2, 
    Volume2, 
    VolumeX, 
    Maximize2, 
    Sparkles, 
    MapPin, 
    Zap, 
    Plane, 
    ShieldAlert, 
    Headphones,
    CheckCircle2,
    Eye
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../styles/LiveFeed.css';

const LIVE_STREAMS = [
    {
        id: 'stream-1',
        title: 'Sunset Coworking & Visa Q&A from Canggu Dojo 🌴',
        host: 'Alex Nomad',
        hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        handle: '@alexplorer',
        location: 'Canggu, Bali',
        viewers: '1,842',
        cover: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
        tags: ['Bali', 'Coworking', 'VisaAMA', 'FiberWifi'],
        badge: 'Featured Host'
    },
    {
        id: 'stream-2',
        title: 'Exploring Shinjuku Night Alleyways & Nomad Cafes 🍜',
        host: 'Miki Tanaka',
        hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        handle: '@mikitravels',
        location: 'Tokyo, Japan',
        viewers: '930',
        cover: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200',
        tags: ['Tokyo', 'NightWalk', 'JapanNomad'],
        badge: 'Superhost'
    }
];

const LIVE_ROOMS = [
    {
        id: 'room-1',
        title: 'Spain Digital Nomad Visa 2026: Tax Breakdown',
        host: 'Elena Rostova & Marc Puig',
        listeners: 248,
        activeSpeakers: 3,
        avatars: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
        ],
        category: 'Legal & Tax'
    },
    {
        id: 'room-2',
        title: 'Lo-Fi Focus & Deep Work Session (Lisbon Hub)',
        host: 'Nomad Chill Room',
        listeners: 142,
        activeSpeakers: 1,
        avatars: [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
        ],
        category: 'Coworking'
    }
];

const INITIAL_MESSAGES = [
    { id: 1, user: 'Sarah_T', text: 'How fast is the wifi at that rooftop cafe?', time: 'just now', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah' },
    { id: 2, user: 'LeoDev', text: '320 Mbps down, tested it yesterday! Zero packet loss 🔥', time: '1m ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=leo' },
    { id: 3, user: 'Marcus_Nx', text: 'Is the co-living pool open after 8 PM?', time: '2m ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus' },
    { id: 4, user: 'Clara_W', text: 'Joining in 10 mins, bringing my laptop! 💻', time: '3m ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clara' }
];

const LIVE_CHECKINS = [
    { id: 'c1', user: 'Liam V.', location: 'Selina Secret Garden, Lisbon', action: 'Checked into Nomad Dorm', time: '1m ago', flag: '🇵🇹' },
    { id: 'c2', user: 'Chloe K.', location: 'Canggu Beach Club, Bali', action: 'Sunset Coworking session', time: '3m ago', flag: '🇮🇩' },
    { id: 'c3', user: 'David M.', location: 'WeWork Medellin Poblado', action: 'Speed test: 450 Mbps fiber', time: '6m ago', flag: '🇨🇴' },
    { id: 'c4', user: 'Yuki S.', location: 'Shibuya Crossing Hub, Tokyo', action: 'Coffee & Code meetup', time: '11m ago', flag: '🇯🇵' }
];

const LiveFeed = () => {
    const { addToast } = useToastStore();
    const [activeStreamIndex, setActiveStreamIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [chatMessages, setChatMessages] = useState(INITIAL_MESSAGES);
    const [newChatText, setNewChatText] = useState('');
    const [reactions, setReactions] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(null);

    const currentStream = LIVE_STREAMS[activeStreamIndex];

    // Periodic live chat simulator
    useEffect(() => {
        const interval = setInterval(() => {
            const randomComments = [
                { user: 'NomadMax', text: 'This stream is pure vibes ✨', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=max' },
                { user: 'TravelBug', text: 'What camera rig are you using?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bug' },
                { user: 'Sofia_Dev', text: 'Santorini vs Bali for October? Thoughts?', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia' },
                { user: 'Lucas_X', text: 'The nomad community in Lisbon is unreal right now.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucas' }
            ];
            const pick = randomComments[Math.floor(Math.random() * randomComments.length)];
            setChatMessages(prev => [...prev.slice(-15), {
                id: Date.now(),
                user: pick.user,
                text: pick.text,
                time: 'just now',
                avatar: pick.avatar
            }]);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newChatText.trim()) return;
        const msg = {
            id: Date.now(),
            user: 'You',
            text: newChatText.trim(),
            time: 'just now',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        };
        setChatMessages(prev => [...prev, msg]);
        setNewChatText('');
        addToast('Live message broadcasted!', 'success');
    };

    const handleReaction = (emoji) => {
        const id = Math.random();
        setReactions(prev => [...prev, { id, emoji, x: Math.random() * 80 + 10 }]);
        setTimeout(() => {
            setReactions(prev => prev.filter(r => r.id !== id));
        }, 2000);
    };

    const handleJoinRoom = (room) => {
        if (joinedRoom === room.id) {
            setJoinedRoom(null);
            addToast(`Left audio space: ${room.title}`, 'info');
        } else {
            setJoinedRoom(room.id);
            addToast(`Connected to audio space: ${room.title}`, 'success');
        }
    };

    return (
        <div className="live-feed-container">
            {/* Live Ticker Bar */}
            <div className="live-hero-ticker">
                <div className="live-status-pill">
                    <span className="live-radar-dot" />
                    <span className="live-label">LIVE RADAR</span>
                </div>
                <div className="live-ticker-text">
                    <span className="ticker-highlight">2,840 nomads active now</span> across 42 hubs • 3 live streams streaming • 4 audio lounges open
                </div>
            </div>

            {/* Main Featured Live Stream Player Card */}
            <div className="live-player-card">
                <div className="live-media-wrapper">
                    <img 
                        src={currentStream.cover} 
                        alt={currentStream.title} 
                        className="live-video-cover" 
                    />
                    <div className="live-video-gradient" />

                    {/* Top overlay controls */}
                    <div className="live-media-top-bar">
                        <div className="live-stream-badge">
                            <Radio size={14} className="animate-pulse" />
                            <span>LIVE</span>
                        </div>
                        <div className="live-viewers-count">
                            <Eye size={13} />
                            <span>{currentStream.viewers} watching</span>
                        </div>
                        <button 
                            className="live-audio-toggle-btn"
                            onClick={() => setIsMuted(!isMuted)}
                            title={isMuted ? 'Unmute Live Audio' : 'Mute Live Audio'}
                            aria-label="Toggle live audio"
                        >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                    </div>

                    {/* Floating animated reactions */}
                    <div className="floating-reactions-area" aria-hidden="true">
                        <AnimatePresence>
                            {reactions.map(r => (
                                <motion.span
                                    key={r.id}
                                    className="floating-reaction"
                                    style={{ left: `${r.x}%` }}
                                    initial={{ opacity: 0, y: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, y: -120, scale: 1.3 }}
                                    exit={{ opacity: 0, y: -160, scale: 1 }}
                                    transition={{ duration: 1.8, ease: 'easeOut' }}
                                >
                                    {r.emoji}
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="live-media-bottom-info">
                        <div className="live-host-row">
                            <img src={currentStream.hostAvatar} alt={currentStream.host} className="live-host-avatar" />
                            <div className="live-host-meta">
                                <div className="live-host-name-row">
                                    <span className="live-host-name">{currentStream.host}</span>
                                    <span className="live-host-verified">
                                        <CheckCircle2 size={13} className="text-blue-400" />
                                    </span>
                                    <span className="live-host-handle">{currentStream.handle}</span>
                                </div>
                                <div className="live-location-tag">
                                    <MapPin size={12} />
                                    <span>{currentStream.location}</span>
                                </div>
                            </div>
                            <button 
                                className="live-follow-btn"
                                onClick={() => addToast(`Following ${currentStream.host}!`, 'success')}
                            >
                                Follow
                            </button>
                        </div>
                        <h3 className="live-stream-title">{currentStream.title}</h3>
                        <div className="live-tag-row">
                            {currentStream.tags.map(tag => (
                                <span key={tag} className="live-chip">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Channel Switcher */}
                <div className="live-channel-switcher">
                    <span className="switcher-label">Switch Stream:</span>
                    {LIVE_STREAMS.map((s, idx) => (
                        <button
                            key={s.id}
                            className={`channel-pill ${activeStreamIndex === idx ? 'active' : ''}`}
                            onClick={() => setActiveStreamIndex(idx)}
                        >
                            <span className="channel-dot" />
                            {s.host} ({s.location.split(',')[0]})
                        </button>
                    ))}
                </div>

                {/* Live Stream Interactions Bar */}
                <div className="live-stream-actions-bar">
                    <div className="reaction-triggers">
                        <button className="react-btn" onClick={() => handleReaction('❤️')} title="Send Love">
                            ❤️
                        </button>
                        <button className="react-btn" onClick={() => handleReaction('🔥')} title="Send Fire">
                            🔥
                        </button>
                        <button className="react-btn" onClick={() => handleReaction('👏')} title="Applause">
                            👏
                        </button>
                        <button className="react-btn" onClick={() => handleReaction('🏄')} title="Send Vibe">
                            🏄
                        </button>
                        <button className="react-btn" onClick={() => handleReaction('☕')} title="Buy Coffee">
                            ☕
                        </button>
                    </div>

                    <button 
                        className="share-stream-btn"
                        onClick={() => {
                            navigator.clipboard?.writeText(window.location.href);
                            addToast('Live stream link copied to clipboard!', 'success');
                        }}
                    >
                        <Share2 size={14} />
                        <span>Share Stream</span>
                    </button>
                </div>

                {/* Live Chat Stream Box */}
                <div className="live-chat-box">
                    <div className="live-chat-header">
                        <div className="flex items-center gap-2">
                            <MessageSquare size={14} className="text-blue-400" />
                            <span className="chat-title">Live Nomad Chat</span>
                        </div>
                        <span className="chat-subtitle">Slow mode (3s)</span>
                    </div>

                    <div className="live-chat-messages">
                        {chatMessages.map(msg => (
                            <div key={msg.id} className="chat-msg-row">
                                <img src={msg.avatar} alt={msg.user} className="chat-user-avatar" />
                                <div className="chat-bubble">
                                    <div className="chat-user-meta">
                                        <span className="chat-username">{msg.user}</span>
                                        <span className="chat-time">{msg.time}</span>
                                    </div>
                                    <p className="chat-text">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className="live-chat-input-form" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Send a live message to the nomad community..."
                            value={newChatText}
                            onChange={(e) => setNewChatText(e.target.value)}
                            className="live-chat-input"
                        />
                        <button type="submit" className="live-send-btn" disabled={!newChatText.trim()}>
                            <Send size={15} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Live Audio Lounges / Spaces */}
            <div className="live-section-card">
                <div className="live-section-header">
                    <div className="flex items-center gap-2">
                        <Headphones size={18} className="text-purple-400" />
                        <h4 className="section-title">Live Nomad Audio Spaces</h4>
                    </div>
                    <span className="section-badge">Tune In</span>
                </div>

                <div className="audio-spaces-grid">
                    {LIVE_ROOMS.map(room => {
                        const isThisJoined = joinedRoom === room.id;
                        return (
                            <div key={room.id} className={`audio-space-card ${isThisJoined ? 'joined' : ''}`}>
                                <div className="audio-space-top">
                                    <span className="audio-category-pill">{room.category}</span>
                                    <div className="audio-live-pill">
                                        <span className="live-radar-dot" />
                                        <span>LIVE TALK</span>
                                    </div>
                                </div>
                                <h5 className="audio-room-title">{room.title}</h5>
                                <div className="audio-speakers-row">
                                    <div className="speaker-avatars">
                                        {room.avatars.map((av, i) => (
                                            <img key={i} src={av} alt="Speaker" className="speaker-avatar" />
                                        ))}
                                    </div>
                                    <span className="audio-host-name">Hosted by {room.host}</span>
                                </div>
                                <div className="audio-footer">
                                    <span className="audio-listeners">
                                        <Users size={13} /> {room.listeners} listening
                                    </span>
                                    <button 
                                        className={`audio-join-btn ${isThisJoined ? 'active' : ''}`}
                                        onClick={() => handleJoinRoom(room)}
                                    >
                                        {isThisJoined ? 'Leave Space' : 'Join Audio'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Real-Time Live Check-Ins Radar */}
            <div className="live-section-card">
                <div className="live-section-header">
                    <div className="flex items-center gap-2">
                        <Zap size={18} className="text-amber-400" />
                        <h4 className="section-title">Real-Time Global Nomad Check-Ins</h4>
                    </div>
                    <span className="section-badge">Live Ticker</span>
                </div>

                <div className="checkins-list">
                    {LIVE_CHECKINS.map(c => (
                        <div key={c.id} className="checkin-item">
                            <span className="checkin-flag">{c.flag}</span>
                            <div className="checkin-info">
                                <span className="checkin-user">{c.user}</span>
                                <span className="checkin-action">{c.action}</span>
                                <span className="checkin-location">📍 {c.location}</span>
                            </div>
                            <span className="checkin-time">{c.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveFeed;
