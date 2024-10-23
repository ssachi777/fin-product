"use client"; // Mark this file as a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ViewProductsPage: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [accountName, setAccountName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products/list/');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        // setError(err.message || 'An error occurred');
      }
    };

    fetchProducts();
  }, []);

  const handleOpenModal = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setAccountName('');
  };

  const handleSaveAccount = async () => {
    if (selectedProductId && accountName) {
      try {
        const response = await fetch('http://localhost:8000/api/accounts/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: selectedProductId,
            account_name: accountName,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create account');
        }

        setAccountName('');
        handleCloseModal();
        alert('Account created successfully!');
      } catch (err) {
        console.error('Error creating account:', err);
        // setError(err.message || 'An error occurred while creating the account');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      {error && <p className="text-red-500">{error}</p>}
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
                    onClick={() => handleOpenModal(product.product_id)}
                  >
                    Create Account
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Account for Product ID: {selectedProductId}</h2>
            <label className="block mb-2" htmlFor="account-name">Account Name:</label>
            <input
              id="account-name"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Enter account name"
            />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSaveAccount}
            >
              Save Account
            </button>
            <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProductsPage;