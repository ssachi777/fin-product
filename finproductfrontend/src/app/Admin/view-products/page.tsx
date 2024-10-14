"use client"; // Mark this file as a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const ViewProductsPage: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [products, setProducts] = useState<any[]>([]);
  const [parameters, setParameters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedParameterId, setSelectedParameterId] = useState<string | null>(null); // State for selected parameter ID

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
        setError(err.message || 'An error occurred');
      }
    };

    fetchProducts();
  }, []);

  const fetchParameters = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/parameters/');
      if (!response.ok) {
        throw new Error('Failed to fetch parameters');
      }
      const data = await response.json();
      console.log('Fetched parameters:', data);
      setParameters(data);
    } catch (err) {
      console.error('Error fetching parameters:', err);
      setError(err.message || 'An error occurred while fetching parameters');
    }
  };

  const handleOpenModal = (productId: number) => {
    setSelectedProductId(productId);
    fetchParameters();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setSelectedParameterId(null); // Clear the selected parameter ID
  };

  // Function to save the selected parameter for the product
  const handleSaveParameter = async () => {
    if (selectedProductId && selectedParameterId) {
      try {
        const response = await fetch('http://localhost:8000/api/productparameters/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: selectedProductId,
            parameter_id: selectedParameterId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save parameter');
        }

        // Reset selected parameter ID and close modal
        setSelectedParameterId(null);
        handleCloseModal();
        alert('Parameter saved successfully!'); // Notify user
      } catch (err) {
        console.error('Error saving parameter:', err);
        setError(err.message || 'An error occurred while saving the parameter');
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
                    onClick={() => router.push(`/Admin/create-sub-product?productId=${product.product_id}`)}
                  >
                    Add Sub Product
                  </button>
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition"
                    onClick={() => handleOpenModal(product.product_id)}
                  >
                    Add Parameters
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}

      {/* Modal for displaying parameters */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Parameters for Product ID: {selectedProductId}</h2>
            <label className="block mb-2" htmlFor="parameter-select">Select Parameter:</label>
            <select
              id="parameter-select"
              value={selectedParameterId || ''} // Maintain the current selected parameter
              onChange={(e) => {
                const paramId = e.target.value; // Get the selected parameter ID
                setSelectedParameterId(paramId); // Set selected parameter ID
                console.log('Selected Parameter ID:', paramId); // Log the selected parameter ID
              }} 
              className="border p-2 mb-4 w-full"
            >
              <option value="" disabled>Select a parameter</option>
              {parameters.map((param) => (
                <option key={param.parameter_id} value={param.parameter_id}>
                  {param.parameter_name}
                </option>
              ))}
            </select>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSaveParameter} // Call save function
            >
              Save Parameter
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
