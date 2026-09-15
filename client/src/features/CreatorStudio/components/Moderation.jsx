import React, { useState } from 'react';
import {
    Shield,
    Flag,
    UserX,
    CheckCircle,
    AlertTriangle,
    MoreVertical,
    Search,
    Filter
} from 'lucide-react';

const Moderation = () => {
    const [reports, setReports] = useState([
        {
            id: 1,
            type: "Spam",
            content: "Check out my crypto travel site...",
            author: "BotUser123",
            time: "5m ago",
            severity: "low"
        },
        {
            id: 2,
            type: "Hate Speech",
            content: "I hate people from...",
            author: "TrollMaster",
            time: "12m ago",
            severity: "high"
        },
        {
            id: 3,
            type: "Misinformation",
            content: "Visa-free travel to Mars is now open!",
            author: "SpaceTraveler",
            time: "1h ago",
            severity: "medium"
        }
    ]);

    return (
        <div className="moderation-module">
            <div className="mod-header">
                <div className="header-text">
                    <h2>Moderation & Trust</h2>
                    <p>Maintain a safe and authentic community.</p>
                </div>
                <div className="mod-stats">
                    <div className="mod-stat-item">
                        <span className="val">12</span>
                        <span className="lbl">Pending</span>
                    </div>
                    <div className="mod-stat-item">
                        <span className="val">1.2k</span>
                        <span className="lbl">Resolved</span>
                    </div>
                </div>
            </div>

            <div className="mod-controls">
                <div className="mod-search">
                    <Search size={18} />
                    <input type="text" placeholder="Search reports, users..." />
                </div>
                <button className="mod-filter-btn">
                    <Filter size={18} />
                    <span>Filters</span>
                </button>
            </div>

            <div className="reports-list">
                {reports.map(report => (
                    <div key={report.id} className={`report-card ${report.severity}`}>
                        <div className="report-header">
                            <div className="report-type">
                                <AlertTriangle size={16} />
                                <span>{report.type}</span>
                            </div>
                            <span className="report-time">{report.time}</span>
                        </div>
                        <p className="report-content">"{report.content}"</p>
                        <div className="report-author-info">
                            <span>Reported User: <strong>{report.author}</strong></span>
                        </div>
                        <div className="report-actions">
                            <button className="mod-action-btn approve">
                                <CheckCircle size={16} />
                                <span>Approve</span>
                            </button>
                            <button className="mod-action-btn remove">
                                <Flag size={16} />
                                <span>Remove</span>
                            </button>
                            <button className="mod-action-btn ban">
                                <UserX size={16} />
                                <span>Ban User</span>
                            </button>
                            <button className="mod-more-btn"><MoreVertical size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="trust-layer-settings">
                <h3>Trust Layer Configuration</h3>
                <div className="settings-grid">
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>AI Auto-Mod</h4>
                            <p>Automatically flag suspicious content.</p>
                        </div>
                        <div className="toggle-switch active"></div>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <h4>Verification Fast-Track</h4>
                            <p>Prioritize verification for top creators.</p>
                        </div>
                        <div className="toggle-switch"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Moderation;
