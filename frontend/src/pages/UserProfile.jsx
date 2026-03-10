import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './UserProfile.css';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Sri Lanka'
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    address: '',
    city: '',
    postalCode: '',
    isDefault: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || 'Sri Lanka'
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile. Please try again.');
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const address = {
      id: Date.now(),
      ...newAddress,
      addedAt: new Date().toISOString()
    };
    setAddresses(prev => [...prev, address]);
    setNewAddress({
      type: 'home',
      address: '',
      city: '',
      postalCode: '',
      isDefault: false
    });
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  return (
    <div className="user-profile-page">
      <Header />
      
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user"></i>
              Personal Information
            </button>
            <button 
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <i className="fas fa-map-marker-alt"></i>
              Addresses
            </button>
            <button 
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="fas fa-shopping-bag"></i>
              Order History
            </button>
            <button 
              className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <i className="fas fa-heart"></i>
              Wishlist
            </button>
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fas fa-bell"></i>
              Notifications
            </button>
            <button 
              className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <i className="fas fa-lock"></i>
              Security
            </button>
          </div>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Personal Information</h2>
                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    >
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="India">India</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="form-actions">
                    <button type="submit" className="save-btn">
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Addresses</h2>
                <button 
                  className="add-btn"
                  onClick={() => setActiveTab('add-address')}
                >
                  + Add New Address
                </button>
              </div>

              <div className="addresses-list">
                {addresses.length === 0 ? (
                  <div className="empty-state">
                    <p>No addresses saved yet</p>
                    <button 
                      className="add-btn"
                      onClick={() => setActiveTab('add-address')}
                    >
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  addresses.map(address => (
                    <div key={address.id} className="address-card">
                      <div className="address-info">
                        <h4>{address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address</h4>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.postalCode}</p>
                        {address.isDefault && <span className="default-badge">Default</span>}
                      </div>
                      <div className="address-actions">
                        <button 
                          className="action-btn"
                          onClick={() => handleSetDefaultAddress(address.id)}
                        >
                          Set Default
                        </button>
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'add-address' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Add New Address</h2>
                <button 
                  className="back-btn"
                  onClick={() => setActiveTab('addresses')}
                >
                  ← Back to Addresses
                </button>
              </div>

              <form onSubmit={handleAddAddress} className="address-form">
                <div className="form-group">
                  <label>Address Type</label>
                  <select
                    name="type"
                    value={newAddress.type}
                    onChange={handleAddressChange}
                    required
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={newAddress.address}
                    onChange={handleAddressChange}
                    required
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={newAddress.postalCode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress(prev => ({
                        ...prev,
                        isDefault: e.target.checked
                      }))}
                    />
                    Set as default address
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Add Address
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Order History</h2>
              </div>
              <div className="orders-list">
                <p>Order history will be displayed here</p>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>My Wishlist</h2>
              </div>
              <div className="wishlist-list">
                <p>Wishlist items will be displayed here</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Notification Settings</h2>
              </div>
              <div className="notification-settings">
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Email notifications for new orders
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    SMS notifications for order updates
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" />
                    Marketing emails and promotions
                  </label>
                </div>
                <div className="setting-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Price drop alerts for wishlist items
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Security Settings</h2>
              </div>
              <div className="security-settings">
                <div className="security-item">
                  <h4>Change Password</h4>
                  <button className="action-btn">Change Password</button>
                </div>
                <div className="security-item">
                  <h4>Two-Factor Authentication</h4>
                  <button className="action-btn">Enable 2FA</button>
                </div>
                <div className="security-item">
                  <h4>Login Activity</h4>
                  <button className="action-btn">View Login History</button>
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

export default UserProfile;
