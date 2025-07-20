import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const NotFound = () => {
   const { user } = useSelector(
      (state) => state.auth
    );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</p>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
     {
       user?.role==='user'? <Link
        to="/shop/home"
        className="mt-6 inline-block bg-black hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Go to Homepage
      </Link>:<Link
        to="/admin/dashboard"
        className="mt-6 inline-block bg-black hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Go to Dashboard
      </Link>
     }
    </div>
  );
};

export default NotFound;
