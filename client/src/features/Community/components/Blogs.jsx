import React, { useState } from 'react';
import {
    BookOpen,
    Clock,
    Lock,
    Sparkles,
    Bookmark,
    Share2,
    MessageSquare,
    ChevronRight,
    TrendingUp
} from 'lucide-react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: "The Ultimate Digital Nomad Guide to Lisbon 2026",
            author: "Elena Rodriguez",
            avatar: "ER",
            readTime: "12 min",
            category: "Guides",
            isPremium: true,
            summary: "AI SUMMARY: Lisbon remains the top choice for nomads. High-speed internet, vibrant community, and affordable lifestyle (if you know where to look).",
            excerpt: "Lisbon has transformed from a hidden gem into a global nomad hub. In this guide, I break down the best neighborhoods, co-working spaces, and the secret spots that haven't been ruined by tourism yet...",
            image: "https://images.unsplash.com/photo-1585211843266-991f930e9569?auto=format&fit=crop&w=800&q=80",
            likes: "2.4k",
            comments: "128"
        },
        {
            id: 2,
            title: "How I Traveled Through Central Asia on $30 a Day",
            author: "Marco Chen",
            avatar: "MC",
            readTime: "8 min",
            category: "Budget Travel",
            isPremium: false,
            summary: "AI SUMMARY: Central Asia offers incredible value. Focus on local transport, guesthouses, and market food to keep costs low while experiencing rich culture.",
            excerpt: "Crossing the border from Uzbekistan to Kyrgyzstan was one of the most challenging yet rewarding experiences of my life. Here's how I managed my budget without missing out on the magic...",
            image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
            likes: "1.8k",
            comments: "94"
        }
    ]);

    return (
        <div className="blogs-module">
            {/* Featured Section */}
            <div className="blogs-featured">
                <div className="featured-badge">
                    <TrendingUp size={14} />
                    <span>TRENDING AUTHORITY</span>
                </div>
                <h2>Authority Travel Blogs</h2>
                <p>Deep dives, expert guides, and AI-powered insights.</p>
            </div>

            {/* Blogs List */}
            <div className="blogs-list">
                {blogs.map(blog => (
                    <article key={blog.id} className={`blog-card ${blog.isPremium ? 'premium' : ''}`}>
                        <div className="blog-image-wrapper">
                            <img src={blog.image} alt={blog.title} />
                            {blog.isPremium && (
                                <div className="premium-lock-overlay">
                                    <Lock size={24} />
                                    <span>PREMIUM CONTENT</span>
                                </div>
                            )}
                            <div className="blog-category-tag">{blog.category}</div>
                        </div>

                        <div className="blog-content">
                            <div className="blog-header">
                                <div className="blog-author">
                                    <div className="author-avatar-mini">{blog.avatar}</div>
                                    <span>{blog.author}</span>
                                </div>
                                <div className="blog-meta">
                                    <Clock size={14} />
                                    <span>{blog.readTime} read</span>
                                </div>
                            </div>

                            <h3 className="blog-title">{blog.title}</h3>

                            <div className="ai-summary-box">
                                <div className="ai-header">
                                    <Sparkles size={14} />
                                    <span>AI INSIGHT</span>
                                </div>
                                <p>{blog.summary}</p>
                            </div>

                            <p className="blog-excerpt">{blog.excerpt}</p>

                            {blog.isPremium ? (
                                <div className="paywall-action">
                                    <button className="unlock-blog-btn">
                                        <Lock size={16} />
                                        <span>Unlock Full Guide for $1.99</span>
                                    </button>
                                    <p className="paywall-hint">Or subscribe to @elena_r for $4.99/mo</p>
                                </div>
                            ) : (
                                <div className="blog-footer">
                                    <div className="blog-stats">
                                        <div className="stat">
                                            <TrendingUp size={16} />
                                            <span>{blog.likes}</span>
                                        </div>
                                        <div className="stat">
                                            <MessageSquare size={16} />
                                            <span>{blog.comments}</span>
                                        </div>
                                    </div>
                                    <div className="blog-actions">
                                        <button className="blog-action-btn"><Bookmark size={20} /></button>
                                        <button className="blog-action-btn"><Share2 size={20} /></button>
                                        <button className="read-more-btn">
                                            <span>Read More</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* Newsletter Hook */}
            <div className="blog-newsletter">
                <div className="newsletter-content">
                    <h3>Get the Nomad Intelligence</h3>
                    <p>Weekly AI-curated travel trends and hidden deals.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button className="subscribe-btn">Join 50k+ Nomads</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
