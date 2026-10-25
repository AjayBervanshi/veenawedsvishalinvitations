import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';

interface OpeningCurtainProps {
  isOpen: boolean;
  onOpen: () => void;
  brideName: string;
  groomName: string;
  weddingDateDisplay: string;
}

export const OpeningCurtain: React.FC<OpeningCurtainProps> = ({
  isOpen,
  onOpen,
  brideName,
  groomName,
  weddingDateDisplay
}) => {
  const handleOpenClick = () => {
    soundManager.startBackgroundMusic();
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a0c04] overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #421406 0%, #200702 100%)'
          }}
        >
          {/* Subtle Decorative Floating Cloud */}
          <div className="absolute top-10 w-full opacity-20 pointer-events-none animate-clouds">
            <img 
              src="/assets/mandir/cloud-v1.webp" 
              alt="" 
              className="w-full max-w-2xl mx-auto object-cover" 
            />
          </div>

          {/* Golden Arch & Card Frame */}
          <div className="relative max-w-md w-11/12 mx-auto text-center px-6 py-10 rounded-2xl border border-[#dda45d]/40 shadow-2xl bg-[#361105]/80 backdrop-blur-md">
            
            {/* Top Ganesha Line */}
            <div className="flex flex-col items-center justify-center mb-5">
              <img 
                src="/assets/mandir/ganpati-icon-v1.webp" 
                alt="Lord Ganesha" 
                className="w-16 h-16 drop-shadow-md mb-2 object-contain"
              />
              <span className="text-[#dda45d] text-sm tracking-widest font-serif">
                || श्री गणेशाय नमः ||
              </span>
              <img 
                src="/assets/mandir/shri-line-v1.webp" 
                alt="" 
                className="w-48 h-auto opacity-70 mt-1"
              />
            </div>

            {/* Couple Announcement */}
            <p className="text-xs uppercase tracking-[0.25em] text-[#f7e8d4]/70 mb-2 font-serif">
              The Wedding Celebration of
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#dda45d] font-bold tracking-wide drop-shadow-lg mb-1">
              {brideName}
            </h1>
            <span className="text-2xl font-serif italic text-[#f7e8d4]/80 block my-1">
              weds
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#dda45d] font-bold tracking-wide drop-shadow-lg mb-4">
              {groomName}
            </h1>

            {/* Date */}
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#dda45d]/30 bg-[#200702]/60 text-xs tracking-wider text-[#f7e8d4] font-serif mb-8">
              {weddingDateDisplay}
            </div>

            {/* Tap to Open Button with Bell Ring */}
            <div>
              <button
                type="button"
                onClick={handleOpenClick}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b87c33] via-[#dda45d] to-[#b87c33] text-[#2b0e06] font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <img 
                  src="/assets/mandir/bell-a-v1.png" 
                  alt="bell" 
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" 
                />
                <span>Tap to Open Invitation</span>
              </button>
              <p className="text-[11px] text-[#f7e8d4]/50 mt-3 font-serif italic">
                (Tap to ring temple bells & enter)
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
