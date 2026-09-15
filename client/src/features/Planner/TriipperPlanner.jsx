import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, Calendar, Clock, 
    Compass, MapPin, Coffee, 
    Utensils, Camera, Sunset, 
    ArrowRight, ChevronDown, Wand2,
    Briefcase, Users, Heart,
    MessageSquare
} from 'lucide-react';
import TriipperForm from './components/TriipperForm';
import TriipperTimeline from './components/TriipperTimeline';
import CopilotConcierge from '../AIAgents/components/CopilotConcierge';

const TriipperPlanner = () => {
    const [step, setStep] = useState('form'); // 'form', 'loading', 'result', 'concierge'
    const [preferences, setPreferences] = useState(null);

    const handleGenerate = (data) => {
        setPreferences(data);
        setStep('loading');
        setTimeout(() => setStep('result'), 3500);
    };

    return (
        <div className="triipper-planner-container">
            <AnimatePresence mode="wait">
                {step === 'form' && (
                    <motion.div 
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="triipper-header-hero">
                            <Wand2 size={40} className="wand-icon" />
                            <h1>Triipper AI</h1>
                            <p>Let us do the heavy lifting. Moment-to-moment itineraries curated by AI.</p>
                            
                            <button className="switch-to-concierge" onClick={() => setStep('concierge')}>
                                <MessageSquare size={16} /> Use AI Co-pilot Chat
                            </button>
                        </div>
                        <TriipperForm onGenerate={handleGenerate} />
                    </motion.div>
                )}

                {step === 'concierge' && (
                    <motion.div 
                        key="concierge"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="concierge-wrapper">
                            <button className="back-to-form" onClick={() => setStep('form')}>
                                <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Standard Planner
                            </button>
                            <CopilotConcierge />
                        </div>
                    </motion.div>
                )}

                {step === 'loading' && (
                    <motion.div 
                        key="loading"
                        className="triipper-loading-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="heavy-lifting-loader">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="loader-ring"
                            />
                            <div className="loader-text">
                                <motion.h2
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Curating Your Moments...
                                </motion.h2>
                                <p>Analyzing {preferences?.budget} options in {preferences?.destination}...</p>
                            </div>
                            <div className="ai-status-pills">
                                <span className="status-pill">Scouting Cafes</span>
                                <span className="status-pill">Checking Sunset Times</span>
                                <span className="status-pill">Optimizing Transit</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'result' && (
                    <motion.div 
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="triipper-result-header">
                            <button className="regenerate-btn" onClick={() => setStep('form')}>
                                <Wand2 size={16} /> Edit Preferences
                            </button>
                            <div className="trip-summary-badge">
                                <strong>{preferences?.destination}</strong> • {preferences?.tripType}
                            </div>
                        </div>
                        <TriipperTimeline preferences={preferences} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TriipperPlanner;
