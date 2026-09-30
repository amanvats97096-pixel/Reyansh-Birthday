import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const TeddyPartyPage: React.FC = () => {
  const photo = getPhoto(12);
  const { playChime } = useSound();
  const [activeMessage, setActiveMessage] = useState<string>('Welcome to the Teddy Bear Party! 🧸');

  const teddies = [
    { id: 1, name: 'Barnaby Bear', emoji: '🧸', message: 'Barnaby says: Happy 2nd Birthday Reyansh! 🎈' },
    { id: 2, name: 'Panda Pal', emoji: '🐼', message: 'Panda Pal says: Wishing you big hugs and yummy cake! 🎂' },
    { id: 3, name: 'Teddy Hugs', emoji: '🐻', message: 'Teddy Hugs says: May your day be full of fun! ✨' }
  ];

  const handleTeddyClick = (msg: string) => {
    playChime();
    setActiveMessage(msg);
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm mb-3">
          <Smile className="w-4 h-4 text-amber-600" />
          <span>Chapter 10: Teddy Bear Party</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          The Teddy Bear Party 🧸
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Reyansh's teddy bear friends are celebrating his big 2nd birthday! Tap each bear for a greeting.
        </p>

        {/* Message Banner */}
        <motion.div
          key={activeMessage}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 bg-amber-100/90 border-2 border-amber-300 rounded-2xl max-w-md text-amber-950 font-bold text-sm sm:text-base shadow-md mb-8"
        >
          {activeMessage}
        </motion.div>

        {/* Party Scene */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl w-full">
          {/* Photo */}
          <div className="photo-frame max-w-xs sm:max-w-sm mx-auto">
            <div className="scrapbook-tape" />
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              style={{ objectPosition: photo.objectPosition }}
              className="w-full h-72 object-contain rounded-xl bg-amber-50/80 p-1"
            />
            <div className="mt-3 text-center">
              <p className="font-heading text-slate-800 font-bold text-base">
                Party Time with Reyansh
              </p>
              <p className="text-xs text-slate-500">{photo.caption}</p>
            </div>
          </div>

          {/* Teddy Bears List */}
          <div className="flex flex-col gap-4">
            {teddies.map((t) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.04, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTeddyClick(t.message)}
                className="p-4 bg-white/90 rounded-2xl border-2 border-amber-200 shadow-sm flex items-center gap-4 text-left cursor-pointer transition-colors hover:bg-amber-50"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0">
                  {t.emoji}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-800">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-500">Tap to hear greeting</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
