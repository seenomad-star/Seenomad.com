import React, { useState } from 'react';
import {
    Search,
    MessageCircle,
    Users,
    Zap,
    DollarSign,
    Sparkles,
    MoreVertical,
    Send,
    Image as ImageIcon,
    Mic,
    Smile,
    Lock,
    CheckCheck
} from 'lucide-react';

const Messaging = () => {
    const [chats, setChats] = useState([
        {
            id: 1,
            name: "Elena Rodriguez",
            avatar: "ER",
            lastMessage: "The itinerary for Lisbon is ready!",
            time: "14:20",
            unread: 2,
            isCreator: true,
            isPaid: true,
            status: "online"
        },
        {
            id: 2,
            name: "Bali Nomads Group",
            avatar: "BN",
            lastMessage: "Marco: Who's up for a surf session?",
            time: "12:05",
            unread: 0,
            isGroup: true,
            status: "active"
        },
        {
            id: 3,
            name: "Marco Chen",
            avatar: "MC",
            lastMessage: "Thanks for the tips!",
            time: "Yesterday",
            unread: 0,
            isCreator: true,
            isPaid: false,
            status: "offline"
        }
    ]);

    const [activeChat, setActiveChat] = useState(chats[0]);

    return (
        <div className="messaging-module">
            {/* Sidebar: Chat List */}
            <div className="messaging-sidebar">
                <div className="sidebar-header">
                    <h2>Messages</h2>
                    <div className="header-actions">
                        <button className="new-chat-btn"><MessageCircle size={20} /></button>
                    </div>
                </div>

                <div className="search-chats">
                    <Search size={18} />
                    <input type="text" placeholder="Search messages..." />
                </div>

                <div className="chat-filters">
                    <button className="filter-chip active">All</button>
                    <button className="filter-chip">Creators</button>
                    <button className="filter-chip">Groups</button>
                    <button className="filter-chip">Unread</button>
                </div>

                <div className="chat-list">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className={`chat-item ${activeChat.id === chat.id ? 'active' : ''}`}
                            onClick={() => setActiveChat(chat)}
                        >
                            <div className="chat-avatar-container">
                                <div className="chat-avatar">{chat.avatar}</div>
                                <div className={`status-dot ${chat.status}`}></div>
                            </div>
                            <div className="chat-info">
                                <div className="chat-name-row">
                                    <span className="chat-name">{chat.name}</span>
                                    <span className="chat-time">{chat.time}</span>
                                </div>
                                <div className="chat-preview-row">
                                    <p className="chat-preview">{chat.lastMessage}</p>
                                    {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                                    {chat.isPaid && <DollarSign size={12} className="paid-icon" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main: Chat Window */}
            <div className="chat-window">
                <div className="chat-window-header">
                    <div className="active-chat-info">
                        <div className="active-avatar">{activeChat.avatar}</div>
                        <div className="active-details">
                            <h3>{activeChat.name}</h3>
                            <span className="active-status">{activeChat.status === 'online' ? 'Online' : 'Active 5m ago'}</span>
                        </div>
                    </div>
                    <div className="chat-header-actions">
                        {activeChat.isPaid && (
                            <div className="priority-badge">
                                <Zap size={14} fill="currentColor" />
                                <span>PRIORITY INBOX</span>
                            </div>
                        )}
                        <button className="header-action-btn"><MoreVertical size={20} /></button>
                    </div>
                </div>

                <div className="chat-messages-area">
                    <div className="message-date-divider">Today</div>

                    <div className="message received">
                        <div className="message-bubble">
                            Hey! I saw you were interested in the Lisbon guide.
                        </div>
                        <span className="message-time">14:15</span>
                    </div>

                    <div className="message sent">
                        <div className="message-bubble">
                            Yes! I'm planning to head there next month.
                        </div>
                        <div className="message-meta">
                            <span className="message-time">14:18</span>
                            <CheckCheck size={14} className="read-receipt" />
                        </div>
                    </div>

                    <div className="message received">
                        <div className="message-bubble">
                            The itinerary for Lisbon is ready! I've included all the secret co-working spots.
                        </div>
                        <span className="message-time">14:20</span>
                    </div>

                    {/* AI Assist Suggestion */}
                    <div className="ai-assist-box">
                        <div className="ai-assist-header">
                            <Sparkles size={14} />
                            <span>AI REPLY ASSIST</span>
                        </div>
                        <div className="ai-suggestions">
                            <button className="suggestion-btn">That's amazing, thank you!</button>
                            <button className="suggestion-btn">How much for the full guide?</button>
                        </div>
                    </div>
                </div>

                <div className="chat-input-area">
                    <div className="input-actions">
                        <button className="input-action-btn"><ImageIcon size={20} /></button>
                        <button className="input-action-btn"><Mic size={20} /></button>
                    </div>
                    <div className="message-input-container">
                        <input type="text" placeholder="Type a message..." />
                        <button className="emoji-btn"><Smile size={20} /></button>
                    </div>
                    <button className="send-btn">
                        <Send size={20} />
                    </button>
                </div>

                {/* Monetization Hook for DMs */}
                {!activeChat.isPaid && activeChat.isCreator && (
                    <div className="paid-dm-overlay">
                        <div className="paid-dm-content">
                            <Lock size={24} />
                            <h3>Priority Creator Access</h3>
                            <p>Support {activeChat.name.split(' ')[0]} and get priority replies.</p>
                            <button className="unlock-priority-btn">
                                <Zap size={16} fill="currentColor" />
                                <span>Unlock Priority for $0.99</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messaging;
