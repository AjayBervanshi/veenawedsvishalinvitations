import { describe, it, expect } from 'vitest';
import { weddingData } from '../data/weddingData';

describe('Wedding Data & Configuration Integrity', () => {
  it('should have valid couple names', () => {
    expect(weddingData.brideName).toBe('Veena');
    expect(weddingData.groomName).toBe('Vishal');
    expect(weddingData.hashtag).toBe('#VeenaWedsVishal');
  });

  it('should have complete ceremonies timeline', () => {
    expect(weddingData.events.length).toBeGreaterThanOrEqual(5);
    const vivaah = weddingData.events.find(e => e.id === 'vivaah');
    expect(vivaah).toBeDefined();
    expect(vivaah?.hindiTitle).toContain('विवाह');
  });

  it('should have valid date ISO and location', () => {
    const weddingDate = new Date(weddingData.weddingDateISO);
    expect(weddingDate.getTime()).not.toBeNaN();
    expect(weddingData.venueName).toBeTruthy();
    expect(weddingData.googleMapsUrl).toContain('maps.google.com');
  });
});
