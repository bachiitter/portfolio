import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

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
  },
  integrations: [
    sitemap(),
    tailwind({
      configFile: "./tailwind.config.ts",
      nesting: true,
      applyBaseStyles: false,
    }),
  ],
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  scopedStyleStrategy: "attribute",
  site: "https://bachitter.dev",
  trailingSlash: "never",
});
