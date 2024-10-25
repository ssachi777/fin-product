"use client";

import React, { useEffect, useState } from "react";
import styles from './ManageParametersPage.module.css'; // Import the CSS module

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
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Parameters</h1>
      {error && <p className={styles.error}>{error}</p>}
      <button
        className={styles.addButton}
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Parameter
      </button>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.tableCell}>Parameter Name</th>
            <th className={styles.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((parameter) => (
            <tr key={parameter.parameter_id}>
              <td className={styles.tableCell}>{parameter.parameter_name}</td>
              <td className={styles.tableCell}>
                <button
                  className={styles.updateButton}
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {isAddModalOpen ? "Add Parameter" : "Update Parameter"}
            </h2>
            <form>
              <label className={styles.label}>Parameter Name:</label>
              <input
                className={styles.input}
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
              <label className={styles.label}>Data Type:</label>
              <input
                className={styles.input}
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
              <label className={styles.label}>Default Value:</label>
              <input
                className={styles.input}
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
              <label className={styles.label}>Min Value:</label>
              <input
                className={styles.input}
                type="text"
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
              <label className={styles.label}>Max Value:</label>
              <input
                className={styles.input}
                type="text"
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
              <label className={styles.label}>Description:</label>
              <textarea
                className={styles.textArea}
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
              />
              <button
                type="button"
                className={styles.submitButton}
                onClick={isAddModalOpen ? handleAddParameter : handleSaveParameter}
              >
                {isAddModalOpen ? "Add" : "Save"}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
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
