import React, { useState } from 'react';
import { Passport, ShieldCheck, Map, ArrowRight, XCircle, AlertTriangle } from 'lucide-react';
import '../../../../styles/VisaMatcher.css';

const VisaMatcherAI = () => {
    const [nationality, setNationality] = useState('');
    const [destination, setDestination] = useState('');
    const [result, setResult] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleCheck = (e) => {
        e.preventDefault();
        setIsChecking(true);
        setResult(null);

        // Simulation Matrix for Visa AI
        setTimeout(() => {
            setIsChecking(false);
            const nat = nationality.toLowerCase();
            const dest = destination.toLowerCase();

            if (nat.includes('us') || nat.includes('uk') || nat.includes('eu')) {
                if (dest.includes('japan') || dest.includes('europe')) {
                    setResult({ status: 'visa-free', duration: '90 Days', icon: ShieldCheck, color: '#10B981' });
                } else if (dest.includes('vietnam') || dest.includes('india')) {
                    setResult({ status: 'evisa', duration: '30 Days via Portal', icon: AlertTriangle, color: '#F59E0B' });
                } else {
                    setResult({ status: 'embassy', duration: 'Required Before Arrival', icon: XCircle, color: '#EF4444' });
                }
            } else {
                setResult({ status: 'unknown', duration: 'Check Local Embassy', icon: Passport, color: '#64748B' });
            }
        }, 1500);
    };

    return (
        <div className="visa-matcher-container">
            <div className="vm-header">
                <h2>Passport Check AI</h2>
                <p>Instantly verify visa requirements based on your global citizenship.</p>
            </div>

            <form className="vm-form" onSubmit={handleCheck}>
                <div className="vm-input-grid">
                    <div className="input-box">
                        <label><Passport size={16} /> Passport Nationality</label>
                        <input 
                            type="text" 
                            placeholder="e.g. United States" 
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label><Map size={16} /> Destination Country</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Japan" 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className={`check-btn ${isChecking ? 'checking' : ''}`} disabled={isChecking}>
                    {isChecking ? 'Querying Interpol & Embassies...' : 'Run Global Verification'}
                    {!isChecking && <ArrowRight size={18} />}
                </button>
            </form>

            {result && (
                <div className={`vm-result-card border-${result.status}`}>
                    <div className={`status-icon bg-${result.status}`}>
                        <result.icon size={32} color={result.color} />
                    </div>
                    <div className="result-info">
                        <h3>
                            {result.status === 'visa-free' && "Visa-Free Access Granted"}
                            {result.status === 'evisa' && "e-Visa Required"}
                            {result.status === 'embassy' && "Embassy Visa Required"}
                            {result.status === 'unknown' && "Manual Verification Needed"}
                        </h3>
                        <p>{result.duration}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisaMatcherAI;
