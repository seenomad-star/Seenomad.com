import React, { useState, useMemo } from 'react';
import {
    HelpCircle, Calendar, FileText, ShieldCheck, Clock,
    ChevronDown, ChevronUp, Search, Phone, Mail, Globe,
    CheckCircle2, AlertCircle, ExternalLink
} from 'lucide-react';
import { GLOBAL_EMBASSY_COUNTRIES } from '../data/globalEmbassyCountries';
import './ConsularFAQ.css';

const FAQ_CATEGORIES = [
    { id: 'all', label: 'All Topics' },
    { id: 'appointments', label: 'Appointments & Biometrics' },
    { id: 'visa-application', label: 'Visa & Nomad Permits' },
    { id: 'documents', label: 'Documents & Legalization' },
    { id: 'emergency', label: 'Emergency & Passports' }
];

/**
 * ConsularFAQ
 * Dynamic Consular FAQ section for each Embassy Detail & Embassy Visa page.
 * Provides quick, country-tailored answers to common visa application questions
 * and consular appointment procedures.
 */
const ConsularFAQ = ({ countrySlug = '', countryName = 'This Country' }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [faqSearch, setFaqSearch] = useState('');
    const [openIds, setOpenIds] = useState([0, 1]);

    const countryProfile = useMemo(() => {
        const cleanSlug = (countrySlug || '').toLowerCase().replace(/^embassy-of-/, '').replace(/embassyvisa$/, '');
        return (
            GLOBAL_EMBASSY_COUNTRIES.find(
                (c) => c.id === cleanSlug || c.name.toLowerCase() === (countryName || '').toLowerCase()
            ) || {
                id: cleanSlug || 'portugal',
                name: countryName || 'Portugal',
                flag: '🏛️',
                capital: 'Capital Chancery',
                visaPathway: `${countryName} Digital Nomad & Consular Visa`,
                processingTime: '5–15 Business Days',
                appointmentWait: '3–6 Business Days',
                operatingHours: 'Mon–Fri · 09:00 – 16:30 Local Time',
                emergencyHotline: '+1 202 555 0199',
                consularEmail: `consular@${cleanSlug || 'embassy'}-mfa.gov`,
                officialPortal: 'https://www.mfa.gov/visa',
                nomadVisaAvailable: true
            }
        );
    }, [countrySlug, countryName]);

    const faqItems = useMemo(() => {
        const name = countryProfile.name;
        return [
            {
                id: 0,
                category: 'appointments',
                badge: 'Appointments & Biometrics',
                question: `How do I book a visa or consular appointment at the Embassy of ${name}?`,
                answer: `All non-emergency visa, biometric, and notary appointments at the Embassy and Consulates of ${name} must be scheduled in advance through the official consular booking portal (${countryProfile.officialPortal}) or authorized VFS/TLS visa application center. Current average appointment wait time is ${countryProfile.appointmentWait}. Bring your printed appointment confirmation barcode and original passport 15 minutes before your scheduled slot.`,
                steps: [
                    `Complete the online pre-application form on ${countryProfile.officialPortal}`,
                    `Select your nearest ${name} Embassy or Consulate General and pay the booking fee`,
                    'Attend in-person biometrics (fingerprints & digital photo) with original documents'
                ]
            },
            {
                id: 1,
                category: 'visa-application',
                badge: 'Visa & Nomad Permits',
                question: `What is the processing time and eligibility for the ${name} Digital Nomad / Long-Stay Visa?`,
                answer: `${name} offers the "${countryProfile.visaPathway}" pathway with a standard consular processing window of ${countryProfile.processingTime}. Applicants must demonstrate remote employment or foreign business income outside ${name}, valid international medical insurance covering the entire stay, and a clean apostilled criminal background check issued within the past 90 days.`,
                steps: [
                    'Remote work contract or 3–6 months of foreign bank statements proving stable income',
                    `Comprehensive travel & health insurance valid across ${name}`,
                    'Confirmed accommodation lease, coliving agreement, or initial booking'
                ]
            },
            {
                id: 2,
                category: 'appointments',
                badge: 'Walk-In & Expedited Procedure',
                question: `Does the ${name} Consulate accept walk-ins or offer expedited 24–48 hour visa processing?`,
                answer: `Routine visa applications require a prior appointment during regular consular hours (${countryProfile.operatingHours}). Walk-ins are strictly reserved for life-or-death emergencies, lost/stolen passports, or urgent humanitarian travel. However, applicants with confirmed departure flights within 7 days can request Priority / Fast-Track E-Visa or Express Biometric handling via ${countryProfile.consularEmail}.`,
                steps: [
                    'Standard consular window: ' + countryProfile.operatingHours,
                    `Urgent walk-in desk available for citizens via ${countryProfile.emergencyHotline}`,
                    'Express Visa surcharge applies for 24–48h priority adjudication where eligible'
                ]
            },
            {
                id: 3,
                category: 'documents',
                badge: 'Documents & Legalization',
                question: `What documents must be apostilled or translated for a ${name} visa application?`,
                answer: `Public documents issued outside ${name}—such as criminal record certificates, marriage/birth certificates, and corporate registration papers—must carry a Hague Apostille stamp (or diplomatic legalization if issued in a non-Hague country). Documents not in English or the official language of ${name} require a certified sworn translation.`,
                steps: [
                    'Original passport with at least 6 months validity and 2 blank visa pages',
                    'Hague Apostille stamp on national police clearance certificate',
                    'Recent 3 months stamped bank statements and notarized remote work attestation'
                ]
            },
            {
                id: 4,
                category: 'visa-application',
                badge: 'Passport Retention & Tracking',
                question: `Do I need to leave my physical passport at the ${name} Embassy during visa processing?`,
                answer: `For online e-Visas and Electronic Travel Authorizations (eTA), you keep your passport and receive a digital PDF approval via email. For long-stay D-Visas or Digital Nomad Residence Permits, your passport is either submitted at the biometric appointment or presented for final visa vignette stamping once pre-approval is granted.`,
                steps: [
                    'Real-time application tracking via passport number and receipt barcode',
                    'Option for courier return or in-person passport collection once stamped'
                ]
            },
            {
                id: 5,
                category: 'emergency',
                badge: 'Emergency & Passports',
                question: `What is the procedure if my passport is lost, stolen, or expires while abroad?`,
                answer: `Immediately file a local police report and contact the 24/7 ${name} Consular Emergency Hotline at ${countryProfile.emergencyHotline}. The consular duty officer can issue an Emergency Travel Document (ETD) or temporary laissez-passer within 24–48 hours for urgent return travel or onward transit.`,
                steps: [
                    'Obtain a local police loss/theft report number',
                    `Call ${countryProfile.emergencyHotline} or email ${countryProfile.consularEmail}`,
                    'Provide 2 biometric photos and a digital copy of your lost passport ID page'
                ]
            }
        ];
    }, [countryProfile]);

    const filteredFaqs = useMemo(() => {
        const q = faqSearch.trim().toLowerCase();
        return faqItems.filter((item) => {
            if (activeCategory !== 'all' && item.category !== activeCategory) return false;
            if (q) {
                const hay = `${item.question} ${item.answer} ${item.badge}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [faqItems, activeCategory, faqSearch]);

    const toggleItem = (id) => {
        setOpenIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const expandAll = () => setOpenIds(filteredFaqs.map((f) => f.id));
    const collapseAll = () => setOpenIds([]);

    return (
        <section className="consular-faq-section" aria-label={`${countryProfile.name} Consular FAQ and Appointment Procedures`}>
            {/* Top Header */}
            <div className="cfaq-header">
                <div className="cfaq-header-left">
                    <div className="cfaq-eyebrow">
                        <HelpCircle size={13} />
                        <span>Official Consular FAQ & Appointment Procedures</span>
                        <span>·</span>
                        <span>{countryProfile.flag} {countryProfile.name}</span>
                    </div>
                    <h2 className="cfaq-title">
                        Frequently Asked Visa & Consular Questions ({countryProfile.name})
                    </h2>
                    <p className="cfaq-subtitle">
                        Instant answers on booking biometric appointments, Digital Nomad visa eligibility, document apostille rules, and emergency passport support.
                    </p>
                </div>

                {/* Quick Procedure Summary Box */}
                <div className="cfaq-quick-telemetry">
                    <div className="cfaq-tel-item">
                        <Calendar size={14} className="cfaq-tel-icon" />
                        <div>
                            <span>Appointment Wait</span>
                            <strong>{countryProfile.appointmentWait}</strong>
                        </div>
                    </div>
                    <div className="cfaq-tel-item">
                        <Clock size={14} className="cfaq-tel-icon" />
                        <div>
                            <span>Visa Processing</span>
                            <strong>{countryProfile.processingTime}</strong>
                        </div>
                    </div>
                    <div className="cfaq-tel-item">
                        <Phone size={14} className="cfaq-tel-icon" />
                        <div>
                            <span>24/7 Consular Desk</span>
                            <strong>{countryProfile.emergencyHotline}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3-Step Standard Appointment Procedure Strip */}
            <div className="cfaq-procedure-strip">
                <div className="cfaq-proc-step">
                    <span className="proc-num">01</span>
                    <div>
                        <strong>Online Application & Slot Booking</strong>
                        <span>Submit digital visa form & select biometric date on {countryProfile.officialPortal}</span>
                    </div>
                </div>
                <div className="cfaq-proc-step">
                    <span className="proc-num">02</span>
                    <div>
                        <strong>In-Person Biometrics & Document Check</strong>
                        <span>Present original passport, apostilled certificates & insurance at the mission</span>
                    </div>
                </div>
                <div className="cfaq-proc-step">
                    <span className="proc-num">03</span>
                    <div>
                        <strong>Adjudication & Visa Issuance ({countryProfile.processingTime})</strong>
                        <span>Track status online and receive e-Visa PDF or stamped passport</span>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="cfaq-controls-row">
                <div className="cfaq-category-pills" role="tablist">
                    {FAQ_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            role="tab"
                            aria-selected={activeCategory === cat.id}
                            className={`cfaq-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="cfaq-right-tools">
                    <div className="cfaq-search-box">
                        <Search size={14} />
                        <input
                            type="search"
                            value={faqSearch}
                            onChange={(e) => setFaqSearch(e.target.value)}
                            placeholder={`Search ${countryProfile.name} visa & appointment FAQs...`}
                            aria-label="Search Consular FAQs"
                        />
                    </div>
                    <button type="button" className="cfaq-expand-btn" onClick={openIds.length === filteredFaqs.length ? collapseAll : expandAll}>
                        {openIds.length === filteredFaqs.length ? 'Collapse All' : 'Expand All'}
                    </button>
                </div>
            </div>

            {/* Accordion List */}
            <div className="cfaq-accordion-list">
                {filteredFaqs.map((item) => {
                    const isOpen = openIds.includes(item.id);
                    return (
                        <article
                            key={item.id}
                            className={`cfaq-item ${isOpen ? 'is-open' : ''}`}
                        >
                            <button
                                type="button"
                                className="cfaq-question-btn"
                                onClick={() => toggleItem(item.id)}
                                aria-expanded={isOpen}
                            >
                                <div className="cfaq-q-left">
                                    <span className="cfaq-topic-badge">{item.badge}</span>
                                    <h3>{item.question}</h3>
                                </div>
                                <span className="cfaq-chevron">
                                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </span>
                            </button>

                            {isOpen && (
                                <div className="cfaq-answer-body">
                                    <p className="cfaq-answer-text">{item.answer}</p>
                                    {item.steps && item.steps.length > 0 && (
                                        <div className="cfaq-key-steps">
                                            <span className="steps-label">Key Procedure Checkpoints:</span>
                                            <ul>
                                                {item.steps.map((st, i) => (
                                                    <li key={i}>
                                                        <CheckCircle2 size={13} className="step-chk" />
                                                        <span>{st}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>

            {/* Direct Consular Contact Footer */}
            <div className="cfaq-footer-bar">
                <div className="cfaq-footer-left">
                    <ShieldCheck size={16} className="cfaq-shield" />
                    <span>
                        Need direct clarification from the <strong>{countryProfile.name} Consular Section</strong>? Contact <strong>{countryProfile.consularEmail}</strong> ({countryProfile.operatingHours}).
                    </span>
                </div>
                <a
                    href={countryProfile.officialPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cfaq-portal-btn"
                >
                    <Globe size={14} />
                    <span>Official {countryProfile.name} Visa Portal</span>
                    <ExternalLink size={13} />
                </a>
            </div>
        </section>
    );
};

export default ConsularFAQ;
