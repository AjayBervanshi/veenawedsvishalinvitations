import { WeddingEvent, Blessing } from '../types/wedding';

/**
 * Builds a standardized Google Calendar event URL with title, dates, location, and description
 */
export function buildGoogleCalendarUrl(
  event: WeddingEvent,
  brideName: string,
  groomName: string
): string {
  const title = `${event.title} - ${brideName} & ${groomName}`;
  const datesParam = event.calendarDates
    ? `&dates=${encodeURIComponent(event.calendarDates)}`
    : '';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}${datesParam}&location=${encodeURIComponent(event.venue || '')}&details=${encodeURIComponent(
    event.description
  )}`;
}

/**
 * Robust cross-browser and cross-protocol (HTTP/HTTPS) clipboard copy
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback for HTTP environments or browsers without navigator.clipboard
  if (typeof document !== 'undefined' && document?.createElement) {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  }

  return false;
}

const BLESSINGS_STORAGE_KEY = 'veena_vishal_blessings_v1';
const RSVP_STORAGE_KEY = 'veena_vishal_rsvp_v1';

const isTestOrSpam = (b: Blessing): boolean => {
  const msg = (b.message || '').toLowerCase();
  const name = (b.name || '').toLowerCase();
  return (
    msg.includes('huhouhiuhuihlygyg') ||
    (name === 'aj' && msg.includes('huhou'))
  );
};

export function getStoredBlessings(defaultBlessings: Blessing[]): Blessing[] {
  try {
    const raw = localStorage.getItem(BLESSINGS_STORAGE_KEY);
    if (!raw) return defaultBlessings;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultBlessings;
    
    // Filter out test or junk comments
    const cleaned = parsed.filter((b: Blessing) => !isTestOrSpam(b));
    if (cleaned.length !== parsed.length) {
      saveStoredBlessings(cleaned);
    }
    return cleaned;
  } catch {
    return defaultBlessings;
  }
}

export function saveStoredBlessings(blessings: Blessing[]): void {
  try {
    localStorage.setItem(BLESSINGS_STORAGE_KEY, JSON.stringify(blessings));
  } catch {
    // Ignore storage quota or disabled localStorage errors
  }
}

export function deleteStoredBlessing(id: string, currentBlessings: Blessing[]): Blessing[] {
  const updated = currentBlessings.filter(b => b.id !== id);
  saveStoredBlessings(updated);
  return updated;
}

export interface StoredRsvp {
  name: string;
  phone: string;
  attending: 'attending' | 'declined';
  guests: string;
  submittedAt: string;
}

export function getStoredRsvp(): StoredRsvp | null {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredRsvp(rsvp: StoredRsvp): void {
  try {
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvp));
  } catch {
    // Ignore storage errors
  }
}
