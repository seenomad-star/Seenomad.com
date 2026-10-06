import React, { useState } from 'react';
import { MessageSquare, Send, X, AtSign, ThumbsUp, Trash2 } from 'lucide-react';
import '../../../../styles/CommentSidebar.css';

const CommentSidebar = ({ onClose }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'Alex Rivera', text: 'Should we upgrade the Tokyo coliving stay to the 30-day pass or split 14d Tokyo / 14d Kyoto? @Sarah', time: '2m ago', likes: 2 },
        { id: 2, user: 'Sarah Chen', text: 'Splitting 14d Tokyo + 14d Kyoto with the JR Shinkansen pass keeps us $350 under budget! 🚄', time: '1m ago', likes: 3 }
    ]);

    const handleSend = () => {
        if (!comment.trim()) return;
        setComments((prev) => [
            ...prev,
            {
                id: Date.now(),
                user: 'You',
                text: comment.trim(),
                time: 'Just now',
                likes: 0
            }
        ]);
        setComment('');
    };

    const handleLike = (id) => {
        setComments((prev) =>
            prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
        );
    };

    const handleReply = (user) => {
        const handle = `@${user.split(' ')[0]} `;
        if (!comment.includes(handle)) {
            setComment((prev) => `${handle}${prev}`);
        }
    };

    const handleDelete = (id) => {
        setComments((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="comment-sidebar-container" style={{ width: '100%', borderLeft: 'none', borderRadius: '16px', marginTop: '1rem', border: '1px solid rgba(56, 189, 248, 0.22)' }}>
            <div className="cs-header">
                <div className="cs-title">
                    <MessageSquare size={17} color="#38BDF8" />
                    <h3>Trip <span>Discussion</span></h3>
                </div>
                {onClose && (
                    <button type="button" className="close-btn" onClick={onClose} aria-label="Close discussion">
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className="cs-conversations" style={{ maxHeight: '240px' }}>
                {comments.map((c) => (
                    <div className="comment-bubble" key={c.id}>
                        <div className="cb-header">
                            <span className="cb-user">{c.user}</span>
                            <span className="cb-time">{c.time}</span>
                        </div>
                        <p className="cb-text">{c.text}</p>
                        <div className="cb-actions">
                            <button type="button" className="cb-like" onClick={() => handleLike(c.id)}>
                                <ThumbsUp size={12} /> {c.likes}
                            </button>
                            <button type="button" className="cb-reply" onClick={() => handleReply(c.user)}>
                                Reply
                            </button>
                            {c.user === 'You' && (
                                <button
                                    type="button"
                                    className="cb-reply"
                                    onClick={() => handleDelete(c.id)}
                                    title="Delete comment"
                                >
                                    <Trash2 size={11} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="cs-input-area">
                <div className="cs-input-wrapper">
                    <AtSign size={14} className="at-icon" />
                    <textarea
                        placeholder="Mention @Sarah or @Alex to discuss itinerary changes..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                </div>
                <button type="button" className="cs-send-btn" onClick={handleSend}>
                    <Send size={16} />
                </button>
            </div>
        </div>
    );
};

export default CommentSidebar;
