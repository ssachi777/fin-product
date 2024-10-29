// view_product/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ViewProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/list/');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Product Names</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <Link href={`/view_product_details?productId=${product.product_id}`}>
              {product.product_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProductPage;
