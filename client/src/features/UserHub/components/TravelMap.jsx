import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Flag, TrendingUp, Zap, Star, Plus, Award, Calendar } from 'lucide-react';
import '../../../styles/NomadFeatures.css';

const visitedCountries = [
    { code: 'TH', name: 'Thailand', emoji: '🇹🇭', year: 2023, cities: ['Bangkok', 'Chiang Mai', 'Koh Samui'], duration: '45 days', xp: 500 },
    { code: 'ID', name: 'Indonesia', emoji: '🇮🇩', year: 2023, cities: ['Bali', 'Lombok', 'Yogyakarta'], duration: '60 days', xp: 600 },
    { code: 'PT', name: 'Portugal', emoji: '🇵🇹', year: 2024, cities: ['Lisbon', 'Porto', 'Algarve'], duration: '30 days', xp: 450 },
    { code: 'CO', name: 'Colombia', emoji: '🇨🇴', year: 2024, cities: ['Medellin', 'Bogota', 'Cartagena'], duration: '40 days', xp: 480 },
    { code: 'MX', name: 'Mexico', emoji: '🇲🇽', year: 2024, cities: ['Mexico City', 'Playa del Carmen', 'Oaxaca'], duration: '25 days', xp: 350 },
    { code: 'JP', name: 'Japan', emoji: '🇯🇵', year: 2025, cities: ['Tokyo', 'Osaka', 'Kyoto'], duration: '21 days', xp: 800 },
];

const achievements = [
    { id: 1, name: 'First Flight', icon: '✈️', desc: 'Took your first international trip', earned: true, xp: 100 },
    { id: 2, name: 'Continent Hopper', icon: '🌍', desc: 'Visited 3+ continents', earned: true, xp: 500 },
    { id: 3, name: 'Speed Scout', icon: '📡', desc: 'Contributed 10+ speed tests', earned: true, xp: 200 },
    { id: 4, name: 'Nomad Elder', icon: '🏅', desc: 'Spent 180+ days abroad', earned: true, xp: 1000 },
    { id: 5, name: 'Visa Wizard', icon: '🧙', desc: 'Visited 10+ countries visa-free', earned: false, xp: 600 },
    { id: 6, name: 'Community Pillar', icon: '👥', desc: 'Get 100+ likes on recommendations', earned: false, xp: 400 },
    { id: 7, name: 'Around the World', icon: '🌐', desc: 'Visit all 6 inhabited continents', earned: false, xp: 5000 },
    { id: 8, name: 'Record Breaker', icon: '⚡', desc: 'Log a 500+ Mbps speed test', earned: false, xp: 300 },
];

