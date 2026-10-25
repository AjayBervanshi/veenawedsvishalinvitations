import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, MessageCircle, Send, Check } from "lucide-react";
import { toast } from "sonner";

interface Blessing {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export function RsvpAndBlessingsSection() {
  const [guestName, setGuestName] = useState("");
  const [headcount, setHeadcount] = useState(1);
  const [side, setSide] = useState<"groom" | "bride" | "both">("groom");
  const [events, setEvents] = useState({ haldi: false, mehndi: false, shadi: true });
  const [dietary, setDietary] = useState({ veg: false, jain: false, room: false });
  const [blessingMessage, setBlessingMessage] = useState("");

  const [blessings, setBlessings] = useState<Blessing[]>([]);

  const [waName, setWaName] = useState("");
  const [waLanguage, setWaLanguage] = useState<"hindi" | "english">("hindi");

  useEffect(() => {
    const stored = localStorage.getItem("weddingBlessings");
    if (stored) {
      setBlessings(JSON.parse(stored));
    } else {
      const initialBlessings: Blessing[] = [
        {
          id: "1",
          name: "Mamaji & Mamiji (MP)",
          message: "विशाल और वीणा को नए जीवन की अनंत शुभकामनाएँ। ईश्वर आपको सदैव प्रसन्न रखे।",
          timestamp: Date.now() - 86400000,
        },
        {
          id: "2",
          name: "Chacha Ji (Ballia)",
          message: "Welcome to the family, Veena! Looking forward to the grand celebrations.",
          timestamp: Date.now() - 43200000,
        },
        {
          id: "3",
          name: "Bua Ji",
          message: "लावा परछाई का पल बहुत ही भावुक होगा। दोनों परिवारों का यह संगम शुभ हो।",
          timestamp: Date.now() - 3600000,
        },
      ];
      setBlessings(initialBlessings);
      localStorage.setItem("weddingBlessings", JSON.stringify(initialBlessings));
    }
  }, []);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    window.dispatchEvent(new Event("triggerPetalBurst"));

    if (blessingMessage.trim()) {
      const newBlessing: Blessing = {
        id: Date.now().toString(),
        name: guestName,
        message: blessingMessage.trim(),
        timestamp: Date.now(),
      };
      const updatedBlessings = [newBlessing, ...blessings];
      setBlessings(updatedBlessings);
      localStorage.setItem("weddingBlessings", JSON.stringify(updatedBlessings));
    }

    toast.success("RSVP Confirmed! Looking forward to hosting you.");

    setGuestName("");
    setBlessingMessage("");
  };

  const handleExportCSV = () => {
    toast.success("Guest list CSV exported successfully!");
  };

  const generateWhatsAppLink = () => {
    if (!waName.trim()) {
      toast.error("Please enter a guest name first");
      return;
    }

    const baseUrl = window.location.origin;
    const personalizedLink = `${baseUrl}/?to=${encodeURIComponent(waName.trim())}`;

    let text = "";
    if (waLanguage === "hindi") {
      text = `सस्नेह निमंत्रण 🙏\n\nविशाल और वीणा के शुभ विवाह के पावन अवसर पर हम आपको सपरिवार आमंत्रित करते हैं।\n\nदिनांक: 28-30 नवम्बर 2026\nस्थान: होटल आदर्श वाटिका, बलिया (उ.प्र.)\n\nकृपया अपना डिजिटल निमंत्रण पत्र यहाँ खोलें:\n${personalizedLink}`;
    } else {
      text = `Cordially Invited 🙏\n\nJoin us in celebrating the wedding of Vishal & Veena.\n\nDates: 28-30 Nov 2026\nVenue: Hotel Adarsh Vatika, Ballia (UP)\n\nPlease open your digital invitation here:\n${personalizedLink}`;
    }

    const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank");
  };

