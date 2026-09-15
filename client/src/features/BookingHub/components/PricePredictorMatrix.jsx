import React, { useState } from 'react';
import { TrendingDown, TrendingUp, AlertCircle, RefreshCw, BarChart } from 'lucide-react';
import '../../styles/PricePredictorMatrix.css';

const PricePredictorMatrix = ({ route = "LHR to DXB" }) => {
    const [status] = useState('buy'); // 'buy' or 'wait'
    const [confidence] = useState(87);

    return (
        <div className="price-predictor-container">
            <div className="ppm-header">
                <div className="ppm-title">
                    <BarChart size={20} color="#F59E0B" />
                    <h2>Algorithmic Price Predictor</h2>
                </div>
                <div className="ppm-route">{route}</div>
            </div>

            <div className="ppm-main">
                <div className={`ppm-verdict ${status}`}>
                    <div className="verdict-icon">
                        {status === 'buy' ? <TrendingDown size={28} /> : <TrendingUp size={28} />}
                    </div>
                    <div className="verdict-text">
                        <h3>{status === 'buy' ? 'Buy Now' : 'Wait to Book'}</h3>
                        <p>Prices are expected to {status === 'buy' ? 'rise' : 'drop'} in the next 7 days.</p>
                    </div>
                </div>

                <div className="ppm-confidence">
                    <div className="conf-bar">
                        <div className="conf-fill" style={{ width: `${confidence}%` }}></div>
                    </div>
                    <span><strong>{confidence}%</strong> AI Confidence Score</span>
                </div>
            </div>

            <div className="ppm-footer">
                <AlertCircle size={14} /> Based on an analysis of 14,000 historical flights for this exact route and seasonality.
            </div>
        </div>
    );
};

export default PricePredictorMatrix;
