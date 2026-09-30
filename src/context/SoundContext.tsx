import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEngine } from '../utils/sound';

interface SoundContextType {
  soundEnabled: boolean;
  isMuted: boolean;
  volume: number;
  isMelodyPlaying: boolean;
  visualizerNote: number;
  reducedMotion: boolean;
  enableSound: (enabled: boolean) => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  playPop: () => void;
  playChime: () => void;
  playPianoNote: (freq: number) => void;
  playCelebration: () => void;
  playMelody: () => void;
  stopMelody: () => void;
  toggleReducedMotion: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.5);
  const [isMelodyPlaying, setIsMelodyPlaying] = useState<boolean>(false);
  const [visualizerNote, setVisualizerNote] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    soundEngine.enableSound(true);
    soundEngine.setMuted(false);
    soundEngine.setVolume(0.5);

    // Auto-start background music loop
    const startBackgroundMusic = () => {
      soundEngine.enableSound(true);
      soundEngine.playHappyBirthdayMelody();
      setIsMelodyPlaying(true);
    };

    startBackgroundMusic();

    // Unlock AudioContext and ensure background music plays upon first user touch/click/scroll
    const handleFirstUserGesture = () => {
      soundEngine.enableSound(true);
      if (soundEngine.ctx && soundEngine.ctx.state === 'suspended') {
        soundEngine.ctx.resume().then(() => {
          if (!soundEngine.isMelodyPlaying) {
            startBackgroundMusic();
          }
        });
      } else if (!soundEngine.isMelodyPlaying) {
        startBackgroundMusic();
      }

      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture);
      window.removeEventListener('pointerdown', handleFirstUserGesture);
    };

    window.addEventListener('click', handleFirstUserGesture);
    window.addEventListener('touchstart', handleFirstUserGesture);
    window.addEventListener('scroll', handleFirstUserGesture);
    window.addEventListener('pointerdown', handleFirstUserGesture);

    return () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture);
      window.removeEventListener('pointerdown', handleFirstUserGesture);
    };
  }, []);

  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    soundEngine.onVisualizerUpdate = (freq, active) => {
      setVisualizerNote(active ? freq : 0);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        soundEngine.pauseForTabHidden();
      } else {
        soundEngine.resumeForTabVisible();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const enableSound = (enabled: boolean) => {
    setSoundEnabled(enabled);
    soundEngine.enableSound(enabled);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    soundEngine.setVolume(vol);
  };

  const playPop = () => soundEngine.playPop();
  const playChime = () => soundEngine.playChime();
  const playPianoNote = (freq: number) => soundEngine.playPianoNote(freq);
  const playCelebration = () => soundEngine.playCelebration();

  const playMelody = () => {
    setIsMelodyPlaying(true);
    soundEngine.playHappyBirthdayMelody(() => {
      setIsMelodyPlaying(false);
    });
  };

  const stopMelody = () => {
    soundEngine.stopMelody();
    setIsMelodyPlaying(false);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        isMuted,
        volume,
        isMelodyPlaying,
        visualizerNote,
        reducedMotion,
        enableSound,
        toggleMute,
        setVolume,
        playPop,
        playChime,
        playPianoNote,
        playCelebration,
        playMelody,
        stopMelody,
        toggleReducedMotion
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
