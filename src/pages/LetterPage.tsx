import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const LetterPage: React.FC = () => {
  const photo = getPhoto(13);
  const { playChime, playPop } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) playChime();
    else playPop();
    setIsOpen(!isOpen);
  };

  return (
    <PageLayout disableSwipe={isOpen}>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-900 font-bold text-xs sm:text-sm mb-3">
          <Mail className="w-4 h-4 text-rose-600" />
          <span>Chapter 11: Special Sealed Letter</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          A Letter for Reyansh 💌
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Tap the envelope to break the seal and read a special birthday note!
        </p>

        {/* Envelope Container */}
        <div className="relative max-w-lg w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="envelope-closed"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                aria-label="Open birthday envelope"
                className="w-full h-72 bg-gradient-to-br from-amber-100 via-rose-100 to-amber-200 rounded-3xl border-2 border-amber-300 shadow-2xl flex flex-col items-center justify-center relative cursor-pointer group p-6"
              >
                {/* Envelope Flap visual */}
                <div className="w-full h-32 bg-amber-200/80 rounded-b-[50%] absolute top-0 inset-x-0 border-b-2 border-amber-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold shadow-md transform translate-y-6">
                    <Heart className="w-6 h-6 fill-white" />
                  </div>
                </div>

                <div className="mt-20 text-center relative z-10">
                  <span className="font-heading text-xl font-bold text-slate-800">
                    To: Reyansh Sharma
                  </span>
                  <p className="text-xs font-semibold text-rose-600 mt-1">
                    Tap to open letter 💌
                  </p>
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="envelope-open"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-amber-50/95 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative"
              >
                {/* Header note */}
                <div className="flex items-center justify-between border-b border-amber-200 pb-4 mb-4">
                  <div>
                    <h3 className="font-heading text-2xl font-extrabold text-slate-800">
                      Dearest Reyansh,
                    </h3>
                    <span className="text-xs text-amber-700 font-semibold">
                      4 October 2026 &bull; Turning 2
                    </span>
                  </div>
                  <button
                    onClick={handleToggle}
                    className="text-xs bg-slate-200 hover:bg-slate-300 px-3 py-1.5 rounded-xl font-bold text-slate-700 cursor-pointer"
                  >
                    Close Envelope
                  </button>
                </div>

                {/* Letter Body */}
                <div className="space-y-4 text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                  <p>
                    Happy 2nd Birthday! Watching you grow over the past two years has brought so much warmth and happiness to all of us.
                  </p>
                  <p>
                    May your days always be filled with joyful playtime, bright giggles, sweet cakes, and endless wonder as you explore the world.
                  </p>
                  <p className="pt-2 font-heading text-slate-900 font-bold text-lg text-right">
                    With love, <br />
                    <span className="text-rose-600 font-extrabold text-xl">Aman</span>
                  </p>
                </div>

                {/* Photo attached */}
                <div className="mt-6 pt-4 border-t border-amber-200 flex justify-center">
                  <div className="photo-frame max-w-xs">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      style={{ objectPosition: photo.objectPosition }}
                      className="w-full h-48 object-contain rounded-xl bg-amber-50/80 p-1"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};
