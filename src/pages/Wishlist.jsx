import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import ImageWithFallback from '../components/ImageWithFallback';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart, updateQuantity } = useCart();

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (id !== undefined && id !== null) {
      removeFromWishlist(id);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-[#0a0a0c] border border-[#8B263E]/40 p-10 rounded-xs text-center space-y-5 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8B263E]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="w-16 h-16 mx-auto bg-[#2c1218] border border-[#8B263E] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(179,57,91,0.4)]">
            <Heart className="w-8 h-8 text-[#B3395B]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Save your favorite modern tailoring and luxury pieces here to review them anytime.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/shop"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs cursor-pointer"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold uppercase tracking-widest text-white mb-8">
        Saved Wishlist ({wishlist.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const cartItem = cart.find((item) => String(item.id) === String(product.id));
          const inCartQuantity = cartItem ? cartItem.quantity : 0;

          const defaultSize = product.sizes ? product.sizes[0] : 'Standard';
          const defaultColor = product.colors ? product.colors[0] : 'Default';

          return (
            <div
              key={product.id}
              className="bg-[#0a0a0c] border border-[#8B263E]/40 rounded-xs overflow-hidden flex flex-col justify-between group hover:border-[#8B263E] transition-all"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`} className="block aspect-[3/4] bg-[#18181b] overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <button
                  type="button"
                  onClick={(e) => handleRemove(e, product.id)}
                  className="absolute top-3 right-3 p-2 bg-[#0a0a0c]/90 text-gray-400 hover:text-white hover:bg-[#8B263E] rounded-full transition-all border border-[#8B263E]/60 z-20 cursor-pointer"
                  title="Remove from Wishlist"
                  aria-label="Remove item from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="text-[10px] text-[#B3395B] uppercase tracking-widest block font-semibold">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.id}`} className="hover:text-[#B3395B] transition-colors">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wide line-clamp-1 mt-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-extrabold text-white mt-2">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#8B263E]/30">
                  {inCartQuantity > 0 ? (
                    <div className="flex items-center justify-between bg-[#18181b] border border-[#8B263E]/60 p-1.5 rounded-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, cartItem.selectedSize, cartItem.selectedColor, -1)}
                        className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2c1218] transition-colors rounded-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {inCartQuantity} in Cart
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, cartItem.selectedSize, cartItem.selectedColor, 1)}
                        className="p-1.5 text-gray-300 hover:text-white hover:bg-[#2c1218] transition-colors rounded-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToCart(product, defaultSize, defaultColor, 1)}
                      className="w-full py-2.5 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-wider border border-[#8B263E] flex items-center justify-center gap-2 hover:bg-[#82354b] transition-all rounded-xs active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;