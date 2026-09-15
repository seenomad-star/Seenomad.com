import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Wifi, DollarSign, Globe, Zap } from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import './NomadToolkit.css';

const NomadToolkit = () => {
    const { addToast } = useToastStore();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isScanning, setIsScanning] = useState(false);
    const [wifiStatus, setWifiStatus] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const simulateWifiScan = () => {
        setIsScanning(true);
        addToast('Scanning for nomadic connectivity...', 'info');
        
        setTimeout(() => {
            setIsScanning(false);
            setWifiStatus({
                speed: '120 Mbps',
                stability: 'High',
                nearbyHubs: 4
            });
            addToast('Optimal connection found! Community hub "NomadSpace" is nearby.', 'success');
        }, 3000);
    };

    return (
        <div className="nomad-toolkit-container">
            <div className="toolkit-header">
                <Zap size={18} className="toolkit-icon" />
                <span>Nomad Intelligence Toolkit</span>
            </div>

            <div className="toolkit-grid">
                {/* Timezone Sync */}
                <div className="toolkit-card">
                    <div className="card-header">
                        <Clock size={16} />
                        <span>Global Clock</span>
                    </div>
                    <div className="time-display">
                        <div className="time-item">
                            <span className="label">Local</span>
                            <span className="value">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="time-item">
                            <span className="label">Home</span>
                            <span className="value">{new Date(currentTime.getTime() - (5 * 60 * 60 * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                </div>

                {/* WiFi Connectivity */}
                <div className="toolkit-card" onClick={simulateWifiScan}>
                    <div className="card-header">
                        <Wifi size={16} />
                        <span>Connectivity</span>
                    </div>
                    {isScanning ? (
                        <div className="scanning-loader">
                            <motion.div 
                                className="scan-line"
                                animate={{ y: [0, 40, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span>Scanning...</span>
                        </div>
                    ) : wifiStatus ? (
                        <div className="wifi-status">
                            <span className="speed">{wifiStatus.speed}</span>
                            <span className="stability">{wifiStatus.stability} Stability</span>
                        </div>
                    ) : (
                        <div className="wifi-trigger">Tap to scan hubs</div>
                    )}
                </div>

                {/* Cost of Living */}
                <div className="toolkit-card">
                    <div className="card-header">
                        <DollarSign size={16} />
                        <span>COL Index</span>
                    </div>
                    <div className="col-info">
                        <div className="col-rating">
                            <div className="rating-dot active" />
                            <div className="rating-dot active" />
                            <div className="rating-dot active" />
                            <div className="rating-dot" />
                            <div className="rating-dot" />
                        </div>
                        <span className="col-label">Moderate Budget</span>
                    </div>
                </div>

                {/* Destination Quick Check */}
                <div className="toolkit-card">
                    <div className="card-header">
                        <Globe size={16} />
                        <span>Visa Status</span>
                    </div>
                    <div className="visa-badge success">Visa Free (90 Days)</div>
                </div>
            </div>
        </div>
    );
};

export default NomadToolkit;
