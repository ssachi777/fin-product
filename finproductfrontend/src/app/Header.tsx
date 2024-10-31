"use client"; // Mark this file as a Client Component

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import homeIcon from './homeicon.png'; // Adjust the path as needed
import productIcon from './producticon.png'; // Adjust the path as needed
import productManageIcon from './productmanage.png'; // Path for product management icon

const Header: React.FC = () => {
  const router = useRouter();

  const handleHomeIconClick = () => {
    router.push('/'); // Redirect to the main (first) page
  };

  const handleProductManageIconClick = () => {
    router.push('/Admin/view-products'); // Redirect to the product management page
  };

  return (
    <header
      className="flex justify-between items-center w-full p-2"
      style={{
        background: 'linear-gradient(to right, rgba(227, 77, 103, 0.3), rgba(192, 75, 149, 0.3), rgba(119, 70, 244, 0.3))',
        height: '65px', // Adjust the height as needed
        position: 'fixed', // Fixed at the top
        top: 0, // Ensures it stays at the top
        zIndex: 10, // Keeps the header above other content
        width: '100%', // Ensures full width for the header
        
      }}
    >
      <div className="relative left-1">
        {/* Home Icon */}
        <Image
          src={homeIcon}
          alt="Home Icon"
          width={55}
          height={55}
          className="cursor-pointer"
          onClick={handleHomeIconClick} // Redirect to main page on click
        />

        {/* Product Icon */}
        <div className="absolute left-1 top-full mt-3 group flex items-center">
          <Image
            src={productIcon}
            alt="Product Icon"
            width={45}
            height={45}
            className="cursor-pointer"
          />
          {/* Hover text for Product Icon */}
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

        {/* Product Management Icon (placed below Product Icon) */}
        <div className="absolute left-1 top-[calc(100%+3.3rem)] mt-1 group flex items-center">
          <Image
            src={productManageIcon}
            alt="Product Management Icon"
            width={35}
            height={35}
            className="cursor-pointer"
            onClick={handleProductManageIconClick} // Redirect to Admin page
          />
          {/* Hover text for Product Management Icon */}
          <span
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-clip-text text-transparent whitespace-nowrap"
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
    </header>
  );
};

export default Header;
