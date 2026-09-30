import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift, Sparkles } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { getPhoto } from '../utils/photos';

export const CountdownPage: React.FC = () => {
  const photo = getPhoto(1);

  // Target: 4 October 2026 00:00:00 IST (UTC +5:30)
  const targetDate = new Date('2026-10-04T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // Check if it is the birthday day itself (Oct 4 2026 in IST)
      const nowIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const isOct4 = nowIST.getMonth() === 9 && nowIST.getDate() === 4 && nowIST.getFullYear() === 2026;

      if (isOct4) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false });
      } else if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPast: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isToday: false, isPast: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-900 font-bold text-xs sm:text-sm mb-4">
          <Clock className="w-4 h-4 text-sky-600" />
          <span>Asia/Kolkata (IST) Midnight Target</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-800 mb-3">
          Birthday Countdown
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-8">
          Counting every precious second until 4 October 2026!
        </p>

        {/* Dynamic Countdown Content */}
        {timeLeft.isToday ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 bg-gradient-to-tr from-amber-400 via-rose-400 to-pink-400 rounded-3xl shadow-2xl text-white max-w-lg mb-8"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-3 animate-spin" />
            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading mb-2">
              TODAY IS YOUR BIG DAY! 🎈
            </h3>
            <p className="text-lg font-medium opacity-90">
              Happy 2nd Birthday, Reyansh Sharma! Today the world celebrates YOU!
            </p>
          </motion.div>
        ) : timeLeft.isPast ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 bg-gradient-to-r from-amber-100 via-sky-100 to-pink-100 border border-amber-300 rounded-3xl shadow-xl max-w-lg mb-8"
          >
            <Gift className="w-12 h-12 text-amber-600 mx-auto mb-3" />
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800 mb-2">
              The Celebration Continues! ✨
            </h3>
            <p className="text-slate-600 font-medium">
              Reyansh turned 2 on 4 October 2026. Every single day with Reyansh is a gift full of wonder and joy!
            </p>
          </motion.div>
        ) : (
          /* Live Countdown Cards */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl w-full mb-10">
            {[
              { label: 'DAYS', value: timeLeft.days, color: 'bg-amber-400/20 border-amber-400 text-amber-800' },
              { label: 'HOURS', value: timeLeft.hours, color: 'bg-sky-400/20 border-sky-400 text-sky-800' },
              { label: 'MINUTES', value: timeLeft.minutes, color: 'bg-pink-400/20 border-pink-400 text-pink-800' },
              { label: 'SECONDS', value: timeLeft.seconds, color: 'bg-emerald-400/20 border-emerald-400 text-emerald-800' }
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                className={`p-4 sm:p-6 rounded-3xl border-2 flex flex-col items-center justify-center shadow-sm ${item.color}`}
              >
                <span className="text-3xl sm:text-5xl font-extrabold font-heading mb-1">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold tracking-wider opacity-80">{item.label}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Photo Display */}
        <div className="photo-frame max-w-xs sm:max-w-sm mx-auto">
          <div className="scrapbook-tape" />
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            style={{ objectPosition: photo.objectPosition }}
            className="w-full h-64 sm:h-80 object-contain rounded-xl bg-sky-50/80 p-1"
          />
          <div className="mt-3 text-center">
            <p className="font-heading text-slate-800 font-bold text-base sm:text-lg">
              4 October 2026
            </p>
            <p className="text-xs text-slate-500 font-medium">{photo.caption}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
