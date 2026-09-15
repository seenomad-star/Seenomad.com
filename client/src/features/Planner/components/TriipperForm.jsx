import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, Heart, Briefcase, 
    DollarSign, Compass, MapPin,
    ArrowRight, Star, Sparkles
} from 'lucide-react';

const TriipperForm = ({ onGenerate }) => {
    const [formData, setFormData] = useState({
        destination: 'Bali, Indonesia',
        tripType: 'Solo',
        budget: 'Moderate',
        vibe: 'Adventure'
    });

    return (
        <div className="triipper-form-card">
            <div className="form-grid">
                <div className="form-group full">
                    <label>Where are you heading?</label>
                    <div className="input-with-icon">
                        <MapPin size={20} />
                        <input 
                            type="text" 
                            value={formData.destination}
                            onChange={(e) => setFormData({...formData, destination: e.target.value})}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Who's going?</label>
                    <div className="toggle-group">
                        <button 
                            className={formData.tripType === 'Solo' ? 'active' : ''}
                            onClick={() => setFormData({...formData, tripType: 'Solo'})}
                        >
                            <Briefcase size={16} /> Solo
                        </button>
                        <button 
                            className={formData.tripType === 'Family' ? 'active' : ''}
                            onClick={() => setFormData({...formData, tripType: 'Family'})}
                        >
                            <Users size={16} /> Family
                        </button>
                        <button 
                            className={formData.tripType === 'Romantic' ? 'active' : ''}
                            onClick={() => setFormData({...formData, tripType: 'Romantic'})}
                        >
                            <Heart size={16} /> Romantic
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Budget Level</label>
                    <div className="toggle-group">
                        <button 
                            className={formData.budget === 'Low' ? 'active' : ''}
                            onClick={() => setFormData({...formData, budget: 'Low'})}
                        >
                            $
                        </button>
                        <button 
                            className={formData.budget === 'Moderate' ? 'active' : ''}
                            onClick={() => setFormData({...formData, budget: 'Moderate'})}
                        >
                            $$
                        </button>
                        <button 
                            className={formData.budget === 'Luxury' ? 'active' : ''}
                            onClick={() => setFormData({...formData, budget: 'Luxury'})}
                        >
                            $$$
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Primary Vibe</label>
                    <div className="vibe-selector">
                        {['Adventure', 'Relax', 'Culture', 'Nightlife'].map(v => (
                            <button 
                                key={v}
                                className={formData.vibe === v ? 'active' : ''}
                                onClick={() => setFormData({...formData, vibe: v})}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <motion.button 
                className="generate-triipper-btn" 
                onClick={() => onGenerate(formData)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span>Curate Custom Itinerary</span>
                <Sparkles size={20} />
            </motion.button>
        </div>
    );
};

export default TriipperForm;
