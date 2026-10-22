import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollProgressBar.css';

/**
 * ScrollProgressBar
 * A subtle, hardware-accelerated horizontal scroll progress bar at the top of the main-content area
 * that smoothly tracks reading/scroll depth across long pages using CSS transitions.
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

        // Long page detection: threshold of 80px scrollable depth
        if (scrollableDistance > 80) {
            setIsScrollable(true);
            const rawProgress = (scrollTop / scrollableDistance) * 100;
            const currentProgress = Math.min(100, Math.max(0, rawProgress));
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

        // Immediate check + settled check after route transition
        updateProgress();
        const timer = setTimeout(() => {
            updateProgress();
        }, 150);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        const mainEl = document.getElementById('main-content-region');
        if (mainEl) {
            mainEl.addEventListener('scroll', onScroll, { passive: true });
        }

        // Observe DOM height changes (dynamic lists, async loads, expanded sections)
        let observer = null;
        if (typeof ResizeObserver !== 'undefined') {
            observer = new ResizeObserver(() => {
                updateProgress();
            });
            if (document.body) {
                observer.observe(document.body);
            }
            if (mainEl) {
                observer.observe(mainEl);
            }
        }

        return () => {
            clearTimeout(timer);
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (mainEl) {
                mainEl.removeEventListener('scroll', onScroll);
            }
            if (observer) observer.disconnect();
        };
    }, [location.pathname, onScroll, updateProgress]);

    // Determine visibility: visible on scrollable pages once scrolled or while scrolling
    const isVisible = isScrollable && (progress > 0.5 || isScrolling);
    const scale = progress / 100;

    return (
        <div 
            className={`scroll-progress-container ${isVisible ? 'is-visible' : ''} ${isScrolling ? 'is-scrolling' : ''} ${progress >= 99 ? 'is-completed' : ''}`}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Scroll progress"
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
