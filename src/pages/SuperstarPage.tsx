import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Moon } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const SuperstarPage: React.FC = () => {
  const photo = getPhoto(10);
  const { playChime } = useSound();
  const [activeStarWish, setActiveStarWish] = useState<string | null>(null);

  const stars = [
    { id: 1, wish: 'Happy 2nd Birthday, Reyansh! 🎈', top: '15%', left: '15%' },
    { id: 2, wish: 'Wishing you a magical year ahead! ✨', top: '25%', left: '80%' },
    { id: 3, wish: 'May your day be filled with joy & laughter! 😊', top: '65%', left: '10%' },
    { id: 4, wish: 'Happy Birthday with lots of love from Aman! ❤️', top: '75%', left: '85%' }
  ];

  const handleStarClick = (wish: string) => {
    playChime();
    setActiveStarWish(wish);
  };

  return (
    <PageLayout disableSwipe={activeStarWish !== null}>
      <div className="flex flex-col items-center text-center py-4 relative min-h-[80vh]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-900 font-bold text-xs sm:text-sm mb-3">
          <Star className="w-4 h-4 text-indigo-600 fill-indigo-600 animate-spin" />
          <span>Night Sky Superstar</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Our Little Superstar 🌟
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Tap the sparkling stars in the sky to reveal birthday wishes!
        </p>

        {/* Dreamy Night Container */}
        <div className="relative max-w-3xl w-full h-[450px] bg-slate-900 rounded-3xl p-6 border-2 border-indigo-400/40 shadow-2xl overflow-hidden flex items-center justify-center">
          {/* Moon Accent */}
          <div className="absolute top-6 left-8 text-amber-200 opacity-90">
            <Moon className="w-12 h-12 fill-amber-200/20" />
          </div>

          {/* Twinkling Interactive Stars */}
          {stars.map((star) => (
            <motion.button
              key={star.id}
              onClick={() => handleStarClick(star.wish)}
              style={{ top: star.top, left: star.left }}
              whileHover={{ scale: 1.3, rotate: 180 }}
              whileTap={{ scale: 0.8 }}
              className="absolute z-20 p-2 text-amber-300 hover:text-amber-100 cursor-pointer transition-transform"
            >
              <Star className="w-8 h-8 fill-amber-300 animate-twinkle" />
            </motion.button>
          ))}

          {/* Center Photo */}
          <div className="photo-frame max-w-xs relative z-10">
            <div className="scrapbook-tape" />
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{ objectPosition: photo.objectPosition }}
              className="w-full h-64 sm:h-72 object-contain rounded-xl bg-slate-800/80 p-1"
            />
            <div className="mt-3 text-center">
              <p className="font-heading text-slate-800 font-bold text-base">
                Reyansh Sharma
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {photo.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Wish Popup */}
        <AnimatePresence>
          {activeStarWish && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-4 bg-amber-100 border-2 border-amber-400 rounded-2xl max-w-md text-slate-900 font-bold text-sm sm:text-base shadow-lg flex items-center justify-between gap-3"
            >
              <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
              <span>{activeStarWish}</span>
              <button
                onClick={() => setActiveStarWish(null)}
                className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};
