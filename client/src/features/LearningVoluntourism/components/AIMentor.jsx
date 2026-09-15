import React, { useState } from 'react';
import { Bot, Send, Sparkles, TrendingUp, BookOpen } from 'lucide-react';

const AIMentor = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hello! I'm your AI Impact Mentor. I can help you find the perfect learning path or volunteer project based on your goals. What would you like to achieve today?" }
    ]);

    return (
        <div className="ai-mentor-container">
            <div className="mentor-chat-wrapper premium-card">
                <div className="chat-header">
                    <div className="ai-status">
                        <Bot size={20} />
                        <span>AI Mentor Online</span>
                    </div>
                    <div className="ai-capabilities">
                        <Sparkles size={16} className="text-yellow-400" />
                        <span>Impact Analysis Active</span>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.role}`}>
                            <div className="message-bubble">{msg.text}</div>
                        </div>
                    ))}
                </div>

                <div className="chat-input-area">
                    <input type="text" placeholder="Ask about skills, impact, or career growth..." />
                    <button className="send-btn"><Send size={18} /></button>
                </div>
            </div>

            <div className="mentor-suggestions">
                <h3>AI Recommendations</h3>
                <div className="suggestion-cards">
                    <div className="suggestion-card premium-card">
                        <TrendingUp size={18} className="text-green-400" />
                        <h4>Top Impact Match</h4>
                        <p>Marine Conservation in Maldives matches your interest in Biology.</p>
                        <button className="text-btn">View Match</button>
                    </div>
                    <div className="suggestion-card premium-card">
                        <BookOpen size={18} className="text-blue-400" />
                        <h4>Skill Gap Identified</h4>
                        <p>Complete "Sustainable Tourism" to unlock 15+ premium projects.</p>
                        <button className="text-btn">Start Skill</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIMentor;
