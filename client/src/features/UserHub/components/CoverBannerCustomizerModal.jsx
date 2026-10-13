import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Upload, 
    Sparkles, 
    Image, 
    Check, 
    Sliders, 
    MapPin, 
    Maximize2, 
    RotateCcw, 
    Layers, 
    Camera, 
    Palette,
    Eye,
    Globe,
    CheckCircle2
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import './CoverBannerCustomizerModal.css';

export const BRAND_GRADIENTS = [
    {
        id: 'nomad-sunset',
        name: 'Nomad Sunset',
        tag: 'Warm & Energizing',
        gradient: 'linear-gradient(135deg, rgba(245, 158, 11, var(--grad-op)) 0%, rgba(234, 88, 12, calc(var(--grad-op) * 0.8)) 35%, rgba(15, 23, 42, 0.95) 100%)',
        previewStops: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 45%, #0f172a 100%)',
        badgeColor: '#f59e0b'
    },
    {
        id: 'seenomad-aurora',
        name: 'SeeNomad Aurora',
        tag: 'Signature Electric Blue & Purple',
        gradient: 'linear-gradient(135deg, rgba(59, 130, 246, var(--grad-op)) 0%, rgba(139, 92, 246, calc(var(--grad-op) * 0.85)) 45%, rgba(15, 23, 42, 0.95) 100%)',
        previewStops: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 45%, #0f172a 100%)',
        badgeColor: '#3b82f6'
    },
    {
        id: 'ocean-cyan',
        name: 'Ocean Nomad',
        tag: 'Tropical Coastal Breeze',
        gradient: 'linear-gradient(135deg, rgba(6, 182, 212, var(--grad-op)) 0%, rgba(2, 132, 199, calc(var(--grad-op) * 0.8)) 50%, rgba(15, 23, 42, 0.95) 100%)',
        previewStops: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 50%, #0f172a 100%)',
        badgeColor: '#06b6d4'
    },
    {
        id: 'cyber-twilight',
        name: 'Cyber Twilight',
        tag: 'Neon Rose & Deep Indigo',
        gradient: 'linear-gradient(135deg, rgba(236, 72, 153, var(--grad-op)) 0%, rgba(147, 51, 234, calc(var(--grad-op) * 0.8)) 50%, rgba(15, 23, 42, 0.95) 100%)',
        previewStops: 'linear-gradient(135deg, #ec4899 0%, #9333ea 50%, #0f172a 100%)',
        badgeColor: '#ec4899'
    },
    {
        id: 'emerald-oasis',
        name: 'Emerald Oasis',
        tag: 'Lush Forest & Fresh Mint',
        gradient: 'linear-gradient(135deg, rgba(16, 185, 129, var(--grad-op)) 0%, rgba(5, 150, 105, calc(var(--grad-op) * 0.8)) 50%, rgba(15, 23, 42, 0.95) 100%)',
        previewStops: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #0f172a 100%)',
        badgeColor: '#10b981'
    },
    {
        id: 'midnight-slate',
        name: 'Midnight Stealth',
        tag: 'Subtle Minimalist Dark Vignette',
        gradient: 'linear-gradient(180deg, rgba(30, 41, 59, calc(var(--grad-op) * 0.6)) 0%, rgba(15, 23, 42, 0.95) 100%)',
        previewStops: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        badgeColor: '#64748b'
    }
];