// Simple SVG world map representation using country blobs
const WorldMapSVG = ({ visited }) => {
    const visitedCodes = visited.map(v => v.code);
    return (
        <div className="world-map-visual">
            <div className="map-globe-wrap">
                <div className="map-globe">
                    {visited.map((country, i) => (
                        <motion.div
                            key={country.code}
                            className="country-pin"
                            style={{
                                '--pin-angle': `${(i / visited.length) * 360}deg`,
                                '--pin-radius': `${80 + (i % 3) * 25}px`
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.15, type: 'spring' }}
                        >
                            <div className="country-pin-flag">{country.emoji}</div>
                            <div className="country-pin-name">{country.name}</div>
                        </motion.div>
                    ))}
                    <div className="globe-center">
                        <Globe size={40} className="globe-icon" />
                        <div className="globe-count">{visited.length}</div>
                        <div className="globe-label">Countries</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TravelMap = () => {
    const [activeTab, setActiveTab] = useState('journey');
    const [expandedCountry, setExpandedCountry] = useState(null);

    const totalDays = visitedCountries.reduce((sum, c) => sum + parseInt(c.duration), 0);
    const totalCities = visitedCountries.reduce((sum, c) => sum + c.cities.length, 0);
    const totalXP = visitedCountries.reduce((sum, c) => sum + c.xp, 0);

    return (
        <div className="travel-map-container">
            <div className="tm-header">
                <div>
                    <h2 className="tm-title"><Globe size={22} /> My Travel Journey</h2>
                    <p className="tm-subtitle">Your nomad story, mapped across the world</p>
                </div>
                <button className="tm-add-btn"><Plus size={16}/> Log Visit</button>
            </div>

            <div className="tm-stats-bar">
                <div className="tm-stat">
                    <Flag size={18} className="tm-stat-icon" />
                    <div className="tm-stat-val">{visitedCountries.length}</div>
                    <div className="tm-stat-lbl">Countries</div>
                </div>
                <div className="tm-stat">
                    <MapPin size={18} className="tm-stat-icon" />
                    <div className="tm-stat-val">{totalCities}</div>
                    <div className="tm-stat-lbl">Cities</div>
                </div>
                <div className="tm-stat">
                    <Calendar size={18} className="tm-stat-icon" />
                    <div className="tm-stat-val">{totalDays}</div>
                    <div className="tm-stat-lbl">Days Abroad</div>
                </div>
                <div className="tm-stat">
                    <Zap size={18} className="tm-stat-icon golden" />
                    <div className="tm-stat-val golden">{totalXP.toLocaleString()}</div>
                    <div className="tm-stat-lbl">XP Earned</div>
                </div>
            </div>

            <div className="tm-tabs">
                {[['journey', 'Journey Map'], ['achievements', 'Achievements']].map(([k, l]) => (
                    <button key={k} className={`tm-tab ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>{l}</button>
                ))}
            </div>

            {activeTab === 'journey' && (
                <div className="tm-journey">
                    <WorldMapSVG visited={visitedCountries} />
                    <div className="tm-country-list">
                        <div className="tcl-header"><TrendingUp size={16} /> Countries Visited</div>
                        {visitedCountries.map((c, i) => (
                            <motion.div
                                key={c.code}
                                className={`tcl-item ${expandedCountry === c.code ? 'expanded' : ''}`}
                                onClick={() => setExpandedCountry(expandedCountry === c.code ? null : c.code)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <div className="tcl-main">
                                    <span className="tcl-flag">{c.emoji}</span>
                                    <div className="tcl-info">
                                        <div className="tcl-name">{c.name}</div>
                                        <div className="tcl-meta">{c.duration} · {c.year}</div>
                                    </div>
                                    <div className="tcl-xp"><Zap size={13} /> +{c.xp} XP</div>
                                </div>
                                {expandedCountry === c.code && (
                                    <motion.div className="tcl-cities" initial={{ height: 0 }} animate={{ height: 'auto' }}>
                                        {c.cities.map((city, j) => (
                                            <span key={j} className="tcl-city-chip"><MapPin size={11}/> {city}</span>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'achievements' && (
                <div className="tm-achievements">
                    <div className="ach-earned-section">
                        <div className="ach-section-title">🏆 Earned</div>
                        <div className="ach-grid">
                            {achievements.filter(a => a.earned).map((ach, i) => (
                                <motion.div key={ach.id} className="ach-card earned" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                                    <div className="ach-icon">{ach.icon}</div>
                                    <div className="ach-name">{ach.name}</div>
                                    <div className="ach-desc">{ach.desc}</div>
                                    <div className="ach-xp"><Zap size={12}/> +{ach.xp} XP</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="ach-locked-section">
                        <div className="ach-section-title">🔒 Locked</div>
                        <div className="ach-grid">
                            {achievements.filter(a => !a.earned).map((ach, i) => (
                                <motion.div key={ach.id} className="ach-card locked" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                                    <div className="ach-icon locked-icon">{ach.icon}</div>
                                    <div className="ach-name">{ach.name}</div>
                                    <div className="ach-desc">{ach.desc}</div>
                                    <div className="ach-xp locked-xp"><Zap size={12}/> {ach.xp} XP</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelMap;
