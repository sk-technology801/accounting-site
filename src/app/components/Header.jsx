"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Particle background effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'absolute inset-0 pointer-events-none';
    document.querySelector('.header-canvas-container')?.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = 120; // Header height
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 120;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="relative bg-gradient-to-r from-gray-900 via-indigo-950 to-purple-950 text-white shadow-2xl h-30 header-canvas-container">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-30">
          <div className="flex-shrink-0 relative">
            <Link href="/" className="group text-4xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
              <span className="inline-block transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
                AccountsPro
              </span>
            </Link>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="hidden md:flex space-x-12">
            {['Dashboard', 'Transactions', 'Reports', 'Profile'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative text-xl font-semibold text-gray-200 hover:text-cyan-300 transition-all duration-300 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-400 transition-all duration-300 group-hover:w-full group-hover:drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]"></span>
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-full bg-purple-800 hover:bg-purple-700 focus:outline-none transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Toggle menu</span>
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden bg-gray-900 bg-opacity-95 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-6 space-y-6">
          {['Dashboard', 'Transactions', 'Reports', 'Profile'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block text-xl font-semibold text-gray-200 hover:text-cyan-300 transition-all duration-300 hover:pl-2"
              onClick={toggleMobileMenu}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .header-canvas-container {
          overflow: hidden;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </header>
  );
};

export default Header;