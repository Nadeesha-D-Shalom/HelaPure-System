import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useNotifications } from '../context/NotificationContext';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductComparison from '../components/ProductComparison';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist, addToRecentlyViewed } = useWishlist();
  const { notifyPriceDrop } = useNotifications();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showComparison, setShowComparison] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });

  // Enhanced mock product data
  const product = {
    id: parseInt(id),
    name: 'Premium Organic Raw Honey',
    brand: 'HelaPure',
    price: 25.99,
    originalPrice: 29.99,
    discount: 13,
    images: [
      'https://via.placeholder.com/600x400/22c55e/ffffff?text=Organic+Honey+1',
      'https://via.placeholder.com/600x400/16a34a/ffffff?text=Organic+Honey+2',
      'https://via.placeholder.com/600x400/15803d/ffffff?text=Organic+Honey+3',
      'https://via.placeholder.com/600x400/166534/ffffff?text=Organic+Honey+4'
    ],
    description: 'Pure, raw organic honey collected from local beekeepers in the pristine mountains of Sri Lanka. This premium honey is unfiltered and unpasteurized, retaining all its natural enzymes, vitamins, and health benefits. Perfect for daily consumption, cooking, and natural remedies.',
    longDescription: `Our Premium Organic Raw Honey is sourced directly from certified organic beekeepers who follow sustainable practices. The honey is collected from wildflower nectar, giving it a unique flavor profile that reflects the diverse flora of Sri Lanka's highlands.

This honey undergoes minimal processing to preserve its natural properties. It contains natural enzymes, antioxidants, and trace minerals that are beneficial for health. The honey has a golden color with a smooth, creamy texture and a rich, complex flavor.

Perfect for:
- Daily consumption for health benefits
- Natural sweetener for tea and coffee
- Baking and cooking
- Natural remedies and home treatments
- Gift giving

Storage: Store in a cool, dry place away from direct sunlight.`,
    features: [
      '100% Organic Certified',
      'Raw & Unfiltered',
      'Locally Sourced',
      'Rich in Antioxidants',
      'Natural Enzymes Preserved',
      'No Additives or Preservatives',
      'Sustainable Beekeeping',
      'Premium Quality'
    ],
    specifications: {
      weight: '500g',
      origin: 'Sri Lanka Highlands',
      harvestDate: '2024',
      shelfLife: '2 years',
      storage: 'Cool, dry place',
      certification: 'Organic Certified',
      packaging: 'Glass Jar',
      color: 'Golden Amber'
    },
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 127,
    category: 'Honey & Sweeteners',
    tags: ['organic', 'raw', 'premium', 'local', 'healthy'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  };

  // Mock reviews data
  useEffect(() => {
    const mockReviews = [
      {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-15',
        comment: 'Amazing quality honey! The taste is incredible and it\'s so pure. I use it daily in my tea and it has improved my overall health.',
        verified: true
      },
      {
        id: 2,
        name: 'Michael Chen',
        rating: 5,
        date: '2024-01-10',
        comment: 'Best honey I\'ve ever tasted. The organic certification gives me confidence in the quality. Fast shipping too!',
        verified: true
      },
      {
        id: 3,
        name: 'Emma Wilson',
        rating: 4,
        date: '2024-01-08',
        comment: 'Great honey with excellent flavor. The packaging is beautiful and the honey is very fresh. Highly recommended!',
        verified: false
      }
    ];
    setReviews(mockReviews);
    
    // Add to recently viewed
    addToRecentlyViewed(product);
  }, [id, addToRecentlyViewed]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const handleBuyNow = () => {
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      verified: false
    };
    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 5, comment: '', name: '' });
    alert('Thank you for your review!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>⭐</span>
    ));
  };

  return (
    <>
      <Header />
      <div className="product-details-page">
        <div className="product-container">
          <button 
            onClick={() => navigate(-1)}
            className="back-button"
          >
            ← Back to Products
          </button>
          
          <div className="product-main">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                />
                {product.discount > 0 && (
                  <div className="discount-badge">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-header">
                <div className="product-breadcrumb">
                  <span>Home</span> / <span>{product.category}</span> / <span>{product.name}</span>
                </div>
                
                <h1 className="product-title">{product.name}</h1>
                
                <div className="product-rating">
                  <div className="stars">
                    {renderStars(Math.floor(product.rating))}
                  </div>
                  <span className="rating-text">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="product-price">
                  <span className="current-price">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                  )}
                  {product.discount > 0 && (
                    <span className="savings">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* Features */}
              <div className="product-features">
                <h3>Key Features:</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              {/* Stock Status */}
              <div className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">
                    ✓ In Stock ({product.stockCount} available)
                  </span>
                ) : (
                  <span className="out-of-stock">✗ Out of Stock</span>
                )}
              </div>

              {/* Quantity and Actions */}
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}>+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="add-to-cart-btn"
                >
                  🛒 Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="buy-now-btn"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                >
                  {isInWishlist(product.id) ? '❤️' : '🤍'} Wishlist
                </button>
              </div>

              {/* Additional Actions */}
              <div className="additional-actions">
                <button onClick={() => setShowComparison(true)} className="compare-btn">
                  🔄 Compare
                </button>
                <button onClick={handleShare} className="share-btn">
                  📤 Share
                </button>
              </div>

              {/* Seller Info */}
              <div className="seller-info">
                <h4>Sold by:</h4>
                <div className="seller-details">
                  <span className="seller-name">{product.seller.name}</span>
                  {product.seller.verified && <span className="verified-badge">✓ Verified</span>}
                  <div className="seller-rating">
                    {renderStars(Math.floor(product.seller.rating))} {product.seller.rating}
                  </div>
                  <span className="seller-location">{product.seller.location}</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="shipping-info">
                <h4>Shipping & Returns:</h4>
                <ul>
                  <li>🚚 {product.shipping.estimatedDelivery}</li>
                  {product.shipping.freeShipping && <li>🆓 Free shipping on this item</li>}
                  <li>↩️ {product.shipping.returnPolicy}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="product-tabs">
            <div className="tab-headers">
              <button 
                className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description-content">
                  <p>{product.longDescription}</p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="specifications-content">
                  <table className="specifications-table">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</td>
                        <td className="spec-value">{value}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-content">
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <span className="rating-number">{product.rating}</span>
                      <div className="rating-stars">{renderStars(Math.floor(product.rating))}</div>
                      <span className="rating-count">Based on {product.reviewCount} reviews</span>
                    </div>
                  </div>

                  <div className="add-review">
                    <h4>Write a Review</h4>
                    <form onSubmit={handleAddReview}>
                      <div className="review-form-group">
                        <label>Your Name:</label>
                        <input
                          type="text"
                          value={newReview.name}
                          onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="review-form-group">
                        <label>Rating:</label>
                        <div className="rating-input">
                          {Array.from({ length: 5 }, (_, i) => (
                            <button
                              key={i}
                              type="button"
                              className={`rating-star ${i < newReview.rating ? 'selected' : ''}`}
                              onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                            >
                              ⭐
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="review-form-group">
                        <label>Your Review:</label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          required
                          rows="4"
                        />
                      </div>
                      <button type="submit" className="submit-review-btn">Submit Review</button>
                    </form>
                  </div>

                  <div className="reviews-list">
                    {reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">{review.name}</span>
                            {review.verified && <span className="verified-badge">✓ Verified Purchase</span>}
                          </div>
                          <div className="review-rating">{renderStars(review.rating)}</div>
                          <div className="review-date">{review.date}</div>
                        </div>
                        <div className="review-comment">{review.comment}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Comparison Modal */}
      <ProductComparison 
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        products={[product]}
      />

      <Footer />
    </>
  );
};

export default ProductDetails;