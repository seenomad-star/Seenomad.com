import React, { useState, useEffect, useMemo } from 'react';
import {
    Shield,
    Clock,
    Calendar,
    AlertTriangle,
    CheckCircle2,
    Plus,
    Trash2,
    DollarSign,
    Info,
    ChevronDown,
    ChevronUp,
    MapPin,
    ArrowRight
} from 'lucide-react';
import { visaService } from '../../../services/visaService';
import { useToastStore } from '../../../store/toastStore';
import './SchengenTaxDayTracker.css';

const DEFAULT_SCHENGEN_TRIPS = [
    { id: 1, country: 'Portugal', city: 'Lisbon', start: '2026-06-01', end: '2026-06-25', isSchengen: true },
    { id: 2, country: 'Spain', city: 'Barcelona', start: '2026-07-05', end: '2026-07-28', isSchengen: true },
    { id: 3, country: 'France', city: 'Nice', start: '2026-08-10', end: '2026-08-28', isSchengen: true }
];

const SCHENGEN_COUNTRIES = [
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark',
    'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
    'Iceland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania',
    'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland'
];

const SchengenTaxDayTracker = () => {
    const { addToast } = useToastStore();
    const [activeTab, setActiveTab] = useState('schengen'); // 'schengen' | 'tax'
    const [trips, setTrips] = useState(() => {
        try {
            const saved = localStorage.getItem('seenomad_schengen_trips');
            return saved ? JSON.parse(saved) : DEFAULT_SCHENGEN_TRIPS;
        } catch (e) {
            return DEFAULT_SCHENGEN_TRIPS;
        }
    });

    // Form inputs for new trip
    const [newCountry, setNewCountry] = useState('Portugal');
    const [newCity, setNewCity] = useState('');
    const [newStart, setNewStart] = useState('');
    const [newEnd, setNewEnd] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Primary tax country test
    const [taxCountry, setTaxCountry] = useState('Spain');

    // Save trips to localStorage whenever updated
    useEffect(() => {
        try {
            localStorage.setItem('seenomad_schengen_trips', JSON.stringify(trips));
        } catch (e) {
            // ignore
        }
    }, [trips]);

    // Calculate Schengen 90/180 compliance via visaService
    const schengenData = useMemo(() => {
        const schengenTrips = trips.filter(t => t.isSchengen);
        return visaService.calculateSchengenCompliance(schengenTrips, new Date());
    }, [trips]);

    // Calculate Tax Residency days spent in selected country
    const taxData = useMemo(() => {
        const ONE_DAY_MS = 24 * 60 * 60 * 1000;
        let daysInCountry = 0;

        trips.filter(t => t.country.toLowerCase() === taxCountry.toLowerCase()).forEach(t => {
            if (t.start && t.end) {
                const s = new Date(t.start).getTime();
                const e = new Date(t.end).getTime();
                if (e >= s) {
                    daysInCountry += Math.round((e - s) / ONE_DAY_MS) + 1;
                }
            }
        });

        return visaService.calculateTaxResidency(daysInCountry, taxCountry);
    }, [trips, taxCountry]);

    const handleAddTrip = (e) => {
        e.preventDefault();
        if (!newCountry || !newStart || !newEnd) {
            addToast('Please specify country and valid start/end dates', 'error');
            return;
        }

        const isSchengen = SCHENGEN_COUNTRIES.includes(newCountry);
        const newTrip = {
            id: Date.now(),
            country: newCountry,
            city: newCity || newCountry,
            start: newStart,
            end: newEnd,
            isSchengen
        };

        setTrips([newTrip, ...trips]);
        setNewCity('');
        setNewStart('');
        setNewEnd('');
        setIsFormOpen(false);
        addToast(`Added trip to ${newCountry} (${isSchengen ? 'Schengen Zone' : 'Non-Schengen'})! ✈️`, 'success');
    };

    const handleDeleteTrip = (id) => {
        setTrips(trips.filter(t => t.id !== id));
        addToast('Trip entry removed from compliance calculator', 'info');
    };

    const getRiskBadge = (riskLevel) => {
        switch (riskLevel) {
            case 'overstay':
                return <span className="risk-pill overstay"><AlertTriangle size={14} /> Overstay Alert (90+ Days)</span>;
            case 'critical':
                return <span className="risk-pill critical"><AlertTriangle size={14} /> Critical Limit (&gt;75 Days)</span>;
            case 'caution':
                return <span className="risk-pill caution"><Clock size={14} /> Caution (&gt;60 Days)</span>;
            default:
                return <span className="risk-pill safe"><CheckCircle2 size={14} /> In Compliance (Safe)</span>;
        }
    };

    return (
        <section className="schengen-tracker-card" aria-label="Personal Visa and Tax Residency Day Tracker">
            <div className="st-header">
                <div className="st-title-group">
                    <div className="st-icon-wrap">
                        <Shield size={22} className="text-cyan-400" />
                    </div>
                    <div>
                        <div className="st-badge">Seenomad Mobility Compliance</div>
                        <h2 className="st-title">Personal Day-Counting &amp; Tax Residency Monitor</h2>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="st-tabs" role="tablist">
                    <button
                        type="button"
                        className={`st-tab-btn ${activeTab === 'schengen' ? 'active' : ''}`}
                        onClick={() => setActiveTab('schengen')}
                        role="tab"
                        aria-selected={activeTab === 'schengen'}
                    >
                        <Clock size={15} />
                        <span>Schengen 90/180 Rule</span>
                    </button>
                    <button
                        type="button"
                        className={`st-tab-btn ${activeTab === 'tax' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tax')}
                        role="tab"
                        aria-selected={activeTab === 'tax'}
                    >
                        <DollarSign size={15} />
                        <span>183-Day Tax Residency</span>
                    </button>
                </div>
            </div>

            {/* TAB 1: SCHENGEN 90/180 CALCULATOR */}
            {activeTab === 'schengen' && (
                <div className="st-tab-content">
                    <div className="st-metric-grid">
                        <div className="st-metric-box main-gauge">
                            <div className="gauge-header">
                                <span className="gauge-label">Rolling 180-Day Window Usage</span>
                                {getRiskBadge(schengenData.riskLevel)}
                            </div>
                            <div className="gauge-value-row">
                                <span className="gauge-big-num">{schengenData.totalDaysSpent}</span>
                                <span className="gauge-total">/ 90 Days Used</span>
                            </div>
                            {/* Progress bar */}
                            <div className="st-progress-bar-bg">
                                <div
                                    className={`st-progress-bar-fill ${schengenData.riskLevel}`}
                                    style={{ width: `${Math.min(100, schengenData.percentUsed)}%` }}
                                />
                            </div>
                            <div className="gauge-footer-meta">
                                <span>{schengenData.daysRemaining} days remaining before mandatory reset</span>
                                <span>{schengenData.percentUsed}% exhausted</span>
                            </div>
                        </div>

                        <div className="st-metric-box intel-box">
                            <h4>Nomad Strategy Advice</h4>
                            <p className="intel-text">
                                {schengenData.daysRemaining > 30 ? (
                                    <>You have ample quota left in the Schengen area. Consider combining Portugal and Spain with nearby non-Schengen havens (like Albania, Montenegro, or UK) to maximize your European stay.</>
                                ) : (
                                    <>Your Schengen quota is running low ({schengenData.daysRemaining} days left). Plan an exit to non-Schengen destinations like Cyprus, Georgia, or Morocco to avoid entry bans.</>
                                )}
                            </p>
                            <div className="intel-highlights">
                                <div className="intel-item">
                                    <span className="intel-k">Window Rule</span>
                                    <span className="intel-v">Rolling 180 Days</span>
                                </div>
                                <div className="intel-item">
                                    <span className="intel-k">Zone Countries</span>
                                    <span className="intel-v">29 European States</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: TAX RESIDENCY 183-DAY CALCULATOR */}
            {activeTab === 'tax' && (
                <div className="st-tab-content">
                    <div className="st-metric-grid">
                        <div className="st-metric-box main-gauge">
                            <div className="gauge-header">
                                <div className="country-select-inline">
                                    <span>Track Physical Presence in:</span>
                                    <select
                                        value={taxCountry}
                                        onChange={(e) => setTaxCountry(e.target.value)}
                                        className="st-inline-select"
                                        aria-label="Select country for tax residency check"
                                    >
                                        <option value="Spain">Spain</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Italy">Italy</option>
                                        <option value="France">France</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Thailand">Thailand</option>
                                    </select>
                                </div>
                                <span className={`risk-pill ${taxData.taxRisk === 'resident' ? 'overstay' : 'safe'}`}>
                                    {taxData.taxRisk === 'resident' ? 'Tax Resident Triggered' : 'Non-Resident Status Safe'}
                                </span>
                            </div>
                            <div className="gauge-value-row">
                                <span className="gauge-big-num">{taxData.daysSpent}</span>
                                <span className="gauge-total">/ 183 Days Allowed</span>
                            </div>
                            <div className="st-progress-bar-bg">
                                <div
                                    className={`st-progress-bar-fill ${taxData.taxRisk === 'resident' ? 'overstay' : 'safe'}`}
                                    style={{ width: `${taxData.percentToResidency}%` }}
                                />
                            </div>
                            <div className="gauge-footer-meta">
                                <span>{taxData.remainingUntilResidency} days remaining before 183-day tax residency applies</span>
                                <span>{taxData.percentToResidency}% used</span>
                            </div>
                        </div>

                        <div className="st-metric-box intel-box">
                            <h4>Tax Residency Intelligence</h4>
                            <p className="intel-text">
                                Most international tax systems deem an individual a tax resident if they spend 183 or more days in the territory in a calendar year. Staying under this threshold helps preserve digital nomad nomad-tax status.
                            </p>
                            <div className="intel-highlights">
                                <div className="intel-item">
                                    <span className="intel-k">Threshold</span>
                                    <span className="intel-v">183 Days / Year</span>
                                </div>
                                <div className="intel-item">
                                    <span className="intel-k">Rule Type</span>
                                    <span className="intel-v">Physical Presence</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Travel History Log & Trip Adder */}
            <div className="st-trips-section">
                <div className="st-trips-header">
                    <div className="trips-header-left">
                        <Calendar size={16} className="text-cyan-400" />
                        <h3>Your Logged Travel Stays ({trips.length})</h3>
                    </div>
                    <button
                        type="button"
                        className="st-add-trip-toggle"
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        aria-expanded={isFormOpen}
                    >
                        <Plus size={16} />
                        <span>{isFormOpen ? 'Cancel' : 'Log New Stay'}</span>
                    </button>
                </div>

                {/* Add Trip Form Drawer */}
                {isFormOpen && (
                    <form className="st-trip-form" onSubmit={handleAddTrip}>
                        <div className="st-form-grid">
                            <div className="form-group">
                                <label htmlFor="new-trip-country">Country</label>
                                <select
                                    id="new-trip-country"
                                    value={newCountry}
                                    onChange={(e) => setNewCountry(e.target.value)}
                                    className="st-input"
                                >
                                    {SCHENGEN_COUNTRIES.map(c => (
                                        <option key={c} value={c}>{c} (Schengen)</option>
                                    ))}
                                    <option value="United Kingdom">United Kingdom (Non-Schengen)</option>
                                    <option value="Albania">Albania (Non-Schengen)</option>
                                    <option value="Montenegro">Montenegro (Non-Schengen)</option>
                                    <option value="Georgia">Georgia (Non-Schengen)</option>
                                    <option value="Thailand">Thailand (Non-Schengen)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-trip-city">City / Hub</label>
                                <input
                                    id="new-trip-city"
                                    type="text"
                                    placeholder="e.g. Lisbon, Barcelona"
                                    value={newCity}
                                    onChange={(e) => setNewCity(e.target.value)}
                                    className="st-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-trip-start">Entry Date</label>
                                <input
                                    id="new-trip-start"
                                    type="date"
                                    value={newStart}
                                    onChange={(e) => setNewStart(e.target.value)}
                                    className="st-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="new-trip-end">Exit Date</label>
                                <input
                                    id="new-trip-end"
                                    type="date"
                                    value={newEnd}
                                    onChange={(e) => setNewEnd(e.target.value)}
                                    className="st-input"
                                    required
                                />
                            </div>
                        </div>
                        <div className="st-form-actions">
                            <button type="submit" className="st-submit-btn">
                                Save Trip Entry
                            </button>
                        </div>
                    </form>
                )}

                {/* Stays List */}
                <div className="st-trips-list">
                    {trips.map((trip) => {
                        const s = new Date(trip.start);
                        const e = new Date(trip.end);
                        const days = Math.max(1, Math.round((e - s) / (24 * 60 * 60 * 1000)) + 1);

                        return (
                            <div key={trip.id} className="st-trip-item">
                                <div className="trip-main">
                                    <div className="trip-place">
                                        <MapPin size={15} className="trip-pin" />
                                        <span className="trip-city">{trip.city}</span>
                                        <span className="trip-country">{trip.country}</span>
                                        {trip.isSchengen && (
                                            <span className="trip-tag schengen">Schengen</span>
                                        )}
                                    </div>
                                    <div className="trip-dates">
                                        <span>{trip.start}</span>
                                        <ArrowRight size={12} />
                                        <span>{trip.end}</span>
                                        <span className="trip-days-badge">{days} Days</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="trip-delete-btn"
                                    onClick={() => handleDeleteTrip(trip.id)}
                                    aria-label={`Remove stay in ${trip.country}`}
                                    title="Delete entry"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SchengenTaxDayTracker;
