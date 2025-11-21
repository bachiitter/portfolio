import { defineCollection } from "astro:content";
import { cmsLoader } from "./lib/loaders/cms";

const writings = defineCollection({
  loader: cmsLoader,
});

export const collections = { writings };
