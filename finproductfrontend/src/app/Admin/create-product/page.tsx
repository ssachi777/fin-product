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
  const [parameter, setParameter] = useState<Parameter | null>(null); // To store a single parameter

  // Function to show the parameter form
  const handleAddParameter = () => {
    if (!parameter) {
      setParameter({
        name: '',
        level: 'Instance',
        description: '',
        displayName: '',
        updatePermission: 'Ops Editable',
        shape: 'StringShape',
      });
    }
  };

  // Function to update the parameter fields
  const handleParameterChange = (field: keyof Parameter, value: string) => {
    if (parameter) {
      setParameter({ ...parameter, [field]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      productName,
      productDescription,
      parameter, // Submit only one parameter
    });

    // Reset the form
    setProductName('');
    setProductDescription('');
    setParameter(null); // Reset parameter
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-green">Create Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        {/* Product Name and Description */}
        <div>
          <label className="block mb-1 text-black" htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-black" htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>

        {/* Add Parameters */}
        {!parameter && (
          <button
            type="button"
            onClick={handleAddParameter}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Add Parameters
          </button>
        )}

        {/* Parameters Form (Visible only when Add Parameters is clicked) */}
        {parameter && (
          <div className="bg-gray-200 p-4 rounded mt-4 space-y-4">
            <div>
              <label className="block mb-1 text-black" htmlFor="paramName">Name</label>
              <input
                type="text"
                id="paramName"
                value={parameter.name}
                onChange={(e) => handleParameterChange('name', e.target.value)}
                className="border border-gray-300 p-2 w-full rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-black" htmlFor="paramLevel">Level</label>
              <select
                id="paramLevel"
                value={parameter.level}
                onChange={(e) => handleParameterChange('level', e.target.value)}
                className="border border-gray-300 p-2 w-full rounded text-black"
                required
              >
                <option value="Instance">Instance</option>
                <option value="Template">Template</option>
                <option value="Global">Global</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-black" htmlFor="paramDescription">Description</label>
              <textarea
                id="paramDescription"
                value={parameter.description}
                onChange={(e) => handleParameterChange('description', e.target.value)}
                className="border border-gray-300 p-2 w-full rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-black" htmlFor="paramDisplayName">Display Name</label>
              <input
                type="text"
                id="paramDisplayName"
                value={parameter.displayName}
                onChange={(e) => handleParameterChange('displayName', e.target.value)}
                className="border border-gray-300 p-2 w-full rounded text-black"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-black" htmlFor="paramUpdatePermission">Update Permission</label>
              <select
                id="paramUpdatePermission"
                value={parameter.updatePermission}
                onChange={(e) => handleParameterChange('updatePermission', e.target.value)}
                className="border border-gray-300 p-2 w-full rounded text-black"
                required
              >
                <option value="Ops Editable">Ops Editable</option>
                <option value="User Editable">User Editable</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-black" htmlFor="paramShape">Shape</label>
              <select
                id="paramShape"
                value={parameter.shape}
                onChange={(e) => handleParameterChange('shape', e.target.value)}
                className="border border-gray-300 p-2 w-full rounded text-black"
                required
              >
                <option value="StringShape">StringShape</option>
                <option value="MoneyShape">MoneyShape</option>
                <option value="DenominationShape">DenominationShape</option>
              </select>
            </div>
          </div>
        )}

        {/* Submit Button */}
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
