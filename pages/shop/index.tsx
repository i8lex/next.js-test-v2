import React from 'react';
import { CartContextProvider } from '../../contexts/CartContext';
import ProductsGrid from '../../components/ProductsGrid';
import Cart from '../../components/Cart';

const Shop: React.FC = () => {
  return (
    <CartContextProvider>
      <section className="container mx-auto p-4 mt-10">
        <Cart />
        <h1 className="text-2xl font-bold mb-8">Mini Shop</h1>
        <ProductsGrid />
      </section>
    </CartContextProvider>
  );
};

export default Shop;
