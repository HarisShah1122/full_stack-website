import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const TraditionalDress = () => {
  // Sample traditional dresses (replace with API data)
  const dresses = [
    { id: 'trad-1', title: 'Traditional Dress 1', img: '/assets/womens/traditional-1.jpg' },
    { id: 'trad-2', title: 'Traditional Dress 2', img: '/assets/womens/traditional-2.jpg' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Traditional Dresses</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dresses.map(dress => (
          <Link key={dress.id} to={`/product/${dress.id}`}>
            <ProductCard title={dress.title} img={dress.image} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TraditionalDress;