import { z } from "astro:content";
import type { Loader } from "astro/loaders";

const photosSchema = z.object({
  key: z.string().uuid(),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
  largeUrl: z.string().url(),
  aspectRatio: z.coerce.number(), // or z.coerce.number()
  make: z.string(),
  camera: z.string(),
  lensMake: z.string(),
  lensModel: z.string(),
  focalLength: z.coerce.number(), // or z.coerce.number().optional()
  focalLength35mmEquivalent: z.string(),
  iso: z.string(),
  exposure: z.string(), // "1/121 s" → string is correct
  exposureCompensation: z.string(),
  FStop: z.string(),
  taken: z.string().datetime(),
});

export const photosLoader: Loader = {
  name: "photos",
  schema: photosSchema,
  load: async ({ store }) => {
    const res = await fetch("https://lens.bachitter.dev/api/images");
    const data = await res.json();

    for (const item of data) {
      const imageData = photosSchema.safeParse(item);

      if (!imageData.success) return;

      store.set({
        id: imageData.data.key,
        data: imageData.data,
      });
    }
  },
};
