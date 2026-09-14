import React from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { SearchX, ArrowLeft, RotateCcw } from 'lucide-react';

const NotFound = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const query = searchParams.get('search') || '';
  const fromPath = location.state?.from;

  const handleBackToPage = () => {
    if (fromPath && fromPath !== '/shop') {
      navigate(fromPath);
    } else {
      navigate(-1); // Fallback to immediate browser history origin
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#121212] text-white">
      <div className="max-w-md w-full bg-[#0a0a0c] border border-[#8B263E]/40 p-10 rounded-xs text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8B263E]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto bg-[#2c1218] border border-[#8B263E] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(179,57,91,0.4)]">
          <SearchX className="w-8 h-8 text-[#B3395B]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-wider text-white">
            Product Not Found
          </h1>
          <p className="text-xs text-[#d4d4d8] leading-relaxed">
            {query
              ? `We couldn't find any luxury pieces matching "${query}". Try searching with different keywords.`
              : 'The requested product or collection could not be found.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Navigates directly back to exact source page */}
          <button
            type="button"
            onClick={handleBackToPage}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Page</span>
          </button>

          {/* Navigates to Shop All */}
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2c1218] text-white text-xs font-bold uppercase tracking-widest border border-[#8B263E] transition-all duration-300 hover:bg-[#82354b] hover:shadow-[0_0_20px_rgba(179,57,91,0.6)] active:scale-95 rounded-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Shop All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;