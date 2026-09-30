import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PAGES, getPageIndex } from '../routes/pageRoutes';
import { useSound } from '../context/SoundContext';

export const NavigationFooter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playPop } = useSound();

  const currentId = getPageIndex(location.pathname);
  const totalPages = PAGES.length;

  const prevPage = PAGES.find((p) => p.id === currentId - 1);
  const nextPage = PAGES.find((p) => p.id === currentId + 1);

  const handleNavigate = (path: string) => {
    playPop();
    navigate(path);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 px-3 py-2 sm:px-6 sm:py-3 bg-white/85 backdrop-blur-md border-t border-amber-100/60 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Previous Button */}
        <button
          onClick={() => prevPage && handleNavigate(prevPage.path)}
          disabled={!prevPage}
          aria-label={prevPage ? `Previous: ${prevPage.title}` : 'Previous page unavailable'}
          className={`py-2 px-3 sm:py-2.5 sm:px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-all cursor-pointer ${
            prevPage
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Prev</span>
          {prevPage && <span className="hidden md:inline font-normal text-amber-800">({prevPage.shortTitle})</span>}
        </button>

        {/* Center Progress */}
        <div className="flex flex-col items-center flex-1 max-w-[200px] sm:max-w-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <span className="text-amber-600 font-heading text-sm sm:text-base">
              {String(currentId).padStart(2, '0')}
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500 font-heading text-xs sm:text-sm">
              {totalPages}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden mt-1 shadow-inner">
            <div
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-pink-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentId / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => nextPage && handleNavigate(nextPage.path)}
          disabled={!nextPage}
          aria-label={nextPage ? `Next: ${nextPage.title}` : 'Next page unavailable'}
          className={`py-2 px-3 sm:py-2.5 sm:px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-all cursor-pointer ${
            nextPage
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 shadow-md shadow-amber-300/40 active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
          }`}
        >
          {nextPage && <span className="hidden md:inline font-normal text-slate-800">({nextPage.shortTitle})</span>}
          <span>Next</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </footer>
  );
};
