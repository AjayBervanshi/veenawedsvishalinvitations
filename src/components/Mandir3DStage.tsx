import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { soundManager } from '../utils/sound';

export const Mandir3DStage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeBell, setActiveBell] = useState<'left' | 'right' | null>(null);

  // Track continuous scroll progress within this scrollytelling container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Buttery-smooth spring physics for fluid scrub on all screen resolutions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Handle interactive temple bell ring
  const handleRingBell = (side: 'left' | 'right') => {
    setActiveBell(side);
    soundManager.playBellChime();
    setTimeout(() => setActiveBell(null), 1200);
  };

  // =========================================================================
  // SCROLL SEQUENCE TRANSFORMATIONS (Centered Scrollytelling Sequence)
  // =========================================================================

  // STEP 1: MANDIR - Centerpiece of the sacred sanctum, welcoming the guest immediately
  const mandirOpacity = useTransform(smoothProgress, [0.00, 0.18], [0.95, 1]);
  const mandirScale = useTransform(smoothProgress, [0.00, 0.24], [0.94, 1]);
  const mandirY = useTransform(smoothProgress, [0.00, 0.24], [-10, 0]);

  // STEP 2: GARDEN - Sacred Courtyard & Grand Stairs rise and lock seamlessly to mandir base
  const gardenOpacity = useTransform(smoothProgress, [0.16, 0.44], [0, 1]);
  const gardenScale = useTransform(smoothProgress, [0.16, 0.46], [0.94, 1]);
  const gardenY = useTransform(smoothProgress, [0.16, 0.46], [28, 0]);

  // STEP 3: COUPLE - Appears in center of garden footpath & steps forward toward temple steps
  const coupleOpacity = useTransform(smoothProgress, [0.46, 0.72], [0, 1]);
  const coupleScale = useTransform(smoothProgress, [0.46, 0.80], [0.88, 1.05]);
  const coupleWalkY = useTransform(smoothProgress, [0.48, 0.85], [36, -18]);

  // Auspicious Union Badge
  const badgeOpacity = useTransform(smoothProgress, [0.60, 0.82], [0, 1]);
  const badgeY = useTransform(smoothProgress, [0.60, 0.82], [12, 0]);

  return (
    <div
      id="mandir-darshan"
      ref={containerRef}
      className="relative w-full h-[120vh] sm:h-[125vh] bg-transparent"
    >
      {/* Sticky Fullscreen Viewport Window (STRICTLY PINNED IN CENTER OF SCREEN) */}
      <div className="sticky top-0 h-screen h-[100svh] w-full flex flex-col items-center justify-center px-4 py-3 overflow-hidden pointer-events-none">

        {/* Soft Ambient Radial Glow behind the Temple with Lavender-Periwinkle and Gold */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
          <div className="w-[85vw] max-w-[850px] h-[55vh] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#dda45d]/20 via-[#dcd0ff]/15 to-transparent blur-3xl" />
        </div>

        {/* Top Decorative Ornamental Accent */}
        <div className="absolute top-2 inset-x-0 z-10 pointer-events-none flex justify-center opacity-70">
          <img
            src="/assets/mandir/ornament-band-v1.webp"
            alt="Sacred Ornamental Band"
            className="w-48 sm:w-72 h-auto object-contain"
          />
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE HANGING TEMPLE BELLS (LEFT & RIGHT ARCHES)         */}
        {/* ============================================================== */}
        <div className="absolute top-14 sm:top-20 left-3 sm:left-10 z-[35] flex flex-col items-center pointer-events-auto">
          <button
            type="button"
            onClick={() => handleRingBell('left')}
            title="Tap to ring temple bell"
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <span className="w-0.5 h-12 sm:h-20 bg-gradient-to-b from-[#dda45d] via-[#b87a32] to-[#dda45d] shadow-sm" />
            <img
              src="/assets/mandir/bell-a-v1.png"
              alt="Left Sacred Bell"
              className={`w-7 h-7 sm:w-10 sm:h-10 -mt-1 drop-shadow-[0_4px_10px_rgba(95,37,15,0.35)] transition-transform ${activeBell === 'left' ? 'animate-bell-ring' : 'group-hover:rotate-12'
                }`}
            />
            <span className="text-[10px] font-digits text-[#ab5626] font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              🔔 Ring
            </span>
          </button>
        </div>

        <div className="absolute top-14 sm:top-20 right-3 sm:right-10 z-[35] flex flex-col items-center pointer-events-auto">
          <button
            type="button"
            onClick={() => handleRingBell('right')}
            title="Tap to ring temple bell"
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <span className="w-0.5 h-12 sm:h-20 bg-gradient-to-b from-[#dda45d] via-[#b87a32] to-[#dda45d] shadow-sm" />
            <img
              src="/assets/mandir/bell-a-v1.png"
              alt="Right Sacred Bell"
              className={`w-7 h-7 sm:w-10 sm:h-10 -mt-1 drop-shadow-[0_4px_10px_rgba(95,37,15,0.35)] transition-transform ${activeBell === 'right' ? 'animate-bell-ring' : 'group-hover:rotate-12'
                }`}
            />
            <span className="text-[10px] font-digits text-[#ab5626] font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              🔔 Ring
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* HEADER: Warm, Soothing "Shubh Vivah" with Proper Devanagari    */}
        {/* ============================================================== */}
        <div className="relative z-30 text-center max-w-[90vw] sm:max-w-xl mx-auto mb-1 shrink-0 pointer-events-auto">
          {/* Authentic Sanskrit Invocation */}
          <p className="font-shloka text-xs sm:text-sm font-bold text-[#ab5626] mb-0.5 leading-normal drop-shadow-sm">
            ॥ मङ्गलम् भगवान विष्णुः • मङ्गलम् गरुडध्वजः ॥
          </p>

          {/* Warm, Soothing Shubh Vivah Title */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#5f250f] tracking-wide my-0.5">
            Shubh Vivah
          </h2>

          {/* Warm, Welcoming Subtitle */}
          <p className="font-body text-[11px] sm:text-xs text-[#5f250f]/85 max-w-[85vw] sm:max-w-md mx-auto leading-relaxed">
            Where two souls unite in the sacred presence of the divine and the warm blessings of loved ones
          </p>
        </div>

        {/* ============================================================== */}
        {/* CENTER VIEWPORT STAGE: PERFECTLY CENTERED COMPOSITE SCENE      */}
        {/* ============================================================== */}
        <div className="relative z-20 w-full max-w-[840px] mx-auto flex flex-col items-center justify-center my-auto">

          {/* Composite Mandir & Garden Structure */}
          <div className="relative w-full flex flex-col items-center">

            {/* The Mandir Sanctum (Layer 1) - Grand, towering sanctum matching Final.png */}
            <motion.div
              style={{
                opacity: mandirOpacity,
                scale: mandirScale,
                y: mandirY
              }}
              className="relative z-10 w-full flex justify-center pointer-events-none"
            >
              <div className="w-[76%] sm:w-[74%] md:w-[72%] max-w-[640px] flex justify-center translate-x-[6px] sm:translate-x-[15px] translate-y-[25px] sm:translate-y-[40px]">
                <img
                  src="/assets/mandir/mandir.png"
                  alt="The Sacred Ram Mandir"
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(95,37,15,0.2)]"
                />
              </div>
            </motion.div>

            {/* Sacred Courtyard Garden & Steps (Layer 2) - Grand stairs connect to base plinth of Mandir without concealing sanctum */}
            <motion.div
              style={{
                opacity: gardenOpacity,
                scale: gardenScale,
                y: gardenY
              }}
              className="relative z-20 w-full flex justify-center -mt-[8%] sm:-mt-[9%] md:-mt-[10%] pointer-events-none"
            >
              <div className="relative w-full max-w-[840px] flex justify-center">
                <img
                  src="/assets/mandir/garden.png"
                  alt="Sacred Garden Promenade and Courtyard Stairs"
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(95,37,15,0.18)]"
                />

                {/* Glowing Sacred Courtyard Diyas */}
                <div className="absolute left-[18%] sm:left-[22%] bottom-[32%] z-30 flex flex-col items-center">
                  <div className="w-2.5 h-3.5 rounded-full bg-gradient-to-t from-[#f39c12] via-[#e67e22] to-[#fff3b0] animate-diya-flame" />
                  <div className="w-4 h-1.5 rounded-b-full bg-[#dda45d] shadow-[0_2px_6px_rgba(243,156,18,0.7)]" />
                </div>

                <div className="absolute right-[18%] sm:right-[22%] bottom-[32%] z-30 flex flex-col items-center">
                  <div className="w-2.5 h-3.5 rounded-full bg-gradient-to-t from-[#f39c12] via-[#e67e22] to-[#fff3b0] animate-diya-flame" />
                  <div className="w-4 h-1.5 rounded-b-full bg-[#dda45d] shadow-[0_2px_6px_rgba(243,156,18,0.7)]" />
                </div>

                {/* Couple Walking Along Central Footpath Toward Mandir Doors (Layer 3) - Centered & proportioned to garden matching Final.png */}
                <motion.div
                  style={{
                    opacity: coupleOpacity,
                    scale: coupleScale,
                    y: coupleWalkY,
                    x: "-50%",
                  }}
                  className="absolute left-[49.5%] bottom-[7.5%] w-[21%] min-w-[130px] max-w-[180px] z-30 flex flex-col items-center pointer-events-none"
                >
                  {/* Soft Marble Ground Shadow */}
                  <div className="w-[85%] h-3 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#5f250f]/45 to-transparent blur-[2px] translate-y-2" />

                  <img
                    src="/assets/mandir/couple.png"
                    alt="Veena & Vishal Walking Hand in Hand"
                    loading="eager"
                    decoding="async"
                    className="w-full h-auto object-contain drop-shadow-[0_16px_30px_rgba(95,37,15,0.4)]"
                  />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* FOOTER: AUSPICIOUS UNION BADGE & INTERACTIVE CHAPTER PROGRESS  */}
        {/* ============================================================== */}
        <div className="relative z-30 flex flex-col items-center gap-1.5 mt-2 sm:mt-3 shrink-0 pointer-events-auto">
          {/* Sacred Union Pill */}
          <motion.div
            style={{ opacity: badgeOpacity, y: badgeY }}
            className="px-5 py-1.5 rounded-full bg-[#5f250f] text-[#fbf5eb] text-xs font-serif font-bold tracking-wider border border-[#dda45d] shadow-[0_6px_16px_rgba(95,37,15,0.3)] backdrop-blur-md flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#dda45d] animate-ping" />
            <span>शुभ पाणिग्रहण संस्कार • Sacred Union • Veena & Vishal</span>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
