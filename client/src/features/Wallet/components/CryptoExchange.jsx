import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, RefreshCw, Zap, Shield, BarChart2 } from 'lucide-react';
import './CryptoExchange.css';

const COINS = [
    { symbol: 'NMD', name: 'Nomad Coin', price: 4.82, change: 12.4, icon: '🪙', color: '#f59e0b', balance: 1240 },
    { symbol: 'BTC', name: 'Bitcoin', price: 68420, change: -2.1, icon: '₿', color: '#f97316', balance: 0.012 },
    { symbol: 'ETH', name: 'Ethereum', price: 3812, change: 5.3, icon: 'Ξ', color: '#8b5cf6', balance: 0.54 },
    { symbol: 'SOL', name: 'Solana', price: 168, change: 8.7, icon: '◎', color: '#06b6d4', balance: 3.2 },
];

const generateSparkline = (up) => {
    const points = Array.from({ length: 12 }, (_, i) => {
        const base = 50;
        const trend = up ? i * 3 : -i * 3;
        return Math.max(5, Math.min(95, base + trend + (Math.random() - 0.5) * 20));
    });
    return points.map((p, i) => `${(i / 11) * 200},${100 - p}`).join(' ');
};

const CryptoExchange = () => {
    const [prices, setPrices] = useState(COINS);
    const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
    const [mode, setMode] = useState('buy');
    const [amount, setAmount] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [txSuccess, setTxSuccess] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => prev.map(c => ({
                ...c,
                price: +(c.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(c.price > 100 ? 2 : 4),
            })));
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const handleTrade = () => {
        if (!amount) return;
        setTxSuccess(true);
        setAmount('');
        setTimeout(() => setTxSuccess(false), 3000);
    };

    const estValue = amount ? (parseFloat(amount) * selectedCoin.price).toFixed(2) : '0.00';
    const currentCoin = prices.find(c => c.symbol === selectedCoin.symbol) || selectedCoin;

    return (
        <div className="crypto-exchange">
            {/* Header */}
            <div className="cx-header">
                <div>
                    <h2 className="cx-title">Crypto Exchange</h2>
                    <p className="cx-subtitle">Live market • Nomad Coin & more</p>
                </div>
                <button className={`cx-refresh ${isRefreshing ? 'spin' : ''}`} onClick={handleRefresh}>
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Ticker Strip */}
            <div className="cx-ticker">
                {prices.map(coin => (
                    <button
                        key={coin.symbol}
                        className={`cx-ticker-item ${selectedCoin.symbol === coin.symbol ? 'active' : ''}`}
                        onClick={() => setSelectedCoin(coin)}
                        style={{ '--c': coin.color }}
                    >
                        <span className="cx-ticker-icon">{coin.icon}</span>
                        <div>
                            <div className="cx-ticker-symbol">{coin.symbol}</div>
                            <div className="cx-ticker-price">${coin.price > 100 ? coin.price.toLocaleString() : coin.price}</div>
                        </div>
                        <span className={`cx-ticker-change ${coin.change >= 0 ? 'pos' : 'neg'}`}>
                            {coin.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {Math.abs(coin.change)}%
                        </span>
                    </button>
                ))}
            </div>

            {/* Chart + Info */}
            <div className="cx-chart-area" style={{ '--c': currentCoin.color }}>
                <div className="cx-chart-header">
                    <div>
                        <span className="cx-coin-icon-lg">{currentCoin.icon}</span>
                        <span className="cx-coin-name">{currentCoin.name}</span>
                    </div>
                    <div className="cx-price-main">
                        <span className="cx-price-val">${currentCoin.price > 100 ? currentCoin.price.toLocaleString() : currentCoin.price}</span>
                        <span className={`cx-price-change ${currentCoin.change >= 0 ? 'pos' : 'neg'}`}>
                            {currentCoin.change >= 0 ? '+' : ''}{currentCoin.change}%
                        </span>
                    </div>
                </div>
                <svg viewBox="0 0 200 100" className="cx-sparkline" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--c)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--c)" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <polyline
                        points={generateSparkline(currentCoin.change >= 0)}
                        fill="none"
                        stroke="var(--c)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="cx-stats-row">
                    <div className="cx-stat"><span>Your Balance</span><strong>{currentCoin.balance} {currentCoin.symbol}</strong></div>
                    <div className="cx-stat"><span>Value (USD)</span><strong>${(currentCoin.balance * currentCoin.price).toLocaleString()}</strong></div>
                    <div className="cx-stat"><span>24h Vol</span><strong>$2.4M</strong></div>
                </div>
            </div>

            {/* Trade Panel */}
            <div className="cx-trade-panel">
                <div className="cx-mode-tabs">
                    <button className={mode === 'buy' ? 'active buy' : ''} onClick={() => setMode('buy')}>Buy</button>
                    <button className={mode === 'sell' ? 'active sell' : ''} onClick={() => setMode('sell')}>Sell</button>
                    <button className={mode === 'stake' ? 'active stake' : ''} onClick={() => setMode('stake')}>Stake</button>
                </div>
                <div className="cx-input-row">
                    <input
                        type="number"
                        placeholder={`Amount (${currentCoin.symbol})`}
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />
                    <span className="cx-est">≈ ${estValue}</span>
                </div>
                <div className="cx-quick-amounts">
                    {['10', '25', '50', '100'].map(v => (
                        <button key={v} onClick={() => setAmount(v)}>${v}</button>
                    ))}
                </div>
                {txSuccess ? (
                    <div className="cx-success">✅ Transaction confirmed on Nomad Chain!</div>
                ) : (
                    <button className={`cx-trade-btn cx-trade-btn--${mode}`} onClick={handleTrade}>
                        <Zap size={16} />
                        {mode === 'buy' ? `Buy ${currentCoin.symbol}` : mode === 'sell' ? `Sell ${currentCoin.symbol}` : `Stake for 12% APY`}
                    </button>
                )}
                <div className="cx-fees-note">
                    <Shield size={12} /> Gas fee ~0.001 ETH • Nomad Chain secured
                </div>
            </div>
        </div>
    );
};

export default CryptoExchange;
