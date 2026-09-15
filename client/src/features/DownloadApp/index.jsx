import React, { useEffect, useState } from 'react';
import {
    Smartphone, Apple, PlayCircle, QrCode, ShieldCheck,
    Zap, Globe, Users, Star, ArrowRight, Sparkles,
    MapPin, Bell, Cloud
} from 'lucide-react';
import '../../styles/DownloadApp.css';

const DownloadApp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: <MapPin size={24} />,
            title: "Offline Discovery",
            description: "Access maps and destination guides even without an internet connection."
        },
        {
            icon: <Bell size={24} />,
            title: "Real-time Alerts",
            description: "Get instant safety alerts and flight updates directly to your pocket."
        },
        {
            icon: <Sparkles size={24} />,
            title: "AI Travel Mentor",
            description: "Your personal AI assistant, available 24/7 to help you navigate anywhere."
        },
        {
            icon: <Cloud size={24} />,
            title: "Cloud Sync",
            description: "Seamlessly sync your itineraries and bookings across all your devices."
        }
    ];

    return (
        <div className={`download-app-page ${isVisible ? 'fade-in' : ''}`}>
            {/* Hero Section */}
            <section className="download-hero">
                <div className="hero-content">
                    <div className="badge-premium">
                        <Sparkles size={14} />
                        <span>Next-Gen Travel Experience</span>
                    </div>
                    <h1 className="hero-title">
                        The World in Your <span className="gradient-text">Pocket</span>
                    </h1>
                    <p className="hero-subtitle">
                        Join over 1 million travelers using Seenomad to discover, plan, and experience the world with AI-powered insights and real-time utility.
                    </p>

                    <div className="download-ctas">
                        <button className="download-btn ios">
                            <Apple size={24} />
                            <div className="btn-text">
                                <span className="small">Download on the</span>
                                <span className="large">App Store</span>
                            </div>
                        </button>
                        <button className="download-btn android">
                            <PlayCircle size={24} />
                            <div className="btn-text">
                                <span className="small">Get it on</span>
                                <span className="large">Google Play</span>
                            </div>
                        </button>
                    </div>

                    <div className="social-proof">
                        <div className="user-avatars">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="avatar-placeholder"></div>
                            ))}
                            <div className="avatar-more">+1M</div>
                        </div>
                        <div className="rating-info">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                                ))}
                            </div>
                            <span>4.9/5 Rating from travelers</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="phone-mockup-container">
                        <div className="phone-mockup main">
                            <div className="phone-screen">
                                <div className="screen-content">
                                    <div className="app-header">
                                        <div className="header-logo">Seenomad</div>
                                        <Bell size={18} />
                                    </div>
                                    <div className="screen-body">
                                        <div className="card-skeleton"></div>
                                        <div className="card-skeleton small"></div>
                                        <div className="card-skeleton"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="phone-mockup secondary"></div>
                        <div className="visual-elements">
                            <div className="element floating-1"><Zap size={20} /></div>
                            <div className="element floating-2"><Globe size={20} /></div>
                            <div className="element floating-3"><ShieldCheck size={20} /></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features-section">
                <div className="section-header">
                    <h2>Why download the app?</h2>
                    <p>Unlock exclusive mobile-only features designed for the modern nomad.</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* QR Code Section */}
            <section className="qr-section">
                <div className="qr-container">
                    <div className="qr-content">
                        <h2>Scan to Download</h2>
                        <p>Point your camera at the QR code to download the Seenomad app instantly on your mobile device.</p>
                        <div className="qr-badges">
                            <div className="qr-badge">
                                <ShieldCheck size={16} />
                                <span>Secure & Verified</span>
                            </div>
                            <div className="qr-badge">
                                <Zap size={16} />
                                <span>Instant Setup</span>
                            </div>
                        </div>
                    </div>
                    <div className="qr-visual">
                        <div className="qr-code-box">
                            <QrCode size={120} strokeWidth={1.5} />
                            <div className="qr-scan-line"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bottom-cta">
                <div className="cta-card">
                    <h2>Ready to start your next adventure?</h2>
                    <p>Download Seenomad today and experience travel like never before.</p>
                    <button className="get-started-btn">
                        Get Started Now
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default DownloadApp;
