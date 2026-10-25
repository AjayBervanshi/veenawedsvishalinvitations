import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const CoupleStory: React.FC = () => {
  return (
    <section className="relative w-full py-12 px-4 bg-[#fbf5eb] text-center">
      {/* Peacock Motif Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-center bg-cover"
        style={{ backgroundImage: 'url(/assets/mandir/peacock-backdrop-v1.webp)' }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
          A Journey of Devotion & Love
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#5f250f] font-bold tracking-wide mb-5">
          Our Love Story
        </h2>

        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-[#ffffff] border-2 border-[#dda45d]/60 p-6 md:p-8 shadow-[0_8px_25px_rgba(95,37,15,0.08)]"
        >
          {/* Couple Photo Silhouette Frame */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-5 rounded-full border-4 border-[#dda45d] p-1 shadow-md bg-[#fbf5eb]">
            <img 
              src="/assets/mandir/couple-photo-v1.webp" 
              alt="Veena and Vishal" 
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#5f250f] border-2 border-[#dda45d] text-[#dda45d] shadow-md">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#5f250f] mb-2">
            Two Hearts, One Eternal Vow
          </h3>

          <p className="text-xs md:text-sm text-[#5f250f]/80 font-serif leading-relaxed italic mb-4">
            "What began as a chance meeting blossomed through countless shared conversations, mutual dreams, and unwavering friendship. Today, with the blessings of our families and deities, we step together into a lifetime of laughter, devotion, and sacred companionship."
          </p>

          <p className="text-xs text-[#ab5626] font-serif font-bold tracking-widest uppercase">
            — Veena & Vishal
          </p>
        </motion.div>
      </div>
    </section>
  );
};
