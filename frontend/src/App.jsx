// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token);
    // If authenticated, ensure we're on dashboard; else, redirect to login
    if (token && window.location.pathname === '/') {
      navigate('/dashboard');
    } else if (!token && window.location.pathname === '/dashboard') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <Login /> : <Dashboard />} 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;