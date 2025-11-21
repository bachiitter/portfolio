import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export const GET = async (context: APIContext) => {
  const posts = await getCollection("writings");

  return rss({
    title: "Bachitter",
    description: "Hi! I am Bachitter Chahal, a Product Engineer based in Vancouver, Canada.",
    site: context.site?.toString() || "",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.publishedAt || ""),
      link: `/writings/${post.data.slug}`,
      content: post.rendered?.html,
      author: "Bachitter",
    })),
    trailingSlash: false,
    customData: "<language>en-us</language>",
  });
};
