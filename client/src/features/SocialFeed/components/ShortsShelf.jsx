import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Flame, ChevronLeft, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import '../styles/ShortsShelf.css';

const SHORT_ITEMS = [
    {
        id: 'short-1',
        title: 'Hidden 4 AM sunrise in Cappadocia 🎈',
        author: 'nomad_nina',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        views: '148K',
        sound: 'Original Sound · Cappadocia Dawn',
        thumbnail: 'https://images.unsplash.com/photo-1527838832702-5956651122bf?w=700',
        duration: '0:34',
        location: 'Cappadocia, Turkey'
    },
    {
        id: 'short-2',
        title: 'Top 3 hidden cafes with 250Mbps in Kyoto 🍵💻',
        author: 'kenji_remote',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        views: '92K',
        sound: 'Lofi Matcha Beats',
        thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700',
        duration: '0:45',
        location: 'Kyoto, Japan'
    },
    {
        id: 'short-3',
        title: 'Secret crystal lagoon in El Nido before the boats arrive 🏝️',
        author: 'isla_explores',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        views: '235K',
        sound: 'Ocean Waves & Tropical Vibes',
        thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700',
        duration: '0:28',
        location: 'Palawan, Philippines'
    },
    {
        id: 'short-4',
        title: 'Best $3 midnight street food in Bangkok alleys 🍜',
        author: 'marco_bites',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        views: '184K',
        sound: 'Bangkok Night Market Ambient',
        thumbnail: 'https://images.unsplash.com/photo-1528605248644-14dd04cb113d?w=700',
        duration: '0:52',
        location: 'Bangkok, Thailand'
    },
    {
        id: 'short-5',
        title: 'Speedboat cruise under Amalfi lemon cliffs 🍋🚤',
        author: 'giulia_travels',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        views: '112K',
        sound: 'Italian Summer Hits',
        thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=700',
        duration: '0:38',
        location: 'Amalfi Coast, Italy'
    }
];

const ShortsShelf = ({ onSelectShort, onExploreAll }) => {
    const scrollRef = useRef(null);
    const isDraggingRef = useRef(false);
    const hasMovedRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const getCardStep = () => {
        const container = scrollRef.current;
        if (!container) return 198;
        const firstCard = container.querySelector('.short-card');
        if (!firstCard) return 198;
        const style = window.getComputedStyle(container);
        const gap = parseFloat(style.columnGap || style.gap || '13.6') || 13.6;
        return firstCard.getBoundingClientRect().width + gap;
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const step = getCardStep();
            const distance = direction === 'left' ? -step : step;
            scrollRef.current.scrollBy({ left: distance, behavior: 'smooth' });
        }
    };

    const handleMouseDown = (e) => {
        const container = scrollRef.current;
        if (!container || e.button !== 0) return;
        isDraggingRef.current = true;
        hasMovedRef.current = false;
        startXRef.current = e.pageX - container.offsetLeft;
        scrollLeftRef.current = container.scrollLeft;
        container.classList.add('is-dragging');
    };

    const handleMouseMove = (e) => {
        const container = scrollRef.current;
        if (!isDraggingRef.current || !container) return;
        const x = e.pageX - container.offsetLeft;
        const walk = x - startXRef.current;
        if (Math.abs(walk) > 5) {
            hasMovedRef.current = true;
            e.preventDefault();
            container.scrollLeft = scrollLeftRef.current - walk;
        }
    };

    const finishDrag = () => {
        const container = scrollRef.current;
        if (!isDraggingRef.current || !container) return;
        isDraggingRef.current = false;
        container.classList.remove('is-dragging');

        if (hasMovedRef.current) {
            const step = getCardStep();
            const targetIndex = Math.round(container.scrollLeft / step);
            container.scrollTo({
                left: targetIndex * step,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="shorts-shelf-container" aria-label="Nomad Vibes Shelf">
            <div className="shorts-shelf-header">
                <div className="shorts-shelf-title-wrap">
                    <div className="shorts-shelf-icon-badge">
                        <Flame size={17} className="text-red-500" />
                    </div>
                    <div>
                        <div className="shorts-shelf-title-row">
                            <h3 className="shorts-shelf-title">Nomad Vibes</h3>
                            <span className="shorts-shelf-yt-badge">Sensory 360°</span>
                        </div>
                        <p className="shorts-shelf-subtitle">Live destination atmospheres, soundscapes & hidden spots</p>
                    </div>
                </div>

                <div className="shorts-shelf-controls">
                    <button 
                        type="button" 
                        className="shorts-arrow-btn"
                        onClick={() => scroll('left')}
                        aria-label="Previous shorts"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button 
                        type="button" 
                        className="shorts-arrow-btn"
                        onClick={() => scroll('right')}
                        aria-label="Next shorts"
                    >
                        <ChevronRight size={16} />
                    </button>
                    {onExploreAll && (
                        <button 
                            type="button" 
                            className="shorts-explore-all-btn"
                            onClick={onExploreAll}
                        >
                            View All →
                        </button>
                    )}
                </div>
            </div>

            <div
                className="shorts-cards-carousel"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={finishDrag}
                onMouseLeave={finishDrag}
            >
                {SHORT_ITEMS.map((item) => (
                    <motion.article 
                        key={item.id} 
                        className="short-card"
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        onClick={() => {
                            if (hasMovedRef.current) {
                                hasMovedRef.current = false;
                                return;
                            }
                            if (onSelectShort) onSelectShort(item);
                        }}
                    >
                        <div className="short-thumb-wrapper">
                            <img src={item.thumbnail} alt={item.title} className="short-thumb-img" loading="lazy" draggable={false} />
                            <div className="short-gradient-overlay" />
                            
                            <div className="short-duration-badge">{item.duration}</div>
                            
                            <div className="short-play-indicator">
                                <Play size={18} fill="#ffffff" />
                            </div>

                            <div className="short-views-pill">
                                <Play size={10} fill="currentColor" />
                                <span>{item.views}</span>
                            </div>
                        </div>

                        <div className="short-meta-info">
                            <h4 className="short-title">{item.title}</h4>
                            <div className="short-author-row">
                                <img src={item.avatar} alt={item.author} className="short-author-avatar" draggable={false} />
                                <span className="short-author-handle">@{item.author}</span>
                            </div>
                            <div className="short-sound-tag">
                                <Volume2 size={11} className="flex-shrink-0" />
                                <span className="truncate">{item.sound}</span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};

export default ShortsShelf;
