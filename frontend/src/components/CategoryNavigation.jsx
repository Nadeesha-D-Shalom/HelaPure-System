import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryNavigation.css';

const CategoryNavigation = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 'honey',
      name: 'Honey & Sweeteners',
      icon: '🍯',
      subcategories: [
        { name: 'Raw Honey', count: 15 },
        { name: 'Organic Honey', count: 12 },
        { name: 'Flavored Honey', count: 8 },
        { name: 'Honey Products', count: 6 }
      ]
    },
    {
      id: 'oils',
      name: 'Cooking Oils',
      icon: '🫒',
      subcategories: [
        { name: 'Coconut Oil', count: 20 },
        { name: 'Olive Oil', count: 15 },
        { name: 'Sesame Oil', count: 10 },
        { name: 'Other Oils', count: 8 }
      ]
    },
    {
      id: 'spices',
      name: 'Spices & Herbs',
      icon: '🌶️',
      subcategories: [
        { name: 'Cinnamon', count: 12 },
        { name: 'Turmeric', count: 10 },
        { name: 'Black Pepper', count: 8 },
        { name: 'Mixed Spices', count: 15 }
      ]
    },
    {
      id: 'tea',
      name: 'Tea & Beverages',
      icon: '🍵',
      subcategories: [
        { name: 'Ceylon Tea', count: 25 },
        { name: 'Herbal Tea', count: 18 },
        { name: 'Green Tea', count: 12 },
        { name: 'Tea Accessories', count: 8 }
      ]
    },
    {
      id: 'nuts',
      name: 'Nuts & Seeds',
      icon: '🥜',
      subcategories: [
        { name: 'Cashews', count: 10 },
        { name: 'Almonds', count: 8 },
        { name: 'Pistachios', count: 6 },
        { name: 'Mixed Nuts', count: 12 }
      ]
    },
    {
      id: 'fruits',
      name: 'Dried Fruits',
      icon: '🍇',
      subcategories: [
        { name: 'Raisins', count: 8 },
        { name: 'Dates', count: 6 },
        { name: 'Mango', count: 10 },
        { name: 'Mixed Fruits', count: 5 }
      ]
    },
    {
      id: 'rice',
      name: 'Rice & Grains',
      icon: '🌾',
      subcategories: [
        { name: 'Basmati Rice', count: 15 },
        { name: 'Red Rice', count: 8 },
        { name: 'Quinoa', count: 6 },
        { name: 'Other Grains', count: 10 }
      ]
    },
    {
      id: 'snacks',
      name: 'Healthy Snacks',
      icon: '🥨',
      subcategories: [
        { name: 'Energy Bars', count: 12 },
        { name: 'Trail Mix', count: 8 },
        { name: 'Crackers', count: 6 },
        { name: 'Other Snacks', count: 10 }
      ]
    }
  ];

  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div className="category-navigation">
      <div className="category-container">
        <div className="category-header">
          <h3>Shop by Category</h3>
          <Link to="/categories" className="view-all-link">View All →</Link>
        </div>

        <div className="categories-grid">
          {categories.map(category => (
            <div
              key={category.id}
              className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
              onMouseEnter={() => handleCategoryHover(category.id)}
              onMouseLeave={handleCategoryLeave}
            >
              <Link to={`/category/${category.id}`} className="category-link">
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                  <h4 className="category-name">{category.name}</h4>
                  <span className="category-count">
                    {category.subcategories.reduce((total, sub) => total + sub.count, 0)} products
                  </span>
                </div>
              </Link>

              {activeCategory === category.id && (
                <div className="subcategory-dropdown">
                  <div className="subcategory-header">
                    <h5>{category.name}</h5>
                  </div>
                  <div className="subcategory-list">
                    {category.subcategories.map((subcategory, index) => (
                      <Link
                        key={index}
                        to={`/category/${category.id}/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="subcategory-item"
                      >
                        <span className="subcategory-name">{subcategory.name}</span>
                        <span className="subcategory-count">({subcategory.count})</span>
                      </Link>
                    ))}
                  </div>
                  <div className="subcategory-footer">
                    <Link to={`/category/${category.id}`} className="view-category-btn">
                      View All {category.name}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
