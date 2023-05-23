// Docs: https://www.contentful.com/developers/docs/references/images-api/
export default function contentfulLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const url = new URL(
    `https://images.ctfassets.net/${process.env.CONTENTFUL_SPACE_ID}/7dBde0m6LKB3KoF6pcwEq1${src}`
  );
  url.searchParams.set("fm", "webp");
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", quality ? quality.toString() : "75");
  return url.href;
}
