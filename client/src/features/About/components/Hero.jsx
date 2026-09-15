import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="pitch-section hook">
            <div className="pitch-content">
                <div className="badge-pitch">
                    <Rocket size={14} />
                    <span>The Future of Travel</span>
                </div>
                <h1 className="pitch-title">
                    Travel is <span className="highlight-red">Broken.</span><br />
                    We're the <span className="gradient-text">Solution.</span>
                </h1>
                <p className="pitch-subtitle">
                    The $9 Trillion travel industry is stuck in the past. Seenomad is the first AI-driven, gamified impact engine designed for the modern global citizen.
                </p>
                <div className="pitch-actions">
                    <button className="btn-pitch-primary">
                        See the Innovation
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
