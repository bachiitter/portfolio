import { z } from "astro:content";
import type { LiveLoader } from "astro/loaders";

export const PhotoSchema = z.object({
  key: z.string().uuid(),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
  largeUrl: z.string().url(),
  aspectRatio: z.string(),
  make: z.string(),
  camera: z.string(),
  lensMake: z.string(),
  lensModel: z.string(),
  focalLength: z.string(),
  focalLength35mmEquivalent: z.string(),
  iso: z.string(),
  exposure: z.string(),
  exposureCompensation: z.string(),
  FStop: z.string(),
  taken: z.string().datetime(),
});

export type Photo = z.infer<typeof PhotoSchema>;

interface PhotosCollectionFilter {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
}

class PhotoLoaderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PhotoLoaderError";
  }
}

export function createPhotosLoader(): LiveLoader<Photo, PhotosCollectionFilter, PhotoLoaderError> {
  const apiUrl = import.meta.env.PHOTOS_API_URL;
  const bearerToken = import.meta.env.PHOTOS_API_TOKEN;

  if (!apiUrl) {
    throw new Error("PHOTOS_API_URL environment variable is required");
  }

  function buildHeaders(etag?: string): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (bearerToken) {
      headers.Authorization = `Bearer ${bearerToken}`;
    }

    if (etag) {
      headers["If-None-Match"] = etag;
    }

    return headers;
  }

  async function fetchAllPhotos(): Promise<Photo[]> {
    const allPhotos: Photo[] = [];
    let currentPage = 1;
    let hasMore = true;
    const limit = 100;

    while (hasMore) {
      const url = `${apiUrl}?page=${currentPage}&limit=${limit}&sort=desc`;
      const response = await fetch(url, {
        headers: buildHeaders(),
      });

      if (response.status === 429) {
        throw new PhotoLoaderError("Rate limit exceeded. Please try again later.");
      }

      if (response.status === 401) {
        throw new PhotoLoaderError("Unauthorized. Check your API token.");
      }

      if (!response.ok) {
        throw new PhotoLoaderError(
          `Failed to fetch photos: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (!data.photos || !Array.isArray(data.photos)) {
        throw new PhotoLoaderError("Invalid API response format");
      }

      allPhotos.push(...data.photos);

      hasMore = data.pagination?.hasNext || false;
      currentPage++;
    }

    return allPhotos;
  }

  return {
    name: "photos",
    loadCollection: async () => {
      const allPhotos = await fetchAllPhotos();

      return {
        entries: allPhotos.map((photo: Photo) => ({
          id: photo.key,
          data: photo,
        })),
        cacheHint: {
          tags: ["photos"],
        },
      };
    },
    loadEntry: async () => {
      return {
        error: new PhotoLoaderError("Single photo loading not supported"),
      };
    },
  };
}
