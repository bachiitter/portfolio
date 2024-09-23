import { defineCollection } from "astro:content";
import { ContentfulLoader } from "../lib/loaders/contentful";

const posts = defineCollection({
  loader: ContentfulLoader,
});

export const collections = {
  posts,
};
