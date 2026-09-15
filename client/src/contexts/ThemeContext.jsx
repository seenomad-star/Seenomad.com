import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Default to 'dark' for the cyberpunk nomad feel
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('seenomad_theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        // Remove old theme classes
        document.body.classList.remove(
            'theme-dark', 
            'theme-light', 
            'theme-auto', 
            'theme-midnight', 
            'theme-ocean', 
            'theme-sunset'
        );
        
        // Add new class based on psychology principle (Endowment Effect/Personalization)
        document.body.classList.add(`theme-${theme}`);
        localStorage.setItem('seenomad_theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
