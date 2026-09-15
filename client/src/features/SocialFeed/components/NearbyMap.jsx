import React from 'react';
import { Map, MapPin, Navigation } from 'lucide-react';

const NearbyMap = () => {
    return (
        <div className="nearby-map-container">
            <div className="map-placeholder">
                <div className="map-overlay">
                    <div className="current-loc-badge">
                        <Navigation size={14} fill="currentColor" />
                        <span>CANGGU, BALI</span>
                    </div>
                    <div className="nearby-stats">
                        <span className="stat">42 Nomads Nearby</span>
                        <span className="dot">·</span>
                        <span className="stat">12 Active Events</span>
                    </div>
                </div>
                {/* Simulated Map Background */}
                <div className="simulated-map">
                    <div className="pulse-container">
                        <div className="pulse-circle"></div>
                        <div className="pulse-dot"></div>
                    </div>
                    <div className="nearby-pointer p1"><MapPin size={20} fill="#3b82f6" /></div>
                    <div className="nearby-pointer p2"><MapPin size={20} fill="#10b981" /></div>
                    <div className="nearby-pointer p3"><MapPin size={20} fill="#f59e0b" /></div>
                </div>
            </div>
        </div>
    );
};

export default NearbyMap;
