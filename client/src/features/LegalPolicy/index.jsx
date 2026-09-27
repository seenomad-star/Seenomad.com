import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Shield, Scale, Lock, FileText, Search,
    ChevronRight, Info, AlertCircle, CheckCircle2,
    Globe, Users, Heart, Sparkles, MessageSquare,
    Download, Printer, Share2, ExternalLink,
    Cookie, Megaphone, Mail
} from 'lucide-react';
import '../../styles/LegalPolicy.css';

const LegalPolicy = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    
    const [activeTab, setActiveTab] = useState(tabParam || 'privacy');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (tabParam && ['tos', 'privacy', 'cookies', 'adsense', 'ethical', 'compliance', 'contact'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    const handleTabChange = (id) => {
        setActiveTab(id);
        setSearchParams({ tab: id });
    };

    const tabs = [
        { id: 'privacy', label: 'Privacy Policy (AdSense)', icon: <Lock size={18} /> },
        { id: 'tos', label: 'Terms of Service', icon: <Scale size={18} /> },
        { id: 'cookies', label: 'Cookie Policy', icon: <Cookie size={18} /> },
        { id: 'adsense', label: 'Advertising & FTC Disclosure', icon: <Megaphone size={18} /> },
        { id: 'compliance', label: 'Compliance & GDPR', icon: <Shield size={18} /> },
        { id: 'contact', label: 'Publisher & Contact', icon: <Mail size={18} /> }
    ];

    const legalContent = {
        privacy: {
            title: "Privacy Policy & Google AdSense Compliance",
            lastUpdated: "September 16, 2026",
            sections: [
                {
                    title: "1. Overview & Commitment",
                    content: "At SeeNomad (accessible from seenomad.com), the privacy of our visitors and registered digital nomads is of extreme importance to us. This Privacy Policy document outlines the types of personal and analytical information that is received, recorded, and utilized by SeeNomad, and how we protect your digital footprint."
                },
                {
                    title: "2. Google AdSense & Third-Party Advertising Cookies",
                    content: "SeeNomad is monetized in part through Google AdSense and third-party advertising partners to provide free, high-quality destination guides, visa intelligence, and community tools. In compliance with Google AdSense Publisher Policies:\n• Third-party vendors, including Google, use cookies (such as the DoubleClick cookie) to serve ads based on a user's prior visits to SeeNomad or other websites on the Internet.\n• Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to SeeNomad and/or other sites across the World Wide Web.\n• Users may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads). Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info or youradchoices.com."
                },
                {
                    title: "3. Log Files & Web Analytics",
                    content: "Like most standard website servers, SeeNomad makes use of log files and privacy-focused analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of clicks to analyze trends, administer the site, track user movement around the site, and gather broad demographic data. IP addresses and other such identifiers are not linked to personally identifiable information without explicit consent."
                },
                {
                    title: "4. Personal Information You Provide",
                    content: "We only collect personally identifiable information (such as your name, email address, bio, and travel preferences) when you voluntarily submit it—for example, when registering an account, subscribing to the Morning Travel Digest, submitting a community travel reel, or contacting our support team. We do not sell, rent, or trade your personal information to third-party brokers."
                },
                {
                    title: "5. GDPR & CCPA Data Subject Rights",
                    content: "If you reside in the European Economic Area (EEA) or California (CCPA), you enjoy enhanced data rights, including: the right to access your stored records, the right to rectify inaccuracies, the right to erasure ('right to be forgotten'), the right to data portability, and the right to object to data processing. To exercise any of these rights, contact privacy@seenomad.com."
                }
            ]
        },
        tos: {
            title: "Terms of Service & Platform Rules",
            lastUpdated: "September 16, 2026",
            sections: [
                {
                    title: "1. Acceptance of Terms",
                    content: "By visiting, browsing, or creating an account on SeeNomad, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this platform."
                },
                {
                    title: "2. Travel Information & Visa Disclaimer",
                    content: "SeeNomad provides travel recommendations, cost-of-living data, community reviews, and digital nomad visa intelligence for informational purposes only. While we endeavor to keep all information current and accurate, visa regulations, border requirements, and local laws change rapidly. Travelers must always verify official visa requirements with the respective embassies or consulates prior to departure."
                },
                {
                    title: "3. User Generated Content & Conduct",
                    content: "Users may share photos, travel guides, reviews, and comments. You retain ownership of your original submissions but grant SeeNomad a non-exclusive license to display and distribute your content across the platform. Content that is illegal, defamatory, promotes hate speech, infringes on copyright, or constitutes spam is strictly prohibited and subject to immediate removal."
                },
                {
                    title: "4. Intellectual Property",
                    content: "The SeeNomad logo, design, trademarks, software code, and curated editorial database are the intellectual property of SeeNomad and protected by international copyright laws."
                }
            ]
        },
        cookies: {
            title: "Cookie Policy & Tracking Preferences",
            lastUpdated: "September 16, 2026",
            sections: [
                {
                    title: "1. What Are Cookies?",
                    content: "Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, provide personalized experiences, and provide reporting information to site owners."
                },
                {
                    title: "2. Categories of Cookies Used by SeeNomad",
                    content: "• Essential Cookies: Necessary for site security, user authentication, and persistent session preferences.\n• Analytics & Performance Cookies: Used to understand how visitors engage with travel guides and map modules to improve user experience.\n• Advertising Cookies (Google AdSense): Used by Google and certified ad exchanges to serve relevant advertisements, prevent the same ad from reappearing, and measure ad performance."
                },
                {
                    title: "3. Managing Your Cookie Preferences",
                    content: "You can control and manage cookies through your browser settings or via our bottom cookie consent banner. Most browsers allow you to refuse or delete cookies. To opt out of Google's interest-based ads, visit https://adssettings.google.com."
                }
            ]
        },
        adsense: {
            title: "Advertising & FTC Affiliate Disclosure",
            lastUpdated: "September 16, 2026",
            sections: [
                {
                    title: "1. Transparency in Monetization",
                    content: "In accordance with Federal Trade Commission (FTC) guidelines and Google Publisher Policies, SeeNomad is committed to radical transparency regarding our advertising and affiliate partnerships."
                },
                {
                    title: "2. Google AdSense Advertising",
                    content: "We display banner, in-feed, and responsive display advertisements served by Google AdSense and certified ad networks. These advertisements are clearly labeled with 'ADVERTISEMENT' or 'SPONSORED'. We do not endorse the specific products or services advertised in automated ad units, and advertisers do not influence our editorial travel ratings or safety scores."
                },
                {
                    title: "3. Affiliate Link Disclosures",
                    content: "Certain links on SeeNomad (such as hotel bookings, travel insurance, or eSIM providers) are affiliate links. If you click on an affiliate link and make a purchase, SeeNomad may earn a small referral commission at absolutely no additional cost to you. We only recommend travel gear, accommodations, and services that we believe provide genuine value to the nomad community."
                }
            ]
        },
        compliance: {
            title: "Compliance, Safety & Regulatory Standards",
            lastUpdated: "September 16, 2026",
            sections: [
                {
                    title: "1. Regulatory Compliance",
                    content: "SeeNomad operates in strict compliance with the General Data Protection Regulation (GDPR - EU 2016/679), California Consumer Privacy Act (CCPA), and Google Publisher Policies."
                },
                {
                    title: "2. Child Privacy Protection",
                    content: "SeeNomad does not knowingly address or collect personal information from children under the age of 13. If you believe your child has provided us with personal information, please contact us immediately so we can promptly delete it."
                },
                {
                    title: "3. Security Measures",
                    content: "We utilize modern TLS 1.3 encryption, secure content delivery networks (CDNs), and strict access controls to safeguard data integrity and prevent unauthorized access."
                }
            ]
        },
        contact: {
            title: "Publisher Details & Contact Information",
            lastUpdated: "September 16, 2026",
            sections: [
                {
                    title: "1. Publisher Identity",
                    content: "SeeNomad Global Intelligence Platform\nWebsite: https://seenomad.com\nGeneral Inquiries: support@seenomad.com\nPrivacy & Ad Inquiries: privacy@seenomad.com"
                },
                {
                    title: "2. DMCA & Copyright Agent",
                    content: "If you believe that any content hosted on SeeNomad infringes upon your copyright, please notify our Designated Copyright Agent at dmca@seenomad.com with the URL, identification of the copyrighted work, and your contact details."
                },
                {
                    title: "3. Advertising & Partnership Inquiries",
                    content: "For direct publisher sponsorships, brand integrations, or advertising feedback, please reach out to partners@seenomad.com."
                }
            ]
        }
    };

    const currentContent = legalContent[activeTab] || legalContent.privacy;

    return (
        <div className={`legal-page ${isVisible ? 'fade-in' : ''}`}>
            {/* Header Section */}
            <header className="legal-header">
                <div className="header-content">
                    <div className="badge-legal">
                        <Shield size={14} />
                        <span>Trust & AdSense Compliance</span>
                    </div>
                    <h1>SeeNomad <span className="gradient-text">Legal & Policy Hub</span></h1>
                    <p>Transparent guidelines covering our privacy practices, Google AdSense disclosures, terms of use, and cookie policies.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box-legal">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search legal policies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="legal-container">
                {/* Sidebar Navigation */}
                <aside className="legal-sidebar">
                    <nav className="legal-nav">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => handleTabChange(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                {activeTab === tab.id && <ChevronRight size={16} className="chevron" />}
                            </button>
                        ))}
                    </nav>

                    <div className="legal-assistant-card">
                        <div className="assistant-header">
                            <Sparkles size={20} />
                            <h3>AdSense Verified</h3>
                        </div>
                        <p>Fully compliant with Google Publisher Policies, EU User Consent, and FTC advertising transparency.</p>
                        <a href="https://support.google.com/adsense/answer/1348695" target="_blank" rel="noopener noreferrer" className="btn-assistant" style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}>
                            View AdSense Policies
                        </a>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="legal-main">
                    <div className="document-card">
                        <div className="doc-header">
                            <div className="doc-info">
                                <h2>{currentContent.title}</h2>
                                <span className="last-updated">Last Updated: {currentContent.lastUpdated}</span>
                            </div>
                            <div className="doc-actions">
                                <button title="Download PDF" onClick={() => window.print()}><Download size={18} /></button>
                                <button title="Print Document" onClick={() => window.print()}><Printer size={18} /></button>
                                <button title="Share Policy Link" onClick={() => {
                                    navigator.clipboard?.writeText(window.location.href);
                                }}><Share2 size={18} /></button>
                            </div>
                        </div>

                        <div className="doc-content">
                            {currentContent.sections
                                .filter(s => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.content.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((section, index) => (
                                    <section key={index} className="doc-section">
                                        <h3>{section.title}</h3>
                                        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.65' }}>{section.content}</p>
                                    </section>
                                ))}
                        </div>

                        <div className="doc-footer">
                            <div className="footer-note">
                                <Info size={16} />
                                <span>Questions regarding our policies? <a href="/legal?tab=contact">Contact our compliance officer</a></span>
                            </div>
                            <button className="btn-accept" onClick={() => handleTabChange('tos')}>I Understand & Agree</button>
                        </div>
                    </div>

                    {/* Quick Links / Related Policies */}
                    <div className="related-policies">
                        <h3>Compliance Resources</h3>
                        <div className="related-grid">
                            <div className="related-card" onClick={() => handleTabChange('cookies')} style={{ cursor: 'pointer' }}>
                                <Cookie size={24} />
                                <h4>Cookie Management</h4>
                                <p>Learn how advertising and functional cookies are used.</p>
                                <ExternalLink size={14} className="link-icon" />
                            </div>
                            <div className="related-card" onClick={() => handleTabChange('adsense')} style={{ cursor: 'pointer' }}>
                                <Megaphone size={24} />
                                <h4>AdSense Transparency</h4>
                                <p>How Google AdSense ads are served and measured.</p>
                                <ExternalLink size={14} className="link-icon" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LegalPolicy;
