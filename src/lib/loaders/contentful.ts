import { z } from "astro:content";
import { CONTENTFUL_API_TOKEN, CONTENTFUL_SPACE_ID } from "astro:env/server";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import {
  transformerCompactLineOptions,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from "@shikijs/transformers";
import type { Loader } from "astro/loaders";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

const CONTENTFUL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

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
        content
      }
    }
  }
`;

export const ContentfulLoader: Loader = {
  name: "posts",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    publishedAt: z.string().datetime(),
    content: z.string(),
  }),
  load: async (ctx) => {
    const res = await fetch(CONTENTFUL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONTENTFUL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_POSTS,
        variables: {
          preview: !import.meta.env.PROD,
        },
      }),
    });

    const { data } = await res.json();

    for (const item of data.blogPostCollection.items) {
      const preprocessor = await createMarkdownProcessor({
        gfm: true,
        smartypants: true,
        syntaxHighlight: "shiki",
        shikiConfig: {
          theme: "vesper",
          defaultColor: false,
          transformers: [
            transformerNotationDiff(),
            transformerNotationFocus(),
            transformerMetaHighlight(),
            transformerMetaWordHighlight(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
            transformerNotationErrorLevel(),
            transformerRenderWhitespace(),
            transformerCompactLineOptions(),
          ],
        },
        remarkPlugins: [],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "append", className: ["subheading-anchor"], ariaLabel: "Link to section" },
          ],
        ],
      });

      const { code, metadata } = await preprocessor.render(item.content, {
        frontmatter: {
          title: item.title,
          description: item.description,
          slug: item.slug,
          publishedAt: item.sys.publishedAt,
        },
      });

      ctx.store.set({
        id: item.sys.id,
        data: {
          title: item.title,
          description: item.description,
          slug: item.slug,
          publishedAt: item.sys.publishedAt,
          content: item.content,
        },
        body: item.content,
        rendered: {
          html: code,
          metadata: {
            frontmatter: metadata.frontmatter,
            headings: metadata.headings,
            imagePaths: Array.from(metadata.imagePaths),
          },
        },
      });
    }
  },
};
