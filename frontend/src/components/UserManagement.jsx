import React, { useState } from 'react';
import AdvancedButton from './AdvancedButton';
import Modal from './Modal';
import DataTable from './DataTable';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      name: 'System Administrator',
      email: 'admin@helapure.com',
      role: 'admin',
      status: 'active',
      createdDate: '2024-01-01',
      lastLogin: '2024-01-20'
    },
    {
      id: 2,
      username: 'seller1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'seller',
      status: 'active',
      createdDate: '2024-01-05',
      lastLogin: '2024-01-19'
    },
    {
      id: 3,
      username: 'delivery1',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'delivery',
      status: 'active',
      createdDate: '2024-01-10',
      lastLogin: '2024-01-20'
    },
    {
      id: 4,
      username: 'seller2',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'seller',
      status: 'suspended',
      createdDate: '2024-01-08',
      lastLogin: '2024-01-15'
    }
  ]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    role: 'seller',
    password: ''
  });

  const handleAddUser = () => {
    if (newUser.username && newUser.name && newUser.email && newUser.password) {
      const user = {
        id: Date.now(),
        ...newUser,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never'
      };
      setUsers([...users, user]);
      setNewUser({ username: '', name: '', email: '', role: 'seller', password: '' });
      setShowAddUserModal(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setShowEditUserModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'seller': return 'bg-green-100 text-green-800';
      case 'delivery': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const userColumns = [
    { key: 'username', label: 'Username', searchable: true },
    { key: 'name', label: 'Name', searchable: true },
    { key: 'email', label: 'Email', searchable: true },
    { key: 'role', label: 'Role', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(value)}`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )},
    { key: 'status', label: 'Status', render: (value, item) => (
      <select
        value={value}
        onChange={(e) => handleStatusChange(item.id, e.target.value)}
        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(value)}`}
      >
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="inactive">Inactive</option>
      </select>
    )},
    { key: 'createdDate', label: 'Created' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'actions', label: 'Actions', render: (value, item) => (
      <div className="flex space-x-2">
        <AdvancedButton
          size="sm"
          variant="outline"
          onClick={() => handleEditUser(item)}
        >
          Edit
        </AdvancedButton>
        {item.role !== 'admin' && (
          <AdvancedButton
            size="sm"
            variant="danger"
            onClick={() => handleDeleteUser(item.id)}
          >
            Delete
          </AdvancedButton>
        )}
      </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <AdvancedButton
          variant="primary"
          onClick={() => setShowAddUserModal(true)}
          icon="➕"
        >
          Add New User
        </AdvancedButton>
      </div>

      <DataTable
        data={users}
        columns={userColumns}
        searchable={true}
        sortable={true}
        pagination={true}
        pageSize={10}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        title="Add New User"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser({...newUser, username: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
            >
              <option value="seller">Seller</option>
              <option value="delivery">Delivery</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter password"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <AdvancedButton
              variant="outline"
              onClick={() => setShowAddUserModal(false)}
            >
              Cancel
            </AdvancedButton>
            <AdvancedButton
              variant="primary"
              onClick={handleAddUser}
            >
              Add User
            </AdvancedButton>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditUserModal}
        onClose={() => setShowEditUserModal(false)}
        title="Edit User"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={selectedUser.username}
                onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              >
                <option value="seller">Seller</option>
                <option value="delivery">Delivery</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <AdvancedButton
                variant="outline"
                onClick={() => setShowEditUserModal(false)}
              >
                Cancel
              </AdvancedButton>
              <AdvancedButton
                variant="primary"
                onClick={() => handleUpdateUser(selectedUser)}
              >
                Update User
              </AdvancedButton>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;

