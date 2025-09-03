import React from 'react';

const CategoryCard = ({ title, img, description }) => (
  <div className="text-center">
    <div className="bg-transparent shadow-sm overflow-hidden">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-80 object-contain"
        loading="lazy"
      />
    </div>
    <h4 className="font-semibold text-gray-800 text-sm mt-2">{title}</h4>
    <p className="text-gray-500 text-xs">{description}</p>
  </div>
);

export default CategoryCard;