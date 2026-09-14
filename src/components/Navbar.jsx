import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  const drawerRef = useRef(null);
  const searchContainerRef = useRef(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Children', path: '/children' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Prevent background body scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Click Outside Handler: Closes search when clicking outside search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0c] border-b border-[#8B263E]/40 shadow-lg text-white">
      {/* Top Banner */}
      <div className="bg-[#2c1218] border-b border-[#8B263E]/50 text-[#d4d4d8] text-[10px] sm:text-[11px] py-1.5 px-3 sm:px-4 text-center tracking-widest uppercase font-medium">
        Free Delivery across Greater Accra for orders over GH₵ 1,000 | Fast Worldwide Shipping
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Mobile/Tablet Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-[#B3395B] transition-colors focus:outline-none -ml-2"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <img
                src="/images/logo/bmax-logo.png"
                alt="BMAX Logo"
                className="h-8 w-auto hidden"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase hover:text-[#B3395B] transition-colors">
                BMAX
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:text-[#B3395B] whitespace-nowrap ${
                    isActive ? 'text-[#B3395B] border-b-2 border-[#8B263E] pb-1' : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3 lg:gap-4">
            {/* Search Toggle Icon */}
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                setIsOpen(false);
              }}
              className="p-2 text-white hover:text-[#B3395B] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="p-2 text-white hover:text-[#B3395B] transition-colors relative flex items-center justify-center"
              aria-label="Wishlist"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-1 bg-[#8B263E] text-white text-[10px] font-extrabold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border border-[#B3395B] shadow-[0_0_8px_rgba(179,57,91,0.8)]">
                  {wishlist.length > 99 ? '99+' : wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-2 text-white hover:text-[#B3395B] transition-colors relative flex items-center justify-center"
              aria-label="Cart"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-1 bg-[#8B263E] text-white text-[10px] font-extrabold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border border-[#B3395B] shadow-[0_0_10px_rgba(179,57,91,0.9)] animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH SEARCH CONTAINER matching header color #0a0a0c */}
      {showSearch && (
        <div ref={searchContainerRef} className="bg-[#0a0a0c] border-t border-[#8B263E]/40 py-3 px-4 shadow-xl">
          <div className="max-w-2xl mx-auto">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        </div>
      )}

      {/* Backdrop Overlay for Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 left-0 bottom-0 z-50 w-[70%] sm:w-[50%] max-w-[320px] bg-[#0a0a0c] border-r border-[#8B263E]/40 shadow-2xl flex flex-col justify-between p-6 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#8B263E]/40 pb-4">
            <span className="text-xl font-black tracking-widest text-white uppercase">
              BMAX
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-xs font-bold uppercase tracking-widest py-3 px-3 rounded-xs transition-all duration-200 ${
                    isActive
                      ? 'text-[#B3395B] bg-[#2c1218]/60 border-l-2 border-[#8B263E] pl-4'
                      : 'text-gray-300 hover:text-white hover:bg-[#2c1218]/30'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-[#8B263E]/30 pt-4 text-center">
          <p className="text-[10px] text-[#B3395B] font-bold tracking-widest uppercase">
            Style That Defines You
          </p>
        </div>
      </aside>
    </header>
  );
};

export default Navbar;