import React from 'react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { Lock, Crown, Sparkles } from 'lucide-react';

const AgentCard = ({ agent, onClick }) => {
    const Icon = agent.icon;
    const { agentAffinity, isPremium, level } = useNomadOSStore();
    const affinity = agentAffinity[agent.id] || 0;

    return (
        <div
            className={`agent-card ${agent.isPremium && !isPremium ? 'gated' : ''}`}
            onClick={() => onClick(agent)}
            style={{
                '--agent-color': agent.color,
                '--agent-color-alpha': `${agent.color}20`
            }}
        >
            {agent.isPremium && (
                <div className="premium-badge">
                    {isPremium ? <Crown size={14} /> : <Lock size={14} />}
                    <span>{isPremium ? 'Unlocked' : 'Premium'}</span>
                </div>
            )}
            <div className="agent-icon-wrapper">
                <Icon size={28} />
            </div>
            <div className="agent-role">{agent.role}</div>
            <h3>{agent.name}</h3>
            <p className="agent-description">{agent.description}</p>

            <div className="affinity-container">
                <div className="affinity-header">
                    <span>Affinity Level</span>
                    <span>{affinity}%</span>
                </div>
                <div className="affinity-bar">
                    <div className="affinity-progress" style={{ width: `${affinity}%` }}></div>
                </div>
            </div>

            <div className="agent-capabilities">
                {agent.capabilities.map((cap, index) => (
                    <span key={index} className="capability-tag">{cap}</span>
                ))}
            </div>

            {affinity > 50 && (
                <div className="agent-trust-badge">
                    <Sparkles size={12} />
                    <span>Trusted Partner</span>
                </div>
            )}
        </div>
    );
};

export default AgentCard;
