"use client";
import React, { useState } from 'react';
import './add_products.css'; 
import { FaHome ,FaSignOutAlt,FaCog, FaUpload} from 'react-icons/fa';

const CreateProductPage: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [tags, setTags] = useState('');
  const [productDescription, setProductDescription] = useState('');

  // Handler for form submission
  const handleSubmit = () => {
    
    // You can add form validation here if needed

    // Create a product object to send to the backend or process
    const newProduct = {
      productName,
      tags,
      productDescription
    };

    console.log(newProduct);

    // Reset form after submission if required
    setProductName('');
    setTags('');
    setProductDescription('');
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
            <label htmlFor="productId">Product Id</label>
            <input
              type="text"
              id="productId"
              name="productId"
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Instantiated At</label>
            <input
              type="text"
              id="instantiatedAt"
              name="instantiatedAt"
             
            />
          </div>
        </div>

        {/* Second Row: Current State, Current State Expiry */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="currentState">Current State</label>
            <input
              type="text"
              id="currentState"
              name="currentState"
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentStateExpiry">Current State Expiry</label>
            <input
              type="text"
              id="currentStateExpiry"
              name="currentStateExpiry"
             
            />
          </div>
        </div>
      </form>


    </div>
    <div className='process-description'>
        <h2>Process Description</h2>
    </div>
    <div className='process-description-values'>
      <div className='description-1'><p>Description</p> <span>No Value</span></div>
        
      <div className='description-2'><p>Affected Customer</p> <span>Core Tags</span></div>  
    </div>
    <div className='process-history'>
        <h2>Process History</h2>
    </div>
    <div className='related-process'>
        <h2>Related Process</h2>
        
    </div>
    <div className='description'><p>No related Process</p> </div>
    <div className='process-description'>
        <h2>Assosiated Task</h2>
    </div>
    <div className='description'><p>No related Process</p> </div>
    <div className='process-action'>
        <h2>Process Action</h2>
    </div >
    <div className='action-option'><div  className='action-option-1'><input type="checkbox" /><p>Upload Contract File</p></div>
    <div className='action-option-1'><input type="checkbox" /><p>Cancel Process</p></div>
    </div>

    <div className="upload-container">
      <label className="upload-box">
        <input type="file"  />
        <div className="upload-content">
          <FaUpload className="upload-icon" />
          <p className="upload-text">Contract file</p>
          <p className="upload-subtext">
            
          </p>
        </div>
      </label>
    </div>

    

   
    <div className='process-diagram'>
        <h2>Process Diagram</h2>
    </div>
    <div className='description'><p>No related Process</p> </div>
    <div className='advance-details'>
        <h2>Advance Details</h2>
    </div>
    <div className='description'><p>No related Process</p> </div>
    </div>
    
  );
};

export default CreateProductPage;
