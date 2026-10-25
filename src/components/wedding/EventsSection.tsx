import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DayFilter = "all" | "haldi" | "mehndi" | "shadi";

export function EventsSection() {
  const [filter, setFilter] = useState<DayFilter>("all");

  const events = [
    {
      id: "haldi",
      title: "Haldi Kalash & Matkor Utsav",
      subtitle: "शुभ हल्दी एवं मटकोर",
      date: "Saturday, 28 Nov 2026",
      time: "10:00 AM Onwards",
      dressCode: "Auspicious Haldi Butter-Yellow & Sky Blue",
      swatches: ["bg-[var(--color-haldi)]", "bg-[var(--color-sky)]"],
      colorClass: "border-[var(--color-haldi)] bg-[var(--color-haldi-mid)]/10",
      textClass: "text-[var(--color-haldi-deep)]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto mb-6">
          <defs>
            <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#FFF2C8" />
              <stop offset="100%" stopColor="#8C6A2E" />
            </linearGradient>
          </defs>
          <path
            d="M20,60 C20,80 40,90 50,90 C60,90 80,80 80,60 L85,45 C85,35 65,30 50,30 C35,30 15,35 15,45 Z"
            fill="url(#brass)"
            stroke="#5C4938"
            strokeWidth="1"
          />
          <ellipse
            cx="50"
            cy="40"
            rx="32"
            ry="10"
            fill="none"
            stroke="var(--color-haldi)"
            strokeWidth="2"
            className="animate-[ripple_2s_infinite]"
          />
          <ellipse
            cx="50"
            cy="40"
            rx="20"
            ry="6"
            fill="none"
            stroke="var(--color-haldi-deep)"
            strokeWidth="1.5"
            className="animate-[ripple_2s_infinite_0.5s]"
          />
          <ellipse
            cx="50"
            cy="40"
            rx="10"
            ry="3"
            fill="none"
            stroke="var(--color-haldi)"
            strokeWidth="1"
            className="animate-[ripple_2s_infinite_1s]"
          />
          <circle cx="35" cy="45" r="5" fill="var(--color-haldi-deep)" />
          <circle cx="65" cy="38" r="4" fill="var(--color-haldi-deep)" />
          <circle cx="50" cy="48" r="6" fill="var(--color-haldi)" />
        </svg>
      ),
    },
    {
      id: "mehndi",
      title: "Mehndi Rachni & Sangeet",
      subtitle: "मेहंदी रचनी एवं संगीत संध्या",
      date: "Sunday, 29 Nov 2026",
      time: "4:00 PM Onwards",
      dressCode: "Pastel Lavender, Sky-Blue & Sage",
      swatches: ["bg-[var(--color-lavender)]", "bg-[var(--color-sky)]", "bg-[var(--color-sage)]"],
      colorClass: "border-[var(--color-lavender)] bg-[var(--color-lavender)]/10",
      textClass: "text-[var(--color-lavender-ink)]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto mb-6">
          <g transform="rotate(-15 50 50)">
            <path
              d="M30,35 C30,20 40,15 50,15 C60,15 70,20 70,35 L75,70 C75,85 60,90 50,90 C40,90 25,85 25,70 Z"
              fill="#8B5A2B"
              stroke="#5C4938"
              strokeWidth="1"
            />
            <path
              d="M30,35 C30,25 40,25 50,25 C60,25 70,25 70,35"
              fill="none"
              stroke="#E6C27A"
              strokeWidth="2"
            />
            <path
              d="M25,70 C25,80 40,80 50,80 C60,80 75,80 75,70"
              fill="none"
              stroke="#E6C27A"
              strokeWidth="2"
            />
            <line x1="32" y1="35" x2="28" y2="70" stroke="#D4AF37" strokeWidth="1" />
            <line x1="42" y1="32" x2="40" y2="75" stroke="#D4AF37" strokeWidth="1" />
            <line x1="58" y1="32" x2="60" y2="75" stroke="#D4AF37" strokeWidth="1" />
            <line x1="68" y1="35" x2="72" y2="70" stroke="#D4AF37" strokeWidth="1" />
            <path d="M50,45 C45,55 55,55 50,45" fill="var(--color-lavender-deep)" />
            <path d="M47,48 C42,55 52,55 47,48" fill="var(--color-blush-deep)" />
            <path d="M53,48 C48,55 58,55 53,48" fill="var(--color-blush-deep)" />
          </g>
          <text
            x="70"
            y="30"
            fontSize="12"
            fill="var(--color-gold-deep)"
            className="animate-[floatUp_3s_ease-in-out_infinite]"
          >
            ♪
          </text>
          <text
            x="20"
            y="40"
            fontSize="14"
            fill="var(--color-gold-deep)"
            className="animate-[floatUp_3.5s_ease-in-out_infinite_1s]"
          >
            ♫
          </text>
          <text
            x="80"
            y="60"
            fontSize="10"
            fill="var(--color-gold-deep)"
            className="animate-[floatUp_2.8s_ease-in-out_infinite_0.5s]"
          >
            ♪
          </text>
        </svg>
      ),
    },
    {
      id: "shadi",
      title: "Shubh Vivah & Phere",
      subtitle: "शुभ विवाह एवं सप्तपदी",
      date: "Monday, 30 Nov 2026",
      time: "7:00 PM Onwards",
      dressCode: "Sindoor Red, Blush Rose & Gold",
      swatches: ["bg-[var(--color-sindoor)]", "bg-[var(--color-blush)]", "bg-[var(--color-gold)]"],
      colorClass: "border-[var(--color-sindoor)] bg-[var(--color-blush)]/10",
      textClass: "text-[var(--color-sindoor)]",
      icon: (
        <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto mb-6">
          <rect
            x="25"
            y="70"
            width="50"
            height="15"
            fill="#C5A059"
            stroke="#8C6A2E"
            strokeWidth="1"
          />
          <rect x="15" y="85" width="70" height="5" fill="#E6C27A" />
          <rect
            x="30"
            y="30"
            width="6"
            height="40"
            fill="#E6C27A"
            stroke="#8C6A2E"
            strokeWidth="0.5"
          />
          <rect
            x="64"
            y="30"
            width="6"
            height="40"
            fill="#E6C27A"
            stroke="#8C6A2E"
            strokeWidth="0.5"
          />
          <path d="M20,35 Q50,15 80,35 L70,35 Q50,20 30,35 Z" fill="var(--color-sindoor)" />
          <path d="M25,35 Q50,25 75,35 Z" fill="var(--color-gold-deep)" />
          <path
            d="M45,65 Q50,55 55,65 Q50,75 45,65 Z"
            fill="#FF8C00"
            className="animate-[flicker_1.5s_infinite]"
          />
          <path
            d="M48,65 Q50,60 52,65 Q50,70 48,65 Z"
            fill="#FFD700"
            className="animate-[flicker_1.2s_infinite_0.2s]"
          />
        </svg>
      ),
    },
  ];

  const filteredEvents = filter === "all" ? events : events.filter((e) => e.id === filter);

  const generateICS = (event: (typeof events)[0]) => {
    let dateRaw = "";
    if (event.id === "haldi") dateRaw = "20261128T043000Z";
    else if (event.id === "mehndi") dateRaw = "20261129T103000Z";
    else dateRaw = "20261130T133000Z";

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${dateRaw}`,
      `SUMMARY:Vishal & Veena - ${event.title}`,
      "LOCATION:Hotel Adarsh Vatika\\, Ballia",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Vishal_Veena_${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="py-24 px-4 max-w-6xl mx-auto relative z-10 w-full">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl text-espresso mb-4">
          Three Days of Celebration
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mb-6"></div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-sans tracking-widest uppercase transition-all border ${
              filter === "all"
                ? "bg-gold-ink text-cream border-gold-ink shadow-md"
                : "bg-transparent text-bronze border-gold/40 hover:bg-gold/10"
            }`}
          >
            All 3 Days
          </button>
          <button
            onClick={() => setFilter("haldi")}
            className={`px-4 py-1.5 rounded-full text-sm font-sans tracking-widest uppercase transition-all border ${
              filter === "haldi"
                ? "bg-[var(--color-haldi-deep)] text-cream border-[var(--color-haldi-deep)] shadow-md"
                : "bg-transparent text-bronze border-[var(--color-haldi)] hover:bg-[var(--color-haldi)]/20"
            }`}
          >
            Haldi
          </button>
          <button
            onClick={() => setFilter("mehndi")}
            className={`px-4 py-1.5 rounded-full text-sm font-sans tracking-widest uppercase transition-all border ${
              filter === "mehndi"
                ? "bg-[var(--color-lavender-ink)] text-cream border-[var(--color-lavender-ink)] shadow-md"
                : "bg-transparent text-bronze border-[var(--color-lavender)] hover:bg-[var(--color-lavender)]/20"
            }`}
          >
            Mehndi
          </button>
          <button
            onClick={() => setFilter("shadi")}
            className={`px-4 py-1.5 rounded-full text-sm font-sans tracking-widest uppercase transition-all border ${
              filter === "shadi"
                ? "bg-[var(--color-sindoor)] text-cream border-[var(--color-sindoor)] shadow-md"
                : "bg-transparent text-bronze border-[var(--color-sindoor)] hover:bg-[var(--color-blush)]"
            }`}
          >
            Shadi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`
                            relative overflow-hidden rounded-t-full rounded-b-xl border
                            ${event.colorClass}
                            backdrop-blur-sm p-8 pt-16 flex flex-col items-center text-center shadow-lg
                        `}
            >
              <div className="absolute inset-4 rounded-t-full rounded-b-lg border border-gold/30 pointer-events-none"></div>

              {event.icon}

              <h3 className={`font-display text-2xl mb-1 ${event.textClass}`}>{event.title}</h3>
              <p className="font-hindi text-sm text-bronze mb-6 tracking-wide">{event.subtitle}</p>

              <div className="w-12 h-px bg-gold/50 mb-6"></div>

              <div className="mb-6 space-y-1">
                <p className="font-serif text-lg text-espresso font-medium">{event.date}</p>
                <p className="font-sans text-xs tracking-widest text-bronze uppercase">
                  {event.time}
                </p>
              </div>

              <div className="mt-auto pt-6 w-full border-t border-gold/20 flex flex-col items-center">
                <p className="text-xs font-sans uppercase tracking-widest text-bronze/80 mb-2">
                  Palette
                </p>
                <div className="flex gap-2 mb-4">
                  {event.swatches.map((swatch, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full shadow-sm border border-gold/20 ${swatch}`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs font-serif italic text-espresso/80">{event.dressCode}</p>

                <button
                  onClick={() => generateICS(event)}
                  className="mt-6 flex items-center justify-center gap-2 text-xs font-sans tracking-widest uppercase text-bronze hover:text-espresso border border-bronze/20 rounded-full px-6 py-2 transition-colors hover:bg-gold/10 w-full"
                >
                  <span>📅 Add to Calendar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
