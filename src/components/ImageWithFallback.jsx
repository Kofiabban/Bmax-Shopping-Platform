import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`bg-[#0a0a0c] border border-[#8B263E]/30 flex flex-col items-center justify-center text-center p-4 select-none ${className}`}>
        <span className="font-black text-xl tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(179,57,91,0.4)]">
          BMAX
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#B3395B] font-semibold mt-1">
          Image Unavailable
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || "BMAX Product"}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
};

export default ImageWithFallback;