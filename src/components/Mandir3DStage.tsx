import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const Mandir3DStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track continuous scroll progress within this auto-adjustable container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Buttery-smooth spring physics for fluid scrub on all screen resolutions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  // =========================================================================
  // SCROLL SEQUENCE TRANSFORMATIONS (Sequential 4-Step Reveal)
  // =========================================================================

  // STEP 1: MANDIR - Appears first in horizontal & vertical center of viewport
  const mandirOpacity = useTransform(smoothProgress, [0.00, 0.22], [0, 1]);
  const mandirScale = useTransform(smoothProgress, [0.00, 0.24], [0.88, 1]);
  const mandirY = useTransform(smoothProgress, [0.00, 0.24], [-25, 0]);

  // STEP 2: GARDEN - Appears next, locked seamlessly to mandir base
  const gardenOpacity = useTransform(smoothProgress, [0.20, 0.44], [0, 1]);
  const gardenScale = useTransform(smoothProgress, [0.20, 0.46], [0.96, 1]);

  // STEP 3: CLOUDS - Shrunk scale, slide in subtly from left and right side edges
  const cloudLeftOpacity = useTransform(smoothProgress, [0.40, 0.62], [0, 0.9]);
  const cloudLeftX = useTransform(smoothProgress, [0.40, 0.64], [-85, 0]);
  const cloudRightOpacity = useTransform(smoothProgress, [0.42, 0.64], [0, 0.9]);
  const cloudRightX = useTransform(smoothProgress, [0.42, 0.66], [85, 0]);

  // STEP 4: COUPLE - Appears in middle of garden footpath & walks toward temple doors
  const coupleOpacity = useTransform(smoothProgress, [0.60, 0.78], [0, 1]);
  const coupleScale = useTransform(smoothProgress, [0.60, 0.82], [0.84, 1]);
  // Stepping forward naturally along the marble walkway toward temple steps
  const coupleWalkY = useTransform(smoothProgress, [0.62, 0.88], [30, -14]);

  // Auspicious Union Badge
  const badgeOpacity = useTransform(smoothProgress, [0.70, 0.88], [0, 1]);
  const badgeY = useTransform(smoothProgress, [0.70, 0.88], [15, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[180vh] sm:h-[200vh] bg-gradient-to-b from-[#fbf5eb] via-[#fcf8f0] to-[#fbf5eb]"
    >
      {/* Sticky Fullscreen Viewport Window (auto-adjusts to any resolution) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between py-[2.5vh] sm:py-[3.5vh] px-[3vw] overflow-hidden">
        
        {/* Soft Golden Ambient Radial Glow behind the Temple */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <div className="w-[85vw] max-w-[850px] h-[55vh] rounded-full bg-radial from-[#dda45d]/22 via-[#dda45d]/6 to-transparent blur-3xl" />
        </div>

        {/* ============================================================== */}
        {/* HEADER: Warm, Soothing "Shubh Vivah" with Proper Devanagari    */}
        {/* ============================================================== */}
        <div className="relative z-30 text-center max-w-[90vw] sm:max-w-2xl mx-auto pt-[1vh] shrink-0">
          
          {/* Authentic Sanskrit Invocation (No uppercase, natural ligature shaping) */}
          <p className="font-shloka text-sm sm:text-base md:text-xl font-bold text-[#ab5626] mb-1.5 leading-normal drop-shadow-sm">
            ॥ मङ्गलम् भगवान विष्णुः • मङ्गलम् गरुडध्वजः ॥
          </p>
          
          {/* Warm, Soothing Shubh Vivah Title */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#5f250f] tracking-wide my-1">
            Shubh Vivah
          </h2>

          {/* Warm, Welcoming Subtitle */}
          <p className="font-body text-xs sm:text-sm md:text-base text-[#5f250f]/85 max-w-[85vw] sm:max-w-lg mx-auto mt-1.5 leading-relaxed">
            Where two souls unite in the sacred presence of the divine and the warm blessings of loved ones
          </p>
        </div>

        {/* ============================================================== */}
        {/* CENTER VIEWPORT STAGE: AUTO-ADJUSTABLE LAYERED SCROLL SCENE    */}
        {/* Sized with percentages to automatically adapt to any screen    */}
        {/* ============================================================== */}
        <div className="relative z-20 w-[92vw] max-w-[860px] mx-auto flex-1 flex flex-col items-center justify-center my-auto">
          
          <div className="relative w-full flex flex-col items-center">

            {/* LAYER 3: CELESTIAL CLOUDS (Shrunk scale, organic feathered edges, sliding from sides) */}
            <motion.div
              style={{ x: cloudLeftX, opacity: cloudLeftOpacity }}
              className="absolute top-[2%] sm:top-[6%] -left-[3%] sm:left-[1%] w-[32%] sm:w-[28%] max-w-[250px] pointer-events-none z-10"
            >
              <img 
                src="/assets/mandir/cloud_left.png" 
                alt="Celestial Clouds" 
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(221,164,93,0.35)]" 
              />
            </motion.div>

            <motion.div
              style={{ x: cloudRightX, opacity: cloudRightOpacity }}
              className="absolute top-[4%] sm:top-[8%] -right-[3%] sm:right-[1%] w-[32%] sm:w-[28%] max-w-[250px] pointer-events-none z-10"
            >
              <img 
                src="/assets/mandir/cloud_right.png" 
                alt="Celestial Clouds" 
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_16px_rgba(221,164,93,0.35)]" 
              />
            </motion.div>

            {/* LAYER 1: THE SACRED MANDIR (Centered horizontally & vertically in viewport) */}
            <motion.div
              style={{ 
                opacity: mandirOpacity, 
                scale: mandirScale, 
                y: mandirY 
              }}
              className="relative w-[88%] sm:w-[86%] max-w-[720px] z-10 flex justify-center pointer-events-none"
            >
              <img 
                src="/assets/mandir/mandir.png" 
                alt="The Sacred Ram Mandir" 
                className="w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(95,37,15,0.12)]" 
              />
            </motion.div>

            {/* LAYER 2: GARDEN PROMENADE */}
            {/* Top edge aligns seamlessly with the base of the mandir stairs */}
            <motion.div
              style={{ 
                opacity: gardenOpacity, 
                scale: gardenScale 
              }}
              className="relative w-[98%] sm:w-[96%] max-w-[800px] -mt-[5.8%] sm:-mt-[6.2%] md:-mt-[6.6%] z-20 flex justify-center pointer-events-none"
            >
              {/* Garden Promenade & Grand Staircase Base */}
              <img 
                src="/assets/mandir/garden.png" 
                alt="Sacred Garden Promenade and Courtyard Stairs" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(95,37,15,0.14)]" 
              />

              {/* LAYER 4: COUPLE ON GARDEN FOOTPATH */}
              {/* Positioned precisely in the center of the walkway, naturally walking towards the mandir doors */}
              <motion.div
                style={{ 
                  opacity: coupleOpacity, 
                  scale: coupleScale, 
                  y: coupleWalkY 
                }}
                className="absolute left-1/2 -translate-x-1/2 bottom-[18%] sm:bottom-[20%] md:bottom-[22%] z-30 flex flex-col items-center pointer-events-none"
              >
                <img 
                  src="/assets/mandir/couple.png" 
                  alt="Veena & Vishal Walking Hand in Hand Toward the Sacred Sanctum" 
                  className="h-[12vh] sm:h-[15vh] md:h-[18vh] max-h-[190px] min-h-[90px] w-auto object-contain drop-shadow-[0_16px_28px_rgba(95,37,15,0.4)]" 
                />
              </motion.div>

            </motion.div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* FOOTER: AUSPICIOUS UNION BADGE & CHAPTER PROGRESS              */}
        {/* ============================================================== */}
        <motion.div 
          style={{ opacity: badgeOpacity, y: badgeY }}
          className="relative z-30 flex flex-col items-center gap-2 pb-[1vh] shrink-0"
        >
          {/* Sacred Union Pill with High Contrast Formatting */}
          <div className="px-6 py-2 rounded-full bg-[#5f250f] text-[#fbf5eb] text-xs sm:text-sm font-serif font-bold tracking-widest border border-[#dda45d] shadow-[0_8px_20px_rgba(95,37,15,0.3)] backdrop-blur-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dda45d] animate-ping" />
            <span>शुभ पाणिग्रहण संस्कार • Sacred Union • Veena & Vishal</span>
          </div>

          {/* Sequential Chapter Progress Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-digits uppercase tracking-wider text-[#ab5626] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dda45d]" />
              Mandir Darshan
            </span>
            <span className="text-[#dda45d]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dda45d]" />
              Sacred Courtyard
            </span>
            <span className="text-[#dda45d]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dda45d]" />
              Divine Walk
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
