import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Bed, Home, Mountain, Car, Utensils, Hash, Trash2 } from 'lucide-react';

const iconMap = {
    Plane, Bed, Home, Mountain, Car, Utensils
};

const ItineraryTimeline = ({ items, onDragOver, onDrop, onRemove }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleDragOver = (e) => {
        setIsHovering(true);
        onDragOver(e);
    };

    const handleDragLeave = (e) => {
        setIsHovering(false);
    };

    const handleDrop = (e) => {
        setIsHovering(false);
        onDrop(e);
    };

    return (
        <div className="itinerary-timeline-container">
            <div className="timeline-header">
                <h2>Your Journey</h2>
                <span>{items.length} Elements</span>
            </div>

            <div 
                className={`drop-zone ${isHovering ? 'active-zone' : ''} ${items.length === 0 ? 'empty-state' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {items.length === 0 && (
                    <div className="empty-message">
                        Hover area to drop items
                    </div>
                )}
                
                <div className="timeline-trail">
                    <AnimatePresence>
                        {items.map((item, index) => {
                            const IconComponent = iconMap[item.icon] || Hash;
                            
                            return (
                                <motion.div 
                                    key={item.instanceId}
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -20, height: 0 }}
                                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                                    exit={{ opacity: 0, x: 20, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="t-connector">
                                        <div className={`t-dot type-${item.type}`}></div>
                                        {index !== items.length - 1 && <div className="t-line"></div>}
                                    </div>
                                    <div className="t-card">
                                        <div className={`t-icon type-${item.type}`}>
                                            <IconComponent size={20} />
                                        </div>
                                        <div className="t-info">
                                            <h4>{item.title}</h4>
                                            <span className="t-meta">{item.duration}</span>
                                        </div>
                                        <div className="t-price">
                                            ${item.price}
                                        </div>
                                        <button className="t-remove" onClick={() => onRemove(item.instanceId)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ItineraryTimeline;
