<div align="center">

  # ⚡ JAY TAVANOJI — PORTFOLIO

  **A High-Performance, Atmospheric Portfolio & Interactive 3D Audio Experience**

  [![Live Website](https://img.shields.io/badge/Website-Live%20Demo-ff4d1f?style=for-the-badge&logo=vercel&logoColor=white)](https://porfolio-jay-tavanoji-56.vercel.app/)
  [![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![WebGL2](https://img.shields.io/badge/WebGL2-Shader-red?style=for-the-badge&logo=opengl&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext)

  ---

  ### 🌐 **Website Live at: [https://porfolio-jay-tavanoji-56.vercel.app/](https://porfolio-jay-tavanoji-56.vercel.app/)**

</div>

<br />

## 🌟 Key Features

- 🎞️ **78-Frame Cinematic Hero Scroll**: Interactive frame-by-frame canvas scroll sequence with sub-frame alpha cross-blending for continuous 60fps video-like animation.
- 🎨 **WebGL2 Custom Shaders**: Real-time fluid fragment shaders (`AnimatedGradient`) rendering a dark crimson/burgundy ambient atmosphere inspired by anime aesthetic.
- 🎵 **Integrated 3D Diagonal Music Player**: Custom interactive audio engine powered by HTML5 `AudioContext`, complete with track scrubbing, volume normalization, and real-time audio progress sync across pages.
- 💎 **Glassmorphism & Brutalist UI**: Modern GlassDock navigation, `GlareCard` 3D tilt cards, and image-masked kinetic typography (`ImageText`).
- ⚡ **Optimized Performance**: Preloaded WebP frame caches, zero-GC 2D canvas drawing loops, and hardware-accelerated Framer Motion transitions.

---

## 🛠️ Tech Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router, Server & Client Components) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, Custom Utility Classes, CSS Modules |
| **Animations & Shaders** | Framer Motion, Custom WebGL2 Fragment Shaders |
| **Audio Engine** | Web Audio API / HTML5 Audio Context |
| **Icons & Design** | Lucide React, Glassmorphic UI Components |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [Git](https://git-scm.com/)
- `npm` or `pnpm` or `yarn`

### 1. Clone the Repository

```bash
git clone https://github.com/Jaytavanoji/PortFolio.git
cd PortFolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio live locally!

---

## 📁 Project Directory Structure

```text
├── public/
│   ├── frames/             # 78 WebP frames for hero scroll canvas
│   ├── music/              # MP3 audio files & cover art
│   └── text/               # Image textures for typography
├── src/
│   ├── app/                # Next.js App Router pages (/, /about, /skills, /projects, /music, /contact)
│   ├── components/         # Reusable UI components & section layouts
│   │   ├── music/          # 3D Music Carousel & Audio Controls
│   │   └── ui/             # AnimatedGradient, GlareCard, ImageText, GlassDock, etc.
│   ├── context/            # AudioContext global state provider
│   ├── data/               # Track metadata and portfolio datasets
│   └── lib/                # Utility helpers (cn, formatting)
├── README.md               # Project documentation
└── package.json            # Project dependencies & scripts
```

---

## 🛡️ License & Author

Crafted with passion by **Jay Tavanoji**.

- **GitHub**: [@Jaytavanoji](https://github.com/Jaytavanoji)
- **Live Demo**: [https://porfolio-jay-tavanoji-56.vercel.app/](https://porfolio-jay-tavanoji-56.vercel.app/)
