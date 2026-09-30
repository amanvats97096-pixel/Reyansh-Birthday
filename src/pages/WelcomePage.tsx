import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, PartyPopper } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const photo = getPhoto(0);
  const { playPop, playCelebration } = useSound();

  const handleStart = () => {
    playCelebration();
    playPop();
    navigate('/countdown');
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center text-center py-4">
        {/* Top Tag */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs sm:text-sm mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
          <span>4 October 2026 &bull; Turning TWO!</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight mb-4"
        >
          Reyansh is turning <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500">TWO!</span> 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-xl text-slate-600 max-w-xl mb-8 font-medium"
        >
          Welcome to a magical birthday storybook celebrating two wonderful years of laughter, smiles, and endless joy!
        </motion.p>

        {/* Hero Photo Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.4 }}
          className="relative mb-10 group"
        >
          <div className="photo-frame max-w-xs sm:max-w-sm mx-auto transform transition-transform group-hover:rotate-0">
            <div className="scrapbook-tape" />
            <img
              src={photo.src}
              alt={photo.alt}
              loading="eager"
              style={{ objectPosition: photo.objectPosition }}
              className="w-full h-72 sm:h-96 object-contain rounded-xl bg-amber-50/80 p-1"
            />
            <div className="mt-4 text-center">
              <p className="font-heading text-slate-800 text-lg sm:text-xl font-bold">
                Reyansh Sharma
              </p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {photo.caption}
              </p>
            </div>
          </div>

          {/* Floating Accents */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold font-heading text-lg shadow-lg animate-bounce">
            2!
          </div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-sky-400 text-white rounded-full flex items-center justify-center shadow-lg animate-float">
            <PartyPopper className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={handleStart}
          className="py-4 px-8 sm:py-5 sm:px-10 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-900 font-extrabold text-lg sm:text-xl rounded-2xl shadow-xl shadow-amber-400/40 flex items-center gap-3 transition-transform active:scale-95 cursor-pointer font-heading"
        >
          <span>Begin the Birthday Adventure</span>
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </PageLayout>
  );
};
