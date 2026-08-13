// Music tracks data
export interface Track {
  id: number;
  slug: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  durationSeconds: number;
  src: string;
  artwork: string;
}

export const MUSIC_TRACKS: Track[] = [
  { id: 1, slug: "94-flow", title: "94 Flow", artist: "Big Boi Deep, Byg Byrd", genre: "Hip-Hop", duration: "2:36", durationSeconds: 156, src: "/music/94-flow.mp3", artwork: "/music/covers/94-flow.jpg" },
  { id: 2, slug: "all-the-stars", title: "All The Stars", artist: "Kendrick Lamar, SZA", genre: "Hip-Hop", duration: "3:52", durationSeconds: 232, src: "/music/all-the-stars-with-sza-from-_black-panther_-the-album__spotdownorg.mp3", artwork: "/music/covers/all-the-stars.jpg" },
  { id: 3, slug: "bairi", title: "Bairi", artist: "Virat, Pradeep Solanki", genre: "Indie", duration: "3:15", durationSeconds: 195, src: "/music/bairi.mp3", artwork: "/music/covers/bairi.jpg" },
  { id: 4, slug: "coook-pardon", title: "COOOK PARDON", artist: "Lvbel C5, AKDO", genre: "Trap", duration: "1:32", durationSeconds: 92, src: "/music/coook-pardon.mp3", artwork: "/music/covers/coook-pardon.jpg" },
  { id: 5, slug: "fein", title: "FE!N", artist: "Travis Scott, Playboi Carti", genre: "Trap", duration: "3:11", durationSeconds: 191, src: "/music/fen-feat-playboi-carti.mp3", artwork: "/music/covers/fen-feat-playboi-carti.jpg" },
  { id: 6, slug: "i-thought-i-saw-your-face-today", title: "I Thought I Saw Your Face Today", artist: "She & Him", genre: "Indie Pop", duration: "2:50", durationSeconds: 170, src: "/music/i-thought-i-saw-your-face-today.mp3", artwork: "/music/covers/i-thought-i-saw-your-face-today.jpg" },
  { id: 7, slug: "limbo", title: "Limbo", artist: "Freddie Dredd", genre: "Dark Rap", duration: "2:50", durationSeconds: 170, src: "/music/limbo.mp3", artwork: "/music/covers/limbo.jpg" },
  { id: 8, slug: "panda", title: "Panda", artist: "Desiigner", genre: "Trap", duration: "4:06", durationSeconds: 247, src: "/music/panda.mp3", artwork: "/music/covers/panda.jpg" },
  { id: 9, slug: "smoke", title: "Smoke", artist: "Slowboy", genre: "Lo-Fi", duration: "2:03", durationSeconds: 123, src: "/music/smoke.mp3", artwork: "/music/covers/smoke.jpg" },
  { id: 10, slug: "sunflower", title: "Sunflower", artist: "Post Malone, Swae Lee", genre: "Pop", duration: "2:37", durationSeconds: 158, src: "/music/sunflower-spider-man-into-the-spider-verse.mp3", artwork: "/music/covers/sunflower-spider-man-into-the-spider-verse.jpg" },
  { id: 11, slug: "the-hills", title: "The Hills", artist: "The Weeknd", genre: "R&B", duration: "4:02", durationSeconds: 242, src: "/music/the-hills.mp3", artwork: "/music/covers/the-hills.jpg" },
  { id: 12, slug: "tokyo-drift", title: "Tokyo Drift", artist: "Teriyaki Boyz", genre: "Hip-Hop", duration: "2:27", durationSeconds: 147, src: "/music/tokyo-drift.mp3", artwork: "/music/covers/tokyo-drift.jpg" },
];
