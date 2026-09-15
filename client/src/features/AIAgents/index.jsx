import React, { useState } from 'react';
import { agents } from './data/agentsData';
import AgentCard from './components/AgentCard';
import AgentChat from './components/AgentChat';
import AgentHUD from './components/AgentHUD';
import { useNomadOSStore } from '../../store/nomadOSStore';
import { TrendingUp, Award, Zap } from 'lucide-react';
import '../../styles/AIAgents.css';

const AIAgents = () => {
    const [selectedAgent, setSelectedAgent] = useState(null);
    const { xp, level, xpToNextLevel, rank } = useNomadOSStore();

    if (selectedAgent) {
        return <AgentChat agent={selectedAgent} onBack={() => setSelectedAgent(null)} />;
    }

    return (
        <div className="ai-hub-container">
            <AgentHUD onOpenAgent={setSelectedAgent} />

            <div className="ai-hub-header">
                <div className="user-progression-header">
                    <div className="progression-stat">
                        <Award size={20} className="text-yellow-400" />
                        <span>{rank}</span>
                    </div>
                    <div className="progression-stat">
                        <Zap size={20} className="text-blue-400" />
                        <span>Level {level}</span>
                    </div>
                    <div className="xp-progress-bar-container">
                        <div className="xp-label">{xp} / {xpToNextLevel} XP</div>
                        <div className="xp-bar">
                            <div className="xp-progress" style={{ width: `${(xp / xpToNextLevel) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
                <h1>Nomad OS Command Center</h1>
                <p>Your living digital universe. Every interaction rewards your journey.</p>
            </div>

            <div className="agents-grid">
                {agents.map(agent => (
                    <AgentCard
                        key={agent.id}
                        agent={agent}
                        onClick={setSelectedAgent}
                    />
                ))}
            </div>
        </div>
    );
};

export default AIAgents;
