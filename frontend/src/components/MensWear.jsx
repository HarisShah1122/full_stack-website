import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const MensWear = () => {
  return (
    <div className="bg-white font-sans p-6">
      <h3 className="text-lg font-medium mb-6 text-center">
        MEN'S WEAR COLLECTION
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto">
        <Link to="/product/shalwar-kameez">
          <ProductCard title="Shalwar Kameez" img="/assets/mens/shalwar-kameez-1.jpg" />
        </Link>
        <Link to="/product/kurta-pajama">
          <ProductCard title="Kurta Pajama" img="/assets/mens/kurta-pajama-1.jpg" />
        </Link>
        <Link to="/product/party-wear">
          <ProductCard title="Party Dress 1" img="/assets/mens/party-dress-1.jpg" />
        </Link>
        <Link to="/product/party-wear">
          <ProductCard title="Party Dress 2" img="/assets/mens/party-dress-2.jpg" />
        </Link>
      </div>
    </div>
  );
};

export default MensWear;