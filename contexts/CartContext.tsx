import React, { createContext, useState, useMemo } from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
};

type CartContextData = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextData>({
  cartItems: [],
  addToCart: () => {},
  clearCart: () => {},
});

export const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = useMemo(() => {
    return { cartItems, addToCart, clearCart };
  }, [cartItems]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
