import React from 'react';

const SubcategoryCard = ({ title, img, description }) => (
  <div className="text-center group cursor-pointer">
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-3 opacity-0 group-hover:opacity-100 transition duration-500">
        <h4 className="font-semibold text-md">{title}</h4>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  </div>
);

export default SubcategoryCard;
