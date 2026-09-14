import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';
import WishlistButton from './WishlistButton';
import ImageWithFallback from './ImageWithFallback';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quickAdded, setQuickAdded] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  // UPDATED: Quick Add handler with explicit size/color fallbacks
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedSize =
      product.selectedSize ||
      (product.sizes && product.sizes[0]) ||
      'Standard';

    const selectedColor =
      product.selectedColor ||
      (product.colors && product.colors[0]) ||
      'Default';

    addToCart(product, selectedSize, selectedColor, 1);
    
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col h-full bg-[#0a0a0c] border border-[#8B263E]/40 rounded-xs overflow-hidden transition-all duration-300 hover:border-[#8B263E] hover:shadow-[0_0_20px_rgba(139,38,62,0.3)]">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {discount && (
          <span className="bg-[#8B263E] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-md">
            -{discount}%
          </span>
        )}
        {product.newArrival && (
          <span className="bg-[#18181b] text-[#B3395B] border border-[#8B263E]/60 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs shadow-md">
            New
          </span>
        )}
      </div>

      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton product={product} />
      </div>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-[#18181b] block">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />

        {/* Hover Action Bar */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 items-center">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-3 bg-[#2c1218] text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:bg-[#82354b] active:scale-95 transition-all shadow-md cursor-pointer border border-[#8B263E] rounded-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            {quickAdded ? "Added!" : "Quick Add"}
          </button>
          
          <Link
            to={`/product/${product.id}`}
            className="p-3 bg-[#18181b] text-gray-300 hover:text-white hover:bg-[#82354b] border border-[#8B263E]/60 transition-all shadow-md flex items-center justify-center rounded-xs"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-[#0a0a0c]">
        <div>
          <span className="text-[11px] text-[#B3395B] uppercase tracking-widest block mb-1 font-semibold">
            {product.category} • {product.subcategory}
          </span>
          <Link to={`/product/${product.id}`} className="hover:text-[#B3395B] transition-colors">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-[#8B263E]/30 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-500 line-through font-medium">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>
          
          <div className="flex items-center text-xs text-[#B3395B] gap-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-gray-300 font-bold">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;