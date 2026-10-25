import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/AudioProvider";
import { WaxSeal } from "./motifs";

interface EnvelopeProps {
  onOpen: () => void;
}

export function EnvelopeSplashScreen({ onOpen }: EnvelopeProps) {
  useEffect(() => {
    document.body.style.overflow = isOpening ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpening]);

  const [guestName, setGuestName] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const { initAudio, playMelody } = useAudio();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      setGuestName(to);
    }
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    initAudio();

    window.dispatchEvent(new Event("triggerPetalBurst"));

    setTimeout(() => {
      playMelody();
    }, 400);

    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/40 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        >
          <motion.div
            className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/10] bg-[var(--paper-2)] shadow-2xl overflow-hidden cursor-pointer"
            style={{
              borderRadius: "4px",
              backgroundImage: `
                radial-gradient(ellipse 80% 50% at 20% 10%, color-mix(in oklab, var(--gold) 15%, transparent), transparent 70%),
                repeating-linear-gradient(45deg, color-mix(in oklab, var(--espresso) 2%, transparent) 0 1px, transparent 1px 3px)
              `,
            }}
            onClick={handleOpen}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {/* Left Flap */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-[var(--paper)] origin-left border-r border-gold/30 shadow-[5px_0_15px_-5px_rgba(0,0,0,0.1)] flex items-center justify-end pr-4"
              exit={{ rotateY: -110 }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="absolute inset-0 paper-grain opacity-50 pointer-events-none" />
            </motion.div>

            {/* Right Flap */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 bg-[var(--paper)] origin-right border-l border-gold/30 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)] flex items-center justify-start pl-4"
              exit={{ rotateY: 110 }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="absolute inset-0 paper-grain opacity-50 pointer-events-none" />
            </motion.div>

            {/* Content Underneath Flaps (The Invitation Card Peek) */}
            <div className="absolute inset-2 sm:inset-4 border border-gold/20 flex flex-col items-center justify-center p-6 text-center z-[-1] bg-[var(--cream)] paper-grain">
              <div className="text-gold mb-2 text-2xl">॥ ॐ ॥</div>
              <h2 className="font-display text-2xl sm:text-3xl text-espresso mb-1">
                Vishal & Veena
              </h2>
              <div className="text-sm font-sans tracking-[0.2em] text-bronze uppercase">
                28 - 30 November 2026
              </div>
            </div>

            {/* Wax Seal & Text (Center) */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <WaxSeal className="w-24 h-24 mb-6 drop-shadow-xl" />

              {/* Guest Personalization */}
              {guestName && (
                <motion.div
                  className="bg-[var(--cream)]/90 backdrop-blur-sm px-6 py-2 rounded-full border border-gold/40 shadow-sm mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-bronze font-serif italic mr-1">Cordially Sealed for</span>
                  <span className="text-espresso font-medium">{guestName}</span>
                </motion.div>
              )}

              {/* Call to Action */}
              <motion.div className="text-sm font-sans tracking-widest text-bronze/80 uppercase animate-pulse flex flex-col items-center gap-2">
                <span>✨ Tap to Open Invitation ✨</span>
                <span className="font-hindi text-xs">(निमंत्रण खोलें)</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
