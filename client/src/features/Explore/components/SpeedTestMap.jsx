import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, MapPin, Star, Upload, CheckCircle, Zap, Coffee, Building, Hotel, PlusCircle, X, Gauge, TrendingUp, Users } from 'lucide-react';
import '../../../styles/NomadFeatures.css';

const speedTestData = [
    { id: 1, name: 'Dojo Bali', type: 'coworking', city: 'Canggu, Bali', lat: 38, lng: 22, download: 120, upload: 80, ping: 12, rating: 4.8, reviews: 234, color: '#10B981' },
    { id: 2, name: 'Outpost Ubud', type: 'coworking', city: 'Ubud, Bali', lat: 55, lng: 38, download: 85, upload: 45, ping: 18, rating: 4.6, reviews: 189, color: '#10B981' },
    { id: 3, name: 'Tropical Nomad Cafe', type: 'cafe', city: 'Seminyak, Bali', lat: 30, lng: 60, download: 60, upload: 30, ping: 25, rating: 4.4, reviews: 156, color: '#F59E0B' },
    { id: 4, name: 'Second Home Lisboa', type: 'coworking', city: 'Lisbon', lat: 68, lng: 18, download: 250, upload: 150, ping: 5, rating: 4.9, reviews: 412, color: '#10B981' },
    { id: 5, name: 'Fabrica Coffee', type: 'cafe', city: 'Lisbon', lat: 72, lng: 30, download: 150, upload: 80, ping: 8, rating: 4.7, reviews: 298, color: '#10B981' },
    { id: 6, name: 'Selina Medellin', type: 'coliving', city: 'El Poblado, Medellin', lat: 48, lng: 75, download: 300, upload: 200, ping: 4, rating: 4.7, reviews: 521, color: '#10B981' },
    { id: 7, name: 'Pergamino Café', type: 'cafe', city: 'Medellin', lat: 42, lng: 82, download: 100, upload: 50, ping: 15, rating: 4.9, reviews: 344, color: '#10B981' },
    { id: 8, name: 'The Hive BKK', type: 'coworking', city: 'Bangkok', lat: 20, lng: 55, download: 180, upload: 120, ping: 7, rating: 4.5, reviews: 267, color: '#10B981' },
    { id: 9, name: 'Blue Sky Cafe', type: 'cafe', city: 'Chiang Mai', lat: 25, lng: 45, download: 45, upload: 20, ping: 32, rating: 3.9, reviews: 78, color: '#EF4444' },
    { id: 10, name: 'CAMP Cafe - Maya Mall', type: 'cafe', city: 'Chiang Mai', lat: 18, lng: 38, download: 75, upload: 40, ping: 15, rating: 4.3, reviews: 188, color: '#F59E0B' },
];

const getSpeedColor = (speed) => {
    if (speed >= 100) return '#10B981';
    if (speed >= 50) return '#F59E0B';
    return '#EF4444';
};

const getSpeedLabel = (speed) => {
    if (speed >= 100) return 'Blazing';
    if (speed >= 50) return 'Good';
    return 'Slow';
};

const typeIcons = { cafe: Coffee, coworking: Building, coliving: Users, hotel: Hotel };
const TypeIcon = ({ type }) => { const IC = typeIcons[type] || MapPin; return <IC size={14} />; };

