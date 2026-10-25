import { describe, it, expect } from 'vitest';
import { weddingData, initialBlessings } from '../data/weddingData';

describe('Veena & Vishal Wedding Data & Itinerary Verification', () => {
  it('should have correct bride and groom names', () => {
    expect(weddingData.brideName).toBe('Veena Singh');
    expect(weddingData.groomName).toBe('Vishal Singh');
    expect(weddingData.hashtag).toBe('#VeenaWedsVishal');
  });

  it('should match the multiday celebration schedule requested by user', () => {
    // Haldi on 28 Nov 2026
    const haldi = weddingData.events.find(e => e.id === 'haldi');
    expect(haldi).toBeDefined();
    expect(haldi?.date).toContain('28 Nov');
    expect(haldi?.hindiTitle).toBe('शुभ हल्दी रस्म');

    // Mehndi on 29 Nov 2026
    const mehndi = weddingData.events.find(e => e.id === 'mehendi');
    expect(mehndi).toBeDefined();
    expect(mehndi?.date).toContain('29 Nov');
    expect(mehndi?.hindiTitle).toBe('मेहंदी उत्सव');

    // Shadi (phere) on 30 Nov 2026
    const shadi = weddingData.events.find(e => e.id === 'vivaah');
    expect(shadi).toBeDefined();
    expect(shadi?.date).toContain('30 Nov');
    expect(shadi?.hindiTitle).toBe('शुभ विवाह (सात फेरे)');
  });

  it('should have exact venue at Hotel Adarsh Vatika in Ballia, Uttar Pradesh', () => {
    expect(weddingData.venueName).toContain('Hotel Adarsh Vatika');
    expect(weddingData.venueAddress).toContain('Ballia');
    expect(weddingData.venueAddress).toContain('Uttar Pradesh');
    expect(weddingData.googleMapsUrl).toContain('Ballia');
  });

  it('should have valid ISO date for 30 Nov 2026 countdown', () => {
    const weddingDate = new Date(weddingData.weddingDateISO);
    expect(weddingDate.getFullYear()).toBe(2026);
    expect(weddingDate.getMonth()).toBe(10); // 0-indexed: 10 is November
    expect(weddingDate.getDate()).toBe(30);
  });

  it('should have initial blessings for the guest wall', () => {
    expect(initialBlessings.length).toBeGreaterThan(0);
    initialBlessings.forEach(b => {
      expect(b.name).toBeTruthy();
      expect(b.message).toBeTruthy();
    });
  });
});
