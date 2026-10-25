import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

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
    <section className="relative w-full py-12 px-4 bg-[#fbf5eb] text-center">
      {/* Location Backdrop */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-center bg-cover"
        style={{ backgroundImage: 'url(/assets/mandir/location-backdrop-v1.webp)' }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
          Where We Celebrate
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#5f250f] font-bold tracking-wide mb-6">
          The Sacred Venue
        </h2>

        {/* Venue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#ffffff] border-2 border-[#dda45d]/60 p-6 md:p-8 shadow-[0_8px_25px_rgba(95,37,15,0.08)]"
        >
          <div className="inline-flex p-3 rounded-full bg-[#fbf5eb] border-2 border-[#dda45d] text-[#5f250f] mb-3">
            <MapPin className="w-5 h-5 text-[#ab5626]" />
          </div>

          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#5f250f] mb-1">
            {venueName}
          </h3>
          <p className="text-xs md:text-sm text-[#5f250f]/80 font-serif leading-relaxed mb-5">
            {venueAddress}
          </p>

          {/* Open in Google Maps Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#5f250f] text-[#dda45d] font-bold text-xs uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all mb-6"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>Open in Google Maps</span>
          </a>

          {/* Guest Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-[#dda45d]/30">
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
              <img src="/assets/mandir/icon-parking-v1.webp" alt="Parking" className="w-7 h-7 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#5f250f] font-bold">Valet Parking</span>
              <span className="text-[10px] text-[#5f250f]/70 font-serif">Complimentary</span>
            </div>

            <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
              <img src="/assets/mandir/icon-weather-v1.webp" alt="Weather" className="w-7 h-7 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#5f250f] font-bold">Pleasant Weather</span>
              <span className="text-[10px] text-[#5f250f]/70 font-serif">20°C - 24°C</span>
            </div>

            <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
              <img src="/assets/mandir/icon-staff-v1.webp" alt="Hospitality" className="w-7 h-7 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#5f250f] font-bold">Guest Desk</span>
              <span className="text-[10px] text-[#5f250f]/70 font-serif">At Entry Gate</span>
            </div>

            <div className="flex flex-col items-center p-2.5 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/30">
              <img src="/assets/mandir/icon-hashtag-v1.webp" alt="Hashtag" className="w-7 h-7 mb-1 object-contain" />
              <span className="text-[11px] font-serif text-[#5f250f] font-bold">Hashtag</span>
              <span className="text-[10px] text-[#ab5626] font-serif font-bold">{hashtag}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
