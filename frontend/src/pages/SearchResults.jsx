import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    sortBy: 'relevance'
  });

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  // Mock products data (in real app, this would come from API)
  const allProducts = [
    { 
      id: 1, 
      name: 'Organic Honey', 
      price: 25, 
      originalPrice: 30,
      discount: 17,
      image: 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Honey',
      description: 'Pure, raw organic honey from local beekeepers',
      rating: 4.5,
      reviews: 128,
      category: 'organic',
      badge: 'Best Seller'
    },
    { 
      id: 2, 
      name: 'Natural Coconut Oil', 
      price: 15, 
      originalPrice: 20,
      discount: 25,
      image: 'https://via.placeholder.com/200x200/DEB887/000000?text=Coconut+Oil',
      description: 'Cold-pressed virgin coconut oil for cooking and beauty',
      rating: 4.3,
      reviews: 95,
      category: 'dairy',
      badge: 'Flash Sale'
    },
    { 
      id: 3, 
      name: 'Organic Turmeric Powder', 
      price: 12, 
      originalPrice: 15,
      discount: 20,
      image: 'https://via.placeholder.com/200x200/FFD700/000000?text=Turmeric',
      description: 'Pure turmeric powder with anti-inflammatory properties',
      rating: 4.7,
      reviews: 203,
      category: 'spices',
      badge: 'New'
    },
    { 
      id: 4, 
      name: 'Cinnamon Sticks', 
      price: 8, 
      originalPrice: 10,
      discount: 20,
      image: 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Cinnamon',
      description: 'Premium Ceylon cinnamon sticks for authentic flavor',
      rating: 4.4,
      reviews: 87,
      category: 'spices'
    },
    { 
      id: 5, 
      name: 'Cardamom Pods', 
      price: 18, 
      originalPrice: 22,
      discount: 18,
      image: 'https://via.placeholder.com/200x200/90EE90/000000?text=Cardamom',
      description: 'Fresh green cardamom pods for aromatic cooking',
      rating: 4.6,
      reviews: 156,
      category: 'spices'
    },
    { 
      id: 6, 
      name: 'Black Pepper', 
      price: 10, 
      originalPrice: 12,
      discount: 17,
      image: 'https://via.placeholder.com/200x200/000000/FFFFFF?text=Pepper',
      description: 'Whole black peppercorns for maximum flavor',
      rating: 4.2,
      reviews: 74,
      category: 'spices'
    },
    { 
      id: 7, 
      name: 'Fresh Mangoes', 
      price: 8, 
      originalPrice: 12,
      discount: 33,
      image: 'https://via.placeholder.com/200x200/FFD700/000000?text=Mango',
      description: 'Sweet and juicy Sri Lankan mangoes',
      rating: 4.8,
      reviews: 312,
      category: 'fruits',
      badge: 'Hot Deal'
    },
    { 
      id: 8, 
      name: 'Organic Rice', 
      price: 35, 
      originalPrice: 40,
      discount: 13,
      image: 'https://via.placeholder.com/200x200/F5DEB3/000000?text=Rice',
      description: 'Premium organic red rice from hill country',
      rating: 4.5,
      reviews: 189,
      category: 'groceries'
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredProducts = allProducts;
      
      // Filter by search query
      if (query) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Filter by category
      if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
          product.category === category
        );
      }
      
      // Apply additional filters
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
          if (max) {
            return product.price >= min && product.price <= max;
          }
          return product.price >= min;
        });
      }
      
      if (filters.rating) {
        filteredProducts = filteredProducts.filter(product =>
          product.rating >= Number(filters.rating)
        );
      }
      
      // Sort products
      switch (filters.sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
        default:
          // Keep original order for relevance
          break;
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [query, category, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'organic', name: 'Organic Products' },
    { id: 'spices', name: 'Spices & Herbs' },
    { id: 'fruits', name: 'Fresh Fruits' },
    { id: 'dairy', name: 'Dairy Products' },
    { id: 'groceries', name: 'Groceries' }
  ];

  return (
    <>
      <Header />
      <SearchBar />
      
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={cat.id}
                          checked={filters.category === cat.id}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Under Rs. 10', value: '0-10' },
                      { label: 'Rs. 10 - Rs. 20', value: '10-20' },
                      { label: 'Rs. 20 - Rs. 30', value: '20-30' },
                      { label: 'Rs. 30+', value: '30-999' }
                    ].map((range) => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={filters.priceRange === range.value}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.rating === rating.toString()}
                          onChange={(e) => handleFilterChange('rating', e.target.value)}
                          className="mr-2"
                        />
                        <div className="flex items-center">
                          <div className="flex text-yellow-400 text-sm">
                            {'★'.repeat(rating)}
                            {'☆'.repeat(5 - rating)}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setFilters({
                    category: '',
                    priceRange: '',
                    rating: '',
                    sortBy: 'relevance'
                  })}
                  className="w-full text-sm text-deep-green hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {loading ? 'Searching...' : `${products.length} results for "${query}"`}
                    </h2>
                    {category && category !== 'all' && (
                      <p className="text-sm text-gray-600">in {categories.find(c => c.id === category)?.name}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-deep-green"
                    >
                      <option value="relevance">Sort by Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-green"></div>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4"
                    >
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-3"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            {product.badge}
                          </span>
                        )}
                        {product.discount && (
                          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 text-sm">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-deep-green">Rs. {product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">Rs. {product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setFilters({
                        category: '',
                        priceRange: '',
                        rating: '',
                        sortBy: 'relevance'
                      });
                    }}
                    className="bg-deep-green text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SearchResults;

