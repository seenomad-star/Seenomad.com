import React, { useState } from 'react';
import { Maximize2, ZoomIn, ZoomOut, Filter, MousePointer2 } from 'lucide-react';
import '../../../styles/InteractiveVisaMap.css';

const InteractiveVisaMap = () => {
    const [hoveredCountry, setHoveredCountry] = useState(null);

    // Simplified World Map SVG (Conceptual representation for high-fidelity UI)
    // In a real prod app, you'd use react-simple-maps or a d3-geo topojson.
    // Here we simulate the map regions with visual blocks and paths.
    
    return (
        <div className="visa-map-card">
            <div className="map-toolbar">
                <div className="map-controls">
                    <button title="Zoom In"><ZoomIn size={16} /></button>
                    <button title="Zoom Out"><ZoomOut size={16} /></button>
                    <button title="Reset"><Maximize2 size={16} /></button>
                </div>
                <div className="map-legend">
                    <div className="legend-item"><span className="dot visa-free"></span> Visa Free</div>
                    <div className="legend-item"><span className="dot evisa"></span> e-Visa</div>
                    <div className="legend-item"><span className="dot required"></span> Required</div>
                </div>
            </div>

            <div className="map-viewport">
                <div className="map-svg-placeholder">
                    {/* Simulated World Regions with stylized SVG fragments */}
                    <svg viewBox="0 0 800 450" className="world-svg">
                        {/* Americas */}
                        <path className="land visa-free" d="M100,100 L200,100 L200,300 L100,350 Z" onMouseEnter={() => setHoveredCountry('Americas')} />
                        {/* Europe */}
                        <path className="land visa-free active" d="M350,80 L450,80 L450,150 L350,150 Z" onMouseEnter={() => setHoveredCountry('Europe')} />
                        {/* Africa */}
                        <path className="land required" d="M380,180 L480,180 L480,350 L380,350 Z" onMouseEnter={() => setHoveredCountry('Africa')} />
                        {/* Asia */}
                        <path className="land evisa" d="M500,80 L750,80 L750,300 L500,350 Z" onMouseEnter={() => setHoveredCountry('Asia')} />
                    </svg>
                    
                    {hoveredCountry && (
                        <div className="map-tooltip" style={{ opacity: 1 }}>
                            <h4>{hoveredCountry}</h4>
                            <p>Status: <span className="status-val">{hoveredCountry === 'Africa' ? 'Visa Required' : 'Visa Free'}</span></p>
                            <span>Standard Processing: 48 Hours</span>
                        </div>
                    )}
                </div>

                <div className="map-overlay-hint">
                    <MousePointer2 size={14} /> Hover over a country to check real-time visa status
                </div>
            </div>

            <div className="map-stats-bar">
                <div className="stat">
                    <strong>124</strong>
                    <span>Visa-Free</span>
                </div>
                <div className="stat">
                    <strong>38</strong>
                    <span>e-Visa / VoA</span>
                </div>
                <div className="stat">
                    <strong>42</strong>
                    <span>Embassy Required</span>
                </div>
                <button className="compare-btn">Compare Passports <Filter size={14} /></button>
            </div>
        </div>
    );
};

export default InteractiveVisaMap;
