import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * Standard Framer Motion variants for subtle fade & slide route transitions.
 * - Initial: Fades in slightly below final resting position (y: 10px)
 * - Animate: Smoothly settles into place with cubic-bezier easing
 * - Exit: Slightly slides up while fading out (y: -8px)
 */
export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.16,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Reduced-motion fallback variants respecting user system preferences (WCAG AA).
 */
export const pageReducedMotionVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.16,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.12,
      ease: 'easeIn'
    }
  }
};

/**
 * PageTransition Component
 * 
 * Framer Motion-based page transition wrapper providing subtle fade and slide
 * animations when changing routes to elevate application feel and polish.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Route element or child content
 * @param {string} [props.className] - Optional extra CSS classes
 * @param {string} [props.transitionKey] - Custom key override (defaults to location.pathname)
 * @param {object} [props.customVariants] - Optional custom animation variants
 * @param {boolean} [props.scrollToTop=true] - Whether to automatically scroll to top on route transition
 */
export const PageTransition = ({
  children,
  className = 'page-transition-wrapper w-full flex-1',
  transitionKey,
  customVariants,
  scrollToTop = true
}) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const currentKey = transitionKey || location.pathname;

  const activeVariants = customVariants || (
    shouldReduceMotion ? pageReducedMotionVariants : pageTransitionVariants
  );

  // Smooth scroll restoration on route changes
  useEffect(() => {
    if (scrollToTop && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, scrollToTop]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={currentKey}
        variants={activeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
