import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdvancedButton from '../components/AdvancedButton';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Organic Honey',
        category: 'Honey',
        price: 25.00,
        stock: 50,
        status: 'active',
        sales: 120,
        revenue: 3000,
        image: 'https://via.placeholder.com/100',
        description: 'Pure organic honey from local beekeepers'
      },
      {
        id: 2,
        name: 'Natural Coconut Oil',
        category: 'Oils',
        price: 15.00,
        stock: 30,
        status: 'active',
        sales: 85,
        revenue: 1275,
        image: 'https://via.placeholder.com/100',
        description: 'Cold-pressed virgin coconut oil'
      },
      {
        id: 3,
        name: 'Pure Cinnamon',
        category: 'Spices',
        price: 30.00,
        stock: 0,
        status: 'out_of_stock',
        sales: 45,
        revenue: 1350,
        image: 'https://via.placeholder.com/100',
        description: 'Premium quality cinnamon sticks'
      }
    ];

    const mockOrders = [
      {
        id: 'ORD-001',
        customer: 'John Doe',
        product: 'Organic Honey',
        quantity: 2,
        total: 50.00,
        status: 'pending',
        date: '2024-01-20',
        address: '123 Main St, Colombo'
      },
      {
        id: 'ORD-002',
        customer: 'Jane Smith',
        product: 'Natural Coconut Oil',
        quantity: 1,
        total: 15.00,
        status: 'shipped',
        date: '2024-01-19',
        address: '456 Park Ave, Kandy'
      }
    ];

    const mockRequests = [
      {
        id: 1,
        productName: 'Organic Turmeric Powder',
        category: 'Spices',
        description: 'High-quality organic turmeric powder',
        status: 'pending',
        submittedDate: '2024-01-20',
        adminNotes: ''
      },
      {
        id: 2,
        productName: 'Pure Vanilla Extract',
        category: 'Extracts',
        description: 'Natural vanilla extract from Madagascar',
        status: 'approved',
        submittedDate: '2024-01-18',
        adminNotes: 'Approved for listing'
      }
    ];

    setProducts(mockProducts);
    setOrders(mockOrders);
    setRequests(mockRequests);
  }, []);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  const [newRequest, setNewRequest] = useState({
    productName: '',
    category: '',
    description: ''
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      const product = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        status: 'active',
        sales: 0,
        revenue: 0,
        image: newProduct.image || 'https://via.placeholder.com/100'
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', category: '', price: '', stock: '', description: '', image: '' });
      setShowAddProductModal(false);
    }
  };

  const handleAddRequest = () => {
    if (newRequest.productName && newRequest.category) {
      const request = {
        id: Date.now(),
        ...newRequest,
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0],
        adminNotes: ''
      };
      setRequests([...requests, request]);
      setNewRequest({ productName: '', category: '', description: '' });
      setShowRequestModal(false);
    }
  };

  const updateStock = (productId, newStock) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, stock: newStock, status: newStock > 0 ? 'active' : 'out_of_stock' } : p
    ));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const productColumns = [
    { key: 'image', label: 'Image', render: (value) => <img src={value} alt="Product" className="w-12 h-12 object-cover rounded" /> },
    { key: 'name', label: 'Product Name', searchable: true },
    { key: 'category', label: 'Category', searchable: true },
    { key: 'price', label: 'Price', render: (value) => `$${value.toFixed(2)}` },
    { key: 'stock', label: 'Stock', render: (value, item) => (
      <div className="flex items-center space-x-2">
        <span className={value > 10 ? 'text-green-600' : value > 0 ? 'text-yellow-600' : 'text-red-600'}>
          {value}
        </span>
        <button
          onClick={() => updateStock(item.id, value + 10)}
          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200"
        >
          +10
        </button>
      </div>
    )},
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value === 'active' ? 'Active' : 'Out of Stock'}
      </span>
    )},
    { key: 'sales', label: 'Sales' },
    { key: 'revenue', label: 'Revenue', render: (value) => `$${value.toFixed(2)}` }
  ];

  const orderColumns = [
    { key: 'id', label: 'Order ID', searchable: true },
    { key: 'customer', label: 'Customer', searchable: true },
    { key: 'product', label: 'Product', searchable: true },
    { key: 'quantity', label: 'Qty' },
    { key: 'total', label: 'Total', render: (value) => `$${value.toFixed(2)}` },
    { key: 'status', label: 'Status', render: (value, item) => (
      <select
        value={value}
        onChange={(e) => updateOrderStatus(item.id, e.target.value)}
        className="text-xs border rounded px-2 py-1"
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    )},
    { key: 'date', label: 'Date' }
  ];

  const requestColumns = [
    { key: 'productName', label: 'Product Name', searchable: true },
    { key: 'category', label: 'Category', searchable: true },
    { key: 'description', label: 'Description', searchable: true },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'approved' ? 'bg-green-100 text-green-800' :
        value === 'rejected' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'submittedDate', label: 'Submitted Date' },
    { key: 'adminNotes', label: 'Admin Notes', searchable: true }
  ];

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    lowStock: products.filter(p => p.stock < 10).length
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'requests', label: 'Requests', icon: '📝' }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-light-cream">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-deep-green">Seller Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your products, orders, and requests</p>
            </div>
            <div className="flex space-x-4">
              <AdvancedButton
                variant="outline"
                onClick={() => setShowRequestModal(true)}
                icon="📝"
              >
                Request New Product
              </AdvancedButton>
              <AdvancedButton
                variant="primary"
                onClick={() => setShowAddProductModal(true)}
                icon="➕"
              >
                Add Product
              </AdvancedButton>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-deep-green text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                <p className="text-gray-600 mt-1">Manage your product inventory and details</p>
              </div>
              <DataTable
                data={products}
                columns={productColumns}
                searchable={true}
                sortable={true}
                pagination={true}
                pageSize={10}
              />
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
                <p className="text-gray-600 mt-1">View and manage customer orders</p>
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
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Product Requests</h2>
                <p className="text-gray-600 mt-1">Track your product approval requests</p>
              </div>
              <DataTable
                data={requests}
                columns={requestColumns}
                searchable={true}
                sortable={true}
                pagination={true}
                pageSize={10}
              />
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        title="Add New Product"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
            >
              <option value="">Select category</option>
              <option value="Honey">Honey</option>
              <option value="Oils">Oils</option>
              <option value="Spices">Spices</option>
              <option value="Extracts">Extracts</option>
              <option value="Tea">Tea</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              rows="3"
              placeholder="Enter product description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <AdvancedButton
              variant="outline"
              onClick={() => setShowAddProductModal(false)}
            >
              Cancel
            </AdvancedButton>
            <AdvancedButton
              variant="primary"
              onClick={handleAddProduct}
            >
              Add Product
            </AdvancedButton>
          </div>
        </div>
      </Modal>

      {/* Request Product Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request New Product"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={newRequest.productName}
              onChange={(e) => setNewRequest({...newRequest, productName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={newRequest.category}
              onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
            >
              <option value="">Select category</option>
              <option value="Honey">Honey</option>
              <option value="Oils">Oils</option>
              <option value="Spices">Spices</option>
              <option value="Extracts">Extracts</option>
              <option value="Tea">Tea</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newRequest.description}
              onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              rows="4"
              placeholder="Describe the product and why it should be approved"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <AdvancedButton
              variant="outline"
              onClick={() => setShowRequestModal(false)}
            >
              Cancel
            </AdvancedButton>
            <AdvancedButton
              variant="primary"
              onClick={handleAddRequest}
            >
              Submit Request
            </AdvancedButton>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default SellerDashboard;

