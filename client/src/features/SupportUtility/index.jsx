import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Shield,
    ShieldCheck,
    Siren,
    Laptop,
    Stethoscope,
    Plane,
    FileCheck2,
    Zap,
    Search,
    Plus,
    CheckCircle2,
    GitBranch,
    X,
    SlidersHorizontal,
    Activity,
    PhoneCall,
    Download,
    Trash2
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import '../../styles/InsuranceHub.css';

const PROTECTION_TABS = [
    { id: 'all', label: 'All Protection Suites' },
    { id: 'parametric', label: 'Parametric Flight & Bag Auto-Pay' },
    { id: 'medical', label: 'Global Medical & Dengue/Surf Shield' },
    { id: 'hardware', label: 'Creator Tech & Laptop Vault' },
    { id: 'clinics', label: 'Cashless Direct-Pay Hospitals' },
    { id: 'visa-compliant', label: 'Schengen & DNV Visa Policies' },
    { id: 'active', label: 'My Active Shields' }
];

const PROTECTION_CATALOG = [
    {
        id: 'pol-1',
        title: 'AegisShield™ Global Nomad Medical, Dengue & Helicopter Evac',
        category: 'medical',
        visaCompliant: true,
        region: 'Global',
        flag: '🌍',
        underwriter: 'SeeNomad Aegis Syndicate · Lloyd’s Brussels & Tokyo Re',
        coverageCap: '$2,500,000 USD',
        deductible: '$0 Direct-Billing Deductible',
        claimSla: 'Instant Hospital Guarantee of Payment (GOP)',
        dailyRate: 2.15,
        monthlyRate: 62,
        xpReward: 750,
        desc: 'Zero-out-of-pocket inpatient/outpatient medical shield engineered for full-time nomads. Covers tropical dengue fever, scooter/motorbike accidents (with helmet), and 30m reef diving.',
        parametricRules: [
            'Cashless QR Check-In at 4,200+ JCI-accredited international hospitals',
            'Automatic $180 USD hydration & lab stipend upon positive Dengue NS1 test upload',
            'Includes €50,000+ Schengen & Spanish/Portuguese DNV consular compliance certificate'
        ]
    },
    {
        id: 'pol-2',
        title: 'ChronoFlight™ Parametric Delay, Missed Connection & Lost Bag Oracle',
        category: 'parametric',
        visaCompliant: false,
        region: 'Global',
        flag: '✈️',
        underwriter: 'SeeNomad Flight Telemetry Oracle · Zero Claim Forms',
        coverageCap: '$1,500 USD Instant USDC / Bank Push',
        deductible: '$0 Deductible · Automated PNR Trigger',
        claimSla: '48 Seconds after Airline Gate Telemetry',
        dailyRate: 0.95,
        monthlyRate: 26,
        xpReward: 500,
        desc: 'Never fill out a PDF claim form again. Our flight oracle monitors your PNR in real time and pushes instant cash to your wallet the moment your flight is delayed 2+ hours.',
        parametricRules: [
            'Flight delayed ≥ 120 mins: Automatic $140 USD lounge & dining payout',
            'Flight cancelled or missed connection: Automatic $420 USD hotel & rebooking credit',
            'Checked bag delayed ≥ 12 hours via AirTag/SITA scan: Automatic $350 USD gear advance'
        ]
    },
    {
        id: 'pol-3',
        title: 'CreatorRig™ MacBook, Mirrorless Camera & Starlink Theft/Liquid Vault',
        category: 'hardware',
        visaCompliant: false,
        region: 'Global',
        flag: '💻',
        underwriter: 'SeeNomad Hardware Underwriting · Apple & Sony Authorized',
        coverageCap: '$12,000 USD Replacement Value',
        deductible: '$50 Flat Deductible',
        claimSla: 'Same-Day Local Apple/Sony Store Voucher or Rental Loaner',
        dailyRate: 1.65,
        monthlyRate: 48,
        xpReward: 650,
        desc: 'Protects your remote-work livelihood against cafe snatch-theft, coworking voltage surges, tropical humidity corrosion, and airline cabin-bin crushing.',
        parametricRules: [
            'Covers laptops, cameras, lenses, drones, portable monitors & Starlink Mini dishes',
            'Reimburses $85/day for an emergency M3 MacBook rental within 4 hours of police report',
            'Zero depreciation penalty on gear under 36 months old'
        ]
    },
    {
        id: 'pol-4',
        title: 'EuroNomad™ Schengen & D8/UGE-CE Consular Visa Health Certificate Plan',
        category: 'visa-compliant',
        visaCompliant: true,
        region: 'Europe',
        flag: '🇪🇺',
        underwriter: 'Allianz Partners EU & SeeNomad Consular Desk',
        coverageCap: '€1,000,000 EUR Unlimited Repatriation',
        deductible: '€0 Co-Pay (Mandatory for Spain UGE-CE)',
        claimSla: 'Instant Bilingual PDF Consular Certificate',
        dailyRate: 1.85,
        monthlyRate: 54,
        xpReward: 600,
        desc: 'Specifically structured to pass strict Spanish Digital Nomad Visa (Sin Copago / Sin Carencia) and Portuguese D8 consular audits on the first submission.',
        parametricRules: [
            'Zero waiting period (Sin Carencia) & zero co-payments (Sin Copago)',
            'Includes 100% medical repatriation & dental emergency coverage across 29 Schengen states',
            '100% pro-rata refund guarantee if visa application is ever declined'
        ]
    },
    {
        id: 'pol-5',
        title: 'BIMC Bali, Siloam & Bangkok Hospital Cashless Direct-Pay Pass',
        category: 'clinics',
        visaCompliant: true,
        region: 'Asia-Pacific',
        flag: '🇮🇩',
        underwriter: 'APAC Direct Hospital Network · 24/7 English Triage',
        coverageCap: '$1,000,000 USD Direct Settlement',
        deductible: '$0 Out-of-Pocket at Partner Desks',
        claimSla: 'Walk-In QR Verification (<90 Seconds)',
        dailyRate: 1.55,
        monthlyRate: 44,
        xpReward: 550,
        desc: 'Show your SeeNomad QR code at BIMC Canggu/Nusa Dua, Samitivej Bangkok, or St. Luke’s Tokyo—the hospital bills SeeNomad directly with zero credit card hold.',
        parametricRules: [
            'Includes 24/7 English-speaking doctor villa callout in Canggu, Ubud & Uluwatu',
            'Covers surf reef lacerations, decompression chamber therapy & rabies PEP vaccines',
            'Direct integration with local SeeNomad Guardians for hospital escort & translation'
        ]
    },
    {
        id: 'pol-6',
        title: 'Andean & LatAm Altitude, Rental Car CDW & Express Kidnap/Express ATM Shield',
        category: 'medical',
        visaCompliant: true,
        region: 'Americas',
        flag: '🇨🇴',
        underwriter: 'SeeNomad LatAm Crisis & Sura International Network',
        coverageCap: '$1,500,000 USD + $40,000 Rental CDW',
        deductible: '$0 Medical · $0 ATM Coercion Protection',
        claimSla: '4-Minute WhatsApp SOS Triage',
        dailyRate: 1.75,
        monthlyRate: 51,
        xpReward: 600,
        desc: 'Complete protection across Colombia, Mexico, Peru, and Brazil: combines private hospital direct billing (Hospital Pablo Tobón Uribe / Ángeles) with phone/card coercion reimbursement.',
        parametricRules: [
            'Covers high-altitude pulmonary edema (Cusco/La Paz treks up to 5,500m)',
            'Reimburses forced ATM/Pix/crypto transfers up to $5,000 USD within 24 hours',
            'Primary $40,000 USD Collision Damage Waiver (CDW) for rental vehicles'
        ]
    }
];

