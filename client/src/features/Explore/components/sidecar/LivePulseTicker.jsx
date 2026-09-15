import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

const LivePulseTicker = () => {
    const messages = [
        "🔥 12 people just booked Tokyo",
        "✨ 5 users exploring Bali now",
        "💎 New 20% discount for Iceland",
        "🚀 @NomadAlex reached Level 15",
        "🌟 8 travelers saved Kyoto today"
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="sidecar-widget pulse-ticker">
            <div className="pulse-message">
                <Flame size={16} />
                <span>{messages[index]}</span>
            </div>
        </div>
    );
};

export default LivePulseTicker;
