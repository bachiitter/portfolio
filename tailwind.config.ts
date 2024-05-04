import type { Config } from "tailwindcss";
import { getTheme } from "reshaped/config/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: getTheme(),
  plugins: [],
};
export default config;
