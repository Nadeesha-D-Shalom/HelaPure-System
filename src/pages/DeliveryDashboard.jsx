import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdvancedButton from '../components/AdvancedButton';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';
import '../styles/DeliveryDashboard.css';

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assigned');
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryHistory, setDeliveryHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockDeliveries = [
      {
        id: 'DEL-001',
        orderId: 'ORD-001',
        customer: 'John Doe',
        address: '123 Main St, Colombo 03, Sri Lanka',
        phone: '+94 77 123 4567',
        status: 'assigned',
        assignedDate: '2024-01-20',
        estimatedDelivery: '2024-01-21',
        items: [
          { name: 'Organic Honey', quantity: 2, price: 25.00 },
          { name: 'Natural Coconut Oil', quantity: 1, price: 15.00 }
        ],
        totalAmount: 65.00,
        specialInstructions: 'Please call before delivery',
        deliveryNotes: '',
        completedDate: null
      },
      {
        id: 'DEL-002',
        orderId: 'ORD-002',
        customer: 'Jane Smith',
        address: '456 Park Ave, Kandy, Sri Lanka',
        phone: '+94 77 234 5678',
        status: 'in_transit',
        assignedDate: '2024-01-19',
        estimatedDelivery: '2024-01-20',
        items: [
          { name: 'Pure Cinnamon', quantity: 1, price: 30.00 }
        ],
        totalAmount: 30.00,
        specialInstructions: 'Leave at front door if no answer',
        deliveryNotes: 'Customer not available, left package with neighbor',
        completedDate: null
      },
      {
        id: 'DEL-003',
        orderId: 'ORD-003',
        customer: 'Mike Johnson',
        address: '789 Beach Rd, Galle, Sri Lanka',
        phone: '+94 77 345 6789',
        status: 'delivered',
        assignedDate: '2024-01-18',
        estimatedDelivery: '2024-01-19',
        items: [
          { name: 'Premium Tea Leaves', quantity: 2, price: 40.00 }
        ],
        totalAmount: 80.00,
        specialInstructions: '',
        deliveryNotes: 'Delivered successfully, customer satisfied',
        completedDate: '2024-01-19'
      }
    ];

    setDeliveries(mockDeliveries);
    setDeliveryHistory(mockDeliveries.filter(d => d.status === 'delivered'));
  }, []);

  const updateDeliveryStatus = (deliveryId, newStatus, notes = '') => {
    setDeliveries(deliveries.map(delivery => {
      if (delivery.id === deliveryId) {
        const updatedDelivery = {
          ...delivery,
          status: newStatus,
          deliveryNotes: notes || delivery.deliveryNotes,
          completedDate: newStatus === 'delivered' ? new Date().toISOString().split('T')[0] : delivery.completedDate
        };
        
        // Move to history if delivered
        if (newStatus === 'delivered') {
          setDeliveryHistory([updatedDelivery, ...deliveryHistory]);
        }
        
        return updatedDelivery;
      }
      return delivery;
    }));
  };

  const startDelivery = (deliveryId) => {
    updateDeliveryStatus(deliveryId, 'in_transit');
  };

  const completeDelivery = (deliveryId, notes) => {
    updateDeliveryStatus(deliveryId, 'delivered', notes);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'assigned': return '📋';
      case 'in_transit': return '🚚';
      case 'delivered': return '✅';
      case 'failed': return '❌';
      default: return '❓';
    }
  };

  const deliveryColumns = [
    { key: 'id', label: 'Delivery ID', searchable: true },
    { key: 'orderId', label: 'Order ID', searchable: true },
    { key: 'customer', label: 'Customer', searchable: true },
    { key: 'address', label: 'Address', searchable: true },
    { key: 'phone', label: 'Phone', searchable: true },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`delivery-status-badge ${value}`}>
        <i className={getStatusIcon(value)}></i>
        {value.replace('_', ' ').toUpperCase()}
      </span>
    )},
    { key: 'estimatedDelivery', label: 'Est. Delivery' },
    { key: 'totalAmount', label: 'Amount', render: (value) => `$${value.toFixed(2)}` },
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="flex space-x-2">
        {item.status === 'assigned' && (
          <button
            className="delivery-btn delivery-btn-primary delivery-btn-sm"
            onClick={() => startDelivery(item.id)}
          >
            <i className="fas fa-play"></i>
            Start
          </button>
        )}
        {item.status === 'in_transit' && (
          <button
            className="delivery-btn delivery-btn-success delivery-btn-sm"
            onClick={() => {
              setSelectedOrder(item);
              setShowDeliveryModal(true);
            }}
          >
            <i className="fas fa-check"></i>
            Complete
          </button>
        )}
        <button
          className="delivery-btn delivery-btn-outline delivery-btn-sm"
          onClick={() => {
            setSelectedOrder(item);
            setShowDeliveryModal(true);
          }}
        >
          <i className="fas fa-eye"></i>
          View
        </button>
      </div>
    )}
  ];

  const historyColumns = [
    { key: 'id', label: 'Delivery ID', searchable: true },
    { key: 'orderId', label: 'Order ID', searchable: true },
    { key: 'customer', label: 'Customer', searchable: true },
    { key: 'address', label: 'Address', searchable: true },
    { key: 'completedDate', label: 'Completed Date' },
    { key: 'totalAmount', label: 'Amount', render: (value) => `$${value.toFixed(2)}` },
    { key: 'deliveryNotes', label: 'Notes', searchable: true }
  ];

  const stats = {
    totalAssigned: deliveries.filter(d => d.status === 'assigned').length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    completedToday: deliveryHistory.filter(d => d.completedDate === new Date().toISOString().split('T')[0]).length,
    totalCompleted: deliveryHistory.length,
    totalEarnings: deliveryHistory.reduce((sum, d) => sum + (d.totalAmount * 0.1), 0) // 10% commission
  };

  const tabs = [
    { id: 'assigned', label: 'Assigned', icon: 'fas fa-clipboard-list', count: stats.totalAssigned },
    { id: 'in_transit', label: 'In Transit', icon: 'fas fa-truck', count: stats.inTransit },
    { id: 'completed', label: 'Completed', icon: 'fas fa-check-circle', count: stats.totalCompleted },
    { id: 'history', label: 'History', icon: 'fas fa-chart-bar', count: stats.totalCompleted }
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    if (activeTab === 'assigned') return delivery.status === 'assigned';
    if (activeTab === 'in_transit') return delivery.status === 'in_transit';
    if (activeTab === 'completed') return delivery.status === 'delivered';
    return false;
  });

  const handleCompleteDelivery = () => {
    if (selectedOrder) {
      completeDelivery(selectedOrder.id, selectedOrder.deliveryNotes);
      setShowDeliveryModal(false);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <Header />
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
              <p className="text-3xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
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
                <p className="delivery-stat-number">{stats.totalAssigned}</p>
                <p className="delivery-stat-label">Assigned</p>
              </div>
            </div>

            <div className="delivery-stat-card">
              <div className="delivery-stat-icon in-transit">
                <i className="fas fa-truck"></i>
              </div>
              <div>
                <p className="delivery-stat-number">{stats.inTransit}</p>
                <p className="delivery-stat-label">In Transit</p>
              </div>
            </div>

            <div className="delivery-stat-card">
              <div className="delivery-stat-icon completed">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <p className="delivery-stat-number">{stats.completedToday}</p>
                <p className="delivery-stat-label">Completed Today</p>
              </div>
            </div>

            <div className="delivery-stat-card">
              <div className="delivery-stat-icon earnings">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div>
                <p className="delivery-stat-number">{stats.totalCompleted}</p>
                <p className="delivery-stat-label">Total Completed</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="delivery-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`delivery-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="delivery-tab-icon">
                  <i className={tab.icon}></i>
                </span>
                {tab.label}
                {tab.count > 0 && (
                  <span className="delivery-tab-badge">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="delivery-content">
            <div className="delivery-content-header">
              <h2 className="delivery-content-title">
                {activeTab === 'assigned' && (
                  <>
                    <i className="fas fa-clipboard-list"></i>
                    Assigned Deliveries
                  </>
                )}
                {activeTab === 'in_transit' && (
                  <>
                    <i className="fas fa-truck"></i>
                    In Transit Deliveries
                  </>
                )}
                {activeTab === 'completed' && (
                  <>
                    <i className="fas fa-check-circle"></i>
                    Completed Deliveries
                  </>
                )}
                {activeTab === 'history' && (
                  <>
                    <i className="fas fa-chart-bar"></i>
                    Delivery History
                  </>
                )}
              </h2>
              <p className="delivery-content-subtitle">
                {activeTab === 'assigned' && 'Deliveries waiting to be started'}
                {activeTab === 'in_transit' && 'Deliveries currently in progress'}
                {activeTab === 'completed' && 'Recently completed deliveries'}
                {activeTab === 'history' && 'Complete delivery history'}
              </p>
            </div>
            <DataTable
              data={activeTab === 'history' ? deliveryHistory : filteredDeliveries}
              columns={activeTab === 'history' ? historyColumns : deliveryColumns}
              searchable={true}
              sortable={true}
              pagination={true}
              pageSize={10}
            />
          </div>
        </div>
      </div>

      {/* Delivery Modal */}
      <Modal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        title={selectedOrder ? 'Delivery Details - ' + selectedOrder.id : 'Delivery Details'}
        size="lg"
      >
        {selectedOrder && (
          <div className="delivery-modal-body">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="delivery-modal-title">
                  <i className="fas fa-info-circle"></i>
                  Order Information
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Order ID:</span> {selectedOrder.orderId}</p>
                  <p><span className="font-medium">Customer:</span> {selectedOrder.customer}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                  <p><span className="font-medium">Total Amount:</span> ${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h3 className="delivery-modal-title">
                  <i className="fas fa-map-marker-alt"></i>
                  Delivery Address
                </h3>
                <p className="text-gray-700">{selectedOrder.address}</p>
                {selectedOrder.specialInstructions && (
                  <div className="delivery-special-instructions">
                    <p>
                      <span className="delivery-special-label">Special Instructions:</span>
                      {selectedOrder.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="delivery-modal-title">
                <i className="fas fa-box"></i>
                Items to Deliver
              </h3>
              <div className="delivery-items-list">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="delivery-item">
                    <span className="delivery-item-name">{item.quantity}x {item.name}</span>
                    <span className="delivery-item-price">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Notes */}
            <div className="delivery-form-group">
              <label className="delivery-form-label">Delivery Notes</label>
              <textarea
                value={selectedOrder.deliveryNotes}
                onChange={(e) => setSelectedOrder({...selectedOrder, deliveryNotes: e.target.value})}
                className="delivery-form-textarea"
                rows="3"
                placeholder="Add any notes about the delivery..."
              />
            </div>

            {/* Actions */}
            <div className="delivery-modal-footer">
              <button
                className="delivery-btn delivery-btn-outline"
                onClick={() => setShowDeliveryModal(false)}
              >
                <i className="fas fa-times"></i>
                Close
              </button>
              {selectedOrder.status === 'in_transit' && (
                <button
                  className="delivery-btn delivery-btn-success"
                  onClick={handleCompleteDelivery}
                >
                  <i className="fas fa-check"></i>
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
};

export default DeliveryDashboard;

