import React, { useState } from 'react';
import { 
    Image, 
    MapPin, 
    Smile, 
    BarChart2, 
    Sparkles, 
    X, 
    Send, 
    Globe, 
    Check
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../styles/Composer.css';

const PRESET_LOCATIONS = [
    'Canggu, Bali',
    'Lisbon, Portugal',
    'Tokyo, Japan',
    'Medellin, Colombia',
    'Chiang Mai, Thailand',
    'Cape Town, South Africa'
];

const PRESET_PHOTOS = [
    { label: 'Sunset Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900' },
    { label: 'Nomad Cafe', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900' },
    { label: 'Tokyo Shinjuku', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900' },
    { label: 'Santorini Cliffs', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900' }
];

const VIBES = ['☕ Cafe Hopping', '💻 Deep Work', '🏄 Surf Session', '🎒 Exploring', '✈️ In Transit'];

const Composer = ({ onAddPost }) => {
    const { addToast } = useToastStore();
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [customImageUrl, setCustomImageUrl] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [selectedVibe, setSelectedVibe] = useState(null);
    const [showPoll, setShowPoll] = useState(false);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOption1, setPollOption1] = useState('');
    const [pollOption2, setPollOption2] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleAIPolish = () => {
        if (!content.trim()) {
            setContent('Checking into my new nomad base! 🌴 Fast fiber, friendly community, and unmatched views. #WorkFromAnywhere #DigitalNomad');
            addToast('AI Nomad Copilot drafted a travel update for you!', 'success');
            return;
        }

        let polished = content.trim();
        if (!polished.includes('#')) {
            polished += '\n\n#NomadLife #RemoteWork #GlobalCommunity';
        }
        setContent(polished);
        addToast('Post polished with travel tags & formatted!', 'success');
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!content.trim() && !selectedImage && !showPoll) return;

        const newPost = {
            id: `user-post-${Date.now()}`,
            author: {
                name: 'You',
                handle: '@your_journey',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                verified: true
            },
            time: 'Just now',
            location: selectedLocation || 'Nomad Hub',
            vibe: selectedVibe,
            content: content.trim(),
            media: selectedImage ? { type: 'image', url: selectedImage } : null,
            poll: showPoll && pollOption1 && pollOption2 ? {
                question: pollQuestion || 'Nomad Poll:',
                options: [
                    { text: pollOption1, votes: 0 },
                    { text: pollOption2, votes: 0 }
                ],
                totalVotes: 0
            } : null,
            stats: {
                replies: 0,
                reposts: 0,
                likes: 0,
                bookmarks: 0
            },
            userLiked: false,
            userReposted: false,
            userBookmarked: false,
            comments: []
        };

        if (onAddPost) {
            onAddPost(newPost);
        }

        // Reset state
        setContent('');
        setSelectedImage(null);
        setCustomImageUrl('');
        setShowImagePicker(false);
        setSelectedLocation(null);
        setShowLocationPicker(false);
        setSelectedVibe(null);
        setShowPoll(false);
        setPollQuestion('');
        setPollOption1('');
        setPollOption2('');
        setIsFocused(false);

        addToast('Post published to your nomad feed! 🚀', 'success');
    };

    return (
        <div className={`composer-card ${isFocused ? 'expanded' : ''}`}>
            <div className="composer-main-row">
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" 
                    alt="Your avatar" 
                    className="composer-user-avatar" 
                />

                <div className="composer-input-area">
                    {/* Active tags row */}
                    {(selectedLocation || selectedVibe) && (
                        <div className="composer-active-tags">
                            {selectedLocation && (
                                <span className="composer-tag location">
                                    <MapPin size={11} />
                                    {selectedLocation}
                                    <button onClick={() => setSelectedLocation(null)} aria-label="Remove location">
                                        <X size={10} />
                                    </button>
                                </span>
                            )}
                            {selectedVibe && (
                                <span className="composer-tag vibe">
                                    {selectedVibe}
                                    <button onClick={() => setSelectedVibe(null)} aria-label="Remove vibe">
                                        <X size={10} />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}

                    <textarea
                        className="composer-textarea"
                        placeholder="What's happening in your nomad journey? Share a tip, ask about cafes..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        rows={isFocused || content.length > 60 ? 3 : 2}
                    />

                    {/* Image Preview */}
                    {selectedImage && (
                        <div className="composer-media-preview">
                            <img src={selectedImage} alt="Attachment" className="preview-image" />
                            <button 
                                className="remove-media-btn" 
                                onClick={() => setSelectedImage(null)}
                                title="Remove photo"
                                aria-label="Remove photo"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}

                    {/* Poll Creator */}
                    {showPoll && (
                        <div className="composer-poll-box">
                            <div className="flex items-center justify-between mb-2">
                                <span className="poll-title">Nomad Community Poll</span>
                                <button onClick={() => setShowPoll(false)} className="text-gray-400 hover:text-white" aria-label="Close poll">
                                    <X size={14} />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Ask a question (e.g. Best coffee in Lisbon?)"
                                value={pollQuestion}
                                onChange={(e) => setPollQuestion(e.target.value)}
                                className="poll-input mb-2"
                            />
                            <div className="poll-options-grid">
                                <input
                                    type="text"
                                    placeholder="Option 1"
                                    value={pollOption1}
                                    onChange={(e) => setPollOption1(e.target.value)}
                                    className="poll-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Option 2"
                                    value={pollOption2}
                                    onChange={(e) => setPollOption2(e.target.value)}
                                    className="poll-input"
                                />
                            </div>
                        </div>
                    )}

                    {/* Expandable Image Chooser Drawer */}
                    {showImagePicker && (
                        <div className="composer-drawer">
                            <span className="drawer-heading">Choose Travel Photo:</span>
                            <div className="preset-photos-row">
                                {PRESET_PHOTOS.map((p, idx) => (
                                    <button
                                        key={idx}
                                        className="preset-photo-thumb"
                                        onClick={() => {
                                            setSelectedImage(p.url);
                                            setShowImagePicker(false);
                                        }}
                                        title={p.label}
                                    >
                                        <img src={p.url} alt={p.label} />
                                        <span>{p.label}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="custom-url-row">
                                <input
                                    type="text"
                                    placeholder="Or paste direct image URL..."
                                    value={customImageUrl}
                                    onChange={(e) => setCustomImageUrl(e.target.value)}
                                    className="custom-url-input"
                                />
                                <button
                                    className="apply-url-btn"
                                    onClick={() => {
                                        if (customImageUrl.trim()) {
                                            setSelectedImage(customImageUrl.trim());
                                            setCustomImageUrl('');
                                            setShowImagePicker(false);
                                        }
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Expandable Location Picker */}
                    {showLocationPicker && (
                        <div className="composer-drawer">
                            <span className="drawer-heading">Tag Nomad Destination:</span>
                            <div className="location-pills-row">
                                {PRESET_LOCATIONS.map((loc) => (
                                    <button
                                        key={loc}
                                        className={`location-choice-pill ${selectedLocation === loc ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedLocation(loc);
                                            setShowLocationPicker(false);
                                        }}
                                    >
                                        <MapPin size={11} />
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer Actions & Tools */}
                    <div className="composer-bottom-bar">
                        <div className="composer-tools-group">
                            <button 
                                type="button"
                                className={`tool-icon-btn ${selectedImage ? 'active' : ''}`}
                                onClick={() => setShowImagePicker(!showImagePicker)}
                                title="Attach photo"
                                aria-label="Attach photo"
                            >
                                <Image size={18} />
                            </button>

                            <button 
                                type="button"
                                className={`tool-icon-btn ${selectedLocation ? 'active' : ''}`}
                                onClick={() => setShowLocationPicker(!showLocationPicker)}
                                title="Tag location"
                                aria-label="Tag location"
                            >
                                <MapPin size={18} />
                            </button>

                            <button 
                                type="button"
                                className={`tool-icon-btn ${showPoll ? 'active' : ''}`}
                                onClick={() => setShowPoll(!showPoll)}
                                title="Create poll"
                                aria-label="Create poll"
                            >
                                <BarChart2 size={18} />
                            </button>

                            <div className="vibe-dropdown-wrapper">
                                <button 
                                    type="button"
                                    className={`tool-icon-btn ${selectedVibe ? 'active' : ''}`}
                                    onClick={() => {
                                        const nextIdx = selectedVibe ? (VIBES.indexOf(selectedVibe) + 1) % VIBES.length : 0;
                                        setSelectedVibe(VIBES[nextIdx]);
                                    }}
                                    title="Cycle nomad vibe"
                                    aria-label="Nomad vibe"
                                >
                                    <Smile size={18} />
                                </button>
                            </div>

                            <button 
                                type="button"
                                className="tool-icon-btn ai-polish-btn"
                                onClick={handleAIPolish}
                                title="AI Nomad Copilot polish"
                                aria-label="AI Nomad Copilot polish"
                            >
                                <Sparkles size={18} />
                            </button>
                        </div>

                        <div className="composer-submit-group">
                            {content.length > 0 && (
                                <span className="char-counter">
                                    {content.length}
                                </span>
                            )}
                            <button
                                type="button"
                                className="composer-post-btn"
                                onClick={handleSubmit}
                                disabled={!content.trim() && !selectedImage && !showPoll}
                            >
                                <span>Post</span>
                                <Send size={13} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Composer;
