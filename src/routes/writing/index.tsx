import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDate, metadata } from "$/lib/utils";

interface GetPostsGraphQLResponse {
  data?: {
    blogPostCollection?: {
      total: number;
      items: Array<{
        title: string;
        description: string;
        slug: string;
        publishedAt?: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export const Route = createFileRoute("/writing/")({
  loader: async () => {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const accessToken = process.env.CONTENTFUL_API_TOKEN;
    const isPreview = !process.env.NODE_ENV?.includes("prod");

    if (!spaceId || !accessToken) {
      console.error("Missing Contentful credentials (CONTENTFUL_SPACE_ID or CONTENTFUL_API_TOKEN)");
      return;
    }

    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

    const query = `
      query($preview: Boolean!) {
        blogPostCollection(preview: $preview) {
          total
          items {
            title
            description
            slug
            publishedAt
          }
        }
      }
    `;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          preview: isPreview,
        },
      }),
    });

    if (!response.ok) {
      console.error(`GraphQL request failed: ${response.status} ${response.statusText}`);

      if (response.status === 429) {
        console.error("Rate limit exceeded. Please try again later.");
        return;
      }

      if (response.status === 401) {
        console.error("Authentication failed. Check your access token.");
        return;
      }

      return;
    }

    const result = (await response.json()) as GetPostsGraphQLResponse;

    if (result.errors) {
      console.error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`);
      return;
    }

    if (!result.data?.blogPostCollection) {
      console.error("No blogPostCollection in response. Check your content type name.");
      console.info(`Response: ${JSON.stringify(result, null, 2)}`);
      return;
    }

    const posts = result.data.blogPostCollection.items;
    const total = result.data.blogPostCollection.total;

    console.info(`Found ${total} total blog posts in Contentful (preview: ${isPreview})`);

    if (!posts || posts.length === 0) {
      console.info("No blog post items found");
      return;
    }

    return posts;
  },
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
