import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, Landmark, Sparkles, Compass, Globe2,
    ShieldCheck, Filter, Search, RotateCcw, ChevronDown,
    Flame, Check, Award, Calendar
} from 'lucide-react';
import { MP_CIRCUITS, MP_CATEGORIES, matchMPCategory } from './MPDistrictIntelligenceSuite';
import { MH_CIRCUITS, MH_CATEGORIES, matchMHCategory } from './MHDistrictIntelligenceSuite';
import { RJ_CIRCUITS, RJ_CATEGORIES, matchRJCategory } from './RJDistrictIntelligenceSuite';
import { CG_CIRCUITS, CG_CATEGORIES, matchCGCategory } from './CGDistrictIntelligenceSuite';
import './UPDestinationExplorerBar.css';

export const UP_CIRCUITS = [
    { id: 'all', label: 'All UP Destinations', icon: '🇮🇳', description: 'Complete directory across all 75 districts of Uttar Pradesh' },
    { id: 'Spiritual & Heritage', label: 'Spiritual & Tirtha', icon: '🕉️', description: 'Varanasi, Ayodhya, Mathura, Prayagraj, Chitrakoot, Naimisharanya' },
    { id: 'Mughal & Architecture', label: 'Mughal & Nawabi', icon: '👑', description: 'Taj Mahal, Agra Fort, Fatehpur Sikri, Lucknow Imambaras, Jaunpur' },
    { id: 'Buddhist Circuit', label: 'Sacred Buddhist', icon: '☸️', description: 'Sarnath, Kushinagar, Shravasti, Kapilvastu, Kaushambi, Sankisa' },
    { id: 'Wildlife & Nature', label: 'Wildlife & Terai', icon: '🐅', description: 'Dudhwa Tiger Reserve, Pilibhit, Katarniaghat, Chambal, Sur Sarovar' },
    { id: 'Craft & ODOP', label: 'Craft & ODOP Guilds', icon: '🏺', description: 'Kannauj Attar, Firozabad Glass, Moradabad Brass, Bhadohi Carpets' },
    { id: 'Bundelkhand Heritage', label: 'Bundelkhand Forts', icon: '🏰', description: 'Jhansi Fort, Kalinjar Fort, Deogarh Gupta Temples, Mahoba Lakes' }
];

