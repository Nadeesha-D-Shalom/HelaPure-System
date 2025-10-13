// Shared product data for consistency across the application
export const dummyProducts = [
  { 
    id: 1, 
    name: 'Organic Honey', 
    price: 25, 
    originalPrice: 30,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop&crop=center',
    description: 'Pure, raw organic honey from local beekeepers',
    longDescription: 'Our Premium Organic Raw Honey is sourced directly from certified organic beekeepers who follow sustainable practices. The honey is collected from wildflower nectar, giving it a unique flavor profile that reflects the diverse flora of Sri Lanka\'s highlands. This honey undergoes minimal processing to preserve its natural properties.',
    rating: 4.5,
    reviews: 128,
    category: 'organic',
    badge: 'Best Seller',
    inStock: true,
    stockCount: 50,
    brand: 'HelaPure',
    features: [
      '100% Organic Certified',
      'Raw & Unfiltered',
      'Locally Sourced',
      'Rich in Antioxidants',
      'Natural Enzymes Preserved',
      'No Additives or Preservatives'
    ],
    specifications: {
      weight: '500g',
      origin: 'Sri Lanka Highlands',
      harvestDate: '2024',
      shelfLife: '2 years',
      storage: 'Cool, dry place',
      certification: 'Organic Certified',
      packaging: 'Glass Jar',
      color: 'Golden Amber'
    },
    tags: ['organic', 'raw', 'premium', 'local', 'healthy'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 2, 
    name: 'Natural Coconut Oil', 
    price: 15, 
    originalPrice: 20,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&crop=center',
    description: 'Cold-pressed virgin coconut oil for cooking and beauty',
    longDescription: 'Premium cold-pressed virgin coconut oil extracted from fresh coconuts. This versatile oil is perfect for cooking, baking, and beauty applications. Rich in medium-chain fatty acids and antioxidants.',
    rating: 4.3,
    reviews: 95,
    category: 'dairy',
    badge: 'Flash Sale',
    inStock: true,
    stockCount: 30,
    brand: 'HelaPure',
    features: [
      'Cold-Pressed Virgin',
      '100% Natural',
      'Multi-Purpose Use',
      'Rich in MCTs',
      'Antioxidant Rich',
      'No Chemicals Added'
    ],
    specifications: {
      weight: '500ml',
      origin: 'Sri Lanka Coastal',
      extraction: 'Cold-Pressed',
      shelfLife: '2 years',
      storage: 'Cool, dry place',
      packaging: 'Glass Bottle',
      color: 'Clear White'
    },
    tags: ['coconut', 'oil', 'virgin', 'cold-pressed', 'natural'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 3, 
    name: 'Organic Turmeric Powder', 
    price: 12, 
    originalPrice: 15,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f757a64d?w=400&h=400&fit=crop&crop=center',
    description: 'Pure turmeric powder with anti-inflammatory properties',
    longDescription: 'Premium organic turmeric powder sourced from the finest turmeric roots. Known for its anti-inflammatory properties and vibrant golden color. Perfect for cooking, health supplements, and natural remedies.',
    rating: 4.7,
    reviews: 203,
    category: 'spices',
    badge: 'New',
    inStock: true,
    stockCount: 75,
    brand: 'HelaPure',
    features: [
      'Organic Certified',
      'Anti-Inflammatory',
      'Rich in Curcumin',
      'Vibrant Golden Color',
      'Pure & Natural',
      'Health Benefits'
    ],
    specifications: {
      weight: '100g',
      origin: 'Sri Lanka Highlands',
      processing: 'Sun-Dried & Ground',
      shelfLife: '3 years',
      storage: 'Cool, dry place',
      packaging: 'Resealable Pouch',
      color: 'Golden Yellow'
    },
    tags: ['turmeric', 'spice', 'organic', 'anti-inflammatory', 'curcumin'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 4, 
    name: 'Cinnamon Sticks', 
    price: 8, 
    originalPrice: 10,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&crop=center',
    description: 'Premium Ceylon cinnamon sticks for authentic flavor',
    longDescription: 'Authentic Ceylon cinnamon sticks from Sri Lanka. Known as "true cinnamon", these sticks have a delicate, sweet flavor perfect for both sweet and savory dishes.',
    rating: 4.4,
    reviews: 87,
    category: 'spices',
    inStock: true,
    stockCount: 40,
    brand: 'HelaPure',
    features: [
      'Ceylon Cinnamon',
      'True Cinnamon',
      'Sweet & Delicate',
      'Premium Quality',
      'Authentic Flavor',
      'Versatile Use'
    ],
    specifications: {
      weight: '50g',
      origin: 'Sri Lanka',
      type: 'Ceylon Cinnamon',
      shelfLife: '3 years',
      storage: 'Cool, dry place',
      packaging: 'Resealable Pouch',
      color: 'Light Brown'
    },
    tags: ['cinnamon', 'ceylon', 'spice', 'sweet', 'premium'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 5, 
    name: 'Cardamom Pods', 
    price: 18, 
    originalPrice: 22,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f757a64d?w=400&h=400&fit=crop&crop=center',
    description: 'Fresh green cardamom pods for aromatic cooking',
    longDescription: 'Premium green cardamom pods with intense aromatic flavor. Essential for authentic Sri Lankan and Indian cuisine. Adds depth and complexity to both sweet and savory dishes.',
    rating: 4.6,
    reviews: 156,
    category: 'spices',
    inStock: true,
    stockCount: 25,
    brand: 'HelaPure',
    features: [
      'Green Cardamom',
      'Intense Aroma',
      'Premium Quality',
      'Versatile Use',
      'Authentic Flavor',
      'Fresh Harvest'
    ],
    specifications: {
      weight: '50g',
      origin: 'Sri Lanka Highlands',
      type: 'Green Cardamom',
      shelfLife: '2 years',
      storage: 'Cool, dry place',
      packaging: 'Resealable Pouch',
      color: 'Green'
    },
    tags: ['cardamom', 'spice', 'aromatic', 'green', 'premium'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 6, 
    name: 'Black Pepper', 
    price: 10, 
    originalPrice: 12,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1609501676725-7186f757a64d?w=400&h=400&fit=crop&crop=center',
    description: 'Whole black peppercorns for maximum flavor',
    longDescription: 'Premium whole black peppercorns with intense heat and flavor. Perfect for grinding fresh pepper for maximum taste and aroma.',
    rating: 4.2,
    reviews: 74,
    category: 'spices',
    inStock: true,
    stockCount: 60,
    brand: 'HelaPure',
    features: [
      'Whole Peppercorns',
      'Intense Heat',
      'Fresh Grinding',
      'Premium Quality',
      'Maximum Flavor',
      'Versatile Use'
    ],
    specifications: {
      weight: '100g',
      origin: 'Sri Lanka',
      type: 'Black Pepper',
      shelfLife: '3 years',
      storage: 'Cool, dry place',
      packaging: 'Resealable Pouch',
      color: 'Black'
    },
    tags: ['pepper', 'black', 'spice', 'heat', 'grinding'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 7, 
    name: 'Fresh Mangoes', 
    price: 8, 
    originalPrice: 12,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1605027990121-8a1b5b5b5b5b?w=400&h=400&fit=crop&crop=center',
    description: 'Sweet and juicy Sri Lankan mangoes',
    longDescription: 'Fresh, sweet and juicy Sri Lankan mangoes. Perfect for eating fresh, making smoothies, or adding to desserts. Rich in vitamins and natural sweetness.',
    rating: 4.8,
    reviews: 312,
    category: 'fruits',
    badge: 'Hot Deal',
    inStock: true,
    stockCount: 100,
    brand: 'HelaPure',
    features: [
      'Fresh Harvest',
      'Sweet & Juicy',
      'Rich in Vitamins',
      'Perfect for Smoothies',
      'Natural Sweetness',
      'Local Farms'
    ],
    specifications: {
      weight: '1kg',
      origin: 'Sri Lanka',
      variety: 'Local Mango',
      shelfLife: '5-7 days',
      storage: 'Refrigerate',
      packaging: 'Fresh Pack',
      color: 'Yellow-Orange'
    },
    tags: ['mango', 'fruit', 'fresh', 'sweet', 'juicy'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '1-2 business days',
      returnPolicy: '7 days return policy'
    }
  },
  { 
    id: 8, 
    name: 'Organic Rice', 
    price: 35, 
    originalPrice: 40,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=center',
    description: 'Premium organic red rice from hill country',
    longDescription: 'Premium organic red rice grown in the hill country of Sri Lanka. Rich in nutrients and fiber, perfect for healthy meals. Grown using traditional methods without chemicals.',
    rating: 4.5,
    reviews: 189,
    category: 'groceries',
    inStock: true,
    stockCount: 20,
    brand: 'HelaPure',
    features: [
      'Organic Certified',
      'Red Rice Variety',
      'Rich in Fiber',
      'Nutrient Dense',
      'Traditional Methods',
      'No Chemicals'
    ],
    specifications: {
      weight: '1kg',
      origin: 'Sri Lanka Hill Country',
      type: 'Red Rice',
      shelfLife: '2 years',
      storage: 'Cool, dry place',
      packaging: 'Resealable Bag',
      color: 'Red-Brown'
    },
    tags: ['rice', 'organic', 'red', 'healthy', 'fiber'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 9, 
    name: 'Fresh Bananas', 
    price: 6, 
    originalPrice: 8,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&crop=center',
    description: 'Sweet and ripe bananas from local farms',
    longDescription: 'Fresh, sweet and ripe bananas from local Sri Lankan farms. Perfect for snacking, smoothies, or baking. Rich in potassium and natural energy.',
    rating: 4.3,
    reviews: 156,
    category: 'fruits',
    badge: 'New',
    inStock: true,
    stockCount: 80,
    brand: 'HelaPure',
    features: [
      'Fresh Harvest',
      'Sweet & Ripe',
      'Rich in Potassium',
      'Natural Energy',
      'Local Farms',
      'Perfect for Smoothies'
    ],
    specifications: {
      weight: '1kg',
      origin: 'Sri Lanka',
      variety: 'Local Banana',
      shelfLife: '3-5 days',
      storage: 'Room temperature',
      packaging: 'Fresh Pack',
      color: 'Yellow'
    },
    tags: ['banana', 'fruit', 'fresh', 'sweet', 'potassium'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '1-2 business days',
      returnPolicy: '7 days return policy'
    }
  },
  { 
    id: 10, 
    name: 'Green Tea', 
    price: 20, 
    originalPrice: 25,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&crop=center',
    description: 'Premium Ceylon green tea leaves',
    longDescription: 'Premium Ceylon green tea leaves from the highlands of Sri Lanka. Rich in antioxidants and natural flavor. Perfect for daily consumption and health benefits.',
    rating: 4.6,
    reviews: 234,
    category: 'beverages',
    badge: 'Best Seller',
    inStock: true,
    stockCount: 45,
    brand: 'HelaPure',
    features: [
      'Ceylon Green Tea',
      'Rich in Antioxidants',
      'Natural Flavor',
      'Health Benefits',
      'Premium Quality',
      'Highland Grown'
    ],
    specifications: {
      weight: '100g',
      origin: 'Sri Lanka Highlands',
      type: 'Green Tea',
      shelfLife: '2 years',
      storage: 'Cool, dry place',
      packaging: 'Resealable Pouch',
      color: 'Green'
    },
    tags: ['tea', 'green', 'ceylon', 'antioxidants', 'healthy'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      returnPolicy: '30 days return policy'
    }
  },
  { 
    id: 11, 
    name: 'Fresh Tomatoes', 
    price: 4, 
    originalPrice: 6,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1546470427-5c1d2b3b3b3b?w=400&h=400&fit=crop&crop=center',
    description: 'Fresh red tomatoes from local farms',
    longDescription: 'Fresh, red tomatoes from local Sri Lankan farms. Perfect for salads, cooking, and sauces. Rich in vitamins and natural flavor.',
    rating: 4.4,
    reviews: 98,
    category: 'vegetables',
    badge: 'Hot Deal',
    inStock: true,
    stockCount: 120,
    brand: 'HelaPure',
    features: [
      'Fresh Harvest',
      'Rich in Vitamins',
      'Perfect for Salads',
      'Natural Flavor',
      'Local Farms',
      'Versatile Use'
    ],
    specifications: {
      weight: '1kg',
      origin: 'Sri Lanka',
      variety: 'Local Tomato',
      shelfLife: '5-7 days',
      storage: 'Room temperature',
      packaging: 'Fresh Pack',
      color: 'Red'
    },
    tags: ['tomato', 'vegetable', 'fresh', 'red', 'vitamins'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '1-2 business days',
      returnPolicy: '7 days return policy'
    }
  },
  { 
    id: 12, 
    name: 'Coconut Milk', 
    price: 12, 
    originalPrice: 15,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center',
    description: 'Pure coconut milk for cooking',
    longDescription: 'Pure, fresh coconut milk extracted from fresh coconuts. Perfect for curries, desserts, and beverages. Rich and creamy with authentic coconut flavor.',
    rating: 4.2,
    reviews: 87,
    category: 'dairy',
    inStock: true,
    stockCount: 35,
    brand: 'HelaPure',
    features: [
      'Pure Coconut Milk',
      'Fresh Extraction',
      'Rich & Creamy',
      'Authentic Flavor',
      'Perfect for Curries',
      'No Preservatives'
    ],
    specifications: {
      weight: '400ml',
      origin: 'Sri Lanka Coastal',
      type: 'Fresh Coconut Milk',
      shelfLife: '3-5 days',
      storage: 'Refrigerate',
      packaging: 'Fresh Pack',
      color: 'White'
    },
    tags: ['coconut', 'milk', 'fresh', 'creamy', 'cooking'],
    seller: {
      name: 'HelaPure Organic Store',
      rating: 4.9,
      location: 'Colombo, Sri Lanka',
      verified: true
    },
    shipping: {
      freeShipping: true,
      estimatedDelivery: '1-2 business days',
      returnPolicy: '7 days return policy'
    }
  }
];

// Function to get product by ID
export const getProductById = (id) => {
  return dummyProducts.find(product => product.id === parseInt(id));
};

// Function to get products by category
export const getProductsByCategory = (category) => {
  return dummyProducts.filter(product => product.category === category);
};

// Function to get featured products
export const getFeaturedProducts = () => {
  return dummyProducts.filter(product => product.badge);
};
