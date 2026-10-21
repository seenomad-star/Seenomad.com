import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Backpack, BookOpen, Building2, CalendarDays, Camera,
  CheckSquare, Compass, Globe2, Heart, Map, MapPinned, MessageCircle,
  Plane, Search, ShieldCheck, Sparkles, Users, Wallet, Wifi, Wrench,
  CloudSun, Landmark, BriefcaseBusiness, Bookmark
} from 'lucide-react';
import './TravelHub.css';

const CATEGORIES = ['All', 'Discover', 'Plan a trip', 'Travel tools', 'Community', 'For professionals'];

const HUB_ITEMS = [
  { title: 'Explore destinations', description: 'Browse places, destination guides, and ideas for your next journey.', category: 'Discover', icon: Compass, href: '/explore/destinations', label: 'Explore places' },
  { title: 'Compare destinations', description: 'Shortlist places and compare options before you decide where to go.', category: 'Discover', icon: Globe2, href: '/explore/compare-destinations', label: 'Compare places' },
  { title: 'Travel inspiration & stories', description: 'Discover travel posts and stories shared by the community.', category: 'Community', icon: Camera, href: '/', label: 'Open social feed' },
  { title: 'Travel community', description: 'Connect with travellers, ask questions, and find people with similar interests.', category: 'Community', icon: Users, href: '/community', label: 'Join community' },
  { title: 'Messages', description: 'Continue travel conversations and coordinate with other members.', category: 'Community', icon: MessageCircle, href: '/messages', label: 'Open messages' },
  { title: 'Plan an itinerary', description: 'Start organizing a trip with a structured itinerary workflow.', category: 'Plan a trip', icon: CalendarDays, href: '/explore/itinerary-builder', label: 'Build itinerary' },
  { title: 'Trip planner', description: 'Explore planning tools and organize the details of your journey.', category: 'Plan a trip', icon: MapPinned, href: '/explore/planner', label: 'Open planner' },
  { title: 'Saved places', description: 'Return to destinations and travel items you have saved.', category: 'Plan a trip', icon: Bookmark, href: '/saved', label: 'View saved items' },
  { title: 'Visa & entry resources', description: 'Find visa-related resources and country entry information. Always verify requirements with official authorities.', category: 'Travel tools', icon: Landmark, href: '/explore/visa', label: 'Explore visa resources' },
  { title: 'Travel support & utilities', description: 'Find travel support resources and practical utilities in one place.', category: 'Travel tools', icon: Wrench, href: '/support-utility', label: 'Open utilities' },
  { title: 'AI travel studio', description: 'Explore AI-assisted travel experiences available in Seenomad.', category: 'Travel tools', icon: Sparkles, href: '/explore/ai-studio', label: 'Open AI studio' },
  { title: 'Travel safety resources', description: 'Review available safety and protection resources before travelling.', category: 'Travel tools', icon: ShieldCheck, href: '/support-utility', label: 'View resources' },
  { title: 'Creator studio', description: 'Explore tools for creating and managing travel content.', category: 'For professionals', icon: Camera, href: '/creator-studio', label: 'Open creator studio' },
  { title: 'Tourism business partners', description: 'Explore partnership opportunities for travel and tourism providers.', category: 'For professionals', icon: Building2, href: '/business-partner', label: 'Explore partnerships' },
  { title: 'Travel media', description: 'Explore content and media resources for the travel ecosystem.', category: 'For professionals', icon: BookOpen, href: '/content-media', label: 'Explore media' },
  { title: 'Events & festivals', description: 'Discover event and festival resources for trip inspiration.', category: 'Discover', icon: Heart, href: '/event-festival', label: 'Explore events' },
  { title: 'Learning & voluntourism', description: 'Explore learning-oriented travel and voluntourism resources.', category: 'Discover', icon: Backpack, href: '/learning-voluntourism', label: 'Explore opportunities' },
  { title: 'Tourism insights', description: 'Explore travel and tourism insight features available on the platform.', category: 'For professionals', icon: BriefcaseBusiness, href: '/insights-analytics', label: 'View insights' }
];

const QUICK_TOOLS = [
  { title: 'Trip checklist', detail: 'Prepare before departure', icon: CheckSquare, href: '/explore/planner' },
  { title: 'Trip budget & planning', detail: 'Organize trip details', icon: Wallet, href: '/explore/itinerary-builder' },
  { title: 'Weather & local conditions', detail: 'Find planning resources', icon: CloudSun, href: '/support-utility' },
  { title: 'Connectivity resources', detail: 'Prepare for getting online', icon: Wifi, href: '/support-utility' },
  { title: 'Transport & maps', detail: 'Explore destinations and routes', icon: Map, href: '/explore/destinations' },
  { title: 'Travel documentation', detail: 'Find visa and entry resources', icon: Plane, href: '/explore/visa' }
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
