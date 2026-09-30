import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Piano } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';
import { useSound } from '../context/SoundContext';

interface KeyInfo {
  note: string;
  freq: number;
  color: string;
  label: string;
}

export const LittlePianoPage: React.FC = () => {
  const photo = getPhoto(15);
  const { playPianoNote } = useSound();
  const [floatingNotes, setFloatingNotes] = useState<{ id: number; note: string; x: number }[]>([]);

  const pianoKeys: KeyInfo[] = [
    { note: 'C4', freq: 261.63, color: 'bg-rose-400 text-rose-950', label: 'Do' },
    { note: 'D4', freq: 293.66, color: 'bg-orange-400 text-orange-950', label: 'Re' },
    { note: 'E4', freq: 329.63, color: 'bg-amber-400 text-amber-950', label: 'Mi' },
    { note: 'F4', freq: 349.23, color: 'bg-emerald-400 text-emerald-950', label: 'Fa' },
    { note: 'G4', freq: 392.00, color: 'bg-sky-400 text-sky-950', label: 'Sol' },
    { note: 'A4', freq: 440.00, color: 'bg-indigo-400 text-indigo-950', label: 'La' },
    { note: 'B4', freq: 493.88, color: 'bg-purple-400 text-purple-950', label: 'Ti' },
    { note: 'C5', freq: 523.25, color: 'bg-pink-400 text-pink-950', label: 'Do High' }
  ];

  const handleKeyPress = (key: KeyInfo, index: number) => {
    playPianoNote(key.freq);

    const noteSymbols = ['🎵', '🎶', '🎼', '🎹', '✨'];
    const symbol = noteSymbols[index % noteSymbols.length];
    const x = (index / (pianoKeys.length - 1)) * 80 + 10;

    const newNote = { id: Date.now() + Math.random(), note: symbol, x };
    setFloatingNotes((prev) => [...prev.slice(-6), newNote]);
  };

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 font-bold text-xs sm:text-sm mb-3">
          <Piano className="w-4 h-4 text-sky-600" />
          <span>Chapter 15: Playable Mini Piano</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Little Piano 🎹
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Tap the colorful keys to play melodies for Reyansh!
        </p>

        {/* Piano Container */}
        <div className="relative max-w-2xl w-full bg-slate-900 rounded-3xl p-6 border-2 border-sky-300 shadow-2xl flex flex-col items-center mb-8">
          {/* Floating Music Notes Stage */}
          <div className="w-full h-20 bg-slate-950/80 rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center border border-slate-800">
            <span className="text-xs text-sky-400/80 font-mono">
              Keyboard Sound Synthesizer Ready
            </span>

            <AnimatePresence>
              {floatingNotes.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 20, opacity: 1, scale: 0.5 }}
                  animate={{ y: -40, opacity: 0, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ left: `${item.x}%` }}
                  className="absolute bottom-2 text-2xl font-bold"
                >
                  {item.note}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 8 Piano Keys */}
          <div className="flex gap-1.5 sm:gap-2 w-full justify-between">
            {pianoKeys.map((key, idx) => (
              <motion.button
                key={key.note}
                whileHover={{ scale: 1.05 }}
                whileTap={{ y: 8, scale: 0.95 }}
                onClick={() => handleKeyPress(key, idx)}
                aria-label={`Play ${key.note}`}
                className={`flex-1 h-36 sm:h-44 ${key.color} rounded-2xl shadow-lg border-b-8 border-slate-900/30 flex flex-col justify-end p-2 sm:p-3 font-bold cursor-pointer transition-transform`}
              >
                <span className="font-heading text-base sm:text-xl block">
                  {key.label}
                </span>
                <span className="text-[10px] sm:text-xs opacity-70 block font-mono">
                  {key.note}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Photo beside piano */}
        <div className="photo-frame max-w-xs mx-auto">
          <div className="scrapbook-tape" />
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.objectPosition }}
            className="w-full h-56 object-cover rounded-xl bg-sky-50"
          />
          <div className="mt-3 text-center">
            <p className="font-heading text-slate-800 font-bold text-base">
              Reyansh's Musical Moments
            </p>
            <p className="text-xs text-slate-500 font-medium">{photo.caption}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
