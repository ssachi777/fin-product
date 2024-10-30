"use client";

import React, { useEffect, useState } from 'react';

interface ProductDetailsPageProps {
  params: {
    productId: string;
  };
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ params }) => {
  const { productId } = params;
  const [product, setProduct] = useState<any>(null);
  const [parameters, setParameters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      // Fetch product details
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/products/${productId}/`);
          if (!response.ok) throw new Error(`Failed to fetch product details: ${response.status} ${response.statusText}`);
          const data = await response.json();
          setProduct(data);
        } catch (err) {
          setError('Error fetching product details');
        }
      };

      // Fetch product parameters
      const fetchParameters = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/parameters/');
          if (!response.ok) throw new Error('Failed to fetch parameters');
          const data = await response.json();
          setParameters(data.filter((param: any) => param.product_id === Number(productId)));
        } catch (err) {
          setError('Error fetching parameters');
        }
      };

      fetchProductDetails();
      fetchParameters();
    }
  }, [productId]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      {/* Product Details Card */}
      <div className="bg-white p-6 rounded shadow mb-4">
        <h2 className="text-2xl font-bold mb-2">{product.product_name}</h2>
        <p>Tags: {product.tags || 'No tags'}</p>
        <p>Created At: {new Date(product.created_at).toLocaleDateString()}</p>
      </div>

      {/* Product Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {parameters.map((param) => (
          <div key={param.parameter_id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="font-semibold">{param.parameter_name}</h3>
            <p>{param.description}</p>
            <p className="text-gray-600 text-sm">Created At: {new Date(param.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
