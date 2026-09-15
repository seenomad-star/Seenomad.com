import React from 'react';
import { AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';

const Problem = () => {
    const problems = [
        {
            icon: <AlertCircle size={32} />,
            title: "Fragmented Experience",
            description: "Travelers waste 40+ hours planning across 15+ disconnected platforms."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Zero Social Impact",
            description: "90% of travel spending never reaches the local communities being visited."
        },
        {
            icon: <BarChart3 size={32} />,
            title: "Boring Discovery",
            description: "Static search filters haven't evolved in 20 years, leading to 'tourist traps'."
        }
    ];

    return (
        <section className="pitch-section problem">
            <div className="section-header-pitch">
                <span className="section-number">01</span>
                <h2>The Problem</h2>
                <p>Why the current travel ecosystem fails the modern nomad.</p>
            </div>
            <div className="problem-grid">
                {problems.map((p, index) => (
                    <div key={index} className="problem-card">
                        <div className="problem-icon">{p.icon}</div>
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Problem;
