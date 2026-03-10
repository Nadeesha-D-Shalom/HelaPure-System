import React from 'react';

const DeliveryDashboardExample = () => {
  return (
    <div className="delivery-dashboard">
      {/* Header */}
      <div className="delivery-header">
        <div className="delivery-header-content">
          <div>
            <h1 className="delivery-title">Delivery Dashboard</h1>
            <p className="delivery-subtitle">Manage your delivery assignments and track progress</p>
          </div>
          <div className="delivery-earnings">
            <p className="text-sm opacity-90 mb-1">Today's Earnings</p>
            <p className="text-3xl font-bold">$125.50</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="delivery-main-content">
        {/* Stats Cards */}
        <div className="delivery-stats-grid">
          <div className="delivery-stat-card">
            <div className="delivery-stat-icon assigned">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <div>
              <p className="delivery-stat-number">12</p>
              <p className="delivery-stat-label">Assigned</p>
            </div>
          </div>

          <div className="delivery-stat-card">
            <div className="delivery-stat-icon in-transit">
              <i className="fas fa-truck"></i>
            </div>
            <div>
              <p className="delivery-stat-number">5</p>
              <p className="delivery-stat-label">In Transit</p>
            </div>
          </div>

          <div className="delivery-stat-card">
            <div className="delivery-stat-icon completed">
              <i className="fas fa-check-circle"></i>
            </div>
            <div>
              <p className="delivery-stat-number">8</p>
              <p className="delivery-stat-label">Completed Today</p>
            </div>
          </div>

          <div className="delivery-stat-card">
            <div className="delivery-stat-icon earnings">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div>
              <p className="delivery-stat-number">156</p>
              <p className="delivery-stat-label">Total Completed</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="delivery-tabs">
          <button className="delivery-tab active">
            <span className="delivery-tab-icon">
              <i className="fas fa-clipboard-list"></i>
            </span>
            Assigned
            <span className="delivery-tab-badge">12</span>
          </button>
          
          <button className="delivery-tab">
            <span className="delivery-tab-icon">
              <i className="fas fa-truck"></i>
            </span>
            In Transit
            <span className="delivery-tab-badge">5</span>
          </button>
          
          <button className="delivery-tab">
            <span className="delivery-tab-icon">
              <i className="fas fa-check-circle"></i>
            </span>
            Completed
            <span className="delivery-tab-badge">8</span>
          </button>
          
          <button className="delivery-tab">
            <span className="delivery-tab-icon">
              <i className="fas fa-chart-bar"></i>
            </span>
            History
          </button>
        </div>

        {/* Content */}
        <div className="delivery-content">
          <div className="delivery-content-header">
            <h2 className="delivery-content-title">
              <i className="fas fa-clipboard-list"></i>
              Assigned Deliveries
            </h2>
            <p className="delivery-content-subtitle">
              Deliveries waiting to be started
            </p>
          </div>
          
          <div style={{ padding: '2rem' }}>
            {/* Sample Delivery Item */}
            <div style={{ 
              border: '1px solid #E2E8F0', 
              borderRadius: '0.75rem', 
              padding: '1.5rem', 
              marginBottom: '1rem',
              background: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>DEL-001</h3>
                  <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>Order: ORD-001</p>
                </div>
                <span className="delivery-status-badge assigned">
                  <i className="fas fa-clock"></i>
                  ASSIGNED
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Customer:</strong> John Doe
                  </p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Phone:</strong> +94 77 123 4567
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Amount:</strong> $65.00
                  </p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                    <strong>Est. Delivery:</strong> 2024-01-21
                  </p>
                </div>
              </div>
              
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#4B5563' }}>
                <strong>Address:</strong> 123 Main St, Colombo 03, Sri Lanka
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="delivery-btn delivery-btn-primary delivery-btn-sm">
                  <i className="fas fa-play"></i>
                  Start Delivery
                </button>
                <button className="delivery-btn delivery-btn-outline delivery-btn-sm">
                  <i className="fas fa-eye"></i>
                  View Details
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
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '90%',
          maxWidth: '600px',
          zIndex: 1000,
          display: 'none' // Hidden by default, would be shown with state
        }}>
          <div className="delivery-modal-header">
            <h3 className="delivery-modal-title">
              <i className="fas fa-info-circle"></i>
              Delivery Details - DEL-001
            </h3>
          </div>
          
          <div className="delivery-modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
                  <i className="fas fa-info-circle" style={{ marginRight: '0.5rem', color: '#2E8B57' }}></i>
                  Order Information
                </h4>
                <div style={{ fontSize: '0.875rem', color: '#4B5563' }}>
                  <p style={{ margin: '0.25rem 0' }}><strong>Order ID:</strong> ORD-001</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Customer:</strong> John Doe</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Phone:</strong> +94 77 123 4567</p>
                  <p style={{ margin: '0.25rem 0' }}><strong>Total Amount:</strong> $65.00</p>
                </div>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '0.5rem', color: '#2E8B57' }}></i>
                  Delivery Address
                </h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
                  123 Main St, Colombo 03, Sri Lanka
                </p>
                <div className="delivery-special-instructions">
                  <p>
                    <span className="delivery-special-label">Special Instructions:</span>
                    Please call before delivery
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
                <i className="fas fa-box" style={{ marginRight: '0.5rem', color: '#2E8B57' }}></i>
                Items to Deliver
              </h4>
              <div className="delivery-items-list">
                <div className="delivery-item">
                  <span className="delivery-item-name">2x Organic Honey</span>
                  <span className="delivery-item-price">$50.00</span>
                </div>
                <div className="delivery-item">
                  <span className="delivery-item-name">1x Natural Coconut Oil</span>
                  <span className="delivery-item-price">$15.00</span>
                </div>
              </div>
            </div>

            <div className="delivery-form-group">
              <label className="delivery-form-label">Delivery Notes</label>
              <textarea
                className="delivery-form-textarea"
                rows="3"
                placeholder="Add any notes about the delivery..."
              />
            </div>
          </div>
          
          <div className="delivery-modal-footer">
            <button className="delivery-btn delivery-btn-outline">
              <i className="fas fa-times"></i>
              Close
            </button>
            <button className="delivery-btn delivery-btn-success">
              <i className="fas fa-check"></i>
              Mark as Delivered
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboardExample;