export const PRESET_DESTINATIONS = [
    {
        id: 'lisbon',
        title: 'Lisbon Sunset',
        location: 'Lisbon, Portugal',
        url: 'https://images.unsplash.com/photo-1585211756843-dc3828965111?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'nomad-sunset',
        tag: 'Digital Nomad Capital'
    },
    {
        id: 'delhi',
        title: 'Delhi Red Fort & Heritage',
        location: 'New Delhi, India',
        url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'nomad-sunset',
        tag: 'Cultural Corridor'
    },
    {
        id: 'bali',
        title: 'Bali Tropical Haven',
        location: 'Canggu, Bali, Indonesia',
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'emerald-oasis',
        tag: 'Surf & Cowork'
    },
    {
        id: 'tokyo',
        title: 'Tokyo Neon Cityscape',
        location: 'Shibuya, Tokyo, Japan',
        url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'cyber-twilight',
        tag: 'Cyberpunk Metropolis'
    },
    {
        id: 'alps',
        title: 'Swiss Alpine Summit',
        location: 'Zermatt, Switzerland',
        url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'seenomad-aurora',
        tag: 'High Altitude Focus'
    },
    {
        id: 'medellin',
        title: 'Medellin Valley',
        location: 'El Poblado, Colombia',
        url: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'emerald-oasis',
        tag: 'City of Eternal Spring'
    },
    {
        id: 'chiangmai',
        title: 'Chiang Mai Mountains',
        location: 'Chiang Mai, Thailand',
        url: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'nomad-sunset',
        tag: 'Nomad Classic'
    },
    {
        id: 'amalfi',
        title: 'Amalfi Coast Waters',
        location: 'Positano, Italy',
        url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&auto=format&fit=crop&q=80',
        gradientId: 'ocean-cyan',
        tag: 'Mediterranean Serenity'
    }
];