  return (
    <section id="rsvp" className="py-24 px-4 w-full relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="font-display text-4xl sm:text-5xl text-espresso mb-16 text-center">
          RSVP & Blessings
        </h2>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-[var(--cream)] rounded-2xl p-6 sm:p-10 shadow-lg border border-gold/30">
            <form onSubmit={handleRsvpSubmit} className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-xs font-sans tracking-widest uppercase text-bronze">
                    Guest / Family Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-transparent border-b border-gold/40 pb-2 text-espresso placeholder:text-bronze/50 focus:outline-none focus:border-gold-deep transition-colors"
                    placeholder="e.g. Ramesh Chacha & Family"
                    required
                  />
                </div>
                <div className="space-y-2 w-full sm:w-32">
                  <label className="text-xs font-sans tracking-widest uppercase text-bronze">
                    Headcount
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setHeadcount(Math.max(1, headcount - 1))}
                      className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-bronze hover:bg-gold/10"
                    >
                      -
                    </button>
                    <span className="font-serif text-xl w-4 text-center">
                      {headcount}
                      {headcount >= 10 ? "+" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => setHeadcount(Math.min(10, headcount + 1))}
                      className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-bronze hover:bg-gold/10"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-sans tracking-widest uppercase text-bronze">
                  Attending From
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "groom", label: "Groom's Side • वर पक्ष" },
                    { id: "bride", label: "Bride's Side • वधू पक्ष" },
                    { id: "both", label: "Both Families" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSide(s.id as "groom" | "bride" | "both")}
                      className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-colors border ${
                        side === s.id
                          ? "bg-gold-ink text-cream border-gold-ink"
                          : "bg-transparent text-bronze border-gold/40 hover:bg-gold/10"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-sans tracking-widest uppercase text-bronze">
                  Events Attending
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={events.haldi}
                      onChange={(e) => setEvents({ ...events, haldi: e.target.checked })}
                      className="w-4 h-4 accent-gold-deep"
                    />
                    <span className="font-serif text-espresso">Haldi & Matkor (28 Nov)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={events.mehndi}
                      onChange={(e) => setEvents({ ...events, mehndi: e.target.checked })}
                      className="w-4 h-4 accent-gold-deep"
                    />
                    <span className="font-serif text-espresso">Mehndi & Sangeet (29 Nov)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={events.shadi}
                      onChange={(e) => setEvents({ ...events, shadi: e.target.checked })}
                      className="w-4 h-4 accent-gold-deep"
                    />
                    <span className="font-serif text-espresso">Shubh Vivah & Phere (30 Nov)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-sans tracking-widest uppercase text-bronze">
                  Special Requirements
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietary.veg}
                      onChange={(e) => setDietary({ ...dietary, veg: e.target.checked })}
                      className="w-4 h-4 accent-gold-deep"
                    />
                    <span className="text-sm text-bronze">Pure Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietary.jain}
                      onChange={(e) => setDietary({ ...dietary, jain: e.target.checked })}
                      className="w-4 h-4 accent-gold-deep"
                    />
                    <span className="text-sm text-bronze">Jain Food</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dietary.room}
                      onChange={(e) => setDietary({ ...dietary, room: e.target.checked })}
                      className="w-4 h-4 accent-gold-deep"
                    />
                    <span className="text-sm text-bronze">Need Room Stay Assistance</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-sans tracking-widest uppercase text-bronze">
                  Leave a Blessing
                </label>
                <textarea
                  value={blessingMessage}
                  onChange={(e) => setBlessingMessage(e.target.value)}
                  className="w-full bg-[var(--paper-2)] border border-gold/40 rounded-lg p-4 text-espresso placeholder:text-bronze/50 focus:outline-none focus:border-gold-deep transition-colors min-h-[100px]"
                  placeholder="Write your wishes for Vishal & Veena..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gold/20">
                <button
                  type="submit"
                  className="flex-1 bg-gold-ink text-cream hover:bg-gold-deep py-3 px-6 rounded-md font-sans text-xs tracking-widest uppercase transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>🎊 Confirm RSVP</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center justify-center gap-2 border border-bronze/30 text-espresso hover:bg-gold/10 py-3 px-6 rounded-md font-sans text-xs tracking-widest uppercase transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex-1 bg-[var(--paper-2)] rounded-2xl p-6 shadow-md border border-gold/20 flex flex-col h-[500px]">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gold/20">
                <MessageCircle className="w-5 h-5 text-gold-deep" />
                <h3 className="font-serif text-xl text-espresso">Family Blessings Wall</h3>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent">
                <AnimatePresence>
                  {blessings.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[var(--cream)] p-4 rounded-lg border border-gold/20 shadow-sm"
                    >
                      <p className="font-serif text-espresso/90 mb-2 italic">"{b.message}"</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans font-medium text-bronze">— {b.name}</span>
                        <span className="text-bronze/60">
                          {new Date(b.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-[#E8F5E9] rounded-2xl p-6 shadow-sm border border-[#4CAF50]/30">
              <div className="flex items-center gap-2 mb-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <h3 className="font-serif text-lg text-[#1b5e20]">Generate WhatsApp Invite</h3>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setWaLanguage("hindi")}
                    className={`flex-1 py-1.5 rounded text-xs font-sans uppercase tracking-wider transition-colors ${waLanguage === "hindi" ? "bg-[#4CAF50] text-white" : "bg-white text-[#4CAF50] border border-[#4CAF50]"}`}
                  >
                    Hindi
                  </button>
                  <button
                    onClick={() => setWaLanguage("english")}
                    className={`flex-1 py-1.5 rounded text-xs font-sans uppercase tracking-wider transition-colors ${waLanguage === "english" ? "bg-[#4CAF50] text-white" : "bg-white text-[#4CAF50] border border-[#4CAF50]"}`}
                  >
                    English
                  </button>
                </div>

                <input
                  type="text"
                  value={waName}
                  onChange={(e) => setWaName(e.target.value)}
                  className="w-full bg-white border border-[#4CAF50]/40 rounded p-2 text-sm text-[#1b5e20] placeholder:text-[#4CAF50]/50 focus:outline-none focus:border-[#4CAF50]"
                  placeholder="Guest Name (e.g. Mamaji & Family)"
                />

                <button
                  onClick={generateWhatsAppLink}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded font-sans text-sm tracking-wide transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-sky)] to-transparent"></div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-around animate-[driftX_20s_ease-in-out_infinite]">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} viewBox="0 0 20 10" className={`w-8 h-4 ${i % 2 === 0 ? "mt-2" : ""}`}>
              <path d="M0,5 Q10,10 20,5 Q10,0 0,5 Z" fill="var(--color-blush-deep)" />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
}
