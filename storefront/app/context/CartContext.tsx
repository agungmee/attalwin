'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  quantity: number;
  color?: string;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: any, color?: string, size?: string, quantity?: number) => void;
  removeFromCart: (id: number, color?: string, size?: string) => void;
  updateQuantity: (id: number, delta: number, color?: string, size?: string) => void;
  cartTotal: number;
  cartCount: number;
  checkoutItems: CartItem[];
  setCheckoutItems: (items: CartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: any, color?: string, size?: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.color === color && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.color === color && item.size === size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, color, size, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number, color?: string, size?: string) => {
    setCartItems((prev) => prev.filter(
      (item) => !(item.id === id && item.color === color && item.size === size)
    ));
  };

  const updateQuantity = (id: number, delta: number, color?: string, size?: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartOpen, 
      setCartOpen, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      cartTotal, 
      cartCount,
      checkoutItems,
      setCheckoutItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
