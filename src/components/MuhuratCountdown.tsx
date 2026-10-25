import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MuhuratCountdownProps {
  targetDateISO: string;
  muhuratDisplay: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const MuhuratCountdown: React.FC<MuhuratCountdownProps> = ({
  targetDateISO,
  muhuratDisplay
}) => {
  const calculateTimeLeft = (): TimeRemaining => {
    const difference = +new Date(targetDateISO) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateISO]);

  return (
    <section className="relative w-full py-16 px-4 bg-[#230a04] overflow-hidden text-center">
      {/* Background Ornament Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-center bg-cover"
        style={{ backgroundImage: 'url(/assets/mandir/countdown-backdrop-v1.webp)' }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Section Header */}
        <p className="text-xs uppercase tracking-[0.25em] text-[#dda45d] font-serif mb-1">
          Until The Auspicious Moment
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#f7e8d4] font-bold tracking-wide mb-3">
          The Countdown Begins
        </h2>
        <p className="text-xs text-[#dda45d] font-serif italic mb-6">
          {muhuratDisplay}
        </p>

        {/* Countdown Dividers */}
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/mandir/countdown-divider-v1.webp" 
            alt="" 
            className="w-48 h-auto opacity-70"
          />
        </div>

        {/* Countdown Ticker Boxes */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-3 md:p-4 rounded-2xl bg-[#341005]/80 border border-[#dda45d]/40 shadow-xl backdrop-blur-sm"
            >
              <span className="block text-2xl md:text-4xl font-serif font-bold text-[#dda45d]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs tracking-widest text-[#f7e8d4]/70 font-serif uppercase">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