const SupportUtility = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [activeTab, setActiveTab] = useState('all');
    const [activeRegion, setActiveRegion] = useState('All');
    const [billingCycle, setBillingCycle] = useState('daily'); // 'daily' | 'monthly'
    const [tripDays, setTripDays] = useState(18);
    const [searchQuery, setSearchQuery] = useState('');

    // Parametric Flight & Weather Auto-Claim Simulator (Right Rail Moat)
    const [simFlightDelayHrs, setSimFlightDelayHrs] = useState(3);
    const [simBagDelayHrs, setSimBagDelayHrs] = useState(14);

    // Consular Visa Certificate Drawer State
    const [showVisaCertDrawer, setShowVisaCertDrawer] = useState(false);
    const [certHolderName, setCertHolderName] = useState('Alex Mercer');
    const [certPassportNum, setCertPassportNum] = useState('N8492014');
    const [certTargetConsulate, setCertTargetConsulate] = useState('Spain UGE-CE Digital Nomad Visa (Sin Copago)');
    const [generatedCertCode, setGeneratedCertCode] = useState(null);

    // Hardware Vault Registered Gear
    const [gearItems, setGearItems] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_insured_gear');
            return raw
                ? JSON.parse(raw)
                : [
                      { id: 'g-1', name: 'MacBook Pro 16" M3 Max', serial: 'C02X9481Q6L', value: 3499 },
                      { id: 'g-2', name: 'Sony A7C II + 24-70mm GM II', serial: 'SN-8841209', value: 3850 }
                  ];
        } catch {
            return [];
        }
    });
    const [newGearName, setNewGearName] = useState('');
    const [newGearValue, setNewGearValue] = useState('1400');

    // Active Activated Policies
    const [activePolicies, setActivePolicies] = useState(() => {
        try {
            const raw = localStorage.getItem('seenomad_active_insurance');
            return raw
                ? JSON.parse(raw)
                : {
                      'pol-1': {
                          policyId: 'AEG-MED-7741',
                          mode: 'Flex Daily Pass (18 Days)',
                          totalPremium: 38.7,
                          activatedAt: '2026-10-08'
                      }
                  };
        } catch {
            return {};
        }
    });

    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [flightPnr, setFlightPnr] = useState('NH-842 / SQ-318');

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_insured_gear', JSON.stringify(gearItems));
        } catch {
            // ignore storage errors
        }
    }, [gearItems]);

    useEffect(() => {
        try {
            localStorage.setItem('seenomad_active_insurance', JSON.stringify(activePolicies));
        } catch {
            // ignore storage errors
        }
    }, [activePolicies]);

    // Sync URL query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);

    const handleAddGear = (e) => {
        e.preventDefault();
        if (!newGearName.trim()) return;
        const item = {
            id: `g-${Date.now()}`,
            name: newGearName.trim(),
            serial: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
            value: Number(newGearValue) || 1200
        };
        setGearItems((prev) => [item, ...prev]);
        setNewGearName('');
        addToast(`Locked "${item.name}" ($${item.value}) into CreatorRig™ Hardware Vault!`, 'success');
    };

    const handleRemoveGear = (id, name) => {
        setGearItems((prev) => prev.filter((g) => g.id !== id));
        addToast(`Removed "${name}" from Hardware Vault`, 'info');
    };

    const handleGenerateConsularCert = (e) => {
        e.preventDefault();
        const code = `CERT-EU-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        setGeneratedCertCode({
            code,
            holder: certHolderName,
            passport: certPassportNum,
            consulate: certTargetConsulate,
            issuedAt: new Date().toISOString().slice(0, 10)
        });
        addToast(
            `Generated Bilingual Consular Proof Certificate ${code} for ${certTargetConsulate}!`,
            'success'
        );
    };

    const handleActivatePolicy = (e) => {
        e.preventDefault();
        if (!selectedPolicy) return;

        const policyId = `AEG-${selectedPolicy.category.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const totalPremium =
            billingCycle === 'daily'
                ? Number((selectedPolicy.dailyRate * tripDays).toFixed(2))
                : selectedPolicy.monthlyRate;

        setActivePolicies((prev) => ({
            ...prev,
            [selectedPolicy.id]: {
                policyId,
                mode:
                    billingCycle === 'daily'
                        ? `Flex Daily Pass (${tripDays} Days)`
                        : 'Monthly Rolling Shield',
                totalPremium,
                pnr: flightPnr,
                activatedAt: '2026-10-08'
            }
        }));

        addToast(
            `Activated Shield ${policyId} ($${totalPremium})! Parametric Oracle & Cashless Hospital QR Live. +${selectedPolicy.xpReward} XP`,
            'success'
        );
        setSelectedPolicy(null);
    };

    const handlePauseOrCancelPolicy = (polId, title) => {
        setActivePolicies((prev) => {
            const copy = { ...prev };
            delete copy[polId];
            return copy;
        });
        addToast(`Paused "${title}" — unused daily coverage refunded to your wallet.`, 'info');
        setSelectedPolicy(null);
    };

    const handleTriggerSimulatedPayout = () => {
        const delayPayout = simFlightDelayHrs >= 2 ? 140 + (simFlightDelayHrs - 2) * 45 : 0;
        const bagPayout = simBagDelayHrs >= 12 ? 350 : 0;
        const total = delayPayout + bagPayout;
        if (total <= 0) {
            addToast('Increase flight delay (≥2h) or bag delay (≥12h) to trigger parametric payout.', 'info');
            return;
        }
        addToast(
            `Parametric Oracle Triggered: $${total} USD instant payout credited in 48 seconds (Zero forms)!`,
            'success'
        );
    };

    const filteredPolicies = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return PROTECTION_CATALOG.filter((pol) => {
            if (activeTab === 'active' && !activePolicies[pol.id]) return false;
            if (activeTab === 'visa-compliant' && !pol.visaCompliant) return false;
            if (
                activeTab !== 'all' &&
                activeTab !== 'active' &&
                activeTab !== 'visa-compliant' &&
                pol.category !== activeTab
            ) {
                return false;
            }
            if (activeRegion !== 'All' && pol.region !== 'Global' && pol.region !== activeRegion) {
                return false;
            }
            if (q) {
                const hay = `${pol.title} ${pol.desc} ${pol.underwriter} ${pol.parametricRules.join(' ')}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [activeTab, activeRegion, activePolicies, searchQuery]);

    // Parametric Simulator Payout Math
    const simFlightPayout = simFlightDelayHrs >= 2 ? 140 + (simFlightDelayHrs - 2) * 45 : 0;
    const simBagPayout = simBagDelayHrs >= 12 ? 350 : 0;
    const simTotalInstantPayout = simFlightPayout + simBagPayout;

    const totalGearValue = gearItems.reduce((acc, g) => acc + g.value, 0);
    const activeShieldsCount = Object.keys(activePolicies).length;

    return (
        <div className="ins-hub-shell">
            {/* 1. Editorial Hero Banner & Parametric Payout Telemetry */}
            <header className="ins-hero-banner">
                <div className="ins-hero-top">
                    <div>
                        <span className="ins-kicker">
                            <ShieldCheck size={13} />
                            SeeNomad AegisShield™ · Parametric Zero-Form Insurance & Cashless Hospital Network
                        </span>
                        <h1 className="ins-title">
                            Parametric Travel & Medical Insurance, Creator Tech Vault & Consular Visa Certificates
                        </h1>
                        <p className="ins-subtitle">
                            Legacy insurers make you wait 60 days and fill out 12-page PDF claims. AegisShield™ uses live flight/weather telemetry to push automatic payouts in 48 seconds, provides walk-in QR direct billing at 4,200+ hospitals, and generates instant Schengen/DNV consular proof letters.
                        </p>
                    </div>

                    <div className="ins-hero-actions">
                        <button
                            type="button"
                            className="ins-btn ins-btn-primary"
                            onClick={() => setShowVisaCertDrawer((prev) => !prev)}
                        >
                            <FileCheck2 size={15} />
                            {showVisaCertDrawer ? 'Close Visa Cert Studio' : 'Instant Consular Visa Letter'}
                        </button>
                        <button
                            type="button"
                            className="ins-btn"
                            onClick={() => navigate('/explore/guardians')}
                        >
                            <PhoneCall size={14} />
                            24/7 Local Fixer Escort
                        </button>
                        <button
                            type="button"
                            className="ins-btn ins-btn-danger"
                            onClick={() =>
                                addToast(
                                    'SOS MedEvac & Local Hospital Triage Beacon armed! English-speaking doctor & local Guardian notified.',
                                    'info'
                                )
                            }
                        >
                            <Siren size={14} />
                            1-Tap MedEvac SOS
                        </button>
                    </div>
                </div>

                {/* Unboxed Telemetry & Region Switcher */}
                <div className="ins-kpi-row">
                    <div className="ins-kpi-metrics">
                        <span>
                            Parametric Payout SLA: <strong>48 Seconds (0 Claim Forms)</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Cashless Direct-Bill Clinics: <strong>4,200+ Global Hospitals</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Insured Tech Vault: <strong>${totalGearValue.toLocaleString()} Covered</strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                            Active Shields: <strong>{activeShieldsCount} Live</strong>
                        </span>
                    </div>

                    <div className="ins-region-switcher" role="group" aria-label="Filter by Corridor">
                        {['All', 'Europe', 'Asia-Pacific', 'Americas'].map((reg) => (
                            <button
                                key={reg}
                                type="button"
                                className={`ins-region-btn ${activeRegion === reg ? 'active' : ''}`}
                                onClick={() => setActiveRegion(reg)}
                            >
                                {reg === 'All' ? '🌍 Worldwide Coverage' : reg}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* 2. Instant Consular Visa Proof Letter Generator Drawer */}
            {showVisaCertDrawer && (
                <form className="ins-drawer" onSubmit={handleGenerateConsularCert}>
                    <div className="ins-drawer-header">
                        <strong style={{ fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <FileCheck2 size={15} color="#38bdf8" />
                            Generate Official Consular & Embassy Insurance Proof Certificate (Schengen / DNV)
                        </strong>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            Meets €30,000+ repatriation, Sin Copago (Spain UGE-CE), and Thailand/Bali DNV mandates
                        </span>
                    </div>

                    <div className="ins-form-grid">
                        <label className="ins-field-label">
                            <span>Full Passport Name</span>
                            <input
                                type="text"
                                className="ins-input"
                                value={certHolderName}
                                onChange={(e) => setCertHolderName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="ins-field-label">
                            <span>Passport Number</span>
                            <input
                                type="text"
                                className="ins-input"
                                value={certPassportNum}
                                onChange={(e) => setCertPassportNum(e.target.value)}
                                required
                            />
                        </label>

                        <label className="ins-field-label">
                            <span>Target Embassy / Visa Program</span>
                            <select
                                className="ins-select"
                                value={certTargetConsulate}
                                onChange={(e) => setCertTargetConsulate(e.target.value)}
                            >
                                <option value="Spain UGE-CE Digital Nomad Visa (Sin Copago)">
                                    Spain UGE-CE Digital Nomad Visa (Sin Copago / Sin Carencia)
                                </option>
                                <option value="Portugal D8 Digital Nomad & Schengen Consular Audit">
                                    Portugal D8 Digital Nomad & Schengen Consular Audit
                                </option>
                                <option value="Japan J-Skip / Designated Activities 6-Month Nomad Visa">
                                    Japan Designated Activities 6-Month Nomad Visa (¥10M+ Medical)
                                </option>
                                <option value="Indonesia E33G Remote Worker KITAS">
                                    Indonesia E33G Remote Worker KITAS
                                </option>
                            </select>
                        </label>

                        <button type="submit" className="ins-btn ins-btn-primary">
                            <Download size={14} />
                            Generate Verified Certificate
                        </button>
                    </div>

                    {generatedCertCode && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: 10,
                                background: 'rgba(16, 185, 129, 0.12)',
                                border: '1px solid rgba(16, 185, 129, 0.35)',
                                fontSize: '0.76rem'
                            }}
                        >
                            <div>
                                <strong style={{ color: '#10b981' }}>
                                    ✓ Consular Certificate {generatedCertCode.code} Ready
                                </strong>{' '}
                                · Holder: <strong>{generatedCertCode.holder}</strong> (Passport {generatedCertCode.passport}) · Program:{' '}
                                <strong>{generatedCertCode.consulate}</strong>
                            </div>
                            <button
                                type="button"
                                className="ins-btn"
                                onClick={() => navigate('/explore/visa')}
                            >
                                Attach to Visa Application
                            </button>
                        </div>
                    )}
                </form>
            )}

            {/* 3. Multi-Axis Protection & Flex-Pass Billing Toolbar */}
            <section className="ins-toolbar" aria-label="Filter insurance policies">
                <div className="ins-toolbar-row">
                    <div className="ins-tabs" role="tablist">
                        {PROTECTION_TABS.map((tab) => {
                            const count = tab.id === 'active' ? activeShieldsCount : null;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab.id}
                                    className={`ins-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                    {count !== null ? ` (${count})` : ''}
                                </button>
                            );
                        })}
                    </div>

                    <div className="ins-search-box">
                        <Search size={14} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Search dengue, MacBook theft, flight delay, Schengen, BIMC Bali..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search insurance policies"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                                aria-label="Clear search"
                            >
                                <X size={13} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="ins-toolbar-row">
                    <div className="ins-meta-strip">
                        <span>
                            <strong>ChronoSync™ Flex-Pass Mode:</strong> Toggle between pay-per-day trip coverage (pause anytime when you fly home) or continuous monthly nomad shields.
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.73rem', color: '#94a3b8', fontWeight: 700 }}>
                            Trip Days: <strong>{tripDays}d</strong>
                        </span>
                        <input
                            type="range"
                            min="3"
                            max="90"
                            value={tripDays}
                            onChange={(e) => setTripDays(Number(e.target.value))}
                            style={{ width: 100 }}
                            aria-label="Trip duration in days"
                        />
                        <select
                            className="ins-select"
                            style={{ width: 'auto', padding: '0.32rem 0.65rem', fontSize: '0.73rem' }}
                            value={billingCycle}
                            onChange={(e) => setBillingCycle(e.target.value)}
                            aria-label="Billing cycle"
                        >
                            <option value="daily">Pay-Per-Day Flex Pass ({tripDays} Days)</option>
                            <option value="monthly">Rolling Monthly Subscription (Save 18%)</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* 4. Main Split Workspace: Protection Catalog + Parametric Auto-Claim Oracle & Tech Vault */}
            <div className="ins-workspace-layout">
                {/* Left Column: Protection Cards */}
                <section className="ins-grid" aria-label="Parametric and medical insurance plans">
                    {filteredPolicies.map((pol) => {
                        const activePol = activePolicies[pol.id];
                        const computedPrice =
                            billingCycle === 'daily'
                                ? (pol.dailyRate * tripDays).toFixed(2)
                                : pol.monthlyRate;

                        return (
                            <article key={pol.id} className="ins-card">
                                <div className="ins-card-body">
                                    <div className="ins-card-top">
                                        <div>
                                            <span className="ins-kicker">
                                                {pol.flag} {pol.region} · {pol.underwriter}
                                            </span>
                                            <h3
                                                className="ins-card-title"
                                                onClick={() => setSelectedPolicy(pol)}
                                            >
                                                {pol.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Unboxed Telemetry Strip */}
                                    <div className="ins-meta-strip">
                                        <span>
                                            Cap: <strong>{pol.coverageCap}</strong>
                                        </span>
                                        <span aria-hidden="true">·</span>
                                        <span>{pol.deductible}</span>
                                        <span aria-hidden="true">·</span>
                                        <span style={{ color: '#10b981', fontWeight: 700 }}>
                                            +{pol.xpReward} XP
                                        </span>
                                    </div>

                                    <p className="ins-card-desc">{pol.desc}</p>

                                    <div className="ins-triggers-box">
                                        <strong style={{ color: '#38bdf8' }}>
                                            Smart Parametric Triggers & Direct-Pay Rules ({pol.claimSla}):
                                        </strong>
                                        {pol.parametricRules.map((rule, idx) => (
                                            <div key={idx} style={{ color: '#cbd5e1', lineHeight: 1.4 }}>
                                                • {rule}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="ins-card-footer">
                                    <div>
                                        <span className="ins-price-display">${computedPrice}</span>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>
                                            {' '}
                                            {billingCycle === 'daily'
                                                ? `total (${tripDays}d @ $${pol.dailyRate}/d)`
                                                : '/ month rolling'}
                                        </span>
                                        {activePol && (
                                            <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>
                                                Active Shield {activePol.policyId} · Hospital QR Ready
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        <button
                                            type="button"
                                            className="ins-btn"
                                            onClick={() => {
                                                setShowVisaCertDrawer(true);
                                                addToast(`Pre-filled consular proof generator with "${pol.title}"`, 'info');
                                            }}
                                        >
                                            Visa PDF
                                        </button>
                                        <button
                                            type="button"
                                            className={`ins-btn ${activePol ? 'ins-btn-emerald' : 'ins-btn-primary'}`}
                                            onClick={() => setSelectedPolicy(pol)}
                                        >
                                            {activePol ? (
                                                <>
                                                    <CheckCircle2 size={13} />
                                                    Manage Shield
                                                </>
                                            ) : (
                                                'Activate Shield'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                {/* Right Column: Live Parametric Auto-Payout Simulator & Creator Hardware Vault */}
                <aside className="ins-side-rail" aria-label="Parametric Payout Oracle and Creator Hardware Vault">
                    {/* Parametric Auto-Payout Simulator */}
                    <div className="ins-side-panel">
                        <h3 className="ins-side-title">
                            <span>
                                <Zap
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                Live Parametric Auto-Claim Oracle
                            </span>
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.42 }}>
                            Simulate how ChronoFlight™ triggers automatic, zero-form payouts the moment airport gate or SITA baggage telemetry crosses your threshold.
                        </p>

                        <label className="ins-field-label">
                            <span>Simulated Flight Delay: {simFlightDelayHrs} Hours</span>
                            <input
                                type="range"
                                min="0"
                                max="8"
                                step="1"
                                value={simFlightDelayHrs}
                                onChange={(e) => setSimFlightDelayHrs(Number(e.target.value))}
                            />
                        </label>

                        <label className="ins-field-label">
                            <span>Checked Bag / AirTag Delay: {simBagDelayHrs} Hours</span>
                            <input
                                type="range"
                                min="0"
                                max="24"
                                step="2"
                                value={simBagDelayHrs}
                                onChange={(e) => setSimBagDelayHrs(Number(e.target.value))}
                            />
                        </label>

                        <div className="ins-oracle-box">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Flight Delay Payout (≥2h trigger):</span>
                                <strong>${simFlightPayout} USD</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Delayed Bag Gear Advance (≥12h):</span>
                                <strong>${simBagPayout} USD</strong>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingTop: '0.4rem',
                                    borderTop: '1px solid rgba(16, 185, 129, 0.3)',
                                    color: '#10b981',
                                    fontSize: '0.82rem'
                                }}
                            >
                                <strong>Instant Auto-Payout (48s SLA):</strong>
                                <strong>${simTotalInstantPayout} USD</strong>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="ins-btn ins-btn-primary"
                            style={{ width: '100%' }}
                            onClick={handleTriggerSimulatedPayout}
                        >
                            <Activity size={14} />
                            Test Instant Oracle Payout (${simTotalInstantPayout})
                        </button>
                    </div>

                    {/* Creator Hardware Vault */}
                    <div className="ins-side-panel">
                        <div className="ins-side-title">
                            <span>
                                <Laptop
                                    size={15}
                                    color="#38bdf8"
                                    style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }}
                                />
                                CreatorRig™ Hardware Vault
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                                ${totalGearValue.toLocaleString()} Insured
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            {gearItems.map((g) => (
                                <div key={g.id} className="ins-gear-item">
                                    <div>
                                        <strong>{g.name}</strong>
                                        <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                                            Serial: {g.serial} · Replacement: ${g.value}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGear(g.id, g.name)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#94a3b8',
                                            cursor: 'pointer'
                                        }}
                                        aria-label="Remove gear"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleAddGear} style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <input
                                type="text"
                                className="ins-input"
                                style={{ flex: 1, minWidth: 130 }}
                                placeholder="Add Camera, Drone, Starlink..."
                                value={newGearName}
                                onChange={(e) => setNewGearName(e.target.value)}
                            />
                            <input
                                type="number"
                                className="ins-input"
                                style={{ width: 80 }}
                                value={newGearValue}
                                onChange={(e) => setNewGearValue(e.target.value)}
                                aria-label="Gear value in USD"
                            />
                            <button type="submit" className="ins-btn">
                                <Plus size={13} /> Add
                            </button>
                        </form>
                    </div>
                </aside>
            </div>

            {/* 5. Shield Activation & Cashless Hospital QR Modal */}
            {selectedPolicy && (
                <div
                    className="ins-modal-backdrop"
                    onClick={() => setSelectedPolicy(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="ins-modal-title"
                >
                    <form
                        className="ins-modal-dialog"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleActivatePolicy}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                                <span className="ins-kicker">
                                    {selectedPolicy.flag} {selectedPolicy.underwriter}
                                </span>
                                <h3 id="ins-modal-title" style={{ margin: '0.25rem 0 0 0', fontSize: '1.18rem' }}>
                                    {selectedPolicy.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                className="ins-btn"
                                onClick={() => setSelectedPolicy(null)}
                                aria-label="Close modal"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        <div className="ins-meta-strip">
                            <span>
                                Coverage Cap: <strong>{selectedPolicy.coverageCap}</strong>
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{selectedPolicy.deductible}</span>
                            <span aria-hidden="true">·</span>
                            <span style={{ color: '#10b981', fontWeight: 700 }}>
                                Claim SLA: {selectedPolicy.claimSla}
                            </span>
                        </div>

                        <div className="ins-triggers-box">
                            <strong style={{ color: '#38bdf8' }}>Included Parametric & Direct-Billing Guarantees:</strong>
                            {selectedPolicy.parametricRules.map((r, i) => (
                                <div key={i}>• {r}</div>
                            ))}
                        </div>

                        <div className="ins-form-grid">
                            <label className="ins-field-label">
                                <span>Coverage Mode</span>
                                <select
                                    className="ins-select"
                                    value={billingCycle}
                                    onChange={(e) => setBillingCycle(e.target.value)}
                                >
                                    <option value="daily">
                                        Flex Daily Pass ({tripDays} Days @ ${selectedPolicy.dailyRate}/d = $
                                        {(selectedPolicy.dailyRate * tripDays).toFixed(2)})
                                    </option>
                                    <option value="monthly">
                                        Monthly Nomad Shield (${selectedPolicy.monthlyRate}/mo)
                                    </option>
                                </select>
                            </label>

                            <label className="ins-field-label">
                                <span>Flight PNR / Route to Monitor (Optional)</span>
                                <input
                                    type="text"
                                    className="ins-input"
                                    value={flightPnr}
                                    onChange={(e) => setFlightPnr(e.target.value)}
                                    placeholder="e.g. NH-842 Tokyo / Lisbon Corridor"
                                />
                            </label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                            {activePolicies[selectedPolicy.id] ? (
                                <button
                                    type="button"
                                    className="ins-btn"
                                    onClick={() => handlePauseOrCancelPolicy(selectedPolicy.id, selectedPolicy.title)}
                                >
                                    Pause Shield ({activePolicies[selectedPolicy.id].policyId})
                                </button>
                            ) : (
                                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                    Instant Cashless Hospital QR + Consular Visa Proof PDF issued immediately
                                </span>
                            )}

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    type="button"
                                    className="ins-btn"
                                    onClick={() => navigate('/explore/planner')}
                                >
                                    <GitBranch size={14} />
                                    Sync with Itinerary
                                </button>
                                <button type="submit" className="ins-btn ins-btn-primary">
                                    <ShieldCheck size={14} />
                                    {activePolicies[selectedPolicy.id]
                                        ? 'Update Active Shield'
                                        : `Activate Shield ($${
                                              billingCycle === 'daily'
                                                  ? (selectedPolicy.dailyRate * tripDays).toFixed(2)
                                                  : selectedPolicy.monthlyRate
                                          })`}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SupportUtility;
