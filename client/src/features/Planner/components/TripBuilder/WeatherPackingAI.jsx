import React, { useState } from 'react';
import { Sun, CloudRain, Snowflake, Wind, Briefcase, Camera, Music, CheckSquare } from 'lucide-react';
import '../../../../styles/WeatherPacking.css';

const WeatherPackingAI = () => {
    const [destination, setDestination] = useState('');
    const [month, setMonth] = useState('January');
    const [isGenerating, setIsGenerating] = useState(false);
    const [packingList, setPackingList] = useState(null);

    const handleGenerate = (e) => {
        e.preventDefault();
        setIsGenerating(true);
        setPackingList(null);

        setTimeout(() => {
            setIsGenerating(false);
            setPackingList({
                climate: 'Tropical Rain', icon: CloudRain, temp: '28°C / 82°F',
                essentials: [
                    { item: 'Lightweight Waterproof Jacket', checked: false },
                    { item: 'Dry-Bag for Electronics', checked: false },
                    { item: 'Moisture-Wicking Shirts', checked: false },
                    { item: 'Mosquito Repellent (DEET)', checked: false }
                ],
                tech: [
                    { item: 'Universal Power Adapter', checked: false },
                    { item: '20,000mAh Power Bank', checked: false },
                    { item: 'Noise Cancelling Headphones', checked: false }
                ]
            });
        }, 1500);
    };

    return (
        <div className="weather-packing-container">
            <div className="wp-header">
                <h2>Smart Packing AI</h2>
                <p>Generate a hyper-localized luggage manifest engineered for your exact destination and travel month.</p>
            </div>

            <form onSubmit={handleGenerate} className="wp-form">
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Destination (e.g. Bali)" 
                        value={destination} onChange={(e) => setDestination(e.target.value)} required 
                    />
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                    <button type="submit" disabled={isGenerating}>
                        {isGenerating ? 'Analyzing Climate...' : 'Generate Matrix'}
                    </button>
                </div>
            </form>

            {packingList && (
                <div className="wp-results">
                    <div className="climate-banner">
                        <packingList.icon size={32} color="#3B82F6" />
                        <div className="cb-info">
                            <h3>{packingList.climate} Forecast</h3>
                            <span>Avg Temperature: {packingList.temp}</span>
                        </div>
                    </div>

                    <div className="manifest-grid">
                        <div className="manifest-col">
                            <h4><Briefcase size={16} color="#F59E0B" /> Climate Essentials</h4>
                            <ul>
                                {packingList.essentials.map((i, idx) => (
                                    <li key={idx}>
                                        <CheckSquare size={16} className="chkbox" /> {i.item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="manifest-col">
                            <h4><Camera size={16} color="#A855F7" /> Tech & Gear</h4>
                            <ul>
                                {packingList.tech.map((i, idx) => (
                                    <li key={idx}>
                                        <CheckSquare size={16} className="chkbox" /> {i.item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherPackingAI;
