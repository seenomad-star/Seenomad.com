import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Compass, Globe, Clock, DollarSign, Wifi,
    ShieldCheck, Plus, Check, Search, Layers, ChevronDown,
    ChevronUp, BookmarkPlus, ArrowRight, Users, Plane, Bed, X
} from 'lucide-react';

// 10 Comprehensive Pre-Set Expedition Itinerary Templates
export const ITINERARY_TEMPLATES_LIBRARY = [
    {
        id: 'japan-fiber-sprint',
        name: 'Tokyo & Kyoto Fiber Sprint',
        subtitle: 'High-Speed Shinkansen & Machiya Workspaces',
        routeSummary: 'Tokyo (14d) → Hakone (2d) → Kyoto (14d)',
        flag: '🇯🇵',
        region: 'Asia',
        style: 'Deep Workcation',
        durationDays: 30,
        budgetLimit: 4800,
        estimatedCost: 4464,
        avgWifiMbps: 340,
        timezone: 'UTC+9 (JST)',
        visaBadge: '90d Visa-Free / 6m J-Skip',
        travelers: 1,
        passport: 'United States (US)',
        highlights: ['1Gbps Tokyo Coliving', '14-Day JR Bullet Train', 'Kyoto Townhouse Studio', 'Hakone Onsen Reset'],
        itemIds: [
            { id: 'tr-1', qty: 1 },
            { id: 'co-1', qty: 1 },
            { id: 'tr-2', qty: 1 },
            { id: 'co-2', qty: 1 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'ac-2', qty: 1 }
        ]
    },
    {
        id: 'portugal-atlantic-base',
        name: 'Lisbon & Madeira Atlantic Base',
        subtitle: 'Coastal Coliving, Surf & Schengen D8 Prep',
        routeSummary: 'Lisbon Chiado (30d) → Ponta do Sol, Madeira (15d)',
        flag: '🇵🇹',
        region: 'Europe',
        style: 'Founder Retreat',
        durationDays: 45,
        budgetLimit: 4500,
        estimatedCost: 4035,
        avgWifiMbps: 365,
        timezone: 'UTC+1 (WEST)',
        visaBadge: 'Schengen 90/180d + D8 Ready',
        travelers: 1,
        passport: 'United Kingdom (UK)',
        highlights: ['TAP Stopover Flight', 'Outsite Cais do Sodré', 'Second Home Lisboa', 'Madeira Nomad Village'],
        itemIds: [
            { id: 'tr-3', qty: 1 },
            { id: 'co-3', qty: 1 },
            { id: 'cw-2', qty: 1 },
            { id: 'co-4', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'in-3', qty: 1 },
            { id: 'ac-3', qty: 1 }
        ]
    },
    {
        id: 'bali-sea-corridor',
        name: 'Bali & SEA Tropical Corridor',
        subtitle: 'Tropical Pool Villa, Dual-Fiber & Biohacking Loop',
        routeSummary: 'Singapore (3d) → Canggu (30d) → Ubud (27d)',
        flag: '🇮🇩',
        region: 'Asia',
        style: 'Budget & Wellness',
        durationDays: 60,
        budgetLimit: 4200,
        estimatedCost: 3325,
        avgWifiMbps: 245,
        timezone: 'UTC+8 (WITA)',
        visaBadge: '60d e-VOA / E33G Remote KITAS',
        travelers: 2,
        passport: 'European Union (EU)',
        highlights: ['SEA Multi-City Hopper', 'Canggu Pool Coliving (60d)', 'Genki Zero-Deductible', 'Ubud Sound & Ice Recovery'],
        itemIds: [
            { id: 'tr-5', qty: 1 },
            { id: 'tr-6', qty: 1 },
            { id: 'co-5', qty: 2 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-2', qty: 1 },
            { id: 'in-4', qty: 2 },
            { id: 'ac-4', qty: 1 }
        ]
    },
    {
        id: 'americas-timezone-loop',
        name: 'Medellín & Americas EST Loop',
        subtitle: 'Zero-Jetlag US/Canada Hours & Eternal Spring Base',
        routeSummary: 'El Poblado, Medellín (30d) → Coffee Triangle (15d)',
        flag: '🇨🇴',
        region: 'Americas',
        style: 'Deep Workcation',
        durationDays: 45,
        budgetLimit: 3800,
        estimatedCost: 1904,
        avgWifiMbps: 335,
        timezone: 'UTC-5 (EST Match)',
        visaBadge: '90d Stamp / 2-Yr Colombia V-Visa',
        travelers: 1,
        passport: 'Canada (CA)',
        highlights: ['Provenza Green Loft', 'WeWork Global 24/7 Pass', 'Starlink Mini Backup', 'Local Guardian Arrival VIP'],
        itemIds: [
            { id: 'co-6', qty: 1 },
            { id: 'cw-1', qty: 1 },
            { id: 'cw-4', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'in-2', qty: 1 },
            { id: 'ac-1', qty: 1 }
        ]
    },
    {
        id: 'euro-rail-grand-circuit',
        name: 'European High-Speed Rail Odyssey',
        subtitle: 'First-Class Eurail & Biophilic Coworking Circuit',
        routeSummary: 'Lisbon (15d) → Madrid & Barcelona (15d) → Alpine Rail (15d)',
        flag: '🇪🇺',
        region: 'Europe',
        style: 'Rail & Island Circuit',
        durationDays: 45,
        budgetLimit: 5200,
        estimatedCost: 3449,
        avgWifiMbps: 345,
        timezone: 'UTC+1 / UTC+2 (CET)',
        visaBadge: 'Schengen 45/90d Compliant',
        travelers: 1,
        passport: 'United States (US)',
        highlights: ['1st Class Eurail Pass', 'Outsite Lisbon Base', 'WeWork All-Access Europe', 'Starlink Roam + SafetyWing'],
        itemIds: [
            { id: 'tr-3', qty: 1 },
            { id: 'tr-4', qty: 1 },
            { id: 'co-3', qty: 1 },
            { id: 'cw-1', qty: 1 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-1', qty: 1 }
        ]
    },
    {
        id: 'nomad-residency-relocation',
        name: 'Sovereign Residency & DNV Launchpad',
        subtitle: 'Full Consular Legalization, Apostille & 60-Day Soft Landing',
        routeSummary: 'Lisbon Chancery Filing (30d) → Madeira Tax Hub (30d)',
        flag: '🛡️',
        region: 'Europe',
        style: 'Visa & Relocation',
        durationDays: 60,
        budgetLimit: 5600,
        estimatedCost: 4254,
        avgWifiMbps: 350,
        timezone: 'UTC+1 (WEST)',
        visaBadge: '1–5 Yr Nomad Permit Track',
        travelers: 1,
        passport: 'United States (US)',
        highlights: ['Hague Apostille Kit', 'Consular Dossier Audit', '60d Verified Lease Proof', 'VIP Local Fixer Orientation'],
        itemIds: [
            { id: 'tr-3', qty: 1 },
            { id: 'co-3', qty: 1 },
            { id: 'co-4', qty: 1 },
            { id: 'in-2', qty: 1 },
            { id: 'in-3', qty: 1 },
            { id: 'in-4', qty: 2 },
            { id: 'ac-1', qty: 1 }
        ]
    },
    {
        id: 'lean-backpacker-asia',
        name: 'Lean Asia Indie Hacker Sprint',
        subtitle: 'High-Output Solo Build Under $2,000 Total Spend',
        routeSummary: 'Bali Canggu Base (30d) + Regional Hop',
        flag: '⚡',
        region: 'Asia',
        style: 'Budget & Wellness',
        durationDays: 30,
        budgetLimit: 2200,
        estimatedCost: 1810,
        avgWifiMbps: 220,
        timezone: 'UTC+8 (SGT/WITA)',
        visaBadge: '30d Instant e-VOA + Onward PNR',
        travelers: 1,
        passport: 'Australia (AU)',
        highlights: ['Verifiable Onward PNR', '30d Tropical Coliving', 'Unlimited 5G eSIM', 'SafetyWing + Ubud Recovery'],
        itemIds: [
            { id: 'tr-5', qty: 1 },
            { id: 'tr-6', qty: 1 },
            { id: 'co-5', qty: 1 },
            { id: 'cw-3', qty: 1 },
            { id: 'in-1', qty: 1 },
            { id: 'ac-4', qty: 1 }
        ]
    },
    {
        id: 'founder-duo-offsite',
        name: 'Co-Founder Product Offsite (2-Person Split)',
        subtitle: 'Dual-Suite Executive Sprint with Satellite Failover',
        routeSummary: 'Tokyo Shinjuku (14d) → Kyoto Machiya (14d)',
        flag: '🚀',
        region: 'Asia',
        style: 'Founder Retreat',
        durationDays: 28,
        budgetLimit: 6800,
        estimatedCost: 5988,
        avgWifiMbps: 390,
        timezone: 'UTC+9 (JST)',
        visaBadge: '90d Visa-Free Business/Tourist',
        travelers: 2,
        passport: 'United States (US)',
        highlights: ['2x Return Flights', 'Shinjuku + Kyoto Suites', 'WeWork + Starlink Redundancy', 'Hakone Founder Retreat'],
        itemIds: [
            { id: 'tr-1', qty: 2 },
            { id: 'co-1', qty: 1 },
            { id: 'co-2', qty: 1 },
            { id: 'cw-1', qty: 2 },
            { id: 'cw-4', qty: 1 },
            { id: 'in-4', qty: 2 },
            { id: 'ac-2', qty: 2 }
        ]
    }
];

const ItineraryTemplatesLibrary = ({
    templates = ITINERARY_TEMPLATES_LIBRARY,
    activeTemplateId,
    onLoadTemplate,
    onAppendTemplate,
    onSaveCurrentAsTemplate,
    currentItemsCount = 0
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');
    const [styleFilter, setStyleFilter] = useState('All');

    const regions = ['All', 'Asia', 'Europe', 'Americas'];
    const styles = ['All', 'Deep Workcation', 'Founder Retreat', 'Budget & Wellness', 'Rail & Island Circuit', 'Visa & Relocation'];

    const filteredTemplates = useMemo(() => {
        return templates.filter((tpl) => {
            if (regionFilter !== 'All' && tpl.region !== regionFilter) return false;
            if (styleFilter !== 'All' && tpl.style !== styleFilter) return false;
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const hay = `${tpl.name} ${tpl.subtitle} ${tpl.routeSummary} ${tpl.region} ${tpl.style} ${tpl.visaBadge} ${(tpl.highlights || []).join(' ')}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [templates, regionFilter, styleFilter, searchQuery]);

    return (
        <section className="tb-templates-library" aria-label="Pre-Set Itinerary Templates Library">
            {/* Library Header Bar */}
            <div className="tb-lib-header">
                <div className="tb-lib-title-group">
                    <div className="tb-lib-icon-badge">
                        <Layers size={18} />
                    </div>
                    <div>
                        <div className="tb-lib-title-row">
                            <h2>Pre-Set Itinerary Templates Library</h2>
                            <span className="tb-lib-count-pill">{templates.length} Verified Starting Blueprints</span>
                        </div>
                        <p>
                            Select a pre-engineered nomad expedition to populate your timeline, budget cap, and consular parameters, or append modules to your current build.
                        </p>
                    </div>
                </div>

                <div className="tb-lib-header-actions">
                    {currentItemsCount > 0 && onSaveCurrentAsTemplate && (
                        <button
                            type="button"
                            className="tb-lib-save-btn"
                            onClick={onSaveCurrentAsTemplate}
                            title="Save your current timeline as a reusable template in this library"
                        >
                            <BookmarkPlus size={14} />
                            <span>Save Current Trip as Template</span>
                        </button>
                    )}
                    <button
                        type="button"
                        className="tb-lib-collapse-btn"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                    >
                        <span>{isExpanded ? 'Hide Template Library' : `Browse Templates (${templates.length})`}</span>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        className="tb-lib-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Search, Region & Style Filter Bar */}
                        <div className="tb-lib-controls">
                            <div className="tb-lib-search">
                                <Search size={14} className="tb-lib-search-icon" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search templates by city, route, visa track, or style..."
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        className="tb-lib-search-clear"
                                        onClick={() => setSearchQuery('')}
                                        aria-label="Clear template search"
                                    >
                                        <X size={13} />
                                    </button>
                                )}
                            </div>

                            <div className="tb-lib-filter-group">
                                <span className="tb-lib-filter-lbl">REGION:</span>
                                {regions.map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        className={`tb-lib-chip ${regionFilter === r ? 'active' : ''}`}
                                        onClick={() => setRegionFilter(r)}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>

                            <div className="tb-lib-filter-group">
                                <span className="tb-lib-filter-lbl">STYLE:</span>
                                {styles.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        className={`tb-lib-chip ${styleFilter === s ? 'active' : ''}`}
                                        onClick={() => setStyleFilter(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Templates Grid */}
                        <div className="tb-lib-grid">
                            {filteredTemplates.map((tpl) => {
                                const isActive = activeTemplateId === tpl.id;
                                const dailyAvg = Math.round((tpl.estimatedCost || tpl.budgetLimit) / Math.max(1, tpl.durationDays));

                                return (
                                    <article
                                        key={tpl.id}
                                        className={`tb-tpl-card ${isActive ? 'is-active' : ''}`}
                                    >
                                        <div className="tb-tpl-top">
                                            <div className="tb-tpl-badges">
                                                <span className="tb-tpl-region-pill">
                                                    {tpl.flag} {tpl.region}
                                                </span>
                                                <span className="tb-tpl-style-pill">{tpl.style}</span>
                                            </div>
                                            {isActive && (
                                                <span className="tb-tpl-loaded-badge">
                                                    <Check size={11} /> Active Blueprint
                                                </span>
                                            )}
                                        </div>

                                        <div className="tb-tpl-MainInfo">
                                            <h3>{tpl.name}</h3>
                                            <p className="tb-tpl-route">{tpl.routeSummary}</p>
                                        </div>

                                        {/* Key Telemetry Metrics */}
                                        <div className="tb-tpl-metrics">
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">DURATION</span>
                                                <strong className="m-val">{tpl.durationDays} Days</strong>
                                            </div>
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">EST. COST</span>
                                                <strong className="m-val text-emerald">
                                                    ${(tpl.estimatedCost || tpl.budgetLimit).toLocaleString()}
                                                </strong>
                                            </div>
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">DAILY BURN</span>
                                                <strong className="m-val">${dailyAvg}/d</strong>
                                            </div>
                                            <div className="tb-tpl-metric">
                                                <span className="m-lbl">FIBER AVG</span>
                                                <strong className="m-val text-sky">{tpl.avgWifiMbps} Mbps</strong>
                                            </div>
                                        </div>

                                        {/* Visa & Timezone Strip */}
                                        <div className="tb-tpl-visa-row">
                                            <span className="tb-tpl-visa-tag">
                                                <ShieldCheck size={12} /> {tpl.visaBadge}
                                            </span>
                                            <span className="tb-tpl-tz-tag">
                                                <Clock size={11} /> {tpl.timezone}
                                            </span>
                                        </div>

                                        {/* Included Highlights */}
                                        <div className="tb-tpl-highlights">
                                            {(tpl.highlights || []).map((h, i) => (
                                                <span key={i} className="tb-tpl-hl-chip">
                                                    • {h}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Card Footer Actions */}
                                        <div className="tb-tpl-actions">
                                            <button
                                                type="button"
                                                className={`tb-tpl-load-btn ${isActive ? 'loaded' : ''}`}
                                                onClick={() => onLoadTemplate(tpl)}
                                            >
                                                {isActive ? <Check size={14} /> : <Sparkles size={14} />}
                                                <span>
                                                    {isActive
                                                        ? 'Reload Starting Point'
                                                        : `Load Template (${tpl.itemIds.length} Modules)`}
                                                </span>
                                            </button>
                                            {onAppendTemplate && (
                                                <button
                                                    type="button"
                                                    className="tb-tpl-append-btn"
                                                    onClick={() => onAppendTemplate(tpl)}
                                                    title="Append this template's modules onto your current timeline without erasing existing items"
                                                >
                                                    <Plus size={14} />
                                                    <span>Append</span>
                                                </button>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ItineraryTemplatesLibrary;
