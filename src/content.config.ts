import { defineCollection } from "astro:content";
import { SanityLoader } from "./lib/loaders/sanity";

const blog = defineCollection({
  loader: SanityLoader,
});

export const collections = { blog };
