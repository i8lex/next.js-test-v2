import React, { useContext, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { CartContext } from '../contexts/CartContext';
import { Popover, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  ShoppingCartIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';

const Cart: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cartItems, clearCart } = useContext(CartContext);
  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <div className="relative flex justify-end z-50">
      <div className="fixed top-4 right-4 ">
        <Popover className="relative ">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? '' : 'text-opacity-90'}
                -z-1 inset-0 backdrop-blur-sm group inline-flex items-center rounded-2xl px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <div className="relative flex items-center justify-center px-10 py-10 rounded">
                  <p className="absolute bg-gray-600 px-2 rounded-full top-0 right-0 transform text-sm -translate-y-1/3 text-2xl text-orange-300 z-10">
                    {cartItems.length ? cartItems.length : null}
                  </p>

                  <div className="z-10 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-7xl text-gray-600">
                    <ShoppingCartIcon
                      className="h-16 w-16 filter-titleShadow"
                      onClick={handleCartClick}
                    />
                  </div>
                </div>

                <ChevronDownIcon
                  className={`${open ? '' : 'text-opacity-70 animate-bounce'}
                  ml-2 h-5 w-5 filter-titleShadow font-bold text-orange-500 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm  transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="flex overflow-scroll max-h-96 bg-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <ul className="relative flex flex-col flex-1 gap-8 p-7">
                      {cartItems.map((item, index) => (
                        <li
                          key={index}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.price}
                            </p>
                          </div>
                        </li>
                      ))}
                      <li className="flex justify-center align-center gap-6">
                        {cartItems.length ? (
                          <>
                            <button
                              className="mt-2 bg-gray-500 text-orange-300 px-4 py-2 rounded shadow-lg mb-4"
                              onClick={clearCart}
                            >
                              Clear cart
                            </button>
                            <button className="relative mt-2 shadow-lg hover:scale-105 bg-white border-gray-500 text-orange-300 text-lg font-bold pl-4 py-2 pr-16 rounded self-center mb-4">
                              Order
                              <CheckIcon className="absolute bottom-0 right-0 h-12 w-12 text-green-300 text-shadow-2xl filter-check z-500 animate-bounce" />
                            </button>
                          </>
                        ) : (
                          <Transition
                            appear={true}
                            show={true}
                            enter="transition ease-out duration-500"
                            enterFrom="transform translate-x-50 opacity-0 scale-75"
                            enterTo="transform translate-x-0 opacity-100 scale-105"
                            leave="transition ease-in duration-450"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <p className="text-gray-600">IT'S EMPTY</p>
                          </Transition>
                        )}
                      </li>
                    </ul>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default Cart;
