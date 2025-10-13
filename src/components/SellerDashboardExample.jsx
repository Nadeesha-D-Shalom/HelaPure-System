import React from 'react';

const SellerDashboardExample = () => {
  return (
    <div className="seller-dashboard">
      {/* Header */}
      <div className="seller-header">
        <div className="seller-header-content">
          <div>
            <h1 className="seller-title">Seller Dashboard</h1>
            <p className="seller-subtitle">Manage your products, orders, and business analytics</p>
          </div>
          <div className="seller-earnings">
            <p className="text-sm opacity-90 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">$12,450.00</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="seller-main-content">
        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button className="seller-btn seller-btn-outline">
            <i className="fas fa-clipboard-list"></i>
            Request New Product
          </button>
          <button className="seller-btn seller-btn-primary">
            <i className="fas fa-plus"></i>
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="seller-stats-grid">
          <div className="seller-stat-card">
            <div className="seller-stat-icon products">
              <i className="fas fa-box"></i>
            </div>
            <div>
              <p className="seller-stat-number">24</p>
              <p className="seller-stat-label">Total Products</p>
            </div>
          </div>

          <div className="seller-stat-card">
            <div className="seller-stat-icon orders">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <p className="seller-stat-number">18</p>
              <p className="seller-stat-label">Active Products</p>
            </div>
          </div>

          <div className="seller-stat-card">
            <div className="seller-stat-icon pending">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div>
              <p className="seller-stat-number">7</p>
              <p className="seller-stat-label">Pending Orders</p>
            </div>
          </div>

          <div className="seller-stat-card">
            <div className="seller-stat-icon revenue">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div>
              <p className="seller-stat-number">$12,450</p>
              <p className="seller-stat-label">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="seller-tabs">
          <button className="seller-tab active">
            <span className="seller-tab-icon">
              <i className="fas fa-chart-bar"></i>
            </span>
            Overview
          </button>
          
          <button className="seller-tab">
            <span className="seller-tab-icon">
              <i className="fas fa-box"></i>
            </span>
            Products
          </button>
          
          <button className="seller-tab">
            <span className="seller-tab-icon">
              <i className="fas fa-shopping-cart"></i>
            </span>
            Orders
          </button>
          
          <button className="seller-tab">
            <span className="seller-tab-icon">
              <i className="fas fa-clipboard-list"></i>
            </span>
            Requests
          </button>
        </div>

        {/* Content */}
        <div className="seller-content">
          <div className="seller-content-header">
            <h2 className="seller-content-title">
              <i className="fas fa-box"></i>
              Product Management
            </h2>
            <p className="seller-content-subtitle">Manage your product inventory and details</p>
          </div>
          
          <div style={{ padding: '2rem' }}>
            {/* Sample Product Card */}
            <div style={{ 
              border: '1px solid #E2E8F0', 
              borderRadius: '0.75rem', 
              padding: '1.5rem', 
              marginBottom: '1rem',
              background: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>Organic Honey</h3>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>Honey Category</p>
                </div>
                <span className="seller-status-badge active">
                  <i className="fas fa-check-circle"></i>
                  ACTIVE
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Price:</strong> $25.00
                  </p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Stock:</strong> 50 units
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Sales:</strong> 120 units
                  </p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Revenue:</strong> $3,000
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Status:</strong> Active
                  </p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Category:</strong> Honey
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="seller-btn seller-btn-primary seller-btn-sm">
                  <i className="fas fa-edit"></i>
                  Edit
                </button>
                <button className="seller-btn seller-btn-outline seller-btn-sm">
                  <i className="fas fa-eye"></i>
                  View
                </button>
                <button className="seller-btn seller-btn-danger seller-btn-sm">
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Modal */}
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'white',
          borderRadius: '1rem',
          box-shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '90%',
          maxWidth: '500px',
          zIndex: 1000,
          display: 'none' // Hidden by default, would be shown with state
        }}>
          <div className="seller-modal-header">
            <h3 className="seller-modal-title">
              <i className="fas fa-plus"></i>
              Add New Product
            </h3>
          </div>
          
          <div className="seller-modal-body">
            <div className="seller-form-group">
              <label className="seller-form-label">Product Name</label>
              <input
                type="text"
                className="seller-form-input"
                placeholder="Enter product name"
              />
            </div>

            <div className="seller-form-group">
              <label className="seller-form-label">Category</label>
              <select className="seller-form-select">
                <option value="">Select category</option>
                <option value="honey">Honey</option>
                <option value="oils">Oils</option>
                <option value="spices">Spices</option>
              </select>
            </div>

            <div className="seller-form-group">
              <label className="seller-form-label">Price</label>
              <input
                type="number"
                className="seller-form-input"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div className="seller-form-group">
              <label className="seller-form-label">Stock Quantity</label>
              <input
                type="number"
                className="seller-form-input"
                placeholder="0"
              />
            </div>

            <div className="seller-form-group">
              <label className="seller-form-label">Description</label>
              <textarea
                className="seller-form-textarea"
                placeholder="Enter product description"
                rows="3"
              />
            </div>
          </div>
          
          <div className="seller-modal-footer">
            <button className="seller-btn seller-btn-outline">
              <i className="fas fa-times"></i>
              Cancel
            </button>
            <button className="seller-btn seller-btn-primary">
              <i className="fas fa-plus"></i>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardExample;
