import React, { useState } from 'react';
import { MessageSquare, Send, X, AtSign, ThumbsUp, Trash2 } from 'lucide-react';
import '../../../../styles/CommentSidebar.css';

const CommentSidebar = ({ onClose }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'Alex', text: 'Should we swap the sushi class for a ramen tour? @Sarah', time: '2m ago', likes: 2 },
        { id: 2, user: 'Sarah', text: 'I love both, but ramen sounds more filling! 🍜', time: '1m ago', likes: 1 }
    ]);

    const handleSend = () => {
        if (!comment) return;
        setComments([...comments, { 
            id: Date.now(), 
            user: 'You', 
            text: comment, 
            time: 'Just now', 
            likes: 0 
        }]);
        setComment('');
    };

    return (
        <div className="comment-sidebar-container">
            <div className="cs-header">
                <div className="cs-title">
                    <MessageSquare size={18} color="#A855F7" />
                    <h3>Trip <span>Discussion</span></h3>
                </div>
                <button className="close-btn" onClick={onClose}><X size={18} /></button>
            </div>

            <div className="cs-conversations">
                {comments.map((c) => (
                    <div className="comment-bubble" key={c.id}>
                        <div className="cb-header">
                            <span className="cb-user">{c.user}</span>
                            <span className="cb-time">{c.time}</span>
                        </div>
                        <p className="cb-text">{c.text}</p>
                        <div className="cb-actions">
                            <button className="cb-like"><ThumbsUp size={12} /> {c.likes}</button>
                            <button className="cb-reply">Reply</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cs-input-area">
                <div className="cs-input-wrapper">
                    <AtSign size={14} className="at-icon" />
                    <textarea 
                        placeholder="Add a comment..." 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button className="cs-send-btn" onClick={handleSend}>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default CommentSidebar;
