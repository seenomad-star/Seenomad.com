import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Map, Calendar, Plus, Trash2, ArrowRight, Plane, Train, 
    Wifi, DollarSign, Clock, ShieldCheck, Sparkles, Check, 
    Share2, Download, Layers, Globe, Compass, ChevronDown, 
    ChevronUp, AlertTriangle, Building2, Coffee, Copy, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SeeNomadMultiPart.css';

// Curated Expedition Templates
const EXPEDITION_TEMPLATES = [
    {
        id: 'iberian-med',
        title: 'Iberian & Mediterranean Circuit',
        tagline: 'Sun-drenched European digital nomad corridor with seamless rail and fiber hubs.',
        totalDays: 135,
        totalCostEst: '$9,200',
        parts: [
            {
                id: 'part-1',
                partNumber: 1,
                destination: 'Lisbon, Portugal',
                country: 'Portugal',
                flag: '🇵🇹',
                dates: 'May 1 – Jun 15',
                durationDays: 45,
                focus: 'Deep Product Sprint',
                budgetMonthly: '$2,300',
                internetSpeed: '280 Mbps',
                timezone: 'UTC+1 (WEST)',
                workOverlap: '5 hrs EST / 8 hrs GMT',
                visaType: 'Schengen 90d (45d used)',
                visaStatus: 'valid',
                coworking: 'Second Home Chiado',
                accommodation: 'Furnished Flat in Príncipe Real',
                nextTransit: {
                    type: 'flight',
                    route: 'LIS → BCN (2h 00m)',
                    note: 'Direct hop via TAP Air Portugal'
                }
            },
            {
                id: 'part-2',
                partNumber: 2,
                destination: 'Barcelona, Spain',
                country: 'Spain',
                flag: '🇪🇸',
                dates: 'Jun 16 – Jul 15',
                durationDays: 30,
                focus: 'Tech Networking & Beach',
                budgetMonthly: '$2,600',
                internetSpeed: '320 Mbps',
                timezone: 'UTC+2 (CEST)',
                workOverlap: '4 hrs EST / 8 hrs CET',
                visaType: 'Schengen 90d (75d total used)',
                visaStatus: 'valid',
                coworking: 'Betahaus Barcelona',
                accommodation: 'Coliving Studio in Gràcia',
                nextTransit: {
                    type: 'flight',
                    route: 'BCN → ATH (2h 45m)',
                    note: 'Vueling direct flight'
                }
            },
            {
                id: 'part-3',
                partNumber: 3,
                destination: 'Athens & Cyclades, Greece',
                country: 'Greece',
                flag: '🇬🇷',
                dates: 'Jul 16 – Aug 15',
                durationDays: 30,
                focus: 'Island Hopping & Creative Writing',
                budgetMonthly: '$1,800',
                internetSpeed: '180 Mbps',
                timezone: 'UTC+3 (EEST)',
                workOverlap: '3 hrs EST / 7 hrs CET',
                visaType: 'Schengen (Exit Schengen warning on Day 15)',
                visaStatus: 'warning',
                coworking: 'Impact Hub Athens / Starlink Island',
                accommodation: 'Seaside Suite in Koukaki',
                nextTransit: {
                    type: 'flight',
                    route: 'ATH → SPU (1h 55m)',
                    note: 'Aegean Airlines transfer'
                }
            },
            {
                id: 'part-4',
                partNumber: 4,
                destination: 'Split & Hvar, Croatia',
                country: 'Croatia',
                flag: '🇭🇷',
                dates: 'Aug 16 – Sep 15',
                durationDays: 30,
                focus: 'Coastal Coliving & Masterminds',
                budgetMonthly: '$1,950',
                internetSpeed: '220 Mbps',
                timezone: 'UTC+2 (CEST)',
                workOverlap: '4 hrs EST / 8 hrs CET',
                visaType: 'Croatian Digital Nomad Visa (Non-Schengen counting)',
                visaStatus: 'valid',
                coworking: 'Saltwater Workspace Split',
                accommodation: 'Diocletian Quarter Loft',
                nextTransit: null
            }
        ]
    },
    {
        id: 'sea-loop',
        title: 'Southeast Asia Golden Loop',
        tagline: 'Ultra high-speed fiber, affordable luxury villas, and peerless nomad community.',
        totalDays: 120,
        totalCostEst: '$4,800',
        parts: [
            {
                id: 'part-1',
                partNumber: 1,
                destination: 'Chiang Mai, Thailand',
                country: 'Thailand',
                flag: '🇹🇭',
                dates: 'Oct 1 – Nov 15',
                durationDays: 45,
                focus: 'Cost Optimization & Coding',
                budgetMonthly: '$950',
                internetSpeed: '300 Mbps',
                timezone: 'UTC+7 (ICT)',
                workOverlap: '4 hrs CET / Asian Core Hours',
                visaType: 'Destination Thailand Visa (DTV 180d)',
                visaStatus: 'valid',
                coworking: 'Yellow Coworking Nimman',
                accommodation: 'Luxury High-Rise Condo in Nimman',
                nextTransit: {
                    type: 'flight',
                    route: 'CNX → DAD (3h 30m)',
                    note: 'Connecting via Bangkok (AirAsia)'
                }
            },
            {
                id: 'part-2',
                partNumber: 2,
                destination: 'Da Nang & Hoi An, Vietnam',
                country: 'Vietnam',
                flag: '🇻🇳',
                dates: 'Nov 16 – Dec 15',
                durationDays: 30,
                focus: 'Beachfront Focus & Seafood',
                budgetMonthly: '$1,100',
                internetSpeed: '210 Mbps',
                timezone: 'UTC+7 (ICT)',
                workOverlap: '4 hrs CET / Asian Core Hours',
                visaType: 'Vietnam E-Visa (90d multiple entry)',
                visaStatus: 'valid',
                coworking: 'Enouvo Space An Thuong',
                accommodation: 'Modern Beachfront Studio (My Khe)',
                nextTransit: {
                    type: 'flight',
                    route: 'DAD → DPS (4h 45m)',
                    note: 'Direct seasonal charter or SIN connection'
                }
            },
            {
                id: 'part-3',
                partNumber: 3,
                destination: 'Bali (Canggu & Ubud), Indonesia',
                country: 'Indonesia',
                flag: '🇮🇩',
                dates: 'Dec 16 – Jan 31',
                durationDays: 45,
                focus: 'Wellness, Masterminds & Surfing',
                budgetMonthly: '$1,400',
                internetSpeed: '190 Mbps',
                timezone: 'UTC+8 (WITA)',
                workOverlap: '3 hrs CET / Australian Prime Hours',
                visaType: 'B211A 60d Nomad Visit Visa',
                visaStatus: 'valid',
                coworking: 'BWork Bali / Outpost Ubud',
                accommodation: 'Private Villa in Pererenan',
                nextTransit: null
            }
        ]
    }
];

