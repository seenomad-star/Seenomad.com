import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Globe,
  Users,
  Shield,
  Plane,
  X,
  Sparkles,
  Map,
  Search,
  ShieldCheck,
  ChevronRight,
  Bookmark,
  Menu,
  Plus
} from 'lucide-react';
import { useNavStore } from '../../store/navStore';
import { useSavedStore } from '../../store/savedStore';
import { useToastStore } from '../../store/toastStore';
import './BottomNav.css';

/**
 * BottomNav Component
 * Ergonomic, bottom-aligned mobile navigation dock.
 * Provides instant single-thumb reach to primary platform features:
 * 1. Live Feed (Stories & updates)
 * 2. Destinations (195+ Countries & Nomad Hubs)
 * 3. Elevated TravelOS Center Dock (AI Concierge, Visa Check, Quick Launch Sheet)
 * 4. Saved Wishlist (Bookmarked spots with live counter)
 * 5. Platform Menu / Drawer Toggle (Access full platform sections when sidebar is hidden)
 */
const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    toggleSearch,
    userLevel = 12,
    userXP = 4250,
    hasNewInsights,
    isMobileSidebarOpen,
    toggleMobileSidebar
  } = useNavStore();
  const { addToast } = useToastStore();

  const [isActionDeckOpen, setIsActionDeckOpen] = useState(false);
  const savedDestinations = useSavedStore((state) => state.savedDestinations);
  const savedCount = savedDestinations.length;

  // Auto-close quick action deck on route change
  useEffect(() => {
    setIsActionDeckOpen(false);
  }, [location.pathname]);

  // Handle Escape key to close action deck
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isActionDeckOpen) {
        setIsActionDeckOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActionDeckOpen]);

  // Determine active route states
  const pathname = location.pathname;
  const isFeedActive = pathname === '/' || pathname.startsWith('/feed');
  const isExploreActive =
    pathname.startsWith('/explore/destinations') ||
    pathname.startsWith('/destinations') ||
    pathname === '/explore';
  const isSavedActive = pathname.startsWith('/saved') || pathname.startsWith('/favorites');

  const handleNavClick = (path) => {
    setIsActionDeckOpen(false);
    if (isMobileSidebarOpen) {
      toggleMobileSidebar(false);
    }
    navigate(path);
  };

  const handleOpenSearch = () => {
    setIsActionDeckOpen(false);
    if (isMobileSidebarOpen) {
      toggleMobileSidebar(false);
    }
    toggleSearch(true);
  };

  const handleShareStory = () => {
    setIsActionDeckOpen(false);
    if (isMobileSidebarOpen) {
      toggleMobileSidebar(false);
    }
    if (pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 220, behavior: 'smooth' });
    addToast('Ready to share your travel story! ✨', 'info');
  };

  const handleCenterDockClick = (e) => {
    e.stopPropagation();
    if (isMobileSidebarOpen) {
      toggleMobileSidebar(false);
    }
    setIsActionDeckOpen(!isActionDeckOpen);
  };

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setIsActionDeckOpen(false);
    toggleMobileSidebar();
  };

  return (
    <>
      {/* 1. Backdrop Overlay for Travel Quick Action Deck */}
      <AnimatePresence>
        {isActionDeckOpen && (
          <motion.div
            id="mobile-action-deck-backdrop"
            className="mobile-action-deck-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsActionDeckOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 2. Travel Quick Launch Deck (Half-Sheet Thumb Access Modal) */}
      <AnimatePresence>
        {isActionDeckOpen && (
          <motion.div
            id="mobile-action-deck"
            className="mobile-action-deck"
            role="dialog"
            aria-modal="true"
            aria-label="TravelOS Quick Launch Deck"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          >
            {/* Sheet Drag Handle */}
            <div className="action-deck-handle" onClick={() => setIsActionDeckOpen(false)} />

            {/* Sheet Header */}
            <div className="action-deck-header">
              <div className="deck-title-group">
                <div className="deck-beacon">
                  <span className="deck-beacon-dot" />
                </div>
                <div>
                  <h4 className="deck-title">TravelOS Quick Tools</h4>
                  <span className="deck-subtitle">Instant nomad AI, visas & city guides</span>
                </div>
              </div>
              <button
                className="deck-close-btn"
                onClick={() => setIsActionDeckOpen(false)}
                aria-label="Close action deck"
              >
                <X size={18} />
              </button>
            </div>

            {/* Action Grid (Thumb Reachable) */}
            <div className="action-deck-grid">
              {/* 1. AI Travel Concierge */}
              <button
                className="deck-tile ai-tile"
                onClick={() => handleNavClick('/ai-agents')}
                aria-label="Open AI Travel Concierge"
              >
                <div className="tile-icon-wrapper ai-glow">
                  <Sparkles size={20} className="text-cyan" />
                </div>
                <div className="tile-text">
                  <span className="tile-name">Nomad AI Agent</span>
                  <span className="tile-desc">Smart trip plans & local tips</span>
                </div>
                <ChevronRight size={16} className="tile-arrow" />
              </button>

              {/* 2. Life Journey Map */}
              <button
                className="deck-tile map-tile"
                onClick={() => handleNavClick('/explore?view=map')}
                aria-label="Open Destination Map"
              >
                <div className="tile-icon-wrapper map-glow">
                  <Map size={20} className="text-emerald" />
                </div>
                <div className="tile-text">
                  <span className="tile-name">World Map & Cities</span>
                  <span className="tile-desc">Costs, cafes & coliving guides</span>
                </div>
                <ChevronRight size={16} className="tile-arrow" />
              </button>

              {/* 3. Visa Health Check */}
              <button
                className="deck-tile visa-tile"
                onClick={() => handleNavClick('/explore/visa')}
                aria-label="Check Visa Requirements"
              >
                <div className="tile-icon-wrapper visa-glow">
                  <ShieldCheck size={20} className="text-amber" />
                </div>
                <div className="tile-text">
                  <span className="tile-name">Visa Tracker & Rules</span>
                  <span className="tile-desc">Schengen 90-day & entry guidelines</span>
                </div>
                <ChevronRight size={16} className="tile-arrow" />
              </button>

              {/* 4. Flash Meetups */}
              <button
                className="deck-tile meetup-tile"
                onClick={() => handleNavClick('/community')}
                aria-label="Find Nomad Meetups"
              >
                <div className="tile-icon-wrapper meetup-glow">
                  <Users size={20} className="text-purple" />
                </div>
                <div className="tile-text">
                  <span className="tile-name">Nomad Community</span>
                  <span className="tile-desc">Connect with remote workers nearby</span>
                </div>
                <ChevronRight size={16} className="tile-arrow" />
              </button>

              {/* 5. Global Search */}
              <button
                className="deck-tile search-tile"
                onClick={handleOpenSearch}
                aria-label="Open Global Search"
              >
                <div className="tile-icon-wrapper search-glow">
                  <Search size={20} className="text-pink" />
                </div>
                <div className="tile-text">
                  <span className="tile-name">Search Network</span>
                  <span className="tile-desc">Find cities, hubs & creators</span>
                </div>
                <ChevronRight size={16} className="tile-arrow" />
              </button>

              {/* 6. Share Travel Story */}
              <button
                className="deck-tile story-tile"
                onClick={handleShareStory}
                aria-label="Share Travel Story"
              >
                <div className="tile-icon-wrapper story-glow">
                  <Plus size={20} className="text-orange" />
                </div>
                <div className="tile-text">
                  <span className="tile-name">Share Story</span>
                  <span className="tile-desc">Post photos, tips or city reviews</span>
                </div>
                <ChevronRight size={16} className="tile-arrow" />
              </button>
            </div>

            {/* Nomad Status Bar Footer */}
            <div className="action-deck-footer">
              <button
                type="button"
                className="footer-status-pill clickable"
                onClick={() => handleNavClick('/user')}
                aria-label="View Traveler Profile"
              >
                <span className="status-dot green animate-pulse" />
                <span>Nomad Passport Active</span>
              </button>
              <span className="footer-xp">Level {userLevel} • {userXP} XP</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Bottom-Aligned Navigation Dock Capsule */}
      <div className="mobile-bottom-nav-container">
        <nav
          id="mobile-bottom-nav"
          className="mobile-bottom-nav"
          role="navigation"
          aria-label="Mobile primary navigation dock"
        >
          {/* Slot 1: Feed */}
          <button
            id="mobile-nav-feed"
            className={`nav-item ${isFeedActive && !isActionDeckOpen ? 'active' : ''}`}
            onClick={() => handleNavClick('/')}
            aria-label="Travel Feed"
            aria-current={isFeedActive ? 'page' : undefined}
          >
            <div className="nav-icon-container">
              <Compass size={22} className="nav-icon" />
              {hasNewInsights && <span className="nav-dot-badge" />}
            </div>
            <span className="nav-label">Feed</span>
            {isFeedActive && !isActionDeckOpen && (
              <motion.div layoutId="mobileNavIndicator" className="nav-active-indicator" />
            )}
          </button>

          {/* Slot 2: Destinations */}
          <button
            id="mobile-nav-destinations"
            className={`nav-item ${isExploreActive && !isActionDeckOpen ? 'active' : ''}`}
            onClick={() => handleNavClick('/explore/destinations')}
            aria-label="Explore Destinations"
            aria-current={isExploreActive ? 'page' : undefined}
          >
            <div className="nav-icon-container">
              <Globe size={22} className="nav-icon" />
              <span className="nav-live-dot" />
            </div>
            <span className="nav-label">Destinations</span>
            {isExploreActive && !isActionDeckOpen && (
              <motion.div layoutId="mobileNavIndicator" className="nav-active-indicator" />
            )}
          </button>

          {/* Slot 3: Center Elevated Travel Action Hub */}
          <div className="nav-center-slot">
            <button
              type="button"
              id="mobile-nav-center-action"
              className={`nav-center-btn ${isActionDeckOpen ? 'is-open' : ''}`}
              onClick={handleCenterDockClick}
              aria-expanded={isActionDeckOpen}
              aria-label={isActionDeckOpen ? "Close Quick Launch Deck" : "Open Travel Tools & AI Concierge"}
              title="Travel Tools & AI Concierge"
            >
              <div className="center-halo-ring" />
              <div className="center-btn-core">
                {isActionDeckOpen ? (
                  <X size={22} className="center-icon spin-enter" />
                ) : (
                  <Plane size={22} className="center-icon plane-tilt" />
                )}
              </div>
            </button>
          </div>

          {/* Slot 4: Saved Wishlist */}
          <button
            id="mobile-nav-saved"
            className={`nav-item ${isSavedActive && !isActionDeckOpen ? 'active' : ''}`}
            onClick={() => handleNavClick('/saved')}
            aria-label="Saved Destinations Wishlist"
            aria-current={isSavedActive ? 'page' : undefined}
          >
            <div className="nav-icon-container">
              <Bookmark size={22} className="nav-icon" fill={isSavedActive ? "currentColor" : "none"} />
              {savedCount > 0 && <span className="nav-count-badge">{savedCount}</span>}
            </div>
            <span className="nav-label">Saved</span>
            {isSavedActive && !isActionDeckOpen && (
              <motion.div layoutId="mobileNavIndicator" className="nav-active-indicator" />
            )}
          </button>

          {/* Slot 5: Full Platform Navigation / Sidebar Drawer Toggle */}
          <button
            id="mobile-nav-menu"
            className={`nav-item ${isMobileSidebarOpen ? 'active menu-open' : ''}`}
            onClick={handleToggleMenu}
            aria-label={isMobileSidebarOpen ? "Close Navigation Menu" : "Open All Sections (Sidebar Menu)"}
            aria-expanded={isMobileSidebarOpen}
            title={isMobileSidebarOpen ? "Close Navigation Menu" : "Browse all categories & destinations"}
          >
            <div className="nav-icon-container">
              {isMobileSidebarOpen ? (
                <X size={22} className="nav-icon open-icon" />
              ) : (
                <Menu size={22} className="nav-icon" />
              )}
            </div>
            <span className="nav-label">{isMobileSidebarOpen ? 'Close' : 'Menu'}</span>
            {isMobileSidebarOpen && (
              <motion.div layoutId="mobileNavIndicator" className="nav-active-indicator" />
            )}
          </button>
        </nav>
      </div>
    </>
  );
};

export default BottomNav;
