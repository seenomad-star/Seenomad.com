import React, { useState } from 'react';
import { PieChart, DollarSign, TrendingUp, Activity, Bed, Plane, Utensils } from 'lucide-react';
import '../../../../styles/ItineraryCostDashboard.css';

const ItineraryCostDashboard = () => {
    // Mock Data for the Cost Visualization
    const categories = [
        { id: 'flight', name: 'Flights & Transit', cost: 1250, color: '#3B82F6', icon: Plane },
        { id: 'hotel', name: 'Accommodation', cost: 980, color: '#A855F7', icon: Bed },
        { id: 'food', name: 'Food & Dining', cost: 450, color: '#F59E0B', icon: Utensils },
        { id: 'activity', name: 'Experiences', cost: 320, color: '#10B981', icon: Activity },
    ];

    const totalCost = categories.reduce((acc, cat) => acc + cat.cost, 0);

    return (
        <div className="cost-dashboard-container">
            <div className="cd-header">
                <h2><PieChart size={24} color="#A855F7" /> Financial Command Center</h2>
                <div className="total-metrics">
                    <div className="metric">
                        <span>Total Projected Spending</span>
                        <h3>${totalCost.toLocaleString()}</h3>
                    </div>
                    <div className="metric highlight">
                        <span>Daily Average (14 Days)</span>
                        <h3>${Math.round(totalCost / 14)}/day</h3>
                    </div>
                </div>
            </div>

            <div className="cd-main">
                <div className="cd-chart-card">
                    <h3>Budget Allocation</h3>
                    <div className="css-donut-chart">
                        {/* CSS-based Donut Visualization */}
                        <div className="donut-ring" style={{
                            background: `conic-gradient(
                                #3B82F6 0% 41%, 
                                #A855F7 41% 74%, 
                                #F59E0B 74% 89%, 
                                #10B981 89% 100%
                            )`
                        }}>
                            <div className="donut-hole">
                                <DollarSign size={32} color="rgba(255,255,255,0.4)" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cd-breakdown">
                    <h3>Category Breakdown</h3>
                    <div className="breakdown-list">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const percentage = Math.round((cat.cost / totalCost) * 100);
                            return (
                                <div className="bk-item" key={cat.id}>
                                    <div className="bk-info">
                                        <div className="bk-icon" style={{ background: `${cat.color}20`, color: cat.color }}>
                                            <Icon size={16} />
                                        </div>
                                        <div className="bk-meta">
                                            <h4>{cat.name}</h4>
                                            <span>{percentage}% of total</span>
                                        </div>
                                    </div>
                                    <div className="bk-value">
                                        ${cat.cost.toLocaleString()}
                                    </div>
                                    <div className="bk-bar-bg">
                                        <div className="bk-bar-fill" style={{ width: `${percentage}%`, background: cat.color }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <div className="cd-footer-alert">
                <TrendingUp size={18} color="#10B981" />
                <span>Great job! Your accommodation spending is <strong>15% lower</strong> than similar digital nomads traveling to this destination.</span>
            </div>
        </div>
    );
};

export default ItineraryCostDashboard;
