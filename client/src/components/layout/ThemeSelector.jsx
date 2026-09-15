import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Sunset, Droplet, CloudMoon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/ThemeSelector.css';

const ThemeSelector = () => {
    const { theme: currentTheme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const themes = [
        { id: 'dark', name: 'Dark', icon: Moon, color: '#1e293b' },
        { id: 'light', name: 'Light', icon: Sun, color: '#f8fafc' },
        { id: 'auto', name: 'Auto', icon: Monitor, color: '#64748b' },
        { id: 'midnight', name: 'Midnight', icon: CloudMoon, color: '#0f172a' },
        { id: 'ocean', name: 'Ocean', icon: Droplet, color: '#0891b2' },
        { id: 'sunset', name: 'Sunset', icon: Sunset, color: '#f97316' }
    ];

    const currentThemeData = themes.find(t => t.id === currentTheme) || themes[0];
    const CurrentIcon = currentThemeData.icon;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleThemeSelect = (themeId) => {
        setTheme(themeId);
        setIsOpen(false);
    };

    return (
        <div className="theme-selector" ref={dropdownRef}>
            <button
                className="theme-selector-btn nav-btn"
                onClick={() => setIsOpen(!isOpen)}
                title={`Current theme: ${currentThemeData.name}`}
            >
                <CurrentIcon size={20} />
            </button>

            {isOpen && (
                <div className="theme-dropdown">
                    <div className="theme-dropdown-header">
                        <span>Choose Theme</span>
                    </div>
                    <div className="theme-options">
                        {themes.map((theme) => {
                            const Icon = theme.icon;
                            return (
                                <button
                                    key={theme.id}
                                    className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                                    onClick={() => handleThemeSelect(theme.id)}
                                >
                                    <div className="theme-option-icon" style={{ color: theme.color }}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="theme-option-name">{theme.name}</span>
                                    {currentTheme === theme.id && (
                                        <div className="theme-option-check">✓</div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
