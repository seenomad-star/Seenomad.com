import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    Search, Filter, Grid, List, ChevronDown, ChevronUp
} from 'lucide-react';
import ModuleNavbar from '../../components/common/ModuleNavbar';
import AdCard from './components/AdCard';
import AdSenseBanner from './components/AdSenseBanner';
import TournamentsView from './components/TournamentsView';
import LeaderboardView from './components/LeaderboardView';
import RewardsView from './components/RewardsView';
import SmartAssistant from './components/SmartAssistant';
import GameCard from './components/GameCard';
import {
    allGames, tournaments, leaders, rewardsData, liveTickerMessages,
    TYPE_OPTIONS, DIFFICULTY_OPTIONS, REWARD_OPTIONS, PLAYER_OPTIONS, QUICK_FILTER_CATEGORIES
} from './data';
import '../../styles/TravelGames.css';

const TravelGames = () => {
    // Navigation items
    const navItems = [
        'All Games', 'RPG', 'Puzzle', 'Simulation', 'Strategy',
        'Action', 'Tournaments', 'Leaderboard', 'Rewards'
    ];

    // State Management
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedReward, setSelectedReward] = useState('all');
    const [selectedPlayers, setSelectedPlayers] = useState('all');
    const [activeFilters, setActiveFilters] = useState([]);
    const [advancedFilters, setAdvancedFilters] = useState({
        multiplayer: false, offline: false, vr: false, crossPlatform: false
    });
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [playerXP, setPlayerXP] = useState(0);
    const [liveTickerIndex, setLiveTickerIndex] = useState(0);
    const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
    const [nomadCoins, setNomadCoins] = useState(1250);

    // Live Ticker Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveTickerIndex((prev) => (prev + 1) % liveTickerMessages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // XP Tracking
    useEffect(() => {
        if (activeFilters.length > 0 || searchQuery || selectedType !== 'all' || selectedDifficulty !== 'all' || selectedReward !== 'all' || selectedPlayers !== 'all') {
            setPlayerXP(prev => Math.min(prev + 5, 100));
        }
    }, [activeFilters, searchQuery, selectedType, selectedDifficulty, selectedReward, selectedPlayers]);

    // Surprise Me Handler
    const handleSurpriseMe = () => {
        const randomIndex = Math.floor(Math.random() * allGames.length);
        setSearchQuery(allGames[randomIndex].name);
    };

    // Toggle Filter
    const toggleFilter = (filterId) => {
        setActiveFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(id => id !== filterId)
                : [...prev, filterId]
        );
    };

    // Filter Logic
    const getFilteredGames = (category = 'all') => {
        return allGames.filter(game => {
            // Category Filter
            if (category !== 'all' && game.category.toLowerCase() !== category.toLowerCase()) return false;

            // Text Search
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch = game.name.toLowerCase().includes(query) ||
                    game.type.toLowerCase().includes(query) ||
                    game.category.toLowerCase().includes(query);
                if (!matchesSearch) return false;
            }

            // Quick Filters
            if (activeFilters.length > 0) {
                const matchesActiveFilters = activeFilters.every(filterId => {
                    switch (filterId) {
                        case 'free': return game.free;
                        case 'trending': return game.trending;
                        case 'new': return game.new;
                        case 'popular': return game.popular;
                        case 'tournaments': return game.tournament?.active;
                        case 'high-rewards': return game.rewards.coins >= 50;
                        case 'premium': return game.premium;
                        case 'vip-only': return game.premium && game.featured;
                        default: return true;
                    }
                });
                if (!matchesActiveFilters) return false;
            }

            // Dropdown Filters
            if (selectedType !== 'all' && game.type.toLowerCase() !== selectedType) return false;
            if (selectedDifficulty !== 'all' && game.difficulty.toLowerCase() !== selectedDifficulty) return false;
            if (selectedReward !== 'all') {
                if (selectedReward === 'vouchers' && !game.rewards.voucher.includes('voucher') && !game.rewards.voucher.includes('credit') && !game.rewards.voucher.includes('discount')) return false;
                if (selectedReward === 'coins' && game.rewards.coins < 30) return false;
                if (selectedReward === 'badges' && !game.rewards.voucher.toLowerCase().includes('badge')) return false;
                if (selectedReward === 'discounts' && !game.rewards.voucher.toLowerCase().includes('discount')) return false;
            }
            if (selectedPlayers !== 'all') {
                if (selectedPlayers === 'single' && game.playerMode !== 'single') return false;
                if (selectedPlayers === 'multi' && game.playerMode !== 'multi') return false;
                if (selectedPlayers === 'coop' && game.playerMode !== 'coop') return false;
                if (selectedPlayers === 'pvp' && game.playerMode !== 'pvp') return false;
            }

            // Advanced Filters
            if (advancedFilters.multiplayer && !game.tags.includes('Multiplayer')) return false;
            if (advancedFilters.offline && !game.tags.includes('Offline')) return false;
            if (advancedFilters.vr && !game.tags.includes('VR Support')) return false;
            if (advancedFilters.crossPlatform && !game.tags.includes('Cross-Platform')) return false;

            return true;
        });
    };

    const GamesListView = ({ category }) => {
        const filteredGames = getFilteredGames(category);
        return (
            <>
                {/* Filters & Search Section */}
                <div className="games-controls-premium">
                    <div className="controls-top-row">
                        <div className={`search-bar-premium ${isSearchExpanded ? 'expanded' : ''}`}>
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search games, genres, rewards..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchExpanded(true)}
                                onBlur={() => setIsSearchExpanded(false)}
                            />
                            <div className="search-shortcut">/</div>
                        </div>
                        <button className="surprise-me-btn" onClick={handleSurpriseMe}>
                            Surprise Me 🎲
                        </button>
                        <div className="view-toggles">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="quick-filters-row">
                        {QUICK_FILTER_CATEGORIES.map(filter => (
                            <button
                                key={filter.id}
                                className={`quick-filter-pill ${activeFilters.includes(filter.id) ? 'active' : ''} ${filter.isPrime ? 'prime' : ''}`}
                                onClick={() => toggleFilter(filter.id)}
                            >
                                <span className="filter-icon">{filter.icon}</span>
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    <div className="advanced-filters-row">
                        <div className="dropdown-group">
                            <div className="custom-dropdown">
                                <button className="dropdown-trigger" onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}>
                                    <span>Type: {selectedType === 'all' ? 'All' : TYPE_OPTIONS.find(o => o.id === selectedType)?.label}</span>
                                    {activeDropdown === 'type' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                                {activeDropdown === 'type' && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => { setSelectedType('all'); setActiveDropdown(null); }}>All Types</div>
                                        {TYPE_OPTIONS.map(opt => (
                                            <div key={opt.id} className="dropdown-item" onClick={() => { setSelectedType(opt.id); setActiveDropdown(null); }}>{opt.label}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button className="filter-toggle-btn" onClick={() => setActiveDropdown(activeDropdown === 'advanced' ? null : 'advanced')}>
                            <Filter size={18} />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>

                {/* Games Grid */}
                <div className={`games-grid-premium ${viewMode}`}>
                    <AdCard />
                    {filteredGames.map(game => (
                        <GameCard key={game.id} game={game} viewMode={viewMode} />
                    ))}
                    <AdSenseBanner />
                </div>
            </>
        );
    };

    return (
        <div className="travel-games-container-premium">
            <ModuleNavbar items={navItems} basePath="/travel-games" />

            {/* Live Ticker */}
            <div className="live-ticker-bar">
                <div className="ticker-label">LIVE</div>
                <div className="ticker-content">
                    <span key={liveTickerIndex} className="ticker-msg fade-in">
                        {liveTickerMessages[liveTickerIndex]}
                    </span>
                </div>
            </div>

            {/* Smart Assistant */}
            <SmartAssistant isExpanded={isAssistantExpanded} setIsExpanded={setIsAssistantExpanded} />

            <div className="games-content-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="all-games" replace />} />
                    <Route path="all-games" element={<GamesListView category="all" />} />
                    <Route path="rpg" element={<GamesListView category="RPG" />} />
                    <Route path="puzzle" element={<GamesListView category="Puzzle" />} />
                    <Route path="simulation" element={<GamesListView category="Simulation" />} />
                    <Route path="strategy" element={<GamesListView category="Strategy" />} />
                    <Route path="action" element={<GamesListView category="Action" />} />
                    <Route path="tournaments" element={<TournamentsView tournaments={tournaments} />} />
                    <Route path="leaderboard" element={<LeaderboardView leaders={leaders} userRank={{ rank: 42, xp: "18.5k", rewards: 3 }} />} />
                    <Route path="rewards" element={<RewardsView coins={nomadCoins} rewards={rewardsData} />} />
                </Routes>
            </div>
        </div>
    );
};

export default TravelGames;
