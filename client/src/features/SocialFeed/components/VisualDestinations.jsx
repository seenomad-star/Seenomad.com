import React, { useState } from 'react';
import { Heart, Bookmark, Share2, MapPin, Search, X } from 'lucide-react';
import '../styles/VisualDestinations.css';

const destinations = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
        author: 'Emma J.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        location: 'Santorini, Greece',
        caption: 'Golden hour magic on the cliffs of Oia. Nothing compares to this view.',
        likes: '14.2K',
        saves: '3.8K',
        tags: ['Greece', 'Europe', 'Island'],
        size: 'tall',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800',
        author: 'Alex K.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        location: 'Mount Fuji, Japan',
        caption: 'Sunrise hike rewarded me with this. Worth every step.',
        likes: '21.5K',
        saves: '9.1K',
        tags: ['Japan', 'Asia', 'Hiking'],
        size: 'normal',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        author: 'Sofia R.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        location: 'Bali, Indonesia',
        caption: 'Rice terraces of Ubud at dawn. Pure serenity.',
        likes: '9.8K',
        saves: '2.4K',
        tags: ['Bali', 'Asia', 'Nature'],
        size: 'wide',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
        author: 'Marco P.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marco',
        location: 'Venice, Italy',
        caption: 'Canal life at 6am before the crowds arrive.',
        likes: '7.3K',
        saves: '1.9K',
        tags: ['Italy', 'Europe', 'City'],
        size: 'normal',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=800',
        author: 'Priya N.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
        location: 'Marrakech, Morocco',
        caption: 'Lost in the medina — best thing that\'s happened to me all year.',
        likes: '6.1K',
        saves: '1.2K',
        tags: ['Morocco', 'Africa', 'Culture'],
        size: 'tall',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        author: 'Luca B.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luca',
        location: 'Paris, France',
        caption: 'The Eiffel Tower hits different at midnight.',
        likes: '18.9K',
        saves: '5.5K',
        tags: ['France', 'Europe', 'City'],
        size: 'normal',
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800',
        author: 'Yuki T.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yuki',
        location: 'Kyoto, Japan',
        caption: 'Cherry blossom season in the temple gardens.',
        likes: '25.3K',
        saves: '11.7K',
        tags: ['Japan', 'Asia', 'Cherry Blossom'],
        size: 'wide',
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
        author: 'Anya W.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anya',
        location: 'Prague, Czech Republic',
        caption: 'Old Town Square just before Christmas markets open.',
        likes: '5.7K',
        saves: '890',
        tags: ['Czech Republic', 'Europe', 'Winter'],
        size: 'normal',
    },
];

const storyUsers = [
    { id: 1, username: 'emitter', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', location: 'Santorini' },
    { id: 2, username: 'alexplorer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', location: 'Kyoto' },
    { id: 3, username: 'sofia_r', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', location: 'Bali' },
    { id: 4, username: 'marco_p', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marco', location: 'Venice' },
    { id: 5, username: 'priya_n', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', location: 'Marrakech' },
    { id: 6, username: 'luca_b', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luca', location: 'Paris' },
];

const allTags = ['All', 'Asia', 'Europe', 'Africa', 'Hiking', 'Island', 'City', 'Nature', 'Culture'];

const VisualDestinations = () => {
    const [liked, setLiked] = useState({});
    const [saved, setSaved] = useState({});
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    const toggleSave = (id) => setSaved(prev => ({ ...prev, [id]: !prev[id] }));

    const filtered = destinations.filter(d => {
        const matchSearch = search === '' ||
            d.location.toLowerCase().includes(search.toLowerCase()) ||
            d.caption.toLowerCase().includes(search.toLowerCase());
        const matchTag = activeTag === 'All' || d.tags.includes(activeTag);
        return matchSearch && matchTag;
    });

    return (
        <div className="visual-destinations">
            {/* Story Rings */}
            <div className="vd-stories-rail">
                {storyUsers.map(user => (
                    <div className="vd-story-item" key={user.id}>
                        <div className="vd-story-ring">
                            <img src={user.avatar} alt={user.username} className="vd-story-avatar" />
                        </div>
                        <span className="vd-story-label">{user.location}</span>
                    </div>
                ))}
            </div>

            {/* Search + Filter */}
            <div className="vd-controls">
                <div className="vd-search-wrap">
                    <Search size={16} className="vd-search-icon" />
                    <input
                        className="vd-search"
                        placeholder="Search destinations..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && <X size={16} className="vd-clear-icon" onClick={() => setSearch('')} />}
                </div>
                <div className="vd-tags">
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`vd-tag ${activeTag === tag ? 'active' : ''}`}
                            onClick={() => setActiveTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="vd-grid">
                {filtered.map(dest => (
                    <div
                        key={dest.id}
                        className={`vd-card vd-card--${dest.size}`}
                        onClick={() => setLightbox(dest)}
                    >
                        <img src={dest.image} alt={dest.location} className="vd-img" loading="lazy" />
                        <div className="vd-overlay">
                            <div className="vd-overlay-top">
                                <div className="vd-author">
                                    <img src={dest.avatar} alt={dest.author} className="vd-author-avatar" />
                                    <span>{dest.author}</span>
                                </div>
                            </div>
                            <div className="vd-overlay-bottom">
                                <div className="vd-location">
                                    <MapPin size={12} />
                                    <span>{dest.location}</span>
                                </div>
                                <p className="vd-caption">{dest.caption}</p>
                                <div className="vd-actions" onClick={e => e.stopPropagation()}>
                                    <button
                                        className={`vd-action-btn ${liked[dest.id] ? 'liked' : ''}`}
                                        onClick={() => toggleLike(dest.id)}
                                    >
                                        <Heart size={16} fill={liked[dest.id] ? 'currentColor' : 'none'} />
                                        <span>{liked[dest.id] ? '+1' : dest.likes}</span>
                                    </button>
                                    <button
                                        className={`vd-action-btn ${saved[dest.id] ? 'saved' : ''}`}
                                        onClick={() => toggleSave(dest.id)}
                                    >
                                        <Bookmark size={16} fill={saved[dest.id] ? 'currentColor' : 'none'} />
                                        <span>{dest.saves}</span>
                                    </button>
                                    <button className="vd-action-btn">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div className="vd-lightbox" onClick={() => setLightbox(null)}>
                    <div className="vd-lightbox-card" onClick={e => e.stopPropagation()}>
                        <button className="vd-lightbox-close" onClick={() => setLightbox(null)}><X size={20} /></button>
                        <img src={lightbox.image} alt={lightbox.location} className="vd-lightbox-img" />
                        <div className="vd-lightbox-info">
                            <div className="vd-lightbox-author">
                                <img src={lightbox.avatar} alt={lightbox.author} />
                                <div>
                                    <strong>{lightbox.author}</strong>
                                    <p className="vd-lightbox-loc"><MapPin size={12} /> {lightbox.location}</p>
                                </div>
                            </div>
                            <p className="vd-lightbox-caption">{lightbox.caption}</p>
                            <div className="vd-lightbox-tags">
                                {lightbox.tags.map(t => <span key={t} className="vd-tag active">{t}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisualDestinations;
