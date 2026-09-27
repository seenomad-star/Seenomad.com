import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import './ScrollToTop.css';

/**
 * ScrollToTop
 * Floating, circular action button with a dynamic circular scroll-depth progress ring.
 * Appears only when the user scrolls past the threshold (default: 350px) on long content pages.
 * Supports smooth scrolling, keyboard accessibility, safe-area insets, and light/dark themes.
 */
const ScrollToTop = ({
    threshold = 350,
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
        const windowHeight = window.innerHeight;

        const scrollHeight = Math.max(
            el.scrollHeight,
            body.scrollHeight,
            el.offsetHeight,
            body.offsetHeight
        );

        const scrollTop = window.scrollY || el.scrollTop || body.scrollTop || 0;
        const scrollableDistance = scrollHeight - windowHeight;

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

    // Listen to scroll events
    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', onScrollThrottled, { passive: true });
        window.addEventListener('resize', onScrollThrottled, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScrollThrottled);
            window.removeEventListener('resize', onScrollThrottled);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [onScrollThrottled, handleScroll]);

    // Recalculate on route changes
    useEffect(() => {
        handleScroll();
    }, [location.pathname, location.search, handleScroll]);

    // Smooth scroll back to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: smooth ? 'smooth' : 'auto'
        });
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
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 20 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
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
                        {/* Circular Progress Ring */}
                        {showProgressRing && (
                            <svg
                                className="scroll-progress-ring"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                {/* Background track circle */}
                                <circle
                                    className="progress-ring-track"
                                    cx="24"
                                    cy="24"
                                    r={radius}
                                    strokeWidth="2.5"
                                />
                                {/* Dynamic progress indicator circle */}
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

                        {/* Central Icon / Hover Percentage */}
                        <div className="scroll-btn-content">
                            <ArrowUp size={19} className="scroll-up-arrow" strokeWidth={2.5} />
                        </div>

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
