import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import rehypeSlug from "rehype-slug";
import { remarkDeruntify } from "./src/lib/remark/deruntify";
// https://astro.build/config

export default defineConfig({
  integrations: [sitemap()],
  site: "https://bachitter.dev",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
  // output: "static",
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
  experimental: {
    liveContentCollections: true,
    csp: {
      scriptDirective: {
        resources: ["https://static.cloudflareinsights.com"],
        hashes: ["sha256-47be92709c83b14dc09de8bec07eedbe123ee06949170479fd71e158c208ab87"],
      },
      styleDirective: {
        resources: ["https://fonts.googleapis.com"],
      },
    },
  },
  adapter: cloudflare({
    imageService: "compile",
  }),
  env: {
    schema: {
      PHOTOS_API_URL: envField.string({
        context: "server",
        access: "secret",
      }),
      PHOTOS_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
