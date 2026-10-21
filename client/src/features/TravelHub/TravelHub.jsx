import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Backpack, BookOpen, Building2, CalendarDays, Camera,
  CheckSquare, Compass, Globe2, Heart, Map, MapPinned, MessageCircle,
  Plane, Search, ShieldCheck, Sparkles, Users, Wallet, Wifi, Wrench,
  CloudSun, Landmark, BriefcaseBusiness, Bookmark
} from 'lucide-react';
import './TravelHub.css';

const CATEGORIES = ['All', 'Social network', 'Discover', 'Plan a trip', 'Travel tools', 'Resources', 'Communities', 'For professionals'];

const HUB_ITEMS = [
  { title: 'Travel social feed', description: 'Discover traveller posts, destination photos, short videos, reels, and trip stories.', category: 'Social network', icon: Camera, href: '/', label: 'Open social feed' },
  { title: 'Traveller profiles & creators', description: 'Find travel creators and people to follow for practical inspiration.', category: 'Social network', icon: Users, href: '/community', label: 'Explore people' },
  { title: 'Messages & conversations', description: 'Continue travel conversations and coordinate plans with other members.', category: 'Social network', icon: MessageCircle, href: '/messages', label: 'Open messages' },
  { title: 'Saved posts and places', description: 'Keep useful travel inspiration and destinations together for later.', category: 'Social network', icon: Bookmark, href: '/saved', label: 'View saved items' },
  { title: 'Explore destinations', description: 'Browse countries, cities, attractions, beaches, mountains, and places to visit.', category: 'Discover', icon: Compass, href: '/explore/destinations', label: 'Explore places' },
  { title: 'Destination guides', description: 'Explore practical guides, local culture, neighbourhoods, and trip inspiration.', category: 'Discover', icon: BookOpen, href: '/explore/trivenly', label: 'Browse guides' },
  { title: 'Compare destinations', description: 'Shortlist and compare potential destinations before deciding where to travel.', category: 'Discover', icon: Globe2, href: '/explore/compare-destinations', label: 'Compare places' },
  { title: 'Events & festivals', description: 'Find event and festival inspiration to help plan when and where to travel.', category: 'Discover', icon: Heart, href: '/event-festival', label: 'Explore events' },
  { title: 'Local experiences', description: 'Discover cultural activities, learning experiences, and local-led activities.', category: 'Discover', icon: Landmark, href: '/learning-voluntourism', label: 'Explore experiences' },
  { title: 'Travel map & nearby places', description: 'Find map and nearby-place resources for exploring a destination.', category: 'Discover', icon: MapPinned, href: '/explore/travel-map', label: 'Explore map' },
  { title: 'Trip planner', description: 'Organize destinations and important details for your upcoming journey.', category: 'Plan a trip', icon: MapPinned, href: '/explore/planner', label: 'Open planner' },
  { title: 'Itinerary builder', description: 'Structure your journey into a day-by-day itinerary and route.', category: 'Plan a trip', icon: CalendarDays, href: '/explore/itinerary-builder', label: 'Build itinerary' },
  { title: 'Trip builder', description: 'Explore trip-building workflows and planning templates.', category: 'Plan a trip', icon: Backpack, href: '/explore/trip-builder', label: 'Build a trip' },
  { title: 'Trip checklist & packing', description: 'Prepare a departure checklist and find packing resources for your trip.', category: 'Plan a trip', icon: CheckSquare, href: '/explore/planner', label: 'Prepare a trip' },
  { title: 'Trip budget & expenses', description: 'Find planning resources for trip costs, budgeting, and shared expenses.', category: 'Plan a trip', icon: Wallet, href: '/explore/itinerary-builder', label: 'Plan trip costs' },
  { title: 'Travel booking & deals', description: 'Explore travel booking resources and available deal sections.', category: 'Travel tools', icon: Plane, href: '/explore/book-travel', label: 'Explore booking' },
  { title: 'Flight and transport resources', description: 'Find flight-related and transport planning resources.', category: 'Travel tools', icon: Map, href: '/explore/flights-visa', label: 'Explore transport' },
  { title: 'Accommodation finder', description: 'Explore accommodation and stay-discovery resources.', category: 'Travel tools', icon: Building2, href: '/explore/hotel-finder', label: 'Find stays' },
  { title: 'Visa & entry requirements', description: 'Find visa and entry information. Confirm current rules with the official government or embassy source before travel.', category: 'Travel tools', icon: Landmark, href: '/explore/visa', label: 'Explore visa resources' },
  { title: 'Currency, budget & tax tools', description: 'Explore money-planning and tax/compliance resources. Estimates are not professional financial or legal advice.', category: 'Travel tools', icon: Wallet, href: '/explore/tax-calculator', label: 'Open money tools' },
  { title: 'Weather & local conditions', description: 'Find travel support and weather-related resources; live forecasts depend on connected providers.', category: 'Travel tools', icon: CloudSun, href: '/support-utility', label: 'Explore utilities' },
  { title: 'Travel support & utilities', description: 'Open the existing Seenomad utility area for practical travel support resources.', category: 'Travel tools', icon: Wrench, href: '/support-utility', label: 'Open utilities' },
  { title: 'Connectivity & eSIM resources', description: 'Prepare for mobile data, Wi-Fi, and staying connected while travelling.', category: 'Travel tools', icon: Wifi, href: '/support-utility', label: 'View connectivity resources' },
  { title: 'Travel AI studio', description: 'Explore AI-assisted travel features available in Seenomad.', category: 'Travel tools', icon: Sparkles, href: '/explore/ai-studio', label: 'Open AI studio' },
  { title: 'Safety & insurance resources', description: 'Find travel safety and insurance resources; check official advisories and policy terms.', category: 'Resources', icon: ShieldCheck, href: '/support-utility', label: 'View safety resources' },
  { title: 'Travel knowledge library', description: 'Browse destination knowledge, cultural etiquette, travel FAQs, and practical guidance.', category: 'Resources', icon: BookOpen, href: '/content-media', label: 'Explore knowledge' },
  { title: 'Accessibility resources', description: 'Find information to help research mobility, accessibility, and individual destination needs.', category: 'Resources', icon: Heart, href: '/support-utility', label: 'Explore resources' },
  { title: 'Responsible & sustainable travel', description: 'Explore resources for responsible tourism, local communities, and lower-impact travel.', category: 'Resources', icon: Globe2, href: '/content-media', label: 'Learn more' },
  { title: 'Learning & voluntourism', description: 'Explore educational travel, learning opportunities, and voluntourism resources.', category: 'Resources', icon: Backpack, href: '/learning-voluntourism', label: 'Explore opportunities' },
  { title: 'Travel communities', description: 'Find travel communities, ask questions, and connect with people who share your interests.', category: 'Communities', icon: Users, href: '/community', label: 'Join community' },
  { title: 'Reviews & traveller tips', description: 'Explore review and recommendation resources to inform your decisions.', category: 'Communities', icon: Heart, href: '/explore/reviews', label: 'Explore reviews' },
  { title: 'Creator studio', description: 'Explore tools for creating and managing travel content.', category: 'For professionals', icon: Camera, href: '/creator-studio', label: 'Open creator studio' },
  { title: 'Tourism businesses & partners', description: 'Explore partnership resources for hotels, tour operators, guides, and tourism providers.', category: 'For professionals', icon: Building2, href: '/business-partner', label: 'Explore partnerships' },
  { title: 'Travel media & publishing', description: 'Explore content, publishing, and media resources for the travel ecosystem.', category: 'For professionals', icon: BookOpen, href: '/content-media', label: 'Explore media' },
  { title: 'Tourism insights & analytics', description: 'Explore travel and tourism insight features available on the platform.', category: 'For professionals', icon: BriefcaseBusiness, href: '/insights-analytics', label: 'View insights' },
  { title: 'Travel business resources', description: 'Find business-oriented tools, partner information, and resources for travel professionals.', category: 'For professionals', icon: Building2, href: '/business-partner', label: 'Explore business tools' }
];

