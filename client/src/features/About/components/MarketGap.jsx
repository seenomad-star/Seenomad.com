import React from 'react';

const MarketGap = () => {
    return (
        <section className="pitch-section market-gap">
            <div className="gap-container">
                <div className="gap-content">
                    <span className="section-number">02</span>
                    <h2>The Market Gap</h2>
                    <p>Legacy platforms like Expedia and Airbnb focus on <strong>transactions</strong>. Seenomad focuses on <strong>transformation</strong>.</p>
                    <div className="comparison-table">
                        <div className="comp-row header">
                            <span>Feature</span>
                            <span>Legacy Platforms</span>
                            <span className="highlight">Seenomad</span>
                        </div>
                        <div className="comp-row">
                            <span>Discovery</span>
                            <span>Static Filters</span>
                            <span className="highlight">AI-Adaptive Feed</span>
                        </div>
                        <div className="comp-row">
                            <span>Incentives</span>
                            <span>Points/Miles</span>
                            <span className="highlight">Impact XP & Badges</span>
                        </div>
                        <div className="comp-row">
                            <span>Community</span>
                            <span>Reviews Only</span>
                            <span className="highlight">Verified Impact Network</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketGap;
