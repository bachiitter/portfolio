import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://bachitter.dev",
  integrations: [
    mdx({
      gfm: true,
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "tokyo-night",
      },
    }),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  output: "static",
});
