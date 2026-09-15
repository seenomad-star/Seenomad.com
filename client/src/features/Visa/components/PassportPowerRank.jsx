import React from 'react';
import { Award, TrendingUp, Globe, ChevronRight } from 'lucide-react';
import '../../../styles/PassportPowerRank.css';

const PassportPowerRank = () => {
    const rankings = [
        { rank: 1, country: 'Singapore', score: 194, change: '+1', flag: '🇸🇬' },
        { rank: 2, country: 'Japan', score: 192, change: '0', flag: '🇯🇵' },
        { rank: 3, country: 'Germany', score: 190, change: '0', flag: '🇩🇪' },
        { rank: 4, country: 'France', score: 189, change: '+2', flag: '🇫🇷' },
        { rank: 5, country: 'United States', score: 187, change: '-1', flag: '🇺🇸' },
    ];

    return (
        <div className="passport-rank-card">
            <div className="pr-header">
                <div className="pr-title">
                    <Award size={20} color="#FCD34D" />
                    <h3>Global Passport Power Index</h3>
                </div>
                <span className="last-updated">Updated Q1 2026</span>
            </div>

            <div className="rank-list">
                {rankings.map((r, i) => (
                    <div className="rank-item" key={i}>
                        <div className="rank-num">#{r.rank}</div>
                        <div className="rank-country">
                            <span className="r-flag">{r.flag}</span>
                            <div className="r-info">
                                <strong>{r.country}</strong>
                                <span>{r.score} Destinations</span>
                            </div>
                        </div>
                        <div className={`rank-change ${r.change.includes('+') ? 'up' : r.change === '0' ? 'stable' : 'down'}`}>
                            {r.change}
                        </div>
                    </div>
                ))}
            </div>

            <button className="full-rank-btn">
                View Full Ranking <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default PassportPowerRank;
