import React from 'react';
import { Heart, Share2, MessageCircle, Info, MoreVertical } from 'lucide-react';
import './CardActionBar.css';

const CardActionBar = ({ onSave, onShare, onComment, onInfo, onMore, isSaved, className = "" }) => {
    return (
        <div className={`card-action-bar-vertical ${className}`} role="toolbar" aria-label="Card actions">
            <button
                type="button"
                className={`action-item ${isSaved ? 'active' : ''}`}
                onClick={onSave}
                title={isSaved ? "Remove from Saved" : "Save Destination"}
                aria-label={isSaved ? "Remove from Saved" : "Save"}
            >
                <Heart size={15} fill={isSaved ? "#ef4444" : "none"} color={isSaved ? "#ef4444" : "currentColor"} />
            </button>
            <button
                type="button"
                className="action-item"
                onClick={onShare}
                title="Share Destination"
                aria-label="Share"
            >
                <Share2 size={15} />
            </button>
            <button
                type="button"
                className="action-item"
                onClick={onComment}
                title="Community Discussion"
                aria-label="Comment"
            >
                <MessageCircle size={15} />
            </button>
            <button
                type="button"
                className="action-item"
                onClick={onInfo}
                title="View Deep Dive Intelligence"
                aria-label="Details"
            >
                <Info size={15} />
            </button>
            <div className="action-divider"></div>
            <button
                type="button"
                className="action-item more"
                onClick={onMore}
                title="More Options"
                aria-label="More"
            >
                <MoreVertical size={15} />
            </button>
        </div>
    );
};

export default CardActionBar;
