import React, { useState } from 'react';
import { Calendar, MapPin, Users, Ticket, Filter, Search, Sparkles, Music, Coffee, Briefcase } from 'lucide-react';
import WhosNearbyRadar from './components/WhosNearbyRadar';
import '../../styles/NomadEventsHub.css';

const NomadEventsHub = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const categories = [
        { id: 'all', label: 'All Events', icon: Calendar },
        { id: 'meetup', label: 'Meetups', icon: Users },
        { id: 'party', label: 'Parties', icon: Music },
        { id: 'work', label: 'Workshops', icon: Briefcase },
        { id: 'coffee', label: 'Coffee Chats', icon: Coffee }
    ];

    const events = [
        { 
            id: 1, title: 'Shibuya Night Meetup', type: 'party', city: 'Tokyo', date: 'TONIGHT', 
            attendees: 42, host: 'Alex R.', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&h=300&auto=format&fit=crop' 
        },
        { 
            id: 2, title: 'AI & Nomad Lifestyle Workshop', type: 'work', city: 'Tokyo', date: 'OCT 12', 
            attendees: 18, host: 'Vera AI', img: 'https://images.unsplash.com/photo-1591115765373-520b7a427ec7?q=80&w=600&h=300&auto=format&fit=crop' 
        },
        { 
            id: 3, title: 'Morning Co-working @ WeWork', type: 'meetup', city: 'Tokyo', date: 'OCT 13', 
            attendees: 12, host: 'Digital Drifter', img: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=600&h=300&auto=format&fit=crop' 
        }
    ];

    const filteredEvents = activeFilter === 'all' ? events : events.filter(e => e.type === activeFilter);

    return (
        <div className="events-hub-container">
            <header className="eh-header">
                <div className="eh-titles">
                    <h1>Nomad <span>Events Hub</span></h1>
                    <p>Discover exclusive meetups, parties, and workshops in Tokyo.</p>
                </div>
                <div className="eh-radar-section">
                    <WhosNearbyRadar />
                </div>
            </header>

            <div className="eh-controls">
                <div className="eh-filters">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <button 
                                key={cat.id} 
                                className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.id)}
                            >
                                <Icon size={16} /> <span>{cat.label}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="eh-search">
                    <Search size={18} />
                    <input type="text" placeholder="Search events..." />
                </div>
            </div>

            <div className="eh-grid">
                {filteredEvents.map((event) => (
                    <div className="event-card" key={event.id}>
                        <div className="event-img" style={{ backgroundImage: `url(${event.img})` }}>
                            <div className="event-date-badge">{event.date}</div>
                        </div>
                        <div className="event-content">
                            <div className="event-meta">
                                <span className={`event-type ${event.type}`}>{event.type.toUpperCase()}</span>
                                <span className="event-host">Hosted by {event.host}</span>
                            </div>
                            <h3>{event.title}</h3>
                            <div className="event-footer">
                                <div className="event-stats">
                                    <div className="stat"><Users size={14} /> {event.attendees} Attending</div>
                                    <div className="stat"><MapPin size={14} /> {event.city}</div>
                                </div>
                                <button className="rsvp-btn">RSVP <Ticket size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="eh-promos">
                <div className="promo-card premium">
                    <Sparkles size={28} color="gold" />
                    <div className="promo-text">
                        <h4>Exclusive Rooftop Party</h4>
                        <p>Available only for Traveluh Elite members. Limited slots remaining.</p>
                    </div>
                    <button className="promo-unlock">Unlock with Black Card</button>
                </div>
            </div>
        </div>
    );
};

export default NomadEventsHub;
