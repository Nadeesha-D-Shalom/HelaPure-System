      import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock users - in real app, this would come from backend
  const mockUsers = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      name: 'System Administrator',
      email: 'admin@helapure.com',
      permissions: ['manage_sellers', 'approve_products', 'view_analytics', 'manage_orders']
    },
    {
      id: 2,
      username: 'seller1',
      password: 'seller123',
      role: 'seller',
      name: 'John Smith',
      email: 'john@example.com',
      permissions: ['manage_products', 'view_orders', 'request_products']
    },
    {
      id: 3,
      username: 'delivery1',
      password: 'delivery123',
      role: 'delivery',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      permissions: ['manage_deliveries', 'update_status']
    },
    {
      id: 4,
      username: 'user1',
      password: 'user123',
      role: 'buyer',
      name: 'Alice Brown',
      email: 'alice@example.com',
      permissions: ['view_orders', 'place_orders', 'manage_profile']
    },
    {
      id: 5,
      username: 'user2',
      password: 'user456',
      role: 'buyer',
      name: 'Bob Green',
      email: 'bob@example.com',
      permissions: ['view_orders', 'place_orders', 'manage_profile']
    },
    {
      id: 6,
      username: 'seller2',
      password: 'seller456',
      role: 'seller',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      permissions: ['manage_products', 'view_orders', 'request_products']
    },
    {
      id: 7,
      username: 'delivery2',
      password: 'delivery456',
      role: 'delivery',
      name: 'David Brown',
      email: 'david@example.com',
      permissions: ['manage_deliveries', 'update_status']
    }
  ];

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name,
        email: foundUser.email,
        permissions: foundUser.permissions
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return { success: true, user: userData };
    } else {
      setLoading(false);
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if username already exists
    const existingUser = mockUsers.find(u => u.username === userData.username);
    if (existingUser) {
      setLoading(false);
      return { success: false, error: 'Username already exists' };
    }
    
    // Check if email already exists
    const existingEmail = mockUsers.find(u => u.email === userData.email);
    if (existingEmail) {
      setLoading(false);
      return { success: false, error: 'Email already exists' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      username: userData.username,
      password: userData.password,
      role: 'buyer', // Default role for new registrations
      name: userData.name,
      email: userData.email,
      permissions: ['view_orders', 'place_orders', 'manage_profile']
    };
    
    // Add to mock users (in real app, this would be sent to backend)
    mockUsers.push(newUser);
    
    setLoading(false);
    return { success: true, message: 'Registration successful! Please login with your credentials.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  const canAccessDashboard = (dashboardType) => {
    if (!user) return false;
    
    switch (dashboardType) {
      case 'admin':
        return user.role === 'admin';
      case 'seller':
        return user.role === 'seller';
      case 'delivery':
        return user.role === 'delivery';
      case 'buyer':
        return true; // Buyers can always access their dashboard
      default:
        return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    hasPermission,
    hasRole,
    canAccessDashboard
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
