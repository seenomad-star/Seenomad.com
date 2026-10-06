import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
    X, ArrowLeftRight, DollarSign, CloudSun, Sun, CloudRain, Wind,
    Wifi, ShieldCheck, Users, TrendingUp, TrendingDown, ArrowUpRight,
    ArrowDownRight, MoveRight, MapPin, Star, Sparkles, CheckCircle2,
    Thermometer, Droplets, Compass, ArrowRight, RotateCcw
} from 'lucide-react';
import { allDestinations } from '../../../data/destinationsData';
import { getDestinationIntelligence } from '../../../utils/destinationIntelligenceUtils';
import { useDestinationStore } from '../../../store/destinationFilterStore';
import './CompareDestinationsModal.css';

const BUDGET_MODES = [
    { id: 'budget', label: 'Budget Nomad', multiplier: 0.75 },
    { id: 'standard', label: 'Standard Nomad', multiplier: 1.0 },
    { id: 'luxury', label: 'Founder / Luxury', multiplier: 1.65 }
];

const POPULAR_PAIRS = [
    { label: 'Bali vs Lisbon', ids: [601, 812] },
    { label: 'Tokyo vs Chiang Mai', ids: [301, 1102] },
    { label: 'Bangkok vs Barcelona', ids: [316, 309] },
    { label: 'Santorini vs Bora Bora', ids: [105, 101] }
];

