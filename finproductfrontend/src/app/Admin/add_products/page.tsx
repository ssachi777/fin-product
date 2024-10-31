"use client";
import React, { useCallback, useState } from 'react';
import './add_products.css'; 
import { FaHome ,FaSignOutAlt,FaCog, FaUpload} from 'react-icons/fa';
interface Parameter {
  parameter_id: string;
  parameter_name: string;
}
interface Parameter {
  parameter_id: string;
  parameter_name: string;
  data_type: string;
  default_value: string;
  min_value: string;
  max_value: string;
  description: string;
  created_at: string;
}


const CreateProductPage: React.FC = () => {
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [loading, setLoading] = useState(false);
  const [showParameterList, setShowParameterList] = useState(false);
  const [showCustomParameterForm, setShowCustomParameterForm] = useState(false);
  const [customParameter, setCustomParameter] = useState({
    parameter_name: '',
    data_type: '',
    default_value: '',
    min_value: '',
    max_value: '',
    description: ''
  });
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);

  const handleCustomParameterToggle = () => {
    setShowCustomParameterForm(!showCustomParameterForm);
  };
  const handleCustomParameterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Custom parameter added:', customParameter);
    
    // You can send this custom parameter to the backend or add it to a list here
    // Example: Send the custom parameter to the backend
    // await fetch('/api/parameters/create', { method: 'POST', body: JSON.stringify(customParameter), headers: { 'Content-Type': 'application/json' } });

    // Reset form after submission
    setCustomParameter({
      parameter_name: '',
      data_type: '',
      default_value: '',
      min_value: '',
      max_value: '',
      description: ''
    });

    setShowCustomParameterForm(false); // Hide form after submission
  };
  

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the form from refreshing the page
  
    const productData = {
      product_name: productName,
      description: productDescription,
      status: "active",
      instantiated_at: new Date().toISOString(),
      is_custom: false,
      parent_product_id: null,
    };
  
    try {
      // Sending POST request to create product
      const response = await fetch("http://localhost:8001/api/products/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json(); // Get response JSON data
      console.log("Full response data:", data); // Log the entire response to check what comes back
      
      if (response.ok) {
        // Extracting product_id instead of id
        const createdProduct = data;
        console.log("Created product:", createdProduct);

        if (createdProduct && createdProduct.product_id) {
          console.log(createdProduct.product_id, "Product Created Successfully");

          // Submitting parameters for the created product
          const parameterPromises = selectedParameters.map(async (parameterId) => {
            const paramResponse = await fetch("http://localhost:8000/api/api/productparameters/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                product_id: createdProduct.product_id, // Using the correct product_id field
                parameter_id: parameterId,
                created_at: new Date().toISOString(),
              }),
            });
            
            const paramData = await paramResponse.json();
            console.log("Parameter response:", paramData); // Log parameter response
          });

          await Promise.all(parameterPromises); // Wait for all parameters to be saved

          alert("Product and Parameters created successfully!");

          // Reset form fields
          setProductName("");
          setProductId(null);
          setProductDescription("");
          setSelectedParameters([]);

        } else {
          console.error("Product ID not found in the response");
          alert("Failed to create product. Product ID missing.");
        }
      } else {
        // Log error response details
        const errorData = await response.json();
        console.error("Error response from product creation:", errorData);
        alert(errorData.error || "Failed to save product.");
      }
    } catch (err) {
      console.error("Error saving product:", err);
      alert("An error occurred while saving the product.");
    }
};

  
  
   // Handler for fetching parameters
   const fetchParameters = useCallback(async () => {
    setLoading(true); // Start loading state
    try {
      const response = await fetch("http://localhost:8000/api/parameters/");
      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        // Update parameters only if they differ from current state
        setParameters(prevParams => {
          if (JSON.stringify(prevParams) !== JSON.stringify(data)) {
            return data; // Update only if the data is different
          }
          return prevParams; // No change
        });
        setShowParameterList(true); // Show the parameter list
      } else {
        setShowParameterList(false); // Hide the list if no parameters
      }
    } catch (err) {
      console.error("Error fetching parameters:", err);
    } finally {
      setLoading(false); // End loading state
    }
  }, []);

  const handleParameterSelect = (parameterId: string) => {
    if (selectedParameters.includes(parameterId)) {
      setSelectedParameters(selectedParameters.filter((id) => id !== parameterId));
    } else {
      setSelectedParameters([...selectedParameters, parameterId]);
    }
  };

  return (
    <div className='container'>
    <div className="nav">
    
        <div className='home' > <FaHome size={20}/></div>
    </div>
    <div className='logout-icons'> <FaSignOutAlt size={20} /></div>
    <div className='icons'>  <FaCog size={24} /></div>
    <div className='heading'>
        Add Product
    </div>
    <div className='addProduct-container'>
    <form onSubmit={handleSubmit}>
        {/* First Row: Product Id, Status, Instantiated At */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productId">Product Id :</label>
            <span>14df563</span>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status :</label>
            <span>Active</span>
          </div>

          <div className="form-group">
            <label htmlFor="">Instantiated At :</label>
            <span>14-04-2001</span>
          </div>
        </div>

        {/* Second Row: Current State, Current State Expiry */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="currentState">Current State :</label>
            
          </div>

          <div className="form-group">
            <label htmlFor="currentStateExpiry">Current State Expiry :</label>
            
          </div>
        </div>
      </form>


    </div>
    <div className='process-description'>
      <div className='subheading-container'> <h2 className='subheading'>Product Description</h2></div>
       
    </div>
    <div className='process-description-values'>
      <textarea
          className="textbox-1"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}>
      </textarea> 
      <textarea
          className="textbox-2"
          placeholder="Enter product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}>
      </textarea> 
    </div>
    <div className='parameters'>
      <div className='subheading-container'>
      <h2 className='subheading'>Parameters</h2>
      </div>
        
    </div>
    <div className='parameter-buttons'>
    <button type="button" className='button-1' onClick={() => {
    if (!showParameterList) {
      fetchParameters(); // Fetch parameters only when list is not visible
    } else {
      setShowParameterList(false); // Hide the list when clicked again
    }
  }} > {showParameterList ? 'Add Parameters' : 'Add Parameters'} </button>
    <button className='button-2' onClick={handleCustomParameterToggle}> {showCustomParameterForm ? 'Add Customizing Parameter' : 'Add Customizing Parameter'}</button>
    </div>
    
    {showParameterList && parameters.length > 0 && (
          <div className="parameter-list">
            <h3>Select Parameters:</h3>
            <ul>
              {parameters.map((param) => (
                <li key={param.parameter_id}>
                  <label>
                    <input
                      type="checkbox"
                      value={param.parameter_id}
                      checked={selectedParameters.includes(param.parameter_id)}
                      onChange={() => handleParameterSelect(param.parameter_id)}
                    />
                    {param.parameter_name} 
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
       
       {showCustomParameterForm && (
        <form onSubmit={handleCustomParameterSubmit} className="custom-parameter-form">
          <div>
            <label>Parameter Name:</label>
            <input
              type="text"
              name="parameter_name"
              value={customParameter.parameter_name}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Data Type:</label>
            <input
              type="text"
              name="data_type"
              value={customParameter.data_type}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Default Value:</label>
            <input
              type="text"
              name="default_value"
              value={customParameter.default_value}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Min Value:</label>
            <input
              type="number"
              name="min_value"
              value={customParameter.min_value}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Max Value:</label>
            <input
              type="number"
              name="max_value"
              value={customParameter.max_value}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={customParameter.description}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div className='buttons'>
          <button type="submit">Add</button>
          <button type="submit">Cancel</button>
          </div>
          
        </form>
      )}
    <button className='button-submit'onClick={handleSubmit} >Submit</button>
    </div>
    
  );
};
export default CreateProductPage;
