import { createFileRoute } from "@tanstack/react-router";
import readingTime from "reading-time";
import { renderMarkdown } from "$/lib/render-markdown";
import { calculateReadingTime, formatDate, metadata } from "$/lib/utils";

interface GetPostBySlugGraphQLResponse {
  data?: {
    blogPostCollection?: {
      items: Array<{
        title: string;
        description: string;
        slug: string;
        publishedAt?: string;
        content: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export const Route = createFileRoute("/writing/$slug")({
  loader: async ({ params }) => {
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
          items {
            title
            description
            slug
            publishedAt
            content
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

    const result = (await response.json()) as GetPostBySlugGraphQLResponse;

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

    if (!posts || posts.length === 0) {
      console.info("No blog post items found");
      return;
    }

    const { content, ...post } = posts.find((p) => p?.slug === params.slug);

    const markup = await renderMarkdown(content || "");

    return {
      ...post,
      content: String(markup),
      readingTime: calculateReadingTime(content),
    };
  },
  headers: () => ({
    // Cache for 1 hour, allow stale for 7 days
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=604800",
  }),
  staleTime: 15 * 60_000, // 15 minutes client-side
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
