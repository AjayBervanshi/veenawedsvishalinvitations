import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface OpeningCurtainProps {
  isOpen: boolean;
  onOpen: () => void;
  brideName: string;
  groomName: string;
  weddingDateDisplay: string;
}

type EnvelopePhase = 'sealed' | 'unsealing' | 'letter_emerging' | 'completed';

export const OpeningCurtain: React.FC<OpeningCurtainProps> = ({
  isOpen,
  onOpen,
  brideName,
  groomName,
  weddingDateDisplay
}) => {
  const [phase, setPhase] = useState<EnvelopePhase>('sealed');

  const handleBreakSeal = () => {
    if (phase !== 'sealed') return;

    // Phase 1: Break seal & play auspicious bell chime
    setPhase('unsealing');
    soundManager.playBellChime();

    // Trigger royal lavender, periwinkle & gold confetti burst
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#dcd0ff', '#E6E6FA', '#ccccff', '#dda45d', '#f39c12', '#ffffff']
    });

    // Phase 2: After flap opens, slide the royal letter out
    setTimeout(() => {
      setPhase('letter_emerging');
      soundManager.startBackgroundMusic();

      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.45 },
        colors: ['#dcd0ff', '#ccccff', '#dda45d', '#ffd700', '#ffffff']
      });

      // Seamlessly transition into the invitation website after card reveals
      setTimeout(() => {
        handleEnterWebsite();
      }, 1400);
    }, 850);
  };

  const handleEnterWebsite = () => {
    if (phase === 'completed') return;
    setPhase('completed');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Final celebratory floral confetti burst
    confetti({
      particleCount: 110,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#dcd0ff', '#E6E6FA', '#ccccff', '#dda45d', '#f39c12', '#ffffff']
    });

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      onOpen();
    }, 500);
  };

  const handleSkipIntro = () => {
    soundManager.startBackgroundMusic();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    onOpen();
  };

  const isFlapOpen = phase === 'unsealing' || phase === 'letter_emerging' || phase === 'completed';
  const isCardEmerged = phase === 'letter_emerging' || phase === 'completed';

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#0f0717] via-[#1a0e28] to-[#12081c] flex items-center justify-center p-4 selection:bg-[#dcd0ff]/40"
        >
          {/* Subtle Ambient Sacred Background Glow with Lavender and Gold */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div
              className="w-[85vw] max-w-[700px] h-[70vh] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#dcd0ff]/20 via-[#4a245a]/15 to-transparent blur-3xl animate-pulse"
              style={{ animationDuration: '6s' }}
            />
          </div>

          {/* Top Skip / Direct Access Button */}
          <div className="absolute top-5 right-5 z-50">
            <button
              type="button"
              onClick={handleSkipIntro}
              className="px-4 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-[#dcd0ff]/40 text-[#fbf5eb] text-xs font-digits tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 cursor-pointer shadow-lg hover:border-[#dda45d]"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dda45d]" />
            </button>
          </div>

          {/* ============================================================== */}
          {/* 3D ROYAL ENVELOPE STAGE (PERSPECTIVE WRAPPER)                  */}
          {/* ============================================================== */}
          <div className="relative w-full max-w-[500px] sm:max-w-[520px] h-[330px] sm:h-[350px] perspective-1200 flex items-center justify-center">

            {/* Gentle Floating Motion & Seamless Stage Balancing */}
            <motion.div
              animate={isCardEmerged ? { y: 75 } : { y: [0, -6, 0] }}
              transition={
                isCardEmerged
                  ? { duration: 0.95, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
              }
              className="relative w-full h-full preserve-3d flex items-center justify-center"
            >

              {/* ENVELOPE SHADOW ON GROUND */}
              <div className="absolute -bottom-10 w-[90%] h-14 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-black/80 via-black/40 to-transparent rounded-full blur-xl pointer-events-none" />

              {/* ========================================================== */}
              {/* 1. ENVELOPE BACK WALL (Interior Silk & Gold Lining)        */}
              {/* ========================================================== */}
              <div className="absolute inset-0 rounded-2xl envelope-silk-sheen border-2 border-[#dda45d]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden z-[1]" />

              {/* ========================================================== */}
              {/* 2. THE ROYAL WEDDING CARD (SLIDES OUT CENTERED IN DEVICE)  */}
              {/* ========================================================== */}
              <motion.div
                initial={{ y: 20, scale: 0.9, opacity: 0 }}
                animate={
                  isCardEmerged
                    ? { y: -75, scale: 1.02, opacity: 1, z: 60 }
                    : { y: 20, scale: 0.9, opacity: 0, z: 2 }
                }
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleEnterWebsite}
                className={`absolute inset-x-3 sm:inset-x-4 top-3 bottom-3 rounded-xl bg-gradient-to-b from-[#ffffff] via-[#fcfbfe] to-[#f4effc] border-2 border-[#dda45d] shadow-[0_22px_55px_rgba(0,0,0,0.7)] p-4 sm:p-5 flex flex-col justify-between text-center cursor-pointer ${isCardEmerged ? 'z-40 pointer-events-auto' : 'z-[2] pointer-events-none'
                  }`}
              >
                {/* Card Periwinkle & Gold Trim Border */}
                <div className="absolute inset-1.5 border border-[#dcd0ff]/70 rounded-lg pointer-events-none" />

                {/* Top Auspicious Ganesha Emblem */}
                <div className="flex flex-col items-center">
                  <img
                    src="/assets/mandir/ganpati-icon-v1.webp"
                    alt="Lord Ganesha"
                    className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md mb-0.5"
                  />
                  <p className="font-shloka text-xs sm:text-sm font-bold text-[#ab5626] tracking-widest">
                    ॥ श्री गणेशाय नमः ॥
                  </p>
                  <p className="text-[10px] font-digits text-[#57356c] uppercase tracking-[0.2em]">
                    Shubh Vivah Nimantran
                  </p>
                </div>

                {/* Couple Names in High-Fashion Display Typography */}
                <div className="my-1">
                  <h3 className="font-regal font-black text-2xl sm:text-3xl bg-gradient-to-r from-[#3b2046] via-[#6d407e] to-[#ab6524] bg-clip-text text-transparent">
                    {brideName}
                  </h3>
                  <div className="flex items-center justify-center gap-2 my-0.5">
                    <span className="w-8 h-px bg-[#dda45d]" />
                    <span className="font-script text-2xl sm:text-3xl text-[#dda45d] font-bold px-1">weds</span>
                    <span className="w-8 h-px bg-[#dda45d]" />
                  </div>
                  <h3 className="font-regal font-black text-2xl sm:text-3xl bg-gradient-to-r from-[#3b2046] via-[#6d407e] to-[#ab6524] bg-clip-text text-transparent">
                    {groomName}
                  </h3>
                </div>

                {/* Date & Venue with Lavender/Periwinkle Tag */}
                <div className="space-y-0.5">
                  <p className="font-digits text-xs font-bold text-[#ab5626]">
                    {weddingDateDisplay}
                  </p>
                  <p className="font-body text-[11px] text-[#4b2f5b]/85">
                    {weddingData.venueName} • {weddingData.venueAddress}
                  </p>
                </div>

                {/* Sacred Union Blessing */}
                <div className="pt-2 pb-1">
                  <p className="font-shloka text-xs sm:text-sm text-[#ab5626] font-bold tracking-wider">
                    ॥ मङ्गलम् भगवान विष्णुः • मङ्गलम् गरुडध्वजः ॥
                  </p>
                  <p className="text-[10px] font-digits text-[#7d4889] uppercase tracking-[0.2em] mt-1">
                    ✨ Tap anywhere to enter ✨
                  </p>
                </div>
              </motion.div>

              {/* ========================================================== */}
              {/* 3. ENVELOPE FRONT POCKET (MATHEMATICALLY EXACT SVG FOLDS)   */}
              {/* ========================================================== */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden z-[15] pointer-events-none">
                <svg
                  viewBox="0 0 520 350"
                  preserveAspectRatio="none"
                  className="w-full h-full drop-shadow-lg"
                >
                  <defs>
                    {/* Royal Silk Gradients for Folds */}
                    <linearGradient id="leftFoldGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1e0f2b" />
                      <stop offset="60%" stopColor="#2c163d" />
                      <stop offset="100%" stopColor="#231031" />
                    </linearGradient>
                    <linearGradient id="rightFoldGrad" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e0f2b" />
                      <stop offset="60%" stopColor="#2c163d" />
                      <stop offset="100%" stopColor="#231031" />
                    </linearGradient>
                    <linearGradient id="bottomFoldGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                      <stop offset="0%" stopColor="#351a4a" />
                      <stop offset="40%" stopColor="#2a143b" />
                      <stop offset="100%" stopColor="#1d0d2a" />
                    </linearGradient>
                    <linearGradient id="goldTrimGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#dda45d" />
                      <stop offset="50%" stopColor="#fff2be" />
                      <stop offset="100%" stopColor="#dda45d" />
                    </linearGradient>
                  </defs>

                  {/* Left Side Fold */}
                  <path
                    d="M 0 0 L 260 185 L 0 350 Z"
                    fill="url(#leftFoldGrad)"
                    stroke="#dda45d"
                    strokeWidth="0.75"
                    strokeOpacity="0.5"
                  />

                  {/* Right Side Fold */}
                  <path
                    d="M 520 0 L 260 185 L 520 350 Z"
                    fill="url(#rightFoldGrad)"
                    stroke="#dda45d"
                    strokeWidth="0.75"
                    strokeOpacity="0.5"
                  />

                  {/* Bottom Fold Rising Up */}
                  <path
                    d="M 0 350 L 260 170 L 520 350 Z"
                    fill="url(#bottomFoldGrad)"
                    stroke="url(#goldTrimGrad)"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Bottom Fold Front Typography (Only shown when envelope closed) */}
                {!isCardEmerged && (
                  <div className="absolute inset-x-0 bottom-5 text-center px-4 z-20">
                    <p className="font-shloka text-xs sm:text-sm text-[#f9dfa5] font-bold tracking-widest drop-shadow">
                      ॥ शुभ विवाह निमंत्रण ॥
                    </p>
                    <p className="font-display text-sm sm:text-base text-[#fbf5eb] font-bold tracking-wide mt-0.5">
                      {brideName} & {groomName}
                    </p>
                    <p className="font-digits text-[10px] text-[#dcd0ff] uppercase tracking-[0.25em] mt-0.5">
                      Ballia, Uttar Pradesh
                    </p>
                  </div>
                )}
              </div>

              {/* ========================================================== */}
              {/* 4. 3D TOP TRIANGULAR FLAP (FLIPS OPEN UPWARDS 180 DEG)     */}
              {/* ========================================================== */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isFlapOpen ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute inset-x-0 top-0 h-full ${isFlapOpen ? 'z-[5] pointer-events-none' : 'z-[25] pointer-events-auto cursor-pointer'
                  }`}
                onClick={handleBreakSeal}
              >
                {/* FLAP FRONT FACE (When Closed) - Symmetrical Triangular Flap */}
                <div className="absolute inset-0 rounded-t-2xl backface-hidden overflow-hidden">
                  <svg
                    viewBox="0 0 520 350"
                    preserveAspectRatio="none"
                    className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
                  >
                    <defs>
                      <linearGradient id="topFlapGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%" stopColor="#3d1e54" />
                        <stop offset="60%" stopColor="#2c153d" />
                        <stop offset="100%" stopColor="#1f0e2b" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 0 L 520 0 L 260 195 Z"
                      fill="url(#topFlapGrad)"
                      stroke="#dda45d"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Sacred Header on Flap */}
                  <div className="absolute top-4 inset-x-0 text-center">
                    <span className="font-shloka text-xs text-[#f9dfa5] font-bold tracking-widest drop-shadow-sm">
                      ॥ ॐ श्री ॥
                    </span>
                  </div>
                </div>

                {/* FLAP BACK FACE (When Flap is Rotated -180deg Open) */}
                <div
                  className="absolute inset-0 rounded-t-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    transform: 'rotateX(180deg)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <svg
                    viewBox="0 0 520 350"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    <path
                      d="M 0 0 L 520 0 L 260 195 Z"
                      fill="#261238"
                      stroke="#dda45d"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* ======================================================== */}
              {/* 5. EMBOSSED GOLDEN GANESHA WAX SEAL IN EXACT DEAD CENTER  */}
              {/* ======================================================== */}
              {!isFlapOpen && (
                <div className="absolute left-1/2 top-[55.7%] -translate-x-1/2 -translate-y-1/2 z-[35] flex flex-col items-center select-none pointer-events-auto">
                  <motion.button
                    id="wax-seal-btn"
                    type="button"
                    aria-label="Tap seal to open invitation"
                    onClick={handleBreakSeal}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center cursor-pointer group focus:outline-none bg-transparent border-0 p-0"
                  >
                    {/* Concentric Metallic Gold Wax Seal with Focused Symmetrical Halo Glow */}
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#dda45d]/60 via-[#ffd700]/50 to-[#dda45d]/60 blur-md pointer-events-none group-hover:opacity-100 opacity-80 transition-opacity" />

                      <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-[#ffd700] via-[#dda45d] to-[#804e10] p-1 shadow-[0_8px_25px_rgba(0,0,0,0.85),_0_0_20px_rgba(221,164,93,0.6)] border-2 border-[#fff3b0] flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#804e10] via-[#dda45d] to-[#ffd700] p-1.5 flex items-center justify-center shadow-inner">
                          <img
                            src="/assets/mandir/ganpati-icon-v1.webp"
                            alt="Sacred Wax Seal"
                            className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] filter brightness-110"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Symmetrical Centered Label Underneath */}
                    <div className="mt-2.5 px-4 py-1 rounded-full bg-[#1e0f2b]/95 border border-[#dda45d] shadow-[0_4px_15px_rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center gap-1.5 whitespace-nowrap">
                      <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-spin" style={{ animationDuration: '6s' }} />
                      <span className="text-[10px] font-digits uppercase tracking-wider text-[#f9dfa5] font-bold">
                        Tap Seal to Open
                      </span>
                    </div>
                  </motion.button>
                </div>
              )}

            </motion.div>

          </div>

          {/* Bottom Hint */}
          <div className="absolute bottom-5 inset-x-0 text-center pointer-events-none">
            <p className="font-body text-xs text-[#dcd0ff]/80 tracking-wider">
              {phase === 'sealed' ? '✨ Amazing Vivah Patrika • Click to Open' : '🌸 Shubh Vivah Nimantran'}
            </p>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
