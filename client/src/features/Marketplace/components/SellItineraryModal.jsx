import React, { useState } from 'react';
import { DollarSign, Tag, Info, CheckCircle2 } from 'lucide-react';
import '../../styles/MarketplaceModals.css';

const SellItineraryModal = ({ isOpen, onClose, tripName = "My Bali Escape" }) => {
    const [step, setStep] = useState(1);
    const [price, setPrice] = useState(500);

    const handleList = () => {
        setStep(2); // Success state
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="sell-modal-container">
                <div className="sm-header">
                    <h3>List Trip for Sale</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="sm-body">
                    {step === 1 ? (
                        <>
                            <div className="sm-trip-summary">
                                <strong>Target Trip:</strong> <span>{tripName}</span>
                            </div>

                            <div className="sm-input-row">
                                <label>Set Price (Traveluh Coins)</label>
                                <div className="price-input-wrapper">
                                    <DollarSign size={18} />
                                    <input 
                                        type="number" 
                                        value={price} 
                                        onChange={(e) => setPrice(e.target.value)} 
                                    />
                                </div>
                                <p className="price-hint">Recommended price: 300 - 600 Coins</p>
                            </div>

                            <div className="sm-checklist">
                                <div className="check-item">
                                    <input type="checkbox" defaultChecked />
                                    <span>Include AI Flight Predictor data</span>
                                </div>
                                <div className="check-item">
                                    <input type="checkbox" defaultChecked />
                                    <span>Include Custom Packing List</span>
                                </div>
                            </div>

                            <div className="sm-warning">
                                <Info size={14} /> <span>Platform takes 5% commission on each sale.</span>
                            </div>

                            <button className="list-trip-submit" onClick={handleList}>Finish & List on Marketplace</button>
                        </>
                    ) : (
                        <div className="sm-success">
                            <CheckCircle2 size={60} color="#10B981" />
                            <h3>Itinerary Listed!</h3>
                            <p>You trip is now live in the global marketplace. You'll be notified of every sale.</p>
                            <button className="success-close" onClick={onClose}>Back to Dashboard</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellItineraryModal;
