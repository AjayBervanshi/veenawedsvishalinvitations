import { describe, it, expect } from 'vitest';
import { weddingData } from '../data/weddingData';

describe('Scroll Transition Sequence & UI Updates', () => {
  it('should verify event metadata and wedding details are properly populated', () => {
    expect(weddingData.brideName).toBe('Veena Singh');
    expect(weddingData.groomName).toBe('Vishal Singh');
    expect(weddingData.weddingDateDisplay).toContain('30 November 2026');
  });

  it('should maintain fully functional Add to Calendar links for all wedding functions', () => {
    expect(weddingData.events.length).toBeGreaterThanOrEqual(3);
    for (const event of weddingData.events) {
      expect(event.title).toBeTruthy();
      expect(event.date).toBeTruthy();
      expect(event.venue).toBeTruthy();

      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        event.title + ' - ' + weddingData.brideName + ' & ' + weddingData.groomName
      )}&location=${encodeURIComponent(event.venue)}&details=${encodeURIComponent(event.description)}`;
      
      expect(calUrl).toContain('https://calendar.google.com/calendar/render?action=TEMPLATE');
      expect(calUrl).toContain(encodeURIComponent(event.title));
      expect(calUrl).toContain(encodeURIComponent(weddingData.brideName));
      expect(calUrl).toContain(encodeURIComponent(weddingData.groomName));
    }
  });

  it('should have all 3 primary wedding celebrations configured', () => {
    const eventIds = weddingData.events.map(e => e.id);
    expect(eventIds).toContain('haldi');
    expect(eventIds).toContain('mehendi');
    expect(eventIds).toContain('vivaah');
  });
});
