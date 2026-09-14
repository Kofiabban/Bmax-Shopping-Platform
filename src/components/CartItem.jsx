import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import ImageWithFallback from './ImageWithFallback';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex gap-4 p-4 bg-[#0a0a0c] border border-[#8B263E]/40 rounded-xs items-center transition-all duration-300 hover:border-[#8B263E]/70">
      {/* Product Thumbnail */}
      <div className="w-20 h-24 bg-[#18181b] border border-[#8B263E]/30 flex-shrink-0 overflow-hidden rounded-xs">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Product Information */}
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wider truncate">
          {item.name}
        </h4>
        <p className="text-xs text-gray-400 mt-1">
          Size: <span className="text-[#B3395B] font-bold">{item.selectedSize}</span> | Color:{' '}
          <span className="text-gray-200 font-medium">{item.selectedColor}</span>
        </p>
        <p className="text-sm font-bold text-white mt-2">
          {formatCurrency(item.price)}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center border border-[#8B263E]/50 bg-[#18181b] rounded-xs">
        <button
          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2c1218] transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="px-3 text-xs font-bold text-white">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
          className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2c1218] transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Trash Action Button */}
      <button
        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
        className="text-gray-400 hover:text-[#B3395B] p-2 transition-colors duration-200"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItem;