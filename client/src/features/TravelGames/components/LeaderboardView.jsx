import React from 'react';
import { Award, Crown, Zap, Trophy } from 'lucide-react';

const LeaderboardView = ({ leaders, userRank }) => (
    <div className="leaderboard-view">
        <div className="view-header">
            <h2><Award size={24} /> Global Leaderboard</h2>
            <p>Top explorers of the month. Can you reach the #1 spot?</p>
        </div>

        <div className="podium-container">
            <div className="podium-item second">
                <div className="podium-avatar">
                    <img src="https://i.pravatar.cc/150?u=2" alt="Rank 2" />
                    <div className="rank-badge">2</div>
                </div>
                <div className="podium-name">{leaders[1]?.name}</div>
                <div className="podium-xp">{leaders[1]?.xp} XP</div>
            </div>
            <div className="podium-item first">
                <div className="podium-avatar">
                    <img src="https://i.pravatar.cc/150?u=1" alt="Rank 1" />
                    <div className="rank-badge">1</div>
                    <Crown size={24} className="crown-icon" />
                </div>
                <div className="podium-name">{leaders[0]?.name}</div>
                <div className="podium-xp">{leaders[0]?.xp} XP</div>
            </div>
            <div className="podium-item third">
                <div className="podium-avatar">
                    <img src="https://i.pravatar.cc/150?u=3" alt="Rank 3" />
                    <div className="rank-badge">3</div>
                </div>
                <div className="podium-name">{leaders[2]?.name}</div>
                <div className="podium-xp">{leaders[2]?.xp} XP</div>
            </div>
        </div>

        <div className="ranking-table-container">
            <table className="ranking-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Level</th>
                        <th>XP</th>
                        <th>Rewards</th>
                    </tr>
                </thead>
                <tbody>
                    {leaders.slice(3).map((player, idx) => (
                        <tr key={player.id} className={player.isUser ? 'user-row' : ''}>
                            <td>#{idx + 4}</td>
                            <td>
                                <div className="player-cell">
                                    <img src={`https://i.pravatar.cc/150?u=${player.id}`} alt={player.name} />
                                    <span>{player.name}</span>
                                </div>
                            </td>
                            <td>Lvl {player.level}</td>
                            <td>{player.xp}</td>
                            <td>{player.rewards}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="user-rank-sticky">
            <div className="u-rank-info">
                <div className="u-rank-badge">#{userRank.rank}</div>
                <div className="u-player-info">
                    <img src="https://i.pravatar.cc/150?u=me" alt="Me" />
                    <span>You (Explorer)</span>
                </div>
            </div>
            <div className="u-stats">
                <div className="u-stat">
                    <Zap size={14} />
                    <span>{userRank.xp} XP</span>
                </div>
                <div className="u-stat">
                    <Trophy size={14} />
                    <span>{userRank.rewards} Won</span>
                </div>
            </div>
            <button className="u-climb-btn">Climb Rank</button>
        </div>
    </div>
);

export default LeaderboardView;
