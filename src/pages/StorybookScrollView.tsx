import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';

import { WelcomePage } from './WelcomePage';
import { CountdownPage } from './CountdownPage';
import { HelloTwoPage } from './HelloTwoPage';
import { SunshinePage } from './SunshinePage';
import { StorybookPage } from './StorybookPage';
import { BalloonsPage } from './BalloonsPage';
import { CakePage } from './CakePage';
import { GiftsPage } from './GiftsPage';
import { SuperstarPage } from './SuperstarPage';
import { TeddyPartyPage } from './TeddyPartyPage';
import { LetterPage } from './LetterPage';
import { GalleryPage } from './GalleryPage';
import { DancePartyPage } from './DancePartyPage';
import { GrandFinalePage } from './GrandFinalePage';

export const StorybookScrollView: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-16 pb-24 px-3 sm:px-6 md:px-8 max-w-5xl mx-auto space-y-16">
      {/* 1. Birthday Welcome */}
      <section id="welcome">
        <WelcomePage />
      </section>

      {/* Decorative Separator */}
      <div className="flex items-center justify-center gap-3 py-4 text-amber-400">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1 max-w-xs" />
        <Sparkles className="w-6 h-6 animate-pulse text-amber-500" />
        <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-1 max-w-xs" />
      </div>

      {/* 2. Birthday Countdown */}
      <section id="countdown">
        <CountdownPage />
      </section>

      <div className="flex items-center justify-center gap-3 py-4 text-pink-400">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1 max-w-xs" />
        <Heart className="w-6 h-6 fill-rose-400 text-rose-500 animate-bounce" />
        <div className="h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1 max-w-xs" />
      </div>

      {/* 3. Hello, Two! */}
      <section id="hello-two">
        <HelloTwoPage />
      </section>

      {/* 4. Our Little Sunshine */}
      <section id="sunshine">
        <SunshinePage />
      </section>

      {/* 5. The Photo Storybook */}
      <section id="storybook">
        <StorybookPage />
      </section>

      {/* 6. A Sky Full of Balloons */}
      <section id="balloons">
        <BalloonsPage />
      </section>

      {/* 7. Birthday Cake */}
      <section id="cake">
        <CakePage />
      </section>

      {/* 8. Surprise Gifts */}
      <section id="gifts">
        <GiftsPage />
      </section>

      {/* 9. Our Little Superstar */}
      <section id="superstar">
        <SuperstarPage />
      </section>

      {/* 10. The Teddy Bear Party */}
      <section id="teddy-party">
        <TeddyPartyPage />
      </section>

      {/* 11. A Letter for Reyansh */}
      <section id="letter">
        <LetterPage />
      </section>

      {/* 12. The Memory Gallery */}
      <section id="gallery">
        <GalleryPage />
      </section>

      {/* 13. Birthday Dance Party */}
      <section id="dance-party">
        <DancePartyPage />
      </section>

      {/* 14. The Grand Finale */}
      <section id="grand-finale">
        <GrandFinalePage />
      </section>

      {/* Bottom Floating Return to Top & Keepsake Footer */}
      <footer className="pt-12 pb-8 border-t border-amber-200/80 text-center flex flex-col items-center gap-4">
        <button
          onClick={scrollToTop}
          className="py-3 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-extrabold text-sm sm:text-base rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95 font-heading"
        >
          <ArrowUp className="w-5 h-5" />
          <span>Scroll Back to Top ⬆️</span>
        </button>

        <p className="text-xs sm:text-sm font-semibold text-slate-600">
          Reyansh Sharma's 2nd Birthday &bull; 4 October 2026 &bull; With love, Aman ❤️
        </p>
      </footer>
    </div>
  );
};
