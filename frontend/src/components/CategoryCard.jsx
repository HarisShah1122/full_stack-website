import React from 'react';

const CategoryCard = ({ title, img, description }) => (
  <div className="text-center group cursor-pointer">
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-96 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition duration-500">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  </div>
);

export default CategoryCard;
