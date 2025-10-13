import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('helapure_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        // Clear corrupted data and start with empty cart
        localStorage.removeItem('helapure_cart');
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('helapure_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    console.log('CartContext: addToCart called with:', product, quantity);
    
    if (!product) {
      console.error('CartContext: Product is null or undefined');
      return;
    }
    
    setCartItems(prev => {
      console.log('CartContext: Current cart items:', prev);
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        console.log('CartContext: Updating existing item');
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        console.log('CartContext: Adding new item');
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0] || 'https://via.placeholder.com/100',
          quantity: quantity,
          originalPrice: product.originalPrice,
          discount: product.discount,
          category: product.category,
          inStock: product.inStock,
          stockCount: product.stockCount
        };
        console.log('CartContext: New item:', newItem);
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemCount = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getCartSummary = () => {
    return {
      totalItems: getTotalItems(),
      totalPrice: getTotalPrice(),
      items: cartItems
    };
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getItemCount,
    isInCart,
    getCartSummary
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
