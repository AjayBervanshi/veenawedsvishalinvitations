import React, { useState } from 'react';
import { weddingData } from './data/weddingData';
import { OpeningCurtain } from './components/OpeningCurtain';
import { MandirFullCanvas } from './components/MandirFullCanvas';
import { AudioDock } from './components/AudioDock';
import { FloatingPetals } from './components/FloatingPetals';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#240b04] text-[#5f250f] overflow-x-hidden">
      
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

      {/* 3. Audio Dock */}
      <AudioDock />

      {/* 4. The Authentic Mandir Canvas */}
      <div className="w-full flex justify-center bg-[#240b04] min-h-screen py-0 md:py-6">
        <MandirFullCanvas />
      </div>

    </div>
  );
};

export default App;
