import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Star,
    Camera,
    CheckCircle2,
    ThumbsUp,
    MapPin,
    Wifi,
    Shield,
    Search,
    Plus,
    Filter,
    Building2,
    Compass,
    Plane,
    Sparkles,
    GitBranch
} from 'lucide-react';
import { useToastStore } from '../../../store/toastStore';
import '../styles/ReviewsAndRatings.css';

const REVIEW_CATEGORIES = [
    { id: 'all', label: 'All Verified Reviews' },
    { id: 'coliving', label: 'Coliving & Stays' },
    { id: 'coworking', label: 'Coworking & Cafes' },
    { id: 'destinations', label: 'City Hubs' },
    { id: 'transit', label: 'Flights & High-Speed Rail' },
    { id: 'experiences', label: 'Local Experiences' }
];

const INITIAL_REVIEWS = [
    {
        id: 'rev-101',
        user: 'Sarah Jenkins',
        persona: 'Staff Cloud Architect · 3 Weeks Stay',
        verified: true,
        rating: 5,
        date: 'Oct 2026',
        category: 'coliving',
        venue: 'Outsite Cais do Sodré & Second Home',
        location: 'Lisbon, Portugal 🇵🇹',
        wifiMbps: 460,
        ergonomicsScore: 4.9,
        safetyScore: 4.9,
        valueScore: 4.7,
        pros: 'Dual gigabit fiber failover, Herman Miller chairs, 5-min walk to Tagus waterfront',
        cons: 'Friday night street music on Pink Street can be lively until midnight',
        text: 'Tested the fiber line during back-to-back Kubernetes deployment calls—460 Mbps symmetrical with 7ms ping. The soundproof phone booths on the 2nd floor made US East Coast afternoon syncs effortless.',
        images: [
            'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400'
        ],
        helpful: 42
    },
    {
        id: 'rev-102',
        user: 'Marcus Chen',
        persona: 'AI Product Designer · 1 Month Stay',
        verified: true,
        rating: 5,
        date: 'Oct 2026',
        category: 'coworking',
        venue: 'Shibuya Sky Co-Lab & Tsutaya Daikanyama',
        location: 'Tokyo, Japan 🇯🇵',
        wifiMbps: 680,
        ergonomicsScore: 5.0,
        safetyScore: 5.0,
        valueScore: 4.8,
        pros: '680 Mbps fiber, whisper-quiet focus zones, 24/7 Konbini & metro access downstairs',
        cons: 'Reserve 4K external monitor desks before 9:30 AM on weekdays',
        text: 'Tokyo sets the global gold standard for solo digital nomads. Every power outlet works, trains arrive to the second, and walking back to Shinjuku at 1 AM feels completely safe.',
        images: [
            'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400'
        ],
        helpful: 37
    },
    {
        id: 'rev-103',
        user: 'Elena Rostova',
        persona: 'Travel Filmmaker & Creator · 2 Weeks',
        verified: true,
        rating: 5,
        date: 'Sep 2026',
        category: 'coliving',
        venue: 'Tribal & Outpost Pererenan Villa',
        location: 'Canggu, Bali 🇮🇩',
        wifiMbps: 295,
        ergonomicsScore: 4.7,
        safetyScore: 4.6,
        valueScore: 5.0,
        pros: 'Uploaded 18GB of 4K Travel Vibes footage in 11 minutes, incredible creator community',
        cons: 'Scooter traffic around Batu Bolong shortcut during sunset hour',
        text: 'Having backup generators and dual ISP lines meant zero dropped frames even during a tropical rainstorm. Met two documentary editors by the pool on day one.',
        images: [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400'
        ],
        helpful: 29
    },
    {
        id: 'rev-104',
        user: 'Devon Brooks',
        persona: 'FinTech Founder · Transit Leg',
        verified: true,
        rating: 4,
        date: 'Sep 2026',
        category: 'transit',
        venue: 'JR Nozomi Shinkansen Green Car (Tokyo → Kyoto)',
        location: 'Tokaido Corridor, Japan 🇯🇵',
        wifiMbps: 115,
        ergonomicsScore: 4.8,
        safetyScore: 5.0,
        valueScore: 4.6,
        pros: 'Zero airport security queues, spacious legroom, wide laptop tray & AC power',
        cons: 'Brief 20-second Wi-Fi handoff inside mountain tunnels near Shizuoka',
        text: 'Booked Seat 12E for the Mount Fuji view and knocked out a full sprint review on the 2h 12m ride straight into central Kyoto.',
        images: [],
        helpful: 19
    },
    {
        id: 'rev-105',
        user: 'Camila Vargas',
        persona: 'Remote Growth Lead · 1 Month Stay',
        verified: true,
        rating: 5,
        date: 'Aug 2026',
        category: 'destinations',
        venue: 'El Poblado & Laureles Nomad District',
        location: 'Medellín, Colombia 🇨🇴',
        wifiMbps: 320,
        ergonomicsScore: 4.7,
        safetyScore: 4.4,
        valueScore: 5.0,
        pros: 'Eternal spring 24°C climate, US EST timezone alignment, world-class specialty coffee',
        cons: 'Stick to verified coworking hubs and registered rideshare apps after dark',
        text: 'Laureles is super walkable with leafy streets and third-wave cafes on every corner. Zero jetlag when working with New York and Toronto teams.',
        images: [],
        helpful: 25
    },
    {
        id: 'rev-106',
        user: 'Liam O’Connor',
        persona: 'UX Researcher · Guided Experience',
        verified: true,
        rating: 5,
        date: 'Aug 2026',
        category: 'experiences',
        venue: 'Old Quarter Hidden Alleyways & Night Market Tour',
        location: 'Taipei, Taiwan 🇹🇼',
        wifiMbps: 510,
        ergonomicsScore: 4.8,
        safetyScore: 5.0,
        valueScore: 4.9,
        pros: 'Authentic local guardian host, Gold Card nomad meetup intro, 5G coverage everywhere',
        cons: 'Come hungry—6 stops in 2.5 hours!',
        text: 'Our SeeNomad Local Guardian introduced us to three family-run tea houses and underground indie workspaces we never would have found on our own.',
        images: [],
        helpful: 31
    }
];

