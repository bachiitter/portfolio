import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import {
  transformerCompactLineOptions,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import { remarkDeruntify } from "./src/lib/remark/deruntify";
// https://astro.build/config

export default defineConfig({
  adapter: cloudflare(),
  integrations: [
    sitemap(),
    sanity({
      apiVersion: "2025-08-25",
      dataset: "production",
      projectId: "4cylhej4",
      studioBasePath: "/admin",
      useCdn: false,
    }),
    react(),
  ],
  // prefetch: {
  //   defaultStrategy: "viewport",
  // },
  site: "https://bachitter.dev",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["node_modules/.vite/deps/index2-2MB4FSBB.js?v=5932ec79"],
    },
  },
  markdown: {
    gfm: true,
    smartypants: true,
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "vesper",
      transformers: [
        transformerMetaHighlight(),
        transformerNotationDiff(),
        transformerMetaWordHighlight(),
        transformerNotationErrorLevel(),
        transformerNotationWordHighlight(),
        transformerCompactLineOptions(),
      ],
      wrap: false,
    },
    remarkPlugins: [remarkDeruntify],
    rehypePlugins: [rehypeSlug],
  },
});
