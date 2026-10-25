import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { weddingData, initialBlessings } from '../data/weddingData';
import { 
  Navigation, 
  Calendar, 
  Send, 
  CheckCircle2, 
  MessageSquareShare, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Sparkles,
  Sun,
  Flame,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mandir3DStage } from './Mandir3DStage';
import { AnimatedJourneyVisual } from './AnimatedJourneyVisual';

export const MandirFullCanvas: React.FC = () => {
  // Scrollytelling scroll tracking for Couple Names & Parallax Layers
  const { scrollY } = useScroll();

  // Individual Scrollytelling Parallax for Hero Text Elements:
  // Bride Name drifts gently
  const brideX = useTransform(scrollY, [0, 600], [0, -25]);
  const brideOpacity = useTransform(scrollY, [0, 600], [1, 0.9]);

  // Groom Name drifts gently
  const groomX = useTransform(scrollY, [0, 600], [0, 25]);
  const groomOpacity = useTransform(scrollY, [0, 600], [1, 0.9]);

  // Invocation & Host Message
  const headerY = useTransform(scrollY, [0, 600], [0, -20]);
  const headerOpacity = useTransform(scrollY, [0, 600], [1, 0.95]);

  // Connective "weds"
  const wedsScale = useTransform(scrollY, [0, 600], [1, 0.98]);
  const wedsOpacity = useTransform(scrollY, [0, 600], [1, 0.95]);

  // Muhurat Badge
  const muhuratY = useTransform(scrollY, [0, 600], [0, -15]);
  const muhuratOpacity = useTransform(scrollY, [0, 600], [1, 0.95]);

  // Background Sun & Clouds parallax
  const sunY = useTransform(scrollY, [0, 600], [0, 40]);
  const cloudsDrift = useTransform(scrollY, [0, 600], [0, 50]);

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

  // Blessing Wall State
  const [blessings, setBlessings] = useState(initialBlessings);
  const [bName, setBName] = useState('');
  const [bMsg, setBMsg] = useState('');
  const [bSent, setBSent] = useState(false);
  const handleBlessingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName.trim() || !bMsg.trim()) return;
    confetti({ 
      particleCount: 75, 
      spread: 70, 
      origin: { y: 0.8 }, 
      colors: ['#dda45d', '#e67e22', '#e74c3c'] 
    });
    setBlessings([
      { id: Date.now().toString(), name: bName.trim(), relation: 'Guest', message: bMsg.trim(), timestamp: 'Just now' },
      ...blessings
    ]);
    setBName('');
    setBMsg('');
    setBSent(true);
    setTimeout(() => setBSent(false), 4000);
  };

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState<'attending' | 'declined'>('attending');
  const [rsvpGuests, setRsvpGuests] = useState('2');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    if (rsvpAttending === 'attending') {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
    }
    setRsvpSubmitted(true);
  };

  const handleWhatsAppRsvp = () => {
    const text = encodeURIComponent(
      `Namaste! RSVP for Veena & Vishal's Wedding (${weddingData.hashtag}):\nName: ${rsvpName || 'Guest'}\nAttendance: ${rsvpAttending === 'attending' ? 'Attending with joy' : 'Unable to attend'}\nGuests: ${rsvpGuests}\nVenue: Hotel Adarsh Vatika, Ballia`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Specialized auspicious ceremony icon
  const getEventIcon = (id: string) => {
    switch (id) {
      case 'haldi':
        return <Sun className="w-6 h-6 text-[#dda45d]" />;
      case 'mehendi':
        return <Sparkles className="w-6 h-6 text-[#dda45d]" />;
      case 'vivaah':
        return <Flame className="w-6 h-6 text-[#dda45d]" />;
      default:
        return <Heart className="w-6 h-6 text-[#dda45d]" />;
    }
  };

  return (
    <div className="w-full bg-[#fbf5eb] text-[#5f250f] min-h-screen overflow-x-hidden selection:bg-[#dda45d]/40">
      
      {/* ============================================================== */}
      {/* 1. BESPOKE ROYAL HERO: NO BOX, BOLD TYPOGRAPHY, INDEPENDENT FX */}
      {/* ============================================================== */}
      <section 
        className="relative w-full overflow-hidden pt-6 md:pt-10 pb-4 flex flex-col items-center justify-between min-h-[96vh] md:min-h-screen"
        style={{
          background: 'radial-gradient(ellipse at 50% 25%, rgba(254, 243, 199, 0.8) 0%, rgba(251, 245, 235, 0.95) 60%, #fbf5eb 100%)'
        }}
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

        {/* ========================================================== */}
        {/* SACRED INVOCATION: GANESHA & SANSKRIT SHLOKA               */}
        {/* ========================================================== */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 w-full max-w-2xl px-4 flex flex-col items-center text-center"
        >
          {/* Majestic Antique Gold Ganesha Icon with Welcoming Entrance Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: -25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center my-3 group"
          >
            {/* Radiant Golden Halo Glow */}
            <div className="absolute inset-0 -m-4 rounded-full bg-radial from-[#dda45d]/40 via-[#dda45d]/12 to-transparent blur-2xl pointer-events-none animate-pulse" />
            
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <img 
                src="/assets/mandir/ganpati-icon-v1.webp" 
                alt="Lord Ganesha" 
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain drop-shadow-[0_10px_25px_rgba(221,164,93,0.5)] filter brightness-110 hover:scale-105 transition-transform duration-300" 
              />
            </motion.div>
          </motion.div>
          
          {/* Sacred Mantra in Rozha One Devanagari */}
          <h2 className="font-shloka text-base md:text-xl font-bold tracking-[0.25em] text-[#5f250f] drop-shadow-sm mt-1">
            || श्री गणेशाय नमः ||
          </h2>
          
          {/* Classical Sanskrit Shloka */}
          <p className="font-shloka text-xs md:text-sm text-[#ab5626] font-medium tracking-wide mt-1 max-w-md leading-relaxed">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>

          <div className="flex items-center justify-center gap-2 my-2 opacity-60">
            <span className="w-16 h-px bg-[#dda45d]" />
            <span className="text-[#dda45d] text-xs">❖</span>
            <span className="w-16 h-px bg-[#dda45d]" />
          </div>

          {/* Salutation Message in Literary Serif (Marcellus) */}
          <p className="font-digits text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#ab5626] font-bold mb-1">
            With Joy & Deep Gratitude
          </p>
          <p className="font-body text-xs md:text-sm text-[#5f250f]/85 max-w-lg mx-auto leading-relaxed">
            {weddingData.hostMessage}
          </p>
        </motion.div>

        {/* ========================================================== */}
        {/* COUPLE NAMES STAGE: NO BOX, BOLD MAJESTIC TYPOGRAPHY       */}
        {/* ========================================================== */}
        <div className="relative z-30 w-full max-w-4xl mx-auto my-3 md:my-5 px-4 text-center">
          
          {/* BRIDE'S NAME: Slides in from Left, Dissolves to Left on Scroll */}
          <motion.div
            style={{ x: brideX, opacity: brideOpacity }}
            initial={{ opacity: 0, x: -80, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="my-1"
          >
            <h1 className="font-regal font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#5f250f] tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(95,37,15,0.18)] hover:text-[#ab5626] transition-colors duration-300">
              {weddingData.brideName}
            </h1>
            <p className="font-body text-xs sm:text-sm md:text-base text-[#5f250f]/75 italic mt-1">
              Daughter of {weddingData.brideParents}
            </p>
          </motion.div>

          {/* SACRED CONNECTIVE "weds": Blooms and Spins In */}
          <motion.div
            style={{ scale: wedsScale, opacity: wedsOpacity }}
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.0, delay: 0.55, type: 'spring', bounce: 0.3 }}
            className="flex items-center justify-center gap-3 my-2"
          >
            <span className="w-16 sm:w-28 md:w-36 h-px bg-gradient-to-r from-transparent via-[#dda45d] to-transparent" />
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[#dda45d] font-bold px-2 drop-shadow-sm">
              weds
            </span>
            <span className="w-16 sm:w-28 md:w-36 h-px bg-gradient-to-r from-transparent via-[#dda45d] to-transparent" />
          </motion.div>

          {/* GROOM'S NAME: Slides in from Right, Dissolves to Right on Scroll */}
          <motion.div
            style={{ x: groomX, opacity: groomOpacity }}
            initial={{ opacity: 0, x: 80, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="my-1"
          >
            <h1 className="font-regal font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#5f250f] tracking-tight leading-none drop-shadow-[0_4px_16px_rgba(95,37,15,0.18)] hover:text-[#ab5626] transition-colors duration-300">
              {weddingData.groomName}
            </h1>
            <p className="font-body text-xs sm:text-sm md:text-base text-[#5f250f]/75 italic mt-1">
              Son of {weddingData.groomParents}
            </p>
          </motion.div>

          {/* AUSPICIOUS MUHURAT BADGE: Golden Pill with Radiant Pulse */}
          <motion.div
            style={{ y: muhuratY, opacity: muhuratOpacity }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0, ease: 'easeOut' }}
            className="mt-5 flex flex-col items-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-7 py-2.5 rounded-full bg-[#5f250f] text-[#dda45d] text-xs sm:text-sm font-digits font-bold tracking-widest border-2 border-[#dda45d] shadow-[0_10px_25px_rgba(95,37,15,0.2)] animate-gold-glow">
              <span>{weddingData.weddingDateDisplay}</span>
              <span className="hidden sm:inline text-[#dda45d]">•</span>
              <span className="text-[#fff0d4] font-shloka font-bold">शुभ मुहूर्त (सात फेरे)</span>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#ab5626] font-bold tracking-wider mt-2">
              Hotel Adarsh Vatika • Ballia, Uttar Pradesh
            </p>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-2 flex flex-col items-center text-[#5f250f]">
          <span className="font-digits text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-0.5">
            Scroll to Enter the Sacred Mandir
          </span>
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce text-[#ab5626]" />
        </div>

      </section>

      {/* ============================================================== */}
      {/* 2. SHUBH VIVAH: LAYERED SCROLL TRANSITION SEQUENCE             */}
      {/* ============================================================== */}
      <Mandir3DStage />

      {/* ============================================================== */}
      {/* 3. FUNCTIONS: ELEGANT CEREMONIES & CELEBRATIONS                */}
      {/* ============================================================== */}
      <section className="relative w-full py-12 md:py-16 px-4 md:px-8 bg-[#fdfaf4] border-t border-[#dda45d]/20">
        
        {/* Decorative Peacock Pattern */}
        <div 
          className="absolute top-0 inset-x-0 h-96 opacity-15 pointer-events-none bg-top bg-contain bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/mandir/peacock-backdrop-v1.webp)' }} 
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Section Heading: Personal & Elegant Functions */}
          <div className="text-center mb-10">
            <p className="font-shloka text-xs md:text-sm uppercase tracking-[0.25em] text-[#ab5626] font-bold mb-1">
              शुभ उत्सव • Auspicious Celebrations
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#5f250f] tracking-wide">
              Functions
            </h2>
            <p className="font-body text-xs md:text-sm text-[#ab5626] font-semibold mt-1">
              We warmly invite you to share in these joyous occasions at Hotel Adarsh Vatika, Ballia
            </p>
            <img src="/assets/mandir/ornament-band-v1.webp" alt="" className="w-44 h-auto mx-auto mt-2 opacity-75" />
          </div>

          {/* RESPONSIVE 3-CARD GRID: Perfectly Balanced on Mobile (1 col) and Tablet/Desktop (3 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {weddingData.events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="royal-mandir-card royal-border p-6 flex flex-col justify-between text-center group"
              >
                <div>
                  {/* Top Arch Emblem with Ceremony Icon */}
                  <div className="flex justify-center -mt-11 mb-3">
                    <div className="w-13 h-13 rounded-full bg-[#fbf5eb] border-2 border-[#dda45d] shadow-md flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform">
                      {getEventIcon(event.id)}
                    </div>
                  </div>

                  {/* Hindi Devanagari Badge in Rozha One */}
                  {event.hindiTitle && (
                    <span className="font-shloka inline-block px-3 py-1 rounded-full bg-[#dda45d]/15 text-[#ab5626] text-xs font-bold mb-2">
                      {event.hindiTitle}
                    </span>
                  )}

                  {/* English Ceremony Title in Rozha One / Cinzel */}
                  <h3 className="font-shloka text-2xl font-bold text-[#5f250f] mb-1">
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

                  {/* Description in Marcellus */}
                  <p className="font-body text-xs text-[#5f250f]/75 leading-relaxed my-3 px-1">
                    {event.description}
                  </p>
                </div>

                <div>
                  {/* Attire / Dress Code Badge */}
                  {event.dressCode && (
                    <div className="inline-block px-3 py-1 rounded-lg bg-[#fbf5eb] border border-[#dda45d]/30 text-[11px] text-[#5f250f] font-body mb-4">
                      <strong className="text-[#ab5626]">Attire:</strong> {event.dressCode}
                    </div>
                  )}

                  {/* Add to Calendar Button with Gold Accents */}
                  <div>
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + ' - ' + weddingData.brideName + ' & ' + weddingData.groomName)}&location=${encodeURIComponent(event.venue)}&details=${encodeURIComponent(event.description)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dda45d] bg-[#fbf5eb] font-digits text-xs uppercase tracking-wider text-[#5f250f] font-bold shadow-sm hover:bg-[#dda45d] hover:text-[#5f250f] transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#ab5626]" />
                      <span>Add to Calendar</span>
                    </a>
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
      <section className="relative w-full py-12 md:py-16 px-4 md:px-8 bg-[#fbf5eb] border-t border-[#dda45d]/20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-8">
            <p className="font-digits text-[11px] md:text-xs uppercase tracking-[0.3em] text-[#ab5626] font-bold mb-1">
              Two Hearts, One Soul
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#5f250f]">
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
      <section className="relative w-full py-12 md:py-16 px-4 md:px-8 bg-[#fdfaf4] border-t border-[#dda45d]/20">
        <div className="max-w-4xl mx-auto">
          
          {/* Live Auspicious Countdown Ticker to 30 Nov 2026 */}
          <div className="text-center mb-12">
            <p className="font-digits text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-bold mb-1">
              The Auspicious Countdown
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#5f250f] mb-2">
              Until the Sacred Phere Begins
            </h3>
            <img src="/assets/mandir/countdown-divider-v1.webp" alt="" className="w-44 h-auto mx-auto mb-6 opacity-75" />

            <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
              {[
                { label: 'DAYS', val: timeLeft.days },
                { label: 'HOURS', val: timeLeft.hours },
                { label: 'MINUTES', val: timeLeft.minutes },
                { label: 'SECONDS', val: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="p-3 md:p-4 rounded-2xl bg-white border border-[#dda45d] shadow-sm">
                  <span className="block font-digits text-2xl md:text-3xl font-bold text-[#5f250f]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="font-digits text-[10px] md:text-xs font-bold text-[#ab5626]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TWO-COLUMN GRID: Venue Direction & WhatsApp RSVP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Venue & Concierge */}
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
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#dda45d]/30 text-center">
                <div className="p-3 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
                  <img src="/assets/mandir/icon-parking-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                  <span className="font-display text-xs font-bold text-[#5f250f] block">Parking</span>
                  <span className="font-body text-[10px] text-[#5f250f]/70">Available at Venue</span>
                </div>
                <div className="p-3 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
                  <img src="/assets/mandir/icon-weather-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                  <span className="font-display text-xs font-bold text-[#5f250f] block">Ballia Weather</span>
                  <span className="font-body text-[10px] text-[#5f250f]/70">Pleasant (18°C - 23°C)</span>
                </div>
              </div>
            </div>

            {/* Right: WhatsApp RSVP */}
            <div className="royal-mandir-card royal-border p-6 md:p-8 text-left">
              <h3 className="font-display text-lg md:text-xl font-bold text-[#5f250f] mb-1 text-center">
                RSVP via WhatsApp
              </h3>
              <p className="font-body text-xs text-[#5f250f]/70 text-center mb-4">
                Kindly respond by 20th November 2026
              </p>

              {rsvpSubmitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#dda45d] mx-auto mb-2" />
                  <p className="font-display text-sm font-bold text-[#5f250f]">Thank you, {rsvpName}!</p>
                  <p className="font-body text-xs text-[#5f250f]/80 mt-1 mb-4">Your RSVP is saved.</p>
                  <button
                    type="button"
                    onClick={handleWhatsAppRsvp}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-digits text-xs font-bold uppercase tracking-wider shadow hover:scale-105 active:scale-95 transition-transform"
                  >
                    <MessageSquareShare className="w-4 h-4" />
                    <span>Confirm on WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 font-body text-xs text-[#5f250f] focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 font-body text-xs text-[#5f250f] focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('attending')}
                      className={`py-2 rounded-xl font-digits text-xs font-bold uppercase ${
                        rsvpAttending === 'attending' ? 'bg-[#5f250f] text-[#dda45d]' : 'bg-[#fbf5eb] text-[#5f250f]/70'
                      }`}
                    >
                      Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('declined')}
                      className={`py-2 rounded-xl font-digits text-xs font-bold uppercase ${
                        rsvpAttending === 'declined' ? 'bg-[#8b1d24] text-white' : 'bg-[#fbf5eb] text-[#5f250f]/70'
                      }`}
                    >
                      Decline
                    </button>
                  </div>
                  {rsvpAttending === 'attending' && (
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 font-body text-xs text-[#5f250f] focus:outline-none"
                    >
                      <option value="1">1 Guest (Just me)</option>
                      <option value="2">2 Guests (Couple)</option>
                      <option value="3+">3+ (Family)</option>
                    </select>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#5f250f] text-[#dda45d] font-digits text-xs font-bold uppercase tracking-widest shadow-md hover:scale-[1.01] transition-transform"
                  >
                    Submit RSVP
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Blessing Wall */}
          <div className="mt-8 royal-mandir-card royal-border p-6 md:p-8 text-left">
            <h3 className="font-display text-xl font-bold text-[#5f250f] mb-1 text-center">
              Sacred Blessing Wall
            </h3>
            <p className="font-body text-xs text-[#5f250f]/70 text-center mb-5">
              Leave your auspicious prayers & heartfelt wishes for Veena & Vishal
            </p>

            <form onSubmit={handleBlessingSubmit} className="space-y-3 mb-6 max-w-lg mx-auto">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 font-body text-xs text-[#5f250f] focus:outline-none"
              />
              <textarea
                rows={2}
                required
                placeholder="Your Sacred Blessing or Message..."
                value={bMsg}
                onChange={(e) => setBMsg(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 font-body text-xs text-[#5f250f] focus:outline-none resize-none"
              />
              <div className="flex justify-between items-center">
                {bSent && <span className="font-body text-xs text-[#ab5626] font-bold">Blessing posted with joy!</span>}
                <button
                  type="submit"
                  className="ml-auto inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#5f250f] text-[#dda45d] font-digits text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Blessing</span>
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {blessings.map((b) => (
                <div key={b.id} className="p-3.5 rounded-2xl bg-[#fbf5eb] border border-[#dda45d]/30 text-left">
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
      {/* 6. ROYAL MANDIR FOOTER                                         */}
      {/* ============================================================== */}
      <footer className="py-8 text-center bg-[#5f250f] text-white border-t-2 border-[#dda45d]">
        <img src="/assets/mandir/ganpati-icon-v1.webp" alt="Lord Ganesha" className="w-10 h-10 mx-auto mb-2 filter brightness-150" />
        <p className="font-shloka text-xs text-[#dda45d] tracking-widest font-bold">
          || ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ||
        </p>
        <p className="font-body text-[11px] text-white/70 mt-1">
          Veena Singh & Vishal Singh Wedding • Hotel Adarsh Vatika, Ballia • {weddingData.hashtag}
        </p>
      </footer>

    </div>
  );
};
