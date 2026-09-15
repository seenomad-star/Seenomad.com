import React from 'react';
import {
    Mail,
    Phone,
    MessageSquare,
    Globe,
    MapPin,
    Send,
    Clock,
    Shield
} from 'lucide-react';

const Contact = () => {
    return (
        <div className="partner-contact">
            <div className="view-header">
                <h2>Contact Partner Support</h2>
                <p>Our dedicated partner success team is here to help you grow.</p>
            </div>

            <div className="contact-grid">
                {/* Contact Form */}
                <div className="contact-form-section glass">
                    <h3>Send us a message</h3>
                    <form className="contact-form">
                        <div className="form-group">
                            <label>Subject</label>
                            <select className="glass-input">
                                <option>General Inquiry</option>
                                <option>Technical Support</option>
                                <option>Billing & Payouts</option>
                                <option>Partnership Opportunities</option>
                                <option>Advertising Support</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea className="glass-input" placeholder="How can we help you today?" rows="5"></textarea>
                        </div>
                        <button type="submit" className="send-btn premium-gradient">
                            <Send size={18} />
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="contact-info-section">
                    <div className="info-card glass">
                        <div className="info-icon purple">
                            <Mail size={24} />
                        </div>
                        <div className="info-text">
                            <h4>Email Support</h4>
                            <p>partners@seenomad.com</p>
                            <span>Response time: &lt; 2 hours</span>
                        </div>
                    </div>
                    <div className="info-card glass">
                        <div className="info-icon blue">
                            <MessageSquare size={24} />
                        </div>
                        <div className="info-text">
                            <h4>Live Chat</h4>
                            <p>Available for Gold & Platinum partners</p>
                            <span>24/7 Priority Support</span>
                        </div>
                    </div>
                    <div className="info-card glass">
                        <div className="info-icon green">
                            <Phone size={24} />
                        </div>
                        <div className="info-text">
                            <h4>Phone Support</h4>
                            <p>+1 (800) NOMAD-BIZ</p>
                            <span>Mon-Fri, 9am - 6pm EST</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Tiers */}
            <div className="support-tiers glass">
                <div className="section-header">
                    <h3>Support Tiers</h3>
                </div>
                <div className="tiers-grid">
                    <div className="tier-item silver">
                        <h4>Silver</h4>
                        <ul>
                            <li>Email Support</li>
                            <li>48h Response Time</li>
                            <li>Basic Help Center</li>
                        </ul>
                    </div>
                    <div className="tier-item gold active">
                        <div className="active-badge">Current</div>
                        <h4>Gold</h4>
                        <ul>
                            <li>Priority Email</li>
                            <li>2h Response Time</li>
                            <li>Live Chat Access</li>
                        </ul>
                    </div>
                    <div className="tier-item platinum">
                        <h4>Platinum</h4>
                        <ul>
                            <li>Dedicated Manager</li>
                            <li>Instant Response</li>
                            <li>24/7 Phone Support</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
