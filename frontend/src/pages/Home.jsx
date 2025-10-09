import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const dummyProducts = [
  { id: 1, name: 'Organic Honey', price: 25, image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Natural Coconut Oil', price: 15, image: 'https://via.placeholder.com/200' },
];

const Home = () => {
  return (
    <>
      <Header />
      <div style={{ padding: '2rem', backgroundColor: 'var(--light-cream)' }}>
        <h2 style={{ color: 'var(--deep-green)' }}>Explore Natural Products</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {dummyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
    