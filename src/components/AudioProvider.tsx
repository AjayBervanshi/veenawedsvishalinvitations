import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { startMusic, stopMusic, toggleMusic, isPlaying, onMusicState } from "@/lib/audio";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playMelody: () => void;
  initAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(!isPlaying());

  useEffect(() => {
    return onMusicState((playing) => {
      setIsMuted(!playing);
    });
  }, []);

  const toggleMute = () => {
    toggleMusic();
  };

  const playMelody = () => {
    startMusic();
  };

  const initAudio = () => {
    // Audio is initialized inside startMusic
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playMelody, initAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
