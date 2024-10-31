"use client"; // Mark this file as a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Header from '../../Header';

const ViewProductsPage: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const [products, setProducts] = useState<any[]>([]);
  const [treeProducts, setTreeProducts] = useState<any[]>([]);
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
        const productTree = buildProductTree(data); // Build the tree structure
        setTreeProducts(productTree); // Set the tree structure for rendering
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

  // Recursive function to build a product tree based on parent-child relationships
  const buildProductTree = (productsList: any[]) => {
    const productMap: { [key: number]: any } = {}; // Map products by their IDs

    // Initialize the product map
    productsList.forEach(product => {
      productMap[product.product_id] = { ...product, subProducts: [] };
    });

    
    // Build the tree by assigning each product to its parent's subProducts array
    const tree: any[] = [];
    productsList.forEach(product => {
      if (product.parent_product_id === null) {
        // If it's a root product, add it to the tree
        tree.push(productMap[product.product_id]);
      } else {
        // Otherwise, find its parent and add it to the parent's subProducts array
        const parent = productMap[product.parent_product_id];
        if (parent) {
          parent.subProducts.push(productMap[product.product_id]);
        }
      }
    });

    return tree; // Return the root-level products (the tree)
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
  // Button click handler for "Add Products"
  const handleAddProductsClick = () => {
    router.push('/Admin/create-product'); // Redirect to the create product page
  };


  // Handle dropdown selection
  const handleAction = (productId: number, action: string) => {
    if (action === 'Add Subproducts') {
      router.push(`/Admin/create-sub-product?productId=${productId}`);
    } else if (action === 'Add Parameters') {
      handleOpenModal(productId);
    } else if (action === 'Upgrade Products') {
      // Add logic for upgrading products here
      alert('Upgrade product feature will be implemented soon.');
    }
  };

  // Recursive function to render the product tree with parent context
  const renderProductTree = (productTree: any[], parentName: string | null = null) => {
    return productTree.map((product) => (
      <React.Fragment key={product.product_id}>
        <tr>
          <td className={`border border-white p-2 text-center ${parentName ? 'pl-8' : 'font-bold'}`}>
            <a href={`/Admin/${product.product_id}`} className="text-blue-500 underline">
            {product.product_name}
            </a>
            {parentName && <span className="text-sm text-gray-600"> (Sub-product of {parentName})</span>}
          </td>
          <td className="border border-white p-2 text-center">{product.product_id}</td> {/* Display product_id */}
          <td className="border border-white p-2 text-center"></td> {/* Tags column - empty for now */}
          <td className="border border-white p-2 text-center">1.0.0</td> {/* Default version */}
          <td className="border border-white p-2 text-center">
            <select
              className="border p-2"
              onChange={(e) => handleAction(product.product_id, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select Action</option>
              <option value="Add Subproducts">Add Subproducts</option>
              <option value="Add Parameters">Add Parameters</option>
              <option value="Upgrade Products">Upgrade Products</option>
            </select>
          </td>
        </tr>
        {/* Recursively render sub-products if they exist */}
        {product.subProducts.length > 0 && renderProductTree(product.subProducts, product.product_name)}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      {/* Ensure the header is sticky at the top */}
      <div className="sticky top-0 z-50 w-full bg-white">
      <Header />
    </div>
      
      {/* Add padding to push content below the header */}
      <div className=" fixed top-20 right-4 z-50"> {/* Adjust 'pt-16' to match the header height */}
        <button
          onClick={handleAddProductsClick}
          className="bg-gradient-to-r from-[#E34D67] via-[#C04B95] to-[#7746F4] text-white px-4 py-2 rounded hover:opacity-90">
          Add Products
        </button>
      </div>
  
      <h1 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E34D67] via-[#C04B95] to-[#7746F4]">
         Product List
       </h1>
  
      {error && <p className="text-red-500">{error}</p>}
      {treeProducts.length > 0 ? (
      <div className="w-full max-w-4xl overflow-y-auto" style={{ maxHeight: '60vh' }}>
        <table className="border border-white w-full">
          <thead className="sticky top-0 bg-gray-200">
            <tr className="bg-gray-100">
              <th className="border border-white p-4 text-center">Product Name</th>
              <th className="border border-white p-4 text-center">Product ID</th>
              <th className="border border-white p-4 text-center">Tags</th>
              <th className="border border-white p-4 text-center">Current Version</th>
              <th className="border border-white p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderProductTree(treeProducts)}
          </tbody>
        </table>
      </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
  
};

export default ViewProductsPage;





