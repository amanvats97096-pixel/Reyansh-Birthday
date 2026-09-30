import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, RefreshCw } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhotoRange, type PhotoItem } from '../utils/photos';
import { useSound } from '../context/SoundContext';

interface GiftBox {
  id: number;
  title: string;
  boxColor: string;
  ribbonColor: string;
  photo: PhotoItem;
  wish: string;
  isOpen: boolean;
}

export const GiftsPage: React.FC = () => {
  const giftPhotos = getPhotoRange(7, 3);
  const { playChime, playPop } = useSound();

  const [gifts, setGifts] = useState<GiftBox[]>([
    {
      id: 1,
      title: 'Surprise #1',
      boxColor: 'from-pink-400 to-rose-400',
      ribbonColor: 'bg-amber-300',
      photo: giftPhotos[0],
      wish: 'Happy 2nd Birthday Reyansh! Wishing you endless smiles and sweet moments!',
      isOpen: false
    },
    {
      id: 2,
      title: 'Surprise #2',
      boxColor: 'from-amber-400 to-yellow-400',
      ribbonColor: 'bg-sky-400',
      photo: giftPhotos[1],
      wish: 'May your day be filled with yummy birthday cake, toys, and happy giggles!',
      isOpen: false
    },
    {
      id: 3,
      title: 'Surprise #3',
      boxColor: 'from-sky-400 to-blue-400',
      ribbonColor: 'bg-pink-300',
      photo: giftPhotos[2],
      wish: 'Wishing you a wonderful year full of fun and laughter! With love, Aman ❤️',
      isOpen: false
    }
  ]);

  const handleOpenGift = (id: number) => {
    playChime();
    setGifts((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isOpen: true } : g))
    );
  };

  const handleReset = () => {
    playPop();
    setGifts((prev) => prev.map((g) => ({ ...g, isOpen: false })));
  };

  const openedCount = gifts.filter((g) => g.isOpen).length;

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 font-bold text-xs sm:text-sm mb-3">
          <Gift className="w-4 h-4 text-pink-600" />
          <span>Mystery Gift Boxes</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Surprise Gifts 🎁
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Tap each gift box to untie the ribbon and unwrap a birthday surprise! ({openedCount}/3 opened)
        </p>

        {openedCount > 0 && (
          <button
            onClick={handleReset}
            className="mb-6 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow cursor-pointer transition-transform active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Wrap Gifts Again</span>
          </button>
        )}

        {/* 3 Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full mb-8">
          {gifts.map((gift) => (
            <div key={gift.id} className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                {!gift.isOpen ? (
                  <motion.button
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenGift(gift.id)}
                    aria-label={`Open ${gift.title}`}
                    className={`w-56 h-64 bg-gradient-to-b ${gift.boxColor} rounded-3xl border-2 border-white shadow-xl flex flex-col items-center justify-center relative cursor-pointer group`}
                  >
                    {/* Ribbon Cross */}
                    <div className={`absolute inset-y-0 w-8 ${gift.ribbonColor} shadow-sm`} />
                    <div className={`absolute inset-x-0 h-8 ${gift.ribbonColor} shadow-sm`} />

                    {/* Ribbon Bow */}
                    <div className="absolute -top-6 w-16 h-12 flex items-center justify-center z-10">
                      <div className={`w-8 h-8 rounded-full ${gift.ribbonColor} border-2 border-white shadow-md flex items-center justify-center text-xs font-bold text-slate-800`}>
                        🎀
                      </div>
                    </div>

                    <div className="relative z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm mt-8">
                      <span className="font-heading font-extrabold text-slate-800 text-base">
                        {gift.title}
                      </span>
                    </div>

                    <span className="relative z-10 text-xs text-white font-bold mt-2 animate-bounce">
                      Tap to open! ✨
                    </span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 150 }}
                    className="photo-frame max-w-xs w-full"
                  >
                    <div className="scrapbook-tape" />
                    <img
                      src={gift.photo.src}
                      alt={gift.photo.alt}
                      loading="lazy"
                      style={{ objectPosition: gift.photo.objectPosition }}
                      className="w-full h-56 object-contain rounded-xl bg-pink-50/80 p-1"
                    />
                    <div className="mt-3 text-center">
                      <Heart className="w-5 h-5 text-rose-500 mx-auto mb-1 fill-rose-500" />
                      <p className="font-heading text-slate-800 font-bold text-sm">
                        {gift.wish}
                      </p>
                    </div>
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
