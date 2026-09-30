import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, RefreshCw, Heart } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { useSound } from '../context/SoundContext';

interface BalloonItem {
  id: number;
  color: string;
  textColor: string;
  wish: string;
  isPopped: boolean;
  left: string;
}

export const BalloonsPage: React.FC = () => {
  const { playPop } = useSound();

  const initialBalloons: BalloonItem[] = [
    { id: 1, color: 'bg-rose-400', textColor: 'text-rose-600', wish: 'Happy 2nd Birthday, Reyansh! 🎈', isPopped: false, left: '10%' },
    { id: 2, color: 'bg-amber-400', textColor: 'text-amber-600', wish: 'May your day be filled with sweet cake & joy! 🎂', isPopped: false, left: '30%' },
    { id: 3, color: 'bg-sky-400', textColor: 'text-sky-600', wish: 'Wishing you lots of love, health & smiles! 😊', isPopped: false, left: '50%' },
    { id: 4, color: 'bg-emerald-400', textColor: 'text-emerald-600', wish: 'May all your birthday wishes come true! ✨', isPopped: false, left: '70%' },
    { id: 5, color: 'bg-purple-400', textColor: 'text-purple-600', wish: 'Happy Birthday to our little star! With love, Aman ❤️', isPopped: false, left: '88%' }
  ];

  const [balloons, setBalloons] = useState<BalloonItem[]>(initialBalloons);

  const handlePop = (id: number) => {
    playPop();
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isPopped: true } : b))
    );
  };

  const handleReset = () => {
    playPop();
    setBalloons(initialBalloons);
  };

  const poppedCount = balloons.filter((b) => b.isPopped).length;

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4 relative min-h-[75vh]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 font-bold text-xs sm:text-sm mb-3">
          <PartyPopper className="w-4 h-4 text-pink-600" />
          <span>Balloon Pop Surprise</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          A Sky Full of Balloons 🎈
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Tap each floating balloon to pop it and reveal sweet birthday wishes! ({poppedCount}/{balloons.length} Popped)
        </p>

        {/* Reset Button */}
        {poppedCount > 0 && (
          <button
            onClick={handleReset}
            className="mb-6 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow transition-transform active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Inflate All Balloons Again</span>
          </button>
        )}

        {/* Balloon Playground Area */}
        <div className="w-full max-w-3xl h-[420px] bg-gradient-to-b from-sky-200/50 via-pink-100/40 to-amber-100/50 rounded-3xl border-2 border-sky-200 relative overflow-hidden p-6 shadow-inner flex items-center justify-around flex-wrap gap-4">
          {balloons.map((balloon) => (
            <div key={balloon.id} className="relative flex flex-col items-center my-2">
              <AnimatePresence mode="wait">
                {!balloon.isPopped ? (
                  <motion.button
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: [0, -15, 0], opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      y: { duration: 3 + balloon.id, repeat: Infinity, ease: 'easeInOut' },
                      duration: 0.3
                    }}
                    onClick={() => handlePop(balloon.id)}
                    aria-label={`Pop ${balloon.color} balloon`}
                    className={`w-24 h-32 sm:w-28 sm:h-36 ${balloon.color} rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg cursor-pointer flex flex-col items-center justify-center relative transition-transform hover:scale-105 active:scale-90`}
                  >
                    {/* Shine highlight */}
                    <div className="absolute top-4 left-4 w-6 h-8 bg-white/40 rounded-full blur-[1px] transform -rotate-12" />
                    <span className="text-white font-extrabold font-heading text-xl shadow-xs">
                      TAP!
                    </span>
                    {/* Balloon String */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-1 h-10 bg-slate-400/70" />
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-white/95 rounded-2xl border-2 border-amber-300 shadow-lg max-w-[200px] text-center"
                  >
                    <Heart className="w-6 h-6 text-rose-500 mx-auto mb-1 fill-rose-500 animate-bounce" />
                    <p className={`font-bold font-heading text-xs sm:text-sm leading-snug ${balloon.textColor}`}>
                      {balloon.wish}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
