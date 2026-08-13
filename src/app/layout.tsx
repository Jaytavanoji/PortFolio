import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Sans, Big_Shoulders_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ["latin"],
  variable: "--font-big-shoulders-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jay Tavanoji — Software Developer · Backend Engineer · AI Explorer",
  description:
    "Portfolio of Jay Tavanoji. I build practical software, scalable backend systems, and AI-powered applications.",
  keywords: [
    "Jay Tavanoji",
    "Jayshankar Tavanoji",
    "Software Developer",
    "Backend Engineer",
    "FastAPI",
    "Python",
    "Java",
    "Spring Boot",
    "AI Explorer",
    "RAG",
  ],
  authors: [{ name: "Jay Tavanoji" }],
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

import { AudioProvider } from "@/context/AudioContext";
import MusicMiniPlayer from "@/components/MusicMiniPlayer";
import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${instrumentSans.variable} ${bigShouldersDisplay.variable}`}>
      <body className="bg-black text-[#F5F5F5] font-sans antialiased selection:bg-[#6E1A2B]/30 selection:text-white">
        <LenisProvider>
          <AudioProvider>
            <MusicMiniPlayer />
            {children}
          </AudioProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
