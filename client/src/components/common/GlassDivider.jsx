import React from 'react';
import './styles/GlassDivider.css';

/**
 * GlassDivider
 * A subtle horizontal divider component with a glassmorphism effect
 * designed to visually separate main sections on the page.
 *
 * @param {Object} props
 * @param {string} [props.id] - Unique HTML id attribute
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.label] - Optional centered label text
 * @param {React.ReactNode} [props.icon] - Optional centered icon
 * @param {'subtle' | 'line' | 'pill' | 'pip' | 'glow'} [props.variant='subtle'] - Style variant
 * @param {'none' | 'sm' | 'md' | 'lg'} [props.spacing='md'] - Vertical spacing scale
 * @param {boolean} [props.glow=false] - Whether to apply soft ambient glow
 * @param {boolean} [props.showPip=false] - Whether to show subtle center glass pip when no label exists
 */
const GlassDivider = ({
    id,
    className = '',
    label,
    icon,
    variant = 'subtle',
    spacing = 'md',
    glow = false,
    showPip = false,
    ...rest
}) => {
    const dividerId = id || `glass-divider-${Math.random().toString(36).slice(2, 9)}`;
    const hasContent = Boolean(label || icon);

    return (
        <div 
            id={dividerId}
            className={`glass-divider-container glass-divider-spacing-${spacing} ${glow || variant === 'glow' ? 'glass-divider-glow' : ''} ${className}`}
            role="separator"
            aria-orientation="horizontal"
            {...rest}
        >
            {/* Frosted Glass Linear Track */}
            <div className="glass-divider-track" />
            <div className="glass-divider-refraction" />

            {/* Optional Centered Content or Subtle Focal Pip */}
            {hasContent ? (
                <div className="glass-divider-pill">
                    {icon && <span className="glass-divider-icon">{icon}</span>}
                    {label && <span className="glass-divider-text">{label}</span>}
                </div>
            ) : showPip ? (
                <div className="glass-divider-pip" />
            ) : null}
        </div>
    );
};

export default GlassDivider;
