import React from 'react';
import { MapPin, TrendingUp, TrendingDown, Flame } from 'lucide-react';
import '../../styles/popular/TrendingDestinationsWidget.css';

const TrendingDestinationsWidget = () => {
    const destinations = [
        { name: 'Bali, Indonesia', trend: 'up', change: '+12% Value', urgency: 'Currency Gain: 15,420 IDR/USD', hot: true, prediction: 'Peak: May' },
        { name: 'Tokyo, Japan', trend: 'down', change: '-8% Airfare', urgency: 'Spring Bloom Window Open', hot: true, prediction: 'Optimal: Apr 12' },
        { name: 'Lisbon, Portugal', trend: 'up', change: '+15% Demand', urgency: 'New Nomad Hub: 1Gbps Fiber', hot: false, prediction: 'Hot: June' },
        { name: 'Seoul, Korea', trend: 'up', change: '+20% Deals', urgency: 'Flash Sale: 48h left', hot: true, prediction: 'Optimal: May 20' },
        { name: 'Mexico City, MX', trend: 'down', change: '-5% Stay', urgency: 'Digital Nomad Visa Promo', hot: false, prediction: 'Stable: All Year' },
    ];

    return (
        <div className="trending-destinations-widget">
            <div className="widget-header">
                <MapPin size={20} className="text-blue" />
                <h3>Discovery Intelligence</h3>
            </div>
            <div className="destinations-list">
                {destinations.map((dest, index) => (
                    <div key={index} className={`destination-item ${dest.hot ? 'hot' : ''}`}>
                        <div className="destination-info">
                            <div className="destination-rank">{index + 1}</div>
                            <div className="destination-details">
                                <div className="destination-header-row">
                                    <span className="destination-name">{dest.name}</span>
                                    <span className="ai-prediction-tag">{dest.prediction}</span>
                                </div>
                                <div className="destination-stats">
                                    <span className={`trend ${dest.trend}`}>
                                        {dest.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {dest.change}
                                    </span>
                                    <span className="urgency-intel">{dest.urgency}</span>
                                </div>
                            </div>
                        </div>
                        <button className="explore-intel-btn">Plan</button>
                    </div>
                ))}
            </div>
            <button className="see-more-btn">Open Global Heatmap</button>
        </div>
    );
};

export default TrendingDestinationsWidget;
