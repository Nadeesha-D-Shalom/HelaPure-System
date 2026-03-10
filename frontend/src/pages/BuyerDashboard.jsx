import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useOrders } from '../context/OrderContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import DataTable from '../components/DataTable';
import { dummyProducts } from '../data/products';
import '../styles/BuyerDashboard.css';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState('overview');
  const [recentProducts, setRecentProducts] = useState([]);

  // Use shared product data for demonstration
  useEffect(() => {
    setRecentProducts(dummyProducts.slice(0, 4));
  }, []);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'delivered').length,
    totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    cartItems: cartItems.length,
    wishlistItems: wishlistItems.length
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-bar' },
    { id: 'orders', label: 'My Orders', icon: 'fas fa-shopping-bag' },
    { id: 'wishlist', label: 'Wishlist', icon: 'fas fa-heart' },
    { id: 'cart', label: 'Shopping Cart', icon: 'fas fa-shopping-cart' },
    { id: 'recommendations', label: 'Recommendations', icon: 'fas fa-star' }
  ];

  const orderColumns = [
    { key: 'id', label: 'Order ID', sortable: true },
    { key: 'orderDate', label: 'Date', render: (value) => new Date(value).toLocaleDateString() },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`buyer-status-badge ${value}`}>
        <i className={`fas ${value === 'delivered' ? 'fa-check-circle' : value === 'shipped' ? 'fa-truck' : 'fa-clock'}`}></i>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'totalAmount', label: 'Total', render: (value) => `$${value.toFixed(2)}` },
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="buyer-table-actions-cell">
        <button className="buyer-table-btn primary">
          <i className="fas fa-eye"></i> View
        </button>
        {item.status === 'delivered' && (
          <button className="buyer-table-btn success">
            <i className="fas fa-redo"></i> Reorder
          </button>
        )}
      </div>
    )}
  ];

  const wishlistColumns = [
    { key: 'name', label: 'Product', sortable: true },
    { key: 'price', label: 'Price', render: (value) => `$${value.toFixed(2)}`, sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'rating', label: 'Rating', render: (value) => (
      <div className="buyer-rating">
        {[...Array(5)].map((_, i) => (
          <i key={i} className={`fas fa-star ${i < Math.floor(value) ? 'filled' : ''}`}></i>
        ))}
        <span>({value})</span>
      </div>
    )},
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="buyer-table-actions-cell">
        <button className="buyer-table-btn primary">
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button className="buyer-table-btn danger">
          <i className="fas fa-trash"></i> Remove
        </button>
      </div>
    )}
  ];

  const cartColumns = [
    { key: 'name', label: 'Product', sortable: true },
    { key: 'price', label: 'Price', render: (value) => `Rs. ${value.toFixed(2)}`, sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'total', label: 'Total', render: (value, item) => `Rs. ${(item.price * item.quantity).toFixed(2)}`, sortable: true },
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="buyer-table-actions-cell">
        <button className="buyer-table-btn warning">
          <i className="fas fa-edit"></i> Update
        </button>
        <button className="buyer-table-btn danger">
          <i className="fas fa-trash"></i> Remove
        </button>
      </div>
    )}
  ];

  return (
    <div className="buyer-dashboard">
      <Header />
      
      <div className="buyer-container">
        <div className="buyer-header">
          <div className="buyer-header-content">
            <div>
              <h1 className="buyer-title">
                <i className="fas fa-user"></i>
                Welcome back, {user?.name || 'Customer'}!
              </h1>
              <p className="buyer-subtitle">Manage your orders, wishlist, and shopping experience</p>
            </div>
            <div className="buyer-quick-actions">
              <button className="buyer-btn buyer-btn-primary">
                <i className="fas fa-shopping-bag"></i>
                Continue Shopping
              </button>
              <button className="buyer-btn buyer-btn-outline">
                <i className="fas fa-bell"></i>
                Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="buyer-stats-grid">
          <div className="buyer-stat-card">
            <div className="buyer-stat-icon orders">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <div>
              <p className="buyer-stat-number">{stats.totalOrders}</p>
              <p className="buyer-stat-label">Total Orders</p>
            </div>
          </div>

          <div className="buyer-stat-card">
            <div className="buyer-stat-icon pending">
              <i className="fas fa-clock"></i>
            </div>
            <div>
              <p className="buyer-stat-number">{stats.pendingOrders}</p>
              <p className="buyer-stat-label">Pending Orders</p>
            </div>
          </div>

          <div className="buyer-stat-card">
            <div className="buyer-stat-icon completed">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <p className="buyer-stat-number">{stats.completedOrders}</p>
              <p className="buyer-stat-label">Completed</p>
            </div>
          </div>

          <div className="buyer-stat-card">
            <div className="buyer-stat-card">
              <div className="buyer-stat-icon spent">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div>
                <p className="buyer-stat-number">${stats.totalSpent.toFixed(2)}</p>
                <p className="buyer-stat-label">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="buyer-stat-card">
            <div className="buyer-stat-icon cart">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div>
              <p className="buyer-stat-number">{stats.cartItems}</p>
              <p className="buyer-stat-label">Cart Items</p>
            </div>
          </div>

          <div className="buyer-stat-card">
            <div className="buyer-stat-icon wishlist">
              <i className="fas fa-heart"></i>
            </div>
            <div>
              <p className="buyer-stat-number">{stats.wishlistItems}</p>
              <p className="buyer-stat-label">Wishlist Items</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="buyer-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`buyer-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="buyer-tab-icon">
                <i className={tab.icon}></i>
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="buyer-content">
          {activeTab === 'overview' && (
            <div className="buyer-overview">
              <div className="buyer-content-header">
                <h2 className="buyer-content-title">
                  <i className="fas fa-chart-bar"></i>
                  Dashboard Overview
                </h2>
                <p className="buyer-content-subtitle">Your shopping activity and recent orders</p>
              </div>

              <div className="buyer-overview-grid">
                <div className="buyer-recent-orders">
                  <h3>Recent Orders</h3>
                  {orders.slice(0, 3).map(order => (
                    <div key={order.id} className="buyer-order-item">
                      <div className="buyer-order-info">
                        <span className="buyer-order-id">{order.id}</span>
                        <span className="buyer-order-date">{new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="buyer-order-status">
                        <span className={`buyer-status-badge ${order.status}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <span className="buyer-order-amount">${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="buyer-recommendations">
                  <h3>Recommended for You</h3>
                  <div className="buyer-product-grid">
                    {recentProducts.slice(0, 2).map(product => (
                      <div key={product.id} className="buyer-product-card">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p className="buyer-product-price">Rs. {product.price.toFixed(2)}</p>
                        <div className="buyer-product-rating">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}></i>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="buyer-content">
              <div className="buyer-content-header">
                <h2 className="buyer-content-title">
                  <i className="fas fa-shopping-bag"></i>
                  My Orders
                </h2>
                <p className="buyer-content-subtitle">Track and manage your orders</p>
              </div>
              <div className="buyer-table-container">
                <div className="buyer-table-header">
                  <h3 className="buyer-table-title">
                    <i className="fas fa-shopping-bag"></i>
                    Order History
                  </h3>
                  <p className="buyer-table-subtitle">View and track all your orders</p>
                </div>
                <div className="buyer-table-actions">
                  <div className="buyer-table-search">
                    <input type="text" placeholder="Search orders..." />
                  </div>
                  <div className="buyer-table-filters">
                    <button className="buyer-table-filter-btn">
                      <i className="fas fa-filter"></i>
                      Filter
                    </button>
                  </div>
                </div>
                <DataTable
                  data={orders}
                  columns={orderColumns}
                  searchable={true}
                  sortable={true}
                  pagination={true}
                  pageSize={10}
                />
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="buyer-content">
              <div className="buyer-content-header">
                <h2 className="buyer-content-title">
                  <i className="fas fa-heart"></i>
                  My Wishlist
                </h2>
                <p className="buyer-content-subtitle">Products you've saved for later</p>
              </div>
              <div className="buyer-table-container">
                <div className="buyer-table-header">
                  <h3 className="buyer-table-title">
                    <i className="fas fa-heart"></i>
                    Wishlist Items
                  </h3>
                  <p className="buyer-table-subtitle">Manage your saved products</p>
                </div>
                <DataTable
                  data={wishlistItems}
                  columns={wishlistColumns}
                  searchable={true}
                  sortable={true}
                  pagination={true}
                  pageSize={10}
                />
              </div>
            </div>
          )}

          {activeTab === 'cart' && (
            <div className="buyer-content">
              <div className="buyer-content-header">
                <h2 className="buyer-content-title">
                  <i className="fas fa-shopping-cart"></i>
                  Shopping Cart
                </h2>
                <p className="buyer-content-subtitle">Review and manage your cart items</p>
              </div>
              <div className="buyer-table-container">
                <div className="buyer-table-header">
                  <h3 className="buyer-table-title">
                    <i className="fas fa-shopping-cart"></i>
                    Cart Items
                  </h3>
                  <p className="buyer-table-subtitle">Ready to checkout?</p>
                </div>
                <DataTable
                  data={cartItems}
                  columns={cartColumns}
                  searchable={true}
                  sortable={true}
                  pagination={true}
                  pageSize={10}
                />
                <div className="buyer-cart-summary">
                  <div className="buyer-cart-total">
                    <h3>Cart Total: Rs. {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</h3>
                    <button className="buyer-btn buyer-btn-primary buyer-btn-lg">
                      <i className="fas fa-credit-card"></i>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="buyer-content">
              <div className="buyer-content-header">
                <h2 className="buyer-content-title">
                  <i className="fas fa-star"></i>
                  Recommendations
                </h2>
                <p className="buyer-content-subtitle">Discover products you might like</p>
              </div>
              <div className="buyer-recommendations-grid">
                {recentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;