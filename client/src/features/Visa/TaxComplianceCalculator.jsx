import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Calculator,
    Scale,
    Globe,
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    FileCheck2,
    UserCheck,
    GitBranch,
    Download,
    Plus,
    Trash2,
    Info,
    Landmark
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import '../../styles/TaxComplianceCalculator.css';

/**
 * Global Mobility & Nomad Tax Jurisdiction Dataset (2026 Reference)
 * Models Territorial, Foreign-Source Exempt DNV, Flat-Rate Nomad Regimes, and Worldwide Progressive Systems.
 */
const TAX_JURISDICTIONS = [
    {
        id: 'spain-dnv',
        country: 'Spain',
        flag: '🇪🇸',
        regimeName: 'Beckham Law / Special Expat & DNV Regime (UGE-CE)',
        taxSystemType: 'Flat Special Regime (24% up to €600k)',
        residencyTriggerDays: 183,
        dnvForeignExemptUnder183: false,
        foreignEmploymentRate: 0.24,
        foreignFreelanceRate: 0.24,
        foreignDividendsRate: 0.0, // Foreign passive income outside Spain exempt under Beckham Law
        localSourceRate: 0.24,
        socialSecurityAnnualUSD: 4200, // RETA / Autónomo or Social Security Certificate of Coverage
        treatyNetwork: '95+ Double Taxation Treaties (US/UK/EU Totalization supported)',
        mobilitySummary:
            'Under Spain’s Special Expatriate Regime (Article 93 LIRPF), qualifying remote employees and directors pay a flat 24% on work income up to €600,000 while foreign dividends/capital gains remain exempt.',
        complianceNotes: [
            'Stay ≥ 183 days in a calendar year triggers statutory Spanish tax residency.',
            'Requires Form 149 election within 6 months of Social Security / UGE-CE registration.',
            'Zero-copay health insurance (Sin Copago) mandatory for visa renewal.'
        ]
    },
    {
        id: 'portugal-d8',
        country: 'Portugal',
        flag: '🇵🇹',
        regimeName: 'D8 Digital Nomad Visa & IFICI (NHR 2.0 Innovation Regime)',
        taxSystemType: '20% Flat IFICI or Simplified Freelance Coefficient (0.75)',
        residencyTriggerDays: 183,
        dnvForeignExemptUnder183: true,
        foreignEmploymentRate: 0.20,
        foreignFreelanceRate: 0.165, // Effective rate under Simplified Regime (75% taxable base + 1st-yr 50% discount)
        foreignDividendsRate: 0.0,
        localSourceRate: 0.23,
        socialSecurityAnnualUSD: 3600, // 12-month initial Social Security exemption available for new Recibos Verdes
        treatyNetwork: '80+ Double Taxation Agreements · EU Social Security Coordination',
        mobilitySummary:
            'Portugal’s IFICI (NHR 2.0) offers a 20% flat tax on qualifying high-value tech/research roles, while independent contractors on the Simplified Regime enjoy a 50% taxable-base reduction in Year 1.',
        complianceNotes: [
            'D8 Temporary Stay Visa (<12 months) allows non-habitual stay if tax home remains abroad.',
            '183+ days or maintaining a habitual abode triggers Portuguese IRS residency.',
            'First 12 months of independent activity (Recibos Verdes) are exempt from Segurança Social.'
        ]
    },
    {
        id: 'indonesia-e33g',
        country: 'Indonesia (Bali)',
        flag: '🇮🇩',
        regimeName: 'E33G Remote Worker KITAS (Foreign-Source Income Exemption)',
        taxSystemType: 'Territorial / Foreign-Source Exempt on E33G Visa',
        residencyTriggerDays: 183,
        dnvForeignExemptUnder183: true,
        foreignEmploymentRate: 0.0, // Exempt if paid by foreign employer into offshore account under E33G/LPP
        foreignFreelanceRate: 0.0,
        foreignDividendsRate: 0.0,
        localSourceRate: 0.20, // Prohibited on E33G; local sourcing triggers standard PPh 21/26
        socialSecurityAnnualUSD: 0,
        treatyNetwork: '70+ Tax Treaties · Foreign-Source Territorial Relief for Specialized Expats',
        mobilitySummary:
            'Holders of the E33G Remote Worker KITAS earning ≥$60,000/yr from a company outside Indonesia are exempt from Indonesian income tax on foreign-sourced remuneration for up to 4 years if meeting territorial criteria.',
        complianceNotes: [
            'Income must originate strictly from an entity registered outside Indonesia.',
            'Selling goods or services to Indonesian citizens or local PT PMA entities is prohibited on E33G.',
            'Crossing 183 days without territorial certificate requires NPWP tax reporting.'
        ]
    },
    {
        id: 'thailand-ltr',
        country: 'Thailand',
        flag: '🇹🇭',
        regimeName: 'DTV (Destination Thailand Visa) & LTR Work-From-Thailand',
        taxSystemType: 'Remittance-Based (<180 Days Tax-Free · LTR 0% Foreign Exempt)',
        residencyTriggerDays: 180,
        dnvForeignExemptUnder183: true,
        foreignEmploymentRate: 0.0, // LTR Work-From-Thailand is 0% on foreign income; <180 days is 0%
        foreignFreelanceRate: 0.08, // Estimated effective remitted portion if staying ≥180 days on DTV
        foreignDividendsRate: 0.05,
        localSourceRate: 0.17,
        socialSecurityAnnualUSD: 0,
        treatyNetwork: '61 Double Taxation Treaties (Foreign Tax Credit eligible)',
        mobilitySummary:
            'Thailand triggers tax residency at 180+ days per calendar year. Staying ≤179 days results in 0% Thai tax on foreign income; LTR Work-From-Thailand visa holders receive a statutory 100% foreign-income exemption even above 180 days.',
        complianceNotes: [
            'Note the 180-day threshold (shorter than the standard 183-day rule).',
            'For tax residents (180+ days on non-LTR visas), foreign income remitted into Thailand is assessable.',
            'Keep foreign savings in a separate offshore account from current-year earnings.'
        ]
    },
    {
        id: 'uae-dubai',
        country: 'United Arab Emirates (Dubai)',
        flag: '🇦🇪',
        regimeName: 'Virtual Working Programme & UAE Tax Residency Certificate (TRC)',
        taxSystemType: 'Zero Personal Income Tax (0% Federal PIT)',
        residencyTriggerDays: 90, // 90 days for TRC with long-term lease/residence visa, 183 days statutory
        dnvForeignExemptUnder183: true,
        foreignEmploymentRate: 0.0,
        foreignFreelanceRate: 0.0, // 0% personal tax; 9% corporate tax only on business profit > AED 375,000 (~$102k) after Free Zone/Small Business Relief
        foreignDividendsRate: 0.0,
        localSourceRate: 0.0,
        socialSecurityAnnualUSD: 0,
        treatyNetwork: '135+ Double Taxation Treaties · 90/183-Day TRC Issuance',
        mobilitySummary:
            'The UAE levies 0% personal income tax on employment, remote salaries, and personal investment dividends. Freelancers and founders can obtain a formal Tax Residency Certificate (TRC) with 90–183 days of presence.',
        complianceNotes: [
            '0% Personal Income Tax on remote employment and capital gains.',
            'Small Business Relief (0% Corporate Tax) applies to freelancer revenue under AED 3,000,000 (~$816k) through 2026.',
            'TRC can be issued at 90 days if holding a valid Emirates ID and Ejari lease.'
        ]
    },
    {
        id: 'colombia-dnv',
        country: 'Colombia',
        flag: '🇨🇴',
        regimeName: 'Visa V Nómadas Digitales (2-Year Remote Worker Visa)',
        taxSystemType: 'Foreign-Source Exempt (<183 Days) · Worldwide Progressive (≥183 Days)',
        residencyTriggerDays: 183,
        dnvForeignExemptUnder183: true,
        foreignEmploymentRate: 0.19,
        foreignFreelanceRate: 0.18,
        foreignDividendsRate: 0.15,
        localSourceRate: 0.22,
        socialSecurityAnnualUSD: 2400,
        treatyNetwork: '20+ Tax Treaties (Spain, UK, Canada, Japan, Mexico, Chile)',
        mobilitySummary:
            'Digital nomads staying under 183 cumulative days within any rolling 365-day window are non-residents and pay 0% Colombian income tax on foreign-sourced remote income.',
        complianceNotes: [
            'Colombia counts 183 days across any rolling 365-day period (not just Jan 1 – Dec 31).',
            'Crossing 183 days triggers worldwide income reporting (Declaración de Renta) to DIAN.',
            'Keep entry/exit Migración Colombia stamps logged in the rolling day tracker.'
        ]
    },
    {
        id: 'japan-dnv',
        country: 'Japan',
        flag: '🇯🇵',
        regimeName: 'Designated Activities (6-Month Digital Nomad Visa)',
        taxSystemType: 'Non-Resident Foreign-Source Exempt (<183 Days w/ Tax Treaty)',
        residencyTriggerDays: 183,
        dnvForeignExemptUnder183: true,
        foreignEmploymentRate: 0.2042, // Standard 20.42% non-resident rate if treaty relief not claimed or >183d
        foreignFreelanceRate: 0.2042,
        foreignDividendsRate: 0.1531,
        localSourceRate: 0.2042,
        socialSecurityAnnualUSD: 0,
        treatyNetwork: '80+ Tax Treaties (183-Day Short-Term Visitor Exemption)',
        mobilitySummary:
            'Japan’s 6-month Digital Nomad Visa caps stays at 180 days (non-renewable back-to-back), allowing citizens of treaty countries paid by a foreign employer to remain exempt from Japanese income tax.',
        complianceNotes: [
            'Requires citizenship in one of ~50 visa-waiver + tax-treaty partner nations.',
            'Minimum annual income requirement: ¥10,000,000 JPY (~$68,000 USD).',
            'Remuneration must be paid by an employer or client base outside Japan.'
        ]
    }
];

