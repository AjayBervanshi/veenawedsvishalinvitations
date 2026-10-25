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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#fbf5eb] overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #fbf5eb 100%)'
          }}
        >
          {/* Subtle Decorative Floating Cloud */}
          <div className="absolute top-10 w-full opacity-40 pointer-events-none animate-clouds">
            <img 
              src="/assets/mandir/cloud-v1.webp" 
              alt="" 
              className="w-full max-w-xl mx-auto object-cover" 
            />
          </div>

          {/* Golden Arch & Card Frame */}
          <div className="relative max-w-md w-11/12 mx-auto text-center px-6 py-9 rounded-3xl border-2 border-[#dda45d] shadow-[0_20px_50px_rgba(95,37,15,0.12)] bg-[#ffffff]/95 backdrop-blur-md">
            
            {/* Top Ganesha Line */}
            <div className="flex flex-col items-center justify-center mb-4">
              <img 
                src="/assets/mandir/ganpati-icon-v1.webp" 
                alt="Lord Ganesha" 
                className="w-14 h-14 drop-shadow-sm mb-1.5 object-contain"
              />
              <span className="text-[#5f250f] text-sm tracking-widest font-serif font-bold">
                || श्री गणेशाय नमः ||
              </span>
              <img 
                src="/assets/mandir/shri-line-v1.webp" 
                alt="" 
                className="w-44 h-auto opacity-75 mt-1"
              />
            </div>

            {/* Couple Announcement */}
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#ab5626] mb-1 font-serif font-bold">
              The Wedding Celebration of
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#5f250f] font-bold tracking-wide mb-0.5">
              {brideName}
            </h1>
            <span className="text-2xl font-serif italic text-[#dda45d] font-bold block my-0.5">
              weds
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#5f250f] font-bold tracking-wide mb-3">
              {groomName}
            </h1>

            {/* Date */}
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#dda45d] bg-[#fbf5eb] text-xs tracking-wider text-[#5f250f] font-serif font-semibold mb-6">
              {weddingDateDisplay}
            </div>

            {/* Tap to Open Button with Bell Ring */}
            <div>
              <button
                type="button"
                onClick={handleOpenClick}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#5f250f] text-[#dda45d] font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <img 
                  src="/assets/mandir/bell-a-v1.png" 
                  alt="bell" 
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" 
                />
                <span>Tap to Open Invitation</span>
              </button>
              <p className="text-[11px] text-[#5f250f]/60 mt-2.5 font-serif italic">
                (Tap to ring temple bells & enter)
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
