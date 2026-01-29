import { createFileRoute } from "@tanstack/react-router";
import { getPostBySlug } from "$/lib/functions/writing";
import { formatDate, metadata } from "$/lib/utils";

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) =>
    getPostBySlug({
      slug: params.slug,
    }),
  headers: () => ({
    // Cache for 1 hour, allow stale for 7 days
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=604800",
  }),
  head: ({ loaderData, params }) => ({
    meta: [
      ...metadata({
        title: `${loaderData?.title} - Bachitter`,
        description: loaderData?.description,
      }),
    ],
    links: [
      {
        rel: "canonical",
        href: `https://bachitter.dev/writing/${params.slug}`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData?.title,
          description: loaderData?.description,
          // image: loaderData.post.coverImage,
          author: {
            "@type": "Person",
            name: "Bachitter Chahal",
          },
          datePublished: loaderData?.publishedAt,
        }),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const post = Route.useLoaderData();
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-medium leading-10.5 tracking-[-0.01em]">{post?.title}</h1>
        <div className="flex justify-start gap-x-8 w-full">
          <div className="flex flex-col gap-y-1">
            <span className="text-tertiary text-[12px] leading-5.25 tracking-[0.0075em]">
              Published on
            </span>
            <time
              dateTime={post?.publishedAt}
              className="text-[15px] leading-6.5 tracking-normal text-primary"
            >
              {formatDate(post?.publishedAt || "")}
            </time>
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="text-tertiary text-[12px] leading-5.25 tracking-[0.0075em]">
              Reading time
            </span>
            <span className="text-[15px] leading-6.5 tracking-normal text-primary">
              {post?.readingTime > 0 && `${post?.readingTime} min read`}
            </span>
          </div>
        </div>
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
    </section>
  );
}