const CoverBannerCustomizerModal = ({
    isOpen,
    onClose,
    currentBanner = {},
    onSaveBanner
}) => {
    const { addToast } = useToastStore();
    const fileInputRef = useRef(null);

    // Active Tab: 'upload' | 'presets' | 'url'
    const [activeTab, setActiveTab] = useState('upload');
    const [isDraggingFile, setIsDraggingFile] = useState(false);

    // Banner Customization State
    const [bannerUrl, setBannerUrl] = useState(
        currentBanner.coverUrl || PRESET_DESTINATIONS[0].url
    );
    const [gradientId, setGradientId] = useState(
        currentBanner.coverGradientId || 'nomad-sunset'
    );
    const [opacity, setOpacity] = useState(
        currentBanner.coverOpacity !== undefined ? currentBanner.coverOpacity : 55
    );
    const [heightMode, setHeightMode] = useState(
        currentBanner.coverHeight || 'standard' // 'compact' | 'standard' | 'cinematic'
    );
    const [position, setPosition] = useState(
        currentBanner.coverPosition || '35%' // 'top', 'center', 'bottom', or percentage
    );
    const [locationTag, setLocationTag] = useState(
        currentBanner.coverTag || 'Lisbon Sunset · Portugal'
    );
    const [urlInput, setUrlInput] = useState('');

    if (!isOpen) return null;

    const selectedGradient = BRAND_GRADIENTS.find(g => g.id === gradientId) || BRAND_GRADIENTS[0];

    // Compute live gradient CSS style
    const computedGradientCSS = selectedGradient.gradient.replace(
        /var\(--grad-op\)/g,
        (opacity / 100).toFixed(2)
    );

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processImageFile(file);
    };

    const processImageFile = (file) => {
        if (!file.type.startsWith('image/')) {
            addToast('Please upload a valid image file (PNG, JPG, WEBP)', 'error');
            return;
        }

        // Limit size to ~8MB
        if (file.size > 8 * 1024 * 1024) {
            addToast('Image is larger than 8MB. Please choose a smaller photo.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            setBannerUrl(dataUrl);
            setLocationTag(file.name.replace(/\.[^/.]+$/, "") || 'Custom Nomad Cover');
            addToast('Photo uploaded successfully! Previewing changes below.', 'success');
        };
        reader.onerror = () => {
            addToast('Failed to load image file. Please try again.', 'error');
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingFile(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingFile(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingFile(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processImageFile(file);
        }
    };

    const handleApplyCustomUrl = (e) => {
        e.preventDefault();
        if (!urlInput.trim()) return;
        setBannerUrl(urlInput.trim());
        setLocationTag('Custom Web Panorama');
        addToast('Cover image URL loaded!', 'success');
    };

    const handleSelectPreset = (preset) => {
        setBannerUrl(preset.url);
        setLocationTag(`${preset.title} · ${preset.location}`);
        setGradientId(preset.gradientId || gradientId);
    };

    const handleSave = () => {
        const updatedConfig = {
            coverUrl: bannerUrl,
            coverGradientId: gradientId,
            coverOpacity: opacity,
            coverHeight: heightMode,
            coverPosition: position,
            coverTag: locationTag
        };

        onSaveBanner(updatedConfig);
        addToast('✨ Cover banner updated with SeeNomad brand aesthetic! +25 XP earned.', 'success');
        onClose();
    };

    const handleReset = () => {
        setBannerUrl(PRESET_DESTINATIONS[0].url);
        setGradientId('nomad-sunset');
        setOpacity(55);
        setHeightMode('standard');
        setPosition('35%');
        setLocationTag('Lisbon Sunset · Portugal');
        addToast('Reset to default SeeNomad banner settings', 'info');
    };

    return (
        <AnimatePresence>
            <div className="banner-customizer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
                <motion.div 
                    className="banner-customizer-modal"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Header */}
                    <div className="banner-customizer-header">
                        <div className="flex items-center gap-3">
                            <div className="header-icon-chip">
                                <Palette size={20} className="text-amber-400" />
                            </div>
                            <div>
                                <h2 className="banner-modal-title">Customize Profile Banner & Overlay</h2>
                                <p className="banner-modal-subtitle">
                                    Upload your photo and style it with signature SeeNomad brand gradients
                                </p>
                            </div>
                        </div>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="banner-modal-close" 
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="banner-customizer-body">
                        {/* 1. LIVE INTERACTIVE PREVIEW */}
                        <div className="banner-live-preview-box">
                            <div className="preview-label-strip">
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                                    <Eye size={13} className="text-sky-400" />
                                    Live Banner Preview
                                </span>
                                <span className="text-[11px] text-slate-400">
                                    {selectedGradient.name} · {opacity}% Opacity · {heightMode.toUpperCase()}
                                </span>
                            </div>

                            <div 
                                className={`preview-viewport height-${heightMode}`}
                                style={{
                                    height: heightMode === 'compact' ? '160px' : heightMode === 'cinematic' ? '240px' : '200px'
                                }}
                            >
                                <img 
                                    src={bannerUrl} 
                                    alt="Cover preview" 
                                    className="preview-img"
                                    style={{ objectPosition: `center ${position}` }}
                                />
                                
                                {/* Dynamic Brand Gradient Overlay */}
                                <div 
                                    className="preview-overlay" 
                                    style={{ background: computedGradientCSS }}
                                />

                                {/* Subtle grid pattern */}
                                <div className="preview-pattern-grid" />

                                {/* Location Tag Badge */}
                                <div className="preview-tag-badge">
                                    <MapPin size={11} className="text-amber-400" />
                                    <span>{locationTag}</span>
                                </div>

                                {/* Mock Avatar Placement to visualize layout */}
                                <div className="preview-mock-avatar-chip">
                                    <div className="mock-avatar-circle">
                                        <Camera size={14} className="text-slate-300" />
                                    </div>
                                    <div className="mock-user-meta">
                                        <div className="mock-name-bar" />
                                        <div className="mock-sub-bar" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. PHOTO SOURCE TABS */}
                        <div className="banner-tabs-nav">
                            <button 
                                type="button" 
                                className={`banner-nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
                                onClick={() => setActiveTab('upload')}
                            >
                                <Upload size={14} />
                                <span>Upload Photo</span>
                            </button>
                            <button 
                                type="button" 
                                className={`banner-nav-tab ${activeTab === 'presets' ? 'active' : ''}`}
                                onClick={() => setActiveTab('presets')}
                            >
                                <Sparkles size={14} />
                                <span>Curated Destinations</span>
                            </button>
                            <button 
                                type="button" 
                                className={`banner-nav-tab ${activeTab === 'url' ? 'active' : ''}`}
                                onClick={() => setActiveTab('url')}
                            >
                                <Globe size={14} />
                                <span>Direct Image URL</span>
                            </button>
                        </div>

                        {/* TAB 1: UPLOAD PHOTO */}
                        {activeTab === 'upload' && (
                            <div className="tab-pane upload-pane">
                                <div 
                                    className={`file-drop-zone ${isDraggingFile ? 'drag-over' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        accept="image/*" 
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <div className="drop-icon-circle">
                                        <Upload size={22} className="text-sky-400" />
                                    </div>
                                    <h4 className="drop-title">
                                        {isDraggingFile ? 'Drop your cover photo here' : 'Click or Drag & Drop Cover Photo'}
                                    </h4>
                                    <p className="drop-hint">
                                        Supports PNG, JPG, or WEBP up to 8MB. High-res landscape panoramas recommended (16:9 or 21:9).
                                    </p>
                                    <button 
                                        type="button" 
                                        className="btn-browse-file"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            fileInputRef.current?.click();
                                        }}
                                    >
                                        Browse Files
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: PRESET DESTINATIONS */}
                        {activeTab === 'presets' && (
                            <div className="tab-pane presets-pane">
                                <div className="presets-grid">
                                    {PRESET_DESTINATIONS.map((preset) => {
                                        const isSelected = bannerUrl === preset.url;
                                        return (
                                            <div 
                                                key={preset.id}
                                                className={`preset-card ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleSelectPreset(preset)}
                                            >
                                                <img src={preset.url} alt={preset.title} className="preset-card-img" />
                                                <div className="preset-card-overlay">
                                                    <div className="preset-tag-pill">{preset.tag}</div>
                                                    <div className="preset-meta">
                                                        <span className="preset-title">{preset.title}</span>
                                                        <span className="preset-location">{preset.location}</span>
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <div className="preset-selected-badge">
                                                        <Check size={13} />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* TAB 3: DIRECT IMAGE URL */}
                        {activeTab === 'url' && (
                            <div className="tab-pane url-pane">
                                <form onSubmit={handleApplyCustomUrl} className="url-form">
                                    <label className="input-label">Paste Image Web Address (HTTPS)</label>
                                    <div className="url-input-cluster">
                                        <input 
                                            type="url" 
                                            className="modal-text-input"
                                            placeholder="https://images.unsplash.com/..."
                                            value={urlInput}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                        />
                                        <button type="submit" className="btn-load-url">
                                            Load Photo
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Ensure the link is publicly accessible via CORS (e.g. Unsplash, Cloudinary, Imgur, or direct CDN).
                                    </p>
                                </form>
                            </div>
                        )}

                        {/* 3. SEENOMAD BRAND GRADIENT OVERLAY PICKER */}
                        <div className="section-divider" />

                        <div className="brand-gradients-section">
                            <div className="section-header-row">
                                <div className="flex items-center gap-2">
                                    <Palette size={16} className="text-purple-400" />
                                    <h3 className="section-title">SeeNomad Brand Gradient Overlays</h3>
                                </div>
                                <span className="section-badge">Brand Aesthetic</span>
                            </div>

                            <div className="gradients-swatch-grid">
                                {BRAND_GRADIENTS.map((bg) => {
                                    const isSelected = gradientId === bg.id;
                                    return (
                                        <button 
                                            key={bg.id}
                                            type="button"
                                            className={`gradient-card ${isSelected ? 'active' : ''}`}
                                            onClick={() => setGradientId(bg.id)}
                                        >
                                            <div 
                                                className="gradient-swatch"
                                                style={{ background: bg.previewStops }}
                                            >
                                                {isSelected && (
                                                    <div className="gradient-check">
                                                        <Check size={14} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="gradient-info">
                                                <span className="gradient-name">{bg.name}</span>
                                                <span className="gradient-tag">{bg.tag}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 4. OVERLAY CONTROLS (OPACITY, HEIGHT, ALIGNMENT, TAG) */}
                        <div className="overlay-controls-grid">
                            {/* Opacity Slider */}
                            <div className="control-group">
                                <div className="control-label-row">
                                    <span className="control-label">
                                        <Sliders size={13} className="text-sky-400" />
                                        Gradient Overlay Intensity
                                    </span>
                                    <span className="control-val-badge">{opacity}%</span>
                                </div>
                                <input 
                                    type="range"
                                    min="15"
                                    max="85"
                                    step="5"
                                    value={opacity}
                                    onChange={(e) => setOpacity(Number(e.target.value))}
                                    className="brand-range-slider"
                                />
                                <div className="range-hints">
                                    <span>Vibrant & Clear</span>
                                    <span>Balanced</span>
                                    <span>High Contrast</span>
                                </div>
                            </div>

                            {/* Banner Height */}
                            <div className="control-group">
                                <div className="control-label-row">
                                    <span className="control-label">
                                        <Maximize2 size={13} className="text-amber-400" />
                                        Banner Height
                                    </span>
                                </div>
                                <div className="segmented-selector">
                                    <button 
                                        type="button" 
                                        className={`segment-btn ${heightMode === 'compact' ? 'active' : ''}`}
                                        onClick={() => setHeightMode('compact')}
                                    >
                                        Compact (200px)
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`segment-btn ${heightMode === 'standard' ? 'active' : ''}`}
                                        onClick={() => setHeightMode('standard')}
                                    >
                                        Standard (260px)
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`segment-btn ${heightMode === 'cinematic' ? 'active' : ''}`}
                                        onClick={() => setHeightMode('cinematic')}
                                    >
                                        Cinematic (340px)
                                    </button>
                                </div>
                            </div>

                            {/* Image Vertical Focus */}
                            <div className="control-group">
                                <div className="control-label-row">
                                    <span className="control-label">
                                        <Layers size={13} className="text-emerald-400" />
                                        Image Vertical Alignment
                                    </span>
                                </div>
                                <div className="segmented-selector">
                                    <button 
                                        type="button" 
                                        className={`segment-btn ${position === 'top' || position === '15%' ? 'active' : ''}`}
                                        onClick={() => setPosition('15%')}
                                    >
                                        Top
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`segment-btn ${position === '35%' || position === 'center' ? 'active' : ''}`}
                                        onClick={() => setPosition('35%')}
                                    >
                                        Center (35%)
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`segment-btn ${position === 'bottom' || position === '65%' ? 'active' : ''}`}
                                        onClick={() => setPosition('65%')}
                                    >
                                        Bottom
                                    </button>
                                </div>
                            </div>

                            {/* Location / Caption Tag */}
                            <div className="control-group">
                                <div className="control-label-row">
                                    <span className="control-label">
                                        <MapPin size={13} className="text-rose-400" />
                                        Banner Tag / Location
                                    </span>
                                </div>
                                <input 
                                    type="text" 
                                    className="modal-text-input"
                                    placeholder="e.g. Lisbon Sunset · Portugal"
                                    value={locationTag}
                                    onChange={(e) => setLocationTag(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="banner-customizer-footer">
                        <button 
                            type="button" 
                            onClick={handleReset} 
                            className="btn-modal-reset"
                            title="Reset to default SeeNomad banner"
                        >
                            <RotateCcw size={14} />
                            <span>Reset Defaults</span>
                        </button>
                        <div className="flex items-center gap-2.5">
                            <button 
                                type="button" 
                                onClick={onClose} 
                                className="btn-modal-cancel"
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                onClick={handleSave} 
                                className="btn-modal-save"
                            >
                                <CheckCircle2 size={16} />
                                <span>Apply to Profile</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CoverBannerCustomizerModal;
