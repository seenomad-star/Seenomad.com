import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollProgressBar.css';

/**
 * ScrollProgressBar
 * A subtle, hardware-accelerated scroll progress bar fixed at the top of the viewport
 * that tracks user reading/browsing depth on content-heavy pages.
 */
const ScrollProgressBar = () => {
    const location = useLocation();
    const [progress, setProgress] = useState(0);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const rafIdRef = useRef(null);
    const idleTimeoutRef = useRef(null);

    const updateProgress = useCallback(() => {
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

        // Consider content-heavy if scrollable distance exceeds 100px
        if (scrollableDistance > 100) {
            setIsScrollable(true);
            const currentProgress = Math.min(100, Math.max(0, (scrollTop / scrollableDistance) * 100));
            setProgress(currentProgress);
        } else {
            setIsScrollable(false);
            setProgress(0);
        }
    }, []);

    const onScroll = useCallback(() => {
        setIsScrolling(true);
        if (idleTimeoutRef.current) {
            clearTimeout(idleTimeoutRef.current);
        }
        idleTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 1200);

        if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = requestAnimationFrame(updateProgress);
    }, [updateProgress]);

    // Recalculate on route changes and attach listeners
    useEffect(() => {
        // Reset immediately on navigation
        setProgress(0);
        setIsScrolling(false);

        // Allow route transition/render to settle, then measure
        const timer = setTimeout(() => {
            updateProgress();
        }, 120);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        // Observe DOM height changes (dynamic feeds, async content loads)
        let observer = null;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => {
                updateProgress();
            });
            if (document.body) {
                observer.observe(document.body);
            }
        }

        return () => {
            clearTimeout(timer);
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (observer) observer.disconnect();
        };
    }, [location.pathname, onScroll, updateProgress]);

    // Only render if page has enough content to be scrollable
    if (!isScrollable) {
        return null;
    }

    const scale = progress / 100;

    return (
        <div 
            className={`scroll-progress-container ${isScrolling ? 'is-scrolling' : ''} ${progress > 0 ? 'has-progress' : ''}`}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        >
            <div 
                className="scroll-progress-fill" 
                style={{ transform: `scaleX(${scale})` }}
            >
                <span className="scroll-progress-glow" />
            </div>
        </div>
    );
};

export default ScrollProgressBar;
