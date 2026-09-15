import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mic, Send, RotateCcw, 
    Sparkles, Map as MapIcon, 
    X, Check, Globe, MessageSquare,
    UserCircle2, Compass
} from 'lucide-react';

const CopilotConcierge = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm your Seenomad Co-pilot. Where should we head next? Or would you like to discover hidden gems for a staycation near you?", type: 'text' }
    ]);
    const [isListening, setIsListening] = useState(false);
    const [role, setRole] = useState('PLANNER'); // 'PLANNER' or 'TRAVELER'

    const handleSend = (text) => {
        if (!text) return;
        const newMessages = [...messages, { role: 'user', text, type: 'text' }];
        setMessages(newMessages);

        // Simulate AI Response
        setTimeout(() => {
            setMessages([...newMessages, { 
                role: 'assistant', 
                text: "Great choice! I've updated your itinerary with a moment-to-moment plan for Bali. I also found 3 'Staycation' gems nearby if you want to stay local.", 
                type: 'plan_update',
                data: { destination: 'Bali', activities: 5 }
            }]);
        }, 1200);
    };

    return (
        <div className="copilot-concierge-container">
            <div className="concierge-header">
                <div className="concierge-branding">
                    <Sparkles size={20} className="spark-icon" />
                    <h3>AI Concierge</h3>
                </div>
                <div className="role-switcher">
                    <button 
                        className={role === 'PLANNER' ? 'active' : ''} 
                        onClick={() => setRole('PLANNER')}
                    >
                        Planner
                    </button>
                    <button 
                        className={role === 'TRAVELER' ? 'active' : ''} 
                        onClick={() => setRole('TRAVELER')}
                    >
                        Chilled
                    </button>
                    <div className="role-indicator" style={{ left: role === 'PLANNER' ? '4px' : 'calc(50% + 2px)' }} />
                </div>
            </div>

            <div className="chat-viewport">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`message-bubble ${msg.role}`}
                        >
                            <div className="bubble-content">
                                {msg.text}
                                {msg.type === 'plan_update' && (
                                    <div className="plan-summary-card">
                                        <div className="p-icon"><MapIcon size={16} /></div>
                                        <div className="p-info">
                                            <strong>Itinerary Updated</strong>
                                            <span>{msg.data.destination} • {msg.data.activities} Moments</span>
                                        </div>
                                        <button className="view-itinerary-btn">View</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="concierge-controls">
                <div className="input-row">
                    <button 
                        className={`voice-btn ${isListening ? 'listening' : ''}`}
                        onClick={() => setIsListening(!isListening)}
                    >
                        <Mic size={20} />
                        {isListening && <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity }} className="voice-pulse" />}
                    </button>
                    <div className="chat-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Change my plan to more 'Relax' vibe..." 
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(e.target.value)}
                        />
                        <button className="send-msg-btn">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
                <div className="concierge-suggestions">
                    <button className="sug-pill" onClick={() => handleSend("Find staycations near me")}>🏠 Staycation Gems</button>
                    <button className="sug-pill" onClick={() => handleSend("Inspire my next trip")}>🌎 Inspire Me</button>
                    <button className="sug-pill" onClick={() => handleSend("Adjust current itinerary")}>🔄 Adjust Plan</button>
                </div>
            </div>
        </div>
    );
};

export default CopilotConcierge;
