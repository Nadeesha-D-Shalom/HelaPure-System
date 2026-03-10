import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'fruits', name: 'Fresh Fruits', icon: '🍎' },
    { id: 'vegetables', name: 'Fresh Vegetables', icon: '🥬' },
    { id: 'dairy', name: 'Dairy Products', icon: '🥛' },
    { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'spices', name: 'Spices & Herbs', icon: '🌶️' },
    { id: 'organic', name: 'Organic Products', icon: '🌱' },
    { id: 'health', name: 'Health & Wellness', icon: '💊' },
    { id: 'household', name: 'Household Items', icon: '🏠' }
  ];

  const quickLinks = [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${categoryId}`);
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderBottom: '1px solid #e5e7eb', 
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '1.5rem 0'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem', 
          alignItems: 'center' 
        }}>
          {/* Search Bar */}
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              {/* Category Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowCategories(!showCategories)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem 1.5rem',
                    backgroundColor: '#f3f4f6',
                    border: '2px solid #d1d5db',
                    borderRight: 'none',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minWidth: '220px',
                    fontSize: '1rem',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                >
                  <span style={{ marginRight: '0.75rem', fontSize: '1.2rem' }}>
                    {selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.icon : '🛒'}
                  </span>
                  <span style={{ 
                    color: '#374151', 
                    fontSize: '1rem',
                    fontWeight: '500',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.name : 'Select Category'}
                  </span>
                  <span style={{ marginLeft: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>▼</span>
                </button>

                {/* Category Dropdown Menu */}
                {showCategories && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    marginTop: '0.25rem',
                    width: '280px',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                    zIndex: 50,
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '1rem 1.25rem',
                          textAlign: 'left',
                          backgroundColor: selectedCategory === category.id ? 'var(--deep-green)' : 'transparent',
                          color: selectedCategory === category.id ? 'white' : '#374151',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.95rem',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCategory !== category.id) {
                            e.target.style.backgroundColor = '#f9fafb';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCategory !== category.id) {
                            e.target.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span style={{ marginRight: '0.75rem', fontSize: '1.1rem' }}>{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, and more..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    border: '2px solid #d1d5db',
                    borderLeft: 'none',
                    borderRight: 'none',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--deep-green)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    height: '100%',
                    padding: '0 2rem',
                    backgroundColor: 'var(--deep-green)',
                    color: 'white',
                    border: 'none',
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#16a34a';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--deep-green)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  🔍
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Category Navigation */}
        <div style={{ 
          marginTop: '1.5rem', 
          display: 'none' 
        }} className="lg:block">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem', 
            overflowX: 'auto', 
            paddingBottom: '0.5rem' 
          }}>
            {categories.slice(0, 8).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedCategory === category.id ? 'var(--deep-green)' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : '#6b7280',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.color = 'var(--deep-green)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#6b7280';
                  }
                }}
              >
                <span style={{ marginRight: '0.5rem', fontSize: '1rem' }}>{category.icon}</span>
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setShowCategories(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#6b7280',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.color = 'var(--deep-green)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>➕</span>
              More Categories
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Category Navigation */}
      <div style={{ 
        display: 'block',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #e5e7eb'
      }} className="lg:hidden">
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0.75rem 1rem' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            overflowX: 'auto', 
            paddingBottom: '0.5rem' 
          }}>
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  backgroundColor: selectedCategory === category.id ? 'var(--deep-green)' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : '#6b7280',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = '#e5e7eb';
                    e.target.style.color = 'var(--deep-green)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#6b7280';
                  }
                }}
              >
                <span style={{ marginRight: '0.25rem', fontSize: '0.875rem' }}>{category.icon}</span>
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setShowCategories(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#6b7280',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb';
                e.target.style.color = 'var(--deep-green)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#6b7280';
              }}
            >
              <span style={{ marginRight: '0.25rem' }}>➕</span>
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
