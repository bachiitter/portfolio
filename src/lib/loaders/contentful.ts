import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { transformerMetaHighlight, transformerMetaWordHighlight } from "@shikijs/transformers";
import type { Loader } from "astro/loaders";
import {
  CONTENTFUL_DELIVERY_API_TOKEN,
  CONTENTFUL_PREVIEW_API_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "astro:env/server";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

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
        Authorization: `Bearer ${import.meta.env.DEV ? CONTENTFUL_PREVIEW_API_TOKEN : CONTENTFUL_DELIVERY_API_TOKEN}`,
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
      const preprocessor = await createMarkdownProcessor({
        gfm: true,
        syntaxHighlight: "shiki",
        shikiConfig: {
          theme: "vesper",
          defaultColor: false,
          transformers: [transformerMetaHighlight(), transformerMetaWordHighlight()],
        },
        remarkPlugins: [[remarkToc, { heading: "contents" }]],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "append", className: ["subheading-anchor"], ariaLabel: "Link to section" },
          ],
        ],
        smartypants: true,
      });

      const { code, metadata } = await preprocessor.render(item.content, {
        frontmatter: {
          title: item.title,
          description: item.description,
          slug: item.slug,
          publishedAt: item.sys.publishedAt,
        },
      });

      ctx.store.set({
        id: item.sys.id,
        data: {
          id: item.sys.id,
          title: item.title,
          description: item.description,
          slug: item.slug,
          publishedAt: item.sys.publishedAt,
        },
        rendered: {
          html: code,
          metadata: {
            frontmatter: metadata.frontmatter,
            headings: metadata.headings,
            imagePaths: Array.from(metadata.imagePaths),
          },
        },
      });
    }
  },
};
