"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface Product {
  product_id: number;
  product_name: string;
  tags: string[];
  created_at: string;
}

interface Parameter {
  parameter_name: string;
  description: string;
  created_at: string;
}

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details from `parent-product` endpoint
        const productResponse = await fetch(`http://localhost:8000/api/products/parent-product/`);
        if (!productResponse.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productData = await productResponse.json();
        const selectedProduct = productData.find((prod: Product) => prod.product_id === Number(productId));

        if (!selectedProduct) {
          throw new Error('Product not found');
        }
        setProduct(selectedProduct);

        // Fetch product parameters based on `productId`
        const parameterResponse = await fetch(`http://localhost:8000/api/products/parameters/${productId}/`);
        if (!parameterResponse.ok) {
          throw new Error('Failed to fetch product parameters');
        }
        const parameterData = await parameterResponse.json();
        setParameters(parameterData.parameters);

      } catch (err) {
        console.error('Error fetching product details or parameters:', err);
        setError(err.message || 'An error occurred while fetching product details');
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-black p-4">
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Details Card */}
      {product && (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">{product.product_name}</h2>
          <p className="text-gray-700 mb-1"><strong>Tags:</strong> {product.tags.join(', ')}</p>
          <p className="text-gray-700"><strong>Created At:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
        </div>
      )}

      {/* Parameters Grid */}
      {parameters.length > 0 ? (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {parameters.map((param, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-medium mb-2">{param.parameter_name}</h3>
              <p className="text-gray-700 mb-2">{param.description}</p>
              <p className="text-gray-600 text-sm"><strong>Created At:</strong> {new Date(param.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No parameters available for this product.</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
