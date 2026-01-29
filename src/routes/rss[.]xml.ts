import { createFileRoute } from "@tanstack/react-router";
import { Feed } from "feed";
import { INFO } from "$/lib/data";
import { getPosts } from "$/lib/functions/writing";
import { renderMarkdown } from "$/lib/render-markdown";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await getPosts();

        const feed = new Feed({
          title: INFO.name,
          description: INFO.descrition,
          id: INFO.siteUrl,
          link: INFO.siteUrl,
          language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
          feedLinks: {
            rss: `${INFO.siteUrl}/rss.xml`,
          },
          author: {
            name: INFO.name,
            email: INFO.email,
            avatar: INFO.avatarImage,
          },
        });

        if (!posts) {
          return new Response(feed.rss2(), {
            headers: {
              "Content-Type": "application/xml",
            },
          });
        }

        for (const post of posts) {
          feed.addItem({
            title: post.title,
            id: `${INFO.siteUrl}/writing/${post.slug}`,
            link: `${INFO.siteUrl}/writing/${post.slug}`,
            description: post.description,
            content: await renderMarkdown(post.content || ""),
            date: new Date(post.publishedAt || ""),
          });
        }

        return new Response(feed.rss2(), {
          headers: {
            "Content-Type": "application/xml",
          },
        });
      },
    },
  },
});
