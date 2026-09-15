import React, { useState } from 'react';
import { Shield, Globe, Lock, CheckCircle, Smartphone, Fingerprint, Zap } from 'lucide-react';
import '../../styles/NomadPassport.css';

const NomadPassport = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const syncOnChain = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setIsVerified(true);
        }, 3000);
    };

    return (
        <div className="passport-portal-container">
            <div className="pp-header">
                <Globe size={40} color="#A855F7" />
                <h1>Global <span>Nomad Passport</span></h1>
                <p>Verifiable on-chain credentials for sovereign global movement.</p>
            </div>

            <div className="pp-card-area">
                <div className={`passport-card ${isVerified ? 'verified' : ''}`}>
                    <div className="card-glare"></div>
                    <div className="card-inner">
                        <div className="p-header">
                            <div className="p-seal">
                                <Shield size={24} color={isVerified ? '#10B981' : '#A855F7'} />
                            </div>
                            <div className="p-org">WORLD NOMAD AUTH</div>
                        </div>

                        <div className="p-body">
                            <div className="p-photo"></div>
                            <div className="p-info">
                                <div className="p-field">
                                    <span className="label">HOLDER</span>
                                    <span className="val">ALEX RIVERA</span>
                                </div>
                                <div className="p-field">
                                    <span className="label">PASSPORT NO</span>
                                    <span className="val">WNA-7722-X</span>
                                </div>
                                <div className="p-field">
                                    <span className="label">STATUS</span>
                                    <span className="val status">{isVerified ? 'VERIFIED' : 'PENDING'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-footer">
                            <div className="p-badges">
                                <div className="p-badge">EU RESIDENCY</div>
                                <div className="p-badge">ASEAN VISA-FREE</div>
                            </div>
                            {isVerified && <CheckCircle size={24} color="#10B981" className="verify-icon" />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pp-actions">
                <button 
                    className={`sync-btn ${isSyncing ? 'loading' : ''}`}
                    onClick={syncOnChain}
                    disabled={isSyncing || isVerified}
                >
                    {isSyncing ? (
                        <>
                            <Zap size={18} className="spin" />
                            <span>Syncing with Polygon ID...</span>
                        </>
                    ) : isVerified ? (
                        <>
                            <CheckCircle size={18} />
                            <span>Passport Verified</span>
                        </>
                    ) : (
                        <>
                            <Fingerprint size={18} />
                            <span>Verify On-Chain Credentials</span>
                        </>
                    )}
                </button>
                <div className="pp-secure-text">
                    <Lock size={12} /> <span>ZK-Proof Security • No Data Stored on Server</span>
                </div>
            </div>
        </div>
    );
};

export default NomadPassport;
