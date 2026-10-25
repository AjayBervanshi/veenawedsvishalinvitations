import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquareShare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsvpSectionProps {
  hashtag: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ hashtag }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState('2');
  const [dietary, setDietary] = useState('Vegetarian');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    if (attendance === 'attending') {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }

    setSubmitted(true);
  };

  const handleWhatsAppRsvp = () => {
    const text = encodeURIComponent(
      `Namaste! RSVP for Veena & Vishal's Wedding (${hashtag}):\n\nName: ${fullName || 'Guest'}\nAttendance: ${
        attendance === 'attending' ? 'Attending with joy' : 'Unable to attend'
      }\nGuest Count: ${guestCount}\nDietary: ${dietary}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full py-12 px-4 bg-[#fbf5eb] text-center">
      <div className="relative z-10 max-w-xl mx-auto">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
          Kindly Respond By 1st December 2026
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#5f250f] font-bold tracking-wide mb-1">
          Will You Join Us?
        </h2>
        <p className="text-xs md:text-sm text-[#5f250f]/75 font-serif italic mb-6">
          Your presence will multiply our joy on this sacred milestone
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#ffffff] border-2 border-[#dda45d]/60 p-6 md:p-8 shadow-[0_8px_25px_rgba(95,37,15,0.08)] text-left"
        >
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-14 h-14 text-[#dda45d] mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#5f250f] mb-2">
                Thank You, {fullName}!
              </h3>
              <p className="text-xs md:text-sm text-[#5f250f]/80 font-serif mb-5">
                Your RSVP response has been recorded. We eagerly look forward to welcoming you!
              </p>
              <button
                type="button"
                onClick={handleWhatsAppRsvp}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Anil & Sunita Kapoor"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-[#5f250f] placeholder-[#5f250f]/40 focus:border-[#5f250f] focus:outline-none text-xs font-serif"
                />
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-1">
                  Phone Number / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-[#5f250f] placeholder-[#5f250f]/40 focus:border-[#5f250f] focus:outline-none text-xs font-serif"
                />
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-2">
                  Will You Be Attending?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                      attendance === 'attending'
                        ? 'bg-[#5f250f] text-[#dda45d] border-[#5f250f] shadow-md'
                        : 'bg-[#fbf5eb] text-[#5f250f]/75 border-[#dda45d]/50 hover:border-[#5f250f]'
                    }`}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('declined')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                      attendance === 'declined'
                        ? 'bg-[#8b1d24] text-white border-[#8b1d24] shadow-md'
                        : 'bg-[#fbf5eb] text-[#5f250f]/75 border-[#dda45d]/50 hover:border-[#5f250f]'
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attendance === 'attending' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-1">
                      Number of Guests
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-[#5f250f] focus:border-[#5f250f] focus:outline-none text-xs font-serif"
                    >
                      <option value="1">1 (Just me)</option>
                      <option value="2">2 (Couple)</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ (Family)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-1">
                      Dietary Preference
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-[#5f250f] focus:border-[#5f250f] focus:outline-none text-xs font-serif"
                    >
                      <option value="Vegetarian">Pure Vegetarian</option>
                      <option value="Jain Vegetarian">Jain Vegetarian</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#5f250f] text-[#dda45d] font-bold text-xs uppercase tracking-widest shadow-md hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Submit RSVP
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
