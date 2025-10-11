import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderTracker from '../components/OrderTracker';
import { useOrders } from '../context/OrderContext';

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
    <>
      <Header />
      <div style={{ padding: '2rem', backgroundColor: 'var(--light-cream)', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--deep-green)', margin: 0 }}>
              My Orders
            </h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={refreshOrders}
                disabled={loading}
                style={{
                  background: 'var(--earthy-tan)',
                  color: 'var(--dark-brown)',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Refreshing...' : 'Refresh Orders'}
              </button>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'var(--deep-green)',
                  color: 'var(--light-cream)',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--earthy-tan)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)', fontWeight: 'bold' }}>
                  Search Orders
                </label>
                <input
                  type="text"
                  placeholder="Search by order ID or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--earthy-tan)',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)', fontWeight: 'bold' }}>
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '0.75rem',
                    border: '1px solid var(--earthy-tan)',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    minWidth: '150px'
                  }}
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
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '8px',
              border: '1px solid var(--earthy-tan)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'var(--deep-green)', marginBottom: '1rem' }}>
                {searchTerm || filterStatus !== 'all' ? 'No orders found' : 'No orders yet'}
              </h3>
              <p style={{ color: 'var(--dark-brown)', marginBottom: '2rem' }}>
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start shopping to see your orders here!'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <button
                  onClick={() => navigate('/')}
                  style={{
                    background: 'var(--deep-green)',
                    color: 'var(--light-cream)',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Start Shopping
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredOrders.map(order => (
                <OrderTracker key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
