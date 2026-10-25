import { WeddingData, Blessing } from '../types/wedding';

export const weddingData: WeddingData = {
  brideName: "Veena Singh",
  groomName: "Vishal Singh",
  hashtag: "#VeenaWedsVishal",
  weddingDateISO: "2026-11-30T19:00:00+05:30",
  weddingDateDisplay: "Monday, 30 November 2026",
  muhuratDisplay: "शुभ मुहूर्त: 30 Nov 2026 • 7:00 PM Onwards",
  brideParents: "Shri. Ramesh Singh & Smt. Saraswati Singh",
  groomParents: "Shri. Suresh Singh & Smt. Kamla Singh",
  hostMessage: "Cordially invite you to join in the joyous multiday wedding festivities and auspicious ceremonies of their beloved children",
  venueName: "Hotel Adarsh Vatika | Banquet Hall",
  venueAddress: "Ballia, Uttar Pradesh, India",
  googleMapsUrl: "https://maps.google.com/?q=Hotel+Adarsh+Vatika+Banquet+Hall+Ballia+Uttar+Pradesh",
  events: [
    {
      id: "haldi",
      title: "Haldi Rasam",
      hindiTitle: "शुभ हल्दी रस्म",
      date: "Saturday, 28 Nov 2026",
      time: "11:00 AM Onwards",
      venue: "Hotel Adarsh Vatika, Ballia, Uttar Pradesh",
      dressCode: "Shades of Mustard & Sunshine Yellow (हल्दी पीला)",
      description: "Drenching Veena & Vishal in divine blessings, auspicious turmeric glow, flower showers, and timeless rituals.",
      iconName: "Sun"
    },
    {
      id: "mehendi",
      title: "Mehndi Utsav",
      hindiTitle: "मेहंदी उत्सव",
      date: "Sunday, 29 Nov 2026",
      time: "04:00 PM Onwards",
      venue: "Hotel Adarsh Vatika, Ballia, Uttar Pradesh",
      dressCode: "Festive Green & Floral (हरा एवं पुष्प परिधान)",
      description: "An evening of intricate henna artistry, traditional folk melodies, celebratory dance, and laughter.",
      iconName: "Sparkles"
    },
    {
      id: "vivaah",
      title: "Shubh Vivaah (Shadi - Phere)",
      hindiTitle: "शुभ विवाह (सात फेरे)",
      date: "Monday, 30 Nov 2026",
      time: "Baraat: 7:00 PM | Varmala: 8:30 PM | Phere: 10:00 PM",
      venue: "Hotel Adarsh Vatika | Banquet Hall in Ballia, Uttar Pradesh",
      dressCode: "Royal Traditional Indian Attire (भव्य पारंपरिक परिधान)",
      description: "Taking the seven sacred vows around the holy fire as Veena Singh and Vishal Singh unite for eternity amidst Vedic chants.",
      iconName: "Flame"
    }
  ]
};

export const initialBlessings: Blessing[] = [
  {
    id: "1",
    name: "Singh Family",
    relation: "Family",
    message: "Heartiest congratulations to Veena & Vishal! May Mahadev and Maa Parvati shower their infinite blessings on your married life!",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    name: "Rameshwar Singh & Family",
    relation: "Ballia Relatives",
    message: "Auspicious wishes for the grand wedding celebrations at Hotel Adarsh Vatika. Sada sukhi raho!",
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    name: "Pooja & Amit",
    relation: "Friends",
    message: "Can't wait to dance at the Haldi, Mehndi, and Baraat! Wishing Veena and Vishal a lifetime of love and happiness! #VeenaWedsVishal",
    timestamp: "1 day ago"
  }
];
