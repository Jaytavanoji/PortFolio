"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { MUSIC_TRACKS, Track } from "@/data/musicTracks";

export type { Track };
export const PLAYLIST: Track[] = MUSIC_TRACKS;

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
