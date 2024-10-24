import { z } from "astro:content";
import { CONTENTFUL_API_TOKEN, CONTENTFUL_SPACE_ID } from "astro:env/server";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { transformerMetaHighlight } from "@shikijs/transformers";
import type { Loader } from "astro/loaders";
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
        featured
        tag
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
    description: z.string().optional(),
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
          transformers: [transformerMetaHighlight()],
        },
        remarkPlugins: [],
        rehypePlugins: [rehypeSlug],
      });

      const { code, metadata } = await preprocessor.render(item.content, {
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
