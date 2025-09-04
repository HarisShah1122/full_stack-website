import React from 'react';

const ProductCard = ({ title, img }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <img
        src={img}
        alt={title}
        className="w-full h-96 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2 opacity-0 group-hover:opacity-100 transition duration-500">
        <p className="text-sm text-center">{title}</p>
      </div>
    </div>
  </div>
);

export default ProductCard;
