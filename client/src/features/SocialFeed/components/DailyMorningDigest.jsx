import React, { useState } from 'react';
import { BellRing, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../../../store/toastStore';
import '../styles/DailyMorningDigest.css';

const DailyMorningDigest = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const [isEnabled, setIsEnabled] = useState(() => {
        return localStorage.getItem('seenomad-morning-digest') === 'true';
    });

    const handleToggle = () => {
        const nextState = !isEnabled;
        setIsEnabled(nextState);
        localStorage.setItem('seenomad-morning-digest', nextState ? 'true' : 'false');
        if (nextState) {
            addToast('Daily Morning Digest enabled! You will receive itinerary updates at 7:00 AM.', 'success');
        } else {
            addToast('Daily Morning Digest paused.', 'info');
        }
    };

    const handlePlanTrip = () => {
        navigate('/explore');
        addToast('Opening travel itinerary planner...', 'info');
    };

    return (
        <div className="daily-digest-card">
            <div className="digest-top-row">
                <div className="digest-left">
                    <div className="digest-icon-badge">
                        <BellRing size={20} className="bell-icon" />
                    </div>
                    <div className="digest-titles">
                        <h3 className="digest-heading">Daily Morning Digest</h3>
                        <p className="digest-subheading">Wake up to your day's travel plan every morning</p>
                    </div>
                </div>

                <div className="digest-toggle-wrap">
                    <button
                        type="button"
                        className={`digest-toggle-switch ${isEnabled ? 'active' : ''}`}
                        onClick={handleToggle}
                        aria-label="Toggle Daily Morning Digest"
                        title={isEnabled ? 'Click to disable digest' : 'Click to enable digest'}
                    >
                        <span className="toggle-handle">
                            {isEnabled && <Check size={10} className="toggle-check" />}
                        </span>
                    </button>
                </div>
            </div>

            <div className="digest-divider" />

            <div className="digest-bottom-row">
                <p className="digest-description">
                    Enable to get a daily email with your itinerary activities each morning.
                </p>
                <button
                    type="button"
                    className="plan-trip-btn"
                    onClick={handlePlanTrip}
                >
                    <span>Plan Trip</span>
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default DailyMorningDigest;
