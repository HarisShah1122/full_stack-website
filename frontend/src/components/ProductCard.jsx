import React from 'react';

const ProductCard = ({ title, img }) => (
  <div className="bg-transparent shadow p-2">
    <img
      src={img}
      alt={title}
      className="w-full h-80 object-contain mb-2"
      loading="lazy"
    />
    <p className="text-sm text-center">{title}</p>
  </div>
);

export default ProductCard;