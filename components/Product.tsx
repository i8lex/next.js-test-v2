import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import Image from 'next/image';

type ProductProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const Product: React.FC<ProductProps> = ({ id, title, price, image }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, title, price });
  };

  return (
    <div className="@container flex  flex-col border rounded-lg  shadow-lg p-4 justify-between  items-center">
      <div className="flex flex-wrap gap-6 justify-between w-full mb-6">
        <div className="flex flex-col justify-between h-80 flex-1">
          <h3 className=" font-bold text-2xl">{title}</h3>
          <p className="text-gray-500 text-2xl">Price: ${price}</p>
        </div>
        <div className="-z-10 relative flex-1 justify-center ">
          <Image
            priority={true}
            src={image}
            alt={title}
            // width={150}
            // height={150}
            objectFit="contain"
            fill={true}
            // layout="contain"
            // objectFit="contain"
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
