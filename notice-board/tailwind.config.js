/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          50: "#0a0f0a",
          100: "#111a11",
          200: "#1a2b1a",
          300: "#243524",
          400: "#3d5a3d",
          500: "#4f7a4f",
          600: "#6b9b6b",
          700: "#8fbf8f",
          800: "#b8dab8",
          900: "#d6f0d6",
          950: "#eaf8ea",
        },
        brand: {
          50: "#0a1f0a",
          100: "#0f2e10",
          200: "#144d16",
          300: "#1a6b1d",
          400: "#22c55e",
          500: "#00ff41",
          600: "#33ff6b",
          700: "#66ff8f",
          800: "#99ffb3",
          900: "#ccffd9",
        },
        urgent: {
          50: "#1a0f0f",
          100: "#2e1414",
          200: "#4d1c1c",
          300: "#7a2828",
          400: "#f17070",
          500: "#ff4444",
          600: "#ff3333",
          700: "#cc2828",
          800: "#991e1e",
          900: "#661414",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,255,65,0.04), 0 8px 24px -8px rgba(0,0,0,0.40)",
        softHover: "0 4px 8px rgba(0,255,65,0.08), 0 16px 32px -12px rgba(0,0,0,0.50)",
        urgentGlow: "0 1px 2px rgba(255,68,68,0.12), 0 8px 24px -8px rgba(255,68,68,0.30)",
        neonGlow: "0 0 8px rgba(0,255,65,0.25), 0 0 24px rgba(0,255,65,0.10)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out both",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
      },
    },
  },
  plugins: [],
};
