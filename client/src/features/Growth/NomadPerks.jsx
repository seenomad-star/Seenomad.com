import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Gift,
    Zap,
    Star,
    CheckCircle2,
    Copy,
    Check,
    Search,
    Globe,
    Wifi,
    Bed,
    Plane,
    Shield,
    Sparkles,
    Award,
    Users,
    ArrowRight,
    Briefcase
} from 'lucide-react';
import { useUserProfileStore } from '../../store/userProfileStore';
import { useToastStore } from '../../store/toastStore';
import '../../styles/NomadRewards.css';

const PERK_CATEGORIES = [
    { id: 'all', label: 'All Perks & Rewards' },
    { id: 'esim', label: 'Global eSIM & Starlink' },
    { id: 'coliving', label: 'Coliving & Stays' },
    { id: 'transit', label: 'Lounges & High-Speed Rail' },
    { id: 'workspace', label: 'Coworking & Insurance' },
    { id: 'vault', label: 'My Redeemed Vault' }
];

const INITIAL_PERKS_CATALOG = [
    {
        id: 'perk-airalo',
        category: 'esim',
        name: 'Global 190-Country 20GB 5G Data Pack',
        partner: 'Airalo × SeeNomad Global',
        savings: 'Save $42 · 35% Off',
        price: 200,
        code: 'SEENOMAD-5G-20GB',
        icon: Wifi,
        desc: 'Instant eSIM activation across Asia, Europe, and the Americas with 5G roaming priority and hotspot tethering.'
    },
    {
        id: 'perk-outsite',
        category: 'coliving',
        name: 'Outsite Global Member Pass + $150 Stay Credit',
        partner: 'Outsite (Lisbon, Bali, Tokyo, NYC)',
        savings: 'Save $150 Credit',
        price: 350,
        code: 'OUTSITE-NOMAD-150',
        icon: Bed,
        desc: 'Waives annual membership initiation and applies $150 credit toward any 7+ night coliving reservation.'
    },
    {
        id: 'perk-lounge',
        category: 'transit',
        name: '2x Global Airport VIP Lounge & Shower Passes',
        partner: 'DragonPass / Priority Lounge Network',
        savings: 'Save $78 Value',
        price: 280,
        code: 'VIP-LOUNGE-2XPASS',
        icon: Plane,
        desc: 'Access 1,400+ international airport lounges with high-speed Wi-Fi, quiet pods, and complimentary dining.'
    },
    {
        id: 'perk-wework',
        category: 'workspace',
        name: 'WeWork All Access 7-Day Global Roaming Pass',
        partner: 'WeWork Global (70+ Cities)',
        savings: 'Save $120 · Free Week',
        price: 300,
        code: 'WEWORK-ROAM-7D',
        icon: Briefcase,
        desc: '24/7 keycard access to hot desks, private phone booths, and barista coffee bars worldwide.'
    },
    {
        id: 'perk-safetywing',
        category: 'workspace',
        name: 'Nomad Medical & Laptop Gear Protection Boost',
        partner: 'SafetyWing Remote Health',
        savings: 'Save $55 · Zero Deductible',
        price: 180,
        code: 'SW-GEAR-SHIELD26',
        icon: Shield,
        desc: 'Adds $3,000 electronics & camera theft protection to your active travel medical coverage.'
    },
    {
        id: 'perk-jrpass',
        category: 'transit',
        name: 'Shinkansen Green Car Seat Upgrade Voucher',
        partner: 'JR Tokaido / SmartEX Corridor',
        savings: 'Save $48 Upgrade',
        price: 220,
        code: 'JR-GREENCAR-12E',
        icon: Plane,
        desc: 'Complimentary 1st-class Green Car upgrade with oversized work tray and AC power on Tokyo–Kyoto–Osaka routes.'
    },
    {
        id: 'perk-hmlet',
        category: 'coliving',
        name: 'Tokyo & Singapore Designer Loft Waived Deposit',
        partner: 'Hmlet / Habyt Asia',
        savings: 'Save $300 Deposit',
        price: 400,
        code: 'HABYT-ZERODEP-26',
        icon: Bed,
        desc: 'Zero security deposit and free airport-to-loft private transfer on stays of 14 nights or longer.'
    },
    {
        id: 'perk-starlink',
        category: 'esim',
        name: 'Starlink Mini Roam 50GB Satellite Backup Credit',
        partner: 'Starlink Roam Partners',
        savings: 'Save $50 Roam Credit',
        price: 320,
        code: 'STARLINK-ROAM-50',
        icon: Globe,
        desc: 'High-speed low-earth-orbit satellite data credit for off-grid mountain, desert, and island expeditions.'
    }
];

const LOYALTY_TIERS = [
    {
        id: 'explorer',
        name: 'Tier 1 · Explorer Nomad',
        threshold: '0 – 999 NC',
        perks: 'Access to global eSIM discounts, community meetups, and 1x booking XP multiplier.'
    },
    {
        id: 'voyager',
        name: 'Tier 2 · Voyager Pro',
        threshold: '1,000 – 2,499 NC',
        perks: 'Unlocks VIP airport lounge vouchers, waived coliving deposits, and 1.5x booking XP multiplier.',
        isCurrent: true
    },
    {
        id: 'sovereign',
        name: 'Tier 3 · Apex Sovereign',
        threshold: '2,500+ NC',
        perks: 'Priority DNV legal concierge, complimentary Shinkansen/Rail upgrades, and 2.5x XP multiplier.'
    }
];

