"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart/getCartCount";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    const count = await getCartCount();
    setCartCount(count);
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCartCount,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}