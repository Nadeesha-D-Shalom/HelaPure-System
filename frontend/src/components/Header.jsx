import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import NotificationCenter from './NotificationCenter';
import './Header.css';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Sinhala');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { getTotalItems } = useCart();
  const userMenuRef = useRef(null);
  const languageMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageMenu(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'admin':
        return { to: '/dashboard/admin', label: 'Admin Dashboard', icon: '⚙️' };
      case 'seller':
        return { to: '/dashboard/seller', label: 'Seller Dashboard', icon: '🏪' };
      case 'delivery':
        return { to: '/dashboard/delivery', label: 'Delivery Dashboard', icon: '🚚' };
      case 'buyer':
        return { to: '/dashboard/buyer', label: 'My Orders', icon: '🛒' };
      default:
        return { to: '/dashboard/buyer', label: 'My Orders', icon: '🛒' };
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <header className="main-header">
      {/* Top Utility Bar */}
      <div className="utility-bar">
        <div className="utility-container">
          <div className="utility-links">
            <Link to="/app">SAVE MORE ON APP</Link>
            <Link to="/become-seller">BECOME A SELLER</Link>
            <Link to="/help-support">HELP & SUPPORT</Link>
          </div>
          
          <div className="user-section">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  className="user-account-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {user.name.toUpperCase()}'S ACCOUNT ▼
                </button>
                {showUserMenu && (
                  <div className="dropdown-menu user-menu">
                    <div className="user-info">
                      <p className="user-name">{user.name}</p>
                      <p className="user-role">{user.role}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="login-button"
                onClick={() => setShowLoginModal(true)}
              >
                LOGIN
              </button>
            )}
            
            <div className="relative" ref={languageMenuRef}>
              <button
                className="language-selector"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                {selectedLanguage === 'Sinhala' ? 'භාෂාව තෝරන්න' : selectedLanguage === 'English' ? 'Select Language' : 'மொழியைத் தேர்ந்தெடுக்கவும்'} ▼
              </button>
              {showLanguageMenu && (
                <div className="dropdown-menu language-menu">
                  <button
                    onClick={() => handleLanguageSelect('Sinhala')}
                    className={`dropdown-item ${selectedLanguage === 'Sinhala' ? 'selected' : ''}`}
                  >
                    🇱🇰 සිංහල
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('English')}
                    className={`dropdown-item ${selectedLanguage === 'English' ? 'selected' : ''}`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('Tamil')}
                    className={`dropdown-item ${selectedLanguage === 'Tamil' ? 'selected' : ''}`}
                  >
                    🇱🇰 தமிழ்
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-nav">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img 
              src="/logo.png" 
              alt="HelaPure Logo" 
            />
          </Link>

          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in HelaPure"
                  className="search-input"
                />
                <button
                  type="submit"
                  className="search-button"
                >
                  🔍
                </button>
              </div>
            </form>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="wishlist-link">
            ❤️
            <span className="wishlist-badge">{wishlistCount}</span>
          </Link>

          {/* Notifications */}
          <NotificationCenter />

          {/* Cart */}
          <Link to="/cart" className="cart-link">
            🛒
            <span className="cart-badge">{getTotalItems()}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {/* Mobile Search */}
            <div className="mobile-search">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in HelaPure"
                  className="search-input"
                />
                <button
                  type="submit"
                  className="search-button"
                >
                  🔍
                </button>
              </form>
            </div>

            <nav className="mobile-nav">
              <Link 
                to="/app" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Save More on App
              </Link>
              <Link 
                to="/become-seller" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Seller
              </Link>
              <Link 
                to="/help-support" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Help & Support
              </Link>
              <Link 
                to="/cart" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🛒 Cart
              </Link>
      </nav>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </header>
  );
};

export default Header;