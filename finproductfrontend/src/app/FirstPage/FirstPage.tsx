import React from 'react';
import { useRouter } from 'next/navigation';


const FirstPage = () => {

    const router = useRouter();

  const handleAdminClick = () => {
    // Logic for admin button click
    router.push("/Admin")
    console.log('Admin button clicked');
  };

  // const handleCustomerClick = () => {
  //   // Logic for customer button click
  //   router.push("/Customer")
  //   console.log('Customer button clicked');
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome to Our Page</h1>
      <button
        onClick={handleAdminClick}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Product Management
      </button>
      {/* <button
        onClick={handleCustomerClick}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition mt-4"
      >
        Customer
      </button> */}
    </div>
  );
};

export default FirstPage;

