import React, { useState, useEffect } from 'react';
import { Cpu, Rocket, Search, Check, Loader2, Sparkles, TrendingUp, Zap } from 'lucide-react';
import '../../styles/AIDigitalTwin.css';

const AIDigitalTwin = () => {
    const [isAutopilot, setIsAutopilot] = useState(false);
    const [events, setEvents] = useState([
        { id: 1, action: 'Scanning flight availability (Tokyo -> Lisbon)', status: 'ongoing' },
        { id: 2, action: 'Optimizing accommodation based on "Nomad DNA"', status: 'queued' }
    ]);

    useEffect(() => {
        if (isAutopilot) {
            const timer = setTimeout(() => {
                setEvents(prev => [
                    { id: Date.now(), action: 'Found 12% discount on KLM flight via Private Portal', status: 'success' },
                    ...prev.map(e => ({ ...e, status: e.status === 'ongoing' ? 'success' : e.status }))
                ]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isAutopilot]);

    return (
        <div className="twin-container">
            <header className="twin-header">
                <Cpu size={32} color="#A855F7" />
                <h1>AI <span>Digital Twin</span></h1>
                <p>Your autonomous agent planning and booking in the background 24/7.</p>
            </header>

            <div className="twin-main">
                <div className={`twin-avatar-orb ${isAutopilot ? 'active' : ''}`}>
                    <div className="orb-ring"></div>
                    <div className="orb-scanner"></div>
                    <Sparkles size={40} color="white" fill="white" className="twin-icon" />
                </div>

                <div className="twin-controls">
                    <div className="twin-status">
                        <div className={`dot ${isAutopilot ? 'green' : 'gray'}`}></div>
                        <span>STATUS: {isAutopilot ? 'AUTOPILOT ENGAGED' : 'IDLE'}</span>
                    </div>
                    <button 
                        className={`autopilot-toggle ${isAutopilot ? 'active' : ''}`}
                        onClick={() => setIsAutopilot(!isAutopilot)}
                    >
                        {isAutopilot ? <Zap size={18} fill="white" /> : <Rocket size={18} />}
                        <span>{isAutopilot ? 'STOP AUTOPILOT' : 'ENGAGE AUTOPILOT'}</span>
                    </button>
                </div>

                <div className="twin-activity">
                    <h3>Recent <span>Twin Log</span></h3>
                    <div className="logs">
                        {events.map((e) => (
                            <div className={`log-item ${e.status}`} key={e.id}>
                                {e.status === 'ongoing' ? <Loader2 size={14} className="spin" /> : <Check size={14} />}
                                <div className="log-text">{e.action}</div>
                                {e.status === 'success' && <div className="success-tag">OPTIMIZED</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="twin-footer">
                <TrendingUp size={14} />
                <span>Travel efficiency improved by 28% using your Digital Twin.</span>
            </div>
        </div>
    );
};

export default AIDigitalTwin;
