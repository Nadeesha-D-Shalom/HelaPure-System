import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdvancedButton from '../components/AdvancedButton';
import Modal from '../components/Modal';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('help-center');
  const [showChatModal, setShowChatModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [returnForm, setReturnForm] = useState({
    orderId: '',
    reason: '',
    description: '',
    email: ''
  });
  const [refundForm, setRefundForm] = useState({
    orderId: '',
    reason: '',
    amount: '',
    email: '',
    accountDetails: ''
  });

  const faqItems = [
    {
      category: 'General',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'Simply browse our products, add items to your cart, and proceed to checkout. You can pay using credit/debit cards or cash on delivery.'
        },
        {
          question: 'What are your delivery times?',
          answer: 'We deliver within 2-5 business days for most areas in Sri Lanka. Express delivery options are available for urgent orders.'
        },
        {
          question: 'Do you deliver to my area?',
          answer: 'We deliver to all major cities and towns in Sri Lanka. Enter your postal code during checkout to check delivery availability.'
        }
      ]
    },
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How can I track my order?',
          answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You will also receive SMS and email updates.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer support team.'
        },
        {
          question: 'What if my order is damaged?',
          answer: 'If your order arrives damaged, please contact us immediately with photos. We will arrange for a replacement or full refund.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most products. Items must be in original condition with packaging. Some items like perishables are not returnable.'
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'Refunds are typically processed within 3-5 business days after we receive the returned item. The money will be credited to your original payment method.'
        },
        {
          question: 'Can I return items without a receipt?',
          answer: 'Yes, if you have an account with us, we can look up your order history. Otherwise, please contact our support team for assistance.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      details: '+94 11 234 5678',
      action: 'Call Now'
    },
    {
      icon: '✉️',
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      details: 'support@helapure.com',
      action: 'Send Email'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      details: 'Available 9 AM - 6 PM',
      action: 'Start Chat'
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      description: 'Message us on WhatsApp for quick support',
      details: '+94 77 123 4567',
      action: 'WhatsApp'
    }
  ];

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    alert('Return request submitted successfully! We will contact you within 24 hours.');
    setReturnForm({
      orderId: '',
      reason: '',
      description: '',
      email: ''
    });
    setShowReturnModal(false);
  };

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    alert('Refund request submitted successfully! We will process your request within 3-5 business days.');
    setRefundForm({
      orderId: '',
      reason: '',
      amount: '',
      email: '',
      accountDetails: ''
    });
    setShowRefundModal(false);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      alert('Message sent! Our support team will respond shortly.');
      setChatMessage('');
      setShowChatModal(false);
    }
  };

  const tabs = [
    { id: 'help-center', label: 'Help Center', icon: '❓' },
    { id: 'contact', label: 'Contact Us', icon: '📞' },
    { id: 'returns', label: 'Returns', icon: '↩️' },
    { id: 'refunds', label: 'Refunds', icon: '💰' }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-light-cream">
        {/* Hero Section */}
        <div className="bg-gradient-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Help & Support</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We're here to help! Find answers to your questions or get in touch with our support team.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-lg p-1 shadow-sm">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md transition-all ${
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

            {/* Help Center Tab */}
            {activeTab === 'help-center' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-deep-green mb-4">Frequently Asked Questions</h2>
                  <p className="text-gray-600">Find quick answers to common questions</p>
                </div>

                <div className="space-y-8">
                  {faqItems.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold text-deep-green mb-4">{category.category}</h3>
                      <div className="space-y-4">
                        {category.questions.map((item, itemIndex) => (
                          <div key={itemIndex} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                            <p className="text-gray-600">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-deep-green mb-4">Contact Us</h2>
                  <p className="text-gray-600">Choose your preferred way to get in touch</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                      <div className="text-4xl mb-4">{method.icon}</div>
                      <h3 className="text-xl font-semibold text-deep-green mb-2">{method.title}</h3>
                      <p className="text-gray-600 mb-4">{method.description}</p>
                      <p className="text-sm text-gray-500 mb-4">{method.details}</p>
                      <AdvancedButton
                        variant="outline"
                        onClick={() => {
                          if (method.title === 'Live Chat') {
                            setShowChatModal(true);
                          } else {
                            alert(`${method.title} feature will be available soon!`);
                          }
                        }}
                      >
                        {method.action}
                      </AdvancedButton>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Returns Tab */}
            {activeTab === 'returns' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-deep-green mb-4">Return Policy</h2>
                  <p className="text-gray-600">Need to return an item? We're here to help</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-deep-green mb-4">Return Information</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li>• 30-day return policy for most items</li>
                        <li>• Items must be in original condition</li>
                        <li>• Original packaging required</li>
                        <li>• Perishable items are not returnable</li>
                        <li>• Free return shipping for defective items</li>
                        <li>• Refund processed within 3-5 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-deep-green mb-4">Start Your Return</h3>
                      <p className="text-gray-600 mb-4">
                        Fill out the return form and we'll guide you through the process.
                      </p>
                      <AdvancedButton
                        variant="primary"
                        onClick={() => setShowReturnModal(true)}
                        icon="↩️"
                      >
                        Request Return
                      </AdvancedButton>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Refunds Tab */}
            {activeTab === 'refunds' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-deep-green mb-4">Refund Policy</h2>
                  <p className="text-gray-600">Request a refund for your purchase</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-deep-green mb-4">Refund Information</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li>• Full refund for defective items</li>
                        <li>• Partial refund for minor issues</li>
                        <li>• Refund to original payment method</li>
                        <li>• Processing time: 3-5 business days</li>
                        <li>• Bank transfer refunds: 5-7 business days</li>
                        <li>• Contact us for special circumstances</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-deep-green mb-4">Request Refund</h3>
                      <p className="text-gray-600 mb-4">
                        Submit a refund request and we'll process it quickly.
                      </p>
                      <AdvancedButton
                        variant="primary"
                        onClick={() => setShowRefundModal(true)}
                        icon="💰"
                      >
                        Request Refund
                      </AdvancedButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <Modal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        title="Live Chat Support"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Support Agent:</strong> Hello! How can I help you today?
            </p>
          </div>
          
          <form onSubmit={handleChatSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
                  placeholder="Type your message here..."
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <AdvancedButton
                  variant="outline"
                  onClick={() => setShowChatModal(false)}
                >
                  Cancel
                </AdvancedButton>
                <AdvancedButton
                  type="submit"
                  variant="primary"
                >
                  Send Message
                </AdvancedButton>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Return Modal */}
      <Modal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        title="Request Return"
        size="md"
      >
        <form onSubmit={handleReturnSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order ID *
            </label>
            <input
              type="text"
              value={returnForm.orderId}
              onChange={(e) => setReturnForm({...returnForm, orderId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter your order ID"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Return *
            </label>
            <select
              value={returnForm.reason}
              onChange={(e) => setReturnForm({...returnForm, reason: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              required
            >
              <option value="">Select reason</option>
              <option value="defective">Item is defective</option>
              <option value="wrong-item">Wrong item received</option>
              <option value="not-as-described">Not as described</option>
              <option value="changed-mind">Changed mind</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={returnForm.description}
              onChange={(e) => setReturnForm({...returnForm, description: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Please describe the issue..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={returnForm.email}
              onChange={(e) => setReturnForm({...returnForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <AdvancedButton
              variant="outline"
              onClick={() => setShowReturnModal(false)}
            >
              Cancel
            </AdvancedButton>
            <AdvancedButton
              type="submit"
              variant="primary"
            >
              Submit Request
            </AdvancedButton>
          </div>
        </form>
      </Modal>

      {/* Refund Modal */}
      <Modal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        title="Request Refund"
        size="md"
      >
        <form onSubmit={handleRefundSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order ID *
            </label>
            <input
              type="text"
              value={refundForm.orderId}
              onChange={(e) => setRefundForm({...refundForm, orderId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Enter your order ID"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refund Amount *
            </label>
            <input
              type="number"
              step="0.01"
              value={refundForm.amount}
              onChange={(e) => setRefundForm({...refundForm, amount: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Refund *
            </label>
            <select
              value={refundForm.reason}
              onChange={(e) => setRefundForm({...refundForm, reason: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              required
            >
              <option value="">Select reason</option>
              <option value="defective">Item is defective</option>
              <option value="not-delivered">Item not delivered</option>
              <option value="wrong-item">Wrong item received</option>
              <option value="cancelled">Order cancelled</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={refundForm.email}
              onChange={(e) => setRefundForm({...refundForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Details for Refund
            </label>
            <textarea
              value={refundForm.accountDetails}
              onChange={(e) => setRefundForm({...refundForm, accountDetails: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-green"
              placeholder="Bank account details or payment method for refund"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <AdvancedButton
              variant="outline"
              onClick={() => setShowRefundModal(false)}
            >
              Cancel
            </AdvancedButton>
            <AdvancedButton
              type="submit"
              variant="primary"
            >
              Submit Request
            </AdvancedButton>
          </div>
        </form>
      </Modal>

      <Footer />
    </>
  );
};

export default HelpSupport;

