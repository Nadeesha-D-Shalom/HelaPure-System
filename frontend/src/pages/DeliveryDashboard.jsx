import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdvancedButton from '../components/AdvancedButton';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

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
      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(value)}`}>
        {getStatusIcon(value)} {value.replace('_', ' ').toUpperCase()}
      </span>
    )},
    { key: 'estimatedDelivery', label: 'Est. Delivery' },
    { key: 'totalAmount', label: 'Amount', render: (value) => `$${value.toFixed(2)}` },
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="flex space-x-2">
        {item.status === 'assigned' && (
          <AdvancedButton
            size="sm"
            variant="primary"
            onClick={() => startDelivery(item.id)}
          >
            Start
          </AdvancedButton>
        )}
        {item.status === 'in_transit' && (
          <AdvancedButton
            size="sm"
            variant="success"
            onClick={() => {
              setSelectedOrder(item);
              setShowDeliveryModal(true);
            }}
          >
            Complete
          </AdvancedButton>
        )}
        <AdvancedButton
          size="sm"
          variant="outline"
          onClick={() => {
            setSelectedOrder(item);
            setShowDeliveryModal(true);
          }}
        >
          View
        </AdvancedButton>
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
    { id: 'assigned', label: 'Assigned', icon: '📋', count: stats.totalAssigned },
    { id: 'in_transit', label: 'In Transit', icon: '🚚', count: stats.inTransit },
    { id: 'completed', label: 'Completed', icon: '✅', count: stats.totalCompleted },
    { id: 'history', label: 'History', icon: '📊', count: stats.totalCompleted }
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
      <div className="min-h-screen bg-light-cream">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-deep-green">Delivery Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your delivery assignments and track progress</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Today's Earnings</p>
              <p className="text-2xl font-bold text-deep-green">${stats.totalEarnings.toFixed(2)}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Assigned</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalAssigned}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <span className="text-2xl">🚚</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inTransit}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCompleted}</p>
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
                {activeTab === 'assigned' && 'Assigned Deliveries'}
                {activeTab === 'in_transit' && 'In Transit Deliveries'}
                {activeTab === 'completed' && 'Completed Deliveries'}
                {activeTab === 'history' && 'Delivery History'}
              </h2>
              <p className="text-gray-600 mt-1">
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
        title={selectedOrder ? `Delivery Details - ${selectedOrder.id}` : 'Delivery Details'}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Order ID:</span> {selectedOrder.orderId}</p>
                  <p><span className="font-medium">Customer:</span> {selectedOrder.customer}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                  <p><span className="font-medium">Total Amount:</span> ${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                <p className="text-gray-700">{selectedOrder.address}</p>
                {selectedOrder.specialInstructions && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <span className="font-medium">Special Instructions:</span> {selectedOrder.specialInstructions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Items to Deliver</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Notes</label>
              <textarea
                value={selectedOrder.deliveryNotes}
                onChange={(e) => setSelectedOrder({...selectedOrder, deliveryNotes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
                rows="3"
                placeholder="Add any notes about the delivery..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <AdvancedButton
                variant="outline"
                onClick={() => setShowDeliveryModal(false)}
              >
                Close
              </AdvancedButton>
              {selectedOrder.status === 'in_transit' && (
                <AdvancedButton
                  variant="success"
                  onClick={handleCompleteDelivery}
                >
                  Mark as Delivered
                </AdvancedButton>
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

