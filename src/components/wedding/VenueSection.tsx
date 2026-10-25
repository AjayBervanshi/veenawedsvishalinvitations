import { MapPin, Phone, Globe, Copy, Check, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function VenueSection() {
  const [copied, setCopied] = useState(false);

  const venueAddress =
    "Ramadahin Puram, Harpura, Behind Shanti Hospital / Near Chhaya Talkies, Tikhampur, Ballia, Uttar Pradesh 277001";

  const handleCopy = () => {
    navigator.clipboard.writeText(venueAddress);
    setCopied(true);
    toast.success("Venue address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="venue" className="py-24 px-4 w-full relative z-10 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-[var(--cream)] rounded-2xl overflow-hidden shadow-xl border border-gold/30">
        <div className="relative h-64 lg:h-auto bg-[var(--paper-2)] p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gold/20 overflow-hidden">
          <div className="absolute inset-0 paper-grain opacity-60 mix-blend-multiply pointer-events-none"></div>

          <svg viewBox="0 0 400 300" className="w-full max-w-sm drop-shadow-md z-10">
            <rect x="0" y="0" width="400" height="200" fill="var(--color-sky)" opacity="0.1" />
            <rect x="0" y="200" width="400" height="100" fill="var(--color-sage)" opacity="0.2" />

            <path
              d="M80,200 L80,100 L150,80 L250,80 L320,100 L320,200 Z"
              fill="var(--color-paper)"
              stroke="var(--color-bronze)"
              strokeWidth="1"
            />
            <path
              d="M120,200 L120,130 L160,110 L240,110 L280,130 L280,200 Z"
              fill="none"
              stroke="var(--color-gold-deep)"
              strokeWidth="1.5"
            />

            <rect
              x="140"
              y="140"
              width="20"
              height="30"
              fill="none"
              stroke="var(--color-bronze)"
              strokeWidth="0.5"
            />
            <rect
              x="190"
              y="140"
              width="20"
              height="30"
              fill="none"
              stroke="var(--color-bronze)"
              strokeWidth="0.5"
            />
            <rect
              x="240"
              y="140"
              width="20"
              height="30"
              fill="none"
              stroke="var(--color-bronze)"
              strokeWidth="0.5"
            />

            <path
              d="M40,200 Q20,150 40,120 Q60,150 50,200 Z"
              fill="var(--color-sage-deep)"
              opacity="0.6"
            />
            <path
              d="M350,200 Q330,140 360,110 Q380,140 360,200 Z"
              fill="var(--color-sage-deep)"
              opacity="0.6"
            />

            <circle cx="200" cy="220" r="40" fill="var(--color-sky)" opacity="0.3" />
          </svg>

          <div className="mt-8 text-center z-10 relative">
            <h3 className="font-display text-2xl text-espresso">Hotel Adarsh Vatika</h3>
            <p className="font-sans text-xs tracking-[0.2em] text-bronze uppercase mt-2">
              The Destination
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-gold-deep fill-gold-deep" />
            <span className="font-sans text-sm tracking-widest text-espresso font-medium">
              4.4 Rating (517+ Reviews)
            </span>
          </div>

          <h4 className="font-serif text-2xl text-espresso mb-4">Celebration Lawns</h4>
          <p className="font-sans text-sm leading-relaxed text-bronze mb-6">
            The Gardenia Collection —{" "}
            <strong className="text-espresso font-medium">Gardenia One</strong> (The Grand Lawn,
            Guest Entrance: Gate 1) &{" "}
            <strong className="text-espresso font-medium">Gardenia Two</strong> (The Royal Lawn,
            Guest Entrance: Gate 4).
            <br />
            <br />
            Includes 12 air-conditioned guest rooms, an open-air garden swimming pool, wheelchair
            access, and ample valet parking.
          </p>

          <div className="w-full h-px bg-gold/20 mb-6"></div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold-deep shrink-0 mt-1" />
              <p className="font-serif text-espresso leading-relaxed">{venueAddress}</p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-gold-deep shrink-0" />
              <a
                href="tel:+918700031819"
                className="font-sans text-sm text-espresso hover:text-gold-deep transition-colors"
              >
                +91 87000 31819
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Adarsh+Vatika+Tikhampur+Ballia+Uttar+Pradesh+277001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-espresso text-cream hover:bg-espresso/90 py-3 px-4 rounded-md font-sans text-xs tracking-widest uppercase transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Open in Maps
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 border border-bronze/30 text-espresso hover:bg-gold/10 py-3 px-4 rounded-md font-sans text-xs tracking-widest uppercase transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              Copy Address
            </button>
          </div>

          <div className="mt-4 text-center">
            <a
              href="https://adarshvatika.com/venues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs font-sans tracking-widest text-bronze hover:text-espresso transition-colors underline underline-offset-4"
            >
              <Globe className="w-3 h-3" />
              Official Venue Website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
