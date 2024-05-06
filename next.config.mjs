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

export default nextConfig;
