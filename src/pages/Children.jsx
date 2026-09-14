import React, { useState, useMemo } from 'react';
import { useSearchParams, Navigate, useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import FilterSidebar from '../components/FilterSidebar';
import ImageWithFallback from '../components/ImageWithFallback';
import { products } from '../data/products';

const Children = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const searchNavQuery = searchParams.get('search') || '';

  const kidsProducts = useMemo(() => products.filter((p) => p.category === 'Children'), []);

  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState(2000);

  const subcategories = Array.from(new Set(kidsProducts.map((p) => p.subcategory)));
  const sizes = ['2Y', '4Y', '6Y', '8Y', '10Y', '12Y', '28', '30', '32', '34'];

  const filtered = kidsProducts.filter((product) => {
    if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
    if (selectedSize && !product.sizes.includes(selectedSize)) return false;
    if (product.price > priceRange) return false;

    if (searchNavQuery) {
      const q = searchNavQuery.toLowerCase().trim();
      const matchName = product.name ? product.name.toLowerCase().includes(q) : false;
      const matchSub = product.subcategory ? product.subcategory.toLowerCase().includes(q) : false;
      const matchDesc = product.description ? product.description.toLowerCase().includes(q) : false;
      return matchName || matchSub || matchDesc;
    }

    return true;
  });

  // Redirect to Not Found page passing exact origin path
  if (filtered.length === 0) {
    return (
      <Navigate
        to={`/not-found?search=${encodeURIComponent(searchNavQuery)}`}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return (
    <div className="space-y-10 pb-16">
      <div className="relative h-64 bg-[#0a0a0c] text-white flex items-center justify-center overflow-hidden border-b border-[#8B263E]/40">
        <ImageWithFallback
          src="/images/banners/children-banner.jpg"
          alt="Children Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-black/60" />

        <div className="relative z-10 text-center space-y-2 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2c1218]/80 border border-[#8B263E]/60 rounded-full mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B3395B] animate-pulse" />
            <span className="text-[#d4d4d8] font-bold tracking-widest uppercase text-[10px]">
              BMAX Junior Edition
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-widest text-white drop-shadow-md">
            Children's Collection
          </h1>
          <p className="text-xs text-[#B3395B] uppercase tracking-widest font-semibold">
            Showing {filtered.length} Results {searchNavQuery && `for "${searchNavQuery}"`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          <aside className="lg:col-span-1 flex flex-col h-full">
            <FilterSidebar
              subcategories={subcategories}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              sizes={sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              resetFilters={() => {
                setSelectedSubcategory('');
                setSelectedSize('');
                setPriceRange(2000);
              }}
            />
          </aside>
          <main className="lg:col-span-3">
            <ProductGrid products={filtered} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Children;