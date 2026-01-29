import { createFileRoute } from "@tanstack/react-router";
import { NAV_LINKS } from "$/components/nav-bar";
import { INFO } from "$/lib/data";
import { getPostsFn } from "$/lib/functions/writing";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await getPostsFn();

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${NAV_LINKS.map(
    (link) => `<url>
    <loc>${INFO.siteUrl}${link.to}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
  )}
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${INFO.siteUrl}/writing/${post.slug}</loc>
    <lastmod>${post.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
    )
    .join("")}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
            "CDN-Cache-Control": "max-age=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
