import React, { useState, useEffect } from 'react';
import { ShieldAlert, Radio, MapPin, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import '../../styles/SOSBeacon.css';

const SOSBeacon = () => {
    const [status, setStatus] = useState('idle'); // idle, connecting, transmitting, success
    const [ticker, setTicker] = useState(0);

    const activateSOS = () => {
        setStatus('connecting');
        setTimeout(() => setStatus('transmitting'), 2000);
        setTimeout(() => setStatus('success'), 6000);
    };

    useEffect(() => {
        if (status === 'transmitting') {
            const interval = setInterval(() => setTicker(t => (t + 1) % 4), 500);
            return () => clearInterval(interval);
        }
    }, [status]);

    return (
        <div className={`sos-beacon-container ${status}`}>
            <div className="sos-header">
                <ShieldAlert size={32} color={status === 'idle' ? '#94A3B8' : '#EF4444'} />
                <h2>Emergency <span>Sat-Link SOS</span></h2>
            </div>

            <div className="sos-body">
                {status === 'idle' && (
                    <div className="sos-idle">
                        <p>One-touch global emergency extraction and medical support via satellite.</p>
                        <button className="sos-trigger-btn" onClick={activateSOS}>ACTIVATE BEACON</button>
                    </div>
                )}

                {(status === 'connecting' || status === 'transmitting') && (
                    <div className="sos-active">
                        <div className="radio-waves">
                            <div className="wave"></div>
                            <div className="wave delay-1"></div>
                            <div className="wave delay-2"></div>
                        </div>
                        <div className="sos-status-text">
                            {status === 'connecting' ? 'Establishing Satellite Uplink...' : 'Transmitting Coordinates...'}
                            <div className="coords">Lat: 35.6895, Lng: 139.6917</div>
                        </div>
                    </div>
                )}

                {status === 'success' && (
                    <div className="sos-success">
                        <CheckCircle2 size={48} color="#10B981" />
                        <h3>Signal Received</h3>
                        <p>Global Security Response Team has been dispatched to your location.</p>
                        <button className="sos-cancel-btn" onClick={() => setStatus('idle')}>Deactivate</button>
                    </div>
                )}
            </div>

            <div className="sos-footer">
                <Radio size={14} /> <span>Coverage: 100% Global Sat-Link Active</span>
            </div>
        </div>
    );
};

export default SOSBeacon;
