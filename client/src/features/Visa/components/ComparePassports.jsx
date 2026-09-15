import React, { useState } from 'react';
import { ArrowLeftRight, ShieldCheck, XCircle, Globe, Search } from 'lucide-react';
import '../../../styles/ComparePassports.css';

const ComparePassports = () => {
    const [p1, setP1] = useState('Singapore');
    const [p2, setP2] = useState('United Kingdom');

    const compareData = [
        { label: 'Visa Free', v1: '164', v2: '158' },
        { label: 'e-Visa', v1: '28', v2: '32' },
        { label: 'Visa Required', v1: '12', v2: '24' },
        { label: 'Global Rank', v1: '#1', v2: '#3' }
    ];

    return (
        <div className="compare-passports-card">
            <div className="cp-header">
                <ArrowLeftRight size={20} color="#3B82F6" />
                <h3>Side-by-Side Comparison</h3>
            </div>

            <div className="cp-selectors">
                <div className="cp-select-box">
                    <input type="text" value={p1} onChange={(e) => setP1(e.target.value)} />
                    <Search size={14} className="si" />
                </div>
                <div className="cp-vs">VS</div>
                <div className="cp-select-box">
                    <input type="text" value={p2} onChange={(e) => setP2(e.target.value)} />
                    <Search size={14} className="si" />
                </div>
            </div>

            <div className="cp-table">
                {compareData.map((row, i) => (
                    <div className="cp-row" key={i}>
                        <div className="cp-val">{row.v1}</div>
                        <div className="cp-label">{row.label}</div>
                        <div className="cp-val">{row.v2}</div>
                    </div>
                ))}
            </div>

            <div className="cp-footer">
                <Globe size={16} />
                <span>Comparing access to 198 global destinations.</span>
            </div>
        </div>
    );
};

export default ComparePassports;
