import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      }
    }
  },
  plugins: [],
} satisfies Config;
