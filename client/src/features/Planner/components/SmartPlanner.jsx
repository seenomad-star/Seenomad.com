import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, MapPin, Calendar, Users, Search, 
    ArrowRight, CheckCircle, Shield, PlaneTakeoff 
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';

const SmartPlanner = () => {
    const [isSearching, setIsSearching] = useState(false);
    const [progress, setProgress] = useState(0);
    const [searchStatus, setSearchStatus] = useState("");
    const [showResults, setShowResults] = useState(false);

    const runSmartSearch = () => {
        setIsSearching(true);
        setProgress(0);
        setShowResults(false);
        
        const statuses = [
            "Analyzing global flight matrix...",
            "Excluding inconvenient hubs (Beauvais, Torp)...",
            "Optimizing for direct trains & ferries...",
            "Filtering out 4AM red-eyes for better sleep...",
            "Finalizing your 20-second itinerary..."
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            setProgress(prev => prev + 20);
            setSearchStatus(statuses[Math.floor(currentStep / 2)]);
            
            if (currentStep >= 10) {
                clearInterval(interval);
                setIsSearching(false);
                setShowResults(true);
            }
        }, 1500); // Simulated 15s total (approx 20s feel)
    };

    return (
        <div className="smart-planner-ui">
            {!isSearching && !showResults && (
                <div className="smart-config-card">
                    <div className="config-grid">
                        <div className="config-item">
                            <label><MapPin size={14} /> Start From</label>
                            <input type="text" placeholder="Paris, France" defaultValue="Paris" />
                        </div>
                        <div className="config-item">
                            <label><Calendar size={14} /> Duration</label>
                            <select>
                                <option>10-14 Days</option>
                                <option>2-3 Weeks</option>
                                <option>1 Month</option>
                            </select>
                        </div>
                        <div className="config-item">
                            <label><Shield size={14} /> Must Visit</label>
                            <input type="text" placeholder="Rome, Porto (max 3)" />
                        </div>
                    </div>

                    <div className="smart-preferences">
                        <label className="pref-toggle">
                            <input type="checkbox" defaultChecked />
                            <span>Exclude Budget Airports (Beauvais, Torp)</span>
                        </label>
                        <label className="pref-toggle">
                            <input type="checkbox" defaultChecked />
                            <span>No early/late segments</span>
                        </label>
                    </div>

                    <button className="primary-magic-btn" onClick={runSmartSearch}>
                        <Zap size={20} fill="currentColor" />
                        <span>Generate Optimized Tour</span>
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '1rem', opacity: 0.5 }}>
                        AI & Math algorithm based. Results in ~20 seconds.
                    </p>
                </div>
            )}

            {isSearching && (
                <div className="search-loading-screen">
                    <div className="loader-orb">
                        <PlaneTakeoff size={48} className="floating-plane" />
                    </div>
                    <h3>{searchStatus}</h3>
                    <div className="custom-progress-bar">
                        <motion.div 
                            className="p-fill" 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {showResults && (
                <div className="smart-results-view">
                    <div className="results-header">
                        <h4>Optimal Europe Circuit</h4>
                        <div className="price-tag-big">$842<span>Total inclusive</span></div>
                    </div>

                    <div className="route-timeline">
                        {[
                            { city: 'Paris', icon: '🇫🇷', info: 'Start City' },
                            { city: 'Rome', icon: '🇮🇹', info: 'Train · 2h 15m' },
                            { city: 'Porto', icon: '🇵🇹', info: 'Plane (Direct) · 2.5h' },
                            { city: 'Lisbon', icon: '🇵🇹', info: 'Bus · 3h' },
                            { city: 'Paris', icon: '🇫🇷', info: 'Return (Home)' }
                        ].map((stop, i) => (
                            <div key={i} className="route-stop">
                                <div className="stop-marker">{stop.icon}</div>
                                <div className="stop-info">
                                    <strong>{stop.city}</strong>
                                    <span>{stop.info}</span>
                                </div>
                                {i < 4 && <div className="connector"><ArrowRight size={14} /></div>}
                            </div>
                        ))}
                    </div>

                    <div className="results-actions">
                        <button className="btn-hub-primary" style={{ width: '100%' }}>
                            Confirm & Single Payment
                        </button>
                        <button className="btn-hub-outline" style={{ width: '100%', marginTop: '0.75rem' }} onClick={() => setShowResults(false)}>
                            Re-think Strategy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SmartPlanner;
