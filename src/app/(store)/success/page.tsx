import React from 'react';
import Link from 'next/link';

const SuccessPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Success!</h1>
        <p className="text-lg mb-8">Your order has been placed successfully.</p>
        <div className="flex space-x-4">
          <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
           
              Return to Homepage
            
          </Link>
          <Link href="/orders"  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300">
           
              See Orders
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;