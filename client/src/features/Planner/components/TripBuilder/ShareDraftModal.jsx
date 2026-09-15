import React, { useState } from 'react';
import { Share2, Mail, Copy, CheckCircle, Users } from 'lucide-react';
import '../../../../styles/ShareDraftModal.css';

const ShareDraftModal = ({ itineraryId, onClose }) => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [copied, setCopied] = useState(false);
    const [invitedUsers, setInvitedUsers] = useState([
        { email: 'alex@traveluh.com', role: 'Editor', status: 'Accepted' },
        { email: 'sarah@nomad.io', role: 'Viewer', status: 'Pending' }
    ]);

    const shareLink = `https://traveluh.com/itinerary/shared/${itineraryId || 'draft-x89f2a'}`;

    const handleInvite = (e) => {
        e.preventDefault();
        if(!email) return;
        setIsSent(true);
        setInvitedUsers([{ email, role: 'Commenter', status: 'Sending...' }, ...invitedUsers]);
        setTimeout(() => {
            setIsSent(false);
            setEmail('');
        }, 3000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="modal-backdrop">
            <div className="share-draft-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                
                <div className="sd-header">
                    <div className="sd-icon-wrapper">
                        <Share2 size={24} color="#A855F7" />
                    </div>
                    <h2>Collaborate on <span>Itinerary</span></h2>
                    <p>Invite friends to view, comment on, and suggest edits.</p>
                </div>

                <div className="sd-body">
                    <form onSubmit={handleInvite} className="invite-form">
                        <div className="invite-input-row">
                            <div className="email-input-wrapper">
                                <Mail size={16} className="mail-icon" />
                                <input 
                                    type="email" 
                                    placeholder="Enter email address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button type="submit" className={`invite-btn ${isSent ? 'sent' : ''}`}>
                                {isSent ? 'Sent!' : 'Invite'}
                            </button>
                        </div>
                    </form>

                    <div className="collaborator-history">
                        <h4>Manage Access</h4>
                        <div className="invited-list">
                            {invitedUsers.map((user, i) => (
                                <div className="user-row" key={i}>
                                    <div className="user-avatar">{user.email[0].toUpperCase()}</div>
                                    <div className="user-meta">
                                        <strong>{user.email}</strong>
                                        <span>{user.status}</span>
                                    </div>
                                    <div className="user-role">{user.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="copy-link-box">
                        <input type="text" readOnly value={shareLink} />
                        <button onClick={handleCopy} className={`copy-btn ${copied ? 'copied' : ''}`}>
                            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy Link'}
                        </button>
                    </div>
                </div>

                <div className="sd-footer">
                    <div className="active-collaborators">
                        <Users size={16} />
                        <span>Permissions are managed by the trip owner.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareDraftModal;
