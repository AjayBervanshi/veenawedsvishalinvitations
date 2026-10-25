import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/components/AudioProvider";
import { Volume2, VolumeX, Menu, X, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerPetals = () => {
    window.dispatchEvent(new Event("triggerPetalBurst"));
  };

  const navLinks = [
    { label: "The Sangam", href: "#hero" },
    { label: "Celebrations", href: "#events" },
    { label: "Brother's Note", href: "#brother" },
    { label: "Venue (Ballia)", href: "#venue" },
    { label: "RSVP", href: "#rsvp" },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? "bg-[var(--cream)]/85 backdrop-blur-md border-b border-gold/20 shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div
            className="font-display text-2xl text-espresso tracking-widest cursor-pointer"
            onClick={() => scrollTo("#hero")}
          >
            V<span className="text-gold text-lg mx-1">&</span>V
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-sans text-bronze hover:text-espresso transition-colors uppercase tracking-widest"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 border-gold/40 text-espresso hover:bg-gold/10 rounded-full font-sans tracking-wider"
              onClick={triggerPetals}
            >
              <Flower2 size={16} className="text-gold-deep" />
              <span>पुष्प वर्षा</span>
            </Button>

            <button
              onClick={toggleMute}
              className="p-2 text-bronze hover:text-espresso transition-colors rounded-full hover:bg-gold/10"
              aria-label={isMuted ? "Unmute Music" : "Mute Music"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <button
              className="lg:hidden p-2 text-bronze"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="fixed inset-0 z-30 bg-[var(--paper)]/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center gap-8"
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            className="text-xl font-display text-espresso tracking-widest"
          >
            {link.label}
          </button>
        ))}
        <Button
          variant="outline"
          className="mt-8 flex items-center gap-2 border-gold/40 text-espresso bg-transparent hover:bg-gold/10 rounded-full font-sans tracking-wider px-8"
          onClick={() => {
            triggerPetals();
            setMobileMenuOpen(false);
          }}
        >
          <Flower2 size={18} className="text-gold-deep" />
          <span>पुष्प वर्षा (Petal Shower)</span>
        </Button>
      </motion.div>
    </>
  );
}
