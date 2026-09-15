import React from 'react';
import { Users, Circle, MessageSquare, Video, Settings } from 'lucide-react';
import '../../../../styles/GroupSyncSession.css';

const GroupSyncSession = () => {
    const activeFriends = [
        { name: 'Sarah', status: 'Editing Day 3', color: '#10B981', initial: 'S' },
        { name: 'Marcus', status: 'Viewing Map', color: '#3B82F6', initial: 'M' },
        { name: 'Elena', status: 'Idle', color: '#94A3B8', initial: 'E' }
    ];

    return (
        <div className="group-sync-sidebar">
            <div className="gs-header">
                <div className="gs-title">
                    <Users size={18} color="#A855F7" />
                    <h3>Live Planning</h3>
                </div>
                <div className="live-indicator">
                    <Circle size={8} fill="#10B981" color="#10B981" className="pulse-dot" />
                    <span>Live</span>
                </div>
            </div>

            <div className=" gs-presence-list">
                {activeFriends.map((f, i) => (
                    <div className="gs-friend-row" key={i}>
                        <div className="gs-avatar" style={{ border: `2px solid ${f.color}` }}>
                            {f.initial}
                            <div className="status-dot" style={{ backgroundColor: f.color }}></div>
                        </div>
                        <div className="gs-meta">
                            <strong>{f.name}</strong>
                            <span>{f.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="gs-actions">
                <button className="gs-btn chat"><MessageSquare size={16} /> Chat</button>
                <button className="gs-btn call"><Video size={16} /> Huddle</button>
            </div>

            <div className="gs-footer">
                <Settings size={14} />
                <span>Session Settings</span>
            </div>
        </div>
    );
};

export default GroupSyncSession;
