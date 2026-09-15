import React, { useState } from 'react';
import { Shield, ShieldOff, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import '../../../styles/GhostMode.css';

const GhostModeToggle = () => {
    const [isGhost, setIsGhost] = useState(false);

    return (
        <div className={`ghost-mode-container ${isGhost ? 'active' : ''}`}>
            <div className="gm-info">
                {isGhost ? <Shield size={18} color="#A855F7" /> : <Eye size={18} color="#3B82F6" />}
                <div className="gm-text">
                    <strong>{isGhost ? 'Ghost Mode ON' : 'Location Public'}</strong>
                    <span>{isGhost ? 'Your location is obfuscated' : 'Friends can see your city'}</span>
                </div>
            </div>

            <button 
                className={`gm-toggle ${isGhost ? 'ghosted' : ''}`}
                onClick={() => setIsGhost(!isGhost)}
            >
                <div className="gm-knob">
                    {isGhost ? <Lock size={12} /> : <Unlock size={12} />}
                </div>
            </button>
        </div>
    );
};

export default GhostModeToggle;
