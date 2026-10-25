import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { weddingData, initialBlessings } from '../data/weddingData';
import { soundManager } from '../utils/sound';
import { Navigation, Calendar, Heart, Send, Sparkles, CheckCircle2, MessageSquareShare, ChevronDown, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MandirFullCanvas: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll progress exclusively through the Hero Stage (0 to 1)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // 1. Invocation (Ganesha) fades out as scroll starts
  const ganeshaOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const ganeshaY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  // 2. Couple Names: Appear with glorious scale & glow, hold, then DISAPPEAR with graceful blur/scale
  const namesOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.65], [0, 1, 1, 0]);
  const namesScale = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.65], [0.85, 1, 1, 1.15]);
  const namesY = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.65], [50, 0, 0, -40]);

  // 3. Mandir Temple: Rises up through the clouds as you scroll
  const templeY = useTransform(scrollYProgress, [0.15, 0.75], [180, 0]);
  const templeScale = useTransform(scrollYProgress, [0.15, 0.75], [0.95, 1.05]);

  // 4. Clouds: Part outwards as you scroll
  const cloudLeftX = useTransform(scrollYProgress, [0, 0.7], [0, -100]);
  const cloudRightX = useTransform(scrollYProgress, [0, 0.7], [0, 100]);

  // 5. Next Invitation Card: Appears after names dissolve
  const inviteCardOpacity = useTransform(scrollYProgress, [0.65, 0.85, 0.98], [0, 1, 1]);
  const inviteCardY = useTransform(scrollYProgress, [0.65, 0.85], [50, 0]);

  // Sound & Petals trigger for bells
  const [bellRinging, setBellRinging] = useState(false);
  const ringBell = () => {
    soundManager.playBellChime();
    setBellRinging(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#dda45d', '#e67e22', '#f39c12']
    });
    setTimeout(() => setBellRinging(false), 900);
  };

  // Countdown State
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
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.8 }, colors: ['#dda45d', '#e67e22', '#e74c3c'] });
    setBlessings([{ id: Date.now().toString(), name: bName.trim(), relation: 'Family / Friend', message: bMsg.trim(), timestamp: 'Just now' }, ...blessings]);
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
      `Namaste! RSVP for Veena & Vishal's Wedding (${weddingData.hashtag}):\nName: ${rsvpName || 'Guest'}\nAttendance: ${rsvpAttending === 'attending' ? 'Attending with joy' : 'Unable to attend'}\nGuests: ${rsvpGuests}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#fbf5eb] text-[#5f250f] min-h-screen">
      
      {/* Centralized Container (Responsive on Mobile and Desktop) */}
      <div className="w-full max-w-2xl mx-auto bg-[#fbf5eb] shadow-[0_0_50px_rgba(95,37,15,0.08)] relative border-x border-[#dda45d]/30 overflow-hidden">
        
        {/* ============================================================== */}
        {/* 1. HERO SCROLLYTELLING VIEWPORT (Names Reveal & Dissolve)       */}
        {/* ============================================================== */}
        <div ref={heroRef} className="relative w-full h-[240vh]">
          
          {/* Sticky Viewport */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden select-none">
            
            {/* Sky Atmosphere */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-90"
              style={{ backgroundImage: 'url(/assets/mandir/sky-v1.webp)' }}
            />

            {/* Glowing Sun Aura */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-85">
              <img 
                src="/assets/mandir/sun-v1.webp" 
                alt="" 
                className="w-48 md:w-64 h-auto drop-shadow-[0_0_50px_rgba(221,164,93,0.7)] animate-pulse"
                style={{ animationDuration: '5s' }}
              />
            </div>

            {/* Mountains Backdrop */}
            <div className="absolute bottom-28 w-full z-10 pointer-events-none opacity-50">
              <img src="/assets/mandir/mountain-v1.webp" alt="" className="w-full object-cover max-h-56" />
            </div>

            {/* Parting Clouds */}
            <motion.div 
              style={{ x: cloudLeftX }}
              className="absolute top-20 -left-16 w-3/4 max-w-md z-20 pointer-events-none opacity-75"
            >
              <img src="/assets/mandir/cloud-v1.webp" alt="" className="w-full h-auto object-contain" />
            </motion.div>
            <motion.div 
              style={{ x: cloudRightX }}
              className="absolute top-32 -right-16 w-3/4 max-w-md z-20 pointer-events-none opacity-75"
            >
              <img src="/assets/mandir/cloud-v1.webp" alt="" className="w-full h-auto object-contain scale-x-[-1]" />
            </motion.div>

            {/* TOP BELL ARCH & 4 INTERACTIVE SWINGING BELLS */}
            <div className="relative z-40 w-full max-w-md pt-2 px-4 flex flex-col items-center">
              <img src="/assets/mandir/bell-arch-v1.webp" alt="" className="w-full max-w-sm h-auto object-contain drop-shadow-md" />
              
              <div className="w-full max-w-xs -mt-3 flex justify-between px-6 items-start">
                <button type="button" onClick={ringBell} title="Tap to ring temple bell" className="cursor-pointer focus:outline-none">
                  <img src="/assets/mandir/bell-a-v1.png" alt="Bell" className={`w-8 h-auto animate-swing-left drop-shadow hover:scale-115 transition-transform ${bellRinging ? 'scale-125' : ''}`} />
                </button>
                
                {/* Ganesha Invocation (fades as scroll begins) */}
                <motion.div style={{ opacity: ganeshaOpacity, y: ganeshaY }} className="flex flex-col items-center">
                  <img src="/assets/mandir/ganpati-icon-v1.webp" alt="Ganesha" className="w-12 h-12 object-contain drop-shadow" />
                  <span className="text-[#5f250f] text-xs font-serif font-bold tracking-widest mt-0.5">
                    || श्री गणेशाय नमः ||
                  </span>
                  <img src="/assets/mandir/shri-line-v1.webp" alt="" className="w-36 h-auto opacity-70 mt-0.5" />
                </motion.div>

                <button type="button" onClick={ringBell} title="Tap to ring temple bell" className="cursor-pointer focus:outline-none">
                  <img src="/assets/mandir/bell-b-v1.png" alt="Bell" className={`w-8 h-auto animate-swing-right drop-shadow hover:scale-115 transition-transform ${bellRinging ? 'scale-125' : ''}`} />
                </button>
              </div>
            </div>

            {/* CENTER STAGE: DYNAMIC COUPLE NAMES REVEAL & DISSOLVE */}
            <div className="relative z-30 w-full max-w-md px-4 my-auto flex items-center justify-center">
              
              {/* Couple Names (Pinyon Script Calligraphy) */}
              <motion.div
                style={{ opacity: namesOpacity, scale: namesScale, y: namesY }}
                className="absolute inset-x-4 text-center px-4 py-6 rounded-3xl bg-white/90 border-2 border-[#dda45d] shadow-[0_10px_35px_rgba(95,37,15,0.12)] backdrop-blur-sm pointer-events-none"
              >
                <div className="flex justify-center -mt-10 mb-1">
                  <img src="/assets/mandir/peacock-ornament-v1.webp" alt="" className="w-14 h-auto drop-shadow" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
                  The Wedding Celebration of
                </p>
                <h1 className="text-5xl md:text-6xl text-[#5f250f] tracking-wide" style={{ fontFamily: 'var(--mandir-script)' }}>
                  {weddingData.brideName}
                </h1>
                <p className="text-2xl text-[#dda45d] my-0.5" style={{ fontFamily: 'var(--mandir-script)' }}>
                  weds
                </p>
                <h1 className="text-5xl md:text-6xl text-[#5f250f] tracking-wide" style={{ fontFamily: 'var(--mandir-script)' }}>
                  {weddingData.groomName}
                </h1>

                {/* Saffron Flag on Temple Flagpole */}
                <div className="absolute -top-8 -right-3 flex items-start pointer-events-none">
                  <img src="/assets/mandir/flag-pole-v1.webp" alt="" className="w-3 h-20 object-contain" />
                  <img src="/assets/mandir/flag-cloth-v1.png" alt="" className="w-10 h-auto -ml-1 -mt-1 animate-flag" />
                </div>
              </motion.div>

              {/* Invitation & Muhurat Card (Appears as Names dissolve) */}
              <motion.div
                style={{ opacity: inviteCardOpacity, y: inviteCardY }}
                className="absolute inset-x-4 text-center px-5 py-6 rounded-3xl bg-white/95 border-2 border-[#dda45d] shadow-[0_10px_35px_rgba(95,37,15,0.12)] backdrop-blur-sm pointer-events-none"
              >
                <div className="inline-flex p-2 rounded-full bg-[#dda45d]/20 text-[#5f250f] mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#ab5626]" />
                </div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
                  Auspicious Muhurat & Date
                </p>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#5f250f] mb-2">
                  {weddingData.weddingDateDisplay}
                </h2>
                <div className="inline-block px-4 py-1 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold tracking-wider mb-2">
                  10:30 AM Onwards • शुभ मुहूर्त
                </div>
                <p className="text-[11px] text-[#5f250f]/80 font-serif leading-relaxed">
                  {weddingData.hostMessage}
                </p>
              </motion.div>

            </div>

            {/* RISING MANDIR TEMPLE AT BOTTOM */}
            <motion.div 
              style={{ y: templeY, scale: templeScale }}
              className="relative z-20 w-full max-w-lg mx-auto -mb-1 pointer-events-none"
            >
              <img src="/assets/mandir/temple-v1.webp" alt="Sacred Mandir" className="w-full h-auto drop-shadow-[0_-15px_30px_rgba(95,37,15,0.2)]" />
            </motion.div>

            {/* SCROLL DOWN HINT */}
            <div className="relative z-30 pb-3 flex flex-col items-center text-[#5f250f] font-serif">
              <span className="text-[10px] uppercase tracking-widest font-semibold mb-0.5">
                Scroll to Explore Timeline
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#ab5626]" />
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. TIMELINE: CONNECTED CARDS (ZERO EMPTY SPACE)               */}
        {/* ============================================================== */}
        <section className="relative w-full pt-8 pb-12 px-4 bg-[#fbf5eb]">
          
          {/* Peacock Backdrop Graphic */}
          <div className="absolute top-0 inset-x-0 h-96 opacity-15 pointer-events-none bg-top bg-contain bg-no-repeat" style={{ backgroundImage: 'url(/assets/mandir/peacock-backdrop-v1.webp)' }} />

          {/* Heading */}
          <div className="relative z-10 text-center mb-8">
            <img src="/assets/mandir/peacock-ornament-v1.webp" alt="" className="w-12 h-auto mx-auto mb-1.5" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5f250f] tracking-wide">
              Wedding Timeline
            </h2>
            <p className="text-xs font-serif text-[#ab5626] font-bold mt-0.5">
              Mark Your Calendars, We Can't Wait to Celebrate
            </p>
            <img src="/assets/mandir/ornament-band-v1.webp" alt="" className="w-40 h-auto mx-auto mt-2 opacity-70" />
          </div>

          {/* The 6 Ceremony Cards with authentic event-card-v1.png */}
          <div className="relative z-10 space-y-5 max-w-md mx-auto">
            {weddingData.events.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, rotate: isEven ? -6 : 6 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", bounce: 0.15, duration: 1.0, delay: idx * 0.05 }}
                  className="relative w-full shadow-[0_6px_20px_rgba(95,37,15,0.1)] rounded-3xl overflow-hidden hover:scale-[1.01] transition-transform"
                >
                  {/* Textured Physical Card Background */}
                  <img src="/assets/mandir/event-card-v1.png" alt="" className="w-full h-auto object-cover block" />

                  {/* Card Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-center">
                    <div>
                      {event.hindiTitle && (
                        <span className="block text-[11px] font-serif text-[#ab5626] font-bold">
                          {event.hindiTitle}
                        </span>
                      )}
                      <h3 className="text-2xl font-serif font-bold text-[#5f250f] my-0.5">
                        {event.title}
                      </h3>
                      <div className="inline-block px-3 py-0.5 rounded-full bg-[#5f250f]/10 text-[#5f250f] text-xs font-serif font-semibold my-0.5">
                        {event.date}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-serif font-bold text-[#ab5626]">
                        {event.time}
                      </p>
                      <p className="text-xs font-serif text-[#5f250f]/80 mt-0.5">
                        {event.venue}
                      </p>
                      {event.dressCode && (
                        <p className="text-[10px] font-serif text-[#5f250f]/70 italic mt-0.5">
                          Dress: {event.dressCode}
                        </p>
                      )}
                    </div>

                    <div className="pt-1">
                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&location=${encodeURIComponent(event.venue)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#dda45d] bg-white text-[10px] font-serif uppercase tracking-wider text-[#5f250f] font-bold shadow-sm hover:bg-[#dda45d] transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#ab5626]" />
                        <span>Add to Calendar</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. COUPLE STORY & PHOTO                                        */}
        {/* ============================================================== */}
        <section className="relative w-full py-10 px-4 bg-[#fdfaf4] text-center border-t border-[#dda45d]/20">
          <div className="max-w-md mx-auto">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
              Our Journey of Togetherness
            </p>
            <h2 className="text-2xl font-serif font-bold text-[#5f250f] mb-5">
              Two Hearts, One Soul
            </h2>

            {/* Photo Silhouette Frame */}
            <div className="relative w-32 h-32 mx-auto mb-5 rounded-full border-4 border-[#dda45d] p-1 shadow-lg bg-white">
              <img src="/assets/mandir/couple-photo-v1.webp" alt="Veena and Vishal" className="w-full h-full object-cover rounded-full" />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#5f250f] border-2 border-[#dda45d] text-[#dda45d] shadow">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            {/* Story Card */}
            <div className="relative rounded-3xl bg-white border-2 border-[#dda45d]/60 p-6 shadow-md text-left">
              <img src="/assets/mandir/message-card-v1.webp" alt="" className="absolute top-0 right-0 w-14 h-auto opacity-30 pointer-events-none" />
              <h4 className="text-base font-serif font-bold text-[#5f250f] mb-1.5">
                A Vow of Eternal Companionship
              </h4>
              <p className="text-xs font-serif leading-relaxed text-[#5f250f]/85 italic mb-3">
                "Our hearts are full and our smiles wide! We are ready to make memories that last a lifetime, and they will be incomplete without you by our side. Come celebrate our sacred vows and dance with us!"
              </p>
              <p className="text-xs font-serif font-bold text-[#ab5626] text-right">
                — Veena & Vishal
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. COUNTDOWN, VENUE & MAP                                     */}
        {/* ============================================================== */}
        <section className="relative w-full py-10 px-4 bg-[#fbf5eb] text-center border-t border-[#dda45d]/20">
          <div className="max-w-md mx-auto">
            
            {/* Countdown */}
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
                Until The Forever Begins
              </p>
              <h3 className="text-2xl font-serif font-bold text-[#5f250f] mb-2">
                The Auspicious Countdown
              </h3>
              <img src="/assets/mandir/countdown-divider-v1.webp" alt="" className="w-40 h-auto mx-auto mb-4 opacity-70" />

              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINUTES', val: timeLeft.minutes },
                  { label: 'SECONDS', val: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="p-2 rounded-2xl bg-white border border-[#dda45d] shadow-sm">
                    <span className="block text-2xl font-serif font-bold text-[#5f250f]">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-serif font-bold text-[#ab5626]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Card */}
            <div className="rounded-3xl bg-white border-2 border-[#dda45d]/60 p-6 shadow-md mb-8">
              <img src="/assets/mandir/location-backdrop-v1.webp" alt="" className="w-20 h-auto mx-auto mb-1.5 opacity-50" />
              <h3 className="text-xl font-serif font-bold text-[#5f250f] mb-1">
                {weddingData.venueName}
              </h3>
              <p className="text-xs font-serif text-[#5f250f]/80 mb-4">
                {weddingData.venueAddress}
              </p>
              <a
                href={weddingData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5f250f] text-[#dda45d] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all mb-4"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>Open in Google Maps</span>
              </a>

              {/* Guest Badges */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#dda45d]/30 text-center">
                <div className="p-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
                  <img src="/assets/mandir/icon-parking-v1.webp" alt="" className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-[10px] font-serif font-bold text-[#5f250f] block">Valet Parking</span>
                  <span className="text-[9px] text-[#5f250f]/70 font-serif">Complimentary</span>
                </div>
                <div className="p-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
                  <img src="/assets/mandir/icon-weather-v1.webp" alt="" className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-[10px] font-serif font-bold text-[#5f250f] block">Weather</span>
                  <span className="text-[9px] text-[#5f250f]/70 font-serif">20°C - 24°C</span>
                </div>
              </div>
            </div>

            {/* WhatsApp RSVP */}
            <div className="rounded-3xl bg-white border-2 border-[#dda45d]/60 p-6 shadow-md mb-8 text-left">
              <h3 className="text-lg font-serif font-bold text-[#5f250f] mb-1 text-center">
                RSVP via WhatsApp
              </h3>
              <p className="text-xs font-serif text-[#5f250f]/70 text-center mb-4">
                Kindly respond by 1st December 2026
              </p>

              {rsvpSubmitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-[#dda45d] mx-auto mb-2" />
                  <p className="text-sm font-serif font-bold text-[#5f250f]">Thank you, {rsvpName}!</p>
                  <p className="text-xs text-[#5f250f]/80 mt-1 mb-3">Your RSVP is saved.</p>
                  <button
                    type="button"
                    onClick={handleWhatsAppRsvp}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    <MessageSquareShare className="w-3.5 h-3.5" />
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
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
                    >
                      <option value="1">1 Guest (Just me)</option>
                      <option value="2">2 Guests (Couple)</option>
                      <option value="3+">3+ (Family)</option>
                    </select>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold uppercase tracking-widest shadow-md hover:scale-[1.01]"
                  >
                    Send RSVP
                  </button>
                </form>
              )}
            </div>

            {/* Blessing Wall */}
            <div className="rounded-3xl bg-white border-2 border-[#dda45d]/60 p-6 shadow-md mb-6 text-left">
              <h3 className="text-lg font-serif font-bold text-[#5f250f] mb-1 text-center">
                Blessing Wall
              </h3>
              <p className="text-xs font-serif text-[#5f250f]/70 text-center mb-4">
                Leave your warm wishes for the couple
              </p>

              <form onSubmit={handleBlessingSubmit} className="space-y-2.5 mb-5">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Your Blessing..."
                  value={bMsg}
                  onChange={(e) => setBMsg(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none resize-none"
                />
                <div className="flex justify-between items-center">
                  {bSent && <span className="text-xs text-[#ab5626] font-serif font-bold">Blessing sent!</span>}
                  <button
                    type="submit"
                    className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold uppercase tracking-wider"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post</span>
                  </button>
                </div>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {blessings.map((b) => (
                  <div key={b.id} className="p-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30 text-left">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-serif font-bold text-[#5f250f]">{b.name}</span>
                      <span className="text-[9px] text-[#5f250f]/50 font-serif">{b.timestamp}</span>
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
          <img src="/assets/mandir/ganpati-icon-v1.webp" alt="" className="w-10 h-10 mx-auto mb-1.5 filter brightness-150" />
          <p className="text-xs font-serif text-[#dda45d] tracking-widest font-bold">
            || ॐ सर्वे भवन्तु सुखिनः ||
          </p>
          <p className="text-[10px] text-white/70 font-serif mt-0.5">
            Veena & Vishal Wedding • {weddingData.hashtag}
          </p>
        </footer>

      </div>
    </div>
  );
};
