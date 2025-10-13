import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import SellerDashboard from './pages/SellerDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BecomeSeller from './pages/BecomeSeller';
import HelpSupport from './pages/HelpSupport';
import SearchResults from './pages/SearchResults';
import UserProfile from './pages/UserProfile';
import Reviews from './pages/Reviews';
import Returns from './pages/Returns';
import Wishlist from './pages/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <WishlistProvider>
          <NotificationProvider>
            <CartProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/become-seller" element={<BecomeSeller />} />
                <Route path="/help-support" element={<HelpSupport />} />
                <Route path="/search" element={<SearchResults />} />
                
                {/* User Profile */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Buyer Dashboard */}
                <Route 
                  path="/dashboard/buyer" 
                  element={
                    <ProtectedRoute requiredRole="buyer">
                      <MyOrders />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/my-orders" element={<MyOrders />} />
                
                {/* User Menu Pages */}
                <Route 
                  path="/reviews" 
                  element={
                    <ProtectedRoute>
                      <Reviews />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/returns" 
                  element={
                    <ProtectedRoute>
                      <Returns />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/wishlist" 
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Dashboard Routes */}
                <Route 
                  path="/dashboard/seller" 
                  element={
                    <ProtectedRoute requiredRole="seller">
                      <SellerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/delivery" 
                  element={
                    <ProtectedRoute requiredRole="delivery">
                      <DeliveryDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/admin" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Router>
            </CartProvider>
          </NotificationProvider>
        </WishlistProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
