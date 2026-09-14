import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const WishlistButton = ({ product, className = "" }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`p-2 rounded-full transition-all duration-300 ${
        active
          ? 'bg-red-50 text-red-500 scale-110'
          : 'bg-white/80 text-gray-700 hover:text-black hover:bg-white'
      } ${className}`}
    >
      <Heart className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
    </button>
  );
};

export default WishlistButton;