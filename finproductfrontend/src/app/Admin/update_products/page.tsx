"use client";
import React, { useCallback, useState } from 'react';
import './update_products.css'; 
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


const UpdateProductPage: React.FC = () => {
  const [productId, setProductId] = useState(1021);
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
  const [showProductFields, setShowProductFields] = useState(false);

  

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the form from refreshing the page
  
    const productData = {
      product_name: productName,
      description: productDescription,
    };
  
    try {
      // Sending POST request to create product
      const response = await fetch("http://localhost:8000/api/products/update/1021/", {
        method: "PUT",
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
        const parameterData = { selected_parameters: selectedParameters };
        const paramsResponse = await fetch('http://localhost:8000/api/products/parameters/update/1021', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parameterData),
        });
        console.log(JSON.stringify(parameterData));
        

        
          // Reset form fields
          setProductName("");
          setProductId(1021);
          setProductDescription("");
          setSelectedParameters([]);
      
        } else {
          console.error("Product ID not found in the response");
          alert("Failed to create product. Product ID missing.");
        }
      }
    
    catch (err) {
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
    setSelectedParameters((prev) =>
      prev.includes(parameterId)
        ? prev.filter((id) => id !== parameterId)
        : [...prev, parameterId]
    );
  };


  const handleUpdateProductClick = async () => {
    setShowProductFields(!showProductFields); // Toggle visibility of product fields

    if (productId) {
      try {
        const response = await fetch('http://localhost:8000/api/products/1021/');
        if (response.ok) {
          const data = await response.json();
          setProductName(data.product_name);
          setProductDescription(data.description);
          console.log(data);
      const productParamsResponse = await fetch('http://localhost:8000/api/api/products/parameters/1021/');
      const productParamsData = await productParamsResponse.json();
      const currentParameterIds = productParamsData.map((param: { parameter_id: string }) => param.parameter_id);
      setSelectedParameters(currentParameterIds);
      console.log(currentParameterIds);   
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    }
  };
//   useEffect(() => {
//     fetchParameters;
//     fetchProductData();
//   }, [fetchParameters, productId]);


  return (
    <div className='container'>
    <div className="nav">
    
        <div className='home' > <FaHome size={20}/></div>
    </div>
    <div className='logout-icons'> <FaSignOutAlt size={20} /></div>
    <div className='icons'>  <div className='icon'><FaCog size={24} /></div></div>
    <div className='heading'>
        Upadate Product
    </div>
    <div className='update-button' ><button  onClick={handleUpdateProductClick}>Update Product</button></div>
    <div className='addProduct-container'>
    <form onSubmit={handleSubmit}>
        {/* First Row: Product Id, Status, Instantiated At */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productId">Product Id :</label>
            <span>{productId}</span>
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
    {showProductFields && (
        <>
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
            {/* Render parameter list and selection logic here */}
            {/* Example: */}
            </div>
            
            <div className='parameter-buttons'>
    <button type="button" className='button-1' onClick={() => {
    if (!showParameterList) {
      fetchParameters(); // Fetch parameters only when list is not visible
    } else {
      setShowParameterList(false); // Hide the list when clicked again
    }
  }} > {showParameterList ? 'Update Parameter' : 'Update Parameter'} </button>
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
          
          
          <button className='button-submit'onClick={handleSubmit} >Submit</button>
        </>
         )}
   </div>
  );
};
export default UpdateProductPage;
