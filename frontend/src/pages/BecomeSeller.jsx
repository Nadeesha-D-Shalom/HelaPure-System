import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdvancedButton from '../components/AdvancedButton';
import Modal from '../components/Modal';

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    description: '',
    website: '',
    experience: '',
    products: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.contactPerson) {
      newErrors.contactPerson = 'Contact person name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address) {
      newErrors.address = 'Business address is required';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    if (!formData.description) {
      newErrors.description = 'Business description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      alert('Application submitted successfully! Our team will review your application and contact you within 2-3 business days.');
      setFormData({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        businessType: '',
        description: '',
        website: '',
        experience: '',
        products: ''
      });
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const benefits = [
    {
      icon: '📈',
      title: 'Increase Sales',
      description: 'Reach thousands of customers and grow your business'
    },
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Get paid safely and on time with our secure payment system'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Track your sales, orders, and performance with detailed analytics'
    },
    {
      icon: '🚚',
      title: 'Delivery Support',
      description: 'We handle delivery logistics so you can focus on your products'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team'
    },
    {
      icon: '🎯',
      title: 'Marketing Tools',
      description: 'Promote your products with our built-in marketing features'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-light-cream">
        {/* Hero Section */}
        <div className="bg-gradient-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Seller on HelaPure</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of sellers who trust HelaPure to grow their business. 
              Sell your natural and organic products to customers across Sri Lanka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AdvancedButton
                variant="secondary"
                size="lg"
                onClick={handleLoginClick}
                icon="🔑"
              >
                Already a Seller? Sign In
              </AdvancedButton>
              <AdvancedButton
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' })}
                icon="📝"
              >
                Apply Now
              </AdvancedButton>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-deep-green mb-4">Why Choose HelaPure?</h2>
              <p className="text-gray-600 text-lg">Everything you need to succeed as a seller</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-deep-green mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-deep-green mb-4">Apply to Become a Seller</h2>
                <p className="text-gray-600 text-lg">Fill out the form below and our team will review your application</p>
              </div>

              <div className="bg-light-cream rounded-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green ${
                          errors.businessName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your business name"
                      />
                      {errors.businessName && (
                        <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green ${
                          errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.contactPerson && (
                        <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="business@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+94 77 123 4567"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your complete business address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type *
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green ${
                          errors.businessType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select business type</option>
                        <option value="individual">Individual Seller</option>
                        <option value="small-business">Small Business</option>
                        <option value="medium-business">Medium Business</option>
                        <option value="large-business">Large Business</option>
                        <option value="cooperative">Cooperative</option>
                      </select>
                      {errors.businessType && (
                        <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us about your business, products, and why you want to join HelaPure"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green"
                      >
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Products You Plan to Sell
                      </label>
                      <input
                        type="text"
                        name="products"
                        value={formData.products}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deep-green"
                        placeholder="e.g., Organic honey, spices, tea"
                      />
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <AdvancedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      icon="📝"
                    >
                      Submit Application
                    </AdvancedButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Seller Login"
        size="md"
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Your Seller Dashboard</h3>
            <p className="text-gray-600">Sign in to manage your products, orders, and business</p>
          </div>
          
          <div className="space-y-4">
            <AdvancedButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => {
                setShowLoginModal(false);
                navigate('/login');
              }}
              icon="🔑"
            >
              Go to Login Page
            </AdvancedButton>
            
            <p className="text-sm text-gray-500">
              Don't have an account? <Link to="/login" className="text-deep-green hover:underline">Register here</Link>
            </p>
          </div>
        </div>
      </Modal>

      <Footer />
    </>
  );
};

export default BecomeSeller;

