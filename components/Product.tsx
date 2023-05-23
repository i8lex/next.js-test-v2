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
    <div className="border rounded-lg  shadow-lg p-4 flex flex-col justify-between gap-6 items-center">
      <div className="grid grid-cols-2 gap-4">
        <div className=" flex-1 justify-between">
          <h3 className="font-bold">{title}</h3>
          <p className="text-gray-500">${price}</p>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            priority={true}
            src={image}
            alt={`${title}`}
            width={100}
            height={100}
          />
        </div>
      </div>
      <button
        className=" mt-2 bg-gray-500 text-orange-300 px-4 py-2 rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
