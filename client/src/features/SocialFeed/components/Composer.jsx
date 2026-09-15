import React from 'react';
import {
    Image as ImageIcon,
    Sparkles,
    BarChart2,
    Smile,
    Calendar,
    MapPin
} from 'lucide-react';

const Composer = () => {
    return (
        <div className="composer-container">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="You" className="composer-avatar" />
            <div className="composer-content">
                <input
                    type="text"
                    placeholder="What is happening?!"
                    className="composer-input"
                />
                <div className="composer-actions">
                    <div className="composer-tools">
                        <button className="tool-btn"><ImageIcon size={18} /></button>
                        <button className="tool-btn"><Sparkles size={18} /></button>
                        <button className="tool-btn"><BarChart2 size={18} /></button>
                        <button className="tool-btn"><Smile size={18} /></button>
                        <button className="tool-btn"><Calendar size={18} /></button>
                        <button className="tool-btn"><MapPin size={18} /></button>
                    </div>
                    <button className="post-submit-btn">Post</button>
                </div>
            </div>
        </div>
    );
};

export default Composer;
