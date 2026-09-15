import React from 'react';

const CheckCircle2 = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const Solution = () => {
    return (
        <section className="pitch-section solution">
            <div className="solution-visual">
                <div className="visual-blob-pitch"></div>
                <div className="app-preview-pitch">
                    <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=1000" alt="Seenomad Solution" />
                </div>
            </div>
            <div className="solution-content">
                <span className="section-number">03</span>
                <h2>The Solution</h2>
                <p>Seenomad is a unified discovery engine that turns travel into a high-impact, gamified experience.</p>
                <ul className="solution-list">
                    <li>
                        <CheckCircle2 size={20} className="check-icon" />
                        <span><strong>Unified Discovery:</strong> Everything in one filterable feed.</span>
                    </li>
                    <li>
                        <CheckCircle2 size={20} className="check-icon" />
                        <span><strong>AI Impact Mentor:</strong> Data-driven sustainability insights.</span>
                    </li>
                    <li>
                        <CheckCircle2 size={20} className="check-icon" />
                        <span><strong>Gamified Retention:</strong> XP, levels, and real-world rewards.</span>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default Solution;
