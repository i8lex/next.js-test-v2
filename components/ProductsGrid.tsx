import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h2>Loading...</h2>}
    >
      <div className="grid grid-cols-3 gap-4 mt-8">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductGrid;
