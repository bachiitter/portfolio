import { createMdxtsPlugin } from "mdxts/next";

const withMdxts = createMdxtsPlugin({
  theme: "tokyo-night",
  highlightErrors: true,
  siteUrl: "https://bachitter.dev",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withMdxts(nextConfig);
