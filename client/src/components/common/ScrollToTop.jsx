import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import './ScrollToTop.css';

/**
 * ScrollToTop
 * Floating action button with dynamic circular scroll-depth progress ring,
 * matching the aesthetic, gradient palette, and smooth transitions of the horizontal progress bar.
 * Appears only when the user scrolls past the threshold (default: 300px) on long content pages.
 */
const ScrollToTop = ({
    threshold = 300,
    smooth = true,
    showProgressRing = true,
    className = ''
}) => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const rafIdRef = useRef(null);

    // Calculate scroll position and depth percentage
    const handleScroll = useCallback(() => {
        const el = document.documentElement;
        const body = document.body;
        const mainEl = document.getElementById('main-content-region');
        const windowHeight = window.innerHeight;

        const windowScrollTop = window.scrollY || window.pageYOffset || el.scrollTop || body.scrollTop || 0;
        const mainScrollTop = mainEl ? mainEl.scrollTop : 0;
        const scrollTop = Math.max(windowScrollTop, mainScrollTop);

        const windowScrollHeight = Math.max(
            el.scrollHeight,
            body.scrollHeight,
            el.offsetHeight,
            body.offsetHeight
        );
        const mainScrollHeight = mainEl ? mainEl.scrollHeight : 0;
        const scrollHeight = Math.max(windowScrollHeight, mainScrollHeight);

        const mainClientHeight = mainEl ? mainEl.clientHeight : 0;
        const clientHeight = (mainScrollTop > windowScrollTop && mainClientHeight > 0) ? mainClientHeight : windowHeight;

        const scrollableDistance = scrollHeight - clientHeight;

        // Only appear if the page is long enough to have significant content and user passed threshold
        const isLongPage = scrollableDistance > threshold;
        const hasPassedThreshold = scrollTop > threshold;

        setIsVisible(isLongPage && hasPassedThreshold);

        if (scrollableDistance > 0) {
            const currentPercentage = Math.min(100, Math.max(0, (scrollTop / scrollableDistance) * 100));
            setScrollPercentage(Math.round(currentPercentage));
        } else {
            setScrollPercentage(0);
        }
    }, [threshold]);

    const onScrollThrottled = useCallback(() => {
        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = requestAnimationFrame(handleScroll);
    }, [handleScroll]);

    // Listen to scroll events on both window and main content container
    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', onScrollThrottled, { passive: true });
        window.addEventListener('resize', onScrollThrottled, { passive: true });

        const mainEl = document.getElementById('main-content-region');
        if (mainEl) {
            mainEl.addEventListener('scroll', onScrollThrottled, { passive: true });
        }

        return () => {
            window.removeEventListener('scroll', onScrollThrottled);
            window.removeEventListener('resize', onScrollThrottled);
            if (mainEl) {
                mainEl.removeEventListener('scroll', onScrollThrottled);
            }
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [onScrollThrottled, handleScroll]);

    // Recalculate on route changes
    useEffect(() => {
        setIsVisible(false);
        setScrollPercentage(0);
        const timer = setTimeout(() => {
            handleScroll();
        }, 150);
        return () => clearTimeout(timer);
    }, [location.pathname, location.search, handleScroll]);

    // Smooth scroll back to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: smooth ? 'smooth' : 'auto'
        });
        const mainEl = document.getElementById('main-content-region');
        if (mainEl && mainEl.scrollTop > 0) {
            mainEl.scrollTo({
                top: 0,
                behavior: smooth ? 'smooth' : 'auto'
            });
        }
    };

    // Calculate circular stroke values (circle radius: 21, circumference: ~131.95)
    const radius = 21;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`scroll-to-top-wrapper ${className}`}
                    initial={{ opacity: 0, scale: 0.6, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 16 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <button
                        type="button"
                        id="floating-scroll-to-top-btn"
                        className="scroll-to-top-btn"
                        onClick={scrollToTop}
                        aria-label={`Scroll back to top. Page read: ${scrollPercentage}%`}
                        title={`Scroll to top (${scrollPercentage}% viewed)`}
                    >
                        {/* Circular Progress Ring matching the horizontal progress bar gradient */}
                        {showProgressRing && (
                            <svg
                                className="scroll-progress-ring"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient id="scrollToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="35%" stopColor="#6366f1" />
                                        <stop offset="70%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                                {/* Background track circle */}
                                <circle
                                    className="progress-ring-track"
                                    cx="24"
                                    cy="24"
                                    r={radius}
                                    strokeWidth="2.5"
                                />
                                {/* Dynamic progress indicator circle with matching gradient stroke */}
                                <circle
                                    className="progress-ring-fill"
                                    cx="24"
                                    cy="24"
                                    r={radius}
                                    strokeWidth="2.5"
                                    style={{
                                        strokeDasharray: circumference,
                                        strokeDashoffset: strokeDashoffset
                                    }}
                                />
                            </svg>
                        )}

                        {/* Central Icon */}
                        <div className="scroll-btn-content">
                            <ArrowUp size={19} className="scroll-up-arrow" strokeWidth={2.5} />
                        </div>

                        {/* Ambient Glow Aura */}
                        <span className="scroll-btn-glow" aria-hidden="true" />

                        {/* Floating Tooltip Pill */}
                        <span className={`scroll-tooltip-pill ${isHovered ? 'visible' : ''}`}>
                            Top {scrollPercentage > 0 && <span className="tooltip-percent">• {scrollPercentage}%</span>}
                        </span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
