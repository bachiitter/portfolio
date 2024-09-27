import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { transformerMetaHighlight, transformerMetaWordHighlight } from "@shikijs/transformers";

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
  markdown: {
    shikiConfig: {
      theme: "vesper",
      defaultColor: false,
      transformers: [transformerMetaHighlight(), transformerMetaWordHighlight()],
    },
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        { behavior: "append", className: ["subheading-anchor"], ariaLabel: "Link to section" },
      ],
    ],
  },
});
