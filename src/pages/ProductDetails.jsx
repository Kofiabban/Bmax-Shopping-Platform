import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Maximize2, X } from 'lucide-react';
import { products } from '../data/products';
import { formatCurrency } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ImageWithFallback from '../components/ImageWithFallback';
import ProductGrid from '../components/ProductGrid';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find((p) => String(p.id) === String(id));

  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes?.[0] || 'Standard');
      setSelectedColor(product.colors?.[0] || 'Default');
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  if (!product) {
    return (
      <Navigate
        to="/not-found"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 p-3 bg-[#2c1218] text-white border border-[#8B263E] rounded-full hover:bg-[#82354b] transition-all z-50 cursor-pointer shadow-[0_0_15px_rgba(179,57,91,0.5)]"
            aria-label="Close Full Image View"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-5xl max-h-[90vh] w-full flex justify-center items-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={activeImage}
              alt={product.name}
              className="max-w-full max-h-[85vh] object-contain rounded-xs shadow-2xl border border-[#8B263E]/40"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div 
            onClick={() => setIsModalOpen(true)}
            className="aspect-[3/4] bg-[#0a0a0c] overflow-hidden border border-[#8B263E]/40 rounded-xs relative group cursor-pointer"
            title="Tap to view full image"
          >
            <ImageWithFallback
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2c1218]/90 text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] rounded-full shadow-lg backdrop-blur-xs">
                <Maximize2 className="w-4 h-4 text-[#B3395B]" />
                Tap for Full View
              </span>
            </div>
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-24 flex-shrink-0 border-2 transition-all duration-300 bg-[#0a0a0c] ${
                    activeImage === img
                      ? 'border-[#B3395B] shadow-[0_0_12px_rgba(179,57,91,0.5)] scale-102'
                      : 'border-[#8B263E]/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B3395B] font-semibold">
              {product.category} / {product.subcategory}
            </span>
            <h1 className="text-3xl font-extrabold text-white uppercase tracking-wide mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-[#B3395B]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {product.rating} ({product.reviews} customer reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4 border-y border-[#8B263E]/30 py-4">
            <span className="text-3xl font-bold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            {product.description}
          </p>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B3395B] mb-2">
              Select Size:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                    selectedSize === sz
                      ? 'bg-[#2c1218] text-white border-[#8B263E] shadow-[0_0_12px_rgba(179,57,91,0.5)]'
                      : 'border-[#8B263E]/40 text-gray-400 hover:border-[#8B263E] hover:text-white bg-[#18181b]/50'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B3395B] mb-2">
              Select Color:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((clr) => (
                <button
                  key={clr}
                  onClick={() => setSelectedColor(clr)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                    selectedColor === clr
                      ? 'bg-[#2c1218] text-white border-[#8B263E] shadow-[0_0_12px_rgba(179,57,91,0.5)]'
                      : 'border-[#8B263E]/40 text-gray-400 hover:border-[#8B263E] hover:text-white bg-[#18181b]/50'
                  }`}
                >
                  {clr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#B3395B] mb-2">
              Quantity:
            </label>
            <div className="flex items-center w-32 border border-[#8B263E]/50 bg-[#18181b]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-300 hover:text-white hover:bg-[#2c1218] transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex-grow text-center text-xs font-bold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-300 hover:text-white hover:bg-[#2c1218] transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 flex items-center justify-center gap-2 rounded-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              {addedMessage ? "Added to Cart!" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E]/60 transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-4 border transition-all duration-300 flex items-center justify-center rounded-xs ${
                isInWishlist(product.id)
                  ? 'text-white bg-[#2c1218] border-[#8B263E] shadow-[0_0_15px_rgba(179,57,91,0.6)]'
                  : 'text-gray-400 border-[#8B263E]/40 hover:border-[#8B263E] hover:text-white bg-[#18181b]'
              }`}
              aria-label="Toggle Wishlist"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current text-[#B3395B]' : ''}`} />
            </button>
          </div>

          <div className="border-t border-[#8B263E]/30 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <Truck className="w-4 h-4 text-[#B3395B]" />
              <span>Nationwide doorstep delivery across Ghana</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <RefreshCw className="w-4 h-4 text-[#B3395B]" />
              <span>Easy 7-day hassle-free return window</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-[#B3395B]" />
              <span>100% Genuine product guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#8B263E]/30">
          <h2 className="text-xl font-extrabold uppercase tracking-widest mb-6 text-white">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;