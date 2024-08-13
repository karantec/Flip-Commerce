import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ThankYouPage = () => {
  const location = useLocation();
  const { totalAmount } = location.state || { totalAmount: 0 };

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Thank You for Your Order!</h1>
      <p className="text-2xl mb-6">Your total amount: ${totalAmount.toFixed(2)}</p>
      <p className="text-lg mb-8">We appreciate your business and hope you enjoy your purchase.</p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 text-lg">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYouPage;