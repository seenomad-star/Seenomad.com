import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Layers, Map, Sun, 
    Shield, Landmark, Users,
    Target, Compass, Info
} from 'lucide-react';

const SignificanceHeatmap = () => {
    const [layer, setLayer] = useState('significance'); // 'significance', 'safety', 'density'

    const layers = [
        { id: 'significance', label: 'Significance', icon: <Landmark size={16} />, color: '#F59E0B' },
        { id: 'safety', label: 'Safety', icon: <Shield size={16} />, color: '#10B981' },
        { id: 'social', label: 'Nomad Density', icon: <Users size={16} />, color: '#A855F7' }
    ];

    return (
        <div className="significance-heatmap-container">
            <div className="heatmap-header">
                <div className="h-left">
                    <Target size={20} className="target-icon" />
                    <h3>Geo-Optimization Layer</h3>
                </div>
                <div className="layer-selector">
                    {layers.map(l => (
                        <button 
                            key={l.id} 
                            className={`layer-btn ${layer === l.id ? 'active' : ''}`}
                            onClick={() => setLayer(l.id)}
                            style={{ '--accent': l.color }}
                        >
                            {l.icon}
                        </button>
                    ))}
                </div>
            </div>

            <div className="heatmap-visual-container">
                <div className={`heatmap-overlay layer-${layer}`}>
                    {/* Abstract heatmap representation */}
                    <div className="heat-blob one" />
                    <div className="heat-blob two" />
                    <div className="heat-blob three" />
                </div>
                <div className="heatmap-labels">
                    <div className="label top">High Significance</div>
                    <div className="label bottom">Low Significance</div>
                </div>
            </div>

            <div className="heatmap-footer">
                <Info size={12} />
                <p>Optimizing for historical weight and cultural significance over simple distance.</p>
            </div>
        </div>
    );
};

export default SignificanceHeatmap;
