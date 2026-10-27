import React, { useState } from 'react';
import { Volume2, VolumeX, Bell } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const AudioDock: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleRingBell = () => {
    setIsRinging(true);
    soundManager.playBellChime();
    setTimeout(() => setIsRinging(false), 800);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
      {/* Tap Bell Quick Ring */}
      <button
        type="button"
        onClick={handleRingBell}
        title="Ring Temple Bell"
        aria-label="Ring Temple Bell"
        className={`p-2.5 sm:p-3 rounded-full bg-[#5f250f]/90 border border-[#dda45d]/60 text-[#dda45d] shadow-lg hover:bg-[#5f250f] active:scale-90 transition-all ${
          isRinging ? 'rotate-12 scale-110' : ''
        }`}
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Mute / Unmute Button */}
      <button
        type="button"
        onClick={handleToggleMute}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        className="p-2.5 sm:p-3 rounded-full bg-[#5f250f]/90 border border-[#dda45d]/60 text-[#dda45d] shadow-lg hover:bg-[#5f250f] active:scale-90 transition-all"
      >
        {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>
    </div>
  );
};
