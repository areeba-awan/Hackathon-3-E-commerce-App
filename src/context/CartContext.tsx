'use client';
import React from 'react';
import { Product } from '@/types/interfaces';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';



interface CartContextType {
  cart: Product[];
  cartCount: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  // 1. Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } 
  }, []);

  // 2. Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Compute cart count
  const cartCount = useMemo(() => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }
      return [...prevCart, product];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p._id === productId.toString() ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p._id !== productId));
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


// src/context/CartContext.tsx
// import React, { createContext, useContext, useState } from "react";
// import { CartItem, CartContextProps } from "@/types/interfaces";


// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const addToCart = (item: CartItem) => {
//     setCartItems((prev) => [...prev, item]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
