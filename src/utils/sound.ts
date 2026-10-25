// Sound Manager for Mandir Temple Bells and Background Audio

class SoundManager {
  private chimeAudio: HTMLAudioElement | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isAudioUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.chimeAudio = new Audio('/assets/mandir/chime-v1.mp3');
      this.chimeAudio.preload = 'auto';
    }
  }

  // Play crisp temple bell chime
  public playBellChime() {
    if (this.isMuted || !this.chimeAudio) return;
    try {
      // Clone audio to allow overlapping bell chimes
      const chimeClone = this.chimeAudio.cloneNode(true) as HTMLAudioElement;
      chimeClone.volume = 0.85;
      chimeClone.play().catch(() => {
        // Browser autoplay restriction before user interaction
      });
    } catch (e) {
      console.warn("Chime play error:", e);
    }
  }

  // Unlock and start background music (user gesture)
  public startBackgroundMusic() {
    this.isAudioUnlocked = true;
    this.playBellChime();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
