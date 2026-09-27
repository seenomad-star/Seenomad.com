import React from 'react';
import PartnerSpotlight from './PartnerSpotlight';
import QuestLog from './QuestLog';
import LockedInsights from './LockedInsights';
import './IntelligenceSidecar.css';

const IntelligenceSidecar = () => {
    return (
        <div className="intelligence-sidecar-content">
            <PartnerSpotlight />
            <QuestLog />
            <LockedInsights />
        </div>
    );
};

export default IntelligenceSidecar;
