import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sound';

export const AnimatedJourneyVisual: React.FC = () => {
  const [isShowering, setIsShowering] = useState(false);

  const handleMedallionClick = (e?: React.SyntheticEvent<HTMLElement>) => {
    // Play auspicious temple bell chime
    soundManager.playBellChime();

    setIsShowering(true);
    setTimeout(() => setIsShowering(false), 1200);

    // Compute coordinate origin if mouse event, fallback to center
    let x = 0.5;
    let y = 0.5;
    if (e && 'currentTarget' in e && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = (rect.left + rect.width / 2) / window.innerWidth;
      y = (rect.top + rect.height / 2) / window.innerHeight;
    }

    // Sacred Floral Petal Shower: Marigold gold, orange, auspicious rose red & lotus pink
    confetti({
      particleCount: 50,
      spread: 85,
      origin: { x, y },
      colors: ['#e74c3c', '#ff6b81', '#f39c12', '#e67e22', '#ffd700', '#ffffff'],
      shapes: ['circle'],
      scalar: 1.25,
      ticks: 180,
    });

    // Secondary soft floral sparkle drift
    setTimeout(() => {
      confetti({
        particleCount: 35,
        spread: 65,
        origin: { x, y: Math.max(0.1, y - 0.05) },
        colors: ['#dda45d', '#ffd700', '#ff9ff3', '#feca57'],
        scalar: 0.95,
        ticks: 150,
      });
    }, 140);
  };

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex flex-col items-center justify-center">
      {/* Outer Rotating Sacred Mandala Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-[#dda45d]/40 pointer-events-none"
      />

      {/* Counter-Rotating Filigree Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-3 rounded-full border border-[#dda45d]/60 pointer-events-none"
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-[#dda45d] shadow-[0_0_8px_#dda45d]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translate(110px, -50%)`
            }}
          />
        ))}
      </motion.div>

      {/* Pulsing Sacred Golden Aura */}
      <motion.div
        animate={
          isShowering
            ? { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }
            : { scale: [0.98, 1.04, 0.98], opacity: [0.6, 0.9, 0.6] }
        }
        transition={isShowering ? { duration: 0.6 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#dda45d]/30 via-[#ab5626]/20 to-[#5f250f]/30 blur-md pointer-events-none"
      />

      {/* Center Medallion with Couple Portrait Photo */}
      {/* Interactive: Tap to shower auspicious flower petals and ring temple bell */}
      <motion.div
        role="button"
        tabIndex={0}
        title="Tap to shower flower petals & sacred blessings 🌸"
        aria-label="Tap to shower flowers & sacred blessings — सदा सुहागन रहो"
        onClick={handleMedallionClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMedallionClick(e);
          }
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 w-44 h-44 sm:w-48 sm:h-48 rounded-full border-3 border-[#dda45d] shadow-[0_15px_35px_rgba(95,37,15,0.22)] overflow-hidden cursor-pointer group select-none transition-shadow hover:shadow-[0_20px_45px_rgba(221,164,93,0.5)] bg-[#fcf9f4]"
      >
        <img
          src="/assets/mandir/couple-portrait.jpg"
          alt="Veena & Vishal — सदा सुहागन रहो"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="eager"
        />

        {/* Elegant subtle royal inner gold border */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#dda45d]/60 pointer-events-none" />
      </motion.div>

      {/* Floating Bottom Heart Medallion with Flower Shower Cue */}
      <motion.button 
        type="button"
        onClick={handleMedallionClick}
        aria-label="Shower flowers & sacred blessings"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -bottom-2 z-20 p-2.5 rounded-full bg-[#5f250f] border-2 border-[#dda45d] text-[#dda45d] shadow-lg cursor-pointer hover:bg-[#dda45d] hover:text-[#5f250f] transition-colors"
      >
        <Heart className="w-4 h-4 fill-current text-inherit" />
      </motion.button>

      {/* Gentle helper hint under medallion */}
      <div className="absolute -bottom-7 z-20 pointer-events-none">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#dda45d]/40 text-[9px] font-body text-[#ab5626] font-semibold shadow-xs">
          🌸 Tap for flower shower
        </span>
      </div>
    </div>
  );
};
