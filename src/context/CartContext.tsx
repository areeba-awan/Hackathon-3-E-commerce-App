// 'use client';

// import { Product } from '@/types/interfaces';
// import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// export interface CartItemType {
//   imageUrl: any;
//   image: any;
//   title: any;
//   price: number;
//   _id: string;
//   quantity: number;
// }


// interface CartContextType {
//   cartItems: CartItemType[];
//   setCartItems: (items: CartItemType[]) => void;
//   cart: Product[];
//   cartCount: number;
//   addToCart: (product: Product) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   removeFromCart: (productId: string) => void;
//   clearCart: () => void;
//   getGroupedCartItems: () => CartItemType[];
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<Product[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   useEffect(() => {
//     const saveCart = setTimeout(() => {
//       localStorage.setItem('cart', JSON.stringify(cart));
//     }, 500);

//     return () => clearTimeout(saveCart);
//   }, [cart]);

//   const cartCount = useMemo(() => {
//     return cart.reduce((total, product) => total + product.quantity, 0);
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((p) => p._id === product._id);
//       if (existingProduct) {
//         return prevCart.map((p) =>
//           p._id === product._id
//             ? { ...p, quantity: Math.max(1, p.quantity + product.quantity) }
//             : p
//         );
//       }
//       return [...prevCart, { ...product, quantity: Math.max(1, product.quantity) }];
//     });
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     setCart((prevCart) =>
//       prevCart.map((p) =>
//         p._id === productId.toString() ? { ...p, quantity: Math.max(1, quantity) } : p
//       )
//     );
//   };

//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => prevCart.filter((p) => p._id !== productId));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   const [cartItems, setCartItems] = useState<CartItemType[]>([]);

//   const getGroupedCartItems = () => {
//     const groupedItems: { [key: string]: CartItemType } = {};

//     cart.forEach((product) => {
//       if (groupedItems[product._id]) {
//         groupedItems[product._id].quantity += product.quantity;
//       } else {
//         groupedItems[product._id] = {
//           image: product.image,
//           title: product.title,
//           price: product.price,
//           _id: product._id,
//           quantity: product.quantity,
//         };
//       }
//     });

//     return Object.values(groupedItems);
//   };

//   const value = useMemo(
//     () => ({
//       cartItems,
//       setCartItems,
//       cart,
//       cartCount,
//       addToCart,
//       updateQuantity,
//       removeFromCart,
//       clearCart,
//       getGroupedCartItems,
//     }),
//     [cartItems, cart, cartCount]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
"use client";

import { Product } from "@/types/interfaces";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export interface CartItemType {
  imageUrl: string;
  length: number;
  image: string;
  title: string;
  price: number;
  _id: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItemType[];
  setCartItems: (items: CartItemType[]) => void;
  cart: Product[];
  cartCount: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const saveCart = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 500);

    return () => clearTimeout(saveCart);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p._id === product._id
            ? { ...p, quantity: Math.max(1, p.quantity + product.quantity) }
            : p
        );
      }
      return [
        ...prevCart,
        { ...product, quantity: Math.max(1, product.quantity) },
      ];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((p) =>
        p._id === productId.toString()
          ? { ...p, quantity: Math.max(1, quantity) }
          : p
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      cart,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, cart, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export default CartProvider;