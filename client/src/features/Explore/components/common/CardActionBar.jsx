import React from 'react';
import { Heart, Share2, MessageCircle, Info, MoreVertical } from 'lucide-react';
import './CardActionBar.css';

const CardActionBar = ({ onSave, onShare, onComment, onInfo, onMore, isSaved, className = "" }) => {
    return (
        <div className={`card-action-bar-vertical ${className}`}>
            <button className={`action-item ${isSaved ? 'active' : ''}`} onClick={onSave} title={isSaved ? "Remove from Saved" : "Save"}>
                <Heart size={20} fill={isSaved ? "#ef4444" : "none"} color={isSaved ? "#ef4444" : "currentColor"} />
            </button>
            <button className="action-item" onClick={onShare} title="Share">
                <Share2 size={20} />
            </button>
            <button className="action-item" onClick={onComment} title="Comment">
                <MessageCircle size={20} />
            </button>
            <button className="action-item" onClick={onInfo} title="Details">
                <Info size={20} />
            </button>
            <div className="action-divider"></div>
            <button className="action-item more" onClick={onMore} title="More Options">
                <MoreVertical size={20} />
            </button>
        </div>
    );
};

export default CardActionBar;
