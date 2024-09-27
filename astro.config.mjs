import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
// https://astro.build/config

export default defineConfig({
  site: "https://bachitter.dev",
  integrations: [
    sitemap(),
    tailwind({
      configFile: "./tailwind.config.ts",
      nesting: true,
    }),
  ],
  scopedStyleStrategy: "attribute",
  env: {
    schema: {
      CONTENTFUL_SPACE_ID: envField.string({ context: "server", access: "public" }),
      CONTENTFUL_API_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
});
