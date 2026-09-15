import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, DollarSign, AlertTriangle, Check, CheckCheck, X, Briefcase, MapPin, Zap } from 'lucide-react';
import './NotificationCenter.css';

const NOTIFICATIONS = [
    {
        id: 1, category: 'social', read: false, time: '2m',
        icon: Heart, iconColor: '#f43f5e', iconBg: 'rgba(244,63,94,0.12)',
        title: 'Emma J. liked your post',
        body: '"Golden hour in Santorini is unmatched..." got 24 new likes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        actions: ['View Post'],
    },
    {
        id: 2, category: 'social', read: false, time: '15m',
        icon: MessageCircle, iconColor: '#3b82f6', iconBg: 'rgba(59,130,246,0.12)',
        title: 'Alex K. commented on your Short',
        body: '"Incredible shot! Which camera did you use?"',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        actions: ['Reply', 'View'],
    },
    {
        id: 3, category: 'earnings', read: false, time: '1h',
        icon: DollarSign, iconColor: '#10b981', iconBg: 'rgba(16,185,129,0.12)',
        title: 'You received a tip! 🎉',
        body: 'Marcus Chen tipped you 50 Nomad Coins for your travel guide.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
        actions: ['View Wallet'],
    },
    {
        id: 4, category: 'alerts', read: true, time: '3h',
        icon: AlertTriangle, iconColor: '#f59e0b', iconBg: 'rgba(245,158,11,0.12)',
        title: 'Travel Alert: Bali',
        body: 'New entry requirements effective April 1st. Visa-on-arrival extended to 60 days.',
        avatar: null,
        actions: ['Read More', 'Dismiss'],
    },
    {
        id: 5, category: 'social', read: true, time: '5h',
        icon: Zap, iconColor: '#8b5cf6', iconBg: 'rgba(139,92,246,0.12)',
        title: 'Challenge completed! 🏆',
        body: 'You earned the "Island Hopper" badge and 500 XP.',
        avatar: null,
        actions: ['View Badge'],
    },
    {
        id: 6, category: 'earnings', read: false, time: '6h',
        icon: Briefcase, iconColor: '#06b6d4', iconBg: 'rgba(6,182,212,0.12)',
        title: 'New gig match: Remote Dev',
        body: 'A client is looking for a React developer in Bali — your skills match!',
        avatar: null,
        actions: ['Apply Now', 'Skip'],
    },
    {
        id: 7, category: 'alerts', read: true, time: '1d',
        icon: MapPin, iconColor: '#f43f5e', iconBg: 'rgba(244,63,94,0.12)',
        title: 'Nomad Meetup near you!',
        body: '12 nomads are gathering at Canggu Beach Club tonight at 7pm.',
        avatar: null,
        actions: ["I'm In", 'Maybe Later'],
    },
];

const CATS = ['all', 'social', 'alerts', 'earnings'];

const NotificationCenter = () => {
    const [notes, setNotes] = useState(NOTIFICATIONS);
    const [activeTab, setActiveTab] = useState('all');

    const unread = notes.filter(n => !n.read).length;

    const markAllRead = () => setNotes(prev => prev.map(n => ({ ...n, read: true })));
    const dismiss = (id) => setNotes(prev => prev.filter(n => n.id !== id));
    const markRead = (id) => setNotes(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

    const filtered = notes.filter(n => activeTab === 'all' || n.category === activeTab);

    return (
        <div className="notif-center">
            {/* Header */}
            <div className="nc-header">
                <div className="nc-header-left">
                    <Bell size={22} className="nc-bell-icon" />
                    <h2>Notifications</h2>
                    {unread > 0 && <span className="nc-unread-badge">{unread}</span>}
                </div>
                {unread > 0 && (
                    <button className="nc-mark-all" onClick={markAllRead}>
                        <CheckCheck size={14} /> Mark all read
                    </button>
                )}
            </div>

            {/* Category Tabs */}
            <div className="nc-tabs">
                {CATS.map(cat => {
                    const count = notes.filter(n => !n.read && (cat === 'all' || n.category === cat)).length;
                    return (
                        <button
                            key={cat}
                            className={`nc-tab ${activeTab === cat ? 'active' : ''} nc-tab--${cat}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            {count > 0 && <span className="nc-tab-count">{count}</span>}
                        </button>
                    );
                })}
            </div>

            {/* Notification List */}
            <div className="nc-list">
                {filtered.length === 0 && (
                    <div className="nc-empty">
                        <Bell size={40} opacity={0.2} />
                        <p>All caught up!</p>
                    </div>
                )}
                {filtered.map((note, i) => {
                    const IconComponent = note.icon;
                    return (
                        <div
                            key={note.id}
                            className={`nc-card nc-card--${note.category} ${note.read ? 'read' : ''}`}
                            style={{ animationDelay: `${i * 0.05}s` }}
                            onClick={() => markRead(note.id)}
                        >
                            <div className="nc-card-icon-col">
                                {note.avatar ? (
                                    <div className="nc-avatar-wrap">
                                        <img src={note.avatar} alt="" className="nc-avatar" />
                                        <div className="nc-icon-badge" style={{ background: note.iconBg, color: note.iconColor }}>
                                            <IconComponent size={10} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="nc-icon-solo" style={{ background: note.iconBg, color: note.iconColor }}>
                                        <IconComponent size={20} />
                                    </div>
                                )}
                            </div>
                            <div className="nc-card-body">
                                <div className="nc-card-top">
                                    <span className="nc-card-title">{note.title}</span>
                                    <span className="nc-card-time">{note.time}</span>
                                </div>
                                <p className="nc-card-text">{note.body}</p>
                                <div className="nc-card-actions">
                                    {note.actions.map(action => (
                                        <button key={action} className="nc-action-btn" onClick={e => e.stopPropagation()}>
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {!note.read && <div className="nc-unread-dot" />}
                            <button className="nc-dismiss" onClick={e => { e.stopPropagation(); dismiss(note.id); }}>
                                <X size={14} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationCenter;
