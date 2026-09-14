import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-10 h-10 border-4 border-[#2c1218] border-t-[#B3395B] rounded-full animate-spin shadow-[0_0_15px_rgba(179,57,91,0.5)]" />
    </div>
  );
};

export default LoadingSpinner;