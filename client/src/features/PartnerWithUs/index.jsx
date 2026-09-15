import React, { useEffect, useState } from 'react';
import {
    Handshake, Globe, Users, Award, ShieldCheck,
    Zap, Sparkles, ArrowRight, CheckCircle2,
    Building2, GraduationCap, Landmark, Rocket,
    MessageSquare, Mail, Phone, MapPin
} from 'lucide-react';
import '../../styles/PartnerWithUs.css';

const PartnerWithUs = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const partnerCategories = [
        {
            icon: <Building2 size={32} />,
            title: "NGOs & Non-Profits",
            description: "Scale your impact by connecting with a global community of conscious travelers and volunteers.",
            color: "emerald"
        },
        {
            icon: <GraduationCap size={32} />,
            title: "Universities & Schools",
            description: "Provide students with verified, high-impact experiential learning and voluntourism opportunities.",
            color: "blue"
        },
        {
            icon: <Landmark size={32} />,
            title: "Governments & Tourism",
            description: "Promote sustainable tourism and community-driven development in your region.",
            color: "indigo"
        },
        {
            icon: <Rocket size={32} />,
            title: "Tech & Innovation",
            description: "Integrate your travel tech solutions with our AI-driven discovery engine.",
            color: "violet"
        }
    ];

    const benefits = [
        "Global Reach to 1M+ Active Travelers",
        "AI-Powered Partner Dashboard",
        "Verified Impact Reporting Tools",
        "Priority Support & Dedicated Account Manager",
        "Exclusive Networking Events",
        "Co-Marketing Opportunities"
    ];

    return (
        <div className={`partner-with-us-page ${isVisible ? 'fade-in' : ''}`}>
            {/* Hero Section */}
            <section className="partner-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="badge-premium">
                        <Handshake size={14} />
                        <span>Global Partnership Network</span>
                    </div>
                    <h1 className="hero-title">
                        Empower the Future of <span className="gradient-text">Travel</span>
                    </h1>
                    <p className="hero-subtitle">
                        Join Seenomad's ecosystem of verified partners. Together, we're building a more sustainable, impactful, and connected world for every traveler.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary">
                            Become a Partner
                            <ArrowRight size={20} />
                        </button>
                        <button className="btn-secondary">
                            View Case Studies
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="partner-stats">
                <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Verified NGOs</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-number">120+</span>
                    <span className="stat-label">Countries Reached</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-number">$15M+</span>
                    <span className="stat-label">Impact Generated</span>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="section-header">
                    <h2>Who we partner with</h2>
                    <p>We collaborate with organizations across the globe to create meaningful travel experiences.</p>
                </div>
                <div className="categories-grid">
                    {partnerCategories.map((cat, index) => (
                        <div key={index} className={`category-card ${cat.color}`}>
                            <div className="card-icon">{cat.icon}</div>
                            <h3>{cat.title}</h3>
                            <p>{cat.description}</p>
                            <button className="card-link">
                                Learn More <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="benefits-container">
                    <div className="benefits-visual">
                        <div className="visual-box">
                            <Sparkles size={48} className="sparkle-icon" />
                            <div className="visual-content">
                                <h3>Why Partner with Seenomad?</h3>
                                <p>Unlock the full potential of your organization with our premium tools and global network.</p>
                            </div>
                        </div>
                    </div>
                    <div className="benefits-content">
                        <div className="benefits-list">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <CheckCircle2 size={20} className="check-icon" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-section">
                <div className="contact-container">
                    <div className="contact-info">
                        <h2>Ready to make an impact?</h2>
                        <p>Fill out the form and our partnership team will get back to you within 24 hours.</p>

                        <div className="info-items">
                            <div className="info-item">
                                <Mail size={20} />
                                <span>partners@seenomad.com</span>
                            </div>
                            <div className="info-item">
                                <Phone size={20} />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="info-item">
                                <MapPin size={20} />
                                <span>Global HQ, San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="partner-form">
                            <div className="form-group">
                                <label>Organization Name</label>
                                <input type="text" placeholder="e.g. Global Impact NGO" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Contact Name</label>
                                    <input type="text" placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Partner Type</label>
                                <select>
                                    <option>Select Type</option>
                                    <option>NGO / Non-Profit</option>
                                    <option>University / School</option>
                                    <option>Government / Tourism Board</option>
                                    <option>Travel Agency</option>
                                    <option>Tech Partner</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea placeholder="Tell us about your organization and how you'd like to partner..."></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                Send Partnership Request
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnerWithUs;
