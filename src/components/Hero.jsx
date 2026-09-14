import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const Hero = () => {
  return (
    <div className="relative bg-[#0a0a0c] text-white min-h-[50vh] sm:min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden border-b border-[#8B263E]/40 group">
      {/* Background Banner Image with Fallback */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/banners/header-banner.jpg"
          alt="BMAX Hero Banner"
          className="w-full h-full object-cover object-center opacity-35 scale-105 group-hover:scale-100 transition-transform duration-1000"
        />
        {/* Transparent Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent backdrop-blur-[1px]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-16 lg:py-20">
        <div className="max-w-4xl space-y-3 sm:space-y-6">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[#2c1218]/80 border border-[#8B263E]/60 rounded-full backdrop-blur-xs">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B3395B]" />
            <span className="text-white font-bold tracking-widest uppercase text-[9px] sm:text-[11px]">
              Autumn / Winter Luxury Collection
            </span>
          </div>

          {/* Headline with Accent Bar */}
          <div className="inline-block">
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight text-white whitespace-normal">
              STYLE THAT DEFINES YOU
            </h1>
            <div className="w-full h-1 sm:h-1.5 bg-[#8B263E] mt-1 sm:mt-2 rounded-full shadow-[0_0_12px_rgba(179,57,91,0.8)]" />
          </div>

          {/* Subtitle */}
          <p className="text-gray-300 text-xs sm:text-base leading-relaxed max-w-lg font-normal pt-1 sm:pt-2">
            Discover modern, premium fashion designed for every generation. Crafted with perfection for Men, Women, and Children.
          </p>

          {/* Action Buttons Section */}
          <div className="pt-2 sm:pt-4 flex flex-wrap gap-2.5 sm:gap-4 items-center">
            {/* Shop Men */}
            <Link
              to="/men"
              className="group/btn relative inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-8 sm:py-4 bg-[#2c1218] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 border border-[#8B263E] rounded-xs"
            >
              <span>Shop Men</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>

            {/* Shop Women */}
            <Link
              to="/women"
              className="group/btn relative inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-8 sm:py-4 bg-[#2c1218] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 border border-[#8B263E] rounded-xs"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>

            {/* Shop Kids */}
            <Link
              to="/children"
              className="group/btn relative inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-8 sm:py-4 bg-[#2c1218] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 border border-[#8B263E] rounded-xs"
            >
              <span>Shop Kids</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;