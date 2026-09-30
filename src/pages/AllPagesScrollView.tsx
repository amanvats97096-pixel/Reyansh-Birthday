import React from 'react';
import { Scroll, ArrowUp } from 'lucide-react';
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

export const AllPagesScrollView: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-16 pb-24 space-y-16">
      {/* Banner */}
      <div className="text-center bg-amber-100/90 py-3 px-4 border-b border-amber-300 shadow-sm sticky top-14 z-30 backdrop-blur-md flex items-center justify-between max-w-4xl mx-auto rounded-2xl">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950 font-heading">
          <Scroll className="w-5 h-5 text-amber-700" />
          <span>Continuous Toddler Storybook Mode (14 Chapters)</span>
        </div>
        <button
          onClick={scrollToTop}
          className="text-xs bg-amber-300 hover:bg-amber-400 px-3 py-1 rounded-xl font-bold text-amber-950 flex items-center gap-1 cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Top</span>
        </button>
      </div>

      {/* Render 14 pages vertically stacked */}
      <div className="space-y-20">
        <section id="chapter-1"><WelcomePage /></section>
        <section id="chapter-2"><CountdownPage /></section>
        <section id="chapter-3"><HelloTwoPage /></section>
        <section id="chapter-4"><SunshinePage /></section>
        <section id="chapter-5"><StorybookPage /></section>
        <section id="chapter-6"><BalloonsPage /></section>
        <section id="chapter-7"><CakePage /></section>
        <section id="chapter-8"><GiftsPage /></section>
        <section id="chapter-9"><SuperstarPage /></section>
        <section id="chapter-10"><TeddyPartyPage /></section>
        <section id="chapter-11"><LetterPage /></section>
        <section id="chapter-12"><GalleryPage /></section>
        <section id="chapter-13"><DancePartyPage /></section>
        <section id="chapter-14"><GrandFinalePage /></section>
      </div>
    </div>
  );
};
