import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Backpack, CheckCircle, Circle, 
    ShoppingCart, Plus, Trash2, 
    Smartphone, Zap, Camera, Shield
} from 'lucide-react';

const PackingList = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Universal Travel Adapter', cat: 'Tech', pinned: true, checked: false, amazonUrl: '#' },
        { id: 2, name: 'Noise Cancelling Headphones', cat: 'Tech', pinned: false, checked: true, amazonUrl: '#' },
        { id: 3, name: 'First Aid Nomad Kit', cat: 'Safety', pinned: true, checked: false, amazonUrl: '#' },
        { id: 4, name: 'Portable Power Bank (20k mAh)', cat: 'Tech', pinned: false, checked: false, amazonUrl: '#' },
        { id: 5, name: 'Lightweight Rain Shell', cat: 'Gear', pinned: false, checked: false, amazonUrl: '#' }
    ]);

    const toggleItem = (id) => {
        setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));
    };

    return (
        <div className="packing-list-container">
            <div className="packing-header">
                <Backpack size={32} className="packing-icon" />
                <div className="packing-text">
                    <h2>Ultimate Nomad Pack</h2>
                    <p>Pack like a boss. Verified gear for the professional traveler.</p>
                </div>
                <div className="packing-progress">
                    <div className="progress-radial">
                        {Math.round((items.filter(i => i.checked).length / items.length) * 100)}%
                    </div>
                </div>
            </div>

            <div className="packing-grid">
                <div className="packing-main">
                    <div className="list-controls">
                        <button className="list-filter active">All Items</button>
                        <button className="list-filter">Tech</button>
                        <button className="list-filter">Safety</button>
                        <button className="add-item-btn"><Plus size={16} /> Add Item</button>
                    </div>

                    <div className="packing-items-stack">
                        {items.map(item => (
                            <motion.div 
                                key={item.id}
                                whileHover={{ x: 5 }}
                                className={`packing-item-card ${item.checked ? 'checked' : ''}`}
                            >
                                <button className="check-trigger" onClick={() => toggleItem(item.id)}>
                                    {item.checked ? <CheckCircle size={20} color="#10B981" /> : <Circle size={20} />}
                                </button>
                                <div className="item-info">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-cat">{item.cat}</span>
                                </div>
                                <div className="item-actions">
                                    {!item.checked && (
                                        <button className="amazon-buy-btn">
                                            <ShoppingCart size={14} />
                                            <span>Buy</span>
                                        </button>
                                    )}
                                    <button className="item-delete"><Trash2 size={14} /></button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="packing-sidebar">
                    <div className="essentials-widget">
                        <h3>AI Recommended</h3>
                        <div className="essential-card">
                            <Shield size={20} className="e-icon" />
                            <div>
                                <strong>Nomad Insurance</strong>
                                <p>Critical for Zone 3 travel.</p>
                            </div>
                        </div>
                        <div className="essential-card">
                            <Smartphone size={20} className="e-icon" />
                            <div>
                                <strong>Global eSIM</strong>
                                <p>Pre-activate for Bali.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackingList;
