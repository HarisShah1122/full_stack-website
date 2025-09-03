import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const Unstitched = () => {
  return (
    <div className="bg-white font-sans p-6">
      <h3 className="text-lg font-medium mb-6 text-center">
        UNSTITCHED COLLECTION
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto">
        <Link to="/product/unstitched-dress-1">
          <ProductCard title="Unstitched Dress 1" img="/assets/unstitched/unstitched-1.jpg" />
        </Link>
        <Link to="/product/unstitched-dress-2">
          <ProductCard title="Unstitched Dress 2" img="/assets/unstitched/casual-1.jpg" />
        </Link>
        <Link to="/product/female-unstitched">
          <ProductCard title="Unstitched Female Dress" img="/assets/womens/unstiched-female-1.jpg" />
        </Link>
      </div>
    </div>
  );
};

export default Unstitched;