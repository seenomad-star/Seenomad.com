import React, { useState } from 'react';
import { 
    Image, 
    Video,
    MapPin, 
    FileText,
    Sparkles, 
    X, 
    Send, 
    Smile,
    BarChart2,
    Globe,
    Lock,
    Users,
    Check
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../styles/Composer.css';

const PRESET_LOCATIONS = [
    'Kyoto, Japan',
    'Canggu, Bali',
    'Santorini, Greece',
    'Lisbon, Portugal',
    'Shinjuku, Tokyo',
    'Medellin, Colombia',
    'Amalfi Coast, Italy'
];

const PRESET_PHOTOS = [
    { label: 'Bamboo Grove', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900' },
    { label: 'Sunset Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900' },
    { label: 'Mount Fuji', url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900' },
    { label: 'Santorini Cliffs', url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900' },
    { label: 'Amalfi Coast', url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900' }
];

const PRESET_FEELINGS = [
    { label: 'adventurous 🏄‍♂️', id: 'adventurous' },
    { label: 'working remote 💻', id: 'remote' },
    { label: 'eating street food 🍜', id: 'foodie' },
    { label: 'watching sunset 🌅', id: 'sunset' },
    { label: 'exploring hidden spots 🗺️', id: 'explorer' },
    { label: 'drinking matcha 🍵', id: 'relaxed' }
];

const Composer = ({ onAddPost }) => {
    const { addToast } = useToastStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const [content, setContent] = useState('');
    const [audience, setAudience] = useState('everyone');
    
    // Media selections
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedFeeling, setSelectedFeeling] = useState(null);
    
    // Drawers
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [showVideoPicker, setShowVideoPicker] = useState(false);
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [showFeelingPicker, setShowFeelingPicker] = useState(false);
    const [showPollCreator, setShowPollCreator] = useState(false);

    // Poll State
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOpt1, setPollOpt1] = useState('');
    const [pollOpt2, setPollOpt2] = useState('');

    const handleAIPolish = () => {
        if (!content.trim()) {
            setContent('Exploring another tranquil corner of the world today! Pristine views, high-speed fiber, and delicious local food. #SeeNomad #DigitalNomad #Explore');
            addToast('AI Travel Copilot drafted an update for you! ✨', 'success');
            return;
        }

        let polished = content.trim();
        if (!polished.includes('#')) {
            polished += '\n\n#SeeNomad #DigitalNomad #ExploreTheWorld';
        }
        setContent(polished);
        addToast('Post polished with travel hashtags! ✨', 'success');
    };

    const handleTogglePhoto = (url) => {
        if (selectedImages.includes(url)) {
            setSelectedImages(prev => prev.filter(u => u !== url));
        } else {
            if (selectedImages.length >= 4) {
                addToast('Maximum 4 photos per carousel', 'info');
                return;
            }
            setSelectedImages(prev => [...prev, url]);
            setSelectedVideo(null);
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        const hasText = content.trim().length > 0;
        const hasMedia = selectedImages.length > 0 || selectedVideo !== null;
        const hasPoll = pollQuestion.trim() && pollOpt1.trim() && pollOpt2.trim();

        if (!hasText && !hasMedia && !hasPoll) return;

        const newPost = {
            id: `user-post-${Date.now()}`,
            author: {
                name: 'Traveler',
                handle: '@traveler_t',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                verified: true
            },
            time: 'Just now',
            location: selectedLocation || null,
            feeling: selectedFeeling || null,
            content: content.trim(),
            images: selectedImages.length > 0 ? selectedImages : null,
            image: selectedImages.length === 1 ? selectedImages[0] : (selectedImages.length === 0 && selectedVideo ? selectedVideo.url : null),
            type: selectedVideo ? 'video' : (selectedImages.length > 1 ? 'carousel' : 'standard'),
            video: selectedVideo ? {
                thumbnail: selectedVideo.url,
                quality: '4K 60FPS',
                duration: '04:20',
                current: '00:00',
                chapters: [
                    { time: '0:00', title: 'Arrival & Drone View' },
                    { time: '1:45', title: 'Local Secret Spot' },
                    { time: '3:10', title: 'Sunset Wrap' }
                ]
            } : null,
            poll: hasPoll ? {
                question: pollQuestion.trim(),
                options: [
                    { text: pollOpt1.trim(), votes: 0 },
                    { text: pollOpt2.trim(), votes: 0 }
                ],
                totalVotes: 0
            } : null,
            likes: '1',
            comments: [],
            shares: 0,
            views: '1',
            userLiked: true
        };

        if (onAddPost) {
            onAddPost(newPost);
        }

        // Reset state
        setContent('');
        setSelectedImages([]);
        setSelectedVideo(null);
        setSelectedLocation(null);
        setSelectedFeeling(null);
        setShowImagePicker(false);
        setShowVideoPicker(false);
        setShowLocationPicker(false);
        setShowFeelingPicker(false);
        setShowPollCreator(false);
        setPollQuestion('');
        setPollOpt1('');
        setPollOpt2('');
        setIsExpanded(false);

        addToast('Published to your SeeNomad Travel Feed! 🚀', 'success');
    };

    const maxChars = 280;
    const charCount = content.length;
    const charProgress = Math.min(100, (charCount / maxChars) * 100);

    return (
        <div className="travel-share-box-card" id="composer-card">
            {/* Top Row: User Avatar + Input */}
            <div className="share-box-top-row">
                <div className="share-box-avatar" title="You (Traveler)">
                    <span>T</span>
                </div>

                {!isExpanded ? (
                    <div 
                        className="share-box-input-pill"
                        onClick={() => setIsExpanded(true)}
                        role="button"
                        tabIndex={0}
                    >
                        <span>What's happening on your journey? Share a secret spot, tip, or story...</span>
                    </div>
                ) : (
                    <div className="share-box-expanded-area">
                        {/* Audience Selector (Twitter Style) */}
                        <div className="share-audience-selector">
                            <button 
                                type="button" 
                                className="audience-pill-btn"
                                onClick={() => {
                                    setAudience(prev => prev === 'everyone' ? 'nomads' : 'everyone');
                                    addToast(audience === 'everyone' ? 'Audience: Nomads you follow' : 'Audience: Everyone', 'info');
                                }}
                            >
                                {audience === 'everyone' ? <Globe size={12} /> : <Users size={12} />}
                                <span>{audience === 'everyone' ? 'Everyone can reply' : 'Nomads you follow'}</span>
                            </button>
                        </div>

                        {/* Active tags badge row */}
                        {(selectedLocation || selectedFeeling) && (
                            <div className="share-active-tags-row">
                                {selectedLocation && (
                                    <span className="share-tag location">
                                        <MapPin size={11} />
                                        {selectedLocation}
                                        <button type="button" onClick={() => setSelectedLocation(null)} aria-label="Remove location">
                                            <X size={10} />
                                        </button>
                                    </span>
                                )}
                                {selectedFeeling && (
                                    <span className="share-tag feeling">
                                        feeling {selectedFeeling}
                                        <button type="button" onClick={() => setSelectedFeeling(null)} aria-label="Remove feeling">
                                            <X size={10} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}

                        <textarea
                            className="share-box-textarea"
                            placeholder="What's happening on your journey? Share a secret spot, tip, or story..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={3}
                            autoFocus
                        />

                        {/* Multi-Photo Carousel Preview (Instagram Style) */}
                        {selectedImages.length > 0 && (
                            <div className="composer-photos-preview-strip">
                                {selectedImages.map((imgUrl, i) => (
                                    <div key={i} className="composer-photo-preview-item">
                                        <img src={imgUrl} alt={`Upload ${i + 1}`} className="preview-mini-thumb" />
                                        <span className="preview-index-tag">{i + 1}/{selectedImages.length}</span>
                                        <button 
                                            type="button" 
                                            className="remove-mini-btn"
                                            onClick={() => setSelectedImages(prev => prev.filter(u => u !== imgUrl))}
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Video Preview (YouTube Style) */}
                        {selectedVideo && (
                            <div className="share-media-preview">
                                <img src={selectedVideo.url} alt="Video thumbnail" className="preview-img" />
                                <div className="video-badge-overlay">
                                    <Video size={14} />
                                    <span>YouTube 4K Travel Vlog · {selectedVideo.label}</span>
                                </div>
                                <button 
                                    type="button"
                                    className="remove-preview-btn" 
                                    onClick={() => setSelectedVideo(null)}
                                    aria-label="Remove video"
                                >
                                    <X size={13} />
                                </button>
                            </div>
                        )}

                        {/* Poll Preview (Facebook / Twitter Style) */}
                        {showPollCreator && (
                            <div className="composer-poll-box">
                                <input 
                                    type="text" 
                                    placeholder="Ask a travel question... (e.g. Best area in Tokyo?)" 
                                    value={pollQuestion}
                                    onChange={(e) => setPollQuestion(e.target.value)}
                                    className="poll-input question"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Option 1 (e.g. Shibuya)" 
                                    value={pollOpt1}
                                    onChange={(e) => setPollOpt1(e.target.value)}
                                    className="poll-input"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Option 2 (e.g. Shinjuku)" 
                                    value={pollOpt2}
                                    onChange={(e) => setPollOpt2(e.target.value)}
                                    className="poll-input"
                                />
                                <button 
                                    type="button" 
                                    className="remove-poll-btn"
                                    onClick={() => setShowPollCreator(false)}
                                >
                                    Remove Poll
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Photo Picker Drawer */}
            {isExpanded && showImagePicker && (
                <div className="composer-drawer">
                    <div className="drawer-header">
                        <span className="drawer-title">Select Travel Photos (Instagram Carousel):</span>
                        <span className="drawer-sub">{selectedImages.length}/4 selected</span>
                    </div>
                    <div className="drawer-photos-grid">
                        {PRESET_PHOTOS.map((p, idx) => {
                            const isSelected = selectedImages.includes(p.url);
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`drawer-photo-thumb ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleTogglePhoto(p.url)}
                                >
                                    <img src={p.url} alt={p.label} />
                                    {isSelected && (
                                        <div className="selected-check-badge">
                                            <Check size={12} />
                                        </div>
                                    )}
                                    <span>{p.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Video Picker Drawer */}
            {isExpanded && showVideoPicker && (
                <div className="composer-drawer">
                    <span className="drawer-title">Attach YouTube Travel Vlog:</span>
                    <div className="drawer-photos-grid">
                        {PRESET_PHOTOS.slice(0, 3).map((v, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className={`drawer-photo-thumb ${selectedVideo?.url === v.url ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedVideo({ label: v.label, url: v.url });
                                    setSelectedImages([]);
                                    setShowVideoPicker(false);
                                }}
                            >
                                <img src={v.url} alt={v.label} />
                                <span className="drawer-yt-tag">4K Vlog</span>
                                <span>{v.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Feeling Picker Drawer (Facebook Style) */}
            {isExpanded && showFeelingPicker && (
                <div className="composer-drawer">
                    <span className="drawer-title">How are you feeling on your journey?</span>
                    <div className="drawer-chips-wrap">
                        {PRESET_FEELINGS.map((f) => (
                            <button
                                key={f.id}
                                type="button"
                                className={`drawer-chip ${selectedFeeling === f.label ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedFeeling(f.label);
                                    setShowFeelingPicker(false);
                                }}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Location Picker Drawer */}
            {isExpanded && showLocationPicker && (
                <div className="composer-drawer">
                    <span className="drawer-title">Check-in at Location:</span>
                    <div className="drawer-chips-wrap">
                        {PRESET_LOCATIONS.map((loc, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className={`drawer-chip ${selectedLocation === loc ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedLocation(loc);
                                    setShowLocationPicker(false);
                                }}
                            >
                                <MapPin size={12} />
                                {loc}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Action Bar */}
            <div className="share-box-actions-bar">
                <div className="share-box-left-tools">
                    <button 
                        type="button" 
                        className={`tool-btn ${showImagePicker ? 'active' : ''}`}
                        onClick={() => {
                            setIsExpanded(true);
                            setShowImagePicker(!showImagePicker);
                            setShowVideoPicker(false);
                            setShowLocationPicker(false);
                            setShowFeelingPicker(false);
                        }}
                        title="Add Instagram Carousel Photos"
                    >
                        <Image size={17} className="text-sky-500" />
                        <span className="tool-label">Photos</span>
                    </button>

                    <button 
                        type="button" 
                        className={`tool-btn ${showVideoPicker ? 'active' : ''}`}
                        onClick={() => {
                            setIsExpanded(true);
                            setShowVideoPicker(!showVideoPicker);
                            setShowImagePicker(false);
                            setShowLocationPicker(false);
                            setShowFeelingPicker(false);
                        }}
                        title="Add YouTube Travel Vlog"
                    >
                        <Video size={17} className="text-red-500" />
                        <span className="tool-label">Video</span>
                    </button>

                    <button 
                        type="button" 
                        className={`tool-btn ${showPollCreator ? 'active' : ''}`}
                        onClick={() => {
                            setIsExpanded(true);
                            setShowPollCreator(!showPollCreator);
                        }}
                        title="Create Community Poll"
                    >
                        <BarChart2 size={17} className="text-amber-500" />
                        <span className="tool-label">Poll</span>
                    </button>

                    <button 
                        type="button" 
                        className={`tool-btn ${showFeelingPicker ? 'active' : ''}`}
                        onClick={() => {
                            setIsExpanded(true);
                            setShowFeelingPicker(!showFeelingPicker);
                            setShowImagePicker(false);
                            setShowVideoPicker(false);
                            setShowLocationPicker(false);
                        }}
                        title="Feeling / Activity"
                    >
                        <Smile size={17} className="text-yellow-500" />
                        <span className="tool-label">Feeling</span>
                    </button>

                    <button 
                        type="button" 
                        className={`tool-btn ${showLocationPicker ? 'active' : ''}`}
                        onClick={() => {
                            setIsExpanded(true);
                            setShowLocationPicker(!showLocationPicker);
                            setShowImagePicker(false);
                            setShowVideoPicker(false);
                            setShowFeelingPicker(false);
                        }}
                        title="Check in location"
                    >
                        <MapPin size={17} className="text-emerald-500" />
                        <span className="tool-label">Check in</span>
                    </button>

                    <button 
                        type="button" 
                        className="tool-btn ai-polish"
                        onClick={handleAIPolish}
                        title="AI Travel Copilot"
                    >
                        <Sparkles size={16} className="text-purple-400" />
                        <span className="tool-label font-bold text-purple-500">AI Polish</span>
                    </button>
                </div>

                <div className="share-box-right-tools">
                    {isExpanded && (
                        <>
                            {/* Twitter style circular progress indicator */}
                            <div className="char-count-indicator" title={`${maxChars - charCount} characters remaining`}>
                                <svg width="22" height="22" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2.5" />
                                    <circle 
                                        cx="12" 
                                        cy="12" 
                                        r="9" 
                                        fill="none" 
                                        stroke={charCount > 240 ? "#ef4444" : "#0284c7"} 
                                        strokeWidth="2.5"
                                        strokeDasharray="56.5"
                                        strokeDashoffset={56.5 - (56.5 * charProgress) / 100}
                                        transform="rotate(-90 12 12)"
                                    />
                                </svg>
                            </div>

                            <button 
                                type="button" 
                                className="composer-cancel-btn"
                                onClick={() => setIsExpanded(false)}
                            >
                                Cancel
                            </button>
                        </>
                    )}

                    <button 
                        type="button" 
                        className="share-submit-btn"
                        onClick={handleSubmit}
                        disabled={!content.trim() && selectedImages.length === 0 && !selectedVideo && !pollQuestion}
                    >
                        <Send size={14} />
                        <span>Post</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Composer;
