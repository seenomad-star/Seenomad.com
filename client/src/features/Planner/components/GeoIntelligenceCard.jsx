import React from 'react';
import { motion } from 'framer-motion';
import { 
    CloudRain, ShieldAlert, Wallet, 
    Thermometer, Wind, Info,
    CheckCircle2, AlertTriangle, TrendingDown,
    Music, Coffee, UtensilsCrossed, Landmark
} from 'lucide-react';

const GeoIntelligenceCard = ({ location }) => {
    // Mock data based on location geography
    const metrics = {
        weather: { temp: '28°C', condition: 'Tropical Rain', humidity: '82%' },
        safety: { score: 8.4, status: 'High Safety', tips: 'Safe for solo travelers. Carry water.' },
        budget: { level: 'Economic', daily: '$45', trend: 'Decreasing' },
        culture: { significance: 'Historical Epicenter', mainTheme: 'Rice Terrace Traditions' },
        food: { focus: 'Warung Fusion', signature: 'Nasi Campur Ayam' }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="geo-intelligence-card"
        >
            <div className="geo-card-sections-grid">
                <div className="geo-card-section weather">
                    <div className="s-icon"><CloudRain size={18} /></div>
                    <div className="s-content">
                        <div className="s-header">
                            <h4>Weather</h4>
                            <span>{metrics.weather.temp}</span>
                        </div>
                        <p>{metrics.weather.condition}</p>
                    </div>
                </div>

                <div className="geo-card-section safety">
                    <div className="s-icon safety-icon"><ShieldAlert size={18} /></div>
                    <div className="s-content">
                        <div className="s-header">
                            <h4>Safety</h4>
                            <span className="safety-badge">{metrics.safety.score}</span>
                        </div>
                        <p>{metrics.safety.status}</p>
                    </div>
                </div>

                <div className="geo-card-section culture-point">
                    <div className="s-icon culture-icon"><Landmark size={18} /></div>
                    <div className="s-content">
                        <div className="s-header">
                            <h4>Culture</h4>
                            <span>9.5</span>
                        </div>
                        <p>{metrics.culture.significance}</p>
                    </div>
                </div>

                <div className="geo-card-section food-point">
                    <div className="s-icon food-icon"><UtensilsCrossed size={18} /></div>
                    <div className="s-content">
                        <div className="s-header">
                            <h4>Food</h4>
                            <span>8.8</span>
                        </div>
                        <p>{metrics.food.signature}</p>
                    </div>
                </div>
            </div>

            <div className="geo-intelligence-footer">
                <Info size={14} />
                <span>Hyper-local data verified by Triplay Super Agent</span>
            </div>
        </motion.div>
    );
};

export default GeoIntelligenceCard;
