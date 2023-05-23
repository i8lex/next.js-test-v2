import React, { useContext, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { CartContext } from '../contexts/CartContext';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

const Cart: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cartItems, clearCart } = useContext(CartContext);
  const handleCartClick = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <div className="relative flex justify-end">
      <div className="fixed top-4 right-4 ">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? '' : 'text-opacity-90'}
                -z-1 inset-0 backdrop-blur-sm group inline-flex items-center rounded-2xl px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <div className="relative flex items-center justify-center px-10 py-10 rounded">
                  <p className="absolute bg-gray-600 px-1 rounded-full top-0 right-0 transform text-sm -translate-y-1/3 text-2xl text-orange-300 z-10">
                    {cartItems.length ? cartItems.length : null}
                  </p>

                  <div className="z-10 cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-7xl text-gray-600">
                    <MdShoppingCart onClick={handleCartClick} />
                  </div>
                </div>

                <ChevronDownIcon
                  className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
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
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <ul className="relative flex flex-col gap-8 bg-white p-7 overflow-scroll">
                      {cartItems.map((item) => (
                        <li
                          key={item.id}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.price}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white flex justify-center">
                      {cartItems.length ? (
                        <button
                          className=" mt-2 bg-gray-500 text-orange-300 px-4 py-2 rounded mb-6"
                          onClick={clearCart}
                        >
                          Clear cart
                        </button>
                      ) : (
                        <p className="text-gray-600 mb-6">Cart is empty </p>
                      )}
                    </div>
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
