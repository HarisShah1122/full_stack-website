import React from 'react';

const SubcategoryCard = ({ title, img, description }) => (
  <div className="text-center transition-transform duration-300 hover:scale-105">
    <div className="bg-transparent shadow-sm overflow-hidden">
      <img 
        src={img} 
        alt={title} 
        className="w-40 h-40 sm:w-48 sm:h-48 object-contain mx-auto"
        loading="lazy"
      />
    </div>
    <h4 className="font-semibold text-gray-800 text-sm sm:text-base mt-2">{title}</h4>
    <p className="text-gray-500 text-xs sm:text-sm">{description}</p>
  </div>
);

export default SubcategoryCard;