import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {
    Wallet as WalletIcon,
    TrendingUp,
    ArrowUpRight,
    CreditCard,
    Gift,
    Coins,
    History,
    ArrowRight,
    Plus,
    Bell,
    Settings,
    Bitcoin,
    Stamp
} from 'lucide-react';
import '../../styles/Wallet.css';

// Sub-components
import Balance from './components/Balance';
import Earnings from './components/Earnings';
import Payout from './components/Payout';
import TravelCredits from './components/TravelCredits';
import Cashbacks from './components/Cashbacks';
import RewardCoins from './components/RewardCoins';
import PaymentHistory from './components/PaymentHistory';
import CryptoExchange from './components/CryptoExchange';
import NFTPassport from './components/NFTPassport';

const Wallet = ({ isSidebar = false, onBack }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showBalance, setShowBalance] = useState(true);

    // Derive active tab from URL or default to balance
    const getActiveTab = () => {
        const pathParts = location.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        return ['balance', 'earnings', 'payout', 'travel-credits', 'cashbacks', 'reward-coins', 'history', 'crypto', 'nft-passport'].includes(lastPart)
            ? lastPart
            : 'balance';
    };

    const activeTab = getActiveTab();

    const navItems = [
        { id: 'balance', label: 'Balance', icon: WalletIcon, color: '#3b82f6' },
        { id: 'earnings', label: 'Earnings', icon: TrendingUp, color: '#10b981' },
        { id: 'payout', label: 'Payout', icon: ArrowUpRight, color: '#f59e0b' },
        { id: 'travel-credits', label: 'Credits', icon: CreditCard, color: '#8b5cf6' },
        { id: 'cashbacks', label: 'Cashbacks', icon: Gift, color: '#ec4899' },
        { id: 'reward-coins', label: 'Coins', icon: Coins, color: '#eab308' },
        { id: 'history', label: 'History', icon: History, color: '#64748b' },
        { id: 'crypto', label: 'Crypto', icon: Bitcoin, color: '#f97316' },
        { id: 'nft-passport', label: 'Passport', icon: Stamp, color: '#a78bfa' },
    ];

    const handleTabClick = (id) => {
        if (isSidebar) {
            // In sidebar mode, we might want to just change local state if not using routes
            // But for now, let's stick to navigation for consistency
            navigate(`/user/wallet/${id}`);
        } else {
            navigate(id); // Relative navigation
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'balance': return <Balance />;
            case 'earnings': return <Earnings />;
            case 'payout': return <Payout />;
            case 'travel-credits': return <TravelCredits />;
            case 'cashbacks': return <Cashbacks />;
            case 'reward-coins': return <RewardCoins />;
            case 'history': return <PaymentHistory />;
            case 'crypto': return <CryptoExchange />;
            case 'nft-passport': return <NFTPassport />;
            default: return <Balance />;
        }
    };

    return (
        <div className={`wallet-page ${isSidebar ? 'sidebar-mode' : ''}`}>
            {/* Header Section */}
            <header className="wallet-header">
                <div className="header-left">
                    {isSidebar && onBack && (
                        <button className="back-btn" onClick={onBack}>
                            <ArrowRight className="rotate-180" size={20} />
                        </button>
                    )}
                    <div className="title-group">
                        <h1>{isSidebar ? 'Wallet' : 'My Wallet'}</h1>
                        <div className="streak-badge">
                            <span className="fire-icon">🔥</span>
                            <span className="streak-count">12 Day Streak</span>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <button
                        className="balance-toggle"
                        onClick={() => setShowBalance(!showBalance)}
                    >
                        {showBalance ? '🙈' : '👁️'}
                    </button>
                    <button className="add-funds-btn pulse">
                        <Plus size={20} />
                        <span>{isSidebar ? '' : 'Add Funds'}</span>
                    </button>
                </div>
            </header>

            {/* Sub-Navigation */}
            <nav className="wallet-sub-nav">
                <div className="nav-scroll-container">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(item.id)}
                            style={{ '--item-color': item.color }}
                            title={item.label}
                        >
                            <div className="icon-wrapper">
                                <item.icon size={18} />
                                {item.id === 'cashbacks' && <span className="notif-badge">2</span>}
                            </div>
                            {!isSidebar && <span>{item.label}</span>}
                            {isSidebar && <span className="mini-label">{item.label}</span>}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Content Area */}
            <div className="wallet-content">
                <div className="content-fade-in" key={activeTab}>
                    {isSidebar ? renderContent() : (
                        <Routes>
                            <Route path="/" element={<Navigate to="balance" replace />} />
                            <Route path="balance" element={<Balance />} />
                            <Route path="earnings" element={<Earnings />} />
                            <Route path="payout" element={<Payout />} />
                            <Route path="travel-credits" element={<TravelCredits />} />
                            <Route path="cashbacks" element={<Cashbacks />} />
                            <Route path="reward-coins" element={<RewardCoins />} />
                            <Route path="history" element={<PaymentHistory />} />
                        </Routes>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wallet;
