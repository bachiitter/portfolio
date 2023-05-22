const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const config = {
  output: isDev ? "standalone" : "export",
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://127.0.0.1:4000/api/v1/:path*",
      },
    ];
  },
};

export default config;
