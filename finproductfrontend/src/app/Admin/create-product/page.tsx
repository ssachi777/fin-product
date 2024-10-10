"use client";
import React, { useState } from 'react';

interface Parameter {
  name: string;
  level: string;
  description: string;
  displayName: string;
  updatePermission: string;
  shape: string;
}

const CreateProductPage: React.FC = () => {
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      productName,
      productDescription,
      createdAt,
    });
    // Reset form fields
    setProductName('');
    setProductDescription('');
    setCreatedAt('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-green">Create Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
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
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-black" htmlFor="createdAt">Created At</label>
          <input
            type="date"
            id="createdAt"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProductPage;
