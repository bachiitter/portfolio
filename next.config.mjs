const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const config = {
  output: isDev ? "standalone" : "export",
  images: {
    loader: "custom",
    loaderFile: "./src/utils/cfloader.ts",
  },
};

export default config;
