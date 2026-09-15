import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bug, Link2, Zap, Search, MapPin, 
    Share2, History, TrendingUp, Sparkles, Plus,
    ArrowRight, Info, CheckCircle
} from 'lucide-react';
import ScanningPulse from './components/ScanningPulse';
import BugResultCard from './components/BugResultCard';
import PamperModule from '../AIAgents/components/PamperModule';
import { useNomadOSStore } from '../../store/nomadOSStore';
import { useUserProfileStore } from '../../store/userProfileStore';
import '../../styles/NomadFeatures.css';

const TravelBug = () => {
    const [link, setLink] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState(null);
    const [pamperTrigger, setPamperTrigger] = useState(false);
    const { saveToVault, trackViralSpot } = useNomadOSStore();
    const { logTouchpoint } = useUserProfileStore();

    const handleExtract = () => {
        if (!link) return;
        setIsScanning(true);
        setResults(null);
        setPamperTrigger(false);

        // Simulated AI Pipeline Delay
        setTimeout(() => {
            const mockExtraction = {
                id: Date.now(),
                source: link,
                videoTitle: "Hidden Gems in Bali - MUST VISIT!",
                locations: [
                    {
                        name: "Karsa Spa",
                        address: "Jl. Markandia, Ubud, Bali",
                        category: "Wellness & Spa",
                        highlights: "Famous path through rice fields to a luxury spa.",
                        coordinates: { lat: -8.49, lng: 115.26 },
                        viralScore: 94
                    },
                    {
                        name: "Cretya Ubud",
                        address: "Tegallalang, Gianyar Regency, Bali",
                        category: "Day Club / Viewpoint",
                        highlights: "Infinity pools overlooking world-famous rice terraces.",
                        coordinates: { lat: -8.44, lng: 115.28 },
                        viralScore: 98
                    }
                ]
            };
            setResults(mockExtraction);
            setIsScanning(false);
            trackViralSpot(mockExtraction.locations[1].name);
            logTouchpoint('Extraction', 'Triplay AI');
            
            // Trigger Pamper Moment after a successful extraction
            setTimeout(() => setPamperTrigger(true), 1500);
        }, 4000);
    };

    return (
        <div className="travel-bug-container">
            <div className="bug-header">
                <div className="bug-logo">
                    <Bug size={32} color="#F59E0B" fill="#F59E0B" />
                    <div className="bug-text">
                        <h2>Travel Bug AI</h2>
                        <span>Link-to-Map Extraction Hub</span>
                    </div>
                </div>
                <button className="tool-btn"><History size={20} /></button>
            </div>

            {!isScanning && !results && (
                <div className="link-submission-card">
                    <div className="input-glow-wrapper">
                        <Link2 size={24} className="link-icon" />
                        <input 
                            type="text" 
                            placeholder="Paste TikTok or Instagram Reel link here..." 
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                        <button className="magic-extract-btn" onClick={handleExtract}>
                            <Zap size={18} fill="currentColor" />
                            <span>Extract Spots</span>
                        </button>
                    </div>
                    <p className="bug-disclaimer">
                        AI scans visual cues, audio transcripts, and metadata for precision.
                    </p>
                    
                    <div className="bug-trending-mini">
                        <div className="mini-title"><TrendingUp size={12} /> Viral This Week</div>
                        <div className="trending-tags">
                            <span>#BaliSecret</span>
                            <span>#LisbonCo-working</span>
                            <span>#OaxacaEats</span>
                        </div>
                    </div>
                </div>
            )}

            {isScanning && (
                <ScanningPulse />
            )}

            {results && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bug-results-view"
                >
                    <div className="results-info-bar">
                        <h4>{results.videoTitle}</h4>
                        <span className="results-count">{results.locations.length} Spots Identified</span>
                    </div>

                    <div className="bug-cards-stack">
                        {results.locations.map(loc => (
                            <BugResultCard key={loc.name} location={loc} />
                        ))}
                    </div>

                    <div className="bug-actions-footer">
                        <button className="btn-hub-primary" onClick={() => {
                            saveToVault(results);
                            setResults(null);
                            setLink('');
                        }}>
                            <CheckCircle size={18} />
                            <span>Save All to Bug Vault</span>
                        </button>
                        <button className="btn-hub-outline" onClick={() => setResults(null)}>
                            Reset
                        </button>
                    </div>
                </motion.div>
            )}

            {/* AI Pamper Trigger */}
            <PamperModule trigger={pamperTrigger} />
        </div>
    );
};

export default TravelBug;
