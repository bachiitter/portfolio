import { z } from "astro:content";
import type { Loader } from "astro/loaders";
import readingTime from "reading-time";

interface GraphQLResponse {
  data?: {
    blogPostCollection?: {
      total: number;
      items: Array<{
        sys: {
          id: string;
        };
        title: string;
        description: string;
        slug: string;
        publishedAt?: string;
        featured: boolean;
        content: string;
      }>;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export const writingLoader: Loader = {
  name: "writings",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    publishedAt: z.string().datetime().optional(),
    featured: z.boolean(),
    readingTime: z.string(),
  }),
  load: async ({ store, renderMarkdown, logger, parseData, generateDigest, meta }) => {
    logger.info("Loading writings from Contentful GraphQL");

    const spaceId = import.meta.env.CONTENTFUL_SPACE_ID;
    const accessToken = import.meta.env.CONTENTFUL_API_TOKEN;
    const isPreview = !import.meta.env.PROD;

    if (!spaceId || !accessToken) {
      logger.error("Missing Contentful credentials (CONTENTFUL_SPACE_ID or CONTENTFUL_API_TOKEN)");
      return;
    }

    const endpoint = `https://graphql.contentful.com/content/v1/spaces/${spaceId}`;

    const query = `
      query($preview: Boolean!) {
        blogPostCollection(preview: $preview) {
          total
          items {
            sys {
              id
            }
            title
            description
            slug
            publishedAt
            featured
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
      logger.error(`GraphQL request failed: ${response.status} ${response.statusText}`);

      if (response.status === 429) {
        logger.error("Rate limit exceeded. Please try again later.");
        return;
      }

      if (response.status === 401) {
        logger.error("Authentication failed. Check your access token.");
        return;
      }

      return;
    }

    const result = (await response.json()) as GraphQLResponse;

    if (result.errors) {
      logger.error(`GraphQL errors: ${JSON.stringify(result.errors, null, 2)}`);
      return;
    }

    if (!result.data?.blogPostCollection) {
      logger.error("No blogPostCollection in response. Check your content type name.");
      logger.info(`Response: ${JSON.stringify(result, null, 2)}`);
      return;
    }

    const posts = result.data.blogPostCollection.items;
    const total = result.data.blogPostCollection.total;

    logger.info(`Found ${total} total blog posts in Contentful (preview: ${isPreview})`);

    if (!posts || posts.length === 0) {
      logger.info("No blog post items found");
      return;
    }

    const currentSync = new Date().toISOString();
    meta.set("last-sync", currentSync);

    store.clear();

    let successCount = 0;
    let errorCount = 0;

    for (const item of posts) {
      if (!item.content) {
        logger.warn(`Skipping entry ${item.sys.id}: missing content field`);
        errorCount++;
        continue;
      }

      const rendered = await renderMarkdown(item.content);

      const data = {
        title: item.title,
        description: item.description,
        slug: item.slug,
        publishedAt: item.publishedAt,
        featured: item.featured,
        readingTime: readingTime(item.content).text,
      };

      const parsedData = await parseData({
        id: item.sys.id,
        data,
      });

      const digest = generateDigest({ ...parsedData, rendered });

      store.set({
        id: item.sys.id,
        data: parsedData,
        rendered,
        digest,
        body: item.content,
      });

      successCount++;
    }

    logger.info(
      `Loaded ${successCount} writings successfully${errorCount > 0 ? `, ${errorCount} skipped` : ""}`,
    );
  },
};
