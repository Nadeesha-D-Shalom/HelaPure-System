import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdvancedButton from '../components/AdvancedButton';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';
import UserManagement from '../components/UserManagement';

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
      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(value)}`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'submittedDate', label: 'Submitted' },
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="flex space-x-2">
        <AdvancedButton
          size="sm"
          variant="outline"
          onClick={() => {
            setSelectedRequest(item);
            setShowRequestModal(true);
          }}
        >
          Review
        </AdvancedButton>
        {item.status === 'pending' && (
          <>
            <AdvancedButton
              size="sm"
              variant="success"
              onClick={() => handleApproveRequest(item.id, 'Approved by admin')}
            >
              Approve
            </AdvancedButton>
            <AdvancedButton
              size="sm"
              variant="danger"
              onClick={() => handleRejectRequest(item.id, 'Does not meet requirements')}
            >
              Reject
            </AdvancedButton>
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
      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(value)}`}>
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
    { id: 'requests', label: 'Product Requests', icon: '📝', count: stats.pendingRequests },
    { id: 'sellers', label: 'Sellers', icon: '👥', count: stats.totalSellers },
    { id: 'users', label: 'User Management', icon: '👤', count: 0 },
    { id: 'orders', label: 'Orders', icon: '🛒', count: stats.totalOrders },
    { id: 'analytics', label: 'Analytics', icon: '📊', count: 0 }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-light-cream">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-deep-green">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage sellers, approve requests, and monitor platform activity</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Commission Earned</p>
              <p className="text-2xl font-bold text-deep-green">${stats.totalCommission.toFixed(2)}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Approved Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.approvedRequests}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Active Sellers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeSellers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <span className="text-2xl">🛒</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-all relative ${
                  activeTab === tab.id
                    ? 'bg-deep-green text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white text-deep-green' : 'bg-deep-green text-white'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeTab === 'requests' && 'Product Approval Requests'}
                {activeTab === 'sellers' && 'Seller Management'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'orders' && 'Order Management'}
                {activeTab === 'analytics' && 'Platform Analytics'}
              </h2>
              <p className="text-gray-600 mt-1">
                {activeTab === 'requests' && 'Review and approve product listing requests'}
                {activeTab === 'sellers' && 'Manage seller accounts and status'}
                {activeTab === 'users' && 'Manage user accounts and permissions'}
                {activeTab === 'orders' && 'Monitor all platform orders and commissions'}
                {activeTab === 'analytics' && 'View platform performance metrics'}
              </p>
            </div>
            
            {activeTab === 'analytics' ? (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-primary text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Revenue Overview</h3>
                    <p className="text-3xl font-bold">${stats.totalCommission.toFixed(2)}</p>
                    <p className="text-sm opacity-90">Total Commission</p>
                  </div>
                  <div className="bg-gradient-secondary text-white p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Platform Growth</h3>
                    <p className="text-3xl font-bold">{stats.activeSellers}</p>
                    <p className="text-sm opacity-90">Active Sellers</p>
                  </div>
                  <div className="bg-gradient-light text-deep-green p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Order Volume</h3>
                    <p className="text-3xl font-bold">{stats.totalOrders}</p>
                    <p className="text-sm opacity-90">Total Orders</p>
                  </div>
                </div>
              </div>
            ) : activeTab === 'users' ? (
              <div className="p-6">
                <UserManagement />
              </div>
            ) : (
              <DataTable
                data={
                  activeTab === 'requests' ? requests :
                  activeTab === 'sellers' ? sellers :
                  orders
                }
                columns={
                  activeTab === 'requests' ? requestColumns :
                  activeTab === 'sellers' ? sellerColumns :
                  orderColumns
                }
                searchable={true}
                sortable={true}
                pagination={true}
                pageSize={10}
              />
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
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedRequest.status)}`}>
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
              <AdvancedButton
                variant="outline"
                onClick={() => setShowRequestModal(false)}
              >
                Close
              </AdvancedButton>
              {selectedRequest.status === 'pending' && (
                <>
                  <AdvancedButton
                    variant="success"
                    onClick={() => handleApproveRequest(selectedRequest.id, selectedRequest.adminNotes)}
                  >
                    Approve Request
                  </AdvancedButton>
                  <AdvancedButton
                    variant="danger"
                    onClick={() => handleRejectRequest(selectedRequest.id, selectedRequest.rejectionReason)}
                  >
                    Reject Request
                  </AdvancedButton>
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
