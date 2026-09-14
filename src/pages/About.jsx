import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react'; // Optional: for icons
import ImageWithFallback from '../components/ImageWithFallback';

const About = () => {
  // State to track if the full-image modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bannerImageUrl = "/images/banners/about-banner.jpg";

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
    // Optional: Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Optional: Re-enable background scrolling
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* 1. Full-Screen Image Lightbox Modal (Conditional Rendering) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300"
          onClick={closeModal} // Click background to close
        >
          {/* Close Button (Icon) */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 p-3 bg-[#2c1218] text-white border border-[#8B263E] rounded-full hover:bg-[#82354b] transition-all z-50 cursor-pointer shadow-[0_0_15px_rgba(179,57,91,0.5)]"
            aria-label="Close Full Image View"
          >
            <X className="w-6 h-6" />
          </button>

          {/* The Full Image (Prevents background click from closing when clicking image) */}
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full flex justify-center items-center p-2"
            onClick={(e) => e.stopPropagation()} // Stop click propagation to background
          >
            <ImageWithFallback
              src={bannerImageUrl}
              alt="BMAX Precision Tailoring"
              className="max-w-full max-h-[85vh] object-contain rounded-xs shadow-2xl border border-[#8B263E]/40"
              // The object-contain ensures the image fits within the bounds without stretching
            />
          </div>
        </div>
      )}


      {/* 2. Main Title Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest text-white">
          About BMAX
        </h1>
        <p className="text-xs text-[#B3395B] uppercase tracking-widest font-semibold">
          Style That Defines You
        </p>
        <div className="w-16 h-0.5 bg-[#8B263E] mx-auto shadow-[0_0_8px_rgba(179,57,91,0.8)]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* 3. The Clickable Banner Image Container */}
        {/* Added cursor-pointer, hover effect, and stopPropagation */}
        <div 
          onClick={openModal} // Open modal on tap/click
          className="aspect-[4/3] bg-[#0a0a0c] border border-[#8B263E]/40 overflow-hidden rounded-xs relative group cursor-pointer"
          title="Tap to view full image" // Tooltip hint
        >
          <ImageWithFallback
            src={bannerImageUrl}
            alt="About BMAX Craftsmanship"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent pointer-events-none" />
          
          {/* TAP HINT OVERLAY (Subtle Rose Gold Prompt on Hover) */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2c1218]/90 text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] rounded-full shadow-lg backdrop-blur-xs">
              <Maximize2 className="w-4 h-4 text-[#B3395B]" />
              Tap for Full View
            </span>
          </div>
        </div>

        {/* 4. Brand Description Content Section */}
        <div className="space-y-6 text-sm text-gray-300 leading-relaxed bg-[#0a0a0c] border border-[#8B263E]/40 p-8 rounded-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2c1218] border border-[#8B263E]/60 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B3395B] animate-pulse" />
            <span className="text-[#d4d4d8] font-bold tracking-widest uppercase text-[10px]">
              Our Identity
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
            Our Brand Vision
          </h2>
          
          <p className="text-gray-400 leading-relaxed">
            BMAX was established to bridge the gap between high-end modern tailoring and accessible everyday fashion in Ghana and beyond. We believe true style is an expression of individual identity.
          </p>
          
          <p className="text-gray-400 leading-relaxed">
            Every product in our collection from men’s luxury suiting to everyday children's wear is selected with obsessive attention to fabric quality, modern aesthetic fit, and long-lasting durability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;