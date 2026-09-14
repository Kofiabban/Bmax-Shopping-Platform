import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

const CategoryCard = ({ title, subtitle, image, link }) => {
  return (
    <Link 
      to={link} 
      className="group relative h-96 overflow-hidden bg-[#0a0a0c] border border-[#8B263E]/40 rounded-xs block transition-all duration-500 hover:border-[#8B263E]"
    >
      {/* Category Image with Scale & Glow Effects */}
      <ImageWithFallback
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-85"
      />

      {/* Dark Wine Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase transition-colors group-hover:text-[#B3395B]">
          {title}
        </h3>
        
        <p className="text-xs text-gray-300 mt-1 mb-4 uppercase tracking-wider font-medium">
          {subtitle}
        </p>

        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white border-b border-[#8B263E] w-max pb-1 group-hover:text-[#B3395B] group-hover:border-[#B3395B] transition-all duration-300">
          <span>Explore Collection</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;