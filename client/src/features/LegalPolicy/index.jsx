import React, { useState, useEffect } from 'react';
import {
    Shield, Scale, Lock, FileText, Search,
    ChevronRight, Info, AlertCircle, CheckCircle2,
    Globe, Users, Heart, Sparkles, MessageSquare,
    Download, Printer, Share2, ExternalLink
} from 'lucide-react';
import '../../styles/LegalPolicy.css';

const LegalPolicy = () => {
    const [activeTab, setActiveTab] = useState('tos');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const tabs = [
        { id: 'tos', label: 'Terms of Service', icon: <Scale size={18} /> },
        { id: 'privacy', label: 'Privacy Policy', icon: <Lock size={18} /> },
        { id: 'ethical', label: 'Ethical Guidelines', icon: <Heart size={18} /> },
        { id: 'compliance', label: 'Compliance', icon: <Shield size={18} /> }
    ];

    const legalContent = {
        tos: {
            title: "Terms of Service",
            lastUpdated: "January 4, 2026",
            sections: [
                {
                    title: "1. Acceptance of Terms",
                    content: "By accessing or using the Seenomad platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
                },
                {
                    title: "2. User Conduct & Gamification",
                    content: "Seenomad is a gamified platform. Users are expected to maintain the integrity of the XP and rewards system. Any attempt to manipulate impact metrics or engage in fraudulent activities will result in immediate account suspension."
                },
                {
                    title: "3. Content & Intellectual Property",
                    content: "All content provided on Seenomad, including but not limited to text, graphics, logos, and AI-generated insights, is the property of Seenomad or its content creators and is protected by international copyright laws."
                }
            ]
        },
        privacy: {
            title: "Privacy Policy",
            lastUpdated: "January 4, 2026",
            sections: [
                {
                    title: "1. Data Collection",
                    content: "We collect information that you provide directly to us, such as when you create an account, update your profile, or participate in impact challenges. This includes your name, email, and travel preferences."
                },
                {
                    title: "2. AI & Personalization",
                    content: "Our AI Impact Mentor processes your data to provide personalized travel recommendations. We do not sell your personal data to third parties. All AI processing is performed with privacy-first protocols."
                },
                {
                    title: "3. Your Rights",
                    content: "You have the right to access, correct, or delete your personal information at any time. You can manage your privacy settings directly from your dashboard."
                }
            ]
        },
        ethical: {
            title: "Ethical Impact Guidelines",
            lastUpdated: "January 4, 2026",
            sections: [
                {
                    title: "1. Sustainable Exploration",
                    content: "We prioritize destinations and partners that demonstrate a commitment to environmental sustainability and cultural preservation. Our 'Impact Score' is a reflection of these values."
                },
                {
                    title: "2. Community Empowerment",
                    content: "Seenomad is dedicated to ensuring that travel spending directly benefits local communities. We vet all NGO and local business partners to ensure fair practices and genuine impact."
                },
                {
                    title: "3. Radical Transparency",
                    content: "We provide real-time tracking of all impact generated through our platform. Users can see exactly where their contributions go and the tangible results of their actions."
                }
            ]
        },
        compliance: {
            title: "Compliance & Safety",
            lastUpdated: "January 4, 2026",
            sections: [
                {
                    title: "1. Global Regulations",
                    content: "Seenomad operates in compliance with GDPR, CCPA, and other international data protection and travel regulations. We continuously update our systems to meet evolving legal standards."
                },
                {
                    title: "2. Partner Vetting",
                    content: "All partners on the Seenomad ecosystem undergo a rigorous compliance check, including safety standards, ethical practices, and financial transparency."
                },
                {
                    title: "3. Security Protocols",
                    content: "We use industry-standard encryption and security measures to protect your data and transactions. Our systems are regularly audited by independent security firms."
                }
            ]
        }
    };

    const currentContent = legalContent[activeTab];

    return (
        <div className={`legal-page ${isVisible ? 'fade-in' : ''}`}>
            {/* Header Section */}
            <header className="legal-header">
                <div className="header-content">
                    <div className="badge-legal">
                        <Shield size={14} />
                        <span>Trust & Transparency</span>
                    </div>
                    <h1>Legal & <span className="gradient-text">Policy Hub</span></h1>
                    <p>Everything you need to know about our terms, privacy, and commitment to ethical travel.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box-legal">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search policies..."
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
                                onClick={() => setActiveTab(tab.id)}
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
                            <h3>Legal AI Assistant</h3>
                        </div>
                        <p>Need a quick summary? I can explain complex clauses in simple terms.</p>
                        <button className="btn-assistant">Ask AI Assistant</button>
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
                                <button title="Download PDF"><Download size={18} /></button>
                                <button title="Print"><Printer size={18} /></button>
                                <button title="Share"><Share2 size={18} /></button>
                            </div>
                        </div>

                        <div className="doc-content">
                            {currentContent.sections.map((section, index) => (
                                <section key={index} className="doc-section">
                                    <h3>{section.title}</h3>
                                    <p>{section.content}</p>
                                </section>
                            ))}
                        </div>

                        <div className="doc-footer">
                            <div className="footer-note">
                                <Info size={16} />
                                <span>Have questions? <a href="/contact">Contact our legal team</a></span>
                            </div>
                            <button className="btn-accept">I Understand & Agree</button>
                        </div>
                    </div>

                    {/* Quick Links / Related Policies */}
                    <div className="related-policies">
                        <h3>Related Information</h3>
                        <div className="related-grid">
                            <div className="related-card">
                                <Users size={24} />
                                <h4>Community Guidelines</h4>
                                <p>How we maintain a positive ecosystem.</p>
                                <ExternalLink size={14} className="link-icon" />
                            </div>
                            <div className="related-card">
                                <Globe size={24} />
                                <h4>Cookie Policy</h4>
                                <p>How we use cookies and tracking.</p>
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
