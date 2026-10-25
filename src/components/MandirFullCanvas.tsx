import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { weddingData, initialBlessings } from '../data/weddingData';
import { soundManager } from '../utils/sound';
import { Navigation, Calendar, Heart, Send, Sparkles, CheckCircle2, MessageSquareShare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MandirFullCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global Scroll Tracking for Parallax Stages
  const { scrollY } = useScroll();

  // Scroll Transforms matching Wishly's exact speed & keyframe ratios
  // 1. Sun & Mountain Parallax
  const sunY = useTransform(scrollY, [0, 1500], [0, 240]);
  const mountainY = useTransform(scrollY, [0, 1500], [0, 180]);
  const cloudY = useTransform(scrollY, [0, 1500], [0, 260]);

  // 2. Temple Spire Rises
  const templeY = useTransform(scrollY, [0, 800], [120, -40]);

  // 3. Couple Names (Veena weds Vishal) appear & dissolve
  // Initial enter from y: 860, r: 40, scrolls with blur & fade out
  const namesOpacity = useTransform(scrollY, [0, 150, 450, 750], [0, 1, 1, 0]);
  const namesScale = useTransform(scrollY, [0, 250, 500, 750], [0.85, 1, 1, 1.15]);
  const namesY = useTransform(scrollY, [0, 250, 500, 750], [80, 0, 0, -60]);

  // 4. Invocation Card Slides Up
  const invOpacity = useTransform(scrollY, [400, 650, 1100, 1350], [0, 1, 1, 0]);
  const invY = useTransform(scrollY, [400, 650, 1100, 1350], [60, 0, 0, -40]);

  // Sound & Petals trigger for bells
  const [bellRinging, setBellRinging] = useState(false);
  const ringBell = () => {
    soundManager.playBellChime();
    setBellRinging(true);
    confetti({
      particleCount: 40,
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
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.8 }, colors: ['#dda45d', '#e67e22', '#e74c3c'] });
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
    <div ref={containerRef} className="mandir w-full max-w-[440px] md:max-w-2xl mx-auto shadow-2xl relative select-none bg-white">
      <div className="m-frame">
        <div className="m-root">
          <div className="m-layout m-phone w-full relative">

            {/* ============================================================== */}
            {/* SECTION 1: THE HERO SCENE WITH MANDIR, BELLS, NAMES, TEMPLE    */}
            {/* ============================================================== */}
            <div className="m-hero relative w-full h-[1680px] overflow-hidden">
              
              {/* Sky Backdrop */}
              <div className="m-sky absolute inset-0 z-0 pointer-events-none">
                <img src="/assets/mandir/sky-v1.webp" alt="" className="w-full h-full object-cover" />
              </div>

              {/* Sun Parallax */}
              <motion.div style={{ y: sunY }} className="m-sun absolute top-12 left-1/2 -translate-x-1/2 z-10 w-72 h-auto pointer-events-none">
                <img src="/assets/mandir/sun-v1.webp" alt="" className="w-full h-auto drop-shadow-[0_0_50px_rgba(221,164,93,0.7)] animate-pulse" />
              </motion.div>

              {/* Mountains Parallax */}
              <motion.div style={{ y: mountainY }} className="m-mountain absolute top-48 w-full z-10 pointer-events-none opacity-60">
                <img src="/assets/mandir/mountain-v1.webp" alt="" className="w-full object-cover" />
              </motion.div>

              {/* Clouds Parallax */}
              <motion.div style={{ y: cloudY }} className="m-cloud absolute top-64 w-full z-10 pointer-events-none opacity-80 animate-clouds">
                <img src="/assets/mandir/cloud-v1.webp" alt="" className="w-full object-cover" />
              </motion.div>

              {/* Bell Arch at Top */}
              <div className="m-bell-arch absolute top-2 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-30 pointer-events-none">
                <img src="/assets/mandir/bell-arch-v1.webp" alt="" className="w-full h-auto" />
              </div>

              {/* 4 Interactive Swinging Temple Bells */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-10/12 max-w-xs flex justify-between z-40 px-2">
                <button type="button" onClick={ringBell} title="Ring Bell" className="focus:outline-none cursor-pointer">
                  <img src="/assets/mandir/bell-a-v1.png" alt="" className={`w-8 h-auto animate-swing-left ${bellRinging ? 'scale-125' : ''}`} />
                </button>
                <button type="button" onClick={ringBell} title="Ring Bell" className="focus:outline-none cursor-pointer">
                  <img src="/assets/mandir/bell-b-v1.png" alt="" className={`w-7 h-auto animate-swing-right ${bellRinging ? 'scale-125' : ''}`} />
                </button>
                <button type="button" onClick={ringBell} title="Ring Bell" className="focus:outline-none cursor-pointer">
                  <img src="/assets/mandir/bell-a-v1.png" alt="" className={`w-7 h-auto animate-swing-left ${bellRinging ? 'scale-125' : ''}`} />
                </button>
                <button type="button" onClick={ringBell} title="Ring Bell" className="focus:outline-none cursor-pointer">
                  <img src="/assets/mandir/bell-b-v1.png" alt="" className={`w-8 h-auto animate-swing-right ${bellRinging ? 'scale-125' : ''}`} />
                </button>
              </div>

              {/* Saffron Flag on Temple Flagpole */}
              <div className="m-flag-pole absolute top-40 right-10 z-20 pointer-events-none flex items-start">
                <img src="/assets/mandir/flag-pole-v1.webp" alt="" className="w-3 h-28 object-contain" />
                <img src="/assets/mandir/flag-cloth-v1.png" alt="" className="w-14 h-auto -ml-1 -mt-1 animate-flag" />
              </div>

              {/* HERO NAMES: Veena weds Vishal (Calligraphy Pinyon Script, Appear & Dissolve) */}
              <motion.div
                style={{ opacity: namesOpacity, scale: namesScale, y: namesY }}
                className="absolute top-[280px] inset-x-4 text-center z-30 pointer-events-none"
              >
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#ab5626] font-serif font-bold mb-1">
                  The Wedding Celebration of
                </p>
                <h1 className="text-6xl md:text-7xl text-[#5f250f] font-normal tracking-wide drop-shadow-sm" style={{ fontFamily: 'var(--mandir-script)' }}>
                  {weddingData.brideName}
                </h1>
                <p className="text-3xl font-normal text-[#dda45d] my-1" style={{ fontFamily: 'var(--mandir-script)' }}>
                  weds
                </p>
                <h1 className="text-6xl md:text-7xl text-[#5f250f] font-normal tracking-wide drop-shadow-sm" style={{ fontFamily: 'var(--mandir-script)' }}>
                  {weddingData.groomName}
                </h1>
              </motion.div>

              {/* RISING MANDIR TEMPLE SPIRE */}
              <motion.div
                style={{ y: templeY }}
                className="m-temple absolute top-[520px] left-1/2 -translate-x-1/2 w-full max-w-md z-20 pointer-events-none"
              >
                <img src="/assets/mandir/temple-v1.webp" alt="Mandir" className="w-full h-auto drop-shadow-[0_-15px_30px_rgba(95,37,15,0.2)]" />
              </motion.div>

              {/* INVOCATION CARD (Slides into view as names dissolve) */}
              <motion.div
                style={{ opacity: invOpacity, y: invY }}
                className="m-inv absolute top-[980px] inset-x-5 z-30 p-6 rounded-3xl bg-white/95 border-2 border-[#dda45d]/60 shadow-[0_10px_35px_rgba(95,37,15,0.15)] text-center backdrop-blur-sm"
              >
                <div className="flex flex-col items-center mb-3">
                  <img src="/assets/mandir/ganpati-icon-v1.webp" alt="Ganesha" className="w-12 h-12 object-contain mb-1" />
                  <p className="text-sm font-serif font-bold text-[#5f250f] tracking-widest">
                    || श्री गणेशाय नमः ||
                  </p>
                  <img src="/assets/mandir/shri-line-v1.webp" alt="" className="w-48 h-auto opacity-75 mt-0.5" />
                </div>

                <p className="text-[11px] text-[#5f250f]/80 font-serif leading-relaxed mb-3">
                  {weddingData.hostMessage}
                </p>

                <div className="text-xs font-serif text-[#ab5626] font-bold mb-1">
                  {weddingData.brideParents}
                </div>
                <div className="text-xs font-serif italic text-[#5f250f] mb-1">
                  and
                </div>
                <div className="text-xs font-serif text-[#ab5626] font-bold mb-4">
                  {weddingData.groomParents}
                </div>

                <div className="inline-block px-5 py-2 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold tracking-wider">
                  {weddingData.weddingDateDisplay}
                </div>
              </motion.div>

            </div>

            {/* ============================================================== */}
            {/* SECTION 2: TIMELINE WITH PEACOCK BACKDROP & 6 EVENT CARDS      */}
            {/* ============================================================== */}
            <div className="m-timeline relative w-full h-[2250px] overflow-hidden bg-[#fbf5eb]">
              
              {/* Peacock Backdrop Graphic */}
              <div className="m-peacock-backdrop absolute top-0 w-full z-0 opacity-20 pointer-events-none">
                <img src="/assets/mandir/peacock-backdrop-v1.webp" alt="" className="w-full object-cover" />
              </div>

              {/* Royal Temple Pillars (Left & Right margins) */}
              <div className="m-pillar m-pillar-l1 absolute top-10 left-2 w-8 z-10 pointer-events-none opacity-50">
                <img src="/assets/mandir/pillar-left-v1.webp" alt="" className="w-full h-auto" />
              </div>
              <div className="m-pillar m-pillar-r1 absolute top-10 right-2 w-8 z-10 pointer-events-none opacity-50">
                <img src="/assets/mandir/pillar-right-v1.webp" alt="" className="w-full h-auto" />
              </div>

              {/* Heading */}
              <div className="relative z-20 text-center pt-10 pb-6 px-4">
                <img src="/assets/mandir/peacock-ornament-v1.webp" alt="" className="w-14 h-auto mx-auto mb-2" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#5f250f] tracking-wide">
                  Wedding Timeline
                </h2>
                <p className="text-xs font-serif text-[#ab5626] font-bold mt-1">
                  Mark Your Calendars, We Can't Wait to Celebrate
                </p>
                <img src="/assets/mandir/ornament-band-v1.webp" alt="" className="w-44 h-auto mx-auto mt-2 opacity-75" />
              </div>

              {/* The 6 Event Cards with Authentic Wishly event-card-v1.png & Alternating Fly-In */}
              <div className="relative z-20 px-6 space-y-6">
                {weddingData.events.map((event, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 40, rotate: isEven ? -8 : 8 }}
                      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", bounce: 0.15, duration: 1.1, delay: idx * 0.05 }}
                      className="m-card relative w-full max-w-sm mx-auto shadow-[0_8px_25px_rgba(95,37,15,0.12)] rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform"
                    >
                      {/* Authentic Wishly Event Card Background Image */}
                      <img src="/assets/mandir/event-card-v1.png" alt="" className="w-full h-auto object-cover block" />

                      {/* Card Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6 text-center">
                        <div>
                          {event.hindiTitle && (
                            <span className="block text-[11px] font-serif text-[#ab5626] font-bold">
                              {event.hindiTitle}
                            </span>
                          )}
                          <h3 className="text-2xl font-serif font-bold text-[#5f250f] my-1">
                            {event.title}
                          </h3>
                          <div className="inline-block px-3 py-1 rounded-full bg-[#5f250f]/10 text-[#5f250f] text-xs font-serif font-semibold my-1">
                            {event.date}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-serif font-bold text-[#ab5626]">
                            {event.time}
                          </p>
                          <p className="text-xs font-serif text-[#5f250f]/80 mt-1">
                            {event.venue}
                          </p>
                          {event.dressCode && (
                            <p className="text-[11px] font-serif text-[#5f250f]/70 italic mt-1">
                              Dress: {event.dressCode}
                            </p>
                          )}
                        </div>

                        <div className="pt-2">
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

            </div>

            {/* ============================================================== */}
            {/* SECTION 3: COUPLE STORY & MESSAGE CARD                         */}
            {/* ============================================================== */}
            <div className="m-couple relative w-full h-[980px] overflow-hidden bg-[#fdfaf4] py-12 px-6 text-center">
              
              <div className="m-couple-backdrop absolute inset-0 z-0 opacity-25 pointer-events-none">
                <img src="/assets/mandir/couple-backdrop-v1.webp" alt="" className="w-full h-full object-cover" />
              </div>

              <div className="relative z-10 max-w-sm mx-auto">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
                  Our Sacred Journey
                </p>
                <h2 className="text-2xl font-serif font-bold text-[#5f250f] mb-6">
                  Two Hearts, One Soul
                </h2>

                {/* Couple Photo Ring */}
                <div className="relative w-36 h-36 mx-auto mb-6 rounded-full border-4 border-[#dda45d] p-1.5 shadow-xl bg-white">
                  <img src="/assets/mandir/couple-photo-v1.webp" alt="Couple" className="w-full h-full object-cover rounded-full" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full bg-[#5f250f] border-2 border-[#dda45d] text-[#dda45d]">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                </div>

                {/* Message Card */}
                <div className="relative rounded-3xl bg-white border-2 border-[#dda45d]/60 p-6 shadow-xl text-left">
                  <img src="/assets/mandir/message-card-v1.webp" alt="" className="absolute top-0 right-0 w-16 h-auto opacity-40 pointer-events-none" />
                  <h4 className="text-lg font-serif font-bold text-[#5f250f] mb-2">
                    Our Vow of Togetherness
                  </h4>
                  <p className="text-xs font-serif leading-relaxed text-[#5f250f]/85 italic mb-3">
                    "Our hearts are full and our smiles wide! We are ready to make memories that last a lifetime, and they will be incomplete without you by our side. Come celebrate our sacred vows and dance with us!"
                  </p>
                  <p className="text-xs font-serif font-bold text-[#ab5626] text-right">
                    — Veena & Vishal
                  </p>
                </div>
              </div>

            </div>

            {/* ============================================================== */}
            {/* SECTION 4: LOCATION, COUNTDOWN, RSVP & BLESSING WALL          */}
            {/* ============================================================== */}
            <div className="m-location relative w-full overflow-hidden bg-[#fbf5eb] py-12 px-6">
              
              {/* COUNTDOWN */}
              <div className="text-center mb-10">
                <img src="/assets/mandir/countdown-backdrop-v1.webp" alt="" className="w-32 h-auto mx-auto mb-2 opacity-50" />
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
                  Until Forever Begins
                </p>
                <h3 className="text-2xl font-serif font-bold text-[#5f250f] mb-2">
                  The Auspicious Countdown
                </h3>
                <img src="/assets/mandir/countdown-divider-v1.webp" alt="" className="w-44 h-auto mx-auto mb-4 opacity-75" />

                <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                  {[
                    { label: 'DAYS', val: timeLeft.days },
                    { label: 'HOURS', val: timeLeft.hours },
                    { label: 'MINUTES', val: timeLeft.minutes },
                    { label: 'SECONDS', val: timeLeft.seconds }
                  ].map((item, i) => (
                    <div key={i} className="p-2.5 rounded-2xl bg-white border border-[#dda45d] shadow-sm">
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

              {/* VENUE & MAP */}
              <div className="relative rounded-3xl bg-white border-2 border-[#dda45d]/60 p-6 shadow-xl mb-10 text-center">
                <img src="/assets/mandir/location-backdrop-v1.webp" alt="" className="w-24 h-auto mx-auto mb-2 opacity-60" />
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
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5f250f] text-[#dda45d] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all mb-5"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>Open in Google Maps</span>
                </a>

                {/* Badges */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#dda45d]/30 text-center">
                  <div className="p-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/40">
                    <img src="/assets/mandir/icon-parking-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-[11px] font-serif font-bold text-[#5f250f] block">Valet Parking</span>
                    <span className="text-[10px] text-[#5f250f]/70 font-serif">Complimentary</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/40">
                    <img src="/assets/mandir/icon-weather-v1.webp" alt="" className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-[11px] font-serif font-bold text-[#5f250f] block">Weather</span>
                    <span className="text-[10px] text-[#5f250f]/70 font-serif">20°C - 24°C</span>
                  </div>
                </div>
              </div>

              {/* RSVP VIA WHATSAPP (Matching Wishly m-rsvp-card) */}
              <div className="m-rsvp-card bg-white rounded-3xl border-2 border-[#dda45d]/60 p-6 shadow-xl mb-10">
                <h3 className="text-lg font-serif font-bold text-[#5f250f] mb-1 text-center">
                  RSVP via WhatsApp
                </h3>
                <p className="text-xs font-serif text-[#5f250f]/70 text-center mb-4">
                  Kindly respond by 1st December 2026
                </p>

                {rsvpSubmitted ? (
                  <div className="text-center py-4">
                    <CheckCircle2 className="w-12 h-12 text-[#dda45d] mx-auto mb-2" />
                    <p className="text-sm font-serif font-bold text-[#5f250f]">Thank you, {rsvpName}!</p>
                    <p className="text-xs text-[#5f250f]/80 mt-1 mb-4">Your RSVP is saved.</p>
                    <button
                      type="button"
                      onClick={handleWhatsAppRsvp}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider"
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
                      className="w-full py-3 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold uppercase tracking-widest shadow-md hover:scale-[1.01]"
                    >
                      Send RSVP
                    </button>
                  </form>
                )}
              </div>

              {/* BLESSING WALL */}
              <div className="bg-white rounded-3xl border-2 border-[#dda45d]/60 p-6 shadow-xl mb-6">
                <h3 className="text-lg font-serif font-bold text-[#5f250f] mb-1 text-center">
                  Blessing Wall
                </h3>
                <p className="text-xs font-serif text-[#5f250f]/70 text-center mb-4">
                  Leave a blessing for Veena & Vishal
                </p>

                <form onSubmit={handleBlessingSubmit} className="space-y-3 mb-6">
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
                    placeholder="Your Blessing..."
                    value={bMsg}
                    onChange={(e) => setBMsg(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-xs font-serif text-[#5f250f] focus:outline-none resize-none"
                  />
                  <div className="flex justify-between items-center">
                    {bSent && <span className="text-xs text-[#ab5626] font-serif font-bold">Blessing sent!</span>}
                    <button
                      type="submit"
                      className="ml-auto inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#5f250f] text-[#dda45d] text-xs font-serif font-bold uppercase tracking-wider"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {blessings.map((b) => (
                    <div key={b.id} className="p-3 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30 text-left">
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

            {/* FOOTER */}
            <div className="py-8 text-center bg-[#5f250f] text-white">
              <img src="/assets/mandir/ganpati-icon-v1.webp" alt="" className="w-10 h-10 mx-auto mb-1.5 filter brightness-150" />
              <p className="text-xs font-serif text-[#dda45d] tracking-widest font-bold">
                || ॐ सर्वे भवन्तु सुखिनः ||
              </p>
              <p className="text-[10px] text-white/70 font-serif mt-1">
                Veena & Vishal Wedding • {weddingData.hashtag}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
