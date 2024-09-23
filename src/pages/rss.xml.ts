import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("posts");

  return rss({
    title: "Bachitter",
    description: "Hi! I am Bachitter Chahal, a Product Engineer based in Vancouver, Canada.",
    site: context.site,
    copyright: `© ${new Date().getFullYear()} Bachitter`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.data.slug}/`,
    })),
    customData: "<language>en-us</language>",
  });
};
