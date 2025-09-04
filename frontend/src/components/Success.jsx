import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const orderId = searchParams.get('orderID');
    if (orderId && token) {
      const captureOrder = async () => {
        try {
          const response = await fetch('http://localhost:8081/api/paypal/capture-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
          });
          const data = await response.json();
          if (response.ok) {
            alert('Payment successful!');
            navigate('/');
          } else {
            alert('Payment capture failed.');
            navigate('/');
          }
        } catch (error) {
          console.error('Error capturing payment:', error);
          alert('Server error. Please contact support.');
          navigate('/');
        }
      };
      captureOrder();
    }
  }, [searchParams, token, navigate]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Processing Payment...</h1>
      <p className="text-gray-600 mt-4">Please wait while we process your payment.</p>
    </div>
  );
};

export default Success;