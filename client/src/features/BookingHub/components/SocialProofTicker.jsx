import React, { useState, useEffect } from 'react';
import { Bell, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import '../../styles/SocialProofTicker.css';

const SocialProofTicker = () => {
    const [messages, setMessages] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const mockEvents = [
        { name: 'Sarah', location: 'London', action: 'booked a Safari in Kenya', icon: MapPin },
        { name: 'David', location: 'Sydney', action: 'added 5-star Villa to watchlist', icon: Clock },
        { name: 'Elena', location: 'Madrid', action: 'just bought Flight to Tokyo', icon: CreditCard },
        { name: 'John', location: 'New York', action: 'saved $140 on a 3-day Paris pass', icon: Bell }
    ];

    useEffect(() => {
        const triggerNotification = () => {
            const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
            const newMsg = { id: Date.now(), ...randomEvent, time: 'Just now' };
            
            setMessages([newMsg]);
            setIsVisible(true);

            setTimeout(() => setIsVisible(false), 5000);
        };

        const interval = setInterval(() => {
            triggerNotification();
        }, 8000 + Math.random() * 5000); // Trigger every 8-13 seconds globally

        return () => clearInterval(interval);
    }, []);

    if (messages.length === 0) return null;

    return (
        <div className="social-proof-wrapper">
            {messages.map((msg) => {
                const Icon = msg.icon;
                return (
                    <div key={msg.id} className={`sp-toast ${isVisible ? 'visible' : 'hidden'}`}>
                        <div className="sp-icon"><Icon size={16} /></div>
                        <div className="sp-content">
                            <h4><strong>{msg.name}</strong> from {msg.location}</h4>
                            <p>{msg.action}</p>
                            <span className="sp-time">{msg.time}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SocialProofTicker;
