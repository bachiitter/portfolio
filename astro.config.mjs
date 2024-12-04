import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig, envField } from "astro/config";
// https://astro.build/config

export default defineConfig({
  env: {
    schema: {
      CONTENTFUL_API_TOKEN: envField.string({ context: "server", access: "secret" }),
      CONTENTFUL_SPACE_ID: envField.string({ context: "server", access: "public" }),
    },
  },
  experimental: {
    clientPrerender: true,
    svg: true,
    responsiveImages: true,
  },
  integrations: [sitemap()],
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  scopedStyleStrategy: "attribute",
  site: "https://bachitter.dev",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
});
