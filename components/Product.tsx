import React, { Fragment, useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import Loader from './Loader';

type ProductProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const Product: React.FC<ProductProps> = ({ id, title, price, image }) => {
  const { addToCart } = useContext(CartContext);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleAddToCart = () => {
    addToCart({ id, title, price });
  };

  const handleLoadingComplete = () => {
    setIsImageLoading(false);
    console.log(isImageLoading);
  };

  return (
    <div className="@container p-6 flex hover:scale-105 transition ease-in-out delay-150 flex-col border rounded-lg shadow-lg  justify-between  items-center">
      <div className="flex flex-wrap  gap-6 justify-between w-full mb-6">
        <div className="flex flex-col justify-between h-80  flex-1 w2/5">
          <h3 className=" font-bold text-lg whitespace-break-spaces">
            {title}
          </h3>
          <p className="text-gray-500 text-2xl">Price: ${price}</p>
        </div>
        <div className="-z-10 relative justify-center flex-1">
          {isImageLoading ? <Loader /> : null}
          <Image
            priority={true}
            src={image}
            alt={title}
            fill={true}
            sizes={100}
            onLoadingComplete={handleLoadingComplete}
            className="object-contain"
          />
        </div>
      </div>
      <button
        className=" mt-2 bg-gray-500 text-center text-orange-300 px-4 py-2 rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
