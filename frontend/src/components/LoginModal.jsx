import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'phone'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
    name: '',
    email: '',
    confirmPassword: ''
  });

  // Clear form data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: '',
        password: '',
        phone: '',
        name: '',
        email: '',
        confirmPassword: ''
      });
      setErrors({});
      setLoginError('');
      setSuccessMessage('');
      setShowPassword(false);
    }
  }, [isOpen]);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading && isOpen) {
      const from = location.state?.from?.pathname || getDefaultRoute(user.role);
      onClose(); // Close modal first
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 100); // Small delay to prevent navigation throttling
    }
  }, [user, loading, isOpen, navigate, location, onClose]);

  const getDefaultRoute = (role) => {
    switch (role) {
      case 'admin': return '/dashboard/admin';
      case 'seller': return '/dashboard/seller';
      case 'delivery': return '/dashboard/delivery';
      default: return '/';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (loginError) {
      setLoginError('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};

    if (loginMethod === 'password') {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegistrationForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        const from = location.state?.from?.pathname || getDefaultRoute(result.user.role);
        onClose(); // Close modal first
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 100); // Small delay to prevent navigation throttling
      } else {
        setLoginError(result.error);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (validateRegistrationForm()) {
      const result = await register({
        username: formData.username,
        password: formData.password,
        name: formData.name,
        email: formData.email
      });
      
      if (result.success) {
        setSuccessMessage(result.message);
        setIsLogin(true);
        setFormData({
          username: '',
          password: '',
          phone: '',
          name: '',
          email: '',
          confirmPassword: ''
        });
      } else {
        setLoginError(result.error);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      password: '',
      phone: '',
      name: '',
      email: '',
      confirmPassword: ''
    });
    setErrors({});
    setLoginError('');
    setSuccessMessage('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="login-modal-overlay" onClick={handleOverlayClick}>
        <div className="login-modal">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
        </div>

        {/* Login Method Tabs */}
        {isLogin && (
          <div className="login-tabs">
            <button
              className={`tab-button ${loginMethod === 'password' ? 'active' : ''}`}
              onClick={() => setLoginMethod('password')}
            >
              Password
            </button>
            <div className="tab-divider"></div>
            <button
              className={`tab-button ${loginMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setLoginMethod('phone')}
            >
              Phone Number
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <span>✅</span>
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {loginError && (
          <div className="error-message">
            <span>⚠️</span>
            {loginError}
          </div>
        )}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="login-form">
            {loginMethod === 'password' ? (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`form-input ${errors.username ? 'error' : ''}`}
                    placeholder="Please enter your Phone or Email"
                  />
                  {errors.username && (
                    <div className="field-error">{errors.username}</div>
                  )}
                </div>

                <div className="form-group">
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Please enter your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="field-error">{errors.password}</div>
                  )}
                </div>

                <div className="forgot-password">
                  <button type="button">Forgot password?</button>
                </div>
              </>
            ) : (
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Please enter your phone number"
                />
                {errors.phone && (
                  <div className="field-error">{errors.phone}</div>
                )}
              </div>
            )}

            <button
              type="submit"
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>

            <div className="signup-link">
              Don't have an account? <button type="button" onClick={toggleMode}>Sign up</button>
            </div>

            <div className="divider">
              <span>Or, login with</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-button google">
                <span className="social-icon">G</span>
                Google
              </button>
              <button type="button" className="social-button facebook">
                <span className="social-icon">f</span>
                Facebook
              </button>
            </div>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <div className="field-error">{errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Choose a username"
              />
              {errors.username && (
                <div className="field-error">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <div className="field-error">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <div className="field-error">{errors.confirmPassword}</div>
              )}
            </div>

            <button
              type="submit"
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'SIGN UP'}
            </button>

            <div className="signup-link">
              Already have an account? <button type="button" onClick={toggleMode}>Sign in</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
