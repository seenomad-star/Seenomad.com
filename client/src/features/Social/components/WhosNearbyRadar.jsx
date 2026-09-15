import React from 'react';
import { Radar, Disc, User } from 'lucide-react';
import '../../../styles/WhosNearbyRadar.css';

const WhosNearbyRadar = () => {
    return (
        <div className="nearby-radar-wrapper">
            <div className="radar-header">
                <Radar size={18} color="#10B981" />
                <span>WHO'S NEARBY <strong>(TOKYO)</strong></span>
            </div>
            
            <div className="radar-visual">
                <div className="radar-circle ring-1"></div>
                <div className="radar-circle ring-2"></div>
                <div className="radar-circle ring-3"></div>
                <div className="radar-sweep"></div>
                
                {/* Active Nomad Markers */}
                <div className="nomad-marker m1" title="Alex R. - 200m">
                    <div className="m-avatar">A</div>
                    <div className="m-ping"></div>
                </div>
                <div className="nomad-marker m2" title="Sarah S. - 800m">
                    <div className="m-avatar">S</div>
                    <div className="m-ping"></div>
                </div>
                <div className="nomad-marker m3" title="Jack M. - 1.2km">
                    <div className="m-avatar">J</div>
                    <div className="m-ping"></div>
                </div>
                
                <div className="radar-center">
                    <User size={16} fill="white" />
                </div>
            </div>

            <div className="radar-footer">
                <Disc size={12} color="#10B981" className="live-blink" />
                <span>12 Nomads found in your vicinity</span>
            </div>
        </div>
    );
};

export default WhosNearbyRadar;
