import { WeddingData, Blessing } from '../types/wedding';

export const weddingData: WeddingData = {
  brideName: "Veena",
  groomName: "Vishal",
  hashtag: "#VeenaWedsVishal",
  weddingDateISO: "2026-12-14T10:30:00",
  weddingDateDisplay: "Monday, 14 December 2026",
  muhuratDisplay: "Auspicious Muhurat: 10:30 AM onwards (शुभ मुहूर्त)",
  brideParents: "Shri. Ramesh & Smt. Saraswati Sharma",
  groomParents: "Shri. Suresh & Smt. Kamla Verma",
  hostMessage: "Cordially invite you to celebrate the sacred union and auspicious wedding ceremonies of our beloved children",
  venueName: "The Grand Mandir Pavilion & Palace",
  venueAddress: "Heritage Grand Lawns, Palace Road, Jaipur, Rajasthan",
  googleMapsUrl: "https://maps.google.com/?q=Heritage+Grand+Palace",
  events: [
    {
      id: "ganesh-puja",
      title: "Ganesh Sthapana & Puja",
      hindiTitle: "श्री गणेश स्थापना एवं पूजन",
      date: "Saturday, 12 December 2026",
      time: "9:00 AM Onwards",
      venue: "Shiva Temple Hall, The Grand Pavilion",
      dressCode: "Traditional Yellow & Orange (पारंपरिक पीला)",
      description: "Invoking the blessings of Lord Ganesha for a blissful and auspicious beginning to our wedding celebrations.",
      iconName: "Flame"
    },
    {
      id: "mehendi",
      title: "Mehendi Ceremony",
      hindiTitle: "मेहंदी उत्सव",
      date: "Saturday, 12 December 2026",
      time: "4:00 PM Onwards",
      venue: "Royal Courtyard, The Grand Pavilion",
      dressCode: "Festive Green & Floral (हरा एवं पुष्प परिधान)",
      description: "An evening of intricate henna artistry, folk music, laughter, and celebratory dance.",
      iconName: "Sparkles"
    },
    {
      id: "haldi",
      title: "Haldi Rasam",
      hindiTitle: "शुभ हल्दी रस्म",
      date: "Sunday, 13 December 2026",
      time: "10:00 AM Onwards",
      venue: "Poolside Gardens, The Grand Pavilion",
      dressCode: "Shades of Mustard & Sunshine (हल्दी पीला)",
      description: "Drenching the bride and groom in love, turmeric glow, marigold flower showers, and timeless rituals.",
      iconName: "Sun"
    },
    {
      id: "sangeet",
      title: "Sangeet & Cocktail Night",
      hindiTitle: "संगीत एवं नृत्य संध्या",
      date: "Sunday, 13 December 2026",
      time: "7:00 PM Onwards",
      venue: "Grand Ballroom, The Grand Pavilion",
      dressCode: "Indo-Western Glitz & Glamour (शाही परिधान)",
      description: "A grand musical celebration with family performances, joyous music, and non-stop dancing under the stars.",
      iconName: "Music"
    },
    {
      id: "vivaah",
      title: "Shubh Vivaah (The Sacred Pheras)",
      hindiTitle: "शुभ विवाह एवं सात फेरे",
      date: "Monday, 14 December 2026",
      time: "10:30 AM (Baraat: 9:30 AM)",
      venue: "The Central Mandap, The Grand Pavilion",
      dressCode: "Royal Traditional Indian Attire (भव्य भारतीय पोशाक)",
      description: "Taking the seven sacred vows around the holy fire as Veena and Vishal unite as one for eternity.",
      iconName: "Heart"
    },
    {
      id: "reception",
      title: "Grand Wedding Reception",
      hindiTitle: "शाही प्रतिभोज (रिसेप्शन)",
      date: "Monday, 14 December 2026",
      time: "7:30 PM Onwards",
      venue: "Palace Lawns, The Grand Pavilion",
      dressCode: "Formal Indian or Western Elegance (भव्य शाम परिधान)",
      description: "An enchanting feast of royal culinary delights, blessings, and welcoming the newlyweds into their new life.",
      iconName: "GlassWater"
    }
  ]
};

export const initialBlessings: Blessing[] = [
  {
    id: "1",
    name: "Uncle Rajesh & Family",
    relation: "Groom's Family",
    message: "Wishing dearest Veena & Vishal a lifetime of endless joy, love, and sacred companionship! Sada sukhi raho!",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    name: "Sunita Masi",
    relation: "Bride's Family",
    message: "May Lord Ganesha and Goddess Lakshmi bless both of you with prosperity, peace, and eternal togetherness. So thrilled for you both!",
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    name: "Aman & Pooja",
    relation: "Friends",
    message: "Can't wait to dance at the Sangeet! You two are truly made for each other. Congratulations to Veena and Vishal!",
    timestamp: "1 day ago"
  }
];
