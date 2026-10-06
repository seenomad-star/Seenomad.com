import React, { useState } from 'react';
import { History, Check, X, AlertCircle, ArrowRight } from 'lucide-react';
import '../../../../styles/SuggestedEditsPanel.css';

const SuggestedEditsPanel = ({ onApprove, onReject }) => {
    const [suggestions, setSuggestions] = useState([
        {
            id: 1,
            user: 'Sarah Chen',
            type: 'add',
            item: 'Local Guardian VIP Airport Pickup & SIM Setup',
            price: 95,
            priceLabel: '$95',
            modulePayload: {
                id: 'ac-1',
                type: 'activities',
                title: 'Local Guardian VIP Airport Pickup, Transit Card & SIM Setup',
                provider: 'SeeNomad Local Guardians',
                country: 'Global',
                flag: '🤝',
                region: 'global',
                price: 95,
                unitLabel: 'Arrival Orientation Package',
                duration: 'Day 1 • 3h Private Arrival Briefing',
                wifiMbps: 0,
                resourceUrl: '/explore/guardians',
                note: 'Suggested by Sarah Chen for Day 1 arrival.'
            },
            status: 'pending'
        },
        {
            id: 2,
            user: 'Alex Rivera',
            type: 'add',
            item: 'WeWork All Access Global Pass (24/7 Desk)',
            price: 299,
            priceLabel: '$299',
            modulePayload: {
                id: 'cw-1',
                type: 'coworking',
                title: 'WeWork All Access Global Pass (24/7 Dedicated Desk)',
                provider: 'WeWork Global Network',
                country: 'Global',
                flag: '🌐',
                region: 'global',
                price: 299,
                unitLabel: '30-Day Global Membership',
                duration: 'Unlimited 24/7 Access in 70+ Cities',
                wifiMbps: 500,
                resourceUrl: 'https://www.wework.com/',
                note: 'Suggested by Alex Rivera for backup coworking access.'
            },
            status: 'pending'
        }
    ]);

    const handleAction = (suggestion, action) => {
        setSuggestions((prev) =>
            prev.map((s) => (s.id === suggestion.id ? { ...s, status: action } : s))
        );
        if (action === 'approved' && onApprove && suggestion.modulePayload) {
            onApprove(suggestion.modulePayload);
        }
        if (action === 'rejected' && onReject) {
            onReject(suggestion);
        }
    };

    const pendingList = suggestions.filter((s) => s.status === 'pending');

    return (
        <div className="suggestions-panel-container">
            <div className="sp-header">
                <History size={18} color="#38BDF8" />
                <h3>Proposed <span>Co-Traveler Edits</span></h3>
            </div>

            <div className="sp-list">
                {pendingList.map((s) => (
                    <div className="suggestion-card" key={s.id}>
                        <div className="sc-user">
                            <div className="avatar">{s.user[0]}</div>
                            <span>
                                <strong>{s.user}</strong> proposed adding a module
                            </span>
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
                                    <span>
                                        Add <strong>{s.item}</strong>
                                    </span>
                                    <div className="diff">+{s.priceLabel}</div>
                                </div>
                            )}
                        </div>

                        <div className="sc-actions">
                            <button
                                type="button"
                                className="reject-btn"
                                onClick={() => handleAction(s, 'rejected')}
                            >
                                <X size={15} /> Reject
                            </button>
                            <button
                                type="button"
                                className="approve-btn"
                                onClick={() => handleAction(s, 'approved')}
                            >
                                <Check size={15} /> Approve & Add
                            </button>
                        </div>
                    </div>
                ))}

                {pendingList.length === 0 && (
                    <div className="empty-suggestions">
                        <Check size={22} color="#10B981" />
                        <p>All collaborator proposals reviewed.</p>
                    </div>
                )}
            </div>

            <div className="sp-footer">
                <AlertCircle size={12} />
                <span>Approving changes automatically adds modules & updates the live budget.</span>
            </div>
        </div>
    );
};

export default SuggestedEditsPanel;
