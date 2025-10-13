import React, { createContext, useContext, useState, useEffect } from 'react';
import { dummyProducts } from '../data/products';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('helapure_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    } else {
      // Add some sample data for demonstration using shared product data
      const sampleWishlist = dummyProducts.slice(0, 5).map(product => ({
        ...product,
        addedAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString()
      }));
      setWishlist(sampleWishlist);
    }

    const savedRecentlyViewed = localStorage.getItem('helapure_recently_viewed');
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('helapure_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save recently viewed to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('helapure_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (!exists) {
        return [...prev, { ...product, addedAt: new Date().toISOString() }];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      const updated = [{ ...product, viewedAt: new Date().toISOString() }, ...filtered];
      return updated.slice(0, 10); // Keep only last 10 viewed products
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const value = {
    wishlist,
    recentlyViewed,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    addToRecentlyViewed,
    clearRecentlyViewed,
    wishlistCount: wishlist.length
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
