import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00aeff",

          "secondary": "#2f00ff",

          "accent": "#0064ff",

          "neutral": "#25151c",

          "base-100": "#fcfcfc",

          "info": "#00accf",

          "success": "#00e49d",

          "warning": "#fe9800",

          "error": "#ff5983",
        },
      },
    ],
  },
};

export default tailwindConfig;
