"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [isDarkMode] = useState(true); // Assume synced with app-wide theme

  return (
    <footer
      className={`w-full py-8 transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-900'
      } border-t border-gray-600`}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Dashboard', 'Transactions', 'Reports', 'Profile'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className={`text-sm transition-all duration-300 ${
                      isDarkMode ? 'hover:text-blue-400' : 'hover:text-purple-600'
                    }`}
                    aria-label={`${item} page`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              {[
                { name: 'Twitter', href: 'https://www.google.com/', icon: 'fab fa-twitter' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sk-technology-05080b338/', icon: 'fab fa-linkedin' },
                { name: 'GitHub', href: 'https://github.com/sk-technology801', icon: 'fab fa-github' },
              ].map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    className={`text-sm transition-all duration-300 ${
                      isDarkMode ? 'hover:text-blue-400' : 'hover:text-purple-600'
                    }`}
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`${social.icon} mr-2`}></i>
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@accountspro.com"
                  className={`transition-all duration-300 ${
                    isDarkMode ? 'hover:text-blue-400' : 'hover:text-purple-600'
                  }`}
                  aria-label="Email support"
                >
                  support@accountspro.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className={`transition-all duration-300 ${
                    isDarkMode ? 'hover:text-blue-400' : 'hover:text-purple-600'
                  }`}
                  aria-label="Call support"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>123 Main St, Anytown, USA</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AccountsPro. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        a:focus {
          outline: 2px solid rgba(0, 128, 255, 0.5);
          outline-offset: 2px;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;