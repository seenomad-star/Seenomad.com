import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Gift,
    Copy,
    Check,
    Users,
    DollarSign,
    Star,
    Zap,
    Send,
    CheckCircle2,
    ArrowLeft
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import '../../styles/NomadRewards.css';

const ReferralBounty = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [copied, setCopied] = useState(false);
    const [inviteInput, setInviteInput] = useState('');
    const [referrals, setReferrals] = useState([
        { id: 'r-1', name: 'Alex Rivera (@alexroams)', status: 'Booked Outsite Lisbon', reward: '+500 NC ($25)', date: '2 days ago' },
        { id: 'r-2', name: 'Priya Nair (@priyatech)', status: 'Verified Nomad Passport', reward: '+250 NC ($12)', date: '5 days ago' },
        { id: 'r-3', name: 'Lucas Meyer (@lucasm)', status: 'Booked Tokyo Flight Leg', reward: '+500 NC ($25)', date: '1 week ago' }
    ]);

    const referralLink = 'https://seenomad.com/invite/nomad-voyager-88';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            addToast('Referral invite link copied to clipboard!', 'success');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            addToast('Invite link ready to share', 'info');
        }
    };

    const handleSendInvite = (e) => {
        e.preventDefault();
        if (!inviteInput.trim()) return;
        const created = {
            id: `r-${Date.now()}`,
            name: inviteInput.trim(),
            status: 'Invite Dispatched · Pending Signup',
            reward: '+250 NC Pending',
            date: 'Just now'
        };
        setReferrals((prev) => [created, ...prev]);
        setInviteInput('');
        addToast(`Sent referral bounty invite to ${created.name}!`, 'success');
    };

    return (
        <div className="rewards-hub-shell">
            <header className="rw-hero-card">
                <div className="rw-hero-left">
                    <div>
                        <span className="rw-kicker">
                            <Gift size={13} />
                            SeeNomad Ambassador & Referral Bounty Program
                        </span>
                        <h1 className="rw-title">Invite Fellow Nomads & Earn Travel Credits</h1>
                        <p className="rw-subtitle">
                            Give your friends $50 off their first coliving or flight booking, and earn 500 Nomad Coins ($25 value) for every completed trip.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button type="button" className="rw-btn" onClick={() => navigate('/explore/passport-perks')}>
                            <ArrowLeft size={13} />
                            Back to Perks Marketplace
                        </button>
                        <button type="button" className="rw-btn rw-btn-primary" onClick={handleCopyLink}>
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied Invite Link' : 'Copy Personal Invite Link'}
                        </button>
                    </div>
                </div>

                <div className="rw-wallet-box">
                    <div className="rw-wallet-top">
                        <div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Total Referral Earnings</div>
                            <div className="rw-balance-num">
                                <Zap size={20} fill="currentColor" />
                                <span>12,500 NC ($125)</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="rw-tier-label">24 Accepted Invites</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>1 Invite to Tier 3</div>
                        </div>
                    </div>

                    <form onSubmit={handleSendInvite} style={{ display: 'flex', gap: '0.45rem' }}>
                        <input
                            type="text"
                            placeholder="Friend's email or @handle..."
                            value={inviteInput}
                            onChange={(e) => setInviteInput(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.45rem 0.7rem',
                                borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.14)',
                                background: 'rgba(15,23,42,0.5)',
                                color: 'inherit',
                                fontSize: '0.76rem'
                            }}
                        />
                        <button type="submit" className="rw-btn rw-btn-emerald">
                            <Send size={13} />
                            Send Invite
                        </button>
                    </form>
                </div>
            </header>

            <section className="rw-tiers-grid" aria-label="Referral activity ledger">
                {referrals.map((ref) => (
                    <div key={ref.id} className="rw-tier-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '0.84rem' }}>{ref.name}</strong>
                            <span style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 800 }}>
                                {ref.reward}
                            </span>
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4, color: '#38bdf8' }} />
                            {ref.status} · {ref.date}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ReferralBounty;
