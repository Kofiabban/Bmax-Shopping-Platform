import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

const HeaderBanner = () => {
  return (
    <div className="relative w-full h-36 sm:h-44 overflow-hidden border-b border-[#8B263E]/40 group">
      {/* Background Image with Fallback */}
      <ImageWithFallback
        src="/images/banners/hero-main.jpg"
        alt="BMAX Header Announcement"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-1000"
      />

      {/* Luxury Semi-Transparent Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#2c1218]/70 to-black/80 backdrop-blur-[2px]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left py-4">
        
        {/* Left Side: Badge & Title */}
        <div className="flex items-center gap-3.5">
          <div className="hidden sm:flex p-2.5 bg-[#8B263E]/30 border border-[#8B263E]/60 rounded-full shadow-[0_0_15px_rgba(179,57,91,0.5)]">
            <Sparkles className="w-4 h-4 text-[#B3395B]" />
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#B3395B] animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B3395B]">
                Exclusive Luxury Announcement
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black uppercase tracking-wider text-white drop-shadow-md">
              The Autumn / Winter ’26 Capsule Has Arrived
            </h2>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <Link
          to="/shop"
          className="group/btn relative inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#2c1218]/90 text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:border-[#B3395B] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs"
        >
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B3395B] group-hover/btn:text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default HeaderBanner;