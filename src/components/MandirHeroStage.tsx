import React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { ChevronDown } from 'lucide-react';

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
  const ringBell = () => {
    soundManager.playBellChime();
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between text-center bg-[#290c05]">
      
      {/* 1. Base Sky Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-90"
        style={{ backgroundImage: 'url(/assets/mandir/sky-v1.webp)' }}
      />

      {/* 2. Golden Sun Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-80">
        <img 
          src="/assets/mandir/sun-v1.webp" 
          alt="Sun" 
          className="w-48 md:w-72 h-auto drop-shadow-[0_0_50px_rgba(221,164,93,0.6)] animate-pulse"
          style={{ animationDuration: '6s' }}
        />
      </div>

      {/* 3. Mountain Backdrop */}
      <div className="absolute bottom-40 w-full z-10 pointer-events-none opacity-40">
        <img 
          src="/assets/mandir/mountain-v1.webp" 
          alt="" 
          className="w-full object-cover max-h-64"
        />
      </div>

      {/* 4. Drifting Clouds */}
      <div className="absolute top-24 w-full z-10 pointer-events-none opacity-60 animate-clouds">
        <img 
          src="/assets/mandir/cloud-v1.webp" 
          alt="" 
          className="w-full max-w-4xl mx-auto object-cover"
        />
      </div>

      {/* 5. Top Bell Archway with Swinging Interactive Bells */}
      <div className="relative z-30 w-full max-w-2xl mx-auto pt-2 px-4 flex flex-col items-center">
        {/* Arch Graphic */}
        <img 
          src="/assets/mandir/bell-arch-v1.webp" 
          alt="Bell Arch" 
          className="w-full max-w-lg h-auto object-contain drop-shadow-md"
        />
        
        {/* Hanging Bells (Left & Right) */}
        <div className="w-full max-w-md -mt-3 flex justify-between px-12 md:px-16">
          {/* Bell Left */}
          <button
            type="button"
            onClick={ringBell}
            aria-label="Ring left temple bell"
            className="cursor-pointer group focus:outline-none"
            title="Tap to ring bell"
          >
            <img 
              src="/assets/mandir/bell-a-v1.png" 
              alt="Temple Bell" 
              className="w-8 md:w-11 h-auto animate-swing-left filter drop-shadow hover:scale-110 transition-transform"
            />
          </button>

          {/* Center Kalasam / Invocatory Icon */}
          <div className="flex flex-col items-center">
            <img 
              src="/assets/mandir/ganpati-icon-v1.webp" 
              alt="Ganesha" 
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md"
            />
          </div>

          {/* Bell Right */}
          <button
            type="button"
            onClick={ringBell}
            aria-label="Ring right temple bell"
            className="cursor-pointer group focus:outline-none"
            title="Tap to ring bell"
          >
            <img 
              src="/assets/mandir/bell-b-v1.png" 
              alt="Temple Bell" 
              className="w-8 md:w-11 h-auto animate-swing-right filter drop-shadow hover:scale-110 transition-transform"
            />
          </button>
        </div>

        {/* Sanskrit Devanagari Invocation */}
        <div className="mt-3">
          <p className="text-[#dda45d] text-base md:text-lg font-serif tracking-widest font-semibold drop-shadow">
            || श्री गणेशाय नमः ||
          </p>
          <img 
            src="/assets/mandir/shri-line-v1.webp" 
            alt="" 
            className="w-48 md:w-64 h-auto mx-auto mt-1 opacity-80"
          />
        </div>
      </div>

      {/* 6. Sacred Mandir & Couple Hero Card */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-4 my-auto pt-4 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative px-6 py-8 rounded-3xl bg-[#3c1307]/85 border border-[#dda45d]/40 backdrop-blur-md shadow-2xl"
        >
          {/* Top Peacock Ornament */}
          <div className="flex justify-center -mt-12 mb-3">
            <img 
              src="/assets/mandir/peacock-ornament-v1.webp" 
              alt="" 
              className="w-16 h-auto drop-shadow"
            />
          </div>

          {/* Parents Blessing Line */}
          <p className="text-xs uppercase tracking-[0.2em] text-[#dda45d] font-serif mb-2">
            With the divine blessings of our ancestors & parents
          </p>
          <p className="text-xs md:text-sm text-[#f7e8d4]/90 font-serif leading-relaxed mb-4">
            {hostMessage}
          </p>

          {/* Couple Names */}
          <div className="my-5">
            <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#dda45d] tracking-wider drop-shadow-lg">
              {brideName}
            </h1>
            <p className="text-xs text-[#f7e8d4]/70 font-serif italic my-0.5">
              Daughter of {brideParents}
            </p>
            
            <span className="inline-block my-2 text-2xl font-serif italic text-[#f7e8d4] font-medium">
              weds
            </span>

            <h1 className="text-4xl md:text-6xl font-bold font-serif text-[#dda45d] tracking-wider drop-shadow-lg">
              {groomName}
            </h1>
            <p className="text-xs text-[#f7e8d4]/70 font-serif italic my-0.5">
              Son of {groomParents}
            </p>
          </div>

          {/* Wedding Date Pill */}
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#dda45d]/50 bg-[#200702]/80 shadow-inner">
            <span className="text-[#dda45d] text-sm md:text-base font-serif font-semibold tracking-wider">
              {weddingDateDisplay}
            </span>
          </div>

          {/* Flag Pole with fluttering Saffron Flag */}
          <div className="absolute -top-10 -right-4 md:-right-8 flex items-start pointer-events-none">
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
      </div>

      {/* 7. Rising Mandir Temple Silhouette at Bottom */}
      <div className="relative z-10 w-full max-w-3xl mx-auto -mb-1 pointer-events-none">
        <img 
          src="/assets/mandir/temple-v1.webp" 
          alt="Mandir Temple Spire" 
          className="w-full h-auto object-contain drop-shadow-[0_-15px_30px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* 8. Scroll Down Hint */}
      <div className="relative z-30 pb-6 flex flex-col items-center text-[#dda45d]/70 hover:text-[#dda45d] transition-colors">
        <span className="text-[11px] uppercase tracking-widest font-serif mb-1">
          Scroll for Auspicious Timeline
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>

    </section>
  );
};
