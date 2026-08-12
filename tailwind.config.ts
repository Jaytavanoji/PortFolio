import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        foreground: "#F5F5F5",
        brand: {
          orange: "#6E1A2B",
          "orange-hover": "#5C1222",
          dark: "#050505",
          card: "#0D0D0D",
          "card-border": "rgba(255, 255, 255, 0.08)",
          secondary: "#A0A0A0",
          muted: "#666666",
        },
        burgundy: {
          DEFAULT: "#6E1A2B",
          dark: "#2A080F",
          wine: "#5C1222",
          light: "#7A2435",
          accent: "#6E1A2B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-instrument-sans)", "var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "aurora-bg": {
          "0%": { backgroundPosition: "50% 50%, 50% 50%" },
          "50%": { backgroundPosition: "350% 50%, 150% 50%" },
          "100%": { backgroundPosition: "50% 50%, 50% 50%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "aurora-bg": "aurora-bg 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
