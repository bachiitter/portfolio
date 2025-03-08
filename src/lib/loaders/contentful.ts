import { z } from "astro:content";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import {
  transformerCompactLineOptions,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import type { Loader } from "astro/loaders";
import rehypeSlug from "rehype-slug";
import { remarkDeruntify } from "../remark/deruntify";

const GET_POSTS = `
  query GetPosts($preview:Boolean) {
    blogPostCollection(preview:$preview) {
      items {
        sys {
          id
          publishedAt
        }
        title
        description
        slug
        featured
        tag
        content
      }
    }
  }
`;

const CONTENTFUL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.CONTENTFUL_SPACE_ID}/environments/master`;

export const ContentfulLoader: Loader = {
  name: "blog",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    featured: z.boolean(),
    tag: z.string().optional(),
    publishedAt: z.string().datetime().optional(),
    content: z.string(),
  }),
  load: async (ctx) => {
    const res = await fetch(CONTENTFUL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.CONTENTFUL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_POSTS,
        variables: {
          preview: import.meta.env.NODE_ENV !== "production",
        },
      }),
    });

    const body = await res.json();

    for (const item of body.data.blogPostCollection.items) {
      const preprocessor = await createMarkdownProcessor({
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
      });

      const { code: html, metadata } = await preprocessor.render(item.content, {
        frontmatter: {
          title: item.title,
          description: item.description,
          slug: item.slug,
          featured: item.featured,
          tag: item.tag,
          publishedAt: item.sys.publishedAt,
        },
      });

      ctx.store.set({
        id: item.sys.id,
        data: {
          title: item.title,
          description: item.description,
          slug: item.slug,
          featured: item.featured,
          tag: item.tag,
          publishedAt: item.sys.publishedAt,
          content: item.content,
        },
        body: item.content,
        rendered: {
          html,
          metadata: {
            frontmatter: metadata.frontmatter,
            headings: metadata.headings,
            imagePaths: Array.from(metadata.remoteImagePaths),
          },
        },
      });
    }
  },
};
