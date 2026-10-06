import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bookmark,
    Heart,
    MapPin,
    Star,
    Wifi,
    DollarSign,
    Shield,
    Sparkles,
    Trash2,
    Compass,
    Search,
    X,
    ArrowRight,
    Bot,
    ExternalLink,
    Filter
} from 'lucide-react';
import { useSavedStore } from '../../store/savedStore';
import { UGCImage } from '../../components/common/Image';
import './SavedDestinationsHub.css';

const CATEGORIES = [
    { id: 'all', label: 'All Saved' },
    { id: 'Beach', label: 'Beach & Island' },
    { id: 'City', label: 'Metropolis' },
    { id: 'visa', label: 'Visa-Free' },
    { id: 'budget', label: 'Under $1,500' }
];

const SavedDestinationsHub = () => {
    const navigate = useNavigate();
    const { savedDestinations, removeSaved, clearAll } = useSavedStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // Sync with Vertical NomadDock page-specific filter selection
    React.useEffect(() => {
        const handleDockFilter = (e) => {
            if (e.detail?.pageContext === 'saved' && e.detail?.filterId) {
                setActiveCategory((prev) => (prev === e.detail.filterId ? 'all' : e.detail.filterId));
            }
        };
        const handleDockReset = () => setActiveCategory('all');
        window.addEventListener('nomaddock:filter', handleDockFilter);
        window.addEventListener('nomaddock:reset', handleDockReset);
        return () => {
            window.removeEventListener('nomaddock:filter', handleDockFilter);
            window.removeEventListener('nomaddock:reset', handleDockReset);
        };
    }, []);

    // Filter & search logic
    const filteredDestinations = useMemo(() => {
        return savedDestinations.filter((dest) => {
            const matchesQuery =
                !searchQuery ||
                dest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dest.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dest.category?.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesQuery) return false;

            if (activeCategory === 'all') return true;
            if (activeCategory === 'visa') return dest.visaFriendly === true;
            if (activeCategory === 'budget') {
                const numericPrice = parseInt(String(dest.price || '').replace(/[^0-9]/g, '')) || 0;
                return numericPrice > 0 && numericPrice <= 1500;
            }
            return dest.category?.toLowerCase() === activeCategory.toLowerCase();
        });
    }, [savedDestinations, searchQuery, activeCategory]);

    // Statistics computations
    const stats = useMemo(() => {
        const total = savedDestinations.length;
        if (total === 0) {
            return { total: 0, avgPrice: '$0', visaCount: 0, avgRating: '0.0' };
        }
        let totalPrice = 0;
        let priceCount = 0;
        let visaCount = 0;
        let totalRating = 0;

        savedDestinations.forEach(d => {
            const num = parseInt(String(d.price || '').replace(/[^0-9]/g, '')) || 0;
            if (num > 0) {
                totalPrice += num;
                priceCount++;
            }
            if (d.visaFriendly) visaCount++;
            if (d.rating) totalRating += parseFloat(d.rating);
        });

        const avgPrice = priceCount > 0 ? `$${Math.round(totalPrice / priceCount)}/mo` : '$1,450/mo';
        const avgRating = total > 0 ? (totalRating / total).toFixed(1) : '4.8';

        return { total, avgPrice, visaCount, avgRating };
    }, [savedDestinations]);

    const handlePlanWithAI = (dest) => {
        navigate(`/ai-agents?dest=${encodeURIComponent(dest.name)}`);
    };

    const handleViewDetails = (dest) => {
        const slug = dest.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        navigate(`/explore/destinations/${slug}`);
    };

    return (
        <div className="saved-hub-container" id="saved-destinations-hub">
            {/* Header */}
            <div className="saved-hub-header">
                <div className="saved-hub-title-row">
                    <div className="saved-hub-title-group">
                        <div className="saved-hub-icon-badge">
                            <Bookmark size={26} fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="saved-hub-title">
                                My Favorites Collection
                                <span className="saved-hub-counter-pill">{savedDestinations.length}</span>
                            </h1>
                            <p className="saved-hub-subtitle">
                                Stored in your local Nomad Profile — quick access to your bookmarked destinations, cost-of-living specs, and visa hubs.
                            </p>
                        </div>
                    </div>

                    <div className="saved-hub-actions">
                        <button
                            className="saved-hub-btn secondary"
                            onClick={() => navigate('/user/profile')}
                            title="View Local Nomad Profile"
                        >
                            <span>My Profile</span>
                        </button>
                        <button
                            className="saved-hub-btn primary"
                            onClick={() => navigate('/explore/destinations')}
                            title="Explore More Places"
                        >
                            <Compass size={16} />
                            <span>Explore Places</span>
                        </button>
                        {savedDestinations.length > 0 && (
                            <button
                                className="saved-hub-btn secondary"
                                onClick={clearAll}
                                title="Clear All Favorites"
                            >
                                <Trash2 size={15} />
                                <span>Clear All</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats Ribbon */}
                <div className="saved-stats-ribbon">
                    <div className="saved-stat-card">
                        <div className="saved-stat-icon-wrap blue">
                            <Bookmark size={20} />
                        </div>
                        <div className="saved-stat-info">
                            <span className="saved-stat-label">Saved Places</span>
                            <span className="saved-stat-value">{stats.total}</span>
                        </div>
                    </div>

                    <div className="saved-stat-card">
                        <div className="saved-stat-icon-wrap green">
                            <DollarSign size={20} />
                        </div>
                        <div className="saved-stat-info">
                            <span className="saved-stat-label">Avg Nomad Cost</span>
                            <span className="saved-stat-value">{stats.avgPrice}</span>
                        </div>
                    </div>

                    <div className="saved-stat-card">
                        <div className="saved-stat-icon-wrap purple">
                            <Shield size={20} />
                        </div>
                        <div className="saved-stat-info">
                            <span className="saved-stat-label">Visa-Friendly</span>
                            <span className="saved-stat-value">{stats.visaCount} Places</span>
                        </div>
                    </div>

                    <div className="saved-stat-card">
                        <div className="saved-stat-icon-wrap amber">
                            <Star size={20} />
                        </div>
                        <div className="saved-stat-info">
                            <span className="saved-stat-label">Avg Rating</span>
                            <span className="saved-stat-value">{stats.avgRating} ★</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Bar: Search & Category Filters */}
            <div className="saved-control-bar">
                <div className="saved-search-box">
                    <Search size={17} className="saved-search-icon" />
                    <input
                        type="text"
                        className="saved-search-input"
                        placeholder="Search your saved destinations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="saved-search-clear"
                            onClick={() => setSearchQuery('')}
                            aria-label="Clear search"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                <div className="saved-filter-pills">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            className={`saved-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid or Empty State */}
            {filteredDestinations.length > 0 ? (
                <div className="saved-cards-grid">
                    <AnimatePresence>
                        {filteredDestinations.map((dest) => (
                            <motion.div
                                key={dest.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="saved-dest-card"
                            >
                                {/* Media & Badges */}
                                <div className="saved-card-media">
                                    <UGCImage
                                        src={dest.image}
                                        alt={dest.name}
                                        className="saved-card-img"
                                        loading="lazy"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                                    />
                                    <div className="saved-card-overlay" />

                                    <div className="saved-card-top-badges">
                                        <span className="saved-cat-badge">{dest.category || 'Dest'}</span>
                                        <button
                                            className="saved-remove-btn"
                                            onClick={() => removeSaved(dest.id)}
                                            title="Remove from Saved"
                                            aria-label={`Remove ${dest.name} from Saved`}
                                        >
                                            <Bookmark size={15} fill="currentColor" />
                                        </button>
                                    </div>

                                    <div className="saved-card-rating-badge">
                                        <Star size={13} fill="currentColor" />
                                        <span>{dest.rating || 4.8}</span>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="saved-card-content">
                                    <div className="saved-card-title-row">
                                        <h3 className="saved-card-title">{dest.name}</h3>
                                        <span className="saved-card-price">{dest.price || '$1,200/mo'}</span>
                                    </div>

                                    <div className="saved-card-loc">
                                        <MapPin size={14} />
                                        <span>{dest.location || 'Global'}</span>
                                    </div>

                                    {/* Specs row */}
                                    <div className="saved-specs-row">
                                        <div className="saved-spec-item">
                                            <Wifi size={13} />
                                            <span>{dest.wifi || '75 Mbps'}</span>
                                        </div>
                                        {dest.visaFriendly && (
                                            <div className="saved-spec-item green">
                                                <Shield size={13} />
                                                <span>Visa-Free</span>
                                            </div>
                                        )}
                                        {dest.xp && (
                                            <div className="saved-spec-item">
                                                <Sparkles size={13} color="#f59e0b" />
                                                <span>{dest.xp}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card CTA Actions */}
                                    <div className="saved-card-actions">
                                        <button
                                            className="saved-card-cta-btn"
                                            onClick={() => handleViewDetails(dest)}
                                            title="View Destination Intelligence"
                                        >
                                            <span>View Details</span>
                                            <ExternalLink size={14} />
                                        </button>

                                        <button
                                            className="saved-plan-ai-btn"
                                            onClick={() => handlePlanWithAI(dest)}
                                            title="Plan Itinerary with AI Concierge"
                                        >
                                            <Bot size={17} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="saved-empty-state">
                    <div className="saved-empty-icon-wrap">
                        <Bookmark size={34} />
                    </div>
                    <h3 className="saved-empty-title">
                        {searchQuery ? 'No matching bookmarks found' : 'No Saved Destinations Yet'}
                    </h3>
                    <p className="saved-empty-text">
                        {searchQuery
                            ? `We couldn't find any saved destinations matching "${searchQuery}". Try a different keyword.`
                            : 'Bookmark dream cities, islands, and remote hubs from Explore or Feed to quickly access them here on any device.'}
                    </p>
                    <Link to="/explore" className="saved-empty-cta-btn">
                        <Compass size={18} />
                        <span>Discover Global Destinations</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SavedDestinationsHub;
