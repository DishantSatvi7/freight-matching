import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rust: {
          DEFAULT: "#D9531E",
          hover: "#E8622A",
          glow: "rgba(217, 83, 30, 0.2)",
        },
        slate: {
          850: "#131b2e",
          900: "#0b1120",
          950: "#060911",
        },
        teal: {
          DEFAULT: "#0EA5E9",
          glow: "rgba(14, 165, 233, 0.15)",
        },
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
        headline: ["Oswald", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
