import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdvancedButton from '../components/AdvancedButton';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';
import UserManagement from '../components/UserManagement';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        sellerName: 'John Smith',
        sellerEmail: 'john@example.com',
        productName: 'Organic Turmeric Powder',
        category: 'Spices',
        description: 'High-quality organic turmeric powder from local farms',
        status: 'pending',
        submittedDate: '2024-01-20',
        adminNotes: '',
        rejectionReason: ''
      },
      {
        id: 2,
        sellerName: 'Sarah Johnson',
        sellerEmail: 'sarah@example.com',
        productName: 'Pure Vanilla Extract',
        category: 'Extracts',
        description: 'Natural vanilla extract from Madagascar beans',
        status: 'approved',
        submittedDate: '2024-01-18',
        adminNotes: 'Approved for listing - high quality product',
        rejectionReason: ''
      },
      {
        id: 3,
        sellerName: 'Mike Wilson',
        sellerEmail: 'mike@example.com',
        productName: 'Raw Honey',
        category: 'Honey',
        description: 'Raw unfiltered honey from local beekeepers',
        status: 'rejected',
        submittedDate: '2024-01-15',
        adminNotes: 'Rejected due to quality concerns',
        rejectionReason: 'Product does not meet quality standards'
      }
    ];

    const mockSellers = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+94 77 123 4567',
        status: 'active',
        joinDate: '2024-01-01',
        totalProducts: 15,
        totalSales: 1250.00,
        rating: 4.8
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+94 77 234 5678',
        status: 'active',
        joinDate: '2023-12-15',
        totalProducts: 8,
        totalSales: 890.00,
        rating: 4.9
      },
      {
        id: 3,
        name: 'Mike Wilson',
        email: 'mike@example.com',
        phone: '+94 77 345 6789',
        status: 'suspended',
        joinDate: '2023-11-20',
        totalProducts: 5,
        totalSales: 320.00,
        rating: 3.2
      }
    ];

    const mockOrders = [
      {
        id: 'ORD-001',
        customer: 'Alice Brown',
        seller: 'John Smith',
        product: 'Organic Honey',
        quantity: 2,
        total: 50.00,
        status: 'delivered',
        date: '2024-01-20',
        commission: 5.00
      },
      {
        id: 'ORD-002',
        customer: 'Bob Green',
        seller: 'Sarah Johnson',
        product: 'Coconut Oil',
        quantity: 1,
        total: 15.00,
        status: 'shipped',
        date: '2024-01-19',
        commission: 1.50
      }
    ];

    setRequests(mockRequests);
    setSellers(mockSellers);
    setOrders(mockOrders);
  }, []);

  const handleApproveRequest = (requestId, adminNotes) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved', adminNotes, rejectionReason: '' }
        : req
    ));
    setShowRequestModal(false);
  };

  const handleRejectRequest = (requestId, rejectionReason) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected', rejectionReason, adminNotes: '' }
        : req
    ));
    setShowRequestModal(false);
  };

  const updateSellerStatus = (sellerId, newStatus) => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId ? { ...seller, status: newStatus } : seller
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const requestColumns = [
    { key: 'id', label: 'ID' },
    { key: 'sellerName', label: 'Seller', searchable: true },
    { key: 'productName', label: 'Product', searchable: true },
    { key: 'category', label: 'Category', searchable: true },
    { key: 'description', label: 'Description', searchable: true },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`admin-status-badge ${value}`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'submittedDate', label: 'Submitted' },
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="flex space-x-2">
        <button
          className="admin-btn admin-btn-outline admin-focus-ring"
          onClick={() => {
            setSelectedRequest(item);
            setShowRequestModal(true);
          }}
        >
          Review
        </button>
        {item.status === 'pending' && (
          <>
            <button
              className="admin-btn admin-btn-success admin-focus-ring"
              onClick={() => handleApproveRequest(item.id, 'Approved by admin')}
            >
              Approve
            </button>
            <button
              className="admin-btn admin-btn-danger admin-focus-ring"
              onClick={() => handleRejectRequest(item.id, 'Does not meet requirements')}
            >
              Reject
            </button>
          </>
        )}
      </div>
    )}
  ];

  const sellerColumns = [
    { key: 'name', label: 'Name', searchable: true },
    { key: 'email', label: 'Email', searchable: true },
    { key: 'phone', label: 'Phone', searchable: true },
    { key: 'status', label: 'Status', render: (value, item) => (
      <select
        value={value}
        onChange={(e) => updateSellerStatus(item.id, e.target.value)}
        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(value)}`}
      >
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="inactive">Inactive</option>
      </select>
    )},
    { key: 'joinDate', label: 'Join Date' },
    { key: 'totalProducts', label: 'Products' },
    { key: 'totalSales', label: 'Sales', render: (value) => `$${value.toFixed(2)}` },
    { key: 'rating', label: 'Rating', render: (value) => (
      <div className="flex items-center">
        <span className="text-yellow-500">★</span>
        <span className="ml-1">{value}</span>
      </div>
    )}
  ];

  const orderColumns = [
    { key: 'id', label: 'Order ID', searchable: true },
    { key: 'customer', label: 'Customer', searchable: true },
    { key: 'seller', label: 'Seller', searchable: true },
    { key: 'product', label: 'Product', searchable: true },
    { key: 'quantity', label: 'Qty' },
    { key: 'total', label: 'Total', render: (value) => `$${value.toFixed(2)}` },
    { key: 'commission', label: 'Commission', render: (value) => `$${value.toFixed(2)}` },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`admin-status-badge ${value}`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'date', label: 'Date' }
  ];

  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    approvedRequests: requests.filter(r => r.status === 'approved').length,
    totalSellers: sellers.length,
    activeSellers: sellers.filter(s => s.status === 'active').length,
    totalOrders: orders.length,
    totalCommission: orders.reduce((sum, o) => sum + o.commission, 0)
  };

  const tabs = [
    { id: 'requests', label: 'Product Requests', icon: 'fas fa-clipboard-list', count: stats.pendingRequests },
    { id: 'sellers', label: 'Sellers', icon: 'fas fa-users', count: stats.totalSellers },
    { id: 'users', label: 'User Management', icon: 'fas fa-user-cog', count: 0 },
    { id: 'orders', label: 'Orders', icon: 'fas fa-shopping-cart', count: stats.totalOrders },
    { id: 'analytics', label: 'Analytics', icon: 'fas fa-chart-bar', count: 0 }
  ];

  return (
    <>
      <Header />
      <div className="admin-dashboard">
          {/* Header */}
        <div className="admin-header">
          <div className="admin-header-content">
            <div>
              <h1 className="admin-title">Admin Dashboard</h1>
              <p className="admin-subtitle">Manage sellers, approve requests, and monitor platform activity</p>
            </div>
            <div className="admin-commission">
              <p className="text-sm opacity-90 mb-1">Total Commission Earned</p>
              <p className="text-3xl font-bold">${stats.totalCommission.toFixed(2)}</p>
            </div>
            </div>
          </div>

        {/* Main Content */}
        <div className="admin-main-content">

          {/* Stats Cards */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon pending">
                <i className="fas fa-clock"></i>
                </div>
              <div>
                <p className="admin-stat-number">{stats.pendingRequests}</p>
                <p className="admin-stat-label">Pending Requests</p>
              </div>
            </div>

            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon approved">
                <i className="fas fa-check-circle"></i>
                </div>
              <div>
                <p className="admin-stat-number">{stats.approvedRequests}</p>
                <p className="admin-stat-label">Approved Requests</p>
              </div>
            </div>

            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon sellers">
                <i className="fas fa-users"></i>
                </div>
              <div>
                <p className="admin-stat-number">{stats.activeSellers}</p>
                <p className="admin-stat-label">Active Sellers</p>
              </div>
            </div>

            <div className="admin-stat-card admin-hover-lift">
              <div className="admin-stat-icon orders">
                <i className="fas fa-shopping-cart"></i>
                </div>
              <div>
                <p className="admin-stat-number">{stats.totalOrders}</p>
                <p className="admin-stat-label">Total Orders</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="admin-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="admin-tab-icon">
                  <i className={tab.icon}></i>
                </span>
                {tab.label}
                {tab.count > 0 && (
                  <span className="admin-tab-badge">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="admin-content admin-hover-lift">
            <div className="admin-content-header">
              <h2 className="admin-content-title">
                {activeTab === 'requests' && 'Product Approval Requests'}
                {activeTab === 'sellers' && 'Seller Management'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'orders' && 'Order Management'}
                {activeTab === 'analytics' && 'Platform Analytics'}
              </h2>
              <p className="admin-content-subtitle">
                {activeTab === 'requests' && 'Review and approve product listing requests'}
                {activeTab === 'sellers' && 'Manage seller accounts and status'}
                {activeTab === 'users' && 'Manage user accounts and permissions'}
                {activeTab === 'orders' && 'Monitor all platform orders and commissions'}
                {activeTab === 'analytics' && 'View platform performance metrics'}
              </p>
            </div>
            
            {activeTab === 'analytics' ? (
              <div className="admin-analytics-grid">
                <div className="admin-analytics-card revenue admin-hover-lift">
                  <h3 className="admin-analytics-title">Revenue Overview</h3>
                  <p className="admin-analytics-value">${stats.totalCommission.toFixed(2)}</p>
                  <p className="admin-analytics-label">Total Commission</p>
                  </div>
                <div className="admin-analytics-card growth admin-hover-lift">
                  <h3 className="admin-analytics-title">Platform Growth</h3>
                  <p className="admin-analytics-value">{stats.activeSellers}</p>
                  <p className="admin-analytics-label">Active Sellers</p>
                  </div>
                <div className="admin-analytics-card orders admin-hover-lift">
                  <h3 className="admin-analytics-title">Order Volume</h3>
                  <p className="admin-analytics-value">{stats.totalOrders}</p>
                  <p className="admin-analytics-label">Total Orders</p>
                </div>
              </div>
            ) : activeTab === 'users' ? (
              <div className="p-6">
                <UserManagement />
              </div>
            ) : (
              <div className="admin-table-container">
                <div className="admin-table-header">
                  <h3 className="admin-table-title">
                    {activeTab === 'requests' && (
                      <>
                        <i className="fas fa-clipboard-list"></i>
                        Product Approval Requests
                      </>
                    )}
                    {activeTab === 'sellers' && (
                      <>
                        <i className="fas fa-users"></i>
                        Seller Management
                      </>
                    )}
                    {activeTab === 'orders' && (
                      <>
                        <i className="fas fa-shopping-cart"></i>
                        Order Management
                      </>
                    )}
                  </h3>
                  <p className="admin-table-subtitle">
                    {activeTab === 'requests' && 'Review and manage product listing requests from sellers'}
                    {activeTab === 'sellers' && 'Monitor and manage seller accounts and their performance'}
                    {activeTab === 'orders' && 'Track all orders and commission details across the platform'}
                  </p>
                </div>
                
                <div className="admin-table-actions">
                  <div className="admin-table-search">
                    <input 
                      type="text" 
                      placeholder="Search..." 
                    />
                  </div>
                  <div className="admin-table-filters">
                    <button className="admin-filter-btn active">All</button>
                    <button className="admin-filter-btn">Pending</button>
                    <button className="admin-filter-btn">Approved</button>
                    <button className="admin-filter-btn">Rejected</button>
                  </div>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      {activeTab === 'requests' && requestColumns.map(col => (
                        <th key={col.key} className={col.searchable ? 'sortable' : ''}>
                          {col.label}
                        </th>
                      ))}
                      {activeTab === 'sellers' && sellerColumns.map(col => (
                        <th key={col.key} className={col.searchable ? 'sortable' : ''}>
                          {col.label}
                        </th>
                      ))}
                      {activeTab === 'orders' && orderColumns.map(col => (
                        <th key={col.key} className={col.searchable ? 'sortable' : ''}>
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === 'requests' && requests.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.sellerName}</td>
                        <td>{item.productName}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>
                          <span className={`admin-status-badge ${item.status}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td>{item.submittedDate}</td>
                        <td>
                          <div className="admin-table-actions-cell">
                            <button
                              className="admin-table-btn primary"
                              onClick={() => {
                                setSelectedRequest(item);
                                setShowRequestModal(true);
                              }}
                            >
                              <i className="fas fa-eye"></i>
                              Review
                            </button>
                            {item.status === 'pending' && (
                              <>
                                <button
                                  className="admin-table-btn success"
                                  onClick={() => handleApproveRequest(item.id, 'Approved by admin')}
                                >
                                  <i className="fas fa-check"></i>
                                  Approve
                                </button>
                                <button
                                  className="admin-table-btn danger"
                                  onClick={() => handleRejectRequest(item.id, 'Does not meet requirements')}
                                >
                                  <i className="fas fa-times"></i>
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'sellers' && sellers.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>
                          <select
                            value={item.status}
                            onChange={(e) => updateSellerStatus(item.id, e.target.value)}
                            className={`admin-status-badge ${item.status}`}
                            style={{ border: 'none', background: 'transparent', color: 'inherit' }}
                          >
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td>{item.joinDate}</td>
                        <td>{item.totalProducts}</td>
                        <td>${item.totalSales.toFixed(2)}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#F59E0B' }}>★</span>
                            <span style={{ marginLeft: '0.25rem' }}>{item.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'orders' && orders.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.customer}</td>
                        <td>{item.seller}</td>
                        <td>{item.product}</td>
                        <td>{item.quantity}</td>
                        <td>${item.total.toFixed(2)}</td>
                        <td>${item.commission.toFixed(2)}</td>
                        <td>
                          <span className={`admin-status-badge ${item.status}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="admin-table-footer">
                  <div className="admin-table-info">
                    Showing {activeTab === 'requests' ? requests.length : activeTab === 'sellers' ? sellers.length : orders.length} results
                  </div>
                  <div className="admin-table-pagination">
                    <button className="admin-pagination-btn" disabled>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="admin-pagination-btn active">1</button>
                    <button className="admin-pagination-btn">2</button>
                    <button className="admin-pagination-btn">3</button>
                    <button className="admin-pagination-btn">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Request Review Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title={selectedRequest ? `Review Request - ${selectedRequest.productName}` : 'Review Request'}
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-6">
            {/* Request Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Product Name:</span> {selectedRequest.productName}</p>
                  <p><span className="font-medium">Category:</span> {selectedRequest.category}</p>
                  <p><span className="font-medium">Description:</span> {selectedRequest.description}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Seller Name:</span> {selectedRequest.sellerName}</p>
                  <p><span className="font-medium">Email:</span> {selectedRequest.sellerEmail}</p>
                  <p><span className="font-medium">Submitted:</span> {selectedRequest.submittedDate}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 admin-status-badge ${selectedRequest.status}`}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
              <textarea
                value={selectedRequest.adminNotes}
                onChange={(e) => setSelectedRequest({...selectedRequest, adminNotes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
                rows="3"
                placeholder="Add notes about this request..."
              />
            </div>

            {/* Rejection Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason (if rejecting)</label>
              <textarea
                value={selectedRequest.rejectionReason}
                onChange={(e) => setSelectedRequest({...selectedRequest, rejectionReason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
                rows="2"
                placeholder="Explain why this request is being rejected..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                className="admin-btn admin-btn-outline admin-focus-ring"
                onClick={() => setShowRequestModal(false)}
              >
                <i className="fas fa-times"></i>
                Close
              </button>
              {selectedRequest.status === 'pending' && (
                <>
                  <button
                    className="admin-btn admin-btn-success admin-focus-ring"
                    onClick={() => handleApproveRequest(selectedRequest.id, selectedRequest.adminNotes)}
                  >
                    <i className="fas fa-check"></i>
                    Approve Request
                  </button>
                  <button
                    className="admin-btn admin-btn-danger admin-focus-ring"
                    onClick={() => handleRejectRequest(selectedRequest.id, selectedRequest.rejectionReason)}
                  >
                    <i className="fas fa-times"></i>
                    Reject Request
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
};

export default AdminDashboard;
