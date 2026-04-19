'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Home, Package, Phone, Handshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        isScrolled ? "bg-white shadow-sm" : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center space-x-12">
        <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-[#f53d2d]">
            <Image 
              src="https://down-aka-id.img.susercontent.com/id-11134216-7rash-m5xh9d7ytndk19_tn.webp" 
              alt="Attalwin Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-2xl font-bold tracking-tighter text-[#f53d2d]">Attalwin</div>
        </Link>
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-5 py-2 w-96">
          <input type="text" placeholder="Cari di Attalwin Official" className="bg-transparent outline-none text-sm w-full" />
          <Search className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        {[
          { name: 'Produk', href: '/' },
          { name: 'Kontak', href: '#' },
          { name: 'Kerjasama', href: '#' }
        ].map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="text-sm font-medium text-slate-600 hover:text-[#f53d2d] transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-8">
        <button onClick={() => setCartOpen(true)} className="relative hover:text-[#f53d2d] transition-colors">
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#f53d2d] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden hover:text-[#f53d2d] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[101] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-slate-50">
                <div className="text-xl font-bold tracking-tighter text-[#f53d2d]">Menu</div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 py-8 px-6 space-y-2">
                {[
                  { name: 'Home', href: '/', icon: Home },
                  { name: 'Produk', href: '/', icon: Package },
                  { name: 'Kontak', href: '#', icon: Phone },
                  { name: 'Kerjasama', href: '#', icon: Handshake }
                ].map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-[#fff5f2] hover:text-[#f53d2d] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="p-8 border-t border-slate-50">
                <p className="text-xs text-slate-400 text-center uppercase tracking-widest font-bold">Attalwin Official</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