const CompareDestinationsModal = ({
    isOpen = false,
    onClose,
    standalone = false
}) => {
    const navigate = useNavigate();
    const {
        compareDestinations,
        setCompareDestinations,
        clearCompareDestinations
    } = useDestinationStore();

    const [tempUnit, setTempUnit] = useState('C'); // 'C' | 'F'
    const [budgetTier, setBudgetTier] = useState('standard');

    // Deduplicate destinations by name for cleaner dropdown selection while keeping all IDs accessible
    const uniqueDestinations = useMemo(() => {
        const seen = new Map();
        allDestinations.forEach((d) => {
            if (!seen.has(d.name) || seen.get(d.name).id > d.id) {
                seen.set(d.name, d);
            }
        });
        return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    // Resolve the two selected destinations (default to Bali & Lisbon if fewer than 2 selected)
    const destAId = compareDestinations[0] || 601; // Bali
    const destBId = compareDestinations[1] || 812; // Lisbon

    const destA = useMemo(
        () => allDestinations.find((d) => d.id === Number(destAId)) || allDestinations[0],
        [destAId]
    );
    const destB = useMemo(
        () => allDestinations.find((d) => d.id === Number(destBId)) || allDestinations[1],
        [destBId]
    );

    const intelA = useMemo(() => getDestinationIntelligence(destA), [destA]);
    const intelB = useMemo(() => getDestinationIntelligence(destB), [destB]);

    const multiplier = useMemo(() => {
        return BUDGET_MODES.find((m) => m.id === budgetTier)?.multiplier || 1.0;
    }, [budgetTier]);

    const handleSelectDestA = (id) => {
        const numId = Number(id);
        setCompareDestinations([numId, destB.id]);
    };

    const handleSelectDestB = (id) => {
        const numId = Number(id);
        setCompareDestinations([destA.id, numId]);
    };

    const handleSwap = () => {
        setCompareDestinations([destB.id, destA.id]);
    };

    const handleSelectPair = (pairIds) => {
        setCompareDestinations(pairIds);
    };

    // Helper for temperature conversion
    const formatTemp = (tempC, tempF) => {
        if (tempUnit === 'F') {
            const fVal = tempF !== undefined ? tempF : Math.round((tempC * 9) / 5 + 32);
            return `${fVal}°F`;
        }
        return `${tempC}°C`;
    };

    const parseAmount = (str) => {
        if (!str) return 0;
        const cleaned = String(str).replace(/[^0-9.]/g, '');
        return parseFloat(cleaned) || 0;
    };

    const totalCostA = Math.round(parseAmount(intelA.costs.totalEstimated) * multiplier);
    const totalCostB = Math.round(parseAmount(intelB.costs.totalEstimated) * multiplier);
    const costDiff = Math.abs(totalCostA - totalCostB);
    const cheaperCity = totalCostA < totalCostB ? destA.name : totalCostB < totalCostA ? destB.name : null;
    const costSavingsPct = Math.max(totalCostA, totalCostB) > 0
        ? Math.round((costDiff / Math.max(totalCostA, totalCostB)) * 100)
        : 0;

    // Pairwise category cost rows
    const costComparisonRows = useMemo(() => {
        const count = Math.max(intelA.costs.breakdown.length, intelB.costs.breakdown.length);
        const rows = [];
        const labels = [
            'Housing / 1BR Rental',
            'Coworking Membership',
            'Food & Dining Out',
            'Local Transit / Scooter',
            'Specialty Coffee / Daily'
        ];

        for (let i = 0; i < count; i++) {
            const itemA = intelA.costs.breakdown[i] || { category: labels[i], amount: '$0', trend: { direction: 'stable', change: '0.0%' } };
            const itemB = intelB.costs.breakdown[i] || { category: labels[i], amount: '$0', trend: { direction: 'stable', change: '0.0%' } };

            const isMonthlyA = String(itemA.amount).includes('/mo');
            const isMonthlyB = String(itemB.amount).includes('/mo');

            const rawA = parseAmount(itemA.amount);
            const rawB = parseAmount(itemB.amount);

            const adjA = isMonthlyA ? Math.round(rawA * multiplier) : rawA;
            const adjB = isMonthlyB ? Math.round(rawB * multiplier) : rawB;

            const dispA = isMonthlyA ? `$${adjA.toLocaleString()}/mo` : itemA.amount;
            const dispB = isMonthlyB ? `$${adjB.toLocaleString()}/mo` : itemB.amount;

            rows.push({
                label: labels[i] || itemA.category,
                subA: itemA.category,
                subB: itemB.category,
                noteA: itemA.note,
                noteB: itemB.note,
                valA: adjA,
                valB: adjB,
                dispA,
                dispB,
                trendA: itemA.trend || { direction: 'stable', change: '0.0%' },
                trendB: itemB.trend || { direction: 'stable', change: '0.0%' }
            });
        }
        return rows;
    }, [intelA, intelB, multiplier]);

    if (!isOpen && !standalone) return null;

    const renderWeatherIcon = (iconName, size = 18) => {
        switch (iconName) {
            case 'CloudRain':
                return <CloudRain size={size} className="cmp-weather-icon rain" />;
            case 'Wind':
                return <Wind size={size} className="cmp-weather-icon wind" />;
            case 'CloudSun':
                return <CloudSun size={size} className="cmp-weather-icon cloud-sun" />;
            default:
                return <Sun size={size} className="cmp-weather-icon sun" />;
        }
    };

    const renderTrendBadge = (trend) => {
        if (!trend) return null;
        return (
            <span className={`cmp-trend-badge trend-${trend.direction}`} title={trend.description || trend.label || ''}>
                {trend.direction === 'rising' && <ArrowUpRight size={11} />}
                {trend.direction === 'falling' && <ArrowDownRight size={11} />}
                {trend.direction === 'stable' && <MoveRight size={10} />}
                <span>{trend.change}</span>
            </span>
        );
    };

    const content = (
        <div className={`compare-destinations-shell ${standalone ? 'is-standalone' : 'is-modal-overlay'}`} onClick={!standalone ? onClose : undefined}>
            <div
                className="compare-destinations-card"
                onClick={(e) => e.stopPropagation()}
                role={standalone ? 'region' : 'dialog'}
                aria-modal={!standalone}
                aria-label="Compare Destinations Side-by-Side"
            >
                {/* Top Header Bar */}
                <header className="compare-header-bar">
                    <div className="compare-header-title-cluster">
                        <div className="compare-brand-icon">
                            <ArrowLeftRight size={18} />
                        </div>
                        <div>
                            <h2 className="compare-main-heading">Compare Destinations</h2>
                            <p className="compare-sub-heading">
                                Side-by-side cost of living, economic shifts, and local climate intelligence
                            </p>
                        </div>
                    </div>

                    <div className="compare-header-controls">
                        {/* Quick Popular Comparisons */}
                        <div className="compare-presets-row">
                            <span className="presets-label">Quick Pairs:</span>
                            {POPULAR_PAIRS.map((pair, idx) => {
                                const isCurrent =
                                    (destA.id === pair.ids[0] && destB.id === pair.ids[1]) ||
                                    (destA.id === pair.ids[1] && destB.id === pair.ids[0]);
                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`compare-preset-btn ${isCurrent ? 'active' : ''}`}
                                        onClick={() => handleSelectPair(pair.ids)}
                                    >
                                        {pair.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Temperature Unit Toggle */}
                        <div className="compare-unit-toggle" role="group" aria-label="Temperature Unit">
                            <button
                                type="button"
                                className={`cmp-unit-btn ${tempUnit === 'C' ? 'active' : ''}`}
                                onClick={() => setTempUnit('C')}
                            >
                                °C
                            </button>
                            <button
                                type="button"
                                className={`cmp-unit-btn ${tempUnit === 'F' ? 'active' : ''}`}
                                onClick={() => setTempUnit('F')}
                            >
                                °F
                            </button>
                        </div>

                        {!standalone && onClose && (
                            <button
                                type="button"
                                className="compare-close-btn"
                                onClick={onClose}
                                aria-label="Close comparison tool"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </header>

                {/* Selector & Hero Comparison Strip */}
                <div className="compare-selectors-grid">
                    {/* Destination A Selector Card */}
                    <div className="compare-city-selector-card city-a">
                        <div className="selector-top-bar">
                            <span className="city-slot-tag">Destination A</span>
                            <select
                                value={destA.id}
                                onChange={(e) => handleSelectDestA(e.target.value)}
                                className="compare-city-select"
                                aria-label="Select first destination"
                            >
                                {uniqueDestinations.map((d) => (
                                    <option key={`a-${d.id}`} value={d.id}>
                                        {d.name} ({d.location})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="city-hero-banner">
                            <img src={destA.image} alt={destA.name} className="city-banner-img" />
                            <div className="city-banner-scrim" />
                            <div className="city-banner-meta">
                                <div className="city-banner-title-row">
                                    <h3>{destA.name}</h3>
                                    <span className="city-rating-inline">
                                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                                        {destA.rating || '4.8'}
                                    </span>
                                </div>
                                <div className="city-banner-sub">
                                    <MapPin size={12} />
                                    <span>{destA.location}</span>
                                    <span>·</span>
                                    <span>{destA.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Swap Button */}
                    <div className="compare-swap-divider">
                        <button
                            type="button"
                            className="compare-swap-circle-btn"
                            onClick={handleSwap}
                            title="Swap destinations"
                            aria-label="Swap Destination A and Destination B"
                        >
                            <ArrowLeftRight size={16} />
                        </button>
                        <span className="vs-badge">VS</span>
                    </div>

                    {/* Destination B Selector Card */}
                    <div className="compare-city-selector-card city-b">
                        <div className="selector-top-bar">
                            <span className="city-slot-tag">Destination B</span>
                            <select
                                value={destB.id}
                                onChange={(e) => handleSelectDestB(e.target.value)}
                                className="compare-city-select"
                                aria-label="Select second destination"
                            >
                                {uniqueDestinations.map((d) => (
                                    <option key={`b-${d.id}`} value={d.id}>
                                        {d.name} ({d.location})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="city-hero-banner">
                            <img src={destB.image} alt={destB.name} className="city-banner-img" />
                            <div className="city-banner-scrim" />
                            <div className="city-banner-meta">
                                <div className="city-banner-title-row">
                                    <h3>{destB.name}</h3>
                                    <span className="city-rating-inline">
                                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                                        {destB.rating || '4.8'}
                                    </span>
                                </div>
                                <div className="city-banner-sub">
                                    <MapPin size={12} />
                                    <span>{destB.location}</span>
                                    <span>·</span>
                                    <span>{destB.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Comparison Body */}
                <div className="compare-body-scroll">
                    {/* Executive Summary Callout */}
                    <div className="compare-verdict-banner">
                        <div className="verdict-item">
                            <DollarSign size={15} className="verdict-icon emerald" />
                            <span>
                                {cheaperCity ? (
                                    <>
                                        <strong>{cheaperCity}</strong> is <strong>${costDiff.toLocaleString()}/mo ({costSavingsPct}%)</strong> more affordable
                                    </>
                                ) : (
                                    <>Both destinations have identical estimated monthly living costs</>
                                )}
                            </span>
                        </div>
                        <span className="verdict-sep">·</span>
                        <div className="verdict-item">
                            <Thermometer size={15} className="verdict-icon sky" />
                            <span>
                                <strong>{destA.name}</strong> is {formatTemp(intelA.weather.tempC, intelA.weather.tempF)} vs{' '}
                                <strong>{destB.name}</strong> at {formatTemp(intelB.weather.tempC, intelB.weather.tempF)}
                            </span>
                        </div>
                        <span className="verdict-sep">·</span>
                        <div className="verdict-item">
                            <Wifi size={15} className="verdict-icon indigo" />
                            <span>
                                Faster Fiber:{' '}
                                <strong>
                                    {intelA.internet.downloadMbps >= intelB.internet.downloadMbps
                                        ? `${destA.name} (${intelA.internet.downloadMbps} Mbps)`
                                        : `${destB.name} (${intelB.internet.downloadMbps} Mbps)`}
                                </strong>
                            </span>
                        </div>
                    </div>

                    {/* SECTION 1: COST OF LIVING SIDE-BY-SIDE */}
                    <section className="compare-section-block" aria-label="Cost of Living Comparison">
                        <div className="compare-section-header">
                            <div className="section-title-group">
                                <DollarSign size={17} className="sec-icon amber" />
                                <h3>Cost of Living & Economic Velocity</h3>
                            </div>

                            {/* Lifestyle Tier Switcher */}
                            <div className="compare-lifestyle-tabs" role="group" aria-label="Lifestyle Budget Mode">
                                {BUDGET_MODES.map((mode) => (
                                    <button
                                        key={mode.id}
                                        type="button"
                                        className={`lifestyle-tab-btn ${budgetTier === mode.id ? 'active' : ''}`}
                                        onClick={() => setBudgetTier(mode.id)}
                                    >
                                        {mode.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Total Summary Cards */}
                        <div className="compare-cost-totals-grid">
                            <div className={`cost-total-box ${totalCostA <= totalCostB ? 'is-favorable' : ''}`}>
                                <div className="cost-box-top">
                                    <span className="cost-city-name">{destA.name} Monthly Est.</span>
                                    {totalCostA < totalCostB && (
                                        <span className="favorable-tag">
                                            <CheckCircle2 size={11} /> Best Value
                                        </span>
                                    )}
                                </div>
                                <div className="cost-box-MainVal">
                                    <span className="big-price">${totalCostA.toLocaleString()}</span>
                                    <span className="price-per">/ month</span>
                                    {renderTrendBadge(intelA.costs.trend)}
                                </div>
                                <p className="cost-box-note">
                                    {intelA.costs.rating} · {intelA.costs.trend?.label || 'Stable Market'} ({intelA.costs.trend?.period || 'QoQ'})
                                </p>
                            </div>

                            <div className={`cost-total-box ${totalCostB <= totalCostA ? 'is-favorable' : ''}`}>
                                <div className="cost-box-top">
                                    <span className="cost-city-name">{destB.name} Monthly Est.</span>
                                    {totalCostB < totalCostA && (
                                        <span className="favorable-tag">
                                            <CheckCircle2 size={11} /> Best Value
                                        </span>
                                    )}
                                </div>
                                <div className="cost-box-MainVal">
                                    <span className="big-price">${totalCostB.toLocaleString()}</span>
                                    <span className="price-per">/ month</span>
                                    {renderTrendBadge(intelB.costs.trend)}
                                </div>
                                <p className="cost-box-note">
                                    {intelB.costs.rating} · {intelB.costs.trend?.label || 'Stable Market'} ({intelB.costs.trend?.period || 'QoQ'})
                                </p>
                            </div>
                        </div>

                        {/* Granular Expense Category Comparison Rows */}
                        <div className="compare-breakdown-table">
                            {costComparisonRows.map((row, idx) => {
                                const maxVal = Math.max(row.valA, row.valB, 1);
                                const pctA = Math.min(100, Math.round((row.valA / maxVal) * 100));
                                const pctB = Math.min(100, Math.round((row.valB / maxVal) * 100));
                                const aIsLower = row.valA < row.valB;
                                const bIsLower = row.valB < row.valA;

                                return (
                                    <div key={idx} className="compare-expense-row">
                                        <div className="expense-col side-a">
                                            <div className="exp-val-line">
                                                <span className={`exp-amount ${aIsLower ? 'cheaper-highlight' : ''}`}>
                                                    {row.dispA}
                                                </span>
                                                {renderTrendBadge(row.trendA)}
                                            </div>
                                            <span className="exp-sub-note">{row.subA} · {row.noteA}</span>
                                            <div className="exp-bar-track left-align">
                                                <div
                                                    className={`exp-bar-fill ${aIsLower ? 'fill-emerald' : 'fill-slate'}`}
                                                    style={{ width: `${pctA}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="expense-center-label">
                                            <span>{row.label}</span>
                                        </div>

                                        <div className="expense-col side-b">
                                            <div className="exp-val-line">
                                                {renderTrendBadge(row.trendB)}
                                                <span className={`exp-amount ${bIsLower ? 'cheaper-highlight' : ''}`}>
                                                    {row.dispB}
                                                </span>
                                            </div>
                                            <span className="exp-sub-note">{row.subB} · {row.noteB}</span>
                                            <div className="exp-bar-track right-align">
                                                <div
                                                    className={`exp-bar-fill ${bIsLower ? 'fill-emerald' : 'fill-slate'}`}
                                                    style={{ width: `${pctB}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* SECTION 2: CLIMATE & WEATHER METRICS SIDE-BY-SIDE */}
                    <section className="compare-section-block" aria-label="Climate and Weather Comparison">
                        <div className="compare-section-header">
                            <div className="section-title-group">
                                <CloudSun size={17} className="sec-icon sky" />
                                <h3>Climate, Seasonality & Weather Intelligence</h3>
                            </div>
                            <span className="section-meta-caption">
                                Live conditions & 5-day trajectory ({tempUnit === 'C' ? 'Celsius °C' : 'Fahrenheit °F'})
                            </span>
                        </div>

                        <div className="compare-climate-grid">
                            {/* City A Climate Card */}
                            <div className="climate-comparison-card">
                                <div className="climate-card-top">
                                    <div>
                                        <span className="climate-city-label">{destA.name} Climate</span>
                                        <div className="climate-main-temp">
                                            {formatTemp(intelA.weather.tempC, intelA.weather.tempF)}
                                            <span className="climate-condition-text">{intelA.weather.condition}</span>
                                        </div>
                                    </div>
                                    <div className="climate-icon-orb">
                                        {renderWeatherIcon(intelA.weather.conditionIcon, 26)}
                                    </div>
                                </div>

                                <div className="climate-metrics-matrix">
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">High / Low</span>
                                        <span className="cm-val">
                                            {formatTemp(intelA.weather.highC, undefined)} / {formatTemp(intelA.weather.lowC, undefined)}
                                        </span>
                                    </div>
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">Humidity</span>
                                        <span className="cm-val">{intelA.weather.humidity}</span>
                                    </div>
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">UV Index</span>
                                        <span className="cm-val">{intelA.weather.uvIndex}</span>
                                    </div>
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">Rain Chance</span>
                                        <span className="cm-val">{intelA.weather.rainChance}</span>
                                    </div>
                                </div>

                                <div className="climate-season-row">
                                    <Compass size={13} className="season-icon" />
                                    <span>Best Months: <strong>{intelA.weather.bestSeason}</strong></span>
                                </div>

                                {/* 5-Day Mini Forecast */}
                                <div className="climate-forecast-strip">
                                    {intelA.weather.forecast.map((f, i) => {
                                        const rawC = parseInt(String(f.temp).replace(/[^0-9-]/g, ''), 10) || intelA.weather.tempC;
                                        return (
                                            <div key={i} className="forecast-mini-day">
                                                <span className="f-day">{f.day}</span>
                                                {renderWeatherIcon(f.icon, 14)}
                                                <span className="f-temp">{formatTemp(rawC, undefined)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* City B Climate Card */}
                            <div className="climate-comparison-card">
                                <div className="climate-card-top">
                                    <div>
                                        <span className="climate-city-label">{destB.name} Climate</span>
                                        <div className="climate-main-temp">
                                            {formatTemp(intelB.weather.tempC, intelB.weather.tempF)}
                                            <span className="climate-condition-text">{intelB.weather.condition}</span>
                                        </div>
                                    </div>
                                    <div className="climate-icon-orb">
                                        {renderWeatherIcon(intelB.weather.conditionIcon, 26)}
                                    </div>
                                </div>

                                <div className="climate-metrics-matrix">
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">High / Low</span>
                                        <span className="cm-val">
                                            {formatTemp(intelB.weather.highC, undefined)} / {formatTemp(intelB.weather.lowC, undefined)}
                                        </span>
                                    </div>
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">Humidity</span>
                                        <span className="cm-val">{intelB.weather.humidity}</span>
                                    </div>
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">UV Index</span>
                                        <span className="cm-val">{intelB.weather.uvIndex}</span>
                                    </div>
                                    <div className="climate-metric-cell">
                                        <span className="cm-label">Rain Chance</span>
                                        <span className="cm-val">{intelB.weather.rainChance}</span>
                                    </div>
                                </div>

                                <div className="climate-season-row">
                                    <Compass size={13} className="season-icon" />
                                    <span>Best Months: <strong>{intelB.weather.bestSeason}</strong></span>
                                </div>

                                {/* 5-Day Mini Forecast */}
                                <div className="climate-forecast-strip">
                                    {intelB.weather.forecast.map((f, i) => {
                                        const rawC = parseInt(String(f.temp).replace(/[^0-9-]/g, ''), 10) || intelB.weather.tempC;
                                        return (
                                            <div key={i} className="forecast-mini-day">
                                                <span className="f-day">{f.day}</span>
                                                {renderWeatherIcon(f.icon, 14)}
                                                <span className="f-temp">{formatTemp(rawC, undefined)}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: CONNECTIVITY, SAFETY & VISA BENCHMARK */}
                    <section className="compare-section-block" aria-label="Connectivity and Lifestyle Benchmark">
                        <div className="compare-section-header">
                            <div className="section-title-group">
                                <Wifi size={17} className="sec-icon purple" />
                                <h3>Connectivity, Safety & Nomad Infrastructure</h3>
                            </div>
                        </div>

                        <div className="compare-specs-grid">
                            <div className="spec-comparison-row">
                                <span className="spec-val side-a">
                                    <strong>{intelA.internet.downloadMbps} Mbps</strong> Down / {intelA.internet.uploadMbps} Mbps Up ({intelA.internet.pingMs}ms)
                                </span>
                                <span className="spec-label">Fiber Internet Speed</span>
                                <span className="spec-val side-b">
                                    <strong>{intelB.internet.downloadMbps} Mbps</strong> Down / {intelB.internet.uploadMbps} Mbps Up ({intelB.internet.pingMs}ms)
                                </span>
                            </div>

                            <div className="spec-comparison-row">
                                <span className="spec-val side-a">{intelA.lifestyle.safetyScore}</span>
                                <span className="spec-label">Safety Index</span>
                                <span className="spec-val side-b">{intelB.lifestyle.safetyScore}</span>
                            </div>

                            <div className="spec-comparison-row">
                                <span className="spec-val side-a">{intelA.lifestyle.nomadCommunity}</span>
                                <span className="spec-label">Nomad Community</span>
                                <span className="spec-val side-b">{intelB.lifestyle.nomadCommunity}</span>
                            </div>

                            <div className="spec-comparison-row">
                                <span className="spec-val side-a">{intelA.lifestyle.visaStatus}</span>
                                <span className="spec-label">Visa & Entry Pathway</span>
                                <span className="spec-val side-b">{intelB.lifestyle.visaStatus}</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <footer className="compare-footer-bar">
                    <button
                        type="button"
                        className="compare-reset-btn"
                        onClick={() => {
                            clearCompareDestinations();
                        }}
                    >
                        <RotateCcw size={14} />
                        <span>Reset Selection</span>
                    </button>

                    <div className="compare-footer-ctas">
                        <button
                            type="button"
                            className="compare-explore-city-btn"
                            onClick={() => {
                                if (onClose) onClose();
                                const slugA = destA.name.toLowerCase().replace(/\s+/g, '-');
                                navigate(`/explore/destinations/${slugA}`);
                            }}
                        >
                            <span>Explore {destA.name}</span>
                            <ArrowRight size={13} />
                        </button>
                        <button
                            type="button"
                            className="compare-explore-city-btn primary"
                            onClick={() => {
                                if (onClose) onClose();
                                const slugB = destB.name.toLowerCase().replace(/\s+/g, '-');
                                navigate(`/explore/destinations/${slugB}`);
                            }}
                        >
                            <span>Explore {destB.name}</span>
                            <ArrowRight size={13} />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );

    if (standalone) {
        return content;
    }

    return createPortal(content, document.body);
};

export default CompareDestinationsModal;
