import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Returns.css';

const Returns = () => {
  const [activeTab, setActiveTab] = useState('my-returns');
  const [returns, setReturns] = useState([
    {
      id: 'RET-001',
      orderId: 'ORD-001',
      productName: 'Organic Honey',
      productImage: '/api/placeholder/80/80',
      reason: 'Product damaged during shipping',
      status: 'pending',
      requestDate: '2024-01-15',
      expectedRefund: 25.00
    },
    {
      id: 'RET-002',
      orderId: 'ORD-002',
      productName: 'Natural Coconut Oil',
      productImage: '/api/placeholder/80/80',
      reason: 'Wrong product received',
      status: 'approved',
      requestDate: '2024-01-10',
      expectedRefund: 15.00
    }
  ]);

  const tabs = [
    { id: 'my-returns', label: 'My Returns', icon: 'fas fa-undo' },
    { id: 'my-cancellations', label: 'My Cancellations', icon: 'fas fa-times-circle' },
    { id: 'new-return', label: 'New Return', icon: 'fas fa-plus' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'pending', icon: 'fas fa-clock', text: 'Pending' },
      approved: { class: 'approved', icon: 'fas fa-check', text: 'Approved' },
      rejected: { class: 'rejected', icon: 'fas fa-times', text: 'Rejected' },
      completed: { class: 'completed', icon: 'fas fa-check-circle', text: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`status-badge ${config.class}`}>
        <i className={config.icon}></i>
        {config.text}
      </span>
    );
  };

  return (
    <div className="returns-page">
      <Header />
      
      <div className="returns-container">
        <div className="returns-header">
          <h1 className="returns-title">
            <i className="fas fa-undo"></i>
            My Returns & Cancellations
          </h1>
          <p className="returns-subtitle">Track your return requests and cancellations</p>
        </div>

        <div className="returns-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`returns-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="returns-content">
          {activeTab === 'my-returns' && (
            <div className="returns-list">
              {returns.length === 0 ? (
                <div className="returns-empty">
                  <i className="fas fa-undo"></i>
                  <h3>No returns yet</h3>
                  <p>Your return requests will appear here</p>
                </div>
              ) : (
                returns.map(returnItem => (
                  <div key={returnItem.id} className="return-card">
                    <div className="return-header">
                      <div className="return-id">
                        <h4>Return #{returnItem.id}</h4>
                        <span className="order-ref">Order: {returnItem.orderId}</span>
                      </div>
                      {getStatusBadge(returnItem.status)}
                    </div>
                    
                    <div className="return-product">
                      <img src={returnItem.productImage} alt={returnItem.productName} />
                      <div className="product-details">
                        <h5>{returnItem.productName}</h5>
                        <p className="return-reason">{returnItem.reason}</p>
                      </div>
                      <div className="refund-amount">
                        <span className="amount">${returnItem.expectedRefund.toFixed(2)}</span>
                        <span className="label">Expected Refund</span>
                      </div>
                    </div>
                    
                    <div className="return-footer">
                      <div className="return-date">
                        <i className="fas fa-calendar"></i>
                        Requested: {returnItem.requestDate}
                      </div>
                      <div className="return-actions">
                        <button className="view-btn">
                          <i className="fas fa-eye"></i>
                          View Details
                        </button>
                        {returnItem.status === 'pending' && (
                          <button className="cancel-btn">
                            <i className="fas fa-times"></i>
                            Cancel Return
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'my-cancellations' && (
            <div className="returns-empty">
              <i className="fas fa-times-circle"></i>
              <h3>No cancellations yet</h3>
              <p>Your cancellation requests will appear here</p>
            </div>
          )}

          {activeTab === 'new-return' && (
            <div className="new-return-form">
              <h3>Request a Return</h3>
              <p>Select an order to return items from</p>
              <div className="order-selection">
                <div className="order-card">
                  <img src="/api/placeholder/60/60" alt="Product" />
                  <div className="order-info">
                    <h5>Order #ORD-003</h5>
                    <p>Organic Turmeric - $20.00</p>
                    <span className="order-date">Ordered: 2024-01-20</span>
                  </div>
                  <button className="select-order-btn">
                    <i className="fas fa-arrow-right"></i>
                    Select
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Returns;
