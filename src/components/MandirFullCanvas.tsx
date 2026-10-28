import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { weddingData, initialBlessings } from '../data/weddingData';
import { 
  Navigation, 
  Calendar, 
  Send, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Sparkles,
  Sun,
  Flame,
  Heart,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mandir3DStage } from './Mandir3DStage';
import { AnimatedJourneyVisual } from './AnimatedJourneyVisual';
import { buildGoogleCalendarUrl, copyTextToClipboard } from '../utils/helpers';
import { fetchBlessings, postBlessing, subscribeBlessings } from '../lib/blessingsApi';
import type { Blessing } from '../types/wedding';

export const MandirFullCanvas: React.FC = () => {
  const heroRef = React.useRef<HTMLElement>(null);
  
  // Raw scroll within the Hero container
  const { scrollYProgress: rawHeroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end']
  });

  // Physics-based smoothing: Eliminates tick-by-tick wheel stutter for silky gliding
  const smoothHeroProgress = useSpring(rawHeroProgress, {
    stiffness: 75,
    damping: 28,
    mass: 0.40,
    restDelta: 0.001
  });

  // Guarantee that on initial mount, Hero scrollytelling begins strictly at 0 (Ganesha centered)
  // with zero spring lag or jump
  useEffect(() => {
    smoothHeroProgress.set(0);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [smoothHeroProgress]);

  const [expandedRituals, setExpandedRituals] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleRitual = (id: string) => {
    setExpandedRituals((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyEventDetails = async (event: typeof weddingData.events[0]) => {
    const text = `🌸 ${event.title} (${event.hindiTitle || ''})\n📅 Date: ${event.date}\n⏰ Time: ${event.time}\n📍 Venue: ${event.venue}\n👗 Attire: ${event.dressCode || 'Royal Indian Traditional'}\n${weddingData.hashtag}`;
    const success = await copyTextToClipboard(text);
    if (success) {
      setCopiedId(event.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // ==============================================================
  // SILKY SMOOTH TWO-PHASE HERO SCROLLYTELLING TRANSITIONS
  // ==============================================================
  // Phase 1 (0.00 -> 0.08): 
  // - Starts with Lord Ganesha sacred invocation perfectly centered in viewport
  // - Couple names strictly hidden (namesOpacity: 0)
  // - Welcoming host message and scroll prompt fully visible
  // Phase 2 (0.08 -> 0.28): 
  // - Ganesha glides smoothly up to crowning header position (y: '-34vh', scale: 0.72)
  // - Host message dissolves quickly (0.04 -> 0.12)
  // - Couple names emerge with soft-focus crystallizing into razor focus (blur(8px) -> blur(0px))
  // - Veena enters from left (-70px -> 0px), Vishal enters from right (+70px -> 0px)
  // Phase 3 (0.28 -> 0.55):
  // - Royal presentation holds in center with Muhurat date badge
  // Phase 4 (0.55 -> 0.85):
  // - Slow, majestic, multi-property dissolve (blur 0 -> 12px, letter expansion 0 -> 0.04em, drift ±85px)
  // - Hands off directly to next page (0.78 -> 1.00) with zero dead delay
  const ganeshY = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    ['0vh', '0vh', '-34vh', '-34vh', '-48vh']
  );
  const ganeshScale = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    [1.05, 1.05, 0.72, 0.72, 0.66]
  );
  const ganeshOpacity = useTransform(
    smoothHeroProgress,
    [0.00, 0.50, 0.78],
    [1, 1, 0]
  );

  // Host message dissolves quickly as Ganesha glides up
  const hostMessageOpacity = useTransform(
    smoothHeroProgress,
    [0.00, 0.04, 0.10],
    [1, 1, 0]
  );
  const hostMessageScale = useTransform(
    smoothHeroProgress,
    [0.00, 0.10],
    [1, 0.92]
  );

  // Couple names: Silky soft-focus entrance & slow majestic dissolve
  const namesOpacity = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    [0, 0, 1, 1, 0]
  );
  const namesScale = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    [0.86, 0.86, 1.0, 1.0, 0.92]
  );
  const namesY = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    ['14vh', '14vh', '4.5vh', '4.5vh', '-6vh']
  );
  const namesBlur = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.22, 0.50, 0.78],
    ['blur(8px)', 'blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']
  );
  const namesTracking = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    ['0.02em', '0.02em', '0.00em', '0.00em', '0.04em']
  );
  const wedsScale = useTransform(
    smoothHeroProgress,
    [0.10, 0.25],
    [0.65, 1.0]
  );

  // Directional Name Transitions:
  // - Bride (Veena Singh): Enters from the left (-70px -> 0px), holds dead center, departs to the right (0px -> +85px)
  // - Groom (Vishal Singh): Enters from the right (+70px -> 0px), holds dead center, departs to the left (0px -> -85px)
  const brideX = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    ['-70px', '-70px', '0px', '0px', '85px']
  );
  const groomX = useTransform(
    smoothHeroProgress,
    [0.00, 0.08, 0.25, 0.50, 0.78],
    ['70px', '70px', '0px', '0px', '-85px']
  );

  // Seamless Handoff: Hero sticky window softly cross-fades directly into Mandir stage
  const heroWindowOpacity = useTransform(
    smoothHeroProgress,
    [0.00, 0.78, 0.98],
    [1, 1, 0]
  );

  const scrollHintOpacity = useTransform(
    smoothHeroProgress,
    [0.00, 0.08],
    [1, 0]
  );

  // Background Sun & Clouds parallax
  const sunY = useTransform(smoothHeroProgress, [0, 1], [0, 60]);
  const cloudsDrift = useTransform(smoothHeroProgress, [0, 1], [0, 80]);

  // Auspicious Countdown calculation
  const calculateTimeLeft = () => {
    const diff = +new Date(weddingData.weddingDateISO) - +new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Blessing Wall — shared live database for every guest
  const [blessings, setBlessings] = useState<Blessing[]>(initialBlessings);
  const [bName, setBName] = useState('');
  const [bMsg, setBMsg] = useState('');
  const [bSent, setBSent] = useState(false);
  const [bSending, setBSending] = useState(false);
  const [bError, setBError] = useState('');

  useEffect(() => {
    fetchBlessings().then((rows) => rows.length && setBlessings(rows)).catch(() => {});

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    subscribeBlessings((b) => {
      if (cancelled) return;
      setBlessings((prev) => (prev.some((p) => p.id === b.id) ? prev : [b, ...prev]));
    })
      .then((off) => {
        if (cancelled) off();
        else cleanup = off;
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const handleBlessingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName.trim() || !bMsg.trim() || bSending) return;
    setBSending(true);
    setBError('');
    try {
      const b = await postBlessing(bName.trim(), bMsg.trim());
      setBlessings((prev) => (prev.some((p) => p.id === b.id) ? prev : [b, ...prev]));
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.8 }, colors: ['#dda45d', '#e67e22', '#e74c3c'] });
      setBName('');
      setBMsg('');
      setBSent(true);
      setTimeout(() => setBSent(false), 4000);
    } catch {
      setBError('Could not post right now, please try again.');
    } finally {
      setBSending(false);
    }
  };


  // Specialized auspicious ceremony icon with royal ceremonial palettes
  const getEventIcon = (id: string) => {
    switch (id) {
      case 'haldi':
        return <Sun className="w-7 h-7 text-[#b87314] drop-shadow-[0_2px_6px_rgba(184,115,20,0.35)]" />;
      case 'mehendi':
        return <Sparkles className="w-7 h-7 text-[#2e7d32] drop-shadow-[0_2px_6px_rgba(46,125,50,0.35)]" />;
      case 'vivaah':
        return <Flame className="w-7 h-7 text-[#b71c1c] drop-shadow-[0_2px_6px_rgba(183,28,28,0.35)]" />;
      default:
        return <Heart className="w-7 h-7 text-[#ab5626]" />;
    }
  };

  return (
    <div className="w-full bg-transparent text-[#3b2046] min-h-screen overflow-x-clip selection:bg-[#dcd0ff]/50">
      
      {/* ============================================================== */}
      {/* 1. BESPOKE ROYAL HERO: STICKY TWO-PHASE SCROLLYTELLING         */}
      {/* ============================================================== */}
      <section 
        id="hero"
        ref={heroRef}
        className="relative w-full h-[135vh] sm:h-[140vh] bg-[#fbf8f2]"
      >
        {/* Pinned Sticky Viewport Window */}
        <motion.div 
          style={{
            opacity: heroWindowOpacity,
            background: 'radial-gradient(ellipse at 50% 35%, #ece4fa 0%, #f3edf8 45%, #fbf8f2 100%)'
          }}
          className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center px-4 bg-[#fbf8f2] z-30"
        >
          {/* Subtle Ambient Texture */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-multiply"
            style={{ backgroundImage: 'url(/assets/mandir/sky-v1.webp)' }}
          />

          {/* Radiant Golden Surya with Gentle Pulsing Aura */}
          <motion.div 
            style={{ y: sunY }}
            className="absolute top-6 md:top-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-85"
          >
            <img 
              src="/assets/mandir/sun-v1.webp" 
              alt="Surya" 
              className="w-52 md:w-72 lg:w-96 h-auto drop-shadow-[0_0_90px_rgba(221,164,93,0.85)] animate-pulse"
              style={{ animationDuration: '6s' }}
            />
          </motion.div>

          {/* Soft Drifting Clouds */}
          <motion.div 
            style={{ x: cloudsDrift }}
            className="absolute top-16 md:top-24 w-full z-10 pointer-events-none opacity-40 animate-clouds"
          >
            <img src="/assets/mandir/cloud-v1.webp" alt="Clouds" className="w-full object-cover filter blur-[0.5px]" />
          </motion.div>

          {/* SHARED STAGE CONTAINER: Holds both Ganesha & Names in Centered Alignment */}
          <div className="relative z-30 w-full h-full pointer-events-none">

            {/* ========================================================== */}
            {/* SACRED INVOCATION: GANESHA & SANSKRIT SHLOKA               */}
            {/* Phase 1: Starts in exact center, glides upward on scroll    */}
            {/* ========================================================== */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div 
                style={{ 
                  opacity: ganeshOpacity, 
                  y: ganeshY,
                  scale: ganeshScale 
                }}
                className="w-full max-w-2xl px-4 flex flex-col items-center text-center pointer-events-auto"
              >
                {/* Majestic Antique Gold Ganesha Icon with Welcoming Entrance Animation */}
                <div className="relative flex items-center justify-center my-2 group">
                  {/* Radiant Golden Halo Glow */}
                  <div className="absolute inset-0 -m-4 rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#dda45d]/40 via-[#dda45d]/12 to-transparent blur-2xl pointer-events-none animate-pulse" />
                  
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    <img 
                      id="hero-ganesh-icon"
                      src="/assets/mandir/ganpati-icon-v1.webp" 
                      alt="Lord Ganesha Sacred Invocation" 
                      loading="eager"
                      fetchpriority="high"
                      decoding="sync"
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_10px_25px_rgba(221,164,93,0.5)] filter brightness-110 hover:scale-105 transition-transform duration-300" 
                    />
                  </motion.div>
                </div>
                
                {/* Sacred Mantra in Rozha One Devanagari */}
                <h2 className="font-shloka text-base sm:text-lg md:text-xl font-bold tracking-[0.25em] text-[#3b2046] drop-shadow-sm mt-1">
                  || श्री गणेशाय नमः ||
                </h2>
                
                {/* Classical Sanskrit Shloka */}
                <p className="font-shloka text-xs sm:text-sm text-[#ab5626] font-medium tracking-wide mt-1 max-w-md leading-relaxed">
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
                </p>

                {/* Welcoming Host Message - Gently dissolves as Ganesha glides up */}
                <motion.div 
                  style={{ 
                    opacity: hostMessageOpacity,
                    scale: hostMessageScale
                  }}
                  className="flex flex-col items-center mt-1.5 pointer-events-auto"
                >
                  <div className="flex items-center justify-center gap-2 mb-1.5 opacity-60">
                    <span className="w-16 h-px bg-[#dda45d]" />
                    <span className="text-[#dda45d] text-xs">❖</span>
                    <span className="w-16 h-px bg-[#dda45d]" />
                  </div>
                  <p className="font-digits text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#7d4889] font-bold mb-0.5">
                    With Joy & Deep Gratitude
                  </p>
                  <p className="font-body text-xs md:text-sm text-[#3b2046]/85 max-w-lg mx-auto leading-relaxed">
                    {weddingData.hostMessage}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* ========================================================== */}
            {/* COUPLE NAMES STAGE: EMERGES IN THE EXACT CENTER ON SCROLL   */}
            {/* ========================================================== */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div 
                style={{ 
                  opacity: namesOpacity, 
                  y: namesY,
                  scale: namesScale,
                  filter: namesBlur
                }}
                className="relative w-full max-w-3xl px-4 flex flex-col items-center text-center overflow-visible pointer-events-auto"
              >
                {/* Radiant Golden Backlight Aura behind names */}
                <div className="absolute inset-0 -m-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(221,164,93,0.18)_0%,rgba(221,164,93,0.05)_45%,transparent_70%)] blur-2xl pointer-events-none" />

                {/* Single Semantic H1 for SEO with Accessible Combined Title */}
                <h1 className="sr-only">
                  {weddingData.brideName} weds {weddingData.groomName} — Royal Wedding Invitation
                </h1>

                {/* BRIDE'S NAME: Full Descender Clearance for 'g' in Singh (Enters from Left, Exits to Right) */}
                <motion.div 
                  style={{ x: brideX }}
                  className="relative z-10 my-1 overflow-visible py-1 flex flex-col items-center"
                >
                  <motion.span 
                    style={{ letterSpacing: namesTracking }}
                    className="inline-block font-regal font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#2c1222] via-[#661b32] to-[#ab6524] bg-clip-text text-transparent leading-[1.38] pb-3.5 pt-1 px-4 overflow-visible drop-shadow-[0_4px_16px_rgba(221,164,93,0.30)] hover:brightness-110 transition-all duration-300"
                  >
                    {weddingData.brideName}
                  </motion.span>
                  <p className="font-body text-xs sm:text-sm md:text-base text-[#4b2f5b]/80 italic -mt-0.5 mb-1">
                    Daughter of {weddingData.brideParents}
                  </p>
                </motion.div>

                {/* SACRED CONNECTIVE "weds" */}
                <motion.div 
                  style={{ scale: wedsScale }}
                  className="relative z-10 flex items-center justify-center gap-3 my-1"
                >
                  <span className="w-12 sm:w-20 md:w-28 h-px bg-gradient-to-r from-transparent via-[#dda45d] to-transparent" />
                  <span className="font-script text-2xl sm:text-3xl md:text-4xl text-[#dda45d] font-bold px-2 drop-shadow-sm">
                    weds
                  </span>
                  <span className="w-12 sm:w-20 md:w-28 h-px bg-gradient-to-r from-transparent via-[#dda45d] to-transparent" />
                </motion.div>

                {/* GROOM'S NAME: Full Descender Clearance for 'g' in Singh (Enters from Right, Exits to Left) */}
                <motion.div 
                  style={{ x: groomX }}
                  className="relative z-10 my-1 overflow-visible py-1 flex flex-col items-center"
                >
                  <motion.span 
                    style={{ letterSpacing: namesTracking }}
                    className="inline-block font-regal font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#2c1222] via-[#661b32] to-[#ab6524] bg-clip-text text-transparent leading-[1.38] pb-3.5 pt-1 px-4 overflow-visible drop-shadow-[0_4px_16px_rgba(221,164,93,0.30)] hover:brightness-110 transition-all duration-300"
                  >
                    {weddingData.groomName}
                  </motion.span>
                  <p className="font-body text-xs sm:text-sm md:text-base text-[#4b2f5b]/80 italic -mt-0.5 mb-1">
                    Son of {weddingData.groomParents}
                  </p>
                </motion.div>

                {/* AUSPICIOUS MUHURAT BADGE: Golden Pill with Radiant Pulse */}
                <div className="relative z-10 mt-3 flex flex-col items-center">
                  <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-6 py-2 rounded-full bg-[#5f250f] text-[#dda45d] text-xs sm:text-sm font-digits font-bold tracking-widest border-2 border-[#dda45d] shadow-[0_10px_25px_rgba(95,37,15,0.2)] animate-gold-glow">
                    <span>{weddingData.weddingDateDisplay}</span>
                    <span className="hidden sm:inline text-[#dda45d]">•</span>
                    <span className="text-[#fff0d4] font-shloka font-bold">शुभ मुहूर्त (सात फेरे)</span>
                  </div>

                  <p className="font-body text-xs text-[#ab5626] font-bold tracking-wider mt-1.5">
                    Hotel Adarsh Vatika • Ballia, Uttar Pradesh
                  </p>
                </div>

              </motion.div>
            </div>

          </div>

          {/* Gentle Scroll Cue When Ganesha is Centered */}
          <motion.div 
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-4 sm:bottom-6 z-30 flex flex-col items-center pointer-events-none px-4 text-center max-w-[240px] sm:max-w-none"
          >
            <span className="text-[10px] sm:text-xs font-digits uppercase tracking-[0.25em] text-[#ab5626] font-bold">
              Scroll to unfold invitation
            </span>
            <span className="text-[#dda45d] text-sm animate-bounce mt-1">
              ↓
            </span>
          </motion.div>

        </motion.div>

      </section>

      {/* ============================================================== */}
      {/* 2. SHUBH VIVAH: LAYERED SCROLL TRANSITION SEQUENCE             */}
      {/* ============================================================== */}
      <div className="-mt-[100vh] relative z-20">
        <Mandir3DStage />
      </div>

      {/* ============================================================== */}
      {/* 3. FUNCTIONS: ELEGANT CEREMONIES & CELEBRATIONS                */}
      {/* ============================================================== */}
      <section id="functions" className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-transparent">
        
        {/* Soft Organic Atmospheric Vignette (blends Mandir Stage into Functions) */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent via-[#fbf8f2]/30 to-transparent pointer-events-none" />
        
        {/* Decorative Peacock Pattern */}
        <div 
          className="absolute top-0 inset-x-0 h-96 opacity-15 pointer-events-none bg-top bg-contain bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/mandir/peacock-backdrop-v1.webp)' }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Section Heading: Personal & Elegant Functions */}
          <div className="text-center mb-10">
            <p className="text-xs md:text-sm text-[#7d4889] font-bold mb-1">
              <span className="font-shloka">शुभ उत्सव</span>
              <span className="mx-2 text-[#dda45d]">•</span>
              <span className="font-digits uppercase tracking-[0.2em]">Sacred Celebrations</span>
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#3b2046] tracking-wide">
              Functions
            </h2>
            <p className="font-body text-xs md:text-sm text-[#ab5626] font-semibold mt-1">
              We warmly invite you to share in these joyous occasions at Hotel Adarsh Vatika, Ballia
            </p>
            <img src="/assets/mandir/ornament-band-v1.webp" alt="" className="w-44 h-auto mx-auto mt-2 opacity-75" />
          </div>

          {/* RESPONSIVE 3-CARD GRID: Perfectly Balanced on Mobile (1 col) and Tablet/Desktop (3 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
            {weddingData.events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="h-full flex flex-col"
              >
                <div className="royal-mandir-card royal-border p-6 pt-7 flex flex-col justify-between text-center group cursor-default h-full">
                  <div>
                    {/* Top Arch Emblem with Ceremony Icon - Fully Unclipped & Prominently Framed */}
                    <div className="flex justify-center -mt-12 mb-4">
                      <div className="relative">
                        {/* Ambient Golden Halo Glow */}
                        <div className="absolute inset-0 rounded-full blur-md opacity-40 bg-[#dda45d] group-hover:opacity-95 group-hover:scale-125 transition-all duration-300 pointer-events-none" />
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-[#ffffff] via-[#fdfbf7] to-[#f4effa] border-2 border-[#dda45d] shadow-[0_6px_20px_rgba(171,86,38,0.25)] flex items-center justify-center p-3 group-hover:scale-110 group-hover:border-[#ab5626] group-hover:shadow-[0_8px_25px_rgba(221,164,93,0.5)] transition-all duration-300">
                          {getEventIcon(event.id)}
                        </div>
                      </div>
                    </div>

                  {/* Hindi Devanagari Badge in Rozha One */}
                  {event.hindiTitle && (
                    <span className="font-shloka inline-block px-3 py-1 rounded-full bg-[#dcd0ff]/30 text-[#7d4889] text-xs font-bold mb-2 tracking-normal">
                      {event.hindiTitle}
                    </span>
                  )}

                  {/* English Ceremony Title in Cinzel */}
                  <h3 className="font-display text-2xl font-bold text-[#3b2046] mb-1 min-h-[3.5rem] flex items-center justify-center tracking-wide">
                    {event.title}
                  </h3>

                  {/* Date & Time in Cinzel Digits */}
                  <div className="flex flex-col gap-1 text-xs font-digits text-[#ab5626] font-semibold my-2.5">
                    <span className="flex items-center justify-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#dda45d]" /> {event.date}
                    </span>
                    <span className="flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#dda45d]" /> {event.time}
                    </span>
                  </div>

                  {/* Venue Location */}
                  <p className="font-body text-xs text-[#5f250f]/80 flex items-center justify-center gap-1 my-2">
                    <MapPin className="w-3.5 h-3.5 text-[#dda45d] shrink-0" />
                    <span>{event.venue}</span>
                  </p>

                  {/* Color Swatch Indicator */}
                  {event.colorSwatch && (
                    <div className="flex items-center justify-center gap-1.5 my-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#dda45d]/40 text-[11px] font-body text-[#5f250f] max-w-xs mx-auto">
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-sm inline-block shrink-0" 
                        style={{ backgroundColor: event.colorSwatch.hex }}
                      />
                      <span className="truncate">{event.colorSwatch.name}</span>
                    </div>
                  )}

                  {/* Description in Marcellus */}
                  <p className="font-body text-xs text-[#5f250f]/75 leading-relaxed my-2.5 px-1">
                    {event.description}
                  </p>

                  {/* Expandable Rituals Breakdown */}
                  {event.rituals && event.rituals.length > 0 && (
                    <div className="my-2 border-t border-[#dda45d]/20 pt-2 text-left">
                      <button
                        type="button"
                        onClick={() => toggleRitual(event.id)}
                        className="w-full flex items-center justify-between text-[11px] font-bold text-[#ab5626] font-body hover:text-[#5f250f] transition-colors py-1 cursor-pointer focus:outline-none"
                      >
                        <span>🌸 Sacred Rituals ({event.rituals.length})</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${expandedRituals[event.id] ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {expandedRituals[event.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden space-y-1.5 pt-1.5 pb-2"
                          >
                            {event.rituals.map((r, rIdx) => (
                              <div key={rIdx} className="text-[11px] text-[#5f250f]/80 pl-2.5 border-l-2 border-[#dda45d] font-body">
                                {r}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div>
                  {/* Attire / Dress Code Badge */}
                  {event.dressCode && (
                    <div className="inline-block px-3 py-1 rounded-lg bg-white/70 backdrop-blur-sm border border-[#dda45d]/40 text-[11px] text-[#5f250f] font-body mb-3">
                      <strong className="text-[#ab5626]">Attire:</strong> {event.dressCode}
                    </div>
                  )}

                  {/* Action Buttons: Add to Calendar & Copy Details */}
                  <div className="flex items-center justify-center gap-2 pt-1">
                    <a
                      href={buildGoogleCalendarUrl(event, weddingData.brideName, weddingData.groomName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#dda45d] bg-[#fbf5eb] font-digits text-[11px] uppercase tracking-wider text-[#5f250f] font-bold shadow-sm hover:scale-105 active:scale-95 hover:bg-[#dda45d] hover:text-[#5f250f] hover:shadow-md transition-all duration-200"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#ab5626]" />
                      <span>Calendar</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyEventDetails(event)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#dda45d]/60 bg-[#fbf5eb] font-digits text-[11px] uppercase tracking-wider text-[#5f250f] font-bold shadow-sm hover:scale-105 active:scale-95 hover:border-[#dda45d] hover:bg-[#ffffff] hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      {copiedId === event.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#ab5626]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. OUR JOURNEY OF LOVE: ANIMATED VISUAL (NO STATIC PHOTO)      */}
      {/* ============================================================== */}
      <section id="journey" className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-transparent">
        
        {/* Soft Ambient Radial Atmosphere */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70vw] max-w-[700px] h-[50vh] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#dda45d]/12 via-[#dcd0ff]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          
          <div className="text-center mb-8">
            <p className="font-digits text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#7d4889] font-bold mb-1">
              Two Hearts, One Soul
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3b2046]">
              Our Journey of Love
            </h2>
            <img src="/assets/mandir/countdown-divider-v1.webp" alt="" className="w-36 h-auto mx-auto mt-2 opacity-75" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Custom Animated Medallion Visual */}
            <div className="flex flex-col items-center">
              <AnimatedJourneyVisual />
            </div>

            {/* Right: Narrative Card in CSS */}
            <div className="royal-mandir-card royal-border p-6 md:p-8 text-left">
              <h4 className="font-display text-lg md:text-xl font-bold text-[#5f250f] mb-3">
                A Vow of Togetherness
              </h4>
              <p className="font-body text-xs md:text-sm leading-relaxed text-[#5f250f]/85 italic mb-4">
                "Our hearts are full and our smiles wide! We are ready to make memories that last a lifetime, and our celebrations will be truly blessed by your presence in Ballia. Come join the Haldi, Mehndi, and Barat, and dance with us as we tie the sacred knot!"
              </p>
              <p className="font-script text-lg text-[#ab5626] text-right font-bold">
                — With Warmest Love, Veena & Vishal
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. COUNTDOWN, VENUE & GUEST CONCIERGE (ADAPTIVE GRID)          */}
      {/* ============================================================== */}
      <section id="venue-rsvp" className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-transparent">
        
        {/* Soft Ambient Gold Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80vw] max-w-[800px] h-[55vh] rounded-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#dda45d]/10 via-[#dcd0ff]/10 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Live Auspicious Countdown Ticker to 30 Nov 2026 */}
          <div className="text-center mb-12">
            <p className="font-digits text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#7d4889] font-bold mb-1">
              The Sacred Countdown
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#3b2046] mb-2">
              Until the Sacred Phere Begins
            </h3>
            <img src="/assets/mandir/countdown-divider-v1.webp" alt="" className="w-44 h-auto mx-auto mb-6 opacity-75" />

            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
              {[
                { label: 'DAYS', hindi: 'दिन', val: timeLeft.days, isSec: false },
                { label: 'HOURS', hindi: 'घंटे', val: timeLeft.hours, isSec: false },
                { label: 'MINUTES', hindi: 'मिनट', val: timeLeft.minutes, isSec: false },
                { label: 'SECONDS', hindi: 'सेकंड', val: timeLeft.seconds, isSec: true }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`p-3 sm:p-4 rounded-2xl bg-white/85 backdrop-blur-sm border border-[#dda45d]/60 shadow-[0_4px_15px_rgba(95,37,15,0.06)] relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(221,164,93,0.35)] hover:border-[#dda45d] hover:bg-white cursor-default ${
                    item.isSec ? 'animate-gold-glow' : ''
                  }`}
                >
                  <span className="block font-digits text-2xl sm:text-3xl md:text-4xl font-bold text-[#5f250f]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col items-center mt-1">
                    <span className="font-digits text-[10px] sm:text-xs font-bold text-[#ab5626] leading-none">
                      {item.label}
                    </span>
                    <span className="font-shloka text-[9px] sm:text-[10px] text-[#5f250f]/60 font-semibold mt-0.5">
                      {item.hindi}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Venue Direction & Concierge */}
          <div className="max-w-2xl mx-auto">
            <div className="royal-mandir-card royal-border p-6 md:p-8 text-center">
              <h3 className="font-display text-xl md:text-2xl font-bold text-[#5f250f] mb-1">
                {weddingData.venueName}
              </h3>
              <p className="font-body text-xs md:text-sm text-[#5f250f]/80 mb-5">
                {weddingData.venueAddress}
              </p>
              
              <a
                href={weddingData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#5f250f] text-[#dda45d] font-digits font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all mb-6"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Open in Google Maps</span>
              </a>

              {/* Guest Concierge Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#dda45d]/30 text-center max-w-md mx-auto">
                <div className="p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#dda45d]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-[#dda45d] cursor-default">
                  <img src="/assets/mandir/icon-parking-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                  <span className="font-display text-xs font-bold text-[#5f250f] block">Parking</span>
                  <span className="font-body text-[10px] text-[#5f250f]/70">Available at Venue</span>
                </div>
                <div className="p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-[#dda45d]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-[#dda45d] cursor-default">
                  <img src="/assets/mandir/icon-weather-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                  <span className="font-display text-xs font-bold text-[#5f250f] block">Ballia Weather</span>
                  <span className="font-body text-[10px] text-[#5f250f]/70">Pleasant (18°C - 23°C)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sacred Blessing Wall */}
          <div id="blessings" className="mt-8 mb-24 royal-mandir-card-static royal-border p-6 md:p-8 text-left">
            <h3 className="font-display text-xl font-bold text-[#5f250f] mb-1 text-center">
              Sacred Blessing Wall
            </h3>
            <p className="font-body text-xs text-[#5f250f]/70 text-center mb-4">
              Leave your sacred blessings & heartfelt wishes for Veena & Vishal
            </p>

            {/* Quick-Pick Auspicious Blessing Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 max-w-xl mx-auto">
              {[
                '॥ सदा सुहागन रहो ॥ 🌸',
                'Infinite blessings to Veena & Vishal! ✨',
                'Warmest wishes from Ballia! 🪔',
                'May Mahadev shower eternal joy! ❤️'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setBMsg(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-[#dda45d]/40 text-[10px] font-body text-[#5f250f] hover:bg-[#dda45d]/20 hover:border-[#dda45d] transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleBlessingSubmit} className="space-y-3 mb-6 max-w-lg mx-auto">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-[#dda45d]/50 font-body text-base sm:text-sm text-[#5f250f] focus:outline-none focus:ring-2 focus:ring-[#dda45d]"
              />
              <textarea
                rows={2}
                required
                placeholder="Your Sacred Blessing or Message..."
                value={bMsg}
                onChange={(e) => setBMsg(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-[#dda45d]/50 font-body text-base sm:text-sm text-[#5f250f] focus:outline-none focus:ring-2 focus:ring-[#dda45d] resize-none"
              />
              <div className="flex justify-between items-center">
                {bSent && <span className="font-body text-xs text-[#ab5626] font-bold">Blessing posted with joy!</span>}
                {bError && <span className="font-body text-xs text-rose-700 font-bold">{bError}</span>}
                <button
                  type="submit"
                  disabled={bSending}
                  className="ml-auto inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#5f250f] text-[#dda45d] font-digits text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{bSending ? 'Posting…' : 'Post Blessing'}</span>
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {blessings.map((b) => (
                <div key={b.id} className="group relative p-3.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#dda45d]/30 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#dda45d]/60 hover:shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-display text-xs font-bold text-[#5f250f]">{b.name}</span>
                    <span className="font-digits text-[10px] text-[#5f250f]/50">{b.timestamp}</span>
                  </div>
                  <p className="font-body text-xs italic text-[#5f250f]/80">"{b.message}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. ROYAL MANDIR FOOTER (SEAMLESS ATMOSPHERIC TRANSITION)       */}
      {/* ============================================================== */}
      <footer className="relative pt-20 pb-12 text-center text-white overflow-hidden">
        {/* Continuous ombre background from soft parchment canvas into royal twilight purple */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#251336]/90 to-[#1b0e27] pointer-events-none" />
        
        {/* Soft Golden Shimmer Divider Line */}
        <div className="relative z-10 w-48 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#dda45d] to-transparent mb-8 opacity-80" />

        <div className="relative z-10">
          <img src="/assets/mandir/ganpati-icon-v1.webp" alt="Lord Ganesha" className="w-10 h-10 mx-auto mb-2 filter brightness-150 drop-shadow-[0_4px_12px_rgba(221,164,93,0.5)]" />
          <p className="font-shloka text-xs text-[#dda45d] tracking-widest font-bold">
            || ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ||
          </p>
          <p className="font-body text-[11px] text-[#dcd0ff]/80 mt-1">
            Veena Singh & Vishal Singh Wedding • Hotel Adarsh Vatika, Ballia • {weddingData.hashtag}
          </p>
        </div>
      </footer>

    </div>
  );
};
