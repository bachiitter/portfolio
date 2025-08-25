import { z } from "astro:content";
import { sanityClient } from "sanity:client";
import type { Loader } from "astro/loaders";

export const SanityLoader: Loader = {
  name: "blog",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.object({
      type: z.string(),
      current: z.string(),
    }),
    featured: z.boolean(),
    publishedAt: z.string().datetime().optional(),
    content: z.string(),
  }),
  load: async (ctx) => {
    const posts = await sanityClient.fetch(
      `*[_type == "post"]{ _id, title, description, slug, publishedAt, featured, content }`,
    );

    for (const item of posts) {
      ctx.store.set({
        id: item._id,
        data: item,
        rendered: await ctx.renderMarkdown(item.content),
      });
    }
  },
};
