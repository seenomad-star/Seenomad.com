import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.css';

/**
 * Global Light/Dark Theme Toggle Component
 * Toggles body class between 'theme-light' and 'theme-dark'
 * utilizing React state and synchronized local storage persistence.
 */
const ThemeToggle = ({ 
    variant = 'icon', 
    showLabel = false, 
    className = '',
    size = 19,
    title
}) => {
    const { theme, isDark, toggleTheme } = useTheme();

    const titleText = title !== undefined ? title : (isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    const labelText = isDark ? 'Light Mode' : 'Dark Mode';

    if (variant === 'pill') {
        return (
            <button
                type="button"
                id="global-theme-toggle-pill"
                className={`theme-toggle-pill ${className}`}
                onClick={toggleTheme}
                title={titleText}
                aria-label={titleText}
            >
                <span className="theme-toggle-icon-wrap">
                    {isDark ? (
                        <Sun size={size} className="theme-toggle-icon-sun" />
                    ) : (
                        <Moon size={size} className="theme-toggle-icon-moon" />
                    )}
                </span>
                <span className="theme-toggle-pill-text">{labelText}</span>
            </button>
        );
    }

    if (variant === 'switch') {
        return (
            <button
                type="button"
                id="global-theme-toggle-switch"
                className={`theme-toggle-switch ${className}`}
                onClick={toggleTheme}
                title={titleText}
                aria-label={titleText}
                role="switch"
                aria-checked={!isDark}
            >
                <div className="theme-switch-thumb">
                    {isDark ? (
                        <Sun size={12} className="theme-toggle-icon-sun" />
                    ) : (
                        <Moon size={12} className="theme-toggle-icon-moon" />
                    )}
                </div>
            </button>
        );
    }

    return (
        <button
            type="button"
            id="global-theme-toggle-btn"
            className={`nav-btn theme-toggle-btn ${className}`}
            onClick={toggleTheme}
            title={titleText}
            aria-label={titleText}
        >
            <div className="theme-toggle-icon-wrap">
                {isDark ? (
                    <Sun size={size} className="theme-toggle-icon-sun" />
                ) : (
                    <Moon size={size} className="theme-toggle-icon-moon" />
                )}
            </div>
            {showLabel && <span className="theme-toggle-label">{labelText}</span>}
        </button>
    );
};

export default ThemeToggle;
