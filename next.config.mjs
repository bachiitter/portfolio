/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["reshaped"],
  experimental: {
    optimizePackageImports: ["reshaped"],
  },
  output: "export",
};

export default nextConfig;
