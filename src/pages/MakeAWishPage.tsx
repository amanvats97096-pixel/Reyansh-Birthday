import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Send, Heart, ShieldCheck } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { useSound } from '../context/SoundContext';

export const MakeAWishPage: React.FC = () => {
  const { playChime } = useSound();
  const [authorName, setAuthorName] = useState('');
  const [wishText, setWishText] = useState('');
  const [savedWishes, setSavedWishes] = useState<{ id: string; name: string; wish: string; date: string }[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('reyansh_birthday_wishes');
    if (stored) {
      try {
        setSavedWishes(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    playChime();
    const newWish = {
      id: Date.now().toString(),
      name: authorName.trim() || 'Well-wisher',
      wish: wishText.trim(),
      date: new Date().toLocaleDateString()
    };

    const updated = [newWish, ...savedWishes];
    setSavedWishes(updated);
    localStorage.setItem('reyansh_birthday_wishes', JSON.stringify(updated));

    setAuthorName('');
    setWishText('');
  };

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 font-bold text-xs sm:text-sm mb-3">
          <MessageSquareHeart className="w-4 h-4 text-pink-600" />
          <span>Chapter 18: Leave Your Wish</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          A Wish Just for You 💖
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-6">
          Write a lovely birthday wish for Reyansh!
        </p>

        {/* Privacy reassurance note */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-medium mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Your wish is saved safely on your device (frontend local storage).</span>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl flex flex-col gap-4 text-left mb-8"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Uncle, Aunt, Friend"
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Birthday Wish
            </label>
            <textarea
              required
              rows={3}
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Happy 2nd Birthday Reyansh! Wishing you endless laughter and sweet moments..."
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-800 focus:outline-none focus:border-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-extrabold text-base rounded-2xl shadow-md shadow-pink-400/30 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 font-heading"
          >
            <Send className="w-5 h-5" />
            <span>Create Birthday Card ✨</span>
          </button>
        </form>

        {/* Saved Cards List */}
        {savedWishes.length > 0 && (
          <div className="w-full max-w-md flex flex-col gap-4">
            <h3 className="font-heading text-lg font-bold text-slate-800 text-left">
              Saved Keepsake Cards ({savedWishes.length})
            </h3>

            {savedWishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-tr from-pink-50 to-amber-50 rounded-2xl border border-pink-200 shadow-sm text-left relative"
              >
                <Heart className="w-5 h-5 text-rose-500 absolute top-4 right-4 fill-rose-500/20" />
                <p className="font-heading text-base font-bold text-slate-800 mb-1">
                  "{w.wish}"
                </p>
                <div className="text-xs text-pink-700 font-semibold flex items-center justify-between">
                  <span>— With love, {w.name}</span>
                  <span>{w.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};
