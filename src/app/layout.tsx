import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import MusicMiniPlayer from "@/components/MusicMiniPlayer";
import LenisProvider from "@/components/LenisProvider";

const deltha = localFont({
  src: [
    {
      path: "../../public/fonts/deltha/DelthaRegular-GOgrm.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/deltha/DelthaRegular-JR027.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-deltha",
  display: "swap",
});

const megunso = localFont({
  src: "../../public/fonts/megunso/MegunsoDemoVersion-j9WD7.otf",
  variable: "--font-megunso",
  display: "swap",
});

const runtime = localFont({
  src: "../../public/fonts/runtime/RuntimeRegular-m2Odx.otf",
  variable: "--font-runtime",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${deltha.variable} ${megunso.variable} ${runtime.variable}`}
    >
      <body className="bg-black text-[#F5F5F5] font-runtime antialiased selection:bg-white/20 selection:text-white">
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
