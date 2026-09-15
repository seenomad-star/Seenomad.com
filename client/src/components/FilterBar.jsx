import React, { useState, useRef, useEffect } from 'react';
import {
    Globe,
    Palmtree,
    Mountain,
    Building2,
    Trees,
    Sun,
    Waves,
    Snowflake,
    Landmark,
    Compass,
    Gem,
    Wallet,
    SlidersHorizontal,
    X
} from 'lucide-react';

const FilterBar = ({ activeFilter, setActiveFilter, isExpanded, setIsExpanded }) => {
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 150 });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const buttonRef = useRef(null);
    const barRef = useRef(null);

    const filterCategories = [
        { id: 'all', name: 'All', icon: <Globe size={18} /> },
        { id: 'beach', name: 'Beach', icon: <Palmtree size={18} /> },
        { id: 'mountain', name: 'Mountain', icon: <Mountain size={18} /> },
        { id: 'city', name: 'City', icon: <Building2 size={18} /> },
        { id: 'forest', name: 'Forest', icon: <Trees size={18} /> },
        { id: 'desert', name: 'Desert', icon: <Sun size={18} /> },
        { id: 'island', name: 'Island', icon: <Waves size={18} /> },
        { id: 'snow', name: 'Snow', icon: <Snowflake size={18} /> },
        { id: 'cultural', name: 'Cultural', icon: <Landmark size={18} /> },
        { id: 'adventure', name: 'Adventure', icon: <Compass size={18} /> },
        { id: 'luxury', name: 'Luxury', icon: <Gem size={18} /> },
        { id: 'budget', name: 'Budget', icon: <Wallet size={18} /> },
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            let newX = e.clientX - dragOffset.current.x;
            let newY = e.clientY - dragOffset.current.y;

            // Boundary checks
            const padding = 20;
            const barWidth = isExpanded ? (barRef.current?.offsetWidth || 420) : 60;
            const barHeight = isExpanded ? (barRef.current?.offsetHeight || 400) : 60;

            newX = Math.max(padding + barWidth / 2, Math.min(newX, window.innerWidth - padding - barWidth / 2));
            newY = Math.max(padding + barHeight / 2, Math.min(newY, window.innerHeight - padding - barHeight / 2));

            setPosition({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isExpanded]);

    const handleMouseDown = (e) => {
        // Only drag if clicking the container itself or non-button elements
        if (e.target.closest('button')) return;

        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    if (!isExpanded) {
        return (
            <button
                ref={buttonRef}
                className={`filter-trigger-btn ${isDragging ? 'dragging' : ''}`}
                onClick={() => !isDragging && setIsExpanded(true)}
                onMouseDown={(e) => {
                    setIsDragging(true);
                    dragOffset.current = {
                        x: e.clientX - position.x,
                        y: e.clientY - position.y
                    };
                }}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    position: 'fixed',
                    transform: 'translate(-50%, -50%)'
                }}
                title="Drag to move, click to expand"
            >
                <SlidersHorizontal size={20} />
            </button>
        );
    }

    return (
        <div
            ref={barRef}
            className={`explore-filter-bar ${isExpanded ? 'expanded' : ''} ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'fixed',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <button
                className="filter-item close-filters"
                onClick={() => setIsExpanded(false)}
            >
                <X size={18} />
                <span>Close Filters</span>
            </button>
            <div className="filter-scroll-container">
                {filterCategories.map(cat => (
                    <button
                        key={cat.id}
                        className={`filter-item ${activeFilter === cat.name ? 'active' : ''}`}
                        onClick={() => {
                            setActiveFilter(cat.name);
                        }}
                    >
                        {cat.icon}
                        <span>{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
