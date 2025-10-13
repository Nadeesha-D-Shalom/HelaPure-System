import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    setIsAdding(true);
    addToCart(product, 1);
    
    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}>
        <i className="fas fa-star"></i>
      </span>
    ));
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons or interactive elements
    if (e.target.closest('button') || e.target.closest('.wishlist-btn') || e.target.closest('.add-to-cart-btn')) {
      return;
    }
    
    // Navigate to product details
    window.location.href = `/product/${product.id}`;
  };

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          
          {product.discount && product.discount > 0 && (
            <div className="discount-badge">
              -{product.discount}%
            </div>
          )}
          
          {product.badge && (
            <div className="product-badge">
              {product.badge}
            </div>
          )}

          <button
            className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <i className={`fas fa-heart ${isInWishlist(product.id) ? 'filled' : ''}`}></i>
          </button>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          
          <p className="product-description">
            {product.description}
          </p>

          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviews || 0})
              </span>
            </div>
          )}

          <div className="product-price-section">
            <div className="price-container">
              <span className="current-price">Rs. {product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">Rs. {product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            <div className="product-actions">
              <button
                className={`add-to-cart-btn ${isAdding ? 'adding' : ''} ${isInCart(product.id) ? 'in-cart' : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding || !product.inStock}
              >
                {isAdding ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Adding...
                  </>
                ) : isInCart(product.id) ? (
                  <>
                    <i className="fas fa-check"></i>
                    In Cart
                  </>
                ) : (
                  <>
                    <i className="fas fa-shopping-cart"></i>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          {!product.inStock && (
            <div className="out-of-stock">
              Out of Stock
            </div>
          )}
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div 
          className="login-prompt-overlay"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div 
            className="login-prompt-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-prompt-btn"
              onClick={() => setShowLoginPrompt(false)}
            >
              ✕
            </button>
            
            <div className="prompt-content">
              <div className="prompt-icon">🔒</div>
              <h3>Login Required</h3>
              <p>You need to be logged in to add items to your cart or wishlist.</p>
              
              <div className="prompt-actions">
                <Link 
                  to="/login" 
                  className="login-btn"
                  onClick={() => setShowLoginPrompt(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/login" 
                  className="register-btn"
                  onClick={() => setShowLoginPrompt(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;