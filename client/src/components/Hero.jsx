import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content container fade-in">
                <h1 className="hero-title">
                    Explore the World <br />
                    <span className="highlight">Beyond Limits</span>
                </h1>
                <p className="hero-subtitle">
                    Discover breathtaking destinations, unique cultures, and unforgettable experiences. Your next adventure awaits.
                </p>
                <div className="hero-actions">
                    <button className="btn btn-primary">
                        Start Your Journey
                    </button>
                    <button className="btn btn-secondary">
                        Watch Video
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
