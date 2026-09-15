import React from 'react';
import { Sparkles, TrendingUp, Star, Crown, Heart, Share2, Users, MoreVertical, Trophy, Clock } from 'lucide-react';

const GameCard = ({ game, viewMode }) => {
    const isList = viewMode === 'list';

    return (
        <div className={`game-card-premium ${isList ? 'list-view' : ''}`}>
            {/* Image Section */}
            <div className="game-image-container">
                <img src={game.thumbnail} alt={game.name} className="game-image" />
                <div className="game-overlay-gradient"></div>

                {/* Match Badge */}
                <div className="match-badge">
                    <Sparkles size={12} fill="currentColor" />
                    <span>{game.matchScore} Match</span>
                </div>

                {/* Trending/Featured Badge */}
                {game.trending && (
                    <div className="trending-badge">
                        <TrendingUp size={12} />
                        <span>Trending</span>
                    </div>
                )}
                {game.featured && !game.trending && (
                    <div className="featured-badge">
                        <Star size={12} fill="currentColor" />
                        <span>Featured</span>
                    </div>
                )}

                {/* Premium Badge */}
                {game.premium && (
                    <div className="premium-badge">
                        <Crown size={12} fill="currentColor" />
                        <span>Premium</span>
                    </div>
                )}

                {/* Favorite Button */}
                <button className="favorite-btn">
                    <Heart size={18} />
                </button>

                {/* Vertical Action Capsule */}
                <div className="game-action-capsule">
                    <button className="capsule-btn like" title="Like">
                        <Heart size={14} />
                    </button>
                    <button className="capsule-btn share" title="Share">
                        <Share2 size={14} />
                    </button>
                    <button className="capsule-btn invite" title="Invite Friends">
                        <Users size={14} />
                    </button>
                    <button className="capsule-btn more" title="More Options">
                        <MoreVertical size={14} />
                    </button>
                </div>
            </div>

            {/* Card Content */}
            <div className="game-card-content">
                <div className="game-header-top">
                    <h3>{game.name}</h3>
                    <div className="game-rating">
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{game.rating}</span>
                    </div>
                </div>

                <div className="game-type-row">
                    <span className="game-type-badge">{game.type}</span>
                    <span className="game-difficulty">{game.difficulty}</span>
                </div>

                {/* Player Stats */}
                <div className="game-stats">
                    <div className="stat-item">
                        <Users size={14} className="stat-icon blue" />
                        <span>{game.playersNow} playing</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <Trophy size={14} className="stat-icon green" />
                        <span>{game.totalPlayers} total</span>
                    </div>
                </div>

                {/* AI Insight */}
                {game.aiInsight && (
                    <div className="ai-insight">
                        <Sparkles size={12} />
                        <span>{game.aiInsight}</span>
                    </div>
                )}

                {/* Tags */}
                <div className="game-tags-row">
                    {game.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="game-tag">{tag}</span>
                    ))}
                </div>

                {/* Tournament Info */}
                {game.tournament?.active && (
                    <div className="tournament-info">
                        <Trophy size={14} color="#f59e0b" />
                        <span>Prize: {game.tournament.prize}</span>
                        <Clock size={12} color="#64748b" />
                        <span className="time-left">{game.tournament.endsIn}</span>
                    </div>
                )}

                {/* Card Footer */}
                <div className="game-card-footer">
                    <div className="game-reward-info">
                        <span className="reward-label">Reward</span>
                        <span className="reward-value">{game.rewards.voucher}</span>
                    </div>
                    <button className="play-btn-premium">Play Now</button>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
