import React, { useState, useEffect } from 'react';
import {
    Share2, Mail, Copy, CheckCircle, Users, X, Shield,
    Trash2, Globe, Lock, UserPlus, Sparkles
} from 'lucide-react';
import { useToastStore } from '../../../../store/toastStore';
import '../../../../styles/ShareDraftModal.css';

const DEFAULT_COLLABORATORS = [
    { id: 'c-1', name: 'Alex Rivera', email: 'alex@seenomad.com', role: 'Editor', status: 'Active Now', color: '#38BDF8' },
    { id: 'c-2', name: 'Sarah Chen', email: 'sarah@nomad.io', role: 'Commenter', status: 'Accepted', color: '#10B981' },
    { id: 'c-3', name: 'Marcus Vance', email: 'marcus@roam.co', role: 'Viewer', status: 'Pending Invite', color: '#A855F7' }
];

const ShareDraftModal = ({
    isOpen = false,
    itineraryId = 'tokyo-kyoto-sprint',
    tripTitle = 'Expedition Blueprint',
    collaborators: externalCollaborators,
    onCollaboratorsChange,
    onClose
}) => {
    const { addToast } = useToastStore();
    const [email, setEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Editor');
    const [isSent, setIsSent] = useState(false);
    const [copied, setCopied] = useState(false);
    const [linkAccess, setLinkAccess] = useState('anyone-view'); // 'invite-only' | 'anyone-view' | 'anyone-edit'
    const [internalCollaborators, setInternalCollaborators] = useState(DEFAULT_COLLABORATORS);

    const invitedUsers = externalCollaborators || internalCollaborators;
    const updateUsers = (next) => {
        if (onCollaboratorsChange) {
            onCollaboratorsChange(next);
        } else {
            setInternalCollaborators(next);
        }
    };

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return undefined;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Do not render when modal is closed
    if (!isOpen) return null;

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://seenomad.com';
    const shareLink = `${origin}/explore/trip-builder?draft=${encodeURIComponent(itineraryId || 'draft-x89f2a')}`;

    const handleInvite = (e) => {
        e.preventDefault();
        const trimmed = email.trim();
        if (!trimmed) return;

        const namePart = trimmed.split('@')[0].replace(/[._-]/g, ' ');
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        const newCollaborator = {
            id: `collab-${Date.now()}`,
            name: formattedName,
            email: trimmed,
            role: inviteRole,
            status: 'Invite Sent',
            color: '#F59E0B'
        };

        updateUsers([newCollaborator, ...invitedUsers]);
        setIsSent(true);
        setEmail('');
        if (addToast) {
            addToast(`Invited ${trimmed} as ${inviteRole}`, 'success');
        }
        setTimeout(() => {
            setIsSent(false);
        }, 2200);
    };

    const handleRoleChange = (id, newRole) => {
        const next = invitedUsers.map((u) => (u.id === id ? { ...u, role: newRole } : u));
        updateUsers(next);
        if (addToast) {
            addToast(`Updated collaborator role to ${newRole}`, 'success');
        }
    };

    const handleRemoveUser = (id, userEmail) => {
        const next = invitedUsers.filter((u) => u.id !== id);
        updateUsers(next);
        if (addToast) {
            addToast(`Removed ${userEmail} from itinerary access`, 'info');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        if (addToast) {
            addToast('Collaboration link copied to clipboard', 'success');
        }
        setTimeout(() => setCopied(false), 2200);
    };

    return (
        <div
            className="modal-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget && onClose) {
                    onClose();
                }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="collab-modal-title"
        >
            <div className="share-draft-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="close-btn"
                    onClick={onClose}
                    aria-label="Close collaboration modal"
                >
                    <X size={18} />
                </button>

                <div className="sd-header">
                    <div className="sd-icon-wrapper">
                        <Share2 size={22} color="#38BDF8" />
                    </div>
                    <h2 id="collab-modal-title">
                        Collaborate on <span>Itinerary</span>
                    </h2>
                    <p>
                        Invite co-travelers to view, comment, split expenses, and propose module edits on{' '}
                        <strong>{tripTitle}</strong>.
                    </p>
                </div>

                <div className="sd-body">
                    {/* Invite Form */}
                    <form onSubmit={handleInvite} className="invite-form">
                        <label className="sd-field-label">INVITE CO-TRAVELER BY EMAIL</label>
                        <div className="invite-input-row">
                            <div className="email-input-wrapper">
                                <Mail size={15} className="mail-icon" />
                                <input
                                    type="email"
                                    placeholder="co-traveler@nomad.io"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <select
                                className="invite-role-select"
                                value={inviteRole}
                                onChange={(e) => setInviteRole(e.target.value)}
                                aria-label="Collaborator role"
                            >
                                <option value="Editor">Editor</option>
                                <option value="Commenter">Commenter</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                            <button type="submit" className={`invite-btn ${isSent ? 'sent' : ''}`}>
                                <UserPlus size={14} />
                                <span>{isSent ? 'Sent!' : 'Invite'}</span>
                            </button>
                        </div>
                    </form>

                    {/* Manage Access List */}
                    <div className="collaborator-history">
                        <div className="collab-list-header">
                            <h4>Manage Access ({invitedUsers.length} Collaborators)</h4>
                            <span className="collab-sync-tag">
                                <Sparkles size={11} /> Real-Time Budget Sync
                            </span>
                        </div>
                        <div className="invited-list">
                            {invitedUsers.map((user) => (
                                <div className="user-row" key={user.id || user.email}>
                                    <div
                                        className="user-avatar"
                                        style={{ background: user.color || '#3B82F6' }}
                                    >
                                        {(user.name || user.email)[0].toUpperCase()}
                                    </div>
                                    <div className="user-meta">
                                        <strong>{user.name || user.email}</strong>
                                        <span>
                                            {user.email} • <em>{user.status}</em>
                                        </span>
                                    </div>
                                    <select
                                        className="user-role-select"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        aria-label={`Change role for ${user.email}`}
                                    >
                                        <option value="Editor">Editor</option>
                                        <option value="Commenter">Commenter</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="user-remove-btn"
                                        onClick={() => handleRemoveUser(user.id, user.email)}
                                        title="Remove collaborator"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Link Sharing & Access Mode */}
                    <div className="sd-link-section">
                        <div className="sd-access-row">
                            <div className="sd-access-info">
                                {linkAccess === 'invite-only' ? (
                                    <Lock size={14} className="text-amber" />
                                ) : (
                                    <Globe size={14} className="text-sky" />
                                )}
                                <span>Shareable Expedition Link</span>
                            </div>
                            <select
                                className="sd-access-select"
                                value={linkAccess}
                                onChange={(e) => setLinkAccess(e.target.value)}
                            >
                                <option value="anyone-view">Anyone with link can view</option>
                                <option value="anyone-edit">Anyone with link can suggest edits</option>
                                <option value="invite-only">Restricted (Invited members only)</option>
                            </select>
                        </div>

                        <div className="copy-link-box">
                            <input type="text" readOnly value={shareLink} aria-label="Shareable itinerary link" />
                            <button
                                type="button"
                                onClick={handleCopy}
                                className={`copy-btn ${copied ? 'copied' : ''}`}
                            >
                                {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
                                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sd-footer">
                    <div className="active-collaborators">
                        <Users size={15} />
                        <span>Permissions & budget splits sync live across all collaborators.</span>
                    </div>
                    <button type="button" className="sd-done-btn" onClick={onClose}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareDraftModal;
