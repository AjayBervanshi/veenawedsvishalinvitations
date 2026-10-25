import { motion, useScroll, useTransform } from "framer-motion";
import { Jharokha, Toran, GaneshaLine, ShadiMandap } from "./motifs";

export function Hero() {
  const { scrollY } = useScroll();
  const leftPavilionX = useTransform(scrollY, [0, 500], [0, -100]);
  const rightPavilionX = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full pointer-events-none z-10 opacity-90">
        <Toran className="w-full h-auto max-h-24 drop-shadow-sm" />
      </div>

      <motion.div
        className="absolute left-0 top-0 bottom-0 w-32 md:w-64 pointer-events-none z-0 hidden sm:block"
        style={{ x: leftPavilionX }}
      >
        <Jharokha side="left" className="h-full w-full object-cover object-left opacity-30" />
      </motion.div>

      <motion.div
        className="absolute right-0 top-0 bottom-0 w-32 md:w-64 pointer-events-none z-0 hidden sm:block"
        style={{ x: rightPavilionX }}
      >
        <Jharokha
          side="right"
          className="h-full w-full object-cover object-right opacity-30"
          flip
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">
        <motion.div
          className="mb-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <GaneshaLine className="w-16 h-16 mb-4 opacity-80" />
          <p className="font-hindi text-gold-deep text-sm md:text-base mb-1 tracking-wider leading-relaxed">
            ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। <br className="sm:hidden" />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
          </p>
        </motion.div>

        <motion.div
          className="w-64 h-64 sm:w-80 sm:h-80 mb-10 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 50 }}
        >
          <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl -z-10"></div>
          <ShadiMandap className="w-full h-full drop-shadow-sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-espresso mb-4 leading-tight">
            VISHAL <span className="text-gold-deep text-3xl sm:text-4xl mx-2">&</span> VEENA
          </h1>

          <div className="w-24 h-px bg-gold/50 mx-auto mb-6"></div>

          <p className="font-sans text-sm sm:text-base md:text-lg text-bronze uppercase tracking-[0.2em] md:tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
            A Sacred Sangam of Madhya Pradesh <br className="hidden sm:block" />& Purvanchal-Bihar
            Heritage
          </p>
          <p className="mt-4 font-serif text-lg text-espresso/80 italic">
            28–30 November 2026 • Ballia, Uttar Pradesh
          </p>
        </motion.div>
      </div>
    </section>
  );
}
