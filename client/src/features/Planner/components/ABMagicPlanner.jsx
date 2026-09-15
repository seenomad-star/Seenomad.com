import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, MapPin, ArrowRight, Home, DollarSign, 
    Trash2, Plane, Train, Bus, Ship, Check, ChevronLeft
} from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';

const ABMagicPlanner = () => {
    const [stops, setStops] = useState([
        { id: 1, city: 'Paris', country: 'France', type: 'start' }
    ]);
    const [lastReturnCost, setLastReturnCost] = useState(120);

    const addStop = () => {
        const newStop = { 
            id: Date.now(), 
            city: 'Rome', 
            country: 'Italy', 
            transport: 'plane', 
            price: 45, 
            returnHome: 180 
        };
        setStops([...stops, newStop]);
        setLastReturnCost(newStop.returnHome);
    };

    const removeStop = (id) => {
        setStops(stops.filter(s => s.id !== id));
        const remaining = stops.filter(s => s.id !== id);
        if (remaining.length > 1) {
            setLastReturnCost(remaining[remaining.length - 1].returnHome || 120);
        } else {
            setLastReturnCost(120);
        }
    };

    const totalPrice = stops.reduce((acc, s) => acc + (s.price || 0), 0);

    return (
        <div className="ab-magic-ui">
            <div className="ab-magic-scroll">
                <div className="ab-timeline">
                    {stops.map((stop, i) => (
                        <motion.div 
                            key={stop.id} 
                            className="ab-stop-card"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="ab-stop-main">
                                <div className="ab-stop-index">{i === 0 ? <Home size={14} /> : i + 1}</div>
                                <div className="ab-stop-info">
                                    <strong>{stop.city}</strong>
                                    <span>{stop.country}</span>
                                </div>
                                {stop.transport && (
                                    <div className="ab-transport-badge">
                                        {stop.transport === 'plane' && <Plane size={12} />}
                                        {stop.transport === 'train' && <Train size={12} />}
                                        <span>${stop.price}</span>
                                    </div>
                                )}
                                {i > 0 && (
                                    <button className="ab-delete-btn" onClick={() => removeStop(stop.id)}>
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                            
                            {i < stops.length - 1 && (
                                <div className="ab-connector-line">
                                    <div className="connector-dot"></div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    <button className="ab-add-stop-btn" onClick={addStop}>
                        <div className="add-icon"><Plus size={18} /></div>
                        <span>Choose next city...</span>
                    </button>
                </div>
            </div>

            <div className="ab-magic-footer">
                <div className="ab-financials">
                    <div className="ab-stat-mini">
                        <label>Current Total</label>
                        <div className="val">${totalPrice}</div>
                    </div>
                    <div className="ab-stat-mini return-highlight">
                        <label>Return home now</label>
                        <div className="val">${lastReturnCost}</div>
                    </div>
                </div>
                
                <div className="ab-actions">
                    <button className="btn-hub-primary" style={{ flex: 1 }}>Review & Book</button>
                    <button className="btn-hub-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Save size={18} />
                    </button>
                </div>
            </div>
            
            <p className="ab-magic-tip">
                <Zap size={12} fill="#F59E0B" color="#F59E0B" />
                <span>Tip: Flights from Lisbon are $20 cheaper after Tuesday.</span>
            </p>
        </div>
    );
};

export default ABMagicPlanner;
