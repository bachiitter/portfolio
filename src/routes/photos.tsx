import { createFileRoute } from "@tanstack/react-router";
import { getPhotos } from "$/lib/functions/photos";
import { metadata } from "$/lib/utils";
import { ImageZoom } from "$/components/lightbox";

export const Route = createFileRoute("/photos")({
  loader: () => getPhotos(),
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
  staleTime: 5 * 60_000, // 5 minutes client-side
  component: RouteComponent,
});

function RouteComponent() {
  const photos = Route.useLoaderData();

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-medium leading-[32px] tracking-[-0.0075em]">Photos</h2>
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
            <img className="object-cover aspect-square w-full" src={photo.largeUrl} alt="" />
          </ImageZoom>
        ))}
      </div>
    </section>
  );
}