const INCOME_SOURCES = [
    {
        id: 'foreign-employment',
        label: 'Remote W-2 / Foreign Employer Salary (Offshore Payroll)'
    },
    {
        id: 'foreign-freelance',
        label: 'Independent Contractor / B2B SaaS & Creator Clients (Foreign)'
    },
    {
        id: 'foreign-dividends',
        label: 'Foreign Corporation Dividends, Royalties & Capital Gains'
    },
    {
        id: 'local-source',
        label: 'Local-Source Income (Clients Inside Host Country)'
    }
];

const CITIZENSHIP_RULES = [
    {
        id: 'non-us',
        label: 'Non-US Citizen (Territorial / Residence-Based Home Tax)',
        feieLimit: 0
    },
    {
        id: 'us-feie',
        label: 'US Citizen / Green Card — Qualifying for FEIE ($130,000 Exclusion · 330 Days Abroad)',
        feieLimit: 130000
    },
    {
        id: 'us-standard',
        label: 'US Citizen — Worldwide Tax Credit (FTC Form 1116 · <330 Days Abroad)',
        feieLimit: 0
    }
];

const TaxComplianceCalculator = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    // Primary Calculator Inputs
    const [selectedJurisdictionId, setSelectedJurisdictionId] = useState('spain-dnv');
    const [annualIncomeUSD, setAnnualIncomeUSD] = useState(135000);
    const [incomeSource, setIncomeSource] = useState('foreign-freelance');
    const [daysInHostCountry, setDaysInHostCountry] = useState(145);
    const [citizenshipMode, setCitizenshipMode] = useState('non-us');

    // Multi-Country 183-Day Rolling Stay Tracker (Right Rail Tool)
    const [countryStays, setCountryStays] = useState([
        { id: 'st-1', country: 'Portugal (D8 / Schengen)', days: 110, limit: 183 },
        { id: 'st-2', country: 'Japan (6-Mo Nomad Visa)', days: 90, limit: 180 },
        { id: 'st-3', country: 'Indonesia (Bali E33G)', days: 85, limit: 183 },
        { id: 'st-4', country: 'Colombia (Medellín V-Visa)', days: 60, limit: 183 }
    ]);
    const [newStayCountry, setNewStayCountry] = useState('');
    const [newStayDays, setNewStayDays] = useState(45);

    const activeJurisdiction = useMemo(
        () => TAX_JURISDICTIONS.find((j) => j.id === selectedJurisdictionId) || TAX_JURISDICTIONS[0],
        [selectedJurisdictionId]
    );

    /**
     * Core Global Mobility Tax Liability Engine
     * Computes estimated host-country tax, social security, citizenship residual tax (e.g. US FEIE/FTC),
     * and compares all 7 nomad hubs side-by-side.
     */
    const evaluateJurisdictionLiability = (jurisdiction, income, source, days, citizenship) => {
        const isTaxResidentByDays = days >= jurisdiction.residencyTriggerDays;

        // 1. Determine base host country tax rate
        let baseRate = 0;
        if (source === 'local-source') {
            baseRate = jurisdiction.localSourceRate;
        } else if (!isTaxResidentByDays && jurisdiction.dnvForeignExemptUnder183) {
            // Under threshold in a territorial/short-stay exempt jurisdiction
            baseRate = 0;
        } else {
            if (source === 'foreign-employment') baseRate = jurisdiction.foreignEmploymentRate;
            else if (source === 'foreign-freelance') baseRate = jurisdiction.foreignFreelanceRate;
            else if (source === 'foreign-dividends') baseRate = jurisdiction.foreignDividendsRate;
        }

        const hostIncomeTax = Math.round(income * baseRate);
        const socialSecurity =
            isTaxResidentByDays || !jurisdiction.dnvForeignExemptUnder183
                ? jurisdiction.socialSecurityAnnualUSD
                : 0;

        // 2. Citizenship Residual Tax (e.g., US Citizenship-Based Taxation)
        let citizenshipResidualTax = 0;
        if (citizenship === 'us-feie') {
            const taxableAboveFeie = Math.max(0, income - 130000);
            const grossUsTax = Math.round(taxableAboveFeie * 0.24);
            const selfEmploymentUs = source === 'foreign-freelance' ? Math.round(Math.min(income, 168600) * 0.141) : 0;
            citizenshipResidualTax = Math.max(0, grossUsTax - hostIncomeTax) + selfEmploymentUs;
        } else if (citizenship === 'us-standard') {
            const estimatedUsEffective = Math.round(income * 0.21);
            // Foreign Tax Credit offsets US tax dollar-for-dollar up to US liability
            citizenshipResidualTax = Math.max(0, estimatedUsEffective - hostIncomeTax);
        }

        const totalEstimatedLiability = hostIncomeTax + socialSecurity + citizenshipResidualTax;
        const effectiveRatePct = income > 0 ? ((totalEstimatedLiability / income) * 100).toFixed(1) : '0.0';
        const netTakeHome = Math.max(0, income - totalEstimatedLiability);

        let residencyStatusLabel = 'Non-Resident (< Threshold)';
        if (isTaxResidentByDays) {
            residencyStatusLabel = `Statutory Tax Resident (≥${jurisdiction.residencyTriggerDays}d)`;
        } else if (!jurisdiction.dnvForeignExemptUnder183) {
            residencyStatusLabel = 'Special Regime Election';
        }

        return {
            hostIncomeTax,
            socialSecurity,
            citizenshipResidualTax,
            totalEstimatedLiability,
            effectiveRatePct: Number(effectiveRatePct),
            netTakeHome,
            isTaxResidentByDays,
            residencyStatusLabel
        };
    };

    const activeCalculation = useMemo(
        () =>
            evaluateJurisdictionLiability(
                activeJurisdiction,
                annualIncomeUSD,
                incomeSource,
                daysInHostCountry,
                citizenshipMode
            ),
        [activeJurisdiction, annualIncomeUSD, incomeSource, daysInHostCountry, citizenshipMode]
    );

    const allJurisdictionsComparison = useMemo(
        () =>
            TAX_JURISDICTIONS.map((j) => ({
                ...j,
                calc: evaluateJurisdictionLiability(
                    j,
                    annualIncomeUSD,
                    incomeSource,
                    daysInHostCountry,
                    citizenshipMode
                )
            })),
        [annualIncomeUSD, incomeSource, daysInHostCountry, citizenshipMode]
    );

    const handleAddStayCorridor = (e) => {
        e.preventDefault();
        if (!newStayCountry.trim()) return;
        const item = {
            id: `st-${Date.now()}`,
            country: newStayCountry.trim(),
            days: Number(newStayDays) || 45,
            limit: 183
        };
        setCountryStays((prev) => [...prev, item]);
        setNewStayCountry('');
        addToast(`Added ${item.country} (${item.days} days) to 183-Day Threshold Tracker`, 'success');
    };

    const handleUpdateStayDays = (id, nextDays) => {
        setCountryStays((prev) =>
            prev.map((s) => (s.id === id ? { ...s, days: Number(nextDays) } : s))
        );
    };

    const handleRemoveStay = (id) => {
        setCountryStays((prev) => prev.filter((s) => s.id !== id));
    };

    const handleExportTaxBrief = () => {
        const report = {
            generatedAt: new Date().toISOString(),
            engine: 'SeeNomad FiscalCompass™ Global Mobility Tax Estimator (2026)',
            disclaimer:
                'High-level informational estimate based on OECD/statutory mobility thresholds. Consult a certified cross-border CPA or local SeeNomad Tax Guardian before filing.',
            inputs: {
                annualIncomeUSD,
                incomeSource,
                daysInHostCountry,
                citizenshipMode,
                selectedJurisdiction: activeJurisdiction.country,
                regime: activeJurisdiction.regimeName
            },
            estimates: activeCalculation,
            rollingPresenceLog: countryStays
        };
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `seenomad-tax-compliance-${activeJurisdiction.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
        addToast(
            `Exported Tax & Compliance Dossier for ${activeJurisdiction.country} (${activeCalculation.effectiveRatePct}% Est. Effective Rate)`,
            'success'
        );
    };

    const totalTrackedDays = countryStays.reduce((acc, s) => acc + s.days, 0);

    return (
        <div className="tax-hub-shell">
            {/* 1. Editorial Hero Banner */}
            <header className="tax-hero-banner">
                <div className="tax-hero-top">
                    <div>
                        <span className="tax-kicker">
                            <Scale size={13} />
                            SeeNomad FiscalCompass™ · Global Mobility Tax & 183-Day Compliance Engine
                        </span>
                        <h1 className="tax-title">
                            Digital Nomad Tax & Residency Compliance Calculator
                        </h1>
                        <p className="tax-subtitle">
                            Model high-level tax liabilities across 2026 Digital Nomad Visa regimes, territorial systems, and OECD 183-day physical presence thresholds based on your citizenship, days in country, and source of income.
                        </p>
                    </div>

                    <div className="tax-hero-actions">
                        <button
                            type="button"
                            className="tax-btn tax-btn-primary"
                            onClick={handleExportTaxBrief}
                        >
                            <Download size={15} />
                            Export CPA Tax Brief (JSON)
                        </button>
                        <button
                            type="button"
                            className="tax-btn"
                            onClick={() => navigate('/explore/guardians?specialty=visa-legal')}
                        >
                            <UserCheck size={14} />
                            Book Local Tax & NIF Fixer
                        </button>
                        <button
                            type="button"
                            className="tax-btn"
                            onClick={() => navigate('/explore/visa')}
                        >
                            <Landmark size={14} />
                            2026 Visa Rules
                        </button>
                    </div>
                </div>

                {/* Unboxed Telemetry Strip */}
                <div className="tax-kpi-row">
                    <div className="tax-kpi-metrics">
                        <span>
                            Active Jurisdiction: <strong>{activeJurisdiction.flag} {activeJurisdiction.country}</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Residency Trigger: <strong>{activeJurisdiction.residencyTriggerDays} Days</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Your Status ({daysInHostCountry}d):{' '}
                            <strong style={{ color: activeCalculation.isTaxResidentByDays ? '#f59e0b' : '#10b981' }}>
                                {activeCalculation.residencyStatusLabel}
                            </strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Data Reference: <strong>OECD Model Tax Convention & 2026 DNV Statutes</strong>
                        </span>
                    </div>
                </div>
            </header>

            {/* 2. Interactive Residency & Source-of-Income Input Studio */}
            <section className="tax-calculator-panel" aria-label="Tax and residency input parameters">
                <div className="tax-controls-grid">
                    <label className="tax-field-label">
                        <span>Primary Host Jurisdiction & Regime</span>
                        <select
                            className="tax-select"
                            value={selectedJurisdictionId}
                            onChange={(e) => setSelectedJurisdictionId(e.target.value)}
                        >
                            {TAX_JURISDICTIONS.map((j) => (
                                <option key={j.id} value={j.id}>
                                    {j.flag} {j.country} — {j.regimeName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="tax-field-label">
                        <span>Annual Gross Income: ${annualIncomeUSD.toLocaleString()} USD</span>
                        <input
                            type="range"
                            min="30000"
                            max="400000"
                            step="5000"
                            value={annualIncomeUSD}
                            onChange={(e) => setAnnualIncomeUSD(Number(e.target.value))}
                        />
                    </label>

                    <label className="tax-field-label">
                        <span>Primary Source of Income</span>
                        <select
                            className="tax-select"
                            value={incomeSource}
                            onChange={(e) => setIncomeSource(e.target.value)}
                        >
                            {INCOME_SOURCES.map((src) => (
                                <option key={src.id} value={src.id}>
                                    {src.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="tax-field-label">
                        <span>
                            Days Spent in {activeJurisdiction.country}: {daysInHostCountry} Days / yr
                        </span>
                        <input
                            type="range"
                            min="15"
                            max="365"
                            step="5"
                            value={daysInHostCountry}
                            onChange={(e) => setDaysInHostCountry(Number(e.target.value))}
                        />
                    </label>

                    <label className="tax-field-label">
                        <span>Citizenship & Home Tax Nexus</span>
                        <select
                            className="tax-select"
                            value={citizenshipMode}
                            onChange={(e) => setCitizenshipMode(e.target.value)}
                        >
                            {CITIZENSHIP_RULES.map((cit) => (
                                <option key={cit.id} value={cit.id}>
                                    {cit.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* 3. 4-Card Executive Liability Output */}
                <div className="tax-summary-strip">
                    <div className="tax-metric-card">
                        <span className="tax-metric-label">Estimated Total Tax Liability</span>
                        <span className="tax-metric-value" style={{ color: '#38bdf8' }}>
                            ${activeCalculation.totalEstimatedLiability.toLocaleString()}
                        </span>
                        <span className="tax-metric-sub">
                            Host Tax: ${activeCalculation.hostIncomeTax.toLocaleString()} · Social Sec: $
                            {activeCalculation.socialSecurity.toLocaleString()}
                            {activeCalculation.citizenshipResidualTax > 0
                                ? ` · US Residual: $${activeCalculation.citizenshipResidualTax.toLocaleString()}`
                                : ''}
                        </span>
                    </div>

                    <div className="tax-metric-card">
                        <span className="tax-metric-label">Effective Global Tax Rate</span>
                        <span
                            className="tax-metric-value"
                            style={{
                                color:
                                    activeCalculation.effectiveRatePct <= 10
                                        ? '#10b981'
                                        : activeCalculation.effectiveRatePct <= 22
                                        ? '#38bdf8'
                                        : '#f59e0b'
                            }}
                        >
                            {activeCalculation.effectiveRatePct}%
                        </span>
                        <span className="tax-metric-sub">{activeJurisdiction.taxSystemType}</span>
                    </div>

                    <div className="tax-metric-card">
                        <span className="tax-metric-label">Estimated Net Take-Home Pay</span>
                        <span className="tax-metric-value" style={{ color: '#10b981' }}>
                            ${activeCalculation.netTakeHome.toLocaleString()}
                        </span>
                        <span className="tax-metric-sub">
                            ${Math.round(activeCalculation.netTakeHome / 12).toLocaleString()} / month net liquidity
                        </span>
                    </div>

                    <div className="tax-metric-card">
                        <span className="tax-metric-label">Physical Presence Threshold</span>
                        <span
                            className="tax-metric-value"
                            style={{
                                color: activeCalculation.isTaxResidentByDays ? '#f59e0b' : '#10b981',
                                fontSize: '1.15rem'
                            }}
                        >
                            {daysInHostCountry} / {activeJurisdiction.residencyTriggerDays} Days
                        </span>
                        <span className="tax-metric-sub">
                            {activeCalculation.isTaxResidentByDays
                                ? `Triggers ${activeJurisdiction.country} tax residency (+${
                                      daysInHostCountry - activeJurisdiction.residencyTriggerDays
                                  }d over)`
                                : `${
                                      activeJurisdiction.residencyTriggerDays - daysInHostCountry
                                  } buffer days remaining before statutory residency`}
                        </span>
                    </div>
                </div>
            </section>

            {/* 4. Main Split Workspace: Side-by-Side Jurisdiction Matrix + 183-Day Rolling Tracker */}
            <div className="tax-workspace-layout">
                {/* Left Column: Multi-Country Nomad Regime Comparison */}
                <section className="tax-jurisdiction-list" aria-label="Global nomad tax jurisdictions comparison">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                            Global Mobility Tax Regime Comparison (${annualIncomeUSD.toLocaleString()} · {daysInHostCountry} Days)
                        </h2>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            Click any country below to inspect its statutory compliance rules & treaty network
                        </span>
                    </div>

                    {allJurisdictionsComparison.map((item) => {
                        const isSelected = item.id === selectedJurisdictionId;
                        const barWidth = Math.min(100, Math.max(4, item.calc.effectiveRatePct * 2.5));

                        return (
                            <article
                                key={item.id}
                                className={`tax-jurisdiction-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedJurisdictionId(item.id)}
                            >
                                <div className="tax-j-top">
                                    <div>
                                        <h3 className="tax-j-title">
                                            {item.flag} {item.country} · {item.regimeName}
                                        </h3>
                                        <div className="tax-meta-strip" style={{ marginTop: '0.2rem' }}>
                                            <span>{item.taxSystemType}</span>
                                            <span aria-hidden="true">·</span>
                                            <span>Trigger: {item.residencyTriggerDays} Days</span>
                                            <span aria-hidden="true">·</span>
                                            <span>{item.treatyNetwork}</span>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#38bdf8' }}>
                                            ${item.calc.totalEstimatedLiability.toLocaleString()} est. tax (
                                            {item.calc.effectiveRatePct}%)
                                        </div>
                                        <div style={{ fontSize: '0.73rem', color: '#10b981', fontWeight: 700 }}>
                                            Net Take-Home: ${item.calc.netTakeHome.toLocaleString()}/yr
                                        </div>
                                    </div>
                                </div>

                                <div className="tax-bar-track">
                                    <div
                                        className="tax-bar-fill"
                                        style={{
                                            width: `${barWidth}%`,
                                            background:
                                                item.calc.effectiveRatePct <= 8
                                                    ? '#10b981'
                                                    : item.calc.effectiveRatePct <= 22
                                                    ? '#38bdf8'
                                                    : '#f59e0b'
                                        }}
                                    />
                                </div>

                                <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.48 }}>
                                    {item.mobilitySummary}
                                </p>

                                {isSelected && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.35rem',
                                            padding: '0.75rem 0.9rem',
                                            borderRadius: 10,
                                            background: 'rgba(30, 41, 59, 0.6)',
                                            border: '1px solid rgba(56, 189, 248, 0.25)',
                                            fontSize: '0.74rem'
                                        }}
                                    >
                                        <strong style={{ color: '#38bdf8' }}>
                                            Key Mobility & Source-of-Income Compliance Rules ({item.country}):
                                        </strong>
                                        {item.complianceNotes.map((note, idx) => (
                                            <div key={idx} style={{ color: '#e2e8f0' }}>
                                                • {note}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </section>

                {/* Right Column: Multi-Country 183-Day Threshold Tracker & Advisory Notice */}
                <aside className="tax-side-rail" aria-label="183-Day Physical Presence Tracker">
                    <div className="tax-side-panel">
                        <div className="tax-side-title">
                            <span>
                                <Calculator
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Multi-Country 183-Day Presence Log
                            </span>
                            <span
                                style={{
                                    fontSize: '0.7rem',
                                    color: totalTrackedDays > 365 ? '#f59e0b' : '#10b981',
                                    fontWeight: 700
                                }}
                            >
                                {totalTrackedDays} / 365d
                            </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.73rem', color: '#94a3b8', lineHeight: 1.42 }}>
                            Allocate your annual travel days across hubs to ensure you do not accidentally breach statutory 180/183-day tax residency thresholds.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                            {countryStays.map((s) => {
                                const overLimit = s.days >= s.limit;
                                const pct = Math.min(100, Math.round((s.days / s.limit) * 100));
                                return (
                                    <div key={s.id} className="tax-stay-row">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong>{s.country}</strong>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <span
                                                    style={{
                                                        fontWeight: 700,
                                                        color: overLimit ? '#ef4444' : '#10b981'
                                                    }}
                                                >
                                                    {s.days} / {s.limit}d
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveStay(s.id)}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: '#94a3b8',
                                                        cursor: 'pointer',
                                                        padding: 0
                                                    }}
                                                    aria-label="Remove country stay"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>

                                        <input
                                            type="range"
                                            min="5"
                                            max="240"
                                            step="5"
                                            value={s.days}
                                            onChange={(e) => handleUpdateStayDays(s.id, e.target.value)}
                                        />

                                        <div className="tax-bar-track">
                                            <div
                                                className="tax-bar-fill"
                                                style={{
                                                    width: `${pct}%`,
                                                    background: overLimit
                                                        ? '#ef4444'
                                                        : pct > 80
                                                        ? '#f59e0b'
                                                        : '#10b981'
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <form onSubmit={handleAddStayCorridor} style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <input
                                type="text"
                                className="tax-input"
                                style={{ flex: 1, minWidth: 130 }}
                                placeholder="Add country (e.g. Spain)..."
                                value={newStayCountry}
                                onChange={(e) => setNewStayCountry(e.target.value)}
                            />
                            <input
                                type="number"
                                min="1"
                                max="365"
                                className="tax-input"
                                style={{ width: 70 }}
                                value={newStayDays}
                                onChange={(e) => setNewStayDays(e.target.value)}
                                aria-label="Days in country"
                            />
                            <button type="submit" className="tax-btn">
                                <Plus size={13} /> Add
                            </button>
                        </form>
                    </div>

                    {/* Global Mobility Compliance Checklist & Disclaimer */}
                    <div className="tax-side-panel">
                        <h3 className="tax-side-title">
                            <span>
                                <ShieldCheck
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                OECD Tie-Breaker & PE Checklist
                            </span>
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.73rem', color: '#cbd5e1', lineHeight: 1.42 }}>
                            <div>
                                • <strong>Permanent Home & Center of Vital Interests:</strong> Even under 183 days, keeping an exclusive year-round lease can trigger tax nexus under OECD Article 4.
                            </div>
                            <div>
                                • <strong>Permanent Establishment (PE) Risk:</strong> Signing contracts on behalf of a foreign employer in-country may require an EOR (Deel/Remote) or DNV structure.
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.69rem', paddingTop: '0.35rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                <Info size={11} style={{ display: 'inline', marginRight: 4 }} />
                                High-level estimates for mobility planning only; does not constitute formal legal or CPA tax advice.
                            </div>
                        </div>

                        <button
                            type="button"
                            className="tax-btn tax-btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => navigate('/explore/planner')}
                        >
                            <GitBranch size={14} />
                            Sync Day Limits with Itinerary Builder
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TaxComplianceCalculator;
