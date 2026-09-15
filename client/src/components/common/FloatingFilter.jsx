import React, { useState, useRef, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import './styles/FloatingFilter.css';

const FloatingFilter = ({ filters = [], onFilterChange, moduleId = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(() => {
        const saved = localStorage.getItem(`filters_${moduleId}`);
        return saved ? JSON.parse(saved) : [];
    });
    const [position, setPosition] = useState(() => {
        const saved = localStorage.getItem('floatingFilterPosition');
        if (saved) {
            return JSON.parse(saved);
        }
        // Better default position for mobile and desktop
        const isMobile = window.innerWidth <= 768;
        return {
            x: window.innerWidth - (isMobile ? 70 : 100),
            y: window.innerHeight - (isMobile ? 120 : 150)
        };
    });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    // Save position to localStorage
    useEffect(() => {
        localStorage.setItem('floatingFilterPosition', JSON.stringify(position));
    }, [position]);

    // Save selected filters to localStorage
    useEffect(() => {
        localStorage.setItem(`filters_${moduleId}`, JSON.stringify(selectedFilters));
        if (onFilterChange) {
            onFilterChange(selectedFilters);
        }
    }, [selectedFilters, moduleId]);

    const handleMouseDown = (e) => {
        if (e.target.closest('.filter-popup')) return;

        setIsDragging(true);
        const rect = buttonRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;

        setPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleFilterToggle = (filterId) => {
        setSelectedFilters(prev => {
            if (prev.includes(filterId)) {
                return prev.filter(id => id !== filterId);
            } else {
                return [...prev, filterId];
            }
        });
    };

    const clearAllFilters = () => {
        setSelectedFilters([]);
    };

    return (
        <>
            <div
                ref={buttonRef}
                className={`floating-filter-button ${isDragging ? 'dragging' : ''} ${selectedFilters.length > 0 ? 'has-filters' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
                onMouseDown={handleMouseDown}
                onClick={() => !isDragging && setIsOpen(!isOpen)}
            >
                <Filter size={24} />
                {selectedFilters.length > 0 && (
                    <span className="filter-count">{selectedFilters.length}</span>
                )}
            </div>

            {isOpen && (
                <div
                    className="filter-popup"
                    style={{
                        left: `${Math.max(10, position.x - 200)}px`,
                        top: `${position.y}px`
                    }}
                >
                    <div className="filter-popup-header">
                        <h3>Filters</h3>
                        <div className="header-actions">
                            {selectedFilters.length > 0 && (
                                <button className="clear-btn" onClick={clearAllFilters}>
                                    Clear All
                                </button>
                            )}
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="filter-popup-content">
                        {filters.length > 0 ? (
                            filters.map((filter) => (
                                <div key={filter.id} className="filter-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.includes(filter.id)}
                                            onChange={() => handleFilterToggle(filter.id)}
                                        />
                                        <span>{filter.label}</span>
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="no-filters">No filters available</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingFilter;
