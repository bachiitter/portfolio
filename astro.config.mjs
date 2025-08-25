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

import rehypeSlug from "rehype-slug";

import { remarkDeruntify } from "./src/lib/remark/deruntify";

import { defineConfig, envField } from "astro/config";
// https://astro.build/config

export default defineConfig({
  experimental: {
    clientPrerender: true,
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
