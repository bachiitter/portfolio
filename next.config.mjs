const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/utils/cfloader.ts",
  },
  eslint: { ignoreDuringBuilds: isProd ? false : true },
  typescript: { ignoreBuildErrors: isProd ? false : true },
};

export default config;
