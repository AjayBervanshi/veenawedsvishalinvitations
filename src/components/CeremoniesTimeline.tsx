import React from 'react';
import { motion } from 'framer-motion';
import { WeddingEvent } from '../types/wedding';
import { Calendar, Clock, MapPin, Sparkles, Sun, Music, Heart, GlassWater, Flame } from 'lucide-react';

interface CeremoniesTimelineProps {
  events: WeddingEvent[];
}

export const CeremoniesTimeline: React.FC<CeremoniesTimelineProps> = ({ events }) => {
  const getEventIcon = (name: string) => {
    switch (name) {
      case 'Flame': return <Flame className="w-5 h-5 text-[#dda45d]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#dda45d]" />;
      case 'Music': return <Music className="w-5 h-5 text-[#dda45d]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#dda45d]" />;
      case 'GlassWater': return <GlassWater className="w-5 h-5 text-[#dda45d]" />;
      default: return <Sparkles className="w-5 h-5 text-[#dda45d]" />;
    }
  };

  const createGoogleCalendarLink = (event: WeddingEvent) => {
    const title = encodeURIComponent(`${event.title} - Veena & Vishal Wedding`);
    const details = encodeURIComponent(`${event.description}\nDress Code: ${event.dressCode || 'Traditional'}`);
    const location = encodeURIComponent(event.venue);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section className="relative w-full py-12 px-4 bg-[#fbf5eb] overflow-hidden">
      
      {/* Decorative Royal Pillars Framing Left & Right */}
      <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 pointer-events-none opacity-40 hidden sm:block">
        <img src="/assets/mandir/pillar-left-v1.webp" alt="" className="w-full h-full object-repeat-y" />
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 pointer-events-none opacity-40 hidden sm:block">
        <img src="/assets/mandir/pillar-right-v1.webp" alt="" className="w-full h-full object-repeat-y" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
            Program & Itinerary
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#5f250f] font-bold tracking-wide">
            Wedding Timeline
          </h2>
          <p className="text-xs md:text-sm text-[#5f250f]/75 font-serif italic mt-1">
            Mark your calendars, we can't wait to celebrate with you
          </p>
          <img 
            src="/assets/mandir/ornament-band-v1.webp" 
            alt="" 
            className="w-48 h-auto mx-auto mt-3 opacity-80"
          />
        </div>

        {/* Timeline Cards */}
        <div className="space-y-4">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative rounded-2xl bg-[#ffffff] border-2 border-[#dda45d]/60 p-5 md:p-6 shadow-[0_6px_20px_rgba(95,37,15,0.08)] hover:border-[#dda45d] transition-all"
            >
              {/* Event Header with Icon & Hindi Title */}
              <div className="flex items-start justify-between gap-3 border-b border-[#dda45d]/25 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#5f250f] border border-[#dda45d] shadow-sm">
                    {getEventIcon(event.iconName)}
                  </div>
                  <div>
                    {event.hindiTitle && (
                      <span className="block text-xs font-serif text-[#ab5626] font-bold tracking-wide">
                        {event.hindiTitle}
                      </span>
                    )}
                    <h3 className="text-lg md:text-xl font-serif font-bold text-[#5f250f]">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Add to Calendar button */}
                <a
                  href={createGoogleCalendarLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dda45d] bg-[#fbf5eb] text-[10px] md:text-[11px] font-serif uppercase tracking-wider text-[#5f250f] font-bold hover:bg-[#dda45d] hover:text-[#5f250f] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#ab5626]" />
                  <span>Add to Cal</span>
                </a>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5f250f]/85 font-serif mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#ab5626] shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ab5626] shrink-0" />
                  <span className="font-semibold text-[#5f250f]">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ab5626] shrink-0" />
                  <span>{event.venue}</span>
                </div>
              </div>

              {/* Description & Dress Code */}
              <p className="text-xs text-[#5f250f]/75 font-serif leading-relaxed mb-3">
                {event.description}
              </p>

              {event.dressCode && (
                <div className="inline-block px-3 py-1 rounded-lg bg-[#fbf5eb] border border-[#dda45d]/40 text-[11px] text-[#5f250f] font-serif">
                  <strong className="text-[#ab5626]">Dress Code:</strong> {event.dressCode}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
