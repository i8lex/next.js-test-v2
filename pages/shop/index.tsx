import React from 'react';
import { CartContextProvider } from '@/contexts/CartContext';
import ProductsGrid from '../../components/ProductsGrid';
import Cart from '../../components/Cart';
import { Transition } from '@headlessui/react';

const Shop: React.FC = () => {
  return (
    <CartContextProvider>
      <section className="container mx-auto p-4 mt-10">
        <Cart />
        <Transition
          appear={true}
          show={true}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 scale-75"
          enterTo=" opacity-100 scale-105"
          leave="transition ease-in duration-450"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <h1 className="mb-8 animate-text filter-titleShadow bg-gradient-to-r from-slate-950 via-slate-100 to-gray-950 bg-clip-text text-2xl font-black text-transparent">
          Mini Shop
          </h1>
        </Transition>
        <ProductsGrid />
      </section>
    </CartContextProvider>
  );
};

export default Shop;
