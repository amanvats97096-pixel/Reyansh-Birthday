import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Sparkles, BookOpen, Music, Gift, Star, Rainbow, Smile, Mail, Cake, Clock, Heart, Image, Gamepad2, PartyPopper, Piano, Award, Sun, MessageSquareHeart, SmilePlus } from 'lucide-react';
import { PAGES } from '../routes/pageRoutes';
import { useSound } from '../context/SoundContext';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  PartyPopper: <PartyPopper className="w-5 h-5" />,
  Cake: <Cake className="w-5 h-5" />,
  Music: <Music className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Rainbow: <Rainbow className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Mail: <Mail className="w-5 h-5" />,
  SmilePlus: <SmilePlus className="w-5 h-5" />,
  Piano: <Piano className="w-5 h-5" />,
  Gamepad2: <Gamepad2 className="w-5 h-5" />,
  Image: <Image className="w-5 h-5" />,
  MessageSquareHeart: <MessageSquareHeart className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />
};

interface PageMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PageMenuModal: React.FC<PageMenuModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playPop } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-4xl max-h-[90vh] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-amber-100 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 via-sky-50 to-pink-50 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                Reyansh's Birthday Storybook (20 Pages)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">Select any chapter to jump directly to it</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close storybook menu"
              className="p-2 sm:p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Grid of 20 pages */}
          <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PAGES.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <button
                  key={page.id}
                  onClick={() => {
                    playPop();
                    navigate(page.path);
                    onClose();
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 group cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/20 border-amber-400 shadow-md shadow-amber-200/50'
                      : 'bg-white hover:bg-amber-50/60 border-slate-200/80 hover:border-amber-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'bg-amber-500 text-slate-900 font-bold shadow'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {ICON_MAP[page.icon] || <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-bold text-amber-600 tracking-wider">
                        PAGE {String(page.id).padStart(2, '0')}
                      </span>
                      {isActive && (
                        <span className="text-[10px] uppercase bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full font-bold">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 truncate font-heading group-hover:text-amber-700">
                      {page.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{page.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
            Reyansh Sharma's 2nd Birthday &bull; 4 October 2026
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
