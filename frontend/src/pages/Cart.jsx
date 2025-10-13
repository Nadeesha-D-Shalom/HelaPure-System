import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  // Show login prompt if user is not logged in
  if (!user) {
    return (
      <>
        <Header />
        <div className="cart-page">
          <div className="cart-container">
            <div className="login-required">
              <div className="login-required-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h2>Login Required</h2>
              <p>You need to be logged in to view your cart and make purchases.</p>
              <div className="login-actions">
                <button
                  onClick={() => navigate('/login')}
                  className="login-btn"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="register-btn"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="cart-page">
          <div className="cart-container">
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <h2>Your Cart is Empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <button
                onClick={handleContinueShopping}
                className="continue-shopping-btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <div className="cart-summary-header">
              <span className="item-count">{getTotalItems()} items</span>
              <button onClick={handleClearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>
          </div>

          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <div className="item-price-info">
                      <span className="current-price">Rs. {item.price.toFixed(2)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="original-price">Rs. {item.originalPrice.toFixed(2)}</span>
                      )}
                      {item.discount && (
                        <span className="discount-badge">-{item.discount}%</span>
                      )}
                    </div>
                    <div className="stock-info">
                      {item.inStock ? (
                        <span className="in-stock">
                          <i className="fas fa-check"></i> In Stock
                        </span>
                      ) : (
                        <span className="out-of-stock">
                          <i className="fas fa-times"></i> Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="quantity-controls">
                    <label>Quantity:</label>
                    <div className="quantity-buttons">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                        disabled={!item.inStock || item.quantity >= (item.stockCount || 99)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <div className="total-price">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} items):</span>
                  <span>Rs. {getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span className="free-shipping">FREE</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>Rs. {(getTotalPrice() * 0.15).toFixed(2)}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>Rs. {(getTotalPrice() * 1.15).toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="checkout-btn"
                >
                  <i className="fas fa-credit-card"></i> Proceed to Checkout
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="continue-shopping-btn-secondary"
                >
                  <i className="fas fa-arrow-left"></i> Continue Shopping
                </button>

                <div className="security-info">
                  <div className="security-badges">
                    <span className="security-badge">
                      <i className="fas fa-lock"></i> Secure Checkout
                    </span>
                    <span className="security-badge">
                      <i className="fas fa-credit-card"></i> Multiple Payment Options
                    </span>
                    <span className="security-badge">
                      <i className="fas fa-undo"></i> Easy Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;