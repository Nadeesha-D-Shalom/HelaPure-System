import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">HelaPure</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/dashboard/buyer">My Orders</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
