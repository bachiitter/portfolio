import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { renderMarkdown } from "../render-markdown";
import { calculateReadingTime } from "../utils";

interface GetPostsGraphQLResponse {
  data?: {
    blogPostCollection?: {
      total: number;
      items: Array<{
        title: string;
        description: string;
        slug: string;
        publishedAt?: string;
        content?: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export async function getAllPosts() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_API_TOKEN;
  const isPreview = !process.env.NODE_ENV?.includes("prod");

  if (!spaceId || !accessToken) {
    throw new Error("Missing Contentful credentials (CONTENTFUL_SPACE_ID or CONTENTFUL_API_TOKEN)");
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
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (response.status === 401) {
      throw new Error("Authentication failed. Check your access token.");
    }

    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const result = (await response.json()) as GetPostsGraphQLResponse;

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`);
  }

  if (!result.data?.blogPostCollection) {
    throw new Error("No blogPostCollection in response. Check your content type name.");
  }

  const posts = result.data.blogPostCollection.items;
  const total = result.data.blogPostCollection.total;

  console.info(`Found ${total} total blog posts in Contentful (preview: ${isPreview})`);

  if (!posts || posts.length === 0) {
    console.info("No blog post items found");
    return [];
  }

  return posts;
}

export const getPostsFn = createServerFn({ method: "GET" }).handler(getAllPosts);

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

export const getPostBySlug = async ({ slug }: { slug: string }) => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_API_TOKEN;
  const isPreview = !process.env.NODE_ENV?.includes("prod");

  if (!spaceId || !accessToken) {
    throw new Error("Missing Contentful credentials (CONTENTFUL_SPACE_ID or CONTENTFUL_API_TOKEN)");
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

  const query = `
      query($preview: Boolean!, $slug: String!) {
        blogPostCollection(preview: $preview, where: { slug: $slug }, limit: 1) {
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
        slug,
      },
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    if (response.status === 401) {
      throw new Error("Authentication failed. Check your access token.");
    }

    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const result = (await response.json()) as GetPostBySlugGraphQLResponse;

  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`);
  }

  if (!result.data?.blogPostCollection) {
    throw new Error("No blogPostCollection in response. Check your content type name.");
  }

  const posts = result.data.blogPostCollection.items;

  if (!posts || posts.length === 0) {
    throw notFound();
  }

  const { content, ...post } = posts[0];

  const markup = await renderMarkdown(content || "");

  return {
    ...post,
    content: String(markup),
    readingTime: calculateReadingTime(content),
  };
};

export const getPostBySlugFn = createServerFn({ method: "GET" })
  .inputValidator((d: string) => d)
  .handler(
    async ({ data }) =>
      await getPostBySlug({
        slug: data,
      }),
  );
