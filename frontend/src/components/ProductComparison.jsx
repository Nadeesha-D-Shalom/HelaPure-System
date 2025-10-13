import React, { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import './ProductComparison.css';

const ProductComparison = ({ isOpen, onClose, products = [] }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [comparisonProducts, setComparisonProducts] = useState(products);

  useEffect(() => {
    setComparisonProducts(products);
  }, [products]);

  const handleRemoveFromComparison = (productId) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddToWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const getFeatureValue = (product, feature) => {
    switch (feature) {
      case 'price':
        return `Rs. ${product.price}`;
      case 'rating':
        return `${product.rating || 0}/5 ⭐`;
      case 'availability':
        return product.inStock ? 'In Stock' : 'Out of Stock';
      case 'brand':
        return product.brand || 'N/A';
      case 'category':
        return product.category || 'N/A';
      case 'weight':
        return product.weight || 'N/A';
      case 'origin':
        return product.origin || 'N/A';
      case 'organic':
        return product.isOrganic ? 'Yes' : 'No';
      default:
        return 'N/A';
    }
  };

  const features = [
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
    { key: 'availability', label: 'Availability' },
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Category' },
    { key: 'weight', label: 'Weight' },
    { key: 'origin', label: 'Origin' },
    { key: 'organic', label: 'Organic' }
  ];

  if (!isOpen) return null;

  return (
    <div className="comparison-overlay" onClick={onClose}>
      <div className="comparison-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comparison-header">
          <h2>Product Comparison</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="comparison-content">
          {comparisonProducts.length === 0 ? (
            <div className="empty-comparison">
              <p>No products to compare</p>
              <button onClick={onClose} className="close-btn">Close</button>
            </div>
          ) : (
            <div className="comparison-table">
              <div className="comparison-row header-row">
                <div className="feature-column">Features</div>
                {comparisonProducts.map(product => (
                  <div key={product.id} className="product-column">
                    <div className="product-header">
                      <img src={product.image} alt={product.name} className="product-image" />
                      <h3 className="product-name">{product.name}</h3>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveFromComparison(product.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {features.map(feature => (
                <div key={feature.key} className="comparison-row">
                  <div className="feature-column">{feature.label}</div>
                  {comparisonProducts.map(product => (
                    <div key={`${product.id}-${feature.key}`} className="product-column">
                      <span className="feature-value">
                        {getFeatureValue(product, feature.key)}
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              <div className="comparison-row actions-row">
                <div className="feature-column">Actions</div>
                {comparisonProducts.map(product => (
                  <div key={`${product.id}-actions`} className="product-column">
                    <div className="product-actions">
                      <button 
                        className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                        onClick={() => handleAddToWishlist(product)}
                      >
                        {isInWishlist(product.id) ? '❤️' : '🤍'} Wishlist
                      </button>
                      <button className="add-to-cart-btn">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
