import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import '../styles/SeenomadPlusBanner.css';

const SeenomadPlusBanner = () => {
    return (
        <div className="seenomad-plus-banner">
            <div className="banner-content">
                <div className="banner-badge">
                    <Sparkles size={14} fill="#f59e0b" />
                    <span>PREMIUM</span>
                </div>
                <h2>Unlock the Full Seenomad Experience</h2>
                <p>Join Seenomad Plus for exclusive access to hidden gems, unlimited virtual tours, and priority support.</p>

                <div className="banner-features">
                    <div className="feature-item">
                        <Check size={16} />
                        <span>Unlimited Virtual Tours</span>
                    </div>
                    <div className="feature-item">
                        <Check size={16} />
                        <span>Exclusive Hidden Gems</span>
                    </div>
                    <div className="feature-item">
                        <Check size={16} />
                        <span>Priority Support</span>
                    </div>
                </div>
            </div>

            <div className="banner-cta">
                <div className="price-tag">
                    <span className="currency">$</span>
                    <span className="amount">9.99</span>
                    <span className="period">/mo</span>
                </div>
                <button className="join-btn">
                    Join Now
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default SeenomadPlusBanner;
