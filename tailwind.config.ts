import { getTheme } from "reshaped/config/tailwind";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: getTheme(),
    fontFamily: {
      sans: ["var(--font-sans)"],
    },
  },
  plugins: [],
};
export default config;
