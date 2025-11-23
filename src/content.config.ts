import { defineCollection } from "astro:content";
import { writingLoader } from "./lib/loaders/writing";

const writings = defineCollection({
  loader: writingLoader,
});

export const collections = { writings };
