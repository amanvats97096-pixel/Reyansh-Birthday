import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PartyPopper, Play, Pause, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhotoRange } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const DancePartyPage: React.FC = () => {
  const dancePhotos = getPhotoRange(18, 2);
  const { isMelodyPlaying, playMelody, stopMelody, reducedMotion, playPop } = useSound();
  const [isDancing, setIsDancing] = useState(true);

  const handleConfetti = () => {
    playPop();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  const toggleDance = () => {
    playPop();
    setIsDancing(!isDancing);
  };

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm mb-3">
          <PartyPopper className="w-4 h-4 text-amber-600 animate-bounce" />
          <span>Chapter 13: Birthday Dance Floor</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Birthday Dance Party 🕺
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Put on your dancing shoes and celebrate Reyansh turning 2!
        </p>

        {/* Dance Controls Bar */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={toggleDance}
            className="py-3 px-5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl text-sm flex items-center gap-2 shadow cursor-pointer transition-transform active:scale-95"
          >
            {isDancing ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-emerald-300" />}
            <span>{isDancing ? 'Pause Dance Motion' : 'Start Dancing'}</span>
          </button>

          {!isMelodyPlaying ? (
            <button
              onClick={playMelody}
              className="py-3 px-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold rounded-2xl text-sm flex items-center gap-2 shadow cursor-pointer transition-transform active:scale-95 font-heading"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              <span>Dance Music</span>
            </button>
          ) : (
            <button
              onClick={stopMelody}
              className="py-3 px-5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-sm flex items-center gap-2 shadow cursor-pointer transition-transform active:scale-95"
            >
              <Pause className="w-4 h-4" />
              <span>Stop Music</span>
            </button>
          )}

          <button
            onClick={handleConfetti}
            className="py-3 px-5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-2xl text-sm flex items-center gap-2 shadow cursor-pointer transition-transform active:scale-95 font-heading"
          >
            <Sparkles className="w-4 h-4" />
            <span>Confetti Cannon 🎉</span>
          </button>
        </div>

        {/* Dance Floor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full mb-6">
          {dancePhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              animate={
                isDancing && !reducedMotion
                  ? { y: [0, -12, 0], rotate: [idx % 2 === 0 ? -2 : 2, idx % 2 === 0 ? 2 : -2, idx % 2 === 0 ? -2 : 2] }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.3 }}
              className="photo-frame"
            >
              <div className="scrapbook-tape" />
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{ objectPosition: photo.objectPosition }}
                className="w-full h-64 sm:h-72 object-contain rounded-xl bg-amber-50/80 p-1"
              />
              <div className="mt-3 text-center">
                <p className="font-heading text-slate-800 font-bold text-base">
                  Dancing Reyansh #{idx + 1}
                </p>
                <p className="text-xs text-slate-500">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
