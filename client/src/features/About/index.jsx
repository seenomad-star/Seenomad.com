import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import MarketGap from './components/MarketGap';
import Solution from './components/Solution';
import Innovation from './components/Innovation';
import Traction from './components/Traction';
import Future from './components/Future';
import '../../styles/About.css';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`about-page pitch-deck ${isVisible ? 'fade-in' : ''}`}>
            <Hero />
            <Problem />
            <MarketGap />
            <Solution />
            <Innovation />
            <Traction />
            <Future />
        </div>
    );
};

export default About;
