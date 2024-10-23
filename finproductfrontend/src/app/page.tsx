"use client"; // Mark this file as a Client Component

import React, { useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { useRouter } from 'next/navigation'; // Import useRouter
import homeIcon from './homeicon.png'; // Adjust the path as needed
import productIcon from './producticon.png'; // Adjust the path as needed
import productManageIcon from './productmanage.png'; // Path for product management icon

const HomePage: React.FC = () => {
  const [showProductIcon, setShowProductIcon] = useState<boolean>(false); // State for toggling product icon
  const [showManageIcon, setShowManageIcon] = useState<boolean>(false); // State for toggling product management icon
  const router = useRouter(); // Initialize the router

  const handleHomeIconClick = () => {
    setShowProductIcon(true); // Show the product icon
  };

  const handleProductIconClick = () => {
    setShowManageIcon(true); // Show the product management icon when product icon is clicked
  };

  const handleProductManageIconClick = () => {
    router.push('/Admin'); // Redirect to the product management page
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Header with reduced size */}
      <header
        className="flex justify-between items-center w-full p-2" // Adjust padding here
        style={{
          background: 'linear-gradient(to right, rgba(227, 77, 103, 0.3), rgba(192, 75, 149, 0.3), rgba(119, 70, 244, 0.3))',
          height: '65px', // Set a fixed height for the header
        }}
      >
        <div className="relative left-1">
          {/* Home Icon */}
          <Image
            src={homeIcon}
            alt="Home Icon"
            width={55} // Adjusted icon size for smaller header
            height={55}
            className="cursor-pointer"
            onClick={handleHomeIconClick} // Show product icon
          />

          {/* Product Icon */}
          {showProductIcon && (
            <div className="absolute left-1 top-full mt-3">
              <div className="flex items-center group">
                <Image
                  src={productIcon}
                  alt="Product Icon"
                  width={45} // Adjusted icon size for smaller header
                  height={45}
                  className="cursor-pointer"
                  onClick={handleProductIconClick} // Show product management icon
                />
                {/* Tooltip for product icon */}
                <span
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-clip-text text-transparent"
                  style={{
                    background: 'linear-gradient(to right, rgba(227, 77, 103, 1), rgba(192, 75, 149, 1), rgba(119, 70, 244, 1))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Products
                </span>
              </div>

              {/* Product Management Icon (below Product Icon) */}
              {showManageIcon && (
                <div className="absolute left-0 top-full mt-1">
                  <div className="flex items-center group">
                    <Image
                      src={productManageIcon} // Path for product management icon
                      alt="Product Management Icon"
                      width={35} // Adjusted icon size for smaller header
                      height={35}
                      className="cursor-pointer"
                      onClick={handleProductManageIconClick} // Redirect to product management page
                    />
                    {/* Tooltip for product management icon */}
                    <span
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-clip-text text-transparent"
                      style={{
                        background: 'linear-gradient(to right, rgba(227, 77, 103, 1), rgba(192, 75, 149, 1), rgba(119, 70, 244, 1))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Product Management
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Content area with centered text */}
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-xl font-bold text-center">Welcome to Fincore</h1>
      </div>
    </div>
  );
};

export default HomePage;
