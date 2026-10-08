import React, { useState, useRef, useEffect } from 'react';
import {
    Camera,
    Upload,
    Film,
    MapPin,
    ShieldCheck,
    Scale,
    CheckCircle2,
    X,
    Video,
    Square,
    RotateCcw,
    Sparkles,
    Volume2,
    AlertCircle,
    Navigation,
    Plus
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const CURATED_SAMPLE_CLIPS = [
    {
        id: 'clip-1',
        title: 'Uluwatu Cliffside Ocean Swell',
        location: 'Uluwatu, Bali · Indonesia',
        coords: '8.8291° S, 115.0849° E',
        duration: '0:15',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1090-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=80',
        mood: 'coastal'
    },
    {
        id: 'clip-2',
        title: 'Kyoto Cedar Forest Morning Walk',
        location: 'Arashiyama, Kyoto · Japan',
        coords: '35.0094° N, 135.6670° E',
        duration: '0:18',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-travel-vlog-walking-in-a-forest-42991-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=80',
        mood: 'nature'
    },
    {
        id: 'clip-3',
        title: 'Nordic Waterfall & Alpine Mist',
        location: 'Lofoten Islands, Norway',
        coords: '67.9325° N, 13.0886° E',
        duration: '0:12',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&auto=format&fit=crop&q=80',
        mood: 'nature'
    },
    {
        id: 'clip-4',
        title: 'Seoul Night Market Sizzle & Neon',
        location: 'Gwangjang Market, Seoul · South Korea',
        coords: '37.5700° N, 126.9996° E',
        duration: '0:20',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-street-food-market-in-seoul-42993-large.mp4',
        thumb: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=80',
        mood: 'food'
    }
];

const QUICK_LOCATION_PINS = [
    { label: 'Uluwatu, Bali · Indonesia', coords: '8.8291° S, 115.0849° E' },
    { label: 'Kyoto, Japan', coords: '35.0116° N, 135.7681° E' },
    { label: 'Lisbon, Portugal', coords: '38.7223° N, 9.1393° W' },
    { label: 'Seoul, South Korea', coords: '37.5665° N, 126.9780° E' },
    { label: 'Oaxaca, Mexico', coords: '17.0732° N, 96.7266° W' },
    { label: 'Lofoten, Norway', coords: '68.2086° N, 13.8825° E' }
];

const LICENSE_TYPES = [
    {
        id: 'original-ip',
        label: 'Original Creator License (© All Rights Reserved)',
        badge: '© Original Clip',
        desc: '100% original footage recorded by you with full commercial & platform distribution rights.'
    },
    {
        id: 'cc-by-nomad',
        label: 'Creative Commons Attribution (CC BY 4.0 · Remixable)',
        badge: 'CC BY 4.0 · Remixable',
        desc: 'Allows other travelers to clone and remix your clip with automatic creator attribution.'
    },
    {
        id: 'royalty-cleared',
        label: 'Royalty-Free / Cleared Ambient Audio & Visuals',
        badge: 'Royalty-Cleared',
        desc: 'Verified royalty-free soundscape and cleared public landmark visuals.'
    }
];

const NewVibeModal = ({ isOpen, onClose, onPublish, categories = [] }) => {
    const { addToast } = useToastStore();
    const fileInputRef = useRef(null);
    const liveVideoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);

    // Source Tab: 'upload' | 'record' | 'library'
    const [sourceTab, setSourceTab] = useState('upload');

    // Recording State
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordSeconds, setRecordSeconds] = useState(0);
    const [cameraError, setCameraError] = useState('');

    // Form State
    const [title, setTitle] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [locationTags, setLocationTags] = useState([
        { label: 'Uluwatu, Bali · Indonesia', coords: '8.8291° S, 115.0849° E' }
    ]);
    const [category, setCategory] = useState('nature');
    const [mediaType, setMediaType] = useState('video');
    const [mediaUrl, setMediaUrl] = useState('');
    const [posterImage, setPosterImage] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [soundscape, setSoundscape] = useState('Natural Ambient Field Recording (432 Hz)');
    const [story, setStory] = useState('');

    // Copyright & Legal Consent State
    const [licenseType, setLicenseType] = useState('original-ip');
    const [consentOriginalOwner, setConsentOriginalOwner] = useState(true);
    const [consentModelLocationRelease, setConsentModelLocationRelease] = useState(true);
    const [consentDistributionRights, setConsentDistributionRights] = useState(true);

    // Cleanup camera stream on close or unmount
    const stopCameraStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsCameraActive(false);
        setIsRecording(false);
    };

    useEffect(() => {
        if (!isOpen) {
            stopCameraStream();
        }
        return () => stopCameraStream();
    }, [isOpen]);

    // Recording timer
    useEffect(() => {
        if (!isRecording) return;
        const interval = setInterval(() => {
            setRecordSeconds((prev) => {
                if (prev >= 30) {
                    handleStopRecording();
                    return 30;
                }
                return prev + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRecording]);

    if (!isOpen) return null;

    const handleStartCamera = async () => {
        setCameraError('');
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera API unavailable in this browser');
            }
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            streamRef.current = stream;
            setIsCameraActive(true);
            if (liveVideoRef.current) {
                liveVideoRef.current.srcObject = stream;
            }
        } catch {
            setCameraError('Live camera access unavailable in preview — simulated 4K travel clip recorder active.');
            setIsCameraActive(true);
        }
    };

    const handleStartRecording = () => {
        setRecordSeconds(0);
        setIsRecording(true);

        if (streamRef.current && typeof MediaRecorder !== 'undefined') {
            try {
                const chunks = [];
                const recorder = new MediaRecorder(streamRef.current);
                recorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) chunks.push(e.data);
                };
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    setMediaUrl(url);
                    setMediaType('video');
                    setUploadedFileName(`Recorded_Vibe_${new Date().toLocaleTimeString()}.webm`);
                    addToast('Recorded travel clip attached! 🎬', 'success');
                };
                mediaRecorderRef.current = recorder;
                recorder.start();
            } catch {
                // Fallback to simulated clip on stop
            }
        }
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        } else {
            // Simulated recorded clip fallback
            const sample = CURATED_SAMPLE_CLIPS[0];
            setMediaUrl(sample.videoUrl);
            setPosterImage(sample.thumb);
            setMediaType('video');
            setUploadedFileName(`Recorded_Clip_${recordSeconds || 8}s_4K.mp4`);
            addToast(`Captured ${recordSeconds || 8}s travel clip! 🎥`, 'success');
        }
        stopCameraStream();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const objectUrl = URL.createObjectURL(file);
        const isVideo = file.type.startsWith('video/');
        setMediaType(isVideo ? 'video' : 'image');
        setMediaUrl(objectUrl);
        setUploadedFileName(file.name);
        if (!title) {
            setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
        }
        addToast(`Attached ${isVideo ? 'video clip' : 'photo'}: ${file.name}`, 'info');
    };

    const handleSelectSampleClip = (clip) => {
        setMediaType('video');
        setMediaUrl(clip.videoUrl);
        setPosterImage(clip.thumb);
        setUploadedFileName(`${clip.title}.mp4`);
        if (!title) setTitle(clip.title);
        if (clip.mood) setCategory(clip.mood);
        const exists = locationTags.some((t) => t.label === clip.location);
        if (!exists) {
            setLocationTags([{ label: clip.location, coords: clip.coords }, ...locationTags]);
        }
        addToast(`Selected clip: "${clip.title}"`, 'info');
    };

    const handleAddLocationTag = () => {
        const trimmed = locationInput.trim();
        if (!trimmed) return;
        if (!locationTags.some((t) => t.label.toLowerCase() === trimmed.toLowerCase())) {
            setLocationTags([...locationTags, { label: trimmed, coords: 'GPS Tagged' }]);
        }
        setLocationInput('');
    };

    const handleAddQuickPin = (pin) => {
        if (!locationTags.some((t) => t.label === pin.label)) {
            setLocationTags([...locationTags, pin]);
        }
    };

    const handleRemoveLocationTag = (label) => {
        if (locationTags.length <= 1) {
            addToast('At least one location tag is required for a Travel Vibe.', 'info');
            return;
        }
        setLocationTags(locationTags.filter((t) => t.label !== label));
    };

    const allConsentsChecked =
        consentOriginalOwner && consentModelLocationRelease && consentDistributionRights;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            addToast('Please enter a title for your Vibe.', 'error');
            return;
        }
        if (!allConsentsChecked) {
            addToast('Please confirm all Copyright & Legal Consent declarations before posting.', 'error');
            return;
        }

        const primaryLoc = locationTags[0] || {
            label: locationInput.trim() || 'Global Nomad Hub',
            coords: 'Live GPS Verified'
        };
        const selectedLicense =
            LICENSE_TYPES.find((l) => l.id === licenseType) || LICENSE_TYPES[0];

        onPublish({
            title: title.trim(),
            primaryLocation: primaryLoc.label,
            coordinates: primaryLoc.coords,
            locationTags: locationTags.map((t) => t.label),
            mood: category,
            mediaType,
            mediaUrl:
                mediaUrl.trim() ||
                'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-seashore-with-rocks-1090-large.mp4',
            posterImage:
                posterImage ||
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=85',
            soundscape: soundscape.trim() || 'Natural Ambient Field Recording (432 Hz)',
            story:
                story.trim() ||
                'Captured this live short-form travel clip with verified copyright & location tags.',
            copyrightTag: selectedLicense.badge,
            licenseLabel: selectedLicense.label,
            legalConsentVerified: true
        });
    };

    return (
        <div className="vibe-modal-backdrop" onClick={onClose}>
            <div className="vibe-modal-card new-vibe-studio-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="vibe-modal-header">
                    <div>
                        <span className="vibe-modal-kicker">
                            <Sparkles size={12} /> NEW VIBE STUDIO · SHORT-FORM CLIP & RIGHTS VERIFICATION
                        </span>
                        <h3>Create & Post a New Travel Vibe</h3>
                        <p>Record or select a short travel clip, attach location tags, and verify copyright & legal consent.</p>
                    </div>
                    <button type="button" className="vibe-modal-close" onClick={onClose} aria-label="Close modal">
                        <X size={18} />
                    </button>
                </div>

                {/* 1. Clip Source Switcher Tabs */}
                <div className="nv-source-tabs" role="tablist">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={sourceTab === 'upload'}
                        className={`nv-source-tab ${sourceTab === 'upload' ? 'active' : ''}`}
                        onClick={() => {
                            stopCameraStream();
                            setSourceTab('upload');
                        }}
                    >
                        <Upload size={15} />
                        <span>Select / Upload Clip</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={sourceTab === 'record'}
                        className={`nv-source-tab ${sourceTab === 'record' ? 'active' : ''}`}
                        onClick={() => {
                            setSourceTab('record');
                            handleStartCamera();
                        }}
                    >
                        <Camera size={15} />
                        <span>Record Live Clip</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={sourceTab === 'library'}
                        className={`nv-source-tab ${sourceTab === 'library' ? 'active' : ''}`}
                        onClick={() => {
                            stopCameraStream();
                            setSourceTab('library');
                        }}
                    >
                        <Film size={15} />
                        <span>Curated Travel Clips</span>
                    </button>
                </div>

                <form className="vibe-create-form nv-scrollable-form" onSubmit={handleSubmit}>
                    {/* TAB A: Upload / Select Device Clip */}
                    {sourceTab === 'upload' && (
                        <div className="nv-stage-panel">
                            <div
                                className="vibe-upload-dropzone"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*,image/*"
                                    onChange={handleFileUpload}
                                    hidden
                                />
                                <Upload size={24} className="vibe-upload-icon" />
                                <div>
                                    <strong>
                                        {uploadedFileName
                                            ? `Attached Clip: ${uploadedFileName}`
                                            : 'Select Short Travel Video Clip (MP4 / WebM / MOV) or Photo'}
                                    </strong>
                                    <span>Up to 60s vertical or horizontal travel clip · Instant preview</span>
                                </div>
                            </div>

                            {mediaUrl && (
                                <div className="nv-clip-preview-strip">
                                    {mediaType === 'video' ? (
                                        <video
                                            src={mediaUrl}
                                            poster={posterImage}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="nv-mini-video"
                                        />
                                    ) : (
                                        <img src={mediaUrl} alt="Preview" className="nv-mini-video" />
                                    )}
                                    <div className="nv-preview-meta">
                                        <span className="nv-ready-badge">
                                            <CheckCircle2 size={13} /> Clip Ready for Vibe Feed
                                        </span>
                                        <strong>{uploadedFileName || 'Custom Travel Media'}</strong>
                                        <button
                                            type="button"
                                            className="nv-clear-clip-btn"
                                            onClick={() => {
                                                setMediaUrl('');
                                                setUploadedFileName('');
                                            }}
                                        >
                                            <RotateCcw size={12} /> Replace Clip
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB B: Record Live Clip */}
                    {sourceTab === 'record' && (
                        <div className="nv-stage-panel">
                            <div className="nv-camera-box">
                                <video
                                    ref={liveVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    poster="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80"
                                    className="nv-camera-Feed"
                                />
                                <div className="nv-camera-overlay">
                                    <span className={`nv-rec-indicator ${isRecording ? 'recording' : ''}`}>
                                        <span className="nv-rec-dot" />
                                        {isRecording ? `REC 00:${String(recordSeconds).padStart(2, '0')} / 00:30` : '4K 60FPS READY'}
                                    </span>

                                    <div className="nv-camera-controls">
                                        {!isRecording ? (
                                            <button
                                                type="button"
                                                className="nv-record-btn start"
                                                onClick={handleStartRecording}
                                            >
                                                <Video size={16} />
                                                <span>Start Recording Clip</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="nv-record-btn stop"
                                                onClick={handleStopRecording}
                                            >
                                                <Square size={15} fill="currentColor" />
                                                <span>Stop & Attach Clip</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {cameraError && (
                                <p className="nv-camera-note">
                                    <AlertCircle size={13} /> {cameraError}
                                </p>
                            )}
                        </div>
                    )}

                    {/* TAB C: Select from Curated Travel Clips */}
                    {sourceTab === 'library' && (
                        <div className="nv-clips-grid">
                            {CURATED_SAMPLE_CLIPS.map((clip) => {
                                const isSelected = mediaUrl === clip.videoUrl;
                                return (
                                    <button
                                        key={clip.id}
                                        type="button"
                                        className={`nv-sample-clip-card ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleSelectSampleClip(clip)}
                                    >
                                        <img src={clip.thumb} alt={clip.title} />
                                        <div className="nv-sample-overlay">
                                            <span className="nv-sample-dur">{clip.duration}</span>
                                            <strong>{clip.title}</strong>
                                            <small>{clip.location}</small>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* 2. Title & Category Row */}
                    <div className="vibe-form-row-2">
                        <label>
                            <span>Vibe Title *</span>
                            <input
                                type="text"
                                placeholder="e.g., Sunset Cliffside Wave Pulse in Uluwatu"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <span>Content Category</span>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories
                                    .filter((m) => m.id !== 'all' && m.id !== 'popular' && m.id !== 'trending')
                                    .map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.emoji} {m.label}
                                        </option>
                                    ))}
                            </select>
                        </label>
                    </div>

                    {/* 3. Multi-Location Tags Builder */}
                    <div className="nv-location-section">
                        <div className="nv-sec-label-row">
                            <span><MapPin size={14} /> Location Tags & GPS Check-In *</span>
                            <small>{locationTags.length} location tag(s) attached</small>
                        </div>

                        <div className="nv-location-input-row">
                            <input
                                type="text"
                                placeholder="Add city, landmark, cafe, or coordinates..."
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddLocationTag();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className="nv-add-tag-btn"
                                onClick={handleAddLocationTag}
                            >
                                <Plus size={15} /> Add Tag
                            </button>
                        </div>

                        {/* Active Location Tags */}
                        <div className="nv-active-loc-tags">
                            {locationTags.map((tag) => (
                                <span key={tag.label} className="nv-loc-chip active">
                                    <MapPin size={12} />
                                    <span>{tag.label}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveLocationTag(tag.label)}
                                        aria-label={`Remove ${tag.label}`}
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Quick-Add Popular Destination Pins */}
                        <div className="nv-quick-pins-row">
                            <span className="nv-quick-label">Quick Pins:</span>
                            {QUICK_LOCATION_PINS.map((pin) => (
                                <button
                                    key={pin.label}
                                    type="button"
                                    className="nv-quick-pin-btn"
                                    onClick={() => handleAddQuickPin(pin)}
                                >
                                    + {pin.label.split('·')[0].trim()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4. Caption & Ambient Soundscape */}
                    <div className="vibe-form-row-2">
                        <label>
                            <span>Ambient Soundscape / Audio Credit</span>
                            <input
                                type="text"
                                placeholder="e.g., Indian Ocean Swell + Original Field Audio"
                                value={soundscape}
                                onChange={(e) => setSoundscape(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Direct Video / Media URL (Optional)</span>
                            <input
                                type="url"
                                placeholder="https://..."
                                value={mediaUrl}
                                onChange={(e) => setMediaUrl(e.target.value)}
                            />
                        </label>
                    </div>

                    <label>
                        <span>Traveler Story & Sensory Notes</span>
                        <textarea
                            rows={2}
                            placeholder="Share the atmosphere, Wi-Fi speed, best hour to visit, or travel tips..."
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                        />
                    </label>

                    {/* 5. Copyright License & Legal Consent Box */}
                    <div className="nv-legal-consent-box">
                        <div className="nv-legal-header">
                            <div className="nv-legal-title">
                                <Scale size={15} />
                                <strong>Copyright License & Legal Consent Tags</strong>
                            </div>
                            <span className="nv-legal-status-pill">
                                <ShieldCheck size={13} /> Rights Protected
                            </span>
                        </div>

                        <label className="nv-license-select-label">
                            <span>Select Copyright & Usage License Tag</span>
                            <select
                                value={licenseType}
                                onChange={(e) => setLicenseType(e.target.value)}
                            >
                                {LICENSE_TYPES.map((lic) => (
                                    <option key={lic.id} value={lic.id}>
                                        {lic.label}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <div className="nv-consent-checkboxes">
                            <label className="nv-consent-check-row">
                                <input
                                    type="checkbox"
                                    checked={consentOriginalOwner}
                                    onChange={(e) => setConsentOriginalOwner(e.target.checked)}
                                />
                                <span>
                                    <strong>Original Work & Copyright Ownership:</strong> I confirm that I recorded or own the rights to this video clip and its ambient audio.
                                </span>
                            </label>

                            <label className="nv-consent-check-row">
                                <input
                                    type="checkbox"
                                    checked={consentModelLocationRelease}
                                    onChange={(e) => setConsentModelLocationRelease(e.target.checked)}
                                />
                                <span>
                                    <strong>Bystander Privacy & Location Consent:</strong> This clip complies with local filming regulations and respects traveler privacy.
                                </span>
                            </label>

                            <label className="nv-consent-check-row">
                                <input
                                    type="checkbox"
                                    checked={consentDistributionRights}
                                    onChange={(e) => setConsentDistributionRights(e.target.checked)}
                                />
                                <span>
                                    <strong>Platform Distribution & Community Terms:</strong> I grant SeeNomad a non-exclusive license to display this Vibe with my copyright tag attached.
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="vibe-modal-actions">
                        <button type="button" className="vibe-modal-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="vibe-modal-primary nv-publish-btn"
                            disabled={!allConsentsChecked}
                        >
                            <ShieldCheck size={16} />
                            <span>Post Verified Vibe to Feed</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewVibeModal;
