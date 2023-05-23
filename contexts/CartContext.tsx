import React, { createContext, useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface CartContextData {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

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

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
