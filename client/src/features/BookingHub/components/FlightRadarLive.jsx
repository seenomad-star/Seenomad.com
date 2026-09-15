import React, { useState, useEffect } from 'react';
import { Plane, Activity, Compass, Navigation } from 'lucide-react';
import '../../styles/FlightRadarLive.css';

const FlightRadarLive = () => {
    const [planes, setPlanes] = useState([]);

    // Generate random mock planes for the radar grid
    useEffect(() => {
        const initialPlanes = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 90,
            y: Math.random() * 90,
            rotation: Math.random() * 360,
            flightCode: `EK${Math.floor(Math.random() * 900) + 100}`,
            alt: `${Math.floor(Math.random() * 10) + 30}k ft`
        }));
        setPlanes(initialPlanes);

        // Animate planes slightly every 2 seconds
        const interval = setInterval(() => {
            setPlanes(current => current.map(p => ({
                ...p,
                x: Math.max(0, Math.min(95, p.x + (Math.random() - 0.5) * 5)),
                y: Math.max(0, Math.min(95, p.y + (Math.random() - 0.5) * 5)),
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flight-radar-container">
            <div className="radar-header">
                <h2><Activity size={20} color="#3B82F6" className="pulse-icon" /> Live Airspace Telemetry</h2>
                <div className="radar-metrics">
                    <span className="metric">8 Active Flights</span>
                    <span className="metric">Regional View</span>
                </div>
            </div>

            <div className="radar-screen">
                <div className="radar-sweep"></div>
                
                {/* Simulated Grid Lines */}
                <div className="grid-overlay"></div>
                
                <div className="radar-center">
                    <Compass size={24} color="rgba(255,255,255,0.2)" />
                </div>

                {planes.map(plane => (
                    <div 
                        key={plane.id}
                        className="radar-plane-wrapper"
                        style={{
                            left: `${plane.x}%`,
                            top: `${plane.y}%`,
                        }}
                    >
                        <Plane 
                            size={16} 
                            color="#10B981" 
                            className="plane-icon"
                            style={{ transform: `rotate(${plane.rotation}deg)` }} 
                        />
                        <div className="plane-tooltip">
                            <strong>{plane.flightCode}</strong>
                            <span>{plane.alt}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="radar-footer">
                <Navigation size={14} /> Telemetry is simulated for demonstration purposes.
            </div>
        </div>
    );
};

export default FlightRadarLive;
