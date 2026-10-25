import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { weddingData, initialBlessings } from '../data/weddingData';
import { soundManager } from '../utils/sound';
import { 
  Navigation, 
  Calendar, 
  Heart, 
  Send, 
  CheckCircle2, 
  MessageSquareShare, 
  Clock, 
  MapPin, 
  ChevronDown, 
  Sparkles,
  Sun,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MandirFullCanvas: React.FC = () => {
  // Scrollytelling scroll tracking for Couple Names & Parallax Layers
  const { scrollY } = useScroll();

  // Couple names transition: Appear on load, smoothly dissolve & lift as user scrolls away
  const heroOpacity = useTransform(scrollY, [0, 260], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 260], [1, 0.94]);
  const heroTranslateY = useTransform(scrollY, [0, 260], [0, -35]);

  // Multi-layered Parallax depth: Temple rises, Sun drifts gently, Clouds slide
  const templeTranslateY = useTransform(scrollY, [0, 400], [0, -30]);
  const sunTranslateY = useTransform(scrollY, [0, 400], [0, 20]);
  const cloudsTranslateX = useTransform(scrollY, [0, 400], [0, 25]);

  // Bell chime & celebratory confetti
  const [bellRinging, setBellRinging] = useState(false);
  const ringBell = () => {
    soundManager.playBellChime();
    setBellRinging(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#dda45d', '#e67e22', '#f39c12', '#e74c3c']
    });
    setTimeout(() => setBellRinging(false), 900);
  };

  // Countdown calculation
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
      particleCount: 70, 
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
      {/* 1. HERO SCENE: MULTI-LAYER SCROLLYTELLING STAGE                */}
      {/* ============================================================== */}
      <section className="relative w-full overflow-hidden bg-[#fbf5eb] pt-2 md:pt-6 pb-2 flex flex-col items-center justify-between min-h-[95vh] md:min-h-screen">
        
        {/* Layer 1: Sky Backdrop */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-90"
          style={{ backgroundImage: 'url(/assets/mandir/sky-v1.webp)' }}
        />

        {/* Layer 2: Radiant Golden Sun with Parallax */}
        <motion.div 
          style={{ y: sunTranslateY }}
          className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-85"
        >
          <img 
            src="/assets/mandir/sun-v1.webp" 
            alt="Surya" 
            className="w-48 md:w-72 lg:w-96 h-auto drop-shadow-[0_0_60px_rgba(221,164,93,0.7)] animate-pulse"
            style={{ animationDuration: '6s' }}
          />
        </motion.div>

        {/* Layer 3: Distant Mountain Silhouette */}
        <div className="absolute top-36 md:top-52 w-full z-10 pointer-events-none opacity-45">
          <img src="/assets/mandir/mountain-v1.webp" alt="Mountains" className="w-full object-cover max-h-48 md:max-h-64" />
        </div>

        {/* Layer 4: Floating Clouds with Parallax Drift */}
        <motion.div 
          style={{ x: cloudsTranslateX }}
          className="absolute top-24 md:top-36 w-full z-10 pointer-events-none opacity-70 animate-clouds"
        >
          <img src="/assets/mandir/cloud-v1.webp" alt="Clouds" className="w-full object-cover" />
        </motion.div>

        {/* Layer 5: Top Temple Arch with Interactive Bells */}
        <div className="relative z-30 w-full max-w-lg md:max-w-xl pt-2 px-4 flex flex-col items-center">
          <img src="/assets/mandir/bell-arch-v1.webp" alt="Arch" className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain drop-shadow" />
          
          <div className="w-full max-w-xs md:max-w-sm -mt-2 md:-mt-4 flex justify-between px-6 md:px-10 items-start">
            <button 
              type="button" 
              onClick={ringBell} 
              title="Tap to ring temple bell" 
              className="cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-95"
            >
              <img 
                src="/assets/mandir/bell-a-v1.png" 
                alt="Bell" 
                className={`w-8 md:w-11 h-auto animate-swing-left drop-shadow ${bellRinging ? 'scale-125' : ''}`} 
              />
            </button>
            
            {/* Sacred Ganesha Invocation */}
            <div className="flex flex-col items-center">
              <img src="/assets/mandir/ganpati-icon-v1.webp" alt="Ganesha" className="w-11 h-11 md:w-15 md:h-15 object-contain drop-shadow" />
              <span className="text-[#5f250f] text-xs md:text-sm font-serif font-bold tracking-widest mt-1">
                || श्री गणेशाय नमः ||
              </span>
              <img src="/assets/mandir/shri-line-v1.webp" alt="" className="w-32 md:w-44 h-auto opacity-75 mt-0.5" />
            </div>

            <button 
              type="button" 
              onClick={ringBell} 
              title="Tap to ring temple bell" 
              className="cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-95"
            >
              <img 
                src="/assets/mandir/bell-b-v1.png" 
                alt="Bell" 
                className={`w-8 md:w-11 h-auto animate-swing-right drop-shadow ${bellRinging ? 'scale-125' : ''}`} 
              />
            </button>
          </div>
        </div>

        {/* Layer 6: Dynamic Scrollytelling Couple Hero Card */}
        {/* Entrance: Springs in. Exit: Dissolves & lifts gracefully on scroll */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroTranslateY }}
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="relative z-30 w-11/12 max-w-lg md:max-w-xl mx-auto my-3 md:my-4 text-center px-6 md:px-10 py-5 md:py-7 rounded-3xl bg-white/95 border-2 border-[#dda45d] shadow-[0_15px_40px_rgba(95,37,15,0.12)] backdrop-blur-sm"
        >
          {/* Top Peacock Ornament */}
          <div className="flex justify-center -mt-10 md:-mt-12 mb-1">
            <img src="/assets/mandir/peacock-ornament-v1.webp" alt="" className="w-12 md:w-15 h-auto drop-shadow" />
          </div>

          <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
            With Joy & Deep Gratitude
          </p>
          <p className="text-xs md:text-sm text-[#5f250f]/85 font-serif leading-relaxed mb-2">
            {weddingData.hostMessage}
          </p>

          {/* Calligraphy Names */}
          <div className="my-1">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl text-[#5f250f] tracking-wide" 
              style={{ fontFamily: 'var(--mandir-script)' }}
            >
              {weddingData.brideName}
            </h1>

            <span className="inline-block my-0.5 text-2xl md:text-3xl text-[#dda45d] font-bold" style={{ fontFamily: 'var(--mandir-script)' }}>
              weds
            </span>

            <h1 
              className="text-5xl sm:text-6xl md:text-7xl text-[#5f250f] tracking-wide" 
              style={{ fontFamily: 'var(--mandir-script)' }}
            >
              {weddingData.groomName}
            </h1>
          </div>

          {/* Auspicious Muhurat Pill */}
          <div className="inline-block px-5 py-2 rounded-full bg-[#5f250f] text-[#dda45d] text-xs md:text-sm font-serif font-bold tracking-wider shadow-sm mt-2">
            {weddingData.weddingDateDisplay} • शुभ मुहूर्त
          </div>

          {/* Fluttering Saffron Temple Flag */}
          <div className="absolute -top-6 md:-top-8 -right-2 md:-right-3 flex items-start pointer-events-none">
            <img src="/assets/mandir/flag-pole-v1.webp" alt="" className="w-3 md:w-4 h-18 md:h-22 object-contain" />
            <img src="/assets/mandir/flag-cloth-v1.png" alt="" className="w-10 md:w-13 h-auto -ml-1 -mt-1 animate-flag" />
          </div>
        </motion.div>

        {/* Layer 7: Rising Mandir Crest Spire with Parallax (Clipped to Crest, NO blank space!) */}
        <motion.div 
          style={{ y: templeTranslateY }}
          className="relative z-20 w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto -mt-4 md:-mt-6 pointer-events-none"
        >
          <img 
            src="/assets/mandir/temple-crest.webp" 
            alt="Sacred Mandir" 
            className="w-full h-auto drop-shadow-[0_-15px_30px_rgba(95,37,15,0.2)]" 
          />
        </motion.div>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-3 flex flex-col items-center text-[#5f250f] font-serif">
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-0.5">
            Scroll to Explore Multiday Celebrations
          </span>
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce text-[#ab5626]" />
        </div>

      </section>

      {/* ============================================================== */}
      {/* 2. MULTIDAY CEREMONIES TIMELINE: SHARP ROYAL ARCH CSS CARDS     */}
      {/* ============================================================== */}
      <section className="relative w-full py-12 md:py-16 px-4 md:px-8 bg-[#fbf5eb]">
        
        {/* Decorative Peacock Pattern */}
        <div 
          className="absolute top-0 inset-x-0 h-96 opacity-15 pointer-events-none bg-top bg-contain bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/mandir/peacock-backdrop-v1.webp)' }} 
        />

        {/* Decorative Pillars on Large Screens */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-4 w-12 opacity-30 pointer-events-none">
          <img src="/assets/mandir/pillar-left-v1.webp" alt="" className="w-full h-full object-repeat-y" />
        </div>
        <div className="hidden lg:block absolute top-0 bottom-0 right-4 w-12 opacity-30 pointer-events-none">
          <img src="/assets/mandir/pillar-right-v1.webp" alt="" className="w-full h-full object-repeat-y" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          
          {/* Section Heading */}
          <div className="text-center mb-10">
            <img src="/assets/mandir/peacock-ornament-v1.webp" alt="" className="w-13 h-auto mx-auto mb-2" />
            <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
              मंगलोत्सव • Multiday Celebrations
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5f250f] tracking-wide">
              Wedding Itinerary
            </h2>
            <p className="text-xs md:text-sm font-serif text-[#ab5626] font-semibold mt-1">
              Join Us for 3 Days of Sacred Joy & Celebration in Ballia
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

                  {/* Hindi Devanagari Badge */}
                  {event.hindiTitle && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#dda45d]/15 text-[#ab5626] text-xs font-serif font-bold mb-2">
                      {event.hindiTitle}
                    </span>
                  )}

                  {/* English Ceremony Title */}
                  <h3 className="text-2xl font-serif font-bold text-[#5f250f] mb-1">
                    {event.title}
                  </h3>

                  {/* Date & Time Pills */}
                  <div className="flex flex-col gap-1 text-xs font-serif text-[#ab5626] font-semibold my-2.5">
                    <span className="flex items-center justify-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#dda45d]" /> {event.date}
                    </span>
                    <span className="flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#dda45d]" /> {event.time}
                    </span>
                  </div>

                  {/* Venue Location */}
                  <p className="text-xs font-serif text-[#5f250f]/80 flex items-center justify-center gap-1 my-2">
                    <MapPin className="w-3.5 h-3.5 text-[#dda45d] shrink-0" />
                    <span>{event.venue}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#5f250f]/75 font-serif leading-relaxed my-3 px-1">
                    {event.description}
                  </p>
                </div>

                <div>
                  {/* Attire / Dress Code Badge */}
                  {event.dressCode && (
                    <div className="inline-block px-3 py-1 rounded-lg bg-[#fbf5eb] border border-[#dda45d]/30 text-[11px] text-[#5f250f] font-serif mb-4">
                      <strong className="text-[#ab5626]">Attire:</strong> {event.dressCode}
                    </div>
                  )}

                  {/* Add to Calendar Button with Gold Accents */}
                  <div>
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + ' - ' + weddingData.brideName + ' & ' + weddingData.groomName)}&location=${encodeURIComponent(event.venue)}&details=${encodeURIComponent(event.description)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#dda45d] bg-[#fbf5eb] text-xs font-serif uppercase tracking-wider text-[#5f250f] font-bold shadow-sm hover:bg-[#dda45d] hover:text-[#5f250f] transition-all"
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
      {/* 3. COUPLE STORY & PORTRAIT: RESPONSIVE TWO-COLUMN LAYOUT       */}
      {/* ============================================================== */}
      <section className="relative w-full py-12 md:py-16 px-4 md:px-8 bg-[#fdfaf4] border-t border-[#dda45d]/20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-8">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
              Two Hearts, One Soul
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5f250f]">
              Our Journey of Love
            </h2>
            <img src="/assets/mandir/countdown-divider-v1.webp" alt="" className="w-36 h-auto mx-auto mt-2 opacity-75" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left: Couple Photo Medallion */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-[#dda45d] p-1.5 shadow-xl bg-white">
                <img 
                  src="/assets/mandir/couple-photo-v1.webp" 
                  alt="Veena Singh and Vishal Singh" 
                  className="w-full h-full object-cover rounded-full" 
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2.5 rounded-full bg-[#5f250f] border-2 border-[#dda45d] text-[#dda45d] shadow">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </div>
              <p className="text-sm uppercase tracking-widest text-[#ab5626] font-serif font-bold mt-5">
                Veena Singh & Vishal Singh
              </p>
              <span className="text-xs text-[#5f250f]/70 font-serif italic">#VeenaWedsVishal</span>
            </div>

            {/* Right: Narrative Card in CSS */}
            <div className="royal-mandir-card royal-border p-6 md:p-8 text-left">
              <h4 className="text-lg md:text-xl font-serif font-bold text-[#5f250f] mb-3">
                A Vow of Togetherness
              </h4>
              <p className="text-xs md:text-sm font-serif leading-relaxed text-[#5f250f]/85 italic mb-4">
                "Our hearts are full and our smiles wide! We are ready to make memories that last a lifetime, and our celebrations will be truly blessed by your presence in Ballia. Come join the Haldi, Mehndi, and Barat, and dance with us as we tie the sacred knot!"
              </p>
              <p className="text-xs font-serif font-bold text-[#ab5626] text-right">
                — With Warmest Love, Veena & Vishal
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. COUNTDOWN, VENUE & GUEST CONCIERGE (ADAPTIVE GRID)          */}
      {/* ============================================================== */}
      <section className="relative w-full py-12 md:py-16 px-4 md:px-8 bg-[#fbf5eb] border-t border-[#dda45d]/20">
        <div className="max-w-4xl mx-auto">
          
          {/* Live Auspicious Countdown Ticker to 30 Nov 2026 */}
          <div className="text-center mb-12">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
              The Auspicious Countdown
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#5f250f] mb-2">
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
                  <span className="block text-2xl md:text-3xl font-serif font-bold text-[#5f250f]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs font-serif font-bold text-[#ab5626]">
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
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#5f250f] mb-1">
                {weddingData.venueName}
              </h3>
              <p className="text-xs md:text-sm font-serif text-[#5f250f]/80 mb-5">
                {weddingData.venueAddress}
              </p>
              
              <a
                href={weddingData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#5f250f] text-[#dda45d] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all mb-6"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Open in Google Maps</span>
              </a>

              {/* Guest Concierge Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#dda45d]/30 text-center">
                <div className="p-3 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
                  <img src="/assets/mandir/icon-parking-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs font-serif font-bold text-[#5f250f] block">Parking</span>
                  <span className="text-[10px] text-[#5f250f]/70 font-serif">Available at Venue</span>
                </div>
                <div className="p-3 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
                  <img src="/assets/mandir/icon-weather-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs font-serif font-bold text-[#5f250f] block">Ballia Weather</span>
                  <span className="text-[10px] text-[#5f250f]/70 font-serif">Pleasant (18°C - 23°C)</span>
                </div>
              </div>
            </div>

            {/* Right: WhatsApp RSVP */}
            <div className="royal-mandir-card royal-border p-6 md:p-8 text-left">
              <h3 className="text-lg md:text-xl font-serif font-bold text-[#5f250f] mb-1 text-center">
                RSVP via WhatsApp
              </h3>
              <p className="text-xs font-serif text-[#5f250f]/70 text-center mb-4">
                Kindly respond by 20th November 2026
              </p>

              {rsvpSubmitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#dda45d] mx-auto mb-2" />
                  <p className="text-sm font-serif font-bold text-[#5f250f]">Thank you, {rsvpName}!</p>
                  <p className="text-xs text-[#5f250f]/80 mt-1 mb-4">Your RSVP is saved.</p>
                  <button
                    type="button"
                    onClick={handleWhatsAppRsvp}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider shadow hover:scale-105 active:scale-95 transition-transform"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('attending')}
                      className={`py-2 rounded-xl text-xs font-serif font-bold uppercase ${
                        rsvpAttending === 'attending' ? 'bg-[#5f250f] text-[#dda45d]' : 'bg-[#fbf5eb] text-[#5f250f]/70'
                      }`}
                    >
                      Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('declined')}
                      className={`py-2 rounded-xl text-xs font-serif font-bold uppercase ${
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
                      className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
                    >
                      <option value="1">1 Guest (Just me)</option>
                      <option value="2">2 Guests (Couple)</option>
                      <option value="3+">3+ (Family)</option>
                    </select>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold uppercase tracking-widest shadow-md hover:scale-[1.01] transition-transform"
                  >
                    Submit RSVP
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Blessing Wall */}
          <div className="mt-8 royal-mandir-card royal-border p-6 md:p-8 text-left">
            <h3 className="text-xl font-serif font-bold text-[#5f250f] mb-1 text-center">
              Sacred Blessing Wall
            </h3>
            <p className="text-xs font-serif text-[#5f250f]/70 text-center mb-5">
              Leave your auspicious prayers & heartfelt wishes for Veena & Vishal
            </p>

            <form onSubmit={handleBlessingSubmit} className="space-y-3 mb-6 max-w-lg mx-auto">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={bName}
                onChange={(e) => setBName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
              />
              <textarea
                rows={2}
                required
                placeholder="Your Sacred Blessing or Message..."
                value={bMsg}
                onChange={(e) => setBMsg(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none resize-none"
              />
              <div className="flex justify-between items-center">
                {bSent && <span className="text-xs text-[#ab5626] font-serif font-bold">Blessing posted with joy!</span>}
                <button
                  type="submit"
                  className="ml-auto inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform"
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
                    <span className="text-xs font-serif font-bold text-[#5f250f]">{b.name}</span>
                    <span className="text-[10px] text-[#5f250f]/50 font-serif">{b.timestamp}</span>
                  </div>
                  <p className="text-xs font-serif italic text-[#5f250f]/80">"{b.message}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. ROYAL MANDIR FOOTER                                         */}
      {/* ============================================================== */}
      <footer className="py-8 text-center bg-[#5f250f] text-white border-t-2 border-[#dda45d]">
        <img src="/assets/mandir/ganpati-icon-v1.webp" alt="Lord Ganesha" className="w-10 h-10 mx-auto mb-2 filter brightness-150" />
        <p className="text-xs font-serif text-[#dda45d] tracking-widest font-bold">
          || ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ||
        </p>
        <p className="text-[11px] text-white/70 font-serif mt-1">
          Veena Singh & Vishal Singh Wedding • Hotel Adarsh Vatika, Ballia • {weddingData.hashtag}
        </p>
      </footer>

    </div>
  );
};
