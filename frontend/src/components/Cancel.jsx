
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Payment Cancelled</h1>
      <p className="text-gray-600 mt-4">
        Your payment was cancelled. Please try again or choose another payment method.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-800"
      >
        Return to Home
      </button>
    </div>
  );
};

export default Cancel;