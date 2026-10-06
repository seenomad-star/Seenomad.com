import React, { useState } from 'react';
import {
    ShieldCheck, Calendar, Plane, FileText, DollarSign, Clock,
    CheckCircle2, ExternalLink, Landmark, Compass, Plus, X,
    Briefcase, CreditCard, Globe, Sparkles, ArrowRight
} from 'lucide-react';

/**
 * VisaRequirementSummary
 * Dynamically pulls and displays key visa intelligence for selected destinations:
 * - Visa-Free Travel Duration & Entry Rule
 * - Digital Nomad Visa Eligibility, Permit Name & Minimum Income Threshold
 * - Required Documentation Checklist (interactive)
 * - Consular Fee, Processing Speed & Remote Income Tax Rule
 * - Side-by-side comparison tray for up to 3 selected destinations
 */
const VisaRequirementSummary = ({
    allVisaCountries = [],
    selectedDestinations = [],
    activeSummaryCountry,
    onSelectCountry,
    onToggleCompareDestination,
    onOpenFullDossier,
    onNavigateEmbassy,
    onNavigateMultiPart,
    passportLabel
}) => {
    const [checkedDocs, setCheckedDocs] = useState({});
    const [activeViewMode, setActiveViewMode] = useState('spotlight'); // 'spotlight' | 'compare'

    const current = activeSummaryCountry || selectedDestinations[0] || allVisaCountries[0];
    if (!current) return null;

    const visaFreeDuration = current.isSchengen
        ? '90 Days in any 180-Day Period (Schengen Rule)'
        : current.processingTime.toLowerCase().includes('free') || current.entryCategory === 'visa-free'
            ? '90 Days Visa-Free / Instant Airport Entry'
            : current.processingTime.toLowerCase().includes('voa')
                ? '30–60 Days Visa on Arrival (Extendable)'
                : '30–90 Days via Electronic Travel Auth / e-Visa';

    const nomadEligibilityStatus = current.nomadVisaAvailable
        ? {
            eligible: true,
            badge: 'Eligible · Dedicated Nomad Permit',
            pathway: current.visaPathway,
            income: current.minIncome,
            maxStay: current.maxStay
        }
        : {
            eligible: false,
            badge: 'Standard e-Visa / Visitor Entry',
            pathway: current.visaPathway,
            income: current.minIncome,
            maxStay: current.maxStay
        };

    const toggleDocCheck = (countryId, idx) => {
        const key = `${countryId}-${idx}`;
        setCheckedDocs((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const completedCount = (current.checklist || []).filter((_, idx) => checkedDocs[`${current.id}-${idx}`]).length;

    return (
        <section className="visa-req-summary-widget" aria-label="Dynamic Visa Requirement Summary">
            {/* Top Bar: Destination Switcher Pills + Mode Toggle */}
            <div className="vrs-header">
                <div className="vrs-header-left">
                    <div className="vrs-eyebrow">
                        <Sparkles size={13} />
                        <span>Dynamic Visa Requirement Summary</span>
                        <span className="eyebrow-sep">·</span>
                        <span>{passportLabel}</span>
                    </div>
                    <h2 className="vrs-title">
                        Instant Entry, Nomad Eligibility & Document Intelligence
                    </h2>
                </div>

                <div className="vrs-header-controls">
                    {/* Quick Country Selector Dropdown */}
                    <div className="vrs-country-Add">
                        <label htmlFor="vrs-destination-picker">Inspect Destination:</label>
                        <select
                            id="vrs-destination-picker"
                            value={current.id}
                            onChange={(e) => {
                                const found = allVisaCountries.find((c) => c.id === e.target.value);
                                if (found && onSelectCountry) onSelectCountry(found);
                            }}
                            className="vrs-select"
                        >
                            {allVisaCountries.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.flag} {c.name} ({c.capital})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* View Mode Switcher: Single Spotlight vs Multi-Destination Compare */}
                    <div className="vrs-mode-tabs" role="tablist">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeViewMode === 'spotlight'}
                            className={`vrs-mode-btn ${activeViewMode === 'spotlight' ? 'active' : ''}`}
                            onClick={() => setActiveViewMode('spotlight')}
                        >
                            <span>Destination Summary</span>
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeViewMode === 'compare'}
                            className={`vrs-mode-btn ${activeViewMode === 'compare' ? 'active' : ''}`}
                            onClick={() => setActiveViewMode('compare')}
                        >
                            <span>Compare Selected ({selectedDestinations.length})</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Pinned Destinations Strip */}
            <div className="vrs-pinned-bar">
                <span className="vrs-pinned-label">Selected Destinations:</span>
                <div className="vrs-pinned-chips">
                    {selectedDestinations.map((dest) => {
                        const isFocused = dest.id === current.id;
                        return (
                            <div
                                key={dest.id}
                                className={`vrs-dest-chip ${isFocused ? 'active' : ''}`}
                                onClick={() => onSelectCountry && onSelectCountry(dest)}
                            >
                                <span className="chip-flag">{dest.flag}</span>
                                <span className="chip-name">{dest.name}</span>
                                {selectedDestinations.length > 1 && (
                                    <button
                                        type="button"
                                        className="chip-remove"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggleCompareDestination && onToggleCompareDestination(dest);
                                        }}
                                        aria-label={`Remove ${dest.name} from summary`}
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
                <span className="vrs-pinned-hint">
                    Click any country card below or use &ldquo;+ Pin to Summary&rdquo; to inspect &amp; compare
                </span>
            </div>

            {activeViewMode === 'spotlight' ? (
                /* SPOTLIGHT SUMMARY VIEW FOR CURRENTLY SELECTED DESTINATION */
                <div className="vrs-spotlight-grid">
                    {/* Column 1: Visa-Free Travel Duration & Core Entry Specs */}
                    <div className="vrs-panel">
                        <div className="vrs-panel-head">
                            <div className="vrs-country-badge">
                                <span className="vrs-flag-lg">{current.flag}</span>
                                <div>
                                    <h3>{current.name}</h3>
                                    <span>{current.region} · Chancery: {current.capital}</span>
                                </div>
                            </div>
                            <span className="vrs-confidence-tag">
                                <ShieldCheck size={13} />
                                {current.visaApprovalRate} Approval
                            </span>
                        </div>

                        <div className="vrs-highlight-box sky">
                            <div className="vrs-hb-label">
                                <Calendar size={13} />
                                <span>Visa-Free & Short-Stay Travel Duration</span>
                            </div>
                            <strong className="vrs-hb-value">{visaFreeDuration}</strong>
                            <span className="vrs-hb-sub">
                                Max Authorized Stay: {current.maxStay}
                            </span>
                        </div>

                        <div className="vrs-mini-stats">
                            <div className="vrs-stat-item">
                                <span>Processing Window</span>
                                <strong>
                                    <Clock size={12} /> {current.processingTime}
                                </strong>
                            </div>
                            <div className="vrs-stat-item">
                                <span>Consular / E-Portal Fee</span>
                                <strong>
                                    <CreditCard size={12} /> {current.visaFee}
                                </strong>
                            </div>
                            <div className="vrs-stat-item">
                                <span>Remote Income Tax Rule</span>
                                <strong className={current.zeroTaxFriendly ? 'emerald' : ''}>
                                    <DollarSign size={12} /> {current.zeroTaxFriendly ? '0% Foreign Tax' : '183-Day Threshold'}
                                </strong>
                            </div>
                            <div className="vrs-stat-item">
                                <span>Consular Wait Time</span>
                                <strong>{current.appointmentWait}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Digital Nomad Visa Eligibility & Financial Thresholds */}
                    <div className="vrs-panel">
                        <div className="vrs-panel-title-row">
                            <span className="vrs-panel-kicker">
                                <Plane size={14} /> Digital Nomad Visa Eligibility
                            </span>
                            <span className={`vrs-elig-pill ${nomadEligibilityStatus.eligible ? 'eligible' : 'standard'}`}>
                                {nomadEligibilityStatus.badge}
                            </span>
                        </div>

                        <div className="vrs-highlight-box emerald">
                            <div className="vrs-hb-label">
                                <Briefcase size={13} />
                                <span>Official Remote Work / Long-Stay Pathway</span>
                            </div>
                            <strong className="vrs-hb-value">{nomadEligibilityStatus.pathway}</strong>
                            <span className="vrs-hb-sub">{current.validityWindow}</span>
                        </div>

                        <div className="vrs-eligibility-criteria">
                            <div className="vrs-crit-row">
                                <span>Minimum Monthly / Annual Income</span>
                                <strong>{nomadEligibilityStatus.income}</strong>
                            </div>
                            <div className="vrs-crit-row">
                                <span>Foreign Employer / Client Contract</span>
                                <strong>{nomadEligibilityStatus.eligible ? 'Required (Remote Outside Host)' : 'Not Required for Short Stay'}</strong>
                            </div>
                            <div className="vrs-crit-row">
                                <span>Tax Residency & Local Exemption</span>
                                <strong>{current.taxRegime}</strong>
                            </div>
                        </div>

                        <div className="vrs-panel-actions">
                            <button
                                type="button"
                                className="vrs-action-btn secondary"
                                onClick={() => onNavigateEmbassy && onNavigateEmbassy(current)}
                            >
                                <Landmark size={13} />
                                <span>{current.name} Embassy Desk</span>
                            </button>
                            <button
                                type="button"
                                className="vrs-action-btn primary"
                                onClick={() => onOpenFullDossier && onOpenFullDossier(current)}
                            >
                                <FileText size={13} />
                                <span>Open Full Visa Dossier</span>
                                <ArrowRight size={13} />
                            </button>
                        </div>
                    </div>

                    {/* Column 3: Interactive Required Documentation Checklist */}
                    <div className="vrs-panel">
                        <div className="vrs-panel-title-row">
                            <span className="vrs-panel-kicker">
                                <FileText size={14} /> Required Documentation ({current.name})
                            </span>
                            <span className="vrs-doc-progress">
                                {completedCount} / {(current.checklist || []).length} Ready
                            </span>
                        </div>

                        <ul className="vrs-doc-checklist">
                            {(current.checklist || []).map((doc, idx) => {
                                const isChecked = !!checkedDocs[`${current.id}-${idx}`];
                                return (
                                    <li
                                        key={idx}
                                        className={`vrs-doc-item ${isChecked ? 'checked' : ''}`}
                                        onClick={() => toggleDocCheck(current.id, idx)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            aria-label={doc}
                                        />
                                        <span>{doc}</span>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="vrs-doc-footer">
                            <a
                                href={current.officialPortal}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="vrs-portal-link"
                            >
                                <Globe size={13} />
                                <span>Official {current.name} e-Visa Portal</span>
                                <ExternalLink size={12} />
                            </a>

                            <button
                                type="button"
                                className="vrs-expedition-link"
                                onClick={() => onNavigateMultiPart && onNavigateMultiPart(current)}
                            >
                                <Compass size={13} />
                                <span>Add to Multi-Part Expedition</span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* MULTI-DESTINATION COMPARISON MATRIX */
                <div className="vrs-compare-table-wrap">
                    <table className="vrs-compare-table">
                        <thead>
                            <tr>
                                <th>Requirement Metric</th>
                                {selectedDestinations.map((dest) => (
                                    <th key={dest.id}>
                                        <div className="vrs-th-dest">
                                            <span>{dest.flag} {dest.name}</span>
                                            <small>{dest.capital}</small>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Visa-Free / Short Stay</strong></td>
                                {selectedDestinations.map((dest) => (
                                    <td key={dest.id}>
                                        {dest.isSchengen ? '90d / 180d Schengen' : dest.maxStay}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Digital Nomad Visa Eligibility</strong></td>
                                {selectedDestinations.map((dest) => (
                                    <td key={dest.id}>
                                        <span className={`vrs-elig-pill ${dest.nomadVisaAvailable ? 'eligible' : 'standard'}`}>
                                            {dest.nomadVisaAvailable ? 'Eligible · Nomad Permit' : 'Standard e-Visa / Visitor'}
                                        </span>
                                        <div className="vrs-td-sub">{dest.visaPathway}</div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Minimum Income / Funds</strong></td>
                                {selectedDestinations.map((dest) => (
                                    <td key={dest.id}><strong>{dest.minIncome}</strong></td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Processing Time & Fee</strong></td>
                                {selectedDestinations.map((dest) => (
                                    <td key={dest.id}>
                                        <div>{dest.processingTime}</div>
                                        <div className="vrs-td-sub">{dest.visaFee}</div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Remote Income Tax Rule</strong></td>
                                {selectedDestinations.map((dest) => (
                                    <td key={dest.id}>{dest.taxRegime}</td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Required Documentation</strong></td>
                                {selectedDestinations.map((dest) => (
                                    <td key={dest.id}>
                                        <ul className="vrs-td-doc-list">
                                            {(dest.checklist || []).slice(0, 3).map((d, i) => (
                                                <li key={i}>• {d}</li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default VisaRequirementSummary;
