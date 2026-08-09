"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

export interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  src: string;
  artwork: string;
}

export const PLAYLIST: Track[] = [
  {
    id: 1,
    title: "COOOK PARDON",
    artist: "Jay Tavanoji",
    genre: "Original Session · Flow State",
    duration: "2:51",
    src: "/music/cook-pardon.mp3",
    artwork:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "COOOK PARDON (Deep Focus Mix)",
    artist: "Jay Tavanoji",
    genre: "Deep Focus · Night Coding",
    duration: "2:51",
    src: "/music/cook-pardon.mp3",
    artwork:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "COOOK PARDON (Cyber Ambient)",
    artist: "Jay Tavanoji",
    genre: "Ambient Beats · Systems Flow",
    duration: "2:51",
    src: "/music/cook-pardon.mp3",
    artwork:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "COOOK PARDON (Terminal Cut)",
    artist: "Jay Tavanoji",
    genre: "Darksynth · High Energy",
    duration: "2:51",
    src: "/music/cook-pardon.mp3",
    artwork:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop",
  },
];

interface AudioContextType {
  tracks: Track[];
  currentTrackIndex: number;
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  togglePlay: () => void;
  playTrack: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isUserInitiatedRef = useRef(false);

  const currentTrack = PLAYLIST[currentTrackIndex] || PLAYLIST[0];

  // Initialize and keep audio source in sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.src;
    audio.load();
    setCurrentTime(0);

    if (isUserInitiatedRef.current) {
      audio.play().catch(() => {});
    }
  }, [currentTrackIndex, currentTrack.src]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    isUserInitiatedRef.current = true;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [isPlaying]);

  const playTrack = useCallback((index: number) => {
    isUserInitiatedRef.current = true;
    setCurrentTrackIndex(index);
  }, []);

  const nextTrack = useCallback(() => {
    isUserInitiatedRef.current = true;
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  }, []);

  const prevTrack = useCallback(() => {
    isUserInitiatedRef.current = true;
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AudioContext.Provider
      value={{
        tracks: PLAYLIST,
        currentTrackIndex,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        progress,
        togglePlay,
        playTrack,
        nextTrack,
        prevTrack,
        seek,
      }}
    >
      {/* Global persistent audio element that plays local uploaded audio */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={nextTrack}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
