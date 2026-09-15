import React from 'react';
import { Trophy, Users, Gamepad2, Clock } from 'lucide-react';

const TournamentsView = ({ tournaments }) => (
    <div className="tournaments-view">
        <div className="view-header">
            <h2><Trophy size={24} /> Active Tournaments</h2>
            <p>Compete with players worldwide and win massive travel rewards.</p>
        </div>
        <div className="tournaments-grid">
            {tournaments.map(t => (
                <div key={t.id} className="tournament-card-v2">
                    <div className="t-card-header">
                        <div className="t-status-badge live">LIVE</div>
                        <div className="t-participants">
                            <Users size={14} />
                            <span>{t.participants} joined</span>
                        </div>
                    </div>
                    <h3>{t.name}</h3>
                    <div className="t-game-info">
                        <Gamepad2 size={14} />
                        <span>Game: {t.game}</span>
                    </div>
                    <div className="t-prize-pool">
                        <div className="prize-label">Prize Pool</div>
                        <div className="prize-value">{t.prizePool}</div>
                    </div>
                    <div className="t-footer">
                        <div className="t-countdown">
                            <Clock size={14} />
                            <span>Ends in: {t.endsIn}</span>
                        </div>
                        <button className="t-join-btn">Join Now</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default TournamentsView;
