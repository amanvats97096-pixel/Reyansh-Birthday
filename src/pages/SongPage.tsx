import React from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Square, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { useSound } from '../context/SoundContext';
import { getPhoto } from '../utils/photos';

export const SongPage: React.FC = () => {
  const photo = getPhoto(6);
  const {
    isMelodyPlaying,
    playMelody,
    stopMelody,
    isMuted,
    toggleMute,
    volume,
    setVolume,
    visualizerNote
  } = useSound();

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 font-bold text-xs sm:text-sm mb-3">
          <Music className="w-4 h-4 text-sky-600 animate-bounce" />
          <span>Chapter 8: Birthday Melody</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Happy Birthday Song 🎶
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Listen to the joyful instrumental Happy Birthday song synthesized live for Reyansh!
        </p>

        {/* Music Player Box */}
        <div className="relative max-w-lg w-full bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-2xl flex flex-col items-center mb-8">
          {/* Visualizer Spectrum Bars */}
          <div className="w-full h-24 bg-slate-900 rounded-2xl p-4 flex items-end justify-center gap-1.5 sm:gap-2 mb-6 shadow-inner overflow-hidden relative">
            <div className="absolute top-2 left-4 text-[10px] text-sky-400 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>{isMelodyPlaying ? `Synthesizer Active (${Math.round(visualizerNote)} Hz)` : 'Audio Visualizer Ready'}</span>
            </div>

            {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 65, 85, 35, 75, 55, 90].map((h, i) => (
              <motion.div
                key={i}
                animate={
                  isMelodyPlaying && visualizerNote > 0
                    ? { height: [`${Math.max(15, h * 0.4)}%`, `${h}%`, `${Math.max(20, h * 0.6)}%`] }
                    : { height: '15%' }
                }
                transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                className="w-2 sm:w-3 bg-gradient-to-t from-sky-500 via-amber-400 to-pink-400 rounded-t-sm"
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mb-6">
            {!isMelodyPlaying ? (
              <button
                onClick={playMelody}
                className="py-4 px-8 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-sky-400/30 flex items-center gap-2 cursor-pointer transition-transform active:scale-95 font-heading"
              >
                <Play className="w-6 h-6 fill-white" />
                <span>Play Birthday Song 🎵</span>
              </button>
            ) : (
              <button
                onClick={stopMelody}
                className="py-4 px-8 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-rose-500/30 flex items-center gap-2 cursor-pointer transition-transform active:scale-95 font-heading"
              >
                <Square className="w-6 h-6 fill-white" />
                <span>Stop Song</span>
              </button>
            )}

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold shadow-sm cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-rose-500" /> : <Volume2 className="w-6 h-6 text-sky-600" />}
            </button>
          </div>

          {/* Volume Control */}
          <div className="w-full max-w-xs flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-slate-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume slider"
              className="w-full accent-sky-500 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-slate-600 min-w-[35px]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Photo beside music */}
        <div className="photo-frame max-w-xs sm:max-w-sm mx-auto">
          <div className="scrapbook-tape" />
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.objectPosition }}
            className="w-full h-64 sm:h-72 object-cover rounded-xl bg-sky-50"
          />
          <div className="mt-3 text-center">
            <p className="font-heading text-slate-800 font-bold text-base">
              Singing Along for Reyansh
            </p>
            <p className="text-xs text-slate-500">{photo.caption}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
