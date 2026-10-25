import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Blessing } from '../types/wedding';
import { Heart, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BlessingWallProps {
  initialBlessings: Blessing[];
}

export const BlessingWall: React.FC<BlessingWallProps> = ({ initialBlessings }) => {
  const [blessings, setBlessings] = useState<Blessing[]>(initialBlessings);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend / Family');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Trigger golden marigold flower petal confetti celebration
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dda45d', '#e67e22', '#f39c12', '#f1c40f', '#d35400']
    });

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      name: name.trim(),
      relation: relation,
      message: message.trim(),
      timestamp: "Just now"
    };

    setBlessings([newBlessing, ...blessings]);
    setName('');
    setMessage('');
    setIsSubmitting(false);
    setSubmittedMessage(true);

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 4000);
  };

  return (
    <section className="relative w-full py-12 px-4 bg-[#fbf5eb] text-center">
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#ab5626] font-serif font-bold mb-1">
          Words of Love & Prayers
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#5f250f] font-bold tracking-wide mb-1">
          Blessing Wall
        </h2>
        <p className="text-xs md:text-sm text-[#5f250f]/75 font-serif italic mb-6">
          Leave your sacred blessings and warm wishes for Veena & Vishal
        </p>

        {/* Submit Blessing Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#ffffff] border-2 border-[#dda45d]/60 p-5 md:p-7 shadow-[0_8px_25px_rgba(95,37,15,0.08)] mb-8 text-left"
        >
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Uncle / Priya"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-[#5f250f] placeholder-[#5f250f]/40 focus:border-[#5f250f] focus:outline-none text-xs font-serif"
                />
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-1">
                  Relationship
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-[#5f250f] focus:border-[#5f250f] focus:outline-none text-xs font-serif"
                >
                  <option value="Bride's Family">Bride's Family</option>
                  <option value="Groom's Family">Groom's Family</option>
                  <option value="Friend of Couple">Friend of Couple</option>
                  <option value="Well Wisher">Well Wisher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-serif uppercase tracking-wider text-[#ab5626] font-bold mb-1">
                Your Blessing / Message *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers, blessings or dance wishes for the couple..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#fbf5eb] border border-[#dda45d]/50 text-[#5f250f] placeholder-[#5f250f]/40 focus:border-[#5f250f] focus:outline-none text-xs font-serif resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {submittedMessage ? (
                <span className="text-xs text-[#ab5626] font-serif flex items-center gap-1.5 font-bold animate-pulse">
                  <Sparkles className="w-4 h-4 text-[#dda45d]" /> Thank you for your blessing!
                </span>
              ) : (
                <span className="text-[11px] text-[#5f250f]/60 font-serif italic">
                  Messages appear instantly
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5f250f] text-[#dda45d] font-bold text-xs uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Blessing</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Live Blessing Feed */}
        <div className="space-y-3 text-left">
          {blessings.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-[#ffffff] border border-[#dda45d]/40 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-[#dda45d]/20 text-[#5f250f]">
                    <Heart className="w-3 h-3 fill-current" />
                  </div>
                  <h4 className="text-xs md:text-sm font-serif font-bold text-[#5f250f]">
                    {b.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fbf5eb] border border-[#dda45d]/30 text-[#ab5626] font-serif font-semibold">
                    {b.relation}
                  </span>
                </div>
                <span className="text-[10px] text-[#5f250f]/50 font-serif">
                  {b.timestamp}
                </span>
              </div>
              <p className="text-xs text-[#5f250f]/80 font-serif italic leading-relaxed">
                "{b.message}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
