import React from 'react';
import { motion } from 'framer-motion';
import { 
    Star, Clock, Info, 
    Navigation, Phone, Globe,
    Image, MessageSquare
} from 'lucide-react';

const RichMapPOI = ({ poi }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rich-poi-card"
        >
            <div className="poi-media-mock">
                <div className="poi-rating">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span>{poi.rating}</span>
                </div>
            </div>
            <div className="poi-content">
                <div className="poi-header">
                    <h3>{poi.name}</h3>
                    <span className={`status-pill ${poi.isOpen ? 'open' : 'closed'}`}>
                        {poi.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                </div>
                <p className="poi-desc">{poi.description}</p>
                
                <div className="poi-info-grid">
                    <div className="info-bit">
                        <Clock size={14} />
                        <span>Closes at {poi.closingTime}</span>
                    </div>
                    <div className="info-bit">
                        <MessageSquare size={14} />
                        <span>{poi.reviewsCount} Reviews</span>
                    </div>
                </div>

                <div className="poi-actions">
                    <button className="poi-btn primary">
                        <Navigation size={16} />
                        <span>Directions</span>
                    </button>
                    <button className="poi-btn">
                        <Phone size={16} />
                    </button>
                    <button className="poi-btn">
                        <Globe size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default RichMapPOI;
