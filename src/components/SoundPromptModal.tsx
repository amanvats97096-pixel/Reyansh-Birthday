import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const SoundPromptModal: React.FC = () => {
  const { enableSound } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem('birthday_sound_choice');
    if (!choice) {
      setIsOpen(true);
    }
  }, []);

  const handleChoice = (withSound: boolean) => {
    enableSound(withSound);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-md p-6 md:p-8 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-100 text-center relative overflow-hidden"
        >
          {/* Decorative accents */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-200/50 rounded-full blur-2xl pointer-events-none" />

          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-amber-200 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200/50 text-amber-900 transform -rotate-3">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-heading text-slate-800 mb-2">
            Welcome to Reyansh's Party! 🎉
          </h2>
          <p className="text-slate-600 text-sm md:text-base mb-6 font-medium leading-relaxed">
            Would you like to explore Reyansh's 2nd Birthday Storybook with playful sound effects & instrumental music?
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleChoice(true)}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-900 font-bold rounded-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-3 transition-transform active:scale-95 text-base md:text-lg cursor-pointer"
            >
              <Volume2 className="w-6 h-6 text-slate-900" />
              Enter with Sound 🎵
            </button>

            <button
              onClick={() => handleChoice(false)}
              className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm md:text-base cursor-pointer"
            >
              <VolumeX className="w-5 h-5 text-slate-500" />
              Silent Mode 🔇
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
