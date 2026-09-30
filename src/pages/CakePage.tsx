import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake as CakeIcon, Flame, Sparkles, RefreshCw, Heart } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { useSound } from '../context/SoundContext';

export const CakePage: React.FC = () => {
  const { playCelebration, playPop } = useSound();
  const [candlesLit, setCandlesLit] = useState(true);

  const handleBlowOut = () => {
    if (candlesLit) {
      setCandlesLit(false);
      playCelebration();

      // Trigger Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRelight = () => {
    playPop();
    setCandlesLit(true);
  };

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm mb-3">
          <CakeIcon className="w-4 h-4 text-amber-600" />
          <span>Chapter 7: Make a Birthday Wish</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Birthday Cake 🎂
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Blow out the 2 candles to make Reyansh's birthday wish come true!
        </p>

        {/* Interactive Cake Illustration */}
        <div className="relative max-w-sm w-full bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-2xl flex flex-col items-center mb-8">
          {/* Candles Stand */}
          <div className="flex gap-12 mb-2 relative z-10 cursor-pointer" onClick={candlesLit ? handleBlowOut : handleRelight}>
            {[1, 2].map((num) => (
              <div key={num} className="flex flex-col items-center">
                {/* Flame */}
                <AnimatePresence>
                  {candlesLit ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-amber-500 mb-1"
                    >
                      <Flame className="w-8 h-8 fill-amber-400 text-orange-500 animate-pulse drop-shadow-md" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6, y: -10 }}
                      className="text-slate-400 text-xs font-bold mb-3"
                    >
                      💨 puff!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle Stick */}
                <div className="w-5 h-16 bg-gradient-to-b from-pink-300 via-sky-300 to-amber-300 rounded-t-lg border border-slate-300 shadow-sm flex items-center justify-center font-bold text-xs text-slate-700">
                  {num}
                </div>
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <div className="w-full flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-48 h-16 bg-gradient-to-r from-pink-300 via-amber-200 to-pink-300 rounded-t-2xl border-2 border-pink-400 flex items-center justify-center shadow-inner relative">
              <span className="text-xs font-extrabold font-heading text-pink-800">
                HAPPY 2ND BIRTHDAY!
              </span>
              <div className="absolute -bottom-2 inset-x-0 h-4 bg-white/70 rounded-full blur-[1px]" />
            </div>

            {/* Bottom Tier */}
            <div className="w-64 h-24 bg-gradient-to-r from-amber-300 via-sky-200 to-amber-300 rounded-b-2xl border-2 border-amber-400 flex items-center justify-center shadow-lg relative">
              <span className="text-base font-extrabold font-heading text-slate-800 tracking-wide">
                REYANSH SHARMA
              </span>
            </div>
          </div>

          {/* Action Control Button */}
          <div className="mt-8 w-full">
            {candlesLit ? (
              <button
                onClick={handleBlowOut}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-amber-400/30 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 font-heading"
              >
                <Sparkles className="w-5 h-5" />
                <span>Blow Out Candles! 💨</span>
              </button>
            ) : (
              <button
                onClick={handleRelight}
                className="w-full py-3.5 px-6 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 font-heading"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Relight Candles 🕯️</span>
              </button>
            )}
          </div>
        </div>

        {/* Revealed Birthday Wish Card */}
        {!candlesLit && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-gradient-to-r from-amber-100 via-pink-100 to-sky-100 border-2 border-amber-300 rounded-3xl max-w-md text-center shadow-xl mb-6"
          >
            <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2 fill-rose-500 animate-bounce" />
            <h3 className="text-xl font-bold font-heading text-slate-800 mb-1">
              Reyansh's Birthday Wish Released! ✨
            </h3>
            <p className="text-sm font-semibold text-slate-700">
              "May your days be packed with sweet cake, warm cuddles, laughter, and endless fun!"
            </p>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
};
