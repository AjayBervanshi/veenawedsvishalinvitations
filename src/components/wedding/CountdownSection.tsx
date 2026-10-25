import { useState, useEffect } from "react";
import { ScratchCard } from "./ScratchCard";

type EventKey = "haldi" | "mehndi" | "shadi";

const EVENTS = {
  haldi: {
    name: "Haldi & Matkor",
    date: "2026-11-28T10:00:00+05:30",
    color: "var(--color-haldi)",
    bgColor: "var(--color-haldi-mid)",
  },
  mehndi: {
    name: "Mehndi & Sangeet",
    date: "2026-11-29T16:00:00+05:30",
    color: "var(--color-sky-deep)",
    bgColor: "var(--color-sky)",
  },
  shadi: {
    name: "Shubh Vivah",
    date: "2026-11-30T19:00:00+05:30",
    color: "var(--color-sindoor)",
    bgColor: "var(--color-blush)",
  },
};

export function CountdownSection() {
  const [selectedEvent, setSelectedEvent] = useState<EventKey>("shadi");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(EVENTS[selectedEvent].date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedEvent]);

  return (
    <section className="relative py-16 sm:py-24 px-4 w-full flex flex-col items-center">
      <ScratchCard />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {(Object.keys(EVENTS) as EventKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedEvent(key)}
              className={`px-4 py-2 rounded-full font-sans text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 border ${
                selectedEvent === key
                  ? "shadow-md scale-105"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              style={{
                backgroundColor: selectedEvent === key ? EVENTS[key].bgColor : "transparent",
                borderColor: EVENTS[key].color,
                color: selectedEvent === key ? "var(--color-espresso)" : "var(--color-bronze)",
              }}
            >
              {EVENTS[key].name}
            </button>
          ))}
        </div>

        <div className="flex gap-3 sm:gap-6 justify-center w-full">
          <div className="flex flex-col items-center justify-center w-20 h-24 sm:w-28 sm:h-32 rounded-2xl glass-card relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--color-blush)] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <span className="font-display text-3xl sm:text-5xl text-espresso relative z-10">
              {timeLeft.days}
            </span>
            <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-bronze mt-1 sm:mt-2 relative z-10">
              Days
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-20 h-24 sm:w-28 sm:h-32 rounded-2xl glass-card relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--color-sage)] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <span className="font-display text-3xl sm:text-5xl text-espresso relative z-10">
              {timeLeft.hours}
            </span>
            <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-bronze mt-1 sm:mt-2 relative z-10">
              Hours
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-20 h-24 sm:w-28 sm:h-32 rounded-2xl glass-card relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--color-haldi-mid)] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <span className="font-display text-3xl sm:text-5xl text-espresso relative z-10">
              {timeLeft.minutes}
            </span>
            <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-bronze mt-1 sm:mt-2 relative z-10">
              Mins
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-20 h-24 sm:w-28 sm:h-32 rounded-2xl glass-card relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--color-sky)] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <span className="font-display text-3xl sm:text-5xl text-espresso relative z-10">
              {timeLeft.seconds}
            </span>
            <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-bronze mt-1 sm:mt-2 relative z-10">
              Secs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
