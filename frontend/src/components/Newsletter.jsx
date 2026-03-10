import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h3>Stay Updated with HelaPure</h3>
            <p>
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive offers, and healthy living tips!
            </p>
          </div>

          <div className="newsletter-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🎁</span>
              <span>Exclusive discounts</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🆕</span>
              <span>New product alerts</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💡</span>
              <span>Health & wellness tips</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📧</span>
              <span>Weekly newsletter</span>
            </div>
          </div>
        </div>

        <div className="newsletter-form-container">
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className={`email-input ${error ? 'error' : ''}`}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className={`subscribe-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      📧 Subscribe
                    </>
                  )}
                </button>
              </div>
              
              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h4>Thank you for subscribing!</h4>
              <p>You'll receive our newsletter with exclusive offers and updates.</p>
            </div>
          )}

          <div className="newsletter-privacy">
            <p>
              🔒 We respect your privacy. Unsubscribe at any time. 
              <a href="/privacy" className="privacy-link">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
