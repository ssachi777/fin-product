"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import styles from './UpdateProductPage.module.css';
import { FaHome, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const UpdateProductPage = () => {
    const router = useRouter();
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [selectedParameters, setSelectedParameters] = useState(new Set());
    const [error, setError] = useState(null);
    const [parameters, setParameters] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newParameter, setNewParameter] = useState({
        parameter_name: "",
        data_type: "",
        default_value: "",
        min_value: "",
        max_value: "",
        description: "",
    });
    const fetchProductId = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/products/latest-id/");
            if (!response.ok) {
                throw new Error("Failed to fetch product ID");
            }
            const data = await response.json();
            setProductId(data.new_product_id);
        } catch (err) {
            console.error("Error fetching product ID:", err);
            setError(err.message || "An error occurred while fetching the product ID");
        }
    };
    const handleAdminClick = () => {
        // Logic for admin button click
        router.push("/Admin/view-parameters")
        
      };
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

    useEffect(() => {
        fetchProductId();
        fetchParameters();

        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSave = async () => {
        if (!productId || !productName || !productDescription) {
            alert("Please fill in all the fields.");
            return;
        }

        const productData = {
            product_id: productId,
            product_name: productName,
            description: productDescription,
            status: "active",
            instantiated_at: new Date().toISOString(),
            is_custom: false,
            parent_product_id: null
        };

        try {
            const response = await fetch("http://localhost:8001/api/products/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                alert("Product saved successfully!");

                // After saving the product, store the selected parameter values
                if (selectedParameters.size > 0) {
                    await Promise.all(
                        Array.from(selectedParameters).map(parameterId => 
                            saveProductParameter(productId, parameterId)
                        )
                    );
                }

            } else {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                alert(errorData.error || "Failed to save product");
            }
        } catch (err) {
            console.error("Error saving product:", err);
            alert("An error occurred while saving the product.");
        }
    };

    const saveProductParameter = async (productId, parameterId) => {
        const productParameterData = {
            product_id: productId,
            parameter_id: parameterId,
            created_at: new Date().toISOString()
        };

        try {
            const response = await fetch("http://localhost:8000/api/api/productparameters/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productParameterData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error saving product parameter:", errorData);
                alert("Failed to save product parameter");
            } else {
                alert("Parameter saved successfully!");
            }
        } catch (err) {
            console.error("Error saving product parameter:", err);
            alert("An error occurred while saving the product parameter.");
        }
    };

    const toggleParameterSelection = (parameterId) => {
        setSelectedParameters(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(parameterId)) {
                newSelected.delete(parameterId);
            } else {
                newSelected.add(parameterId);
            }
            return newSelected;
        });
    };

    const getSelectedCount = () => selectedParameters.size;
    const handleAddParameter = async () => {
        try {
            const response = await fetch("http://localhost:8002/api/parameters/create/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newParameter),
            });

            if (!response.ok) throw new Error("Failed to create parameter");

            setNewParameter({
                parameter_name: "",
                data_type: "",
                default_value: "",
                min_value: "",
                max_value: "",
                description: "",
            });
            fetchParameters();
            setIsAddModalOpen(false);
            alert("Parameter added successfully!");
        } catch (err) {
            console.error("Error creating parameter:", err);
            setError(err.message || "An error occurred while creating the parameter");
        }
    };
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.topBar}>
                <button className={styles.iconButton}>
                    <FaHome size={20} />
                </button>
                <button className={styles.iconButton}>
                    <FaSignOutAlt size={20} />
                </button>
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>Add Product</h1>
                <div className={styles.card}>
                    <div className={styles.horizontalRow}>
                        <div className={styles.label}>Product ID:</div>
                        <div className={styles.value}>{productId ? `${productId}` : "Loading..."}</div>

                        <div className={styles.label}>Status:</div>
                        <div className={styles.value}>Active</div>

                        <div className={styles.label}>Instantiated at:</div>
                        <div className={styles.value}>2024-10-15 12:34</div>
                    </div>
                    <div className={styles.horizontalRow}>
                        <div className={styles.label}>Current State:</div>
                        <div className={styles.value}>Processing</div>

                        <div className={styles.label1}>Current State Expiry:</div>
                        <div className={styles.value1}>2024-10-20 12:34</div>
                        <div className={styles.label}> </div>
                        <div className={styles.value}> </div>
                    </div>
                </div>
                <div className={styles.smallCard}>
                    <h1 className={styles.title1}>Product Description</h1>
                </div>
                <div className={styles.horizontalRow1}>
                    <textarea
                        className={styles.textbox1}
                        placeholder="Enter product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    ></textarea>
                    <textarea
                        className={styles.textbox}
                        placeholder="Enter product description here..."
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles.smallCard}>
                    <h1 className={styles.title1}>Parameters</h1>
                </div>
                <div className={styles.horizontalRow2}>
                    <div className={styles.dropdownContainer}>
                        <button className={styles.dropdownButton}>
                            {`Select Parameter (${getSelectedCount()})`} 
                        </button>
                        <div className={styles.dropdownContent}>
                            <div className={styles.scrollableCheckboxes}>
                                {parameters.map((parameter) => (
                                    <label key={parameter.parameter_id} className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={selectedParameters.has(parameter.parameter_id)}
                                            onChange={() => toggleParameterSelection(parameter.parameter_id)}
                                        />
                                        <span style={{ marginLeft: '10px' }}>{parameter.parameter_name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button 
                        className={styles.parameterButton} 
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add Parameter
                    </button>
                    <button className={styles.customizeButton}
                        onClick={handleAdminClick}>
                        Customize Parameter
                    </button>

                </div>

                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.saveButton} onClick={handleSave}>SUBMIT</button>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Add Parameter</h2>
                        <form>
                            <label>Parameter Name:</label>
                            <input
                                className="border p-2 mb-2 w-full"
                                type="text"
                                value={newParameter.parameter_name}
                                onChange={(e) =>
                                    setNewParameter({ ...newParameter, parameter_name: e.target.value })
                                }
                            />
                            <label>Data Type:</label>
                            <input
                                className="border p-2 mb-2 w-full"
                                type="text"
                                value={newParameter.data_type}
                                onChange={(e) =>
                                    setNewParameter({ ...newParameter, data_type: e.target.value })
                                }
                            />
                            <label>Default Value:</label>
                            <input
                                className="border p-2 mb-2 w-full"
                                type="text"
                                value={newParameter.default_value}
                                onChange={(e) =>
                                    setNewParameter({ ...newParameter, default_value: e.target.value })
                                }
                            />
                            <label>Min Value:</label>
                            <input
                                className="border p-2 mb-2 w-full"
                                type="number"
                                value={newParameter.min_value}
                                onChange={(e) =>
                                    setNewParameter({ ...newParameter, min_value: e.target.value })
                                }
                            />
                            <label>Max Value:</label>
                            <input
                                className="border p-2 mb-2 w-full"
                                type="number"
                                value={newParameter.max_value}
                                onChange={(e) =>
                                    setNewParameter({ ...newParameter, max_value: e.target.value })
                                }
                            />
                            <label>Description:</label>
                            <textarea
                                className="border p-2 mb-2 w-full"
                                value={newParameter.description}
                                onChange={(e) =>
                                    setNewParameter({ ...newParameter, description: e.target.value })
                                }
                            ></textarea>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gradient-to-r from-[#E34D67] via-[#C04B95] to-[#7746F4] text-white px-4 py-2 rounded mr-2"
                                    onClick={handleAddParameter}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProductPage;