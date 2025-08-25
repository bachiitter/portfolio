import { z } from "astro:content";
import type { Loader } from "astro/loaders";

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
    sys: z.object({
      publishedAt: z.string().datetime().optional(),
    }),
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
      ctx.store.set({
        id: item.sys.id,
        data: item,
        rendered: await ctx.renderMarkdown(item.content),
      });
    }
  },
};
