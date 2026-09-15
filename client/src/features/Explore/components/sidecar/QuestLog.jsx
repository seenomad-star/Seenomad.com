import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

const QuestLog = () => {
    return (
        <div className="sidecar-widget quest-log">
            <div className="widget-header">
                <Target size={16} className="widget-icon" />
                <span className="widget-title">Quest Log</span>
            </div>
            <div className="quest-item">
                <div className="quest-info">
                    <h4>Beach Explorer</h4>
                </div>
                <div className="quest-progress-bar">
                    <div className="progress-fill" style={{ width: '33%' }} />
                </div>
                <div className="quest-stats">
                    <span>Progress: 1/3 Beaches</span>
                    <CheckCircle2 size={14} />
                </div>
            </div>
        </div>
    );
};

export default QuestLog;
