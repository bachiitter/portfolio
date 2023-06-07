const isDev = process.env.NODE_ENV !== "development";

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const config = {
  output: isDev ? "standalone" : "export",
  images: {
    loader: "custom",
    loaderFile: "./src/utils/cfloader.ts",
  },
  eslint: { ignoreDuringBuilds: isProd ? false : true },
  typescript: { ignoreBuildErrors: isProd ? false : true },
};

export default config;
