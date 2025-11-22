import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import { remarkDeruntify } from "./src/lib/remark/deruntify";
import cloudflare from "@astrojs/cloudflare";
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
      theme: "github-dark",
      wrap: false,
    },
    remarkPlugins: [remarkDeruntify],
    rehypePlugins: [rehypeSlug],
  },

  adapter: cloudflare(),
});