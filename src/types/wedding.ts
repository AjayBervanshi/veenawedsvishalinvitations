export interface EventColorSwatch {
  name: string;
  hex: string;
  accentClass: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  hindiTitle?: string;
  date: string;
  time: string;
  venue?: string;
  dressCode?: string;
  description: string;
  iconName: string;
  colorSwatch?: EventColorSwatch;
  rituals?: string[];
  calendarDates?: string;
}

export interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

export interface WeddingData {
  brideName: string;
  groomName: string;
  hashtag: string;
  weddingDateISO: string; // "2026-12-12T10:30:00"
  weddingDateDisplay: string;
  muhuratDisplay: string;
  brideParents: string;
  groomParents: string;
  hostMessage: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  events: WeddingEvent[];
}
