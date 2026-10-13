import React, { useState, useRef } from 'react';
import { 
    Camera, 
    Upload, 
    Palette, 
    MapPin, 
    Sparkles, 
    Sliders,
    Maximize2,
    Image as ImageIcon
} from 'lucide-react';
import { BRAND_GRADIENTS } from './CoverBannerCustomizerModal';
import { useToastStore } from '../../../store/toastStore';
import './CoverBannerSection.css';

const CoverBannerSection = ({
    coverUrl,
    coverGradientId = 'nomad-sunset',
    coverOpacity = 55,
    coverHeight = 'standard',
    coverPosition = '35%',
    coverTag = 'Lisbon Sunset · Portugal',
    onOpenCustomizer,
    onQuickUpload
}) => {
    const { addToast } = useToastStore();
    const quickFileInputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);

    // Resolve active gradient
    const activeGradientObj = BRAND_GRADIENTS.find(g => g.id === coverGradientId) || BRAND_GRADIENTS[0];
    const opacityFloat = (Number(coverOpacity || 55) / 100).toFixed(2);
    const computedGradient = activeGradientObj.gradient.replace(/var\(--grad-op\)/g, opacityFloat);

    const handleQuickFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processDroppedFile(file);
    };

    const processDroppedFile = (file) => {
        if (!file.type.startsWith('image/')) {
            addToast('Please upload an image file (PNG, JPG, WEBP)', 'error');
            return;
        }

        if (file.size > 8 * 1024 * 1024) {
            addToast('File is larger than 8MB. Please select a smaller photo.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            const newTag = file.name.replace(/\.[^/.]+$/, "") || 'Custom Nomad Cover';
            onQuickUpload({
                coverUrl: dataUrl,
                coverTag: newTag
            });
            addToast('📸 Cover photo updated directly from device! +20 XP', 'success');
        };
        reader.onerror = () => {
            addToast('Could not read file. Please try again.', 'error');
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processDroppedFile(file);
        }
    };

    return (
        <div 
            className={`nomad-cover-banner-section height-${coverHeight} ${isDragOver ? 'banner-drag-target' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Background Cover Image */}
            <img 
                src={coverUrl} 
                alt="Profile Cover Banner" 
                className="banner-hero-img"
                style={{ objectPosition: `center ${coverPosition || '35%'}` }}
            />

            {/* Signature SeeNomad Brand Gradient Overlay */}
            <div 
                className="banner-brand-gradient-overlay"
                style={{ background: computedGradient }}
                aria-hidden="true"
            />

            {/* Ambient Tech Grid Texture */}
            <div className="banner-texture-overlay" aria-hidden="true" />

            {/* Drag & Drop Visual HUD when dragging file over */}
            {isDragOver && (
                <div className="banner-drop-hud">
                    <div className="drop-hud-content">
                        <Upload size={32} className="text-sky-400 animate-bounce" />
                        <span className="drop-hud-text">Drop image to update cover photo</span>
                    </div>
                </div>
            )}

            {/* Banner Top Bar Indicators & Action Buttons */}
            <div className="banner-hud-top">
                {/* Location / Style Tag Badge */}
                <div className="banner-location-badge" title={`Active Cover: ${coverTag}`}>
                    <MapPin size={12} className="text-amber-400" />
                    <span className="badge-text">{coverTag}</span>
                    <span className="badge-sep">·</span>
                    <span className="badge-gradient-name">{activeGradientObj.name}</span>
                </div>

                {/* Banner Actions Cluster */}
                <div className="banner-actions-cluster">
                    {/* Hidden Quick File Input */}
                    <input 
                        type="file" 
                        ref={quickFileInputRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleQuickFileChange}
                    />

                    {/* Quick Device Upload Button */}
                    <button 
                        type="button"
                        onClick={() => quickFileInputRef.current?.click()}
                        className="btn-banner-action secondary"
                        title="Upload cover photo from your computer or phone"
                        aria-label="Upload photo"
                    >
                        <Camera size={13} />
                        <span className="action-label">Upload Photo</span>
                    </button>

                    {/* Full Customizer Button */}
                    <button 
                        type="button" 
                        onClick={onOpenCustomizer}
                        className="btn-banner-action primary"
                        title="Customize cover photo, brand gradients, opacity, and dimensions"
                        aria-label="Customize banner"
                    >
                        <Palette size={13} />
                        <span className="action-label">Customize Banner</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoverBannerSection;
