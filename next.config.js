/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    appDir: true,
  },
  images: {
    domains: ['robohash.org', 'fakestoreapi.com'],
  },
};

module.exports = nextConfig;
