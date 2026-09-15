import React from 'react';
import { motion } from 'framer-motion';
import { 
    MapPin, Star, Plus, Share2, 
    CheckCircle, Navigation, ExternalLink, Info
} from 'lucide-react';

const BugResultCard = ({ location }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bug-result-card"
        >
            <div className="bug-card-accent" />
            <div className="bug-card-body">
                <div className="bug-card-header">
                    <div className="loc-title">
                        <h3>{location.name}</h3>
                        <span className="loc-cat">{location.category}</span>
                    </div>
                    <div className="viral-badge">
                        <Star size={12} fill="#F59E0B" />
                        <span>{location.viralScore}% Viral</span>
                    </div>
                </div>

                <div className="loc-address">
                    <MapPin size={14} />
                    <span>{location.address}</span>
                </div>

                <div className="loc-highlights">
                    <p>{location.highlights}</p>
                </div>

                <div className="bug-card-actions">
                    <button className="bug-action-btn primary">
                        <Plus size={16} />
                        <span>Add to Trip</span>
                    </button>
                    <button className="bug-action-btn bookable">
                        <Zap size={16} fill="currentColor" />
                        <span>Book Experience</span>
                    </button>
                    <button className="bug-action-btn icon-only">
                        <Navigation size={16} />
                    </button>
                    <button className="bug-action-btn icon-only">
                        <ExternalLink size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BugResultCard;