const QUICK_TOOLS = [
  { title: 'Build an itinerary', detail: 'Plan day by day', icon: CalendarDays, href: '/explore/itinerary-builder' },
  { title: 'Trip budget resources', detail: 'Organize trip costs', icon: Wallet, href: '/explore/planner' },
  { title: 'Visa & entry guidance', detail: 'Check official requirements', icon: Landmark, href: '/explore/visa' },
  { title: 'Weather & utilities', detail: 'Travel support resources', icon: CloudSun, href: '/support-utility' },
  { title: 'Maps & destinations', detail: 'Discover places to visit', icon: Map, href: '/explore/destinations' },
  { title: 'Community & stories', detail: 'Get ideas from travellers', icon: Users, href: '/' }
];

function HubCard({ item }) {
  const Icon = item.icon;
  return (
    <article className="travel-hub-card">
      <div className="travel-hub-card-icon"><Icon size={21} aria-hidden="true" /></div>
      <div className="travel-hub-card-copy">
        <p className="travel-hub-card-category">{item.category}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <Link className="travel-hub-card-link" to={item.href}>{item.label} <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

export default function TravelHub() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return HUB_ITEMS.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const searchableText = [item.title, item.description, item.category].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [query, category]);

  return (
    <main className="travel-hub-page">
      <section className="travel-hub-hero">
        <div className="travel-hub-hero-glow" aria-hidden="true" />
        <div className="travel-hub-eyebrow"><Compass size={15} /> THE CONNECTED TRAVEL PLATFORM</div>
        <h1>Your world of travel,<br /><span>all in one place.</span></h1>
        <p className="travel-hub-hero-copy">Discover destinations, plan journeys, find practical resources, and connect with people who love exploring the world.</p>
        <div className="travel-hub-hero-actions">
          <Link to="/explore/destinations" className="travel-hub-primary-action">Explore destinations <ArrowRight size={17} /></Link>
          <Link to="/" className="travel-hub-secondary-action">Visit travel feed</Link>
        </div>
        <div className="travel-hub-pill-row" aria-label="Seenomad platform areas">
          <span><Users size={14} /> Social community</span>
          <span><Map size={14} /> Trip planning</span>
          <span><Wrench size={14} /> Travel resources</span>
        </div>
      </section>

      <section className="travel-hub-section travel-hub-quick-section">
        <div className="travel-hub-section-heading">
          <div><p className="travel-hub-overline">START HERE</p><h2>Useful travel shortcuts</h2></div>
          <p>Get to the right resource faster.</p>
        </div>
        <div className="travel-hub-quick-grid">
          {QUICK_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return <Link to={tool.href} className="travel-hub-quick-tool" key={tool.title}>
              <span className="travel-hub-quick-icon"><Icon size={19} /></span>
              <span className="travel-hub-quick-text"><strong>{tool.title}</strong><small>{tool.detail}</small></span>
              <ArrowRight className="travel-hub-quick-arrow" size={16} />
            </Link>;
          })}
        </div>
        <p className="travel-hub-note">These shortcuts open the corresponding Seenomad sections. Some resources may depend on the availability of their underlying feature or external data provider.</p>
      </section>

      <section className="travel-hub-section" id="travel-hub-directory">
        <div className="travel-hub-section-heading">
          <div><p className="travel-hub-overline">EXPLORE THE PLATFORM</p><h2>Everything for your journey</h2></div>
          <p>Travel discovery, planning, community, and professional resources.</p>
        </div>
        <label className="travel-hub-search">
          <Search size={19} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search destinations, tools, community…" aria-label="Search travel hub resources" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">Clear</button>}
        </label>
        <div className="travel-hub-filters" aria-label="Filter resources by category">
          {CATEGORIES.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={category === item ? 'active' : ''} aria-pressed={category === item}>{item}</button>)}
        </div>
        <div className="travel-hub-card-grid">
          {filteredItems.map((item) => <HubCard key={item.title} item={item} />)}
        </div>
        {filteredItems.length === 0 && <div className="travel-hub-empty"><Search size={25} /><h3>No matching resources</h3><p>Try a different search term or select another category.</p><button type="button" onClick={() => { setQuery(''); setCategory('All'); }}>Reset filters</button></div>}
      </section>

      <section className="travel-hub-business-banner">
        <div className="travel-hub-business-icon"><Building2 size={25} /></div>
        <div><p className="travel-hub-overline">FOR THE TRAVEL INDUSTRY</p><h2>Build with the Seenomad community.</h2><p>Travel creators, local guides, tour operators, and tourism businesses can explore ways to participate in the ecosystem.</p></div>
        <Link to="/business-partner" className="travel-hub-secondary-action">Explore partnerships <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}
