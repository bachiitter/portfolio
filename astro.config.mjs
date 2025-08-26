import sitemap from "@astrojs/sitemap";
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
  integrations: [sitemap()],
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
  output: "static",
  prefetch: {
    defaultStrategy: "hover",
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
