import React, { useState } from 'react';
import { DollarSign, Send, Check } from 'lucide-react';
import '../../styles/P2PTipping.css';

const P2PTipping = ({ recipient = "Alex R." }) => {
    const [amount, setAmount] = useState('5');
    const [isSent, setIsSent] = useState(false);

    const handleSend = () => {
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
    };

    return (
        <div className="p2p-tipping-card">
            <div className="pt-header">
                <DollarSign size={16} color="#10B981" />
                <span>TIP <strong>{recipient.toUpperCase()}</strong></span>
            </div>
            
            <div className="pt-input-row">
                <div className="pt-amounts">
                    {['2', '5', '10'].map((a) => (
                        <button 
                            key={a} 
                            className={`amt-btn ${amount === a ? 'active' : ''}`}
                            onClick={() => setAmount(a)}
                        >
                            ${a}
                        </button>
                    ))}
                </div>
                <button className={`pt-send-btn ${isSent ? 'sent' : ''}`} onClick={handleSend}>
                    {isSent ? <Check size={16} /> : <Send size={16} />}
                </button>
            </div>

            {isSent && <div className="pt-success">Transaction Hash: 0x7e...b42</div>}
        </div>
    );
};

export default P2PTipping;
