import React from 'react';

const FilterSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  subcategories,
  selectedSubcategory,
  setSelectedSubcategory,
  sizes,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  maxPrice,
  resetFilters,
}) => {
  return (
    <div className="bg-[#0a0a0c] border border-[#8B263E]/40 p-6 rounded-xs text-white h-full flex flex-col justify-between space-y-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#8B263E]/30">
          <h3 className="font-bold uppercase tracking-wider text-sm text-white">
            Filters
          </h3>
          <button
            onClick={resetFilters}
            className="text-xs text-[#B3395B] hover:text-[#82354b] hover:underline uppercase font-medium transition-colors"
          >
            Reset All
          </button>
        </div>

        {/* Categories */}
        {categories && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B3395B] mb-3">
              Category
            </h4>
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-xs group">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onClick={() => {
                      // Toggle off if clicking active category
                      if (selectedCategory === cat) {
                        setSelectedCategory('');
                      } else {
                        setSelectedCategory(cat);
                      }
                      setSelectedSubcategory('');
                    }}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubcategory('');
                    }}
                    className="accent-[#B3395B] cursor-pointer"
                  />
                  <span
                    className={`transition-colors ${
                      selectedCategory === cat
                        ? 'font-bold text-white'
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Subcategories */}
        {subcategories && subcategories.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B3395B] mb-3">
              Subcategory
            </h4>
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {subcategories.map((sub) => (
                <label key={sub} className="flex items-center gap-2.5 cursor-pointer text-xs group">
                  <input
                    type="checkbox"
                    value={sub}
                    checked={selectedSubcategory === sub}
                    onChange={(e) =>
                      setSelectedSubcategory(selectedSubcategory === e.target.value ? '' : e.target.value)
                    }
                    className="accent-[#B3395B] cursor-pointer"
                  />
                  <span
                    className={`transition-colors ${
                      selectedSubcategory === sub
                        ? 'font-bold text-white'
                        : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                  >
                    {sub}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {sizes && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B3395B] mb-3">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
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
        )}

        {/* Price Range */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B3395B] mb-3">
            Max Price: GH₵{priceRange}
          </h4>
          <input
            type="range"
            min="50"
            max={maxPrice || 2000}
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-[#B3395B] bg-[#18181b] cursor-pointer"
          />
        </div>
      </div>

      {/* Footer Branding Badge */}
      <div className="pt-6 border-t border-[#8B263E]/30 text-center">
        <span className="text-[10px] uppercase tracking-widest text-[#B3395B] font-bold">
          BMAX Luxury Filters
        </span>
      </div>
    </div>
  );
};

export default FilterSidebar;