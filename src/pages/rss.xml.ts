import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export const GET = async (context: APIContext) => {
  const posts = await getCollection("blog");

  return rss({
    title: "Bachitter",
    description: "Hi! I am Bachitter Chahal, a Product Engineer based in Vancouver, Canada.",
    site: context.site?.toString() || "",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.sys.publishedAt || ""),
      link: `/blog/${post.data.slug}/`,
      content: post.rendered?.html,
      author: "Bachitter",
    })),
    customData: "<language>en-us</language>",
  });
};
