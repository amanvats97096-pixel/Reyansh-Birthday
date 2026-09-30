import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rainbow } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const RainbowPage: React.FC = () => {
  const photo = getPhoto(11);
  const { playPop } = useSound();
  const [selectedColor, setSelectedColor] = useState<string>('from-pink-100 via-sky-100 to-amber-100');

  const rainbowStrips = [
    { name: 'Red Joy', color: 'bg-rose-400', gradient: 'from-rose-100 via-pink-100 to-amber-100' },
    { name: 'Orange Warmth', color: 'bg-orange-400', gradient: 'from-orange-100 via-amber-100 to-yellow-100' },
    { name: 'Yellow Sunshine', color: 'bg-amber-400', gradient: 'from-amber-100 via-yellow-100 to-sky-100' },
    { name: 'Green Adventures', color: 'bg-emerald-400', gradient: 'from-emerald-100 via-teal-100 to-sky-100' },
    { name: 'Blue Sky', color: 'bg-sky-400', gradient: 'from-sky-100 via-indigo-100 to-pink-100' },
    { name: 'Purple Dreams', color: 'bg-purple-400', gradient: 'from-purple-100 via-pink-100 to-rose-100' }
  ];

  const handleColorClick = (gradient: string) => {
    playPop();
    setSelectedColor(gradient);
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm mb-3">
          <Rainbow className="w-4 h-4 text-emerald-600 animate-bounce" />
          <span>Chapter 11: Rainbow Palette</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Rainbow Wishes 🌈
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Tap the colorful rainbow bars to paint Reyansh's birthday atmosphere!
        </p>

        {/* Dynamic Gradient Wrapper */}
        <div className={`w-full max-w-2xl bg-gradient-to-tr ${selectedColor} rounded-3xl p-6 sm:p-8 border-2 border-white shadow-2xl transition-all duration-500 flex flex-col items-center mb-6`}>
          {/* Interactive Rainbow Arc */}
          <div className="flex items-center justify-center gap-2 mb-6 w-full max-w-md">
            {rainbowStrips.map((strip) => (
              <motion.button
                key={strip.name}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorClick(strip.gradient)}
                aria-label={`Select ${strip.name}`}
                className={`h-16 flex-1 ${strip.color} rounded-full shadow-md cursor-pointer border border-white/60`}
              />
            ))}
          </div>

          {/* Photo Frame */}
          <div className="photo-frame max-w-xs mx-auto">
            <div className="scrapbook-tape" />
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{ objectPosition: photo.objectPosition }}
              className="w-full h-64 object-cover rounded-xl bg-white"
            />
            <div className="mt-3 text-center">
              <p className="font-heading text-slate-800 font-bold text-base">
                Bright & Colorful Moments
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {photo.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
