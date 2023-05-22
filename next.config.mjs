const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const config = {
  output: isDev ? "standalone" : "export",
};

export default config;
