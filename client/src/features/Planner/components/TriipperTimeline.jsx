import React from 'react';
import { motion } from 'framer-motion';
import { 
    Clock, MapPin, Camera, 
    Utensils, Coffee, Sunset, 
    Sparkles, Info, Navigation,
    Thermometer, ShieldAlert, Zap
} from 'lucide-react';
import GeoIntelligenceCard from './GeoIntelligenceCard';

const TriipperTimeline = ({ preferences }) => {
    // Mock itinerary data
    const timeline = [
        { time: '09:00', activity: 'Breakfast at Local Warung', location: 'Ubud', type: 'food', icon: <Utensils size={18} /> },
        { time: '11:00', activity: 'Tegalalang Rice Terrace', location: 'Tegalalang', type: 'sight', icon: <Camera size={18} /> },
        { time: '13:30', activity: 'Artisan Workshop', location: 'Ubud', type: 'culture', icon: <MapPin size={18} /> },
        { time: '16:00', activity: 'Spiritual Monkey Forest', location: 'Ubud', type: 'nature', icon: <Camera size={18} /> },
        { time: '18:30', activity: 'Sunset Dinner', location: 'Jimbaran', type: 'food', icon: <Sunset size={18} /> }
    ];

    return (
        <div className="triipper-timeline-container">
            <div className="timeline-intelligence-hub">
                <div className="hub-stats">
                    <div className="stat">
                        <Thermometer size={16} />
                        <span>Perfect Weather Window</span>
                    </div>
                </div>
                <button className="optimize-geo-btn">
                    <Zap size={14} /> Optimize by Distance
                </button>
            </div>

            <div className="timeline-main">
                <div className="timeline-left">
                    <GeoIntelligenceCard location={preferences?.destination} />
                    <div className="day-selector">
                        {[1, 2, 3].map(d => (
                            <button key={d} className={`day-pill ${d === 1 ? 'active' : ''}`}>Day {d}</button>
                        ))}
                    </div>
                    <div className="ai-pro-tip">
                        <Sparkles size={16} className="sparkle" />
                        <div className="tip-content">
                            <strong>AI Pro-Tip</strong>
                            <p>Kyoto is best explored by foot between 10am-2pm. We've grouped your afternoon spots within 1km of each other.</p>
                        </div>
                    </div>
                </div>

                <div className="timeline-right">
                    {timeline.map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="moment-card"
                        >
                            <div className="moment-time">
                                <span>{item.time}</span>
                                <div className="time-line" />
                            </div>
                            <div className="moment-details">
                                <div className="m-icon">{item.icon}</div>
                                <div className="m-info">
                                    <h3>{item.activity}</h3>
                                    <span>{item.location} • {item.type}</span>
                                </div>
                                <button className="navigate-btn">
                                    <Navigation size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TriipperTimeline;
