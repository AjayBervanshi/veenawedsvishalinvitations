import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export const AnimatedJourneyVisual: React.FC = () => {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
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
        animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#dda45d]/20 via-[#ab5626]/10 to-[#5f250f]/20 blur-md pointer-events-none"
      />

      {/* Center Medallion with Sacred Temple Couple Silhouettes & Floating Diya */}
      <div className="relative z-10 w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-b from-[#ffffff] to-[#fbf5eb] border-3 border-[#dda45d] shadow-[0_15px_35px_rgba(95,37,15,0.18)] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
        
        {/* Floating Sparkles in Background */}
        <motion.div
          animate={{ y: [-4, 4, -4], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-3 left-4 text-[#dda45d]"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
        
        <motion.div
          animate={{ y: [4, -4, 4], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-4 right-4 text-[#ab5626]"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Intertwined Sacred Varmala Symbol */}
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-2"
        >
          {/* Dual Interlocking Golden Rings / Sacred Knot */}
          <div className="flex items-center justify-center -space-x-3">
            <div className="w-10 h-10 rounded-full border-3 border-[#dda45d] shadow-sm flex items-center justify-center bg-white/50">
              <span className="text-[10px] font-serif font-bold text-[#ab5626]">V</span>
            </div>
            <div className="w-10 h-10 rounded-full border-3 border-[#ab5626] shadow-sm flex items-center justify-center bg-white/50">
              <span className="text-[10px] font-serif font-bold text-[#5f250f]">V</span>
            </div>
          </div>
        </motion.div>

        {/* Sacred Union Motto */}
        <span className="font-regal text-sm sm:text-base font-bold text-[#5f250f] tracking-wide">
          Veena & Vishal
        </span>
        
        <span className="font-script text-base text-[#dda45d] font-semibold -mt-0.5">
          Eternal Companionship
        </span>

        {/* Auspicious Diya Flame Animation */}
        <motion.div
          animate={{ scaleY: [1, 1.15, 0.95, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-1 flex items-center gap-1 text-[10px] font-serif font-bold text-[#ab5626]"
        >
          <span className="w-2 h-2 rounded-full bg-[#f39c12] shadow-[0_0_6px_#f39c12]" />
          <span>सदा सुहागन रहो</span>
        </motion.div>
      </div>

      {/* Floating Bottom Heart Medallion */}
      <motion.div 
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-2 z-20 p-2.5 rounded-full bg-[#5f250f] border-2 border-[#dda45d] text-[#dda45d] shadow-lg"
      >
        <Heart className="w-4 h-4 fill-current text-[#dda45d]" />
      </motion.div>
    </div>
  );
};
