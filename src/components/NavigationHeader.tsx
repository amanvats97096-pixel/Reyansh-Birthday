import React from 'react';
import { Volume2, VolumeX, Play, Square, ArrowUp } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const NavigationHeader: React.FC = () => {
  const { isMuted, toggleMute, isMelodyPlaying, playMelody, stopMelody } = useSound();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 py-2 sm:px-6 sm:py-3.5 bg-white/90 backdrop-blur-md border-b border-amber-200/70 flex items-center justify-between shadow-xs">
      {/* Brand Title */}
      <div
        onClick={scrollToTop}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-slate-900 shadow-sm font-extrabold font-heading text-base group-hover:scale-105 transition-transform">
          2
        </div>
        <div>
          <h1 className="text-sm sm:text-base font-extrabold font-heading text-slate-800 leading-tight m-0 p-0">
            Reyansh Sharma
          </h1>
          <p className="text-[10px] sm:text-xs text-amber-600 font-bold leading-none">
            2nd Birthday Storybook 🎈
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Play/Pause Birthday Background Music */}
        {!isMelodyPlaying ? (
          <button
            onClick={playMelody}
            title="Play Happy Birthday Song"
            className="py-1.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
            <span>Music 🎵</span>
          </button>
        ) : (
          <button
            onClick={stopMelody}
            title="Stop Music"
            className="py-1.5 px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-2xs"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>Stop</span>
          </button>
        )}

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
        </button>

        {/* Top Button */}
        <button
          onClick={scrollToTop}
          title="Scroll to top"
          className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center gap-1 shadow-sm transition-transform active:scale-95 cursor-pointer font-heading"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Top</span>
        </button>
      </div>
    </header>
  );
};
