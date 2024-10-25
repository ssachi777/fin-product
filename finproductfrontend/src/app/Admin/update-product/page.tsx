"use client";
import React, { useEffect, useState } from "react";
import styles from './UpdateProductPage.module.css';
import { FaHome, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';

const UpdateProductPage = () => {
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [selectedParameters, setSelectedParameters] = useState(new Set());
    const [error, setError] = useState(null);
    const [parameters, setParameters] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

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
            const response = await fetch("http://localhost:8000/api/products/create/", {
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

    return (
        <div>
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
                    <button className={styles.parameterButton}>Add Parameter</button>
                    <button className={styles.customizeButton}>Customize Parameter</button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.saveButton} onClick={handleSave}>SUBMIT</button>
            </div>
        </div>
    );
};

export default UpdateProductPage;
