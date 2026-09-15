import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Lock, Plane, Users, Calendar } from 'lucide-react';
import '../styles/BookingSummary.css';

const BookingSummary = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock Booking Data
    const bookingDetails = {
        flight: "Emirates EK 201 (JFK to DXB)",
        date: "Nov 14, 2026 - Nov 21, 2026",
        passengers: 2,
        class: "Business",
        baseFare: 3400,
        taxes: 420,
        insurance: 75
    };

    const total = bookingDetails.baseFare + bookingDetails.taxes + bookingDetails.insurance;

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate PG validation
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="booking-success-container">
                <div className="success-card">
                    <ShieldCheck size={64} color="#10B981" className="success-icon" />
                    <h2>Booking Confirmed!</h2>
                    <p>Your itinerary and e-tickets have been securely delivered to your email.</p>
                    <div className="pnr-box">
                        <span>PNR RECORD LOCATOR</span>
                        <strong>X8JY9Z</strong>
                    </div>
                    <button className="view-trip-btn">View in TripBuilder</button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-summary-wrapper">
            <div className="bs-main">
                <h2>Review & Checkout</h2>
                
                <div className="bs-card traveler-details">
                    <h3><Users size={18} /> Traveler Information</h3>
                    <div className="passenger-forms">
                        <div className="pass-form">
                            <h4>Adult 1 (Primary)</h4>
                            <div className="input-grid">
                                <input type="text" placeholder="First Name" defaultValue="Alex" />
                                <input type="text" placeholder="Last Name" defaultValue="Explorer" />
                                <input type="text" placeholder="Passport Number" />
                                <input type="date" placeholder="Date of Birth" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bs-card payment-gateway">
                    <h3><CreditCard size={18} /> Secure Payment</h3>
                    <div className="pg-badges">
                        <span className="pg-badge"><Lock size={12} /> 256-bit TLS Encrypted</span>
                        <div className="pg-icons">
                            <span className="card-ico">VISA</span>
                            <span className="card-ico">MC</span>
                            <span className="card-ico">AMEX</span>
                        </div>
                    </div>
                    <form onSubmit={handlePayment} className="cc-form">
                        <input type="text" placeholder="Card Number" className="full-w" required />
                        <div className="input-grid-2">
                            <input type="text" placeholder="MM/YY" required />
                            <input type="text" placeholder="CVC" required />
                        </div>
                        <input type="text" placeholder="Name on Card" className="full-w" required />
                        
                        <button type="submit" className={`pay-now-btn ${isProcessing ? 'processing' : ''}`} disabled={isProcessing}>
                            {isProcessing ? 'Processing Securely...' : `Pay $${total.toLocaleString()}`}
                        </button>
                    </form>
                </div>
            </div>

            <div className="bs-sidebar">
                <div className="fare-summary-card">
                    <h3>Fare Summary</h3>
                    
                    <div className="itinerary-brief">
                        <div className="ib-item"><Plane size={16} /> {bookingDetails.flight}</div>
                        <div className="ib-item"><Calendar size={16} /> {bookingDetails.date}</div>
                        <div className="ib-item"><Users size={16} /> {bookingDetails.passengers}x {bookingDetails.class}</div>
                    </div>

                    <div className="fare-breakdown">
                        <div className="f-row">
                            <span>Base Fare</span>
                            <span>${bookingDetails.baseFare.toLocaleString()}</span>
                        </div>
                        <div className="f-row">
                            <span>Taxes & Fees</span>
                            <span>${bookingDetails.taxes.toLocaleString()}</span>
                        </div>
                        <div className="f-row">
                            <span>Travel Insurance</span>
                            <span>${bookingDetails.insurance.toLocaleString()}</span>
                        </div>
                        <div className="f-divider"></div>
                        <div className="f-row total">
                            <span>Total Due</span>
                            <span>${total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSummary;
