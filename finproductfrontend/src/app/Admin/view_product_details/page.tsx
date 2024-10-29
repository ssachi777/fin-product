'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ProductDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [productDetails, setProductDetails] = useState<any>(null);
  const [parameters, setParameters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details
  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:8000/api/products/${productId}/`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch product details');
          return response.json();
        })
        .then(data => {
          console.log("Product details fetched:", data);
          setProductDetails(data);
        })
        .catch((err) => {
          console.error("Error fetching product details:", err);
          setError('Failed to load product details');
        });
    }
  }, [productId]);

  // Fetch parameter IDs and then fetch parameter details for each
  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:8000/api/products/parameters/${productId}/`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch parameter IDs');
          return response.json();
        })
        .then(parameterIds => {
          console.log("Parameter IDs fetched:", parameterIds);

          const fetchParameterDetails = parameterIds.map((param: { parameter_id: string }) =>
            fetch(`http://localhost:8000/api/parameters/list/${param.parameter_id}`)
              .then(response => {
                if (!response.ok) throw new Error(`Failed to fetch parameter ${param.parameter_id}`);
                return response.json();
              })
          );

          Promise.all(fetchParameterDetails)
            .then(details => {
              console.log("Parameter details fetched:", details);

              // Flatten the array of arrays into a single array
              setParameters(details.flat());
            })
            .catch((err) => {
              console.error("Error fetching parameter details:", err);
              setError('Failed to load product parameters');
            });
        })
        .catch((err) => {
          console.error("Error fetching parameter IDs:", err);
          setError('Failed to load parameter IDs');
        });
    }
  }, [productId]);

  if (error) return <p>{error}</p>;
  if (!productDetails) return <p>Loading product details...</p>;

  console.log("Current Product Details:", productDetails);
  console.log("Current Parameters State:", parameters);

  return (
    <div className="container">
      <h1>Product Details</h1>
      <p><strong>Name:</strong> {productDetails.product_name}</p>
      <p><strong>ID:</strong> {productDetails.product_id}</p>
      <p><strong>Description:</strong> {productDetails.description}</p>

      {/* Display product parameters */}
      {parameters.length > 0 ? (
        <div>
          <h2>Parameters</h2>
          <ul>
            {parameters.map((param: any) => (
              <li key={param.parameter_id}> {/* Ensure parameter_id is used as the key */}
                <p><strong>Name:</strong> {param.parameter_name}</p>
                <p><strong>Default Value:</strong> {param.default_value || 'N/A'}</p>
                <p><strong>Description:</strong> {param.description || 'N/A'}</p>
                <p><strong>Data Type:</strong> {param.data_type || 'N/A'}</p>
                <p><strong>Min Value:</strong> {param.min_value || 'N/A'}</p>
                <p><strong>Max Value:</strong> {param.max_value || 'N/A'}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No parameters assigned to this product.</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
