import React from 'react';
import { Sparkles, Trophy, Coins, Target, Crown, ChevronDown, Play } from 'lucide-react';

const SmartAssistant = ({ isExpanded, setIsExpanded }) => {
    const actions = [
        { icon: Sparkles, label: 'Find high reward games', color: '#8b5cf6' },
        { icon: Trophy, label: 'Check tournament status', color: '#f59e0b' },
        { icon: Coins, label: 'How to earn more coins', color: '#10b981' },
        { icon: Target, label: 'Daily challenge progress', color: '#3b82f6' }
    ];

    return (
        <div className={`smart-assistant-v2 ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded ? (
                <div className="assistant-expanded-v2">
                    <div className="assistant-header-v2">
                        <div className="a-title">
                            <Sparkles size={18} color="#8b5cf6" />
                            <span>Game Assistant</span>
                        </div>
                        <button className="a-close-btn" onClick={() => setIsExpanded(false)}>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                    <div className="assistant-body-v2">
                        <div className="a-prime-banner">
                            <Crown size={16} />
                            <span>Prime: 2x XP & Coins Active</span>
                        </div>
                        <div className="a-actions-grid">
                            {actions.map((action, idx) => (
                                <button key={idx} className="a-action-item">
                                    <div className="a-icon-circle" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                                        <action.icon size={16} />
                                    </div>
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="a-chat-preview">
                            <div className="a-bot-msg">Hi! I can help you find the best games to earn travel vouchers. What's your goal today?</div>
                        </div>
                    </div>
                    <div className="assistant-footer-v2">
                        <input type="text" placeholder="Ask anything..." />
                        <button className="a-send-btn"><Play size={14} /></button>
                    </div>
                </div>
            ) : (
                <button className="assistant-collapsed-v2" onClick={() => setIsExpanded(true)}>
                    <Sparkles size={24} color="white" />
                    <div className="a-notif-dot"></div>
                </button>
            )}
        </div>
    );
};

export default SmartAssistant;