const UPDestinationExplorerBar = ({
    regionMode = 'up', // 'up' | 'mp' | 'mh' | 'rj' | 'cg' | 'delhi' | 'global'
    onSelectRegionMode,
    selectedDistrict = 'all',
    onSelectDistrict,
    selectedCircuit = 'all',
    onSelectCircuit,
    selectedMPCategory = 'all',
    onSelectMPCategory,
    selectedMHCategory = 'all',
    onSelectMHCategory,
    selectedRJCategory = 'all',
    onSelectRJCategory,
    selectedCGCategory = 'all',
    onSelectCGCategory,
    upDestinations = [],
    districtsList = [],
    mpDestinations = [],
    mpDistrictsList = [],
    mhDestinations = [],
    mhDistrictsList = [],
    rjDestinations = [],
    rjDistrictsList = [],
    cgDestinations = [],
    cgDistrictsList = [],
    totalCount = 0,
    onOpen75Districts,
    onOpen55Districts,
    onOpen36Districts,
    onOpen50Districts,
    onOpen33Districts
}) => {
    const navigate = useNavigate();

    // Compute counts per CG category
    const cgCategoryCounts = useMemo(() => {
        const counts = { all: cgDestinations.length };
        CG_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = cgDestinations.filter(d => matchCGCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [cgDestinations]);

    // Compute counts per CG circuit
    const cgCircuitCounts = useMemo(() => {
        const counts = { all: cgDestinations.length };
        CG_CIRCUITS.forEach(c => {
            if (c.id !== 'all') counts[c.id] = 0;
        });
        cgDestinations.forEach(d => {
            if (d.cgCircuit && counts[d.cgCircuit] !== undefined) {
                counts[d.cgCircuit]++;
            }
        });
        return counts;
    }, [cgDestinations]);

    // Compute counts per MH category
    const mhCategoryCounts = useMemo(() => {
        const counts = { all: mhDestinations.length };
        MH_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = mhDestinations.filter(d => matchMHCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [mhDestinations]);

    // Compute counts per MH circuit
    const mhCircuitCounts = useMemo(() => {
        const counts = { all: mhDestinations.length };
        MH_CIRCUITS.forEach(c => {
            if (c.id !== 'all') counts[c.id] = 0;
        });
        mhDestinations.forEach(d => {
            if (d.mhCircuit && counts[d.mhCircuit] !== undefined) {
                counts[d.mhCircuit]++;
            }
        });
        return counts;
    }, [mhDestinations]);

    // Compute counts per RJ category
    const rjCategoryCounts = useMemo(() => {
        const counts = { all: rjDestinations.length };
        RJ_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = rjDestinations.filter(d => matchRJCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [rjDestinations]);

    // Compute counts per RJ circuit
    const rjCircuitCounts = useMemo(() => {
        const counts = { all: rjDestinations.length };
        RJ_CIRCUITS.forEach(c => {
            if (c.id !== 'all') counts[c.id] = 0;
        });
        rjDestinations.forEach(d => {
            if (d.rjCircuit && counts[d.rjCircuit] !== undefined) {
                counts[d.rjCircuit]++;
            }
        });
        return counts;
    }, [rjDestinations]);

    // Compute counts per MP category
    const mpCategoryCounts = useMemo(() => {
        const counts = { all: mpDestinations.length };
        MP_CATEGORIES.forEach(cat => {
            if (cat.id !== 'all') {
                counts[cat.id] = mpDestinations.filter(d => matchMPCategory(d, cat.id)).length;
            }
        });
        return counts;
    }, [mpDestinations]);

    // Compute counts per UP circuit
    const circuitCounts = useMemo(() => {
        const counts = { all: upDestinations.length };
        UP_CIRCUITS.forEach(c => {
            if (c.id !== 'all') counts[c.id] = 0;
        });
        upDestinations.forEach(d => {
            if (d.upCircuit && counts[d.upCircuit] !== undefined) {
                counts[d.upCircuit]++;
            }
        });
        return counts;
    }, [upDestinations]);

    // Compute counts per MP circuit
    const mpCircuitCounts = useMemo(() => {
        const counts = { all: mpDestinations.length };
        MP_CIRCUITS.forEach(c => {
            if (c.id !== 'all') counts[c.id] = 0;
        });
        mpDestinations.forEach(d => {
            if (d.mpCircuit && counts[d.mpCircuit] !== undefined) {
                counts[d.mpCircuit]++;
            }
        });
        return counts;
    }, [mpDestinations]);

    return (
        <div className="up-explorer-hub-container">
            {/* 1. Region Switcher Tabs (Uttar Pradesh vs Madhya Pradesh vs Maharashtra vs Rajasthan vs Delhi vs Global) */}
            <div className="region-mode-switcher-bar">
                <div className="region-tabs-group">
                    <button
                        type="button"
                        onClick={() => onSelectRegionMode('up')}
                        className={`region-tab-btn ${regionMode === 'up' ? 'active up-theme' : ''}`}
                    >
                        <span className="region-flag">🇮🇳</span>
                        <span className="font-bold">Uttar Pradesh (75 Districts)</span>
                        <span className="region-badge-count">{upDestinations.length}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onSelectRegionMode('mp')}
                        className={`region-tab-btn ${regionMode === 'mp' ? 'active mp-theme' : ''}`}
                    >
                        <span className="region-flag">🐅</span>
                        <span className="font-bold">Madhya Pradesh (55 Districts)</span>
                        <span className="region-badge-count">{mpDestinations.length}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onSelectRegionMode('mh')}
                        className={`region-tab-btn ${regionMode === 'mh' ? 'active mh-theme' : ''}`}
                    >
                        <span className="region-flag">🚩</span>
                        <span className="font-bold">Maharashtra (36 Districts)</span>
                        <span className="region-badge-count">{mhDestinations.length}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onSelectRegionMode('rj')}
                        className={`region-tab-btn ${regionMode === 'rj' ? 'active rj-theme' : ''}`}
                    >
                        <span className="region-flag">🐪</span>
                        <span className="font-bold">Rajasthan (50 Districts)</span>
                        <span className="region-badge-count">{rjDestinations.length}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onSelectRegionMode('cg')}
                        className={`region-tab-btn ${regionMode === 'cg' ? 'active cg-theme' : ''}`}
                    >
                        <span className="region-flag">🌿</span>
                        <span className="font-bold">Chhattisgarh (33 Districts)</span>
                        <span className="region-badge-count">{cgDestinations.length}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onSelectRegionMode('delhi')}
                        className={`region-tab-btn ${regionMode === 'delhi' ? 'active delhi-theme' : ''}`}
                    >
                        <span className="region-flag">🏛️</span>
                        <span>Delhi NCR</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => onSelectRegionMode('global')}
                        className={`region-tab-btn ${regionMode === 'global' ? 'active global-theme' : ''}`}
                    >
                        <Globe2 size={15} />
                        <span>Global Nomad Hubs</span>
                    </button>
                </div>

                <div className="up-state-motto-tag">
                    <span className="up-seal-dot" />
                    <span>
                        {regionMode === 'cg'
                            ? 'Chhattisgarh Tourism · Full of Surprises · The Herbal State'
                            : regionMode === 'rj'
                            ? 'Rajasthan Tourism · Padharo Mhare Desh · Incredible India'
                            : regionMode === 'mh'
                            ? 'Maharashtra Tourism · Unlimited Maharashtra · Incredible India'
                            : regionMode === 'mp'
                            ? 'Madhya Pradesh Tourism · The Heart of Incredible India'
                            : regionMode === 'up'
                            ? 'Uttar Pradesh Tourism · Incredible India'
                            : 'Incredible India & Global Nomad Intelligence'}
                    </span>
                </div>
            </div>

            {/* 2. When Region Mode is 'mp', show MP District Dropdown & Circuit Pills */}
            {regionMode === 'mp' && (
                <div className="up-circuit-controls-card mp-controls-card">
                    {/* Header Banner */}
                    <div className="up-controls-header">
                        <div className="up-header-text-block">
                            <h2 className="up-header-title">
                                Explore Madhya Pradesh Destinations by District & Circuit
                            </h2>
                            <p className="up-header-desc">
                                The Heart of Incredible India · 55 Districts: From UNESCO World Heritage Khajuraho, Sanchi, and Bhimbetka to royal Bengal tiger reserves of Kanha and Bandhavgarh, sacred Jyotirlingas, Narmada ghats, and historical citadels.
                            </p>
                        </div>

                        {/* District Dropdown Selector & 55 Districts Quick Modal Trigger */}
                        <div className="up-district-dropdown-wrap">
                            <div className="district-dropdown-labels-row">
                                <label htmlFor="mp-district-select" className="district-dropdown-label">
                                    <MapPin size={14} className="text-emerald-400" />
                                    <span>Filter by MP District:</span>
                                </label>
                                {onOpen55Districts && (
                                    <button
                                        type="button"
                                        onClick={onOpen55Districts}
                                        className="up-directory-quick-link"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.28) 100%)',
                                            color: '#6ee7b7',
                                            borderColor: 'rgba(52, 211, 153, 0.45)'
                                        }}
                                        title="Browse full directory of all 55 districts of Madhya Pradesh"
                                    >
                                        <Compass size={12} />
                                        <span>55 Districts Grid</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => navigate('/explore/itinerary-builder')}
                                    className="up-directory-quick-link"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.28) 100%)',
                                        color: '#fbbf24',
                                        borderColor: 'rgba(245, 158, 11, 0.45)'
                                    }}
                                    title="Build custom Day-by-Day Travel Plan"
                                >
                                    <Calendar size={12} />
                                    <span>Build Day-by-Day Itinerary 🗓️</span>
                                </button>
                            </div>
                            <div className="district-select-box">
                                <select
                                    id="mp-district-select"
                                    value={selectedDistrict}
                                    onChange={(e) => onSelectDistrict(e.target.value)}
                                    className="district-native-select"
                                >
                                    <option value="all">🌟 All 55 Districts ({mpDistrictsList.length} Covered)</option>
                                    {mpDistrictsList.map((district) => (
                                        <option key={district} value={district}>
                                            📍 {district} District
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow-icon" />
                            </div>
                        </div>
                    </div>

                    {/* MP Category / Interest Filters (Wildlife, Historical, Pilgrimage, etc.) */}
                    <div className="mp-category-filters-container">
                        <div className="mp-category-header-row">
                            <span className="mp-category-eyebrow">
                                <Sparkles size={13} className="text-emerald-400" />
                                <strong>Filter by Interest / Category:</strong>
                            </span>
                            <span className="mp-category-hint">
                                Quickly find Wildlife safaris, Historical monuments & forts, or Pilgrimage tirthas
                            </span>
                        </div>
                        <div className="mp-category-pills-row" role="group" aria-label="Filter Madhya Pradesh by Category">
                            {MP_CATEGORIES.map((cat) => {
                                const count = mpCategoryCounts[cat.id] || 0;
                                const isActive = (selectedMPCategory || 'all') === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => onSelectMPCategory && onSelectMPCategory(cat.id)}
                                        className={`mp-category-pill ${isActive ? 'active' : ''}`}
                                        title={cat.description}
                                    >
                                        <span className="cat-pill-icon">{cat.icon}</span>
                                        <span className="cat-pill-label">{cat.label}</span>
                                        <span className="cat-pill-count">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* MP Circuit Filter Pills */}
                    <div className="up-circuit-pills-row">
                        {MP_CIRCUITS.map((circuit) => {
                            const count = mpCircuitCounts[circuit.id] || 0;
                            const isActive = selectedCircuit === circuit.id;
                            return (
                                <button
                                    key={circuit.id}
                                    type="button"
                                    onClick={() => onSelectCircuit(circuit.id)}
                                    className={`up-circuit-pill ${isActive ? 'active' : ''}`}
                                    style={isActive ? {
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        borderColor: '#10b981',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
                                    } : {}}
                                    title={circuit.description}
                                >
                                    <span className="circuit-pill-icon">{circuit.icon}</span>
                                    <span className="circuit-pill-label">{circuit.label}</span>
                                    <span className="circuit-pill-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Telemetry Footbar */}
                    <div className="up-telemetry-footbar">
                        <div className="telemetry-item">
                            <Check size={13} className="text-emerald-400" />
                            <span>55 Districts Represented</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Award size={13} className="text-amber-400" />
                            <span>3 UNESCO Sites (Khajuraho, Sanchi, Bhimbetka)</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Sparkles size={13} className="text-cyan-400" />
                            <span>Tiger Capital (Kanha, Bandhavgarh, Pench, Panna)</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <ShieldCheck size={13} className="text-emerald-400" />
                            <span>Full Dedicated Intelligence Detail Pages</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. When Region Mode is 'mh', show Maharashtra District Dropdown, Category Filters & Circuit Pills */}
            {regionMode === 'mh' && (
                <div className="up-circuit-controls-card mh-controls-card" style={{ borderColor: 'rgba(249, 115, 22, 0.35)' }}>
                    {/* Header Banner */}
                    <div className="up-controls-header">
                        <div className="up-header-text-block">
                            <h2 className="up-header-title">
                                Explore Maharashtra Destinations by District, Forts & Circuits
                            </h2>
                            <p className="up-header-desc">
                                Gateway of India · 36 Districts: From UNESCO Ajanta & Ellora and Elephanta Caves to Chhatrapati Shivaji Maharaj's coastal & Sahyadri forts, 5 Sacred Jyotirlingas, Tadoba tiger safaris, and golden Konkan beaches.
                            </p>
                        </div>

                        {/* District Dropdown Selector & 36 Districts Quick Modal Trigger */}
                        <div className="up-district-dropdown-wrap">
                            <div className="district-dropdown-labels-row">
                                <label htmlFor="mh-district-select" className="district-dropdown-label">
                                    <MapPin size={14} className="text-orange-400" />
                                    <span>Filter by MH District:</span>
                                </label>
                                {onOpen36Districts && (
                                    <button
                                        type="button"
                                        onClick={onOpen36Districts}
                                        className="up-directory-quick-link"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.22) 0%, rgba(194, 65, 12, 0.28) 100%)',
                                            color: '#fdba74',
                                            borderColor: 'rgba(249, 115, 22, 0.45)'
                                        }}
                                        title="Browse full directory of all 36 districts of Maharashtra"
                                    >
                                        <Compass size={12} />
                                        <span>36 Districts Grid</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => navigate('/explore/itinerary-builder')}
                                    className="up-directory-quick-link"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.28) 100%)',
                                        color: '#fbbf24',
                                        borderColor: 'rgba(245, 158, 11, 0.45)'
                                    }}
                                    title="Build custom Day-by-Day Travel Plan"
                                >
                                    <Calendar size={12} />
                                    <span>Build Day-by-Day Itinerary 🗓️</span>
                                </button>
                            </div>
                            <div className="district-select-box">
                                <select
                                    id="mh-district-select"
                                    value={selectedDistrict}
                                    onChange={(e) => onSelectDistrict(e.target.value)}
                                    className="district-native-select"
                                >
                                    <option value="all">🌟 All 36 Districts ({mhDistrictsList.length} Covered)</option>
                                    {mhDistrictsList.map((district) => (
                                        <option key={district} value={district}>
                                            📍 {district} District
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow-icon" />
                            </div>
                        </div>
                    </div>

                    {/* MH Category / Interest Filters (Wildlife, Forts & Historical, Pilgrimage, etc.) */}
                    <div className="mp-category-filters-container" style={{ background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(194, 65, 12, 0.04) 100%)', borderColor: 'rgba(249, 115, 22, 0.25)' }}>
                        <div className="mp-category-header-row">
                            <span className="mp-category-eyebrow">
                                <Sparkles size={13} className="text-orange-400" />
                                <strong>Filter by Interest / Category:</strong>
                            </span>
                            <span className="mp-category-hint">
                                Quickly find Wildlife tiger reserves, Maratha forts & UNESCO caves, or Jyotirlingas
                            </span>
                        </div>
                        <div className="mp-category-pills-row" role="group" aria-label="Filter Maharashtra by Category">
                            {MH_CATEGORIES.map((cat) => {
                                const count = mhCategoryCounts[cat.id] || 0;
                                const isActive = (selectedMHCategory || 'all') === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => onSelectMHCategory && onSelectMHCategory(cat.id)}
                                        className={`mp-category-pill ${isActive ? 'active' : ''}`}
                                        style={isActive ? {
                                            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                            borderColor: '#f97316',
                                            color: '#ffffff',
                                            boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)'
                                        } : {}}
                                        title={cat.description}
                                    >
                                        <span className="cat-pill-icon">{cat.icon}</span>
                                        <span className="cat-pill-label">{cat.label}</span>
                                        <span className="cat-pill-count">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* MH Circuit Filter Pills */}
                    <div className="up-circuit-pills-row">
                        {MH_CIRCUITS.map((circuit) => {
                            const count = mhCircuitCounts[circuit.id] || 0;
                            const isActive = selectedCircuit === circuit.id;
                            return (
                                <button
                                    key={circuit.id}
                                    type="button"
                                    onClick={() => onSelectCircuit(circuit.id)}
                                    className={`up-circuit-pill ${isActive ? 'active' : ''}`}
                                    style={isActive ? {
                                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                        borderColor: '#f97316',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 15px rgba(249, 115, 22, 0.35)'
                                    } : {}}
                                    title={circuit.description}
                                >
                                    <span className="circuit-pill-icon">{circuit.icon}</span>
                                    <span className="circuit-pill-label">{circuit.label}</span>
                                    <span className="circuit-pill-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Telemetry Footbar */}
                    <div className="up-telemetry-footbar">
                        <div className="telemetry-item">
                            <Check size={13} className="text-orange-400" />
                            <span>36 Districts Represented</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Award size={13} className="text-amber-400" />
                            <span>5 UNESCO World Heritage Sites (Ajanta, Ellora, Elephanta, CSMT, Kaas)</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Sparkles size={13} className="text-cyan-400" />
                            <span>5 Sacred Jyotirlingas (Trimbakeshwar, Bhimashankar, Grishneshwar, Parli, Aundha)</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <ShieldCheck size={13} className="text-emerald-400" />
                            <span>Full Dedicated Intelligence Detail Pages</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. When Region Mode is 'rj', show RJ District Dropdown & Circuit Pills */}
            {regionMode === 'rj' && (
                <div className="up-circuit-controls-card rj-controls-card" style={{ borderColor: 'rgba(245, 158, 11, 0.35)' }}>
                    {/* Header Banner */}
                    <div className="up-controls-header">
                        <div className="up-header-text-block">
                            <h2 className="up-header-title">
                                Explore Rajasthan Destinations by District, Category & Circuit
                            </h2>
                            <p className="up-header-desc">
                                Padharo Mhare Desh · 50 Districts: From UNESCO World Heritage Hill Forts, Lake Palaces of Udaipur & Golden Thar Dunes of Jaisalmer to Ranthambore Tiger Corridors, Sacred Pushkar & Shekhawati Painted Havelis.
                            </p>
                        </div>

                        {/* District Dropdown Selector & 50 Districts Quick Modal Trigger */}
                        <div className="up-district-dropdown-wrap">
                            <div className="district-dropdown-labels-row">
                                <label htmlFor="rj-district-select" className="district-dropdown-label">
                                    <MapPin size={14} className="text-amber-400" />
                                    <span>Filter by RJ District:</span>
                                </label>
                                {onOpen50Districts && (
                                    <button
                                        type="button"
                                        onClick={onOpen50Districts}
                                        className="up-directory-quick-link"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.22) 0%, rgba(180, 83, 9, 0.28) 100%)',
                                            color: '#fcd34d',
                                            borderColor: 'rgba(245, 158, 11, 0.45)'
                                        }}
                                        title="Browse full directory of all 50 districts of Rajasthan"
                                    >
                                        <Compass size={12} />
                                        <span>50 Districts Grid</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => navigate('/explore/itinerary-builder')}
                                    className="up-directory-quick-link"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.28) 100%)',
                                        color: '#fbbf24',
                                        borderColor: 'rgba(245, 158, 11, 0.45)'
                                    }}
                                    title="Build custom Day-by-Day Travel Plan"
                                >
                                    <Calendar size={12} />
                                    <span>Build Day-by-Day Itinerary 🗓️</span>
                                </button>
                            </div>
                            <div className="district-select-box">
                                <select
                                    id="rj-district-select"
                                    value={selectedDistrict}
                                    onChange={(e) => onSelectDistrict(e.target.value)}
                                    className="district-native-select"
                                >
                                    <option value="all">🌟 All 50 Districts ({rjDistrictsList.length} Covered)</option>
                                    {rjDistrictsList.map((district) => (
                                        <option key={district} value={district}>
                                            📍 {district} District
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow-icon" />
                            </div>
                        </div>
                    </div>

                    {/* RJ Category / Interest Filters (Forts, Wildlife, Desert, Pilgrimage, Lakes, Crafts) */}
                    <div className="mp-category-filters-container" style={{ background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(180, 83, 9, 0.04) 100%)', borderColor: 'rgba(245, 158, 11, 0.25)' }}>
                        <div className="mp-category-header-row">
                            <span className="mp-category-eyebrow">
                                <Sparkles size={13} className="text-amber-400" />
                                <strong>Filter by Interest / Category:</strong>
                            </span>
                            <span className="mp-category-hint">
                                Quickly find UNESCO hill forts & palaces, Thar desert dunes, tiger reserves, or sacred tirthas
                            </span>
                        </div>
                        <div className="mp-category-pills-row" role="group" aria-label="Filter Rajasthan by Category">
                            {RJ_CATEGORIES.map((cat) => {
                                const count = rjCategoryCounts[cat.id] || 0;
                                const isActive = (selectedRJCategory || 'all') === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => onSelectRJCategory && onSelectRJCategory(cat.id)}
                                        className={`mp-category-pill ${isActive ? 'active' : ''}`}
                                        style={isActive ? {
                                            background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                                            borderColor: '#f59e0b',
                                            color: '#ffffff',
                                            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
                                        } : {}}
                                        title={cat.description}
                                    >
                                        <span className="cat-pill-icon">{cat.icon}</span>
                                        <span className="cat-pill-label">{cat.label}</span>
                                        <span className="cat-pill-count">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* RJ Circuit Filter Pills */}
                    <div className="up-circuit-pills-row">
                        {RJ_CIRCUITS.map((circuit) => {
                            const count = rjCircuitCounts[circuit.id] || 0;
                            const isActive = selectedCircuit === circuit.id;
                            return (
                                <button
                                    key={circuit.id}
                                    type="button"
                                    onClick={() => onSelectCircuit(circuit.id)}
                                    className={`up-circuit-pill ${isActive ? 'active' : ''}`}
                                    style={isActive ? {
                                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                                        borderColor: '#f59e0b',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)'
                                    } : {}}
                                    title={circuit.description}
                                >
                                    <span className="circuit-pill-icon">{circuit.icon}</span>
                                    <span className="circuit-pill-label">{circuit.label}</span>
                                    <span className="circuit-pill-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Telemetry Footbar */}
                    <div className="up-telemetry-footbar">
                        <div className="telemetry-item">
                            <Check size={13} className="text-amber-400" />
                            <span>50 Districts Represented</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Award size={13} className="text-amber-400" />
                            <span>6 UNESCO World Heritage Hill Forts (Amber, Chittorgarh, Kumbhalgarh, Jaisalmer, Ranthambore, Gagron)</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Sparkles size={13} className="text-cyan-400" />
                            <span>Ranthambore, Sariska, Keoladeo Ghana & Jawai Leopard Corridors</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <ShieldCheck size={13} className="text-emerald-400" />
                            <span>Full Dedicated Intelligence Detail Pages</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. When Region Mode is 'cg', show CG District Dropdown, Category Filters & Circuit Pills */}
            {regionMode === 'cg' && (
                <div className="up-circuit-controls-card cg-controls-card" style={{ borderColor: 'rgba(16, 185, 129, 0.35)' }}>
                    {/* Header Banner */}
                    <div className="up-controls-header">
                        <div className="up-header-text-block">
                            <h2 className="up-header-title">
                                Explore Chhattisgarh Destinations by District, Waterfalls & Circuits
                            </h2>
                            <p className="up-header-desc">
                                Full of Surprises · 33 Districts: From Chitrakote Falls (Niagara of India), Kanger Valley Caves & Bastar Dhokra Bell Metal to Sirpur UNESCO Buddhist Heritage, Bhoramdeo Khajuraho of CG, and Mainpat mist plateaus.
                            </p>
                        </div>

                        {/* District Dropdown Selector & 33 Districts Quick Modal Trigger */}
                        <div className="up-district-dropdown-wrap">
                            <div className="district-dropdown-labels-row">
                                <label htmlFor="cg-district-select" className="district-dropdown-label">
                                    <MapPin size={14} className="text-emerald-400" />
                                    <span>Filter by CG District:</span>
                                </label>
                                {onOpen33Districts && (
                                    <button
                                        type="button"
                                        onClick={onOpen33Districts}
                                        className="up-directory-quick-link"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.22) 0%, rgba(4, 120, 87, 0.28) 100%)',
                                            color: '#6ee7b7',
                                            borderColor: 'rgba(16, 185, 129, 0.45)'
                                        }}
                                        title="Browse full directory of all 33 districts of Chhattisgarh"
                                    >
                                        <Compass size={12} />
                                        <span>33 Districts Grid</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => navigate('/explore/itinerary-builder')}
                                    className="up-directory-quick-link"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.28) 100%)',
                                        color: '#fbbf24',
                                        borderColor: 'rgba(245, 158, 11, 0.45)'
                                    }}
                                    title="Build custom Day-by-Day Travel Plan"
                                >
                                    <Calendar size={12} />
                                    <span>Build Day-by-Day Itinerary 🗓️</span>
                                </button>
                            </div>
                            <div className="district-select-box">
                                <select
                                    id="cg-district-select"
                                    value={selectedDistrict}
                                    onChange={(e) => onSelectDistrict(e.target.value)}
                                    className="district-native-select"
                                >
                                    <option value="all">🌟 All 33 Districts ({cgDistrictsList.length} Covered)</option>
                                    {cgDistrictsList.map((district) => (
                                        <option key={district} value={district}>
                                            📍 {district} District
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow-icon" />
                            </div>
                        </div>
                    </div>

                    {/* CG Category / Interest Filters (Waterfalls, Tribal Lore, Wildlife, Ancient Heritage, Shaktipeeths, Hills) */}
                    <div className="mp-category-filters-container" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(4, 120, 87, 0.04) 100%)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
                        <div className="mp-category-header-row">
                            <span className="mp-category-eyebrow">
                                <Sparkles size={13} className="text-emerald-400" />
                                <strong>Filter by Interest / Category:</strong>
                            </span>
                            <span className="mp-category-hint">
                                Quickly find Chitrakote Niagara waterfalls, Bastar Dhokra craft guilds, or Sirpur Buddhist temples
                            </span>
                        </div>
                        <div className="mp-category-pills-row" role="group" aria-label="Filter Chhattisgarh by Category">
                            {CG_CATEGORIES.map((cat) => {
                                const count = cgCategoryCounts[cat.id] || 0;
                                const isActive = (selectedCGCategory || 'all') === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => onSelectCGCategory && onSelectCGCategory(cat.id)}
                                        className={`mp-category-pill ${isActive ? 'active' : ''}`}
                                        style={isActive ? {
                                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                            borderColor: '#10b981',
                                            color: '#ffffff',
                                            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                                        } : {}}
                                        title={cat.description}
                                    >
                                        <span className="cat-pill-icon">{cat.icon}</span>
                                        <span className="cat-pill-label">{cat.label}</span>
                                        <span className="cat-pill-count">{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* CG Circuit Filter Pills */}
                    <div className="up-circuit-pills-row">
                        {CG_CIRCUITS.map((circuit) => {
                            const count = cgCircuitCounts[circuit.id] || 0;
                            const isActive = selectedCircuit === circuit.id;
                            return (
                                <button
                                    key={circuit.id}
                                    type="button"
                                    onClick={() => onSelectCircuit(circuit.id)}
                                    className={`up-circuit-pill ${isActive ? 'active' : ''}`}
                                    style={isActive ? {
                                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                        borderColor: '#10b981',
                                        color: '#ffffff',
                                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
                                    } : {}}
                                    title={circuit.description}
                                >
                                    <span className="circuit-pill-icon">{circuit.icon}</span>
                                    <span className="circuit-pill-label">{circuit.label}</span>
                                    <span className="circuit-pill-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Telemetry Footbar */}
                    <div className="up-telemetry-footbar">
                        <div className="telemetry-item">
                            <Check size={13} className="text-emerald-400" />
                            <span>33 Districts Represented</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Award size={13} className="text-emerald-400" />
                            <span>Chitrakote Falls (Niagara of India) & Kanger Valley</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Sparkles size={13} className="text-cyan-400" />
                            <span>Sirpur UNESCO Brick Shrines & Bastar Dhokra Artisans</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <ShieldCheck size={13} className="text-emerald-400" />
                            <span>Full Dedicated Intelligence Detail Pages</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. When Region Mode is 'up', show District Dropdown & Circuit Pills */}
            {regionMode === 'up' && (
                <div className="up-circuit-controls-card">
                    {/* Header Banner */}
                    <div className="up-controls-header">
                        <div className="up-header-text-block">
                            <h2 className="up-header-title">
                                Explore Uttar Pradesh Destinations by District & Circuit
                            </h2>
                            <p className="up-header-desc">
                                From the spiritual ghats of Kashi to the Royal Bengal tigers of Dudhwa and UNESCO monuments of Agra, explore verified intelligence across every district.
                            </p>
                        </div>

                        {/* District Dropdown Selector & 75 Districts Quick Modal Trigger */}
                        <div className="up-district-dropdown-wrap">
                            <div className="district-dropdown-labels-row">
                                <label htmlFor="up-district-select" className="district-dropdown-label">
                                    <MapPin size={14} className="text-emerald-400" />
                                    <span>Filter by District:</span>
                                </label>
                                {onOpen75Districts && (
                                    <button
                                        type="button"
                                        onClick={onOpen75Districts}
                                        className="up-directory-quick-link"
                                        title="Browse full directory of all 75 districts"
                                    >
                                        <Compass size={12} />
                                        <span>75 Districts Grid</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => navigate('/explore/itinerary-builder')}
                                    className="up-directory-quick-link"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.28) 100%)',
                                        color: '#fbbf24',
                                        borderColor: 'rgba(245, 158, 11, 0.45)'
                                    }}
                                    title="Build custom Day-by-Day Travel Plan across UP districts"
                                >
                                    <Calendar size={12} />
                                    <span>Build Day-by-Day Itinerary 🗓️</span>
                                </button>
                            </div>
                            <div className="district-select-box">
                                <select
                                    id="up-district-select"
                                    value={selectedDistrict}
                                    onChange={(e) => onSelectDistrict(e.target.value)}
                                    className="district-native-select"
                                >
                                    <option value="all">🌟 All Districts ({districtsList.length} Covered)</option>
                                    {districtsList.map((district) => (
                                        <option key={district} value={district}>
                                            📍 {district} District
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="select-arrow-icon" />
                            </div>
                        </div>
                    </div>

                    {/* Circuit Filter Pills */}
                    <div className="up-circuit-pills-row">
                        {UP_CIRCUITS.map((circuit) => {
                            const count = circuitCounts[circuit.id] || 0;
                            const isActive = selectedCircuit === circuit.id;
                            return (
                                <button
                                    key={circuit.id}
                                    type="button"
                                    onClick={() => onSelectCircuit(circuit.id)}
                                    className={`up-circuit-pill ${isActive ? 'active' : ''}`}
                                    title={circuit.description}
                                >
                                    <span className="circuit-pill-icon">{circuit.icon}</span>
                                    <span className="circuit-pill-label">{circuit.label}</span>
                                    <span className="circuit-pill-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Telemetry Footbar */}
                    <div className="up-telemetry-footbar">
                        <div className="telemetry-item">
                            <Check size={13} className="text-emerald-400" />
                            <span>75 Districts Represented</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Award size={13} className="text-amber-400" />
                            <span>3 UNESCO World Heritage Sites (Agra)</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <Sparkles size={13} className="text-cyan-400" />
                            <span>ODOP (One District One Product) Verified</span>
                        </div>
                        <div className="telemetry-bullet">·</div>
                        <div className="telemetry-item">
                            <ShieldCheck size={13} className="text-violet-400" />
                            <span>Full Intelligence Detail Pages</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UPDestinationExplorerBar;
