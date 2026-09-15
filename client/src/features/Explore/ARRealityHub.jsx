import React, { useState } from 'react';
import { Box, Maximize, Orbit, Layers, Sparkles, ChevronRight, Play } from 'lucide-react';
import '../../styles/ARRealityHub.css';

const ARRealityHub = () => {
    const [activeScene, setActiveScene] = useState(0);

    const scenes = [
        { 
            title: 'Tokyo: Shinjuku Night', 
            type: '360° Panorama', 
            stats: '8K Resolution • Spatial Audio',
            thumb: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&h=450&auto=format&fit=crop'
        },
        { 
            title: 'Iceland: Northern Lights', 
            type: 'WebXR Experience', 
            stats: '6DOF Tracking • Multi-User',
            thumb: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?q=80&w=800&h=450&auto=format&fit=crop'
        },
        { 
            title: 'Cairo: Great Pyramids', 
            type: 'Volumetric Scan', 
            stats: '1.2B Polygons • Historical AI',
            thumb: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=800&h=450&auto=format&fit=crop'
        }
    ];

    return (
        <div className="ar-reality-hub">
            <div className="ar-header">
                <Box size={24} color="#A855F7" />
                <h1>AR <span>Reality Hub</span></h1>
                <p>Experience your destination in immersive spatial computing before you even pack.</p>
            </div>

            <div className="ar-viewport-main">
                <div className="viewport-screen" style={{ backgroundImage: `url(${scenes[activeScene].thumb})` }}>
                    <div className="viewport-overlay">
                        <div className="view-badge"><Orbit size={14} /> Spatial Reality Active</div>
                        <div className="view-center">
                            <button className="play-xr-btn"><Play size={24} fill="white" /> Enter Experience</button>
                        </div>
                        <div className="view-footer">
                            <div className="view-meta">
                                <h3>{scenes[activeScene].title}</h3>
                                <span>{scenes[activeScene].type}</span>
                            </div>
                            <div className="view-stats">{scenes[activeScene].stats}</div>
                        </div>
                    </div>
                    <div className="xr-controllers">
                        <div className="xr-dot"></div>
                        <div className="xr-dot"></div>
                        <div className="xr-dot"></div>
                    </div>
                </div>
            </div>

            <div className="ar-scene-selector">
                {scenes.map((scene, i) => (
                    <div 
                        className={`scene-thumb ${activeScene === i ? 'active' : ''}`} 
                        key={i}
                        onClick={() => setActiveScene(i)}
                    >
                        <img src={scene.thumb} alt={scene.title} />
                        <div className="scene-info">
                            <strong>{scene.title}</strong>
                            <span>{i === 1 ? 'READY' : 'HQ DOWNLOAD'}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="xr-hardware-promo">
                <Layers size={32} color="#3B82F6" />
                <div className="promo-text">
                    <h4>Meta Quest & Vision Pro Sync</h4>
                    <p>Connect your headset for the ultimate travel simulation experience.</p>
                </div>
                <button className="sync-btn">Connect Device</button>
            </div>
        </div>
    );
};

export default ARRealityHub;
