import type { Metadata } from "next";

const url = "https://bachitter.dev";

export function getSiteMetadata({
  title = "Bachitter",
  description = "Hi! I am Bachitter Chahal, a Product Engineer based in Vancouver, Canada.",
  ...rest
}: { title?: string; description?: string } & Omit<Metadata, "title" | "description"> = {}) {
  return {
    metadataBase: new URL(url),
    title: title,
    description: description,
    ...rest,
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "Bachitter",
      locale: "en_US",
      type: "website",
      images: [],
      ...rest.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: "@bachiitter",
      ...rest.twitter,
    },
  } satisfies Metadata;
}
