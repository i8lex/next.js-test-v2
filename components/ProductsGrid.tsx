import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Transition } from '@headlessui/react';
import Loader from './Loader';

type ProductData = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?_page=${page}&_limit=3`,
      );
      const newProducts = response.data;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newProducts.length > 0);
    } catch (error) {}
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-12 gap-6">
        {products.map((product, index) => (
          <Transition
            key={index}
            appear={true}
            show={true}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-250"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Product
              key={index}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
            />
          </Transition>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductGrid;
