import React, { useState, useMemo } from 'react';
import { useSearchParams, Navigate, useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';
import FilterSidebar from '../components/FilterSidebar';
import { products as rawProducts } from '../data/products';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const searchNavQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['Men', 'Women', 'Children'];

  const products = useMemo(() => {
    const seen = new Set();
    return rawProducts.filter((product) => {
      if (!product || !product.id || seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    });
  }, []);

  const handleCategoryChange = (category) => {
    const targetCategory = typeof category === 'string' ? category : '';
    setSelectedCategory(targetCategory);
    setSelectedSubcategory('');
  };

  const availableSubcategories = useMemo(() => {
    const categoryFilter = typeof selectedCategory === 'string' ? selectedCategory.trim().toLowerCase() : '';
    const list = categoryFilter
      ? products.filter(
          (p) => p.category && p.category.trim().toLowerCase() === categoryFilter
        )
      : products;

    return Array.from(new Set(list.map((p) => p.subcategory).filter(Boolean)));
  }, [products, selectedCategory]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38', '40', '41', '42', '43', '44', '45'];

  const filteredProducts = useMemo(() => {
    const activeCat = typeof selectedCategory === 'string' ? selectedCategory.trim().toLowerCase() : '';
    const activeSub = typeof selectedSubcategory === 'string' ? selectedSubcategory.trim().toLowerCase() : '';

    return products
      .filter((product) => {
        if (activeCat && (!product.category || product.category.trim().toLowerCase() !== activeCat)) {
          return false;
        }

        if (activeSub && (!product.subcategory || product.subcategory.trim().toLowerCase() !== activeSub)) {
          return false;
        }

        if (selectedSize && (!product.sizes || !product.sizes.includes(selectedSize))) {
          return false;
        }

        if (typeof product.price === 'number' && product.price > priceRange) {
          return false;
        }

        if (searchNavQuery) {
          const q = searchNavQuery.toLowerCase().trim();
          const matchName = product.name ? product.name.toLowerCase().includes(q) : false;
          const matchCat = product.category ? product.category.toLowerCase().includes(q) : false;
          const matchSub = product.subcategory ? product.subcategory.toLowerCase().includes(q) : false;
          const matchDesc = product.description ? product.description.toLowerCase().includes(q) : false;
          return matchName || matchCat || matchSub || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, selectedCategory, selectedSubcategory, selectedSize, priceRange, sortBy, searchNavQuery]);

  // Redirect to Not Found page passing exact origin path
  if (filteredProducts.length === 0) {
    return (
      <Navigate
        to={`/not-found?search=${encodeURIComponent(searchNavQuery)}`}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedSize('');
    setPriceRange(2000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-white">
          Shop All Collections
        </h1>
        <p className="text-xs text-[#B3395B] uppercase tracking-wider font-semibold mt-1">
          Showing {filteredProducts.length} Results {searchNavQuery && `for "${searchNavQuery}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
        <aside className="lg:col-span-1 flex flex-col h-full">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            subcategories={availableSubcategories}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            sizes={allSizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={2000}
            resetFilters={resetFilters}
          />
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#0a0a0c] border border-[#8B263E]/40 p-4 rounded-xs gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Filtered View
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wider text-[#B3395B]">
                Sort By:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#18181b] border border-[#8B263E]/50 text-white text-xs py-1.5 px-3 focus:outline-none focus:border-[#B3395B] cursor-pointer"
              >
                <option value="featured" className="bg-[#18181b] text-white">Featured</option>
                <option value="price-low" className="bg-[#18181b] text-white">Price: Low to High</option>
                <option value="price-high" className="bg-[#18181b] text-white">Price: High to Low</option>
                <option value="rating" className="bg-[#18181b] text-white">Highest Rated</option>
              </select>
            </div>
          </div>

          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};

export default Shop;