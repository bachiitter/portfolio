import { createFileRoute } from "@tanstack/react-router";
import { ImageZoom } from "$/components/lightbox";
import { metadata } from "$/lib/utils";

export const Route = createFileRoute("/photos")({
  loader: async () => {
    const PHOTOS_API_URL = process.env.PHOTOS_API_URL;
    const PHOTOS_API_TOKEN = process.env.PHOTOS_API_TOKEN;

    if (!PHOTOS_API_URL || !PHOTOS_API_TOKEN) {
      console.error("Missing  credentials (CONTENTFUL_SPACE_ID or CONTENTFUL_API_TOKEN)");
      return;
    }

    function buildHeaders(etag?: string): HeadersInit {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      headers.Authorization = `Bearer ${PHOTOS_API_TOKEN}`;

      if (etag) {
        headers["If-None-Match"] = etag;
      }

      return headers;
    }

    const allPhotos = [];
    let currentPage = 1;
    let hasMore = true;
    const limit = 100;

    while (hasMore) {
      const url = `${PHOTOS_API_URL}?page=${currentPage}&limit=${limit}&sort=desc`;
      const response = await fetch(url, {
        headers: buildHeaders(),
      });

      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }

      if (response.status === 401) {
        throw new Error("Unauthorized. Check your API token.");
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.photos || !Array.isArray(data.photos)) {
        throw new Error("Invalid API response format");
      }

      allPhotos.push(...data.photos);

      hasMore = data.pagination?.hasNext || false;
      currentPage++;
    }

    return allPhotos;
  },
  head: () => ({
    meta: [
      ...metadata({
        title: `Photos - Bachitter`,
      }),
    ],
  }),
  headers: () => ({
    // Cache for 1 hour, allow stale for 7 days
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=604800",
  }),
  staleTime: 15 * 60_000, // 15 minutes client-side
  component: RouteComponent,
});

function RouteComponent() {
  const photos = Route.useLoaderData();

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-medium leading-8 tracking-[-0.0075em]">Photos</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        {photos?.map((photo) => (
          <ImageZoom
            key={photo.key}
            src={photo.largeUrl}
            meta={{
              camera: photo.camera,
              lensModel: photo.lensModel,
              focalLength35mmEquivalent: photo.focalLength35mmEquivalent,
              iso: photo.iso,
              exposure: photo.exposure,
              FStop: photo.FStop,
              taken: photo.taken,
            }}
          >
            <img className="object-cover aspect-square w-full" src={photo.thumbnailUrl} alt="" />
          </ImageZoom>
        ))}
      </div>
    </section>
  );
}
