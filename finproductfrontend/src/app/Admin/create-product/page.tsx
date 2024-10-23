"use client";
import React, { useState } from 'react';
import Header from '../../Header';

const CreateProductPage: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: productName,
          description: productDescription,
          // created_at is not included since it is handled by the backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // Reset form fields
      setProductName('');
      setProductDescription('');
      setError(''); // Clear any previous errors
      console.log('Product created successfully!');

      // Show success alert
      window.alert('Product created successfully!');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error creating product:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-green-600">Create Product</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-1/2">
        <div>
          <label className="block mb-1 text-gray-700" htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700" htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
