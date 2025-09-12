import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaTimesCircle, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import AuthContext from "../context/AuthContext";


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const { cart = [] } = useContext(AuthContext) || {}; 
  const cartCount = cart.length; 

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeTopBar = () => setIsTopBarVisible(false);

  return (
    <>
      {isTopBarVisible && (
        <div className="flex justify-center items-center gap-2 bg-pink-600 text-white text-sm font-medium py-2">
          <span className="hidden sm:inline">🌍 Flat shipping rate of 200 available for Mardan</span>
          <span className="sm:hidden">Flat shipping: 200 PKR</span>
          <button onClick={closeTopBar} className="text-white hover:text-gray-200">
            <FaTimesCircle className="w-4 h-4" />
          </button>
        </div>
      )}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <Link to="/">
            <img src="/logo.png" alt="Khkula Logo" className="h-12 sm:h-16" loading="lazy" />
          </Link>
          <div className="flex-1 mx-4 hidden sm:block">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline">Shop By Category</Link>
            <Link to="/TraditionalDress" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline">Traditional Dresses</Link>
            <Link to="/unstitched" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline">Unstitched</Link>
            <Link to="/mens-wear" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline">Men's Wear</Link>
            <Link to="/signin" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline">
              <FaUser className="inline-block" />
            </Link>
            <Link to="/cart" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline relative">
              <FaShoppingCart className="inline-block" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
          <button className="sm:hidden text-gray-800" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 py-4">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              <Link to="/" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline text-center" onClick={toggleMobileMenu}>Shop By Category</Link>
              <Link to="/TraditionalDress" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline text-center" onClick={toggleMobileMenu}>Traditional Dresses</Link>
              <Link to="/unstitched" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline text-center" onClick={toggleMobileMenu}>Unstitched</Link>
              <Link to="/mens-wear" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline text-center" onClick={toggleMobileMenu}>Men's Wear</Link>
              <Link to="/signin" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline text-center" onClick={toggleMobileMenu}>
                <FaUser className="inline-block mr-2" /> Account
              </Link>
              <Link to="/cart" className="text-sm font-medium uppercase text-gray-800 hover:text-blue-600 hover:underline text-center relative" onClick={toggleMobileMenu}>
                <FaShoppingCart className="inline-block mr-2" /> Cart
                {cartCount > 0 && (
                  <span className="absolute top-0 right-4 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;