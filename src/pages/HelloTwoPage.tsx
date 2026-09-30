import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const HelloTwoPage: React.FC = () => {
  const photo = getPhoto(2);
  const { playPop } = useSound();

  const milestones = [
    { number: '730', label: 'Days of Pure Sunshine', icon: '☀️', color: 'from-amber-400 to-amber-200' },
    { number: '24', label: 'Months of Giggles & Glee', icon: '🎈', color: 'from-sky-400 to-sky-200' },
    { number: '100%', label: 'Joy & Magic Every Day', icon: '🌟', color: 'from-pink-400 to-pink-200' }
  ];

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-4">
        {/* Animated Badge */}
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 border border-pink-300 font-bold text-xs sm:text-sm mb-4 inline-flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-pink-600 fill-pink-600 animate-pulse" />
          <span>Chapter 3: Hello, Two!</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-slate-800 mb-4 tracking-tight">
          Two Years of Endless Wonder! ✨
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed font-medium">
          Two years ago, Reyansh entered our lives and brought a universe of sweetness, playful antics, and boundless love. Happy 2nd Birthday to our adorable nephew!
        </p>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl w-full mb-10">
          {/* Photo */}
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="photo-frame mx-auto max-w-xs sm:max-w-sm"
          >
            <div className="scrapbook-tape" />
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{ objectPosition: photo.objectPosition }}
              className="w-full h-72 sm:h-88 object-contain rounded-xl bg-pink-50/80 p-1"
            />
            <div className="mt-3 text-center">
              <p className="font-heading text-slate-800 font-bold text-base sm:text-lg">
                Sweet 2-Year Milestone
              </p>
              <p className="text-xs text-slate-500">{photo.caption}</p>
            </div>
          </motion.div>

          {/* Interactive Milestone Cards */}
          <div className="flex flex-col gap-4">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                onClick={playPop}
                whileHover={{ scale: 1.03 }}
                className="p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-md flex items-center gap-4 text-left cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${m.color} flex items-center justify-center text-2xl shadow-sm shrink-0 font-extrabold font-heading group-hover:rotate-6 transition-transform`}>
                  {m.icon}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800">
                    {m.number}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600">
                    {m.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
