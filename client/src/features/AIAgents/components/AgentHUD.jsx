import React, { useEffect, useState } from 'react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { agents } from '../data/agentsData';

const AgentHUD = ({ onOpenAgent }) => {
    const { currentContext, addXP } = useNomadOSStore();
    const [suggestion, setSuggestion] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!currentContext) return;

        // Logic to determine which agent should be proactive
        let proactiveAgent = null;
        let message = "";

        if (currentContext.type === 'destination') {
            proactiveAgent = agents.find(a => a.id === 'aria');
            message = `I have a custom 7-day itinerary for ${currentContext.name}. Want to see it?`;
        } else if (currentContext.type === 'visa') {
            proactiveAgent = agents.find(a => a.id === 'vance');
            message = `Visa rules for ${currentContext.name} just updated. Let's review.`;
        }

        if (proactiveAgent) {
            setSuggestion({ agent: proactiveAgent, message });
            setIsVisible(true);
            // Reward user for "discovering" a contextual insight
            addXP(10);

            // Auto-hide after 10 seconds
            const timer = setTimeout(() => setIsVisible(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [currentContext, addXP]);

    if (!isVisible || !suggestion) return null;

    return (
        <div
            className="agent-hud-popup"
            style={{ '--agent-color': suggestion.agent.color }}
        >
            <div className="hud-content">
                <div className="hud-icon">
                    <suggestion.agent.icon size={20} />
                </div>
                <div className="hud-text">
                    <div className="hud-agent-name">{suggestion.agent.name} (AI)</div>
                    <p>{suggestion.message}</p>
                </div>
                <button className="hud-action" onClick={() => {
                    onOpenAgent(suggestion.agent);
                    setIsVisible(false);
                }}>
                    <ArrowRight size={18} />
                </button>
                <button className="hud-close" onClick={() => setIsVisible(false)}>
                    <X size={14} />
                </button>
            </div>
            <div className="hud-xp-badge">+10 XP</div>
        </div>
    );
};

export default AgentHUD;
