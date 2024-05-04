import reshaped from "reshaped/config/postcss";
/** @type {import('postcss-load-config').Config} */

const config = {
  plugins: {
    reshaped,
    tailwindcss: {},
  },
};

export default config;
