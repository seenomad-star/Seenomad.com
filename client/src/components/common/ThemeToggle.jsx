import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeToggle.css';

/**
 * Global Light/Dark Theme Toggle Component
 * Toggles between '.theme-light' and default dark mode using ThemeContext state,
 * with buttery-smooth rotation, scale, and glowing spring transition animations.
 */
const ThemeToggle = ({ 
    variant = 'icon', 
    showLabel = false, 
    className = '',
    size = 19,
    title
}) => {
    const { theme, isDark, toggleTheme } = useTheme();

    const titleText = title !== undefined 
        ? title 
        : (isDark ? 'Switch to Light Mode (.theme-light)' : 'Switch to Default Dark Mode');
    const labelText = isDark ? 'Light Mode' : 'Dark Mode';

    if (variant === 'pill') {
        return (
            <motion.button
                type="button"
                id="global-theme-toggle-pill"
                className={`theme-toggle-pill ${isDark ? 'mode-dark' : 'mode-light'} ${className}`}
                onClick={toggleTheme}
                title={titleText}
                aria-label={titleText}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
            >
                <div className="theme-toggle-icon-wrap">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isDark ? 'sun' : 'moon'}
                            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="theme-icon-motion"
                        >
                            {isDark ? (
                                <Sun size={size} className="theme-toggle-icon-sun" />
                            ) : (
                                <Moon size={size} className="theme-toggle-icon-moon" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <span className="theme-toggle-pill-text">{labelText}</span>
            </motion.button>
        );
    }

    if (variant === 'switch') {
        return (
            <button
                type="button"
                id="global-theme-toggle-switch"
                className={`theme-toggle-switch ${isDark ? 'mode-dark' : 'mode-light'} ${className}`}
                onClick={toggleTheme}
                title={titleText}
                aria-label={titleText}
                role="switch"
                aria-checked={!isDark}
            >
                <motion.div 
                    className="theme-switch-thumb"
                    animate={{ x: isDark ? 0 : 24 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isDark ? 'switch-sun' : 'switch-moon'}
                            initial={{ rotate: -180, scale: 0.4, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 180, scale: 0.4, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isDark ? (
                                <Sun size={12} className="theme-toggle-icon-sun" />
                            ) : (
                                <Moon size={12} className="theme-toggle-icon-moon" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </button>
        );
    }

    return (
        <motion.button
            type="button"
            id="global-theme-toggle-btn"
            className={`nav-btn theme-toggle-btn ${isDark ? 'mode-dark' : 'mode-light'} ${className}`}
            onClick={toggleTheme}
            title={titleText}
            aria-label={titleText}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
            transition={{ duration: 0.18 }}
        >
            <div className="theme-toggle-icon-wrap">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={isDark ? 'header-sun' : 'header-moon'}
                        initial={{ rotate: -70, scale: 0.5, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 70, scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="theme-icon-motion"
                    >
                        {isDark ? (
                            <Sun size={size} className="theme-toggle-icon-sun" />
                        ) : (
                            <Moon size={size} className="theme-toggle-icon-moon" />
                        )}
                    </motion.div>
                </AnimatePresence>
                <div className={`theme-toggle-aura ${isDark ? 'aura-sun' : 'aura-moon'}`} />
            </div>
            {showLabel && <span className="theme-toggle-label">{labelText}</span>}
        </motion.button>
    );
};

export default ThemeToggle;

