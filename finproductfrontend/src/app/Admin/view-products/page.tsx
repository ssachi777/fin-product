"use client"; // Mark this file as a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const ViewProductsPage: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    // Fetch product names from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/list/'); // Updated endpoint

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debugging line
        setProducts(data); // Update the products state with the fetched data
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'An error occurred'); // Update error state
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      {products.length > 0 ? (
        <table className="border border-black w-1/2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-2">Product Name</th>
              <th className="border border-black p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border border-black p-2">{product.product_name}</td>
                <td className="border border-black p-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition"
                    onClick={() => router.push(`/Admin/create-sub-product?productId=${product.product_id}`)} // Navigate with product ID
                  >
                    Add Sub Product
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition">
                    Custom Product
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Add Parameters
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p> // Display a message if no products are found
      )}
    </div>
  );
};

export default ViewProductsPage;
