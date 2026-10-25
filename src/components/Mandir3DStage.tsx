import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Mandir3DStage: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  // Subtle natural parallax shifts while scrolling through the section
  const templeParallax = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const gardenParallax = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const coupleParallax = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const cloudLeftParallax = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const cloudRightParallax = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div 
      ref={stageRef} 
      className="relative w-full py-8 sm:py-12 md:py-16 px-3 sm:px-6 overflow-hidden bg-gradient-to-b from-[#fbf5eb] via-[#fcf8f0] to-[#fdfaf4]"
    >
      {/* Soft Golden Ambient Radial Glow behind the Temple */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[85vw] max-w-[800px] h-[500px] rounded-full bg-radial from-[#dda45d]/22 via-[#dda45d]/6 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* ============================================================== */}
        {/* SOOTHING "SHUBH VIVAH" SECTION HEADER                          */}
        {/* ============================================================== */}
        <div className="text-center mb-4 sm:mb-6 max-w-2xl px-4">
          <motion.p 
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-shloka text-xs sm:text-sm uppercase tracking-[0.25em] text-[#ab5626] font-bold mb-1.5"
          >
            ॥ मङ्गलम् भगवान विष्णुः • मङ्गलम् गरुडध्वजः ॥
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#5f250f] tracking-wide"
          >
            Shubh Vivah
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xs sm:text-sm md:text-base text-[#5f250f]/80 max-w-lg mx-auto mt-2 leading-relaxed"
          >
            Where two souls unite in the sacred presence of the divine and the warm blessings of loved ones
          </motion.p>
        </div>

        {/* ============================================================== */}
        {/* CENTER VIEWPORT STAGE: LAYERED ARCHITECTURAL COMPOSITION       */}
        {/* Sequential Entrance Animation: Mandir -> Garden -> Clouds -> Couple */}
        {/* ============================================================== */}
        <div className="relative w-full max-w-[860px] mx-auto flex flex-col items-center my-2 sm:my-4">
          
          {/* LAYER 3: CELESTIAL CLOUDS (Organic, feathered edges, subtle sliding in) */}
          <motion.div
            style={{ y: cloudLeftParallax }}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 0.9, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.3, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-2 sm:top-6 -left-3 sm:left-1 w-40 sm:w-60 md:w-72 max-w-[32%] pointer-events-none z-10"
          >
            <img 
              src="/assets/mandir/cloud_left.png" 
              alt="Celestial Clouds" 
              className="w-full h-auto object-contain filter drop-shadow-[0_6px_20px_rgba(221,164,93,0.3)]" 
            />
          </motion.div>

          <motion.div
            style={{ y: cloudRightParallax }}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 0.9, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-4 sm:top-8 -right-3 sm:right-1 w-40 sm:w-60 md:w-72 max-w-[32%] pointer-events-none z-10"
          >
            <img 
              src="/assets/mandir/cloud_right.png" 
              alt="Celestial Clouds" 
              className="w-full h-auto object-contain filter drop-shadow-[0_6px_20px_rgba(221,164,93,0.3)]" 
            />
          </motion.div>

          {/* LAYER 1: THE SACRED MANDIR (Centered horizontally and vertically) */}
          <motion.div
            style={{ y: templeParallax }}
            initial={{ opacity: 0, scale: 0.94, y: -25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[88%] sm:w-[86%] max-w-[720px] z-10 flex justify-center pointer-events-none"
          >
            <img 
              src="/assets/mandir/mandir.png" 
              alt="The Sacred Ram Mandir" 
              className="w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(95,37,15,0.12)]" 
            />
          </motion.div>

          {/* LAYER 2: GARDEN PROMENADE */}
          {/* Top edge connects seamlessly with the base of the mandir stairs */}
          <motion.div
            style={{ y: gardenParallax }}
            initial={{ opacity: 0, y: 45, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[98%] sm:w-[96%] max-w-[800px] -mt-[5.4%] sm:-mt-[5.8%] md:-mt-[6.2%] z-20 flex justify-center pointer-events-none"
          >
            <img 
              src="/assets/mandir/garden.png" 
              alt="Sacred Garden Promenade and Courtyard Stairs" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(95,37,15,0.14)]" 
            />

            {/* LAYER 4: COUPLE ON GARDEN FOOTPATH */}
            {/* Positioned precisely in the center of the walkway, naturally walking towards the mandir doors */}
            <motion.div
              style={{ y: coupleParallax }}
              initial={{ opacity: 0, scale: 0.82, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ 
                duration: 1.2, 
                delay: 0.75, 
                type: 'spring', 
                stiffness: 70, 
                damping: 14 
              }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[18%] sm:bottom-[20%] md:bottom-[22%] z-30 flex flex-col items-center pointer-events-none"
            >
              <img 
                src="/assets/mandir/couple.png" 
                alt="Veena & Vishal Walking Hand in Hand Toward the Temple Sanctum" 
                className="h-28 sm:h-36 md:h-44 lg:h-48 w-auto object-contain drop-shadow-[0_16px_28px_rgba(95,37,15,0.4)]" 
              />
            </motion.div>

          </motion.div>

        </div>

        {/* ============================================================== */}
        {/* AUSPICIOUS UNION BADGE & CHAPTER SEQUENCE PROGRESS             */}
        {/* ============================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="relative z-30 flex flex-col items-center gap-2 mt-4 sm:mt-6"
        >
          {/* Sacred Union Pill */}
          <div className="px-6 py-2 rounded-full bg-[#5f250f]/92 text-[#fbf5eb] text-xs sm:text-sm font-serif font-bold tracking-widest border border-[#dda45d] shadow-[0_8px_20px_rgba(95,37,15,0.25)] backdrop-blur-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dda45d] animate-ping" />
            <span>शुभ पाणिग्रहण संस्कार • Sacred Union • Veena & Vishal</span>
          </div>

          {/* Sequence Chapter Dots */}
          <div className="flex items-center gap-4 text-[10px] sm:text-xs font-digits uppercase tracking-wider text-[#ab5626] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dda45d]" />
              Mandir Darshan
            </span>
            <span className="text-[#dda45d]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dda45d]" />
              Sacred Courtyard
            </span>
            <span className="text-[#dda45d]">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dda45d]" />
              Divine Walk
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
