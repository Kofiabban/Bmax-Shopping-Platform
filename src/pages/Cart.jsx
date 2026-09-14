import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ImageWithFallback from '../components/ImageWithFallback';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-[#0a0a0c] border border-[#8B263E]/40 p-10 rounded-xs text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 mx-auto bg-[#2c1218] border border-[#8B263E] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(179,57,91,0.4)]">
            <ShoppingBag className="w-8 h-8 text-[#B3395B]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">Your Cart is Empty</h2>
            <p className="text-xs text-gray-400">Add luxury tailoring pieces to review your order.</p>
          </div>
          <Link
            to="/shop"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] rounded-xs cursor-pointer"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-white">YOUR CART</h1>
        <p className="text-xs text-[#B3395B] uppercase tracking-wider font-semibold">
          {totalItems} {totalItems === 1 ? 'Total Item' : 'Total Items'} ({cart.length} Unique Variants)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const itemKey = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
            return (
              <div
                key={itemKey}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#0a0a0c] border border-[#8B263E]/40 p-4 rounded-xs gap-4"
              >
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-20 h-20 object-cover rounded-xs border border-[#8B263E]/20"
                  />
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">{item.name || item.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      {item.selectedSize && (
                        <span className="px-2 py-0.5 bg-[#2c1218] border border-[#8B263E]/50 rounded-xs text-gray-300">
                          Size: {item.selectedSize}
                        </span>
                      )}
                      {item.selectedColor && (
                        <span className="px-2 py-0.5 bg-[#2c1218] border border-[#8B263E]/50 rounded-xs text-gray-300">
                          Color: {item.selectedColor}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#B3395B] font-bold pt-1">
                      GH₵ {item.price ? item.price.toLocaleString() : '0'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#8B263E]/20">
                  <div className="flex items-center border border-[#8B263E]/60 rounded-xs bg-[#2c1218]/40">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                      className="p-2 text-gray-300 hover:text-white hover:bg-[#8B263E] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-extrabold text-white">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                      className="p-2 text-gray-300 hover:text-white hover:bg-[#8B263E] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#0a0a0c] border border-[#8B263E]/40 p-6 rounded-xs space-y-6 h-fit">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-[#8B263E]/40 pb-4">
            Order Summary
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-semibold">GH₵ {subtotal ? subtotal.toLocaleString() : '0'}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery</span>
              <span className="text-[#B3395B] font-semibold">Calculated at Checkout</span>
            </div>
          </div>

          <div className="border-t border-[#8B263E]/40 pt-4 flex justify-between items-center">
            <span className="text-sm font-bold text-white uppercase">Total</span>
            <span className="text-lg font-black text-[#B3395B]">
              GH₵ {subtotal ? subtotal.toLocaleString() : '0'}
            </span>
          </div>

          <Link
            to="/checkout"
            onClick={() => window.scrollTo(0, 0)}
            className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;