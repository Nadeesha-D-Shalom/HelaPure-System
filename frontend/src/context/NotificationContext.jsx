import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('helapure_notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        setUnreadCount(parsed.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error parsing saved notifications:', error);
        // Clear corrupted data and start with empty notifications
        localStorage.removeItem('helapure_notifications');
        setNotifications([]);
        setUnreadCount(0);
      }
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('helapure_notifications', JSON.stringify(notifications));
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]); // Keep only last 50 notifications
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Notification types and their default settings
  const notificationTypes = {
    order: {
      icon: '📦',
      color: '#3b82f6',
      sound: 'order'
    },
    payment: {
      icon: '💳',
      color: '#10b981',
      sound: 'payment'
    },
    promotion: {
      icon: '🎉',
      color: '#f59e0b',
      sound: 'promotion'
    },
    system: {
      icon: '⚙️',
      color: '#6b7280',
      sound: 'system'
    },
    security: {
      icon: '🔒',
      color: '#ef4444',
      sound: 'security'
    },
    wishlist: {
      icon: '❤️',
      color: '#ec4899',
      sound: 'wishlist'
    }
  };

  const createNotification = (type, title, message, data = {}) => {
    const notificationType = notificationTypes[type] || notificationTypes.system;
    
    addNotification({
      type,
      title,
      message,
      icon: notificationType.icon,
      color: notificationType.color,
      data
    });
  };

  // Helper functions for common notifications
  const notifyOrderPlaced = (orderId, total) => {
    createNotification(
      'order',
      'Order Placed Successfully!',
      `Your order #${orderId} has been placed. Total: $${total}`,
      { orderId, total }
    );
  };

  const notifyOrderStatusUpdate = (orderId, status) => {
    createNotification(
      'order',
      'Order Status Updated',
      `Your order #${orderId} is now ${status}`,
      { orderId, status }
    );
  };

  const notifyPaymentSuccess = (amount, method) => {
    createNotification(
      'payment',
      'Payment Successful!',
      `Payment of $${amount} via ${method} was successful`,
      { amount, method }
    );
  };

  const notifyPriceDrop = (productName, oldPrice, newPrice) => {
    createNotification(
      'wishlist',
      'Price Drop Alert!',
      `${productName} price dropped from Rs. ${oldPrice} to Rs. ${newPrice}`,
      { productName, oldPrice, newPrice }
    );
  };

  const notifyPromotion = (title, message) => {
    createNotification(
      'promotion',
      title,
      message,
      { isPromotion: true }
    );
  };

  const notifySecurity = (title, message) => {
    createNotification(
      'security',
      title,
      message,
      { isSecurity: true }
    );
  };

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    createNotification,
    notifyOrderPlaced,
    notifyOrderStatusUpdate,
    notifyPaymentSuccess,
    notifyPriceDrop,
    notifyPromotion,
    notifySecurity
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
