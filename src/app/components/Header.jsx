"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`relative h-30 transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-100 to-gray-200'
    } shadow-[0_4px_12px_rgba(0,0,0,0.2)] border-b border-gray-600`}>
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center h-30">
          <div className="flex-shrink-0 relative">
            <Link href="/" className="group text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              <span className="inline-block transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(0,128,255,0.5)]">
                AccountsPro
              </span>
            </Link>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {['Dashboard', 'Transactions', 'Reports', 'Profile'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`relative text-xl font-semibold transition-all duration-300 group ${
                  isDarkMode ? 'text-gray-100 hover:text-blue-400' : 'text-gray-900 hover:text-purple-600'
                }`}
                aria-label={`${item} page`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full group-hover:drop-shadow-[0_0_4px_rgba(0,128,255,0.3)]"></span>
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg className="h-6 w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-full bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              onClick={toggleMobileMenu}
            >
              <svg className="h-8 w-8 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
        } ${isMobileMenuOpen ? 'max-h-screen opacity-100 py-6 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}
        id="mobile-menu"
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-6 space-y-6">
          {['Dashboard', 'Transactions', 'Reports', 'Profile'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`block text-xl font-semibold transition-all duration-300 hover:pl-3 ${
                isDarkMode ? 'text-gray-100 hover:text-blue-400' : 'text-gray-900 hover:text-purple-600'
              }`}
              onClick={toggleMobileMenu}
              role="menuitem"
              aria-label={`${item} page`}
            >
              {item}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className={`flex items-center text-xl font-semibold transition-all duration-300 hover:pl-3 ${
              isDarkMode ? 'text-gray-100 hover:text-blue-400' : 'text-gray-900 hover:text-purple-600'
            }`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      <style jsx>{`
        nav a:focus {
          outline: 2px solid rgba(0, 128, 255, 0.5);
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
};

export default Header;