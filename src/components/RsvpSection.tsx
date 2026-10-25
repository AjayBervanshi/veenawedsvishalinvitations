import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, UserCheck, MessageSquareShare } from 'lucide-react';
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
        particleCount: 100,
        spread: 80,
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
    <section className="relative w-full py-20 px-4 bg-[#290c05] overflow-hidden text-center">
      <div className="relative z-10 max-w-xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[#dda45d] font-serif mb-1">
          Kindly Respond By 1st December 2026
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#f7e8d4] font-bold tracking-wide mb-2">
          Will You Join Us?
        </h2>
        <p className="text-sm text-[#f7e8d4]/70 font-serif italic mb-8">
          Your presence will multiply our joy on this sacred milestone
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#391206]/90 border border-[#dda45d]/40 p-6 md:p-8 shadow-2xl backdrop-blur-md text-left"
        >
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-[#dda45d] mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-[#f7e8d4] mb-2">
                Thank You, {fullName}!
              </h3>
              <p className="text-sm text-[#f7e8d4]/80 font-serif mb-6">
                Your RSVP response has been recorded. We eagerly look forward to celebrating with you!
              </p>
              <button
                type="button"
                onClick={handleWhatsAppRsvp}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Anil & Sunita Kapoor"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#200702]/80 border border-[#dda45d]/30 text-[#f7e8d4] placeholder-[#f7e8d4]/30 focus:border-[#dda45d] focus:outline-none text-sm font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-1">
                  Phone Number / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#200702]/80 border border-[#dda45d]/30 text-[#f7e8d4] placeholder-[#f7e8d4]/30 focus:border-[#dda45d] focus:outline-none text-sm font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-2">
                  Will You Be Attending?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`p-3 rounded-xl border text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                      attendance === 'attending'
                        ? 'bg-[#dda45d] text-[#2b0e06] border-[#dda45d] shadow-lg'
                        : 'bg-[#200702]/70 text-[#f7e8d4]/70 border-[#dda45d]/30 hover:border-[#dda45d]'
                    }`}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('declined')}
                    className={`p-3 rounded-xl border text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                      attendance === 'declined'
                        ? 'bg-[#8b1d24] text-white border-[#8b1d24] shadow-lg'
                        : 'bg-[#200702]/70 text-[#f7e8d4]/70 border-[#dda45d]/30 hover:border-[#dda45d]'
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attendance === 'attending' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-1">
                      Number of Guests
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#200702]/80 border border-[#dda45d]/30 text-[#f7e8d4] focus:border-[#dda45d] focus:outline-none text-sm font-serif"
                    >
                      <option value="1">1 (Just me)</option>
                      <option value="2">2 (Couple)</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ (Family)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-1">
                      Dietary Preference
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#200702]/80 border border-[#dda45d]/30 text-[#f7e8d4] focus:border-[#dda45d] focus:outline-none text-sm font-serif"
                    >
                      <option value="Vegetarian">Pure Vegetarian</option>
                      <option value="Jain Vegetarian">Jain Vegetarian</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#b87c33] via-[#dda45d] to-[#b87c33] text-[#2b0e06] font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
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
