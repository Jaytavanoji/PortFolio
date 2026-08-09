import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
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

import NavigationDock from "@/components/NavigationDock";
import { AudioProvider } from "@/context/AudioContext";
import MusicMiniPlayer from "@/components/MusicMiniPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${instrumentSans.variable}`}>
      <body className="bg-black text-[#F5F5F5] font-sans antialiased selection:bg-[#FF4D1F]/30 selection:text-white">
        <AudioProvider>
          <MusicMiniPlayer />
          {children}
          <NavigationDock />
        </AudioProvider>
      </body>
    </html>
  );
}
