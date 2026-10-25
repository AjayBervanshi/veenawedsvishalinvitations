import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const CoupleStory: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-4 bg-[#230a04] overflow-hidden text-center">
      {/* Peacock Motif Background */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-center bg-cover"
        style={{ backgroundImage: 'url(/assets/mandir/peacock-backdrop-v1.webp)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[#dda45d] font-serif mb-1">
          A Journey of Love
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#f7e8d4] font-bold tracking-wide mb-6">
          Our Love Story
        </h2>

        {/* Story Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-[#361105]/85 border border-[#dda45d]/40 p-8 shadow-2xl backdrop-blur-md"
        >
          {/* Couple Photo Silhouette Frame */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-6 rounded-full border-2 border-[#dda45d] p-1.5 shadow-xl bg-[#200702]">
            <img 
              src="/assets/mandir/couple-photo-v1.webp" 
              alt="Veena and Vishal" 
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#5f250f] border border-[#dda45d] text-[#dda45d] shadow-md">
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#dda45d] mb-3">
            Two Hearts, One Eternal Vow
          </h3>

          <p className="text-xs md:text-sm text-[#f7e8d4]/85 font-serif leading-relaxed italic mb-4">
            "What began as a chance meeting blossomed through countless shared conversations, mutual dreams, and unwavering friendship. Today, with the blessings of our families and deities, we step together into a lifetime of laughter, devotion, and sacred companionship."
          </p>

          <p className="text-xs text-[#dda45d] font-serif tracking-widest uppercase">
            — Veena & Vishal
          </p>
        </motion.div>
      </div>
    </section>
  );
};
