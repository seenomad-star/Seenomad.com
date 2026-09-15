import React, { useEffect, useState } from 'react';
import { ChevronLeft, Play, Search } from 'lucide-react';
import '../styles/TrendingAll.css';

const TrendingAll = ({ destinations, onBack }) => {
    const [displayDestinations, setDisplayDestinations] = useState(destinations);

    // Simulate endless scroll by adding more items when reaching the bottom
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                setDisplayDestinations(prev => [...prev, ...destinations.map(d => ({ ...d, id: Math.random() }))]);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [destinations]);

    return (
        <div className="trending-all-container">
            <header className="trending-all-header">
                <button className="back-btn" onClick={onBack}>
                    <ChevronLeft size={24} />
                    <span>Back to Explore</span>
                </button>
                <h1>Trending Now</h1>
                <div className="search-bar-mini">
                    <Search size={18} />
                    <input type="text" placeholder="Search destinations..." />
                </div>
            </header>

            <div className="trending-all-grid">
                {displayDestinations.map((dest, index) => (
                    <div key={`${dest.id}-${index}`} className="trending-all-card">
                        <div className="card-image-wrapper">
                            <img src={dest.image} alt={dest.name} />
                            <button className="play-btn-overlay">
                                <Play size={20} fill="white" />
                            </button>
                        </div>
                        <div className="card-content">
                            <div className="card-main-info">
                                <h3>{dest.name}</h3>
                                <p className="location">{dest.location}</p>
                            </div>
                            <div className="card-tags-row">
                                <span className="tag-pill">{dest.category}</span>
                                <span className="tag-pill">Trending</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="loading-indicator">
                <div className="spinner"></div>
                <span>Loading more amazing places...</span>
            </div>
        </div>
    );
};

export default TrendingAll;
