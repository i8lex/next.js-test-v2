import React, { createContext, useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

type CartItem = {
  id: string;
  title: string;
  price: number;
};

type CartContextData = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  toggleCart: () => void;
  removeItem: (itemId: string) => void;

};

export const CartContext = createContext<CartContextData>({
  cartItems: [],
  addToCart: () => {},
  clearCart: () => {},
  toggleCart: () => {},
  removeItem: () => {},
});


export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    const newItem: CartItem = { ...item, id: uuidv4() };
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
  };


  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setCartOpen((prevIsCartOpen) => !prevIsCartOpen);
  };

  const removeItem = (itemId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  const contextValue = useMemo(() => {
    return { cartItems, addToCart, clearCart, toggleCart, removeItem };
  }, [cartItems]);



  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
