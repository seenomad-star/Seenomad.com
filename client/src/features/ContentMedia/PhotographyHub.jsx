import React, { useState, useMemo } from 'react';
import {
    Camera,
    Search,
    Heart,
    Bookmark,
    Share2,
    MapPin,
    Download,
    Plus,
    X,
    Aperture,
    Sparkles,
    Eye
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const PHOTO_CATEGORIES = [
    'All',
    'Nature',
    'City',
    'Beach',
    'Mountains',
    'Culture',
    'Night',
    'Luxury',
    'Hiking'
];

const INITIAL_PHOTOS = [
    {
        id: 'bali-ulun-danu',
        title: 'Ulun Danu Beratan Temple at Sunrise',
        location: 'Bedugul, Bali, Indonesia',
        category: 'Culture',
        tags: ['Nature', 'Culture'],
        aspect: 'tall',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=85',
        photographer: 'Elena Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        camera: 'Sony A7R V · 35mm f/1.4',
        likes: 1842,
        views: '14.2K'
    },
    {
        id: 'porto-ribeira',
        title: 'Ribeira Waterfront & Douro River Boats',
        location: 'Porto, Portugal',
        category: 'City',
        tags: ['City', 'Culture'],
        aspect: 'wide',
        image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&auto=format&fit=crop&q=85',
        photographer: 'Marco Silva',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        camera: 'Leica Q3 · 28mm f/1.7',
        likes: 1290,
        views: '9.8K'
    },
    {
        id: 'bromo-highlands',
        title: 'Emerald Volcanic Valleys & Mist',
        location: 'East Java, Indonesia',
        category: 'Mountains',
        tags: ['Nature', 'Mountains', 'Hiking'],
        aspect: 'wide',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=85',
        photographer: 'Kenji Takahashi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        camera: 'DJI Mavic 3 Pro · 24mm',
        likes: 2410,
        views: '21.5K'
    },
    {
        id: 'santorini-oia',
        title: 'Blue Domes & Aegean Twilight',
        location: 'Oia, Santorini, Greece',
        category: 'Luxury',
        tags: ['City', 'Beach', 'Luxury'],
        aspect: 'standard',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&auto=format&fit=crop&q=85',
        photographer: 'Sofia Laurent',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        camera: 'Canon EOS R5 · 50mm f/1.2',
        likes: 3120,
        views: '28.9K'
    },
    {
        id: 'krabi-palms',
        title: 'Limestone Karsts & Tropical Palms',
        location: 'Krabi, Thailand',
        category: 'Beach',
        tags: ['Nature', 'Beach', 'Hiking'],
        aspect: 'standard',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&auto=format&fit=crop&q=85',
        photographer: 'Liam O’Connor',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        camera: 'Fujifilm X-T5 · 23mm f/2',
        likes: 1560,
        views: '11.4K'
    },
    {
        id: 'tokyo-shinjuku-night',
        title: 'Neon Rain in Shinjuku Alleyways',
        location: 'Tokyo, Japan',
        category: 'Night',
        tags: ['City', 'Night', 'Culture'],
        aspect: 'wide',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=900&auto=format&fit=crop&q=85',
        photographer: 'Hana Sato',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        camera: 'Sony A7S III · 35mm f/1.4',
        likes: 2780,
        views: '19.3K'
    },
    {
        id: 'dolomites-secada',
        title: 'Seceda Ridgeline Alpine Trail',
        location: 'Dolomites, Italy',
        category: 'Hiking',
        tags: ['Mountains', 'Hiking', 'Nature'],
        aspect: 'wide',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&auto=format&fit=crop&q=85',
        photographer: 'Lukas Weber',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        camera: 'Nikon Z8 · 14-24mm f/2.8',
        likes: 1950,
        views: '15.7K'
    },
    {
        id: 'amalfi-positano-beach',
        title: 'Mediterranean Cliffside Sunsets',
        location: 'Positano, Amalfi Coast, Italy',
        category: 'Beach',
        tags: ['Beach', 'Luxury', 'City'],
        aspect: 'wide',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&auto=format&fit=crop&q=85',
        photographer: 'Chiara Rossi',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
        camera: 'Leica M11 · 35mm Summilux',
        likes: 2240,
        views: '17.1K'
    }
];

const PhotographyHub = () => {
    const { addToast } = useToastStore();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [likedIds, setLikedIds] = useState(['bali-ulun-danu']);
    const [savedIds, setSavedIds] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const filteredPhotos = useMemo(() => {
        return INITIAL_PHOTOS.filter((photo) => {
            const matchesCategory =
                activeCategory === 'All' ||
                photo.category === activeCategory ||
                photo.tags.includes(activeCategory);
            const q = searchQuery.trim().toLowerCase();
            const matchesSearch =
                !q ||
                photo.location.toLowerCase().includes(q) ||
                photo.title.toLowerCase().includes(q) ||
                photo.photographer.toLowerCase().includes(q);
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    const toggleLike = (e, id) => {
        e.stopPropagation();
        setLikedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const toggleSave = (e, id, title) => {
        e.stopPropagation();
        const isSaved = savedIds.includes(id);
        setSavedIds((prev) =>
            isSaved ? prev.filter((item) => item !== id) : [...prev, id]
        );
        addToast(
            isSaved ? `Removed "${title}" from collection` : `Saved "${title}" to your inspiration board`,
            'info'
        );
    };

    return (
        <div className="cm-photography-view">
            {/* Hero Title Row (Exact Match to Reference Image) */}
            <div className="cm-photo-hero-header">
                <div className="cm-photo-title-group">
                    <div className="cm-photo-pink-icon">
                        <Camera size={24} strokeWidth={2.2} />
                    </div>
                    <div>
                        <h1>Travel Photography</h1>
                        <p>Stunning shots from around the world</p>
                    </div>
                </div>

                <button
                    type="button"
                    className="cm-upload-shot-btn"
                    onClick={() => addToast('Upload your RAW or high-res travel shot (+75 XP)', 'success')}
                >
                    <Plus size={16} />
                    <span>Submit Shot</span>
                </button>
            </div>

            {/* Search Input Bar (Exact Match to Reference Image) */}
            <div className="cm-photo-search-bar">
                <Search size={18} className="cm-photo-search-icon" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location..."
                    aria-label="Search travel photography by location"
                />
                {searchQuery && (
                    <button
                        type="button"
                        className="cm-photo-search-clear"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                    >
                        <X size={15} />
                    </button>
                )}
            </div>

            {/* Category Filter Pills (All, Nature, City, Beach, Mountains, Culture, Night, Luxury, Hiking) */}
            <div className="cm-photo-filter-row" role="tablist" aria-label="Photography categories">
                {PHOTO_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={activeCategory === cat}
                        className={`cm-photo-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Bento / Masonry Gallery Grid Matching Reference Layout */}
            {filteredPhotos.length === 0 ? (
                <div className="cm-empty-state">
                    <Camera size={36} />
                    <h3>No shots found for &ldquo;{searchQuery}&rdquo;</h3>
                    <p>Try searching for Bali, Porto, Santorini, Tokyo, or Dolomites.</p>
                </div>
            ) : (
                <div className="cm-photo-bento-grid">
                    {filteredPhotos.map((photo, index) => {
                        const isLiked = likedIds.includes(photo.id);
                        const isSaved = savedIds.includes(photo.id);
                        const isTallHero = index === 0 && activeCategory === 'All' && !searchQuery;

                        return (
                            <article
                                key={photo.id}
                                className={`cm-photo-card ${isTallHero ? 'tall-featured' : ''}`}
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <img
                                    src={photo.image}
                                    alt={photo.title}
                                    loading="lazy"
                                    className="cm-photo-img"
                                />
                                <div className="cm-photo-overlay">
                                    <div className="cm-photo-top-actions">
                                        <span className="cm-photo-location-tag">
                                            <MapPin size={12} />
                                            {photo.location}
                                        </span>
                                        <div className="cm-photo-icon-btns">
                                            <button
                                                type="button"
                                                className={`cm-photo-circle-btn ${isLiked ? 'liked' : ''}`}
                                                onClick={(e) => toggleLike(e, photo.id)}
                                                aria-label="Like photo"
                                            >
                                                <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                                            </button>
                                            <button
                                                type="button"
                                                className={`cm-photo-circle-btn ${isSaved ? 'saved' : ''}`}
                                                onClick={(e) => toggleSave(e, photo.id, photo.title)}
                                                aria-label="Save photo"
                                            >
                                                <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cm-photo-bottom-meta">
                                        <h3>{photo.title}</h3>
                                        <div className="cm-photo-creator-row">
                                            <div className="cm-photo-creator-info">
                                                <img src={photo.avatar} alt={photo.photographer} />
                                                <span>{photo.photographer}</span>
                                            </div>
                                            <span className="cm-photo-camera-spec">
                                                <Aperture size={12} />
                                                {photo.camera}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}

            {/* Lightbox Modal for Selected Photo */}
            {selectedPhoto && (
                <div className="cm-lightbox-backdrop" onClick={() => setSelectedPhoto(null)}>
                    <div className="cm-lightbox-modal" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="cm-lightbox-close"
                            onClick={() => setSelectedPhoto(null)}
                            aria-label="Close photo viewer"
                        >
                            <X size={18} />
                        </button>
                        <div className="cm-lightbox-img-wrap">
                            <img src={selectedPhoto.image} alt={selectedPhoto.title} />
                        </div>
                        <div className="cm-lightbox-details">
                            <div className="cm-lightbox-header">
                                <div>
                                    <span className="cm-lightbox-loc">
                                        <MapPin size={13} /> {selectedPhoto.location}
                                    </span>
                                    <h2>{selectedPhoto.title}</h2>
                                </div>
                                <button
                                    type="button"
                                    className="cm-upload-shot-btn"
                                    onClick={() => addToast('Downloaded high-resolution wallpaper & EXIF preset', 'success')}
                                >
                                    <Download size={15} />
                                    <span>Download Preset</span>
                                </button>
                            </div>
                            <div className="cm-lightbox-meta-bar">
                                <span>Photographer: <strong>{selectedPhoto.photographer}</strong></span>
                                <span>Gear: <strong>{selectedPhoto.camera}</strong></span>
                                <span>Views: <strong>{selectedPhoto.views}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotographyHub;
