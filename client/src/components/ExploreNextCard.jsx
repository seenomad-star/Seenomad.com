import React from 'react';
import { ChevronRight, Save } from 'lucide-react';

const ExploreNextCard = () => {
    return (
        <div className="explore-next-container">
            <div className="panel-section">
                <div className="panel-header">
                    <h3>Explore Next, Shahrukh!</h3>
                    <ChevronRight size={16} />
                </div>
                <div className="next-destination">
                    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400" alt="Palampur" />
                    <div className="next-info">
                        <h4>Palampur</h4>
                        <p>Renowned for its tea gardens and scenic beauty.</p>
                        <div className="next-actions">
                            <button className="save-dest-btn"><Save size={16} /> Save</button>
                            <button className="book-flight-btn">Book Flight • $240</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreNextCard;
