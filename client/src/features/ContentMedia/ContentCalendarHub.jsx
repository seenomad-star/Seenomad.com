import React, { useState } from 'react';
import {
    Calendar,
    Plus,
    Clock,
    CheckCircle2,
    Video,
    Camera,
    FileText,
    Mic,
    Sparkles,
    ArrowUpRight
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const INITIAL_SCHEDULE = [
    {
        id: 'cal-1',
        day: 'Mon',
        date: 'Oct 12',
        title: 'Lisbon Fiber Cafes 9:16 Reel',
        channel: 'Reels & Shorts',
        time: '10:00 AM',
        status: 'Scheduled',
        type: 'video'
    },
    {
        id: 'cal-2',
        day: 'Tue',
        date: 'Oct 13',
        title: 'Bali Ulun Danu Sunrise Photo Essay',
        channel: 'Photography Hub',
        time: '02:30 PM',
        status: 'Scheduled',
        type: 'photo'
    },
    {
        id: 'cal-3',
        day: 'Wed',
        date: 'Oct 14',
        title: 'EP 105: Spain Digital Nomad Tax Q&A',
        channel: 'Nomad Podcast',
        time: '09:00 AM',
        status: 'Draft',
        type: 'audio'
    },
    {
        id: 'cal-4',
        day: 'Thu',
        date: 'Oct 15',
        title: '30-Day Chiang Mai Cost Breakdown Carousel',
        channel: 'Community Feed',
        time: '04:00 PM',
        status: 'Scheduled',
        type: 'guide'
    },
    {
        id: 'cal-5',
        day: 'Fri',
        date: 'Oct 16',
        title: 'Porto Ribeira Golden Hour Preset Drop',
        channel: 'Creator Storefront',
        time: '11:30 AM',
        status: 'Ready',
        type: 'photo'
    },
    {
        id: 'cal-6',
        day: 'Sat',
        date: 'Oct 17',
        title: 'Live Weekend Itinerary Review Session',
        channel: 'Live Stream',
        time: '06:00 PM',
        status: 'Scheduled',
        type: 'video'
    },
    {
        id: 'cal-7',
        day: 'Sun',
        date: 'Oct 18',
        title: 'Weekly Nomad Pulse Newsletter',
        channel: 'Subscribers',
        time: '08:00 AM',
        status: 'Ready',
        type: 'guide'
    }
];

const ContentCalendarHub = () => {
    const { addToast } = useToastStore();
    const [items, setItems] = useState(INITIAL_SCHEDULE);
    const [newTitle, setNewTitle] = useState('');
    const [selectedDay, setSelectedDay] = useState('Mon');

    const handleAddSlot = (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        const created = {
            id: `cal-${Date.now()}`,
            day: selectedDay,
            date: 'Upcoming',
            title: newTitle.trim(),
            channel: 'Multi-Channel Auto-Post',
            time: '12:00 PM',
            status: 'Scheduled',
            type: 'photo'
        };
        setItems([created, ...items]);
        setNewTitle('');
        addToast(`Scheduled "${created.title}" for ${selectedDay}`, 'success');
    };

    return (
        <div className="cm-photography-view">
            <div className="cm-photo-hero-header">
                <div className="cm-photo-title-group">
                    <div className="cm-photo-pink-icon emerald-tone">
                        <Calendar size={24} strokeWidth={2.2} />
                    </div>
                    <div>
                        <h1>Creator Content Calendar</h1>
                        <p>Plan, schedule, and auto-publish your travel photography, reels, podcasts, and guides</p>
                    </div>
                </div>
            </div>

            {/* Quick Schedule Bar */}
            <form className="cm-calendar-quick-form" onSubmit={handleAddSlot}>
                <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    aria-label="Select day of week"
                >
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Add a new post, reel, or photo drop to your calendar..."
                />
                <button type="submit" className="cm-upload-shot-btn">
                    <Plus size={16} />
                    <span>Schedule Post</span>
                </button>
            </form>

            {/* 7-Day Editorial Board */}
            <div className="cm-calendar-grid">
                {items.map((item) => (
                    <div key={item.id} className="cm-calendar-card">
                        <div className="cm-cal-card-top">
                            <div className="cm-cal-day-badge">
                                <strong>{item.day}</strong>
                                <span>{item.date}</span>
                            </div>
                            <span className={`cm-cal-status ${item.status.toLowerCase()}`}>
                                {item.status}
                            </span>
                        </div>

                        <h3>{item.title}</h3>

                        <div className="cm-cal-meta">
                            <span>{item.channel}</span>
                            <span>·</span>
                            <span>
                                <Clock size={12} /> {item.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentCalendarHub;
