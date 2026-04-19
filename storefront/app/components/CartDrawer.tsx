'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShoppingBag, X, Trash2, Minus, Plus, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const router = useRouter();
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount, setCheckoutItems } = useCart();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-xl font-bold flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3 text-[#f53d2d]" /> 
                Tas Belanja ({cartCount})
              </h2>
              <button onClick={() => setCartOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p>Keranjang kamu masih kosong.</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-slate-100 shrink-0">
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="line-clamp-2 leading-tight mb-1">{item.name}</h3>
                          {(item.color || item.size) && (
                            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                              <span>Variasi: {item.color}{item.size ? `, ${item.size}` : ''}</span>
                            </div>
                          )}
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.color, item.size)} className="text-slate-300 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-[#f53d2d] font-bold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                        <div className="flex items-center border border-slate-200 rounded-sm">
                          <button onClick={() => updateQuantity(item.id, -1, item.color, item.size)} className="px-2 py-1 hover:bg-slate-100"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 min-w-[30px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1, item.color, item.size)} className="px-2 py-1 hover:bg-slate-100"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-[#fef1ee] space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-500">Total Harga</span>
                  <span className="text-2xl font-bold text-[#f53d2d]">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={() => {
                    setCheckoutItems(cartItems);
                    setCartOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full bg-[#f53d2d] text-white py-4 rounded-sm font-bold shadow-lg shadow-[#f53d2d]/20 hover:bg-[#d73211] transition-colors flex items-center justify-center group"
                >
                  <span>Checkout Sekarang</span>
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
