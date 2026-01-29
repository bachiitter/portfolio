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

export const getPosts = async () => {
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
};

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

  const { content, ...post } = posts.find((p) => p?.slug === slug);

  const markup = await renderMarkdown(content || "");

  return {
    ...post,
    content: String(markup),
    readingTime: calculateReadingTime(content),
  };
};
