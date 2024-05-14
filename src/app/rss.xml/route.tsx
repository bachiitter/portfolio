import { Feed } from "feed";
import { getSiteMetadata } from "~/lib/constants";
import { allPosts } from "../../../data";

export async function GET() {
  const metadata = getSiteMetadata();

  const feed = new Feed({
    language: "en",
    link: metadata.openGraph.url as string,
    id: metadata.openGraph.url as string,
    title: metadata.title,
    description: metadata.description,
    copyright: `© ${new Date().getFullYear()} Bachitter`,
    generator: metadata.openGraph.url as string,
    feedLinks: {
      rss: new URL("/rss.xml", metadata.openGraph.url).href,
    },
  });

  for (const data of allPosts.all().filter((post) => !post.frontMatter.draft)) {
    const url = new URL(data.pathname, process.env.MDXTS_SITE_URL).href;

    feed.addItem({
      title: data.frontMatter.title,
      description: data.frontMatter.description,
      date: new Date(data.frontMatter.date),
      link: url,
      id: url,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
