import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl font-bold text-yellow-500">403</h1>
      <p className="text-2xl font-semibold mt-4 text-gray-800">Access Denied</p>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        You don't have permission to access this page. Please go back to a valid section of the website.
      </p>
      <Link
        to="/shop/home"
        className="mt-6 inline-block bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default UnAuthPage;
