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
                            <span>Traveluh OS</span>
                        </div>
                        <p>The ultimate AI-powered booking ecosystem for the modern digital nomad.</p>
                        <div className="social-links">
                            <a href="#"><Facebook size={20} /></a>
                            <a href="#"><Twitter size={20} /></a>
                            <a href="#"><Instagram size={20} /></a>
                            <a href="#"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Explore The World</h4>
                        <ul>
                            <li><a href="#">Flight Search</a></li>
                            <li><a href="#">International Hotels</a></li>
                            <li><a href="#">Digital Nomad Hubs</a></li>
                            <li><a href="#">Holiday Packages</a></li>
                            <li><a href="#">Visa Information</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Platform Offerings</h4>
                        <ul>
                            <li><a href="#">Travel Insurance</a></li>
                            <li><a href="#">Corporate (myBiz)</a></li>
                            <li><a href="#">Forex Cards</a></li>
                            <li><a href="#">Gift Cards</a></li>
                            <li><a href="#">Traveluh Blog</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Support & Legal</h4>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">PNR Status</a></li>
                            <li><a href="#">Refund Policy</a></li>
                            <li><a href="/legal">Terms of Service</a></li>
                            <li><a href="/legal">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Traveluh Ecosystem (Powered by Seenomad). All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
