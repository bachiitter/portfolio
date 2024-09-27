import type { Loader } from "astro/loaders";
import { CONTENTFUL_API_TOKEN, CONTENTFUL_SPACE_ID } from "astro:env/server";

const CONTENTFUL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;

const GET_POSTS = `
  query GetPosts($preview:Boolean) {
    blogPostCollection(preview:$preview) {
      items {
      	sys {
      	  id
          publishedAt
      	}
        title
      	description
        slug
        content
      }
    }
  }
`;

export const ContentfulLoader: Loader = {
  name: "posts",
  load: async (ctx) => {
    const res = await fetch(CONTENTFUL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONTENTFUL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_POSTS,
        variables: {
          preview: !import.meta.env.PROD,
        },
      }),
    });

    const { data } = await res.json();

    for (const item of data.blogPostCollection.items) {
      ctx.store.set({
        id: item.sys.id,
        data: {
          id: item.sys.id,
          title: item.title,
          description: item.description,
          slug: item.slug,
          publishedAt: item.sys.publishedAt,
          content: item.content,
        },
      });
    }
  },
};
