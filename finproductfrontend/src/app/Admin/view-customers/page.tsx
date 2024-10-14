'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Account {
  account_id: number;
  product: number;
  admin_id: number;
  account_name: string;
  status: string;
  created_at: string;
}

const AccountDataTable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/adminid/1001/');
        setAccounts(response.data); 
        console.log(response.data); // Set the accounts state
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Accounts</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Account ID</th>
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Admin ID</th>
            <th className="border px-4 py-2">Account Name</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.account_id}>
              <td className="border px-4 py-2">{account.account_id}</td>
              <td className="border px-4 py-2">{account.product}</td>
              <td className="border px-4 py-2">{account.admin_id}</td>
              <td className="border px-4 py-2">{account.account_name}</td>
              <td className="border px-4 py-2">{account.status}</td>
              <td className="border px-4 py-2">{new Date(account.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountDataTable;
