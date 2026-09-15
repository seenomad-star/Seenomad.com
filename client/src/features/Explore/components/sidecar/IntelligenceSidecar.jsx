import React from 'react';
import LivePulseTicker from './LivePulseTicker';
import PartnerSpotlight from './PartnerSpotlight';
import QuestLog from './QuestLog';
import LockedInsights from './LockedInsights';
import './IntelligenceSidecar.css';

const IntelligenceSidecar = () => {
    return (
        <div className="intelligence-sidecar-content">
            <LivePulseTicker />
            <PartnerSpotlight />
            <QuestLog />
            <LockedInsights />
        </div>
    );
};

export default IntelligenceSidecar;