const ContributeModal = ({ onClose, onSubmit }) => {
    const [form, setForm] = useState({ name: '', type: 'cafe', city: '', download: '', upload: '', ping: '' });
    const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); onClose(); };
    return (
        <motion.div className="smt-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div className="smt-modal" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={e => e.stopPropagation()}>
                <div className="smt-modal-header">
                    <h3><Upload size={18} /> Contribute Speed Test</h3>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <p className="smt-modal-desc">Help the nomad community by sharing your Wi-Fi speed test. Earn +50 XP!</p>
                <form onSubmit={handleSubmit} className="smt-form">
                    <div className="form-row">
                        <label>Spot Name</label>
                        <input required placeholder="e.g. Fabrica Coffee" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="form-row">
                        <label>Type</label>
                        <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                            <option value="cafe">Cafe</option>
                            <option value="coworking">Coworking Space</option>
                            <option value="coliving">Coliving</option>
                            <option value="hotel">Hotel</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label>City</label>
                        <input required placeholder="e.g. Lisbon, Portugal" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                    </div>
                    <div className="form-grid-3">
                        <div className="form-row">
                            <label>Download (Mbps)</label>
                            <input type="number" required placeholder="120" value={form.download} onChange={e => setForm({...form, download: e.target.value})} />
                        </div>
                        <div className="form-row">
                            <label>Upload (Mbps)</label>
                            <input type="number" required placeholder="80" value={form.upload} onChange={e => setForm({...form, upload: e.target.value})} />
                        </div>
                        <div className="form-row">
                            <label>Ping (ms)</label>
                            <input type="number" placeholder="12" value={form.ping} onChange={e => setForm({...form, ping: e.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className="smt-submit-btn"><Zap size={16}/> Submit & Earn XP</button>
                </form>
            </motion.div>
        </motion.div>
    );
};

const SpeedTestMap = () => {
    const [selected, setSelected] = useState(null);
    const [showContribute, setShowContribute] = useState(false);
    const [contributed, setContributed] = useState([]);
    const [filter, setFilter] = useState('all');
    const [justContributed, setJustContributed] = useState(false);

    const allSpots = [...speedTestData, ...contributed];
    const filteredSpots = filter === 'all' ? allSpots : allSpots.filter(s => s.type === filter);

    const handleContribute = (data) => {
        const newSpot = { ...data, id: Date.now(), lat: 40 + Math.random() * 30, lng: 30 + Math.random() * 40, download: parseInt(data.download), upload: parseInt(data.upload), ping: parseInt(data.ping) || 20, rating: 4.5, reviews: 1, color: getSpeedColor(parseInt(data.download)) };
        setContributed(prev => [...prev, newSpot]);
        setJustContributed(true);
        setTimeout(() => setJustContributed(false), 3000);
    };

    return (
        <div className="speed-test-map-container">
            <div className="smt-header">
                <div>
                    <h2 className="smt-title"><Wifi size={22} className="smt-title-icon" /> Speed Test Map</h2>
                    <p className="smt-subtitle">Real nomad-contributed Wi-Fi data from around the world</p>
                </div>
                <button className="smt-contribute-btn" onClick={() => setShowContribute(true)}>
                    <PlusCircle size={16} /> Contribute Test
                </button>
            </div>

            {justContributed && (
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="smt-success-banner">
                    <CheckCircle size={18} /> Speed test submitted! You earned +50 XP 🎉
                </motion.div>
            )}

            <div className="smt-legend">
                <span className="legend-item fast">● Blazing (100+ Mbps)</span>
                <span className="legend-item medium">● Good (50–99 Mbps)</span>
                <span className="legend-item slow">● Slow (&lt;50 Mbps)</span>
            </div>

            <div className="smt-filters">
                {['all', 'cafe', 'coworking', 'coliving', 'hotel'].map(f => (
                    <button key={f} className={`smt-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="smt-main">
                {/* Stylized Map Canvas */}
                <div className="smt-map-canvas">
                    <div className="map-grid-lines">
                        {[...Array(6)].map((_, i) => <div key={i} className="grid-h-line" style={{ top: `${i * 20}%` }} />)}
                        {[...Array(6)].map((_, i) => <div key={i} className="grid-v-line" style={{ left: `${i * 20}%` }} />)}
                    </div>
                    <div className="map-label">🌍 Global Nomad Wi-Fi Network</div>
                    {filteredSpots.map(spot => (
                        <motion.button
                            key={spot.id}
                            className={`map-pin ${selected?.id === spot.id ? 'selected' : ''}`}
                            style={{ top: `${spot.lat}%`, left: `${spot.lng}%`, '--pin-color': spot.color || getSpeedColor(spot.download) }}
                            onClick={() => setSelected(selected?.id === spot.id ? null : spot)}
                            whileHover={{ scale: 1.3 }}
                            whileTap={{ scale: 0.9 }}
                            title={spot.name}
                        >
                            <span className="pin-pulse"></span>
                        </motion.button>
                    ))}
                </div>

                {/* Side Panel */}
                <div className="smt-side-panel">
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="smt-spot-detail">
                                <div className="spot-detail-header">
                                    <div className="spot-detail-type"><TypeIcon type={selected.type} /> {selected.type}</div>
                                    <button className="spot-close-btn" onClick={() => setSelected(null)}><X size={16} /></button>
                                </div>
                                <h3>{selected.name}</h3>
                                <div className="spot-detail-city"><MapPin size={14} /> {selected.city}</div>
                                <div className="speed-gauges">
                                    <div className="speed-gauge">
                                        <div className="gauge-val" style={{ color: getSpeedColor(selected.download) }}>{selected.download}</div>
                                        <div className="gauge-unit">Mbps ↓</div>
                                        <div className="gauge-label">{getSpeedLabel(selected.download)}</div>
                                    </div>
                                    <div className="speed-gauge">
                                        <div className="gauge-val" style={{ color: getSpeedColor(selected.upload) }}>{selected.upload}</div>
                                        <div className="gauge-unit">Mbps ↑</div>
                                    </div>
                                    <div className="speed-gauge">
                                        <div className="gauge-val ping">{selected.ping || '—'}</div>
                                        <div className="gauge-unit">ms ping</div>
                                    </div>
                                </div>
                                <div className="spot-meta">
                                    <div className="spot-meta-item"><Star size={14} fill="gold" stroke="gold" />{selected.rating} ({selected.reviews} tests)</div>
                                </div>
                                <button className="report-wifi-btn" onClick={() => setShowContribute(true)}>
                                    <Upload size={14} /> Update This Spot
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="smt-spot-list">
                                <div className="smt-list-header"><TrendingUp size={16} /> Top Spots</div>
                                {filteredSpots.slice(0, 6).map(spot => (
                                    <div key={spot.id} className="smt-list-item" onClick={() => setSelected(spot)}>
                                        <div className="smt-list-dot" style={{ background: spot.color || getSpeedColor(spot.download) }} />
                                        <div className="smt-list-info">
                                            <div className="smt-list-name">{spot.name}</div>
                                            <div className="smt-list-city">{spot.city}</div>
                                        </div>
                                        <div className="smt-list-speed" style={{ color: spot.color || getSpeedColor(spot.download) }}>
                                            <Gauge size={12} /> {spot.download}M
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {showContribute && <ContributeModal onClose={() => setShowContribute(false)} onSubmit={handleContribute} />}
            </AnimatePresence>
        </div>
    );
};

export default SpeedTestMap;
