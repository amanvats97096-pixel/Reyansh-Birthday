import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhotoRange, type PhotoItem } from '../utils/photos';
import { useSound } from '../context/SoundContext';

export const StorybookPage: React.FC = () => {
  // Grab a slice of photos for storybook
  const storyPhotos = getPhotoRange(4, 6);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);
  const { playPop } = useSound();

  const currentPhoto = storyPhotos[currentPageIndex];

  const handleNextPage = () => {
    playPop();
    setCurrentPageIndex((prev) => (prev + 1) % storyPhotos.length);
  };

  const handlePrevPage = () => {
    playPop();
    setCurrentPageIndex((prev) => (prev - 1 + storyPhotos.length) % storyPhotos.length);
  };

  return (
    <PageLayout disableSwipe={lightboxPhoto !== null}>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm mb-4">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Chapter 5: Storybook Album</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          The Photo Storybook 📖
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Turn the pages of Reyansh's photo album!
        </p>

        {/* Storybook Container */}
        <div className="relative max-w-xl w-full bg-amber-50/90 rounded-3xl p-4 sm:p-8 border-2 border-amber-200 shadow-2xl mb-6">
          {/* Book Spine indicator */}
          <div className="absolute top-0 bottom-0 left-1/2 w-4 -translate-x-1/2 bg-amber-200/50 hidden sm:block rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="photo-frame w-full max-w-sm relative group">
                <div className="scrapbook-tape" />
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  loading="lazy"
                  style={{ objectPosition: currentPhoto.objectPosition }}
                  className="w-full h-72 sm:h-96 object-contain rounded-xl bg-amber-100/60 p-1"
                />

                <button
                  onClick={() => setLightboxPhoto(currentPhoto)}
                  aria-label="View photo full screen"
                  className="absolute bottom-12 right-4 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>

                <div className="mt-4 text-center">
                  <span className="text-xs font-bold text-amber-600 tracking-wider">
                    STORYBOOK PAGE {currentPageIndex + 1} OF {storyPhotos.length}
                  </span>
                  <p className="font-heading text-slate-800 font-bold text-base sm:text-lg mt-0.5">
                    {currentPhoto.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Book Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevPage}
              className="py-2.5 px-4 bg-white hover:bg-amber-100 text-slate-800 font-bold rounded-2xl border border-amber-300 shadow-sm flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 text-amber-600" />
              <span>Turn Back</span>
            </button>

            <span className="text-xs font-semibold text-slate-500">
              {currentPageIndex + 1} / {storyPhotos.length}
            </span>

            <button
              onClick={handleNextPage}
              className="py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-2xl shadow-sm flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm active:scale-95"
            >
              <span>Next Page</span>
              <ChevronRight className="w-5 h-5 text-slate-900" />
            </button>
          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxPhoto && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full flex flex-col items-center">
              <button
                onClick={() => setLightboxPhoto(null)}
                aria-label="Close photo lightbox"
                className="absolute top-2 right-2 z-10 p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.alt}
                style={{ objectPosition: lightboxPhoto.objectPosition }}
                className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-white font-heading text-lg font-bold mt-4 text-center">
                {lightboxPhoto.caption}
              </p>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};
