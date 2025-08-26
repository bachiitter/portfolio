import { defineCollection } from "astro:content";
import { cmsLoader } from "./lib/loaders/cms";

const blog = defineCollection({
  loader: cmsLoader,
});

export const collections = { blog };
