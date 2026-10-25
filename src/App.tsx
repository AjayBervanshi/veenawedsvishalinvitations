import React, { useState } from 'react';
import { weddingData, initialBlessings } from './data/weddingData';
import { OpeningCurtain } from './components/OpeningCurtain';
import { MandirHeroStage } from './components/MandirHeroStage';
import { MuhuratCountdown } from './components/MuhuratCountdown';
import { CeremoniesTimeline } from './components/CeremoniesTimeline';
import { CoupleStory } from './components/CoupleStory';
import { VenueLocation } from './components/VenueLocation';
import { BlessingWall } from './components/BlessingWall';
import { RsvpSection } from './components/RsvpSection';
import { ShareModal } from './components/ShareModal';
import { AudioDock } from './components/AudioDock';
import { FloatingPetals } from './components/FloatingPetals';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf5eb] text-[#5f250f] font-body selection:bg-[#dda45d]/40">
      
      {/* 1. Opening Tactile Gate / Curtain */}
      <OpeningCurtain
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        brideName={weddingData.brideName}
        groomName={weddingData.groomName}
        weddingDateDisplay={weddingData.weddingDateDisplay}
      />

      {/* 2. Floating Celebratory Flower Petals */}
      <FloatingPetals />

      {/* 3. Audio Control Dock */}
      <AudioDock />

      {/* 4. Main Mandir Multi-Layered Stage */}
      <main className="w-full max-w-4xl mx-auto shadow-2xl overflow-hidden bg-[#fbf5eb] border-x-2 border-[#dda45d]/40">
        
        {/* Multi-Layered Scrollytelling Mandir Hero */}
        <MandirHeroStage
          brideName={weddingData.brideName}
          groomName={weddingData.groomName}
          hostMessage={weddingData.hostMessage}
          brideParents={weddingData.brideParents}
          groomParents={weddingData.groomParents}
          weddingDateDisplay={weddingData.weddingDateDisplay}
        />

        {/* Auspicious Muhurat Countdown */}
        <MuhuratCountdown
          targetDateISO={weddingData.weddingDateISO}
          muhuratDisplay={weddingData.muhuratDisplay}
        />

        {/* Ceremonies Timeline */}
        <CeremoniesTimeline events={weddingData.events} />

        {/* Love Story & Couple Photo Frame */}
        <CoupleStory />

        {/* Venue & Google Maps Navigation */}
        <VenueLocation
          venueName={weddingData.venueName}
          venueAddress={weddingData.venueAddress}
          googleMapsUrl={weddingData.googleMapsUrl}
          hashtag={weddingData.hashtag}
        />

        {/* Digital Blessing Wall */}
        <BlessingWall initialBlessings={initialBlessings} />

        {/* Guest RSVP Form */}
        <RsvpSection hashtag={weddingData.hashtag} />

        {/* Share Invitation */}
        <ShareModal hashtag={weddingData.hashtag} />

        {/* Royal Mandir Footer */}
        <footer className="py-8 px-4 text-center bg-[#5f250f] text-[#fbf5eb] border-t-2 border-[#dda45d]">
          <img 
            src="/assets/mandir/ganpati-icon-v1.webp" 
            alt="Lord Ganesha" 
            className="w-10 h-10 mx-auto mb-2 opacity-90 object-contain filter brightness-150"
          />
          <p className="text-xs font-serif text-[#dda45d] tracking-widest uppercase mb-1 font-bold">
            || ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ||
          </p>
          <p className="text-[11px] text-[#fbf5eb]/70 font-serif">
            With Love & Warmest Regards, Sharma & Verma Families • {weddingData.hashtag}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
