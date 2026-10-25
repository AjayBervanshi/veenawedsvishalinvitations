import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BrothersNoteSection() {
  const [diyaCount, setDiyaCount] = useState(0);
  const [justLit, setJustLit] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("weddingDiyaCount");
    if (stored) {
      setDiyaCount(parseInt(stored, 10));
    } else {
      setDiyaCount(108);
      localStorage.setItem("weddingDiyaCount", "108");
    }
  }, []);

  const lightDiya = () => {
    if (justLit) return;
    const newCount = diyaCount + 1;
    setDiyaCount(newCount);
    localStorage.setItem("weddingDiyaCount", newCount.toString());
    setJustLit(true);

    window.dispatchEvent(new Event("triggerPetalBurst"));

    setTimeout(() => {
      setJustLit(false);
    }, 2000);
  };

  return (
    <section id="brother" className="py-24 px-4 max-w-5xl mx-auto relative z-10 w-full">
      <div className="relative overflow-hidden rounded-2xl glass-card border border-gold/40 shadow-2xl p-8 sm:p-16">
        <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 100 100" fill="var(--color-gold-deep)">
            <path d="M50,0 Q50,50 100,50 Q50,50 50,100 Q50,50 0,50 Q50,50 50,0 Z" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
          <svg viewBox="0 0 100 100" fill="none" stroke="var(--color-bronze)" strokeWidth="2">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="30" strokeDasharray="4 4" />
            <path d="M50,10 L50,90 M10,50 L90,50" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-espresso mb-2">
            भाई का स्नेह और वचन
          </h2>
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-bronze mb-8">
            A Brother's Promise & Lava Parchhai
          </h3>

          <div className="w-12 h-px bg-gold mb-8"></div>

          <p className="font-serif text-lg sm:text-xl md:text-2xl text-espresso/90 leading-relaxed max-w-3xl mb-8 italic">
            "From growing up together in our courtyard to pouring the sacred Lava into your hands
            beside the wedding fire, my prayers and pride walk with you into every tomorrow, Veena.
            Welcome to the family, Vishal Jiju!"
          </p>

          <p className="font-hindi text-lg text-bronze mb-12">
            ( लावा परछाई के इस पवित्र क्षण में, एक भाई का आशीर्वाद )
          </p>

          <div className="flex flex-col items-center">
            <button onClick={lightDiya} disabled={justLit} className="relative group mb-6">
              <div
                className={`absolute inset-0 bg-orange-400/30 blur-xl rounded-full transition-opacity duration-1000 ${justLit ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
              ></div>

              <div className="relative bg-[var(--cream)] border border-gold/40 rounded-full px-8 py-4 flex items-center gap-4 shadow-sm group-hover:shadow-md transition-all overflow-hidden">
                <span className="font-sans text-sm tracking-widest uppercase text-espresso whitespace-nowrap">
                  {justLit ? "Blessing Sent ✨" : "Light a Diya for Veena & Vishal"}
                </span>

                <div className="w-8 h-8 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M50,20 Q60,40 50,60 Q40,40 50,20 Z"
                      fill="#FF8C00"
                      className={`transition-all duration-1000 origin-bottom ${justLit ? "scale-110" : "scale-90 animate-[flicker_2s_infinite]"}`}
                    />
                    <path
                      d="M50,35 Q55,45 50,55 Q45,45 50,35 Z"
                      fill="#FFD700"
                      className={`transition-all duration-1000 origin-bottom ${justLit ? "scale-110" : "scale-90 animate-[flicker_1.5s_infinite_0.5s]"}`}
                    />
                    <path d="M20,60 Q50,90 80,60 Z" fill="#8B4513" />
                    <path d="M20,60 Q50,70 80,60" fill="none" stroke="#D2B48C" strokeWidth="2" />
                  </svg>
                </div>

                <AnimatePresence>
                  {justLit && (
                    <motion.div
                      className="absolute inset-0 bg-gold/20"
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </button>

            <div className="font-sans text-xs tracking-widest uppercase text-bronze flex flex-col items-center gap-2">
              <span>{diyaCount} Diyas Lit Globally</span>
              <span className="font-hindi text-[10px]">(दीप प्रज्वलित)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
