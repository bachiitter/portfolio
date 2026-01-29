import { createFileRoute } from "@tanstack/react-router";
import { ImageZoom } from "$/components/lightbox";
import { getPhotosFn } from "$/lib/functions/photos";
import { metadata } from "$/lib/utils";

export const Route = createFileRoute("/photos")({
  loader: () => getPhotosFn(),
  head: () => ({
    meta: [
      ...metadata({
        title: `Photos - Bachitter`,
      }),
    ],
  }),
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
