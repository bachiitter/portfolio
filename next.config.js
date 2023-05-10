/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  output: isDev ? "standalone" : "export",
  experimental: {
    typedRoutes: true,
  },
  // async rewrites() {
  //   return [{
  //     source: '/api/v1/:path*',
  //     destination: 'http://127.0.0.1:4000/api/v1/:path*'
  //   }]
  // }
};

module.exports = nextConfig;
