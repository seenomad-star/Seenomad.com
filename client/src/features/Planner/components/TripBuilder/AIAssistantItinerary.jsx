import React, { useState } from 'react';
import { Sparkles, Map, Target, Clock, ArrowRight } from 'lucide-react';
import '../../../../styles/AIAssistantItinerary.css';

const AIAssistantItinerary = ({ onGenerate }) => {
    const [destination, setDestination] = useState('');
    const [style, setStyle] = useState('Digital Nomad');
    const [duration, setDuration] = useState('14 Days');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = (e) => {
        e.preventDefault();
        setIsGenerating(true);
        
        // Simulate AI Processing Time
        setTimeout(() => {
            setIsGenerating(false);
            onGenerate({
                destination,
                style,
                duration,
                recommendations: [
                    { time: 'Day 1-3', lock: 'Arrival & Setup', desc: 'Settle into high-speed WiFi hub.' },
                    { time: 'Day 4-7', lock: 'Deep Work & Explore', desc: 'Coworking AM, Local sights PM.' },
                ]
            });
        }, 2500);
    };

    return (
        <div className="ai-assistant-wrapper">
            <div className="ai-header-badge">
                <Sparkles size={14} color="#A855F7" />
                <span>Traveluh Intelligence</span>
            </div>
            <h2>AI Itinerary Architect</h2>
            <p>Tell the engine where you want to go and how you travel. It will pre-fill a chronological master plan.</p>

            <form onSubmit={handleGenerate} className="ai-form">
                <div className="ai-input-group">
                    <label><Map size={14} /> Global Destination</label>
                    <input 
                        type="text" 
                        placeholder="e.g., Bali, Tokyo, Medellin" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </div>

                <div className="ai-input-row">
                    <div className="ai-input-group">
                        <label><Target size={14} /> Travel Style</label>
                        <select value={style} onChange={(e) => setStyle(e.target.value)}>
                            <option>Digital Nomad (Fast WiFi)</option>
                            <option>Luxury Resort</option>
                            <option>Backpacker Budget</option>
                            <option>Cultural Explorer</option>
                        </select>
                    </div>
                    <div className="ai-input-group">
                        <label><Clock size={14} /> Duration</label>
                        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                            <option>7 Days</option>
                            <option>14 Days</option>
                            <option>1 Month</option>
                            <option>3+ Months</option>
                        </select>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className={`ai-generate-btn ${isGenerating ? 'pulsing' : ''}`}
                    disabled={isGenerating}
                >
                    {isGenerating ? 'Synthesizing Data...' : 'Generate Master Itinerary'}
                    {!isGenerating && <ArrowRight size={18} />}
                </button>
            </form>

            <div className="ai-engine-status">
                <div className="status-dot online"></div>
                <span>GPT-4 Omni Engine Online</span>
            </div>
        </div>
    );
};

export default AIAssistantItinerary;
