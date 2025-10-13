import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Reviews.css';

const Reviews = () => {
  const [activeTab, setActiveTab] = useState('my-reviews');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: 'Organic Honey',
      productImage: '/api/placeholder/80/80',
      rating: 5,
      reviewText: 'Excellent quality honey! Very pure and natural taste.',
      date: '2024-01-15',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      productName: 'Natural Coconut Oil',
      productImage: '/api/placeholder/80/80',
      rating: 4,
      reviewText: 'Good coconut oil, but the packaging could be better.',
      date: '2024-01-10',
      helpful: 8,
      verified: true
    }
  ]);

  const tabs = [
    { id: 'my-reviews', label: 'My Reviews', icon: 'fas fa-star' },
    { id: 'pending', label: 'Pending Reviews', icon: 'fas fa-clock' },
    { id: 'helpful', label: 'Helpful Reviews', icon: 'fas fa-thumbs-up' }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? 'filled' : ''}`}
      ></i>
    ));
  };

  return (
    <div className="reviews-page">
      <Header />
      
      <div className="reviews-container">
        <div className="reviews-header">
          <h1 className="reviews-title">
            <i className="fas fa-star"></i>
            My Reviews
          </h1>
          <p className="reviews-subtitle">Manage your product reviews and ratings</p>
        </div>

        <div className="reviews-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`reviews-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="reviews-content">
          {activeTab === 'my-reviews' && (
            <div className="reviews-list">
              {reviews.length === 0 ? (
                <div className="reviews-empty">
                  <i className="fas fa-star"></i>
                  <h3>No reviews yet</h3>
                  <p>Start reviewing products you've purchased!</p>
                </div>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-product">
                      <img src={review.productImage} alt={review.productName} />
                      <div className="product-info">
                        <h4>{review.productName}</h4>
                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="review-content">
                      <p className="review-text">{review.reviewText}</p>
                      <div className="review-meta">
                        <span className="review-date">{review.date}</span>
                        {review.verified && (
                          <span className="verified-badge">
                            <i className="fas fa-check-circle"></i>
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="review-actions">
                      <div className="helpful-count">
                        <i className="fas fa-thumbs-up"></i>
                        {review.helpful} found helpful
                      </div>
                      <div className="action-buttons">
                        <button className="edit-btn">
                          <i className="fas fa-edit"></i>
                          Edit
                        </button>
                        <button className="delete-btn">
                          <i className="fas fa-trash"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'pending' && (
            <div className="reviews-empty">
              <i className="fas fa-clock"></i>
              <h3>No pending reviews</h3>
              <p>All your recent purchases have been reviewed!</p>
            </div>
          )}

          {activeTab === 'helpful' && (
            <div className="reviews-empty">
              <i className="fas fa-thumbs-up"></i>
              <h3>No helpful reviews yet</h3>
              <p>Your reviews will appear here when others find them helpful!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reviews;
