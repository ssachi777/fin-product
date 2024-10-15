"use client";

import React, { useEffect, useState } from "react";

const ManageParametersPage: React.FC = () => {
  const [parameters, setParameters] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedParameter, setSelectedParameter] = useState<any | null>(null);
  const [newParameter, setNewParameter] = useState({
    parameter_name: "",
    data_type: "",
    default_value: "",
    min_value: "",
    max_value: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParameters();
  }, []);

  const fetchParameters = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/parameters/");
      if (!response.ok) {
        throw new Error("Failed to fetch parameters");
      }
      const data = await response.json();
      setParameters(data);
    } catch (err) {
      console.error("Error fetching parameters:", err);
      setError(err.message || "An error occurred while fetching parameters");
    }
  };

  const handleOpenModal = (parameter: any) => {
    setSelectedParameter(parameter);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedParameter(null);
  };

  const handleSaveParameter = async () => {
    if (selectedParameter) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/parameters/${selectedParameter.parameter_id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedParameter),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update parameter");
        }

        fetchParameters();
        handleCloseModal();
        alert("Parameter updated successfully!");
      } catch (err) {
        console.error("Error updating parameter:", err);
        setError(err.message || "An error occurred while updating the parameter");
      }
    }
  };

  const handleAddParameter = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/parameters/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParameter),
      });

      if (!response.ok) {
        throw new Error("Failed to create parameter");
      }

      setNewParameter({
        parameter_name: "",
        data_type: "",
        default_value: "",
        min_value: "",
        max_value: "",
        description: "",
      });
      fetchParameters();
      handleCloseModal();
      alert("Parameter added successfully!");
    } catch (err) {
      console.error("Error creating parameter:", err);
      setError(err.message || "An error occurred while creating the parameter");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-6">Manage Parameters</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Parameter
      </button>
      <table className="border border-black w-1/2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-2">Parameter Name</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((parameter) => (
            <tr key={parameter.parameter_id}>
              <td className="border border-black p-2">{parameter.parameter_name}</td>
              <td className="border border-black p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleOpenModal(parameter)}
                >
                  Update Parameter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(isModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">
              {isAddModalOpen ? "Add Parameter" : "Update Parameter"}
            </h2>
            <form>
              <label className="block mb-2">Parameter Name:</label>
              <input
                className="border p-2 mb-2 w-full"
                type="text"
                value={
                  isAddModalOpen
                    ? newParameter.parameter_name
                    : selectedParameter?.parameter_name
                }
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewParameter({ ...newParameter, parameter_name: e.target.value })
                    : setSelectedParameter({ ...selectedParameter, parameter_name: e.target.value })
                }
              />
              <label className="block mb-2">Data Type:</label>
              <input
                className="border p-2 mb-2 w-full"
                type="text"
                value={
                  isAddModalOpen
                    ? newParameter.data_type
                    : selectedParameter?.data_type
                }
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewParameter({ ...newParameter, data_type: e.target.value })
                    : setSelectedParameter({ ...selectedParameter, data_type: e.target.value })
                }
              />
              <label className="block mb-2">Default Value:</label>
              <input
                className="border p-2 mb-2 w-full"
                type="text"
                value={
                  isAddModalOpen
                    ? newParameter.default_value
                    : selectedParameter?.default_value
                }
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewParameter({ ...newParameter, default_value: e.target.value })
                    : setSelectedParameter({ ...selectedParameter, default_value: e.target.value })
                }
              />
              <label className="block mb-2">Min Value:</label>
              <input
                className="border p-2 mb-2 w-full"
                type="number"
                value={
                  isAddModalOpen
                    ? newParameter.min_value
                    : selectedParameter?.min_value
                }
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewParameter({ ...newParameter, min_value: e.target.value })
                    : setSelectedParameter({ ...selectedParameter, min_value: e.target.value })
                }
              />
              <label className="block mb-2">Max Value:</label>
              <input
                className="border p-2 mb-2 w-full"
                type="number"
                value={
                  isAddModalOpen
                    ? newParameter.max_value
                    : selectedParameter?.max_value
                }
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewParameter({ ...newParameter, max_value: e.target.value })
                    : setSelectedParameter({ ...selectedParameter, max_value: e.target.value })
                }
              />
              <label className="block mb-2">Description:</label>
              <textarea
                className="border p-2 mb-2 w-full"
                value={
                  isAddModalOpen
                    ? newParameter.description
                    : selectedParameter?.description
                }
                onChange={(e) =>
                  isAddModalOpen
                    ? setNewParameter({ ...newParameter, description: e.target.value })
                    : setSelectedParameter({ ...selectedParameter, description: e.target.value })
                }
              ></textarea>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={isAddModalOpen ? handleAddParameter : handleSaveParameter}
              >
                {isAddModalOpen ? "Add Parameter" : "Save Parameter"}
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageParametersPage;
