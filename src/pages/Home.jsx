import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid.jsx';
import ImageWithFallback from '../components/ImageWithFallback';
import { products } from '../data/products';

const Home = () => {
  // Shuffle featured products randomly on every page refresh/mount
  const featuredProducts = useMemo(() => {
    // 1. Gather all featured products across categories
    const featuredList = products.filter((p) => p.featured);

    // 2. Fisher-Yates shuffle algorithm
    const shuffled = [...featuredList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Take the top 8 shuffled featured items
    return shuffled.slice(0, 8);
  }, []); // Empty dependency array ensures it reshuffles on every full render/refresh

  return (
    <div className="space-y-16 pb-16 bg-[#121212] text-white min-h-screen">
      <Hero />

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-white">
            Shop By Category
          </h2>
          <div className="w-12 h-0.5 bg-[#8B263E] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard
            title="MEN"
            subtitle="Modern & classic tailored men's fashion."
            image="/images/categories/men.jpg"
            link="/men"
          />
          <CategoryCard
            title="WOMEN"
            subtitle="Contemporary & elegant apparel for women."
            image="/images/categories/women.jpg"
            link="/women"
          />
          <CategoryCard
            title="CHILDREN"
            subtitle="Comfortable & stylish clothing for kids."
            image="/images/categories/children.jpg"
            link="/children"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold uppercase tracking-widest text-white">
              Featured Arrivals
            </h2>
            <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">
              Handpicked modern wardrobe essentials
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase font-bold tracking-widest border-b-2 border-[#8B263E] pb-1 text-white hover:text-red-500 hover:border-red-500 transition-colors"
          >
            View All Products &rarr;
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>

      {/* Promotional Banners Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Sale Promo Card */}
          <div className="relative bg-[#18181b] border border-[#8B263E]/40 rounded-xs text-white p-8 md:p-12 flex flex-col justify-between min-h-[320px] overflow-hidden group shadow-lg">
            <ImageWithFallback
              src="/images/banners/promo-sale.jpg"
              alt="Sale Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/70 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest block drop-shadow-sm">
                Limited Time Offer
              </span>
              <h3 className="text-3xl font-extrabold uppercase tracking-wider text-white">
                UP TO 40% OFF
              </h3>
              <p className="text-xs text-gray-300 max-w-xs leading-relaxed">
                Upgrade your apparel collection with our exclusive promotional discounts.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                to="/shop"
                className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 border border-[#8B263E] rounded-xs"
              >
                <span>Shop Sale</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Kids Promo Card */}
          <div className="relative bg-[#18181b] border border-[#8B263E]/40 rounded-xs text-white p-8 md:p-12 flex flex-col justify-between min-h-[320px] overflow-hidden group shadow-lg">
            <ImageWithFallback
              src="/images/banners/promo-kids.jpg"
              alt="Kids Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/70 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-red-600 font-extrabold text-xs uppercase tracking-widest block drop-shadow-sm">
                BMAX Kids
              </span>
              <h3 className="text-3xl font-extrabold uppercase tracking-wider text-white">
                NEXT GENERATION
              </h3>
              <p className="text-xs text-gray-300 max-w-xs leading-relaxed">
                Durable, lightweight and playful designs crafted for absolute comfort.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                to="/children"
                className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 border border-[#8B263E] rounded-xs"
              >
                <span>Shop Children</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;