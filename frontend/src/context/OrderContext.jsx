import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load orders from localStorage
  const loadOrders = () => {
    setLoading(true);
    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Convert date strings back to Date objects
      const processedOrders = savedOrders.map(order => ({
        ...order,
        orderDate: new Date(order.orderDate),
        estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : null
      }));

      setOrders(processedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new order
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      orderDate: new Date(),
      estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : null
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return newOrder;
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status: newStatus };
        
        // Generate tracking number when order is confirmed
        if (newStatus === 'confirmed' && !order.trackingNumber) {
          updatedOrder.trackingNumber = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
        }
        
        return updatedOrder;
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Get order by ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  // Get orders by status
  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  // Refresh orders
  const refreshOrders = () => {
    loadOrders();
  };

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  const value = {
    orders,
    loading,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByStatus,
    refreshOrders,
    loadOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;

