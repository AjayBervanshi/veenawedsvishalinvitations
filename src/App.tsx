import React, { useState, useEffect } from 'react';
import { weddingData } from './data/weddingData';
import { OpeningCurtain } from './components/OpeningCurtain';
import { MandirFullCanvas } from './components/MandirFullCanvas';
import { AudioDock } from './components/AudioDock';
import { FloatingPetals } from './components/FloatingPetals';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Guarantee that before and while the curtain is active, scroll is locked at (0, 0)
  // and any hash is cleared so the browser never auto-scrolls down to #mandir-darshan
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-transparent text-[#3b2046] overflow-x-clip selection:bg-[#dcd0ff]/50">
      
      {/* 1. Opening Tactile Curtain / Envelope */}
      <OpeningCurtain
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        brideName={weddingData.brideName}
        groomName={weddingData.groomName}
        weddingDateDisplay={weddingData.weddingDateDisplay}
      />

      {/* 2. Floating Celebratory Petals */}
      <FloatingPetals />

      {/* 3. Audio Dock (Ring Bell & Mute/Unmute) */}
      <AudioDock />

      {/* 4. The Authentic Mandir Canvas */}
      <main className="w-full bg-transparent min-h-screen">
        <MandirFullCanvas />
      </main>

    </div>
  );
};

export default App;
