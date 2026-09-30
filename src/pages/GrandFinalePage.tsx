import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Award, Heart, RefreshCw } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const GrandFinalePage: React.FC = () => {
  const navigate = useNavigate();
  const photo = getPhoto(19);
  const { playCelebration, playPop } = useSound();

  useEffect(() => {
    playCelebration();
    // Fire celebratory confetti cannons!
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const handleReplay = () => {
    playPop();
    navigate('/');
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-4">
        {/* Crown / Trophy Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-200 rounded-3xl flex items-center justify-center text-slate-900 shadow-xl shadow-amber-400/30 mb-4 transform -rotate-6"
        >
          <Award className="w-10 h-10 text-slate-900" />
        </motion.div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-slate-800 mb-2 tracking-tight">
          Happy 2nd Birthday, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500">
            Reyansh Sharma! 🎉
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-lg mb-8 font-medium">
          You are our sunshine, our joy, and our greatest gift. May your 2nd year be filled with health, laughter, and endless wonder!
        </p>

        {/* Closing Photo Frame */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="photo-frame max-w-xs sm:max-w-sm mx-auto mb-8 shadow-2xl"
        >
          <div className="scrapbook-tape" />
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.objectPosition }}
            className="w-full h-72 sm:h-88 object-contain rounded-xl bg-amber-50/80 p-1"
          />
          <div className="mt-4 text-center">
            <Heart className="w-6 h-6 text-rose-500 mx-auto mb-1 fill-rose-500 animate-bounce" />
            <p className="font-heading text-slate-800 font-extrabold text-lg sm:text-xl">
              Always Loved & Cherished
            </p>
            <p className="text-sm font-semibold text-rose-600 mt-1">
              With love, Aman ❤️
            </p>
          </div>
        </motion.div>

        {/* Replay Birthday Storybook Button */}
        <button
          onClick={handleReplay}
          className="py-4 px-8 sm:py-5 sm:px-10 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-900 font-extrabold text-lg rounded-2xl shadow-xl shadow-amber-400/40 flex items-center gap-3 cursor-pointer transition-transform active:scale-95 font-heading"
        >
          <RefreshCw className="w-6 h-6" />
          <span>Replay Birthday Adventure</span>
        </button>
      </div>
    </PageLayout>
  );
};
