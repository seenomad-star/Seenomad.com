import React from 'react';

const Traction = () => {
    const milestones = [
        { year: "2023", title: "The Spark", description: "Seenomad was founded with a vision to gamify sustainable travel." },
        { year: "2024", title: "Global Launch", description: "Reached 100k active users across 50 countries." },
        { year: "2025", title: "AI Integration", description: "Launched the world's first AI Travel Mentor for nomads." },
        { year: "2026", title: "Impact Milestone", description: "Generated $10M in direct support for local NGOs." }
    ];

    return (
        <section className="pitch-section traction">
            <div className="section-header-pitch">
                <span className="section-number">05</span>
                <h2>Traction</h2>
                <p>Proven growth and real-world impact.</p>
            </div>
            <div className="traction-stats">
                <div className="t-stat">
                    <span className="t-value">1M+</span>
                    <span className="t-label">Active Nomads</span>
                </div>
                <div className="t-stat">
                    <span className="t-value">500+</span>
                    <span className="t-label">NGO Partners</span>
                </div>
                <div className="t-stat">
                    <span className="t-value">$10M+</span>
                    <span className="t-label">Impact Generated</span>
                </div>
            </div>
            <div className="pitch-timeline">
                {milestones.map((m, index) => (
                    <div key={index} className="p-timeline-item">
                        <span className="p-year">{m.year}</span>
                        <div className="p-content">
                            <h4>{m.title}</h4>
                            <p>{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Traction;
