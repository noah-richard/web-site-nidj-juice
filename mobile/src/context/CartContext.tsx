/* ==========================================================================
   NIDJ JUICE (MOBILE) — CART STATE CONTEXT
   Société Nidjeu — Cameroun
   ========================================================================== */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, FlavorId } from '../types/product.types';

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalAmount: number;
  addToCart: (
    flavorId: FlavorId,
    name: string,
    format: 'Bouteille 50cl' | 'Pack 6x 50cl' | 'Carton 12x 50cl' | 'Bouteille 1L',
    unitPrice: number,
    quantity?: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    // Starter item for quick testing if desired, or empty
  ]);

  const addToCart = (
    flavorId: FlavorId,
    name: string,
    format: 'Bouteille 50cl' | 'Pack 6x 50cl' | 'Carton 12x 50cl' | 'Bouteille 1L',
    unitPrice: number,
    quantity: number = 1
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.flavorId === flavorId && item.format === format
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          id: `${flavorId}-${format}-${Date.now()}`,
          flavorId,
          name,
          format,
          unitPrice,
          quantity,
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
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
