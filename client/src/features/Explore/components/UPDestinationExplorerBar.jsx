import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin, Landmark, Sparkles, Compass, Globe2,
    ShieldCheck, Filter, Search, RotateCcw, ChevronDown,
    Flame, Check, Award, Calendar
} from 'lucide-react';
import { MP_CIRCUITS } from './MPDistrictIntelligenceSuite';
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
    regionMode = 'up', // 'up' | 'mp' | 'delhi' | 'global'
    onSelectRegionMode,
    selectedDistrict = 'all',
    onSelectDistrict,
    selectedCircuit = 'all',
    onSelectCircuit,
    upDestinations = [],
    districtsList = [],
    mpDestinations = [],
    mpDistrictsList = [],
    totalCount = 0,
    onOpen75Districts,
    onOpen55Districts
}) => {
    const navigate = useNavigate();

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
            {/* 1. Region Switcher Tabs (Uttar Pradesh vs Madhya Pradesh vs Delhi vs Global) */}
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
                        {regionMode === 'mp'
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

            {/* 3. When Region Mode is 'up', show District Dropdown & Circuit Pills */}
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