const NomadPerks = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { level, xp, addReward, addXp } = useUserProfileStore();

    const [ncBalance, setNcBalance] = useState(1450);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [claimedMap, setClaimedMap] = useState({
        'perk-airalo': true
    });
    const [copiedCode, setCopiedCode] = useState(null);
    const [earnedTasks, setEarnedTasks] = useState({});

    // Earn bonus NC tasks
    const handleEarnTask = (taskId, amount, label) => {
        if (earnedTasks[taskId]) return;
        setEarnedTasks((prev) => ({ ...prev, [taskId]: true }));
        setNcBalance((prev) => prev + amount);
        if (addXp) addXp(amount);
        addToast(`+${amount} NC earned for ${label}!`, 'success');
    };

    // Redeem a perk
    const handleRedeemPerk = (perk) => {
        if (claimedMap[perk.id]) {
            handleCopyVoucher(perk.code);
            return;
        }
        if (ncBalance < perk.price) {
            addToast(`Need ${perk.price - ncBalance} more NC. Complete a quick task above to top up!`, 'error');
            return;
        }

        setNcBalance((prev) => prev - perk.price);
        setClaimedMap((prev) => ({ ...prev, [perk.id]: true }));
        if (addReward) {
            addReward({
                id: perk.id,
                name: perk.name,
                code: perk.code,
                claimed: true,
                timestamp: new Date().toISOString()
            });
        }
        addToast(`Unlocked "${perk.name}"! Promo code ${perk.code} is ready.`, 'success');
    };

    const handleCopyVoucher = async (code) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            addToast(`Copied voucher code ${code} to clipboard!`, 'success');
            setTimeout(() => setCopiedCode(null), 2000);
        } catch {
            addToast(`Voucher code: ${code}`, 'info');
        }
    };

    const filteredPerks = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return INITIAL_PERKS_CATALOG.filter((p) => {
            if (activeCategory === 'vault') {
                if (!claimedMap[p.id]) return false;
            } else if (activeCategory !== 'all' && p.category !== activeCategory) {
                return false;
            }
            if (q) {
                const hay = `${p.name} ${p.partner} ${p.desc} ${p.savings}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [activeCategory, searchQuery, claimedMap]);

    const claimedCount = Object.keys(claimedMap).filter((k) => claimedMap[k]).length;
    const tierProgressPct = Math.min(100, Math.round((ncBalance / 2500) * 100));

    return (
        <div className="rewards-hub-shell">
            {/* 1. Top Loyalty & Nomad Coins Command Header */}
            <header className="rw-hero-card">
                <div className="rw-hero-left">
                    <div>
                        <span className="rw-kicker">
                            <Gift size={13} />
                            SeeNomad Loyalty & Partner Perks Vault · Instant Voucher Redemption
                        </span>
                        <h1 className="rw-title">
                            Nomad Rewards, Partner Perks & Global Miles
                        </h1>
                        <p className="rw-subtitle">
                            Redeem your Nomad Coins (NC) for instant 5G eSIM data packs, Outsite & Habyt coliving credits, VIP airport lounges, and high-speed rail upgrades.
                        </p>
                    </div>

                    {/* Interactive Earn Extra Coins Strip */}
                    <div className="rw-earn-strip">
                        <button
                            type="button"
                            className="rw-btn rw-btn-emerald"
                            disabled={!!earnedTasks.daily}
                            onClick={() => handleEarnTask('daily', 100, 'Daily Nomad Check-In')}
                        >
                            <Zap size={13} />
                            {earnedTasks.daily ? 'Check-In Claimed ✓' : 'Daily Check-In (+100 NC)'}
                        </button>
                        <button
                            type="button"
                            className="rw-btn"
                            disabled={!!earnedTasks.speedtest}
                            onClick={() => handleEarnTask('speedtest', 150, 'Verified Wi-Fi Speedtest')}
                        >
                            <Wifi size={13} />
                            {earnedTasks.speedtest ? 'Speedtest Bonus Claimed ✓' : 'Log Wi-Fi Speedtest (+150 NC)'}
                        </button>
                        <button
                            type="button"
                            className="rw-btn"
                            onClick={() => navigate('/explore/rewards')}
                        >
                            <Users size={13} />
                            Referral Bounties (+500 NC)
                        </button>
                    </div>
                </div>

                {/* Right Wallet & Tier Progress Box */}
                <div className="rw-wallet-box" aria-label="Nomad Coins balance and tier progress">
                    <div className="rw-wallet-top">
                        <div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                                Available Balance
                            </div>
                            <div className="rw-balance-num">
                                <Zap size={22} fill="currentColor" />
                                <span>{ncBalance.toLocaleString()} NC</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="rw-tier-label">Voyager Pro · Lvl {level || 7}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>
                                {claimedCount} Active Vouchers
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.71rem',
                                marginBottom: 4,
                                color: '#94a3b8'
                            }}
                        >
                            <span>Progress to Apex Sovereign Tier</span>
                            <strong>{tierProgressPct}%</strong>
                        </div>
                        <div className="rw-progress-track">
                            <div className="rw-progress-fill" style={{ width: `${tierProgressPct}%` }} />
                        </div>
                    </div>

                    <div className="rw-wallet-kpis">
                        <span>Est. Member Savings: <strong>$1,480/yr</strong></span>
                        <span>·</span>
                        <span>XP Points: <strong>{(xp || 3450).toLocaleString()} XP</strong></span>
                    </div>
                </div>
            </header>

            {/* 2. Flash Deal Highlight */}
            <section className="rw-flash-banner" aria-label="Featured flash perk">
                <div className="rw-flash-info">
                    <span className="rw-kicker" style={{ color: '#10b981' }}>
                        <Sparkles size={12} /> Limited Member Flash Drop · 75% Off NC Cost
                    </span>
                    <h3>Japan & Europe Dual-Continent 30-Day Unlimited eSIM + Lounge Bundle</h3>
                    <p>
                        Includes 30 days of uncapped 5G data + 1 complimentary Priority Airport Lounge pass for your next international leg.
                    </p>
                </div>
                <button
                    type="button"
                    className="rw-btn rw-btn-primary"
                    onClick={() =>
                        handleRedeemPerk({
                            id: 'perk-flash-bundle',
                            name: 'Dual-Continent 30-Day eSIM + Lounge Bundle',
                            price: 150,
                            code: 'FLASH-GLOBAL-VIP26'
                        })
                    }
                >
                    <span>
                        {claimedMap['perk-flash-bundle']
                            ? 'Copy Code: FLASH-GLOBAL-VIP26'
                            : 'Claim Flash Bundle (150 NC)'}
                    </span>
                    <ArrowRight size={14} />
                </button>
            </section>

            {/* 3. Category Tabs & Search Toolbar */}
            <section className="rw-toolbar" aria-label="Filter rewards">
                <div className="rw-tabs" role="tablist">
                    {PERK_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`rw-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <span>{cat.label}</span>
                            {cat.id === 'vault' && <span>({claimedCount})</span>}
                        </button>
                    ))}
                </div>

                <div className="rw-search-input">
                    <Search size={14} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search eSIM, Outsite, WeWork, rail..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search rewards"
                    />
                </div>
            </section>

            {/* 4. Partner Perks & Vouchers Grid */}
            <section className="rw-perks-grid" aria-label="Partner perks catalog">
                {filteredPerks.map((perk) => {
                    const IconComponent = perk.icon || Gift;
                    const isClaimed = !!claimedMap[perk.id];
                    const isCopied = copiedCode === perk.code;

                    return (
                        <article
                            key={perk.id}
                            className={`rw-perk-card ${isClaimed ? 'is-claimed' : ''}`}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <div className="rw-perk-top">
                                    <div className="rw-partner-icon">
                                        <IconComponent size={19} />
                                    </div>
                                    <span className="rw-savings-text">{perk.savings}</span>
                                </div>

                                <div>
                                    <div className="rw-perk-partner">{perk.partner}</div>
                                    <h3 className="rw-perk-title">{perk.name}</h3>
                                </div>

                                <p className="rw-perk-desc">{perk.desc}</p>

                                {isClaimed && (
                                    <div className="rw-voucher-box">
                                        <span>Code: {perk.code}</span>
                                        <button
                                            type="button"
                                            className="rw-btn"
                                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.68rem' }}
                                            onClick={() => handleCopyVoucher(perk.code)}
                                        >
                                            {isCopied ? <Check size={12} /> : <Copy size={12} />}
                                            {isCopied ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="rw-perk-footer">
                                <span className="rw-price-tag">
                                    <Zap size={14} fill="currentColor" />
                                    {isClaimed ? 'Unlocked in Vault' : `${perk.price} NC`}
                                </span>

                                <div style={{ display: 'flex', gap: '0.4rem' }}>
                                    {isClaimed && (
                                        <button
                                            type="button"
                                            className="rw-btn"
                                            onClick={() => navigate('/explore/book-travel')}
                                        >
                                            Use Now
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className={`rw-btn ${isClaimed ? '' : 'rw-btn-primary'}`}
                                        onClick={() => handleRedeemPerk(perk)}
                                    >
                                        {isClaimed ? (
                                            <>
                                                <CheckCircle2 size={13} color="#10b981" />
                                                Copy Code
                                            </>
                                        ) : (
                                            'Redeem Perk'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </section>

            {/* 5. Membership Loyalty Tiers Overview */}
            <section className="rw-tiers-grid" aria-label="Loyalty membership tiers">
                {LOYALTY_TIERS.map((tier) => (
                    <div
                        key={tier.id}
                        className={`rw-tier-card ${tier.isCurrent ? 'current-tier' : ''}`}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '0.88rem' }}>{tier.name}</strong>
                            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700 }}>
                                {tier.threshold}
                            </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.45 }}>
                            {tier.perks}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default NomadPerks;
