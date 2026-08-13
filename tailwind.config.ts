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
        background: "#050505",
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
        landing: {
          surface: "rgba(255, 255, 255, 0.10)",
          "surface-hover": "rgba(255, 255, 255, 0.16)",
          border: "rgba(255, 255, 255, 0.10)",
          "border-strong": "rgba(255, 255, 255, 0.20)",
          text: "rgba(255, 255, 255, 0.80)",
          "text-muted": "rgba(255, 255, 255, 0.60)",
        },
      },
      fontFamily: {
        deltha: ["var(--font-deltha)", "Deltha", "sans-serif"],
        megunso: ["var(--font-megunso)", "Megunso", "sans-serif"],
        runtime: ["var(--font-runtime)", "Runtime", "sans-serif"],
        sans: ["var(--font-runtime)", "Runtime", "sans-serif"],
        display: ["var(--font-deltha)", "Deltha", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
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
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "aurora-bg": "aurora-bg 60s linear infinite",
        "fade-rise": "fade-rise 0.8s ease-out both",
        "fade-rise-delay": "fade-rise 0.8s ease-out 0.25s both",
        "fade-rise-delay-2": "fade-rise 0.8s ease-out 0.5s both",
      },
    },
  },
  plugins: [],
};

export default config;
