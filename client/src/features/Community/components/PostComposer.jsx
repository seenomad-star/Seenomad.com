import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Image as ImageIcon, Video, MapPin, Users, 
    Sparkles, Send, Hash, Globe, Smile, Zap
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import '../../../styles/NomadFeatures.css';

const PostComposer = ({ isOpen, onClose }) => {
    const { addXP } = useNomadOSStore();
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [media, setMedia] = useState([]);
    const [location, setLocation] = useState('Bali, Indonesia');
    const [audience, setAudience] = useState('Public');

    const handleAICaption = () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            const suggestions = [
                "Sunsets in Bali are just built different. 🌅 Waking up to this view is the ultimate nomad fuel. #Seenomad #BaliLife",
                "Found the perfect flow today at Dojo. Fast Wi-Fi + Good Vibes = Peak Productivity. ☕️📡",
                "Just crossed country #15! The journey is the reward. Who's in Lisbon next week? 🇵🇹✈️"
            ];
            setContent(suggestions[Math.floor(Math.random() * suggestions.length)]);
            setIsGenerating(false);
        }, 1500);
    };

    const handlePost = () => {
        if (!content.trim()) return;
        
        // Simulate posting
        window.dispatchEvent(new CustomEvent('add-toast', { 
            detail: { message: 'Post shared to the Nomad Feed! +50 XP 🚀', type: 'success' } 
        }));
        addXP(50);
        setContent('');
        setMedia([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="smt-modal-overlay" onClick={onClose}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="smt-modal composer-modal"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="smt-modal-header">
                        <h3><Zap size={18} fill="#f59e0b" stroke="#f59e0b" /> Create Post</h3>
                        <button className="smt-close-btn" onClick={onClose}><X size={20} /></button>
                    </div>

                    <div className="composer-user-meta">
                        <div className="composer-avatar">JS</div>
                        <div className="composer-meta-info">
                            <span className="composer-name">John Smith</span>
                            <div className="composer-selectors">
                                <button className="selector-chip" onClick={() => setAudience(audience === 'Public' ? 'Mates Only' : 'Public')}>
                                    <Globe size={12} />
                                    <span>{audience}</span>
                                </button>
                                <button className="selector-chip">
                                    <MapPin size={12} />
                                    <span>{location}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="composer-input-area">
                        <textarea 
                            placeholder="Where has the road taken you today?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        
                        <div className="composer-media-preview">
                            {media.length > 0 && (
                                <div className="preview-grid">
                                    {media.map((m, i) => (
                                        <div key={i} className="preview-item">
                                            <img src={m} alt="preview" />
                                            <button className="remove-media" onClick={() => setMedia(media.filter((_, idx) => idx !== i))}>
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="composer-toolbar">
                        <div className="toolbar-left">
                            <button className="tool-btn" title="Add Image" onClick={() => setMedia([...media, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=200&q=80'])}>
                                <ImageIcon size={20} />
                            </button>
                            <button className="tool-btn" title="Add Video">
                                <Video size={20} />
                            </button>
                            <button className="tool-btn" title="Tag Mates">
                                <Users size={20} />
                            </button>
                            <button className="tool-btn" title="Add Location">
                                <MapPin size={20} />
                            </button>
                            <button className="tool-btn" title="Emoji">
                                <Smile size={20} />
                            </button>
                        </div>
                        
                        <button 
                            className={`ai-magic-btn ${isGenerating ? 'loading' : ''}`}
                            onClick={handleAICaption}
                            disabled={isGenerating}
                        >
                            <Sparkles size={16} />
                            <span>{isGenerating ? 'Aria is thinking...' : 'AI Caption'}</span>
                        </button>
                    </div>

                    <div className="composer-footer">
                        <div className="character-count">{content.length} / 2200</div>
                        <button 
                            className="primary-post-btn" 
                            disabled={!content.trim() && media.length === 0}
                            onClick={handlePost}
                        >
                            <Send size={18} />
                            <span>Post to Feed</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PostComposer;
