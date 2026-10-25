import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface VenueLocationProps {
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  hashtag: string;
}

export const VenueLocation: React.FC<VenueLocationProps> = ({
  venueName,
  venueAddress,
  googleMapsUrl,
  hashtag
}) => {
  return (
    <section className="relative w-full py-20 px-4 bg-[#290c05] overflow-hidden text-center">
      {/* Location Backdrop */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-center bg-cover"
        style={{ backgroundImage: 'url(/assets/mandir/location-backdrop-v1.webp)' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[#dda45d] font-serif mb-1">
          Where We Celebrate
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#f7e8d4] font-bold tracking-wide mb-8">
          The Sacred Venue
        </h2>

        {/* Venue Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#391206]/85 border border-[#dda45d]/40 p-8 shadow-2xl backdrop-blur-md"
        >
          <div className="inline-flex p-3 rounded-full bg-[#200702] border border-[#dda45d]/40 text-[#dda45d] mb-4">
            <MapPin className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#f7e8d4] mb-2">
            {venueName}
          </h3>
          <p className="text-sm text-[#f7e8d4]/80 font-serif leading-relaxed mb-6">
            {venueAddress}
          </p>

          {/* Open in Google Maps Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b87c33] via-[#dda45d] to-[#b87c33] text-[#2b0e06] font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all mb-8"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>Open in Google Maps</span>
          </a>

          {/* Guest Information Badges (Valet Parking, Weather, Wedding Hashtag, Hospitality Desk) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#dda45d]/20">
            <div className="flex flex-col items-center p-3 rounded-xl bg-[#200702]/60 border border-[#dda45d]/20">
              <img src="/assets/mandir/icon-parking-v1.webp" alt="Parking" className="w-8 h-8 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#dda45d] font-semibold">Valet Parking</span>
              <span className="text-[10px] text-[#f7e8d4]/60 font-serif">Complimentary</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-[#200702]/60 border border-[#dda45d]/20">
              <img src="/assets/mandir/icon-weather-v1.webp" alt="Weather" className="w-8 h-8 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#dda45d] font-semibold">Pleasant Evening</span>
              <span className="text-[10px] text-[#f7e8d4]/60 font-serif">20°C - 24°C</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-[#200702]/60 border border-[#dda45d]/20">
              <img src="/assets/mandir/icon-staff-v1.webp" alt="Hospitality" className="w-8 h-8 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#dda45d] font-semibold">Guest Concierge</span>
              <span className="text-[10px] text-[#f7e8d4]/60 font-serif">At Venue Entry</span>
            </div>

            <div className="flex flex-col items-center p-3 rounded-xl bg-[#200702]/60 border border-[#dda45d]/20">
              <img src="/assets/mandir/icon-hashtag-v1.webp" alt="Hashtag" className="w-8 h-8 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#dda45d] font-semibold">Tag Photos</span>
              <span className="text-[10px] text-[#f7e8d4]/60 font-serif">{hashtag}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
