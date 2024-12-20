import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("posts");

  return rss({
    title: "Bachitter",
    description: "Hi! I am Bachitter Chahal, a Product Engineer based in Vancouver, Canada.",
    site: context.site?.toString() || "",
    // copyright: `© ${new Date().getFullYear()} Bachitter`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishedAt || ""),
      description: post.data.description,
      link: `/blog/${post.data.slug}/`,
    })),
    customData: "<language>en-us</language>",
  });
};
