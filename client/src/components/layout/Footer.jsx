import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Globe, MapPin, Building2, Plane, ShieldCheck, Mail } from 'lucide-react';
import '../../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer mega-footer">
            <div className="container">
                <div className="mf-top-metrics">
                    <div className="mf-metric"><Globe size={24} color="#3B82F6" /> <div><strong>150+</strong> Countries Covered</div></div>
                    <div className="mf-metric"><Building2 size={24} color="#A855F7" /> <div><strong>1.2M+</strong> Hotel Partners</div></div>
                    <div className="mf-metric"><Plane size={24} color="#10B981" /> <div><strong>500+</strong> Airlines Connected</div></div>
                    <div className="mf-metric"><ShieldCheck size={24} color="#F59E0B" /> <div><strong>10M+</strong> Secure Bookings</div></div>
                </div>

                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <Globe className="logo-icon" color="#3B82F6" />
                            <span>SeeNomad</span>
                        </div>
                        <p>The premier global travel intelligence and digital nomad community platform.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Explore Destinations</h4>
                        <ul>
                            <li><a href="/explore">Global Destinations</a></li>
                            <li><a href="/explore?view=map">Interactive World Map</a></li>
                            <li><a href="/explore?tab=visas">Digital Nomad Visas</a></li>
                            <li><a href="/popular">Scenic Travel Reels</a></li>
                            <li><a href="/event-festival">Festivals & Events</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Nomad Services</h4>
                        <ul>
                            <li><a href="/ai-agents">AI Travel Concierge</a></li>
                            <li><a href="/business-partner">Nomad Stays & Deals</a></li>
                            <li><a href="/learning-voluntourism">Eco Voluntourism</a></li>
                            <li><a href="/community">Nomad Community Hub</a></li>
                            <li><a href="/insights-analytics">Cost of Living & Trends</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Trust, Legal & Ads</h4>
                        <ul>
                            <li><a href="/legal?tab=privacy">Privacy Policy (AdSense)</a></li>
                            <li><a href="/legal?tab=tos">Terms of Service</a></li>
                            <li><a href="/legal?tab=cookies">Cookie Policy</a></li>
                            <li><a href="/legal?tab=adsense">Advertising & FTC Disclosure</a></li>
                            <li><a href="/about">About SeeNomad</a></li>
                            <li><a href="/legal?tab=contact">Contact & Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} SeeNomad. All rights reserved. Compliant with Google AdSense Publisher Policies & GDPR.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
