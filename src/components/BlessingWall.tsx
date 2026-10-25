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
      particleCount: 80,
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
    <section className="relative w-full py-20 px-4 bg-[#230a04] overflow-hidden text-center">
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[#dda45d] font-serif mb-1">
          Words of Love & Prayers
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#f7e8d4] font-bold tracking-wide mb-2">
          Blessing Wall
        </h2>
        <p className="text-sm text-[#f7e8d4]/70 font-serif italic mb-8">
          Leave your sacred blessings and warm wishes for Veena & Vishal
        </p>

        {/* Submit Blessing Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-[#361105]/90 border border-[#dda45d]/40 p-6 md:p-8 shadow-2xl backdrop-blur-md mb-12 text-left"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Uncle / Priya"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#200702]/80 border border-[#dda45d]/30 text-[#f7e8d4] placeholder-[#f7e8d4]/30 focus:border-[#dda45d] focus:outline-none text-sm font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-1">
                  Relationship with Couple
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#200702]/80 border border-[#dda45d]/30 text-[#f7e8d4] focus:border-[#dda45d] focus:outline-none text-sm font-serif"
                >
                  <option value="Bride's Family">Bride's Family</option>
                  <option value="Groom's Family">Groom's Family</option>
                  <option value="Friend of Couple">Friend of Couple</option>
                  <option value="Well Wisher">Well Wisher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-[#dda45d] mb-1">
                Your Blessing / Message *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers, blessings or dance wishes for the couple..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#200702]/80 border border-[#dda45d]/30 text-[#f7e8d4] placeholder-[#f7e8d4]/30 focus:border-[#dda45d] focus:outline-none text-sm font-serif resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {submittedMessage ? (
                <span className="text-xs text-[#dda45d] font-serif flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-4 h-4" /> Thank you for your heartfelt blessing!
                </span>
              ) : (
                <span className="text-[11px] text-[#f7e8d4]/50 font-serif italic">
                  Messages appear instantly on the live wall
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#b87c33] via-[#dda45d] to-[#b87c33] text-[#2b0e06] font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Blessing</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Live Blessing Feed */}
        <div className="space-y-4 text-left">
          {blessings.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-[#391206]/70 border border-[#dda45d]/30 shadow-md backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-[#dda45d]/20 text-[#dda45d]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#dda45d]">
                    {b.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#200702] text-[#f7e8d4]/70 font-serif">
                    {b.relation}
                  </span>
                </div>
                <span className="text-[10px] text-[#f7e8d4]/50 font-serif">
                  {b.timestamp}
                </span>
              </div>
              <p className="text-xs md:text-sm text-[#f7e8d4]/85 font-serif italic leading-relaxed">
                "{b.message}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
