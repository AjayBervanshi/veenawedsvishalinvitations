// Verified wedding data — single source of truth for every section.

export const COUPLE = {
  groom: "Vishal Singh",
  groomHindi: "विशाल सिंह",
  groomPrefix: "श्री",
  bride: "Veena Singh",
  brideHindi: "वीणा सिंह",
  bridePrefix: "सौ.",
  hashtags: ["#VishalKiVeena", "#VeenaVivah2026"],
  datesLabel: "28–30 November 2026",
  locationLabel: "Ballia, Uttar Pradesh",
};

export type CeremonyId = "haldi" | "mehndi" | "shadi";

export interface Ceremony {
  id: CeremonyId;
  day: number;
  title: string;
  hindi: string;
  dateISO: string; // IST (+05:30)
  dateLabel: string;
  weekday: string;
  time: string;
  palette: string;
  dressCode: string[];
  cultural: string[];
  venue: string;
  swatches: { name: string; className: string }[];
  theme: {
    card: string;
    deep: string;
    ink: string;
    wash: string;
  };
}

export const CEREMONIES: Ceremony[] = [
  {
    id: "haldi",
    day: 1,
    title: "Haldi Kalash & Matkor Utsav",
    hindi: "शुभ हल्दी एवं मटकोर",
    dateISO: "2026-11-28T10:00:00+05:30",
    dateLabel: "28 November 2026",
    weekday: "Saturday",
    time: "10:00 AM Onwards",
    palette: "Auspicious Haldi Butter-Yellow & Sky Blue",
    dressCode: ["Butter Yellow", "Sky Blue", "Marigold"],
    cultural: [
      "Traditional Bihari–Purvanchali Haradi-Matkor ritual",
      "Auspicious turmeric Kalash blessings",
      "Marigold showers & Mangal Geet",
    ],
    venue: "Family Residence, Ballia",
    swatches: [
      { name: "Haldi", className: "bg-haldi-mid" },
      { name: "Sky", className: "bg-sky-deep" },
      { name: "Marigold", className: "bg-haldi-deep" },
    ],
    theme: {
      card: "bg-haldi/60",
      deep: "text-haldi-deep",
      ink: "text-haldi-deep",
      wash: "from-haldi/70 to-sky/50",
    },
  },
  {
    id: "mehndi",
    day: 2,
    title: "Mehndi Rachni & Bundeli–Bhojpuri Sangeet",
    hindi: "मेहंदी रचनी एवं संगीत संध्या",
    dateISO: "2026-11-29T16:00:00+05:30",
    dateLabel: "29 November 2026",
    weekday: "Sunday",
    time: "4:00 PM Onwards",
    palette: "Pastel Lavender-Purple, Powder Sky-Blue & Sage",
    dressCode: ["Lavender", "Powder Blue", "Sage"],
    cultural: [
      "Intricate Mehndi artistry for the bride",
      "Bundeli & Bagheli folk rhythms of Madhya Pradesh",
      "Purvanchal Geet-Gawai with dholak beats",
    ],
    venue: "Family Residence, Ballia",
    swatches: [
      { name: "Lavender", className: "bg-lavender-deep" },
      { name: "Sky", className: "bg-sky-deep" },
      { name: "Sage", className: "bg-sage-deep" },
    ],
    theme: {
      card: "bg-lavender/50",
      deep: "text-lavender-ink",
      ink: "text-lavender-ink",
      wash: "from-lavender/60 to-sky/60",
    },
  },
  {
    id: "shadi",
    day: 3,
    title: "Shubh Vivah, Dwarpuja, Parchhan & Phere",
    hindi: "शुभ विवाह, द्वारपूजा एवं सप्तपदी फेरे",
    dateISO: "2026-11-30T19:00:00+05:30",
    dateLabel: "30 November 2026",
    weekday: "Monday",
    time: "7:00 PM Onwards",
    palette: "Shubh Sindoor Red, Blush Rose, Royal Purple & Champagne Gold",
    dressCode: ["Sindoor Red", "Blush Rose", "Royal Purple", "Champagne Gold"],
    cultural: [
      "Baraat Swagat & Dwarpuja at 7:00 PM",
      "Jaimala at 8:30 PM",
      "Shubh Phere, Sindoor Daan & Lava Parchhai at the auspicious Muhurat",
    ],
    venue: "Hotel Adarsh Vatika, Ballia",
    swatches: [
      { name: "Sindoor", className: "bg-sindoor" },
      { name: "Blush", className: "bg-blush-deep" },
      { name: "Gold", className: "bg-gold" },
    ],
    theme: {
      card: "bg-blush/60",
      deep: "text-sindoor",
      ink: "text-sindoor",
      wash: "from-blush/70 to-lavender/40",
    },
  },
];

export const VENUE = {
  name: "Hotel Adarsh Vatika",
  tagline: "Hotel • Banquet • Pool",
  address:
    "Ramadhin Puram, Harpura, Behind Shanti Hospital / Near Chhaya Talkies & NCC Tiraha, Ballia–Bansdih Road, Tikhampur, Ballia, Uttar Pradesh 277001",
  shortAddress: "Ramadhin Puram, Harpura, Tikhampur, Ballia, Uttar Pradesh 277001",
  rating: "★ 4.4 (517+ Google Reviews)",
  lawns: "Gardenia One (The Grand Lawn, Gate 1) & Gardenia Two (The Royal Lawn, Gate 4)",
  stays: "12 AC Guest Rooms • Garden Swimming Pool • Valet Parking",
  phone: "+91 87000 31819",
  email: "hello@adarshvatika.com",
  website: "https://adarshvatika.com/",
  venuesPage: "https://adarshvatika.com/venues",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Hotel+Adarsh+Vatika+Tikhampur+Ballia+Uttar+Pradesh+277001",
};

export const BROTHER_NOTE = {
  title: "भाई का स्नेह और वचन • A Brother's Promise & Lava Parchhai Blessing for Veena",
  quote:
    "From growing up together in our courtyard to pouring the sacred Lava into your hands beside the wedding fire (लावा परछाई), my prayers and pride walk with you into every tomorrow, Veena. Welcome to the family, Vishal Jiju!",
  hindiQuote:
    "आँगन की वो मस्ती से लेकर विवाह अग्नि के पवित्र लावा परछाई तक — हर कल में मेरी प्रार्थनाएँ और मेरा मान तुम्हारे साथ चलेगा, वीणा। विशाल जीजा, परिवार में आपका स्वागत है!",
};

export const GANESH_SHLOKA =
  "॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥";

export const SIDE_OPTIONS = [
  { value: "groom", label: "Groom's Side • वर पक्ष" },
  { value: "bride", label: "Bride's Side • वधू पक्ष" },
  { value: "both", label: "Both Families" },
] as const;

export const DIETARY_OPTIONS = [
  "Pure Vegetarian",
  "Jain Food",
  "Need Room Stay Assistance in Ballia",
] as const;
