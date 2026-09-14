import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const CATALOG_PATHS = ['/shop', '/men', '/women', '/children'];

const SearchBar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentSearch = queryParams.get('search') || '';

  const [query, setQuery] = useState(currentSearch);

  useEffect(() => {
    setQuery(currentSearch);
  }, [currentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const isCatalogPage = CATALOG_PATHS.includes(location.pathname.toLowerCase());
    
    // Capture origin path so NotFound knows where the search originated
    const originPath = location.state?.from || `${location.pathname}${location.search}`;

    if (isCatalogPage) {
      const params = new URLSearchParams(location.search);
      params.set('search', trimmed);
      navigate(`${location.pathname}?${params.toString()}`, {
        state: { from: originPath },
      });
    } else {
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`, {
        state: { from: originPath },
      });
    }

    if (onClose) onClose();
  };

  const handleClear = () => {
    setQuery('');
    const isCatalogPage = CATALOG_PATHS.includes(location.pathname.toLowerCase());

    if (isCatalogPage) {
      const params = new URLSearchParams(location.search);
      params.delete('search');
      const searchString = params.toString();
      navigate(searchString ? `${location.pathname}?${searchString}` : location.pathname);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Search shirts, dresses, shoes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-gray-400 focus:ring-0 transition-colors shadow-xs"
      />

      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
        aria-label="Submit Search"
      >
        <Search className="w-4 h-4" />
      </button>

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
          aria-label="Clear Search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;