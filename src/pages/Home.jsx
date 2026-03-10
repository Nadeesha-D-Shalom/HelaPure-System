import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CategoryNavigation from '../components/CategoryNavigation';
import Newsletter from '../components/Newsletter';
import LiveChat from '../components/LiveChat';
import { dummyProducts } from '../data/products';

// Banner images for future carousel implementation
// const bannerImages = [
//   {
//     id: 1,
//     image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzJFOEI1NyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5PcmdhbmljIFByb2R1Y3RzIFNhbGU8L3RleHQ+PC9zdmc+',
//     title: 'Organic Products Sale',
//     subtitle: 'Up to 50% off on all organic items',
//     buttonText: 'Shop Now'
//   },
//   {
//     id: 2,
//     image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzg0NDUxMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TcGljZXMgQ29sbGVjdGlvbjwvdGV4dD48L3N2Zz4=',
//     title: 'Premium Spices Collection',
//     subtitle: 'Authentic Sri Lankan spices at best prices',
//     buttonText: 'Explore'
//   },
//   {
//     id: 3,
//     image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyOEIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GcmVzaCBWZWdldGFibGVzPC90ZXh0Pjwvc3ZnPg==',
//     title: 'Fresh Vegetables',
//     subtitle: 'Farm-fresh vegetables delivered daily',
//     buttonText: 'Order Now'
//   }
// ];

