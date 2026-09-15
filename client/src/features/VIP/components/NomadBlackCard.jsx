import React, { useState } from 'react';
import { CreditCard, Shield, QrCode, Key, Eye, EyeOff, Sparkles, Globe } from 'lucide-react';
import '../../../styles/NomadBlackCard.css';

const NomadBlackCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showCode, setShowCode] = useState(false);

    return (
        <div className="black-card-wrapper">
            <div className="card-perspective">
                <div className={`nomad-black-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                    {/* Front of Card */}
                    <div className="card-face card-front">
                        <div className="card-chip"></div>
                        <div className="card-logo">
                            <Shield size={24} color="gold" />
                            <span>Traveluh Elite</span>
                        </div>
                        <div className="card-number">•••• •••• •••• 8888</div>
                        <div className="card-holder">
                            <div className="label">NOMAD LEGEND</div>
                            <div className="name">ALEX RIVERA</div>
                        </div>
                        <Sparkles size={20} className="card-sparkle" />
                    </div>

                    {/* Back of Card */}
                    <div className="card-face card-back">
                        <div className="card-magnetic-strip"></div>
                        <div className="card-cvv">888</div>
                        <div className="card-hub-access">
                            <div className="ha-header">
                                <Globe size={14} /> <span>Global Hub Access</span>
                            </div>
                            <div className="ha-code">
                                <code>{showCode ? 'VX-9911-ELITE' : '••••••••••••'}</code>
                                <button className="reveal-btn" onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }}>
                                    {showCode ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>
                        <div className="card-qr">
                            <QrCode size={40} color="white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-instructions">
                <Key size={16} color="#FCD34D" />
                <p>Tap card to flip. Secure codes are rotated every 24 hours.</p>
            </div>
        </div>
    );
};

export default NomadBlackCard;
