import React from 'react';

const GlobalIconExample = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, Poppins, sans-serif' }}>
      <h1 style={{ color: '#2E8B57', marginBottom: '2rem', textAlign: 'center' }}>
        <i className="fas fa-globe"></i> Global Google Fonts & Font Awesome Integration
      </h1>
      
      {/* Header Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-header"></i> Header Navigation Icons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-search"></i> Search
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-heart"></i> Wishlist
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-shopping-cart"></i> Cart
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-bars"></i> Menu
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </section>

      {/* Product Card Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-box"></i> Product Card Icons
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span>Rating:</span>
              <div>
                <i className="fas fa-star" style={{ color: '#FFD700' }}></i>
                <i className="fas fa-star" style={{ color: '#FFD700' }}></i>
                <i className="fas fa-star" style={{ color: '#FFD700' }}></i>
                <i className="fas fa-star" style={{ color: '#FFD700' }}></i>
                <i className="fas fa-star" style={{ color: '#FFD700' }}></i>
              </div>
            </div>
            <button style={{ width: '100%', padding: '0.5rem', border: '1px solid #2E8B57', borderRadius: '4px', background: '#2E8B57', color: 'white' }}>
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white', marginTop: '0.5rem' }}>
              <i className="fas fa-heart"></i> Add to Wishlist
            </button>
          </div>
        </div>
      </section>

      {/* Cart Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-shopping-cart"></i> Cart & Checkout Icons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-minus"></i> Quantity
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-plus"></i> Quantity
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-trash"></i> Remove
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #2E8B57', borderRadius: '4px', background: '#2E8B57', color: 'white' }}>
            <i className="fas fa-credit-card"></i> Checkout
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-arrow-left"></i> Continue Shopping
          </button>
        </div>
      </section>

      {/* Payment Method Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-credit-card"></i> Payment Method Icons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ border: '2px solid #2E8B57', borderRadius: '8px', padding: '1rem', background: '#f0f9f0', minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <i className="fas fa-credit-card" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}></i>
              <span style={{ fontWeight: '600' }}>Credit/Debit Card</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>Visa, Mastercard, American Express</p>
          </div>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: 'white', minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <i className="fas fa-money-bill-wave" style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}></i>
              <span style={{ fontWeight: '600' }}>Cash on Delivery</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>Pay when you receive</p>
          </div>
        </div>
      </section>

      {/* Status Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-info-circle"></i> Status & Information Icons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: '#10B981', color: 'white' }}>
            <i className="fas fa-check"></i> In Stock
          </span>
          <span style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: '#EF4444', color: 'white' }}>
            <i className="fas fa-times"></i> Out of Stock
          </span>
          <span style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: '#F59E0B', color: 'white' }}>
            <i className="fas fa-clock"></i> Pending
          </span>
          <span style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: '#3B82F6', color: 'white' }}>
            <i className="fas fa-info-circle"></i> Info
          </span>
        </div>
      </section>

      {/* Navigation Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-compass"></i> Navigation Icons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-arrow-left"></i> Previous
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #2E8B57', borderRadius: '4px', background: '#2E8B57', color: 'white' }}>
            Next <i className="fas fa-arrow-right"></i>
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #2E8B57', borderRadius: '4px', background: '#2E8B57', color: 'white' }}>
            <i className="fas fa-check"></i> Place Order
          </button>
        </div>
      </section>

      {/* Security Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-shield-alt"></i> Security & Trust Icons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#f8f9fa', border: '1px solid #ddd' }}>
            <i className="fas fa-lock"></i> Secure Checkout
          </span>
          <span style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#f8f9fa', border: '1px solid #ddd' }}>
            <i className="fas fa-credit-card"></i> Multiple Payment Options
          </span>
          <span style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: '#f8f9fa', border: '1px solid #ddd' }}>
            <i className="fas fa-undo"></i> Easy Returns
          </span>
        </div>
      </section>

      {/* Dashboard Icons */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-tachometer-alt"></i> Dashboard Icons
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-cog"></i> Admin Dashboard
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-store"></i> Seller Dashboard
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-truck"></i> Delivery Dashboard
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
            <i className="fas fa-shopping-cart"></i> My Orders
          </button>
        </div>
      </section>

      {/* Typography Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-font"></i> Google Fonts Typography
        </h2>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '800', color: '#2E8B57', marginBottom: '1rem' }}>
            Poppins Bold Heading
          </h1>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: '#2E8B57', marginBottom: '1rem' }}>
            Poppins Semi-Bold Subheading
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400', color: '#333', lineHeight: '1.6', marginBottom: '1rem' }}>
            Inter Regular Body Text - This is a sample paragraph using Inter font for body text. 
            It provides excellent readability and modern typography for web applications.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500', color: '#333', lineHeight: '1.6' }}>
            Inter Medium Text - This is medium weight text for emphasis and important information.
          </p>
        </div>
      </section>

      {/* Icon Reference */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2E8B57', marginBottom: '1rem' }}>
          <i className="fas fa-list"></i> Common Font Awesome Icons Reference
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {[
            { icon: 'fas fa-home', name: 'Home' },
            { icon: 'fas fa-user', name: 'User' },
            { icon: 'fas fa-cog', name: 'Settings' },
            { icon: 'fas fa-search', name: 'Search' },
            { icon: 'fas fa-plus', name: 'Add' },
            { icon: 'fas fa-edit', name: 'Edit' },
            { icon: 'fas fa-trash', name: 'Delete' },
            { icon: 'fas fa-download', name: 'Download' },
            { icon: 'fas fa-upload', name: 'Upload' },
            { icon: 'fas fa-save', name: 'Save' },
            { icon: 'fas fa-print', name: 'Print' },
            { icon: 'fas fa-share', name: 'Share' },
            { icon: 'fas fa-heart', name: 'Like' },
            { icon: 'fas fa-star', name: 'Star' },
            { icon: 'fas fa-bell', name: 'Notification' },
            { icon: 'fas fa-envelope', name: 'Email' },
            { icon: 'fas fa-phone', name: 'Phone' },
            { icon: 'fas fa-map-marker-alt', name: 'Location' },
            { icon: 'fas fa-calendar', name: 'Calendar' },
            { icon: 'fas fa-clock', name: 'Time' }
          ].map((item, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', background: 'white' }}>
              <i className={item.icon} style={{ fontSize: '2rem', color: '#2E8B57', marginBottom: '0.5rem', display: 'block' }}></i>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>{item.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GlobalIconExample;
