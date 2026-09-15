import React, { useState, useEffect } from 'react';
import { Mic, X, Volume2, Sparkles, Command } from 'lucide-react';
import '../../styles/AIConciergeVera.css';

const AIConciergeVera = ({ isVisible, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');

    const startListening = () => {
        setIsListening(true);
        setTranscript('Listening...');
        setTimeout(() => {
            setTranscript('Book a flight to Bali next Tuesday');
            setIsListening(false);
            processVoice('Finding optimal routes for Bali on Oct 12th. I found an Emirates flight for $840 with 0 layovers. Should I reserve a window seat?');
        }, 3000);
    };

    const processVoice = (txt) => {
        setResponse(txt);
    };

    if (!isVisible) return (
        <div className="vera-launcher" onClick={onClose}>
            <div className="vera-orb-mini"></div>
            <Sparkles size={14} className="vera-spark" />
        </div>
    );

    return (
        <div className="vera-overlay">
            <div className="vera-container">
                <button className="vera-close" onClick={onClose}><X size={20} /></button>
                
                <div className="vera-body">
                    <div className={`vera-orb-large ${isListening ? 'pulsing' : ''}`}>
                        <div className="orb-core"></div>
                        <div className="orb-wave"></div>
                        <div className="orb-wave delay-1"></div>
                        <div className="orb-wave delay-2"></div>
                    </div>

                    <div className="vera-text-area">
                        <div className="vera-transcript">{transcript || "Waiting for command..."}</div>
                        {response && <div className="vera-response">{response}</div>}
                    </div>
                </div>

                <div className="vera-footer">
                    <button 
                        className={`mic-btn ${isListening ? 'active' : ''}`}
                        onClick={startListening}
                    >
                        <Mic size={24} />
                    </button>
                    <div className="vera-hint">
                        <Command size={12} /> <span>Try "Check my travel budget"</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIConciergeVera;
