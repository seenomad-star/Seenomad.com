import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Bookmark, CalendarDays, Check, Compass, MapPin,
  Plus, Search, Sparkles, Trash2, Wallet, X
} from 'lucide-react';
import { allDestinations } from '../data/destinationsData';
import { useSavedStore } from '../store/savedStore';
import { useItineraryStore } from '../store/itineraryStore';
import { useToastStore } from '../store/toastStore';
import { UGCImage } from '../components/common/Image';
import './JourneyWorkspace.css';

const getDestinationPath = (destination) => {
  const slug = String(destination.slug || destination.name || destination.id || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
  return `/explore/destinations/${encodeURIComponent(slug)}`;
};

const JourneyWorkspace = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const savedDestinations = useSavedStore((state) => state.savedDestinations);
  const isSaved = useSavedStore((state) => state.isSaved);
  const toggleSave = useSavedStore((state) => state.toggleSave);
  const removeSaved = useSavedStore((state) => state.removeSaved);
  const days = useItineraryStore((state) => state.days);
  const tripTitle = useItineraryStore((state) => state.tripTitle);
  const targetBudget = useItineraryStore((state) => state.targetBudget);
  const currency = useItineraryStore((state) => state.currency);
  const selectedDayIndex = useItineraryStore((state) => state.selectedDayIndex);
  const addStop = useItineraryStore((state) => state.addStop);
  const addToast = useToastStore((state) => state.addToast);

  const categories = useMemo(() => {
    const unique = new Set(allDestinations.map((item) => item.category).filter(Boolean));
    return ['All', ...Array.from(unique).sort()];
  }, []);

  const filteredDestinations = useMemo(() => {
    const term = query.trim().toLowerCase();
    return allDestinations.filter((destination) => {
      const text = [destination.name, destination.location, destination.category, destination.district, destination.state]
        .filter(Boolean).join(' ').toLowerCase();
      return (!term || text.includes(term)) &&
        (activeCategory === 'All' || destination.category === activeCategory);
    }).slice(0, 24);
  }, [query, activeCategory]);

  const stopCount = days.reduce((total, day) => total + (day.stops?.length || 0), 0);
  const plannedDestinationIds = new Set(days.flatMap((day) => (day.stops || []).map((stop) => String(stop.destinationId || stop.title))));

  const handleAddToTrip = (destination) => {
    const dayNumber = days[selectedDayIndex]?.dayNumber || selectedDayIndex + 1;
    const category = String(destination.category || '').toLowerCase();
    const stopCategory = category.includes('food') ? 'dining' : category.includes('transport') ? 'transit' : 'culture';
    addStop(selectedDayIndex, {
      title: destination.name,
      location: destination.location || destination.state || destination.name,
      district: destination.state || destination.location || destination.name,
      category: stopCategory,
      cost: 0,
      image: destination.image || '',
      note: 'Added from Seenomad destination discovery. Confirm current opening times, transport, and costs before travel.'
    });
    addToast(`Added ${destination.name} to Day ${dayNumber} of your itinerary.`, 'success');
    navigate('/explore/itinerary-builder');
  };

  const handleSave = (destination) => {
    const alreadySaved = isSaved(destination.id || destination.name);
    toggleSave(destination);
    if (!alreadySaved) addToast(`Saved ${destination.name} to your places.`, 'success');
  };

  return (
    <main className="journey-workspace">
      <section className="journey-workspace-hero">
        <div className="journey-workspace-hero-content">
          <span className="journey-eyebrow"><Sparkles size={14} /> YOUR JOURNEY WORKSPACE</span>
          <h1>From <span>“somewhere someday”</span> to a trip you can take.</h1>
          <p>Discover destinations, keep your shortlist, and add places directly to your day-by-day itinerary.</p>
          <div className="journey-hero-actions">
            <a href="#journey-discover" className="journey-button journey-button-primary">Discover places <ArrowRight size={16} /></a>
            <Link to="/explore/itinerary-builder" className="journey-button journey-button-secondary">Open itinerary <CalendarDays size={16} /></Link>
          </div>
        </div>
        <div className="journey-hero-art" aria-hidden="true">
          <div className="journey-orbit journey-orbit-one" />
          <div className="journey-orbit journey-orbit-two" />
          <div className="journey-hero-pin"><Compass size={42} /></div>
          <span className="journey-floating-label journey-label-top"><MapPin size={14} /> Find your next place</span>
          <span className="journey-floating-label journey-label-bottom"><Bookmark size={14} /> Keep it for later</span>
        </div>
      </section>

      <section className="journey-stat-grid" aria-label="Your travel overview">
        <article className="journey-stat-card">
          <span className="journey-stat-icon"><Bookmark size={18} /></span>
          <span className="journey-stat-label">Saved places</span>
          <strong>{savedDestinations.length}</strong>
          <Link to="/saved">Manage shortlist <ArrowRight size={13} /></Link>
        </article>
        <article className="journey-stat-card">
          <span className="journey-stat-icon"><CalendarDays size={18} /></span>
          <span className="journey-stat-label">Itinerary days</span>
          <strong>{days.length}</strong>
          <Link to="/explore/itinerary-builder">Edit itinerary <ArrowRight size={13} /></Link>
        </article>
        <article className="journey-stat-card">
          <span className="journey-stat-icon"><MapPin size={18} /></span>
          <span className="journey-stat-label">Planned stops</span>
          <strong>{stopCount}</strong>
          <span className="journey-stat-note">Across your current itinerary</span>
        </article>
        <article className="journey-stat-card">
          <span className="journey-stat-icon"><Wallet size={18} /></span>
          <span className="journey-stat-label">Target budget</span>
          <strong>{currency === 'INR' ? '₹' : '$'}{Number(targetBudget || 0).toLocaleString()}</strong>
          <span className="journey-stat-note">Current itinerary target</span>
        </article>
      </section>

      <section className="journey-current-trip">
        <div className="journey-current-trip-copy">
          <span className="journey-section-kicker">PICK UP WHERE YOU LEFT OFF</span>
          <h2>{tripTitle || 'Your next journey'}</h2>
          <p>Your existing itinerary is preserved. Add a destination below and it will be placed on the currently selected itinerary day.</p>
        </div>
        <Link to="/explore/itinerary-builder" className="journey-button journey-button-primary">Continue planning <ArrowRight size={16} /></Link>
      </section>

      <section className="journey-section" id="journey-discover">
        <div className="journey-section-heading">
          <div>
            <span className="journey-section-kicker">DISCOVER & DECIDE</span>
            <h2>Find somewhere worth going</h2>
            <p>Search the existing Seenomad destination catalogue, save a shortlist, or add a place to your itinerary.</p>
          </div>
          <Link to="/explore/destinations" className="journey-text-link">Full destination explorer <ArrowRight size={15} /></Link>
        </div>

        <div className="journey-discovery-controls">
          <label className="journey-search">
            <Search size={17} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by destination, state, country, or interest…" aria-label="Search destinations" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}
          </label>
          <label className="journey-category-select">
            <span>Interest</span>
            <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} aria-label="Filter destinations by category">
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
        </div>

        <div className="journey-destination-grid">
          {filteredDestinations.map((destination) => {
            const saved = isSaved(destination.id || destination.name);
            const planned = plannedDestinationIds.has(String(destination.id)) || plannedDestinationIds.has(String(destination.name));
            return (
              <article className="journey-destination-card" key={destination.id || destination.name}>
                <Link to={getDestinationPath(destination)} className="journey-destination-image-link" aria-label={`View ${destination.name}`}>
                  <UGCImage src={destination.image} alt={destination.name} className="journey-destination-image" />
                </Link>
                <div className="journey-destination-content">
                  <div className="journey-destination-meta">
                    <span>{destination.category || 'Destination'}</span>
                    {planned && <span className="journey-planned-pill"><Check size={12} /> In itinerary</span>}
                  </div>
                  <Link to={getDestinationPath(destination)} className="journey-destination-title">{destination.name}</Link>
                  <p className="journey-destination-location"><MapPin size={13} /> {destination.location || destination.state || 'Explore destination'}</p>
                  <div className="journey-destination-actions">
                    <button type="button" className={`journey-icon-action ${saved ? 'is-saved' : ''}`} onClick={() => handleSave(destination)} aria-label={saved ? `Remove ${destination.name} from saved places` : `Save ${destination.name}`} title={saved ? 'Saved' : 'Save place'}>
                      <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
                    </button>
                    <button type="button" className="journey-add-action" onClick={() => handleAddToTrip(destination)}>
                      <Plus size={15} /> Add to trip
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {filteredDestinations.length === 0 && (
          <div className="journey-empty-state">
            <Compass size={28} />
            <h3>No matching destinations</h3>
            <p>Try a different search or clear the interest filter.</p>
            <button type="button" className="journey-button journey-button-secondary" onClick={() => { setQuery(''); setActiveCategory('All'); }}>Reset filters</button>
          </div>
        )}
        {filteredDestinations.length > 0 && (
          <p className="journey-result-note">Showing {filteredDestinations.length} destinations from the current catalogue. Use the full explorer for the complete discovery experience.</p>
        )}
      </section>

      <section className="journey-section journey-saved-section">
        <div className="journey-section-heading">
          <div>
            <span className="journey-section-kicker">YOUR SHORTLIST</span>
            <h2>Places you want to remember</h2>
            <p>Your saved destinations are stored in the existing Seenomad local saved-place store on this device.</p>
          </div>
          <Link to="/saved" className="journey-text-link">Manage all saved places <ArrowRight size={15} /></Link>
        </div>
        {savedDestinations.length ? (
          <div className="journey-saved-list">
            {savedDestinations.slice(0, 6).map((destination) => (
              <article className="journey-saved-row" key={destination.id || destination.name}>
                <div className="journey-saved-thumb">
                  <UGCImage src={destination.image} alt="" />
                </div>
                <div className="journey-saved-copy">
                  <Link to={getDestinationPath(destination)}>{destination.name}</Link>
                  <span>{destination.location || 'Location not specified'}{destination.category ? ` · ${destination.category}` : ''}</span>
                </div>
                <button type="button" className="journey-saved-plan" onClick={() => handleAddToTrip(destination)}><Plus size={14} /> Plan</button>
                <button type="button" className="journey-saved-remove" onClick={() => removeSaved(destination.id || destination.name)} aria-label={`Remove ${destination.name} from saved places`} title="Remove saved place"><Trash2 size={15} /></button>
              </article>
            ))}
          </div>
        ) : (
          <div className="journey-empty-state">
            <Bookmark size={28} />
            <h3>Your shortlist starts here</h3>
            <p>Save a destination above to keep it here for your next trip.</p>
            <a href="#journey-discover" className="journey-button journey-button-secondary">Discover destinations</a>
          </div>
        )}
      </section>
    </main>
  );
};

export default JourneyWorkspace;