const categories = [
  { id: 'fruits', name: 'Fresh Fruits', icon: '🍎', color: 'bg-red-100 text-red-600' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥬', color: 'bg-green-100 text-green-600' },
  { id: 'dairy', name: 'Dairy Products', icon: '🥛', color: 'bg-blue-100 text-blue-600' },
  { id: 'meat', name: 'Meat & Seafood', icon: '🥩', color: 'bg-orange-100 text-orange-600' },
  { id: 'spices', name: 'Spices & Herbs', icon: '🌶️', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'organic', name: 'Organic Products', icon: '🌱', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'beverages', name: 'Beverages', icon: '🥤', color: 'bg-purple-100 text-purple-600' },
  { id: 'snacks', name: 'Snacks', icon: '🍿', color: 'bg-pink-100 text-pink-600' }
];

const Home = () => {
  return (
    <>
      <Header />
      
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--deep-green) 0%, var(--earthy-tan) 100%)',
          padding: '4rem 0',
          marginBottom: '2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <h1 style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
            Welcome to HelaPure
          </h1>
              <p style={{ 
                fontSize: '1.5rem', 
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
                Discover the finest natural and organic products from Sri Lanka
          </p>
          <button style={{
                backgroundColor: 'white',
            color: 'var(--deep-green)',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
              >
            Shop Now
          </button>
            </div>
          </div>
        </div>


        {/* Categories Section */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem 0',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ 
              textAlign: 'center', 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: 'var(--dark-brown)',
              marginBottom: '2rem'
            }}>
              Shop by Category
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.5rem 1rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    backgroundColor: '#f8f9fa',
                    color: 'var(--dark-brown)',
                    border: '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--earthy-tan)';
                    e.target.style.borderColor = 'var(--deep-green)';
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '3rem 0',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '2rem' 
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: 'var(--dark-brown)' 
              }}>
                Featured Products
              </h2>
              <button style={{
                color: 'var(--deep-green)',
                fontWeight: '600',
                background: 'none',
                border: '2px solid var(--deep-green)',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--deep-green)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--deep-green)';
              }}
              >
                View All
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {dummyProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Best Sellers */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '3rem 0',
          marginBottom: '2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '2rem' 
            }}>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: 'var(--dark-brown)' 
              }}>
                Best Sellers
              </h2>
              <button style={{
                color: 'var(--deep-green)',
                fontWeight: '600',
                background: 'none',
                border: '2px solid var(--deep-green)',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--deep-green)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--deep-green)';
              }}
              >
                View All
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {dummyProducts.filter(p => p.badge === 'Best Seller').concat(dummyProducts.filter(p => !p.badge).slice(0, 2)).map((product, index) => (
                <ProductCard key={`best-seller-${product.id}-${index}`} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Flash Sale */}
        <div style={{ 
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          padding: '3rem 0',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '2rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#ef4444', fontSize: '2rem', marginRight: '1rem' }}>⚡</span>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: 'var(--dark-brown)',
                  marginRight: '1rem'
                }}>
                  Flash Sale
                </h2>
                <div style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  animation: 'pulse 2s infinite'
                }}>
                  Ends in 2h 30m
                </div>
              </div>
              <button style={{
                color: 'var(--deep-green)',
                fontWeight: '600',
                background: 'none',
                border: '2px solid var(--deep-green)',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--deep-green)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--deep-green)';
              }}
              >
                View All
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {dummyProducts.filter(p => p.badge === 'Flash Sale').concat(dummyProducts.filter(p => p.discount > 20).slice(0, 3)).map((product, index) => (
                <ProductCard key={`flash-sale-${product.id}-${index}`} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* New Arrivals */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '3rem 0',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '2rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#3b82f6', fontSize: '2rem', marginRight: '1rem' }}>✨</span>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: 'var(--dark-brown)' 
                }}>
                  New Arrivals
                </h2>
              </div>
              <button style={{
                color: 'var(--deep-green)',
                fontWeight: '600',
                background: 'none',
                border: '2px solid var(--deep-green)',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--deep-green)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--deep-green)';
              }}
              >
                View All
              </button>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {dummyProducts.filter(p => p.badge === 'New').concat(dummyProducts.filter(p => !p.badge).slice(0, 4)).map((product, index) => (
                <ProductCard key={`new-arrival-${product.id}-${index}`} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews & Testimonials */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '4rem 0',
          marginBottom: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              color: 'var(--dark-brown)', 
              marginBottom: '3rem' 
            }}>
              What Our Customers Say
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem' 
            }}>
              {/* Review 1 */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--deep-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginRight: '1rem'
                  }}>
                    S
                  </div>
                  <div>
                    <h4 style={{ 
                      margin: '0 0 0.25rem 0', 
                      color: 'var(--dark-brown)',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>
                      Sarah Johnson
                    </h4>
                    <div style={{ display: 'flex', color: '#fbbf24', fontSize: '0.9rem' }}>
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6',
                  fontSize: '1rem',
                  margin: '0',
                  fontStyle: 'italic'
                }}>
                  "HelaPure has completely transformed my shopping experience. The organic products are fresh, authentic, and delivered right to my doorstep. I love knowing I'm supporting local Sri Lankan farmers!"
                </p>
              </div>

              {/* Review 2 */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--earthy-tan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginRight: '1rem'
                  }}>
                    M
                  </div>
                  <div>
                    <h4 style={{ 
                      margin: '0 0 0.25rem 0', 
                      color: 'var(--dark-brown)',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>
                      Michael Chen
                    </h4>
                    <div style={{ display: 'flex', color: '#fbbf24', fontSize: '0.9rem' }}>
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6',
                  fontSize: '1rem',
                  margin: '0',
                  fontStyle: 'italic'
                }}>
                  "The quality of spices and herbs from HelaPure is exceptional. As a chef, I appreciate the authentic flavors and the fact that everything is sourced directly from local producers. Highly recommended!"
                </p>
              </div>

              {/* Review 3 */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginRight: '1rem'
                  }}>
                    A
                  </div>
                  <div>
                    <h4 style={{ 
                      margin: '0 0 0.25rem 0', 
                      color: 'var(--dark-brown)',
                      fontSize: '1.1rem',
                      fontWeight: '600'
                    }}>
                      Aisha Rahman
                    </h4>
                    <div style={{ display: 'flex', color: '#fbbf24', fontSize: '0.9rem' }}>
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
                <p style={{ 
                  color: '#6b7280', 
                  lineHeight: '1.6',
                  fontSize: '1rem',
                  margin: '0',
                  fontStyle: 'italic'
                }}>
                  "I've been shopping with HelaPure for over a year now. Their customer service is outstanding, and the products always arrive fresh and well-packaged. It's my go-to place for organic groceries!"
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '3rem' 
            }}>
              <button style={{
                backgroundColor: 'var(--deep-green)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '25px',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#16a34a';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--deep-green)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
              >
                Read More Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Why Choose HelaPure */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--light-cream) 0%, #f0f9ff 100%)',
          padding: '4rem 0',
          marginBottom: '2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              color: 'var(--dark-brown)', 
              marginBottom: '3rem' 
            }}>
              Why Choose HelaPure?
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '3rem' 
            }}>
                <div style={{ 
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🌿</div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  color: 'var(--deep-green)', 
                  marginBottom: '1rem' 
                }}>100% Organic</h3>
                <p style={{ 
                  color: 'var(--dark-brown)', 
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>
                  All our products are certified organic and free from harmful chemicals.
                </p>
              </div>
                <div style={{ 
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏠</div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  color: 'var(--deep-green)', 
                  marginBottom: '1rem' 
                }}>Local Sourced</h3>
                <p style={{ 
                  color: 'var(--dark-brown)', 
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>
                  Directly sourced from local farmers and producers across Sri Lanka.
                </p>
              </div>
                <div style={{ 
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🚚</div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  color: 'var(--deep-green)', 
                  marginBottom: '1rem' 
                }}>Fast Delivery</h3>
                <p style={{ 
                  color: 'var(--dark-brown)', 
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>
                  Quick and reliable delivery to your doorstep across the island.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNavigation />

      {/* Newsletter Section */}
      <Newsletter />
      
      <Footer />
      <LiveChat />
    </>
  );
};

export default Home;
    