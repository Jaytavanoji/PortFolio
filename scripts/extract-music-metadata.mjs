import fs from "fs";
import path from "path";
import * as mm from "music-metadata";

const projectRoot = process.cwd();
const songsDir = path.join(projectRoot, "Songs");
const publicMusicDir = path.join(projectRoot, "public", "music");
const coversDir = path.join(publicMusicDir, "covers");

if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return "3:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

async function extract() {
  const tracks = [];
  
  if (!fs.existsSync(songsDir)) {
    console.error(`Songs directory not found: ${songsDir}`);
    return;
  }

  const allFiles = fs.readdirSync(songsDir).filter(f => f.toLowerCase().endsWith('.mp3'));
  
  for (let i = 0; i < allFiles.length; i++) {
    const fileName = allFiles[i];
    const filePath = path.join(songsDir, fileName);
    const rawName = fileName.replace(/\.[^/.]+$/, "");
    const slug = slugify(rawName);

    try {
      const metadata = await mm.parseFile(filePath);
      console.log(`\n--- Metadata for ${fileName} ---`);
      console.log(`Title: ${metadata.common.title}`);
      console.log(`Artist: ${metadata.common.artist}`);
      console.log(`Genre: ${metadata.common.genre?.join(", ")}`);
      
      let coverSrc = `/music/covers/${slug}.jpg`;
      const pic = metadata.common.picture?.[0];

      if (pic && pic.data) {
        const ext = pic.format?.includes("png") ? "png" : "jpg";
        const coverFileName = `${slug}.${ext}`;
        const coverFilePath = path.join(coversDir, coverFileName);
        fs.writeFileSync(coverFilePath, pic.data);
        coverSrc = `/music/covers/${coverFileName}`;
      }
      
      // Copy the mp3 file to public directory with slug name
      const targetMp3Path = path.join(publicMusicDir, `${slug}.mp3`);
      fs.copyFileSync(filePath, targetMp3Path);

      const durationStr = formatDuration(metadata.format.duration);

      tracks.push({
        id: i + 1,
        slug: slug,
        title: metadata.common.title || rawName,
        artist: metadata.common.artist || "Unknown Artist",
        genre: (metadata.common.genre && metadata.common.genre.length > 0) ? metadata.common.genre.join(" / ") : "Mixed",
        duration: durationStr,
        durationSeconds: Math.round(metadata.format.duration || 180),
        src: `/music/${slug}.mp3`,
        artwork: coverSrc,
      });
    } catch (err) {
      console.error(`Error reading ${fileName}:`, err);
    }
  }

  const outputTsPath = path.join(projectRoot, "src", "data", "musicTracks.ts");
  const dataDir = path.dirname(outputTsPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const tsContent = `// Automatically generated from embedded MP3 metadata
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

export const MUSIC_TRACKS: Track[] = ${JSON.stringify(tracks, null, 2)};
`;

  fs.writeFileSync(outputTsPath, tsContent, "utf-8");
  console.log(`\nWrote musicTracks.ts to: ${outputTsPath}`);
}

extract();
