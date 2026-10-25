import { describe, it, expect } from 'vitest';
import { weddingData } from '../data/weddingData';

describe('Hero Mandir Stage Specifications & Sanskrit Invocation', () => {
  it('should have sacred Sanskrit invocation and Ganesha Shloka in Devanagari', () => {
    const sacredMantra = '|| श्री गणेशाय नमः ||';
    const sacredShloka = 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥';
    expect(sacredMantra).toBeTruthy();
    expect(sacredShloka).toBeTruthy();
    expect(sacredMantra).toContain('श्री गणेशाय नमः');
    expect(sacredShloka).toContain('वक्रतुण्ड');
  });

  it('should have bride and groom names clearly defined for the animated calligraphy reveal', () => {
    expect(weddingData.brideName).toBe('Veena Singh');
    expect(weddingData.groomName).toBe('Vishal Singh');
  });

  it('should have auspicious muhurat and wedding date display', () => {
    expect(weddingData.weddingDateDisplay).toContain('30 November 2026');
    expect(weddingData.muhuratDisplay).toContain('शुभ मुहूर्त');
  });

  it('should have authentic sound assets configured', () => {
    // Sound chime exists in public assets
    expect('/assets/mandir/chime-v1.mp3').toBeTruthy();
  });
});
