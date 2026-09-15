import React from 'react';
import { Cpu, Fingerprint, Award } from 'lucide-react';

const Innovation = () => {
    const innovations = [
        {
            icon: <Cpu size={32} />,
            title: "AI Impact Mentor",
            description: "Personalized discovery that aligns your travel with global sustainability goals."
        },
        {
            icon: <Fingerprint size={32} />,
            title: "Unified Discovery",
            description: "One filterable feed for everything: Learning, Events, Support, and Games."
        },
        {
            icon: <Award size={32} />,
            title: "XP & Gamification",
            description: "Turn every trip into a quest. Earn rewards for verified social and environmental impact."
        }
    ];

    return (
        <section className="pitch-section innovation">
            <div className="section-header-pitch">
                <span className="section-number">04</span>
                <h2>Our Innovation</h2>
                <p>Proprietary technology driving the next generation of travel.</p>
            </div>
            <div className="innovation-grid">
                {innovations.map((i, index) => (
                    <div key={index} className="innovation-card">
                        <div className="innovation-icon">{i.icon}</div>
                        <h3>{i.title}</h3>
                        <p>{i.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Innovation;
