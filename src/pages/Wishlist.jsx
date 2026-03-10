import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Sample products for demonstration when wishlist is empty
  const sampleProducts = [
    {
      id: 101,
      name: 'Pelwatte Full Cream Milk Powder 400g',
      price: 978.00,
      originalPrice: 1125.00,
      image: '/api/placeholder/200/200',
      rating: 4.6,
      category: 'Dairy Products',
      inStock: true,
      discount: 13,
      description: 'Pure and natural full cream milk powder from Pelwatte'
    },
    {
      id: 102,
      name: 'Highland Fresh Milk 1L',
      price: 185.00,
      originalPrice: 220.00,
      image: '/api/placeholder/200/200',
      rating: 4.5,
      category: 'Dairy Products',
      inStock: true,
      discount: 16,
      description: 'Fresh, pure milk from Highland dairy farms'
    },
    {
      id: 103,
      name: 'Elephant House Cream Soda 500ml',
      price: 95.00,
      originalPrice: 110.00,
      image: '/api/placeholder/200/200',
      rating: 4.7,
      category: 'Beverages',
      inStock: true,
      discount: 14,
      description: 'Refreshing cream soda from Elephant House'
    },
    {
      id: 104,
      name: 'Red Rice 1kg',
      price: 320.00,
      originalPrice: 380.00,
      image: '/api/placeholder/200/200',
      rating: 4.8,
      category: 'Rice & Grains',
      inStock: false,
      discount: 16,
      description: 'Premium red rice, rich in nutrients and fiber'
    }
  ];

  const handleAddToCart = async (product) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    setIsAddingToCart(prev => ({ ...prev, [product.id]: true }));
    addToCart(product, 1);
    
    setTimeout(() => {
      setIsAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddSampleToWishlist = (product) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    // This would normally add to wishlist, but for demo we'll just show a message
    alert(`Added ${product.name} to wishlist!`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.floor(rating) ? 'filled' : ''}`}
      ></i>
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="wishlist-page">
      <Header />
      
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">
            <i className="fas fa-heart"></i>
            My Wishlist
          </h1>
          <p className="wishlist-subtitle">
            {wishlist.length > 0 
              ? `You have ${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} in your wishlist`
              : 'Save items you love for later'
            }
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="wishlist-content">
            <div className="wishlist-actions">
              <button 
                className="clear-wishlist-btn"
                onClick={clearWishlist}
              >
                <i className="fas fa-trash"></i>
                Clear All
              </button>
              <Link to="/" className="continue-shopping-btn">
                <i className="fas fa-arrow-left"></i>
                Continue Shopping
              </Link>
            </div>

            <div className="wishlist-grid">
              {wishlist.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <div className="item-image">
                    <img src={item.image || '/api/placeholder/200/200'} alt={item.name} />
                    <div className="item-actions">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        title="Remove from wishlist"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    {item.discount && (
                      <div className="discount-badge">
                        -{item.discount}%
                      </div>
                    )}
                  </div>
                  
                  <div className="item-content">
                    <div className="item-category">{item.category}</div>
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-rating">
                      {renderStars(item.rating)}
                      <span className="rating-text">({item.rating})</span>
                    </div>
                    
                    <div className="item-pricing">
                      <span className="current-price">Rs. {item.price.toFixed(2)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="original-price">Rs. {item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="item-stock">
                      {item.inStock ? (
                        <span className="in-stock">
                          <i className="fas fa-check"></i>
                          In Stock
                        </span>
                      ) : (
                        <span className="out-of-stock">
                          <i className="fas fa-times"></i>
                          Out of Stock
                        </span>
                      )}
                    </div>
                    
                    <div className="item-date">
                      Added on {formatDate(item.addedAt)}
                    </div>
                    
                    <div className="item-buttons">
                      {isInCart(item.id) ? (
                        <button className="in-cart-btn" disabled>
                          <i className="fas fa-check"></i>
                          In Cart
                        </button>
                      ) : (
                        <button
                          className={`add-to-cart-btn ${!item.inStock ? 'disabled' : ''}`}
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock || isAddingToCart[item.id]}
                        >
                          {isAddingToCart[item.id] ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i>
                              Adding...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-shopping-cart"></i>
                              Add to Cart
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="wishlist-empty">
            <div className="empty-content">
              <div className="empty-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h2 className="empty-title">Your wishlist is empty</h2>
              <p className="empty-description">
                Start adding items you love to your wishlist! 
                Browse our collection and save your favorites for later.
              </p>
              <Link to="/" className="start-shopping-btn">
                <i className="fas fa-shopping-bag"></i>
                Start Shopping
              </Link>
            </div>
            
            <div className="recommendations">
              <h3 className="recommendations-title">
                <i className="fas fa-star"></i>
                Recommended for You
              </h3>
              <div className="recommendations-grid">
                {sampleProducts.map((product) => (
                  <div key={product.id} className="recommendation-item">
                    <div className="rec-image">
                      <img src={product.image} alt={product.name} />
                      {product.discount && (
                        <div className="rec-discount-badge">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                    <div className="rec-content">
                      <div className="rec-category">{product.category}</div>
                      <h4 className="rec-name">{product.name}</h4>
                      <div className="rec-rating">
                        {renderStars(product.rating)}
                        <span>({product.rating})</span>
                      </div>
                      <div className="rec-pricing">
                        <span className="rec-current-price">Rs. {product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="rec-original-price">Rs. {product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="rec-stock">
                        {product.inStock ? (
                          <span className="rec-in-stock">
                            <i className="fas fa-check"></i>
                            In Stock
                          </span>
                        ) : (
                          <span className="rec-out-of-stock">
                            <i className="fas fa-times"></i>
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <div className="rec-actions">
                        <button
                          className="rec-add-to-wishlist"
                          onClick={() => handleAddSampleToWishlist(product)}
                        >
                          <i className="fas fa-heart"></i>
                          Add to Wishlist
                        </button>
                        <Link to={`/product/${product.id}`} className="rec-view-details">
                          <i className="fas fa-eye"></i>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="login-prompt-modal">
          <div className="login-prompt-content">
            <div className="login-prompt-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3>Login Required</h3>
            <p>Please log in to add items to your wishlist or cart.</p>
            <div className="login-prompt-actions">
              <Link to="/login" className="login-btn">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </Link>
              <button 
                className="cancel-btn"
                onClick={() => setShowLoginPrompt(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Wishlist;
