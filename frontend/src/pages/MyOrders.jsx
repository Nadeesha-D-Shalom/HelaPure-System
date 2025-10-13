import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderTracker from '../components/OrderTracker';
import { useOrders } from '../context/OrderContext';
import '../styles/MyOrders.css';

const MyOrders = () => {
  const navigate = useNavigate();
  const { orders, loading, refreshOrders } = useOrders();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Add some mock orders for demonstration if no orders exist
  useEffect(() => {
    if (orders.length === 0) {
      const mockOrders = [
        {
          id: 'ORD-001',
          orderDate: new Date('2024-01-15'),
          status: 'delivered',
          totalAmount: 65.00,
          shippingAddress: '123 Main St, Colombo 03, Sri Lanka',
          estimatedDelivery: new Date('2024-01-20'),
          trackingNumber: 'TRK123456789',
          items: [
            { name: 'Organic Honey', price: 25, quantity: 2 },
            { name: 'Natural Coconut Oil', price: 15, quantity: 1 }
          ]
        },
        {
          id: 'ORD-002',
          orderDate: new Date('2024-01-20'),
          status: 'shipped',
          totalAmount: 45.00,
          shippingAddress: '456 Park Ave, Kandy, Sri Lanka',
          estimatedDelivery: new Date('2024-01-25'),
          trackingNumber: 'TRK987654321',
          items: [
            { name: 'Pure Cinnamon', price: 30, quantity: 1 },
            { name: 'Organic Turmeric', price: 15, quantity: 1 }
          ]
        }
      ];

      // Add mock orders to localStorage if no orders exist
      localStorage.setItem('orders', JSON.stringify(mockOrders));
      refreshOrders();
    }
  }, [orders.length, refreshOrders]);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="my-orders-page">
      <Header />
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">
            <i className="fas fa-shopping-bag"></i>
            My Orders
          </h1>
          <div className="orders-actions">
            <button
              onClick={refreshOrders}
              disabled={loading}
              className="orders-btn orders-btn-secondary"
            >
              <i className="fas fa-sync-alt"></i>
              {loading ? 'Refreshing...' : 'Refresh Orders'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="orders-btn orders-btn-primary"
            >
              <i className="fas fa-shopping-cart"></i>
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="orders-search-filter">
          <div className="orders-search-grid">
            <div className="orders-search-group">
              <label className="orders-search-label">
                Search Orders
              </label>
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="orders-search-input"
              />
            </div>
            <div className="orders-filter-group">
              <label className="orders-filter-label">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="orders-filter-select"
              >
                <option value="all">All Orders ({statusCounts.all})</option>
                <option value="pending">Pending ({statusCounts.pending})</option>
                <option value="confirmed">Confirmed ({statusCounts.confirmed})</option>
                <option value="processing">Processing ({statusCounts.processing})</option>
                <option value="shipped">Shipped ({statusCounts.shipped})</option>
                <option value="delivered">Delivered ({statusCounts.delivered})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <h3 className="orders-empty-title">
              {searchTerm || filterStatus !== 'all' ? 'No orders found' : 'No orders yet'}
            </h3>
            <p className="orders-empty-description">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start shopping to see your orders here!'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => navigate('/')}
                className="orders-empty-action"
              >
                <i className="fas fa-shopping-cart"></i>
                Start Shopping
              </button>
            )}
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <OrderTracker key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
