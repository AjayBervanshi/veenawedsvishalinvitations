import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { ChevronDown, Sparkles } from 'lucide-react';

interface MandirHeroStageProps {
  brideName: string;
  groomName: string;
  hostMessage: string;
  brideParents: string;
  groomParents: string;
  weddingDateDisplay: string;
}

export const MandirHeroStage: React.FC<MandirHeroStageProps> = ({
  brideName,
  groomName,
  hostMessage,
  brideParents,
  groomParents,
  weddingDateDisplay
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through this tall multi-layered stage (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // 1. Invocation (Ganesha) fades and shrinks as scroll begins
  const ganeshaOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 0.8, 0]);
  const ganeshaY = useTransform(scrollYProgress, [0, 0.4], [0, -30]);

  // 2. Couple Names: Appear with glorious scale & glow, hold, then DISAPPEAR with graceful blur/scale
  const namesOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.65], [0, 1, 1, 0]);
  const namesScale = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.65], [0.85, 1, 1, 1.12]);
  const namesY = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.65], [40, 0, 0, -40]);

  // 3. Mandir Temple: Rises up through the clouds as you scroll
  const templeY = useTransform(scrollYProgress, [0.15, 0.8], [180, 0]);
  const templeScale = useTransform(scrollYProgress, [0.15, 0.8], [0.92, 1.05]);

  // 4. Clouds: Part outwards to left & right as the temple reveals
  const cloudLeftX = useTransform(scrollYProgress, [0, 0.7], [0, -120]);
  const cloudRightX = useTransform(scrollYProgress, [0, 0.7], [0, 120]);
  const cloudOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85], [0.85, 0.9, 0.4]);

  // 5. Sun & Mountains Parallax
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const mountainY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // 6. Next message reveal (The Date & Blessing card appears after names dissolve)
  const announcementOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.95], [0, 1, 1]);
  const announcementY = useTransform(scrollYProgress, [0.6, 0.75], [50, 0]);

  const handleRingBell = () => {
    soundManager.playBellChime();
  };

  return (
    <div ref={containerRef} className="relative w-full h-[260vh] bg-[#fbf5eb]">
      
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-between select-none">
        
        {/* Layer 0: Sky Atmosphere */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-95 transition-opacity"
          style={{ backgroundImage: 'url(/assets/mandir/sky-v1.webp)' }}
        />

        {/* Layer 1: Sun with radiant aura */}
        <motion.div 
          style={{ y: sunY }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
        >
          <img 
            src="/assets/mandir/sun-v1.webp" 
            alt="Surya Deva" 
            className="w-48 md:w-80 h-auto drop-shadow-[0_0_60px_rgba(221,164,93,0.7)] animate-pulse"
            style={{ animationDuration: '5s' }}
          />
        </motion.div>

        {/* Layer 2: Distant Sacred Mountains */}
        <motion.div 
          style={{ y: mountainY }}
          className="absolute bottom-28 w-full z-10 pointer-events-none opacity-50"
        >
          <img 
            src="/assets/mandir/mountain-v1.webp" 
            alt="Mountains" 
            className="w-full object-cover max-h-56 md:max-h-72" 
          />
        </motion.div>

        {/* Layer 3: Left & Right Clouds that Part on Scroll */}
        <motion.div 
          style={{ x: cloudLeftX, opacity: cloudOpacity }}
          className="absolute top-16 -left-20 md:-left-10 w-3/4 max-w-xl z-20 pointer-events-none"
        >
          <img src="/assets/mandir/cloud-v1.webp" alt="Cloud" className="w-full h-auto object-contain" />
        </motion.div>
        
        <motion.div 
          style={{ x: cloudRightX, opacity: cloudOpacity }}
          className="absolute top-28 -right-20 md:-right-10 w-3/4 max-w-xl z-20 pointer-events-none"
        >
          <img src="/assets/mandir/cloud-v1.webp" alt="Cloud" className="w-full h-auto object-contain scale-x-[-1]" />
        </motion.div>

        {/* Layer 4: Top Bell Arch & Swinging Bells */}
        <div className="relative z-40 w-full max-w-2xl mx-auto pt-2 px-4 flex flex-col items-center">
          {/* Ornate Arch Frame */}
          <img 
            src="/assets/mandir/bell-arch-v1.webp" 
            alt="Bell Arch" 
            className="w-full max-w-lg h-auto object-contain drop-shadow-md"
          />

          {/* Left & Right Interactive Temple Bells */}
          <div className="w-full max-w-md -mt-3.5 flex justify-between px-12 md:px-16 items-start">
            <button
              type="button"
              onClick={handleRingBell}
              className="cursor-pointer group focus:outline-none"
              title="Tap to ring temple bell"
            >
              <img 
                src="/assets/mandir/bell-a-v1.png" 
                alt="Temple Bell" 
                className="w-9 md:w-12 h-auto animate-swing-left drop-shadow-lg hover:scale-115 transition-transform"
              />
            </button>

            {/* Invocatory Top Ganesha Icon */}
            <motion.div style={{ opacity: ganeshaOpacity, y: ganeshaY }} className="flex flex-col items-center">
              <img 
                src="/assets/mandir/ganpati-icon-v1.webp" 
                alt="Lord Ganesha" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow"
              />
              <span className="text-[#5f250f] text-sm md:text-base font-serif font-bold tracking-widest mt-1">
                || श्री गणेशाय नमः ||
              </span>
              <img 
                src="/assets/mandir/shri-line-v1.webp" 
                alt="" 
                className="w-40 md:w-56 h-auto opacity-75 mt-0.5"
              />
            </motion.div>

            <button
              type="button"
              onClick={handleRingBell}
              className="cursor-pointer group focus:outline-none"
              title="Tap to ring temple bell"
            >
              <img 
                src="/assets/mandir/bell-b-v1.png" 
                alt="Temple Bell" 
                className="w-9 md:w-12 h-auto animate-swing-right drop-shadow-lg hover:scale-115 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Layer 5: Dynamic Center Story Cards */}
        <div className="relative z-30 w-full max-w-xl mx-auto px-4 my-auto flex items-center justify-center">
          
          {/* Card A: Dynamic Couple Name Reveal & Dissolve */}
          <motion.div
            style={{
              opacity: namesOpacity,
              scale: namesScale,
              y: namesY
            }}
            className="absolute inset-x-4 max-w-lg mx-auto text-center px-6 py-8 rounded-3xl bg-[#ffffff]/90 border-2 border-[#dda45d] shadow-[0_15px_40px_rgba(95,37,15,0.15)] backdrop-blur-md"
          >
            <div className="flex justify-center -mt-12 mb-2">
              <img 
                src="/assets/mandir/peacock-ornament-v1.webp" 
                alt="" 
                className="w-16 h-auto drop-shadow"
              />
            </div>

            <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
              With Joy & Heartfelt Gratitude
            </p>
            <p className="text-xs text-[#5f250f]/80 font-serif leading-relaxed mb-4">
              {hostMessage}
            </p>

            {/* Glorious Couple Names */}
            <div className="my-3">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#5f250f] tracking-wide drop-shadow-sm">
                {brideName}
              </h1>
              <p className="text-xs text-[#5f250f]/70 font-serif italic my-0.5">
                Daughter of {brideParents}
              </p>

              <span className="inline-block my-2 text-2xl md:text-3xl font-serif italic text-[#dda45d] font-bold">
                weds
              </span>

              <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#5f250f] tracking-wide drop-shadow-sm">
                {groomName}
              </h1>
              <p className="text-xs text-[#5f250f]/70 font-serif italic my-0.5">
                Son of {groomParents}
              </p>
            </div>

            {/* Flag Pole with fluttering Saffron Flag */}
            <div className="absolute -top-10 -right-2 md:-right-6 flex items-start pointer-events-none">
              <img 
                src="/assets/mandir/flag-pole-v1.webp" 
                alt="" 
                className="w-3 md:w-4 h-24 object-contain"
              />
              <img 
                src="/assets/mandir/flag-cloth-v1.png" 
                alt="" 
                className="w-12 md:w-16 h-auto -ml-1 -mt-1 animate-flag"
              />
            </div>
          </motion.div>

          {/* Card B: Auspicious Date Announcement (Fades in as Names dissolve) */}
          <motion.div
            style={{
              opacity: announcementOpacity,
              y: announcementY
            }}
            className="absolute inset-x-4 max-w-md mx-auto text-center px-6 py-7 rounded-3xl bg-[#ffffff]/95 border-2 border-[#dda45d] shadow-[0_15px_40px_rgba(95,37,15,0.15)] backdrop-blur-md pointer-events-none"
          >
            <div className="inline-flex p-2 rounded-full bg-[#dda45d]/20 text-[#5f250f] mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
              Auspicious Muhurat & Wedding Date
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5f250f] mb-2">
              {weddingDateDisplay}
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold tracking-wider">
              10:30 AM Onwards • शुभ मुहूर्त
            </div>
            <p className="text-xs text-[#5f250f]/70 font-serif italic mt-3">
              Scroll down to explore the sacred rituals and celebrations
            </p>
          </motion.div>

        </div>

        {/* Layer 6: Rising Mandir Temple Spire */}
        <motion.div 
          style={{ y: templeY, scale: templeScale }}
          className="relative z-20 w-full max-w-4xl mx-auto -mb-2 pointer-events-none"
        >
          <img 
            src="/assets/mandir/temple-v1.webp" 
            alt="Sacred Mandir" 
            className="w-full h-auto object-contain drop-shadow-[0_-20px_40px_rgba(95,37,15,0.25)]"
          />
        </motion.div>

        {/* Layer 7: Interactive Scroll Down Hint */}
        <div className="relative z-40 pb-4 flex flex-col items-center text-[#5f250f] font-serif">
          <span className="text-[11px] uppercase tracking-widest font-semibold mb-1">
            Scroll to Enter Temple Grounds
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#ab5626]" />
        </div>

      </div>
    </div>
  );
};
