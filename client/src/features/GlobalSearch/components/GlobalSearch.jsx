import { useState, useEffect } from 'react';
import { Search, Mic, Sparkles, Brain, Command } from 'lucide-react';
import '../styles/GlobalSearch.css';

const GlobalSearch = () => {
    const [isAIMode, setIsAIMode] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const aiPlaceholders = [
        "Ask AI: Best budget trips in Europe...",
        "Ask AI: 10-day itinerary for Japan...",
        "Ask AI: Visa-free countries for me...",
        "Ask AI: Hidden gems in Bali...",
        "Search destinations..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % aiPlaceholders.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`global-search-container ${isAIMode ? 'ai-mode' : ''}`}>
            <div className="global-search">
                {isAIMode ? <Brain size={18} className="ai-icon-pulse" /> : <Search size={18} />}
                <input
                    type="text"
                    placeholder={aiPlaceholders[placeholderIndex]}
                    className={isAIMode ? 'ai-input' : ''}
                />
                <div className="search-actions">
                    <button className="search-action-btn mic-btn" title="Voice Search">
                        <Mic size={16} />
                    </button>
                    <button
                        className={`search-action-btn ai-toggle-btn ${isAIMode ? 'active' : ''}`}
                        onClick={() => setIsAIMode(!isAIMode)}
                        title={isAIMode ? "Switch to Normal Search" : "Activate AI Assistant"}
                    >
                        <Sparkles size={16} />
                    </button>
                </div>
                <div className="search-shortcut">
                    <Command size={12} /> K
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;
