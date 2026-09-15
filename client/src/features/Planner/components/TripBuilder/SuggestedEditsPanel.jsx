import React, { useState } from 'react';
import { History, Check, X, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';
import '../../../../styles/SuggestedEditsPanel.css';

const SuggestedEditsPanel = ({ onApprove, onReject }) => {
    const [suggestions, setSuggestions] = useState([
        { id: 1, user: 'Sarah', type: 'swap', from: 'Shinjuku Capsule Hotel', to: 'Park Hyatt Tokyo', diff: '+$850', status: 'pending' },
        { id: 2, user: 'Alex', type: 'add', item: 'Ghibli Museum Tour', price: '$45', status: 'pending' }
    ]);

    const handleAction = (id, action) => {
        setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: action } : s));
    };

    return (
        <div className="suggestions-panel-container">
            <div className="sp-header">
                <History size={18} color="#A855F7" />
                <h3>Proposed <span>Changes</span></h3>
            </div>

            <div className="sp-list">
                {suggestions.filter(s => s.status === 'pending').map((s) => (
                    <div className="suggestion-card" key={s.id}>
                        <div className="sc-user">
                            <div className="avatar"> {s.user[0]} </div>
                            <span><strong>{s.user}</strong> suggested a change</span>
                        </div>
                        
                        <div className="sc-content">
                            {s.type === 'swap' ? (
                                <div className="swap-view">
                                    <div className="old">{s.from}</div>
                                    <ArrowRight size={14} />
                                    <div className="new">{s.to}</div>
                                    <div className="diff">{s.diff}</div>
                                </div>
                            ) : (
                                <div className="add-view">
                                    <span>Add <strong>{s.item}</strong></span>
                                    <div className="diff">+{s.price}</div>
                                </div>
                            )}
                        </div>

                        <div className="sc-actions">
                            <button className="reject-btn" onClick={() => handleAction(s.id, 'rejected')}>
                                <X size={16} /> Reject
                            </button>
                            <button className="approve-btn" onClick={() => handleAction(s.id, 'approved')}>
                                <Check size={16} /> Approve
                            </button>
                        </div>
                    </div>
                ))}

                {suggestions.filter(s => s.status === 'pending').length === 0 && (
                    <div className="empty-suggestions">
                        <Check size={24} color="#10B981" />
                        <p>All suggestions reviewed.</p>
                    </div>
                )}
            </div>

            <div className="sp-footer">
                <AlertCircle size={12} />
                <span>Approving changes will update the Trip budget live.</span>
            </div>
        </div>
    );
};

export default SuggestedEditsPanel;
