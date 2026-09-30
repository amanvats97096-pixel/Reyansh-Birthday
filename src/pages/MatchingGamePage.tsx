import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gamepad2, RefreshCw, Trophy } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { useSound } from '../context/SoundContext';

interface CardTile {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ICONS = ['🎂', '🎈', '🎁', '🧸', '🌟', '🕯️'];

export const MatchingGamePage: React.FC = () => {
  const { playPop, playCelebration } = useSound();

  const createBoard = (): CardTile[] => {
    const pairs = [...ICONS, ...ICONS];
    // Shuffle pairs
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    return shuffled.map((icon, idx) => ({
      id: idx,
      icon,
      isFlipped: false,
      isMatched: false
    }));
  };

  const [cards, setCards] = useState<CardTile[]>(createBoard);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  const handleTileClick = (index: number) => {
    if (flippedIndices.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;

    playPop();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (newCards[first].icon === newCards[second].icon) {
        // Match found!
        setTimeout(() => {
          playCelebration();
          setCards((prev) => {
            const updated = [...prev];
            updated[first].isMatched = true;
            updated[second].isMatched = true;
            // Check win
            if (updated.every((c) => c.isMatched)) {
              setIsWon(true);
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
            return updated;
          });
          setFlippedIndices([]);
        }, 400);
      } else {
        // No match -> unflip
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[first].isFlipped = false;
            updated[second].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleRestart = () => {
    playPop();
    setCards(createBoard());
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <PageLayout disableSwipe>
      <div className="flex flex-col items-center text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 font-bold text-xs sm:text-sm mb-3">
          <Gamepad2 className="w-4 h-4 text-purple-600" />
          <span>Chapter 16: Memory Card Game</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-2">
          Birthday Matching Game 🎮
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-4">
          Match all 6 pairs of birthday icons! (Moves: {moves})
        </p>

        <button
          onClick={handleRestart}
          className="mb-6 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow cursor-pointer transition-transform active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restart Game</span>
        </button>

        {/* 4x3 Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md w-full mb-6">
          {cards.map((card, idx) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTileClick(idx)}
              aria-label={`Card ${idx + 1}`}
              className={`h-24 sm:h-28 rounded-2xl font-extrabold text-3xl sm:text-4xl shadow-md border-2 flex items-center justify-center cursor-pointer transition-all ${
                card.isFlipped || card.isMatched
                  ? 'bg-amber-100 border-amber-400 text-slate-900 rotate-0'
                  : 'bg-gradient-to-tr from-purple-400 to-pink-400 border-white text-transparent'
              }`}
            >
              {card.isFlipped || card.isMatched ? card.icon : '❓'}
            </motion.button>
          ))}
        </div>

        {/* Victory Modal */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-gradient-to-r from-amber-400 via-rose-400 to-pink-400 text-white rounded-3xl shadow-2xl max-w-md text-center"
            >
              <Trophy className="w-12 h-12 mx-auto mb-2 text-yellow-200 animate-bounce" />
              <h3 className="text-2xl font-extrabold font-heading mb-1">
                YOU MATCHED THEM ALL! 🎉
              </h3>
              <p className="font-semibold text-sm mb-4">
                Completed in only {moves} moves! Great job celebrating Reyansh!
              </p>
              <button
                onClick={handleRestart}
                className="py-2.5 px-6 bg-white text-slate-900 font-extrabold rounded-2xl shadow hover:bg-amber-50 cursor-pointer font-heading"
              >
                Play Again 🔄
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
};