const ReviewsAndRatings = ({ entityId, entityName }) => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('helpful'); // 'helpful' | 'rating' | 'wifi' | 'newest'
    const [onlyWithPhotos, setOnlyWithPhotos] = useState(false);
    const [onlyHighSpeedWifi, setOnlyHighSpeedWifi] = useState(false);
    const [votedIds, setVotedIds] = useState({});
    const [showComposer, setShowComposer] = useState(false);

    // New Review Form State
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [venueName, setVenueName] = useState(entityName || '');
    const [locationName, setLocationName] = useState('');
    const [category, setCategory] = useState('coliving');
    const [persona, setPersona] = useState('Solo Digital Nomad');
    const [wifiMbps, setWifiMbps] = useState('350');
    const [prosText, setProsText] = useState('');
    const [consText, setConsText] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        if (!e.target.files) return;
        const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        setImages((prev) => [...prev, ...newImages]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating) {
            addToast('Please select a star rating between 1 and 5', 'error');
            return;
        }
        if (!reviewText.trim()) {
            addToast('Please share a brief summary of your experience', 'error');
            return;
        }

        const newReview = {
            id: `rev-${Date.now()}`,
            user: 'You (Verified Nomad)',
            persona: `${persona} · Verified Stay`,
            verified: true,
            rating,
            date: 'Just Now',
            category,
            venue: venueName.trim() || entityName || 'Featured Nomad Hub',
            location: locationName.trim() || 'Global Hub 🌐',
            wifiMbps: Number(wifiMbps) || 300,
            ergonomicsScore: rating,
            safetyScore: rating,
            valueScore: rating,
            pros: prosText.trim() || 'Reliable high-speed Wi-Fi and welcoming nomad community',
            cons: consText.trim() || 'Book workspace desk early during peak season',
            text: reviewText.trim(),
            images,
            helpful: 1
        };

        setReviews((prev) => [newReview, ...prev]);
        setReviewText('');
        setVenueName('');
        setLocationName('');
        setProsText('');
        setConsText('');
        setImages([]);
        setShowComposer(false);
        addToast('Published your verified telemetry review! +50 Nomad XP', 'success');
    };

    const handleToggleHelpful = (id) => {
        const alreadyVoted = !!votedIds[id];
        setVotedIds((prev) => ({ ...prev, [id]: !alreadyVoted }));
        setReviews((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, helpful: r.helpful + (alreadyVoted ? -1 : 1) } : r
            )
        );
    };

    // Filtered & Sorted Reviews
    const filteredReviews = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return reviews
            .filter((r) => {
                if (activeCategory !== 'all' && r.category !== activeCategory) return false;
                if (onlyWithPhotos && (!r.images || r.images.length === 0)) return false;
                if (onlyHighSpeedWifi && (Number(r.wifiMbps) || 0) < 300) return false;
                if (q) {
                    const hay = `${r.venue} ${r.location} ${r.text} ${r.pros} ${r.user}`.toLowerCase();
                    if (!hay.includes(q)) return false;
                }
                return true;
            })
            .sort((a, b) => {
                if (sortBy === 'helpful') return b.helpful - a.helpful;
                if (sortBy === 'rating') return b.rating - a.rating;
                if (sortBy === 'wifi') return (b.wifiMbps || 0) - (a.wifiMbps || 0);
                return String(b.id).localeCompare(String(a.id));
            });
    }, [reviews, activeCategory, onlyWithPhotos, onlyHighSpeedWifi, searchQuery, sortBy]);

    // Aggregate Telemetry Metrics
    const aggregate = useMemo(() => {
        if (reviews.length === 0) {
            return { avgRating: '4.9', avgWifi: 410, ergonomics: 4.9, safety: 4.8, value: 4.8 };
        }
        const sumRating = reviews.reduce((acc, r) => acc + r.rating, 0);
        const sumWifi = reviews.reduce((acc, r) => acc + (Number(r.wifiMbps) || 0), 0);
        return {
            avgRating: (sumRating / reviews.length).toFixed(1),
            avgWifi: Math.round(sumWifi / reviews.length),
            ergonomics: 4.9,
            safety: 4.8,
            value: 4.8
        };
    }, [reviews]);

    return (
        <div className="reviews-hub-shell">
            {/* 1. Hero & Telemetry Summary */}
            <header className="rv-hero-banner">
                <div className="rv-hero-left">
                    <div>
                        <span className="rv-kicker">
                            <CheckCircle2 size={13} />
                            SeeNomad Trust & Telemetry Ledger · Speedtest & Stay Verified
                        </span>
                        <h1 className="rv-title">
                            {entityName || 'Verified Traveler & Nomad Telemetry Reviews'}
                        </h1>
                        <p className="rv-subtitle">
                            Real-world reviews backed by verified Wi-Fi speedtests, acoustic desk checks, neighborhood walkability, and honest pros & cons.
                        </p>
                    </div>

                    <div className="rv-score-row">
                        <div className="rv-big-score-box">
                            <span className="rv-big-score">{aggregate.avgRating}</span>
                            <span className="rv-score-outof">/ 5.0</span>
                        </div>
                        <div>
                            <div className="rv-stars-row">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={16} fill="#F59E0B" color="#F59E0B" />
                                ))}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: 2 }}>
                                Based on {reviews.length} verified stays · Avg Wi-Fi:{' '}
                                <strong style={{ color: '#38bdf8' }}>{aggregate.avgWifi} Mbps</strong>
                            </div>
                        </div>

                        <div className="rv-hero-actions">
                            <button
                                type="button"
                                className="rv-btn rv-btn-primary"
                                onClick={() => setShowComposer((prev) => !prev)}
                            >
                                <Plus size={15} />
                                {showComposer ? 'Close Review Studio' : 'Write Verified Review'}
                            </button>
                            <button
                                type="button"
                                className="rv-btn"
                                onClick={() => navigate('/explore/planner')}
                            >
                                <GitBranch size={14} />
                                Itinerary Builder
                            </button>
                        </div>
                    </div>
                </div>

                {/* Multi-Dimensional Sub-Score Breakdown */}
                <div className="rv-telemetry-panel" aria-label="Telemetry score breakdown">
                    {[
                        { label: 'Wi-Fi Stability & Speed', score: '4.9', pct: 98 },
                        { label: 'Workspace Ergonomics', score: '4.9', pct: 96 },
                        { label: 'Safety & Walkability', score: '4.8', pct: 95 },
                        { label: 'Cost-to-Value Ratio', score: '4.8', pct: 94 },
                        { label: 'Community & Vibe', score: '4.9', pct: 97 }
                    ].map((m) => (
                        <div key={m.label} className="rv-metric-bar-row">
                            <span className="rv-metric-label">{m.label}</span>
                            <div className="rv-metric-track">
                                <div className="rv-metric-fill" style={{ width: `${m.pct}%` }} />
                            </div>
                            <span className="rv-metric-val">{m.score}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* 2. Expandable Write Review Studio */}
            {showComposer && (
                <form className="rv-composer-card" onSubmit={handleSubmit}>
                    <div className="rv-composer-header">
                        <h3>Submit Verified Stay & Telemetry Review</h3>
                        <div className="rv-star-picker" role="radiogroup" aria-label="Overall rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="rv-star-btn"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    aria-label={`Rate ${star} stars`}
                                >
                                    <Star
                                        size={24}
                                        fill={(hoverRating || rating) >= star ? '#F59E0B' : 'transparent'}
                                        color={(hoverRating || rating) >= star ? '#F59E0B' : '#64748b'}
                                    />
                                </button>
                            ))}
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, marginLeft: 6 }}>
                                {rating}.0 / 5.0
                            </span>
                        </div>
                    </div>

                    <div className="rv-form-grid">
                        <input
                            type="text"
                            className="rv-input"
                            placeholder="Property, Cafe, or Route Name (e.g. Outsite Lisbon)"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="rv-input"
                            placeholder="City & Country (e.g. Lisbon, Portugal)"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            required
                        />
                        <select
                            className="rv-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="coliving">Coliving & Stays</option>
                            <option value="coworking">Coworking & Cafes</option>
                            <option value="destinations">City Hub</option>
                            <option value="transit">Flights & High-Speed Rail</option>
                            <option value="experiences">Local Experience</option>
                        </select>
                        <input
                            type="number"
                            className="rv-input"
                            placeholder="Measured Wi-Fi Speed (Mbps)"
                            value={wifiMbps}
                            onChange={(e) => setWifiMbps(e.target.value)}
                        />
                        <input
                            type="text"
                            className="rv-input"
                            placeholder="Your Role / Stay Duration (e.g. Engineer · 2 Weeks)"
                            value={persona}
                            onChange={(e) => setPersona(e.target.value)}
                        />
                    </div>

                    <div className="rv-form-grid">
                        <input
                            type="text"
                            className="rv-input"
                            placeholder="Top Pros (e.g. 500 Mbps fiber, ergonomic chairs, quiet booths)"
                            value={prosText}
                            onChange={(e) => setProsText(e.target.value)}
                        />
                        <input
                            type="text"
                            className="rv-input"
                            placeholder="Things to Know / Cons (e.g. Book desks before 10 AM)"
                            value={consText}
                            onChange={(e) => setConsText(e.target.value)}
                        />
                    </div>

                    <textarea
                        className="rv-textarea"
                        rows={3}
                        placeholder="Share your detailed experience: How was the Wi-Fi during video calls? Was the neighborhood walkable at night?"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />

                    <div className="rv-composer-bottom">
                        <div className="rv-photo-strip">
                            <label className="rv-btn" style={{ cursor: 'pointer' }}>
                                <Camera size={15} />
                                Add Speedtest / Venue Photos
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    hidden
                                />
                            </label>
                            {images.map((img, idx) => (
                                <img key={idx} src={img} alt="Upload preview" className="rv-thumb-preview" />
                            ))}
                        </div>

                        <button type="submit" className="rv-btn rv-btn-primary">
                            <Sparkles size={14} />
                            Publish Verified Review
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Category Tabs, Search & Telemetry Filters */}
            <section className="rv-filter-bar" aria-label="Review filters">
                <div className="rv-category-tabs" role="tablist">
                    {REVIEW_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`rv-cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="rv-search-sort-row">
                    <div className="rv-search-box">
                        <Search size={14} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search by city, coliving hub, airline, or keyword (e.g. Shibuya, Lisbon, fiber)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search reviews"
                        />
                    </div>

                    <div className="rv-Quick-toggles">
                        <button
                            type="button"
                            className={`rv-cat-tab ${onlyHighSpeedWifi ? 'active' : ''}`}
                            onClick={() => setOnlyHighSpeedWifi((prev) => !prev)}
                        >
                            <Wifi size={13} />
                            300+ Mbps Only
                        </button>
                        <button
                            type="button"
                            className={`rv-cat-tab ${onlyWithPhotos ? 'active' : ''}`}
                            onClick={() => setOnlyWithPhotos((prev) => !prev)}
                        >
                            <Camera size={13} />
                            With Photos
                        </button>
                        <select
                            className="rv-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            aria-label="Sort reviews"
                        >
                            <option value="helpful">Sort: Most Helpful</option>
                            <option value="wifi">Sort: Fastest Wi-Fi (Mbps)</option>
                            <option value="rating">Sort: Highest Rated</option>
                            <option value="newest">Sort: Newest First</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* 4. Reviews Feed Grid */}
            <section className="rv-reviews-grid" aria-label="Verified traveler reviews">
                {filteredReviews.map((rev) => {
                    const isVoted = !!votedIds[rev.id];
                    return (
                        <article key={rev.id} className="rv-review-card">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                <div className="rv-card-header">
                                    <div className="rv-author-block">
                                        <div className="rv-avatar">{rev.user.charAt(0)}</div>
                                        <div className="rv-author-meta">
                                            <h4>
                                                <span>{rev.user}</span>
                                                <CheckCircle2 size={13} color="#10b981" title="Verified Stay & Speedtest" />
                                            </h4>
                                            <div className="rv-author-sub">
                                                {rev.persona} · {rev.date}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rv-stars-row" aria-label={`${rev.rating} out of 5 stars`}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={13}
                                                fill={s <= rev.rating ? '#F59E0B' : 'transparent'}
                                                color={s <= rev.rating ? '#F59E0B' : '#64748b'}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="rv-venue-line">
                                    <span className="rv-venue-name">
                                        <Building2 size={13} />
                                        {rev.venue}
                                    </span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                                        <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />
                                        {rev.location}
                                    </span>
                                </div>

                                {/* Unboxed Telemetry Metadata */}
                                <div className="rv-telemetry-line">
                                    <span>
                                        <Wifi size={12} style={{ display: 'inline', marginRight: 3, color: '#38bdf8' }} />
                                        <strong>{rev.wifiMbps} Mbps</strong> Verified
                                    </span>
                                    <span>·</span>
                                    <span>Ergonomics {rev.ergonomicsScore}/5</span>
                                    <span>·</span>
                                    <span>
                                        <Shield size={11} style={{ display: 'inline', marginRight: 3 }} />
                                        Safety {rev.safetyScore}/5
                                    </span>
                                </div>

                                <p className="rv-review-body">{rev.text}</p>

                                {(rev.pros || rev.cons) && (
                                    <div className="rv-pros-cons">
                                        {rev.pros && (
                                            <div className="rv-pro-line">
                                                <strong>+ Pros:</strong> {rev.pros}
                                            </div>
                                        )}
                                        {rev.cons && (
                                            <div className="rv-con-line">
                                                <strong>− Note:</strong> {rev.cons}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {rev.images && rev.images.length > 0 && (
                                    <div className="rv-card-photos">
                                        {rev.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt={`${rev.venue} review photo`}
                                                className="rv-card-photo"
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="rv-card-footer">
                                <button
                                    type="button"
                                    className={`rv-helpful-btn ${isVoted ? 'voted' : ''}`}
                                    onClick={() => handleToggleHelpful(rev.id)}
                                >
                                    <ThumbsUp size={13} />
                                    Helpful ({rev.helpful})
                                </button>

                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    <button
                                        type="button"
                                        className="rv-helpful-btn"
                                        onClick={() => {
                                            addToast(`Added "${rev.venue}" to Itinerary Builder`, 'success');
                                            navigate('/explore/planner');
                                        }}
                                    >
                                        + Add to Itinerary
                                    </button>
                                    <button
                                        type="button"
                                        className="rv-helpful-btn"
                                        onClick={() => navigate('/explore/book-travel')}
                                    >
                                        <Plane size={12} />
                                        Book
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>
        </div>
    );
};

export default ReviewsAndRatings;
