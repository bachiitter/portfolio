import { createFileRoute, Link } from "@tanstack/react-router";
import { getPosts } from "$/lib/functions/writing";
import { formatDate, metadata } from "$/lib/utils";

export const Route = createFileRoute("/writing/")({
  loader: () => getPosts(),
  head: () => ({
    meta: [
      ...metadata({
        title: `Writing - Bachitter`,
      }),
    ],
  }),
  headers: () => ({
    // Cache at CDN for 1 hour, allow stale content for up to 1 day
    "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  }),
  staleTime: 15 * 60_000, // 15 minutes client-side
  component: RouteComponent,
});

function RouteComponent() {
  const posts = Route.useLoaderData();
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-medium leading-[32px] tracking-[-0.0075em]">Writing</h2>
      <div className="flex flex-col">
        {posts?.map((post) => (
          <Link
            to="/writing/$slug"
            params={{
              slug: post.slug,
            }}
            key={post.slug}
            className="border-t border-t-border -mx-4 last:border-b last:border-b-border hover:bg-background-secondary hover:no-underline "
          >
            <div className="flex gap-4 items-center justify-between w-full p-4 ">
              <span className="text-base text-primary font-medium leading-[25px] tracking-normal">
                {post.title}
              </span>
              <span className="text-[15px] leading-[26px] tracking-normal text-secondary">
                {formatDate(post.publishedAt || "")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
