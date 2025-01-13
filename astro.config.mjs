import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig, envField } from "astro/config";
// https://astro.build/config

export default defineConfig({
  experimental: {
    clientPrerender: true,
    svg: true,
    responsiveImages: true,
  },
  integrations: [sitemap()],
  output: "static",
  prefetch: {
    defaultStrategy: "viewport",
  },
  site: "https://bachitter.dev",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
});
