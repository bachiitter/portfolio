import { defineCollection } from "astro:content";
import { ContentfulLoader } from "./lib/loaders/contentful";

const blog = defineCollection({
  loader: ContentfulLoader,
});

export const collections = { blog };
