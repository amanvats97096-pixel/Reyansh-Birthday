import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SmilePlus, Heart } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhotoRange, type PhotoItem } from '../utils/photos';
import { useSound } from '../context/SoundContext';

interface CardItem {
  id: number;
  photo: PhotoItem;
  wish: string;
}

export const ReasonsToSmilePage: React.FC = () => {
  const collagePhotos = getPhotoRange(14, 4);
  const { playPop } = useSound();
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const cards: CardItem[] = [
    { id: 1, photo: collagePhotos[0], wish: 'Your contagious, joyful laugh! 😄' },
    { id: 2, photo: collagePhotos[1], wish: 'Your warm, cozy cuddles! 🤗' },
    { id: 3, photo: collagePhotos[2], wish: 'Your sparkling, happy eyes! ✨' },
    { id: 4, photo: collagePhotos[3], wish: 'The pure magic you bring every day! 🌟' }
  ];

  const handleFlip = (id: number) => {
    playPop();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-900 font-bold text-xs sm:text-sm mb-3">
          <SmilePlus className="w-4 h-4 text-yellow-600" />
          <span>Chapter 14: Interactive Flip Cards</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          So Many Reasons to Smile 😊
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-8">
          Tap each photo card to flip it over and reveal a reason to smile!
        </p>

        {/* 2x2 Grid of Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full mb-8">
          {cards.map((card) => {
            const isFlipped = flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={() => handleFlip(card.id)}
                className="h-64 sm:h-72 cursor-pointer perspective-1000 group"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full relative shadow-xl rounded-2xl"
                >
                  {/* Front Side (Photo) */}
                  <div className="absolute inset-0 backface-hidden bg-white p-3 rounded-2xl border-2 border-amber-200 flex flex-col items-center">
                    <img
                      src={card.photo.src}
                      alt={card.photo.alt}
                      loading="lazy"
                      style={{ objectPosition: card.photo.objectPosition }}
                      className="w-full h-48 object-cover rounded-xl bg-amber-50"
                    />
                    <div className="mt-2 text-center">
                      <span className="text-xs font-bold text-amber-600">
                        Tap card to flip 🔄
                      </span>
                    </div>
                  </div>

                  {/* Back Side (Wish) */}
                  <div
                    style={{ transform: 'rotateY(180deg)' }}
                    className="absolute inset-0 backface-hidden bg-gradient-to-tr from-amber-400 via-rose-300 to-pink-300 p-6 rounded-2xl border-2 border-white flex flex-col items-center justify-center text-white text-center shadow-inner"
                  >
                    <Heart className="w-10 h-10 mb-3 text-white fill-white animate-pulse" />
                    <h3 className="font-heading text-xl font-extrabold mb-2">
                      Reason #{card.id}
                    </h3>
                    <p className="font-bold text-base sm:text-lg">
                      {card.wish}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};
