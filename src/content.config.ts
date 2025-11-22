import { defineCollection } from "astro:content";
import { photosLoader } from "./lib/loaders/photos";
import { writingLoader } from "./lib/loaders/writing";

const writings = defineCollection({
  loader: writingLoader,
});

const photos = defineCollection({
  loader: photosLoader,
});

export const collections = { writings, photos };
