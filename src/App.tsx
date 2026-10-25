import React, { useState } from 'react';
import { weddingData } from './data/weddingData';
import { OpeningCurtain } from './components/OpeningCurtain';
import { MandirFullCanvas } from './components/MandirFullCanvas';
import { AudioDock } from './components/AudioDock';
import { FloatingPetals } from './components/FloatingPetals';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf5eb] text-[#5f250f] overflow-x-hidden selection:bg-[#dda45d]/40">
      
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
      <main className="w-full bg-[#fbf5eb] min-h-screen">
        <MandirFullCanvas />
      </main>

    </div>
  );
};

export default App;
