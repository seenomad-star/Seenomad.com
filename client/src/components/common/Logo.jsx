import React from 'react';
import logoImage from '../../assets/images/seenomad-logo.jpg';
import './Logo.css';

const Logo = ({ size = 'medium', showText = true, className = '', onClick }) => {
    const sizeClasses = {
        small: 'logo-small',
        medium: 'logo-medium',
        large: 'logo-large'
    };

    return (
        <div 
            className={`seenomad-logo ${sizeClasses[size]} ${className}`}
            onClick={onClick}
            style={onClick ? { cursor: 'pointer' } : {}}
        >
            <img src={logoImage} alt="Seenomad Logo" className="logo-image" />
            {showText && (
                <div className="logo-text">
                    <span className="logo-name">Seenomad</span>
                    <span className="logo-badge">V3</span>
                </div>
            )}
        </div>
    );
};

export default Logo;
