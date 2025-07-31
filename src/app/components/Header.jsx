"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-md bg-black/60 shadow-xl" : "bg-transparent"}`}>
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Left / Hamburger */}
        <div className="flex items-center gap-4">
          <button
            aria-label="menu"
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-md group relative overflow-hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay animate-pulse-slow opacity-30 bg-gradient-to-r from-purple-500 to-pink-500 blur-md rounded-md"></div>
          </button>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative"
          >
            <div className="text-white text-xl font-extrabold tracking-tight flex items-center gap-2 select-none">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#ff6ec7] to-[#13b0f5] rounded-full flex items-center justify-center shadow-lg">
                <div className="text-sm font-black">A</div>
              </div>
              <div className="leading-none">
                <div className="uppercase">Acountix</div>
                <div className="text-[10px] -mt-1 tracking-wider">Finance / Ledger</div>
              </div>
            </div>
            {/* Neon glow */}
            <div className="absolute -inset-1 blur-xl opacity-40 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 rounded-xl mix-blend-screen"></div>
          </motion.div>
        </div>

        {/* Right Nav + Actions */}
        <div className="flex items-center gap-8">
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-sm font-semibold text-white uppercase tracking-wide px-2 py-1 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-25 transition-opacity rounded-md"></span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
              </motion.a>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex items-center relative">
            <input
              placeholder="Search transactions..."
              className="bg-[#1f1f2a] placeholder:text-gray-400 text-sm text-white rounded-full py-2 px-4 pr-10 outline-none backdrop-blur-sm shadow-inner w-[260px] transition-all focus:w-[320px]"
            />
            <div className="absolute right-2">
              <div className="w-4 h-4 flex items-center justify-center">
                🔍
              </div>
            </div>
          </div>

          {/* Profile / CTA */}
          <div className="flex items-center gap-4">
            <button className="relative px-5 py-2 font-medium text-sm uppercase tracking-wider rounded-full overflow-hidden bg-gradient-to-r from-[#ff4d4d] to-[#ffb86c] text-black shadow-md hover:scale-105 transition-transform">
              <div className="relative z-10">Get Pro</div>
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-xl border-2 border-white/30">
              <div className="text-xs font-bold text-white">SS</div>
            </div>
          </div>
        </div>

        {/* Mobile slide-in menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 bg-[#0f0f1f] backdrop-blur-md shadow-2xl border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col gap-4 py-6 px-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white font-semibold uppercase tracking-wide py-2 border-b border-white/5"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4">
                <input
                  placeholder="Search..."
                  className="w-full bg-[#1f1f2a] placeholder:text-gray-400 text-sm text-white rounded-lg py-2 px-4 outline-none"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 text-center py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 font-semibold uppercase">
                  Dashboard
                </button>
                <button className="flex-1 text-center py-2 rounded-full border border-white/30 font-semibold uppercase">
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {/* Decorative underline / wave */}
      <div className="h-[4px] w-full bg-gradient-to-r from-[#d53369] via-[#daae51] to-[#25a7f7] animate-pulse-slow" />
    </header>
  );
}
