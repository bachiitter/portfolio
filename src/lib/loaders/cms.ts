import { z } from "astro:content";
import type { Loader } from "astro/loaders";
import * as contentful from "contentful";

export const cmsLoader: Loader = {
  name: "blog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    publishedAt: z.string().datetime().optional(),
    featured: z.boolean(),
  }),
  load: async ({ store, renderMarkdown }) => {
    const client = contentful.createClient({
      space: import.meta.env.CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.CONTENTFUL_API_TOKEN,
      host: import.meta.env.PROD ? "cdn.contentful.com" : "preview.contentful.com",
    });

    const { items: posts } = await client.getEntries({
      content_type: "blogPost",
    });

    for (const item of posts) {
      store.set({
        id: item.sys.id,
        data: {
          title: item.fields.title,
          description: item.fields.description,
          slug: item.fields.slug,
          publishedAt: item.fields.publishedAt,
          featured: item.fields.featured,
        },
        rendered: await renderMarkdown(item.fields.content as string),
      });
    }
  },
};
