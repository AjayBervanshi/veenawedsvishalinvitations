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
    // Rough date format for quick calendar link
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section className="relative w-full py-20 px-4 bg-[#290c05] overflow-hidden">
      {/* Background Pillars Motif */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-repeat-y bg-contain"
        style={{ backgroundImage: 'url(/assets/mandir/pillar-backdrop-v1.webp)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#dda45d] font-serif mb-1">
            Program & Itinerary
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#f7e8d4] font-bold tracking-wide">
            Wedding Timeline
          </h2>
          <p className="text-sm text-[#f7e8d4]/70 font-serif italic mt-1">
            Mark your calendars, we can't wait to celebrate with you
          </p>
          <img 
            src="/assets/mandir/ornament-band-v1.webp" 
            alt="" 
            className="w-48 h-auto mx-auto mt-4 opacity-75"
          />
        </div>

        {/* Timeline Cards */}
        <div className="space-y-6">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-3xl bg-[#391206]/85 border border-[#dda45d]/40 p-6 md:p-8 shadow-xl backdrop-blur-md hover:border-[#dda45d] transition-all"
            >
              {/* Event Header with Icon & Hindi Title */}
              <div className="flex items-start justify-between gap-4 border-b border-[#dda45d]/20 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#200702]/80 border border-[#dda45d]/40 shadow-inner">
                    {getEventIcon(event.iconName)}
                  </div>
                  <div>
                    {event.hindiTitle && (
                      <span className="block text-xs md:text-sm text-[#dda45d] font-serif tracking-wide font-semibold">
                        {event.hindiTitle}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#f7e8d4]">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Add to Calendar button */}
                <a
                  href={createGoogleCalendarLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dda45d]/50 bg-[#2b0e06] text-[11px] font-serif uppercase tracking-wider text-[#dda45d] hover:bg-[#dda45d] hover:text-[#2b0e06] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Cal</span>
                </a>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-[#f7e8d4]/85 font-serif mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#dda45d] shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#dda45d] shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-[#dda45d] shrink-0" />
                  <span>{event.venue}</span>
                </div>
              </div>

              {/* Description & Dress Code */}
              <p className="text-xs md:text-sm text-[#f7e8d4]/70 font-serif leading-relaxed mb-4">
                {event.description}
              </p>

              {event.dressCode && (
                <div className="inline-block px-3 py-1 rounded-lg bg-[#200702]/60 border border-[#dda45d]/20 text-[11px] text-[#dda45d] font-serif">
                  <strong className="text-[#f7e8d4]">Dress Code:</strong> {event.dressCode}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
