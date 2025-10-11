import React from 'react';

const OrderTracker = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'confirmed':
        return '#3498db';
      case 'processing':
        return '#9b59b6';
      case 'shipped':
        return '#e67e22';
      case 'delivered':
        return '#27ae60';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'processing':
        return '🔄';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '📦';
      case 'cancelled':
        return '❌';
      default:
        return '❓';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'pending':
        return 20;
      case 'confirmed':
        return 40;
      case 'processing':
        return 60;
      case 'shipped':
        return 80;
      case 'delivered':
        return 100;
      case 'cancelled':
        return 0;
      default:
        return 0;
    }
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid var(--earthy-tan)',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ color: 'var(--deep-green)', margin: 0 }}>
          Order #{order.id}
        </h3>
        <div style={{
          background: getStatusColor(order.status),
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>{getStatusIcon(order.status)}</span>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          width: '100%',
          height: '8px',
          background: '#ecf0f1',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: `${getProgressPercentage(order.status)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--deep-green), var(--earthy-tan))',
            transition: 'width 0.3s ease'
          }} />
        </div>
        
        {/* Status Steps */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {statusSteps.map((step, index) => (
            <div key={step.key} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: index <= currentStepIndex ? getStatusColor(order.status) : '#ecf0f1',
                color: index <= currentStepIndex ? 'white' : '#bdc3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {index + 1}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: index <= currentStepIndex ? 'var(--deep-green)' : '#bdc3c7',
                fontWeight: index <= currentStepIndex ? 'bold' : 'normal'
              }}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <strong style={{ color: 'var(--dark-brown)' }}>Order Date:</strong>
          <p style={{ margin: '0.25rem 0', color: 'var(--dark-brown)' }}>
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <strong style={{ color: 'var(--dark-brown)' }}>Total Amount:</strong>
          <p style={{ margin: '0.25rem 0', color: 'var(--deep-green)', fontWeight: 'bold' }}>
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>
        <div>
          <strong style={{ color: 'var(--dark-brown)' }}>Shipping Address:</strong>
          <p style={{ margin: '0.25rem 0', color: 'var(--dark-brown)' }}>
            {order.shippingAddress}
          </p>
        </div>
        <div>
          <strong style={{ color: 'var(--dark-brown)' }}>Estimated Delivery:</strong>
          <p style={{ margin: '0.25rem 0', color: 'var(--dark-brown)' }}>
            {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'TBD'}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <strong style={{ color: 'var(--dark-brown)', marginBottom: '0.5rem', display: 'block' }}>
          Order Items:
        </strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {order.items.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem',
              background: 'var(--light-cream)',
              borderRadius: '4px'
            }}>
              <span style={{ color: 'var(--dark-brown)' }}>
                {item.quantity}x {item.name}
              </span>
              <span style={{ color: 'var(--deep-green)', fontWeight: 'bold' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tracking Information */}
      {order.trackingNumber && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'var(--light-cream)',
          borderRadius: '4px',
          border: '1px solid var(--earthy-tan)'
        }}>
          <strong style={{ color: 'var(--dark-brown)' }}>Tracking Number:</strong>
          <p style={{ 
            margin: '0.25rem 0', 
            color: 'var(--deep-green)', 
            fontWeight: 'bold',
            fontFamily: 'monospace',
            fontSize: '1.1rem'
          }}>
            {order.trackingNumber}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;

