/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "Fira Code", "monospace"],
      },
      colors: {
        // Base surface colors
        surface: {
          base: "#0f1115",
          elevated: "#13161c",
          overlay: "#181c24",
          border: "#1e2330",
          "border-subtle": "#161a22",
        },
        // Text colors
        ink: {
          DEFAULT: "#e2e4e9",
          muted: "#8892a4",
          subtle: "#525d72",
          inverted: "#0f1115",
        },
        // Accent - muted green (engineering green)
        accent: {
          DEFAULT: "#4ade80",
          muted: "#22c55e",
          dim: "#16a34a",
          bg: "#0d2018",
          "bg-hover": "#112819",
          text: "#86efac",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#e2e4e9",
            maxWidth: "none",
          },
        },
      },
      keyframes: {
        scaleAnim: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scale: "scaleAnim 300ms ease-in-out",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
