import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Theme Context for global theme management (light/dark mode)
 * Controls '.theme-light' and default dark mode, synchronizes document.body class,
 * persists user preference in localStorage, and broadcasts cross-tab storage changes.
 */
export const ThemeContext = createContext({
    theme: 'dark',
    isDark: true,
    toggleTheme: () => {},
    setTheme: () => {}
});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage, default to 'dark'
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem('theme') || 
                          localStorage.getItem('seenomad_theme') || 
                          localStorage.getItem('seenomad-theme');
            return saved === 'light' ? 'light' : 'dark';
        } catch (e) {
            return 'dark';
        }
    });

    const isDark = theme !== 'light';

    // Toggle between light and dark with smooth transition animation
    const toggleTheme = useCallback(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.add('theme-transition-active');
            document.body.classList.add('theme-transition-active');
            if (window.__seenomadThemeTransitionTimer) {
                clearTimeout(window.__seenomadThemeTransitionTimer);
            }
            window.__seenomadThemeTransitionTimer = setTimeout(() => {
                document.documentElement.classList.remove('theme-transition-active');
                document.body.classList.remove('theme-transition-active');
            }, 450);
        }
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    const handleSetTheme = useCallback((newTheme) => {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.add('theme-transition-active');
            document.body.classList.add('theme-transition-active');
            if (window.__seenomadThemeTransitionTimer) {
                clearTimeout(window.__seenomadThemeTransitionTimer);
            }
            window.__seenomadThemeTransitionTimer = setTimeout(() => {
                document.documentElement.classList.remove('theme-transition-active');
                document.body.classList.remove('theme-transition-active');
            }, 450);
        }
        setTheme(newTheme);
    }, []);

    // Synchronize body and root classes whenever theme changes
    useEffect(() => {
        const isLightTheme = theme === 'light';
        const targetClass = isLightTheme ? 'theme-light' : 'theme-dark';
        const oppositeClass = isLightTheme ? 'theme-dark' : 'theme-light';

        // Update body classes as requested: 'theme-light' or 'theme-dark'
        document.body.classList.remove(oppositeClass, 'theme-midnight', 'theme-ocean', 'theme-sunset');
        document.body.classList.add(targetClass);

        if (isLightTheme) {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        } else {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        }

        // Also synchronize html / documentElement for Tailwind and global CSS compatibility
        document.documentElement.classList.remove(oppositeClass, 'theme-midnight', 'theme-ocean', 'theme-sunset');
        document.documentElement.classList.add(targetClass);

        if (isLightTheme) {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        }

        document.documentElement.setAttribute('data-theme', isLightTheme ? 'light' : 'dark');

        // Persist to local storage
        try {
            localStorage.setItem('theme', theme);
            localStorage.setItem('seenomad_theme', theme);
            localStorage.setItem('seenomad-theme', theme);
        } catch (e) {
            console.warn('Unable to persist theme to localStorage', e);
        }

        // Update mobile browser header color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isLightTheme ? '#f8fafc' : '#0a0a0b');
        }
    }, [theme]);

    // Listen for storage events to synchronize across browser tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'theme' || e.key === 'seenomad_theme' || e.key === 'seenomad-theme') {
                if (e.newValue) {
                    setTheme(e.newValue === 'light' ? 'light' : 'dark');
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
