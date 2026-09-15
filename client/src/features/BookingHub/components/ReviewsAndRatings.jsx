import React, { useState } from 'react';
import { Star, Camera, CheckCircle, ThumbsUp, MapPin } from 'lucide-react';
import '../styles/ReviewsAndRatings.css';

const ReviewsAndRatings = ({ entityId, entityName }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [images, setImages] = useState([]);
    
    // Mock existing reviews
    const [reviews, setReviews] = useState([
        {
            id: 1,
            user: "Sarah Jenkins",
            rating: 5,
            date: "October 12, 2026",
            text: "Absolutely stunning property! The wifi was blazing fast (300mbps) and the coworking space had ergonomic chairs. Perfect for digital nomads.",
            images: ["https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=200", "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200"],
            helpful: 24
        },
        {
            id: 2,
            user: "Marcus Chen",
            rating: 4,
            date: "September 28, 2026",
            text: "Great location right next to the metro. Breakfast was a bit lacking for the price, but the room itself was incredibly comfortable.",
            images: [],
            helpful: 8
        }
    ]);

    const handleImageUpload = (e) => {
        // Mock image upload
        const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return alert('Please select a rating');
        
        const newReview = {
            id: Date.now(),
            user: "You",
            rating,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            text: reviewText,
            images,
            helpful: 0
        };
        
        setReviews([newReview, ...reviews]);
        setRating(0);
        setReviewText('');
        setImages([]);
    };

    return (
        <div className="reviews-container">
            <div className="reviews-header">
                <h2>Verified Traveler Reviews</h2>
                <div className="overall-rating">
                    <div className="score">4.8</div>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} size={16} fill="#F59E0B" color="#F59E0B" />
                        ))}
                    </div>
                    <span className="count">({reviews.length} reviews)</span>
                </div>
            </div>

            <div className="write-review-card">
                <h3>Rate your experience at {entityName || 'this destination'}</h3>
                
                <div className="star-selector">
                    {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                            key={star} 
                            size={32} 
                            fill={(hoverRating || rating) >= star ? "#F59E0B" : "transparent"} 
                            color={(hoverRating || rating) >= star ? "#F59E0B" : "rgba(255,255,255,0.2)"}
                            className="cursor-pointer transition-colors"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                    <span className="rating-label">
                        {rating === 1 && "Terrible"}
                        {rating === 2 && "Poor"}
                        {rating === 3 && "Average"}
                        {rating === 4 && "Very Good"}
                        {rating === 5 && "Exceptional!"}
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="review-form">
                    <textarea 
                        placeholder="Share details of your own experience at this place. Was the WiFi reliable? Were the locals friendly?"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                        required
                    />
                    
                    <div className="form-bottom-row">
                        <div className="photo-upload-container">
                            <label className="photo-upload-btn">
                                <Camera size={18} /> Add Photos
                                <input type="file" multiple accept="image/*" onChange={handleImageUpload} hidden />
                            </label>
                            <div className="image-preview-strip">
                                {images.map((img, idx) => (
                                    <img key={idx} src={img} alt="Preview" className="img-prev" />
                                ))}
                            </div>
                        </div>
                        
                        <button type="submit" className="submit-review-btn">Post Review</button>
                    </div>
                </form>
            </div>

            <div className="reviews-feed">
                {reviews.map(rev => (
                    <div className="review-item" key={rev.id}>
                        <div className="rev-user">
                            <div className="rev-avatar">{rev.user.charAt(0)}</div>
                            <div className="rev-meta">
                                <h4>{rev.user} <CheckCircle size={12} className="verified-icon" /></h4>
                                <span>{rev.date}</span>
                            </div>
                        </div>
                        <div className="rev-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} size={12} fill={star <= rev.rating ? "#F59E0B" : "transparent"} color={star <= rev.rating ? "#F59E0B" : "rgba(255,255,255,0.2)"} />
                            ))}
                        </div>
                        <p className="rev-text">{rev.text}</p>
                        
                        {rev.images.length > 0 && (
                            <div className="rev-images">
                                {rev.images.map((img, idx) => (
                                    <img key={idx} src={img} alt="User submission" />
                                ))}
                            </div>
                        )}
                        
                        <div className="rev-helpful">
                            <button className="helpful-btn"><ThumbsUp size={14} /> Helpful ({rev.helpful})</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsAndRatings;