const SeeNomadMultiPart = () => {
    const navigate = useNavigate();
    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
    const [currentExpedition, setCurrentExpedition] = useState(EXPEDITION_TEMPLATES[0]);
    const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'budget' | 'visa' | 'timezone'
    const [expandedPartId, setExpandedPartId] = useState('part-1');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [shareNotification, setShareNotification] = useState(false);

    // Form state for creating a new part
    const [newCity, setNewCity] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newDuration, setNewDuration] = useState(30);
    const [newFocus, setNewFocus] = useState('Remote Work & Exploration');
    const [newBudget, setNewBudget] = useState(1500);

    const handleSelectTemplate = (index) => {
        setSelectedTemplateIndex(index);
        setCurrentExpedition(EXPEDITION_TEMPLATES[index]);
        if (EXPEDITION_TEMPLATES[index].parts.length > 0) {
            setExpandedPartId(EXPEDITION_TEMPLATES[index].parts[0].id);
        }
    };

    const handleAddPart = (e) => {
        e.preventDefault();
        if (!newCity) return;

        const nextPartNumber = currentExpedition.parts.length + 1;
        const newPart = {
            id: `part-${Date.now()}`,
            partNumber: nextPartNumber,
            destination: `${newCity}${newCountry ? `, ${newCountry}` : ''}`,
            country: newCountry || 'Global Hub',
            flag: '🌍',
            dates: `Leg ${nextPartNumber}`,
            durationDays: parseInt(newDuration, 10) || 30,
            focus: newFocus,
            budgetMonthly: `$${parseInt(newBudget, 10).toLocaleString()}`,
            internetSpeed: '220 Mbps',
            timezone: 'UTC+0',
            workOverlap: '5 hrs team overlap',
            visaType: 'Nomad Visa / Visa-Free',
            visaStatus: 'valid',
            coworking: 'Verified Central Hub',
            accommodation: 'Serviced Coliving Apartment',
            nextTransit: null
        };

        // If previous part exists, link transit
        const updatedParts = [...currentExpedition.parts];
        if (updatedParts.length > 0) {
            const lastIdx = updatedParts.length - 1;
            if (!updatedParts[lastIdx].nextTransit) {
                updatedParts[lastIdx].nextTransit = {
                    type: 'flight',
                    route: `${updatedParts[lastIdx].destination.split(',')[0]} → ${newCity}`,
                    note: 'Regional connection'
                };
            }
        }

        updatedParts.push(newPart);

        // Recalculate duration & cost
        const totalDays = updatedParts.reduce((acc, p) => acc + p.durationDays, 0);
        const totalBudget = updatedParts.reduce((acc, p) => {
            const b = parseInt(p.budgetMonthly.replace(/[^0-9]/g, ''), 10) || 1500;
            return acc + Math.round((b / 30) * p.durationDays);
        }, 0);

        setCurrentExpedition({
            ...currentExpedition,
            totalDays,
            totalCostEst: `$${totalBudget.toLocaleString()}`,
            parts: updatedParts
        });

        setExpandedPartId(newPart.id);
        setIsAddModalOpen(false);
        setNewCity('');
        setNewCountry('');
    };

    const handleDeletePart = (partId, e) => {
        e.stopPropagation();
        const filtered = currentExpedition.parts.filter(p => p.id !== partId);
        // Renumber parts
        const renumbered = filtered.map((p, idx) => ({ ...p, partNumber: idx + 1 }));
        const totalDays = renumbered.reduce((acc, p) => acc + p.durationDays, 0);
        const totalBudget = renumbered.reduce((acc, p) => {
            const b = parseInt(p.budgetMonthly.replace(/[^0-9]/g, ''), 10) || 1500;
            return acc + Math.round((b / 30) * p.durationDays);
        }, 0);

        setCurrentExpedition({
            ...currentExpedition,
            totalDays,
            totalCostEst: `$${totalBudget.toLocaleString()}`,
            parts: renumbered
        });
    };

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setShareNotification(true);
            setTimeout(() => setShareNotification(false), 2400);
        }
    };

    const toggleExpand = (id) => {
        setExpandedPartId(expandedPartId === id ? null : id);
    };

    // Calculate aggregated telemetry
    const totalLegs = currentExpedition.parts.length;
    const avgMonthly = Math.round(
        currentExpedition.parts.reduce((acc, p) => acc + parseInt(p.budgetMonthly.replace(/[^0-9]/g, ''), 10), 0) / (totalLegs || 1)
    );

    return (
        <div className="seenomad-multipart-page">
            {/* 1. Header Banner */}
            <div className="multipart-hero">
                <div className="hero-content-meta">
                    <div className="hero-chip">
                        <Map size={13} className="hero-chip-icon" />
                        <span>SeeNomad Multi-Part Expedition Studio</span>
                    </div>
                    <h1 className="hero-title">Orchestrate Seamless Multi-Leg Nomad Journeys</h1>
                    <p className="hero-description">
                        Design consecutive nomad legs with synchronized team timezone overlaps, real-time budget forecasting, and integrated visa compliance safeguards across continents.
                    </p>

                    {/* Quick Telemetry Bar */}
                    <div className="multipart-telemetry-hud">
                        <div className="hud-metric-cell">
                            <span className="hud-val">{currentExpedition.totalDays} Days</span>
                            <span className="hud-lbl">Expedition Span</span>
                        </div>
                        <div className="hud-divider" />
                        <div className="hud-metric-cell">
                            <span className="hud-val">{totalLegs} Parts</span>
                            <span className="hud-lbl">Consecutive Legs</span>
                        </div>
                        <div className="hud-divider" />
                        <div className="hud-metric-cell">
                            <span className="hud-val">${avgMonthly.toLocaleString()}/mo</span>
                            <span className="hud-lbl">Blended Cost Index</span>
                        </div>
                        <div className="hud-divider" />
                        <div className="hud-metric-cell">
                            <span className="hud-val">{currentExpedition.totalCostEst}</span>
                            <span className="hud-lbl">Total Estimated Budget</span>
                        </div>
                    </div>
                </div>

                <div className="hero-actions-cluster">
                    <button 
                        type="button" 
                        className="btn-add-part"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus size={16} />
                        <span>Add Journey Part</span>
                    </button>
                    <button 
                        type="button" 
                        className="btn-share-expedition"
                        onClick={handleShare}
                        title="Share expedition link"
                    >
                        {shareNotification ? <Check size={16} /> : <Share2 size={16} />}
                        <span>{shareNotification ? 'Link Copied!' : 'Share Blueprint'}</span>
                    </button>
                </div>
            </div>

            {/* 2. Curated Circuit Template Selector */}
            <div className="circuit-templates-strip">
                <span className="templates-label">Curated Nomad Circuits:</span>
                <div className="template-pills-row">
                    {EXPEDITION_TEMPLATES.map((tmpl, idx) => (
                        <button
                            key={tmpl.id}
                            type="button"
                            className={`template-pill ${selectedTemplateIndex === idx ? 'active' : ''}`}
                            onClick={() => handleSelectTemplate(idx)}
                        >
                            <Globe size={13} />
                            <span>{tmpl.title}</span>
                            <span className="template-days-badge">{tmpl.totalDays}d</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. View Switcher Tabs */}
            <div className="multipart-tabs-bar" role="tablist">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'itinerary'}
                    className={`mp-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
                    onClick={() => setActiveTab('itinerary')}
                >
                    <Layers size={15} />
                    <span>Multi-Part Itinerary ({totalLegs} Legs)</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'budget'}
                    className={`mp-tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
                    onClick={() => setActiveTab('budget')}
                >
                    <DollarSign size={15} />
                    <span>Cost Matrix & Budgeting</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'visa'}
                    className={`mp-tab-btn ${activeTab === 'visa' ? 'active' : ''}`}
                    onClick={() => setActiveTab('visa')}
                >
                    <ShieldCheck size={15} />
                    <span>Visa & Schengen Guard</span>
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'timezone'}
                    className={`mp-tab-btn ${activeTab === 'timezone' ? 'active' : ''}`}
                    onClick={() => setActiveTab('timezone')}
                >
                    <Clock size={15} />
                    <span>Timezone & Team Overlap</span>
                </button>
            </div>

            {/* 4. Tab 1: Multi-Part Itinerary Sequence */}
            {activeTab === 'itinerary' && (
                <div className="itinerary-timeline-container">
                    <div className="itinerary-parts-sequence">
                        {currentExpedition.parts.map((part, index) => {
                            const isExpanded = expandedPartId === part.id;
                            return (
                                <React.Fragment key={part.id}>
                                    <motion.div
                                        className={`part-card-card ${isExpanded ? 'is-expanded' : ''}`}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <div 
                                            className="part-card-header"
                                            onClick={() => toggleExpand(part.id)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            <div className="part-header-left">
                                                <div className="part-number-badge">
                                                    <span>Part {part.partNumber}</span>
                                                </div>
                                                <div className="part-dest-meta">
                                                    <div className="dest-title-row">
                                                        <span className="dest-flag">{part.flag}</span>
                                                        <h3 className="dest-heading">{part.destination}</h3>
                                                    </div>
                                                    <div className="dest-sub-meta">
                                                        <span className="meta-dates"><Calendar size={12} /> {part.dates} ({part.durationDays} Days)</span>
                                                        <span className="meta-sep">·</span>
                                                        <span className="meta-focus"><Sparkles size={12} /> {part.focus}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="part-header-right">
                                                <div className="part-price-badge">
                                                    <span className="price-num">{part.budgetMonthly}</span>
                                                    <span className="price-suf">/mo</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="part-delete-btn"
                                                    onClick={(e) => handleDeletePart(part.id, e)}
                                                    title="Remove leg"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <div className="expand-indicator">
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expanded Details Body */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    className="part-card-body"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="part-details-grid">
                                                        <div className="detail-stat-cell">
                                                            <div className="stat-lbl"><Wifi size={13} className="stat-icon cyan" /> Verified Speed</div>
                                                            <div className="stat-val">{part.internetSpeed}</div>
                                                            <div className="stat-desc">Fiber Hot-Desk at {part.coworking}</div>
                                                        </div>

                                                        <div className="detail-stat-cell">
                                                            <div className="stat-lbl"><Clock size={13} className="stat-icon purple" /> Timezone & Overlap</div>
                                                            <div className="stat-val">{part.timezone}</div>
                                                            <div className="stat-desc">{part.workOverlap}</div>
                                                        </div>

                                                        <div className="detail-stat-cell">
                                                            <div className="stat-lbl"><ShieldCheck size={13} className="stat-icon green" /> Visa Telemetry</div>
                                                            <div className="stat-val">{part.visaType}</div>
                                                            <div className="stat-desc">Status: Verified Remote Allowed</div>
                                                        </div>

                                                        <div className="detail-stat-cell">
                                                            <div className="stat-lbl"><Building2 size={13} className="stat-icon amber" /> Base Camp Coliving</div>
                                                            <div className="stat-val">{part.accommodation}</div>
                                                            <div className="stat-desc">Equipped with 27" 4K Monitor & Ergonomic Chair</div>
                                                        </div>
                                                    </div>

                                                    <div className="part-card-footer-bar">
                                                        <button 
                                                            type="button" 
                                                            className="btn-part-explore-city"
                                                            onClick={() => {
                                                                const slug = part.destination.split(',')[0].toLowerCase().replace(/\s+/g, '-');
                                                                navigate(`/explore/destinations/${slug}`);
                                                            }}
                                                        >
                                                            <span>Inspect {part.destination.split(',')[0]} Intelligence</span>
                                                            <ArrowRight size={13} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Transit Node Connector */}
                                    {part.nextTransit && (
                                        <div className="transit-node-row">
                                            <div className="transit-line" />
                                            <div className="transit-badge">
                                                {part.nextTransit.type === 'flight' ? <Plane size={14} className="transit-icon" /> : <Train size={14} className="transit-icon" />}
                                                <span className="transit-route">{part.nextTransit.route}</span>
                                                <span className="transit-note">({part.nextTransit.note})</span>
                                            </div>
                                            <div className="transit-line" />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Bottom Add Action */}
                    <div className="itinerary-bottom-add">
                        <button
                            type="button"
                            className="btn-bottom-add"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus size={16} />
                            <span>Append Another Expedition Leg</span>
                        </button>
                    </div>
                </div>
            )}

            {/* 5. Tab 2: Cost Matrix & Budgeting */}
            {activeTab === 'budget' && (
                <div className="budget-matrix-container">
                    <div className="matrix-overview-card">
                        <div className="matrix-hero-left">
                            <span className="matrix-label">Total Expedition Financial Requirement</span>
                            <div className="matrix-amount">
                                <span className="sym">$</span>
                                <span className="val">{currentExpedition.totalCostEst.replace('$', '')}</span>
                                <span className="period">over {currentExpedition.totalDays} Days</span>
                            </div>
                        </div>
                        <div className="matrix-hero-right">
                            <div className="matrix-pill">
                                <span>Daily Average: <strong>${Math.round(parseInt(currentExpedition.totalCostEst.replace(/[^0-9]/g, ''), 10) / (currentExpedition.totalDays || 1))} / day</strong></span>
                            </div>
                        </div>
                    </div>

                    <div className="budget-parts-table-wrap">
                        <table className="budget-parts-table">
                            <thead>
                                <tr>
                                    <th>Part / Base City</th>
                                    <th>Duration</th>
                                    <th>Monthly Rate</th>
                                    <th>Pro-rated Cost</th>
                                    <th>Coliving / Housing</th>
                                    <th>Coworking Pass</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentExpedition.parts.map((p) => {
                                    const monthlyNum = parseInt(p.budgetMonthly.replace(/[^0-9]/g, ''), 10) || 1500;
                                    const legCost = Math.round((monthlyNum / 30) * p.durationDays);
                                    const rentCost = Math.round(legCost * 0.52);
                                    const coworkCost = Math.round(legCost * 0.12);
                                    return (
                                        <tr key={p.id}>
                                            <td className="cell-city">
                                                <span className="td-flag">{p.flag}</span>
                                                <span className="td-title">{p.destination}</span>
                                            </td>
                                            <td>{p.durationDays} Days</td>
                                            <td>{p.budgetMonthly}/mo</td>
                                            <td className="cell-highlight">${legCost.toLocaleString()}</td>
                                            <td>${rentCost.toLocaleString()}</td>
                                            <td>${coworkCost.toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 6. Tab 3: Visa & Schengen Safeguards */}
            {activeTab === 'visa' && (
                <div className="visa-guard-container">
                    <div className="visa-summary-banner">
                        <div className="banner-left">
                            <ShieldCheck size={20} className="shield-icon" />
                            <div>
                                <h4>Schengen 90/180 Rolling Limit Compliance</h4>
                                <p>Automatic monitoring to prevent unlawful overstays across Schengen territory.</p>
                            </div>
                        </div>
                        <div className="schengen-meter">
                            <span className="meter-label">Schengen Days Budget: <strong>75 / 90 Days</strong></span>
                            <div className="meter-track">
                                <div className="meter-fill" style={{ width: '83%' }} />
                            </div>
                        </div>
                    </div>

                    <div className="visa-breakdown-cards">
                        {currentExpedition.parts.map((p) => (
                            <div key={p.id} className={`visa-part-card ${p.visaStatus}`}>
                                <div className="vpc-header">
                                    <span className="vpc-part">Part {p.partNumber}</span>
                                    <span className={`vpc-status-tag ${p.visaStatus}`}>
                                        {p.visaStatus === 'valid' ? 'Fully Compliant' : 'Requires Attention'}
                                    </span>
                                </div>
                                <h4 className="vpc-dest">{p.destination}</h4>
                                <p className="vpc-rule"><strong>Rule:</strong> {p.visaType}</p>
                                <p className="vpc-dates">Stay: {p.dates} ({p.durationDays} Days)</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 7. Tab 4: Timezone & Team Overlap */}
            {activeTab === 'timezone' && (
                <div className="timezone-sync-container">
                    <div className="tz-intro-box">
                        <Clock size={20} className="clock-icon" />
                        <div>
                            <h4>Global Work Window & Team Synchronization</h4>
                            <p>Assess collaborative overlap with your distributed team across North America, Europe, and Asia.</p>
                        </div>
                    </div>

                    <div className="tz-parts-grid">
                        {currentExpedition.parts.map((p) => (
                            <div key={p.id} className="tz-card">
                                <div className="tz-top">
                                    <span className="tz-flag">{p.flag}</span>
                                    <h4 className="tz-city">{p.destination.split(',')[0]}</h4>
                                    <span className="tz-offset-tag">{p.timezone}</span>
                                </div>
                                <div className="tz-overlap-box">
                                    <span className="overlap-title">Team Collaboration Overlap:</span>
                                    <span className="overlap-val">{p.workOverlap}</span>
                                </div>
                                <div className="tz-schedule-preview">
                                    <div className="schedule-bar">
                                        <div className="bar-work" title="Core Work Hours (09:00 - 18:00)" />
                                    </div>
                                    <span className="schedule-lbl">Typical 09:00–18:00 Local Window</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Part Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="multipart-modal-portal">
                        <motion.div 
                            className="mp-modal-backdrop" 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                        />
                        <motion.div 
                            className="mp-modal-dialog"
                            initial={{ scale: 0.95, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 15 }}
                        >
                            <div className="mp-modal-header">
                                <h3>Add Multi-Part Journey Leg</h3>
                                <button 
                                    type="button" 
                                    className="mp-modal-close"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleAddPart} className="mp-modal-form">
                                <div className="form-group">
                                    <label htmlFor="city-input">Destination City</label>
                                    <input 
                                        id="city-input"
                                        type="text" 
                                        required 
                                        placeholder="e.g. Kyoto, Medellin, Bansko"
                                        value={newCity}
                                        onChange={(e) => setNewCity(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="country-input">Country</label>
                                    <input 
                                        id="country-input"
                                        type="text" 
                                        placeholder="e.g. Japan, Colombia, Bulgaria"
                                        value={newCountry}
                                        onChange={(e) => setNewCountry(e.target.value)}
                                    />
                                </div>

                                <div className="form-row-2">
                                    <div className="form-group">
                                        <label htmlFor="duration-input">Duration (Days)</label>
                                        <input 
                                            id="duration-input"
                                            type="number" 
                                            min="5" 
                                            max="180"
                                            value={newDuration}
                                            onChange={(e) => setNewDuration(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="budget-input">Est. Monthly Budget ($)</label>
                                        <input 
                                            id="budget-input"
                                            type="number" 
                                            min="400" 
                                            step="50"
                                            value={newBudget}
                                            onChange={(e) => setNewBudget(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="focus-input">Primary Focus / Vibe</label>
                                    <input 
                                        id="focus-input"
                                        type="text" 
                                        placeholder="e.g. Deep Work Sprint, Alpine Wellness, Culture"
                                        value={newFocus}
                                        onChange={(e) => setNewFocus(e.target.value)}
                                    />
                                </div>

                                <div className="mp-modal-actions">
                                    <button 
                                        type="button" 
                                        className="btn-cancel"
                                        onClick={() => setIsAddModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn-submit"
                                    >
                                        Add to Expedition
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SeeNomadMultiPart;
