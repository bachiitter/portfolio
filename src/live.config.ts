import { defineLiveCollection } from "astro:content";
import { createPhotosLoader, PhotoSchema } from "./lib/loaders/photos";

const photos = defineLiveCollection({
  loader: createPhotosLoader(),
  schema: PhotoSchema,
});

export const collections = { photos };
