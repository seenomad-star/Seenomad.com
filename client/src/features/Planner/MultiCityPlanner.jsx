import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, MapPin, Trash2, 
    ArrowRight, Map, Zap, 
    Sparkles, LayoutGrid, List,
    X as CloseIcon
} from 'lucide-react';
import SignificanceHeatmap from './components/SignificanceHeatmap';
import GeoIntelligenceCard from './components/GeoIntelligenceCard';
import '../../styles/NomadFeatures.css';
import '../../styles/AddictionFeatures.css';

const MultiCityPlanner = () => {
    const [cities, setCities] = useState([
        { id: 1, name: 'Bali', days: 5, vibe: 'Relax' },
        { id: 2, name: 'Kyoto', days: 4, vibe: 'Culture' },
        { id: 3, name: 'Bangkok', days: 3, vibe: 'Adventure' }
    ]);
    const [view, setView] = useState('grid'); // 'grid' or 'timeline'
    const [showHeatmap, setShowHeatmap] = useState(false);

    const addCity = () => {
        if (cities.length < 10) {
            setCities([...cities, { id: Date.now(), name: 'New City', days: 3, vibe: 'Explore' }]);
        }
    };

    const removeCity = (id) => {
        setCities(cities.filter(c => c.id !== id));
    };

    return (
        <div className="multi-city-planner-container">
            <div className="planner-header">
                <div className="h-left">
                    <h1>Traveluh Multi-City</h1>
                    <p>Simultaneous management for up to 10 cities.</p>
                </div>
                <div className="view-toggle">
                    <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><LayoutGrid size={16} /></button>
                    <button className={view === 'timeline' ? 'active' : ''} onClick={() => setView('timeline')}><List size={16} /></button>
                    <button 
                        className={`heatmap-toggle ${showHeatmap ? 'active' : ''}`} 
                        onClick={() => setShowHeatmap(!showHeatmap)}
                    >
                        <Map size={16} /> Heatmap
                    </button>
                </div>
            </div>

            <div className="planner-main-flex">
                <div className={`city-container ${view} ${showHeatmap ? 'with-sidebar' : ''}`}>
                    <AnimatePresence>
                        {cities.map((city, i) => (
                            <motion.div 
                                key={city.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="city-card-hub"
                            >
                                <div className="city-card-header">
                                    <div className="c-info">
                                        <MapPin size={14} className="pin-icon" />
                                        <span>City {i + 1}</span>
                                    </div>
                                    <button className="remove-city" onClick={() => removeCity(city.id)}><Trash2 size={14} /></button>
                                </div>
                                <input 
                                    type="text" 
                                    className="city-name-input" 
                                    value={city.name} 
                                    onChange={(e) => {
                                        const newCities = [...cities];
                                        newCities[i].name = e.target.value;
                                        setCities(newCities);
                                    }}
                                />
                                <div className="city-meta">
                                    <div className="meta-item">
                                        <label>Duration</label>
                                        <input type="number" value={city.days} readOnly />
                                        <span>Days</span>
                                    </div>
                                    <div className="meta-item">
                                        <label>Vibe</label>
                                        <select value={city.vibe} readOnly>
                                            <option>Culture</option>
                                            <option>Relax</option>
                                            <option>Adventure</option>
                                        </select>
                                    </div>
                                </div>
                                <GeoIntelligenceCard location={city.name} />
                                <button className="open-itinerary-btn">
                                    <Zap size={14} /> Handle Moments
                                </button>
                            </motion.div>
                        ))}
                        {cities.length < 10 && (
                            <motion.button 
                                className="add-city-card"
                                onClick={addCity}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Plus size={32} />
                                <span>Add City</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {showHeatmap && (
                        <motion.div 
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className="planner-sidebar-viz"
                        >
                            <SignificanceHeatmap />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="multi-city-footer">
                <div className="footer-stats">
                    <strong>{cities.length}</strong> Cities • <strong>{cities.reduce((acc, c) => acc + c.days, 0)}</strong> Total Days
                </div>
                <button className="optimize-transit-btn">
                    <Sparkles size={18} /> Optimize for Significance & Distance
                </button>
            </div>
        </div>
    );
};

export default MultiCityPlanner;
