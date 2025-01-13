import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export const GET = import.meta.env.PROD
  ? async (context: APIContext) => {
      const posts = await getCollection("blog");

      return rss({
        title: "Bachitter",
        description: "Hi! I am Bachitter Chahal, a Product Engineer based in Vancouver, Canada.",
        site: context.site?.toString() || "",
        // copyright: `© ${new Date().getFullYear()} Bachitter`,
        items: posts.map((post) => ({
          title: post.data.title || "",
          pubDate: new Date(post.data.publishedAt || ""),
          description: post.data.description || "",
          link: `/blog/${post.data.slug}/`,
        })),
        customData: "<language>en-us</language>",
      });
    }
  : null;
