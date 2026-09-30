import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const SunshinePage: React.FC = () => {
  const photo = getPhoto(3);
  const { playChime } = useSound();
  const [sunRays, setSunRays] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleTapSun = (e: React.MouseEvent<HTMLDivElement>) => {
    playChime();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRay = { id: Date.now(), x, y };
    setSunRays((prev) => [...prev.slice(-8), newRay]);
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-4 relative overflow-hidden">
        {/* Sun Header Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 bg-amber-200/80 rounded-full flex items-center justify-center text-amber-600 mb-4 shadow-xl shadow-amber-200/50 cursor-pointer"
        >
          <Sun className="w-12 h-12 text-amber-500 fill-amber-400" />
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-3">
          Our Little Sunshine ☀️
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-lg mb-8 font-medium">
          You bring warmth, brightness, and pure sunshine wherever you go, Reyansh!
        </p>

        {/* Interactive Sunbeam Photo Container */}
        <div
          onClick={handleTapSun}
          className="relative photo-frame max-w-sm sm:max-w-md mx-auto cursor-pointer group shadow-2xl"
        >
          <div className="scrapbook-tape" />

          {/* Glowing Aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/40 via-yellow-200/30 to-amber-400/40 rounded-2xl blur-xl group-hover:scale-105 transition-transform" />

          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.objectPosition }}
            className="w-full h-80 sm:h-96 object-contain rounded-xl relative z-10 bg-amber-50/80 p-1"
          />

          {/* Interactive Tap Rays */}
          <AnimatePresence>
            {sunRays.map((ray) => (
              <motion.div
                key={ray.id}
                initial={{ opacity: 1, scale: 0.2 }}
                animate={{ opacity: 0, scale: 2.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{ left: ray.x, top: ray.y }}
                className="absolute z-20 pointer-events-none text-amber-400 font-bold transform -translate-x-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-8 h-8 fill-amber-300" />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-4 relative z-10 text-center">
            <p className="font-heading text-slate-800 font-bold text-lg">
              Radiant & Full of Smiles
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Tap anywhere on the photo to spread sunny sparkles!
            </p>
          </div>
        </div>

        {/* Short Wish Box */}
        <div className="mt-8 p-4 bg-amber-100/70 border border-amber-300/60 rounded-2xl max-w-md text-slate-800 font-semibold text-sm sm:text-base shadow-sm">
          "May your life always be filled with bright sunshine, endless playfulness, and warm bear hugs!" 💛
        </div>
      </div>
    </PageLayout>
  );
};
