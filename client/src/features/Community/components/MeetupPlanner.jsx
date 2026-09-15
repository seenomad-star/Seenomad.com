import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    MapPin, Users, Clock, Coffee, Utensils, 
    Cpu, Zap, Calendar, Plus, ChevronRight 
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const MeetupPlanner = () => {
    const { mates, addXP } = useNomadOSStore();
    const [meetups, setMeetups] = useState([
        {
            id: 1,
            title: "Canggu Sunset Drinks",
            location: "The Lawn, Canggu",
            time: "Today, 17:30",
            category: "social",
            attendees: ["@bali_bree", "@nomad_nic", "@tech_alex"],
            isJoined: false
        },
        {
            id: 2,
            title: "Morning Co-working session",
            location: "Dojo Bali",
            time: "Tomorrow, 09:00",
            category: "work",
            attendees: ["@dev_marco", "@design_lily"],
            isJoined: true
        },
        {
            id: 3,
            title: "Traditional Dinner",
            location: "Ubud Central",
            time: "Friday, 19:00",
            category: "food",
            attendees: ["@culture_seeker"],
            isJoined: false
        }
    ]);

    const handleJoin = (id) => {
        setMeetups(meetups.map(m => {
            if (m.id === id) {
                const newJoined = !m.isJoined;
                if (newJoined) {
                    window.dispatchEvent(new CustomEvent('add-toast', { 
                        detail: { message: `Joined ${m.title}! +20 XP 🤝`, type: 'success' } 
                    }));
                    addXP(20);
                }
                return { ...m, isJoined: newJoined };
            }
            return m;
        }));
    };

    const getIcon = (cat) => {
        switch(cat) {
            case 'food': return <Utensils size={18} />;
            case 'work': return <Cpu size={18} />;
            default: return <Coffee size={18} />;
        }
    };

    return (
        <div className="mt-planner">
            <div className="bt-header">
                <div>
                    <h3 className="ach-section-title">Live Nomad Meetups (Pulse)</h3>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Meet with your mates and local nomads</p>
                </div>
                <button className="smt-contribute-btn">
                    <Plus size={16} />
                    <span>Host Meetup</span>
                </button>
            </div>

            <div className="mt-list">
                {meetups.map(m => (
                    <div key={m.id} className="mt-card">
                        <div className="mt-time-badge">
                            {getIcon(m.category)}
                            <span>{m.time}</span>
                        </div>
                        <div className="mt-info">
                            <h4>{m.title}</h4>
                            <div className="mt-location">
                                <MapPin size={14} />
                                <span>{m.location}</span>
                            </div>
                            <div className="mt-attendees">
                                <div className="attendee-stack">
                                    {m.attendees.map((a, i) => (
                                        <div key={i} className="att-avatar" title={a}>
                                            {a.substring(1, 3).toUpperCase()}
                                        </div>
                                    ))}
                                    {m.attendees.length > 3 && <div className="att-avatar">+{m.attendees.length - 3}</div>}
                                </div>
                                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{m.attendees.length} attending</span>
                            </div>
                        </div>
                        <button 
                            className={`mt-join-btn ${m.isJoined ? 'joined' : ''}`}
                            onClick={() => handleJoin(m.id)}
                        >
                            {m.isJoined ? 'Attending' : 'Join'}
                        </button>
                    </div>
                ))}
            </div>

            <button className="fvw-view-all-btn" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                <span>View Real-time Vibe Map</span>
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default MeetupPlanner;
