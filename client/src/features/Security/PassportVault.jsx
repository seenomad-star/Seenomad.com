import React, { useState } from 'react';
import { Shield, Lock, Fingerprint, Eye, EyeOff, FileText, Download, ShieldCheck, Zap } from 'lucide-react';
import '../../styles/PassportVault.css';

const PassportVault = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showNumbers, setShowNumbers] = useState({});

    const documents = [
        { type: 'Passport', number: 'Z9844221', expiry: 'OCT 2028', country: 'Singapore' },
        { type: 'Visa', number: 'IND-90882', expiry: 'DEC 2026', country: 'United Kingdom' },
        { type: 'Insurance', number: 'POL-TRAVEL-112', expiry: 'JUN 2025', country: 'Global' }
    ];

    const toggleShow = (i) => {
        setShowNumbers(prev => ({ ...prev, [i]: !prev[i] }));
    };

    return (
        <div className="vault-container">
            <div className="vault-header">
                <Lock size={32} color="#A855F7" />
                <h1>Secure <span>Passport Vault</span></h1>
                <p>Decentralized, military-grade encryption for your global nomad identity.</p>
            </div>

            {!isUnlocked ? (
                <div className="vault-lock-screen">
                    <div className="biometric-scanner" onClick={() => setIsUnlocked(true)}>
                        <Fingerprint size={80} color="#A855F7" className="scan-animate" />
                        <span>Touch to Unlock (Simulated)</span>
                    </div>
                    <div className="security-badges">
                        <div className="badge"><ShieldCheck size={14} /> AES-256 Bit</div>
                        <div className="badge"><Zap size={14} /> Web3 Sovereignty</div>
                    </div>
                </div>
            ) : (
                <div className="vault-unlocked-state">
                    <div className="doc-grid">
                        {documents.map((doc, i) => (
                            <div className="doc-card" key={i}>
                                <div className="doc-type-icon">
                                    <FileText size={24} color="#3B82F6" />
                                </div>
                                <div className="doc-content">
                                    <div className="doc-label">{doc.country} - {doc.type}</div>
                                    <div className="doc-main">
                                        <span className={showNumbers[i] ? '' : 'censored'}>
                                            {showNumbers[i] ? doc.number : '•••• •••• ••••'}
                                        </span>
                                        <button className="show-btn" onClick={() => toggleShow(i)}>
                                            {showNumbers[i] ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    <div className="doc-expiry">Expires: {doc.expiry}</div>
                                </div>
                                <button className="download-btn"><Download size={16} /></button>
                            </div>
                        ))}
                    </div>
                    
                    <button className="add-doc-btn">+ Add New Document</button>
                    <button className="lock-vault-btn" onClick={() => setIsUnlocked(false)}>Lock Vault</button>
                </div>
            )}
        </div>
    );
};

export default PassportVault;
