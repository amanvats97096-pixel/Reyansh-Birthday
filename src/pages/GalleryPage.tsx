import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { photos, realPhotosCount } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const GalleryPage: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const { playPop } = useSound();

  const activePhoto = activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  const handlePrev = () => {
    if (activePhotoIndex !== null) {
      playPop();
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = () => {
    if (activePhotoIndex !== null) {
      playPop();
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Escape') setActivePhotoIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  return (
    <PageLayout disableSwipe={activePhotoIndex !== null}>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 font-bold text-xs sm:text-sm mb-3">
          <ImageIcon className="w-4 h-4 text-sky-600" />
          <span>Chapter 12: Full Memory Collection</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          The Memory Gallery 📸
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Exploring all {photos.length} memories! ({realPhotosCount} user photo{realPhotosCount === 1 ? '' : 's'} added)
        </p>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl w-full mb-8">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => {
                playPop();
                setActivePhotoIndex(idx);
              }}
              className="photo-frame cursor-pointer group"
            >
              <div className="scrapbook-tape" />
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{ objectPosition: photo.objectPosition }}
                className="w-full h-44 sm:h-56 object-contain rounded-xl bg-amber-50/80 p-1"
              />
              <div className="mt-2 text-center truncate">
                <span className="text-[10px] font-bold text-amber-600 tracking-wider block">
                  PHOTO #{idx + 1}
                </span>
                <p className="text-xs font-semibold text-slate-700 truncate">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activePhoto && activePhotoIndex !== null && (
            <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
              <div className="relative max-w-4xl w-full flex flex-col items-center">
                {/* Close Button */}
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  aria-label="Close photo view"
                  className="absolute -top-12 right-0 z-10 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Main Lightbox Image */}
                <motion.img
                  key={activePhoto.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  style={{ objectPosition: activePhoto.objectPosition }}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
                />

                {/* Caption & Counter */}
                <div className="text-center mt-4 text-white">
                  <span className="text-xs font-bold text-amber-300 tracking-wider">
                    {activePhotoIndex + 1} / {photos.length}
                  </span>
                  <p className="font-heading text-lg sm:text-xl font-bold mt-1">
                    {activePhoto.caption}
                  </p>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};
