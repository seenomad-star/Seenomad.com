import React, { useState } from 'react';
import { Users, Receipt, ArrowRight, CheckCircle, CreditCard, Copy } from 'lucide-react';
import '../../../../styles/ExpenseSplitter.css';

const ExpenseSplitter = () => {
    const itineraryTotal = 3250;
    const [friends, setFriends] = useState([
        { id: 1, name: 'Alice Wong', paid: 0, avatar: 'A' },
        { id: 2, name: 'Marcus Chen', paid: 0, avatar: 'M' }
    ]);
    const [newFriend, setNewFriend] = useState('');
    
    // Add User (Current User)
    const totalMembers = friends.length + 1; // +1 for "You"
    const splitAmount = Math.round(itineraryTotal / totalMembers);

    const handleAddFriend = (e) => {
        e.preventDefault();
        if (!newFriend) return;
        setFriends([...friends, { id: Date.now(), name: newFriend, paid: 0, avatar: newFriend.charAt(0).toUpperCase() }]);
        setNewFriend('');
    };

    const handleSendRequest = (id) => {
        setFriends(friends.map(f => f.id === id ? { ...f, requested: true } : f));
    };

    return (
        <div className="expense-splitter-wrapper">
            <div className="es-header">
                <div className="es-title">
                    <Receipt size={24} color="#A855F7" />
                    <h2>FairSplit Engine</h2>
                </div>
                <div className="es-total-box">
                    <span>Total Itinerary Cost</span>
                    <h3>${itineraryTotal.toLocaleString()}</h3>
                </div>
            </div>

            <div className="es-body">
                <div className="es-split-info">
                    <div className="split-amount">
                        <span className="sa-label">Equitable Share (1/{totalMembers})</span>
                        <div className="sa-value">${splitAmount.toLocaleString()} <span>per person</span></div>
                    </div>
                </div>

                <div className="es-members-list">
                    <h3><Users size={16} /> Travel Group</h3>
                    
                    {/* User */}
                    <div className="member-row you-row">
                        <div className="m-info">
                            <div className="m-avatar you">Y</div>
                            <span className="m-name">You (Organizer)</span>
                        </div>
                        <div className="m-status paid">
                            <CheckCircle size={16} /> Covered
                        </div>
                    </div>

                    {/* Friends */}
                    {friends.map(f => (
                        <div className="member-row" key={f.id}>
                            <div className="m-info">
                                <div className="m-avatar">{f.avatar}</div>
                                <span className="m-name">{f.name}</span>
                            </div>
                            <div className="m-actions">
                                {f.requested ? (
                                    <span className="pending-badge">Request Sent</span>
                                ) : (
                                    <button className="request-btn" onClick={() => handleSendRequest(f.id)}>
                                        Request ${splitAmount} <ArrowRight size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleAddFriend} className="add-member-form">
                    <input 
                        type="text" 
                        placeholder="Add friend's name to split..." 
                        value={newFriend}
                        onChange={(e) => setNewFriend(e.target.value)}
                    />
                    <button type="submit">Add to Tab</button>
                </form>

                <div className="es-crypto-bridge">
                    <div className="cb-info">
                        <CreditCard size={18} />
                        <div>
                            <h4>Accept Crypto & Venmo</h4>
                            <p>Send users a decentralized payment link.</p>
                        </div>
                    </div>
                    <button className="copy-pay-link"><Copy size={14} /> Copy Link</button>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSplitter;
