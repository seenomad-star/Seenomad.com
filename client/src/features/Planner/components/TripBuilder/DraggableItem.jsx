import React from 'react';
import { Plane, Bed, Home, Mountain, Car, Utensils, Hash } from 'lucide-react';

const iconMap = {
    Plane, Bed, Home, Mountain, Car, Utensils
};

const DraggableItem = ({ item, onDragStart }) => {
    const IconComponent = iconMap[item.icon] || Hash;

    return (
        <div 
            className="draggable-item" 
            draggable 
            onDragStart={(e) => onDragStart(e, item)}
        >
            <div className="d-icon-wrapper">
                <IconComponent size={20} />
            </div>
            <div className="d-info">
                <h4>{item.title}</h4>
                <span className="d-meta">{item.duration}</span>
            </div>
            <div className="d-price">
                ${item.price}
            </div>
            {/* Grab handle visual */}
            <div className="d-handle">⋮⋮</div>
        </div>
    );
};

export default DraggableItem;
