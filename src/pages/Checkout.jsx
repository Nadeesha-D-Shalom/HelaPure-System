import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Sri Lanka',
    
    // Payment Information
    paymentMethod: 'card', // card, cod
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Redirect to cart if no items
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getShippingFee = () => {
    return 5.00; // Standard shipping fee
  };

  const getCODFee = () => {
    return formData.paymentMethod === 'cod' ? 50.00 : 0; // COD handling fee
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getShippingFee() + getCODFee();
  };

  // Redirect to login if user is not authenticated
  if (!user) {
    return (
      <>
        <Header />
        <div style={{ padding: '2rem', backgroundColor: 'var(--light-cream)', minHeight: '80vh' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ 
              background: 'white', 
              padding: '3rem 2rem', 
              borderRadius: '12px', 
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                <i className="fas fa-lock"></i>
              </div>
              <h2 style={{ color: 'var(--dark-brown)', marginBottom: '1rem', fontSize: '2rem' }}>
                Login Required
              </h2>
              <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                You need to be logged in to proceed with checkout.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    background: 'var(--deep-green)',
                    color: 'white',
                    border: '2px solid var(--deep-green)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    padding: '0.75rem 2rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    background: 'transparent',
                    color: 'var(--deep-green)',
                    border: '2px solid var(--deep-green)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // const getTotalItems = () => {
  //   return formData.items.reduce((total, item) => total + item.quantity, 0);
  // };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateOrderId = () => {
    return 'ORD-' + Date.now().toString().slice(-6);
  };

  // const generateTrackingNumber = () => {
  //   return 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  // };

  const handleSubmitOrder = () => {
    // Create order object
    const order = {
      id: generateOrderId(),
      status: 'pending',
      totalAmount: getFinalTotal(),
      paymentMethod: formData.paymentMethod,
      paymentDetails: {
        method: formData.paymentMethod,
        cardNumber: formData.paymentMethod === 'card' ? formData.cardNumber : null,
        cardName: formData.paymentMethod === 'card' ? formData.cardName : null,
        expiryDate: formData.paymentMethod === 'card' ? formData.expiryDate : null,
        cvv: formData.paymentMethod === 'card' ? formData.cvv : null
      },
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      trackingNumber: null, // Will be generated when order is confirmed
      items: cartItems,
      fees: {
        subtotal: getTotalPrice(),
        shipping: getShippingFee(),
        codFee: getCODFee(),
        total: getFinalTotal()
      },
      customerInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      }
    };

    // Add order using context
    const newOrder = addOrder(order);

    // Clear cart after successful order
    clearCart();

    // Order submitted successfully
    
    // Show different messages based on payment method
    let successMessage = `Order placed successfully! Your order ID is ${newOrder.id}.`;
    
    if (formData.paymentMethod === 'cod') {
      successMessage += ` You will pay Rs. ${getFinalTotal().toFixed(2)} when your order is delivered.`;
    } else {
      successMessage += ` Your payment has been processed successfully.`;
    }
    
    successMessage += ` You will receive a confirmation email shortly.`;
    
    alert(successMessage);
    navigate('/my-orders');
  };

  const renderStepIndicator = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
      {[1, 2, 3].map(step => (
        <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step <= currentStep ? 'var(--deep-green)' : 'var(--earthy-tan)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              margin: '0 0.5rem'
            }}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              style={{
                width: '50px',
                height: '2px',
                background: step < currentStep ? 'var(--deep-green)' : 'var(--earthy-tan)',
                margin: '0 0.5rem'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderShippingForm = () => (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--earthy-tan)' }}>
      <h3 style={{ color: 'var(--deep-green)', marginBottom: '1.5rem' }}>Shipping Information</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--earthy-tan)',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--earthy-tan)',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--earthy-tan)',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--earthy-tan)',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>Address *</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid var(--earthy-tan)',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--earthy-tan)',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--earthy-tan)',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>ZIP Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--earthy-tan)',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--earthy-tan)' }}>
      <h3 style={{ color: 'var(--deep-green)', marginBottom: '1.5rem' }}>Payment Method</h3>
      
      {/* Payment Method Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: 'var(--dark-brown)', marginBottom: '1rem', fontSize: '1.1rem' }}>Choose Payment Method:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          
          {/* Credit/Debit Card */}
          <div 
            style={{
              border: formData.paymentMethod === 'card' ? '2px solid var(--deep-green)' : '1px solid var(--earthy-tan)',
              borderRadius: '8px',
              padding: '1rem',
              cursor: 'pointer',
              backgroundColor: formData.paymentMethod === 'card' ? '#f0f9f0' : 'white',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <i className="fas fa-credit-card" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}></i>
              <span style={{ fontWeight: '600', color: 'var(--dark-brown)' }}>Credit/Debit Card</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>Visa, Mastercard, American Express</p>
          </div>


          {/* Cash on Delivery */}
          <div 
            style={{
              border: formData.paymentMethod === 'cod' ? '2px solid var(--deep-green)' : '1px solid var(--earthy-tan)',
              borderRadius: '8px',
              padding: '1rem',
              cursor: 'pointer',
              backgroundColor: formData.paymentMethod === 'cod' ? '#f0f9f0' : 'white',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <i className="fas fa-money-bill-wave" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}></i>
              <span style={{ fontWeight: '600', color: 'var(--dark-brown)' }}>Cash on Delivery</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>Pay when you receive</p>
          </div>
        </div>
      </div>

      {/* Payment Details Based on Selected Method */}
      {formData.paymentMethod === 'card' && (
        <div>
          <h4 style={{ color: 'var(--dark-brown)', marginBottom: '1rem' }}>Card Details</h4>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--earthy-tan)',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>Expiry Date *</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--earthy-tan)',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>CVV *</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--earthy-tan)',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark-brown)' }}>Name on Card *</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--earthy-tan)',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      )}


      {formData.paymentMethod === 'cod' && (
        <div>
          <h4 style={{ color: 'var(--dark-brown)', marginBottom: '1rem' }}>Cash on Delivery</h4>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            border: '1px solid #e9ecef',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
            <h5 style={{ color: 'var(--deep-green)', marginBottom: '0.5rem' }}>Pay When You Receive</h5>
            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
              You can pay with cash when your order is delivered. 
              Please have the exact amount ready for the delivery person.
            </p>
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              background: '#fff3cd', 
              borderRadius: '4px',
              border: '1px solid #ffeaa7'
            }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#856404' }}>
                <strong>Note:</strong> A small handling fee of Rs. 50 will be added for cash on delivery orders.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrderSummary = () => (
    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--earthy-tan)' }}>
      <h3 style={{ color: 'var(--deep-green)', marginBottom: '1.5rem' }}>Order Summary</h3>
      
      {/* Payment Method Display */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1rem', 
        borderRadius: '6px', 
        marginBottom: '1.5rem',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
            {formData.paymentMethod === 'card' && '💳'}
            {formData.paymentMethod === 'cod' && '💰'}
          </span>
          <span style={{ fontWeight: '600', color: 'var(--dark-brown)' }}>
            {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
            {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
          </span>
        </div>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--dark-brown)' }}>
              {item.name} x {item.quantity}
            </span>
            <span style={{ color: 'var(--earthy-tan)', fontWeight: 'bold' }}>
              Rs. {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      <div style={{ borderTop: '1px solid var(--earthy-tan)', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--dark-brown)' }}>Subtotal:</span>
          <span style={{ color: 'var(--dark-brown)' }}>Rs. {getTotalPrice().toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: 'var(--dark-brown)' }}>Shipping:</span>
          <span style={{ color: 'var(--dark-brown)' }}>Rs. {getShippingFee().toFixed(2)}</span>
        </div>
        {getCODFee() > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--dark-brown)' }}>COD Fee:</span>
            <span style={{ color: 'var(--dark-brown)' }}>Rs. {getCODFee().toFixed(2)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid var(--earthy-tan)', paddingTop: '0.5rem' }}>
          <span style={{ color: 'var(--deep-green)' }}>Total:</span>
          <span style={{ color: 'var(--deep-green)' }}>Rs. {getFinalTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div style={{ padding: '2rem', backgroundColor: 'var(--light-cream)', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--deep-green)', textAlign: 'center', marginBottom: '2rem' }}>
            Checkout
          </h2>
          
          {renderStepIndicator()}
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div>
              {currentStep === 1 && renderShippingForm()}
              {currentStep === 2 && renderPaymentForm()}
              {currentStep === 3 && (
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--earthy-tan)', textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--deep-green)', marginBottom: '1rem' }}>Review & Place Order</h3>
                  <p style={{ color: 'var(--dark-brown)', marginBottom: '2rem' }}>
                    Please review your order details and click "Place Order" to complete your purchase.
                  </p>
                  <button
                    onClick={handleSubmitOrder}
                    style={{
                      background: 'var(--deep-green)',
                      color: 'var(--light-cream)',
                      border: 'none',
                      padding: '1rem 3rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    <i className="fas fa-check"></i> Place Order
                  </button>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    style={{
                      background: 'transparent',
                      color: 'var(--deep-green)',
                      border: '2px solid var(--deep-green)',
                      padding: '1rem 2rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    <i className="fas fa-arrow-left"></i> Previous
                  </button>
                )}
                {currentStep < 3 && (
                  <button
                    onClick={handleNext}
                    style={{
                      background: 'var(--deep-green)',
                      color: 'var(--light-cream)',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      marginLeft: 'auto'
                    }}
                  >
                    Next <i className="fas fa-arrow-right"></i>
                  </button>
                )}
              </div>
            </div>
            
            <div>
              {renderOrderSummary()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
